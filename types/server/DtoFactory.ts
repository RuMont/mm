import { InferModelFromColumns } from 'drizzle-orm';
import { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';
import { Prettify } from '../Prettify';

type Table = SQLiteTableWithColumns<any>;

type SchemaColumns<T extends Table> = T['_']['columns'];
type Dto<T extends Table> = InferModelFromColumns<
  SchemaColumns<T>
>;

export type CreateDto<T extends Table> = Prettify<
  Omit<Dto<T>, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> &
    Partial<Pick<Dto<T>, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>
>;

export type UpdateDto<T extends Table> = Prettify<
  Omit<Dto<T>, 'created_at' | 'updated_at' | 'deleted_at'> &
    Partial<Pick<Dto<T>, 'created_at' | 'updated_at' | 'deleted_at'>>
>;
