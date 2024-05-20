"use strict";
// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const electron_1 = require("electron");
const app_menu_template_1 = __importDefault(require("./menu/app_menu_template"));
const edit_menu_template_1 = __importDefault(require("./menu/edit_menu_template"));
const dev_menu_template_1 = __importDefault(require("./menu/dev_menu_template"));
const window_1 = __importDefault(require("./helpers/window"));
// Special module holding environment variables which you declared
// in config/env_xxx.json file.
const env_1 = __importDefault(require("env"));
// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env_1.default.name !== "production") {
    const userDataPath = electron_1.app.getPath("userData");
    electron_1.app.setPath("userData", `${userDataPath} (${env_1.default.name})`);
}
const setApplicationMenu = () => {
    const menus = [app_menu_template_1.default, edit_menu_template_1.default];
    if (env_1.default.name !== "production") {
        menus.push(dev_menu_template_1.default);
    }
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menus));
};
// We can communicate with our window (the renderer process) via messages.
const initIpc = () => {
    electron_1.ipcMain.on("need-app-path", (event, arg) => {
        event.reply("app-path", electron_1.app.getAppPath());
    });
    electron_1.ipcMain.on("open-external-link", (event, href) => {
        electron_1.shell.openExternal(href);
    });
};
electron_1.app.on("ready", () => {
    setApplicationMenu();
    initIpc();
    const mainWindow = (0, window_1.default)("main", {
        width: 1000,
        height: 600,
        webPreferences: {
            // Two properties below are here for demo purposes, and are
            // security hazard. Make sure you know what you're doing
            // in your production app.
            nodeIntegration: true,
            contextIsolation: false,
            // Spectron needs access to remote module
            enableRemoteModule: env_1.default.name === "test"
        }
    });
    mainWindow.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "login.html"),
        protocol: "file:",
        slashes: true
    }));
    if (env_1.default.name === "development") {
        mainWindow.openDevTools();
    }
});
electron_1.app.on("window-all-closed", () => {
    electron_1.app.quit();
});
