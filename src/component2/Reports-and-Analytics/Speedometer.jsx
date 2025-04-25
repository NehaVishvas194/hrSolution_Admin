import React from 'react';
import Chart from 'react-apexcharts';

const Speedometer = () => {
  const series = [76, 67, 61, 90];
  const options = {
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          }
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          margin: 8,
          fontSize: '16px',
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
        },
      }
    },
    colors: ['#008a00', '#fd0', '#2e47cc', '#ea1212'],
    labels: ['LinkidIn', 'Indeed', 'Naukri', 'Shine'],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
            show: false
        }
      }
    }]
  };

  return (
    <div>
      <div id="chart">
        <Chart options={options} series={series} type="radialBar" height={390} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default Speedometer;
