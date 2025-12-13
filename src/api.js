// export const API_BASE = "http://localhost:8000";
export const API_BASE = "https://api.aiphotostudio.ru";

export function toAbsUrl(maybePath) {
    if (!maybePath) return "";
    if (maybePath.startsWith("http://") || maybePath.startsWith("https://")) return maybePath;
    if (maybePath.startsWith("/")) return `${API_BASE}${maybePath}`;
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
