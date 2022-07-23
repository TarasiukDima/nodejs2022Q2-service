import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CRYPT_SALT } from '../settings';
import { USER_MESSAGES } from '../settings/messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private addHashPassword = async (password: string): Promise<string> => {
    return hash(password, CRYPT_SALT);
  };

  create = async (createUserDto: CreateUserDto) => {
    const user = await this.userRepository.create({
      login: createUserDto.login,
      password: await this.addHashPassword(createUserDto.password),
    });

    return await this.userRepository.save(user);
  };

  findAll = async () => {
    return await this.userRepository.find();
  };

  findByLogin = async (login: string) => {
    return await this.userRepository.findOneBy({ login });
  };

  findOne = async (id: string) => {
    return await this.userRepository.findOneBy({ id });
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const user = await this.userRepository.findOneBy({ id });
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

    const userUpdated = {
      password: await this.addHashPassword(updateUserDto.newPassword),
    };

    await this.userRepository.update({ id }, userUpdated);

    return this.userRepository.findOneBy({ id });
  };

  remove = async (id: string) => {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    return await this.userRepository.delete({ id });
  };
}
