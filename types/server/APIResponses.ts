export type LoginResponse =
  | { error: string }
  | { message: string; token: string };
