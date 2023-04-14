import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    newCar(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar)

        return newCar;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car id provided is not valid`)

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    deleteCar( id:string) {
        this.findOneById(id); // si no existe el coche, lanza un error
        this.cars = this.cars.filter(car => car.id !== id); // manera muchísimo mas eficaz de eliminar un elemento de un array
    }
}


/**
 * Otras maneras de hacer el método newCar.
 * 1- Usando desestructuración de objetos:
 * newCar({model, brand}: CreateCarDto) {
    const newCar: Car = {
        id: uuid(),
        brand,
        model,
    }
    this.cars.push(newCar)

    return newCar;
}
    * 2- Extrayendo las propiedades en la construcción del objeto:
    * newCar(createCarDto: CreateCarDto) {
    const newCar: Car = {
        id: uuid(),
        brand: createCarDto.brand,
        model: createCarDto.model,
    }
    this.cars.push(newCar)

    return newCar;
}
    */
