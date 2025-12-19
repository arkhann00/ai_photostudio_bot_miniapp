import React from "react";
import { toAbsUrl } from "../api.js";

export default function StylesGrid({ category, onOpenStyle }) {
  const styles = category.styles || [];

  return (
    <div>
      <div className="sectionHeader">
        <div>
          <div className="sectionTitle">{category.title}</div>
          <div className="sectionDesc">{category.description}</div>
        </div>
        <div className="sectionCount">{styles.length} стилей</div>
      </div>

      {styles.length === 0 ? (
        <div className="panel">
          <div className="panelTitle">В этой категории пока нет стилей</div>
        </div>
      ) : (
        <div className="grid grid3">
          {styles.map((s, i) => {
            const isNew = Boolean(s?.is_new ?? s?.new);

            return (
              <button
                key={s.id}
                className="thumb"
                onClick={() => onOpenStyle(i)}
                aria-label={`Открыть стиль ${s.title}`}
                title={s.title}
              >
                <img src={toAbsUrl(s.image_url)} alt={s.title} loading="lazy" />
                <div className="thumbOverlay" />

                {isNew && <div className="badgeNew badgeNew--thumb">NEW</div>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
