import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function Edit({ user }) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    // Animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    // Animation variants for form fields
    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1, // Stagger effect
                duration: 0.4,
            },
        }),
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-md mx-auto">
                <motion.div
                    className="bg-white shadow-lg rounded-lg p-6"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            custom={0}
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-2"
                        >
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-medium"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.name
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name}</span>
                            )}
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-2"
                        >
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.email
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email}</span>
                            )}
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-2"
                        >
                            <label
                                htmlFor="qr_code"
                                className="block text-gray-700 font-medium"
                            >
                                QR Code (Read-Only)
                            </label>
                            <input
                                id="qr_code"
                                type="text"
                                value={user.qr_code}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                                    processing
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                Update
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}