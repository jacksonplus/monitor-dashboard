# CI/CD 环境配置说明

## GitHub Secrets 配置

要使CD流水线正常工作，需要在GitHub仓库中配置以下密钥：

### 获取 Vercel 凭证

1. **VERCEL_TOKEN**:
   - 登录 [Vercel 控制台](https://vercel.com/dashboard)
   - 转到 Settings > Tokens
   - 创建一个新的Token，并保存其值

2. **VERCEL_ORG_ID**:
   - 登录 Vercel 控制台
   - 转到 Settings > General
   - 复制组织ID

3. **VERCEL_PROJECT_ID**:
   - 登录 Vercel 控制台
   - 选择你的项目
   - 转到 Settings > General
   - 复制项目ID

### 在 GitHub 中设置密钥

1. 打开你的 GitHub 仓库
2. 转到 Settings > Secrets and variables > Actions
3. 点击 "New repository secret"
4. 分别添加以下密钥：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## 自定义环境变量

如果项目需要特定的环境变量，可以在 `.env` 文件中配置，或直接在 GitHub Secrets 中设置，并在工作流文件中引用。
