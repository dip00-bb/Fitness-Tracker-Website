import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BarChart } from '@mui/x-charts';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function DashBoardChart() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const data = [1, 2, 1.5, 2, 1, 2.5, 1];

  const chartHeight = isMobile ? 250 : isTablet ? 350 : 400;
  const padding = isMobile
    ? { left: 10, right: 10, top: 10, bottom: 10 }
    : isTablet
      ? { left: 15, right: 15, top: 15, bottom: 15 }
      : { left: 20, right: 20, top: 20, bottom: 20 };

  return (
    <Card sx={{ p: 0, backgroundColor: '', borderRadius: 1, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#288650' }} gutterBottom>
          Weekly Exercise (Hours)
        </Typography>

        <Box sx={{ borderRadius: 2, }}>
          <BarChart
            height={chartHeight}
            xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
            series={[{ data, label: 'Exercise Hours', color: 'green' }]}
            padding={padding}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
