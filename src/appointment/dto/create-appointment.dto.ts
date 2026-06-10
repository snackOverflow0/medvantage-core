import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID('4', { message: 'The clinicId should be a valid UUID string.' })
  @IsNotEmpty()
  clinicId!: string;

  @IsUUID('4', { message: 'The doctorId should be a valid Doctor Profile UUID format.' })
  @IsNotEmpty()
  doctorId!: string;

  @IsISO8601({}, { message: 'The timeSlot should follow the standard ISO8601 format string.' })
  @IsNotEmpty()
  timeSlot!: string;
}