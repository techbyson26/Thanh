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

  const displayName = recipientName?.trim() || "Thanh";
  const isPrefixPresent = /^(em|bé|cô)/i.test(displayName);
  const letterTag = isPrefixPresent ? displayName : `em ${displayName}`;

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
                <span className={styles.sealText}>Thanh Yêu</span>
              </div>
            </div>

            <div className={styles.envelopeHint}>
              <Mail size={18} color="#f6c86a" />
              <span>Bức thư riêng gửi tặng <strong>{letterTag}</strong> 💌</span>
              <Sparkles size={16} color="#ff7597" />
            </div>

            <div className={styles.envelopeSub}>
              (Nhấn vào phong thư để đọc những lời tâm sự chân thành nhất ✨)
            </div>
          </div>
        ) : (
          /* Opened Parchment Letter View */
          <div className={styles.letterPaper}>
            <div className={styles.paperHeader}>
              <h2 className={styles.paperGreeting}>
                Gửi {displayName} – cô em gái nhỏ của anh!
              </h2>
              <span className={styles.paperBadge}>20/10/2026</span>
            </div>

            <div className={styles.letterBody}>
              <p>
                Nhân ngày 20/10, anh viết mấy dòng này gửi tặng cô em gái nhỏ – người lúc nào cũng mang lại tiếng cười, sự ấm áp và nguồn năng lượng tích cực cho cả nhà.
              </p>

              <p>
                Thời gian trôi nhanh thật, mới ngày nào em còn bé xíu hay líu lo chạy theo anh, vậy mà giờ đã là một cô gái duyên dáng, hiểu chuyện và ngày càng tự lập. Nhìn em khôn lớn từng ngày, anh thấy vui và tự hào về em nhiều lắm.
              </p>

              <div className={styles.letterPoem}>
                &ldquo;Mong em một đời bình an, nhiều may mắn,<br />
                Nụ cười luôn trong trẻo tựa ánh ban mai.<br />
                Dù đường đời dẫu có lắm chông gai,<br />
                Hãy luôn nhớ: Phía sau em luôn có gia đình!&rdquo;
              </div>

              <p>
                20/10 năm nay, chúc Thanh luôn giữ trọn nụ cười rạng rỡ trên môi, mỗi ngày mới đều có thật nhiều niềm vui. Chúc em học tập và công việc thật suôn sẻ, tự tin đạt được những mục tiêu mà em hằng ấp ủ. Nhớ là đừng bao giờ tạo quá nhiều áp lực cho bản thân nhé; hãy luôn ăn ngon miệng, ngủ đủ giấc, thích chiếc váy nào thì cứ tự tin diện, và yêu thương bản thân mình thật nhiều!
              </p>

              <p>
                Dù sau này em có khôn lớn, đi xa đến đâu, thì trong mắt anh và gia đình, em vẫn mãi là cô em gái nhỏ được cưng chiều, nâng niu và luôn có một chốn bình yên để trở về bất cứ lúc nào thấy mỏi mệt.
              </p>

              <p style={{ marginTop: "14px", fontWeight: 600, color: "#930d37" }}>
                Chúc mừng ngày 20/10 em gái nhé! Chúc em luôn tự tin, xinh đẹp và ngập tràn hạnh phúc! 🌸✨
              </p>
            </div>

            <div className={styles.letterSignature}>
              <div className={styles.signRole}>Người luôn đồng hành và ủng hộ em,</div>
              <div className={styles.signName}>Anh trai 💕</div>
            </div>

            <div className={styles.letterActions}>
              <button className={styles.heartBtn} onClick={handleHeartClick}>
                <Heart size={16} fill="#fff" />
                <span>Thả tim cho em gái {likes > 0 && `(${likes})`}</span>
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
