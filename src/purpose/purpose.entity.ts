import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'purpose_list' })
export class Purposes {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    purpose: string;
}