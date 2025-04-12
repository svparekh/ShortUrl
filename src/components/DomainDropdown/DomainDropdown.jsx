import './DomainDropdown.css';

import { useState, useEffect } from 'react';


export default function DomainDropdown({ options, onSelect, disabled }) {
    DomainDropdown.propTypes = {
        options: Array[{ value: String, text: String, disabled: Boolean, icon: String }],
        onSelect: Function,
        disabled: Boolean
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[0].text);

    const handleOptionClick = (o) => {
        if (disabled) return;
        if (o.disabled) return;
        setSelectedValue(o.text);
        onSelect(o.text);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleFocusLost = (event) => {
            if (!event.target.closest('.domain-dropdown-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleFocusLost);
        return () => document.removeEventListener('click', handleFocusLost);
    }, []);


    return (
        <div className='domain-dropdown-container' onClick={() => setIsOpen(!isOpen)}>
            <div className='domain-dropdown-wrapper'>
                <button type='button' className='domain-dropdown-button'>
                    {selectedValue}
                </button>
                <ul className={`domain-dropdown` + `${isOpen ? ' open' : ''}`}>
                    {options.map((option) => (
                        option.disabled
                            ?
                            <li className='domain-dropdown-item' key={option.value} id={option.value} disabled={true}>
                                <label htmlFor={`${option.value}`} style={{ cursor: 'not-allowed' }} value={option.value}>{option.text}</label>
                                {option.icon && <img src={option.icon} style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }} alt='This option is locked' />}
                            </li>
                            :
                            <li className='domain-dropdown-item' key={option.value} id={option.value} onClick={() => handleOptionClick(option)}>
                                <label htmlFor={`${option.value}`} style={{ cursor: 'pointer' }} value={option.value}>{option.text}</label>
                                {option.icon && <img src={option.icon} alt={option.text} />}
                            </li>
                    ))}
                </ul>
            </div>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                stroke='currentColor'
                fill='none'
                style={{
                    width: '1rem',
                    height: '1rem',
                    marginLeft: '0.5rem',
                    color: 'var(--text-color)',
                    position: 'absolute',
                    right: '0.5rem',
                    pointerEvents: 'none',
                    transition: 'transform var(--slow-transition-duration) var(--one-bounce-curve), color var(--slow-transition-duration) var(--primary-curve)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                }}
            >
                <path
                    d='M19 9l-7 7-7-7'
                    strokeWidth='2'
                    strokeLinejoin='round'
                    strokeLinecap='round'
                />
            </svg>
        </div>
    );
}
