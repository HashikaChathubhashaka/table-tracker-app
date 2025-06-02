import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string, name: string , role:string ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword, name , role });
    return newUser.save();
  }

  async deleteUserById(userId: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    return { deleted: result.deletedCount === 1 };
  }

  async deleteUserByEmail(email: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.deleteOne({ email }).exec();
    return { deleted: result.deletedCount === 1 };
  }

  async getAllUsers(): Promise<Pick<User, 'name' | 'email' | 'role'>[]> {
    return this.userModel.find({}, 'name email role').exec();
  }

}
