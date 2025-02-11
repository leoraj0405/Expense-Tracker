import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const newUser = new this.userModel({
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
