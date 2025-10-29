import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {ChevronDown} from "lucide-react";

type DropdownOption = {
    label?: string;
    value?: string;
};

type DropdownMenuProps = {
    options: DropdownOption[];
    onSelect: (value: string) => void;
    buttonLabel?: string;
    selected?: string;
    disabled?: boolean;
};

export const DropdownMenu = ({
                                 options,
                                 onSelect,
                                 buttonLabel = 'Selecciona',
                                 selected,
                                 disabled = false,
                             }: DropdownMenuProps) => {
    return (
        <div className="relative inline-block text-left">
            <Menu as="div">
                <div>
                    <Menu.Button
                        disabled={disabled}
                        className="flex flex-row h-full w-full items-center justify-between border border-gray-200 bg-primary-smoke px-4 py-1 rounded-xl
                         hover:bg-primary-dark transition">
                        {options.find(opt => opt.value === selected)?.label || buttonLabel}
                        <ChevronDown className={disabled ? 'size-0' : 'size-6'}/>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute mt-0.5 w-full origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-xl shadow-lg focus:outline-none z-10">
                        <div className="px-1 py-1">
                            {options.map((option) => (
                                <Menu.Item key={option.value}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => onSelect(option.value || "")}
                                            className={`${
                                                active ? 'bg-gray-100 text-primary-dark' : 'text-gray-700'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {option.label}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
