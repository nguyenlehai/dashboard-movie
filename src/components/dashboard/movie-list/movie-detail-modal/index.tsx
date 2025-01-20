import React from 'react';
import { Card, Col, Descriptions, Modal, Row } from 'antd';
import { MovieDetailModalProps } from '@/types';

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
}) => {
  if (!movie) return null;

  return (
    <Modal
      title={movie.title}
      visible={!!movie}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Descriptions bordered>
            <Descriptions.Item label="Year" span={1}>
              {movie.year}
            </Descriptions.Item>
            <Descriptions.Item label="Rating" span={1}>
              {movie.imdb_rating}
            </Descriptions.Item>
            <Descriptions.Item label="Oscar Nominations" span={1}>
              {movie.oscar_nominations}
            </Descriptions.Item>
            <Descriptions.Item label="Oscar Wins" span={1}>
              {movie.oscar_winning}
            </Descriptions.Item>
            <Descriptions.Item label="Genre" span={3}>
              {movie.genre.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Cast" span={3}>
              {movie.cast.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Languages" span={3}>
              {movie.language.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Countries" span={3}>
              {movie.country.join(', ')}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        {movie.oscar_nominations > 0 && (
          <Col span={24}>
            <Card title="Oscar Nominations">
              <ul>
                {movie.oscar_nominations_list.map((nom, idx) => (
                  <li key={idx}>{nom}</li>
                ))}
              </ul>
            </Card>
          </Col>
        )}
        {movie.oscar_winning > 0 && (
          <Col span={24}>
            <Card title="Oscar Wins">
              <ul>
                {movie.oscar_winning_list.map((win, idx) => (
                  <li key={idx}>{win}</li>
                ))}
              </ul>
            </Card>
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default MovieDetailModal;
