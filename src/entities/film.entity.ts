import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('film')
export class Film {
  @PrimaryGeneratedColumn({ name: 'film_id' })
  filmId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'release_year' })
  releaseYear: number;

  @Column({ name: 'rental_duration' })
  rentalDuration: number;

  @Column({ name: 'rental_rate', type: 'decimal' })
  rentalRate: number;

  @Column()
  length: number;

  @Column({ name: 'replacement_cost', type: 'decimal' })
  replacementCost: number;

  @Column()
  rating: string;

  @Column({ name: 'last_update', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdate: Date;
}