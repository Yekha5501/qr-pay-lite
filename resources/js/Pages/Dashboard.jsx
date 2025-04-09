import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import StatCard from '../Components/StatCard';
import BarChart from '../Components/BarChart';
import DoughnutChart from '../Components/DoughnutChart';
import { FaMoneyBillWave, FaQrcode, FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import Framer Motion

const Dashboard = () => {
    const stats = [
        { 
            title: 'Total Payments', 
            value: '$5,230', 
            progress: 75, 
            color: 'bg-green-500', 
            icon: FaMoneyBillWave,
            iconBgColor: 'bg-green-600'
        },
        { 
            title: 'Pending QR Scans', 
            value: '12', 
            progress: 30, 
            color: 'bg-yellow-500', 
            icon: FaQrcode,
            iconBgColor: 'bg-yellow-600'
        },
        { 
            title: 'Wallet Balance', 
            value: '$1,890', 
            progress: 90, 
            color: 'bg-blue-500', 
            icon: FaWallet,
            iconBgColor: 'bg-blue-600'
        },
    ];

    // Animation variants for stats cards
    const statCardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1, // Stagger effect
                duration: 0.4,
                ease: 'easeOut',
            },
        }),
    };

    // Animation variants for charts
    const chartVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <AuthenticatedLayout>
            {/* Content Container */}
            <div className="flex flex-col min-h-full">
                {/* First Row: Stats Cards (Fully in Gradient) */}
                <div className="px-6 pt-6 mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={statCardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <StatCard
                                    title={stat.title}
                                    value={stat.value}
                                    progress={stat.progress}
                                    color={stat.color}
                                    icon={stat.icon}
                                    iconBgColor={stat.iconBgColor}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Second Row: Charts (Partially Overlapping Gradient) */}
                <div className="px-6 -mt-84">
                    <div className="grid grid-cols-12 gap-6">
                        <motion.div
                            className="col-span-12 lg:col-span-8"
                            variants={chartVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <BarChart />
                        </motion.div>
                        <motion.div
                            className="col-span-12 lg:col-span-4"
                            variants={chartVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <DoughnutChart />
                        </motion.div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;