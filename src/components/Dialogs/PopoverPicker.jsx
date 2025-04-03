import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";
import './PopoverPicker.css';

export const PopoverPicker = ({ id, color, onChange }) => {
    PopoverPicker.propTypes = {
        id: String,
        color: String,
        onChange: Function
    }

    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    function validateAndSetValueOnInput(event) {
        // event.preventDefault();
        const target = event.target;
        if (target.value.length === 0) {
            target.classList.remove('invalid');
        }
        else if (target.checkValidity() == true) {
            target.classList.remove('invalid');
            onChange(target.value);
        }
        else {
            target.classList.add('invalid');
        }
        target.reportValidity();
    }

    return (
        <div className="picker">
            <div
                className="picker-swatch"
                id={id}
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover primary-card-solid" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1em' }}>
                        <label htmlFor="hex-color-input">HEX</label>
                        <input
                            type='text'
                            name='hex-color-input'
                            id='hex-color-input'
                            onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            pattern='^#(?:[0-9a-fA-F]{3,4}){1,2}$'
                            style={{ borderRadius: '0.5em' }}
                            placeholder={color}
                            autoComplete='off'
                            autoCorrect='off'
                        ></input>
                    </div>
                </div>
            )}
        </div>
    );
};
