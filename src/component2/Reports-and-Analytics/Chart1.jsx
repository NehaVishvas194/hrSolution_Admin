import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { baseUrl } from '../../features/Api/BaseUrl';

const Chart1 = () => {
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([{
    name: 'series-1',
    data: []
  }]);

  useEffect(() => {
    gatdata();
  }, []);

  const gatdata = () => {
    axios.post(`${baseUrl}getclient_count`)
      .then((response) => {
        const clientCounts = response.data.details.map(item => item.client_count);
        setData(response.data.details);
        setSeries([{
          name: 'Client Count',
          data: clientCounts
        }]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const options = {
    chart: {
      id: 'basic-line'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: ['#02094d'],
  };

  return (

    <div className='mt-3'>
      <Chart options={options} series={series} type="line" width={480} height={320} />
      <p className='mt-3'>Total clients</p>
    </div>
  );
}

export default Chart1;
