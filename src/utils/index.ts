import { JoinColumnOptions } from 'typeorm';
import { EOL } from 'os';

export const getJoinColumnOptions = (name: string): JoinColumnOptions => {
  return {
    name: name,
    referencedColumnName: 'id',
  };
};

export const getLoggingMessage = (
  { path, query, body, method, status },
  stack = '',
): string => {
  let message = `Url: ${path},${EOL}Query params: ${JSON.stringify(
    query,
  )},${EOL}Body: ${JSON.stringify(
    body,
  )},${EOL}Status code: ${status},${EOL}Method: ${method},${EOL}Time: ${Date.now()}${EOL}`;

  if (stack) {
    message += `Stack: ${stack}${EOL}`;
  }

  return message + EOL;
};

export const getErrorMessage = (message: string, error: Error): string => {
  return `${message},${EOL}Stack: ${error.stack}${EOL + EOL}`;
};
