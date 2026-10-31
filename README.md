# TỰ ĐỘNG XUẤT HỒ SƠ CHỈ ĐỊNH THẦU (HỒ SƠ TỰ ĐỘNG)

Hệ thống tự động hóa lập bộ hồ sơ chỉ định thầu rút gọn (4 văn bản theo quy chuẩn Luật Đấu thầu 22/2023/QH15 và Nghị định 30/2020/NĐ-CP về thể thức văn thư hành chính).

---

## 🌟 Tính Năng Nổi Bật

1. **Công Cụ Chuẩn Hóa Template Word Thông Minh (Mới)**:
   - Truy cập trang `template-tool.html` để tải lên bất kỳ file Word cũ nào của bạn.
   - **Tự động quét và nhận diện thông minh**: Quét tên CĐT, dự án, gói thầu, nhà thầu, số tiền, ngày tháng, người ký.
   - **Bôi đen để gán thẻ (Click-to-Tag)**: Chọn văn bản bất kỳ để gán thành biến `{{TEN_BIEN}}`.
   - **Tự động chuyển đổi file .docx**: Thay thế toàn bộ từ khóa trong Word XML, giữ nguyên 100% định dạng, căn lề, bảng biểu và phông chữ của văn bản gốc.
   - **Thử nghiệm điền dữ liệu**: Test thử dữ liệu vào template vừa tạo trực tiếp trên trình duyệt.

2. **Nhập liệu 1 lần qua Excel**:
   - Sử dụng file mẫu `MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx`.
   - Sheet `Thông tin chung`: Thông tin Chủ đầu tư, Dự án, Căn cứ pháp lý, Nhân sự ký (điền 1 lần cho cả dự án).
   - Các sheet gói thầu: Điền thông tin riêng cho từng gói thầu (tự động nhận diện không giới hạn số lượng gói thầu).

3. **Xem trước (Live Preview)**:
   - Hiển thị trực tiếp nội dung văn bản theo tỷ lệ trang A4 chuẩn.
   - Định dạng chuẩn thể thức: Quốc hiệu, Tiêu ngữ, Tên cơ quan, Số hiệu, Căn cứ pháp lý, Bảng biểu, Chữ ký.
   - Chuyển đổi nhanh 4 loại văn bản:
     1. `1. Giấy mời tham gia hoàn thiện hợp đồng`
     2. `2. Biên bản hoàn thiện hợp đồng chỉ định thầu`
     3. `3. Tờ trình phê duyệt kết quả chỉ định thầu`
     4. `4. Quyết định phê duyệt kết quả chỉ định thầu`

3. **Xuất hàng loạt file Word & Đóng gói ZIP**:
   - 1 Click xuất toàn bộ các gói thầu thành các file Word (`.docx`).
   - Tự động gom nhóm vào các thư mục theo từng gói thầu và nén thành 1 file `.zip`.

---

## 🚀 Hướng Dẫn Sử Dụng

### Cách 1: Chạy qua Python Server (Khuyên dùng)
Mở cửa sổ dòng lệnh (Terminal / PowerShell / CMD) tại thư mục dự án và chạy:
```bash
python run.py
```
Trình duyệt sẽ tự động mở tại địa chỉ: `http://localhost:8000`.

### Cách 2: Mở trực tiếp file `index.html`
Bạn có thể nhấp đúp trực tiếp vào file `index.html` để mở trên bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Cốc Cốc, Brave...).

---

## 📁 Cấu Trúc Dự Án

```
ho-so-tu-dong/
├── index.html                               # Giao diện chính (UI responsive)
├── app.js                                   # Logic xử lý Excel, preview & xuất ZIP
├── style.css                                # CSS giao diện và chuẩn trang in A4
├── run.py                                   # Server cục bộ khởi chạy nhanh
├── MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx   # File Excel mẫu chuẩn 3 gói thầu
├── templates/                               # Bộ 4 file Word (.docx) mẫu chuẩn
│   ├── 1_Giay_moi_tham_gia.docx
│   ├── 2_Bien_ban_hoan_thien_hop_dong.docx
│   ├── 3_To_trinh_chi_dinh_thau.docx
│   └── 4_Quyet_dinh_chi_dinh_thau.docx
└── README.md                                # Hướng dẫn sử dụng
```

---

## ⚖️ Căn Cứ Pháp Lý Tích Hợp

* **Luật Đấu thầu số 22/2023/QH15** ngày 23/06/2023.
* **Nghị định số 24/2024/NĐ-CP** ngày 27/02/2024 của Chính phủ quy định chi tiết thi hành Luật Đấu thầu về lựa chọn nhà thầu.
* **Nghị định số 30/2020/NĐ-CP** ngày 05/03/2020 của Chính phủ về công tác văn thư.
