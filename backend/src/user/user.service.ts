import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto) {
    const normalizedEmail = createUserDto.email.toLowerCase();

    const existingUser = await this.userModel.findOne({ email: normalizedEmail }).exec();
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const createdUser = await this.userModel.create({
        email: normalizedEmail,
        password: hashedPassword,
      });

      return {
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      };
    } catch (error) {
      this.logger.error('Failed to create user', error instanceof Error ? error.stack : undefined);
      throw new InternalServerErrorException('Unable to register user. Please try again later.');
    }
  }
}
