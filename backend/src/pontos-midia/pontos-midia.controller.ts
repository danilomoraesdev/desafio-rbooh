import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PontosMidiaService } from './pontos-midia.service';
import { CreatePontoMidiaDto } from './dto/create-ponto-midia.dto';
import { UpdatePontoMidiaDto } from './dto/update-ponto-midia.dto';

@ApiTags('pontos-midia')
@Controller('pontos-midia')
export class PontosMidiaController {
  constructor(private readonly pontosMidiaService: PontosMidiaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo ponto de mídia' })
  @ApiResponse({
    status: 201,
    description: 'Ponto de mídia criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body(ValidationPipe) createPontoMidiaDto: CreatePontoMidiaDto) {
    return this.pontosMidiaService.create(createPontoMidiaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pontos de mídia' })
  @ApiResponse({ status: 200, description: 'Lista de pontos de mídia' })
  findAll() {
    return this.pontosMidiaService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um ponto de mídia' })
  @ApiResponse({
    status: 200,
    description: 'Ponto de mídia atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Ponto de mídia não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePontoMidiaDto: UpdatePontoMidiaDto,
  ) {
    return this.pontosMidiaService.update(id, updatePontoMidiaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um ponto de mídia' })
  @ApiResponse({
    status: 200,
    description: 'Ponto de mídia excluído com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Ponto de mídia não encontrado' })
  remove(@Param('id') id: string) {
    return this.pontosMidiaService.remove(id);
  }
}
