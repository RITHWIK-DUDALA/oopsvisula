import React, { useState } from 'react';
import { useClassBuilderStore } from './classBuilderStore';
import { RelationshipType, AccessModifier } from '@/types/classBuilder';
import {
  Layers,
  Plus,
  Trash2,
  Copy,
  Check,
  FileCode,
} from 'lucide-react';

export const VisualClassBuilder: React.FC = () => {
  const {
    diagram,
    selectedEntityId,
    selectEntity,
    addEntity,
    removeEntity,
    updateEntityName,
    addField,
    removeField,
    addMethod,
    removeMethod,
    addRelationship,
    removeRelationship,
    getGeneratedJavaCode,
  } = useClassBuilderStore();

  const [copied, setCopied] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('String');
  const [newFieldMod, setNewFieldMod] = useState<AccessModifier>('private');

  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodReturn, setNewMethodReturn] = useState('void');
  const [newMethodMod, setNewMethodMod] = useState<AccessModifier>('public');

  const [relTargetId, setRelTargetId] = useState('');
  const [relType, setRelType] = useState<RelationshipType>('extends');

  const selectedEntity = diagram.entities.find((e) => e.id === selectedEntityId);
  const generatedCode = getGeneratedJavaCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntityId || !newFieldName.trim()) return;
    addField(selectedEntityId, {
      name: newFieldName.trim(),
      type: newFieldType,
      modifier: newFieldMod,
      isStatic: false,
      isFinal: false,
    });
    setNewFieldName('');
  };

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntityId || !newMethodName.trim()) return;
    addMethod(selectedEntityId, {
      name: newMethodName.trim(),
      returnType: newMethodReturn,
      modifier: newMethodMod,
      isStatic: false,
      isAbstract: selectedEntity?.kind === 'interface',
      parameters: [],
    });
    setNewMethodName('');
  };

  const handleAddRelationship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntityId || !relTargetId) return;
    addRelationship(selectedEntityId, relTargetId, relType);
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden select-none">
      {/* Top Action Bar */}
      <div className="h-12 px-4 sm:px-6 bg-white border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 stroke-[1.5] text-foreground" />
            <span className="font-semibold text-xs text-foreground tracking-tight">
              Visual Class Builder & Java 21 Code Synchronizer
            </span>
          </div>
          <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
            AST Bi-Directional
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => addEntity('class')}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs border border-border bg-white rounded-md hover:border-foreground transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>+ Class</span>
            </button>
            <button
              onClick={() => addEntity('interface')}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs border border-border bg-white rounded-md hover:border-foreground transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>+ Interface</span>
            </button>
            <button
              onClick={() => addEntity('record')}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs border border-border bg-white rounded-md hover:border-foreground transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>+ Record</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-md hover:bg-black/90 active:scale-[0.98] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Java'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: 3 Columns (Diagram Canvas, Node Inspector, Generated Code) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
        {/* Column 1: Visual Diagram Canvas (6 Cols) */}
        <div className="lg:col-span-6 p-6 overflow-y-auto bg-surface/30 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
            <span>UML Class Hierarchy ({diagram.entities.length} Nodes)</span>
            <span>Relationships: {diagram.relationships.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diagram.entities.map((entity) => {
              const isSelected = entity.id === selectedEntityId;
              return (
                <div
                  key={entity.id}
                  onClick={() => selectEntity(entity.id)}
                  className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                    isSelected
                      ? 'border-foreground shadow-sm ring-1 ring-foreground/20'
                      : 'border-border hover:border-foreground/40'
                  }`}
                >
                  {/* Entity Header */}
                  <div className="border-b border-border pb-2 mb-2 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                        &lt;&lt;{entity.kind}&gt;&gt;
                      </div>
                      <div className="text-sm font-bold text-foreground font-mono">
                        {entity.name}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEntity(entity.id);
                      }}
                      className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                      title="Delete entity"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>
                  </div>

                  {/* Fields Section */}
                  <div className="space-y-1 mb-2 font-mono text-xs">
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Fields</div>
                    {entity.fields.length === 0 ? (
                      <div className="text-[11px] text-muted-foreground italic">None</div>
                    ) : (
                      entity.fields.map((f) => (
                        <div key={f.id} className="flex items-center justify-between text-[11px] py-0.5">
                          <span className="text-foreground">
                            {f.modifier === 'private' ? '-' : f.modifier === 'public' ? '+' : '#'} {f.name}: {f.type}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeField(entity.id, f.id);
                            }}
                            className="text-muted-foreground hover:text-foreground text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Methods Section */}
                  <div className="pt-2 border-t border-border space-y-1 font-mono text-xs">
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Methods</div>
                    {entity.methods.length === 0 ? (
                      <div className="text-[11px] text-muted-foreground italic">None</div>
                    ) : (
                      entity.methods.map((m) => (
                        <div key={m.id} className="flex items-center justify-between text-[11px] py-0.5">
                          <span className="text-foreground">
                            + {m.name}(): {m.returnType}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMethod(entity.id, m.id);
                            }}
                            className="text-muted-foreground hover:text-foreground text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Relationships Strip */}
          <div className="p-3 bg-white border border-border rounded-xl space-y-2">
            <div className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              UML Relationship Connectors
            </div>
            {diagram.relationships.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">No relationships defined</span>
            ) : (
              <div className="space-y-1">
                {diagram.relationships.map((r) => {
                  const source = diagram.entities.find((e) => e.id === r.sourceEntityId)?.name;
                  const target = diagram.entities.find((e) => e.id === r.targetEntityId)?.name;
                  return (
                    <div
                      key={r.id}
                      className="flex items-center justify-between text-xs font-mono p-1.5 bg-surface border border-border rounded"
                    >
                      <span>
                        <strong className="text-foreground">{source}</strong> --[{r.type}]--&gt;{' '}
                        <strong className="text-foreground">{target}</strong>
                      </span>
                      <button
                        onClick={() => removeRelationship(r.id)}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Selected Node Properties & Modifiers (3 Cols) */}
        <div className="lg:col-span-3 p-4 space-y-5 overflow-y-auto bg-white">
          <div className="border-b border-border pb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">
              Node Inspector
            </h3>
            <p className="text-[11px] text-muted-foreground">Configure selected class/interface</p>
          </div>

          {selectedEntity ? (
            <div className="space-y-4 text-xs font-mono">
              {/* Name Edit */}
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Entity Identifier</label>
                <input
                  type="text"
                  value={selectedEntity.name}
                  onChange={(e) => updateEntityName(selectedEntity.id, e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-border rounded-md bg-surface text-foreground font-mono focus:outline-hidden"
                />
              </div>

              {/* Add Field Form */}
              <form onSubmit={handleAddField} className="p-3 bg-surface border border-border rounded-lg space-y-2">
                <div className="font-semibold text-foreground text-[11px] uppercase">Add Field</div>
                <input
                  type="text"
                  placeholder="field name (e.g. balance)"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-border rounded bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value)}
                    className="px-2 py-1 text-xs border border-border rounded bg-white"
                  >
                    <option value="int">int</option>
                    <option value="double">double</option>
                    <option value="String">String</option>
                    <option value="boolean">boolean</option>
                    <option value="Instant">Instant</option>
                  </select>
                  <select
                    value={newFieldMod}
                    onChange={(e) => setNewFieldMod(e.target.value as AccessModifier)}
                    className="px-2 py-1 text-xs border border-border rounded bg-white"
                  >
                    <option value="private">private</option>
                    <option value="protected">protected</option>
                    <option value="public">public</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-1 bg-foreground text-background text-xs rounded hover:bg-black/90"
                >
                  Insert Field
                </button>
              </form>

              {/* Add Method Form */}
              <form onSubmit={handleAddMethod} className="p-3 bg-surface border border-border rounded-lg space-y-2">
                <div className="font-semibold text-foreground text-[11px] uppercase">Add Method</div>
                <input
                  type="text"
                  placeholder="method name (e.g. deposit)"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-border rounded bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="return type"
                    value={newMethodReturn}
                    onChange={(e) => setNewMethodReturn(e.target.value)}
                    className="px-2 py-1 text-xs border border-border rounded bg-white"
                  />
                  <select
                    value={newMethodMod}
                    onChange={(e) => setNewMethodMod(e.target.value as AccessModifier)}
                    className="px-2 py-1 text-xs border border-border rounded bg-white"
                  >
                    <option value="public">public</option>
                    <option value="protected">protected</option>
                    <option value="private">private</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-1 bg-foreground text-background text-xs rounded hover:bg-black/90"
                >
                  Insert Method
                </button>
              </form>

              {/* Add Relationship Form */}
              <form onSubmit={handleAddRelationship} className="p-3 bg-surface border border-border rounded-lg space-y-2">
                <div className="font-semibold text-foreground text-[11px] uppercase">Connect Relationship</div>
                <select
                  value={relType}
                  onChange={(e) => setRelType(e.target.value as RelationshipType)}
                  className="w-full px-2 py-1 text-xs border border-border rounded bg-white"
                >
                  <option value="extends">extends (Inheritance)</option>
                  <option value="implements">implements (Interface)</option>
                  <option value="composition">composition (Has-a strong)</option>
                  <option value="aggregation">aggregation (Has-a weak)</option>
                </select>
                <select
                  value={relTargetId}
                  onChange={(e) => setRelTargetId(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-border rounded bg-white"
                >
                  <option value="">Select target node...</option>
                  {diagram.entities
                    .filter((e) => e.id !== selectedEntityId)
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name} ({e.kind})
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  disabled={!relTargetId}
                  className="w-full py-1 bg-foreground text-background text-xs rounded hover:bg-black/90 disabled:opacity-50"
                >
                  Link Relationship
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-muted-foreground font-mono">
              Click an entity in the canvas to inspect its properties.
            </div>
          )}
        </div>

        {/* Column 3: Live Generated Java 21 Code Preview (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col bg-white overflow-hidden">
          <div className="h-10 px-4 border-b border-border bg-surface/50 flex items-center justify-between text-xs font-mono text-muted-foreground shrink-0">
            <span className="flex items-center space-x-1.5 text-foreground font-semibold">
              <FileCode className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Generated Java 21 Code</span>
            </span>
            <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">
              Synchronized
            </span>
          </div>

          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-foreground bg-surface/20">
            <pre className="leading-relaxed whitespace-pre-wrap">{generatedCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
