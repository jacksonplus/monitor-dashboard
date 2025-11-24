# Nuxt Monitor Dashboard

## 安装 & 运行 & 构建 & 预览

```bash
pnpm install

pnpm dev

pnpm build

pnpm preview
```

## 路由设计参考

目前监控SDK能力如下：

1. initBehavior（用户行为）
2. initError（错误监控）
3. initPerformance（首次加载性能）
4. initNetworkPerformance（接口/资源请求性能）
5. initMemoryMonitor（内存监控）
6. initFPSMonitor（帧率监控）

---

### 🎯 最佳菜单分组方案（推荐版）

把六个监控功能按照「同类型的数据」合并成以下 5 个大类：

---

### **① Errors（错误监控）**

对应：**initError**

包含内容：

* JS 错误趋势图（line）
* Vue 错误占比（pie）
* Error 列表（table）
* 单条错误详情（detail）

**为什么独立：**
错误类数据最关键、业务特征最强，必须单独放。

---

### **② Performance（性能监控）**

对应：**initPerformance**

包含：

* 白屏、首屏、TTFB、DOMContentLoaded 变化趋势
* 页面加载耗时（timeline chart）
* FPS 与 Memory 不属于这里（有更合适的位置）

**为什么独立：**
首次加载 / 渲染性能是最典型的前端核心指标，应该作为一级菜单。

---

### **③ Network（接口 & 资源请求性能）**

对应：**initNetworkPerformance**

包含：

* 接口成功率 / 失败率（pie）
* 接口耗时趋势（line）
* 某个接口的耗时分布（histogram）
* 接口列表（table）

**为什么要独立？**
接口监控非常独立，属于 APDEX / API 性能分析范畴。

---

### **④ Runtime（运行时监控）**

对应：**initMemoryMonitor + initFPSMonitor**

包括：

* FPS 波动图（line）
* 内存占用（heap usage）
* 卡顿时段标记（interval chart）

**为什么合并？**
FPS 与 Memory 都属于浏览器“运行时表现”。

所以不适合放在 Performance（加载性能）里。

---

### **⑤ Behavior（用户行为）**

对应：**initBehavior**

包括：

* 点击行为统计
* 页面跳转路径
* 用户在页面停留时间
* 关键行为轨迹分析（如果有）

**为什么最后放？**
行为数据通常不是核心监控，而是辅助分析。

---

### 🔥 建议（适合你的 Nuxt 项目 + 初版后台）

用下面这个：

```
Dashboard
Errors
Performance
Network
Runtime
Behavior
```

**原因：概念清晰、页面结构利于扩展、不会太重，初版最稳。**

## 页面设计参考

### Dashboard
```
Dashboard
  ├── Error Overview
  │    - 错误趋势
  │    - 错误占比
  ├── Performance Overview
  │    - FCP / LCP / TTFB / FP 卡片
  │    - 页面加载趋势
  ├── Network Overview
  │    - 接口成功率
  │    - 平均耗时
  ├── Runtime Overview
  │    - FPS 趋势
  │    - 内存趋势
  └── Behavior Overview
       - 最常见用户行为
       - PV/UV
```

### 错误监控页面
下面我给你一份**行业标准级别**的错误监控图表设计方案，基于 Sentry / Fundebug / ARMS / Datadog 等成熟平台总结而来。

这份清单是你在 “Errors” 页面应该绘制的**全量图表**（不是 Dashboard 摘要版，是完整错误监控页）。

---

#### 🎯 Errors（错误监控）应该包含的图表

这是前端监控平台行业内最标准、最重要的 **6 张图表 + 1 个列表**。

下面我会告诉你：

* 每张图表的意义
* 为啥必须要有
* 你是否能用你现有的 SDK 实现它

---

#### ⭐ ① 错误趋势图（Error Trend）【折线图 Line】

**展示内容：**

* 每分钟/小时的错误数量变化

**为什么重要：**

* 用来判断是否出现“突发错误”（最关键功能）
* 典型场景：某个版本发布导致错误暴增

**数据结构你已有：**
`timestamp`

**图表类型：**
ECharts line chart

---

#### ⭐ ② 错误类型分布（Error Type Distribution）【饼图 Pie】

**分类方式：**
按照你上报的：

* `type`（JS、Promise、Vue、Resource...）
* `subType`（vue、react、xhr、fetch 等）

**为什么重要：**

* 帮你判断错误来源
  例如：Vue 错误偏多 = 某个组件出问题

**图表类型：**
ECharts pie

---

#### ⭐ ③ Top 10 错误（按 message 分组）【条形图 Bar】

**展示内容：**
按错误 message 分组
统计出现次数，并排序

**例如：**

* Cannot read property of undefined — 521 次
* Failed to fetch — 312 次
* Vue warn: ... — 123 次

**为什么重要：**

* 错误重复次数最多的，就是你最该修复的

**图表类型：**
ECharts bar（horizontal）

---

#### ⭐ ④ Top 10 影响页面（按 URL 分组）【条形图 Bar】

**展示内容：**
统计哪个页面发生的错误最多
按 `url` 分组

**为什么重要：**

* 帮你定位哪个页面最不稳定
* 例如： /order/create 出现最多错误 → 重点修复

**你现有 SDK 数据可支持：**
`url`

**图表类型：**
ECharts bar（horizontal）

---

#### ⭐ ⑤ 错误来源设备 / 浏览器分布【饼图 Pie】

依据：

* `userAgent`

你可以解析出：

* 浏览器（chrome、safari、firefox…）
* OS（iOS、Android、Windows、Mac）

**为何重要：**

* 有些错误只发生在某些浏览器
  例如：Safari 下 Promise 错误很多

**图表类型：**
Pie / Donut

---

#### ⭐ ⑥ 错误速率（Error Rate）【折线图 Line】

设定：错误数 / PV

如果你有行为上报（initBehavior）
→ 你可以计算出 PV（访问量）

**为什么重要：**
错误数量不等于错误率！

例如：

* 日 PV 10 万，错误 100 → 超健康
* 日 PV 1k，错误 100 → 灾难级

**图表类型：**
Line chart（错误率百分比）

---

#### ⭐ ⑦ 错误事件列表（必须有）【表格 Table】

必须包含：

| 字段         | 数据来源            |
| ---------- | --------------- |
| 错误类型       | type            |
| 错误子类型      | subType         |
| 错误 message | message         |
| 发生页面       | url             |
| 发生时间       | timestamp       |
| 浏览器        | ua 解析           |
| 查看详情按钮     | 进入 error detail |

**这是最重要的调试入口。**

---

#### 🧩 Errors 页面完整结构（推荐布局）

你可以做成这样👇

```
Errors
├── 错误趋势（line）
├── 错误类型分布（pie）
├── Top 10 错误（bar）
├── Top 10 页面（bar）
├── 浏览器分布（pie）
├── 错误率（line）
└── 错误列表（table）
```

顺序也很合理：

* 趋势 → 先看有没有异常
* 分布 → 看是什么类型
* Top10 → 看优先解决什么
* 页面的分布 → 看影响范围
* 设备分布 → 看出现在哪些用户
* 错误率 → 全局健康度
* 列表 → 具体分析

---

#### 🎯 最终回答总结（一句话）

在 Errors 页面，你应该绘制：

**趋势 + 类型分布 + Top10 错误 + Top10 页面 + 浏览器分布 + 错误率 + 错误列表**

共 6 张图表 + 1 个列表，这是标准行业配置。
