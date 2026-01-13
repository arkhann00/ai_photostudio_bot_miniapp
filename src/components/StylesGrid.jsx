import React from "react";
import { toAbsUrl } from "../api.js";

export default function StylesGrid({ category, styles = [], onOpenStyle }) {
  const isAndroid = /Android/i.test(navigator.userAgent);

  const formatCount = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "0";
    return num.toLocaleString("ru-RU");
  };

  const getUsage = (s) => {
    const usageCountRaw =
      s?.usage_count ?? s?.uses_count ?? s?.used_count ?? s?.uses ?? 0;
    const n = Number(usageCountRaw);
    return Number.isFinite(n) ? n : 0;
  };

  const isNewStyle = (s) => Boolean(s?.is_new ?? s?.new);

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
            const isNew = isNewStyle(s);
            const usageCount = getUsage(s);
            const usageText = formatCount(usageCount);

            return (
              <button
                key={`${s.id ?? "noid"}-${i}`}
                className="thumb"
                onClick={() => onOpenStyle(i)}
                aria-label={`Открыть стиль ${s.title}`}
                title={s.title}
              >
                <img
                  src={toAbsUrl(s.image_url)}
                  alt={s.title}
                  loading={isAndroid ? "eager" : "lazy"}
                />
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
