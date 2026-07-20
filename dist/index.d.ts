export interface TemplatePageModuleOptions {
    enabled?: boolean;
    route?: string;
}
export declare function templatePageModule(options?: TemplatePageModuleOptions): {
    id: string;
    enabled: boolean | undefined;
    route: string;
    nav: {
        label: string;
        href: string;
    };
    collections: never[];
    i18n: import("@navfolio/core").NavfolioI18nContribution;
    routes: {
        entrypoint: URL;
        prerender: boolean;
    }[];
    scaffold: {
        command: string;
        collection: string;
        directory: string;
        defaultExtension: string;
        template: string;
    };
};
//# sourceMappingURL=index.d.ts.map