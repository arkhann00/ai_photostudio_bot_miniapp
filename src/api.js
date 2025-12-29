// export const API_BASE = "http://localhost:8000";
export const API_BASE = "https://api.aiphotostudio.ru";

export function toAbsUrl(maybePath) {
  if (!maybePath) return "";

  // already absolute / special
  if (
    maybePath.startsWith("http://") ||
    maybePath.startsWith("https://") ||
    maybePath.startsWith("data:") ||
    maybePath.startsWith("blob:")
  ) {
    return maybePath;
  }

  // absolute path:
  // - /static/... belongs to API
  // - everything else (like /assets/... from Vite) should stay local
  if (maybePath.startsWith("/")) {
    if (maybePath.startsWith("/static/")) return `${API_BASE}${maybePath}`;
    return maybePath;
  }

  // relative path => treat as API relative
  return `${API_BASE}/${maybePath}`;
}

export async function fetchCatalog(gender) {
    const url = `${API_BASE}/api/catalog?gender=${encodeURIComponent(gender)}`;
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Catalog HTTP ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
}

/**
 * Открываем бота для генерации выбранного стиля.
 * ВАЖНО: payload должен совпадать с парсером бота.
 * У тебя парсер поддерживает gen_12 и webstyle_12.
 */
export function openBotForGeneration(styleId) {
    const botUsername = import.meta.env.VITE_BOT_USERNAME || "ai_photostudio_bot";

    const startPayload = `gen_${Number(styleId)}`;
    const url = `https://t.me/${botUsername}?start=${encodeURIComponent(startPayload)}`;

    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

    // Важно: вызов должен быть напрямую из клика (сразу), иначе Telegram может блокировать переход.
    if (tg) {
        try {
            // Это самый правильный способ открыть ссылку внутри Telegram
            if (typeof tg.openTelegramLink === "function") {
                tg.openTelegramLink(url);

                // Часто нужно закрыть мини-аппу вручную
                // (иногда close лучше делать с микрозадержкой)
                setTimeout(() => {
                    try { tg.close(); } catch (_) {}
                }, 150);

                return;
            }

            // Fallback: откроет как внешнюю ссылку (может уйти во внешний браузер)
            if (typeof tg.openLink === "function") {
                tg.openLink(url);
                setTimeout(() => {
                    try { tg.close(); } catch (_) {}
                }, 150);
                return;
            }
        } catch (e) {
            // пойдём в самый простой вариант ниже
            console.warn("Telegram WebApp open link failed:", e);
        }
    }

    // Если открыто не внутри Telegram — обычный переход
    window.location.href = url;
}

export async function fetchTopUsedStyles(gender, limit = 10) {
  const url = `${API_BASE}/api/styles/top-used/${encodeURIComponent(gender)}?limit=${Number(limit)}`;
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TopUsed HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function fetchNewStyles(gender) {
  const url = `${API_BASE}/api/styles/new/${encodeURIComponent(gender)}`;
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`NewStyles HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}