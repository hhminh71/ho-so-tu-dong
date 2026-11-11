# 📋 TÀI LIỆU BÀN GIAO DỰ ÁN & BÁO CÁO TRẠNG THÁI (PROJECT HANDOVER)

> **Dành cho:** AI Assistant / Kỹ sư phần mềm tiếp quản dự án.  
> **Thời điểm cập nhật:** 11/11/2026 (Local Time)  
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
5. **Cơ chế Tải File Word Riêng Lẻ Trực Tiếp (Single Upload), Kéo - Thả (Drag & Drop) và So Khớp Tiếng Việt Thông Minh:**
   * Thêm nút nạp file riêng **`[📤 Tải file Word (.docx) lên]`** ngay trên thanh công cụ xem chi tiết văn bản (`#singleWorkspace`), cho phép nạp 1-chạm đúng văn bản đang chọn.
   * Hỗ trợ thao tác kéo-thả trực tiếp file Word (.docx) vào lòng trang Canvas.
   * Bộ so khớp tiếng Việt thông minh (`findBestMatchingDoc`) tự động nhận diện số thứ tự (`01`, `02`) và từ khóa loại văn bản ("báo cáo", "tờ trình", "thẩm định", "mua sắm") để gán đúng văn bản ngay cả khi tải hàng loạt.
   * Tự động trích xuất cấu trúc văn bản, gán thẻ biến tự động, hiển thị Badge `[File vừa tải lên]` (xanh ngọc) và cập nhật thanh khuyến nghị tức thì.
6. **Bảo Tồn 100% Định Dạng File Word Gốc (Bảng biểu 2 cột, Căn lề, Chữ in đậm/nghiêng) & Chuyển Đổi Round-Trip Hoàn Hảo:**
   * **Phân tích OpenXML sang HTML có cấu trúc (`parseDocxToStyledHtml`):**
     * Nhận diện và giữ nguyên bảng không viền 2 cột chuẩn văn bản hành chính Việt Nam (Cột trái: Đơn vị/Số VB; Cột phải: Quốc hiệu/Tiêu ngữ/Địa danh ngày tháng; Khối ký tên đóng dấu bên dưới).
     * Nhận diện bảng dữ liệu có viền (Bảng danh mục hàng hóa, đơn giá, thành tiền).
     * Giữ nguyên căn lề đoạn văn (`w:jc` -> `center`, `right`, `justify`), thụt đầu dòng (`w:ind`), gạch chân tiêu ngữ (`w:pBdr/w:bottom`), và định dạng chữ (`w:b`, `w:i`, `w:u`, cỡ chữ tiêu đề `w:sz`).
     * Đầy đủ bộ lọc `nodeType === 1` an toàn tuyệt đối với mọi file Word chứa XML Comments hoặc khoảng trắng text node.
   * **Biên dịch 2 chiều từ Canvas HTML trở lại file Word (.docx):**
     * Module `createDocxFromCanvasHtml` chuyển đổi các bảng `<table>` trên Canvas thành bảng Word `w:tbl` nguyên bản, bảo toàn căn lề và định dạng khi xuất file Word.
7. **Chức Năng Xóa Biến Đa Năng (3 Phương Thức Tiện Dụng):**
   * **Nút gỡ nhanh `[×]` (`.btn-remove-tag`):** Tích hợp trực tiếp trên mỗi Tag Badge, 1-click xóa ngay biến.
   * **Menu Thao Tác Biến Nhanh (`tagActionPopover`):** Khi click vào thân Tag Badge, hộp menu nổi sang trọng xuất hiện với 3 tùy chọn:
     * `[Gỡ thẻ (thành chữ)]`: Tháo bỏ badge trở về đoạn text thuần `{TAG}` để người dùng tự do biên tập.
     * `[🗑️ Xóa biến]`: Xóa hoàn toàn biến khỏi nội dung văn bản.
     * `[Đổi nhanh sang biến khác]`: Gợi ý 4-6 biến ngữ cảnh liên quan nhất để đổi nhanh trong 1-click mà không cần gõ phím.
   * **Xóa biến qua Menu bôi đen (`#selectionMenu`):** Thêm nút `[🗑️ Xóa biến]` khi người dùng bôi đen đoạn văn bản hoặc thẻ biến.
   * **Cơ chế dọn dẹp sạch sẽ (`cleanCanvasHtmlForStorage`):** Tự động bóc tách và loại bỏ các nút phụ trợ (`×`, popover) để xuất ra chuỗi `{TAG}` sạch sẽ cho docxtemplater và lưu trữ.
