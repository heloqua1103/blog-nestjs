import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        console.log('register api');
        console.log(registerUserDto);
        return this.authService.register(registerUserDto);
    }
}
