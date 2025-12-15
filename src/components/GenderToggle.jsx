import React from "react";

export default function GenderToggle({ value, onChange }) {
    return (
        <div className="segmented" role="tablist" aria-label="Пол">
            <button
                className={`segBtn ${value === "female" ? "active" : ""}`}
                onClick={() => onChange("female")}
                role="tab"
                aria-selected={value === "female"}
            >
                Женские
            </button>
            <button
                className={`segBtn ${value === "male" ? "active" : ""}`}
                onClick={() => onChange("male")}
                role="tab"
                aria-selected={value === "male"}
            >
                Мужские
            </button>
        </div>
    );
}
