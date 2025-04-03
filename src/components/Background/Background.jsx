import './Background.css';

import Cloud from './Cloud.jsx';

import { useState, useEffect } from 'react';


export default function Background() {
    const [stars, setStars] = useState([]);
    const [blinkState, setBlinkState] = useState({});

    useEffect(() => {
        const numStars = 20;
        const starsArray = [];
        for (let i = 0; i < numStars; i++) {
            starsArray.push({
                id: i,
                x: Math.random() * 960,
                y: Math.random() * 300,
                blinkInterval: Math.random() * 2000 + 1000,
                duration: Math.random() * 1 + 0.35,
            });
        }
        setStars(starsArray);
    }, []);

    useEffect(() => {
        const intervalIds = {};
        stars.forEach((star) => {
            intervalIds[star.id] = setInterval(() => {
                setBlinkState((prevBlinkState) => ({
                    ...prevBlinkState,
                    [star.id]: !prevBlinkState[star.id],
                }));
            }, star.blinkInterval);
        });
        return () => {
            Object.values(intervalIds).forEach((intervalId) => clearInterval(intervalId));
        };
    }, [stars]);

    return (
        <svg
            id="background"
            viewBox="0 0 960 540"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMinYMin meet"
            shapeRendering="auto"
            fill="rgba(0,0,0,0)"
        >

            <defs>
                {/* Waves */}
                <path id='wavePath1' d='M 0 2000 0 500 Q 150 400 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z' />
                <path id='waveMotionPath1' d='M -600 0 0 0' />
                <path id='wavePath2' d='M 0 2000 0 500 Q 88 470 176 500 t 176 0 176 0 176 0 176 0 176 0 176 0 176 0  v1000 z' />
                <path id='waveMotionPath2' d='M -352 0 0 0' />
                <path id='wavePath3'
                    d='M 0 2000 0 500 Q 52 480 104 500 t 104 0 104 0 104 0 104 0 104 0 104 0 104 0 104 0 104 0 104 0 104 0  v1000 z' />
                <path id='waveMotionPath3' d='M -208 0 0 0' />

                {/* Clouds */}
                <Cloud id='cloud1' color={'var(--primary-color)'} scale={0.5} />
                <Cloud id='cloud2' color={'var(--primary-color)'} scale={0.75} />
                <Cloud id='cloud2-1' color={'var(--primary-color)'} scale={0.75} />
                <path id='cloudMotionPath1' d='M -960 0 960 0' />
                <path id='cloudMotionPath2' d='M 0 0 960 0' />
                <path id='cloudMotionPath2-1' d='M -960 0 0 0' />
            </defs>

            {/* <rect width='100%' height='100%' fill='rgba(0,0,0,0)' /> */}

            {/* Stars */}
            {stars.map((star) => (
                <circle
                    key={star.id}
                    cx={star.x}
                    cy={star.y}
                    r={1}
                    fill={blinkState[star.id] ? '#ffffff' : '#ffffff11'}
                    style={{ transition: `fill ${star.duration}s ease` }}
                />
            ))}



            {/* Clouds */}
            <use xlinkHref='#cloud1' y='50' fill='rgba(128, 194, 217,0.33)'>
                <animateMotion dur='15s' repeatCount='indefinite'>
                    <mpath xlinkHref='#cloudMotionPath1' />
                </animateMotion>
            </use>

            <use xlinkHref='#cloud2' y='-100' fill='rgba(128, 194, 217,0.33)'>
                <animateMotion dur='5s' repeatCount='indefinite'>
                    <mpath xlinkHref='#cloudMotionPath2' />
                </animateMotion>
            </use>
            <use xlinkHref='#cloud2-1' y='-100' fill='rgba(128, 194, 217,0.33)'>
                <animateMotion dur='5s' repeatCount='indefinite'>
                    <mpath xlinkHref='#cloudMotionPath2-1' />
                </animateMotion>
            </use>

            {/* Waves */}
            <g>
                <use xlinkHref='#wavePath1' y='-130' fill='rgba(128, 194, 217,0.33)'>
                    <animateMotion dur='5s' repeatCount='indefinite'>
                        <mpath xlinkHref='#waveMotionPath1' />
                    </animateMotion>
                </use>
            </g>
            <g>
                <use xlinkHref='#wavePath2' y='-150' fill='rgba(128, 194, 217,0.33)'>
                    <animateMotion dur='5s' repeatCount='indefinite'>
                        <mpath xlinkHref='#waveMotionPath2' />
                    </animateMotion>
                </use>
            </g>
            <g>
                <use xlinkHref='#wavePath3' y='-170' fill='rgba(128, 194, 217,0.33)'>
                    <animateMotion dur='5s' repeatCount='indefinite'>
                        <mpath xlinkHref='#waveMotionPath3' />
                    </animateMotion>
                </use>
            </g>
        </svg>

    );
}
