/**
 * =========================================================================
 * FILE CẤU HÌNH TOÀN CỤC — DỰ ÁN TẠO HỒ SƠ TỰ ĐỘNG
 * =========================================================================
 * Cấu hình tại file này sẽ tự động áp dụng vĩnh viễn cho TẤT CẢ các trình duyệt:
 * Cốc Cốc, Google Chrome, Microsoft Edge, Firefox... và KỂ CẢ CHẾ ĐỘ ẨN DANH (Incognito)!
 * 
 * Khi mở phần mềm trên bất kỳ máy tính nào có Google Drive, hệ thống sẽ tự động
 * kết nối về Google Sheet trung tâm này mà không cần phải cài đặt lại.
 * =========================================================================
 */
window.APP_CONFIG = {
    // 1. Đường link Google Apps Script Web App (URL kết thúc bằng /exec)
    GSHEET_API_URL: "https://script.google.com/macros/s/AKfycbybkIhpHZA15Abwpn5MAtZgXyX52gKxACvpmUZpiFa7rIjeYfjc5Yne4uGoGa5bnpcz/exec",

    // 2. Mật mã Quản trị viên Admin (mặc định: admin123)
    GSHEET_ADMIN_KEY: "admin123",

    // 3. Tự động tải dữ liệu từ Google Sheets về khi mở ứng dụng (Auto-Pull)
    AUTO_PULL_ON_LOAD: true,

    // 4. Tự động đẩy thay đổi lên Google Sheets khi Admin chỉnh sửa (Auto-Push)
    AUTO_PUSH_ON_CHANGE: true
};
