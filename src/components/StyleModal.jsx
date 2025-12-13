import React, { useEffect, useMemo } from "react";
import "../StyleModal.css";
import { toAbsUrl, openBotForGeneration } from "../api.js";

export default function StyleModal({ open, styles, index, onClose, onPrev, onNext }) {
    const style = useMemo(() => {
        if (!styles || styles.length === 0) return null;
        if (index < 0 || index >= styles.length) return styles[0];
        return styles[index];
    }, [styles, index]);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
            if (e.key === "ArrowLeft") onPrev?.();
            if (e.key === "ArrowRight") onNext?.();
        };

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose, onPrev, onNext]);

    if (!open || !style) return null;

    const handleGenerate = () => openBotForGeneration(style.id);

    return (
        <div className="sm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="sm-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="sm-header">
                    <div className="sm-chip">
                        <span className="sm-dot" />
                        <span>Просмотр стиля</span>
                    </div>

                    <button className="sm-iconBtn" onClick={onClose} aria-label="Закрыть">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="sm-body">
                    <div className="sm-imageWrap">
                        <img className="sm-img" src={toAbsUrl(style.image_url)} alt={style.title} draggable="false" />

                        <button className="sm-nav sm-left" onClick={onPrev} aria-label="Назад">
                            <span>‹</span>
                        </button>
                        <button className="sm-nav sm-right" onClick={onNext} aria-label="Вперёд">
                            <span>›</span>
                        </button>

                        <div className="sm-gradient" />
                    </div>

                    <div className="sm-footer">
                        <div className="sm-meta">
                            <div className="sm-title">{style.title}</div>
                            <div className="sm-desc">{style.description}</div>
                            <div className="sm-hint">
                                После перехода в бота выбери аватар (или загрузи новый) — и генерация начнётся.
                            </div>
                        </div>

                        <div className="sm-actions">
                            <button className="sm-primary" onClick={handleGenerate}>
                                Сделать генерацию
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sm-borderGlow" />
            </div>
        </div>
    );
}
