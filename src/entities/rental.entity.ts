import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Film } from './film.entity';

@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn({ name: 'rental_id' })
  rentalId: number;

  @Column({ name: 'rental_date' })
  rentalDate: Date;

  @Column({ name: 'return_date', nullable: true })
  returnDate: Date;

  @Column({ name: 'is_returned', default: false })
  isReturned: boolean;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Film)
  @JoinColumn({ name: 'film_id' })
  film: Film;
}