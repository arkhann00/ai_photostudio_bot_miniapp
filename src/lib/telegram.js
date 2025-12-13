export function getTelegramWebApp() {
    const w = window;
    return w && w.Telegram && w.Telegram.WebApp ? w.Telegram.WebApp : null;
}

export function isTelegramWebApp() {
    return !!getTelegramWebApp();
}

export function initTelegramUI() {
    const tg = getTelegramWebApp();
    if (!tg) return;

    tg.ready();
    tg.expand();

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
