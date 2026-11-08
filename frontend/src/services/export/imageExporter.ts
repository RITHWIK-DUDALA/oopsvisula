/**
 * Image Exporter Service (Local-First / Zero-Cloud)
 * Enables exporting any 2D visualizer or diagram component as PNG or JPG.
 * Utilizes standard HTML5 Canvas and SVG ForeignObject serialization
 * without requiring any external server, cloud API, or third-party binary.
 */

export interface ExportImageOptions {
  fileName?: string;
  format?: 'png' | 'jpg';
  backgroundColor?: string;
  scale?: number; // 2x for Retina / HiDPI crispness
  quality?: number; // 0.95 for JPEG
}

/**
 * Inlines computed styles from source elements into cloned elements
 * so that SVG foreignObject retains 100% accurate styling, colors, and fonts.
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
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
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
    'row-gap',
    'column-gap',
    'grid-template-columns',
    'grid-template-rows',
    'width',
    'height',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
    'box-sizing',
    'position',
    'opacity',
    'overflow',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-dasharray',
    'white-space',
  ];

  for (let i = 0; i < sourceNodes.length; i++) {
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

    // Ensure SVGs carry required xmlns attributes
    if (srcEl.tagName.toLowerCase() === 'svg') {
      tgtEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
  }
}

/**
 * Exports a DOM node or SVG element to a PNG or JPG Data URL
 */
export async function exportElementAsDataUrl(
  element: HTMLElement | SVGElement,
  options: ExportImageOptions = {}
): Promise<string> {
  const {
    format = 'png',
    backgroundColor = '#FFFFFF',
    scale = 2,
    quality = 0.95,
  } = options;

  const rect = element.getBoundingClientRect();
  const width = Math.max(100, Math.ceil(rect.width) || (element as HTMLElement).offsetWidth || 800);
  const height = Math.max(100, Math.ceil(rect.height) || (element as HTMLElement).offsetHeight || 600);

  let svgData: string;

  if (element.tagName.toLowerCase() === 'svg') {
    // Pure SVG Element
    const cloneSvg = element.cloneNode(true) as SVGElement;
    cloneSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    cloneSvg.setAttribute('width', `${width}`);
    cloneSvg.setAttribute('height', `${height}`);
    inlineComputedStyles(element, cloneSvg);
    const serializer = new XMLSerializer();
    svgData = serializer.serializeToString(cloneSvg);
  } else {
    // HTML Element with potential child SVGs (foreignObject encapsulation)
    const clone = element.cloneNode(true) as HTMLElement;
    inlineComputedStyles(element, clone);

    // Ensure no scrollbars or clipped borders in the clone
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';

    // Strip out interactive floating controls / export buttons marked with data-no-export
    clone.querySelectorAll('[data-no-export="true"], .react-flow__controls, .react-flow__minimap, .react-flow__attribution').forEach((el) => el.remove());

    const serializer = new XMLSerializer();
    const serializedHtml = serializer.serializeToString(clone);

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

  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          reject(new Error('HTML5 Canvas 2D context not available'));
          return;
        }

        // Optional image smoothing for crisp vector rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scale, scale);

        // Fill background (ensures JPG is not black and PNG has solid background)
        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(blobUrl);

        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error(`Failed to rasterize diagram into Image: ${err}`));
    };

    img.src = blobUrl;
  });
}

/**
 * Downloads a DOM element or SVG element as a PNG or JPG file
 */
export async function downloadElementAsImage(
  element: HTMLElement | SVGElement,
  options: ExportImageOptions = {}
): Promise<void> {
  const {
    fileName = 'oops-lab-diagram',
    format = 'png',
  } = options;

  const dataUrl = await exportElementAsDataUrl(element, options);
  const link = document.createElement('a');
  link.download = `${fileName}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
