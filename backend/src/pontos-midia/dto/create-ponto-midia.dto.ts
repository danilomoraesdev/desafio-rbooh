import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePontoMidiaDto {
  @ApiProperty({ example: 'Painel Led Alameda Ricardo Paranhos' })
  @IsString()
  titulo: string;

  @ApiProperty({
    example:
      'Ponto de mídia localizado na Alameda Ricardo Paranhos - St. Marista',
  })
  @IsString()
  descricao: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z' })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ example: '2025-12-31T23:59:59Z' })
  @IsDateString()
  dataFim: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
