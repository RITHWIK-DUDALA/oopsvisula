import { ClassDiagramModel, ClassEntity, AccessModifier } from '@/types/classBuilder';

const formatModifier = (mod: AccessModifier): string => {
  if (mod === 'package-private') return '';
  return `${mod} `;
};

export const generateJavaCodeForEntity = (
  entity: ClassEntity,
  model: ClassDiagramModel
): string => {
  const extendsRel = model.relationships.find(
    (r) => r.sourceEntityId === entity.id && r.type === 'extends'
  );
  const targetExtends = extendsRel
    ? model.entities.find((e) => e.id === extendsRel.targetEntityId)
    : null;

  const implementsRels = model.relationships.filter(
    (r) => r.sourceEntityId === entity.id && r.type === 'implements'
  );
  const targetImplements = implementsRels
    .map((r) => model.entities.find((e) => e.id === r.targetEntityId)?.name)
    .filter(Boolean);

  let header = '';

  if (entity.kind === 'record') {
    const params = entity.fields.map((f) => `${f.type} ${f.name}`).join(', ');
    header = `public record ${entity.name}(${params}) `;
    if (targetImplements.length > 0) {
      header += `implements ${targetImplements.join(', ')} `;
    }
    header += '{\n';
  } else if (entity.kind === 'interface') {
    header = `public interface ${entity.name} `;
    if (targetExtends) {
      header += `extends ${targetExtends.name} `;
    }
    header += '{\n';
  } else {
    const abstractPrefix = entity.kind === 'abstract-class' ? 'abstract ' : '';
    header = `public ${abstractPrefix}class ${entity.name} `;
    if (targetExtends) {
      header += `extends ${targetExtends.name} `;
    }
    if (targetImplements.length > 0) {
      header += `implements ${targetImplements.join(', ')} `;
    }
    header += '{\n';
  }

  const lines: string[] = [header];

  // If not a record, generate fields
  if (entity.kind !== 'record') {
    entity.fields.forEach((field) => {
      const staticPart = field.isStatic ? 'static ' : '';
      const finalPart = field.isFinal ? 'final ' : '';
      const modPart = formatModifier(field.modifier);
      const defaultPart = field.defaultValue ? ` = ${field.defaultValue}` : '';
      lines.push(`    ${modPart}${staticPart}${finalPart}${field.type} ${field.name}${defaultPart};`);
    });

    if (entity.fields.length > 0) {
      lines.push('');
    }
  }

  // Constructors (for normal or abstract classes)
  if (entity.kind === 'class' || entity.kind === 'abstract-class') {
    if (entity.fields.length > 0) {
      const ctorParams = entity.fields
        .filter((f) => !f.isStatic)
        .map((f) => `${f.type} ${f.name}`)
        .join(', ');
      lines.push(`    public ${entity.name}(${ctorParams}) {`);
      entity.fields
        .filter((f) => !f.isStatic)
        .forEach((f) => {
          lines.push(`        this.${f.name} = ${f.name};`);
        });
      lines.push('    }\n');
    }
  }

  // Methods
  entity.methods.forEach((method) => {
    const modPart = entity.kind === 'interface' ? '' : formatModifier(method.modifier);
    const staticPart = method.isStatic ? 'static ' : '';
    const abstractPart = method.isAbstract && entity.kind !== 'interface' ? 'abstract ' : '';
    const params = method.parameters.map((p) => `${p.type} ${p.name}`).join(', ');

    if (entity.kind === 'interface' || method.isAbstract) {
      lines.push(`    ${modPart}${staticPart}${abstractPart}${method.returnType} ${method.name}(${params});`);
    } else {
      lines.push(`    ${modPart}${staticPart}${method.returnType} ${method.name}(${params}) {`);
      if (method.body) {
        lines.push(`        ${method.body}`);
      } else if (method.returnType !== 'void') {
        lines.push(`        return null;`);
      }
      lines.push('    }');
    }
    lines.push('');
  });

  lines.push('}\n');
  return lines.join('\n');
};

export const generateCompleteJavaModel = (model: ClassDiagramModel): string => {
  return model.entities.map((e) => generateJavaCodeForEntity(e, model)).join('\n');
};

