import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(User) private userRepository: Repository<User>) { }
    async create(userId: number, createPostDto: CreatePostDto) {
        const user = await this.userRepository.findOneBy({ id: userId });

        try {
            const res = await this.postRepository.save({
                ...createPostDto, user
            })
            return await this.postRepository.findOneBy({ id: res.id });
        } catch (error) {
            throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
        }
    }
}
