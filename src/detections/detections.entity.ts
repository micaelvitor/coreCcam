import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity({ name: 'detections' })
export class Detections {
    @PrimaryGeneratedColumn('uuid', { name: 'detection_id' })
    detection_id: string;

    @Column()
    person_id: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'owner_id' }) 
    owner_id: Users; 

}