# @navfolio/page-template

这是一个给 Navfolio 贡献者使用的自定义页面模块模板。它展示了如何创建一个可以被
`@navfolio/pages` 识别的 page module，并通过 Astro `injectRoute` 注入一个简单页面。

English documentation is available in [README.en.md](./README.en.md).

## 适合谁使用

如果你想为 Navfolio 增加一个新的页面能力，例如：

- Gallery 图片墙
- Resume 简历页
- Links 友链页
- Uses 工具页
- Reading 书影音页

可以从这个模板开始。

## 文件结构

```txt
src/
  index.ts
  routes/
    hello.astro
```

- `src/index.ts` 导出模块工厂 `templatePageModule()`。
- `src/routes/hello.astro` 是一个最小 Astro 页面入口，会被模块声明中的 `routes` 注入。

## 模块工厂

模板中的核心代码：

```ts
export function templatePageModule(options = {}) {
  const route = options.route ?? '/hello-page';

  return {
    id: 'template',
    enabled: options.enabled,
    route,
    nav: {
      label: 'Hello',
      href: route,
    },
    collections: [],
    routes: [
      {
        entrypoint: new URL('./routes/hello.astro', import.meta.url),
        prerender: true,
      },
    ],
    scaffold: {
      command: 'hello',
      collection: 'template',
      directory: 'src/content/template',
      defaultExtension: 'md',
      template: 'article',
    },
  };
}
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `id` | 模块唯一标识，例如 `gallery`、`resume`。 |
| `enabled` | 设为 `false` 时禁用模块。 |
| `route` | 页面默认路由。 |
| `nav` | 导航默认文案和链接。 |
| `collections` | 模块需要的内容集合名称。没有内容集合可以留空。 |
| `routes` | Astro route entrypoint 列表。 |
| `scaffold` | 内容脚手架配置，可选。 |

## 在 Navfolio 中使用

安装包后，在 `navfolio.config.ts` 中注册：

```ts
import { pages } from '@navfolio/pages';
import { templatePageModule } from '@navfolio/page-template';
import { markdownPlugin } from '@navfolio/plugin-markdown';

import { defineNavfolioConfig } from './src/plugins/config';

export default defineNavfolioConfig({
  plugins: [markdownPlugin(), pages()],
  modules: [
    templatePageModule({
      route: '/hello',
    }),
  ],
});
```

如果你想在 `site.toml` 顶部导航中显示它：

```toml
[[config.topNav.links]]
label = "Hello"
module = "template"
```

## 内容脚手架

如果模块声明了 `scaffold`，Navfolio 的通用内容脚本会识别它：

```bash
bun run content:new -- hello first-note
```

这会在 `src/content/template/first-note.md` 创建一个文章模板。

## 开发步骤

1. 修改 `package.json` 中的包名。
2. 修改 `templatePageModule()` 的函数名、`id`、默认 `route` 和 `nav.label`。
3. 替换 `src/routes/hello.astro` 为你的页面。
4. 如果需要内容集合，在模块中填写 `collections`，并在宿主项目中提供对应 schema。
5. 运行构建：

```bash
bun install
bun run build
```

## 设计建议

- 页面模块应该只暴露清晰的配置入口，不要要求用户手动改主模板内部文件。
- 页面 route、内容目录、脚手架命令应该放在模块配置里。
- 页面文案、导航展示顺序可以交给 `site.toml`。
- 如果你的模块需要复杂组件，尽量把组件放在包内，减少对宿主项目内部路径的依赖。
