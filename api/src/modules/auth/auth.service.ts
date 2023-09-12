import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { SigninDto } from './dto/signin';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/singup';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UsersRepository, 
        private readonly jwtService: JwtService
    ) {}

    async signin(authenticateDto: SigninDto) {
        const { email, password } = authenticateDto;
         
        const user = await this.usersRepo.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid Credentials!')
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials!')
        }

        const accessToken = await this.generateAccessToken(user.id);
        
        return { accessToken };
    }

    async signup(signupDto: SignupDto) {
        const { name, email, password } = signupDto;
    
        const emailTaken = await this.usersRepo.findUnique({
          where: { email },
          select: { id: true }
        });
    
        if (emailTaken) {
          throw new ConflictException('This email already in use.');
        }
    
        const hashedPasswrod = await hash(password, 8);
    
        const user = await this.usersRepo.create({
          data: { 
            name, 
            email, 
            password: hashedPasswrod,
            categories: {
              createMany: {
                data: [
                  // Income
                  { name: 'Salário', icon: 'salary', type: 'INCOME' },
                  { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
                  { name: 'Outro', icon: 'other', type: 'INCOME' },
                  // Expense
                  { name: 'Casa', icon: 'home', type: 'EXPENSE' },
                  { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
                  { name: 'Educação', icon: 'education', type: 'EXPENSE' },
                  { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
                  { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
                  { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
                  { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
                  { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
                  { name: 'Outro', icon: 'other', type: 'EXPENSE' },
                ]
              }
            }
          }
        });
    
        const accessToken = await this.generateAccessToken(user.id);
        
        return { accessToken };
    }

    private generateAccessToken(userId: string) {
      return this.jwtService.signAsync({
          sub: userId
      });
    }
}
