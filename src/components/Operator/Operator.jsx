import './Operator.css';

import { QR_CODE } from '../../vars.jsx'
import ShortenUrlCard from '../Cards/ShortenUrlCard.jsx';
import QrCodeCard from '../Cards/QrCodeCard.jsx';

import { useState, useEffect } from 'react';




export default function Operator({ option }) {
    Operator.propTypes = {
        option: String
    }

    const [xPercentQr, setXPercentQr] = useState(option === QR_CODE ? -50 : 300);
    const [xPercentUrl, setXPercentUrl] = useState(option === QR_CODE ? -300 : 50);

    useEffect(() => {
        if (option === QR_CODE) {
            setXPercentQr(-50);
            setXPercentUrl(-300);
        } else {
            setXPercentQr(300);
            setXPercentUrl(50);
        }
    }, [option]);

    return (
        <div className='card-container'>
            <ShortenUrlCard xTranslate={`${xPercentUrl}%`} />
            <QrCodeCard xTranslate={`${xPercentQr}%`} />
        </div>
    );
}
