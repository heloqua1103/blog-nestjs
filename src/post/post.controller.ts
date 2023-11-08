import { BadRequestException, Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }
    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage: storageConfig('post'), fileFilter: (req, file, cb) => {
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
    create(@Req() req: any, @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('Please upload avatar');
        }
        return this.postService.create(req['user_data'].id, { ...createPostDto, thumbnail: file.destination + '/' + file.filename });
    }
}
