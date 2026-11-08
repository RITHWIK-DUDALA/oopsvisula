import React, { useState, useRef, useEffect } from 'react';
import { Download, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { downloadElementAsImage } from '@/services/export/imageExporter';

export interface ImageExportButtonProps {
  getTargetElement: () => HTMLElement | SVGElement | null;
  fileName?: string;
  className?: string;
  variant?: 'compact' | 'normal';
}

export const ImageExportButton: React.FC<ImageExportButtonProps> = ({
  getTargetElement,
  fileName = 'oops-lab-diagram',
  className = '',
  variant = 'compact',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<'png' | 'jpg' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleExport = async (format: 'png' | 'jpg') => {
    const target = getTargetElement();
    if (!target) return;

    try {
      setIsExporting(true);
      await downloadElementAsImage(target, {
        fileName,
        format,
        backgroundColor: '#FFFFFF',
        scale: 2,
        quality: 0.95,
      });
      setExportedFormat(format);
      setTimeout(() => {
        setExportedFormat(null);
        setIsOpen(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={menuRef}
      data-no-export="true"
      className={`relative inline-block text-left ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isExporting}
        title="Export 2D Diagram (PNG / JPG)"
        className={`inline-flex items-center space-x-1.5 rounded-lg border border-border bg-white text-foreground hover:bg-surface transition-colors cursor-pointer disabled:opacity-50 ${
          variant === 'compact'
            ? 'px-2 py-1 text-xs font-mono'
            : 'px-2.5 py-1.5 text-xs font-medium'
        }`}
      >
        {isExporting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
        ) : exportedFormat ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Download className="w-3.5 h-3.5 text-muted-foreground" />
        )}
        <span>{isExporting ? 'Exporting...' : exportedFormat ? 'Downloaded' : 'Export'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white border border-border shadow-lg p-1 z-50 text-xs font-mono animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2 py-1 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold border-b border-border mb-1">
            Image Format
          </div>

          <button
            type="button"
            onClick={() => handleExport('png')}
            disabled={isExporting}
            className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-surface flex items-center justify-between text-foreground transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span>PNG (Crisp 2x)</span>
            </div>
            {exportedFormat === 'png' && <Check className="w-3 h-3 text-emerald-600" />}
          </button>

          <button
            type="button"
            onClick={() => handleExport('jpg')}
            disabled={isExporting}
            className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-surface flex items-center justify-between text-foreground transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span>JPG (Standard)</span>
            </div>
            {exportedFormat === 'jpg' && <Check className="w-3 h-3 text-emerald-600" />}
          </button>
        </div>
      )}
    </div>
  );
};
