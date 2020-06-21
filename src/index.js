const { app, BrowserWindow, globalShortcut } = require("electron");
const { url } = require("./config");

let browserWindow;

function createWindow() {
  browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    titleBarStyle: "hidden",
    darkTheme: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  browserWindow.loadURL(url);
}

function toggleDevTools() {
  browserWindow.webContents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
}

app
  .whenReady()
  .then(createWindow)
  .then(createShortcuts);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
