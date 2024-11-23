import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {} 