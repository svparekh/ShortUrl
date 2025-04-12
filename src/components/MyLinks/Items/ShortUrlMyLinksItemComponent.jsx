import LinkIcon from '../../../assets/link.png';
import { useRef, useState, useEffect } from 'react';

import { ShortUrlMyLinksItem } from '../../../vars.jsx';

import './Item.css';

export default function ShortUrlMyLinksItemComponent({ item }) {
    ShortUrlMyLinksItemComponent.propTypes = {
        item: ShortUrlMyLinksItem
    }

    const containerRef = useRef();
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        if (showContent) {
            containerRef.current.style.backgroundColor = 'var(--primary-color)';
            containerRef.current.style.justifyContent = 'space-between';
        }
        else {
            containerRef.current.style.backgroundColor = 'rgba(from var(--secondary-color) r g b / 50%)';
            containerRef.current.style.justifyContent = 'center';
            setTimeout(() => {
                setShowContent(true);
            }, 1000);
        }
    }, [showContent]);

    function onCopy() {
        // container.current.style.backgroundColor = 'rgba(from var(--accent-color) r g b / 50%)';
        navigator.clipboard.writeText(item.shortUrl);
        setShowContent(false);
    }

    return (
        <div ref={containerRef} className='link-item-container primary-card-solid' onClick={onCopy}>
            {showContent ? <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={LinkIcon} alt='Link icon' className='link-item-icon-1' />
                    <div className='link-item-text'>
                        <h3>{item.shortUrl}</h3>
                        <p>{item.longUrl}</p>
                        <p style={{ fontSize: 'smaller' }}>March 5, 2023</p>
                        <button className="default-button red-button" style={{ margin: '0', padding: '0' }} title='Remove QR Code from your list' onClick={() => { }}>Delete</button>
                    </div>
                </div>
                <div>
                    <button id='link-item-button' className="default-button" style={{ margin: 'auto 0.5em' }} title='Edit QR Code' onClick={() => { }}>Edit</button>
                    <button id='link-item-button' className="default-button primary-button" style={{ margin: 'auto 3em auto 0.5em' }} title='Copy URL' onClick={onCopy}>Copy</button>
                </div>            </> : <h3 style={{ color: 'var(--text-color)' }}>Link copied to clipboard</h3>}
        </div>
    );
}