import { IsString, IsNotEmpty } from 'class-validator'

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name!: string

  @IsString()
  @IsNotEmpty({ message: 'Address cannot be empty.' })
  address!: string
}
