import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDoctorDto {
  @IsUUID('4', { message: 'clinicId should be a valid UUIDv4 structure.' })
  @IsNotEmpty()
  clinicId!: string;

  @IsString()
  @IsNotEmpty({ message: 'The specialty or field of doctor is required.' })
  specialty!: string;

  @IsString()
  @IsNotEmpty({ message: 'The PRC License Number is required for legal operation' })
  licenseNo!: string;
}