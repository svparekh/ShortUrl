
import './DefaultDialog.css';
import './QRCodeEditorDialog.css';

import { PopoverPicker } from "./PopoverPicker";
import { DEFAULT_QR_CODE_SETTINGS } from "../../vars.jsx";
import CloseIcon from '../../assets/close.png';

import { useState, useRef, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';



export default function QRCodeEditorDialog({ openModal, onClose, value = null, settings = null }) {
    QRCodeEditorDialog.propTypes = {
        openModal: Boolean,
        onClose: Function,
        value: String,
        settings: Object
    }

    const ref = useRef(null);

    useEffect(() => {
        if (openModal) {
            setBgColor((settings || DEFAULT_QR_CODE_SETTINGS).bgColor);
            setFgColor((settings || DEFAULT_QR_CODE_SETTINGS).fgColor);
            setSize((settings || DEFAULT_QR_CODE_SETTINGS).size);
            setEcLevel((settings || DEFAULT_QR_CODE_SETTINGS).ecLevel);
            setQuietZone((settings || DEFAULT_QR_CODE_SETTINGS).quietZone);
            setEnableCORS((settings || DEFAULT_QR_CODE_SETTINGS).enableCORS);
            setLogoImage((settings || DEFAULT_QR_CODE_SETTINGS).logoImage);
            setLogoWidth((settings || DEFAULT_QR_CODE_SETTINGS).logoWidth);
            setLogoHeight((settings || DEFAULT_QR_CODE_SETTINGS).logoHeight);
            setLogoOpacity((settings || DEFAULT_QR_CODE_SETTINGS).logoOpacity);
            setRemoveQrCodeBehindLogo((settings || DEFAULT_QR_CODE_SETTINGS).removeQrCodeBehindLogo);
            setLogoPadding((settings || DEFAULT_QR_CODE_SETTINGS).logoPadding);
            setLogoPaddingStyle((settings || DEFAULT_QR_CODE_SETTINGS).logoPaddingStyle);
            setQrStyle((settings || DEFAULT_QR_CODE_SETTINGS).qrStyle);
            setEyeRadius((settings || DEFAULT_QR_CODE_SETTINGS).eyeRadius);
            setEyeColor((settings || DEFAULT_QR_CODE_SETTINGS).eyeColor);
            setTitle((settings || DEFAULT_QR_CODE_SETTINGS).title);
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal, settings]);

    const [bgColor, setBgColor] = useState((settings || DEFAULT_QR_CODE_SETTINGS).bgColor);
    const [fgColor, setFgColor] = useState((settings || DEFAULT_QR_CODE_SETTINGS).fgColor);
    const [size, setSize] = useState((settings || DEFAULT_QR_CODE_SETTINGS).size);
    const [ecLevel, setEcLevel] = useState((settings || DEFAULT_QR_CODE_SETTINGS).ecLevel);
    const [quietZone, setQuietZone] = useState((settings || DEFAULT_QR_CODE_SETTINGS).quietZone);
    const [enableCORS, setEnableCORS] = useState((settings || DEFAULT_QR_CODE_SETTINGS).enableCORS);
    const [logoImage, setLogoImage] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoImage);
    const [logoWidth, setLogoWidth] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoWidth);
    const [logoHeight, setLogoHeight] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoHeight);
    const [logoOpacity, setLogoOpacity] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoOpacity);
    const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState((settings || DEFAULT_QR_CODE_SETTINGS).removeQrCodeBehindLogo);
    const [logoPadding, setLogoPadding] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoPadding);
    const [logoPaddingStyle, setLogoPaddingStyle] = useState((settings || DEFAULT_QR_CODE_SETTINGS).logoPaddingStyle);
    const [qrStyle, setQrStyle] = useState((settings || DEFAULT_QR_CODE_SETTINGS).qrStyle);
    const [eyeRadius, setEyeRadius] = useState((settings || DEFAULT_QR_CODE_SETTINGS).eyeRadius);
    const [eyeColor, setEyeColor] = useState((settings || DEFAULT_QR_CODE_SETTINGS).eyeColor);
    const [title, setTitle] = useState((settings || DEFAULT_QR_CODE_SETTINGS).title);


    function handleSave(event) {
        event.preventDefault();
        const titleInput = document.getElementById('qr-edit-title-input');
        titleInput.value = '';
        titleInput.classList.remove('invalid');
        onClose({
            bgColor: bgColor,
            fgColor: fgColor,
            size: size,
            ecLevel: ecLevel,
            quietZone: quietZone,
            enableCORS: enableCORS,
            logoImage: logoImage,
            logoWidth: logoWidth,
            logoHeight: logoHeight,
            logoOpacity: logoOpacity,
            removeQrCodeBehindLogo: removeQrCodeBehindLogo,
            logoPadding: logoPadding,
            logoPaddingStyle: logoPaddingStyle,
            qrStyle: qrStyle,
            eyeRadius: eyeRadius,
            eyeColor: eyeColor,
            title: title
        });
    }

    function handleCancel(event) {
        event.preventDefault();
        const titleInput = document.getElementById('qr-edit-title-input');
        titleInput.value = '';
        titleInput.classList.remove('invalid');
        onClose(null);
    }

    function handleReset(event) {
        event.preventDefault();
        const titleInput = document.getElementById('qr-edit-title-input');
        titleInput.value = '';
        titleInput.classList.remove('invalid');
        onClose(DEFAULT_QR_CODE_SETTINGS);
    }

    // Update max values based on size
    useEffect(() => {
        const maxEyeRadius = Math.floor(size / 4);
        const maxQuietZone = Math.floor(size / 8);
        const maxLogoWidth = Math.floor(size / 2);
        const maxLogoHeight = Math.floor(size / 2);
        const maxLogoPadding = Math.floor(size / 8);
        if (eyeRadius > maxEyeRadius) {
            setEyeRadius(maxEyeRadius);
        }
        if (quietZone > maxQuietZone) {
            setQuietZone(maxQuietZone);
        }
        if (logoWidth > maxLogoWidth) {
            setLogoWidth(maxLogoWidth);
        }
        if (logoHeight > maxLogoHeight) {
            setLogoHeight(maxLogoHeight);
        }
        if (logoPadding > maxLogoPadding) {
            setLogoPadding(maxLogoPadding);
        }
    }, [size]);

    function validateAndSetValueOnInput(event) {
        // event.preventDefault();
        const target = event.target;
        if (target.value.length === 0) {
            target.classList.remove('invalid');
            setTitle(DEFAULT_QR_CODE_SETTINGS.title);
        }
        else if (target.checkValidity() == true) {
            target.classList.remove('invalid');
            setTitle(target.value);
        }
        else {
            target.classList.add('invalid');
            setTitle(DEFAULT_QR_CODE_SETTINGS.title);
        }
        target.reportValidity();
    }

    return (
        <dialog id="qrCodeEditorDialog" className='primary-card-solid' ref={ref} title='QR Code Editor' >
            <form id="qr-code-editor-dialog-form" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                <div id="qr-code-editor-divider-div" style={{ display: 'flex', height: '100%' }}>
                    {/* ***************** */}
                    {/* Customize section */}
                    {/* ***************** */}
                    {/*
                    Possible inputs to the QR code generator:
                    value, bgColor, fgColor, size, level, marginSize, title, minVersion, boostLevel, imageSettings:
                        src, height, width, excavate, x, y, opacity, crossOrigin
                    */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', textAlign: 'left', padding: '0em 1em' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1em' }}>
                            <label>
                                Customize ✨
                            </label>
                            {/* 🪄 */}
                        </h3>

                        {/* TITLE INPUT */}
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                            <label htmlFor='title-input'>Title</label>
                            <input
                                type='text'
                                name='qr-edit-title-input'
                                id='qr-edit-title-input'
                                onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                                pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                                style={{ borderRadius: '1em' }}
                                placeholder={title}
                                autoComplete='off'
                                autoCorrect='off'
                                form='qr-code-editor-dialog-form'
                            />
                        </div>

                        {/* COLOR INPUT */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* `bgColor` INPUT */}
                            <label htmlFor='bg-color-picker'>Background Color</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                                <PopoverPicker id='bg-color-picker' color={bgColor} onChange={setBgColor} />
                                <div type='button' className='swatch' onClick={() => { setBgColor('#ffffff'); }} style={{ backgroundColor: '#ffffff' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setBgColor('#000000'); }} style={{ backgroundColor: '#000000' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setBgColor('#116699'); }} style={{ backgroundColor: '#116699' }} form='qr-code-editor-dialog-form'></div>
                            </div>
                            {/* `fgColor` INPUT */}
                            <label htmlFor='bg-color-picker'>Foreground Color</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                                <PopoverPicker id='bg-color-picker' color={fgColor} onChange={setFgColor} />
                                <div type='button' className='swatch' onClick={() => { setFgColor('#ffffff'); }} style={{ backgroundColor: '#ffffff' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setFgColor('#000000'); }} style={{ backgroundColor: '#000000' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setFgColor('#116699'); }} style={{ backgroundColor: '#116699' }} form='qr-code-editor-dialog-form'></div>
                            </div>
                            {/* `eyeColor` INPUT */}
                            <label htmlFor='bg-color-picker'>Eye Color</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '1em' }}>
                                <PopoverPicker id='bg-color-picker' color={eyeColor} onChange={setEyeColor} />
                                <div type='button' className='swatch' onClick={() => { setEyeColor('#ffffff'); }} style={{ backgroundColor: '#ffffff' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setEyeColor('#000000'); }} style={{ backgroundColor: '#000000' }} form='qr-code-editor-dialog-form'></div>
                                <div type='button' className='swatch' onClick={() => { setEyeColor('#116699'); }} style={{ backgroundColor: '#116699' }} form='qr-code-editor-dialog-form'></div>
                            </div>
                        </div>

                        {/* `ecLevel` INPUT */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            Error Correction Level
                            <div className="qr-level-input" style={{ marginBottom: '0.5em' }}>
                                <label>
                                    <input type="radio" name="level" value="L" checked={ecLevel === "L"} onChange={() => { setEcLevel("L"); }} form='qr-code-editor-dialog-form' />
                                    <span>7%</span>
                                </label>
                                <label>
                                    <input type="radio" name="level" value="M" checked={ecLevel === "M"} onChange={() => { setEcLevel("M"); }} form='qr-code-editor-dialog-form' />
                                    <span>15%</span>
                                </label>
                                <label>
                                    <input type="radio" name="level" value="Q" checked={ecLevel === "Q"} onChange={() => { setEcLevel("Q"); }} form='qr-code-editor-dialog-form' />
                                    <span>25%</span>
                                </label>
                                <label>
                                    <input type="radio" name="level" value="H" checked={ecLevel === "H"} onChange={() => { setEcLevel("H"); }} form='qr-code-editor-dialog-form' />
                                    <span>30%</span>
                                </label>
                            </div>
                        </div>

                        {/* `qrStyle` INPUT */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            Style
                            <div className="qr-level-input" style={{ marginBottom: '0.5em' }}>
                                <label>
                                    <input type="radio" name="style" value="squares" checked={qrStyle === "squares"} onChange={() => { setQrStyle("squares"); }} form='qr-code-editor-dialog-form' />
                                    <span>Squares</span>
                                </label>
                                <label>
                                    <input type="radio" name="style" value="dots" checked={qrStyle === "dots"} onChange={() => { setQrStyle("dots"); }} form='qr-code-editor-dialog-form' />
                                    <span>Dots</span>
                                </label>
                                <label>
                                    <input type="radio" name="style" value="fluid" checked={qrStyle === "fluid"} onChange={() => { setQrStyle("fluid"); }} form='qr-code-editor-dialog-form' />
                                    <span>Fluid</span>
                                </label>
                            </div>
                        </div>

                        {/* enableCORS INPUT */}
                        {/* REMOVE?????????????????????????????????????????????????????????????? */}
                        {/* <label className="material-checkbox">
                            <input type="checkbox" onChange={(e) => { setEnableCORS(e.target.checked); }} form='qr-code-editor-dialog-form' />
                            <span className="checkmark"></span>
                            Enable Cross Origin?
                        </label> */}

                        {/* `size` INPUT */}
                        <label htmlFor="qr-code-size-input">Size ({size}px)</label>
                        <label className="slider">
                            <input type="range" className="level" id="qr-code-size-input" min={256} max={4096} step={1} value={size} onChange={(e) => { setSize(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />
                            <svg className="slider-icon" fill="var(--text-color)" width="800px" height="800px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" fill="var(--text-color)"
                                    d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
                                />
                            </svg>
                        </label>

                        {/* `quietZone` INPUT */}
                        <label htmlFor="qr-code-margin-input">Margin ({quietZone}px)</label>
                        <label className="slider">
                            <input type="range" className="level" id="qr-code-margin-input" min={0} max={Math.floor(size / 8)} step={1} value={quietZone} onChange={(e) => { setQuietZone(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />
                            <svg className="slider-icon" width="800px" height="800px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" fill="var(--text-color)"
                                    d="M1.49988 2.00012C1.77602 2.00012 1.99988 1.77626 1.99988 1.50012C1.99988 1.22398 1.77602 1.00012 1.49988 1.00012C1.22374 1.00012 0.999878 1.22398 0.999878 1.50012C0.999878 1.77626 1.22374 2.00012 1.49988 2.00012ZM4.49988 2.00012C4.77602 2.00012 4.99988 1.77626 4.99988 1.50012C4.99988 1.22398 4.77602 1.00012 4.49988 1.00012C4.22374 1.00012 3.99988 1.22398 3.99988 1.50012C3.99988 1.77626 4.22374 2.00012 4.49988 2.00012ZM7.99988 1.50012C7.99988 1.77626 7.77602 2.00012 7.49988 2.00012C7.22374 2.00012 6.99988 1.77626 6.99988 1.50012C6.99988 1.22398 7.22374 1.00012 7.49988 1.00012C7.77602 1.00012 7.99988 1.22398 7.99988 1.50012ZM10.4999 2.00012C10.776 2.00012 10.9999 1.77626 10.9999 1.50012C10.9999 1.22398 10.776 1.00012 10.4999 1.00012C10.2237 1.00012 9.99988 1.22398 9.99988 1.50012C9.99988 1.77626 10.2237 2.00012 10.4999 2.00012ZM13.9999 1.50012C13.9999 1.77626 13.776 2.00012 13.4999 2.00012C13.2237 2.00012 12.9999 1.77626 12.9999 1.50012C12.9999 1.22398 13.2237 1.00012 13.4999 1.00012C13.776 1.00012 13.9999 1.22398 13.9999 1.50012ZM1.49988 14.0001C1.77602 14.0001 1.99988 13.7763 1.99988 13.5001C1.99988 13.224 1.77602 13.0001 1.49988 13.0001C1.22374 13.0001 0.999878 13.224 0.999878 13.5001C0.999878 13.7763 1.22374 14.0001 1.49988 14.0001ZM1.99988 10.5001C1.99988 10.7763 1.77602 11.0001 1.49988 11.0001C1.22374 11.0001 0.999878 10.7763 0.999878 10.5001C0.999878 10.224 1.22374 10.0001 1.49988 10.0001C1.77602 10.0001 1.99988 10.224 1.99988 10.5001ZM1.49988 8.00012C1.77602 8.00012 1.99988 7.77626 1.99988 7.50012C1.99988 7.22398 1.77602 7.00012 1.49988 7.00012C1.22374 7.00012 0.999878 7.22398 0.999878 7.50012C0.999878 7.77626 1.22374 8.00012 1.49988 8.00012ZM1.99988 4.50012C1.99988 4.77626 1.77602 5.00012 1.49988 5.00012C1.22374 5.00012 0.999878 4.77626 0.999878 4.50012C0.999878 4.22398 1.22374 4.00012 1.49988 4.00012C1.77602 4.00012 1.99988 4.22398 1.99988 4.50012ZM13.4999 11.0001C13.776 11.0001 13.9999 10.7763 13.9999 10.5001C13.9999 10.224 13.776 10.0001 13.4999 10.0001C13.2237 10.0001 12.9999 10.224 12.9999 10.5001C12.9999 10.7763 13.2237 11.0001 13.4999 11.0001ZM13.9999 7.50012C13.9999 7.77626 13.776 8.00012 13.4999 8.00012C13.2237 8.00012 12.9999 7.77626 12.9999 7.50012C12.9999 7.22398 13.2237 7.00012 13.4999 7.00012C13.776 7.00012 13.9999 7.22398 13.9999 7.50012ZM13.4999 5.00012C13.776 5.00012 13.9999 4.77626 13.9999 4.50012C13.9999 4.22398 13.776 4.00012 13.4999 4.00012C13.2237 4.00012 12.9999 4.22398 12.9999 4.50012C12.9999 4.77626 13.2237 5.00012 13.4999 5.00012ZM4.99988 13.5001C4.99988 13.7763 4.77602 14.0001 4.49988 14.0001C4.22374 14.0001 3.99988 13.7763 3.99988 13.5001C3.99988 13.224 4.22374 13.0001 4.49988 13.0001C4.77602 13.0001 4.99988 13.224 4.99988 13.5001ZM7.49988 14.0001C7.77602 14.0001 7.99988 13.7763 7.99988 13.5001C7.99988 13.224 7.77602 13.0001 7.49988 13.0001C7.22374 13.0001 6.99988 13.224 6.99988 13.5001C6.99988 13.7763 7.22374 14.0001 7.49988 14.0001ZM10.9999 13.5001C10.9999 13.7763 10.776 14.0001 10.4999 14.0001C10.2237 14.0001 9.99988 13.7763 9.99988 13.5001C9.99988 13.224 10.2237 13.0001 10.4999 13.0001C10.776 13.0001 10.9999 13.224 10.9999 13.5001ZM13.4999 14.0001C13.776 14.0001 13.9999 13.7763 13.9999 13.5001C13.9999 13.224 13.776 13.0001 13.4999 13.0001C13.2237 13.0001 12.9999 13.224 12.9999 13.5001C12.9999 13.7763 13.2237 14.0001 13.4999 14.0001ZM3.99988 5.00012C3.99988 4.44784 4.44759 4.00012 4.99988 4.00012H9.99988C10.5522 4.00012 10.9999 4.44784 10.9999 5.00012V10.0001C10.9999 10.5524 10.5522 11.0001 9.99988 11.0001H4.99988C4.44759 11.0001 3.99988 10.5524 3.99988 10.0001V5.00012ZM4.99988 5.00012H9.99988V10.0001H4.99988V5.00012Z"
                                />
                            </svg>
                        </label>

                        {/* `eyeRadius` INPUT */}
                        {/* 
                        [   ] \/
                            [   ] \/
                                [   ] [   ]
                                [   ] [   ]
                            [   ] \/
                                [   ] [   ]
                                [   ] [   ]
                            [   ] \/
                                [   ] [   ]
                                [   ] [   ]
                         */}
                        <label htmlFor="qr-code-eye-radius-input">Eye Radius ({eyeRadius}px)</label>
                        <label className="slider">
                            <input type="range" className="level" id="qr-code-eye-radius-input" min={0} max={Math.floor(size / 4)} step={1} value={eyeRadius} onChange={(e) => { setEyeRadius(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />
                            <svg className="slider-icon" width="800px" height="800px" viewBox="0 0 24 24" fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 19h2v2h-2zM7 19h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2zm-8 0h2v2H3zm0-4h2v2H3zm0-8h2v2H3zm0 4h2v2H3zm0-8h2v2H3zm4 0h2v2H7zm12 12h2v2h-2zM16 3h-5v2h5c1.654 0 3 1.346 3 3v5h2V8c0-2.757-2.243-5-5-5z" />
                            </svg>
                        </label>

                        {/* `logoImage` INPUT */}
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '1em 0' }}>
                            Embedded Icon
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type='file' name="qr-logo-input" id="qr-logo-input" accept='.png, .jpg, .jpeg, .gif, .webp, .svg' onChange={(e) => { if (e.target.value.length > 0) setLogoImage(e.target.files[0]); console.log(e.target.files[0].name); }} form='qr-code-editor-dialog-form' />
                                <button type='button' className='qr-input-file-deselect-button' disabled={!logoImage} onClick={() => { document.querySelector('#qr-logo-input').value = ''; setLogoImage(''); }}>
                                    <img src={CloseIcon} />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                        <div className='qr-code-container' style={{ backgroundColor: bgColor }}>
                            <QRCode value={value} style={{ width: '256px', height: '256px' }}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                ecLevel={ecLevel}
                                enableCORS={enableCORS}
                                size={size}
                                quietZone={quietZone}
                                logoImage={logoImage}
                                logoWidth={logoWidth}
                                logoHeight={logoHeight}
                                logoOpacity={logoOpacity}
                                removeQrCodeBehindLogo={removeQrCodeBehindLogo}
                                logoPadding={logoPadding}
                                logoPaddingStyle={logoPaddingStyle}
                                qrStyle={qrStyle}
                                eyeRadius={eyeRadius}
                                eyeColor={eyeColor} />
                        </div>
                        {/* Logo Settings */}
                        {logoImage && <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1em', padding: '0 1em', textAlign: 'left' }}>
                            {/* `removeQrCodeBehindLogo` INPUT */}
                            <label className="material-checkbox">
                                <input type="checkbox" onChange={(e) => { setRemoveQrCodeBehindLogo(e.target.checked); }} form='qr-code-editor-dialog-form' />
                                <span className="checkmark"></span>
                                Excavate around icon?
                            </label>

                            {/* `logoPaddingStyle` INPUT */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                Icon Padding Style
                                <div className="qr-level-input" style={{ marginBottom: '0.5em' }}>
                                    <label>
                                        <input type="radio" name="padding-style" value="square" checked={logoPaddingStyle === "square"} onChange={() => { setLogoPaddingStyle("square"); }} form='qr-code-editor-dialog-form' />
                                        <span>Square</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="padding-style" value="circle" checked={logoPaddingStyle === "circle"} onChange={() => { setLogoPaddingStyle("circle"); }} form='qr-code-editor-dialog-form' />
                                        <span>Circle</span>
                                    </label>
                                </div>
                            </div>

                            {/* `logoPadding` INPUT */}
                            <label htmlFor="qr-code-logo-padding-input">Icon Padding ({logoPadding}px)</label>
                            <input type="range" id="qr-code-logo-padding-input" min={0} max={Math.floor(size / 8)} step={1} value={logoPadding} onChange={(e) => { setLogoPadding(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

                            {/* `logoHeight` INPUT */}
                            <label htmlFor="qr-code-logo-height-input">Icon Height ({logoHeight}px)</label>
                            <input type="range" id="qr-code-logo-height-input" min={0} max={Math.floor(size / 2)} step={1} value={logoHeight} onChange={(e) => { setLogoHeight(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

                            {/* `logoWidth` INPUT */}
                            <label htmlFor="qr-code-logo-width-input">Icon Width ({logoWidth}px)</label>
                            <input type="range" id="qr-code-logo-width-input" min={0} max={Math.floor(size / 2)} step={1} value={logoWidth} onChange={(e) => { setLogoWidth(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

                            {/* `logoOpacity` INPUT */}
                            <label htmlFor="qr-code-logo-opacity-input">Icon Opacity</label>
                            <input type="range" id="qr-code-logo-opacity-input" min={0} max={1} step={0.01} value={logoOpacity} onChange={(e) => { setLogoOpacity(parseFloat(e.target.value)); }} form='qr-code-editor-dialog-form' />
                        </div>}
                    </div>
                </div>

                {/* Dialog Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5em' }}>
                    <button className='default-button red-button' id="reset-qr-edits" value="reset" formMethod='dialog' type="reset" title='Reset to default' onClick={handleReset}>Reset</button>
                    <div style={{ gap: '1em', display: 'flex' }}>
                        <button className='default-button' id="cancel-qr-edits" value="cancel" formMethod='dialog' type="cancel" title='Cancel edits' onClick={handleCancel} form='qr-code-editor-dialog-form'>Cancel</button>
                        <button className='default-button primary-button' autoFocus={true} id="save-qr-edits" value="default" formMethod='dialog' type='submit' title='Save edits' onClick={handleSave} form='qr-code-editor-dialog-form'>Save</button>
                    </div>
                </div>
            </form>
        </dialog>
    );
}
