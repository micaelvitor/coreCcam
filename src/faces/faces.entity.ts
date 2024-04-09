import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity({ name: 'registered_faces' })
export class Faces {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    person_id: string;

    @Column()
    person_name: string;

    @Column({ type: 'jsonb' })
    image_urls: any;

    @Column('boolean', {default: true})
    active: Boolean;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'created_by' }) 
    created_by: Users; 

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
