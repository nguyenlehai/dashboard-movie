import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface MovieSearchProps {
  onSearch: (value: string) => void;
  total: number;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch, total }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-lg font-medium pt-2">
        Movie List ({total} movies)
      </div>
      <div className="w-full sm:w-auto">
        <Input
          placeholder="Search movies..."
          prefix={<SearchOutlined />}
          onChange={e => onSearch(e.target.value)}
          className="w-full sm:w-[300px]"
          allowClear
        />
      </div>
    </div>
  );
};

export default MovieSearch;
