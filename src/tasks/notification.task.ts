import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RentalsService } from '../rentals/rentals.service';
import { MailService } from '../services/mail.service';
import * as moment from 'moment-timezone';

@Injectable()
export class NotificationTask {
  private readonly logger = new Logger(NotificationTask.name);

  constructor(
    private rentalsService: RentalsService,
    private mailService: MailService
  ) {}

  @Cron('0 12 * * *')
  async handleScheduledNotifications() {
    this.logger.log('Vérification des locations à notifier...');
    
    const rentals = await this.rentalsService.findAll();
    for (const rental of rentals) {
      const timezone = rental.customer.timezone;
      const now = moment().tz(timezone);
      const returnDate = moment(rental.returnDate).tz(timezone);

      if (returnDate.diff(now, 'days') === 5) {
        this.logger.log(`Envoi notification J-5 à ${rental.customer.email}`);
        await this.mailService.sendNotification(rental.customer.email, 'Votre location est due dans 5 jours.');
      }

      if (returnDate.diff(now, 'days') === 3) {
        this.logger.log(`Envoi notification J-3 à ${rental.customer.email}`);
        await this.mailService.sendNotification(rental.customer.email, 'Votre location est due dans 3 jours.');
      }
    }
  }
}
