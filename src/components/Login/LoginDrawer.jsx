'use client';

import './LoginDrawer.css';
import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { supabase } from '../../vars';

export default function LoginDrawer() {
    const pages = {
        register: 'login-drawer-register-page',
        confirm: 'login-drawer-confirm-page',
        user: 'login-drawer-user-page',
        login: 'login-drawer-login-page',
        forgot: 'login-drawer-forgot-password-page',
        changeEmail: 'login-drawer-change-email-page',
        changePassword: 'login-drawer-change-password-page',
        deleteData: 'login-drawer-delete-data-page',
        deleteAccount: 'login-drawer-delete-account-page',
    };
    const [currentPage, setCurrentPage] = useState(pages.login);
    const [buttonText, setButtonText] = useState('🗝️ Login');

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setTimeout(async () => {
                const { data: { user } } = await supabase.auth.getUser();
                user ? setButtonText('👋 Hello') : setButtonText('🗝️ Login');
            }, 0)
        })
    }, []);

    function switchPage(page) {
        const curPage = document.getElementById(currentPage);
        if (!curPage) return;
        curPage.classList.remove('slide-away-active');
        setTimeout(() => {
            setCurrentPage(page);
        }, 150);
    }

    useEffect(() => {
        const curPage = document.getElementById(currentPage);
        if (!curPage) return;
        curPage.classList.remove('slide-away-active');
        setTimeout(() => {
            curPage.classList.add('slide-away-active');
        }, 0);
    }, [currentPage]);

    return (
        <Drawer.Root activeSnapPoint={1} direction='right'>
            <Drawer.Trigger type='button' id='open-login-drawer-button' className='default-button' title='Open login dialog' onClick={async () => {
                const { data: { user } } = await supabase.auth.getUser();
                user ? setCurrentPage(pages.user) : setCurrentPage(pages.login);
            }}>
                {buttonText}

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
                                case pages.changeEmail:
                                    return <ChangeEmailPage />;
                                case pages.changePassword:
                                    return <ChangePasswordPage />;
                                case pages.deleteData:
                                    return <DeleteDataPage />;
                                case pages.deleteAccount:
                                    return <DeleteAccountPage />;
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
        async function submitLogin(e) {
            e.preventDefault();
            const loginButton = document.getElementById('login-button');
            loginButton.classList.toggle('button--loading');
            loginButton.setAttribute("disabled", "true");
            const email = e.target.elements['login-email-input'].value;
            const password = e.target.elements['login-password-input'].value;
            // const response = await signInWithEmailAndPassword(getAuth(), email, password);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            // Handle error
            if (error) {
                const errorText = document.getElementById('login-error-text');
                // https://supabase.com/docs/guides/auth/debugging/error-codes
                switch (error.code) {
                    // email_not_confirmed
                    case 'invalid_credentials':
                        console.error('Invalid credentials');
                        errorText.textContent = 'Invalid credentials';
                        break;
                    case 'email_not_confirmed':
                        console.error('Account not verified');
                        errorText.textContent = 'Account not verified';
                        break;
                    case 'user_not_found':
                        console.error('User not found');
                        errorText.textContent = 'User not found';
                        break;
                    default:
                        console.error('Error signing in:', error);
                        errorText.textContent = 'Error signing in';
                }
                errorText.style.maxHeight = '3em';
                loginButton.classList.toggle('button--loading');
                loginButton.removeAttribute("disabled");
                e.target.elements['login-email-input'].classList.add('invalid');
                e.target.elements['login-password-input'].classList.add('invalid');
                e.target.elements['login-email-input'].focus();
            }
            // Handle successful sign in
            if (data.user) {
                switchPage(pages.user);
            }
        }
        return (
            <div id={pages.login} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>Who are you? 🤨</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form' onSubmit={(e) => { submitLogin(e); }}
                    style={{
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
                            required
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
                            required
                        />
                        <p id='login-error-text' style={{ textAlign: 'center', color: '#DA6666', maxHeight: '0em', overflow: 'hidden', transition: 'max-height var(--slow-transition-duration) var(--primary-curve)' }}></p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type='button' className='link' title='Create a new account' onClick={() => { switchPage(pages.register); }} style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0 !important',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                New? Register now!
                            </button>
                            <button type='button' className='link' title='Forgot password?' onClick={() => { switchPage(pages.forgot); }} style={{
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
                            {/* <button type="cancel" form='login-form' className='default-button' value="cancel" title='Go back'>Back</button> */}
                            <button type="submit" id='login-button' form='login-form' className='default-button primary-button' value="login" title='Login' style={{ position: 'relative' }}>
                                <span className="button__text">Login</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function RegisterPage() {
        async function submitRegister(e) {
            e.preventDefault();
            const registerButton = document.getElementById('register-button');
            registerButton.classList.toggle('button--loading');
            registerButton.setAttribute("disabled", "true");
            const email = e.target.elements['login-email-input'].value;
            const password = e.target.elements['login-password-input'].value;
            try {
                const response = await signInWithEmailAndPassword(getAuth(), email, password);
                // handle successful sign in
                switchPage(pages.user);
            } catch (error) {
                const errorText = document.getElementById('login-error-text');
                switch (error.code) {
                    case 'auth/invalid-credential':
                        console.error('Invalid credentials');
                        errorText.textContent = 'Invalid credentials';
                        break;
                    case 'auth/invalid-email':
                        console.error('Invalid email address');
                        errorText.textContent = 'Invalid email address';
                        break;
                    case 'auth/wrong-password':
                        console.error('Incorrect password');
                        errorText.textContent = 'Incorrect password';
                        break;
                    case 'auth/user-not-found':
                        console.error('User not found');
                        errorText.textContent = 'User not found';
                        break;
                    default:
                        console.error('Error signing in:', error);
                        errorText.textContent = 'Error signing in';
                }
                errorText.style.maxHeight = '3em';
                registerButton.classList.toggle('button--loading');
                registerButton.removeAttribute("disabled");
                e.target.elements['login-email-input'].classList.add('invalid');
                e.target.elements['login-password-input'].classList.add('invalid');
                e.target.elements['login-email-input'].focus();
            }
        }
        return (
            <div id={pages.register} className='slide-away slide-away-active'>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>First Timer? Join in! 🎉</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}><form id='login-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        // const { data, error } = await supabase.auth.signUp({
                        //     email: 'example@email.com',
                        //     password: 'example-password',
                        // })
                        switchPage(pages.confirm);
                    }}
                    style={{
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
                            <button type='button' className='link' title='Sign in' onClick={() => { switchPage(pages.login); }} style={{
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
                            <button type="button" form='login-form' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.login); }}>Back</button>
                            <button type="submit" id='register-button' form='login-form' className='default-button primary-button' value="register" title='Register' style={{ position: 'relative' }}>
                                <span className="button__text">Register</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ConfirmUserPage() {
        return (
            <div id={pages.confirm} className={`slide-away slide-away-active`}>
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
                            <button type='button' className='link' title='Resend verification email' onClick={() => { }} style={{
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
                            <button type="cancel" form='login-form' className='default-button' value="cancel" title='OK'>OK</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function UserPage() {
        async function submitLogout(e) {
            e.preventDefault();
            const logoutButton = document.getElementById('logout-button');
            logoutButton.classList.toggle('button--loading');
            logoutButton.setAttribute("disabled", "true");
            const { error } = await supabase.auth.signOut();
            // Handle error
            if (error) {
                logoutButton.classList.toggle('button--loading');
                logoutButton.removeAttribute("disabled");
            }
            else {
                switchPage(pages.login);
            }
        }
        return (
            <div id={pages.user} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0' }}>Hey, You Made It! 👋</Drawer.Title>
                {/* Content */}
                <div style={{
                    margin: '0rem 2rem 2rem',
                    // overflowY: 'auto',
                    // overflowX: 'none'
                }}>
                    {/* SHOULD NOT BE A FORM??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                    <form id='login-form' style={{
                        // margin: '0rem 1rem',
                        marginRight: '1rem',
                        gap: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                        flex: '1 1 auto',
                    }}>
                        {/* <button type='button' className='link' title='Change display name' onClick={() => { }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change display name
                        </button> */}
                        <button type='button' className='link' title='Change email' onClick={() => { switchPage(pages.changeEmail); }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change email
                        </button>
                        <button type='button' className='link' title='Change password' onClick={() => { switchPage(pages.changePassword); }} style={{
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '0 !important',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}>
                            Change password
                        </button>
                        <button type='button' className='link' title='Delete my data' onClick={() => { switchPage(pages.deleteData); }} style={{
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
                        <button type='button' className='link' title='Delete my account' onClick={() => { switchPage(pages.deleteAccount); }} style={{
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
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            {/* <button type="cancel" form='login-form' className='default-button' value="cancel" title='Go back'>Back</button> */}
                            <button type="button" id='logout-button' form='login-form' className='default-button primary-button' value="Logout" title='Logout' onClick={(e) => { submitLogout(e); }} style={{ position: 'relative' }}>
                                <span className="button__text">Logout</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ChangeEmailPage() {
        return (
            <div id={pages.changeEmail} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>Need a new email?</Drawer.Title>
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
                        <p>Enter your current email address followed by your new one.</p>
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input2"
                            placeholder='ex***@mail.com'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input3"
                            placeholder='new email'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <input
                            type='email'
                            name='login-email-input'
                            id="login-email-input4"
                            placeholder='confirm new email'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
                            <button type="button" form='' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.user); }}>Back</button>
                            <button type="submit" form='' className='default-button primary-button' value="submit" title='Submit email change' >Change email</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ChangePasswordPage() {
        return (
            <div id={pages.changePassword} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>Need a new password?</Drawer.Title>
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
                        <p>Enter your current password address followed by your new one.</p>
                        <input
                            type='password'
                            name='login-password-input'
                            id="login-password-input2"
                            placeholder='current password'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <input
                            type='password'
                            name='login-password-input'
                            id="login-password-input3"
                            placeholder='new password'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <input
                            type='password'
                            name='login-password-input'
                            id="login-password-input4"
                            placeholder='confirm new password'
                            // onInput={(e) => { if (typeof e.target.reportValidity === 'function') { validateAndSetValueOnInput(e); } }}
                            style={{ borderRadius: '1em' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
                            <button type="button" form='' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.user); }}>Back</button>
                            <button type="submit" form='' className='default-button primary-button' value="submit" title='Submit password change' >Change password</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    function ForgotPasswordPage() {
        return (
            <div id={pages.forgot} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>Oops, Memory Lapse? 😅</Drawer.Title>
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
                            <button type="button" form='login-form' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.login); }}>Back</button>
                            <button type="submit" form='login-form' className='default-button primary-button' value="email" title='Send email'>Send email</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    function DeleteDataPage() {
        return (
            <div id={pages.deleteData} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>Are you sure?</Drawer.Title>
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
                        <p>Are you sure you want to PERMANENTLY delete all your data? This mean you will lose all your links and QR codes forever with no way of undoing it.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" form='login-form' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.user); }}>No</button>
                            <button type="submit" form='login-form' className='default-button primary-button' value="email" title='Delete my data'>Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    function DeleteAccountPage() {
        return (
            <div id={pages.deleteAccount} className={`slide-away slide-away-active`}>
                <Drawer.Title style={{ textAlign: 'center', margin: '1.5em 0em' }}>You wanna leave? 🥺</Drawer.Title>
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
                        <p>Are you sure you want to PERMANENTLY delete your account? This mean you will lose all your links, QR codes, and login forever with no way of undoing it.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" form='login-form' className='default-button' value="cancel" title='Go back' onClick={() => { switchPage(pages.user); }}>No</button>
                            <button type="submit" form='login-form' className='default-button primary-button' value="email" title='Delete my data'>Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


