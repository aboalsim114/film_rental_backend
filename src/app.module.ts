import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Entités
import { Film } from './entities/film.entity';
import { Customer } from './entities/customer.entity';
import { Rental } from './entities/rental.entity';

// Contrôleurs
import { AppController } from './app.controller';
import { FilmsController } from './films/films.controller';
import { CustomersController } from './customers/customers.controller';
import { RentalsController } from './rentals/rentals.controller';

// Services
import { AppService } from './app.service';
import { FilmsService } from './films/films.service';
import { CustomersService } from './customers/customers.service';
import { RentalsService } from './rentals/rentals.service';
import { MailService } from './services/mail.service';

// Tâches
import { NotificationTask } from './tasks/notification.task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'sakila',
      entities: [Film, Customer, Rental],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Film, Customer, Rental]),
  ],
  controllers: [
    AppController,
    FilmsController,
    CustomersController,
    RentalsController,
  ],
  providers: [
    AppService,
    FilmsService,
    CustomersService,
    RentalsService,
    MailService,
    NotificationTask,
  ],
})
export class AppModule {}