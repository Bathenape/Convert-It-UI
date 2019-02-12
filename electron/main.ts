import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

let win: BrowserWindow;

app.on("ready", createWindow);

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on("getFiles", (event, arg) => {
    const files = fs.readdirSync(__dirname);
    win.webContents.send("getFilesResponse", files);
});

function createWindow() {
    win = new BrowserWindow({ width: 900, height: 700 });

    win.loadURL(
        url.format({
          pathname: path.join(__dirname, `/../../dist/convertit/index.html`),
          protocol: "file:",
          slashes: true
        })
    );
    
    //win.webContents.openDevTools();
    
    win.on("closed", () => {
        win = null;
    });
  }