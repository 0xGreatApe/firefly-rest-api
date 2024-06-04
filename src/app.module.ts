import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';
import { RestModule } from './rest/rest.module';
import { RestService } from './rest/rest.service';
import { RestController } from './rest/rest.controller';

@Module({
  imports: [
    GraphqlModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'), // Adjust the path as needed
      serveRoot: '/dist/', // Optional, default is '/'
    }),
    RestModule,
  ],
  controllers: [RestController],
  providers: [RestService],
})
export class AppModule {}
