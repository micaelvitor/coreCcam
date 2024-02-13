import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column()
    birthday: string;

    @Column({ name: 'purpose_id' })
    purposeId: number;

    @Column()
    admin: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}