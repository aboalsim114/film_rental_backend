import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendNotification(email: string, message: string): Promise<void> {
    this.logger.log(`Simulation d'envoi d'email à ${email}: ${message}`);
  }
} 