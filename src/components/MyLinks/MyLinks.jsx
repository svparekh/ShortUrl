'use client';

import './MyLinks.css';

import { Drawer } from 'vaul';
import { MyLinksItem, SHORTEN_URL } from '../../vars';
import ShortUrlMyLinksItemComponent from './Items/ShortUrlMyLinksItemComponent.jsx';
import QrCodeMyLinksItemComponent from './Items/QrCodeMyLinksItemComponent.jsx';


export default function MyLinks({ links }) {
    MyLinks.propTypes = {
        links: Array < MyLinksItem > {}
    }

    // 🔗
    // style={{ padding: '1em 1.6em 1em 2em' }}

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
                    <Drawer.Title></Drawer.Title>
                    {/* Content */}
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
                                links.map(link => link.type === `${SHORTEN_URL}` ? <ShortUrlMyLinksItemComponent key={link.id} item={link} /> : <QrCodeMyLinksItemComponent key={link.id} item={link} />)
                            }
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}