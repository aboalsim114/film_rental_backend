import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmsRepository.find();
  }

  async findOne(id: number): Promise<Film> {
    return this.filmsRepository.findOne({ where: { filmId: id } });
  }

  async createFilm(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = this.filmsRepository.create(createFilmDto);
    return this.filmsRepository.save(film);
  }
}