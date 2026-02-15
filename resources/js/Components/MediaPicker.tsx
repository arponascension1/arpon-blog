import React, { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import MediaModal from '@/Components/MediaModal';

interface MediaPickerProps {
    onSelect: (url: string) => void;
    currentValue?: string;
    label?: string;
}

export default function MediaPicker({ onSelect, currentValue, label = 'Select Image' }: MediaPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    {currentValue ? (
                        <img src={currentValue} alt="Selected" className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}
                </div>
                <SecondaryButton type="button" onClick={() => setIsOpen(true)}>
                    Change
                </SecondaryButton>
                {currentValue && (
                    <button 
                        type="button" 
                        onClick={() => onSelect('')}
                        className="text-sm text-red-600 hover:text-red-800"
                    >
                        Remove
                    </button>
                )}
            </div>

            <MediaModal 
                show={isOpen} 
                onClose={() => setIsOpen(false)} 
                onSelect={onSelect} 
            />
        </div>
    );
}
