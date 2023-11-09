import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
        return await this.categoryRepository.update(id, updateCategoryDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id);
    }
}
