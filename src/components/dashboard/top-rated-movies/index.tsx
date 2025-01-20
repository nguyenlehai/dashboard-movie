import React from 'react';
import { Card, Col, Rate, Row, Tooltip, Typography } from 'antd';
import { TrophyFilled } from '@ant-design/icons';
import { MovieCard, TopRatedMoviesProps } from '@/types';
import { useThemeStore } from '@/stores/theme-store';

const { Text, Paragraph } = Typography;

const TopRatedMovies: React.FC<TopRatedMoviesProps> = ({ movies }) => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  const topRatedData = movies
    .sort((a, b) => b.imdb_rating - a.imdb_rating)
    .slice(0, 10);

  const topThree: MovieCard[] = topRatedData
    .slice(0, 3)
    .map((movie, index) => ({
      rank: index + 1,
      title: movie.title,
      rating: movie.imdb_rating,
      stars: (movie.imdb_rating / 10) * 5,
    }));

  const restMovies: MovieCard[] = topRatedData.slice(3).map((movie, index) => ({
    rank: index + 4,
    title: movie.title,
    rating: movie.imdb_rating,
    stars: (movie.imdb_rating / 10) * 5,
  }));

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#ffd700'; // Gold
      case 2:
        return '#c0c0c0'; // Silver
      case 3:
        return '#cd7f32'; // Bronze
      default:
        return isDark ? '#999999' : '#666666';
    }
  };

  const getCardStyle = (rank: number) => {
    if (rank <= 3) {
      return {
        background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
        boxShadow: isDark
          ? '0 2px 8px rgba(0,0,0,0.3)'
          : '0 2px 8px rgba(0,0,0,0.15)',
        border: `1px solid ${getRankColor(rank)}`,
        height: '100%',
      };
    }
    return {
      background: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f5f5f5',
      opacity: 0.8,
      height: '100%',
    };
  };

  const renderMovieCard = (movie: MovieCard) => (
    <Col
      key={movie.title}
      xs={24}
      sm={movie.rank <= 3 ? 8 : 12}
      lg={movie.rank <= 3 ? 8 : 6}
    >
      <Card
        size="small"
        bordered={false}
        style={getCardStyle(movie.rank)}
        bodyStyle={{
          padding: movie.rank <= 3 ? 16 : 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Text
            style={{
              fontSize: movie.rank <= 3 ? 28 : 20,
              fontWeight: 'bold',
              color: getRankColor(movie.rank),
              minWidth: '36px',
              textShadow:
                movie.rank <= 3
                  ? isDark
                    ? '0 2px 4px rgba(0,0,0,0.3)'
                    : '0 2px 4px rgba(0,0,0,0.1)'
                  : 'none',
            }}
          >
            #{movie.rank}
          </Text>
          <div style={{ flex: 1 }}>
            <Tooltip title={movie.title.length > 30 ? movie.title : ''}>
              <Paragraph
                strong
                ellipsis={{ rows: 2 }}
                style={{
                  marginBottom: 8,
                  fontSize: movie.rank <= 3 ? 16 : 14,
                  opacity: movie.rank <= 3 ? 1 : 0.8,
                  cursor: movie.title.length > 30 ? 'help' : 'default',
                  color: isDark ? '#ffffff' : 'inherit',
                }}
              >
                {movie.title}
              </Paragraph>
            </Tooltip>
            <div>
              <Rate
                disabled
                allowHalf
                value={movie.stars}
                style={{
                  fontSize: movie.rank <= 3 ? 16 : 12,
                }}
              />
              <Text
                style={{
                  marginLeft: 8,
                  color:
                    movie.rank <= 3
                      ? isDark
                        ? '#1890ff'
                        : '#1890ff'
                      : isDark
                        ? '#999999'
                        : '#666666',
                  fontSize: movie.rank <= 3 ? 16 : 14,
                  fontWeight: movie.rank <= 3 ? 'bold' : 'normal',
                }}
              >
                {movie.rating.toFixed(1)}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrophyFilled style={{ color: '#ffd700' }} />
          <span>Top Rated Movies</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top 3 */}
        <Row gutter={[16, 16]} justify="center">
          {topThree.map(renderMovieCard)}
        </Row>

        {/* Rest of movies */}
        <Row gutter={[16, 16]}>{restMovies.map(renderMovieCard)}</Row>
      </div>
    </Card>
  );
};

export default TopRatedMovies;
