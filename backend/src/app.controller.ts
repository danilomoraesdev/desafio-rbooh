import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  private readonly startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  @Get()
  @ApiOperation({ summary: 'Verifica o estado da API' })
  @ApiResponse({
    status: 200,
    description: 'Health check',
  })
  check() {
    const uptime = (Date.now() - this.startTime) / 1000;

    return {
      status: 'ok',
      uptime: `${uptime.toFixed(2)} seconds`,
    };
  }
}
