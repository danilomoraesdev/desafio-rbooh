import { Module } from '@nestjs/common';
import { PontosMidiaService } from './pontos-midia.service';
import { PontosMidiaController } from './pontos-midia.controller';

@Module({
  controllers: [PontosMidiaController],
  providers: [PontosMidiaService],
})
export class PontosMidiaModule {}
