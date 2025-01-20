import type { TablePaginationConfig } from 'antd/es/table';
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';
import type { Movie } from '@/types/api';

export interface MovieTableProps {
  dataSource: Movie[];
  total: number;
  currentPage: number;
  pageSize: number;
  onTableChange: TableChangeHandler;
  onViewDetails: (movie: Movie) => void;
}

export interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export interface OscarTimelineProps {
  movies: Movie[];
}

export interface LanguageDistributionProps {
  movies: Movie[];
}

export interface StatsCardsProps {
  movies: Movie[];
}

export interface TopRatedMoviesProps {
  movies: Movie[];
}

export interface MovieCard {
  rank: number;
  title: string;
  rating: number;
  stars: number;
}

export interface MovieListProps {
  movies: Movie[];
}

export interface TopActorsProps {
  movies: Movie[];
}

export interface ActorData {
  actor: string;
  appearances: number;
}

export interface TopActorsProps {
  movies: Movie[];
}

export type TableChangeHandler = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<Movie> | SorterResult<Movie>[],
  extra: TableCurrentDataSource<Movie>,
) => void;

export type SortableValue = string | number;
