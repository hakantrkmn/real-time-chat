import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UsersFactory } from './users.factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly usersFactory: UsersFactory,
  ) {}

  async createUser(username: string): Promise<User> {
    // Önce aynı username'e sahip kullanıcı var mı kontrol et
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new ConflictException('Bu kullanıcı adı zaten kullanılıyor');
    }

    const user = new this.userModel({ username });
    return await user.save();
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .populate(this.usersFactory.getUserByIdOptions())
      .transform(this.usersFactory.removeIdAndVersion().transform)
      .exec();
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    return user;
  }
}
