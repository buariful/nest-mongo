import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const user = await this.userService.createUser({
            ...registerUserDto
        });
        const payload = {
            sub: user._id,
            email: user.email
        }

        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token
        };
    }

    async loginUser(loginDto: LoginDto){
        const {email, password} = loginDto;

        const user = await this.userService.findUserByEmailWithPassword(email);
        if(!user)throw new UnauthorizedException("Invalid email or password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new UnauthorizedException("Invalid email or password");


        const payload = {
            sub: user._id,
            email: user.email
        }
        const token = await this.jwtService.signAsync(payload);
        
        return {
            user: user._id,
            token,
        }
    }
}
