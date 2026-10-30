/**
 * OOPS LAB — Visual Class Builder Data Model
 */

export type AccessModifier = 'public' | 'protected' | 'private' | 'package-private';
export type EntityKind = 'class' | 'interface' | 'record' | 'abstract-class';
export type RelationshipType = 'extends' | 'implements' | 'association' | 'aggregation' | 'composition';

export interface ClassField {
  id: string;
  name: string;
  type: string;
  modifier: AccessModifier;
  isStatic: boolean;
  isFinal: boolean;
  defaultValue?: string;
}

export interface ClassMethod {
  id: string;
  name: string;
  returnType: string;
  modifier: AccessModifier;
  isStatic: boolean;
  isAbstract: boolean;
  parameters: { name: string; type: string }[];
  body?: string;
}

export interface ClassEntity {
  id: string;
  name: string;
  kind: EntityKind;
  isAbstract?: boolean;
  fields: ClassField[];
  methods: ClassMethod[];
  position: { x: number; y: number };
}

export interface ClassRelationship {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  type: RelationshipType;
  label?: string;
}

export interface ClassDiagramModel {
  entities: ClassEntity[];
  relationships: ClassRelationship[];
}
