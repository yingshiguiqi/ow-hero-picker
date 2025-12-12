const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

// 开发模式检测
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: "守望先锋英雄选择助手",
    icon: path.join(__dirname, "../public/icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    backgroundColor: "#1a1a2e",
    show: false,
  });

  // 窗口准备好后显示，避免白屏
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // 加载应用
  if (isDev) {
    // 开发模式：加载本地开发服务器
    mainWindow.loadURL("http://localhost:3002");
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, "../out/index.html"));
  }

  // 外部链接在默认浏览器打开
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // 拦截导航到外部链接
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("http://localhost") && !url.startsWith("file://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// 自定义菜单
function createMenu() {
  const template = [
    {
      label: "文件",
      submenu: [
        {
          label: "重新加载",
          accelerator: "CmdOrCtrl+R",
          click: () => mainWindow?.reload(),
        },
        { type: "separator" },
        {
          label: "退出",
          accelerator: "CmdOrCtrl+Q",
          click: () => app.quit(),
        },
      ],
    },
    {
      label: "视图",
      submenu: [
        {
          label: "放大",
          accelerator: "CmdOrCtrl+Plus",
          click: () => {
            const zoom = mainWindow?.webContents.getZoomFactor() || 1;
            mainWindow?.webContents.setZoomFactor(zoom + 0.1);
          },
        },
        {
          label: "缩小",
          accelerator: "CmdOrCtrl+-",
          click: () => {
            const zoom = mainWindow?.webContents.getZoomFactor() || 1;
            mainWindow?.webContents.setZoomFactor(Math.max(0.5, zoom - 0.1));
          },
        },
        {
          label: "重置缩放",
          accelerator: "CmdOrCtrl+0",
          click: () => mainWindow?.webContents.setZoomFactor(1),
        },
        { type: "separator" },
        {
          label: "开发者工具",
          accelerator: "F12",
          click: () => mainWindow?.webContents.toggleDevTools(),
        },
      ],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "守望先锋Wiki",
          click: () =>
            shell.openExternal("https://overwatch.huijiwiki.com/wiki/首页"),
        },
        {
          label: "GitHub",
          click: () =>
            shell.openExternal(
              "https://github.com/yingshiguiqi/ow-hero-picker"
            ),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
