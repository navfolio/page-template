import { defineI18nContribution } from '@navfolio/core';
export const templateI18n = defineI18nContribution({
    messages: {
        en: {
            template: {
                documentTitle: 'Hello Navfolio Page Module',
                eyebrow: 'Navfolio Page Module',
                heading: 'Hello from a custom page module.',
                description: 'This route is injected from @navfolio/page-template. Replace this Astro entrypoint with your own layout, data, and styles.',
                defaultRoute: 'Default route', buildDate: 'Build date',
            },
        },
        'zh-CN': {
            template: {
                documentTitle: 'Navfolio 页面模块示例', eyebrow: 'Navfolio 页面模块', heading: '来自自定义页面模块的问候。',
                description: '这个路由由 @navfolio/page-template 注入。可将这个 Astro 入口替换为自己的布局、数据与样式。',
                defaultRoute: '默认路由', buildDate: '构建日期',
            },
        },
        'zh-TW': {
            template: {
                documentTitle: 'Navfolio 頁面模組範例', eyebrow: 'Navfolio 頁面模組', heading: '來自自訂頁面模組的問候。',
                description: '這個路由由 @navfolio/page-template 注入。可將這個 Astro 入口替換為自己的版面、資料與樣式。',
                defaultRoute: '預設路由', buildDate: '建置日期',
            },
        },
    },
});
