import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesAzureService {
    constructor(private readonly configService: ConfigService) {}

    private async getBlobServiceInstance() {
        const connectionString = this.configService.get('AZURE_BLOB_CONN');
        const blobClientService = BlobServiceClient.fromConnectionString(connectionString);
        return blobClientService;
    }

    private async getBlockBlobClient(imageName: string, containerName: string): Promise<BlockBlobClient> {
        const blobService = await this.getBlobServiceInstance();
        const containerClient = blobService.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);

        return blockBlobClient;
    }

    async uploadFile(fileBuffer: Buffer, containerName: string): Promise<string> {
        const extension = '.jpg';
        const fileName = uuidv4() + extension;

        const blockBlobClient = await this.getBlockBlobClient(fileName, containerName);
        const fileUrl = blockBlobClient.url;

        try {
            await blockBlobClient.uploadData(fileBuffer);
            return fileUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }

    async deleteFile(fileName: string, containerName: string): Promise<void> {
        try {
            const blockBlobClient = await this.getBlockBlobClient(fileName, containerName);
            await blockBlobClient.deleteIfExists();
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Failed to delete file');
        }
    }
}
