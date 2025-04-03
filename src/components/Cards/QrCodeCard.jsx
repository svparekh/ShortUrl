import './QrCodeCard.css';

import { QR_CODE, DEFAULT_QR_CODE_SETTINGS, DEFAULT_QR_CODE_VALUE } from '../../vars.jsx'
import EditIcon from '../../assets/edit.png';
import CloseIcon from '../../assets/close.png';
import DownloadIcon from '../../assets/download.png';
import QRCodeEditorDialog from '../Dialogs/QRCodeEditorDialog.jsx'

import { QRCode } from 'react-qrcode-logo';
import { useState, useRef, useEffect } from 'react';


export default function QrCodeCard({ xTranslate }) {
    QrCodeCard.propTypes = {
        xTranslate: String
    }
    const qrCodeRef = useRef(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [chosenFile, setChosenFile] = useState('');
    const [selectedInputForm, setSelectedInputForm] = useState('qr-code-edit-url');

    const [qrCodeSettings, setQrCodeSettings] = useState(DEFAULT_QR_CODE_SETTINGS);
    const [qrCodeValue, setQrCodeValue] = useState(DEFAULT_QR_CODE_VALUE);
    const [qrCodeInput1, setQrCodeInput1] = useState('');
    const [qrCodeInput2, setQrCodeInput2] = useState('');
    const [qrCodeInput3, setQrCodeInput3] = useState('');
    const [qrCodeInput4, setQrCodeInput4] = useState('');

    function handleEditorClose(output) {
        setIsDialogOpen(false);
        if (output) {
            setQrCodeSettings(output);
        }
    }

    useEffect(() => {
        setQrCodeInput1('');
        setQrCodeInput2('');
        setQrCodeInput3('');
        setQrCodeInput4('');
        setQrCodeValue('');
    }, [selectedInputForm]);

    useEffect(() => {
        // Based on the selected input form, set the qrCodeValue using inputs
        // Do this in checking form validity instead??
        switch (selectedInputForm) {
            case 'qr-code-edit-url': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-text': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-email':
                setQrCodeValue(`mailto:${qrCodeInput1}?subject=${qrCodeInput2}&body=${qrCodeInput3}`);
                break;
            case 'qr-code-edit-tel': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-sms': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-file': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-img': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-vid': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-wifi': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-app': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-event': setQrCodeValue(qrCodeInput1); break;
            case 'qr-code-edit-geo': setQrCodeValue(qrCodeInput1); break;
            default: setQrCodeValue(''); break;
            // WIFI:S:<SSID>;T:<WEP|WPA|nopass>;P:<PASSWORD>;H:<true|false|blank>;;
            // WIFI:S:My_SSID;T:WPA;P:key goes here;H:false;
            // ^    ^         ^     ^               ^
            // |    |         |     |               +-- hidden SSID (true/false)
            // |    |         |     +-- WPA key
            // |    |         +-- encryption type
            // |    +-- ESSID
            // +-- code type
        }
    }, [qrCodeInput1, qrCodeInput2, qrCodeInput3, qrCodeInput4]);

    function validateAndSetValueOnInput(event) {
        // event.preventDefault();
        const target = event.target;
        if (target.checkValidity() == true) {
            target.classList.remove('invalid');
            // Set variable value to input value
            switch (event.name) {
                case 'qr-code-input-2': setQrCodeInput2(target.value); break;
                case 'qr-code-input-3': setQrCodeInput3(target.value); break;
                case 'qr-code-input-4': setQrCodeInput4(target.value); break;
                case 'qr-code-input-1':
                default: setQrCodeInput1(target.value); break;
            }
        }
        else if (target.value.length === 0) {
            target.classList.remove('invalid');
            setQrCodeValue('');
        }
        else {
            target.classList.add('invalid');
            setQrCodeValue('');
        }
        target.reportValidity();
    }

    return (
        <>
            <QRCodeEditorDialog openModal={isDialogOpen} onClose={handleEditorClose} value={qrCodeValue} settings={qrCodeSettings} />
            <div className={`card ${QR_CODE} primary-card-blurred`} style={{ transform: `translateX(${xTranslate})` }}>
                <h2 style={{ marginBottom: '2em' }}>Generate a QR Code 🗲</h2>
                {/* 🗲 💡 */}
                <div className={`card-contents ${QR_CODE}`} style={{ gap: '2em' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* *********** */}
                        {/* VALUE INPUT */}
                        {/* *********** */}
                        {/* Form Selectors */}
                        <div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', gap: '0.5em', margin: '1em 0' }}>
                            <button className='default-button' id="qr-code-edit-url" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Open a link'>Link</button>
                            <button className='default-button' id="qr-code-edit-text" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Display text'>Text</button>
                            <button className='default-button' id="qr-code-edit-email" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Draft an email'>E-mail</button>
                            <button className='default-button' id="qr-code-edit-tel" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Dial a phone number'>Phone</button>
                            {/* <button className='default-button' id="qr-code-edit-sms" value="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)}>SMS</button> */}
                            <button className='default-button' id="qr-code-edit-wifi" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Connect to a WiFi network'>WiFi</button>
                            <button className='default-button' id="qr-code-edit-app" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Open an app or go to the app store'>App</button>
                            <button className='default-button' id="qr-code-edit-file" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Open a file'>File</button>
                            <button className='default-button' id="qr-code-edit-img" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Open an image'>Image</button>
                            {/* <button className='default-button' id="qr-code-edit-vid" value="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)}>Video</button> */}
                            <button className='default-button' id="qr-code-edit-event" name="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)} title='Create an event on the calendar'>Event</button>
                            {/* <button className='default-button' id="qr-code-edit-geo" value="tab" type='button' onClick={(e) => setSelectedInputForm(e.target.id)}>Location</button> */}
                        </div>
                        {/* Form */}
                        {switchFormOnInput(selectedInputForm)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                        <div className='qr-code-container' style={{ marginBottom: '1em', backgroundColor: qrCodeSettings.bgColor }}>
                            <button type='button' className='edit-qr-code-button' onClick={() => setIsDialogOpen(true)} title='Open QR Code Editor'>
                                <img src={EditIcon} />
                            </button>
                            <QRCode ref={qrCodeRef} value={qrCodeValue} style={{ width: '256px', height: '256px' }}
                                bgColor={qrCodeSettings.bgColor}
                                fgColor={qrCodeSettings.fgColor}
                                ecLevel={qrCodeSettings.ecLevel}
                                enableCORS={qrCodeSettings.enableCORS}
                                size={qrCodeSettings.size}
                                quietZone={qrCodeSettings.quietZone}
                                logoImage={qrCodeSettings.logoImage}
                                logoWidth={qrCodeSettings.logoWidth}
                                logoHeight={qrCodeSettings.logoHeight}
                                logoPadding={qrCodeSettings.logoPadding}
                                logoOpacity={qrCodeSettings.logoOpacity}
                                logoPaddingStyle={qrCodeSettings.logoPaddingStyle}
                                removeQrCodeBehindLogo={qrCodeSettings.removeQrCodeBehindLogo}
                                qrStyle={qrCodeSettings.qrStyle}
                                eyeRadius={qrCodeSettings.eyeRadius}
                                eyeColor={qrCodeSettings.eyeColor} />
                        </div>
                        <button type='button' id="download-qr-code-button" className='default-button' disabled={qrCodeValue === ''} title='Download QR Code' onClick={() => qrCodeRef.current?.download('png', qrCodeSettings.title)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em', borderRadius: '1em', padding: '0.5em 1em' }}>
                            <img src={DownloadIcon} alt="Download QR Code" id="download-qr-code-icon" />
                            <p style={{ fontSize: 'x-large', paddingBottom: '0.1em' }}>Download</p>
                        </button>
                    </div>
                </div>

                <div className={`operation-progress ${QR_CODE}`}>
                    <div className={`operation-progress-value ${QR_CODE}`}></div>
                </div>
                {/* <progress className={`operation-progress ${QR_CODE}`} value='10' max='100'> </progress> */}
                <div className={`card-result ${QR_CODE}`} style={{ opacity: '0', transition: 'var(--transition)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h2>QR Code Generated</h2>
                    <a href='/'>Generate another!</a>
                </div>
            </div>
        </>
    );

    function switchFormOnInput(selectedInputForm) {
        switch (selectedInputForm) {
            case 'qr-code-edit-text':
                return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <p style={{ paddingBottom: '1em' }}>Show some text through a QR Code.</p>
                    <textarea
                        type='text'
                        name='qr-code-input-1'
                        id='text-input'
                        onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                        style={{ borderRadius: '1em', resize: 'vertical' }}
                        placeholder='type or paste your text here...'
                        autoComplete='off'
                    />
                </div>;
            case 'qr-code-edit-email':
                return <form>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1em' }}>
                        <p>Send an email through a QR Code.</p>
                        <input
                            type='email'
                            name='qr-code-input-1'
                            id='email-input'
                            onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                            placeholder='enter an email address...'
                            autoComplete='off'
                            autoCorrect='off'
                            required
                        />
                        <input
                            type='text'
                            name='qr-code-input-2'
                            id='email-subject-input'
                            onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                            placeholder='enter an email subject...'
                            autoComplete='off'
                            autoCorrect='off'
                        />
                        <textarea
                            type='text'
                            name='qr-code-input-3'
                            id='email-text-input'
                            onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em', resize: 'vertical' }}
                            placeholder='type or paste your email content here...'
                            autoComplete='off'
                        />
                    </div>
                </form>;
            case 'qr-code-edit-tel':
                return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <label htmlFor='phone-input' style={{ paddingBottom: '1em' }}>Enter a phone number show through a QR Code.</label>
                    <input
                        type='tel'
                        name='qr-code-input-1'
                        id='phone-input'
                        onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                        style={{ borderRadius: '1em' }}
                        placeholder='___-___-____'
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        autoComplete='off'
                        autoCorrect='off'
                    />
                </div>;
            case 'qr-code-edit-sms': return <></>;
            case 'qr-code-edit-wifi':
                // WIFI:S:<SSID>;T:<WEP|WPA|nopass>;P:<PASSWORD>;H:<true|false|blank>;;
                // WIFI:S:My_SSID;T:WPA;P:key goes here;H:false;
                // ^    ^         ^     ^               ^
                // |    |         |     |               +-- hidden SSID (true/false)
                // |    |         |     +-- WPA key
                // |    |         +-- encryption type
                // |    +-- ESSID
                // +-- code type
                return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1em' }}>
                    <p>Connect to a WiFi network after scanning.</p>
                    <input
                        type='text'
                        name='qr-code-input-1'
                        id='wifi-ssid-input'
                        onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                        style={{ borderRadius: '1em' }}
                        placeholder='enter WiFi SSID...'
                        autoComplete='off'
                        autoCorrect='off'
                    />
                    <input
                        type='password'
                        name='qr-code-input-2'
                        id='wifi-pas-input'
                        onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                        style={{ borderRadius: '1em' }}
                        placeholder='enter WiFi password...'
                        autoComplete='off'
                        autoCorrect='off'
                    />
                    <div style={{ display: 'flex', width: '80%' }}>
                        <label htmlFor='qr-code-wifi-enc-type' value='qr-code-wifi-enc-type'>Encryption</label>
                        <select></select>
                        <label htmlFor='qr-code-wifi-hidden-ssid' value='qr-code-wifi-hidden-ssid'>Hide SSID</label>
                        <select></select>
                    </div>
                </div>;

            case 'qr-code-edit-app': return <></>;
            case 'qr-code-edit-file':
                return <div>
                    <p>QR Code will resolve to a file.</p>
                    <p>Select the file you wish to share.</p>
                    <p style={{ color: 'var(--accent-color)' }}>Maximum file size: 10MB</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1em' }}>
                        <input type='file' id='qr-file-input' name='qr-code-input-1' accept='application/*' onChange={(e) => { if (e.target.value.length > 0) setChosenFile(e.target.files[0]); }} value={chosenFile} />
                        <button type='button' className='qr-input-file-deselect-button' disabled={!chosenFile} onClick={() => { document.querySelector('#qr-file-input').value = ''; setChosenFile(''); }}>
                            <img src={CloseIcon} />
                        </button>
                    </div>
                </div>;
            case 'qr-code-edit-img':
                return <div>
                    <p>QR Code will resolve to an image.</p>
                    <p>Select the image you wish to share.</p>
                    <p style={{ color: 'var(--accent-color)' }}>Maximum file size: 10MB</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1em' }}>
                        <input type='file' id='qr-image-input' name='qr-code-input-1' accept='.png, .jpg, .jpeg, .gif, .webp, .svg' onChange={(e) => { if (e.target.value.length > 0) setChosenFile(e.target.files[0]); }} value={chosenFile} />
                        <button type='button' className='qr-input-file-deselect-button' disabled={!chosenFile} onClick={() => { document.querySelector('#qr-image-input').value = ''; setChosenFile(''); }}>
                            <img src={CloseIcon} />
                        </button>
                    </div>
                </div>;
            case 'qr-code-edit-vid': return <></>;
            case 'qr-code-edit-event': return <></>;
            case 'qr-code-edit-geo': return <></>;
            case 'qr-code-edit-url':
            default:
                return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <p>Link a website through a QR Code!</p>
                    <p style={{ paddingBottom: '1em' }}>Opens the URL after scanning.</p>
                    <input
                        type='url'
                        name='qr-code-input-1'
                        id='link-input'
                        onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                        style={{ borderRadius: '1em' }}
                        placeholder='type or paste your link here...'
                        pattern='https?:\/\/.+'
                        autoComplete='off'
                        autoCorrect='off'
                    />
                </div>;
        }
    }
}


