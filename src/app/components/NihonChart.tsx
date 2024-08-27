import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getMyLearningChart } from '../../utils/apiService.ts';
import { use, useMemo } from 'react';
import { format, addDays } from 'date-fns';

ChartJS.register(...registerables);

const promiseFetchChartData = getMyLearningChart();

interface DayNumberType {
  created_time: string;
}

const getBeforeDayData = (data: DayNumberType[], beforeDay: number) => {
  const curDate = new Date();
  return data.filter(d => format(d.created_time, 'MM-dd') === format(addDays(curDate, beforeDay), 'MM-dd')).length;
};
const NihonChart = () => {
  const { data: chartRawData } = use(promiseFetchChartData);

  const chartData = useMemo(() => {
    const curDate = new Date();
    const labelDate = [format(addDays(curDate, -6), 'eeee'), format(addDays(curDate, -5), 'eeee'), format(addDays(curDate, -4), 'eeee'), format(addDays(curDate, -3), 'eeee'), format(addDays(curDate, -2), 'eeee'), format(addDays(curDate, -1), 'eeee'), 'Today'];

    const { data } = chartRawData;

    return {
      labels: labelDate,
      datasets: [
        {
          label: '增加單字量',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
          data: [getBeforeDayData(data, -6), getBeforeDayData(data, -5), getBeforeDayData(data, -4), getBeforeDayData(data, -3), getBeforeDayData(data, -2), getBeforeDayData(data, -1), getBeforeDayData(data, 0)]
        }
      ]
    };
  }, [chartRawData]);

  return <Chart type={'line'} data={chartData} />;
};
export default NihonChart;
