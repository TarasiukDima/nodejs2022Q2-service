import { JoinColumnOptions } from 'typeorm';

export const getJoinColumnOptions = (name: string): JoinColumnOptions => {
  return {
    name: name,
    referencedColumnName: 'id',
  };
};
