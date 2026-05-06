import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Template {
    id: bigint;
    title: string;
    tags: Array<string>;
    preview_image: string;
    category: string;
    prompt: string;
}
export interface backendInterface {
    addTemplate(title: string, preview_image: string, prompt: string, category: string, tags: Array<string>): Promise<Template>;
    deleteTemplate(id: bigint): Promise<boolean>;
    getTemplate(id: bigint): Promise<Template | null>;
    getTemplates(): Promise<Array<Template>>;
    updateTemplate(id: bigint, title: string, preview_image: string, prompt: string, category: string, tags: Array<string>): Promise<Template | null>;
}
