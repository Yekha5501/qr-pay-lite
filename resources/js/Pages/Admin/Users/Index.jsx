import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Index({ users, flash }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
            },
        }),
    };

    const skeletonVariants = {
        pulse: {
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 1.5,
                repeat: Infinity,
            },
        },
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Add User
                    </button>
                </div>

                {/* Flash Message */}
                {flash?.message && (
                    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-lg shadow-sm">
                        {flash.message}
                    </div>
                )}

                {/* Table Card */}
                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-x-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                                <th className="py-4 text-left text-gray-700 font-semibold min-w-[150px] px-4">
                                    Name
                                </th>
                                <th className="py-4 text-left text-gray-700 font-semibold min-w-[200px] px-4">
                                    Email
                                </th>
                                <th className="py-4 text-left text-gray-700 font-semibold min-w-[150px] px-4">
                                    QR Code
                                </th>
                                <th className="py-4 text-left text-gray-700 font-semibold min-w-[120px] px-4">
                                    Joined
                                </th>
                                <th className="py-4 text-left text-gray-700 font-semibold min-w-[150px] px-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array(5).fill(0).map((_, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-4 px-4">
                                            <motion.div variants={skeletonVariants} animate="pulse">
                                                <div className="h-6 w-full bg-gray-200 rounded" />
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.div variants={skeletonVariants} animate="pulse">
                                                <div className="h-6 w-full bg-gray-200 rounded" />
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.div variants={skeletonVariants} animate="pulse">
                                                <div className="h-6 w-full bg-gray-200 rounded" />
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.div variants={skeletonVariants} animate="pulse">
                                                <div className="h-6 w-full bg-gray-200 rounded" />
                                            </motion.div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <motion.div variants={skeletonVariants} animate="pulse">
                                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                            </motion.div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                users.data.map((user, i) => (
                                    <motion.tr
                                        key={user.id}
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        variants={rowVariants}
                                        className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100"
                                    >
                                        <td className="py-4 px-4 text-gray-800">{user.name}</td>
                                        <td className="py-4 px-4 text-gray-800">{user.email}</td>
                                        <td className="py-4 px-4 text-gray-800 font-mono">{user.qr_code}</td>
                                        <td className="py-4 px-4 text-gray-800">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 flex space-x-2">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded"
                                            >
                                                <FaEdit className="mr-1" />
                                            </Link>
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded"
                                            >
                                                <FaTrash className="mr-1" />
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
                {!isLoading && (
                    <div className="mt-6 flex justify-end space-x-2">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-2 rounded-md ${
                                    link.active
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}