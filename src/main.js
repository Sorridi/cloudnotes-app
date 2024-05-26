// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, Menu, shell } from "electron";
import appMenuTemplate from "./scripts/menu/app_menu_template";
import editMenuTemplate from "./scripts/menu/edit_menu_template";
import devMenuTemplate from "./scripts/menu/dev_menu_template";
import createWindow from "./scripts/helpers/window";

import { DataBase } from "../app/backend/database/DataBase";
import { Authenticator } from "../app/backend/Authenticator";
import { EventDispatcher } from "../app/backend/EventDispatcher";

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
    const userDataPath = app.getPath("userData");
    app.setPath("userData", `${userDataPath} (${env.name})`);
}

const loadDB = () => {
    DataBase.load("./resources/db/users.json", "AUTH");
}

const a = () => {
    Authenticator.getAuthObjects(); // todo remove
}

const setApplicationMenu = () => {
    const menus = [appMenuTemplate, editMenuTemplate];
    if (env.name !== "production") {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// We can communicate with our window (the renderer process) via messages.
const initIpc = () => {
    let med = EventDispatcher.getMain();
    med.addListener("need-app-path", "main-e-list", (event, arg) => {
        event.reply("app-path", app.getAppPath());
    });
    med.addListener("open-external-link", "main-e-list", (event, href) => {
        shell.openExternal(href);
    });
};

app.on("ready", () => {
    loadDB();
    setApplicationMenu();
    initIpc();

    const mainWindow = createWindow("main", {
        width: 1000,
        height: 600,
        webPreferences: {
            // Two properties below are here for demo purposes, and are
            // security hazard. Make sure you know what you're doing
            // in your production app.
            // Spectron needs access to remote module
            enableRemoteModule: env.name === "test"
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../src/html/register.html"),
            protocol: "file:",
            slashes: true
        })
    );

    const secondWindow = createWindow("second", {
        width: 1000,
        height: 600,
        webPreferences: {
            // Two properties below are here for demo purposes, and are
            // security hazard. Make sure you know what you're doing
            // in your production app.
            // Spectron needs access to remote module
            enableRemoteModule: env.name === "test"
        }
    });

    secondWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../src/html/login.html"),
            protocol: "file:",
            slashes: true
        })
    );

    if (env.name === "development") {
        // mainWindow.openDevTools();
    }
});

app.on("window-all-closed", () => {
    app.quit();
});
