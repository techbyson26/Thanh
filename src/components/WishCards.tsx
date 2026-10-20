"use client";

import React, { useState } from "react";
import styles from "./WishCards.module.css";
import { Sparkles, Sun, Smile, Compass, HeartHandshake, Heart } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";

interface WishCardItem {
  id: string;
  tag: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  glowColor: string;
}

const WISHES_DATA: WishCardItem[] = [
  {
    id: "radiance",
    tag: "Nhan Sắc & Tâm Hồn",
    title: "Nụ Cười Rạng Rỡ, Nắng Ấm",
    message:
      "Chúc bạn dù qua bao thăng trầm của thời gian, đôi mắt vẫn giữ trọn nét hồn nhiên trong trẻo, nụ cười vẫn sáng bừng tựa nắng sớm mùa thu. Vẻ đẹp của bạn tỏa sáng từ tâm hồn dịu dàng, nhân hậu và sự kiên cường đáng trân quý.",
    icon: <Smile size={24} color="#ff7597" />,
    glowColor: "rgba(255, 67, 113, 0.4)",
  },
  {
    id: "peace",
    tag: "Bình Yên & Thư Thái",
    title: "Một Đời An Yên, Tự Tại",
    message:
      "Mong cuộc đời đối đãi với bạn bằng tất cả sự dịu dàng. Chúc bạn có những sớm mai thảnh thơi thưởng trà ngắm hoa, những chiều hoàng hôn an lành bên người thương, và đêm về luôn có những giấc ngủ say nồng, trút bỏ hết muôn nỗi mệt nhoài.",
    icon: <Sun size={24} color="#f6c86a" />,
    glowColor: "rgba(246, 200, 106, 0.4)",
  },
  {
    id: "confidence",
    tag: "Bản Lĩnh & Tự Do",
    title: "Vững Tin, Kiêu Hãnh Tỏa Sáng",
    message:
      "Hãy kiên định bước trên con đường bạn đã chọn và kiêu hãnh như đóa hồng kiều diễm: vừa mềm mại dịu dàng, vừa kiên cường bất khuất. Chúc bạn luôn đủ dũng khí theo đuổi đam mê, gặt hái thành công vang dội và sống cuộc đời trọn vẹn của chính mình.",
    icon: <Compass size={24} color="#ff9ebb" />,
    glowColor: "rgba(255, 158, 187, 0.4)",
  },
  {
    id: "love",
    tag: "Hạnh Phúc & Yêu Thương",
    title: "Trọn Vẹn Yêu Thương, Nâng Niu",
    message:
      "Phụ nữ dù mạnh mẽ đến đâu cũng xứng đáng có một chốn bình yên để tựa vào. Chúc bạn luôn tìm thấy một bờ vai vững chãi chở che những khi mỏi mệt, có người sẵn lòng lắng nghe mọi nỗi niềm chưa kể và trân trọng bạn như báu vật vô giá nhất.",
    icon: <HeartHandshake size={24} color="#ffd166" />,
    glowColor: "rgba(255, 209, 102, 0.4)",
  },
];

export default function WishCards() {
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});

  const handleSendFlowerToCard = (cardId: string, e: React.MouseEvent) => {
    setFlowerCounts((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1,
    }));

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
  };

  return (
    <section className={styles.wishesSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <Sparkles size={14} color="#ff9ebb" />
          <span>Vườn Hoa Yêu Thương</span>
        </div>
        <h2 className={styles.sectionTitle}>Những Lời Chúc Ngọt Ngào Nhất</h2>
        <p className={styles.sectionDesc}>
          Mỗi thông điệp là một đóa hoa thơm ngát được gửi gắm bằng tất cả sự chân thành và trân quý.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {WISHES_DATA.map((item) => (
          <div key={item.id} className={styles.wishCard}>
            <div
              className={styles.cardGlowCorner}
              style={{ background: item.glowColor }}
            />

            <div>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>{item.icon}</div>
                <span className={styles.cardTag}>{item.tag}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardMessage}>{item.message}</p>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className={styles.sendFlowerBtn}
                onClick={(e) => handleSendFlowerToCard(item.id, e)}
              >
                <span>💐 Tặng đóa hoa này</span>
              </button>

              <span className={styles.countText}>
                <Heart size={13} fill="#f6c86a" color="#f6c86a" />
                <span>
                  {flowerCounts[item.id] ? `+${flowerCounts[item.id]} đóa hoa` : "Gửi yêu thương"}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
