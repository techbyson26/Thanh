"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import RosePortal from "@/components/RosePortal";
import PetalCanvas from "@/components/PetalCanvas";
import HeaderNav from "@/components/HeaderNav";
import EnvelopeLetter from "@/components/EnvelopeLetter";
import WishCards from "@/components/WishCards";
import PersonalizeModal from "@/components/PersonalizeModal";
import { Sparkles, Heart, Flower2 } from "lucide-react";
import { triggerBlossomExplosion, triggerContinuousFlowerRain } from "@/utils/flowerConfetti";
import { romanticAudio } from "@/utils/audioPlayer";

function MainContent() {
  const searchParams = useSearchParams();
  const [isBloomed, setIsBloomed] = useState(false);
  const [recipientName, setRecipientName] = useState("Thanh");
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  useEffect(() => {
    const toParam = searchParams.get("to") || searchParams.get("name");
    if (toParam) {
      setRecipientName(toParam);
    }

    // Tự động phát nhạc ngay khi mở trang web
    if (romanticAudio) {
      romanticAudio.setupAutoplay();
    }
  }, [searchParams]);

  const handleBloomComplete = () => {
    setIsBloomed(true);
    // Extra flower shower upon entering celebration
    setTimeout(() => {
      triggerContinuousFlowerRain(2500);
    }, 400);
  };

  const handleResetFlower = () => {
    setIsBloomed(false);
  };

  const handleBurstMoreFlowers = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
    triggerContinuousFlowerRain(2000);
  };

  return (
    <div className={styles.mainWrapper}>
      {/* Falling Flower Petals Engine */}
      <PetalCanvas
        intensity={isBloomed ? "high" : "low"}
        active={true}
      />

      {/* Ambient Radial Glowing Orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />

      {/* Initial Stage: The Solitary Glowing Rose */}
      {!isBloomed && (
        <RosePortal onBloomComplete={handleBloomComplete} />
      )}

      {/* Celebration Stage: Revealed after Flower Click */}
      {isBloomed && (
        <>
          {/* Top Floating Action Bar */}
          <HeaderNav
            onReset={handleResetFlower}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
          />

          <main className={styles.contentArea}>
            {/* Hero Greeting Banner */}
            <section className={styles.heroSection}>
              <div className={styles.heroBadge}>
                <Sparkles size={16} color="#f6c86a" />
                <span>20 Tháng 10 • Ngày Phụ Nữ Việt Nam</span>
                <Sparkles size={16} color="#f6c86a" />
              </div>

              <h1 className={styles.heroTitle}>
                <span className="text-rose-gradient">Chúc Mừng Ngày 20/10</span>
                <span className={styles.recipientHighlight}>
                  {recipientName ? `Thương Gửi Em ${recipientName} ✨` : "Gửi Tặng Em Gái Nhỏ 🌸"}
                </span>
              </h1>

              <p className={styles.heroSubtitle}>
                Gửi cô em gái nhỏ của anh! Chúc Thanh có một ngày 20/10 thật vui vẻ, lúc nào cũng cười tươi như hoa và luôn hạnh phúc, bình yên với những gì em đang theo đuổi.
              </p>
            </section>

            {/* Interactive Sealed Letter / Envelope */}
            <EnvelopeLetter recipientName={recipientName} />

            {/* Interactive Flower Burst Banner */}
            <div className={styles.flowerActionBanner}>
              <button
                className={styles.burstFlowersCta}
                onClick={handleBurstMoreFlowers}
                title="Bấm để bung tỏa thêm muôn ngàn cánh hoa"
              >
                <Flower2 size={18} className={styles.ctaIcon} color="#fff" />
                <span className={styles.ctaText}>Bung Tỏa Thêm Ngàn Cánh Hoa 💐</span>
                <Sparkles size={16} className={styles.ctaIcon} color="#f6c86a" />
              </button>
            </div>

            {/* Glassmorphic 4 Wish Cards */}
            <WishCards />

            {/* Romantic Footer */}
            <footer className={styles.footer}>
              <p>
                Em gái sinh ra là để được yêu thương, chiều chuộng và sống thật rực rỡ.
              </p>
              <p style={{ marginTop: "6px" }}>
                Cả nhà luôn ở bên và tự hào về em gái nhỏ <Heart size={14} className={styles.footerHeart} fill="#ff4371" /> 20/10/2026
              </p>
              <button
                className={styles.replayBtn}
                onClick={handleResetFlower}
              >
                ← Quay lại ngắm đóa hoa ban đầu
              </button>
            </footer>
          </main>

          {/* Personalization Modal */}
          {isPersonalizeOpen && (
            <PersonalizeModal
              currentName={recipientName}
              onUpdateName={(name) => setRecipientName(name)}
              onClose={() => setIsPersonalizeOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#140511" }} />}>
      <MainContent />
    </Suspense>
  );
}
