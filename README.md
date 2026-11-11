# QUẢN LÝ & TỰ ĐỘNG XUẤT HỒ SƠ MUA SẮM, XÂY LẮP (HỒ SƠ TỰ ĐỘNG v3.0)

Hệ thống chuyên nghiệp tự động hóa toàn diện quy trình lập và xuất hồ sơ mua sắm tài sản, hàng hóa, dịch vụ tư vấn và xây lắp theo đúng quy chuẩn **Luật Đấu thầu số 22/2023/QH15**, **Nghị định số 24/2024/NĐ-CP** và **Nghị định số 30/2020/NĐ-CP** về thể thức văn thư hành chính.

---

## 🌟 Tính Năng Nổi Bật

### 1. Ma Trận Mua Sắm Đa Quy Trình (`matrix_procurement.json`)
Hệ thống tích hợp sẵn ma trận phân loại văn bản cho **6 quy trình mua sắm & xây lắp phổ biến nhất**:
1. **Mua sắm (Dưới 50 triệu)**: Tờ trình chủ trương, Báo cáo thẩm định mua sắm, Hợp đồng/Đơn đặt hàng, Biên bản nghiệm thu & thanh lý.
2. **Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)**: Tờ trình KHLCNT, Quyết định phê duyệt KHLCNT, Biên bản thương thảo, Hợp đồng kinh tế.
3. **Chào giá cạnh tranh hạn chế (Nội bộ)**: 9 văn bản (Tờ trình, Báo cáo đề xuất 3 nhà thầu, Thư mời báo giá, Biên bản mở thư chào giá, Biên bản họp đánh giá so sánh giá, Biên bản thương thảo, Báo cáo đánh giá, Thông báo kết quả, Hợp đồng kinh tế).
4. **Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)**: 7 văn bản chuẩn (Tờ trình KHLCNT, Quyết định KHLCNT, Giấy mời hoàn thiện hợp đồng, Biên bản hoàn thiện hợp đồng, Tờ trình chỉ định thầu, Quyết định chỉ định thầu, Hợp đồng kinh tế).
5. **Chỉ định thầu quy trình thông thường (HSYC & HSĐX)**: 12 văn bản (Thành lập Tổ chuyên gia/thẩm định, Phê duyệt HSYC, Thư mời nộp HSĐX, Mở HSĐX, Đánh giá HSĐX, Thương thảo, Thẩm định kết quả, Quyết định phê duyệt).
6. **Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)**: 23 văn bản đầy đủ qua 6 giai đoạn (Chuẩn bị E-HSMT, Mở thầu, Đánh giá E-HSDT, Thương thảo, Thẩm định, Công khai kết quả & Hợp đồng).

### 2. Giao Diện Siêu Tinh Gọn, Thanh Mảnh (Ultra-Compact & High Density UI)
- Giảm tối đa khoảng cách thừa, padding và margin.
- Chiều cao các ô nhập liệu mảnh (~24px), sắp xếp dạng lưới 2 cột khoa học, dễ dàng quan sát và điền thông tin bao quát toàn dự án mà không cần cuộn trang liên tục.
- Thanh công cụ điều khiển gọn gàng 38px, cho phép chuyển đổi tức thì giữa các quy trình mua sắm.

### 3. Template & Excel Studio (`template-tool.html`)
- Tải file Word (`.docx`) của các dự án cũ lên để tự động biến thành Template chuẩn.
- **Tự động quét & nhận diện thực thể thông minh**: Tên chủ đầu tư, Ban QLDA, Tên dự án, Gói thầu, Nhà thầu, Giá tiền, Mã số thuế, Số tài khoản ngân hàng, Tỷ lệ tạm ứng, Thời gian bảo hành, Bảo đảm hợp đồng...
- **Tùy biến đưa biến vào Sheet Excel**: Cho phép chọn đưa biến vào sheet `Thông tin chung`, sheet `Từng gói thầu` hoặc tạo một sheet Excel hoàn toàn mới.
- **Tự động cập nhật file Excel mẫu** và đồng bộ trực tiếp vào giao diện chính (`index.html`).

### 4. Nhập Liệu 1 Lần Qua Excel & Đồng Bộ Đa Gói Thầu
- File Excel mẫu hỗ trợ đa sheet: Sheet `Thông tin chung` (nhập 1 lần dùng chung cho mọi gói thầu) và các Sheet riêng cho từng gói thầu (tự động mở rộng không giới hạn).
- Hỗ trợ nhập và xuất hàng loạt file Word (`.docx`) hoặc đóng gói toàn bộ dự án vào 1 file `.zip` theo từng thư mục gói thầu.

### 5. Xem Trước Trực Quan Chuẩn A4 (Live Preview)
- Trình xem trước theo đúng tỷ lệ trang in A4.
- Hiển thị trực quan các thẻ biến chưa điền `{TEN_BIEN}` (màu đỏ) và dữ liệu đã điền (màu xanh ngọc).

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
├── index.html                               # Giao diện chính (Ultra-compact & High Density UI)
├── app.js                                   # Core logic kết nối ma trận mua sắm, Excel & Word export
├── style.css                                # Định dạng CSS siêu gọn và tỷ lệ A4 chuẩn hành chính
├── matrix_procurement.json                  # Ma trận 6 quy trình mua sắm & 50+ loại văn bản chuẩn
├── template-tool.html                       # Template & Excel Studio (Chuẩn hóa Word cũ thành template)
├── template-tool.js                         # Logic phân tích NLP/Regex biến xạ và xuất Excel
├── run.py                                   # Server cục bộ khởi chạy nhanh
├── MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx   # File Excel mẫu chuẩn đa sheet
├── templates/                               # Thư mục chứa các mẫu Word (.docx) chuẩn thể thức
│   ├── 01_To_trinh_KHLCNT.docx
│   ├── 02_Quyet_dinh_KHLCNT.docx
│   ├── 1_Giay_moi_tham_gia.docx
│   ├── 2_Bien_ban_hoan_thien_hop_dong.docx
│   ├── 3_To_trinh_chi_dinh_thau.docx
│   ├── 4_Quyet_dinh_chi_dinh_thau.docx
│   └── 07_Hop_dong_kinh_te.docx
└── README.md                                # Hướng dẫn sử dụng chi tiết
```

---

## ⚖️ Căn Cứ Pháp Lý Tích Hợp

* **Luật Đấu thầu số 22/2023/QH15** ngày 23/06/2023.
* **Nghị định số 24/2024/NĐ-CP** ngày 27/02/2024 của Chính phủ quy định chi tiết thi hành Luật Đấu thầu về lựa chọn nhà thầu.
* **Thông tư số 06/2024/TT-BKHĐT** hướng dẫn việc cung cấp, đăng tải thông tin về đấu thầu và mẫu hồ sơ đấu thầu trên Hệ thống mạng đấu thầu quốc gia.
* **Nghị định số 30/2020/NĐ-CP** ngày 05/03/2020 của Chính phủ về công tác văn thư.
