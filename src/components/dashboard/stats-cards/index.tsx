import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import {
  GlobalOutlined,
  PlayCircleOutlined,
  StarOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { StatsCardsProps } from '@/types';

const StatsCards: React.FC<StatsCardsProps> = ({ movies }) => {
  const stats = {
    total: movies.length,
    nominated: movies.filter(m => m.oscar_nominations > 0).length,
    winners: movies.filter(m => m.oscar_winning > 0).length,
    countries: new Set(movies.flatMap(m => m.country)).size,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Movies"
            value={stats.total}
            prefix={<PlayCircleOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Nominated Movies"
            value={stats.nominated}
            prefix={<TrophyOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Oscar Winners"
            value={stats.winners}
            prefix={<StarOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Countries"
            value={stats.countries}
            prefix={<GlobalOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
