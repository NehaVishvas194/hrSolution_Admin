// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import axios from 'axios';

// const DonutChart = () => {
//   const [data, setData] = useState({
//     pending_count: 0,
//     schedule_count: 0,
//     assessment_count: 0,
//     HR_Discussion_count: 0,
//     complete_count: 0,
//     shortlisted_count: 0,
//     rejected_count: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.post(`${baseUrl}jobseeker_count`);
//         const {
//           pending_count,
//           schedule_count,
//           assessment_count,
//           HR_Discussion_count,
//           complete_count,
//           shortlisted_count,
//           rejected_count,
//         } = response.data;

//         setData({
//           pending_count: pending_count || 0,
//           schedule_count: schedule_count || 0,
//           assessment_count: assessment_count || 0,
//           HR_Discussion_count: HR_Discussion_count || 0,
//           complete_count: complete_count || 0,
//           shortlisted_count: shortlisted_count || 0,
//           rejected_count: rejected_count || 0,
//         });

//         setLoading(false);
//       } catch (error) {
//         setError(error.response?.data || 'Error fetching data');
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const chartData = {
//     series: [
//       data.pending_count,
//       data.schedule_count,
//       data.assessment_count,
//       data.HR_Discussion_count,
//       data.complete_count,
//       data.shortlisted_count,
//       data.rejected_count,
//     ],
//     options: {
//       chart: {
//         type: 'donut',
//       },
//       colors: ['#dab95c', '#F7418F', '#864AF9', '#41B06E', '#00FFFF', '#FF9800', '#D2DE32'],
//       labels: ['Pending', 'Schedule Interview', 'Assessment', 'HR Discussion', 'Complete', 'Shortlist', 'Reject'],
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: 'bottom',
//             },
//           },
//         },
//       ],
//     },
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div id="chart-wrapper">
//       <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="donut"
//         width="480"
//       />
//       <p className="text-center fs-5">Jobs</p>
//     </div>
//   );
// };

// export default DonutChart;

// // import React, { useEffect, useState } from 'react';
// // import Chart from 'react-apexcharts';
// // import { baseUrl } from '../../features/Api/BaseUrl';
// // import axios from 'axios';

// // const DonutChart = () => {
// //   const [data, setData] = useState({
// //     pending_count: 0,
// //     schedule_count: 0,
// //     assessment_count: 0,
// //     HR_Discussion_count: 0,
// //     complete_count: 0,
// //     shortlisted_count: 0,
// //     rejected_count: 0,
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const getData = async () => {
// //       try {
// //         const response = await axios.post(`${baseUrl}jobseeker_count`);

// //         console.log(response.data)
// //         const { pending_count, schedule_count, assessment_count, HR_Discussion_count, complete_count, shortlisted_count, rejected_count } = response.data;

// //         setData({
// //           pending_count: pending_count || 0,
// //           schedule_count: schedule_count || 0,
// //           assessment_count: assessment_count || 0,
// //           HR_Discussion_count: HR_Discussion_count || 0,
// //           complete_count: complete_count || 0,
// //           shortlisted_count: shortlisted_count || 0,
// //           rejected_count: rejected_count || 0,
// //         });

// //         setLoading(false);
// //       } catch (error) {
// //         setError(error.response?.data || "Error fetching data");
// //         setLoading(false);
// //       }
// //     };

// //     getData();
// //   }, []); // The empty dependency array ensures this useEffect runs only once.

// //   const chartData = {
// //     series: [
// //       data.pending_count,
// //       data.schedule_count,
// //       data.assessment_count,
// //       data.HR_Discussion_count,
// //       data.complete_count,
// //       data.shortlisted_count,
// //       data.rejected_count,
// //     ],
// //     options: {
// //       chart: {
// //         type: 'donut',
// //       },
// //       colors: ['#dab95c', '#F7418F', '#864AF9', '#41B06E', '#00FFFF', '#FF9800', '#D2DE32'],
// //       labels: ['Pending', 'Schedule Interview', 'Assessment', 'HR Discussion', 'Complete', 'Shortlist', 'Reject'],
// //       responsive: [
// //         {
// //           breakpoint: 480,
// //           options: {
// //             chart: {
// //               width: 200,
// //             },
// //             legend: {
// //               position: 'bottom',
// //             },
// //           },
// //         },
// //       ],
// //     },
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div id="chart-wrapper">
// //       <Chart
// //         options={chartData.options}
// //         series={chartData.series}
// //         type="donut"
// //         width="480"
// //       />
// //       <p className="text-center fs-5">Jobs</p>
// //     </div>
// //   );
// // };

// // export default DonutChart;
// // import React from 'react';
// // import Chart from 'react-apexcharts';

// // const DonutChart = () => {

// //   const chartOptions = {
// //     chart: {
// //       type: 'donut',
// //     },
// //     labels: ['Category A', 'Category B', 'Category C', 'Category D'],
// //     responsive: [{
// //       breakpoint: 480,
// //       options: {
// //         chart: {
// //           width: 200
// //         },
// //         legend: {
// //           position: 'bottom'
// //         }
// //       }
// //     }],
// //     colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019'],
// //   };

// //   const chartSeries = [44, 55, 41, 17];

// //   return (
// //     <div className="donut-chart">
// //       <Chart 
// //         options={chartOptions} 
// //         series={chartSeries} 
// //         type="donut" 
// //         width="380" 
// //       />
// //     </div>
// //   );
// // };

// // export default DonutChart;
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { baseUrl } from '../../features/Api/BaseUrl';
import axios from 'axios';

const DonutChart = () => {
  const [data, setData] = useState({
    pending_count: 0,
    schedule_count: 0,
    assessment_count: 0,
    HR_Discussion_count: 0,
    complete_count: 0,
    shortlisted_count: 0,
    rejected_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${baseUrl}jobseeker_count`);
        const {
          pending_count,
          schedule_count,
          assessment_count,
          HR_Discussion_count,
          complete_count,
          shortlisted_count,
          rejected_count,
        } = response.data;

        setData({
          pending_count: pending_count || 0,
          schedule_count: schedule_count || 0,
          assessment_count: assessment_count || 0,
          HR_Discussion_count: HR_Discussion_count || 0,
          complete_count: complete_count || 0,
          shortlisted_count: shortlisted_count || 0,
          rejected_count: rejected_count || 0,
        });

        // Delay chart rendering to avoid timing issues
        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        setError(error.response?.data || 'Error fetching data');
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Basic configuration for the chart
  const chartData = {
    series: [
      data.pending_count,
      data.schedule_count,
      data.assessment_count,
      data.HR_Discussion_count,
      data.complete_count,
      data.shortlisted_count,
      data.rejected_count,
    ],
    options: {
      chart: {
        type: 'donut',
      },
      colors: ['#dab95c', '#F7418F', '#864AF9', '#41B06E', '#00FFFF', '#FF9800', '#D2DE32'],
      labels: ['Pending', 'Schedule Interview', 'Assessment', 'HR Discussion', 'Complete', 'Shortlist', 'Reject'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="chart-wrapper">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="480"
      />
      <p className="text-center fs-5">Jobs</p>
    </div>
  );
};

export default DonutChart;
