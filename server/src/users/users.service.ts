import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number): Promise<User | null> {
    const singleUser = await this.userRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    return singleUser;
  }

  async create(user: User): Promise<User> {
    const createUser = await this.userRepository.save(user);
    return createUser;
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, { ...user, updatedAt: new Date() });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.update(id, { deletedAt: new Date() });
  }
}
