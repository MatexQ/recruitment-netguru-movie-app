export interface IError extends Error {
  name: string;
  message: string;
  isOperational?: boolean;
  statusCode?: number;
  stack?: Error['stack'];
  status?: boolean;
  details?: string;
  joi?: any;
  errors?: object;
}
