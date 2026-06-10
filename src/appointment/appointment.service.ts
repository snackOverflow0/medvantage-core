import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}
  async bookAppointmentSlot(patientId: string, dto: CreateAppointmentDto) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id: dto.doctorId }, include: { user: true } })
    if (!doctor) throw new NotFoundException('Target doctor not found')

    const appointment = await this.prisma.appointment.create({
      data: {
        clinicId: dto.clinicId,
        doctorId: dto.doctorId,
        patientId: patientId,
        timeSlot: new Date(dto.timeSlot),
        status: 'PENDING'
      }
    })

    this.eventEmitter.emit('appointment.placed', {
      appointmentId: appointment.id,
      doctorLicense: doctor.licenseNo,
      clinicId: dto.clinicId,
      timeRecorded: appointment.createdAt
    })

    return appointment
  }
}
