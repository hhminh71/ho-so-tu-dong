# 🛡️ BỘ NGUYÊN TẮC LÀM VIỆC & PHÁT TRIỂN PHẦN MỀM (WORKING PRINCIPLES)
> **Dự án:** Hệ thống Tạo Hồ Sơ Tự Động & Quản Lý Đấu Thầu (ho-so-tu-dong)  
> **Phiên bản tài liệu:** v1.0.0 — Ban hành bởi: **Tech Lead**  
> **Áp dụng cho:** Toàn bộ thành viên phát triển Frontend, Tester và Quản trị viên dự án.

---

## 🎯 LỜI MỞ ĐẦU TỪ TECH LEAD

Chào toàn thể đội ngũ phát triển,

Dự án **Hệ thống Tạo Hồ Sơ Tự Động** phục vụ trực tiếp cho công tác lập hồ sơ, thẩm định và chỉ định thầu với yêu cầu rất khắt khe về **tính chính xác pháp lý, sự toàn vẹn của dữ liệu và tốc độ xử lý**. 

Đặc thù kỹ thuật của dự án là hoạt động linh hoạt trên cả môi trường trực tuyến đám mây (Google Sheets Cloud / HTTP Server) lẫn môi trường ngoại tuyến mở trực tiếp qua giao thức tệp (`file:///` trên Google Drive) trên nhiều trình duyệt khác nhau (Cốc Cốc, Chrome, Edge) và mọi chế độ (Bình thường & Ẩn danh).

Bộ quy tắc này được thiết lập nhằm xây dựng một **tiêu chuẩn kỹ thuật đồng nhất**, loại bỏ hoàn toàn các lỗi xung đột mã nguồn, bảo vệ dữ liệu hồ sơ và đảm bảo mỗi phiên bản phát hành (release) đều đạt độ tin cậy tuyệt đối. **Mọi thành viên tham gia phát triển bắt buộc phải đọc kỹ và tuân thủ 100% các nguyên tắc dưới đây.**

---

# PHẦN 1: NGUYÊN TẮC LÀM VIỆC CHUNG (GENERAL ENGINEERING PRINCIPLES)

```
┌────────────────────────────────────────────────────────────────────────┐
│  3 TRỤ CỘT KỸ THUẬT:                                                   │
│  1. ỔN ĐỊNH TUYỆT ĐỐI (Reliability): Không phá vỡ luồng dữ liệu cũ.    │
│  2. TƯƠNG THÍCH ĐA NỀN TẢNG (Compatibility): Chạy tốt cả file:/// & Web.│
│  3. RÕ RÀNG, DỄ BẢO TRÌ (Maintainability): Code sạch, commit chuẩn.    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 1.1. QUY CHUẨN VIẾT CODE (CODE CONVENTION)

### A. Tiêu chuẩn JavaScript (ES6+)

| Tiêu chí | Quy chuẩn bắt buộc | Ví dụ đúng (`DO`) | Ví dụ sai (`DON'T`) |
| :--- | :--- | :--- | :--- |
| **Biến & Hàm** | `camelCase`, mô tả rõ mục đích, động từ đứng đầu cho hàm | `validatePackageData()`, `currentActiveTab` | `data()`, `temp1`, `do_stuff()` |
| **Hằng số (Constants)** | `UPPER_SNAKE_CASE` cho giá trị tĩnh toàn cục | `MASTER_VARIABLES_CATALOG`, `MAX_RETRIES` | `master_catalog`, `maxRetries` |
| **Giá trị logic (Boolean)** | Tiền tố `is`, `has`, `should`, `can` | `isUserAdmin`, `hasCustomVariables` | `adminCheck`, `customVar` |
| **Định danh Khóa Storage** | Tiền tố `LS_` + `UPPER_SNAKE_CASE` | `LS_GSHEET_URL`, `LS_VARS_CUSTOMIZATIONS` | `"gsheet_url"`, `"myKey"` |

#### Các nguyên tắc vàng khi viết JS:
1. **Bao đóng phạm vi (Scope Encapsulation):**
   * Tất cả logic phải nằm trong module hoặc hàm tự thực thi (IIFE: `(() => { ... })();`) để tránh làm ô nhiễm `window` toàn cục.
   * Chỉ đưa ra ngoài `window.*` những hàm giao tiếp giao diện bắt buộc (ví dụ: `window.pullDataFromGoogleSheet`).
