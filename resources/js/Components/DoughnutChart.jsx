import React from 'react';
import Chart from 'react-apexcharts';

const DoughnutChart = () => {
    const options = {
        chart: {
            type: 'donut',
            height: 350,
        },
        labels: ['Completed', 'Pending', 'Failed'],
        dataLabels: {
            enabled: true,
        },
        legend: {
            position: 'bottom',
        },
        colors: ['#2563EB', '#8B5CF6', '#A855F7'], // Blue-600, Purple-500, Purple-400
    };

    const series = [65, 25, 10]; // Percentages for Completed, Pending, Failed

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h3>
            <Chart options={options} series={series} type="donut" height={350} />
        </div>
    );
};

export default DoughnutChart;