import {BadRequestException, Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import { ApartsService } from './aparts.service';
import {Test} from "@nestjs/testing";
import {IsString} from "class-validator";
import {JwtAuthGuard} from "@common/guards/auth-jwt.guard";
import axios from "axios";
import {User} from "@common/decorators/user.decorator";
import {UserEntity} from "@src/modules/users/entities/users.entity";

@Controller('/')
export class ApartsController {
  private recommendLists = {};
  constructor(private apartsService: ApartsService){}
  
  @Get('/map/aparts')
  getAllAparts(@Body() position) {
    console.log(position)
    return this.apartsService.getAllAparts();
  }

  @Get('/map/gus')
  async getAllGus() {
    console.log('recommendLists: ', this.recommendLists);
    return {
      gus: await this.apartsService.getAllGus(),
      recommendLists: await this.recommendLists
    };
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
    * recommend =-> ids 로 아파트를 검색합니다.
    * @param apart 
    */
  @Post('/search/aparts/ids')
  async searchApartsWithIds(@Body('ids') ids: number[]) {
    if(!ids || !ids.length) return;
    return this.apartsService.searchApartsWithIds(ids);
  }
  
  /**
   * 동, 아파트 이름으로 아파트를 검색합니다.
   * 모든 검색은 이를 통합니다. 여기서 데이터를 플라스크 서버로 전송해줍시다.
   * @param apart
   */
  @Get('/search/apart')
  @UseGuards(JwtAuthGuard)
  async searchOneApart(@Query() input: { dong, apart }, @User() user: UserEntity) {
    console.log('searchOneApart', user);
    // this.recommendLists = this.apartsService.sendInfoForRecommendation({ dong: input.dong, apart: input.apart, user })
    // !== undefined ? this.apartsService.sendInfoForRecommendation({ dong: input.dong, apart: input.apart, user })
    //   : this.recommendLists;
    return this.apartsService.searchOneApart(input);
  }
  
  @Get('/search/apart/recommend')
  @UseGuards(JwtAuthGuard)
  async recommend(@Query() input: { dong, apart }, @User() user: UserEntity) {
    console.log('recommend', user);
    this.recommendLists = await this.apartsService.sendInfoForRecommendation2({ dong: input.dong, apart: input.apart, user });
    return this.recommendLists;
    // return[{
    //   dong: '사직동',
    //   built_at: '2007',
    //   apart: '삼정그린코아',
    //   price: '5억'
    // },
    // {
    //   dong: '사직2동',
    //   built_at: '2007',
    //   apart: '삼정그린코아',
    //   price: '5억'
    // }];
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
