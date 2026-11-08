/**
 * Image Exporter Service (Local-First / Zero-Cloud)
 * Converts any DOM / SVG visualizer component into PNG, JPG, or SVG downloads.
 * 100% self-contained in the browser using HTML5 Canvas & SVG ForeignObject.
 */

export interface ExportImageOptions {
  fileName?: string;
  format?: 'png' | 'jpg' | 'svg';
  backgroundColor?: string;
  scale?: number; // 2x for crisp Retina resolution
  quality?: number; // 0.95 for JPEG
}

/**
 * Inlines computed styles from source DOM tree into the cloned DOM tree
 * so that SVG foreignObject retains 100% accurate colors, fonts, and geometry.
 */
function inlineComputedStyles(source: Element, target: Element): void {
  const sourceNodes = [source, ...Array.from(source.querySelectorAll('*'))];
  const targetNodes = [target, ...Array.from(target.querySelectorAll('*'))];

  const visualProps = [
    'background',
    'background-color',
    'color',
    'font-family',
    'font-size',
    'font-weight',
    'line-height',
    'letter-spacing',
    'text-align',
    'text-transform',
    'border',
    'border-width',
    'border-style',
    'border-color',
    'border-radius',
    'box-shadow',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'margin',
    'display',
    'flex-direction',
    'align-items',
    'justify-content',
    'flex-wrap',
    'gap',
    'grid-template-columns',
    'width',
    'height',
    'min-width',
    'min-height',
    'box-sizing',
    'position',
    'top',
    'left',
    'right',
    'bottom',
    'opacity',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'white-space',
  ];

  const count = Math.min(sourceNodes.length, targetNodes.length);
  for (let i = 0; i < count; i++) {
    const srcEl = sourceNodes[i] as HTMLElement;
    const tgtEl = targetNodes[i] as HTMLElement;
    if (!srcEl || !tgtEl || !tgtEl.style) continue;

    const computed = window.getComputedStyle(srcEl);
    for (const prop of visualProps) {
      const val = computed.getPropertyValue(prop);
      if (val && val !== 'none' && val !== 'normal' && val !== 'auto') {
        tgtEl.style.setProperty(prop, val);
      }
    }

    // Ensure child SVGs have proper XML namespaces
    if (srcEl.tagName.toLowerCase() === 'svg') {
      tgtEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
  }
}

/**
 * Generates an SVG string representation of an HTML or SVG element
 */
export function generateSvgData(
  element: HTMLElement | SVGElement,
  backgroundColor: string = '#FFFFFF'
): { svgData: string; width: number; height: number } {
  const rect = element.getBoundingClientRect();
  const width = Math.max(200, Math.ceil(rect.width) || (element as HTMLElement).offsetWidth || 1000);
  const height = Math.max(200, Math.ceil(rect.height) || (element as HTMLElement).offsetHeight || 700);

  let svgData: string;

  if (element.tagName.toLowerCase() === 'svg') {
    const cloneSvg = element.cloneNode(true) as SVGElement;
    cloneSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    cloneSvg.setAttribute('width', `${width}`);
    cloneSvg.setAttribute('height', `${height}`);
    inlineComputedStyles(element, cloneSvg);
    const serializer = new XMLSerializer();
    svgData = serializer.serializeToString(cloneSvg);
  } else {
    const clone = element.cloneNode(true) as HTMLElement;
    inlineComputedStyles(element, clone);

    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';

    // Strip UI overlays, buttons, minimaps from output
    clone
      .querySelectorAll('[data-no-export="true"], .react-flow__controls, .react-flow__minimap, .react-flow__attribution')
      .forEach((el) => el.remove());

    const serializer = new XMLSerializer();
    let serializedHtml = serializer.serializeToString(clone);

    // Sanitize non-standard entities that break strict XML parsers in browser Image()
    serializedHtml = serializedHtml
      .replace(/&nbsp;/g, '&#160;')
      .replace(/&times;/g, '&#215;')
      .replace(/&copy;/g, '&#169;');

    svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; box-sizing: border-box; background: ${backgroundColor};">
            ${serializedHtml}
          </div>
        </foreignObject>
      </svg>
    `.trim();
  }

  return { svgData, width, height };
}

/**
 * Downloads a DOM or SVG element as PNG, JPG, or SVG
 */
export async function downloadElementAsImage(
  element: HTMLElement | SVGElement,
  options: ExportImageOptions = {}
): Promise<void> {
  const {
    fileName = 'oops-lab-diagram',
    format = 'png',
    backgroundColor = '#FFFFFF',
    scale = 2,
    quality = 0.95,
  } = options;

  const { svgData, width, height } = generateSvgData(element, backgroundColor);

  // If format is SVG, download directly without rasterization
  if (format === 'svg') {
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    triggerDownload(url, `${fileName}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return;
  }

  // For PNG or JPG: rasterize through HTML5 Canvas
  return new Promise<void>((resolve) => {
    // Use data URI with percent-encoding to prevent cross-origin taint in Chromium
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          fallbackDownloadSvg(svgData, fileName);
          resolve();
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scale, scale);

        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        triggerDownload(dataUrl, `${fileName}.${format}`);
        resolve();
      } catch (err) {
        console.warn('Canvas rasterization blocked by security sandbox, falling back to SVG:', err);
        fallbackDownloadSvg(svgData, fileName);
        resolve();
      }
    };

    img.onerror = () => {
      // In case browser Image fails to parse foreignObject, fallback to direct SVG download
      console.warn('Image rasterization failed, downloading SVG vector fallback.');
      fallbackDownloadSvg(svgData, fileName);
      resolve();
    };

    img.src = dataUri;
  });
}

function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function fallbackDownloadSvg(svgData: string, fileName: string): void {
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `${fileName}.svg`);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
