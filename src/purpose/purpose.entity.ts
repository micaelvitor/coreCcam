import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'purpose_list' })
export class Users {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    purpose: string;
}