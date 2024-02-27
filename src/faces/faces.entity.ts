import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'registered_faces' })
export class Faces {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    person_id: string;

    @Column()
    person_name: string;

    @Column({ type: 'jsonb' })
    image_urls: any;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}