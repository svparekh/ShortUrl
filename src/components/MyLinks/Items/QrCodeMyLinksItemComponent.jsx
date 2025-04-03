import { useRef, useState, useEffect } from 'react';

import { QrCodeMyLinksItem } from '../../../vars.jsx';
import { QRCode } from 'react-qrcode-logo';

import './Item.css';


export default function QrCodeMyLinksItemComponent({ item }) {
    QrCodeMyLinksItemComponent.propTypes = {
        item: QrCodeMyLinksItem
    }

    const containerRef = useRef(null);
    const qrcodeRef = useRef(null);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        if (showContent) {
            containerRef.current.style.backgroundColor = 'var(--primary-color)';
        }
        else {
            containerRef.current.style.backgroundColor = 'rgba(from var(--secondary-color) r g b / 50%)';
            setTimeout(() => {
                setShowContent(true);
            }, 1000);
        }
    }, [showContent]);


    // function onDownloadComplete() {
    //     console.log('downloading');
    // }

    // function onDownloading() {
    //     console.log('downloading');
    // }

    function onDownloadClick() {
        qrcodeRef.current.download('png', item.settings.title);
        setShowContent(false);
    }


    return (
        <div ref={containerRef} className='link-item-container primary-card-solid' onClick={onDownloadClick}>
            {showContent ? <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='link-item-icon-2'>
                        <QRCode value={item.value} ref={qrcodeRef} style={{ width: 'inherit', height: 'inherit' }}
                            bgColor={item.settings.bgColor}
                            fgColor={item.settings.fgColor}
                            ecLevel={item.settings.ecLevel}
                            enableCORS={item.settings.enableCORS}
                            size={item.settings.size}
                            quietZone={item.settings.quietZone}
                            logoImage={item.settings.logoImage}
                            logoWidth={item.settings.logoWidth}
                            logoHeight={item.settings.logoHeight}
                            logoOpacity={item.settings.logoOpacity}
                            logoPadding={item.settings.logoPadding}
                            logoPaddingStyle={item.settings.logoPaddingStyle}
                            removeQrCodeBehindLogo={item.settings.removeQrCodeBehindLogo}
                            qrStyle={item.settings.qrStyle}
                            eyeRadius={item.settings.eyeRadius}
                            eyeColor={item.settings.eyeColor}
                        />
                    </div>
                    <div className='link-item-text'>
                        <h3>{item.settings.title}</h3>
                        <p>{item.value}</p>
                        <p style={{ fontSize: 'smaller' }}>Click me to download!</p>
                    </div>
                </div>
                <button id='link-item-button' className="default-button" style={{ margin: 'auto 3em', padding: '1em 2em', borderRadius: '1em' }} title='Download QR Code' onClick={onDownloadClick}>Download</button>
            </> : <h3 style={{ color: 'var(--text-color)' }}>Downloaded</h3>
            }
        </div>
    );
}