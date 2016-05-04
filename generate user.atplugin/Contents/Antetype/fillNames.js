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

@import "data.js"

function onRun(context) {

defineClass('FillNames < GDSelectionCommand', {
    'execute' : function() {

        //Namen Arrays auf DE setzen
        firstNames = data[9][2];
        lastNames = data[9][3];

        //Ausgewählte Objekte
        var objects = selectionController.selectedObjects();

        //Iteriere über Zellen
        for (var i=0; i<objects.count(); i++) {
            var cell = objects[i];
            //Random Gender
            var gender = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

            if(gender<=50){
                //Male
                firstNames = data[9][1];
            }else {
                //female
                firstNames = data[9][2];
            }

            //DATEN FUELLEN
            var l = firstNames.length;
            var r = Math.random();
            var index = Math.floor(r * l);
            var prename = firstNames[index];
            var lastname = lastNames[Math.floor(Math.random() * lastNames.length) ];
            cell.setValue_forKey_inState_(prename + ' ' + lastname,"textString",nil);
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

	var command = FillNames.command();
	document.commandManager().executeCommand(command);

}
