"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
exports.default = {
    label: "App",
    submenu: [
        {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: () => {
                electron_1.app.quit();
            }
        },
        {
            labeL: "Starting page",
            accelerator: "CmdOrCtrl+H",
            click: () => {
                mainWindow.loadURL(url.format({
                    pathname: path.join(__dirname, "login.html"),
                    protocol: "file:",
                    slashes: true
                }));
            }
        }
    ]
};
