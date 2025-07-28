declare module "dom-to-pdf" {
  interface DomToPdfOptions {
    filename?: string;
    style?: string;
    page?: {
      margin?: number;
      format?: string;
    };
    ignoreElements?: HTMLElement[];
  }

  const domToPdf: (element: HTMLElement, options?: DomToPdfOptions) => void;

  export default domToPdf;
}
