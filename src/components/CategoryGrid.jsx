import React from "react";
import { toAbsUrl } from "../api.js";

export default function CategoryGrid({ categories, onSelect }) {
  return (
    <div className="grid">
      {categories.map((c) => {
        const styles = Array.isArray(c.styles) ? c.styles : [];
        const hasNew = styles.some((s) => Boolean(s?.is_new ?? s?.new));

        return (
          <button key={c.id} className="card" onClick={() => onSelect(c.id)}>
            <div className="cardMedia">
              <img src={toAbsUrl(c.image_url)} alt={c.title} loading="lazy" />
              <div className="cardOverlay" />
              <div className="cardMeta" />

              {hasNew && <div className="badgeNew badgeNew--card">NEW</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
