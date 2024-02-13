# Estrutura de pastas:
```
src
|
└─Objeto
|  |
|  └───service.ts
|  |
|  └───controller.ts
|  |
|  └───module.ts
```

# Registrar um objeto no AppModule:

```js
@Module({
  imports: [
     MongooseModule.forFeature([
      {
        name: <Objeto>ORM.name,
        schema: <Objeto>Schema,
        collection: process.env.COLLECTION_NAME,
      },
    ]),
  ]
})
```

# TODO: Padrão de chaves do Redis:

# Exemplos

## Exemplo Controller

```js
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() signupdata: CreateUserDto) {
        return this.authService.signUp(signupdata);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
```

## Exemplo Service

```js
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
}
```
