import './ShortenUrlCard.css';

import { SHORTEN_URL } from '../../vars.jsx'
import DomainDropdown from '../DomainDropdown/DomainDropdown.jsx';
import { createOption } from '../../Helper.jsx';
import LockedIcon from '../../assets/locked.webp';

import { useState } from 'react';


export default function ShortenUrlCard({ xTranslate }) {
    ShortenUrlCard.propTypes = {
        xTranslate: String
    }

    const [isURLInputValid, setIsURLInputValid] = useState(false);
    const [isDomainDropdownDisabled, setIsDomainDropdownDisabled] = useState(false);
    // Inputs
    const [url, setUrl] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('svparekh.com');
    const [alias, setAlias] = useState('');


    function showResult(shortLink) {
        const cardResult = document.querySelector(`.card-result.${SHORTEN_URL}`);
        const cardResultUrl = document.querySelector(`.card-result.${SHORTEN_URL} h2`);
        const cardContents = document.querySelector(`.card-contents.${SHORTEN_URL}`);
        const progressBar = document.querySelector(`.operation-progress.${SHORTEN_URL}`);
        const progressBarValue = document.querySelector(`.operation-progress-value.${SHORTEN_URL}`);
        cardContents.style.opacity = '0';
        setTimeout(() => {
            progressBar.style.opacity = '1';
        }, 150);
        setTimeout(() => {
            progressBarValue.style.width = '100%';
        }, 275);
        setTimeout(() => {
            progressBar.style.opacity = '0';
        }, 300);
        setTimeout(() => {
            cardResult.style.opacity = '1';
            cardResult.style.pointerEvents = 'auto';
            cardResult.style.webkitUserSelect = 'auto';
            cardResult.style.userSelect = 'auto';
            cardResultUrl.textContent = shortLink;
        }, 450);
    }

    function handleSubmit(event) {
        event.preventDefault()
        // disable button
        const button = document.querySelector('.generate-button');
        button.disabled = true;
        // disable input
        const input1 = document.querySelector(`#${SHORTEN_URL}-input`);
        input1.disabled = true;
        const input2 = document.querySelector(`alias-input`);
        input2.disabled = true;
        setIsDomainDropdownDisabled(true);
        // generate short link and show the result
        // const shortLink;
        // url, selectedDomain, alias
        // api call to get short link

        showResult("shortLink");
    }

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            // submit form
            const form = document.querySelector(`#${SHORTEN_URL}-form`);
            form.requestSubmit();
        }
    }

    function validateInput(target) {
        if (target.value.length === 0) {
            setIsURLInputValid(null);
            target.classList.remove('invalid');
        }
        else if (target.checkValidity() == true) {
            setIsURLInputValid(true);
            target.classList.remove('invalid');
            if (target.id === `${SHORTEN_URL}-input`) {
                setUrl(target.value);
            }
            else if (target.id === `alias-input`) {
                setAlias(target.value);
            }
        }
        else {
            setIsURLInputValid(false);
            target.classList.add('invalid');
        }
        target.reportValidity();
    }

    return (
        <div className={`card ${SHORTEN_URL} primary-card-blurred`} style={{ transform: `translateX(${xTranslate})` }}>
            {/* Input Section */}
            <div className={`card-contents ${SHORTEN_URL}`} style={{ flexDirection: 'column', alignItems: 'center', }}>
                <h2>Shorten a URL ✂️</h2>
                {/* ✂ ✂️ */}
                <form id={`${SHORTEN_URL}-form`} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', alignItems: 'start', gap: '0.25em' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', alignItems: 'start', gap: '0.5em' }}>
                        <p>Shorten a long URL</p>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor={`${SHORTEN_URL}-input`} style={{ display: 'none' }}>Enter your long link</label>
                            <input
                                type='url'
                                name={SHORTEN_URL}
                                id={`${SHORTEN_URL}-input`}
                                form={`${SHORTEN_URL}-form`}
                                onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateInput(e.target); } }}
                                style={{ borderRadius: '1em' }}
                                placeholder='type or paste your link here...'
                                pattern='https?:\/\/.+'
                                onKeyDown={handleInputKeyDown}
                                autoComplete='off'
                                autoCorrect='off'
                                required
                                autoFocus
                            />
                        </div>
                        <p>Customize</p>
                        <div style={{ display: 'flex', width: '80%' }}>
                            <DomainDropdown options=
                                {[
                                    createOption({ value: 'svparekhcom', text: 'svparekh.com' }),
                                    createOption({ value: 'custom', text: 'Custom', disabled: true, icon: LockedIcon })
                                ]}
                                onSelect={setSelectedDomain}
                                disabled={isDomainDropdownDisabled}
                            />

                            <label htmlFor='alias-input' style={{ display: 'none' }} value='alias'>Enter an optional alias for you short link</label>
                            <input
                                type='text'
                                name='alias-input'
                                id='alias-input'
                                form={`${SHORTEN_URL}-form`}
                                onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateInput(e.target); } }}
                                pattern='^[\-_a-zA-Z0-9]*$'
                                style={{ borderTopRightRadius: '1em', borderBottomRightRadius: '1em', width: '100%' }}
                                placeholder='enter an optional alias...'
                                autoComplete='off'
                                autoCorrect='off'
                            />
                        </div>
                    </div>
                    {/* Captcha and Submit button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <p>
                            Just enter your link and hit the big red button to shorten it!
                        </p>
                        <button form={`${SHORTEN_URL}-form`} type='submit' value='generate' className='generate-button' disabled={!isURLInputValid} title='Generate Short Link' >
                            <span className='back'></span>
                            <span className='front'></span>
                        </button>
                    </div>
                </form>
            </div>
            {/* Resulting Short URL Section */}
            <div className={`operation-progress ${SHORTEN_URL}`}>
                <div className={`operation-progress-value ${SHORTEN_URL}`}></div>
            </div>
            <div className={`card-result ${SHORTEN_URL}`} style={{ opacity: '0', transition: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <h2>URL Generated</h2>
                <a href='/'>Generate another!</a>
            </div>
        </div>
    );
}
