# CI/CD 学习指南

## 什么是 CI/CD？

**CI (持续集成)** 是一种软件开发实践，团队成员频繁地将代码集成到共享存储库中，每次集成都会自动运行构建和测试，以便尽早发现问题。

**CD (持续部署/持续交付)** 则是在 CI 的基础上，自动化将通过测试的代码部署到生产环境或预生产环境。

## 本项目的 CI/CD 流水线

基于 monitor-dashboard 项目（Nuxt 4 + TypeScript + TailwindCSS），我们实现了以下 CI/CD 流水线：

### 1. 持续集成 (CI)

**文件位置**: `.github/workflows/ci.yml`

**触发条件**:
- 推送到 `main` 或 `master` 分支
- 创建或更新针对 `main` 或 `master` 分支的 Pull Request

**执行步骤**:
1. 检出代码
2. 设置 Node.js 环境（v20）
3. 安装 pnpm 包管理器
4. 安装项目依赖
5. 运行 TypeScript 类型检查
6. 构建项目
7. （可选）生成静态文件
8. 保存构建产物作为 GitHub Actions 构件

### 2. 持续部署 (CD)

**文件位置**: `.github/workflows/cd.yml`

**触发条件**:
- 推送到 `main` 或 `master` 分支

**执行步骤**:
1. 检出代码
2. 设置 Node.js 环境
3. 安装 pnpm 包管理器
4. 安装项目依赖
5. 构建项目
6. 自动部署到 Vercel 平台（使用 `amondnet/vercel-action`）

## 配置与使用说明

### GitHub Actions 配置文件详解

#### CI 配置 (`ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    # 执行步骤...
```

- **name**: 工作流名称
- **on**: 定义触发条件（push、pull_request）
- **jobs**: 定义要执行的任务集合
- **runs-on**: 指定运行环境（ubuntu-latest）
- **steps**: 定义任务的具体步骤

#### CD 配置 (`cd.yml`)

```yaml
name: CD

on:
  push:
    branches: [ main, master ]

jobs:
  deploy-to-vercel:
    # 配置...
```

- 仅在推送到主分支时触发
- 使用 Vercel Action 进行自动化部署
- 需要配置 Vercel 相关密钥

### 环境配置要求

1. **Node.js 版本**: v20
2. **包管理器**: pnpm
3. **构建工具**: Vite (通过 Nuxt 集成)
4. **部署平台**: Vercel

## 如何修改和扩展 CI/CD 流水线

### 添加测试步骤

在 `ci.yml` 中添加测试步骤：

```yaml
- name: 运行测试
  run: pnpm test
```

### 添加代码风格检查

在 `ci.yml` 中添加 ESLint 或 Prettier 检查：

```yaml
- name: 运行代码风格检查
  run: pnpm run lint
```

### 部署到其他平台

如果需要部署到其他平台，可以修改 `cd.yml` 文件，例如部署到 GitHub Pages：

```yaml
- name: 部署到 GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

## 常见问题排查

### 构建失败

1. **检查依赖问题**:
   - 确认 `package.json` 中的依赖版本兼容
   - 尝试清理缓存后重新安装

2. **TypeScript 类型错误**:
   - 修复所有 TypeScript 编译错误
   - 检查类型声明文件

### 部署失败

1. **Vercel 凭证问题**:
   - 确认 `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 已正确配置
   - 检查凭证是否过期

2. **构建产物问题**:
   - 确认构建步骤正确生成了 `.output` 或 `dist` 目录
   - 检查 Nuxt 配置中的构建设置

## 最佳实践

1. **保持构建快速**: 优化依赖安装和构建过程，使用缓存
2. **全面的测试**: 确保 CI 流程包含单元测试、集成测试等
3. **环境一致性**: 在开发、测试和生产环境中保持一致的配置
4. **安全性**: 不要在代码中硬编码敏感信息，使用环境变量和密钥管理
5. **监控与通知**: 配置构建失败通知（邮件、Slack 等）

## 进一步学习资源

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Nuxt.js 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [Vercel 部署文档](https://vercel.com/docs)
