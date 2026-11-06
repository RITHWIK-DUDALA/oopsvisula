import { Node } from '@xyflow/react';
import { VisualEntityData } from '../types';

export interface EntityDimensions {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

/**
 * Calculates content-aware preferred dimensions for any VisualEntityData node.
 * Ensures the card expands to accommodate its fields, methods, constructors,
 * and text signatures without clipping or text overflow.
 */
export function estimateEntityDimensions(node: Node<VisualEntityData>): EntityDimensions {
  const data = node.data || ({} as VisualEntityData);
  const entityType = String(data.entityType || node.type || 'class');

  switch (entityType) {
    case 'class':
    case 'classNode': {
      const name = data.name || 'ClassName';
      const fields = data.fields || [];
      const constructors = data.constructors || [];
      const methods = data.methods || [];
      const collapsed = data.collapsedSections || {};

      // Estimate width based on longest member signature
      let maxChars = name.length + 8;
      fields.forEach((f) => {
        const lineLen = (f.name?.length || 0) + (f.type?.length || 0) + (f.value ? f.value.length + 4 : 0) + 6;
        if (lineLen > maxChars) maxChars = lineLen;
      });
      constructors.forEach((c) => {
        const paramStr = (c.parameters || []).join(', ');
        const lineLen = name.length + paramStr.length + 6;
        if (lineLen > maxChars) maxChars = lineLen;
      });
      methods.forEach((m) => {
        const paramStr = (m.parameters || []).join(', ');
        const lineLen = (m.name?.length || 0) + (m.returnType?.length || 0) + paramStr.length + 8;
        if (lineLen > maxChars) maxChars = lineLen;
      });

      const charWidth = 7.6;
      const calculatedWidth = Math.max(260, Math.min(440, Math.round(maxChars * charWidth + 56)));

      // Estimate height based on expanded compartments
      let height = 52; // Header with class name & visibility badge
      if (data.classType) height += 18; // Type stereotype badge (e.g. «interface»)
      if (data.packageName) height += 16;

      // Fields compartment
      if (!collapsed.fields && fields.length > 0) {
        height += 24; // Section header
        height += fields.length * 22;
      }

      // Constructors compartment
      if (!collapsed.constructors && constructors.length > 0) {
        height += 24;
        height += constructors.length * 22;
      }

      // Methods compartment
      if (!collapsed.methods && methods.length > 0) {
        height += 24;
        height += methods.length * 24;
      }

      height += 16; // Bottom padding
      return {
        width: calculatedWidth,
        height: Math.max(130, height),
        minWidth: 240,
        minHeight: 120,
      };
    }

    case 'stack-frame':
    case 'stackFrameNode': {
      const isRecursiveGroup = Boolean((data as Record<string, unknown>).isRecursiveGroup);
      const isExpanded = Boolean((data as Record<string, unknown>).isExpanded);

      if (isRecursiveGroup) {
        return {
          width: 320,
          height: isExpanded ? 340 : 155,
          minWidth: 280,
          minHeight: 140,
        };
      }

      const locals = data.localVariables || {};
      const localsCount = Object.keys(locals).length;
      let height = 54; // Header with method name and status badge
      height += 24; // Section label "Local Variables & Operands"
      height += Math.max(1, localsCount) * 22;
      if (data.thisReference) height += 24;
      height += 14;

      return {
        width: 280,
        height: Math.max(130, height),
        minWidth: 240,
        minHeight: 120,
      };
    }

    case 'object':
    case 'heap-object':
    case 'objectNode':
    case 'heapObjectNode': {
      const fields = data.instanceFieldValues || {};
      const fieldsCount = Object.keys(fields).length;
      let height = 48; // Header with className
      height += 22; // Address badge (e.g. @0x4A2)
      height += 22; // Section label
      height += Math.max(1, fieldsCount) * 22;
      height += 16;

      return {
        width: 270,
        height: Math.max(125, height),
        minWidth: 230,
        minHeight: 110,
      };
    }

    case 'array':
    case 'arrayNode': {
      const cells = data.arrayCells || [];
      const width = Math.max(280, Math.min(560, cells.length * 52 + 56));
      return {
        width,
        height: 135,
        minWidth: 260,
        minHeight: 120,
      };
    }

    case 'method':
    case 'methodNode': {
      const params = data.parameters || [];
      let height = 48 + 24 + Math.max(1, params.length) * 20 + 16;
      return {
        width: 260,
        height: Math.max(120, height),
        minWidth: 220,
        minHeight: 100,
      };
    }

    case 'variable':
    case 'variableNode': {
      return {
        width: 220,
        height: 105,
        minWidth: 190,
        minHeight: 85,
      };
    }

    case 'package-group':
    case 'packageGroupNode': {
      return {
        width: 440,
        height: 320,
        minWidth: 320,
        minHeight: 220,
      };
    }

    case 'memory-region': {
      return {
        width: 300,
        height: 200,
        minWidth: 240,
        minHeight: 160,
      };
    }

    default: {
      return {
        width: 260,
        height: 140,
        minWidth: 220,
        minHeight: 110,
      };
    }
  }
}
