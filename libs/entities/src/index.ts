import { readdirSync } from 'fs';
import { join } from 'path';

const entities: (() => unknown)[] = [];

const entitiesPath = join(__dirname);

readdirSync(entitiesPath).forEach((file) => {
  if (file.endsWith('entity.js') || file.endsWith('entity.ts')) {
    const entity = require(join(entitiesPath, file));
    Object.keys(entity).forEach((key) => {
      if (typeof entity[key] === 'function') {
        entities.push(entity[key]);
      }
    });
  }
});

export default entities;
