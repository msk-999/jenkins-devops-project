import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  coverLetter: string;

  @Column()
  resumePath: string;

  @Column()
  resumeName: string;
  
}
