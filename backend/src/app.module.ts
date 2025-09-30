import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { PontosMidiaModule } from './pontos-midia/pontos-midia.module';

@Module({
  imports: [PrismaModule, PontosMidiaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
