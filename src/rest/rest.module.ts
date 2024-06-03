import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { GraphqlModule } from '../graphql/graphql.module';

@Module({
  imports: [GraphqlModule],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule {}
