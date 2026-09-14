declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options: any);
    loadFromImages(images: string[]): void;
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    flipNext(): void;
    flipPrev(): void;
    flip(page: number): void;
    on(event: string, callback: (e: any) => void): void;
    destroy(): void;
  }
}
