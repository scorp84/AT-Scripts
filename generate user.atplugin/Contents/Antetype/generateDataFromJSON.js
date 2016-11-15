function duplicateCells(N) {
    var screens = document.project().orderedScreens();

    var copyCommand = GDCopyCommand.command();

    document.commandManager().executeCommand(copyCommand);
    var addedCells = NSMutableArray.array();
    addedCells.addObjectsFromArray_(selectionController.selectedObjects());

    var pasteCommand = GDPasteCellsCommand.command();

    for (var i = 0; i < N; i++) {
        document.commandManager().executeCommand_(pasteCommand);
        addedCells.addObjectsFromArray_(selectionController.selectedObjects());
    }

    selectionController.selectFigures_(addedCells);
}


//Open Filechooser
var openPanel = NSOpenPanel.openPanel();
var result = openPanel.runModal();
var url = openPanel.URL();

if (result == 1) {
    var json_data = NSData.dataWithContentsOfURL_(url);
    var json = NSJSONSerialization.JSONObjectWithData_options_error_(json_data, 0, nil);
}

var openAlert = NSAlert.alloc().init();

//var view = NSView.alloc().initWithFrame_(NSMakeRect(0,0,200,25));
var input = NSTextField.alloc().initWithFrame_(NSMakeRect(0, 0, 200, 25));

openAlert.setMessageText_("Generate additional Elements");
openAlert.setInformativeText_("Please enter a number how often you want the selected element to be repeated. Leave empty to keep the selected items.");
openAlert.setAccessoryView(input);
openAlert.addButtonWithTitle_('OK');
openAlert.addButtonWithTitle_('Cancel');

openAlert.runModal();
var repeatResult = input.intValue();

duplicateCells(repeatResult);


defineClass('FromJSON < GDSelectionCommand', {

    'execute': function() {

        //Ausgewählte Objekte
        var objects = selectionController.selectedObjects();
        var iCountJson = 0;

        //ZEILEN
        for (var i = 0; i < objects.count(); i++) {
            var cell = objects[i];
            var children = cell.deepOrderedComponents();

            //KINDELEMENTE NAME, VORNAME ETC
            for (var j = 0; j < children.count(); j++) {
                var child = children[j];
                var autoCount = (String)(i + 1);

                if (child.name() == "COUNT") {
                    child.setValue_forKey_inState_(autoCount, "textString", nil);
                }

                for (var dataKey in json[iCountJson]) {
                    //var propName = (Object.keys(json[j])[z]);

                    if (child.name() == dataKey) {
                        var jsonValue = (String)(json[iCountJson][dataKey]);
                        child.setValue_forKey_inState_(jsonValue, "textString", nil);
                    }
                }
            }

            if (iCountJson >= json.count() - 1) {
                iCountJson = 0;
            } else {
                iCountJson++;
            }
        }
    },
    'executeGUI': function() {
        screenChangeManager.rebuildRenderObjects();
    },
    'undoGUI': function() {
        this.executeGUI();
    }
});

var command = FromJSON.command();
document.commandManager().executeCommand(command);
