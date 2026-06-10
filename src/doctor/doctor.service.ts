import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateDoctorDto) {
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!userExists) throw new NotFoundException('Target User ID not found')

    const licenseConflict = await this.prisma.doctor.findUnique({ where: { licenseNo: dto.licenseNo } })
    if (licenseConflict) throw new ConflictException('The PRC license is already registered')

    const clinicExists = await this.prisma.clinic.findUnique({ where: { id: dto.clinicId } })
    if (!clinicExists) throw new NotFoundException('The chosen clinic is not found')

    return this.prisma.doctor.create({
      data: {
        userId: userId,
        clinicId: dto.clinicId,
        specialty: dto.specialty,
        licenseNo: dto.licenseNo
      },
      
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        },
        clinic: true
      }
    })
  }

  findAll(clinicId: string) {
    return this.prisma.doctor.findMany({
      where: { clinicId },
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      }
    })
  }
}
