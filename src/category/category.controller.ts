import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private categoryRepository: CategoryService) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryRepository.update(Number(id), updateCategoryDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryRepository.delete(Number(id));
    }
}
