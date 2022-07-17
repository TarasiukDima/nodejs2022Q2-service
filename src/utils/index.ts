import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export const checkIdValid = (id: string) => {
  try {
    return uuidValidate(id) && uuidVersion(id) === 4;
  } catch (_) {
    return false;
  }
};
