import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from '../entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Film> {
    return this.filmsService.findOne(+id);
  }

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilm(createFilmDto);
  }
}