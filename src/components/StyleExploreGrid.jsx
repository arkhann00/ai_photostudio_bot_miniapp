import React from "react";

export function StyleExploreGrid({ styles, onPick }) {
    return (
        <div className="exploreGrid" role="list">
            {styles.map((s) => (
                <button
                    key={s.id}
                    type="button"
                    className="tile"
                    onClick={() => onPick(s)}
                    role="listitem"
                    title={s.title}
                >
                    <div className="tileMedia" style={{ backgroundImage: `url("${s.previewUrl}")` }}>
                        <div className="tileOverlay" />
                        <div className="tileBadgeRow">
                            {s.tags.slice(0, 2).map((t) => (
                                <span className="badge" key={t}>
                  {t}
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="tileText">
                        <div className="tileTitle">{s.title}</div>
                        <div className="tileSub">{s.subtitle}</div>
                    </div>
                </button>
            ))}
        </div>
    );
}
