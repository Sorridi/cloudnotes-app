import { BrowserWindow } from "electron";

export default {
    label: "Development",
    submenu: [
        {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: () => {
                BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        },
        {
            label: "Toggle DevTools",
            accelerator: "Alt+CmdOrCtrl+I",
            click: () => {
                BrowserWindow.getFocusedWindow().toggleDevTools();
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
                    BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
                });
            }
        }
    ]
};
