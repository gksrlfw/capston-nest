
import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { microserviceConfig } from './microserviceConfig';

@Controller('kafka')
export class KafkaController implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  @Client(microserviceConfig)
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = ['entity-created'];
    requestPatterns.forEach(pattern => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Get()
  getHello(): string {
    // fire event to kafka
    // this.client.emit<string>('entity-created', 'some entity ' + new Date());
    return this.kafkaService.getHello();
  }

  @EventPattern('entity-created')
  async handleEntityCreated(payload: any) {
    console.log(JSON.stringify(payload) + ' created');
    //console.log(payload.value + ' created');
  }
}
