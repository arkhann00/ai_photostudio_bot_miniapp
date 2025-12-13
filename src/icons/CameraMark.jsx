import React from "react";

export function CameraMark() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3B82F6" />
                    <stop offset="0.5" stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
            </defs>
            <path
                d="M8.4 7.4l1.1-1.8c.3-.5.8-.8 1.4-.8h4.2c.6 0 1.1.3 1.4.8l1.1 1.8h1.6c1.5 0 2.8 1.3 2.8 2.8v8.1c0 1.5-1.3 2.8-2.8 2.8H5.8C4.3 23.9 3 22.6 3 21.1V13c0-1.5 1.3-2.8 2.8-2.8h2.6z"
                stroke="url(#g)"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M13 19.1c2.1 0 3.8-1.7 3.8-3.8S15.1 11.5 13 11.5 9.2 13.2 9.2 15.3 10.9 19.1 13 19.1z"
                stroke="url(#g)"
                strokeWidth="1.6"
            />
            <path d="M18.9 11.1h1.5" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
