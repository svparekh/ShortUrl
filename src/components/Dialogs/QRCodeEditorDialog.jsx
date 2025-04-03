
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
        <dialog id="qrCodeEditorDialog" className='primary-card-solid' ref={ref} title='QR Code Editor'>
            <form id="qr-code-editor-dialog-form" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', height: '100%' }}>
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
                                style={{ borderRadius: '0.5em' }}
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
                        <input type="range" id="qr-code-size-input" min={256} max={4096} step={1} value={size} onChange={(e) => { setSize(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

                        {/* `quietZone` INPUT */}
                        <label htmlFor="qr-code-margin-input">Margin ({quietZone}px)</label>
                        <input type="range" id="qr-code-margin-input" min={0} max={Math.floor(size / 8)} step={1} value={quietZone} onChange={(e) => { setQuietZone(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

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
                        <input type="range" id="qr-code-eye-radius-input" min={0} max={Math.floor(size / 4)} step={1} value={eyeRadius} onChange={(e) => { setEyeRadius(parseInt(e.target.value)); }} form='qr-code-editor-dialog-form' />

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
