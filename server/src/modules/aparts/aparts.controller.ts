import { Controller, Get } from '@nestjs/common';
import { ApartsService } from './aparts.service';

@Controller('map')
export class ApartsController {
  constructor(private apartsService: ApartsService){}

  @Get('/aparts')
  getAllAparts() {
    return this.apartsService.getAllAparts();
  }

  @Get('/gus')
  getAllGus() {
    return this.apartsService.getAllGus();
  }
}
