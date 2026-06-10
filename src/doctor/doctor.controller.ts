import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('doctor')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post(':userId/profile')
  @Roles(UserRole.CLINIC_ADMIN)
  create(@Param('userId') userId: string, @Body() dto: CreateDoctorDto) {
    return this.doctorService.create(userId, dto);
  }

  @Get('clinic/:clinicId')
  findAll(@Param('clinicId') clinicId: string) {
    return this.doctorService.findAll(clinicId);
  }
}
