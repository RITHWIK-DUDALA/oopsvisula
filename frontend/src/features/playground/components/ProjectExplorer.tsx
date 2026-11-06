import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  ChevronRight, 
  ChevronDown,
  Box,
  Layers,
  FilePlus,
  PanelLeftClose
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSemanticModel } from '@/core/engine/useSemanticModel';

interface ProjectExplorerProps {
  onSelectEntity?: (id: string, file: string, line?: number) => void;
  onClose?: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ onSelectEntity, onClose }) => {
  const { 
    projectFiles, 
    activeFileId, 
    setActiveFileId, 
    addProjectFile, 
    renameProjectFile, 
    deleteProjectFile,
    activeEntitySelection,
    setActiveEntitySelection
  } = useSimulationStore();

  const { classes, interfaces, records, enums } = useSemanticModel();

  const [isAdding, setIsAdding] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [renamedName, setRenamedName] = useState('');
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({
    'file-main': true,
  });

  const toggleFileExpanded = (fileId: string) => {
    setExpandedFiles(prev => ({ ...prev, [fileId]: !prev[fileId] }));
  };

  const sanitizeFileName = (raw: string): string => {
    // Strip path traversal sequences and illegal directory separators
    const base = raw.replace(/^.*[\\/]/, '').replace(/\.\.+/g, '').replace(/[^\w.-]/g, '');
    return base || 'NewClass';
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    let name = sanitizeFileName(newFileName.trim());
    if (!name.endsWith('.java')) {
      name += '.java';
    }
    addProjectFile(name, `// ${name}\npublic class ${name.replace('.java', '')} {\n    \n}\n`);
    setNewFileName('');
    setIsAdding(false);
  };

  const handleStartRename = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFileId(id);
    setRenamedName(currentName);
  };

  const handleSaveRename = (id: string) => {
    if (renamedName.trim()) {
      let name = sanitizeFileName(renamedName.trim());
      if (!name.endsWith('.java')) name += '.java';
      renameProjectFile(id, name);
    }
    setEditingFileId(null);
  };

  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this file from your project?')) {
      deleteProjectFile(id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-border select-none text-xs text-foreground">
      {/* Header */}
      <div className="h-9 px-2.5 border-b border-border flex items-center justify-between bg-surface/50 font-medium">
        <div className="flex items-center space-x-1.5 text-foreground/80">
          <Folder className="w-3.5 h-3.5 text-foreground/60" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Project Explorer</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsAdding(true)}
            title="Create New Java File"
            className="p-1 rounded hover:bg-neutral-200/70 transition-colors text-foreground/70 hover:text-foreground"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Collapse Explorer"
              className="p-1 rounded hover:bg-neutral-200/70 transition-colors text-foreground/70 hover:text-foreground"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* New File Inline Form */}
      {isAdding && (
        <div className="p-2 border-b border-border bg-neutral-50 flex items-center space-x-1.5">
          <FilePlus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="ClassName.java"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile();
              if (e.key === 'Escape') setIsAdding(false);
            }}
            className="flex-1 px-1.5 py-0.5 text-xs bg-white border border-border rounded outline-none focus:border-blue-500 font-mono"
          />
          <button
            onClick={handleCreateFile}
            className="p-0.5 rounded hover:bg-green-100 text-green-700"
            title="Create"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-0.5 rounded hover:bg-red-100 text-red-700"
            title="Cancel"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {projectFiles.map((file) => {
          const isActive = file.id === activeFileId;
          const isExpanded = !!expandedFiles[file.id];

          // Filter entities belonging to this file
          const fileEntities = [...classes, ...interfaces, ...records, ...enums].filter(
            (e) => e.sourceFile === file.name || (!e.sourceFile && file.isMain)
          );

          return (
            <div key={file.id} className="group">
              <div
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center justify-between px-2 py-1 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-50/70 text-blue-900 font-medium'
                    : 'hover:bg-neutral-100/70 text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-1.5 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFileExpanded(file.id);
                    }}
                    className="p-0.5 text-foreground/40 hover:text-foreground/80 rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>

                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-neutral-500'}`} />

                  {editingFileId === file.id ? (
                    <input
                      type="text"
                      autoFocus
                      value={renamedName}
                      onChange={(e) => setRenamedName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRename(file.id);
                        if (e.key === 'Escape') setEditingFileId(null);
                      }}
                      onBlur={() => handleSaveRename(file.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="px-1 py-0.5 text-xs bg-white border border-blue-500 rounded outline-none font-mono w-28"
                    />
                  ) : (
                    <span className="truncate font-mono text-[11px]">{file.name}</span>
                  )}
                </div>

                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleStartRename(file.id, file.name, e)}
                    title="Rename"
                    className="p-1 rounded hover:bg-neutral-200/80 text-foreground/50 hover:text-foreground"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                  </button>
                  {projectFiles.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteFile(file.id, e)}
                      title="Delete"
                      className="p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Nested Entities */}
              {isExpanded && fileEntities.length > 0 && (
                <div className="pl-6 pr-2 py-0.5 space-y-0.5 border-l border-border/40 ml-4 my-0.5">
                  {fileEntities.map((entity) => {
                    const isSelected = activeEntitySelection?.id === entity.id;
                    const isInterface = entity.entityType === 'interface';
                    const isAbstract = entity.entityType === 'abstract-class';
                    const isRecord = entity.entityType === 'record';
                    const isEnum = entity.entityType === 'enum';

                    let typeLabel = 'class';
                    let typeBadgeColor = 'text-blue-700 bg-blue-50 border-blue-200';
                    if (isInterface) {
                      typeLabel = 'interface';
                      typeBadgeColor = 'text-teal-700 bg-teal-50 border-teal-200';
                    } else if (isAbstract) {
                      typeLabel = 'abstract';
                      typeBadgeColor = 'text-purple-700 bg-purple-50 border-purple-200';
                    } else if (isRecord) {
                      typeLabel = 'record';
                      typeBadgeColor = 'text-cyan-700 bg-cyan-50 border-cyan-200';
                    } else if (isEnum) {
                      typeLabel = 'enum';
                      typeBadgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
                    }

                    return (
                      <div
                        key={entity.id}
                        onClick={() => {
                          setActiveFileId(file.id);
                          setActiveEntitySelection({
                            type: 'class',
                            id: entity.id,
                            data: entity
                          });
                          if (onSelectEntity) {
                            onSelectEntity(entity.id, file.name, entity.sourceLine);
                          }
                        }}
                        className={`flex items-center justify-between px-1.5 py-0.5 rounded cursor-pointer transition-colors text-[11px] font-mono ${
                          isSelected
                            ? 'bg-neutral-200 text-foreground font-semibold'
                            : 'hover:bg-neutral-100 text-foreground/70'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          {isInterface ? (
                            <Layers className="w-3 h-3 text-teal-600 shrink-0" />
                          ) : (
                            <Box className="w-3 h-3 text-blue-600 shrink-0" />
                          )}
                          <span className="truncate">{entity.name}</span>
                        </div>
                        <span className={`text-[9px] px-1 py-0.2 rounded border uppercase font-sans ${typeBadgeColor}`}>
                          {typeLabel.slice(0, 4)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-2 border-t border-border bg-surface/30 text-[10px] text-muted-foreground flex justify-between items-center">
        <span>{projectFiles.length} file{projectFiles.length === 1 ? '' : 's'}</span>
        <span>{classes.length + interfaces.length + records.length + enums.length} types detected</span>
      </div>
    </div>
  );
};

