import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async instantiateClinic(dto: CreateClinicDto) {
    return this.prisma.clinic.create({
      data: {
        name: dto.name,
        address: dto.address
      }
    }) 
  }

  async getAllClinics() {
    return this.prisma.clinic.findMany({
      include: {
        _count: {
          select: {
            doctors: true
          }
        }
      }
    })
  }
}
