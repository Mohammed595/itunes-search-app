import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistory } from './entities/search-history.entity';
import { SearchResult } from './entities/search-result.entity';
import { ItunesSearchController } from './itunes-search.controller';
import { ItunesSearchService } from './itunes-search.service';

@Module({
  imports: [TypeOrmModule.forFeature([SearchResult, SearchHistory])],
  controllers: [ItunesSearchController],
  providers: [ItunesSearchService],
  exports: [ItunesSearchService],
})
export class ItunesSearchModule {}
