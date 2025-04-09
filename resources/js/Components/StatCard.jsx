import React from 'react';

const StatCard = ({ title, value, progress, color, icon: Icon, iconBgColor }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-40 relative">
            {/* Icon in Suspended Container */}
            <div
                className={`absolute -top-6 left-2 w-16 h-12 ${iconBgColor} rounded-md flex items-center justify-center shadow-md`}
            >
                {Icon && <Icon size={24} className="text-white" />}
            </div>

            {/* Title and Value to the Right */}
            <div className="flex items-center">
                <div className="w-16 h-12"></div> {/* Spacer to match icon width */}
                <div className="ml-4">
                    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                    className={`h-2.5 rounded-full ${color}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StatCard;