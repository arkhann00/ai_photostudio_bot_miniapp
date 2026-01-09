import React, { useMemo } from "react";
import { toAbsUrl } from "../api.js";

export default function StylesGrid({ category, onOpenStyle }) {
  const rawStyles = category.styles || [];

  const isAndroid = /Android/i.test(navigator.userAgent);

  const formatCount = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "0";
    return num.toLocaleString("ru-RU");
  };

  // Унифицируем поля "популярности"
  const getUsage = (s) => {
    const usageCountRaw =
      s?.usage_count ?? s?.uses_count ?? s?.used_count ?? s?.uses ?? 0;
    const n = Number(usageCountRaw);
    return Number.isFinite(n) ? n : 0;
  };

  // Если у тебя есть дата (created_at / published_at / etc.) — учтём.
  const getTime = (s) => {
    const v =
      s?.created_at ??
      s?.createdAt ??
      s?.published_at ??
      s?.publishedAt ??
      s?.added_at ??
      s?.addedAt ??
      null;

    if (!v) return 0;
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : 0;
  };

  const isNewStyle = (s) => Boolean(s?.is_new ?? s?.new);

  // ✅ Сортировка: new -> (по дате убыв) -> (по usage убыв) -> (по title)
  const styles = useMemo(() => {
    const arr = [...rawStyles];

    arr.sort((a, b) => {
      const aNew = isNewStyle(a) ? 1 : 0;
      const bNew = isNewStyle(b) ? 1 : 0;

      // 1) NEW сверху
      if (aNew !== bNew) return bNew - aNew;

      // 2) если есть даты — более новые выше
      const at = getTime(a);
      const bt = getTime(b);
      if (at !== bt) return bt - at;

      // 3) популярность
      const au = getUsage(a);
      const bu = getUsage(b);
      if (au !== bu) return bu - au;

      // 4) стабилизация (чтобы не “прыгало”)
      const aid = Number(a?.id ?? 0);
      const bid = Number(b?.id ?? 0);
      if (Number.isFinite(aid) && Number.isFinite(bid) && aid !== bid)
        return bid - aid;

      return String(a?.title ?? "").localeCompare(String(b?.title ?? ""), "ru");
    });

    return arr;
  }, [rawStyles]);

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
                key={s.id}
                className="thumb"
                onClick={() => onOpenStyle(i)} // ✅ теперь индекс соответствует отсортированному массиву
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
