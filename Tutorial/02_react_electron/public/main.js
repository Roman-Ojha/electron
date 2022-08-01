// import { BrowserWindow, app } from "electron";
// import path from "path";
const { BrowserWindow, app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

if (isDev) {
  try {
    require("electron-reloader")(module);
    // for auto reload main process on change
  } catch (_) {}
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //   nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(win.webContents);

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : //   if we are in dev run electron on localhost 3000
        `file://${path.join(__dirname, "../build/index.html")}`
    // else if we are in production for building application then we will run build version of react
  );
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
