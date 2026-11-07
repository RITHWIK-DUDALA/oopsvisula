import React, { useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FileCode, X, Play, AlertCircle, RefreshCw } from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

interface JavaEditorProps {
  targetLine?: number | null;
  onRunCode?: () => void;
}

export const JavaEditor: React.FC<JavaEditorProps> = ({ targetLine, onRunCode }) => {
  const { 
    projectFiles, 
    activeFileId, 
    setActiveFileId, 
    updateFileContent, 
    deleteProjectFile,
    compilationError,
    compileAndExecute,
    isPlaying,
    currentTrace,
    currentStepIndex,
    breakpoints,
    toggleBreakpoint,
    isStale,
  } = useSimulationStore();

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const activeFile = projectFiles.find((f) => f.id === activeFileId) || projectFiles[0];
  const currentEvent = currentTrace?.events?.[currentStepIndex] || null;

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configure clean theme & typography
    monaco.editor.defineTheme('oops-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'type', foreground: '267F99' },
        { token: 'string', foreground: 'A31515' },
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'number', foreground: '098658' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#111827',
        'editorLineNumber.foreground': '#9CA3AF',
        'editorLineNumber.activeForeground': '#111827',
        'editor.selectionBackground': '#E0E7FF',
        'editor.inactiveSelectionBackground': '#F3F4F6',
        'editor.lineHighlightBackground': '#F9FAFB',
      },
    });

    monaco.editor.setTheme('oops-light');

    // Gutter click listener for breakpoint toggling
    editor.onMouseDown((e) => {
      if (
        e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN ||
        e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS
      ) {
        const line = e.target.position?.lineNumber;
        if (line && activeFile) {
          toggleBreakpoint(activeFile.name, line);
        }
      }
    });
  };

  // Synchronize active file if current execution step points to another project file
  useEffect(() => {
    if (currentEvent?.file && activeFile && currentEvent.file !== activeFile.name) {
      const targetProjFile = projectFiles.find((f) => f.name === currentEvent.file);
      if (targetProjFile) {
        setActiveFileId(targetProjFile.id);
      }
    }
  }, [currentEvent, activeFile, projectFiles, setActiveFileId]);

  // Update Monaco decorations for Current Execution Line and Breakpoints
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current || !activeFile) return;

    const newDecorations: any[] = [];

    // 1. Breakpoint decorations for this file
    const fileBreakpoints = breakpoints.filter(
      (b) => b.file === activeFile.name && b.enabled
    );
    fileBreakpoints.forEach((bp) => {
      newDecorations.push({
        range: new monacoRef.current.Range(bp.line, 1, bp.line, 1),
        options: {
          isWholeLine: false,
          glyphMarginClassName: 'oops-monaco-breakpoint',
          glyphMarginHoverMessage: { value: `Breakpoint at line ${bp.line}` },
        },
      });
    });

    // 2. Active execution line decoration
    const isThisFileActive =
      currentEvent &&
      (!currentEvent.file || currentEvent.file === activeFile.name);

    if (isThisFileActive && currentEvent && currentEvent.line > 0) {
      newDecorations.push({
        range: new monacoRef.current.Range(currentEvent.line, 1, currentEvent.line, 1),
        options: {
          isWholeLine: true,
          className: 'oops-monaco-exec-line',
          glyphMarginClassName: 'oops-monaco-exec-arrow',
          glyphMarginHoverMessage: {
            value: `▶ Step ${currentStepIndex + 1}: ${currentEvent.description || currentEvent.type}`,
          },
        },
      });

      // Auto-scroll to keep active line centered
      editorRef.current.revealLineInCenterIfOutsideViewport(currentEvent.line);
    }

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [currentEvent, currentStepIndex, activeFile, breakpoints]);

  // Jump to target line when requested by inspector or visualization click
  useEffect(() => {
    if (editorRef.current && targetLine && targetLine > 0) {
      editorRef.current.revealLineInCenter(targetLine);
      editorRef.current.setPosition({ lineNumber: targetLine, column: 1 });
      editorRef.current.focus();
    }
  }, [targetLine]);

  const stale = isStale();

  return (
    <div className="h-full flex flex-col bg-white border-r border-border select-none relative">
      <style>{`
        .oops-monaco-exec-line {
          background-color: rgba(254, 243, 199, 0.55) !important;
          border-left: 3px solid #F59E0B !important;
        }
        .oops-monaco-exec-arrow::before {
          content: '▶';
          color: #D97706;
          font-size: 11px;
          font-weight: bold;
          margin-left: 3px;
        }
        .oops-monaco-breakpoint::before {
          content: '●';
          color: #DC2626;
          font-size: 13px;
          margin-left: 3px;
        }
      `}</style>

      {/* Editor Tab Bar */}
      <div className="h-9 border-b border-border bg-neutral-100 flex items-center justify-between px-2 overflow-x-auto select-none">
        <div className="flex items-center space-x-1">
          {projectFiles.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <div
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`group flex items-center space-x-1.5 px-3 py-1.5 text-xs rounded-t font-mono border-t-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-blue-600 text-foreground font-medium shadow-2xs'
                    : 'border-transparent text-muted-foreground hover:bg-neutral-200/60'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-neutral-400'}`} />
                <span>{file.name}</span>
                {projectFiles.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProjectFile(file.id);
                    }}
                    className="p-0.5 rounded hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Action Run Button & Stale Indicator */}
        <div className="flex items-center space-x-2">
          {stale && !compilationError && (
            <span className="text-[10.5px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center space-x-1">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              <span>Source Changed</span>
            </span>
          )}

          {compilationError && (
            <div className="flex items-center space-x-1 text-[11px] text-red-600 font-sans px-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Compilation Error</span>
            </div>
          )}

          <button
            onClick={() => {
              if (onRunCode) {
                onRunCode();
              } else {
                compileAndExecute();
              }
            }}
            disabled={isPlaying}
            className="flex items-center space-x-1.5 px-3 py-1 bg-foreground text-background text-xs font-medium rounded hover:bg-black/90 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Run Project</span>
          </button>
        </div>
      </div>

      {/* Editor Core */}
      <div className="flex-1 relative">
        {activeFile ? (
          <Editor
            height="100%"
            language="java"
            theme="oops-light"
            value={activeFile.content}
            onChange={(val) => updateFileContent(activeFile.id, val || '')}
            onMount={handleEditorMount}
            loading={
              <div className="h-full w-full flex items-center justify-center space-x-2 text-xs text-muted-foreground font-mono bg-surface/30">
                <div className="w-4 h-4 border-2 border-border border-t-foreground rounded-full animate-spin" />
                <span>Initializing Java Editor...</span>
              </div>
            }
            options={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              renderLineHighlight: 'all',
              lineNumbersMinChars: 3,
              folding: true,
              glyphMargin: true, // Enables breakpoint & execution arrow gutter
              bracketPairColorization: { enabled: true },
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
            No file open. Select a file from the Project Explorer.
          </div>
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="h-6 border-t border-border bg-surface/40 px-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
        <div className="flex items-center space-x-3">
          <span>Java 21 LTS</span>
          <span>UTF-8</span>
          {activeFile && <span>{activeFile.name}</span>}
          {currentEvent && (
            <span className="text-amber-700 bg-amber-50 px-1.5 rounded border border-amber-200">
              Active Exec Line: {currentEvent.line}
            </span>
          )}
        </div>
        <div>
          <span>OOPS LAB Deterministic Engine</span>
        </div>
      </div>
    </div>
  );
};
