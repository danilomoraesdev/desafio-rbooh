import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePontoMidiaDto } from './dto/create-ponto-midia.dto';
import { UpdatePontoMidiaDto } from './dto/update-ponto-midia.dto';

@Injectable()
export class PontosMidiaService {
  constructor(private prisma: PrismaService) {}

  async create(createPontoMidiaDto: CreatePontoMidiaDto) {
    return this.prisma.pontoMidia.create({
      data: {
        ...createPontoMidiaDto,
        dataInicio: new Date(createPontoMidiaDto.dataInicio),
        dataFim: new Date(createPontoMidiaDto.dataFim),
      },
    });
  }

  async findAll() {
    return this.prisma.pontoMidia.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const pontoMidia = await this.prisma.pontoMidia.findUnique({
      where: { id },
    });

    if (!pontoMidia) {
      throw new NotFoundException(`Ponto de mídia com ID ${id} não encontrado`);
    }

    return pontoMidia;
  }

  async update(id: string, updatePontoMidiaDto: UpdatePontoMidiaDto) {
    await this.findOne(id);

    const data: any = { ...updatePontoMidiaDto };
    if (updatePontoMidiaDto.dataInicio) {
      data.dataInicio = new Date(updatePontoMidiaDto.dataInicio);
    }
    if (updatePontoMidiaDto.dataFim) {
      data.dataFim = new Date(updatePontoMidiaDto.dataFim);
    }

    return this.prisma.pontoMidia.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.pontoMidia.delete({
      where: { id },
    });
  }
}
