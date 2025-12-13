function svgDataUri(svg) {
    const encoded = encodeURIComponent(svg)
        .replaceAll("%0A", "")
        .replaceAll("%20", " ");
    return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

function makePreview(seedText, a, b, c) {
    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="0.5" stop-color="${b}"/>
        <stop offset="1" stop-color="${c}"/>
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="28"/>
      </filter>
    </defs>
    <rect width="900" height="1200" fill="#05070f"/>
    <circle cx="220" cy="260" r="240" fill="url(#bg)" opacity="0.85" filter="url(#blur)"/>
    <circle cx="720" cy="980" r="280" fill="url(#bg)" opacity="0.55" filter="url(#blur)"/>
    <rect x="70" y="90" width="760" height="1020" rx="48" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
    <g transform="translate(130,160)" opacity="0.9">
      <path d="M110 90l26-44c8-14 22-22 38-22h168c16 0 30 8 38 22l26 44h72c32 0 58 26 58 58v390c0 32-26 58-58 58H96c-32 0-58-26-58-58V148c0-32 26-58 58-58h14z"
        fill="none" stroke="url(#bg)" stroke-width="10" stroke-linejoin="round"/>
      <circle cx="280" cy="340" r="110" fill="none" stroke="url(#bg)" stroke-width="10"/>
      <path d="M468 170h56" stroke="url(#bg)" stroke-width="10" stroke-linecap="round"/>
    </g>
    <text x="110" y="980" fill="rgba(255,255,255,0.92)" font-family="ui-sans-serif, -apple-system, Segoe UI, Roboto" font-size="54" font-weight="700">
      ${seedText}
    </text>
    <text x="110" y="1040" fill="rgba(255,255,255,0.65)" font-family="ui-sans-serif, -apple-system, Segoe UI, Roboto" font-size="28">
      Ai Photo-Studio · sample preview
    </text>
  </svg>`;
    return svgDataUri(svg);
}

const categories = [
    { id: 1, title: "Vogue", subtitle: "глянец · студийный свет" },
    { id: 2, title: "Dubai", subtitle: "люкс · неон · вечер" },
    { id: 3, title: "Anime", subtitle: "иллюстрация · мягкие линии" },
    { id: 4, title: "Street", subtitle: "город · контраст · стиль" }
];

function style(id, categoryId, title, subtitle, tags, colors) {
    return {
        id,
        categoryId,
        title,
        subtitle,
        tags,
        previewUrl: makePreview(title, colors[0], colors[1], colors[2])
    };
}

const stylesByCategory = {
    1: [
        style(101, 1, "Cover Light", "обложка · мягкая кожа", ["editorial", "clean"], ["#3B82F6", "#7C3AED", "#EC4899"]),
        style(102, 1, "Backstage", "закулисье · зерно", ["film", "grain"], ["#60A5FA", "#A78BFA", "#FB7185"]),
        style(103, 1, "High Fashion", "острые тени · pose", ["fashion", "contrast"], ["#2563EB", "#9333EA", "#DB2777"]),
        style(104, 1, "Studio Mono", "монохром · графика", ["mono", "sharp"], ["#1D4ED8", "#6D28D9", "#BE185D"]),
        style(105, 1, "Gloss Neon", "глянец · неон-подсветка", ["gloss", "neon"], ["#38BDF8", "#8B5CF6", "#F472B6"]),
        style(106, 1, "Soft Vogue", "воздух · пастель", ["soft", "pastel"], ["#93C5FD", "#C4B5FD", "#FDA4AF"])
    ],
    2: [
        style(201, 2, "Desert Luxe", "песок · золото · свет", ["luxe", "warm"], ["#0EA5E9", "#7C3AED", "#F97316"]),
        style(202, 2, "Neon Atrium", "ночь · стекло · блики", ["night", "glass"], ["#22C55E", "#7C3AED", "#EC4899"]),
        style(203, 2, "Penthouse", "дорого · чисто · уверенно", ["premium", "clean"], ["#3B82F6", "#8B5CF6", "#F43F5E"]),
        style(204, 2, "Skyline", "панорама · холодный свет", ["city", "cool"], ["#06B6D4", "#6366F1", "#EC4899"]),
        style(205, 2, "Gold Flash", "вспышка · металлик", ["flash", "metal"], ["#F59E0B", "#8B5CF6", "#3B82F6"]),
        style(206, 2, "Luxury Noir", "чёрный люкс · контур", ["noir", "edge"], ["#111827", "#7C3AED", "#EC4899"])
    ],
    3: [
        style(301, 3, "Shonen Hero", "энергия · динамика", ["anime", "hero"], ["#3B82F6", "#22C55E", "#EC4899"]),
        style(302, 3, "Soft Kawaii", "милый стиль · пастель", ["kawaii", "soft"], ["#93C5FD", "#A78BFA", "#F9A8D4"]),
        style(303, 3, "Cyber Anime", "киберпанк · неон", ["cyber", "neon"], ["#22D3EE", "#7C3AED", "#FB7185"]),
        style(304, 3, "Ghibli Mood", "уют · тёплый свет", ["cozy", "warm"], ["#34D399", "#60A5FA", "#F97316"]),
        style(305, 3, "Manga Mono", "манга · тушь", ["manga", "mono"], ["#111827", "#4B5563", "#9CA3AF"]),
        style(306, 3, "Romance", "романтика · сияние", ["romance", "glow"], ["#60A5FA", "#8B5CF6", "#F472B6"])
    ],
    4: [
        style(401, 4, "Urban Contrast", "жёсткий свет · улица", ["street", "contrast"], ["#0EA5E9", "#111827", "#EC4899"]),
        style(402, 4, "Rainy Night", "дождь · неон · мокрый асфальт", ["rain", "night"], ["#06B6D4", "#7C3AED", "#0F172A"]),
        style(403, 4, "Skate Film", "плёнка · движение", ["film", "motion"], ["#22C55E", "#0EA5E9", "#A855F7"]),
        style(404, 4, "Concrete", "бетон · минимализм", ["minimal", "texture"], ["#374151", "#6366F1", "#EC4899"]),
        style(405, 4, "Neon Alley", "переулок · вывески", ["neon", "city"], ["#38BDF8", "#A78BFA", "#FB7185"]),
        style(406, 4, "Daylight Street", "дневной свет · чисто", ["day", "clean"], ["#60A5FA", "#7C3AED", "#F472B6"])
    ]
};

export const sampleCatalog = {
    telegram: {
        // Поменяешь на своего бота, например: "ai_photostudio_bot"
        botUsername: "AiPhotoStudioBot"
    },
    categories,
    stylesByCategory
};
