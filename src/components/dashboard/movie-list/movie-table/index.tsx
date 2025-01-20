import React from 'react';
import { Button, Table, Tag } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Movie } from '@/types/api';
import { MovieTableProps } from '@/types';

const MovieTable: React.FC<MovieTableProps> = ({
  dataSource,
  total,
  currentPage,
  pageSize,
  onTableChange,
  onViewDetails,
}) => {
  const columns: ColumnsType<Movie> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      ellipsis: true,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: 100,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Rating',
      dataIndex: 'imdb_rating',
      key: 'rating',
      width: 100,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (rating: number) => (
        <Tag color="blue">
          <StarOutlined /> {rating.toFixed(1)}
        </Tag>
      ),
    },
    {
      title: 'Oscar Nominations',
      dataIndex: 'oscar_nominations',
      key: 'nominations',
      width: 150,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Oscar Wins',
      dataIndex: 'oscar_winning',
      key: 'wins',
      width: 150,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_: unknown, record: Movie) => (
        <Button type="link" onClick={() => onViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table<Movie>
      dataSource={dataSource}
      columns={columns}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        pageSizeOptions: ['5', '10', '20', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        position: ['bottomRight'],
      }}
      onChange={onTableChange}
      rowKey="title"
      scroll={{ x: 1000 }}
      size="middle"
      bordered
    />
  );
};

export default MovieTable;
