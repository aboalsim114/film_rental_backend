import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-test')
  async testDatabase() {
    try {
      // Tente de compter le nombre de films
      const count = await this.filmsRepository.count();
      return {
        status: 'success',
        message: 'Connexion à la base de données réussie',
        filmCount: count
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erreur de connexion à la base de données',
        error: error.message
      };
    }
  }
}
