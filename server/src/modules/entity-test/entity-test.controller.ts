import {Controller, Get} from '@nestjs/common';
import {ApartsService} from "@src/modules/aparts/aparts.service";
import {EntityTestService} from "@src/modules/entity-test/entity-test.service";

@Controller('test')
export class EntityTestController {
  constructor(private test: EntityTestService){}
  
  @Get('')
  testing() {
    console.log('test')
    return this.test.testing();
  }
  
  @Get('2')
  testing2() {
    console.log('test2')
    return this.test.testing2();
  }
  
  @Get('3')
  testing3() {
    console.log('test2')
    return this.test.testing3();
  }
  
  @Get('join')
  testingJoin() {
    console.log('test2')
    return this.test.testingJoin();
  }
  
  @Get('builder')
  testingBuilder() {
    console.log('test2')
    return this.test.testingBuilder();
  }
  
  
}
