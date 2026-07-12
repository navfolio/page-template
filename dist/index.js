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
