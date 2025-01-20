import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import { ActorData, TopActorsProps } from '@/types';
import { useThemeStore } from '@/stores/theme-store';

const TopActors: React.FC<TopActorsProps> = ({ movies }) => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  const actorsData = movies.reduce(
    (acc, movie) => {
      movie.cast.forEach(actor => {
        if (!acc[actor]) {
          acc[actor] = { actor, appearances: 1 };
        } else {
          acc[actor].appearances += 1;
        }
      });
      return acc;
    },
    {} as Record<string, ActorData>,
  );

  const topActorsData = Object.values(actorsData)
    .sort((a, b) => b.appearances - a.appearances)
    .slice(0, 10);

  return (
    <Card title="Top 10 Actors">
      <Column
        data={topActorsData}
        xField="actor"
        yField="appearances"
        label={{
          position: 'top',
          style: {
            fill: isDark ? '#ffffff' : '#1890ff',
            opacity: 0.8,
          },
        }}
        xAxis={{
          label: {
            autoRotate: true,
            autoHide: false,
            autoEllipsis: true,
            style: {
              fill: isDark ? '#ffffff' : '#000000',
            },
          },
        }}
        yAxis={{
          label: {
            style: {
              fill: isDark ? '#ffffff' : '#000000',
            },
          },
        }}
        columnStyle={{
          fill: '#1890ff',
          fillOpacity: isDark ? 0.6 : 0.8,
          radius: [4, 4, 0, 0],
        }}
        tooltip={{
          title: 'Actor',
          formatter: (datum: ActorData) => {
            return {
              name: 'Movies',
              value: datum.appearances,
            };
          },
          domStyles: {
            'g2-tooltip': {
              backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              boxShadow: isDark
                ? '0 2px 8px rgba(255,255,255,0.15)'
                : '0 2px 8px rgba(0,0,0,0.15)',
            },
          },
        }}
        theme={isDark ? 'dark' : 'light'}
      />
    </Card>
  );
};

export default TopActors;
