import React, { useState } from 'react';
import { Card } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import type { Movie } from '@/types/api';
import MovieSearch from './movie-search';
import MovieTable from './movie-table';
import MovieDetailModal from './movie-detail-modal';
import { MovieListProps, SortableValue, TableChangeHandler } from '@/types';

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [tableSearchText, setTableSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<
    'ascend' | 'descend' | undefined
  >();

  const handleTableChange: TableChangeHandler = (
    pagination,
    _filters,
    sorter,
  ) => {
    setCurrentPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);

    // Handle both single and multiple sorter
    const singleSorter = sorter as SorterResult<Movie>;
    setSortField(singleSorter.field as string);
    setSortOrder(singleSorter.order ?? undefined);
  };

  const getTableFilteredMovies = () => {
    let result = movies;

    if (tableSearchText) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(tableSearchText.toLowerCase()),
      );
    }

    if (sortField && sortOrder) {
      result = [...result].sort((a, b) => {
        const compareValue = (fieldValue: SortableValue): SortableValue =>
          typeof fieldValue === 'string'
            ? fieldValue.toLowerCase()
            : fieldValue;

        const aValue = compareValue(
          a[sortField as keyof Movie] as SortableValue,
        );
        const bValue = compareValue(
          b[sortField as keyof Movie] as SortableValue,
        );

        if (sortOrder === 'ascend') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, result.length);

    return result.slice(startIndex, endIndex);
  };

  const handleSearch = (value: string) => {
    setTableSearchText(value);
    setCurrentPage(1);
  };

  const filteredTotal = movies.filter(
    movie =>
      !tableSearchText ||
      movie.title.toLowerCase().includes(tableSearchText.toLowerCase()),
  ).length;

  return (
    <>
      <Card
        title={<MovieSearch onSearch={handleSearch} total={filteredTotal} />}
      >
        <MovieTable
          dataSource={getTableFilteredMovies()}
          total={filteredTotal}
          currentPage={currentPage}
          pageSize={pageSize}
          onTableChange={handleTableChange}
          onViewDetails={setSelectedMovie}
        />
      </Card>

      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
};

export default MovieList;
