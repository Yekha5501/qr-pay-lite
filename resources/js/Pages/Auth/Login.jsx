import React from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
 function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login'); // Assuming your Laravel route is '/login'
    };

    // Gradient animation variants
    const gradientVariants = {
        animate: {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    // Card animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    // Field animation variants
    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600"
                variants={gradientVariants}
                animate="animate"
                style={{ backgroundSize: '200% 100%' }}
            />

            {/* Login Card */}
            <motion.div
                className="relative z-10 bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to QR Pay Admin</h1>

                {/* Status Message (e.g., "Logged out") */}
                {status && (
                    <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <motion.div
                        custom={0}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                    >
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            autoComplete="username"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        custom={1}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                    >
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password}</span>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        custom={2}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                                processing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Log In
                        </button>
                    </motion.div>

                    {/* Forgot Password Link */}
                    <motion.div
                        custom={3}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center"
                    >
                        <Link
                            href="/forgot-password" // Adjust route as needed
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot your password?
                        </Link>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;