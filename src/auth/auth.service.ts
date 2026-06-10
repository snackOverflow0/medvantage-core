import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { serialize } from 'v8';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (existingUser) throw new ConflictException('Email is already registered')

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role
      }
    })

    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials')

    return this.getAccessToken(user.id, user.email, user.role)
  }

  private async getAccessToken(userId: string, email: string, role: string) {
    const tokenPayload = { sub: userId, email, role }
    const accessTokenExpiration = '1h'

    return {
      accessToken: await this.jwt.signAsync(tokenPayload, {
        expiresIn: accessTokenExpiration,
        secret: process.env.JWT_SECRET
      })
    }
  }
}
