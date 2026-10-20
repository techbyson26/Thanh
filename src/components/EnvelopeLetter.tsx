"use client";

import React, { useState } from "react";
import styles from "./EnvelopeLetter.module.css";
import { Heart, Mail, Sparkles, ChevronUp } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";

interface EnvelopeLetterProps {
  recipientName?: string;
}

export default function EnvelopeLetter({ recipientName }: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(0);

  const displayName = recipientName?.trim() || "Người Phụ Nữ Tuyệt Vời";

  const handleToggleEnvelope = () => {
    if (!isOpen) {
      triggerBlossomExplosion(0.5, 0.4);
    }
    setIsOpen(!isOpen);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
  };

  return (
    <section className={styles.letterSection}>
      <div className={styles.envelopeWrapper}>
        {!isOpen ? (
          /* Realistic 3D Sealed Envelope View */
          <div
            className={styles.envelope}
            onClick={handleToggleEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleToggleEnvelope();
            }}
            aria-label="Nhấn để mở phong bì thư chúc mừng 20/10"
          >
            {/* 3D Envelope Flap & Folds */}
            <div className={styles.envelopeFlap} />
            <div className={styles.foldLineLeft} />
            <div className={styles.foldLineRight} />

            {/* Ornate Wax Seal */}
            <div className={styles.waxSeal}>
              <div className={styles.sealInnerRing}>
                <span className={styles.sealDate}>20/10</span>
                <span className={styles.sealText}>Yêu Thương</span>
              </div>
            </div>

            <div className={styles.envelopeHint}>
              <Mail size={18} color="#f6c86a" />
              <span>Một bức thư riêng dành gửi đến <strong>{displayName}</strong></span>
              <Sparkles size={16} color="#ff7597" />
            </div>

            <div className={styles.envelopeSub}>
              (Nhấn vào phong thư để mở ra điều bất ngờ ✨)
            </div>
          </div>
        ) : (
          /* Opened Parchment Letter View */
          <div className={styles.letterPaper}>
            <div className={styles.paperHeader}>
              <h2 className={styles.paperGreeting}>
                Thân gửi {displayName},
              </h2>
              <span className={styles.paperBadge}>20/10/2026</span>
            </div>

            <div className={styles.letterBody}>
              <p>
                Có một câu nói rất đẹp: <em>&ldquo;Thượng đế tạo ra phụ nữ không phải để họ gánh vác cả thế giới, mà để thế giới này được sưởi ấm bởi sự dịu dàng và lòng bao dung của họ.&rdquo;</em>
              </p>

              <p>
                Cảm ơn bạn vì đã luôn kiên cường đi qua những ngày giông bão, luôn giữ trọn tấm lòng lương thiện và nụ cười ấm áp dù cuộc sống có đôi lần không như ý. Sự hiện diện của bạn chính là món quà vô giá, là niềm an ủi và là ánh sáng tuyệt vời thắp lên hy vọng cho những người xung quanh.
              </p>

              <div className={styles.letterPoem}>
                &ldquo;Mong bạn một đời không bão tố giăng đầy,<br />
                Được che chở khi mỏi mệt, được ôm lấy khi yếu lòng.<br />
                Mong ánh mắt bạn luôn trong veo qua năm tháng,<br />
                Và trái tim mãi vẹn nguyên những ngọt ngào dịu êm.&rdquo;
              </div>

              <p>
                Nhân ngày Phụ nữ Việt Nam 20/10, mong bạn hãy yêu thương bản thân mình nhiều hơn một chút: bớt đi những nghĩ suy lo toan, dành cho mình những giây phút thảnh thơi, chọn chiếc váy mình thích, thưởng thức món ăn mình yêu và kiêu hãnh sống trọn vẹn từng khoảnh khắc thanh xuân rực rỡ nhất.
              </p>

              <p style={{ marginTop: "14px", fontWeight: 600, color: "#930d37" }}>
                Chúc mừng ngày 20/10! Chúc bạn mãi là đóa hoa thơm ngát, độc bản và rạng rỡ nhất theo cách của riêng mình! ✨
              </p>
            </div>

            <div className={styles.letterSignature}>
              <div className={styles.signRole}>Gửi trọn ngàn lời chúc từ trái tim,</div>
              <div className={styles.signName}>Thương gửi & Trân quý 💖</div>
            </div>

            <div className={styles.letterActions}>
              <button className={styles.heartBtn} onClick={handleHeartClick}>
                <Heart size={16} fill="#fff" />
                <span>Thả tim yêu thương {likes > 0 && `(${likes})`}</span>
              </button>

              <button
                className={styles.closeLetterBtn}
                onClick={handleToggleEnvelope}
                title="Gấp lại phong thư"
              >
                <ChevronUp size={16} />
                <span>Gấp thư lại</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
