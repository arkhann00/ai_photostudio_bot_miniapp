import React from "react";
import { toAbsUrl } from "../api.js";

export default function CategoryGrid({ categories, onSelect }) {
    return (
        <div className="grid">
            {categories.map((c) => (
                <button key={c.id} className="card" onClick={() => onSelect(c.id)}>
                    <div className="cardMedia">
                        <img src={toAbsUrl(c.image_url)} alt={c.title} loading="lazy" />
                        <div className="cardOverlay" />
                        <div className="cardMeta">
                            <div className="cardTitle">{c.title}</div>
                            <div className="cardSub">{c.description}</div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
