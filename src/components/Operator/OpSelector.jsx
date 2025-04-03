import './OpSelector.css';

import { QR_CODE, SHORTEN_URL } from '../../vars.jsx'


export default function OpSelector({ setOption }) {
    OpSelector.propTypes = {
        setOption: Function
    }

    return (
        <div className="operation-selector">
            <label>
                <input value="value-1" name="value-radio" id="value-1" type="radio" defaultChecked={true} onChange={() => setOption(SHORTEN_URL)} title="Shorten a URL" />
                <span title="Shorten a URL">Shorten URL</span>
            </label>
            <label>
                <input value="value-2" name="value-radio" id="value-2" type="radio" onChange={() => setOption(QR_CODE)} title="Generate a QR Code" />
                <span title="Generate a QR Code">QR Code Generator</span>
            </label>
            <span className="selection"></span>
        </div>
    );
}