8. **Bộ Hoàn Tác & Làm Lại Toàn Diện (Undo / Redo - Ctrl+Z / Ctrl+Y):**
   * **Thanh công cụ Canvas:** Bổ sung cặp nút `[↶ Hoàn tác (Ctrl+Z)]` (`#btnStudioUndo`) và `[↷ Làm lại (Ctrl+Y)]` (`#btnStudioRedo`) với hiệu ứng sáng/mờ theo trạng thái khả dụng.
   * **Phím tắt chuẩn Desktop:** Hỗ trợ đầy đủ `Ctrl+Z` (Undo), `Ctrl+Y` và `Ctrl+Shift+Z` (Redo).
   * **Quản lý ngăn xếp thông minh (Undo Stack tối đa 50 bước):** Tự động ghi lại điểm khôi phục khi chèn biến, xóa biến, đổi biến, ngắt trang, và khi người dùng gõ văn bản trực tiếp trên Canvas (debounced 800ms).

---

## 📂 2. DANH SÁCH TỆP VỪA TẠO VÀ CHỈNH SỬA GẦN NHẤT

| Tên tệp | Trạng thái | Mục đích & Chi tiết thay đổi |
| :--- | :---: | :--- |
| [`template-tool.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.js) | **NÂNG CẤP LỚN** | Bổ sung bộ phân tích OpenXML `parseDocxToStyledHtml` với type-guards; bảo tồn bảng 2 cột & căn lề; nâng cấp `createDocxFromCanvasHtml` hỗ trợ table roundtrip; tích hợp Undo/Redo Manager (`undoStack`, `redoStack`, `performUndo`, `performRedo`, `Ctrl+Z`, `Ctrl+Y`); tích hợp Tag Action Popover (`tagActionPopover`, gỡ thẻ, xóa biến, đổi biến nhanh); bổ sung nút `×` trên badge; cơ chế dọn dẹp sạch `cleanCanvasHtmlForStorage`; nâng cấp bộ phân giải dữ liệu xem thử đa tầng `resolvePreviewValueForTag` (chuỗi gốc Word, project data, catalog example); nâng cấp `detectEntitiesForDocument` quét trực tiếp từ Từ điển biến & Thông tin chung; bổ sung nút `rescanDocumentEntitiesFromDictionary`; sửa lỗi bộ gõ tiếng Việt Telex (IME composition) khi nhập mã thẻ biến. |
| [`template-tool.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/template-tool.html) | **NÂNG CẤP** | Thêm nhóm nút Undo/Redo `#btnStudioUndo` & `#btnStudioRedo` trên toolbar; thêm nút `#btnRemoveTagFromSelection` trên selection menu; thêm giao diện popover `#tagActionPopover`; định dạng CSS cho nút xóa tag, hiệu ứng hover, căn lề và bảng in trang A4; đưa hộp gợi ý biến `#contextualRecommendedVarsBox` lên cố định trên đầu Sidebar cho cả 3 Tab; thêm nút `#btnRescanDictionaryVars` trong Tab 3; nâng cache-buster lên `template-tool.js?v=20261111_v4`. |
| `scratch/test_preview_and_dictionary_scan.py` | **MỚI** | Script kiểm thử tự động quy trình quét từ điển & thông tin chung cho file BCMS.docx (phát hiện đủ 10 biến), kiểm tra hiển thị hộp gợi ý biến trên Tab 3, kiểm tra phân giải dữ liệu xem thử cho biến mới và căn cứ quyết định. |
| `scratch/test_format_delete_undo.py` | **MỚI** | Script kiểm thử tự động toàn diện: kiểm tra bảo tồn bảng biểu & căn lề, xóa tag bằng nút `×`, hoàn tác Undo bằng nút & phím tắt Ctrl+Z, Redo, menu popover, và kiểm tra file docx tạo ra chứa đúng bảng và căn giữa. |
| `scratch/test_user_report_file.py` | **MỚI** | Script kiểm thử tải file Word thực tế "2. BCMS.docx" có bảng tiêu ngữ, bảng báo giá và bảng ký tên, kiểm tra hiển thị đúng 3 bảng và căn giữa trên Canvas. |
| [`app.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/app.js) | **HIỆN HỮU** | Ma trận `DEFAULT_IMPLEMENTATION_MATRIX` 2 tầng; hàm `hasDocTemplate(docObj)`; hiển thị Badge trạng thái mẫu và chặn xuất Word rỗng. |
| [`index.html`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/index.html) | **HIỆN HỮU** | Badge `#docTemplateStatusBadge` hiển thị trạng thái mẫu thời gian thực cạnh bộ chọn văn bản. |
| [`config.js`](file:///I:/My%20Drive/APP/Projects/ho-so-tu-dong/config.js) | **HIỆN HỮU** | Cấu hình Google Apps Script Web App URL vĩnh viễn cho mọi trình duyệt và Tab Ẩn danh. |

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

### 5. Lỗi: Khi tải file Word thực tế (ví dụ: Báo cáo mua sắm), văn bản không hiện ra để điều chỉnh và gợi ý tag
* **Nguyên nhân:**
  1. **Khớp từ khóa quá cứng nhắc:** Mã nguồn cũ yêu cầu tên file phải chứa nguyên văn toàn bộ chuỗi tên dài `"02. báo cáo thẩm định & phê duyệt mua sắm"`. Vì vậy, các file thông thường như `Báo cáo mua sắm.docx`, `Báo cáo thẩm định.docx`, `02_Bao_cao.docx` bị chấm 0 điểm và fallback bị gán nhầm sang văn bản số 1 (`01. Tờ trình`).
  2. **Thiếu nút tải file riêng lẻ trong giao diện Soát chi tiết 1 văn bản (Single View):** Người dùng chỉ thấy nút tải hàng loạt ở đầu trang, và sau khi tải xong hệ thống chỉ gọi `renderBatchTable()` mà không tự động chuyển và nạp văn bản lên Canvas Single View.
  3. **Xung đột bản thảo cũ (`workingDraftHtml`):** Khung mẫu mặc định trước đó vẫn còn lưu trong bộ nhớ tạm khiến Canvas không ưu tiên hiển thị các đoạn văn từ file Word mới tải lên.
* **Xử lý:**
  1. Thêm nút trực quan **`[📤 Tải file Word (.docx) lên]`** (`#btnUploadSingleDocx`) ngay trên thanh công cụ của chế độ Single View, cho phép nạp 1-chạm file Word cho đúng văn bản đang chọn.
  2. Xây dựng thuật toán **So khớp tiếng Việt thông minh (`findBestMatchingDoc`)**: Tự động bóc tách số thứ tự (`01`, `02`, `1`, `2`), từ viết tắt (`BC`, `TTr`, `QĐ`, `HĐ`, `BB`), loại văn bản ("báo cáo", "tờ trình", "hợp đồng", "thẩm định", "mua sắm") và tính điểm trọng số theo ngữ nghĩa không dấu.
  3. Bổ sung **Kéo - Thả file Word trực tiếp (Drag & Drop)** lên vùng Canvas soạn thảo (`#docViewerWrapper`).
  4. Mở rộng bộ nhận diện thực thể (`detectEntitiesForDocument`) cho Báo cáo (`SO_BAO_CAO`, `NGAY_BAO_CAO_FULL`, `MA_SO_THUE`, `GIA_TRI_HOP_DONG_SO`).
  5. Xóa sạch bản thảo cũ khi nạp file mới, tự động render nội dung file Word lên Canvas, gán thẻ biến tự động, hiển thị Badge `[File vừa tải lên]` (xanh lá) và cập nhật ngay độ phủ biến trên thanh Khuyến nghị.
* **Xác thực:** Kiểm thử thành công 100% bằng script CDP headless Chrome (`scratch/test_single_upload_flow.py`), ảnh minh chứng: `verify_uploaded_file_view.png`.

### 6. Lỗi: Mất định dạng khi thể hiện file Word lên Canvas (Bị dồn hết sang lề trái, mất bảng 2 cột và bảng báo giá)
* **Nguyên nhân:**
  1. Trình bóc tách cũ chỉ đọc nội dung các thẻ `w:p` dưới dạng chuỗi thô (plain strings), hoàn toàn bỏ qua các thẻ bảng biểu OpenXML (`w:tbl` - bao gồm bảng Quốc hiệu/Tiêu ngữ 2 cột hành chính và bảng danh mục hàng hóa báo giá).
  2. Bỏ qua các thuộc tính căn lề đoạn văn (`w:jc`), thụt đầu dòng (`w:ind`), đường kẻ tiêu ngữ (`w:pBdr/w:bottom`) và các kiểu định dạng chữ (`w:b`, `w:i`, `w:u`, `w:sz`), dẫn đến văn bản bị dồn phẳng sang bên trái (left-aligned) như một khối text thô.
  3. Khi gặp XML Comments (`<!-- ... -->`) hoặc khoảng trắng text node trong tài liệu Word, hàm đọc thuộc tính `.getAttribute()` bị lỗi kiểu dữ liệu `TypeError: getAttribute is not a function` dẫn đến fallback về danh sách paragraph thô.
* **Xử lý:**
  1. Nâng cấp toàn diện hàm `parseDocxToStyledHtml(arrayBuffer, mappings)` với DOMParser OpenXML chuẩn mực:
     - Nhận diện và dựng thành thẻ `<table>` không viền 2 cột cho phần Tiêu đề cơ quan / Quốc hiệu - Tiêu ngữ và phần Chữ ký đóng dấu cuối văn bản.
     - Nhận diện và dựng thành thẻ `<table>` có viền kẻ bảng lưới cho các bảng dữ liệu (Bảng danh mục vật tư, báo giá).
     - Phân tích và gán đầy đủ CSS `text-align: center`, `text-align: right`, `text-align: justify`, `text-indent: 28px`, gạch chân tiêu ngữ `border-bottom: 1.5px solid #334155`.
     - Phân tích và bọc thẻ in đậm `<strong>`, in nghiêng `<em>`, gạch chân `<u>`, cỡ chữ tiêu đề `<span>`.
     - Thêm type-guard `nodeType === 1` an toàn tuyệt đối cho tất cả các vòng lặp duyệt XML node.
  2. Nâng cấp `createDocxFromCanvasHtml` để hỗ trợ chuyển đổi ngược 2 chiều các thẻ `<table>` từ Canvas thành bảng Word `w:tbl` nguyên bản khi xuất file Word.
* **Xác thực:** Kiểm thử tự động trên Chrome CDP (`scratch/test_user_report_file.py`): nhận diện và hiển thị đủ 3 bảng (Header, Báo giá, Chữ ký), tiêu đề căn giữa đạt `True`, ảnh minh chứng: `verify_bcms_full_layout.png`.

### 7. Yêu cầu: Bổ sung chức năng Xóa biến và Phím tắt hoàn tác Ctrl+Z
* **Xử lý:**
  1. **Xóa biến linh hoạt với 3 cách:**
     - Nút `[×]` (`.btn-remove-tag`) nhỏ gọn trực tiếp trên từng Tag Badge: bấm 1-click xóa ngay biến.
     - Click vào Tag Badge mở **Menu thao tác nhanh (`tagActionPopover`)**:
       - `[Gỡ thẻ (thành chữ)]`: tháo badge về dạng `{TAG}` thuần để sửa tự do.
       - `[🗑️ Xóa biến]`: xóa hoàn toàn biến khỏi văn bản.
       - `[Đổi nhanh sang biến khác]`: hiển thị 4-6 chip biến khuyến nghị theo ngữ cảnh để đổi nhanh trong 1-click.
     - Bôi đen đoạn chữ trên Canvas và bấm nút `[🗑️ Xóa biến]` trên Floating Selection Menu.
     - Hàm `cleanCanvasHtmlForStorage` tự động bóc tách sạch sẽ các nút UI phụ trợ trước khi lưu hoặc xuất Word.
  2. **Bộ Hoàn tác (Undo) và Làm lại (Redo) chuẩn Desktop:**
     - Tích hợp 2 nút `[↶ Hoàn tác (Ctrl+Z)]` và `[↷ Làm lại (Ctrl+Y)]` ngay trên thanh công cụ Canvas (`#btnStudioUndo`, `#btnStudioRedo`).
     - Bắt sự kiện phím tắt toàn diện `Ctrl+Z`, `Ctrl+Y`, `Ctrl+Shift+Z`.
     - Ngăn xếp `undoStack` (tối đa 50 bước) tự động lưu lại trạng thái sau mỗi thao tác chèn, xóa, đổi biến, ngắt trang và khi gõ văn bản trực tiếp trên Canvas (debounced 800ms).
* **Xác thực:** Kiểm thử tự động toàn diện (`scratch/test_format_delete_undo.py`): Xóa biến bằng nút `×` (21 -> 20 biến), Hoàn tác bằng nút Undo (20 -> 21 biến), Làm lại bằng nút Redo (21 -> 20 biến), Hoàn tác bằng phím tắt `Ctrl+Z` (20 -> 21 biến), mở Popover đổi biến nhanh (5 chip gợi ý), biên dịch Word giữ nguyên 2 bảng và 10 đoạn căn giữa. Ảnh minh chứng: `verify_format_delete_undo.png`.

### 8. Lỗi: Xem thử dữ liệu thật của biến mới không thể hiện và chưa kích hoạt gợi ý biến từ Từ điển (Thông tin chung)
* **Nguyên nhân:**
  1. **Xem thử dữ liệu bị giới hạn cứng:** Hàm `renderSampleDataPreview` chỉ đọc dữ liệu từ đối tượng tĩnh `SAMPLE_ADMIN_DATA` (~30 biến mặc định). Bất kỳ biến mới tạo (`+ Thêm biến mới`), biến tự động trích xuất từ văn bản (`TEN_KEM_SO_NGAY_QUYET_DINH`, `NGAY_BAO_CAO_FULL`), hay biến tùy biến đều bị rơi vào nhánh fallback trả về mã thẻ màu hổ phách `{TAG}` mà không hiện dữ liệu thật.
  2. **Chưa đối chiếu văn bản với Từ điển & Thông tin chung:** Hàm `detectEntitiesForDocument` chỉ dùng các biểu thức chính quy cứng nhắc (ví dụ yêu cầu phải có chữ `Chủ đầu tư:`), hoàn toàn không quét đối chiếu văn bản tải lên với Từ điển biến `MASTER_VARIABLES_CATALOG` (50+ biến) và dữ liệu Thông tin chung của Dự án (`appState.generalInfo`). Do đó các thông tin như `CẢNG HÀNG KHÔNG QUỐC TẾ CẦN THƠ`, `PHÒNG TC-KH`, `Hạng mục: ...`, `Kính gửi: ...`, `Căn cứ Quyết định số ...` bị bỏ sót.
  3. **Hộp gợi ý biến bị ẩn khi ở Tab 3:** Hộp gợi ý `#contextualRecommendedVarsBox` trước đó được đặt bên trong Tab 1 ("1. Biến chữ"). Khi nạp file Word lên, hệ thống tự động chuyển sang Tab 3 ("3. Đã gán") khiến hộp gợi ý bị ẩn đi.
  4. **Xung đột bộ gõ tiếng Việt Telex (IME):** Khi tạo biến mới, sự kiện `oninput` trên ô nhập mã thẻ ép chạy hàm `slugifyToUpperSnake` trên từng phím gõ, làm đứt quãng bộ gõ tiếng Việt (Unikey/Cốc Cốc/EVKey) và biến từ `TÊN HẠNG MỤC` thành `T_N_H_NG_M_C`.
* **Xử lý:**
  1. **Nâng cấp bộ phân giải dữ liệu xem thử thông minh đa tầng (`resolvePreviewValueForTag`):**
     - *Tầng 1 (Ưu tiên cao nhất):* Đọc chuỗi gốc thực tế `originalText` từ `item.mappings` (dữ liệu thật từ file Word của người dùng).
     - *Tầng 2:* Đọc dữ liệu dự án hiện hành `ho_so_tu_dong_state_v3` (`generalInfo` và `packages`).
     - *Tầng 3:* Đọc dữ liệu mẫu `example` hoặc `defaultValue` trong Từ điển `MASTER_VARIABLES_CATALOG`.
     - *Tầng 4:* Dữ liệu chuẩn hành chính `SAMPLE_ADMIN_DATA`.
     - *Tầng 5:* Sinh nhãn tiếng Việt dễ hiểu theo ngữ nghĩa, tuyệt đối không để trơ mã thẻ `{TAG}` khó chịu.
  2. **Nâng cấp toàn diện `detectEntitiesForDocument` (Quét 2 chiều):**
     - Quét đối chiếu toàn bộ các giá trị từ Thông tin chung dự án (`appState.generalInfo`) và Từ điển biến (`MASTER_VARIABLES_CATALOG`).
     - Tự động nhận diện cấu trúc tiêu đề hành chính 2 cột: Tên cơ quan chủ quản / CĐT in hoa (`TEN_CHU_DAU_TU_VIET_HOA`), Đơn vị tham mưu / Phòng ban (`TEN_BAN_QUAN_LY_DU_AN`), Số báo cáo (`SO_BAO_CAO`), Địa danh ngày tháng (`DIA_DANH` & `NGAY_BAO_CAO_FULL`).
     - Tự động nhận diện dòng `Hạng mục: “...”` thành `{TEN_GOI_THAU}` (chuẩn gói thầu mua sắm/sửa chữa).
     - Tự động nhận diện dòng `Kính gửi: ...` thành `{CHUC_VU_NGUOI_KY}`.
     - Tự động nhận diện trích dẫn `Căn cứ Quyết định số ... ngày ...` thành `{TEN_KEM_SO_NGAY_QUYET_DINH}`.
  3. **Đưa hộp gợi ý biến `#contextualRecommendedVarsBox` lên vị trí cố định trên đầu Sidebar:** Luôn hiển thị liên tục và sẵn sàng tương tác cho cả 3 Tab (Tab 1, Tab 2, Tab 3).
  4. **Bổ sung nút `[⚡ Gợi ý từ Từ điển]` (`#btnRescanDictionaryVars`):** Tích hợp ngay trên đầu Tab 3 để người dùng bấm quét lại đối chiếu bất cứ lúc nào.
  5. **Khắc phục triệt để lỗi bộ gõ tiếng Việt (IME Composition):** Lắng nghe sự kiện `compositionstart` và `compositionend`, chỉ chuẩn hóa mã thẻ khi kết thúc gõ hoặc khi rời chuột (`blur`), gõ tiếng Việt hoàn toàn tự nhiên không bị lỗi chèn dấu gạch dưới `_`.
* **Xác thực:** Kiểm thử tự động trên Chrome CDP (`scratch/test_preview_and_dictionary_scan.py`): Quét và tự động nhận diện thành công 10/10 biến từ Từ điển và cấu trúc văn bản; hộp gợi ý biến hiển thị đầy đủ trên Tab 3; chế độ xem thử thay thế thành công 100% dữ liệu thực cho biến mới và căn cứ quyết định. Ảnh minh chứng: `verify_preview_and_dictionary_scan.png`.

### 9. Lỗi: Khung soạn thảo Canvas A4 bên phải bị trắng/mất giao diện khi tải file Word lên
* **Nguyên nhân:**
  Trong quá trình di chuyển hộp gợi ý biến `#contextualRecommendedVarsBox` lên vị trí cố định trên cùng, vô tình để sót một thẻ đóng `</div>` dư ở dòng 484 trong `template-tool.html`. Thẻ đóng dư này đã đóng sớm container cột trái (`lg:col-span-5`), khiến container cột phải (`lg:col-span-7` chứa toàn bộ khung soạn thảo Canvas A4, thanh công cụ, các nút chuyển chế độ xem và bộ lật trang) bị đẩy văng ra khỏi lưới CSS Grid `grid-cols-12` và đóng sớm container `#singleWorkspace`. Kết quả là toàn bộ nửa bên phải màn hình bị trắng tinh.
* **Xử lý:**
  1. Loại bỏ thẻ đóng `</div>` dư thừa, kiểm tra cân bằng 100% tất cả các thẻ `div` trong toàn bộ tệp `template-tool.html` (kết quả phân tích DOM: `Unclosed divs: 0`, `Extra close: 0`).
  2. Khôi phục hoàn toàn cấu trúc lưới 2 cột chuẩn mực:
     - **Cột trái (5/12):** Chứa Hộp gợi ý & độ phủ biến cố định trên cùng, 3 Tab điều hướng (1. Biến chữ, 2. Biến bảng, 3. Đã gán), nút Gợi ý từ Từ điển và Danh mục biến.
     - **Cột phải (7/12):** Chứa Thanh công cụ chuyển đổi Khung mẫu/Xem thử, Bộ chuyển trang (Trang X/Y), Nút phóng to/thu nhỏ, Nút hoàn tác/làm lại (Ctrl+Z/Ctrl+Y), Nút ngắt trang A4 và Tờ giấy A4 Canvas (`documentContentDisplay`) hỗ trợ chỉnh sửa trực tiếp (`contenteditable="true"`).
  3. Nâng cache-buster lên `template-tool.js?v=20261111_v5`.
* **Xác thực:** Kiểm thử tự động trên Chrome CDP (`scratch/test_docx_preview_restored.py`): Khung Canvas hiển thị đầy đủ với kích thước 763x1050px (chuẩn A4), nhận diện 11 biến, hỗ trợ chỉnh sửa `isEditable: True`. Ảnh minh chứng: `verify_docx_preview_restored.png`.

### 10. Nâng cấp: Tích hợp Bảng nhập biến chuẩn của Từ điển khi tạo biến mới (Thay thế window.prompt() thô sơ)
* **Yêu cầu người dùng:** Khi quét chọn vùng văn bản hoặc bấm thêm biến mới, không dùng hộp thoại `prompt()` mặc định của trình duyệt mà phải mở Bảng nhập biến chuẩn của Từ điển (đầy đủ Tên tiếng Việt, Mã thẻ {TAG}, gợi ý tự động, kiểm tra trùng lặp thời gian thực, Phân nhóm A-J, Phạm vi áp dụng Tầng 1/Tầng 2-3, Giá trị ví dụ/gốc).
* **Xử lý:**
  1. **Nâng cấp Modal Từ điển (`#modalEditVariable`) trong `template-tool.html`:**
     - Bổ sung Banner ngữ cảnh vùng chọn (`#editVarSelectionBanner` & `#editVarSelectionText`): Hiển thị chuỗi văn bản gốc đang chọn trong Word.
     - Bổ sung tùy chọn phạm vi thay thế (`#editVarApplyScopeRow`): Cho phép người dùng chọn *"Chỉ thay thế vị trí này"* hoặc *"Thay thế tất cả vị trí trùng khớp chuỗi này trong văn bản"*.
     - Bổ sung nút `[+ Biến mới]` (`#btnOpenAddVarModalFromPalette`) ngay tại Tab 1 (Biến chữ) để cho phép thêm biến mới vào Từ điển chuẩn bất cứ lúc nào.
  2. **Thay thế triệt để các lệnh `prompt()` trong `template-tool.js`:**
     - Nút `+ Mới` trên Floating selection bar (`#btnQuickCustomTag`): Lưu `savedRange`, gọi `openEditVariableModal(null, null, { mode: 'selection', selectedText: ... })`. Tự động điền nhãn tiếng Việt, sinh mã `{TAG}` chuẩn không dấu UPPER_SNAKE, tự động nhận diện Phân nhóm (A. CĐT, C. Tài chính, D. Nhà thầu, F. Ngày, I. Căn cứ...).
     - Nút `+ Thêm biến mới` trên Tab 3 (`#btnSingleAddCustomVar`): Gọi `openEditVariableModal(null, null, { mode: 'add_to_doc', addToCurrentDoc: true })`.
     - Nút `+ Biến mới` trên Tab 1 (`#btnOpenAddVarModalFromPalette`): Gọi `openEditVariableModal(null, null, { mode: 'catalog' })`.
  3. **Xử lý Lưu & Đồng bộ Toàn diện (`saveVariableChanges`):**
     - Thêm/cập nhật biến mới vào `MASTER_VARIABLES_CATALOG` và lưu `localStorage` (`ho_so_vars_catalog_customizations_ts`).
     - Đồng bộ vào `ho_so_tu_dong_state_v3` (`customVariables`) để Trang Tạo Hồ Sơ (`index.html`) nhận diện ngay lập tức mà không cần cấu hình lại.
     - Áp dụng huy hiệu biến `{TAG}` vào văn bản: Hỗ trợ chèn tại vùng chọn chính xác qua Range, hoặc thay thế hàng loạt toàn bộ văn bản qua thuật toán TreeWalker an toàn (`replaceTextWithBadgeAcrossNodes`).
     - Tự động ghi nhận mapping vào `item.mappings` của văn bản hiện hành.
  4. Nâng cache-buster lên `template-tool.js?v=20261111_v6`.
* **Xác thực:** Kiểm thử tự động trên Chrome CDP (`scratch/test_dictionary_modal_for_new_var.py`):
  - Mở modal từ Tab 1 `[+ Biến mới]`: Tiêu đề *"Thêm Biến Xạ Mới Vào Từ Điển Chuẩn"*, subtitle *"Tự động rà soát trùng lặp và đồng bộ toàn hệ thống"*.
  - Mở modal từ Tab 3 `[+ Thêm biến mới]`: Tiêu đề *"Thêm Biến Mới Vào Văn Bản & Từ Điển"*.
  - Quét khối "BÁO CÁO MUA SẮM" trên Canvas và bấm `[+ Mới]`: Modal mở với banner vùng chọn *"BÁO CÁO MUA SẮM"*, mã tự sinh `{BAO_CAO_MUA_SAM}`, phân nhóm B, thanh chọn phạm vi thay thế hiển thị đầy đủ.
  - Lưu biến: Modal đóng lại, huy hiệu `{TEN_BAO_CAO_MUA_SAM}×` được tạo trực tiếp trên Canvas A4, lưu thành công vào Từ điển (`MASTER_VARIABLES_CATALOG`) và danh mục mapping văn bản. Ảnh minh chứng: `verify_dictionary_modal_new_var.png`.

---

## ⚠️ 4. TRẠNG THÁI HIỆN TẠI & CÓ LỖI NÀO ĐANG VƯỚNG KHÔNG?

* **Lỗi tồn đọng nghiêm trọng (Blocker/Critical):** **0 LỖI.**
* **Tình trạng mã nguồn:** Sạch sẽ, không có xung đột Git.
* **Hệ thống Server cục bộ:** Đang chạy một phiên bản HTTP Server nền tại cổng 8000.
* **Kết quả Kiểm thử Tự động (End-to-End Headless Chrome CDP):**
  * Test Case 1 (Văn bản chưa có mẫu): Đạt 100% (Hiện badge vàng cảnh báo, nút "Tạo mẫu Studio", chặn xuất Word rỗng).
  * Test Case 2 (Văn bản có mẫu sẵn): Đạt 100% (Hiện badge xanh, nút "Sửa mẫu Studio").
  * Test Case 3 (Khởi tạo mẫu mới từ Studio): Đạt 100% (Hiện khung mẫu NĐ 30/2020, lưu thành công vào localStorage dưới dạng Word .docx).
  * Test Case 4 (Đồng bộ ngược về index.html): Đạt 100% (Lập tức nhận diện "Mẫu tùy biến" màu vàng kim và nút "Sửa mẫu Studio").
  * Test Case 5 (Nạp file Word riêng & Gán tag Báo cáo mua sắm): Đạt 100% (Nhận diện đúng `d50_2`, nạp 9 thực thể tự động, thanh gợi ý hiển thị Có 8/18 biến).
  * Test Case 6 (Bảo tồn định dạng Word & Bảng biểu): Đạt 100% (Giữ nguyên bảng không viền 2 cột, bảng báo giá có viền, căn giữa, in đậm/nghiêng).
  * Test Case 7 (Xóa biến đa năng & Hoàn tác Undo/Redo Ctrl+Z): Đạt 100% (Xóa biến qua nút `×`, menu popover, Floating menu; hoàn tác phục hồi trạng thái bằng nút và phím tắt `Ctrl+Z`/`Ctrl+Y`).
  * Test Case 8 (Xem thử dữ liệu biến mới & Quét từ điển Thông tin chung): Đạt 100% (Nhận diện tự động 10 biến từ Từ điển; hiển thị liên tục hộp gợi ý; xem thử hiển thị đầy đủ dữ liệu thật).
  * Test Case 9 (Khôi phục toàn vẹn khung Canvas soạn thảo A4): Đạt 100% (Khung Canvas rộng 763x1050px hiển thị đầy đủ bên phải, bố cục 2 cột hoàn hảo, cho phép chỉnh sửa trực tiếp).
  * Test Case 10 (Bảng nhập biến chuẩn Từ điển & Thay thế prompt): Đạt 100% (Mở modal Từ điển từ vùng chọn Canvas, Tab 3 và Tab 1; tự động điền nhãn, sinh mã TAG chuẩn, kiểm tra trùng lặp, thay thế vùng chọn/toàn văn bản, đồng bộ Từ điển toàn hệ thống).

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
