"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
exports.default = {
    label: "Development",
    submenu: [
        {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: () => {
                electron_1.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        },
        {
            label: "Toggle DevTools",
            accelerator: "Alt+CmdOrCtrl+I",
            click: () => {
                electron_1.BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        },
        {
            label: "Build TailwindCSS",
            accelerator: "CmdOrCtrl+T",
            click: () => {
                // execute the build script npm run build:css
                const exec = require('child_process').exec;
                exec('npm run build:css', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(stdout);
                });
                // reload page
                electron_1.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        }
    ]
};
