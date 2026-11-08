# 📋 TÀI LIỆU BÀN GIAO DỰ ÁN & BÁO CÁO TRẠNG THÁI (PROJECT HANDOVER)

> **Dành cho:** AI Assistant / Kỹ sư phần mềm tiếp quản dự án.  
> **Thời điểm cập nhật:** 08/11/2026 (Local Time)  
> **Dự án:** Hệ thống Tạo Hồ Sơ Tự Động & Quản Lý Đấu Thầu (`ho-so-tu-dong`)  
> **Kho lưu trữ Git:** `https://github.com/hhminh71/ho-so-tu-dong.git` (Nhánh chính: `main`)  
> **Môi trường hoạt động:** Windows, Google Drive Desktop (`I:\My Drive\APP\Projects\ho-so-tu-dong`), Cốc Cốc, Chrome, Edge.

---

## 🧭 1. TỔNG QUAN HIỆN TRẠNG (CHÚNG TA ĐANG LÀM ĐẾN ĐÂU?)

Hệ thống đã hoàn tất và kích hoạt thành công **Cơ chế Đồng bộ Online 2 Chiều (Real-time 2-Way Sync) giữa Web App và Google Sheets Cloud** làm nguồn dữ liệu trung tâm duy nhất (Single Source of Truth).

### ✅ Các trạng thái cốt lõi đã đạt được:
1. **Google Apps Script Web App đã hoạt động thực tế:**
   * URL triển khai chính thức:  
     `https://script.google.com/macros/s/AKfycbybkIhpHZA15Abwpn5MAtZgXyX52gKxACvpmUZpiFa7rIjeYfjc5Yne4uGoGa5bnpcz/exec`
   * Sheet mục tiêu trên Google Drive: `MauNhapLieu_HoSo_2Sheets_v3`.
   * Đã kiểm thử Live: Kéo thành công **65 biến chuẩn hóa** từ Google Sheet về Web App.
2. **Hỗ trợ 100% Cửa sổ Ẩn danh (Incognito / InPrivate) & Đa trình duyệt:**
   * Khắc phục triệt để vấn đề mất cấu hình khi mở tab ẩn danh bằng tệp cấu hình toàn cục [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js).
   * Cả trang chính [`index.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/index.html) và trang xưởng mẫu [`template-tool.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.html) (Template Studio 2.0) đều tự động kết nối và tải từ điển mới nhất ngay khi tải trang.
3. **Đồng bộ Thứ tự Biến 2 chiều không làm lệch dữ liệu:**
   * Khi đổi thứ tự biến trên Web App (bấm mũi tên $\uparrow/\downarrow$ hoặc kéo thả), Google Sheet tự động cập nhật lại đúng thứ tự hàng.
   * Thuật toán lập chỉ mục theo `{TAG}` bảo đảm **nguyên vẹn toàn bộ dòng dữ liệu** (STT, Phân nhóm, Tên biến, Tag, Giá trị dùng chung, và tất cả các cột giá trị gói thầu từ cột F trở đi).
4. **Bảo mật phân quyền (RBAC):**
   * Chỉ tài khoản Quản trị viên (`Admin` / `admin@company.vn`) mới có quyền chỉnh sửa/xóa/đổi thứ tự từ điển biến hoặc đẩy dữ liệu lên Google Sheets.
   * Tài khoản nhân viên lập hồ sơ chỉ có quyền đọc (Read-only) và sao chép mã thẻ.

---

## 📂 2. DANH SÁCH TỆP VỪA TẠO VÀ CHỈNH SỬA GẦN NHẤT

