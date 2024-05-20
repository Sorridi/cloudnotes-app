"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./stylesheets/tailwind.css");
// Everything below is just a demo. You can delete all of it.
const electron_1 = require("electron");
const fs_jetpack_1 = __importDefault(require("fs-jetpack"));
const hello_world_1 = require("./hello_world/hello_world");
const env_1 = __importDefault(require("env"));
document.querySelector("#app").style.display = "block";
document.querySelector("#greet").innerHTML = (0, hello_world_1.greet)();
document.querySelector("#env").innerHTML = env_1.default.name;
document.querySelector("#electron-version").innerHTML =
    process.versions.electron;
const osMap = {
    win32: "Windows",
    darwin: "macOS",
    linux: "Linux"
};
document.querySelector("#os").innerHTML = osMap[process.platform];
// We can communicate with main process through messages.
electron_1.ipcRenderer.on("app-path", (event, appDirPath) => {
    // Holy crap! This is browser window with HTML and stuff, but I can read
    // files from disk like it's node.js! Welcome to Electron world :)
    const appDir = fs_jetpack_1.default.cwd(appDirPath);
    const manifest = appDir.read("package.json", "json");
    document.querySelector("#author").innerHTML = manifest.author;
});
electron_1.ipcRenderer.send("need-app-path");
document.querySelector(".electron-website-link").addEventListener("click", event => {
    electron_1.ipcRenderer.send("open-external-link", event.target.href);
    event.preventDefault();
}, false);