2. **Xử lý Bất đồng bộ (Async/Await & Error Handling):**
   * Mọi lệnh gọi mạng (Fetch Google Apps Script, SheetJS, DocxTemplater) bắt buộc phải dùng `async/await` đi kèm khối `try / catch / finally`.
   * Luôn hiển thị phản hồi trực quan cho người dùng qua hệ thống Toast (`showToast(msg, 'success' | 'error' | 'warning' | 'info')`) và đóng trạng thái tải (Loading state) trong khối `finally`.
3. **Bảo tồn tương thích giao thức `file:///`:**
   * Tuyệt đối **không** sử dụng các tính năng yêu cầu Web Server bắt buộc (như `import/export` ES Modules không có bundler, Fetch file nội bộ bị CORS) mà không có cơ chế fallback.
   * Mọi thư viện phụ trợ phải được nạp qua CDN ổn định hoặc tệp nội bộ độc lập.
4. **Phòng chống nghẽn mạng & Vòng lặp đồng bộ (Anti-Echo Loop & Debounce):**
   * Khi bắt sự kiện người dùng gõ phím hoặc kéo thả đổi thứ tự, bắt buộc phải dùng **Debounce (600ms – 800ms)** trước khi gửi lệnh đẩy dữ liệu lên Google Sheets (`Auto-Push`).
   * Phải duy trì biến cờ trạng thái (Flag: `isGSheetSyncInProgress`) để tránh việc `Auto-Pull` kích hoạt ngược lại `Auto-Push` tạo vòng lặp vô tận.

### B. Tiêu chuẩn HTML5 & Tailwind CSS

1. **Cấu trúc ngữ nghĩa (Semantic HTML):**
   * Sử dụng đúng thẻ chức năng: `<button>` cho hành vi click, `<a>` cho chuyển trang, `<header>`, `<main>`, `<section>`, `<aside>`, `<details>`, `<summary>`.
   * Mỗi phần tử tương tác bắt buộc phải có `id` hoặc `data-*` mang tính gợi nhớ duy nhất (ví dụ: `btnOpenGSheetSyncModal`, `gsheetApiUrlInput`).
2. **Quy tắc sắp xếp Class Tailwind CSS:**
   Để code dễ đọc khi bảo trì, các class trong thuộc tính `class="..."` nên tuân theo thứ tự logic:
   ```
   Layout (flex, grid, block) 
   → Định vị (absolute, relative, z-index) 
   → Khoảng cách (p-*, m-*, space-*) 
   → Kích thước (w-*, h-*, max-w-*) 
   → Typography (text-*, font-*, leading-*) 
   → Màu sắc & Viền (bg-*, text-*, border-*, rounded-*) 
   → Hiệu ứng & Trạng thái (hover:*, focus:*, transition-*, shadow-*)
   ```
3. **Phòng chống vỡ Layout:**
   * Các ô hiển thị dữ liệu văn bản từ biến phải có xử lý cắt dòng (`truncate`, `break-words`, `overflow-hidden`).
   * Luôn kiểm tra khả năng co giãn trên các độ phân giải màn hình thông dụng (Full HD 1920x1080 và Laptop 1366x768).

### C. Tiêu chuẩn Chú thích mã nguồn (Comments)
* Sử dụng định dạng **JSDoc** cho tất cả các hàm cốt lõi:
```javascript
/**
 * Đẩy toàn bộ danh mục biến và dữ liệu gói thầu lên Google Sheets trung tâm.
 * @param {boolean} showToasts - Có hiển thị thông báo popup Toast trên UI hay không.
 * @returns {Promise<boolean>} Trả về true nếu đồng bộ thành công, false nếu thất bại.
 */
async function pushDataToGoogleSheet(showToasts = true) { ... }
```
* **Quy tắc Tech Lead:** Chỉ viết chú thích giải thích **TẠI SAO (WHY)** làm như vậy (ngữ cảnh nghiệp vụ, cách tránh lỗi đặc thù), không giải thích dòng code đang làm gì (WHAT) nếu code đã tự tường minh.

---

## 1.2. QUY TRÌNH QUẢN LÝ MÃ NGUỒN (GIT FLOW)

Dự án áp dụng mô hình phân nhánh rút gọn phù hợp với tốc độ phát triển liên tục nhưng kiểm soát chặt chẽ:

