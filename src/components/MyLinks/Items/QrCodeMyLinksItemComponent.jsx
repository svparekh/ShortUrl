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
        // updateDoc(userRef, { qrCodeDownloads: increment(1) }); // update downloads count
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
                        <p style={{ fontSize: 'smaller' }}>March 5, 2023</p>
                        <button className="default-button red-button" style={{ margin: '0', padding: '0' }} title='Remove QR Code from your list' onClick={() => { }}>Delete</button>
                    </div>
                </div>
                <div>
                    {/* <button id='link-item-button' className="default-button" style={{ margin: 'auto 0.5em', padding: '0.5em 1em', borderRadius: '1em' }} title='Edit QR Code' onClick={() => { }}>Edit</button> */}
                    <button id='link-item-button' className="default-button primary-button" style={{ margin: 'auto 3em auto 0.5em' }} title='Download QR Code' onClick={onDownloadClick}>Download</button>
                </div>
            </> : <h3 style={{ color: 'var(--text-color)' }}>Downloaded</h3>
            }
        </div>
    );
}