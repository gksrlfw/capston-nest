import {Body, Controller, Get, Query} from '@nestjs/common';
import { ApartsService } from './aparts.service';

@Controller('/')
export class ApartsController {
  constructor(private apartsService: ApartsService){}

  @Get('/map/aparts')
  getAllAparts(@Body() position) {
    console.log(position)
    return this.apartsService.getAllAparts();
  }

  @Get('/map/gus')
  getAllGus() {
    return this.apartsService.getAllGus();
  }

  /**
   * 유저가 실제로 엔터를 눌럿을 때 검색한 아파트를 보여줘야한다
   * 기본적인 아파트 정보를 보내주고, 맵의 좌표를 그곳으로 향하게 해줘야 한다
   * @param apart
   */
  @Get('/search/apart')
  searchApart(@Query('apart') apart: string) {
    console.log(apart);
  }

  /**
   * 필터를 통해 구를 설정하면 해당 구에대한 데이터를 프론트에 보내주고, 맵에서 이를 가리키도록 해야한다
   * @param gu
   */
  @Get('/search/gu')
  searchGu(@Query('gu') gu: string) {
    console.log(gu);
  }

  /**
   * 서치 헬퍼 불러오기
   * 유저가 검색한 내용과 일치하는 문자열을 가진 아파트 이름을 프론트로 보내준다
   * @param helper
   */
  @Get('/search/helper')
  setSearchHelper(@Query('helper') helper: string) {
    return this.apartsService.setSearchHelper(helper);
  }
}