```
[main] ───────●───────────────────────● (Production Tag v2.7.x)
              ↑                       ↑
[develop] ────●──────●─────────●──────●
              │      ↑         ↑
              ├──────┘         │
       [feature/xxx]    [fix/yyy]
```

### A. Cấu trúc phân nhánh (Branching Structure)

| Tên nhánh | Mục đích sử dụng | Quyền hạn Merge |
| :--- | :--- | :--- |
| `main` | Mã nguồn Production đang chạy ổn định. Tuyệt đối **không** commit trực tiếp. | Chỉ Tech Lead |
| `develop` | Nhánh tích hợp chính. Nơi tập hợp các tính năng chuẩn bị cho bản phát hành tiếp theo. | Tech Lead / Reviewer |
| `feature/<mã-tính-năng>-<tên-ngắn>` | Phát triển tính năng mới từ nhánh `develop`. | Developer |
| `fix/<mã-lỗi>-<tên-ngắn>` | Sửa lỗi thông thường phát hiện trong quá trình kiểm thử từ `develop`. | Developer |
| `hotfix/<mô-tả-lỗi-khẩn>` | Vá lỗi nghiêm trọng phát sinh trực tiếp trên `main`. | Tech Lead / Developer |

*Ví dụ tên nhánh đúng:*
* `feature/gsheet-auto-sync`
* `feature/export-zip-batch`
* `fix/incognito-catalog-load`
* `hotfix/excel-formula-error`

### B. Quy chuẩn thông điệp Commit (Conventional Commits 1.0.0)

Cú pháp bắt buộc:
```
<type>(<scope>): <subject>
```

#### 1. Các loại Type hợp lệ:
* `feat`: Thêm tính năng mới cho người dùng.
* `fix`: Sửa lỗi phát sinh trong mã nguồn.
* `refactor`: Tái cấu trúc mã nguồn nhưng không đổi hành vi logic bên ngoài.
* `perf`: Nâng cấp tối ưu hiệu năng xử lý (tốc độ, bộ nhớ).
* `style`: Chỉnh sửa giao diện, khoảng cách, màu sắc CSS (không ảnh hưởng logic).
* `docs`: Cập nhật tài liệu, hướng dẫn sử dụng, file `.md`.
* `chore`: Công việc bảo trì cấu hình, tệp script phụ trợ, `.gitignore`.

#### 2. Quy tắc viết Subject:
* Ngôn ngữ: Tiếng Việt rõ nghĩa hoặc Tiếng Anh chuẩn (ưu tiên đồng nhất với tiến trình dự án).
* Bắt đầu bằng chữ cái thường, sử dụng động từ thể mệnh lệnh (add, fix, update, sync).
* Không đặt dấu chấm (`.`) ở cuối dòng commit message.
* Độ dài không quá 72 ký tự.

*Ví dụ Commit Message chuẩn:*
```git
feat(gsheet): add auto-push on variable edit and auto-pull on page load
fix(incognito): resolve missing catalog sync when opening in private mode
perf(excel): optimize batch cell writing with setValues to reduce latency
docs(readme): update guide for deploying Google Apps Script Web App
```

---

# PHẦN 2: QUY TRÌNH BÀN GIAO & PHÁT HÀNH PHIÊN BẢN (RELEASE & HANDOVER)

Mỗi lần nâng cấp phiên bản phần mềm (Release), toàn bộ đội ngũ phải tuân thủ nghiêm ngặt quy trình 3 giai đoạn: **Kiểm tra trước gộp (Pre-merge Checklist) $\rightarrow$ Ghi nhận phát hành (Changelog) $\rightarrow$ Bàn giao & Thông báo (Handover & Notification)**.

---

## 2.1. DANH SÁCH KIỂM TRA TRƯỚC KHI GỘP MÃ (PR / MERGE CHECKLIST)

Trước khi gửi yêu cầu gộp mã (Pull Request) vào nhánh `develop` hoặc `main`, người thực hiện bắt buộc phải tự tích chọn kiểm tra toàn bộ danh mục sau:

### ✅ Checklist Bắt Buộc (Mandatory Verification)

- [ ] **1. Kiểm tra Cú pháp & Console:**
  - [ ] Đã chạy kiểm tra cú pháp toàn bộ tệp `.js` (không có lỗi cú pháp, không có dấu ngoặc sót).
  - [ ] Mở tab Console trình duyệt: Không xuất hiện lỗi đỏ (`Uncaught Error`, `TypeError`, `CORS error`).
  - [ ] Đã dọn dẹp các lệnh `console.log()` rác dùng cho mục đích gỡ lỗi (debug).