| Tên tệp | Trạng thái | Mục đích & Chi tiết thay đổi |
| :--- | :---: | :--- |
| [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js) | **MỚI TẠO** | Chứa cấu hình toàn cục `window.APP_CONFIG`. Lưu vĩnh viễn đường link Google Apps Script Web App để mọi trình duyệt và Tab Ẩn danh tự động nạp mà không phụ thuộc vào `localStorage`. |
| [`WORKING_PRINCIPLES.md`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/WORKING_PRINCIPLES.md) | **MỚI TẠO** | Bộ nguyên tắc làm việc Tech Lead: Code convention, Git flow, Checklist PR/Release, Mẫu Release Note & Quy trình thông báo team. |
| [`google_apps_script.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/google_apps_script.js) | **NÂNG CẤP** | Mã nguồn triển khai trên Google Apps Script: tối ưu hóa ghi dữ liệu hàng loạt bằng `setValues()` (chạy trong ~200ms); thuật toán map `oldRowByTag` di chuyển nguyên vẹn cả hàng dữ liệu khi đổi thứ tự. |
| [`app.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/app.js) | **NÂNG CẤP** | Tích hợp `getGSheetConfig()` ưu tiên đọc từ `config.js`; bổ sung hàm `triggerAutoPushCatalogToGSheet` (debounce 800ms); cờ `isGSheetSyncInProgress` chống vòng lặp; kiểm tra phân quyền RBAC; hàm kiểm tra định dạng link API thời gian thực. |
| [`index.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/index.html) | **NÂNG CẤP** | Nhúng thẻ `<script src="config.js">`; bổ sung modal cấu hình Google Sheets `#modalGoogleSheetSync`; thêm nút *Sao chép link Tab Ẩn Danh* và *Tải file config.js*. |
| [`template-tool.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.js) | **NÂNG CẤP** | Bổ sung module `pullStudioDataFromGoogleSheet()` và `pushStudioDataToGoogleSheet()`; tự động kéo dữ liệu từ Google Sheets khi khởi động Template Studio và khi mở modal *Tra cứu Biến xạ*. |
| [`template-tool.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.html) | **NÂNG CẤP** | Nhúng thẻ `<script src="config.js">`; tăng Cache-Buster lên `template-tool.js?v=20261106_v16`. |
| [`MauNhapLieu_HoSo_2Sheets_v3.xlsx`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/MauNhapLieu_HoSo_2Sheets_v3.xlsx) | **ĐỒNG BỘ** | Tệp mẫu Excel nguồn trên Google Drive, đã được đồng bộ chuẩn hóa 65 biến khớp với hệ thống. |
| [`.gitignore`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/.gitignore) | **NÂNG CẤP** | Bổ sung bỏ qua tệp reparse point `*.gsheet` và `*.backup.xlsx` của Google Drive for Desktop. |

---

## 🐛 3. CÁC LỖI / VƯỚNG MẮC ĐÃ GIẢI QUYẾT TRIỆT ĐỂ

### 1. Lỗi: Sửa biến trên Web App nhưng Google Sheets không đổi
* **Nguyên nhân:** Web App chạy trên máy tính cục bộ, chưa có cấu hình đường link Google Apps Script Web App kết nối tới tài liệu Google Sheet trên Google Drive.
* **Xử lý:** Xây dựng `google_apps_script.js`, hướng dẫn người dùng triển khai thành công Ứng dụng web và cấu hình vào phần mềm.

### 2. Lỗi: Tab Ẩn danh (Incognito) bị mất cấu hình và không đồng bộ
* **Nguyên nhân:** Tab ẩn danh có cơ chế cách ly tuyệt đối bộ nhớ `localStorage`. Khi mở ẩn danh, `localStorage` rỗng hoàn toàn nên không đọc được link từ tab thường.
* **Xử lý:** Tạo tệp [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js) nằm trong thư mục dự án và nạp vào trang qua thẻ `<script>`. Vì tệp này nằm cố định trên ổ cứng Google Drive, mọi tab ẩn danh đều tải được mã và tự động đồng bộ ngay lập tức.

### 3. Lỗi: Người dùng dán nhầm link loại "Thư viện" (`/macros/library/...`)
* **Nguyên nhân:** Trong giao diện Apps Script, người dùng chọn loại triển khai là *Thư viện (Library)* thay vì *Ứng dụng web (Web App)*. Link Thư viện chỉ dành cho trang soạn thảo nội bộ của Google, trình duyệt gọi vào bị chuyển hướng đăng nhập và chặn CORS.
* **Xử lý:** Hướng dẫn chọn đúng loại *Ứng dụng web* (Execute as: Me, Who has access: Anyone) để nhận link có đuôi `/exec`. Đồng thời thêm hàm kiểm tra tự động `validateGSheetApiUrl()` trên giao diện để cảnh báo người dùng ngay khi họ dán sai định dạng link.

### 4. Lỗi: Di chuyển thứ tự biến trong Từ điển làm xáo trộn dữ liệu
* **Nguyên nhân:** Nếu ghi đè đơn thuần theo số dòng `i`, các cột dữ liệu riêng của gói thầu (Cột F, G, H...) sẽ giữ nguyên vị trí cũ trong khi tên biến đã đổi chỗ, dẫn đến lệch dữ liệu giữa các cột.
* **Xử lý:** Cập nhật hàm `updateInfoSheet()` trong `google_apps_script.js` để đọc toàn bộ bảng hiện có, lập chỉ mục dòng theo `{TAG}`. Khi ghi thứ tự mới, toàn bộ dữ liệu dòng tương ứng với thẻ đó sẽ được di chuyển đồng thời sang vị trí dòng mới.

### 5. Lỗi: Mở `template-tool.html` (Template Studio 2.0) bên Tab Ẩn danh không đồng bộ
* **Nguyên nhân:** Trang `template-tool.html` sử dụng tệp logic riêng `template-tool.js`. Trước đó tệp này chưa được lập trình mô-đun kết nối Google Sheets mà chỉ đọc từ `localStorage`.
* **Xử lý:** Tích hợp mô-đun `pullStudioDataFromGoogleSheet()` vào `template-tool.js`, kết nối qua `config.js` và tự động cập nhật khi mở modal *Tra cứu Biến xạ*. Đã kiểm thử thực tế trên Headless Edge `--inprivate` đạt 100%.

---

## ⚠️ 4. TRẠNG THÁI HIỆN TẠI & CÓ LỖI NÀO ĐANG VƯỚNG KHÔNG?

* **Lỗi tồn đọng nghiêm trọng (Blocker/Critical):** **KHÔNG CÓ.**
* **Tình trạng mã nguồn:** Sạch sẽ, không có xung đột Git. Toàn bộ mã nguồn đã được commit và push lên `origin/main` (Commit mới nhất: `ec58674`).
* **Hệ thống Server cục bộ:** Đang chạy một phiên bản HTTP Server nền tại cổng 8000 (PID kiểm thử, phục vụ phát triển cục bộ).

---

## 🚀 5. NHIỆM VỤ TIẾP THEO (NEXT TASKS CHO AI TIẾP QUẢN)

Nếu người dùng yêu cầu tiếp tục phát triển, đây là các hạng mục ưu tiên cao tiếp theo có thể thực hiện ngay:

- [ ] **Nhiệm vụ 1: Bổ sung chỉ báo trạng thái Cloud trực quan trên Navbar:**
  * Hiện tại nút `[ Google Sheets ]` là nút tĩnh. Có thể thêm một chấm đèn trạng thái nhỏ (xanh lá nhấp nháy khi đang đồng bộ, xanh tĩnh khi kết nối tốt) để người dùng an tâm rằng dữ liệu luôn được lưu trữ trên đám mây.
- [ ] **Nhiệm vụ 2: Kiểm thử xuất hàng loạt tệp Word (Batch Export .zip):**
  * Kiểm tra việc xả dữ liệu từ 65 biến Google Sheets vào các văn bản mẫu trong quy trình chỉ định thầu rút gọn (`cdtrg_1` đến `cdtrg_7`) để bảo đảm không còn thẻ `{TAG}` nào bị sót hoặc xuất hiện chuỗi `undefined`.
- [ ] **Nhiệm vụ 3: Mở rộng thêm gói thầu mới trên Google Sheet:**
  * Nếu sau này người dùng thêm các cột gói thầu mới trên Sheet (ví dụ Cột I: Gói 4, Cột J: Gói 5...), kiểm tra cơ chế tự động mở rộng dropdown chọn gói thầu trong Web App để người dùng thao tác không giới hạn.
- [ ] **Nhiệm vụ 4: Đồng bộ trạng thái Tiến độ dự án (Roadmap timeline):**
  * Đảm bảo các mốc ngày bắt đầu, ngày kết thúc và trạng thái công việc ở Sheet 1 ("Định hướng") liên tục cập nhật 2 chiều với thanh tiến độ Timeline trên giao diện Web App.

---

## 🛠️ 6. HƯỚNG DẪN KIỂM THỬ NHANH DÀNH CHO AI

Khi AI mới tiếp quản, hãy chạy các đoạn script kiểm thử có sẵn trong thư mục `scratch/` để kiểm tra nhanh hệ thống mà không làm ảnh hưởng đến mã nguồn chính:

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
