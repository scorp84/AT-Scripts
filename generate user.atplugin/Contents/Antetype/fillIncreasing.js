/*
The MIT License (MIT)

Copyright (c) 2016 Florian Kall

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

function onRun(context) {

  defineClass('Increasing < GDSelectionCommand', {
    'execute' : function() {

      var alert = NSAlert.alloc().init()
      alert.setMessageText("Fill selected objects with random values");
      alert.setInformativeText_("Please enter the minimum and maxmimum value for the generated values.\n You can optionally enter a curreny suffix and the number of desired decimal places.");
      alert.addButtonWithTitle('Generate');
      alert.addButtonWithTitle('Cancel');

      //View erzeugen
      var View = NSView.alloc().initWithFrame(NSMakeRect(0,0,400,180));

      var inputStartValue = NSTextField.alloc().initWithFrame_(NSMakeRect(140,80,120,25));
      var inputPrefix = NSTextField.alloc().initWithFrame_(NSMakeRect(140,40,120,25));
      var inputSuffix = NSTextField.alloc().initWithFrame_(NSMakeRect(140,0,120,25));

      //Labels erzeugen
      var lblStartValue = NSTextField.alloc().initWithFrame_(NSMakeRect(0,80,120,20));
      lblStartValue.setStringValue("Start value");
      lblStartValue.setBezeled(0);
      lblStartValue.setDrawsBackground(false);
      lblStartValue.setEditable(false);
      lblStartValue.setSelectable(false);

      var lblPrefix = NSTextField.alloc().initWithFrame_(NSMakeRect(0,40,120,20));
      lblPrefix.setStringValue("Prefix");
      lblPrefix.setBezeled(0);
      lblPrefix.setDrawsBackground(false);
      lblPrefix.setEditable(false);
      lblPrefix.setSelectable(false);

      var lblSuffix = NSTextField.alloc().initWithFrame_(NSMakeRect(0,0,120,20));
      lblSuffix.setStringValue("Suffix");
      lblSuffix.setBezeled(0);
      lblSuffix.setDrawsBackground(false);
      lblSuffix.setEditable(false);
      lblSuffix.setSelectable(false);

      //Controls zur View hinzufügen
      View.addSubview(inputStartValue);
      View.addSubview(lblStartValue);
      View.addSubview(lblPrefix);
      View.addSubview(inputPrefix);
      View.addSubview(lblSuffix);
      View.addSubview(inputSuffix);
      alert.setAccessoryView(View);

      var responseCode = alert.runModal();

      var StartValue = inputStartValue.intValue();
      var prefix = inputPrefix.stringValue();
      var suffix = inputSuffix.stringValue();

      //Ausgewählte Objekte
      var objects = selectionController.selectedObjects();

      if(StartValue != ""){
        Value = StartValue;
      }
      else {
        Value = 1;
      }

      //Iteriere über Zellen
      for (var i=0; i<objects.count(); i++) {
        var cell = objects[i];
        var CellTxt = "";

        Celltxt = Value;

        if(prefix != "") {
          Celltxt = prefix + "" + Value + "";
        }
        if(suffix != "") {
          Celltxt = Celltxt + suffix;
        }
        cell.setValue_forKey_inState_("" + Celltxt + "","textString",nil);
        Value = Value+1;
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

var command = Increasing.command();
document.commandManager().executeCommand(command);

}
