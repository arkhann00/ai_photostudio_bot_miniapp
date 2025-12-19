import React from "react";

export default function TopBar({ title, onBack }) {
  return (
    <div className="topbar">
      <div className="topbarInner">
        <button
          className={`iconBtn ${onBack ? "" : "disabled"}`}
          onClick={onBack || undefined}
          aria-label="Назад"
          title="Назад"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="brand">
          <div className="brandDot" />
          <div className="brandTitle">{"Ai Photo-Studio"}</div>
        </div>

        {/*<div className="topbarRight">*/}
        {/*    <div className="pill">Web</div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
