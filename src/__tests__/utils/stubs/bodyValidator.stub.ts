import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ExampleDto {
  @IsString()
  @IsNotEmpty()
  testValue1: string;

  @IsString()
  @IsNotEmpty()
  testValue2: string;

  @IsBoolean()
  testValue3: boolean;
}
