# 📋 TÀI LIỆU BÀN GIAO DỰ ÁN & BÁO CÁO TRẠNG THÁI (PROJECT HANDOVER)

> **Dành cho:** AI Assistant / Kỹ sư phần mềm tiếp quản dự án.  
> **Thời điểm cập nhật:** 10/11/2026 (Local Time)  
> **Dự án:** Hệ thống Tạo Hồ Sơ Tự Động & Quản Lý Đấu Thầu (`ho-so-tu-dong`)  
> **Kho lưu trữ Git:** `https://github.com/hhminh71/ho-so-tu-dong.git` (Nhánh chính: `main`)  
> **Môi trường hoạt động:** Windows, Google Drive Desktop (`I:\My Drive\APP\Projects\ho-so-tu-dong`), Cốc Cốc, Chrome, Edge.

---

## 🧭 1. TỔNG QUAN HIỆN TRẠNG (CHÚNG TA ĐANG LÀM ĐẾN ĐÂU?)

Hệ thống đã hoàn tất và kích hoạt thành công:
1. **Cơ chế Đồng bộ Online 2 Chiều (Real-time 2-Way Sync) giữa Web App và Google Sheets Cloud** làm nguồn dữ liệu trung tâm duy nhất (Single Source of Truth).
2. **Kiến trúc Ma trận Template 2 tầng (2-Tier Template Hierarchy)** đồng bộ tuyệt đối với cây thư mục vật lý trên Google Drive:
   * `templates/Quy_trinh_trien_khai/` (3 thư mục: `Trien_khai_dau_tu`, `Trien_khai_mua_sam`, `Trien_khai_sua_chua`)
   * `templates/Hinh_thuc_LCNT/` (6 thư mục: `Mua_sam_chao_gia_han_che`, `Mua_sam_chao_gia_rong_rai`, `Mua_sam_duoi_50tr`, `Xay_dung_chi_dinh_thau_rut_gon`, `Xay_dung_dau_thau_rong_rai_qua_mang`, `Xay_dung_duoi_100tr`)
3. **Cơ chế Phân định Rõ ràng "Có mẫu" vs "Chưa có mẫu" & Khởi tạo Mẫu mới từ con số 0 trong Template Studio 2.0:**
   * Đúng theo nguyên tắc: Thư mục nào chưa có file thì xem như **chưa có mẫu** (không gán mẫu giả, không gán lộn xộn).
   * Tại `index.html`: Văn bản chưa có file mẫu sẽ hiển thị Badge màu hổ phách `[⚠️ Chưa có mẫu .docx]`, nút chuyển thành `[🎨 Tạo mẫu Studio]`, banner cảnh báo trong trang và chặn xuất file Word nếu chưa có mẫu. Văn bản đã có mẫu hiển thị Badge xanh `[✓ Có file mẫu .docx]`.
   * Tại `template-tool.html` (Template Studio 2.0): Bảng danh sách văn bản hiển thị nút `[Tạo mẫu mới]`. Khi mở văn bản chưa có file, Studio tự động tạo sẵn một **Khung mẫu văn bản hành chính Việt Nam chuẩn Nghị định 30/2020/NĐ-CP** (Quốc hiệu, Tiêu ngữ, Tên cơ quan, Số VB, Địa danh, Tên văn bản, Căn cứ pháp lý, Các điều khoản, Chữ ký) kèm sẵn các thẻ biến `{TAG}` tương ứng.
   * Khi người dùng bấm **"⚡ Áp dụng làm Mẫu Chuẩn"**, hệ thống tự động biên dịch trực tiếp Canvas HTML thành file Word `.docx` chuẩn OpenXML (phông chữ Times New Roman 13pt, căn lề A4 chuẩn, giãn dòng 1.5), lưu đồng thời vào `localStorage` (`ho_so_custom_template_<id>` và `ho_so_custom_template_html_<id>`).
   * Quay lại trang `index.html`: Văn bản vừa tạo lập tức chuyển sang trạng thái `[✓ Mẫu tùy biến]` và sẵn sàng xuất file Word riêng lẻ hoặc đóng gói toàn bộ gói thầu ZIP!