- [ ] **2. Bảo toàn Dữ liệu & Nghiệp vụ (Data Integrity):**
  - [ ] Danh mục biến gốc (Master Variables Catalog) không bị mất biến, thứ tự STT chuẩn hóa từ 1 đến N.
  - [ ] Tệp mẫu Excel [`MauNhapLieu_HoSo_2Sheets_v3.xlsx`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/MauNhapLieu_HoSo_2Sheets_v3.xlsx) đồng bộ khớp 100% tên biến và thẻ TAG với phần mềm.
  - [ ] Đã kiểm thử luồng phân quyền (RBAC): Tài khoản nhân viên thông thường **không** thể sửa/xóa/đổi thứ tự Từ điển biến.

- [ ] **3. Kiểm tra Tương thích Đa Môi trường (Cross-Browser & Incognito):**
  - [ ] Đã chạy kiểm thử thực tế trên trình duyệt **Cốc Cốc** (môi trường chính của người dùng).
  - [ ] Đã chạy kiểm thử thực tế trên **Google Chrome / Microsoft Edge**.
  - [ ] **Đặc biệt:** Mở trong **Cửa sổ Ẩn danh (Incognito / InPrivate)**: Hệ thống tự động kết nối và tải đúng dữ liệu từ [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js).
  - [ ] Kiểm tra chạy ổn định trên giao thức `file:///` trực tiếp từ Google Drive.

- [ ] **4. Đồng bộ Đám mây (Google Sheets 2-Way Sync):**
  - [ ] Sửa biến trên Web App $\rightarrow$ Google Sheet tự động cập nhật đúng vị trí dòng và cột.
  - [ ] Sửa trên Google Sheet $\rightarrow$ Web App tải lại nhận đúng dữ liệu mới.
  - [ ] Đồng bộ chéo giữa trang chính `index.html` và xưởng mẫu `template-tool.html`.

- [ ] **5. Cập nhật Cache-Buster:**
  - [ ] Nếu có sửa file `.js` hoặc `.css`, bắt buộc đã tăng chuỗi version trong thẻ `<script>` / `<link>` tại cả `index.html` và `template-tool.html` (Ví dụ: `app.js?v=20261108_v1`).

---

## 2.2. MẪU GHI CHÚ PHÁT HÀNH (RELEASE NOTES / CHANGELOG TEMPLATE)

Khi hoàn tất phiên bản phát hành, người phụ trách release **bắt buộc** phải điền đầy đủ biểu mẫu bên dưới và lưu vào tệp `CHANGELOG.md` hoặc đính kèm vào phần mô tả của Git Release Tag.

```markdown
# 📦 GHI CHÚ PHÁT HÀNH (RELEASE NOTE) — [vX.Y.Z]

### 📌 Thông tin chung
- **Phiên bản (Version):** vX.Y.Z (Theo chuẩn SemVer: Major.Minor.Patch)
- **Ngày phát hành (Release Date):** YYYY-MM-DD
- **Người phát hành (Released By):** [Họ và tên / Vai trò]
- **Commit Hash:** [Mã commit git cuối cùng, ví dụ: 4df2cdb]
- **Nhánh triển khai:** `main`

---

### 🚀 1. Tính năng mới (New Features)
- [Mô tả ngắn gọn tính năng mới số 1 mang lại giá trị gì cho người dùng]
- [Mô tả tính năng mới số 2]

### 🛠️ 2. Sửa lỗi & Nâng cấp (Bug Fixes & Improvements)
- **Fix:** [Mô tả lỗi đã được khắc phục, nguyên nhân và kết quả sau fix]
- **Performance:** [Mô tả cải thiện tốc độ hoặc trải nghiệm tải trang]
- **UI/UX:** [Các tinh chỉnh về nút bấm, màu sắc, font chữ nếu có]

### ⚠️ 3. Hướng dẫn Cấu hình & Chuyển đổi (Configuration & Migration)
> *Ghi chú rõ người dùng hoặc quản trị viên có cần thao tác gì thêm để sử dụng phiên bản mới hay không.*
- **Cấu hình Google Sheets:** [Có cần cập nhật code trong Apps Script không? Có cần cấp lại link không?]
- **File mẫu Excel / Word:** [Có cần thay thế file mẫu biểu trong thư mục templates/ không?]

### 🧪 4. Bằng chứng Kiểm thử (Verification Proof)
- [x] Đã kiểm thử trên Cốc Cốc thường: **Đạt (Passed)**
- [x] Đã kiểm thử trên Cửa sổ Ẩn danh (Incognito): **Đạt (Passed)**
- [x] Đã kiểm thử đồng bộ 2 chiều với Google Sheets: **Đạt (Passed)**
- *Ảnh chụp màn hình / Bằng chứng kiểm thử đính kèm (nếu có):*
  * [Tên tệp ảnh hoặc đường dẫn kiểm thử]
```

