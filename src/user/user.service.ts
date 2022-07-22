import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MemoryDB } from '../memoryDB/memoryDB';
import { CRYPT_SALT } from '../settings';
import { USER_MESSAGES } from '../settings/messages';

@Injectable()
export class UserService {
  private memory: MemoryDB<User> = new MemoryDB<User>();

  private addHashPassword = async (password: string): Promise<string> => {
    return hash(password, CRYPT_SALT);
  };

  create = async (createUserDto: CreateUserDto) => {
    const now = Date.now();
    const userInfo = new User({
      id: v4(),
      login: createUserDto.login,
      password: await this.addHashPassword(createUserDto.password),
      version: 1,
      createdAt: now,
      updatedAt: now,
    });

    return await this.memory.addItem(userInfo);
  };

  findAll = async () => {
    return await this.memory.getAllItems();
  };

  findByLogin = async (login: string) => {
    return await this.memory.getOneItemByField(login, 'login');
  };

  findOne = async (id: string) => {
    return await this.memory.getOneItemById(id);
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const user = await this.memory.getOneItemById(id);
    if (!user) {
      return null;
    }

    const sameOldPassword = await compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!sameOldPassword) {
      return USER_MESSAGES.wrongOldPassword;
    }

    const userUpdated = new User({
      ...user,
      password: await this.addHashPassword(updateUserDto.newPassword),
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return await this.memory.updateItem(id, userUpdated);
  };

  remove = async (id: string) => {
    return await this.memory.removeItem(id);
  };
}
