import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  
    async createUser(registerUserDto: RegisterUserDto){
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10)

        return await this.userModel.create({
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: hashedPassword
        });
    }

    async findUserByEmailWithPassword(email:string) :Promise<UserDocument | null>{
        return await this.userModel.findOne({email}).select("+password");
    }
}
