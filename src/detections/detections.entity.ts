import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'detections' })
export class Detections {
    @PrimaryGeneratedColumn('uuid', { name: 'detection_id' })
    detection_id: string;

    @Column()
    person_id: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

}