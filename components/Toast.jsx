import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-blue-950" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                                {message}
                            </p>
                        </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast; 