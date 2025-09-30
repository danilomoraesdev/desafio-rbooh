import { PartialType } from '@nestjs/swagger';
import { CreatePontoMidiaDto } from './create-ponto-midia.dto';

export class UpdatePontoMidiaDto extends PartialType(CreatePontoMidiaDto) {}
