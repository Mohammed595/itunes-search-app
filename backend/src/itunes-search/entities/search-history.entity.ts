import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('search_history')
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  searchTerm: string;

  @Column({ type: 'int', default: 50 })
  limit: number;

  @Column({ type: 'int', default: 0 })
  resultCount: number;

  @OneToMany('SearchResult', 'searchHistory', { cascade: true })
  results: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
