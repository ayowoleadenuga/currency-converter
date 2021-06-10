import React from 'react';

const CustomSelect = ({ title, value, onChange, options }) => {
    return (
        <div>
            <label>{title}</label>
            <div>
                <select name={title} className="input" value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option key={`${option}${index}`} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CustomSelect;