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

function onRun(context) {

defineClass('TexterCommand < GDSelectionCommand', {
    'execute' : function() {

      var alert = NSAlert.alloc().init()
      alert.setMessageText("Fill selected objects with random values");
      alert.setInformativeText_("Please enter the minimum and maxmimum value for the generated values");
      alert.addButtonWithTitle('Generate');
      alert.addButtonWithTitle('Cancel');

      //View erzeugen
      var View = NSView.alloc().initWithFrame(NSMakeRect(0,0,400,100));

      var inputMin = NSTextField.alloc().initWithFrame_(NSMakeRect(140,40,200,25));
      var inputMax = NSTextField.alloc().initWithFrame_(NSMakeRect(140,0,200,25));

      //Labels erzeugen
      var lblMinValue = NSTextField.alloc().initWithFrame_(NSMakeRect(0,40,120,20));
      lblMinValue.setStringValue("Minimum value");
      lblMinValue.setBezeled(0);
      lblMinValue.setDrawsBackground(false);
      lblMinValue.setEditable(false);
      lblMinValue.setSelectable(false);

      var lblMaxValue = NSTextField.alloc().initWithFrame_(NSMakeRect(0,0,120,20));
      lblMaxValue.setStringValue("Max value");
      lblMaxValue.setBezeled(0);
      lblMaxValue.setDrawsBackground(false);
      lblMaxValue.setEditable(false);
      lblMaxValue.setSelectable(false);

      //Controls zur View hinzufügen
      View.addSubview(inputMin);
      View.addSubview(inputMax);
      View.addSubview(lblMinValue);
      View.addSubview(lblMaxValue);
      alert.setAccessoryView(View);

      var responseCode = alert.runModal();

      var minValue = inputMin.intValue();
      var maxValue = inputMax.intValue();

      var Val

        //Ausgewählte Objekte
        var objects = selectionController.selectedObjects();

        //Iteriere über Zellen
        for (var i=0; i<objects.count(); i++) {
            var cell = objects[i];
            var RandomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            cell.setValue_forKey_inState_("" + RandomNumber + "","textString",nil);
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

	var command = TexterCommand.command();
	document.commandManager().executeCommand(command);

}
