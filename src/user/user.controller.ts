import { Controller, Get, UseGuards, Param, Post, Body, Put, Delete, Query, Req, UploadedFile, UseInterceptors, BadRequestException, ParseArrayPipe, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Roles('admin')
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search' })
    @Get()
    findAll(@Query() query: FilterUserDto): Promise<User[]> {
        return this.userService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(Number(id));
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete('multiple')
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        return this.userService.multipleDelete(ids);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: storageConfig('avatar'), fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowExtArr = ['.jpg', '.jpeg', '.png', '.gif'];
            if (!allowExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowExtArr.join(', ')}`;
                cb(null, false)
            } else {
                const fileSize = file.size;
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size must be smaller than 5MB';
                    cb(null, false)
                } else {
                    cb(null, true)
                }
            }
        }
    }))
    uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('Please upload avatar');
        }
        this.userService.updateAvatar(req.user_data.id, file.destination + '/' + file.filename);
    }
}
