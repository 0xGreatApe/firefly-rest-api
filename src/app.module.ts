import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { RestModule } from './rest/rest.module';
import { RestService } from './rest/rest.service';
import { RestController } from './rest/rest.controller';

@Module({
  imports: [GraphqlModule, RestModule],
  controllers: [RestController],
  providers: [RestService],
})
export class AppModule {}
