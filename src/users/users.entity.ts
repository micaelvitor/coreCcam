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

    @Column({ default: '' })
    fullname: string;

    @Column({ default: '' })
    birthday: string;

    @Column({ name: 'purpose_id', default: 1 })
    purposeId: number;

    @Column({default: '' })
    email: string;

    @Column({default: 0})
    admin: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}