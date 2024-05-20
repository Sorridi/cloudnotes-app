import { app } from "electron";

export default {
    label: "App",
    submenu: [
        {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: () => {
                app.quit();
            }
        },
        {
            labeL: "Starting page",
            accelerator: "CmdOrCtrl+H",
            click: () => {
                mainWindow.loadURL(
                    url.format({
                        pathname: path.join(__dirname, "login.html"),
                        protocol: "file:",
                        slashes: true
                    })
                );
            }
        }
    ]
};
