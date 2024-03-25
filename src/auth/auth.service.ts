import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './auth.dto';
import { AccountSASPermissions, AccountSASResourceTypes, AccountSASServices, SASProtocol, StorageSharedKeyCredential, generateAccountSASQueryParameters } from '@azure/storage-blob'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string) {
        const user = await this.usersService.validateCredentials({
            username,
            password: pass,
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(signupdata: CreateUserDto) {
        const user = await this.usersService.create(signupdata);
        if (!user) {
            throw new InternalServerErrorException();
        }
        delete user.admin;
        delete user.password;
        return user;
    }

    async getSasToken(ip: string){
        const constants = {
            accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
            accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY
        };
        
        const sharedKeyCredential = new StorageSharedKeyCredential(
            constants.accountName,
            constants.accountKey
        );

        const sasOptions = {
            services: AccountSASServices.parse("btqf").toString(),          
            resourceTypes: AccountSASResourceTypes.parse("sco").toString(), 
            permissions: AccountSASPermissions.parse("rwdlacupi"),
            protocol: SASProtocol.Https,
            IPAddressOrRange: ip,
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + (10 * 60 * 1000)),  // 10 minutes
        };
    
        const sasToken = generateAccountSASQueryParameters(
            sasOptions,
            sharedKeyCredential 
        ).toString();
        
        // prepend sasToken with `?`
        return sasToken;
    }
}