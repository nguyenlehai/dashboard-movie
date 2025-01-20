import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import { OscarTimelineProps } from '@/types';
import { useThemeStore } from '@/stores/theme-store';

const OscarTimeline: React.FC<OscarTimelineProps> = ({ movies }) => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  const oscarStatsByYear = movies.reduce(
    (acc, movie) => {
      if (!acc[movie.year]) {
        acc[movie.year] = {
          year: movie.year,
          nominations: movie.oscar_nominations,
          wins: movie.oscar_winning,
        };
      } else {
        acc[movie.year].nominations += movie.oscar_nominations;
        acc[movie.year].wins += movie.oscar_winning;
      }
      return acc;
    },
    {} as Record<string, { year: string; nominations: number; wins: number }>,
  );

  const oscarTimelineData = Object.values(oscarStatsByYear)
    .sort((a, b) => Number(a.year) - Number(b.year))
    .map(stat => [
      { year: stat.year, type: 'Nominations', value: stat.nominations },
      { year: stat.year, type: 'Wins', value: stat.wins },
    ])
    .flat();

  return (
    <Card title="Oscar Statistics Timeline">
      <Column
        data={oscarTimelineData}
        xField="year"
        yField="value"
        seriesField="type"
        isGroup
        columnStyle={{
          radius: [4, 4, 0, 0],
        }}
        xAxis={{
          label: {
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
        label={{
          position: 'top',
          style: {
            fill: isDark ? '#ffffff' : '#000000',
            opacity: 0.8,
          },
        }}
        legend={{
          itemName: {
            style: {
              fill: isDark ? '#ffffff' : '#000000',
            },
          },
        }}
        tooltip={{
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

export default OscarTimeline;
