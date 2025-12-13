import React from "react";

export function CategoryRail({ categories, activeId, onPick }) {
    return (
        <div className="catRail">
            {categories.map((c) => {
                const active = c.id === activeId;
                return (
                    <button
                        key={c.id}
                        type="button"
                        className={active ? "catChip catChipActive" : "catChip"}
                        onClick={() => onPick(c.id)}
                    >
                        <span className="catChipGlow" aria-hidden="true" />
                        <span className="catChipTitle">{c.title}</span>
                        <span className="catChipDesc">{c.subtitle}</span>
                    </button>
                );
            })}
        </div>
    );
}
