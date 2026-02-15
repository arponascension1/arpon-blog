import React, { useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';

interface Option {
    id: number;
    name: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: number[];
    onChange: (selectedIds: number[]) => void;
    placeholder?: string;
    label?: string;
}

export default function MultiSelect({ options, selected, onChange, placeholder = 'Search...', label }: MultiSelectProps) {
    const [query, setQuery] = useState('');

    const selectedOptions = options.filter(option => selected.includes(option.id));
    
    const filteredOptions = query === ''
        ? options
        : options.filter((option) =>
            option.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    const handleSelect = (option: Option | null) => {
        if (!option) return;
        if (selected.includes(option.id)) {
            onChange(selected.filter(id => id !== option.id));
        } else {
            onChange([...selected, option.id]);
        }
    };

    const removeOption = (id: number) => {
        onChange(selected.filter(selectedId => selectedId !== id));
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            
            {/* Selected Badges */}
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedOptions.map((option) => (
                    <span 
                        key={option.id} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group"
                    >
                        {option.name}
                        <button
                            type="button"
                            onClick={() => removeOption(option.id)}
                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                        >
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>

            <Combobox value={null as Option | null} onChange={handleSelect}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            placeholder={placeholder}
                            displayValue={() => ''}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected: isSelected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected.includes(option.id) ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected.includes(option.id) ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-blue-600'
                                                        }`}
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
