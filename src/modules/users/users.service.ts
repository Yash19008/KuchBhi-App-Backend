import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async createUser(dto: CreateUserDto): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ email: dto.email });
        if (existingUser) return existingUser;

        const user = new this.userModel({ email: dto.email });
        return user.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find();
    }
}