4. **Cơ chế Gợi ý Biến Xạ Theo Ngữ Cảnh & Danh Sách Kiểm Tra Độ Phủ Biến (Real-time Coverage Checklist) trong Studio 2.0:**
   * **Nhận diện ngữ cảnh văn bản tự động:** Studio tự động tra cứu danh mục biến đặc thù cho từng loại văn bản qua `STUDIO_DOC_VAR_MAP` và `docObj.requiredVars` (đồng bộ hoàn toàn với `DOC_VAR_MAP` của `app.js`).
   * **Bảng gợi ý & Độ phủ biến thời gian thực (`#contextualRecommendedVarsBox`):**
     * Hiển thị Badge thống kê: `[Có X/Y biến]` (nền hổ phách) hoặc `[✓ Đầy đủ (X/X)]` (nền xanh lá).
     * Tự động phân loại biến:
       * Biến đã có trên Canvas hiển thị chip màu xanh lá kèm biểu tượng `✓`. Khi bấm vào chip, trang tự động cuộn và nhấp nháy hiệu ứng viền sáng (ring pulse) tại vị trí biến đó trên Canvas.
       * Biến còn thiếu hiển thị chip màu hổ phách kèm biểu tượng `+`. Bấm 1-chạm sẽ chèn ngay mã `{TAG}` vào vị trí con trỏ và chip lập tức chuyển sang màu xanh lá `✓`.
     * Nút **[+ Chèn X biến thiếu]**: 1-chạm tự động chèn đồng loạt tất cả các biến bắt buộc còn thiếu vào văn bản.
   * **Popup Gán Biến Nhanh Thông Minh (Dynamic Selection Menu):** Khi bôi đen bất kỳ đoạn chữ nào trên Canvas, menu nổi tự động hiển thị 5 biến được khuyến nghị nhất cho loại văn bản đó để người dùng gán chỉ trong 1-click.
   * **Phản hồi thời gian thực (Debounced Input):** Mọi thao tác gõ chữ, xóa hoặc chèn trên Canvas đều tự động kích hoạt bộ đếm và cập nhật trạng thái checklist tức thì (độ trễ 300ms).

---

## 📂 2. DANH SÁCH TỆP VỪA TẠO VÀ CHỈNH SỬA GẦN NHẤT

