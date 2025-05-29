import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchHistory } from './itunes-search/entities/search-history.entity';
import { SearchResult } from './itunes-search/entities/search-result.entity';
import { ItunesSearchModule } from './itunes-search/itunes-search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [SearchResult, SearchHistory],
      synchronize: true,
    }),
    ItunesSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
