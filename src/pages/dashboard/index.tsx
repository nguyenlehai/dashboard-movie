import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import type { Movie } from '@/types/api';
import { MOCK_DATA } from '@/utils/constants';
import MovieList from '@/components/dashboard/movie-list';
import LanguageDistribution from '@/components/dashboard/language-distribution';
import TopRatedMovies from '@/components/dashboard/top-rated-movies';
import OscarTimeline from '@/components/dashboard/oscar-timeline';
import TopActors from '@/components/dashboard/top-actors';
import StatsCards from '@/components/dashboard/stats-cards';
import { removeDuplicateMovies } from '@/utils/utils';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await adminService.getListMovie();
      const uniqueMovies = removeDuplicateMovies(MOCK_DATA);
      setMovies(uniqueMovies);
      setFilteredMovies(uniqueMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <StatsCards movies={movies} />

      {/* Oscar Statistics Timeline */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <OscarTimeline movies={movies} />
        </Col>
        <Col xs={24} lg={12}>
          <TopActors movies={movies} />
        </Col>
      </Row>

      {/* Language and Rating Distribution */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <LanguageDistribution movies={movies} />
        </Col>
        <Col xs={24} lg={12}>
          <TopRatedMovies movies={movies} />
        </Col>
      </Row>

      {/* Movie List */}
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Dashboard;
