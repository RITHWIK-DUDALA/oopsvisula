import { Node, Edge } from '@xyflow/react';
import { VisualEntityData, VisualRelationshipData } from '../types';

export interface SavedWorkspaceRecord {
  id: string;
  name: string;
  categoryId: string;
  updatedAt: string;
  nodes: Node<VisualEntityData>[];
  edges: Edge<VisualRelationshipData>[];
}

const STORAGE_KEY = 'oops_lab_2d_workspaces';

export function getAllSavedWorkspaces(): SavedWorkspaceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load saved workspaces', err);
    return [];
  }
}

export function saveWorkspaceLocally(record: SavedWorkspaceRecord): void {
  try {
    const existing = getAllSavedWorkspaces();
    const filtered = existing.filter((w) => w.id !== record.id);
    const updated = [record, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save workspace locally', err);
  }
}

export function deleteWorkspaceLocally(id: string): void {
  try {
    const existing = getAllSavedWorkspaces();
    const updated = existing.filter((w) => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete workspace', err);
  }
}

export function exportWorkspaceToJson(record: SavedWorkspaceRecord): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(record, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute(
    'download',
    `${record.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_workspace.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

