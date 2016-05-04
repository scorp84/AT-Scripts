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

defineClass('FillPhotos < GDSelectionCommand', {
    'execute' : function() {

        //Ausgewählte Objekte
        var objects = selectionController.selectedObjects();

        //BILD LADEN
        var pluginPath = context.plugin.url().path() + "/Contents/Resources" ; // GDPrototyper.applicationSupportDirectoryPathWithError_(nil) ;
        var appSupportPath = pluginPath + "/data/images/persona/female/";
        var fileNames = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error_(appSupportPath, nil);

        //Iteriere über Zellen
        for (var i=0; i<objects.count(); i++) {
            var cell = objects[i];
            //Random Gender
            var gender = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

            if(gender<=50){
                //Male
                appSupportPath = pluginPath + "/data/images/persona/male/";
            }else {
                //female
                appSupportPath = pluginPath + "/data/images/persona/female/";
            }

            //Array mit Bild Dateinamen
            fileNames = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error_(appSupportPath, nil);

            //DATEN FUELLEN
            var picName = fileNames[Math.floor(Math.random() * fileNames.count())];
            var picture = selectionController.project().addResourceWithFile_(appSupportPath + picName);

            cell.setValue_forKey_inState_(picture,"backgroundImageResource",nil);
            cell.setValue_forKey_inState_(2,"backgroundPainterType",nil);
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

	var command = FillPhotos.command();
	document.commandManager().executeCommand(command);

}
