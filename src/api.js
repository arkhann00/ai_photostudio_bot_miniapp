

// export const API_BASE = "http://localhost:8000"
export const API_BASE = "https://api.aiphotostudio.ru"

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

export function openBotForGeneration(styleId) {
    const botUsername = import.meta.env.VITE_BOT_USERNAME || "ai_photostudio_bot";

    const startPayload = `gen_${Number(styleId)}`;
    const url = `https://t.me/${botUsername}?start=${encodeURIComponent(startPayload)}`;

    // Если открыто внутри Telegram WebApp — используем нативный метод
    if (window.Telegram?.WebApp?.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
        // опционально: закрыть мини-аппу после перехода
        // window.Telegram.WebApp.close();
        return;
    }

    // Иначе обычный переход
    window.location.href = url;
}
