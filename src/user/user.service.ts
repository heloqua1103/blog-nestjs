import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: ['id', 'first_name', 'last_name', 'email', 'status', 'created_at', 'updated_at']
        });
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.userRepository.save({ ...createUserDto, password: hashPassword });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, updateUserDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
