import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';
import { LanguageDistributionProps } from '@/types';
import { useThemeStore } from '@/stores/theme-store';

const LanguageDistribution: React.FC<LanguageDistributionProps> = ({
  movies,
}) => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  const languageData = movies.reduce(
    (acc, movie) => {
      movie.language.forEach(lang => {
        if (!acc[lang]) {
          acc[lang] = 1;
        } else {
          acc[lang] += 1;
        }
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const languageChartData = Object.entries(languageData)
    .map(([type, value]) => ({ type, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <Card title="Language Distribution">
      <Pie
        data={languageChartData}
        angleField="value"
        colorField="type"
        radius={0.8}
        label={{
          type: 'outer',
          content: '{name} ({value})',
          style: {
            fill: isDark ? '#ffffff' : '#000000',
            fontSize: 12,
          },
        }}
        legend={{
          itemName: {
            style: {
              fill: isDark ? '#ffffff' : '#000000',
            },
          },
        }}
        theme={isDark ? 'dark' : 'light'}
      />
    </Card>
  );
};

export default LanguageDistribution;
