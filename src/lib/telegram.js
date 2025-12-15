export function getTelegramWebApp() {
    const w = window;
    return w && w.Telegram && w.Telegram.WebApp ? w.Telegram.WebApp : null;
}

export function isTelegramWebApp() {
    return !!getTelegramWebApp();
}

function applySafeAreaCssVars(tg) {
    const root = document.documentElement;

    // Telegram WebApp (если доступно)
    const top = Number(tg?.safeAreaInset?.top || 0);
    const bottom = Number(tg?.safeAreaInset?.bottom || 0);

    root.style.setProperty("--tg-safe-area-inset-top", `${top}px`);
    root.style.setProperty("--tg-safe-area-inset-bottom", `${bottom}px`);

    // Иногда полезно отдельно contentSafeAreaInset (в разных версиях WebView)
    const cTop = Number(tg?.contentSafeAreaInset?.top || 0);
    const cBottom = Number(tg?.contentSafeAreaInset?.bottom || 0);

    root.style.setProperty("--tg-content-safe-area-inset-top", `${cTop}px`);
    root.style.setProperty("--tg-content-safe-area-inset-bottom", `${cBottom}px`);
}

export function initTelegramUI() {
    const tg = getTelegramWebApp();
    if (!tg) return;

    tg.ready();
    tg.expand();

    applySafeAreaCssVars(tg);

    // При изменении viewport (скрылась/появилась шапка, клавиатура и т.п.)
    try {
        if (typeof tg.onEvent === "function") {
            tg.onEvent("viewportChanged", () => applySafeAreaCssVars(tg));
        }
    } catch {
        // ignore
    }

    try {
        if (typeof tg.setHeaderColor === "function") tg.setHeaderColor("#0b0b0b");
        if (typeof tg.setBackgroundColor === "function") tg.setBackgroundColor("#0b0b0b");
    } catch {
        // ignore
    }
}

export function getInitData() {
    const tg = getTelegramWebApp();
    return tg && tg.initData ? tg.initData : "";
}

export function getTelegramUser() {
    const tg = getTelegramWebApp();
    return tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user : null;
}
