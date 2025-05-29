import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum MediaType {
  MOVIE = 'movie',
  PODCAST = 'podcast',
  MUSIC = 'music',
  MUSIC_VIDEO = 'musicVideo',
  AUDIOBOOK = 'audiobook',
  SHORT_FILM = 'shortFilm',
  TV_SHOW = 'tvShow',
  SOFTWARE = 'software',
  EBOOK = 'ebook',
  ALL = 'all',
}

export class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  term: string;

  @IsOptional()
  @IsEnum(MediaType)
  media?: MediaType = MediaType.ALL;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number;
}
