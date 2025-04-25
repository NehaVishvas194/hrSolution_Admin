import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';

const Chart3 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.post(`${baseUrl}get_female_screened_count`)
      .then((response) => {
        setData(response.data.details);
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
      categories: data.map(item => item.month)
    },
    colors: ['#272d67']
  };

  const series = [{
    name: 'Female Screened Count',
    data: data.map(item => item.Female_screened_count)
  }];

  return (
    <div className="bar-graph mt-3">
      <Chart options={options} series={series} type="bar" width={480} height={320} />
      <p className='mt-3'>Total Female</p>
    </div>
  );
};

export default Chart3;
