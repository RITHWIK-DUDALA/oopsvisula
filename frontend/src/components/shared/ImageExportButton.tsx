import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Check, Image as ImageIcon, Loader2, FileCode, Sparkles } from 'lucide-react';
import { downloadElementAsImage } from '@/services/export/imageExporter';

export interface ImageExportButtonProps {
  getTargetElement: () => HTMLElement | SVGElement | null;
  fileName?: string;
  className?: string;
  variant?: 'compact' | 'normal' | 'icon';
  onExportJson?: () => void;
}

export const ImageExportButton: React.FC<ImageExportButtonProps> = ({
  getTargetElement,
  fileName = 'oops-lab-diagram',
  className = '',
  variant = 'compact',
  onExportJson,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Position portal menu right below button
  const updateMenuPosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 190;
    // Align right edge of menu with right edge of button, or left if not enough space
    let left = rect.right - menuWidth;
    if (left < 10) left = rect.left;
    const top = rect.bottom + 6;

    setMenuCoords({ top, left });
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updateMenuPosition();
    }
    setIsOpen((prev) => !prev);
  };

  // Close dropdown on outside click or window resize/scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen]);

  const handleExport = async (format: 'png' | 'jpg' | 'svg') => {
    const target = getTargetElement();
    if (!target) {
      console.warn('Export target element not found');
      return;
    }

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
    <>
      <div data-no-export="true" className={`inline-block ${className}`}>
        {variant === 'icon' ? (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            disabled={isExporting}
            title="Export 2D Diagram (PNG, JPG, SVG, JSON)"
            className="p-1.5 rounded-md border border-[#DCE2EA] hover:border-[#172033] bg-white text-[#172033] text-xs font-mono transition-all shrink-0 cursor-pointer disabled:opacity-50 shadow-2xs hover:shadow-xs active:scale-95"
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1749C8]" />
            ) : exportedFormat ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
          </button>
        ) : (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            disabled={isExporting}
            title="Export 2D Diagram (PNG, JPG, SVG)"
            className={`inline-flex items-center space-x-1.5 rounded-lg border border-border bg-white text-foreground hover:bg-surface transition-all cursor-pointer disabled:opacity-50 shadow-2xs hover:shadow-xs active:scale-95 ${
              variant === 'compact'
                ? 'px-2 py-1 text-xs font-mono'
                : 'px-2.5 py-1.5 text-xs font-medium'
            }`}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#075CF5]" />
            ) : exportedFormat ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
            )}
            <span>{isExporting ? 'Exporting...' : exportedFormat ? 'Downloaded' : 'Export'}</span>
          </button>
        )}
      </div>

      {/* Portal Dropdown Menu: Attached directly to document.body to prevent parent clipping */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: `${menuCoords.top}px`,
              left: `${menuCoords.left}px`,
              zIndex: 99999,
            }}
            className="w-48 rounded-xl bg-white border border-[#DCE2EA] shadow-2xl p-1.5 text-xs font-mono select-none animate-in fade-in zoom-in-95 duration-100 text-[#172033]"
          >
            <div className="px-2.5 py-1 text-[10px] text-[#64748B] uppercase tracking-wider font-bold border-b border-[#F1F5F9] mb-1 flex items-center justify-between">
              <span>Export Format</span>
              <span className="text-[9px] text-[#1749C8]">2D DIAGRAM</span>
            </div>

            {/* PNG Export */}
            <button
              type="button"
              onClick={() => handleExport('png')}
              disabled={isExporting}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between text-[#172033] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#075CF5] group-hover:scale-110 transition-transform" />
                <span className="font-medium">PNG (Crisp 2x)</span>
              </div>
              {exportedFormat === 'png' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            {/* JPG Export */}
            <button
              type="button"
              onClick={() => handleExport('jpg')}
              disabled={isExporting}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between text-[#172033] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#EA580C] group-hover:scale-110 transition-transform" />
                <span className="font-medium">JPG (Standard)</span>
              </div>
              {exportedFormat === 'jpg' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            {/* SVG Vector Export */}
            <button
              type="button"
              onClick={() => handleExport('svg')}
              disabled={isExporting}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between text-[#172033] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">SVG Vector</span>
              </div>
              {exportedFormat === 'svg' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            {/* JSON Workspace Export (if provided) */}
            {onExportJson && (
              <>
                <div className="my-1 border-t border-[#F1F5F9]" />
                <button
                  type="button"
                  onClick={() => {
                    onExportJson();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between text-[#172033] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-3.5 h-3.5 text-[#64748B] group-hover:scale-110 transition-transform" />
                    <span>JSON (Workspace)</span>
                  </div>
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
};
