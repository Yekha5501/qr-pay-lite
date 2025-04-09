import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                borderRadius: 8,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: {
                style: {
                    colors: '#6B7280',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Payments ($)',
                style: {
                    color: '#6B7280',
                },
            },
            labels: {
                style: {
                    colors: '#6B7280',
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.25,
                gradientToColors: ['#A855F7'], // Bottom: purple-500
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.85,
                stops: [0, 100], // Two stops for blue to purple
            },
        },
        colors: ['#2563EB'], // Top: blue-600 (darker start)
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
    };

    const series = [
        {
            name: 'Payments',
            data: [400, 430, 448, 470, 540, 580],
        },
    ];

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Payments</h3>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default BarChart;