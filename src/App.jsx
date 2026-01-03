import React, { useEffect, useMemo, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import GenderToggle from "./components/GenderToggle.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import StylesGrid from "./components/StylesGrid.jsx";
import StyleModal from "./components/StyleModal.jsx";
import { fetchCatalog, fetchTopUsedStyles, fetchNewStyles } from "./api.js";

import newIcon from "./assets/new_icon_category.png";
import popularIcon from "./assets/popular_icon_category.png";
import malePopularIcon from "./assets/male_popular_icon_category.png";
import femPopularIcon from "./assets/fem_popular_icon_category.png";
import maleNewIcon from "./assets/male_new_icon_category.png";
import femNewIcon from "./assets/fem_new_icon_category.png";

export default function App() {
  const [gender, setGender] = useState("female"); // male | female
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
        const [catalogData, topUsed, newStyles] = await Promise.all([
          fetchCatalog(gender),
          fetchTopUsedStyles(gender, 10),
          fetchNewStyles(gender),
        ]);

        if (cancelled) return;

        const baseCategories = Array.isArray(catalogData?.categories)
          ? catalogData.categories
          : [];

        const mkVirtualCategory = ({
          id,
          title,
          description,
          icon,
          styles,
        }) => ({
          id,
          title,
          description,
          image_url: icon,
          image_filename: null,
          is_active: true,
          gender,
          styles: Array.isArray(styles) ? styles : [],
        });

        const injected = [];

        // ✅ иконки зависят от пола
        const newCategoryIcon = gender === "male" ? maleNewIcon : femNewIcon;
        const popularCategoryIcon =
          gender === "male" ? malePopularIcon : femPopularIcon;

        // NEW — показываем только если есть хотя бы 1 стиль
        if (Array.isArray(newStyles) && newStyles.length > 0) {
          injected.push(
            mkVirtualCategory({
              id: -1001,
              title: "NEW",
              description: "Новые стили",
              icon: newCategoryIcon, // ✅ было newIcon
              styles: newStyles,
            })
          );
        }

        // ПОПУЛЯРНОЕ — всегда есть
        injected.push(
          mkVirtualCategory({
            id: -1002,
            title: "ПОПУЛЯРНОЕ",
            description: "Самые используемые стили",
            icon: popularCategoryIcon, // ✅ было popularIcon
            styles: topUsed,
          })
        );

        setCatalog({
          ...catalogData,
          categories: [...injected, ...baseCategories],
        });

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
            </div>
          </div>
        )}

        {loading && (
          <div className="panel">
            <div className="loadingRow">
              <div className="spinner" />
              <div>
                <div className="panelTitle">Загружаю каталог…</div>
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
        onPrev={() =>
          setModalStyleIndex((i) => (i <= 0 ? styles.length - 1 : i - 1))
        }
        onNext={() =>
          setModalStyleIndex((i) => (i >= styles.length - 1 ? 0 : i + 1))
        }
      />
    </div>
  );
}
