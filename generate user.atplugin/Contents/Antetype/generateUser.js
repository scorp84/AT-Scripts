/*
The MIT License (MIT)

Copyright (c) 2014 Timur Carpeev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


/*
this code is based on the excellent Sketch Plugin from Timur Carpeev:
https://github.com/timuric/Content-generator-sketch-plugin

Adapted to Antetype by Florian Kall
*/


@import "data.js"
@import "emails.js"
@import "phones.js"

function onRun(context) {

  function duplicateCells(N) {
    var screens = document.project().orderedScreens();

    var copyCommand = GDCopyCommand.command();

    document.commandManager().executeCommand(copyCommand);
    var addedCells = NSMutableArray.array();
    addedCells.addObjectsFromArray_(selectionController.selectedObjects());

    var pasteCommand = GDPasteCellsCommand.command();

    for (var i=0; i<N; i++) {
      document.commandManager().executeCommand_(pasteCommand);
      addedCells.addObjectsFromArray_(selectionController.selectedObjects());
    }
    selectionController.selectFigures_(addedCells);
  }


  defineClass('GenerateUser < GDSelectionCommand', {
    'execute' : function() {

      var options = ["German", "English", "French", "Spanish", "Italian", "Russian"];
      var Sprache;
      var choice = createSelect('Generate Datasets',options, 1);
      var iDuplicates;

      function createSelect(msg, items, selectedItemIndex){
        selectedItemIndex = selectedItemIndex || 0;

        var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(140,0,200,25));
        items.forEach(function(item) {
          accessory.addItemWithObjectValue_(item);
        });

        accessory.selectItemAtIndex(selectedItemIndex);
        accessory.Editable = false;

        var alert = NSAlert.alloc().init()
        alert.setMessageText(msg);
        alert.setInformativeText_("Please enter a number how often you want the selected element to be repeated, and chose a language for the names.");
        alert.addButtonWithTitle('Generate');
        alert.addButtonWithTitle('Cancel');
        //alert.setAccessoryView(accessory);

        //View erzeugen
        var View = NSView.alloc().initWithFrame(NSMakeRect(0,0,400,100));
        var input = NSTextField.alloc().initWithFrame_(NSMakeRect(140,40,200,25));

        //Labels erzeugen
        var lblCntItems = NSTextField.alloc().initWithFrame_(NSMakeRect(0,40,120,20));
        lblCntItems.setStringValue("Number of items");
        lblCntItems.setBezeled(0);
        lblCntItems.setDrawsBackground(false);
        lblCntItems.setEditable(false);
        lblCntItems.setSelectable(false);

        var lblLanguage = NSTextField.alloc().initWithFrame_(NSMakeRect(0,0,120,20));
        lblLanguage.setStringValue("Language for names");
        lblLanguage.setBezeled(0);
        lblLanguage.setDrawsBackground(false);
        lblLanguage.setEditable(false);
        lblLanguage.setSelectable(false);

        //Controls zur View hinzufügen
        View.addSubview(input);
        View.addSubview(accessory);
        View.addSubview(lblCntItems);
        View.addSubview(lblLanguage);
        alert.setAccessoryView(View);

        var responseCode = alert.runModal();
        log(responseCode);
        var sel = accessory.indexOfSelectedItem();
        Sprache = sel;

        var openAlert = NSAlert.alloc().init();

        iDuplicates = input.intValue();
        log(iDuplicates);
        duplicateCells(iDuplicates);
        //sleep(3000);
      }

      var SprachArray = 0;
      log(Sprache);

      if(Sprache==0){
        SprachArray = 9;
      }else if (Sprache==1) {
        SprachArray = 24;
      }else if (Sprache == 2) {
        SprachArray = 8;
      }else if (Sprache == 3) {
        SprachArray = 23;
      }else if (Sprache == 4) {
        SprachArray = 14;
      }else if (Sprache == 5) {
        SprachArray = 21;
      }
      firstNames = data[SprachArray][2];
      lastNames = data[SprachArray][3];
      emails = dataMail;
      telefon = dataPhone;

      //Ausgewählte Objekte
      var objects = selectionController.selectedObjects();

      //BILD LADEN
      var pluginPath = context.plugin.url().path() + "/Contents/Resources" ; // GDPrototyper.applicationSupportDirectoryPathWithError_(nil) ;
      log("pluginPath " + pluginPath);
      var appSupportPath = pluginPath + "/data/images/persona/female/";
      var fileNames = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error_(appSupportPath, nil);

      //Iteriere über ausgewählte Objekte
      for (var i=0; i<objects.count(); i++) {
        var cell = objects[i];
        var children = cell.deepOrderedComponents();

        //Random Gender
        var gender = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

        //Daten generieren
        if(gender<=50){
          //Male
          firstNames = data[SprachArray][1];
          appSupportPath = pluginPath + "/data/images/persona/male/";
        }else {
          //female
          firstNames = data[SprachArray][2];
          appSupportPath = pluginPath + "/data/images/persona/female/";
        }

        log(appSupportPath);

        <!-- DATEN ERZEUGEN -->
        //vorname
        var l = firstNames.length;
        var r = Math.random();
        var index = Math.floor(r * l);
        var name = firstNames[index];
        //name
        var lastname = lastNames[Math.floor(Math.random() * lastNames.length) ];
        //phone
        var phone = telefon[Math.floor(Math.random() * dataPhone.length) ];
        //mail
        var mail = emails[Math.floor(Math.random() * dataMail.length) ];

        //Array mit Bild Dateinamen
        fileNames = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error_(appSupportPath, nil);

        //picture
        var picName = fileNames[Math.floor(Math.random() * fileNames.count())];
        var picture = selectionController.project().addResourceWithFile_(appSupportPath + picName);

        //Iteriere über alle states
        var aStates = cell.states().allObjects();
        log(aStates);
        for(var iCntStates = 0; iCntStates < aStates.count(); iCntStates++) {

          //iteriere über Kinder
          for (var j=0; j<children.count(); j++) {
            var child = children[j];

            //DATEN FUELLEN
            if(child.name() == "FIRSTNAME"){
              child.setValue_forKey_inState_(name,"textString",aStates[iCntStates]);
            } else if (child.name() == "LASTNAME") {
              child.setValue_forKey_inState_(lastname,"textString",aStates[iCntStates]);
            }else if (child.name() == "FULLNAME") {
              child.setValue_forKey_inState_(name + " " + lastname,"textString",aStates[iCntStates]);
            }
            else if (child.name() == "PHONE") {
              child.setValue_forKey_inState_(phone,"textString",aStates[iCntStates]);
            } else if (child.name() == "EMAIL") {
              child.setValue_forKey_inState_(mail,"textString",aStates[iCntStates]);
            }else if (child.name() == "PICTURE")  {
              child.setValue_forKey_inState_(picture,"backgroundImageResource",aStates[iCntStates]);
              child.setValue_forKey_inState_(2,"backgroundPainterType",aStates[iCntStates]);
            }
          }
        }
      }

    }
    ,'executeGUI' : function() {
      screenChangeManager.rebuildRenderObjects();
    }
    ,'undoGUI' : function() {
      this.executeGUI();
    }
  }
);

var command = GenerateUser.command();
document.commandManager().executeCommand(command);

}
