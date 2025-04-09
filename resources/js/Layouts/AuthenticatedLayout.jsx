import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaBars, FaTachometerAlt, FaUsers, FaHistory, FaChartBar, FaSignOutAlt, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const AuthenticatedLayout = ({ children }) => {
    const { auth, url } = usePage().props; // Added url from usePage()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // Determine background height based on current URL
    const isDashboard = url === '127.0.0.1:8000/dashboard';
    const bgHeightClass = isDashboard ? 'h-16' : 'h-72'; // h-16 matches typical header height

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Gradient Background Layer (Full Width) */}
            <div className={`absolute inset-x-0 top-0 bg-gradient-to-r from-blue-600 to-purple-600 ${bgHeightClass} z-0`}></div>

            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? 'w-64' : 'w-16'
                } bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-xl z-20 mt-6 rounded-r-lg`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <FaTachometerAlt size={28} className="text-gray-600 mr-2" />
                        {isSidebarOpen && <h1 className="text-xl font-bold text-gray-800">QR Pay Admin</h1>}
                    </div>
                    {isSidebarOpen && <hr className="mt-2 border-gray-200 w-full" />}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                            >
                                <FaTachometerAlt size={20} className="text-gray-600" />
                                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/users"
                                className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                            >
                                <FaUsers size={20} className="text-gray-600" />
                                {isSidebarOpen && <span className="ml-3">Users</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                            >
                                <FaHistory size={20} className="text-gray-600" />
                                {isSidebarOpen && <span className="ml-3">Transactions</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                            >
                                <FaChartBar size={20} className="text-gray-600" />
                                {isSidebarOpen && <span className="ml-3">Reports</span>}
                            </Link>
                        </li>
                        {auth.user && (
                            <li>
                                <Link
                                    href="logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center w-full text-left p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                                >
                                    <FaSignOutAlt size={20} className="text-gray-600" />
                                    {isSidebarOpen && <span className="ml-3">Logout</span>}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Header */}
                <header className="relative z-10 bg-transparent p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="text-white mr-4 focus:outline-none hover:text-gray-200"
                        >
                            <FaBars size={20} />
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-white text-gray-800 pl-10 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="text-white hover:text-gray-200 relative">
                            <FaBell size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={toggleProfileDropdown}
                                className="text-white hover:text-gray-200 focus:outline-none flex items-center"
                            >
                                <FaUser size={20} className="mr-2" />
                                <span className="hidden md:inline">{auth.user?.name || 'Guest'}</span>
                            </button>
                            {isProfileOpen && auth.user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                                    <div className="px-4 py-2 text-gray-800 border-b">
                                        <span className="font-semibold">{auth.user.name}</span>
                                    </div>
                                    <Link
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        href="#"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 relative z-10 p-0 overflow-y-auto">
                    {children}
                    {/* Footer */}
                    <footer className="bg-white text-gray-600 p-4 border-t border-gray-200 mt-6">
                        <div className="flex justify-between items-center max-w-7xl mx-auto">
                            <div>
                                <p className="text-sm">© {new Date().getFullYear()} QR Pay Lite. All rights reserved.</p>
                            </div>
                            <div className="flex space-x-4">
                                <Link href="#" className="text-sm hover:text-blue-700 transition-colors">
                                    Terms
                                </Link>
                                <Link href="#" className="text-sm hover:text-blue-700 transition-colors">
                                    Privacy
                                </Link>
                                <Link href="#" className="text-sm hover:text-blue-700 transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;