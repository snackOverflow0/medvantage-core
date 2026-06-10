import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointment')
@UseGuards(AuthGuard('jwt'))
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async requestDoctorSchedule(
    @Req() req: any,
    @Body() dto: CreateAppointmentDto
  ) {
    const patientId = req.user.id
    return this.appointmentService.bookAppointmentSlot(patientId, dto);
  }
}
