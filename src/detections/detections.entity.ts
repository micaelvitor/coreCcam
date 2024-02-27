import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'detections' })
export class Detections {
    @PrimaryGeneratedColumn('uuid', { name: 'detection_id' })
    detection_id: string;

    @Column()
    person_id: string;

}