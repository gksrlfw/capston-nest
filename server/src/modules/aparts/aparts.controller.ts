import {BadRequestException, Body, Controller, Get, Post, Query} from '@nestjs/common';
import { ApartsService } from './aparts.service';
import {Test} from "@nestjs/testing";
import {IsString} from "class-validator";

class TestClass {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  @IsString()
  a: string;
  @IsString()
  b: string;
  @IsString()
  c: string;
}

interface TestInterface {
  a: string;
  b: string;
}
type TestType = {
  a: string;
  b: string;
}

@Controller('/')
export class ApartsController {
  constructor(private apartsService: ApartsService){}
  
  @Post('/map/test')
  test(@Body() input: TestClass) {
    console.log(input, typeof input, input instanceof TestClass);
    // const a = new TestClass(input.a, input.b);
    // console.log(a)
  }
  
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
  @Get('/search/aparts')
  searchApart(@Query('apart') apart: string) {
    console.log(apart);
  }
  
  /**
   * 동, 아파트 이름으로 아파트를 검색합니다.
   * @param apart
   */
  @Get('/search/apart')
  searchOneApart(@Query() input: { dong, apart }) {
    return this.apartsService.searchOneApart(input);
  }
  
  /**
   * 좌표로 구를 검색하고, 해당하는 구에 있는 아파트를 리턴합니다.
   * @param input
   */
  @Get('/search/gu')
  searchOneApartWithPosition(@Query() input: { lat, lng }) {
    return this.apartsService.searchOneGuWithPosition(input);
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
    if(!helper) throw new BadRequestException('입력값이 없습니다');
    return this.apartsService.setSearchHelper(helper);
  }
}
