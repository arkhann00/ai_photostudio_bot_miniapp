import React from "react";
import { toAbsUrl } from "../api.js";

export default function StylesGrid({ category, onOpenStyle }) {
  const styles = category.styles || [];

  const isAndroid = /Android/i.test(navigator.userAgent);

  const formatCount = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "0";
    return num.toLocaleString("ru-RU");
  };

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

            // Поддержка разных имён поля из API:
            // usage_count / uses_count / used_count / uses
            const usageCountRaw =
              s?.usage_count ?? s?.uses_count ?? s?.used_count ?? s?.uses ?? 0;

            const usageCount = Number(usageCountRaw);
            const usageText = formatCount(usageCount);

            return (
              <button
                key={s.id}
                className="thumb"
                onClick={() => onOpenStyle(i)}
                aria-label={`Открыть стиль ${s.title}`}
                title={s.title}
              >
                <img src={toAbsUrl(s.image_url)} alt={s.title} loading={isAndroid ? "eager" : "lazy"} />
                <div className="thumbOverlay" />

                {isNew && <div className="badgeNew badgeNew--thumb">NEW</div>}

                <div
                  className={
                    usageCount > 0
                      ? "badgeUsage badgeUsage--thumb"
                      : "badgeUsage badgeUsage--thumb badgeUsage--zero"
                  }
                  aria-label={`Использований: ${usageText}`}
                  title={`Использований: ${usageText}`}
                >
                  <span className="badgeUsage__icon" aria-hidden="true">
                    ↻
                  </span>
                  <span className="badgeUsage__text">{usageText}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
