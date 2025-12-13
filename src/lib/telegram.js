export function buildTelegramDeepLink({ botUsername, startPayload }) {
    const safeBot = String(botUsername || "").replace(/^@/, "").trim();
    const safePayload = encodeURIComponent(String(startPayload || "start"));
    // Универсальный вариант: https, работает и внутри Telegram, и снаружи
    return `https://t.me/${safeBot}?start=${safePayload}`;
}

export function openTelegramLinkSmart(url) {
    // Если это Mini App внутри Telegram, используем WebApp API
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

    try {
        if (tg && typeof tg.openTelegramLink === "function") {
            tg.openTelegramLink(url);
            return;
        }
        if (tg && typeof tg.openLink === "function") {
            tg.openLink(url);
            return;
        }
    } catch (e) {
        // fallthrough
    }

    window.open(url, "_blank", "noopener,noreferrer");
}
