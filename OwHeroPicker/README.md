# 守望先锋英雄选择助手

纯原生 Windows 桌面应用，基于 C# + WPF + .NET 8。

## 功能

- **实战面板**：敌我阵容配置，实时分析
- **动态推荐**：基于敌方阵容推荐英雄
- **克制关系**：查看英雄间的克制关系
- **地图推荐**：为不同地图推荐英雄

## 环境要求

- Windows 10/11
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

## 构建运行

```bash
# 进入项目目录
cd OwHeroPicker

# 还原依赖
dotnet restore

# 运行（开发模式）
dotnet run

# 构建发布版本
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# 发布文件在 bin/Release/net8.0-windows/win-x64/publish/
```

## 发布选项

### 单文件发布（推荐）

```bash
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true
```

### 依赖框架发布（体积更小，需要用户安装 .NET 8）

```bash
dotnet publish -c Release -r win-x64 --self-contained false
```

## 技术栈

- **语言**：C# 12
- **框架**：.NET 8 + WPF
- **MVVM**：CommunityToolkit.Mvvm
- **数据**：System.Text.Json

## 项目结构

```
OwHeroPicker/
├── Models/          # 数据模型
├── ViewModels/      # 视图模型 (MVVM)
├── Views/           # XAML 界面
├── Services/        # 业务逻辑
├── Data/            # 静态数据
├── Converters/      # 值转换器
├── Themes/          # 主题样式
└── Assets/          # 资源文件
```
