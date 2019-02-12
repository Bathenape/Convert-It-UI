"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var win;
electron_1.app.on("ready", createWindow);
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
electron_1.ipcMain.on("getFiles", function (event, arg) {
    var files = fs.readdirSync(__dirname);
    win.webContents.send("getFilesResponse", files);
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 900, height: 700 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/convertit/index.html"),
        protocol: "file:",
        slashes: true
    }));
    //win.webContents.openDevTools();
    win.on("closed", function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map