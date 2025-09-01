import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  article: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  discounted_price?: number | null;

  @IsOptional()
  @IsString()
  photo_url?: string | null;
}
