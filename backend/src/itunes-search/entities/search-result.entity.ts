import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('search_results')
export class SearchResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('SearchHistory', 'results', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'searchHistoryId' })
  searchHistory: any;

  @Column({ type: 'int' })
  searchHistoryId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wrapperType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kind: string;

  @Column({ type: 'bigint' })
  trackId: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  artistName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  collectionName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  trackName: string;

  @Column({ type: 'text', nullable: true })
  collectionViewUrl: string;

  @Column({ type: 'text', nullable: true })
  trackViewUrl: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl30: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl60: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl100: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  collectionPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  trackPrice: number;

  @Column({ type: 'timestamp', nullable: true })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  collectionExplicitness: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  trackExplicitness: string;

  @Column({ type: 'int', nullable: true })
  trackCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  primaryGenreName: string;

  @Column({ type: 'text', nullable: true })
  longDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