---

## 2.3. QUY ĐỊNH CẬP NHẬT TÀI LIỆU & THÔNG BÁO CHO TEAM

Sau khi mã nguồn đã được merge vào `main` và đánh tag phiên bản thành công, người thực hiện phải hoàn tất ngay 3 nhiệm vụ sau trong vòng **30 phút**:

### Bước 1: Cập nhật tài liệu kỹ thuật
1. Cập nhật số phiên bản mới hiển thị trên giao diện (ví dụ: Badge `v2.7.x-cloud` trên thanh Header của `index.html`).
2. Ghi chép nội dung Release Note vào tệp `CHANGELOG.md`.
3. Nếu có cập nhật về cấu trúc biến từ điển, cập nhật ngay file [`MauNhapLieu_HoSo_2Sheets_v3.xlsx`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/MauNhapLieu_HoSo_2Sheets_v3.xlsx) và tài liệu tra cứu biến.

### Bước 2: Thông báo chính thức cho toàn bộ Team
Đăng thông báo lên kênh trao đổi chung (Zalo Group / Telegram / Slack / Email) theo đúng cấu trúc chuẩn sau:

> 📢 **[THÔNG BÁO] PHÁT HÀNH PHIÊN BẢN MỚI — DỰ ÁN TẠO HỒ SƠ TỰ ĐỘNG**  
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
> 🏷️ **Phiên bản:** `vX.Y.Z`  
> ⏰ **Thời gian:** [Giờ:Phút, Ngày/Tháng/Năm]  
> 👤 **Người thực hiện:** [Tên người phát hành]  
> 
> 🎯 **Các điểm mới nổi bật:**  
> 1. [Điểm mới 1 - Ngắn gọn]  
> 2. [Điểm mới 2 - Ngắn gọn]  
> 3. [Lỗi quan trọng đã sửa]  
> 
> 💡 **Lưu ý đối với người dùng:**  
> - Bấm **Ctrl + F5** trên trình duyệt (Cốc Cốc, Chrome) để nạp phiên bản mới nhất.  
> - Mọi thắc mắc hoặc sự cố phát sinh vui lòng phản hồi ngay tại luồng này để xử lý kịp thời.  
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

### Bước 3: Lưu trữ & Đóng gói dự phòng (Backup)
* Tạo bản lưu trữ dự phòng (Backup copy) đối với các file dữ liệu trung tâm nếu có thay đổi cấu trúc lớn:
  * File Excel: `MauNhapLieu_HoSo_2Sheets_v3.backup.xlsx`
  * File cấu hình: `config.js`

---

## 3. CHẾ TÀI & CAM KẾT CHẤT LƯỢNG

1. **Nguyên tắc "Không đổ vỡ" (Zero Regression):** Mọi bản cập nhật mới không được làm hỏng hoặc mất bất kỳ tính năng nào đang chạy ổn định của các phiên bản trước.
2. **Trách nhiệm của Reviewer / Tech Lead:** Bất kỳ Pull Request nào vi phạm Code Convention hoặc không có Checklist tự kiểm tra đều bị **Từ chối (Reject)** ngay lập tức để yêu cầu hoàn thiện.
3. Toàn bộ đội ngũ cam kết làm việc minh bạch, chủ động báo cáo vướng mắc và hỗ trợ lẫn nhau vì mục tiêu xây dựng một phần mềm chuyên nghiệp, tốc độ và tin cậy cao nhất cho tổ chức.

---
*(Văn bản này có hiệu lực kể từ ngày ban hành và được cập nhật định kỳ theo quyết định của Tech Lead)*.
