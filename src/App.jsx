import React, { useEffect, useMemo, useState } from "react";
import { fetchCatalog } from "./api.js";
import TopBar from "./components/TopBar.jsx";
import GenderToggle from "./components/GenderToggle.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import StylesGrid from "./components/StylesGrid.jsx";
import StyleModal from "./components/StyleModal.jsx";

const BOT_USERNAME = "ai_photostudio_bot"; // поменяешь при необходимости

export default function App() {
    const [gender, setGender] = useState("male"); // male | female
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [catalog, setCatalog] = useState({ categories: [] });

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [modalStyleIndex, setModalStyleIndex] = useState(-1);

    const selectedCategory = useMemo(() => {
        return catalog.categories.find((c) => c.id === selectedCategoryId) || null;
    }, [catalog, selectedCategoryId]);

    const styles = selectedCategory?.styles || [];

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError("");
            try {
                const data = await fetchCatalog(gender);
                if (cancelled) return;
                setCatalog(data);
                setSelectedCategoryId(null);
                setModalStyleIndex(-1);
            } catch (e) {
                if (cancelled) return;
                setError(e?.message || "Ошибка загрузки");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [gender]);

    const title = selectedCategory ? selectedCategory.title : "Ai Photo-Studio";

    return (
        <div className="app">
            <div className="bgGlow" />

            <TopBar
                title={title}
                onBack={selectedCategory ? () => setSelectedCategoryId(null) : null}
            />

            <div className="container">
                {!selectedCategory && (
                    <div className="toolbar">
                        <GenderToggle value={gender} onChange={setGender} />

                        <div className="hint">
                            <div className="hintTitle">Выбери категорию</div>
                            {/*<div className="hintText">Минимализм + футуризм, как в твоём бренде.</div>*/}
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="panel">
                        <div className="loadingRow">
                            <div className="spinner" />
                            <div>
                                <div className="panelTitle">Загружаю каталог…</div>
                                {/*<div className="panelText">Категории и стили подтягиваются с сервера.</div>*/}
                            </div>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="panel error">
                        <div className="panelTitle">Не получилось загрузить</div>
                        <div className="panelText">{error}</div>
                        <button className="btn" onClick={() => window.location.reload()}>
                            Перезагрузить
                        </button>
                    </div>
                )}

                {!loading && !error && !selectedCategory && (
                    <CategoryGrid
                        categories={catalog.categories}
                        onSelect={(id) => setSelectedCategoryId(id)}
                    />
                )}

                {!loading && !error && selectedCategory && (
                    <StylesGrid
                        category={selectedCategory}
                        onOpenStyle={(index) => setModalStyleIndex(index)}
                    />
                )}
            </div>

            <StyleModal
                open={modalStyleIndex >= 0}
                styles={styles}
                index={modalStyleIndex}
                onClose={() => setModalStyleIndex(-1)}
                onPrev={() => setModalStyleIndex((i) => (i <= 0 ? styles.length - 1 : i - 1))}
                onNext={() => setModalStyleIndex((i) => (i >= styles.length - 1 ? 0 : i + 1))}
                telegramLinkBuilder={(style) => {
                    // deep-link на бота: /start=web_style_<id>_<gender>
                    const payload = `web_style_${style.id}_${style.category_id}_${style.gender}`;
                    return `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(payload)}`;
                }}
            />
        </div>
    );
}
