import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    // authService: AuthService;
    // constructor(abc: AuthService){
    //     this.authService = abc
    // }

    constructor(private readonly authService: AuthService){}
    
    @Post("register") // POST:/auth/register
    register(@Body() registerUserDto: RegisterUserDto){
        return this.authService.registerUser(registerUserDto);
    }

    @Post("login") //POST: /auth/login
    login(@Body() loginDto:LoginDto){
        return this.authService.loginUser(loginDto)
    }
}
