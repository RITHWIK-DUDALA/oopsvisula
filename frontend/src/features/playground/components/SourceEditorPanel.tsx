import React, { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import {
  Copy,
  Check,
  AlignLeft,
  WrapText,
  FileCode,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSettingsStore } from '@/services/storage/settingsStore';

type MonacoEditor = Parameters<OnMount>[0];
type MonacoInstance = Parameters<OnMount>[1];

export const SourceEditorPanel: React.FC = () => {
  const { currentTrace, getCurrentEvent } = useSimulationStore();
  const { editorFontSize, editorMinimap, editorLineNumbers } = useSettingsStore();

  const [copied, setCopied] = useState(false);
  const [isWordWrap, setIsWordWrap] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  const editorRef = useRef<MonacoEditor | null>(null);
  const monacoRef = useRef<MonacoInstance | null>(null);
  const decorationsRef = useRef<string[]>([]);

  const event = getCurrentEvent();
  const currentLine = event ? event.line : 1;

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;

    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      });
    });
  };

  // Synchronize active execution line decoration whenever event changes
  useEffect(() => {
    const editor = editorRef.current;
    const monacoInstance = monacoRef.current;
    if (!editor || !monacoInstance) return;

    if (currentLine && currentLine > 0) {
      // Reveal active line in center
      editor.revealLineInCenterIfOutsideViewport(currentLine);

      // Apply subtle neutral execution line highlight and gutter marker
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
        {
          range: new monacoInstance.Range(currentLine, 1, currentLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-[#EEEEEE]/80 border-l-[3px] border-[#171717]',
            glyphMarginClassName: 'bg-[#171717]',
          },
        },
      ]);
    } else {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [currentLine]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTrace.sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFormat = () => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  };

  const getFileName = () => {
    if (currentTrace.id.includes('bank')) return 'BankAccount.java';
    if (currentTrace.id.includes('shape')) return 'ShapeHierarchy.java';
    if (currentTrace.id.includes('composition')) return 'CarComposition.java';
    if (currentTrace.id.includes('record')) return 'PointRecord.java';
    return `${currentTrace.programTitle.split(' ')[0]}.java`;
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-[#E8E8E8] select-none overflow-hidden">
      {/* Editor Header per Section 8 */}
      <div className="h-10 px-4 border-b border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <FileCode className="w-3.5 h-3.5 text-[#171717] stroke-[1.5]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
            Source Code
          </span>
          <span className="text-[#D8D8D8]">•</span>
          <span className="text-xs font-mono font-medium text-[#666666]">
            {getFileName()}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E8E8E8] text-[#171717] font-semibold">
            Java 21
          </span>

          <button
            type="button"
            onClick={() => setIsWordWrap(!isWordWrap)}
            title={isWordWrap ? 'Disable word wrap (horizontal scroll)' : 'Enable word wrap'}
            className={`p-1.5 rounded transition-colors ${
              isWordWrap
                ? 'bg-[#171717] text-white'
                : 'text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE]'
            }`}
          >
            <WrapText className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <button
            type="button"
            onClick={handleFormat}
            title="Format Java code"
            className="p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
          >
            <AlignLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy code to clipboard"
            className="p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#287A4B] stroke-[2]" />
            ) : (
              <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="light"
          value={currentTrace.sourceCode}
          onMount={handleEditorDidMount}
          options={{
            readOnly: false,
            minimap: { enabled: editorMinimap },
            fontSize: editorFontSize || 13,
            lineNumbers: editorLineNumbers ? 'on' : 'off',
            scrollBeyondLastLine: false,
            wordWrap: isWordWrap ? 'on' : 'off',
            renderLineHighlight: 'none',
            folding: true,
            automaticLayout: true,
            tabSize: 4,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
          }}
        />
      </div>

      {/* Editor Footer Status Bar per Section 8 */}
      <div className="h-6 px-3 bg-[#FAFAFA] border-t border-[#E8E8E8] flex items-center justify-between text-[11px] font-mono text-[#777777] shrink-0">
        <div className="flex items-center space-x-2">
          <span>Java 21</span>
          <span>•</span>
          <span>UTF-8</span>
          {event && (
            <>
              <span>•</span>
              <span className="font-semibold text-[#171717]">
                Executing Line {event.line}
              </span>
            </>
          )}
        </div>
        <div>
          Line {cursorPosition.line}, Column {cursorPosition.column}
        </div>
      </div>
    </div>
  );
};
