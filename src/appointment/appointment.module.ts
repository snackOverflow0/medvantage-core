import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentProcessor } from './appointment.processor';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentProcessor],
})
export class AppointmentModule {}
