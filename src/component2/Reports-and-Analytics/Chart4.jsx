import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { baseUrl } from '../../features/Api/BaseUrl';

const Chart4 = () => {
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([
    {
      name: 'Talent Pool Count',
      data: []
    },
    {
      name: 'Female Screened Count',
      data: []
    }
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.post(`${baseUrl}get_talent_pool_count`)
      .then((response) => {
        const talentPoolCounts = response.data.details.map(item => item.talentPool_count);
        const femaleScreenedCounts = response.data.details.map(item => item.Female_screened_count);
        setData(response.data.details);
        setSeries([
          {
            name: 'Talent Pool Count',
            data: talentPoolCounts
          },
          {
            name: 'Female Screened Count',
            data: femaleScreenedCounts
          }
        ]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const options = {
    chart: {
      id: 'bar-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: data.map(item => item.month) // Use months from data for x-axis
    },
    colors: ['#dab95c', '#5cdab9'], // Colors for the two data series
  };

  return (
    <div className="bar-chart mt-3">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={480}
        height={320}
      />
      <p className='mt-3'>Total Resume</p>
    </div>
  );
};

export default Chart4;
