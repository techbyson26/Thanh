# 🌸 Website Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 (Next.js)

Website thiệp hoa tương tác chúc mừng ngày 20/10 với phong cách **lãng mạn, ấm áp, sang trọng (Velvet Rose & Warm Amber)**, tối ưu hiển thị mượt mà trên mọi thiết bị di động và máy tính.

---

## ✨ Điểm Nổi Bật

1. **Đóa Hoa Khởi Đầu Huyền Ảo**:
   - Khi vào trang web, chỉ xuất hiện **1 đóa hoa duy nhất** tỏa sáng dịu dàng ở trung tâm với hiệu ứng nhịp thở và ánh hào quang lung linh.
   - Khi người xem chạm/click vào đóa hoa: Đóa hoa sẽ **bùng nở rực rỡ**, kích hoạt **pháo hoa cánh hoa ngập tràn toàn màn hình** (`canvas-confetti`) cùng giai điệu piano du dương được tổng hợp qua Web Audio API.

2. **Cơn Mưa Cánh Hoa Bay (HTML5 Canvas)**:
   - Hàng chục cánh hoa hồng và bụi vàng óng ánh liên tục bay lượn theo làn gió với hiệu ứng vật lý xoay lật 3D sống động.

3. **Bức Thư Phong Bì 3D (Sealed Envelope)**:
   - Phong thư sang trọng niêm phong bằng con dấu sáp **20/10 YÊU THƯƠNG**.
   - Chạm vào để mở phong bì và đọc bức thư ấm áp, ý nghĩa kèm thơ chúc mừng và nút thả tim tương tác.

4. **Vườn Lời Chúc (Glassmorphic Wish Cards)**:
   - 4 tấm thiệp kính mờ với thông điệp: *Rạng Ngời Tựa Ngàn Hoa*, *Tâm Hồn An Yên*, *Tự Tin Kiêu Hãnh*, và *Được Yêu Thương Vô Điều Kiện*.
   - Hỗ trợ nút tặng hoa riêng cho từng lời chúc.

5. **Cá Nhân Hóa Tên Người Nhận**:
   - Có thể nhập tên người nhận (Mẹ yêu, Vợ yêu, Em gái, bạn bè...) để tạo đường dẫn riêng dạng `?to=Tên` và sao chép link gửi tặng chỉ với 1 click.

---

## 🚀 Chạy Dự Án Ở Local

1. Cài đặt dependencies (nếu chưa):
   ```bash
   npm install
   ```

2. Khởi chạy dev server:
   ```bash
   npm run dev
   ```

3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 🌐 Hướng Dẫn Deploy Lên Vercel

Dự án đã được build tĩnh hóa hoàn toàn (`npm run build` thành công 100% với Static Prerendering), bạn có thể deploy lên Vercel theo 1 trong 2 cách:

### Cách 1: Deploy qua GitHub (Khuyên dùng - Đơn giản nhất)
1. Đẩy code lên repository GitHub cá nhân:
   ```bash
   git init
   git add .
   git commit -m "feat: Happy Vietnamese Women's Day 20/10 interactive website"
   git branch -M main
   git remote add origin <URL_GITHUB_REPO_CUA_BAN>
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Nhấn **"Add New Project"** -> Chọn repository vừa push lên.
4. Giữ nguyên cấu hình mặc định (Framework Preset: **Next.js**) và nhấn **"Deploy"**.
5. Trong vòng 1 phút, Vercel sẽ cung cấp tên miền miễn phí (dạng `https://ten-du-an.vercel.app`) để bạn gửi thiệp cho mọi người!

### Cách 2: Deploy trực tiếp qua Vercel CLI
Chạy lệnh sau ngay trong terminal:
```bash
npx vercel
```
Làm theo hướng dẫn trên màn hình để liên kết tài khoản và deploy ngay lập tức.
