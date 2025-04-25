// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import { baseUrl } from '../../features/Api/BaseUrl';

// const BarChart = () => {
// const [data,setData]=useState({})
//   useEffect(() => {
//     getdata()
//   }, [])
//   const getdata = () => {
//     axios.post(`${baseUrl}jobseeker_count_city_wise`).then((response) => {
//       setData(response.data.details)
//     }).catch((error) => {
//       console.log(error.response.data)
//     })
//   }

//   const chartData = {
//     options: {
//       chart: {
//         id: 'basic-bar',
//       },
//       xaxis: {
//         categories: ["Area Urban", "Area Rural", "Bombali", "Bonthe", "Kailahun", "Kambia", "Kenema", "Koinadugu", "Kono",
//           "Moyamba",
//           "Port Loko",
//           "Pujehun",
//           "Tonkolili",
//           "Bo",
//           "Karene",
//           "Falaba"],
//       },
//       // Change the color of the bars from blue to red
//       colors: ['#dab95c'], // Red color code
//     },
//     series: [
//       {
//         name: 'Sales',
//         data: [data?.Western_Area_Rural, data?.Western_Area_Urban, data?.Bombali, data?.Bonthe, data?.Kailahun, data?.Kambia, data?.Kenema, data?.Koinadugu, data?.Kono,
//            data?.Moyamba, data?.Port_Loko, data?.Pujehun, data?.Tonkolili, data?.Bo, data?.Karene, data?.Falaba],
//       },
//     ],
//   };

//   return (
//     <div>
//       <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         width="500"
//       />
//     </div>
//   );
// };

// export default BarChart;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { baseUrl } from '../../features/Api/BaseUrl';

const BarChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post(`${baseUrl}jobseeker_count_city_wise`);
      setData(response.data.details);
      setLoading(false);
    } catch (error) {
      console.log(error.response?.data || "Error fetching data");
      setLoading(false);
    }
  };

  const chartData = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [
          "Area Urban", "Area Rural", "Bombali", "Bonthe", "Kailahun", "Kambia", "Kenema", "Koinadugu", "Kono",
          "Moyamba", "Port Loko", "Pujehun", "Tonkolili", "Bo", "Karene", "Falaba"
        ],
      },
      colors: ['#dab95c'], // Bar color
    },
    series: [
      {
        name: 'Job Seekers',
        data: data
          ? [
            data.Western_Area_Rural || 0,
            data.Western_Area_Urban || 0,
            data.Bombali || 0,
            data.Bonthe || 0,
            data.Kailahun || 0,
            data.Kambia || 0,
            data.Kenema || 0,
            data.Koinadugu || 0,
            data.Kono || 0,
            data.Moyamba || 0,
            data.Port_Loko || 0,
            data.Pujehun || 0,
            data.Tonkolili || 0,
            data.Bo || 0,
            data.Karene || 0,
            data.Falaba || 0,
          ]
          : [], // Default empty array if data isn't ready
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" height="385px" />
      )}
    </div>
  );
};

export default BarChart;
