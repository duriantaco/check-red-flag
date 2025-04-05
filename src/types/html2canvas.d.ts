interface Window {
    html2canvas: (element: HTMLElement, options?: Html2CanvasOptions) => Promise<HTMLCanvasElement>;
  }
  
  interface Html2CanvasOptions {
    scale?: number;
    backgroundColor?: string;
    logging?: boolean;
    useCORS?: boolean;
    allowTaint?: boolean;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    scrollX?: number;
    scrollY?: number;
    foreignObjectRendering?: boolean;
    removeContainer?: boolean;
    windowWidth?: number;
    windowHeight?: number;
    ignoreElements?: (element: HTMLElement) => boolean;
    onclone?: (document: Document) => void;
    proxy?: string;
    imageTimeout?: number;
  }