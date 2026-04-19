import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // authService: AuthService;
    // constructor(abc: AuthService){
    //     this.authService = abc
    // }

    constructor(private readonly authService: AuthService){}
    
    @Post("register") // POST:/auth/register
    register(){
        return this.authService.registerUser();
    }
}
