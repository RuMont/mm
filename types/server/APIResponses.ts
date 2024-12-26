import { Prettify } from '@mmtypes/Prettify';

export type GenericError = {
  error: string;
};
export type GenericSuccess = {
  message: string;
};

export type GenericResponse<T = unknown> =
  | Prettify<GenericError>
  | (Prettify<GenericSuccess> & T);