| Tên tệp | Trạng thái | Mục đích & Chi tiết thay đổi |
| :--- | :---: | :--- |
| [`app.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/app.js) | **NÂNG CẤP** | Cập nhật ma trận `DEFAULT_IMPLEMENTATION_MATRIX` và `prebuiltDocxMap` theo đường dẫn 2 tầng; loại bỏ mẫu giả; bổ sung hàm `hasDocTemplate(docObj)`; hiển thị Badge trạng thái mẫu và chặn xuất Word rỗng; ưu tiên tham số URL `workflow`, `doc`, `tab=docs` khi khởi động. |
| [`index.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/index.html) | **NÂNG CẤP** | Bổ sung `#docTemplateStatusBadge` hiển thị trạng thái mẫu thời gian thực cạnh bộ chọn văn bản; cập nhật cache-buster lên `app.js?v=20261110_v3`. |
| [`template-tool.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.js) | **NÂNG CẤP** | Bổ sung `STUDIO_DOC_VAR_MAP` và `getStudioRecommendedVarsForDoc`; cơ chế quét độ phủ biến thời gian thực `renderContextualRecommendedVars`; cuộn và highlight biến `highlightTagInCanvas`; tự động chèn đồng loạt `insertAllMissingRecommended`; menu gán biến động khi bôi đen chữ `updateSelectionMenuWithRecommended` và `applyTagToSelection`. |
| [`template-tool.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.html) | **NÂNG CẤP** | Thêm khối giao diện `#contextualRecommendedVarsBox` trên đầu Sidebar trái, badge `#recommendedCoverageBadge`, nút `#btnInsertAllMissingRecommended`, danh sách chip `#contextualRecommendedChips`; nâng cache-buster lên `template-tool.js?v=20261111_v1`. |
| [`templates_data.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/templates_data.js) | **NÂNG CẤP** | Bổ sung các alias keys lồng thư mục cho 7 file Base64, bảo đảm tra cứu tức thì trên mọi giao thức (kể cả `file:///`). |
| `templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/` | **MỚI** | Chứa 2 file Word thực tế: `01_To_trinh_KHLCNT.docx`, `02_Quyet_dinh_KHLCNT.docx`. |
| `templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/` | **MỚI** | Chứa 5 file Word thực tế: `1_Giay_moi_tham_gia.docx`, `2_Bien_ban_hoan_thien_hop_dong.docx`, `3_To_trinh_chi_dinh_thau.docx`, `4_Quyet_dinh_chi_dinh_thau.docx`, `07_Hop_dong_kinh_te.docx`. |
| [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js) | **HIỆN HỮU** | Chứa cấu hình toàn cục `window.APP_CONFIG`. Lưu vĩnh viễn đường link Google Apps Script Web App để mọi trình duyệt và Tab Ẩn danh tự động nạp. |

---

## 🐛 3. CÁC LỖI / VƯỚNG MẮC ĐÃ GIẢI QUYẾT TRIỆT ĐỂ

### 1. Lỗi: Văn bản chưa có mẫu vẫn bị gán file "01_To_trinh_KHLCNT.docx"
* **Nguyên nhân:** Mã nguồn cũ có cơ chế fallback tự động ép mọi văn bản không có file mẫu về `01_To_trinh_KHLCNT.docx`, khiến người dùng nhầm lẫn là tất cả văn bản đều đã có mẫu sẵn.
* **Xử lý:** Xóa bỏ hoàn toàn fallback này. Các thư mục chưa có file (`Trien_khai_dau_tu`, `Trien_khai_mua_sam`, `duoi_50_trieu`, `duoi_100_trieu`, `chao_gia_han_che`, `chao_gia_rong_rai`, `dau_thau_rong_rai_qua_mang`) được xác nhận chính xác là `templateFile: ""` (Chưa có mẫu .docx).

### 2. Lỗi: Khi chưa có mẫu, vào Studio bị màn hình trống
* **Nguyên nhân:** Template Studio 2.0 phụ thuộc vào việc đọc file `.docx` có sẵn để trích xuất đoạn văn; khi không có file thì canvas báo lỗi không nạp được.
* **Xử lý:** Bổ sung hàm `generateDefaultDocumentScaffold(docObj)` tự động sinh khung mẫu hành chính chuẩn NĐ 30/2020/NĐ-CP (Tờ trình, Quyết định, Giấy mời, Biên bản...) với đầy đủ thẻ biến và cho phép người dùng tự do soạn thảo, chỉnh sửa, chèn thẻ 1-chạm từ bảng Palette.

### 3. Lỗi: Mẫu tự tạo trong Studio không có file .docx để xuất ra Word
* **Nguyên nhân:** Trước đây Studio chỉ lưu mã HTML vào `localStorage`, nếu văn bản không có file `.docx` gốc thì không thể tạo file tải về hoặc nạp vào docxtemplater.
* **Xử lý:** Xây dựng module `createDocxFromCanvasHtml(cleanHtml)` sử dụng JSZip và XMLSerializer để trực tiếp biên dịch toàn bộ cấu trúc Canvas HTML thành một file Word OpenXML (.docx) chuẩn mực (Times New Roman 13pt, lề chuẩn A4, hỗ trợ bảng, in đậm/nghiêng). File này được lưu base64 vào `ho_so_custom_template_<id>`, giúp trang `index.html` lập tức nhận diện và xuất Word trơn tru.

### 4. Lỗi: Cú pháp `await` dư thừa ngoài hàm ở `app.js`
* **Nguyên nhân:** Khối lệnh lặp vô tình rơi ra ngoài thân hàm `getDocTemplateArrayBuffer()`.
* **Xử lý:** Đã gỡ bỏ khối mã trùng lặp, mã nguồn sạch sẽ và vượt qua toàn bộ kiểm thử cú pháp (0 lỗi).

---

## ⚠️ 4. TRẠNG THÁI HIỆN TẠI & CÓ LỖI NÀO ĐANG VƯỚNG KHÔNG?

* **Lỗi tồn đọng nghiêm trọng (Blocker/Critical):** **0 LỖI.**
* **Tình trạng mã nguồn:** Sạch sẽ, không có xung đột Git. Toàn bộ mã nguồn đã được commit và push lên `origin/main` (Commit mới nhất: `999ba55`).
* **Hệ thống Server cục bộ:** Đang chạy một phiên bản HTTP Server nền tại cổng 8000.
* **Kết quả Kiểm thử Tự động (End-to-End Headless Chrome CDP):**
  * Test Case 1 (Văn bản chưa có mẫu): Đạt 100% (Hiện badge vàng cảnh báo, nút "Tạo mẫu Studio", chặn xuất Word rỗng).
  * Test Case 2 (Văn bản có mẫu sẵn): Đạt 100% (Hiện badge xanh, nút "Sửa mẫu Studio").
  * Test Case 3 (Khởi tạo mẫu mới từ Studio): Đạt 100% (Hiện khung mẫu NĐ 30/2020, lưu thành công vào localStorage dưới dạng Word .docx).
  * Test Case 4 (Đồng bộ ngược về index.html): Đạt 100% (Lập tức nhận diện "Mẫu tùy biến" màu vàng kim và nút "Sửa mẫu Studio").

---

## 🚀 5. NHIỆM VỤ TIẾP THEO (NEXT TASKS CHO AI TIẾP QUẢN)

- [ ] **Nhiệm vụ 1: Hỗ trợ người dùng thiết kế các mẫu còn lại trong Studio:**
  * Người dùng có thể tự bấm vào từng văn bản thuộc 7 thư mục trống để thiết kế và bấm "⚡ Áp dụng làm Mẫu Chuẩn", hoặc tải lên các file `.docx` tự soạn nếu có.
- [ ] **Nhiệm vụ 2: Kiểm thử xuất trọn bộ gói thầu (Batch Export .zip):**
  * Thử nghiệm xuất toàn bộ hồ sơ gói thầu sau khi đã khởi tạo mẫu tùy biến để kiểm tra chất lượng file Word đầu ra.

```powershell
# 1. Kiểm tra trạng thái Git
git status

# 2. Kiểm thử kết nối trực tiếp đến Google Apps Script Web App của người dùng
python -c "import urllib.request, json; resp = json.loads(urllib.request.urlopen('https://script.google.com/macros/s/AKfycbybkIhpHZA15Abwpn5MAtZgXyX52gKxACvpmUZpiFa7rIjeYfjc5Yne4uGoGa5bnpcz/exec?action=getData').read().decode('utf-8')); print('Success:', resp.get('success'), '| Variables count:', len(resp.get('catalog', [])))"

# 3. Chạy kiểm thử tự động Tab Ẩn danh cho Template Studio
python scratch/test_studio_incognito_sync.py

# 4. Chạy kiểm thử tự động hệ thống config.js
python scratch/test_config_system.py
```

---
*Tài liệu này được tạo tự động để bảo đảm tính liên tục và chất lượng cao nhất cho dự án.*
