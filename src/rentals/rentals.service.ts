import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../entities/rental.entity';
import { Film } from '../entities/film.entity';
import { Customer } from '../entities/customer.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalsRepository: Repository<Rental>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Rental[]> {
    return this.rentalsRepository.find({
      relations: ['customer', 'film']
    });
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.rentalsRepository.findOne({
      where: { rentalId: id },
      relations: ['customer', 'film']
    });

    if (!rental) {
      throw new NotFoundException(`Location #${id} introuvable`);
    }

    return rental;
  }

  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const customer = await this.customersRepository.findOne({
      where: { customerId: createRentalDto.customerId }
    });

    if (!customer) {
      throw new NotFoundException(`Client #${createRentalDto.customerId} introuvable`);
    }

    const rentalDate = moment.tz(createRentalDto.rentalDate, customer.timezone).toDate();
    const returnDate = moment.tz(createRentalDto.returnDate, customer.timezone).toDate();

    const rental = this.rentalsRepository.create({
      rentalDate,
      returnDate,
      customer,
      film: await this.filmsRepository.findOne({ where: { filmId: createRentalDto.filmId } }),
      isReturned: false
    });

    return this.rentalsRepository.save(rental);
  }

  async findRentalsToNotify(daysBeforeReturn: number): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.find({
      where: { isReturned: false },
      relations: ['customer', 'film']
    });

    const targetRentals = rentals.filter(rental => {
      const timezone = rental.customer.timezone;
      const now = moment().tz(timezone);
      const returnDate = moment(rental.returnDate).tz(timezone);
      return returnDate.diff(now, 'days') === daysBeforeReturn;
    });

    return targetRentals;
  }
}