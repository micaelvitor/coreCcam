import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity({ name: 'registered_faces' })
export class Faces {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    person_id: string;

    @Column()
    person_name: string;

    @Column({ type: 'jsonb' })
    image_urls: any;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'created_by' }) 
    created_by: Users; 

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
