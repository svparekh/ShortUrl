'use client';

import './MyLinks.css';

import { Drawer } from 'vaul';
import { MyLinksItem, SHORTEN_URL } from '../../vars';
import ShortUrlMyLinksItemComponent from './Items/ShortUrlMyLinksItemComponent.jsx';
import QrCodeMyLinksItemComponent from './Items/QrCodeMyLinksItemComponent.jsx';
import LoginIllustrationImage from '../../assets/login_illustration.svg';
import EmptyIllustration from '../../assets/empty_illustration.svg';
import { useState, useEffect } from 'react';
import { supabase } from '../../vars';

export default function MyLinks({ links }) {
    MyLinks.propTypes = {
        links: Array < MyLinksItem > {}
    }

    // 🔗
    // style={{ padding: '1em 1.6em 1em 2em' }}
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setTimeout(async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setIsLoggedIn(true);
                }
                else {
                    setIsLoggedIn(false);
                }
            }, 0)
        })
    }, []);

    return (
        <Drawer.Root activeSnapPoint={1}>
            <Drawer.Trigger type='button' id='my-links-button' className='default-button' title='View my generated links'>My Links</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }} />
                <Drawer.Content className='primary-card-solid' style={{
                    height: '100%', // h-fit
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '2em 2em 0 0',
                    maxHeight: '80%',
                    marginLeft: '-1px',
                    marginRight: '-1px',
                }}>
                    {/* Bar at top */}
                    <div aria-hidden style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '3rem',
                        height: '0.375rem',
                        flexShrink: 0,
                        borderRadius: '9999px',
                        backgroundColor: 'var(--text-color)',
                        marginTop: '1rem',
                        marginBottom: '1rem'
                    }} />
                    <Drawer.Title style={{ textAlign: 'center', marginBottom: '1em' }}>My Links and QR Codes</Drawer.Title>
                    {/* Content */}
                    {
                        isLoggedIn ? links.length === 0 ? (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 1em' }}>
                                <img src={EmptyIllustration} alt='Empty Illustration' style={{ width: '50%', height: '50%', userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }} />
                                <h3>Nothing saved yet 🤷‍♂️</h3>
                                <p>Generate a link or save a QR code and it will show up here!</p>
                            </div>
                        ) : (
                            <div style={{
                                margin: '0rem 0rem 1rem 1rem',
                                overflowY: 'auto',
                                overflowX: 'none'
                            }}><div style={{
                                // margin: '0rem 1rem',
                                marginRight: '1rem',
                                gap: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: '1 1 auto',
                            }}>
                                    {
                                        links.map((link) => (
                                            link.type === SHORTEN_URL ? (
                                                <ShortUrlMyLinksItemComponent key={link.id} item={link} />
                                            ) : (
                                                <QrCodeMyLinksItemComponent key={link.id} item={link} />
                                            )))
                                    }
                                </div>
                            </div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 1em' }}>
                                <img src={LoginIllustrationImage} alt='Login Illustration' style={{ height: '50%', userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }} />
                                <h3>You are not signed in 🗝️</h3>
                                <p>Login in or create an account to save your links and QR codes!</p>
                            </div>
                        )
                    }
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}