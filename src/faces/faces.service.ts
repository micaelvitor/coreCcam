import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { FilesAzureService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateFaceDto } from './faces.dto';
import { Faces } from './faces.entity';
import { filterImageFromURL } from './utils/filterImageFromUrl.utils';

@Injectable()
export class FacesService {
    constructor(
        @InjectRepository(Faces)
        private readonly facesRepository: Repository<Faces>,
        private readonly filesAzureService: FilesAzureService,
        private readonly usersRepository: UsersService
    ) {}

    private readonly containerName: string = 'ccamimages';

    async findOneByPerson(person_id: string): Promise<Faces | undefined> {
        const person = await this.facesRepository.findOne({ where: { person_id }, relations: ['created_by'] });
        if (person == null) {
            return undefined;
        }
        return person;
    }

    async create(facedata: CreateFaceDto) {
        try {
            const user = await this.usersRepository.findOneById(facedata.created_by);
            if (!user) {
                throw new Error('User not found');
            }
    
            const face = this.facesRepository.create({
                ...facedata,
                created_by: user
            });
    
            return await this.facesRepository.save(face);
        } catch (error) {
            console.error('Error creating face:', error);
            throw new Error('Failed to create face');
        }
    }

    async uploadImage(imageBuffer: Buffer, containerName: string): Promise<string> {
        try {
            console.log('Image buffer length:', imageBuffer.length);

            const tempDir = path.join(__dirname, '..', '..', 'temp_upload');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            const tempFileName = `${tempDir}/${uuidv4()}.jpg`;
            fs.writeFileSync(tempFileName, imageBuffer);

            const filteredImageURL = await filterImageFromURL(tempFileName); // Filter the image
            const convertedImageBuffer = fs.readFileSync(filteredImageURL);

            const uploadedImageUrl = await this.filesAzureService.uploadFile(convertedImageBuffer, containerName);

            fs.unlinkSync(tempFileName);
            fs.unlinkSync(filteredImageURL);

            return uploadedImageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    }

    async getAll(person_id: string): Promise<Faces>{
        const faces: Faces = await this.facesRepository.findOne({ where: { person_id } });
        return faces;
    }

    async getAllByUser(user_id: string): Promise<Faces[]>{
        try{
            const faces = await this.facesRepository.find(
                { 
                    where: { 
                        created_by: { id: user_id } 
                    } 
                }
            );
            if(faces.length == 0){
                throw new NotFoundException("Ops, there is no faces for this user");
            }
            return faces;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(person_id: string): Promise<Faces> {
        try {
            const user = await this.facesRepository.findOne({
                where: { person_id },
            });
    
            if (!user) {
                throw new Error("User not found");
            }
    
            let imageUrls = user.image_urls || [];
            
            if (typeof imageUrls === 'string') {
                imageUrls = imageUrls.split(',').map(url => url.trim());
            }
    
            await this.facesRepository.update(person_id, {
                ...user,
                active: false
            });
    
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
