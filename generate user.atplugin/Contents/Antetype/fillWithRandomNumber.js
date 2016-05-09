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

  defineClass('RandomNumber < GDSelectionCommand', {
    'execute' : function() {

      var alert = NSAlert.alloc().init()
      alert.setMessageText("Fill selected objects with random values");
      alert.setInformativeText_("Please enter the minimum and maxmimum value for the generated values.\n You can optionally enter a curreny suffix and the number of desired decimal places.");
      alert.addButtonWithTitle('Generate');
      alert.addButtonWithTitle('Cancel');

      //View erzeugen
      var View = NSView.alloc().initWithFrame(NSMakeRect(0,0,400,180));

      var inputMin = NSTextField.alloc().initWithFrame_(NSMakeRect(140,120,160,25));
      var inputMax = NSTextField.alloc().initWithFrame_(NSMakeRect(140,80,160,25));
      var inputCurreny = NSTextField.alloc().initWithFrame_(NSMakeRect(140,40,80,25));
      var inputDecimalPlaces = NSTextField.alloc().initWithFrame_(NSMakeRect(140,0,80,25));

      //Labels erzeugen
      var lblMinValue = NSTextField.alloc().initWithFrame_(NSMakeRect(0,120,120,20));
      lblMinValue.setStringValue("Minimum value");
      lblMinValue.setBezeled(0);
      lblMinValue.setDrawsBackground(false);
      lblMinValue.setEditable(false);
      lblMinValue.setSelectable(false);

      var lblMaxValue = NSTextField.alloc().initWithFrame_(NSMakeRect(0,80,120,20));
      lblMaxValue.setStringValue("Maximum value");
      lblMaxValue.setBezeled(0);
      lblMaxValue.setDrawsBackground(false);
      lblMaxValue.setEditable(false);
      lblMaxValue.setSelectable(false);

      var lblCurrency = NSTextField.alloc().initWithFrame_(NSMakeRect(0,40,120,20));
      lblCurrency.setStringValue("Currency suffix");
      lblCurrency.setBezeled(0);
      lblCurrency.setDrawsBackground(false);
      lblCurrency.setEditable(false);
      lblCurrency.setSelectable(false);

      var lblDecimal = NSTextField.alloc().initWithFrame_(NSMakeRect(0,0,120,20));
      lblDecimal.setStringValue("Decimal places");
      lblDecimal.setBezeled(0);
      lblDecimal.setDrawsBackground(false);
      lblDecimal.setEditable(false);
      lblDecimal.setSelectable(false);

      //Controls zur View hinzufügen
      View.addSubview(inputMin);
      View.addSubview(inputMax);
      View.addSubview(lblMinValue);
      View.addSubview(lblCurrency);
      View.addSubview(lblMaxValue);
      View.addSubview(inputCurreny);
      View.addSubview(lblDecimal);
      View.addSubview(inputDecimalPlaces);
      alert.setAccessoryView(View);

      var responseCode = alert.runModal();

      var minValue = inputMin.intValue();
      var maxValue = inputMax.intValue();
      var currency = inputCurreny.stringValue();
      var decimalPlaces = inputDecimalPlaces.intValue();


      var randomFixedInteger = function (length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
      }

      //Ausgewählte Objekte
      var objects = selectionController.selectedObjects();

      //Iteriere über Zellen
      for (var i=0; i<objects.count(); i++) {
        var cell = objects[i];
        var RandomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        if(decimalPlaces != "") {
          RandomNumber = RandomNumber + "," + "" + randomFixedInteger(decimalPlaces)+ "";
        }

        if(currency != "") {
          RandomNumber = RandomNumber + "" + " " + currency;
        }

        //Iteriere über alle States
        var aStates = cell.states().allObjects();
        for(var iCntStates = 0; iCntStates < aStates.count(); iCntStates++) {
              cell.setValue_forKey_inState_("" + RandomNumber + "","textString",aStates[iCntStates]);
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

var command = RandomNumber.command();
document.commandManager().executeCommand(command);

}
