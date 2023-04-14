import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAll() {
        return this.carsService.findAll()
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id)
    }

    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        return this.carsService.newCar(createCarDto)
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto)
    {
        return this.carsService.updateCar(id, updateCarDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.deleteCar(id)
    } 
    
}