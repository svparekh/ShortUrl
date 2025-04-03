'use client';

import './LoginDrawer.css';
import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';

export default function LoginDrawer() {
    const pages = {
        register: 'login-drawer-register-page',
        confirm: 'login-drawer-confirm-page',
        user: 'login-drawer-user-page',
        login: 'login-drawer-login-page',
        forgot: 'login-drawer-forgot-password-page',
    };
    const [currentPage, setCurrentPage] = useState(pages.login);

    useEffect(() => {
        const curPage = document.getElementById(currentPage);
        if (!curPage) return;
        curPage.classList.remove('login-drawer-page-active');
        setTimeout(() => {
            curPage.classList.add('login-drawer-page-active');
        }, 50);
    }, [currentPage]);

    function switchPage(page) {
        const curPage = document.getElementById(currentPage);
        if (!curPage) return;
        curPage.classList.remove('login-drawer-page-active');
        setTimeout(() => {
            setCurrentPage(page);
        }, 100);
    }

    return (
        <Drawer.Root activeSnapPoint={1} direction='right'>
            <Drawer.Trigger type='button' id='open-login-drawer-button' className='default-button' title='Open login dialog' onClick={() => {
                setTimeout(() => {
                    const curPage = document.getElementById(currentPage);
                    if (!curPage) return;
                    curPage.classList.add('login-drawer-page-active');
                }, 10);
            }}>
                🗝️ Login
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }} />
                <Drawer.Content id='login-drawer' style={{
                    position: 'fixed',
                    display: 'flex',
                    outline: 'none',
                    flexDirection: 'column',
                    top: 0,
                    right: 0,
                    // marginRight: '-1px',
                }}>
                    <div id='login-drawer-content' className='primary-card-solid' style={{
                        margin: '1rem 1rem 0rem 0rem',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}>
                        {(() => {
                            switch (currentPage) {
                                case pages.register:
                                    return <RegisterPage />;
                                case pages.confirm:
                                    return <ConfirmUserPage />;
                                case pages.user:
                                    return <UserPage />;
                                case pages.forgot:
                                    return <ForgotPasswordPage />;
                                case pages.login:
                                default:
                                    return <LoginPage />;
                            }
                        })()}
                        {/* {currentPage} */}
                        {/* <LoginPage /> */}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );


    function LoginPage() {
        return (
            <div id={pages.login} className={`login-drawer-page login-drawer-page-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>Who are you? 🤨</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' style={{
                    // margin: '0rem 1rem',
                    marginRight: '1rem',
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    flex: '1 1 auto',
                }}>
                        {/* <Login /> */}
                        {/* <label htmlFor="login-email-input">Email</label> */}
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='email'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your email address'
                        />
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            type='password'
                            name='login-password-input'
                            id="login-password-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='password'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your password'
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type='button' id='login-link' className='link' title='Create a new account' onClick={() => { switchPage(pages.register); }} style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0 !important',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                New? Register now!
                            </button>
                            <button type='button' id='login-link' className='link' title='Forgot password?' onClick={() => { switchPage(pages.forgot); }} style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0 !important',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                Forgot Password?
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            {/* <button type="cancel" form='login-form' id='login-cancel-button' className='default-button' value="cancel" title='Go back'>Back</button> */}
                            <button type="submit" form='login-form' id='login-button' className='default-button primary-button' value="login" title='Login'>Login</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function RegisterPage() {
        return (
            <div id={pages.register} className='login-drawer-page'>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>First Timer? Join in! 🎉</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' style={{
                    // margin: '0rem 1rem',
                    marginRight: '1rem',
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    flex: '1 1 auto',
                }}>
                        {/* <Login /> */}
                        {/* <label htmlFor="login-email-input">Email</label> */}
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='email'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your email address'
                        />
                        <input
                            type='text'
                            name='login-display-name-input'
                            id="login-display-name-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='name'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your email address'
                        />
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            type='password'
                            name='login-password-input'
                            id="login-password-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='password'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your password'
                        />
                        <input
                            type='password'
                            name='login-re-password-input'
                            id="login-re-password-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='re-enter password'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Re-enter your password'
                        />
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type='button' id='login-link' className='link' title='Sign in' onClick={() => { switchPage(pages.login); }} style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0 !important',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                Sign in
                            </button>
                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5em' }}>
                            <button type="button" form='login-form' id='login-cancel-button' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.login); }}>Back</button>
                            <button type="submit" form='login-form' id='login-button' className='default-button primary-button' value="register" title='Register'>Register</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ConfirmUserPage() {
        return (
            <div id={pages.login} className={`login-drawer-page login-drawer-page-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>Done ✅</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' style={{
                    // margin: '0rem 1rem',
                    marginRight: '1rem',
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    flex: '1 1 auto',
                }}>
                        <p>Your account is still unverified.</p>
                        <p>Please confirm your email address.</p>
                        <p>An email with a verification link has been sent to example@mail.com</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type='button' id='login-link' className='link' title='Resend verification email' onClick={() => { }} style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0 !important',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                Resend email
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            <button type="cancel" form='login-form' id='login-cancel-button' className='default-button' value="cancel" title='OK'>OK</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function UserPage() {
        return (
            <div id={pages.login} className={`login-drawer-page login-drawer-page-active`}>
                <Drawer.Title style={{ textAlign: 'center', marginTop: '1.5em' }}>Hey, You Made It! 👋</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' style={{
                    // margin: '0rem 1rem',
                    marginRight: '1rem',
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    flex: '1 1 auto',
                }}>
                        <button type='button' id='login-link' className='link' title='Change display name' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change display name
                        </button>
                        <button type='button' id='login-link' className='link' title='Change email' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change email
                        </button>
                        <button type='button' id='login-link' className='link' title='Change password' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change password
                        </button>
                        <button type='button' id='login-link' className='link' title='Delete my data' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: '#DA6666'
                        }}>
                            Delete my data
                        </button>
                        <button type='button' id='login-link' className='link' title='Delete my account' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: '#DA6666'
                        }}>
                            Delete my account
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="cancel" form='login-form' id='login-cancel-button' className='default-button' value="cancel" title='Go back'>Back</button>
                            <button type="submit" form='login-form' id='login-button' className='default-button primary-button' value="Logout" title='Logout'>Logout</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ForgotPasswordPage() {
        return (
            <div id={pages.forgot} className={`login-drawer-page login-drawer-page-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>Oops, Memory Lapse?</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' style={{
                    // margin: '0rem 1rem',
                    marginRight: '1rem',
                    gap: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    flex: '1 1 auto',
                }}>
                        <p>Enter your email address.</p>
                        <p>A password reset link will be sent to you if your email is registered.</p>
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input"
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            // pattern='^[a-zA-Z0-9\s\-,\.!?]+$'
                            style={{ borderRadius: '1em' }}
                            placeholder='email'
                            // autoComplete='off'
                            // autoCorrect='off'
                            form='login-form'
                            title='Enter your email address'
                        />
                        <p style={{ textAlign: 'center', color: '#DA6666', visibility: 'hidden' }}>Email is not a registered.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" form='login-form' id='login-cancel-button' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.login); }}>Back</button>
                            <button type="submit" form='login-form' id='login-button' className='default-button primary-button' value="email" title='Send email'>Send email</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}


