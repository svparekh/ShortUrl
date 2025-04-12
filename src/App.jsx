'use client';


import { supabase, QrCodeMyLinksItem, SHORTEN_URL, ShortUrlMyLinksItem } from './vars.jsx'
import Header from './components/Header/Header.jsx';
import './App.css';
import OpSelector from './components/Operator/OpSelector.jsx';
import Operator from './components/Operator/Operator.jsx';
import React from 'react';
import Background from './components/Background/Background.jsx'
import PrivacyPolicyDialog from './components/Dialogs/PrivacyPolicyDialog.jsx';
import MyLinks from './components/MyLinks/MyLinks.jsx';
import TestDrawer from './components/Dialogs/test.jsx';
import Loading from './components/Background/Loading.jsx';


function App() {
  // Init Theme
  const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = React.useState(storedTheme || osTheme);

  document.body.setAttribute('data-theme', theme);

  // Init Option, can be shorten-url or qr-code
  const [option, setOption] = React.useState(SHORTEN_URL);
  const [isLoading, setIsLoading] = React.useState(true);

  // Toggle Theme between light and dark
  function toggleTheme() {
    document.documentElement.style.setProperty("--quick-transition-duration", "var(--slow-transition-duration)");
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    setTimeout(() => {
      document.documentElement.style.setProperty("--quick-transition-duration", "0.15s");
    }, 400)
  }


  return (
    <><Loading></Loading></>
    // <>
    //   {/* Background and Dialogs */}
    //   <Background />
    //   <PrivacyPolicyDialog />

    //   {/* Header (logo, profile link, theme toggle) */}
    //   <Header theme={theme} toggleTheme={toggleTheme} />

    //   {/* Main Section */}
    //   <div className='container'>
    //     {/* Operation Selector */}
    //     <OpSelector setOption={setOption} />
    //     {/* Where the magic happens */}
    //     <Operator option={option} />
    //     <div>
    //       {/* Links Button */}
    //       {localStorage.getItem('token') ? <div /> : <MyLinks links={[
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new QrCodeMyLinksItem({ value: 'https://shorturl.svparekh.com', settings: null }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),
    //         new ShortUrlMyLinksItem({ shortUrl: 'https://shorturl.svparekh.com/CustomAlias', longUrl: 'https://stackoverflow.com/questions/8692982/in-javascript-is-an-empty-string-always-false-as-a-boolean' }),

    //       ]} />}
    //     </div>
    //   </div>

    //   {/* Footer */}
    //   <footer className='footer' style={{ fontFamily: 'Kaushan Script', transition: 'color var(--quick-transition-duration) var(--primary-curve)' }}>
    //     Copyright © 2025 Setul Parekh. All rights reserved. | <a href='#' onClick={() => window.privacyPolicyDialog.showModal()}>Privacy Policy 🙊</a> | <TestDrawer></TestDrawer>
    //   </footer>
    // </>
  )
}

export default App




















// Two types of data:

// Link:

// {
//   type: 'link',
//   id: 'uuid',
// }

// {
//   type: 'code',
//   id: 'uuid',
// }