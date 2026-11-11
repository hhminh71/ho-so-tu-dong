// Template Studio 2.0 — Chuẩn Hóa & Đóng Gói Bộ Template Word (.docx)
// Chuyên biệt hóa • Chống chồng chéo biến xạ • Xử lý hàng loạt • Không ghi đè Excel
(function () {
    "use strict";

    // -------------------------------------------------------------
    // Master Variables Catalog (4-Tier Scoping & Anti-Collision)
    // -------------------------------------------------------------
    const MASTER_VARIABLES_CATALOG = [
        // A. Chủ đầu tư (Tầng 1 - Dùng chung)
        { stt: 1, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Chủ đầu tư (*)", tag: "TEN_CHU_DAU_TU", isGeneral: true, example: "Cảng Hàng không Quốc tế Cần Thơ" },
        { stt: 2, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Chủ đầu tư (IN HOA)", tag: "TEN_CHU_DAU_TU_VIET_HOA", isGeneral: true, example: "CẢNG HÀNG KHÔNG QUỐC TẾ CẦN THƠ" },
        { stt: 3, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Ban QLDA / Phòng ban (*)", tag: "TEN_BAN_QUAN_LY_DU_AN", isGeneral: true, example: "PHÒNG KỸ THUẬT HẠ TẦNG" },
        { stt: 4, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Cơ quan trình quyết định", tag: "CO_QUAN_TRINH", isGeneral: true, example: "Trưởng ban Điều hành dự án" },
        { stt: 5, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Cấp quyết định đầu tư", tag: "CAP_QUYET_DINH_DAU_TU", isGeneral: true, example: "Tổng công ty Cảng hàng không Việt Nam (TCT)" },
        { stt: 6, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Địa danh phát hành văn bản (*)", tag: "DIA_DANH", isGeneral: true, example: "Cần Thơ" },
        { stt: 7, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Tỉnh / Thành phố", tag: "TINH_THANH_PHO", isGeneral: true, example: "TP. Cần Thơ" },
        { stt: 8, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Địa chỉ trụ sở CĐT", tag: "DIA_CHI_TRU_SO", isGeneral: true, example: "179B Lê Hồng Phong, Trà An, Bình Thủy, TP. Cần Thơ" },
        { stt: 9, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Người ký quyết định CĐT (*)", tag: "NGUOI_KY_CDT", isGeneral: true, example: "Nguyễn Văn A" },
        { stt: 10, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ người ký CĐT", tag: "CHUC_VU_NGUOI_KY", isGeneral: true, example: "Giám đốc" },
        { stt: 11, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Trưởng ban Điều hành dự án", tag: "TRUONG_BAN_DHDA", isGeneral: true, example: "Trần Văn B" },
        { stt: 12, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ Trưởng ban ĐHDA", tag: "CHUC_VU_TRUONG_BAN", isGeneral: true, example: "Trưởng phòng Kỹ thuật hạ tầng" },
        { stt: 13, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Kế toán trưởng", tag: "KE_TOAN_TRUONG", isGeneral: true, example: "Lê Thị C" },
        { stt: 14, tier: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ Kế toán trưởng", tag: "CHUC_VU_KE_TOAN", isGeneral: true, example: "Kế toán trưởng" },

        // B. Dự án & Gói thầu (Tầng 1 & Tầng 2)
        { stt: 15, tier: 1, groupKey: "B", group: "B. Dự án & Gói", label: "Tên dự án (*)", tag: "TEN_DU_AN", isGeneral: true, example: "Sửa chữa góc cua đường khẩn nguy chữa cháy..." },
        { stt: 16, tier: 1, groupKey: "B", group: "B. Dự án & Gói", label: "Tên công trình", tag: "TEN_CONG_TRINH", isGeneral: true, example: "Sửa chữa góc cua đường khẩn nguy chữa cháy..." },
        { stt: 17, tier: 1, groupKey: "B", group: "B. Dự án & Gói", label: "Nguồn vốn", tag: "NGUON_VON", isGeneral: true, example: "Quỹ đầu tư phát triển TCT" },
        { stt: 18, tier: 2, groupKey: "B", group: "B. Dự án & Gói", label: "Tên gói thầu (*)", tag: "TEN_GOI_THAU", isGeneral: false, example: "Thi công XDCT sửa chữa góc cua đường khẩn nguy" },
        { stt: 19, tier: 2, groupKey: "B", group: "B. Dự án & Gói", label: "Hình thức LCNT", tag: "HINH_THUC_LCNT", isGeneral: false, example: "Chỉ định thầu rút gọn" },
        { stt: 20, tier: 2, groupKey: "B", group: "B. Dự án & Gói", label: "Loại hợp đồng", tag: "LOAI_HOP_DONG", isGeneral: false, example: "Trọn gói" },
        { stt: 21, tier: 2, groupKey: "B", group: "B. Dự án & Gói", label: "Thời gian thực hiện gói thầu", tag: "THOI_GIAN_THUC_HIEN", isGeneral: false, example: "30 ngày" },
        { stt: 22, tier: 2, groupKey: "B", group: "B. Dự án & Gói", label: "Thời gian tổ chức LCNT", tag: "THOI_GIAN_TO_CHUC", isGeneral: false, example: "Quý I/2027" },

        // C. Tài chính (Tầng 2)
        { stt: 23, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Giá gói thầu (số) (*)", tag: "GIA_GOI_THAU_SO", isGeneral: false, example: "850.000.000" },
        { stt: 24, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Giá gói thầu (chữ) (*)", tag: "GIA_GOI_THAU_CHU", isGeneral: false, example: "Tám trăm năm mươi triệu đồng chẵn" },
        { stt: 25, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Giá trị hợp đồng (số)", tag: "GIA_TRI_HOP_DONG_SO", isGeneral: false, example: "835.000.000" },
        { stt: 26, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Giá trị hợp đồng (chữ)", tag: "GIA_TRI_HOP_DONG_CHU", isGeneral: false, example: "Tám trăm ba mươi lăm triệu đồng" },
        { stt: 27, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Giá trị giảm giá", tag: "GIA_TRI_GIAM_GIA", isGeneral: false, example: "15.000.000" },
        { stt: 28, tier: 2, groupKey: "C", group: "C. Tài chính", label: "Chi phí tư vấn", tag: "CHI_PHI_TU_VAN", isGeneral: false, example: "8.000.000" },
        { stt: 29, tier: 1, groupKey: "C", group: "C. Tài chính", label: "Kho bạc Nhà nước / Nơi giao dịch", tag: "KHO_BAC_NHA_NUOC", isGeneral: true, example: "Kho bạc Nhà nước Cần Thơ" },

        // D. Nhà thầu (Tầng 2)
        { stt: 30, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (*)", tag: "TEN_NHA_THAU", isGeneral: false, example: "Công ty TNHH Xây dựng Giao thông Miền Tây" },
        { stt: 31, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (IN HOA)", tag: "TEN_NHA_THAU_VIET_HOA", isGeneral: false, example: "CÔNG TY TNHH XÂY DỰNG GIAO THÔNG MIỀN TÂY" },
        { stt: 32, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (viết tắt)", tag: "TEN_NHA_THAU_VIET_TAT", isGeneral: false, example: "MT-CONS" },
        { stt: 33, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Người đại diện nhà thầu", tag: "DAI_DIEN_NHA_THAU", isGeneral: false, example: "Lê Hoàng E" },
        { stt: 34, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Chức vụ đại diện nhà thầu", tag: "CHUC_VU_DAI_DIEN", isGeneral: false, example: "Tổng Giám đốc" },
        { stt: 35, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Địa chỉ trụ sở nhà thầu", tag: "DIA_CHI_NHA_THAU", isGeneral: false, example: "Số 45 đường CMT8, Bình Thủy, Cần Thơ" },
        { stt: 36, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Mã số thuế nhà thầu", tag: "MA_SO_THUE", isGeneral: false, example: "1807654321" },

        // E. Số hiệu VB (Tầng 3 - Định danh từng văn bản riêng biệt để chống chồng chéo)
        { stt: 37, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số tờ trình KHLCNT", tag: "SO_TO_TRINH", isGeneral: false, example: "11/ĐKNCC/TTr-KTHT" },
        { stt: 38, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số quyết định KHLCNT", tag: "SO_QUYET_DINH", isGeneral: false, example: "968/QĐ-CHKQTCT" },
        { stt: 39, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số giấy mời thương thảo", tag: "SO_GIAY_MOI", isGeneral: false, example: "GM-BQLDA" },
        { stt: 40, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số biên bản hoàn thiện", tag: "SO_BIEN_BAN_HOAN_THIEN", isGeneral: false, example: "04/BB-HT" },
        { stt: 41, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số tờ trình KQLCNT", tag: "SO_TO_TRINH_KQLCNT", isGeneral: false, example: "14/ĐKNCC/TTr-KTHT" },
        { stt: 42, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số quyết định KQLCNT", tag: "SO_QUYET_DINH_KQLCNT", isGeneral: false, example: "1143/QĐ-CHKQTCT" },
        { stt: 43, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số hợp đồng kinh tế", tag: "SO_HOP_DONG", isGeneral: false, example: "26076" },
        { stt: 44, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Số công văn tham gia", tag: "SO_CONG_VAN_THAM_GIA", isGeneral: false, example: "315/CV-HT" },
        { stt: 44.1, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Thời gian họp hoàn thiện HĐ", tag: "THOI_GIAN_HOP", isGeneral: false, example: "08 giờ 30 phút, ngày 15/07/2025" },
        { stt: 44.2, tier: 3, groupKey: "E", group: "E. Số hiệu VB", label: "Địa điểm họp hoàn thiện HĐ", tag: "DIA_DIEM_HOP", isGeneral: false, example: "Văn phòng Ban Quản lý dự án" },

        // F. Ngày tháng ngắn dd/mm/yyyy (Tầng 3)
        { stt: 45, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Tờ trình KHLCNT", tag: "NGAY_TO_TRINH", isGeneral: false, example: "10/02/2027" },
        { stt: 46, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Quyết định KHLCNT", tag: "NGAY_QUYET_DINH", isGeneral: false, example: "11/02/2027" },
        { stt: 47, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Giấy mời", tag: "NGAY_GIAY_MOI", isGeneral: false, example: "11/02/2027" },
        { stt: 48, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Biên bản hoàn thiện", tag: "NGAY_BIEN_BAN", isGeneral: false, example: "14/02/2027" },
        { stt: 49, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Tờ trình KQLCNT", tag: "NGAY_TO_TRINH_KQLCNT", isGeneral: false, example: "31/08/2026" },
        { stt: 50, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Quyết định KQLCNT", tag: "NGAY_QUYET_DINH_KQLCNT", isGeneral: false, example: "03/09/2026" },
        { stt: 51, tier: 3, groupKey: "F", group: "F. Ngày (ngắn)", label: "Ngày Hợp đồng", tag: "NGAY_HOP_DONG", isGeneral: false, example: "15/02/2027" },

        // G. Ngày tháng đầy đủ - Dùng cho Tiêu đề văn bản (Tầng 3)
        { stt: 52, tier: 3, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Tờ trình KHLCNT (Đầy đủ)", tag: "NGAY_TO_TRINH_FULL", isGeneral: false, example: "ngày 10 tháng 02 năm 2027" },
        { stt: 53, tier: 3, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Quyết định KHLCNT (Đầy đủ)", tag: "NGAY_QUYET_DINH_FULL", isGeneral: false, example: "ngày 11 tháng 02 năm 2027" },
        { stt: 54, tier: 3, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Giấy mời (Đầy đủ)", tag: "NGAY_GIAY_MOI_FULL", isGeneral: false, example: "ngày 11 tháng 02 năm 2027" },
        { stt: 55, tier: 3, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Biên bản (Đầy đủ)", tag: "NGAY_BIEN_BAN_FULL", isGeneral: false, example: "ngày 14 tháng 02 năm 2027" },
        { stt: 56, tier: 3, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Hợp đồng (Đầy đủ)", tag: "NGAY_HOP_DONG_FULL", isGeneral: false, example: "ngày 15 tháng 02 năm 2027" },

        // H. Tên trích dẫn căn cứ hỗn hợp (Tầng 4)
        { stt: 57, tier: 4, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Tờ trình", tag: "TEN_KEM_SO_NGAY_TO_TRINH", isGeneral: false, example: "Tờ trình 11/ĐKNCC/TTr-KTHT ngày 10/02/2027" },
        { stt: 58, tier: 4, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Quyết định", tag: "TEN_KEM_SO_NGAY_QUYET_DINH", isGeneral: false, example: "Quyết định 968/QĐ-CHKQTCT ngày 11/02/2027" },
        { stt: 59, tier: 4, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Giấy mời", tag: "TEN_KEM_SO_NGAY_GIAY_MOI", isGeneral: false, example: "Giấy mời GM-BQLDA ngày 11/02/2027" },
        { stt: 60, tier: 4, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Biên bản", tag: "TEN_KEM_SO_NGAY_BIEN_BAN", isGeneral: false, example: "Biên bản hoàn thiện hợp đồng 04/BB-HT ngày 14/02/2027" },
        { stt: 61, tier: 4, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Hợp đồng", tag: "TEN_KEM_SO_NGAY_HOP_DONG", isGeneral: false, example: "Hợp đồng kinh tế 26076 ngày 15/02/2027" },

        // I. Căn cứ pháp lý
        { stt: 62, tier: 1, groupKey: "I", group: "I. Căn cứ pháp lý", label: "Căn cứ pháp lý chung (*)", tag: "CAN_CU_PHAP_LY_CHUNG", isGeneral: true, example: "Căn cứ Luật Đấu thầu số 22/2023/QH15..." }
    ];

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // Master Procurement Matrix & Implementation Matrix Defaults (Synced with app.js)
    // -------------------------------------------------------------
    const DEFAULT_PROCUREMENT_MATRIX = JSON.parse("{\"system\": \"Hệ thống Quản lý & Tự động xuất Hồ sơ Mua sắm, Xây lắp\", \"version\": \"3.0\", \"legalBases\": [\"Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023\", \"Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ\", \"Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 về công tác văn thư\"], \"procurementTypes\": [{\"id\": \"duoi_50_trieu\", \"code\": \"D50\", \"name\": \"1. Mua sắm (Dưới 50 triệu)\", \"badge\": \"< 50 triệu\", \"badgeColor\": \"emerald\", \"description\": \"Áp dụng mua sắm tài sản, thiết bị, sửa chữa thường xuyên dưới 50 triệu đồng theo dự toán nội bộ.\", \"threshold\": 50000000, \"phases\": [{\"phaseId\": \"chuan_bi\", \"phaseName\": \"Giai đoạn Chuẩn bị\", \"documents\": [{\"id\": \"d50_1\", \"code\": \"01.TTr-MS\", \"name\": \"01. Tờ trình phê duyệt chủ trương và dự toán\", \"desc\": \"Tờ trình đơn vị đề xuất mua sắm hàng hóa / sửa chữa\", \"requiredVars\": [\"TEN_DON_VI\", \"SO_TO_TRINH\", \"NGAY_TO_TRINH\", \"TEN_HANG_MUC\", \"LY_DO_MUA_SAM\", \"TONG_MUC_DAU_TU\", \"NGUON_VON\", \"TRUONG_DON_VI\"]}, {\"id\": \"d50_2\", \"code\": \"02.BC-MS\", \"name\": \"02. Báo cáo thẩm định & phê duyệt mua sắm\", \"desc\": \"Báo cáo phê duyệt kết quả mua sắm dưới 50 triệu\", \"requiredVars\": [\"TEN_DON_VI\", \"SO_BAO_CAO\", \"NGAY_BAO_CAO\", \"TEN_HANG_MUC\", \"TEN_NHA_THAU\", \"MA_SO_THUE\", \"GIA_TRI_MUA_SAM\", \"NGUOI_PHE_DUYET\"]}]}, {\"phaseId\": \"thuc_hien\", \"phaseName\": \"Giai đoạn Ký kết & Nghiệm thu\", \"documents\": [{\"id\": \"d50_3\", \"code\": \"03.HD-KT\", \"name\": \"03. Hợp đồng kinh tế / Đơn đặt hàng\", \"desc\": \"Hợp đồng mua bán hoặc sửa chữa\", \"requiredVars\": [\"TEN_DON_VI\", \"DAI_DIEN_BEN_A\", \"TEN_NHA_THAU\", \"DAI_DIEN_BEN_B\", \"GIA_TRI_HOP_DONG\", \"THOI_GIAN_THUC_HIEN\"]}, {\"id\": \"d50_4\", \"code\": \"04.BB-NT\", \"name\": \"04. Biên bản nghiệm thu bàn giao và thanh lý\", \"desc\": \"Biên bản bàn giao thiết bị / hoàn thành sửa chữa\", \"requiredVars\": [\"TEN_DON_VI\", \"TEN_NHA_THAU\", \"NGAY_NGHIEM_THU\", \"NOI_DUNG_CONG_VIEC\", \"GIA_TRI_QUYET_TOAN\"]}]}]}, {\"id\": \"duoi_100_trieu\", \"code\": \"D100\", \"name\": \"2. Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)\", \"badge\": \"50tr - 100tr\", \"badgeColor\": \"teal\", \"description\": \"Áp dụng chỉ định thầu siêu nhỏ không qua mạng theo Khoản 4 Điều 23 Luật Đấu thầu 2023.\", \"threshold\": 100000000, \"phases\": [{\"phaseId\": \"chuan_bi\", \"phaseName\": \"Giai đoạn Chuẩn bị\", \"documents\": [{\"id\": \"d100_1\", \"code\": \"01.TTr-KHLCNT\", \"name\": \"01. Tờ trình phê duyệt Kế hoạch LCNT\", \"desc\": \"Tờ trình phê duyệt KHLCNT gói mua sắm thường xuyên\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_GOI_THAU\", \"GIA_GOI_THAU\", \"HINH_THUC_LCNT\", \"NGUOI_TRINH\"]}, {\"id\": \"d100_2\", \"code\": \"02.QD-KHLCNT\", \"name\": \"02. Quyết định phê duyệt Kế hoạch LCNT\", \"desc\": \"Quyết định phê duyệt của Người có thẩm quyền\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"SO_QUYET_DINH\", \"NGAY_QUYET_DINH\", \"TEN_GOI_THAU\", \"NGUOI_KY_CDT\"]}]}, {\"phaseId\": \"thuc_hien\", \"phaseName\": \"Giai đoạn Ký kết & Thanh lý\", \"documents\": [{\"id\": \"d100_3\", \"code\": \"03.BB-TT\", \"name\": \"03. Biên bản thương thảo hoàn thiện đơn hàng\", \"desc\": \"Biên bản thống nhất giá và tiến độ giao hàng\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_NHA_THAU\", \"GIA_THUONG_THAO\", \"THOI_GIAN_GIAO_HANG\"]}, {\"id\": \"d100_4\", \"code\": \"04.HD-KT\", \"name\": \"04. Hợp đồng kinh tế và biên bản giao nhận\", \"desc\": \"Hợp đồng kinh tế trọn gói\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_NHA_THAU\", \"GIA_TRI_HOP_DONG\", \"KHO_BAC_NHA_NUOC\"]}]}]}, {\"id\": \"chao_gia_han_che\", \"code\": \"CGHC\", \"name\": \"3. Chào giá cạnh tranh hạn chế (Nội bộ)\", \"badge\": \"Chào giá NB\", \"badgeColor\": \"cyan\", \"description\": \"Gửi thư mời chào giá đến ít nhất 3 nhà thầu có năng lực để so sánh giá cạnh tranh.\", \"threshold\": 500000000, \"phases\": [{\"phaseId\": \"chuan_bi\", \"phaseName\": \"Giai đoạn Chuẩn bị\", \"documents\": [{\"id\": \"cghc_1\", \"code\": \"01.TTr-CT\", \"name\": \"01. Tờ trình phê duyệt chủ trương chào giá\", \"desc\": \"Tờ trình chủ trương mua sắm cạnh tranh\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_GOI_THAU\", \"GIA_GOI_THAU\"]}, {\"id\": \"cghc_2\", \"code\": \"02.BC-MS\", \"name\": \"02. Báo cáo đề xuất phương án chào giá hạn chế\", \"desc\": \"Đề xuất danh sách ít nhất 3 nhà thầu\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"DANH_SACH_3_NHA_THAU\"]}, {\"id\": \"cghc_3\", \"code\": \"03.TB-CG\", \"name\": \"03. Thư mời chào giá kèm bảng yêu cầu kỹ thuật\", \"desc\": \"Gửi các nhà thầu nộp thư báo giá\", \"requiredVars\": [\"TEN_NHA_THAU\", \"HAN_NOP_BAO_GIA\", \"YEU_CAU_KY_THUAT\"]}]}, {\"phaseId\": \"thuc_hien\", \"phaseName\": \"Giai đoạn Đánh giá & Trao thầu\", \"documents\": [{\"id\": \"cghc_4\", \"code\": \"04.BB-MT\", \"name\": \"04. Biên bản mở thư chào giá\", \"desc\": \"Biên bản mở niêm phong các báo giá\", \"requiredVars\": [\"THOI_GIAN_MO_THAU\", \"DANH_SACH_GIA_CHAO\"]}, {\"id\": \"cghc_5\", \"code\": \"05.BB-DG\", \"name\": \"05. Biên bản họp đánh giá so sánh báo giá\", \"desc\": \"So sánh kỹ thuật và đơn giá\", \"requiredVars\": [\"TO_CHUYEN_GIA\", \"DON_VI_GIA_THAP_NHAT\"]}, {\"id\": \"cghc_6\", \"code\": \"06.BB-TT\", \"name\": \"06. Biên bản thương thảo hợp đồng\", \"desc\": \"Thương thảo với đơn vị có giá tốt nhất\", \"requiredVars\": [\"TEN_NHA_THAU_TRUNG\", \"GIA_THUONG_THAO\"]}, {\"id\": \"cghc_7\", \"code\": \"07.BC-DG\", \"name\": \"07. Báo cáo đánh giá kết quả chào giá\", \"desc\": \"Báo cáo trình lãnh đạo phê duyệt\", \"requiredVars\": [\"TEN_NHA_THAU_TRUNG\", \"GIA_DE_NGHI\"]}, {\"id\": \"cghc_8\", \"code\": \"08.TB-KQ\", \"name\": \"08. Thông báo kết quả chào giá\", \"desc\": \"Thông báo gửi các đơn vị tham gia\", \"requiredVars\": [\"TEN_NHA_THAU_TRUNG\", \"GIA_TRUNG_THAU\"]}, {\"id\": \"cghc_9\", \"code\": \"09.HD-KT\", \"name\": \"09. Hợp đồng kinh tế\", \"desc\": \"Hợp đồng kinh tế ký kết\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_NHA_THAU_TRUNG\", \"GIA_TRI_HOP_DONG\"]}]}]}, {\"id\": \"chi_dinh_thau_rut_gon\", \"code\": \"CDTRG\", \"name\": \"4. Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)\", \"badge\": \"CĐT Rút Gọn\", \"badgeColor\": \"emerald\", \"description\": \"Quy trình chuẩn theo Điều 78 Nghị định 24/2024/NĐ-CP (Tư vấn, Xây lắp, Hàng hóa).\", \"threshold\": 1000000000, \"phases\": [{\"phaseId\": \"chuan_bi\", \"phaseName\": \"Giai đoạn Chuẩn bị\", \"documents\": [{\"id\": \"cdtrg_1\", \"code\": \"01.TTr-KHLCNT\", \"name\": \"01. Tờ trình phê duyệt Kế hoạch LCNT\", \"desc\": \"Trình cấp thẩm quyền phê duyệt KHLCNT\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_DU_AN\", \"TEN_GOI_THAU\", \"GIA_GOI_THAU_SO\"]}, {\"id\": \"cdtrg_2\", \"code\": \"02.QD-KHLCNT\", \"name\": \"02. Quyết định phê duyệt Kế hoạch LCNT\", \"desc\": \"Quyết định phê duyệt KHLCNT\", \"requiredVars\": [\"SO_QUYET_DINH_KHLCNT\", \"NGAY_QUYET_DINH\", \"NGUOI_KY_CDT\"]}, {\"id\": \"cdtrg_3\", \"code\": \"03.GM-TT\", \"name\": \"03. Giấy mời tham gia hoàn thiện hợp đồng\", \"desc\": \"Gửi nhà thầu được chỉ định\", \"requiredVars\": [\"TEN_BAN_QUAN_LY_DU_AN\", \"TEN_NHA_THAU\", \"THOI_GIAN_HOP\", \"DIA_DIEM_HOP\"]}]}, {\"phaseId\": \"thuc_hien\", \"phaseName\": \"Giai đoạn Hoàn thiện & Phê duyệt\", \"documents\": [{\"id\": \"cdtrg_4\", \"code\": \"04.BB-HT\", \"name\": \"04. Biên bản hoàn thiện hợp đồng\", \"desc\": \"Biên bản hoàn thiện điều khoản hợp đồng\", \"requiredVars\": [\"SO_BIEN_BAN_HOAN_THIEN\", \"GIA_TRI_HOP_DONG_SO\", \"GIA_TRI_HOP_DONG_CHU\", \"DAI_DIEN_NHA_THAU\"]}, {\"id\": \"cdtrg_5\", \"code\": \"05.TTr-KQLCNT\", \"name\": \"05. Tờ trình phê duyệt kết quả chỉ định thầu\", \"desc\": \"Trình phê duyệt chỉ định thầu\", \"requiredVars\": [\"SO_TO_TRINH\", \"CO_QUAN_TRINH\", \"TRUONG_BAN_DHDA\", \"TEN_NHA_THAU\"]}, {\"id\": \"cdtrg_6\", \"code\": \"06.QD-KQLCNT\", \"name\": \"06. Quyết định phê duyệt kết quả chỉ định thầu\", \"desc\": \"Quyết định phê duyệt trúng thầu\", \"requiredVars\": [\"SO_QUYET_DINH\", \"NGUOI_KY_CDT\", \"GIA_TRI_HOP_DONG_SO\", \"THOI_GIAN_THUC_HIEN\"]}, {\"id\": \"cdtrg_7\", \"code\": \"07.HD-KT\", \"name\": \"07. Hợp đồng kinh tế\", \"desc\": \"Hợp đồng kinh tế chính thức\", \"requiredVars\": [\"TEN_CHU_DAU_TU\", \"TEN_NHA_THAU\", \"GIA_TRI_HOP_DONG_SO\", \"KHO_BAC_NHA_NUOC\"]}]}]}, {\"id\": \"chi_dinh_thau_thong_thuong\", \"code\": \"CDTTT\", \"name\": \"5. Chỉ định thầu quy trình thông thường (HSYC & HSĐX)\", \"badge\": \"CĐT Thông Thường\", \"badgeColor\": \"indigo\", \"description\": \"Áp dụng gói thầu cần lập Hồ sơ yêu cầu, đánh giá Hồ sơ đề xuất và thẩm định kết quả.\", \"threshold\": 5000000000, \"phases\": [{\"phaseId\": \"chuan_bi_hsyc\", \"phaseName\": \"Giai đoạn Chuẩn bị Hồ sơ yêu cầu\", \"documents\": [{\"id\": \"cdttt_1\", \"code\": \"01.QD-TCG\", \"name\": \"01. Quyết định thành lập Tổ chuyên gia & Tổ thẩm định\", \"desc\": \"Thành lập ban bệ tổ chức chỉ định thầu\", \"requiredVars\": [\"TO_TRUONG_CHUYEN_GIA\", \"TO_TRUONG_THAM_DINH\"]}, {\"id\": \"cdttt_2\", \"code\": \"02.TTr-HSYC\", \"name\": \"02. Tờ trình đề nghị phê duyệt Hồ sơ yêu cầu (E-HSYC)\", \"desc\": \"Trình duyệt E-HSYC\", \"requiredVars\": [\"TEN_GOI_THAU\", \"TIEU_CHUAN_DANH_GIA\"]}, {\"id\": \"cdttt_3\", \"code\": \"03.BC-TD-HSYC\", \"name\": \"03. Báo cáo thẩm định Hồ sơ yêu cầu\", \"desc\": \"Tổ thẩm định kiểm tra HSYC\", \"requiredVars\": [\"KET_QUA_THAM_DINH_HSYC\"]}, {\"id\": \"cdttt_4\", \"code\": \"04.QD-PD-HSYC\", \"name\": \"04. Quyết định phê duyệt Hồ sơ yêu cầu\", \"desc\": \"Ban hành HSYC chính thức\", \"requiredVars\": [\"SO_QD_HSYC\", \"NGAY_BAN_HANH\"]}, {\"id\": \"cdttt_5\", \"code\": \"05.TM-HSDX\", \"name\": \"05. Thư mời nộp Hồ sơ đề xuất\", \"desc\": \"Gửi đơn vị dự kiến chỉ định\", \"requiredVars\": [\"TEN_NHA_THAU\", \"HAN_NOP_HSDX\"]}]}, {\"phaseId\": \"danh_gia_trao_thau\", \"phaseName\": \"Giai đoạn Đánh giá & Phê duyệt kết quả\", \"documents\": [{\"id\": \"cdttt_6\", \"code\": \"06.BB-M-HSDX\", \"name\": \"06. Biên bản mở Hồ sơ đề xuất\", \"desc\": \"Mở hồ sơ đề xuất\", \"requiredVars\": [\"THOI_GIAN_MO_THAU\"]}, {\"id\": \"cdttt_7\", \"code\": \"07.BC-DG-HSDX\", \"name\": \"07. Báo cáo đánh giá Hồ sơ đề xuất\", \"desc\": \"Đánh giá năng lực, kinh nghiệm, tài chính\", \"requiredVars\": [\"KET_QUA_DANH_GIA\"]}, {\"id\": \"cdttt_8\", \"code\": \"08.BB-TT\", \"name\": \"08. Biên bản thương thảo hợp đồng\", \"desc\": \"Thương thảo hoàn thiện\", \"requiredVars\": [\"GIA_THUONG_THAO\"]}, {\"id\": \"cdttt_9\", \"code\": \"09.TTr-KQLCNT\", \"name\": \"09. Tờ trình đề nghị phê duyệt Kết quả chỉ định thầu\", \"desc\": \"Trình kết quả LCNT\", \"requiredVars\": [\"GIA_TRUNG_THAU_SO\"]}, {\"id\": \"cdttt_10\", \"code\": \"10.BC-TD-KQ\", \"name\": \"10. Báo cáo thẩm định Kết quả lựa chọn nhà thầu\", \"desc\": \"Thẩm định trước khi ký duyệt\", \"requiredVars\": [\"Y_KIEN_THAM_DINH\"]}, {\"id\": \"cdttt_11\", \"code\": \"11.QD-PD-KQ\", \"name\": \"11. Quyết định phê duyệt Kết quả chỉ định thầu\", \"desc\": \"Quyết định phê duyệt chính thức\", \"requiredVars\": [\"SO_QUYET_DINH\"]}, {\"id\": \"cdttt_12\", \"code\": \"12.HD-KT\", \"name\": \"12. Hợp đồng kinh tế\", \"desc\": \"Hợp đồng kinh tế\", \"requiredVars\": [\"GIA_TRI_HOP_DONG_SO\"]}]}]}, {\"id\": \"dau_thau_rong_rai_hh_xl\", \"code\": \"DTRR\", \"name\": \"6. Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)\", \"badge\": \"Đấu Thầu Rộng Rãi\", \"badgeColor\": \"rose\", \"description\": \"Đầy đủ 23 biểu mẫu theo chuẩn Hệ thống Mạng Đấu thầu Quốc gia qua 6 giai đoạn (từ chuẩn bị đến ký HĐ).\", \"threshold\": 100000000000, \"phases\": [{\"phaseId\": \"giai_doan_1_hsmt\", \"phaseName\": \"GĐ 1: Chuẩn bị Hồ sơ mời thầu (E-HSMT)\", \"documents\": [{\"id\": \"dtrr_1\", \"code\": \"01.QD-TL\", \"name\": \"01. Quyết định thành lập Tổ chuyên gia và Tổ thẩm định\", \"desc\": \"Thành lập tổ chấm thầu\", \"requiredVars\": [\"TO_TRUONG_CHUYEN_GIA\", \"TO_TRUONG_THAM_DINH\"]}, {\"id\": \"dtrr_2\", \"code\": \"02.BB-HOP-TCG\", \"name\": \"02. Biên bản họp Tổ chuyên gia thông qua dự thảo E-HSMT\", \"desc\": \"Họp rà soát tiêu chuẩn mời thầu\", \"requiredVars\": [\"NOI_DUNG_DU_THAO\"]}, {\"id\": \"dtrr_3\", \"code\": \"03.TTr-HSMT\", \"name\": \"03. Tờ trình đề nghị thẩm định, phê duyệt E-HSMT\", \"desc\": \"Trình thẩm định E-HSMT\", \"requiredVars\": [\"TEN_GOI_THAU\", \"GIA_GOI_THAU\"]}, {\"id\": \"dtrr_4\", \"code\": \"04.BB-HOP-TTD\", \"name\": \"04. Biên bản họp Tổ thẩm định E-HSMT\", \"desc\": \"Họp thẩm định E-HSMT\", \"requiredVars\": [\"KET_QUA_HOP_THAM_DINH\"]}, {\"id\": \"dtrr_5\", \"code\": \"05.BC-TD-HSMT\", \"name\": \"05. Báo cáo thẩm định E-HSMT\", \"desc\": \"Báo cáo thẩm định đạt yêu cầu\", \"requiredVars\": [\"KET_LUAN_THAM_DINH\"]}, {\"id\": \"dtrr_6\", \"code\": \"06.QD-PD-HSMT\", \"name\": \"06. Quyết định phê duyệt E-HSMT\", \"desc\": \"Phê duyệt để đăng tải mạng\", \"requiredVars\": [\"SO_QD_HSMT\", \"NGAY_KY\"]}]}, {\"phaseId\": \"giai_doan_2_to_chuc\", \"phaseName\": \"GĐ 2: Tổ chức Lựa chọn nhà thầu & Mở thầu\", \"documents\": [{\"id\": \"dtrr_7\", \"code\": \"07.TB-MT\", \"name\": \"07. Thông báo mời thầu (E-TBMT)\", \"desc\": \"Thông báo phát hành hồ sơ mời thầu\", \"requiredVars\": [\"SO_E_TBMT\", \"THOI_DIEM_DONG_THAU\"]}, {\"id\": \"dtrr_8\", \"code\": \"08.VB-LAM-RO\", \"name\": \"08. Văn bản làm rõ E-HSMT (nếu có)\", \"desc\": \"Giải đáp thắc mắc của nhà thầu\", \"requiredVars\": [\"NOI_DUNG_LAM_RO\"]}, {\"id\": \"dtrr_9\", \"code\": \"09.QD-SUA-DOI\", \"name\": \"09. Quyết định sửa đổi E-HSMT (nếu có)\", \"desc\": \"Điều chỉnh hồ sơ mời thầu\", \"requiredVars\": [\"NOI_DUNG_SUA_DOI\"]}, {\"id\": \"dtrr_10\", \"code\": \"10.BB-MO-THAU\", \"name\": \"10. Biên bản mở thầu điện tử\", \"desc\": \"Trích xuất danh sách nhà thầu dự thầu\", \"requiredVars\": [\"DANH_SACH_NHA_THAU_DU_THAU\"]}]}, {\"phaseId\": \"giai_doan_3_danh_gia\", \"phaseName\": \"GĐ 3: Đánh giá Hồ sơ dự thầu (E-HSDT)\", \"documents\": [{\"id\": \"dtrr_11\", \"code\": \"11.BB-HOP-PC\", \"name\": \"11. Biên bản họp Tổ chuyên gia phân công nhiệm vụ\", \"desc\": \"Phân công tổ viên chấm điểm\", \"requiredVars\": [\"PHAN_CONG_CHAM_THAU\"]}, {\"id\": \"dtrr_12\", \"code\": \"12.VB-LR-HSDT\", \"name\": \"12. Văn bản yêu cầu làm rõ E-HSDT (nếu có)\", \"desc\": \"Làm rõ hồ sơ dự thầu\", \"requiredVars\": [\"YEU_CAU_LAM_RO_HSDT\"]}, {\"id\": \"dtrr_13\", \"code\": \"13.BB-HOP-KQ\", \"name\": \"13. Biên bản họp Tổ chuyên gia thông qua kết quả chấm thầu\", \"desc\": \"Thống nhất xếp hạng nhà thầu\", \"requiredVars\": [\"XEP_HANG_NHA_THAU\"]}, {\"id\": \"dtrr_14\", \"code\": \"14.BC-DG-HSDT\", \"name\": \"14. Báo cáo đánh giá Hồ sơ dự thầu (E-HSDT)\", \"desc\": \"Báo cáo chấm thầu chính thức\", \"requiredVars\": [\"NHA_THAU_XEP_HANG_1\"]}]}, {\"phaseId\": \"giai_doan_4_thuong_thao\", \"phaseName\": \"GĐ 4: Thương thảo và Hoàn thiện hợp đồng\", \"documents\": [{\"id\": \"dtrr_15\", \"code\": \"15.GM-TT\", \"name\": \"15. Văn bản mời nhà thầu xếp hạng nhất vào thương thảo\", \"desc\": \"Mời thương thảo\", \"requiredVars\": [\"TEN_NHA_THAU_HANG_1\", \"LICH_THUONG_THAO\"]}, {\"id\": \"dtrr_16\", \"code\": \"16.BB-TT\", \"name\": \"16. Biên bản thương thảo hợp đồng\", \"desc\": \"Thương thảo các điều khoản\", \"requiredVars\": [\"GIA_THUONG_THAO_CUOI_CUNG\"]}, {\"id\": \"dtrr_17\", \"code\": \"17.BB-HT\", \"name\": \"17. Biên bản hoàn thiện hợp đồng\", \"desc\": \"Rà soát điều kiện hợp đồng\", \"requiredVars\": [\"GIA_TRI_HOP_DONG_THONG_NHAT\"]}]}, {\"phaseId\": \"giai_doan_5_phe_duyet\", \"phaseName\": \"GĐ 5: Thẩm định và Phê duyệt Kết quả LCNT\", \"documents\": [{\"id\": \"dtrr_18\", \"code\": \"18.TTr-KQLCNT\", \"name\": \"18. Tờ trình đề nghị thẩm định, phê duyệt Kết quả LCNT\", \"desc\": \"Trình phê duyệt trúng thầu\", \"requiredVars\": [\"TEN_DON_VI_TRUNG_THAU\", \"GIA_TRUNG_THAU\"]}, {\"id\": \"dtrr_19\", \"code\": \"19.BB-HOP-TTD\", \"name\": \"19. Biên bản họp Tổ thẩm định Kết quả LCNT\", \"desc\": \"Họp thẩm định kết quả\", \"requiredVars\": [\"Y_KIEN_TO_THAM_DINH\"]}, {\"id\": \"dtrr_20\", \"code\": \"20.BC-TD-KQ\", \"name\": \"20. Báo cáo thẩm định Kết quả LCNT\", \"desc\": \"Báo cáo thẩm định\", \"requiredVars\": [\"KET_LUAN_THAM_DINH_KQLCNT\"]}, {\"id\": \"dtrr_21\", \"code\": \"21.QD-PD-KQ\", \"name\": \"21. Quyết định phê duyệt Kết quả lựa chọn nhà thầu\", \"desc\": \"Quyết định phê duyệt trúng thầu chính thức\", \"requiredVars\": [\"SO_QUYET_DINH\", \"GIA_TRUNG_THAU_SO\"]}]}, {\"phaseId\": \"giai_doan_6_hop_dong\", \"phaseName\": \"GĐ 6: Công khai Kết quả & Ký kết Hợp đồng\", \"documents\": [{\"id\": \"dtrr_22\", \"code\": \"22.TB-KQ\", \"name\": \"22. Thông báo Kết quả lựa chọn nhà thầu\", \"desc\": \"Đăng tải kết quả trên mạng đấu thầu\", \"requiredVars\": [\"TEN_NHA_THAU_TRUNG_THAU\"]}, {\"id\": \"dtrr_23\", \"code\": \"23.HD-KT\", \"name\": \"23. Hợp đồng kinh tế chính thức (kèm phụ lục)\", \"desc\": \"Hợp đồng kinh tế xây lắp/mua sắm\", \"requiredVars\": [\"GIA_TRI_HOP_DONG\", \"BAO_DAM_THUC_HIEN_HD\"]}]}]}]}");
    const DEFAULT_IMPLEMENTATION_MATRIX = JSON.parse("{\"version\": \"1.0\", \"implementationTypes\": [{\"id\": \"trien_khai_sua_chua\", \"name\": \"1. Tri\u1ec3n khai h\u1ed3 s\u01a1 s\u1eeda ch\u1eefa\", \"code\": \"TK-SC\", \"description\": \"\u00c1p d\u1ee5ng cho c\u00e1c d\u1ef1 \u00e1n s\u1eeda ch\u1eefa, b\u1ea3o tr\u00ec, kh\u1eafc ph\u1ee5c h\u01b0 h\u1ecfng\", \"documents\": [{\"id\": \"tk_sc_1\", \"code\": \"110.Q\u0110\", \"name\": \"Q\u0110 giao k\u1ebf ho\u1ea1ch\", \"signer\": \"TCT\", \"duration\": 2, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-01-12\", \"docNo\": \"110/Q\u0110-TCTCHKVN\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_2\", \"code\": \"BB-KT\", \"name\": \"Bi\u00ean b\u1ea3n ki\u1ec3m tra \u0111\u1ed9t xu\u1ea5t\", \"signer\": \"C\u00e1c ph\u00f2ng VCA\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-04-04\", \"docNo\": \"\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_3\", \"code\": \"01.TTr\", \"name\": \"[TRI\u1ec2N KHAI] T\u1edd tr\u00ecnh\", \"signer\": \"PKTHT\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-07-21\", \"docNo\": \"01/\u0110KNCC/TTr-KTHT\", \"templateFile\": \"templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx\"}, {\"id\": \"tk_sc_4\", \"code\": \"02.TTr\", \"name\": \"[TL T\u1ed4 TH\u1ea8M \u0110\u1ecaNH] T\u1edd Tr\u00ecnh\", \"signer\": \"PKTHT\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"2026-07-22\", \"docNo\": \"02/\u0110KNCC/TTr-KTHT\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_5\", \"code\": \"930a.Q\u0110\", \"name\": \"[TL T\u1ed4 TH\u1ea8M \u0110\u1ecaNH] Quy\u1ebft \u0111\u1ecbnh\", \"signer\": \"G\u0110\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-07-28\", \"docNo\": \"930a/Q\u0110-CHKQTCT\", \"templateFile\": \"templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx\"}, {\"id\": \"tk_sc_6\", \"code\": \"03.BC\", \"name\": \"B\u00c1O C\u00c1O B\u1ea2O TR\u00cc\", \"signer\": \"PKTHT\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"2026-07-29\", \"docNo\": \"03/BCTHBT-KTHT\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_7\", \"code\": \"Q\u0110-DT\", \"name\": \"Ph\u00ea duy\u1ec7t d\u1ef1 to\u00e1n G1\", \"signer\": \"G\u0110\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"\", \"docNo\": \"\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_8\", \"code\": \"04.TTr\", \"name\": \"[KH LCNT] T\u1edd tr\u00ecnh\", \"signer\": \"PKTHT\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-07-29\", \"docNo\": \"04/\u0110KNCC/TTr-KTHT\", \"templateFile\": \"templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx\"}, {\"id\": \"tk_sc_9\", \"code\": \"BB-T\u0110\", \"name\": \"[KH LCNT] BB Th\u1ea9m \u0111\u1ecbnh\", \"signer\": \"T\u1ed5 th\u1ea9m \u0111\u1ecbnh\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-07-30\", \"docNo\": \"\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_10\", \"code\": \"05.BC\", \"name\": \"[KH LCNT] BC Th\u1ea9m \u0111\u1ecbnh\", \"signer\": \"T\u1ed5 th\u1ea9m \u0111\u1ecbnh\", \"duration\": 1, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-07-30\", \"docNo\": \"05/BC-H\u0110T\u0110-KQT\u0110\", \"templateFile\": \"\"}, {\"id\": \"tk_sc_11\", \"code\": \"968.Q\u0110\", \"name\": \"[KH LCNT] Q\u0110 Ph\u00ea Duy\u1ec7t\", \"signer\": \"G\u0110\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"2026-07-31\", \"docNo\": \"968/Q\u0110-CHKQTCT\", \"templateFile\": \"templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx\"}]}, {\"id\": \"trien_khai_mua_sam\", \"name\": \"2. Tri\u1ec3n khai h\u1ed3 s\u01a1 mua s\u1eafm\", \"code\": \"TK-MS\", \"description\": \"\u00c1p d\u1ee5ng cho mua s\u1eafm h\u00e0ng h\u00f3a, t\u00e0i s\u1ea3n, trang thi\u1ebft b\u1ecb th\u01b0\u1eddng xuy\u00ean\", \"documents\": [{\"id\": \"tk_ms_1\", \"code\": \"01.DX-NS\", \"name\": \"B\u00e1o c\u00e1o \u0111\u1ec1 xu\u1ea5t nhu c\u1ea7u mua s\u1eafm\", \"signer\": \"\u0110\u01a1n v\u1ecb s\u1eed d\u1ee5ng\", \"duration\": 2, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-01-12\", \"docNo\": \"01/BC-DXMS\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_2\", \"code\": \"02.BB-HOP\", \"name\": \"Bi\u00ean b\u1ea3n h\u1ecdp th\u1ed1ng nh\u1ea5t danh m\u1ee5c mua s\u1eafm\", \"signer\": \"H\u1ed9i \u0111\u1ed3ng mua s\u1eafm\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"02/BB-HOP\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_3\", \"code\": \"03.TM-BG\", \"name\": \"Th\u01b0 m\u1eddi b\u00e1o gi\u00e1 / Bi\u00ean b\u1ea3n thu th\u1eadp 03 b\u00e1o gi\u00e1\", \"signer\": \"T\u1ed5 mua s\u1eafm\", \"duration\": 3, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"03/TM-BG\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_4\", \"code\": \"04.TTr-CTMS\", \"name\": \"T\u1edd tr\u00ecnh ph\u00ea duy\u1ec7t ch\u1ee7 tr\u01b0\u01a1ng v\u00e0 d\u1ef1 to\u00e1n mua s\u1eafm\", \"signer\": \"Ph\u00f2ng K\u1ebf ho\u1ea1ch\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"04/TTr-CTMS\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_5\", \"code\": \"05.Q\u0110-CTMS\", \"name\": \"Quy\u1ebft \u0111\u1ecbnh ph\u00ea duy\u1ec7t ch\u1ee7 tr\u01b0\u01a1ng mua s\u1eafm\", \"signer\": \"L\u00e3nh \u0111\u1ea1o \u0111\u01a1n v\u1ecb\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"05/Q\u0110-CTMS\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_6\", \"code\": \"06.TTr-KHLCNT\", \"name\": \"T\u1edd tr\u00ecnh \u0111\u1ec1 ngh\u1ecb ph\u00ea duy\u1ec7t K\u1ebf ho\u1ea1ch LCNT\", \"signer\": \"T\u1ed5 mua s\u1eafm\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"06/TTr-KHLCNT\", \"templateFile\": \"\"}, {\"id\": \"tk_ms_7\", \"code\": \"07.Q\u0110-KHLCNT\", \"name\": \"Quy\u1ebft \u0111\u1ecbnh ph\u00ea duy\u1ec7t K\u1ebf ho\u1ea1ch LCNT mua s\u1eafm\", \"signer\": \"C\u1ea5p th\u1ea9m quy\u1ec1n\", \"duration\": 1, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"07/Q\u0110-KHLCNT\", \"templateFile\": \"\"}]}, {\"id\": \"trien_khai_dau_tu\", \"name\": \"3. Tri\u1ec3n khai h\u1ed3 s\u01a1 \u0111\u1ea7u t\u01b0\", \"code\": \"TK-\u0110T\", \"description\": \"\u00c1p d\u1ee5ng cho d\u1ef1 \u00e1n \u0111\u1ea7u t\u01b0 x\u00e2y d\u1ef1ng, c\u1ea3i t\u1ea1o n\u00e2ng c\u1ea5p quy m\u00f4 l\u1edbn\", \"documents\": [{\"id\": \"tk_dt_1\", \"code\": \"01.TTr-CTDT\", \"name\": \"T\u1edd tr\u00ecnh \u0111\u1ec1 xu\u1ea5t ch\u1ee7 tr\u01b0\u01a1ng \u0111\u1ea7u t\u01b0\", \"signer\": \"Ban QLDA\", \"duration\": 3, \"dateFormula\": {\"type\": \"manual\"}, \"defaultDate\": \"2026-01-12\", \"docNo\": \"01/TTr-CTDT\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_2\", \"code\": \"02.Q\u0110-CTDT\", \"name\": \"Quy\u1ebft \u0111\u1ecbnh ph\u00ea duy\u1ec7t ch\u1ee7 tr\u01b0\u01a1ng \u0111\u1ea7u t\u01b0\", \"signer\": \"C\u1ea5p quy\u1ebft \u0111\u1ecbnh \u0110T\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"02/Q\u0110-CTDT\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_3\", \"code\": \"03.NV-KS\", \"name\": \"\u0110\u1ec1 c\u01b0\u01a1ng nhi\u1ec7m v\u1ee5 kh\u1ea3o s\u00e1t, l\u1eadp B\u00e1o c\u00e1o KT-KT\", \"signer\": \"\u0110\u01a1n v\u1ecb t\u01b0 v\u1ea5n\", \"duration\": 5, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"03/NV-KS\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_4\", \"code\": \"04.TTr-BCKTKT\", \"name\": \"T\u1edd tr\u00ecnh th\u1ea9m \u0111\u1ecbnh B\u00e1o c\u00e1o KT-KT\", \"signer\": \"Ban QLDA\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"04/TTr-BCKTKT\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_5\", \"code\": \"05.BC-TT\", \"name\": \"B\u00e1o c\u00e1o k\u1ebft qu\u1ea3 th\u1ea9m tra B\u00e1o c\u00e1o KT-KT\", \"signer\": \"\u0110\u01a1n v\u1ecb th\u1ea9m tra\", \"duration\": 5, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"05/BC-TT\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_6\", \"code\": \"06.Q\u0110-PD-DA\", \"name\": \"Quy\u1ebft \u0111\u1ecbnh ph\u00ea duy\u1ec7t d\u1ef1 \u00e1n \u0111\u1ea7u t\u01b0 x\u00e2y d\u1ef1ng\", \"signer\": \"Ng\u01b0\u1eddi c\u00f3 th\u1ea9m quy\u1ec1n\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"06/Q\u0110-PDDA\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_7\", \"code\": \"07.TTr-KHLCNT\", \"name\": \"T\u1edd tr\u00ecnh ph\u00ea duy\u1ec7t K\u1ebf ho\u1ea1ch LCNT t\u1ed5ng th\u1ec3\", \"signer\": \"Ch\u1ee7 \u0111\u1ea7u t\u01b0\", \"duration\": 3, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"07/TTr-KHLCNT\", \"templateFile\": \"\"}, {\"id\": \"tk_dt_8\", \"code\": \"08.Q\u0110-KHLCNT\", \"name\": \"Quy\u1ebft \u0111\u1ecbnh ph\u00ea duy\u1ec7t K\u1ebf ho\u1ea1ch LCNT t\u1ed5ng th\u1ec3\", \"signer\": \"C\u1ea5p quy\u1ebft \u0111\u1ecbnh \u0110T\", \"duration\": 2, \"dateFormula\": {\"type\": \"default\"}, \"defaultDate\": \"\", \"docNo\": \"08/Q\u0110-KHLCNT\", \"templateFile\": \"\"}]}]}");

    let STUDIO_WORKFLOWS = {};

    function loadAllStudioWorkflows() {
        let pMatrix = DEFAULT_PROCUREMENT_MATRIX;
        let iMatrix = DEFAULT_IMPLEMENTATION_MATRIX;

        try {
            const customP = localStorage.getItem("ho_so_tu_dong_matrix_custom");
            if (customP) {
                const parsedP = JSON.parse(customP);
                if (parsedP.procurementTypes && parsedP.procurementTypes.length > 0) {
                    const rawStr = JSON.stringify(parsedP);
                    if (rawStr.includes('"templates/01_To_trinh') || rawStr.includes('"templates/07_Hop_dong')) {
                        localStorage.removeItem("ho_so_tu_dong_matrix_custom");
                    } else {
                        // Tự động chuẩn hóa / đồng bộ tên các quy trình chuẩn mặc định từ hệ thống (ưu tiên chuẩn local)
                        const CANONICAL_PROCUREMENT_NAMES = {
                            "duoi_50_trieu": "1. Mua sắm (Dưới 50 triệu)",
                            "duoi_100_trieu": "2. Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)",
                            "chao_gia_han_che": "3. Chào giá cạnh tranh hạn chế (Nội bộ)",
                            "chi_dinh_thau_rut_gon": "4. Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)",
                            "chi_dinh_thau_thong_thuong": "5. Chỉ định thầu quy trình thông thường (HSYC & HSDX)",
                            "dau_thau_rong_rai_hh_xl": "6. Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)"
                        };
                        let hasMigration = false;
                        parsedP.procurementTypes.forEach(pt => {
                            if (CANONICAL_PROCUREMENT_NAMES[pt.id] && pt.name !== CANONICAL_PROCUREMENT_NAMES[pt.id]) {
                                if (pt.id === "duoi_50_trieu" && (pt.name.includes("Dưới 50 triệu") || pt.name.includes("Mua sắm"))) {
                                    pt.name = CANONICAL_PROCUREMENT_NAMES[pt.id];
                                    hasMigration = true;
                                }
                            }
                        });
                        if (hasMigration) {
                            try {
                                localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(parsedP));
                            } catch (e) {}
                        }
                        pMatrix = parsedP;
                    }
                }
            }
        } catch (e) {
            console.warn("Could not load custom procurement matrix in Studio:", e);
        }

        try {
            const customI = localStorage.getItem("ho_so_tu_dong_implementation_matrix");
            if (customI) {
                const parsedI = JSON.parse(customI);
                if (parsedI.implementationTypes && parsedI.implementationTypes.length > 0) {
                    const rawStr = JSON.stringify(parsedI);
                    if (rawStr.includes('"templates/01_To_trinh') || rawStr.includes('"templates/2_Bien_ban')) {
                        localStorage.removeItem("ho_so_tu_dong_implementation_matrix");
                    } else {
                        iMatrix = parsedI;
                    }
                }
            }
        } catch (e) {
            console.warn("Could not load custom implementation matrix in Studio:", e);
        }

        const workflows = {};

        // 1. Hình thức Lựa chọn Nhà thầu (LCNT)
        (pMatrix.procurementTypes || []).forEach(pt => {
            const docs = [];
            (pt.phases || []).forEach(ph => {
                (ph.documents || []).forEach(d => {
                    docs.push({
                        id: d.id,
                        code: d.code,
                        name: d.name,
                        desc: d.desc || "",
                        phaseName: ph.phaseName || "",
                        requiredVars: d.requiredVars || [],
                        keywords: [d.code.toLowerCase(), d.name.toLowerCase()]
                    });
                });
            });

            workflows[pt.id] = {
                id: pt.id,
                name: pt.name,
                category: "LCNT",
                badge: pt.badge || "",
                badgeColor: pt.badgeColor || "emerald",
                description: pt.description || "",
                threshold: pt.threshold || 0,
                documents: docs
            };
        });

        // 2. Quy trình Triển khai dự án
        (iMatrix.implementationTypes || []).forEach(it => {
            const docs = (it.documents || []).map(d => ({
                id: d.id,
                code: d.code,
                name: d.name,
                desc: d.desc || "",
                signer: d.signer || "",
                templateFile: d.templateFile || "",
                keywords: [d.code.toLowerCase(), d.name.toLowerCase()]
            }));

            workflows[it.id] = {
                id: it.id,
                name: it.name,
                category: "Triển khai",
                code: it.code || "",
                description: it.description || "",
                documents: docs
            };
        });

        STUDIO_WORKFLOWS = workflows;
        return workflows;
    }

    // Load workflows immediately
    loadAllStudioWorkflows();

    // Application State
    // -------------------------------------------------------------
    let state = {
        activeWorkflowId: "chi_dinh_thau_rut_gon",
        viewMode: "batch", // "batch" vs "single"
        batchFiles: {},    // { [docId]: { file, name, size, arrayBuffer, paragraphs, mappings, status } }
        activeDocId: null, // Currently edited document in Single View
        currentTaggingView: "original" // "original" vs "tagged"
    };

    // -------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------
    const studioWorkflowSelect = document.getElementById("studioWorkflowSelect");
    const workflowBadgeInfo = document.getElementById("workflowBadgeInfo");
    const btnViewBatchMode = document.getElementById("btnViewBatchMode");
    const btnViewSingleMode = document.getElementById("btnViewSingleMode");
    const batchWorkspace = document.getElementById("batchWorkspace");
    const singleWorkspace = document.getElementById("singleWorkspace");

    const batchDocxUploadInput = document.getElementById("batchDocxUploadInput");
    const btnTriggerBatchUpload = document.getElementById("btnTriggerBatchUpload");
    const btnBrowseBatchFiles = document.getElementById("btnBrowseBatchFiles");
    const batchDropZone = document.getElementById("batchDropZone");
    const batchDocumentsTableBody = document.getElementById("batchDocumentsTableBody");
    const batchProgressBadge = document.getElementById("batchProgressBadge");
    const btnAutoScanAll = document.getElementById("btnAutoScanAll");
    const btnClearBatchList = document.getElementById("btnClearBatchList");
    const btnExportAllZip = document.getElementById("btnExportAllZip");

    // Single view elements
    const btnBackToBatch = document.getElementById("btnBackToBatch");
    const singleDocTitle = document.getElementById("singleDocTitle");
    const singleDocFileNameBadge = document.getElementById("singleDocFileNameBadge");
    const singleDocxUploadInput = document.getElementById("singleDocxUploadInput");
    const btnUploadSingleDocx = document.getElementById("btnUploadSingleDocx");
    const btnApplySingleTags = document.getElementById("btnApplySingleTags");
    const btnDownloadSingleDocx = document.getElementById("btnDownloadSingleDocx");
    const singleMappingRowsContainer = document.getElementById("singleMappingRowsContainer");
    const singleDetectedCountBadge = document.getElementById("singleDetectedCountBadge");
    const singleSuggestionsBox = document.getElementById("singleSuggestionsBox");
    const singleSuggestionsChips = document.getElementById("singleSuggestionsChips");
    const btnSingleAcceptAllSuggestions = document.getElementById("btnSingleAcceptAllSuggestions");
    const btnSingleAddCustomVar = document.getElementById("btnSingleAddCustomVar");
    const documentContentDisplay = document.getElementById("documentContentDisplay");
    const viewModeOriginal = document.getElementById("viewModeOriginal");
    const viewModeTagged = document.getElementById("viewModeTagged");
    const selectionMenu = document.getElementById("selectionMenu");

    // Modal Dictionary elements
    const modalStudioVars = document.getElementById("modalStudioVars");
    const btnOpenStudioVarsModal = document.getElementById("btnOpenStudioVarsModal");
    const btnCloseStudioVarsModal = document.getElementById("btnCloseStudioVarsModal");
    const btnFooterCloseStudioVarsModal = document.getElementById("btnFooterCloseStudioVarsModal");
    const studioVarsSearchInput = document.getElementById("studioVarsSearchInput");
    const studioVarsTableBody = document.getElementById("studioVarsTableBody");
    const studioVarPills = document.querySelectorAll(".studio-var-pill");

    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMsg");
    const toastIcon = document.getElementById("toastIcon");

    function showToast(msg, type = "success") {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        if (toastIcon) {
            if (type === "success") toastIcon.className = "fa-solid fa-circle-check text-emerald-400";
            else if (type === "error") toastIcon.className = "fa-solid fa-circle-exclamation text-rose-400";
            else toastIcon.className = "fa-solid fa-circle-info text-blue-400";
        }
        toast.classList.remove("translate-y-20", "opacity-0");
        setTimeout(() => toast.classList.add("translate-y-20", "opacity-0"), 3200);
    }

    // -------------------------------------------------------------
    // Workflow Initialization
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // Workflow Initialization & Cross-Page Context Resolution
    // -------------------------------------------------------------
    function resolveInitialStudioContext() {
        const params = new URLSearchParams(window.location.search);
        const wfParam = params.get("workflow");
        const docParam = params.get("doc");
        const modeParam = params.get("mode");

        // 1. Check URL parameters
        if (wfParam && STUDIO_WORKFLOWS[wfParam]) {
            state.activeWorkflowId = wfParam;
        } else {
            // 2. Check appState from index.html (app.js)
            try {
                const appStateRaw = localStorage.getItem("ho_so_tu_dong_state_v3");
                if (appStateRaw) {
                    const parsedApp = JSON.parse(appStateRaw);
                    if (parsedApp.selectedProcurementTypeId && STUDIO_WORKFLOWS[parsedApp.selectedProcurementTypeId]) {
                        state.activeWorkflowId = parsedApp.selectedProcurementTypeId;
                    }
                    if (!docParam && parsedApp.activeDocId) {
                        state.activeDocId = parsedApp.activeDocId;
                    }
                }
            } catch (e) {}

            // 3. Fallback to ho_so_studio_active_workflow
            if (!state.activeWorkflowId || !STUDIO_WORKFLOWS[state.activeWorkflowId]) {
                const savedStudioWf = localStorage.getItem("ho_so_studio_active_workflow");
                if (savedStudioWf && STUDIO_WORKFLOWS[savedStudioWf]) {
                    state.activeWorkflowId = savedStudioWf;
                }
            }
        }

        if (!state.activeWorkflowId || !STUDIO_WORKFLOWS[state.activeWorkflowId]) {
            state.activeWorkflowId = "chi_dinh_thau_rut_gon";
        }

        const curWf = getCurrentWorkflow();
        if (docParam && curWf.documents.some(d => d.id === docParam)) {
            state.activeDocId = docParam;
        } else if (!state.activeDocId || !curWf.documents.some(d => d.id === state.activeDocId)) {
            state.activeDocId = curWf.documents[0] ? curWf.documents[0].id : null;
        }

        if (modeParam === "single" || docParam) {
            setTimeout(() => {
                switchViewMode("single");
            }, 80);
        }
    }

    function initWorkflowSelector() {
        if (!studioWorkflowSelect) return;
        const allWfs = Object.values(STUDIO_WORKFLOWS);
        const lcntWfs = allWfs.filter(w => w.category === "LCNT");
        const trienKhaiWfs = allWfs.filter(w => w.category === "Triển khai");

        let html = "";
        if (lcntWfs.length > 0) {
            html += `<optgroup label="📋 Hình thức Lựa chọn Nhà thầu (LCNT)">`;
            html += lcntWfs.map(wf => `<option value="${wf.id}" ${wf.id === state.activeWorkflowId ? "selected" : ""}>${wf.name}</option>`).join("");
            html += `</optgroup>`;
        }
        if (trienKhaiWfs.length > 0) {
            html += `<optgroup label="🛠️ Quy trình Triển khai dự án">`;
            html += trienKhaiWfs.map(wf => `<option value="${wf.id}" ${wf.id === state.activeWorkflowId ? "selected" : ""}>${wf.name}</option>`).join("");
            html += `</optgroup>`;
        }

        studioWorkflowSelect.innerHTML = html;
        studioWorkflowSelect.value = state.activeWorkflowId;

        studioWorkflowSelect.onchange = (e) => {
            state.activeWorkflowId = e.target.value;
            state.batchFiles = {};
            const curWf = getCurrentWorkflow();
            state.activeDocId = curWf.documents[0] ? curWf.documents[0].id : null;
            try {
                localStorage.setItem("ho_so_studio_active_workflow", state.activeWorkflowId);
            } catch (err) {}
            updateWorkflowBadge();
            renderBatchTable();
            showToast(`Đã chuyển sang: ${curWf.name}`);
        };
        updateWorkflowBadge();
    }

    function getCurrentWorkflow() {
        return STUDIO_WORKFLOWS[state.activeWorkflowId] || STUDIO_WORKFLOWS["chi_dinh_thau_rut_gon"] || Object.values(STUDIO_WORKFLOWS)[0];
    }

    function updateWorkflowBadge() {
        const wf = getCurrentWorkflow();
        if (workflowBadgeInfo && wf) {
            workflowBadgeInfo.textContent = `${wf.documents.length} văn bản chuẩn`;
        }
    }

    async function switchViewMode(mode) {
        state.viewMode = mode;
        if (mode === "batch") {
            batchWorkspace.classList.remove("hidden");
            singleWorkspace.classList.add("hidden");
            btnViewBatchMode.className = "px-2.5 py-0.5 rounded bg-white text-emerald-900 shadow-2xs flex items-center gap-1 cursor-pointer transition-all";
            btnViewSingleMode.className = "px-2.5 py-0.5 rounded text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-all";
            renderBatchTable();
        } else {
            batchWorkspace.classList.add("hidden");
            singleWorkspace.classList.remove("hidden");
            btnViewSingleMode.className = "px-2.5 py-0.5 rounded bg-white text-emerald-900 shadow-2xs flex items-center gap-1 cursor-pointer transition-all";
            btnViewBatchMode.className = "px-2.5 py-0.5 rounded text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-all";
            await renderSingleView();
        }
    }
    window.switchViewMode = switchViewMode;
    window.studioState = state;
    window.state = state;
    window.rescanDocumentEntitiesFromDictionary = rescanDocumentEntitiesFromDictionary;
    window.processIncomingFiles = processIncomingFiles;
    window.loadFileForSingleDocument = loadFileForSingleDocument;
    window.cleanCanvasHtmlForStorage = cleanCanvasHtmlForStorage;
    window.createDocxFromCanvasHtml = createDocxFromCanvasHtml;
    window.performUndo = performUndo;
    window.performRedo = performRedo;

    if (btnViewBatchMode) btnViewBatchMode.onclick = () => switchViewMode("batch");
    if (btnViewSingleMode) btnViewSingleMode.onclick = () => {
        // If no active doc, select first doc that has a file, or first in workflow
        if (!state.activeDocId) {
            const wf = getCurrentWorkflow();
            const firstFilled = wf.documents.find(d => state.batchFiles[d.id]);
            state.activeDocId = firstFilled ? firstFilled.id : wf.documents[0].id;
        }
        switchViewMode("single");
    };
    if (btnBackToBatch) btnBackToBatch.onclick = () => switchViewMode("batch");
    const btnBackToApp = document.querySelector('a[href="index.html"]');
    if (btnBackToApp) {
        btnBackToApp.onclick = (e) => {
            e.preventDefault();
            const wfId = state.activeWorkflowId || "";
            const docId = state.activeDocId || "";
            window.location.href = `index.html?workflow=${encodeURIComponent(wfId)}&doc=${encodeURIComponent(docId)}`;
        };
    }

    // -------------------------------------------------------------
    // Batch Files Processing & Smart Matching
    // -------------------------------------------------------------
    if (btnTriggerBatchUpload) btnTriggerBatchUpload.onclick = () => batchDocxUploadInput.click();
    if (btnBrowseBatchFiles) btnBrowseBatchFiles.onclick = () => batchDocxUploadInput.click();

    // Single Document Upload Button
    if (btnUploadSingleDocx && singleDocxUploadInput) {
        btnUploadSingleDocx.onclick = () => singleDocxUploadInput.click();
        singleDocxUploadInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                await loadFileForSingleDocument(file, state.activeDocId);
            }
            singleDocxUploadInput.value = "";
        };
    }

    // Drag and drop handlers for batchDropZone
    if (batchDropZone) {
        batchDropZone.ondragover = (e) => { e.preventDefault(); batchDropZone.classList.add("dragover"); };
        batchDropZone.ondragleave = () => batchDropZone.classList.remove("dragover");
        batchDropZone.ondrop = async (e) => {
            e.preventDefault();
            batchDropZone.classList.remove("dragover");
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) await processIncomingFiles(files);
        };
    }

    // Drag and drop handlers for Single View Canvas (docViewerWrapper)
    const docViewerWrapper = document.getElementById("docViewerWrapper");
    if (docViewerWrapper) {
        docViewerWrapper.addEventListener("dragover", (e) => {
            e.preventDefault();
            docViewerWrapper.classList.add("ring-4", "ring-blue-400", "bg-blue-50/10");
        });
        docViewerWrapper.addEventListener("dragleave", () => {
            docViewerWrapper.classList.remove("ring-4", "ring-blue-400", "bg-blue-50/10");
        });
        docViewerWrapper.addEventListener("drop", async (e) => {
            e.preventDefault();
            docViewerWrapper.classList.remove("ring-4", "ring-blue-400", "bg-blue-50/10");
            const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".docx") || f.name.endsWith(".zip"));
            if (files.length > 0) {
                if (state.viewMode === "single" && files.length === 1 && files[0].name.endsWith(".docx")) {
                    await loadFileForSingleDocument(files[0], state.activeDocId);
                } else {
                    await processIncomingFiles(files);
                }
            }
        });
    }

    if (batchDocxUploadInput) {
        batchDocxUploadInput.onchange = async (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) await processIncomingFiles(files);
            batchDocxUploadInput.value = "";
        };
    }

    // Nạp file Word trực tiếp cho văn bản đơn lẻ đang mở
    async function loadFileForSingleDocument(file, docId) {
        if (!file || !docId) return;
        if (!file.name.endsWith(".docx")) {
            showToast("Vui lòng chọn file Word định dạng .docx!", "error");
            return;
        }

        try {
            const wf = getCurrentWorkflow();
            const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === docId) : { id: docId, name: docId, code: docId };

            const arrayBuffer = await file.arrayBuffer();
            const paragraphs = await extractParagraphsFromBuffer(arrayBuffer);

            if (!paragraphs || paragraphs.length === 0) {
                showToast("File Word này không chứa đoạn văn bản nào!", "error");
                return;
            }

            const mappings = detectEntitiesForDocument(docObj, paragraphs);
            const styledHtml = await parseDocxToStyledHtml(arrayBuffer, mappings);

            const item = {
                id: docId,
                name: file.name,
                size: file.size,
                arrayBuffer: arrayBuffer,
                paragraphs: paragraphs,
                styledHtml: styledHtml,
                mappings: mappings,
                status: "matched",
                isCustom: true,
                isUploaded: true
            };

            state.batchFiles[docId] = item;
            delete workingDraftHtml[docId];
            localStorage.removeItem("ho_so_custom_template_html_" + docId);

            state.activeDocId = docId;
            await renderSingleView();

            showToast(`Đã nạp file "${file.name}" vào ${docObj.code || ''}! Gợi ý ${mappings.length} biến.`);

            const tab3Btn = document.querySelector('.palette-tab-btn[data-tab="3"]');
            if (tab3Btn && mappings.length > 0) {
                tab3Btn.click();
            }
        } catch (err) {
            console.error("Lỗi khi nạp file Word:", err);
            showToast("Lỗi khi đọc file Word: " + (err.message || err), "error");
        }
    }

    // Helper: Xóa dấu tiếng Việt phục vụ so khớp thông minh
    function removeVietnameseTones(str) {
        if (!str) return "";
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str.trim();
    }

    // Thuật toán so khớp thông minh file tải lên với văn bản trong quy trình
    function findBestMatchingDoc(fileName, documents, activeDocId, isSingleMode) {
        if (!Array.isArray(documents) || documents.length === 0) return null;

        const cleanFileName = removeVietnameseTones(fileName || "");

        let bestDoc = null;
        let maxScore = -1;

        for (const doc of documents) {
            let score = 0;
            const docCodeClean = removeVietnameseTones(doc.code || "");
            const docNameClean = removeVietnameseTones(doc.name || "");

            // 1.1 Khớp số thứ tự văn bản (01, 1, 02, 2, 03, 3, 04, 4...)
            const docNumMatch = (doc.code + " " + doc.name).match(/(?:^|\D)(\d{1,2})(?:\D|$)/);
            if (docNumMatch) {
                const num = docNumMatch[1];
                const numPadded = num.padStart(2, "0");
                const fileNumMatch = cleanFileName.match(/(?:^|\D)(\d{1,2})(?:\D|$)/);
                if (fileNumMatch) {
                    if (fileNumMatch[1] === num || fileNumMatch[1] === numPadded) {
                        score += 25;
                    }
                }
            }

            // 1.2 Khớp từ viết tắt trong mã văn bản (TTr, BC, QD, HD, BB, GM, CT...)
            const codeParts = docCodeClean.split(/[^a-z0-9]/).filter(p => p.length >= 2);
            codeParts.forEach(cp => {
                if (cleanFileName.includes(cp)) {
                    score += 15;
                }
            });

            // 1.3 Khớp loại văn bản cốt lõi
            const typeTokens = [
                { words: ["to trinh", "ttr"], tag: "TTR" },
                { words: ["bao cao", "bc"], tag: "BC" },
                { words: ["quyet dinh", "qd"], tag: "QD" },
                { words: ["hop dong", "hd"], tag: "HD" },
                { words: ["bien ban", "bb"], tag: "BB" },
                { words: ["giay moi", "thu moi", "gm"], tag: "GM" },
                { words: ["tham dinh"], tag: "TD" },
                { words: ["nghiem thu"], tag: "NT" },
                { words: ["thuong thao"], tag: "TT" },
                { words: ["hoan thien"], tag: "HT" },
                { words: ["chu truong"], tag: "CT" },
                { words: ["ke hoach", "khlcnt"], tag: "KH" },
                { words: ["mua sam"], tag: "MS" }
            ];

            typeTokens.forEach(item => {
                const docHasType = item.words.some(w => docNameClean.includes(w) || docCodeClean.includes(w));
                const fileHasType = item.words.some(w => cleanFileName.includes(w));
                if (docHasType && fileHasType) {
                    score += 20;
                }
            });

            // 1.4 Khớp các từ khóa cụ thể từ tên văn bản
            const nameTokens = docNameClean.split(/[\s,.\-_/&]+/).filter(w => w.length >= 4);
            nameTokens.forEach(tok => {
                if (cleanFileName.includes(tok)) {
                    score += 5;
                }
            });

            // Ưu tiên văn bản đang được xem nếu đang ở Single View
            if (isSingleMode && doc.id === activeDocId) {
                score += 15;
            }

            if (score > maxScore) {
                maxScore = score;
                bestDoc = doc;
            }
        }

        if (maxScore > 0) {
            return bestDoc;
        }

        if (isSingleMode && activeDocId) {
            return documents.find(d => d.id === activeDocId) || documents[0];
        }

        return documents.find(d => !state.batchFiles[d.id]) || documents[0];
    }

    async function processIncomingFiles(fileList) {
        let docxFiles = [];

        // 1. Unpack ZIP if uploaded
        for (const f of fileList) {
            if (f.name.endsWith(".zip")) {
                try {
                    const zip = await JSZip.loadAsync(await f.arrayBuffer());
                    const zipEntries = Object.keys(zip.files).filter(k => k.endsWith(".docx") && !k.startsWith("__MACOSX") && !k.startsWith("~$"));
                    for (const entry of zipEntries) {
                        const blob = await zip.files[entry].async("blob");
                        const cleanName = entry.split("/").pop();
                        docxFiles.push(new File([blob], cleanName, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }));
                    }
                    showToast(`Đã giải nén ${zipEntries.length} file Word từ file ZIP!`);
                } catch (zErr) {
                    console.error("ZIP read error:", zErr);
                }
            } else if (f.name.endsWith(".docx") && !f.name.startsWith("~$")) {
                docxFiles.push(f);
            }
        }

        if (docxFiles.length === 0) {
            showToast("Vui lòng tải file Word (.docx) hoặc file nén (.zip) chứa file Word!", "error");
            return;
        }

        const wf = getCurrentWorkflow();
        let matchedCount = 0;
        let lastMatchedDocId = null;

        for (const file of docxFiles) {
            let matchedDoc = findBestMatchingDoc(file.name, wf.documents, state.activeDocId, state.viewMode === "single" && docxFiles.length === 1);

            if (matchedDoc) {
                const arrayBuffer = await file.arrayBuffer();
                const paragraphs = await extractParagraphsFromBuffer(arrayBuffer);
                const mappings = detectEntitiesForDocument(matchedDoc, paragraphs);
                const styledHtml = await parseDocxToStyledHtml(arrayBuffer, mappings);

                state.batchFiles[matchedDoc.id] = {
                    file: file,
                    name: file.name,
                    size: file.size,
                    arrayBuffer: arrayBuffer,
                    paragraphs: paragraphs,
                    styledHtml: styledHtml,
                    mappings: mappings,
                    status: "matched",
                    isCustom: true,
                    isUploaded: true
                };

                delete workingDraftHtml[matchedDoc.id];
                localStorage.removeItem("ho_so_custom_template_html_" + matchedDoc.id);

                matchedCount++;
                lastMatchedDocId = matchedDoc.id;
            }
        }

        renderBatchTable();

        if (state.viewMode === "single" && lastMatchedDocId) {
            state.activeDocId = lastMatchedDocId;
            await renderSingleView();
        }

        showToast(`Đã nhận diện và khớp thành công ${matchedCount} văn bản!`);
    }

    async function extractParagraphsFromBuffer(arrayBuffer) {
        try {
            const zip = await JSZip.loadAsync(arrayBuffer);
            const docXmlStr = await zip.file("word/document.xml").async("string");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(docXmlStr, "application/xml");
            const pNodes = xmlDoc.getElementsByTagName("w:p");
            const list = [];
            for (let i = 0; i < pNodes.length; i++) {
                const tNodes = pNodes[i].getElementsByTagName("w:t");
                let text = "";
                for (let j = 0; j < tNodes.length; j++) text += tNodes[j].textContent || "";
                if (text.trim() !== "") list.push(text.trim());
            }
            return list;
        } catch (e) {
            console.error("Error extracting paragraphs:", e);
            return [];
        }
    }

    // -------------------------------------------------------------
    // OpenXML (.docx) to Rich Styled HTML Parser
    // Bảo tồn: Khung bảng 2 cột tiêu ngữ/cơ quan, bảng dữ liệu,
    // căn lề (giữa, phải, đều 2 bên), in đậm/nghiêng/gạch chân,
    // và nhúng thẻ biến tương tác có nút xóa (x).
    // -------------------------------------------------------------
    async function parseDocxToStyledHtml(arrayBuffer, mappings = []) {
        try {
            const zip = await JSZip.loadAsync(arrayBuffer);
            const docXmlFile = zip.file("word/document.xml");
            if (!docXmlFile) return "";
            const docXmlStr = await docXmlFile.async("string");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(docXmlStr, "application/xml");

            const body = xmlDoc.getElementsByTagName("w:body")[0] || xmlDoc.getElementsByTagName("body")[0];
            if (!body) return "";

            let html = "";

            function parseRun(rNode) {
                let rPr = null;
                let runHtml = "";

                let isBold = false;
                let isItalic = false;
                let isUnderline = false;
                let fontSizePt = null;

                for (let c = 0; c < rNode.childNodes.length; c++) {
                    const child = rNode.childNodes[c];
                    if (!child || child.nodeType !== 1) continue;
                    const local = child.localName || child.nodeName.split(":").pop();
                    if (local === "rPr") {
                        rPr = child;
                        for (let k = 0; k < rPr.childNodes.length; k++) {
                            const prop = rPr.childNodes[k];
                            if (!prop || prop.nodeType !== 1) continue;
                            const pLocal = prop.localName || prop.nodeName.split(":").pop();
                            const val = (typeof prop.getAttribute === "function") ? (prop.getAttribute("w:val") || prop.getAttribute("val")) : null;
                            if (pLocal === "b" && val !== "0" && val !== "false") isBold = true;
                            if (pLocal === "i" && val !== "0" && val !== "false") isItalic = true;
                            if (pLocal === "u" && val !== "none") isUnderline = true;
                            if (pLocal === "sz" && val) fontSizePt = Math.round(parseInt(val, 10) / 2);
                        }
                    } else if (local === "t") {
                        const raw = child.textContent || "";
                        runHtml += escapeHtml(raw);
                    } else if (local === "br") {
                        runHtml += "<br>";
                    } else if (local === "tab") {
                        runHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                }

                if (!runHtml) return "";

                if (isBold) runHtml = `<strong>${runHtml}</strong>`;
                if (isItalic) runHtml = `<em>${runHtml}</em>`;
                if (isUnderline) runHtml = `<u>${runHtml}</u>`;
                if (fontSizePt && fontSizePt >= 14) {
                    runHtml = `<span style="font-size: ${fontSizePt}pt;">${runHtml}</span>`;
                }
                return runHtml;
            }

            function parseParagraph(pNode) {
                let pPr = null;
                let align = "left";
                let indent = false;
                let hasBottomBorder = false;

                for (let i = 0; i < pNode.childNodes.length; i++) {
                    const child = pNode.childNodes[i];
                    if (!child || child.nodeType !== 1) continue;
                    const local = child.localName || child.nodeName.split(":").pop();
                    if (local === "pPr") {
                        pPr = child;
                        for (let j = 0; j < pPr.childNodes.length; j++) {
                            const prop = pPr.childNodes[j];
                            if (!prop || prop.nodeType !== 1) continue;
                            const pl = prop.localName || prop.nodeName.split(":").pop();
                            if (pl === "jc") {
                                const val = (typeof prop.getAttribute === "function") ? (prop.getAttribute("w:val") || prop.getAttribute("val")) : null;
                                if (val === "center") align = "center";
                                else if (val === "right") align = "right";
                                else if (val === "both" || val === "distribute") align = "justify";
                                else if (val === "left") align = "left";
                            } else if (pl === "ind") {
                                const fl = (typeof prop.getAttribute === "function") ? (prop.getAttribute("w:firstLine") || prop.getAttribute("firstLine")) : null;
                                if (fl && parseInt(fl, 10) > 200) indent = true;
                            } else if (pl === "pBdr") {
                                const btm = prop.getElementsByTagName("w:bottom")[0] || prop.getElementsByTagName("bottom")[0];
                                if (btm) hasBottomBorder = true;
                            }
                        }
                        break;
                    }
                }

                let innerHtml = "";
                for (let i = 0; i < pNode.childNodes.length; i++) {
                    const child = pNode.childNodes[i];
                    if (!child || child.nodeType !== 1) continue;
                    const local = child.localName || child.nodeName.split(":").pop();
                    if (local === "r") {
                        innerHtml += parseRun(child);
                    } else if (local === "hyperlink") {
                        const rNodes = child.getElementsByTagName("w:r");
                        for (let r = 0; r < rNodes.length; r++) innerHtml += parseRun(rNodes[r]);
                    }
                }

                const styleArr = [];
                if (align !== "left") styleArr.push(`text-align: ${align}`);
                if (indent && align === "justify") styleArr.push("text-indent: 28px");
                if (hasBottomBorder) styleArr.push("border-bottom: 1.5px solid #334155; width: fit-content; margin-left: auto; margin-right: auto; padding-bottom: 2px");

                const styleStr = styleArr.length > 0 ? ` style="${styleArr.join('; ')}"` : "";
                const alignClass = align === "center" ? "text-center" : (align === "right" ? "text-right" : (align === "justify" ? "text-justify" : ""));

                return `<p class="mb-2 leading-relaxed text-slate-800 ${alignClass}"${styleStr}>${innerHtml || "&nbsp;"}</p>`;
            }

            function parseTable(tblNode) {
                let isBorderless = true;
                const borders = tblNode.getElementsByTagName("w:tblBorders")[0] || tblNode.getElementsByTagName("tblBorders")[0];
                if (borders) {
                    for (let b = 0; b < borders.childNodes.length; b++) {
                        const bNode = borders.childNodes[b];
                        if (!bNode || bNode.nodeType !== 1) continue;
                        const val = (typeof bNode.getAttribute === "function") ? (bNode.getAttribute("w:val") || bNode.getAttribute("val")) : null;
                        if (val && val !== "none" && val !== "nil") {
                            isBorderless = false;
                            break;
                        }
                    }
                }

                const trNodes = [];
                for (let i = 0; i < tblNode.childNodes.length; i++) {
                    const child = tblNode.childNodes[i];
                    if (!child || child.nodeType !== 1) continue;
                    const local = child.localName || child.nodeName.split(":").pop();
                    if (local === "tr") trNodes.push(child);
                }

                if (trNodes.length <= 4 && isBorderless) {
                    // Header hoặc Signature layout table (2 cột)
                    let tblHtml = `<table class="w-full my-2 border-collapse" style="width: 100%; border: none; margin-bottom: 14px;"><tbody>`;
                    for (let r = 0; r < trNodes.length; r++) {
                        const tr = trNodes[r];
                        tblHtml += `<tr style="border: none;">`;
                        const tcNodes = [];
                        for (let c = 0; c < tr.childNodes.length; c++) {
                            const child = tr.childNodes[c];
                            if (!child || child.nodeType !== 1) continue;
                            const local = child.localName || child.nodeName.split(":").pop();
                            if (local === "tc") tcNodes.push(child);
                        }
                        for (let c = 0; c < tcNodes.length; c++) {
                            const tc = tcNodes[c];
                            const widthPct = (c === 0) ? "45%" : "55%";
                            const padStyle = (c === 0) ? "padding: 2px 10px 2px 0;" : "padding: 2px 0 2px 10px;";
                            tblHtml += `<td style="vertical-align: top; width: ${widthPct}; border: none; ${padStyle}">`;
                            for (let p = 0; p < tc.childNodes.length; p++) {
                                const pChild = tc.childNodes[p];
                                if (!pChild || pChild.nodeType !== 1) continue;
                                const pLocal = pChild.localName || pChild.nodeName.split(":").pop();
                                if (pLocal === "p") {
                                    tblHtml += parseParagraph(pChild);
                                }
                            }
                            tblHtml += `</td>`;
                        }
                        tblHtml += `</tr>`;
                    }
                    tblHtml += `</tbody></table>`;
                    return tblHtml;
                } else {
                    // Data table có viền
                    let tblHtml = `<table class="w-full my-3 border-collapse border border-slate-400 text-sm" style="width: 100%; border-collapse: collapse; margin-bottom: 16px;"><tbody>`;
                    for (let r = 0; r < trNodes.length; r++) {
                        const tr = trNodes[r];
                        tblHtml += `<tr>`;
                        const tcNodes = [];
                        for (let c = 0; c < tr.childNodes.length; c++) {
                            const child = tr.childNodes[c];
                            if (!child || child.nodeType !== 1) continue;
                            const local = child.localName || child.nodeName.split(":").pop();
                            if (local === "tc") tcNodes.push(child);
                        }
                        for (let c = 0; c < tcNodes.length; c++) {
                            const tc = tcNodes[c];
                            tblHtml += `<td class="border border-slate-300 p-2 text-slate-800" style="vertical-align: top; border: 1px solid #cbd5e1; padding: 6px 8px;">`;
                            for (let p = 0; p < tc.childNodes.length; p++) {
                                const pChild = tc.childNodes[p];
                                if (!pChild || pChild.nodeType !== 1) continue;
                                const pLocal = pChild.localName || pChild.nodeName.split(":").pop();
                                if (pLocal === "p") {
                                    tblHtml += parseParagraph(pChild);
                                }
                            }
                            tblHtml += `</td>`;
                        }
                        tblHtml += `</tr>`;
                    }
                    tblHtml += `</tbody></table>`;
                    return tblHtml;
                }
            }

            for (let i = 0; i < body.childNodes.length; i++) {
                const child = body.childNodes[i];
                if (!child || child.nodeType !== 1) continue;
                const local = child.localName || child.nodeName.split(":").pop();
                if (local === "p") {
                    html += parseParagraph(child);
                } else if (local === "tbl") {
                    html += parseTable(child);
                }
            }

            // Gán các thực thể tự động nhận diện thành mã {TAG}
            (mappings || []).forEach(m => {
                if (m.originalText) {
                    const esc = escapeHtml(m.originalText);
                    if (html.includes(esc)) {
                        html = html.split(esc).join(`{${m.tag}}`);
                    } else if (html.includes(m.originalText)) {
                        html = html.split(m.originalText).join(`{${m.tag}}`);
                    }
                }
            });

            // Chuẩn hóa tất cả {{TAG}} hoặc {TAG} thành {TAG} chuẩn mực duy nhất
            html = html.replace(/\{+([A-Z0-9_]+)\}+/g, (match, tag) => {
                return `{${tag}}`;
            });

            return html;
        } catch (err) {
            console.error("Lỗi parse docx sang HTML định dạng:", err);
            return "";
        }
    }

    // -------------------------------------------------------------
    // 4-Tier Scoping & Anti-Collision Entity Detection
    // -------------------------------------------------------------
    function detectEntitiesForDocument(doc, paragraphs) {
        const fullText = paragraphs.join("\n");
        const mappings = [];

        function addMapping(tag, originalText, tier, reason) {
            if (!originalText || originalText.trim().length < 2) return;
            const cleanText = originalText.trim().replace(/^[\s:–—\-“"']+|[\s;.,”"']+$/g, "");
            if (cleanText.length < 2) return;
            if (mappings.some(m => m.tag === tag || m.originalText === cleanText)) return;

            mappings.push({
                tag: tag,
                originalText: cleanText,
                tier: tier,
                reason: reason,
                count: (fullText.match(new RegExp(cleanText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi")) || []).length
            });
        }

        // =========================================================
        // BƯỚC 1: QUÉT TRỰC TIẾP TỪ THÔNG TIN CHUNG DỰ ÁN (ho_so_tu_dong_state_v3)
        // & TỪ ĐIỂN BIẾN TOÀN CỤC (MASTER_VARIABLES_CATALOG)
        // =========================================================
        try {
            const rawState = localStorage.getItem("ho_so_tu_dong_state_v3");
            if (rawState) {
                const appData = JSON.parse(rawState);
                const gInfo = appData.generalInfo || {};
                for (const [key, val] of Object.entries(gInfo)) {
                    if (val && typeof val === "string" && val.trim().length >= 3) {
                        const strVal = val.trim();
                        if (fullText.includes(strVal)) {
                            addMapping(key, strVal, 1, "Thông tin chung dự án");
                        } else if (fullText.toLowerCase().includes(strVal.toLowerCase())) {
                            const idx = fullText.toLowerCase().indexOf(strVal.toLowerCase());
                            const matchedStr = fullText.substr(idx, strVal.length);
                            addMapping(key, matchedStr, 1, "Thông tin chung dự án");
                        }
                    }
                }
            }
        } catch (e) {
            console.warn("Lỗi quét generalInfo:", e);
        }

        // Quét tiếp qua Từ điển biến MASTER_VARIABLES_CATALOG (ví dụ, tên mẫu CĐT, Ban QLDA...)
        // Ưu tiên khớp chính xác nguyên bản trước (ví dụ CĐT VIẾT HOA trước CĐT thường)
        if (typeof MASTER_VARIABLES_CATALOG !== "undefined" && Array.isArray(MASTER_VARIABLES_CATALOG)) {
            // Lượt 1: Khớp chính xác cả chữ hoa/thường
            MASTER_VARIABLES_CATALOG.forEach(v => {
                if (v.example && typeof v.example === "string" && v.example.trim().length >= 4) {
                    const ex = v.example.trim();
                    if (!/^\d+$/.test(ex) && !/^\d+\s*ngày$/i.test(ex)) {
                        if (fullText.includes(ex)) {
                            addMapping(v.tag, ex, v.tier || (v.isGeneral ? 1 : 2), `Từ điển: ${v.label}`);
                        }
                    }
                }
            });
            // Lượt 2: Khớp không phân biệt hoa thường nếu chưa được gán
            MASTER_VARIABLES_CATALOG.forEach(v => {
                if (v.example && typeof v.example === "string" && v.example.trim().length >= 4) {
                    const ex = v.example.trim();
                    if (!/^\d+$/.test(ex) && !/^\d+\s*ngày$/i.test(ex)) {
                        if (!mappings.some(m => m.tag === v.tag) && fullText.toLowerCase().includes(ex.toLowerCase())) {
                            const idx = fullText.toLowerCase().indexOf(ex.toLowerCase());
                            const matchedStr = fullText.substr(idx, ex.length);
                            addMapping(v.tag, matchedStr, v.tier || (v.isGeneral ? 1 : 2), `Từ điển: ${v.label}`);
                        }
                    }
                }
            });
        }

        // =========================================================
        // BƯỚC 2: NHẬN DIỆN CẤU TRÚC HÀNH CHÍNH CHUẨN NĐ 30/2020/NĐ-CP
        // =========================================================
        // 2.1 Tiêu đề cơ quan / Chủ đầu tư (Bên trái bảng header)
        const headerOrgMatches = [
            /(?:^|\n)\s*(CẢNG HÀNG KHÔNG QUỐC TẾ[^\n\r]+)/,
            /(?:^|\n)\s*(TỔNG CÔNG TY[^\n\r]+)/,
            /(?:^|\n)\s*(CÔNG TY\s+[^\n\r]+)/,
            /(?:^|\n)\s*(BAN QUẢN LÝ[^\n\r]+)/
        ];
        for (const reg of headerOrgMatches) {
            const m = fullText.match(reg);
            if (m && m[1] && m[1].trim().length < 80) {
                addMapping("TEN_CHU_DAU_TU_VIET_HOA", m[1].trim(), 1, "Tên đơn vị / CĐT (Header)");
                break;
            }
        }

        // 2.2 Phòng ban thực hiện / Ban QLDA (Dòng thứ 2 bên trái header)
        const deptMatches = [
            /(?:^|\n)\s*(PHÒNG\s+[A-Z0-9\-_–— ]+)/i,
            /(?:^|\n)\s*(BAN\s+[A-Z0-9\-_–— ]+)/i,
            /(?:^|\n)\s*(TRUNG TÂM\s+[A-Z0-9\-_–— ]+)/i
        ];
        for (const reg of deptMatches) {
            const m = fullText.match(reg);
            if (m && m[1] && m[1].trim().length < 50) {
                addMapping("TEN_BAN_QUAN_LY_DU_AN", m[1].trim(), 1, "Phòng ban / Đơn vị thực hiện");
                break;
            }
        }

        // 2.3 Hạng mục mua sắm / Gói thầu / Dự toán
        const hmMatch = fullText.match(/hạng mục\s*[:–—\-]\s*[“"']?([^”"'\n\r]{6,150})[”"']?/i) ||
                        fullText.match(/nội dung mua sắm\s*[:–—\-]\s*[“"']?([^”"'\n\r]{6,150})[”"']?/i) ||
                        fullText.match(/dự toán mua sắm\s*[:–—\-]\s*[“"']?([^”"'\n\r]{6,150})[”"']?/i);
        if (hmMatch && hmMatch[1]) {
            addMapping("TEN_GOI_THAU", hmMatch[1].trim(), 2, "Hạng mục / Gói thầu mua sắm");
        }

        // 2.4 Kính gửi: Giám đốc / Thủ trưởng
        const kgMatch = fullText.match(/kính gửi\s*[:–—\-]\s*([^\n\r.,;]{4,80})/i);
        if (kgMatch && kgMatch[1]) {
            addMapping("CHUC_VU_NGUOI_KY", kgMatch[1].trim(), 1, "Chức vụ người nhận / Kính gửi");
        }

        // 2.5 Cấp quyết định / Tổng công ty trong căn cứ
        const capQdMatch = fullText.match(/(Tổng công ty Cảng hàng không Việt Nam\s*[–—-]\s*CTCP)/i);
        if (capQdMatch && capQdMatch[1]) {
            addMapping("CAP_QUYET_DINH_DAU_TU", capQdMatch[1].trim(), 1, "Cấp quyết định đầu tư");
        }

        // =========================================================
        // BƯỚC 3: CÁC QUY TẮC NHẬN DIỆN CÒN LẠI (SỐ VB, NGÀY THÁNG, GIÁ TIỀN, MST, CĂN CỨ)
        // =========================================================
        // Chủ đầu tư (dạng nhãn)
        const cdtRegexes = [
            /chủ đầu tư\s*[:–—\-]\s*([^\n.,;]{4,80})/i,
            /bên a\s*\(?[^\n)]*\)?\s*[:–—\-]\s*([^\n.,;]{4,80})/i
        ];
        for (const reg of cdtRegexes) {
            const m = fullText.match(reg);
            if (m && m[1]) { addMapping("TEN_CHU_DAU_TU", m[1], 1, "Chủ đầu tư chung"); break; }
        }

        // Tên dự án
        const daRegexes = [
            /dự án\s*[:–—\-]\s*([^\n;]{6,120})/i,
            /công trình\s*[:–—\-]\s*([^\n;]{6,120})/i
        ];
        for (const reg of daRegexes) {
            const m = fullText.match(reg);
            if (m && m[1]) { addMapping("TEN_DU_AN", m[1], 1, "Tên dự án chung"); break; }
        }

        // Địa danh
        const ddMatch = fullText.match(/(?:^|\n)\s*([A-ZÀ-Ỹa-zà-ỹ\s]{2,30}?),\s*ngày\s+\d+\s+tháng\s+\d+/);
        if (ddMatch && ddMatch[1] && ddMatch[1].trim().length < 25) {
            addMapping("DIA_DANH", ddMatch[1].trim(), 1, "Địa danh phát hành VB");
        }

        // Tên gói thầu
        const gtMatch = fullText.match(/gói thầu\s*(?:số\s*\d+)?\s*[:–—\-]\s*([^\n;]{6,120})/i);
        if (gtMatch && gtMatch[1]) {
            addMapping("TEN_GOI_THAU", gtMatch[1], 2, "Tên gói thầu");
        }

        // Tên nhà thầu
        const ntMatch = fullText.match(/nhà thầu\s*(?:trúng thầu|được chỉ định)?\s*[:–—\-]\s*([^\n.,;]{6,90})/i) ||
                        fullText.match(/bên b\s*\(?[^\n)]*\)?\s*[:–—\-]\s*([^\n.,;]{6,90})/i);
        if (ntMatch && ntMatch[1]) {
            addMapping("TEN_NHA_THAU", ntMatch[1], 2, "Tên nhà thầu");
        }

        // Giá gói thầu / Giá hợp đồng / Giá mua sắm
        const giaMatch = fullText.match(/([\d]{1,3}(?:\.[\d]{3})+)\s*(?:đồng|vnđ)/i);
        if (giaMatch && giaMatch[1]) {
            if (doc && (doc.code?.includes("HD") || doc.name?.toLowerCase().includes("hợp đồng"))) {
                addMapping("GIA_TRI_HOP_DONG_SO", giaMatch[1], 2, "Giá trị hợp đồng");
            } else if (doc && (doc.code?.includes("BC") || doc.name?.toLowerCase().includes("báo cáo"))) {
                addMapping("GIA_TRI_HOP_DONG_SO", giaMatch[1], 2, "Giá trị mua sắm / hợp đồng");
            } else {
                addMapping("GIA_GOI_THAU_SO", giaMatch[1], 2, "Giá gói thầu");
            }
        }

        // Mã số thuế
        const mstMatch = fullText.match(/(?:mã số thuế|mst)\s*[:–—\-]?\s*([0-9]{10}(?:-[0-9]{3})?)/i);
        if (mstMatch && mstMatch[1]) {
            addMapping("MA_SO_THUE", mstMatch[1].trim(), 2, "Mã số thuế");
        }

        // TẦNG 3: BIẾN ĐỊNH DANH RIÊNG VĂN BẢN
        const soVbMatch = fullText.match(/số\s*[:–—\-]?\s*([0-9a-zA-ZÀ-ỹ\/\.\-_]+)/i);
        if (soVbMatch && soVbMatch[1] && soVbMatch[1].includes("/")) {
            const soStr = soVbMatch[1].trim();
            const dCode = doc?.code || "";
            const dName = (doc?.name || "").toLowerCase();
            if (dCode.includes("TTr") || dName.includes("tờ trình")) {
                addMapping("SO_TO_TRINH", soStr, 3, "Số Tờ trình");
            } else if (dCode.includes("QD") || dName.includes("quyết định")) {
                addMapping("SO_QUYET_DINH", soStr, 3, "Số Quyết định");
            } else if (dCode.includes("BC") || dName.includes("báo cáo")) {
                addMapping("SO_BAO_CAO", soStr, 3, "Số Báo cáo");
            } else if (dCode.includes("GM") || dName.includes("giấy mời")) {
                addMapping("SO_GIAY_MOI", soStr, 3, "Số Giấy mời");
            } else if (dCode.includes("BB") || dName.includes("biên bản")) {
                addMapping("SO_BIEN_BAN_HOAN_THIEN", soStr, 3, "Số Biên bản");
            } else if (dCode.includes("HD") || dName.includes("hợp đồng")) {
                addMapping("SO_HOP_DONG", soStr, 3, "Số Hợp đồng");
            }
        }

        // Ngày tháng trên tiêu đề văn bản (ngày dd tháng mm năm yyyy)
        const ngayLongMatch = fullText.match(/ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i);
        if (ngayLongMatch) {
            const rawLongDate = ngayLongMatch[0];
            const dCode = doc?.code || "";
            const dName = (doc?.name || "").toLowerCase();
            if (dCode.includes("TTr") || dName.includes("tờ trình")) {
                addMapping("NGAY_TO_TRINH_FULL", rawLongDate, 3, "Ngày Tờ trình đầy đủ (Header)");
            } else if (dCode.includes("QD") || dName.includes("quyết định")) {
                addMapping("NGAY_QUYET_DINH_FULL", rawLongDate, 3, "Ngày QĐ đầy đủ (Header)");
            } else if (dCode.includes("BC") || dName.includes("báo cáo")) {
                addMapping("NGAY_BAO_CAO_FULL", rawLongDate, 3, "Ngày Báo cáo đầy đủ (Header)");
            } else if (dCode.includes("GM") || dName.includes("giấy mời")) {
                addMapping("NGAY_GIAY_MOI_FULL", rawLongDate, 3, "Ngày Giấy mời đầy đủ (Header)");
            } else if (dCode.includes("BB") || dName.includes("biên bản")) {
                addMapping("NGAY_BIEN_BAN_FULL", rawLongDate, 3, "Ngày Biên bản đầy đủ (Header)");
            } else if (dCode.includes("HD") || dName.includes("hợp đồng")) {
                addMapping("NGAY_HOP_DONG_FULL", rawLongDate, 3, "Ngày Hợp đồng đầy đủ (Header)");
            }
        }

        // TẦNG 4: BIẾN TRÍCH DẪN CĂN CỨ HỖN HỢP
        const canCuTTrMatch = fullText.match(/(?:tờ trình số\s+|căn cứ tờ trình số\s+)([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{4})/i) ||
                              fullText.match(/tờ trình\s+(?:số\s+)?([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
        if (canCuTTrMatch) {
            addMapping("TEN_KEM_SO_NGAY_TO_TRINH", canCuTTrMatch[0], 4, "Trích dẫn căn cứ Tờ trình");
        }

        const canCuQdMatch = fullText.match(/(?:quyết định số\s+|căn cứ quyết định số\s+)([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{4})/i) ||
                             fullText.match(/quyết định\s+(?:số\s+)?([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
        if (canCuQdMatch) {
            addMapping("TEN_KEM_SO_NGAY_QUYET_DINH", canCuQdMatch[0], 4, "Trích dẫn căn cứ Quyết định");
        }

        return mappings;
    }

    // -------------------------------------------------------------
    // Batch Table Renderer
    // -------------------------------------------------------------
    function renderBatchTable() {
        if (!batchDocumentsTableBody) return;
        const wf = getCurrentWorkflow();
        let filledCount = 0;

        batchDocumentsTableBody.innerHTML = wf.documents.map((doc, idx) => {
            const batchItem = state.batchFiles[doc.id];
            const hasCustomSaved = !!localStorage.getItem("ho_so_custom_template_" + doc.id);
            const hasBuiltin = !!getBuiltinTemplateForDoc(doc.id, doc);
            const hasAnyTemplate = !!batchItem || hasCustomSaved || hasBuiltin;
            if (hasAnyTemplate) filledCount++;

            let fileCell = "";
            if (batchItem) {
                fileCell = `
                    <div class="flex items-center space-x-1.5 font-medium text-slate-800 text-[10.5px]">
                        <i class="fa-solid fa-file-word text-blue-600 text-xs shrink-0"></i>
                        <span class="truncate max-w-[200px]" title="${batchItem.name}">${batchItem.name}</span>
                        ${batchItem.size ? `<span class="text-[9px] text-slate-400 font-mono shrink-0">(${(batchItem.size/1024).toFixed(0)}KB)</span>` : ""}
                    </div>
                `;
            } else if (hasCustomSaved) {
                fileCell = `
                    <div class="flex items-center space-x-1.5 font-medium text-amber-800 text-[10.5px]">
                        <i class="fa-solid fa-star text-amber-500 text-xs shrink-0"></i>
                        <span class="truncate max-w-[200px]" title="Mẫu đã chỉnh sửa và áp dụng làm chuẩn">Mẫu chuẩn tùy biến</span>
                    </div>
                `;
            } else if (hasBuiltin) {
                fileCell = `
                    <div class="flex items-center space-x-1.5 font-medium text-slate-700 text-[10.5px]">
                        <i class="fa-solid fa-file-word text-blue-500 text-xs shrink-0"></i>
                        <span class="truncate max-w-[200px]" title="Mẫu Word tích hợp sẵn trong hệ thống">Mẫu gốc có sẵn</span>
                    </div>
                `;
            } else {
                fileCell = `
                    <div class="text-slate-400 italic text-[10px] flex items-center gap-1">
                        <i class="fa-regular fa-circle-xmark text-slate-300 text-[9px]"></i>
                        <span>Chưa có file</span>
                    </div>
                `;
            }

            // Tier distribution pills
            let tagsSummary = `<span class="text-slate-300 text-[10px]">—</span>`;
            if (batchItem && batchItem.mappings && batchItem.mappings.length > 0) {
                const t1 = batchItem.mappings.filter(m => m.tier === 1).length;
                const t2 = batchItem.mappings.filter(m => m.tier === 2).length;
                const t3 = batchItem.mappings.filter(m => m.tier === 3).length;
                const t4 = batchItem.mappings.filter(m => m.tier === 4).length;

                tagsSummary = `
                    <div class="flex flex-wrap items-center gap-1 text-[9px]">
                        ${t1 > 0 ? `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 py-0.2 rounded font-bold" title="${t1} biến dùng chung dự án">🟢 ${t1} chung</span>` : ""}
                        ${t2 > 0 ? `<span class="bg-blue-50 text-blue-800 border border-blue-200 px-1 py-0.2 rounded font-bold" title="${t2} biến gói thầu">🔵 ${t2} gói</span>` : ""}
                        ${t3 > 0 ? `<span class="bg-amber-50 text-amber-800 border border-amber-200 px-1 py-0.2 rounded font-bold" title="${t3} biến định danh số VB riêng">🟡 ${t3} riêng</span>` : ""}
                        ${t4 > 0 ? `<span class="bg-purple-50 text-purple-800 border border-purple-200 px-1 py-0.2 rounded font-bold" title="${t4} biến trích dẫn căn cứ">🟣 ${t4} căn cứ</span>` : ""}
                    </div>
                `;
            }

            let statusBadge = "";
            if (hasCustomSaved) {
                statusBadge = `<span class="bg-amber-50 text-amber-800 border border-amber-300 font-bold px-1.5 py-0.2 rounded text-[9.5px] inline-flex items-center gap-1"><i class="fa-solid fa-star text-amber-500 text-[8.5px]"></i> Mẫu tùy biến</span>`;
            } else if (batchItem) {
                statusBadge = `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-1.5 py-0.2 rounded text-[9.5px] inline-flex items-center gap-1"><i class="fa-solid fa-check text-[8.5px]"></i> Đã khớp</span>`;
            } else if (hasBuiltin) {
                statusBadge = `<span class="bg-blue-50 text-blue-700 border border-blue-200 font-semibold px-1.5 py-0.2 rounded text-[9.5px] inline-flex items-center gap-1"><i class="fa-solid fa-cube text-blue-500 text-[8.5px]"></i> Mẫu có sẵn</span>`;
            } else {
                statusBadge = `<span class="bg-slate-50 text-slate-400 border border-slate-200 font-medium px-1.5 py-0.2 rounded text-[9.5px] inline-flex items-center gap-1">Chờ file</span>`;
            }

            return `
                <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-1 px-1.5 text-center text-slate-400 font-mono text-[9.5px] border-r border-slate-100">${idx + 1}</td>
                    <td class="py-1 px-2 border-r border-slate-100">
                        <div class="font-bold text-slate-800 text-[11px] leading-snug">${doc.name}</div>
                        <div class="font-mono text-[9px] text-emerald-700 font-semibold leading-tight">${doc.code}</div>
                    </td>
                    <td class="py-1 px-2 border-r border-slate-100">${fileCell}</td>
                    <td class="py-1 px-2 border-r border-slate-100">${tagsSummary}</td>
                    <td class="py-1 px-1.5 text-center border-r border-slate-100">${statusBadge}</td>
                    <td class="py-1 px-1.5 text-center">
                        <div class="flex items-center justify-center space-x-1">
                            ${hasAnyTemplate ? `
                                <button type="button" class="btn-edit-doc-detail px-2 py-0.5 text-[9.5px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded cursor-pointer transition-colors flex items-center gap-1" data-id="${doc.id}" title="Chỉnh sửa mẫu văn bản trực quan trong Template Studio">
                                    <i class="fa-solid fa-pen-to-square text-[8.5px]"></i>
                                    <span>Chỉnh sửa mẫu</span>
                                </button>
                                <button type="button" class="btn-download-doc-single px-1.5 py-0.5 text-[9.5px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 rounded cursor-pointer transition-colors" data-id="${doc.id}" title="Tải riêng template này">
                                    <i class="fa-solid fa-download text-[8.5px]"></i>
                                </button>
                            ` : `
                                <button type="button" class="btn-create-doc-from-scratch px-2 py-0.5 text-[9.5px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded cursor-pointer transition-colors flex items-center gap-1" data-id="${doc.id}" title="Khởi tạo và thiết kế mẫu văn bản mới từ đầu trong Studio">
                                    <i class="fa-solid fa-wand-magic-sparkles text-[8.5px] text-emerald-600"></i>
                                    <span>Tạo mẫu mới</span>
                                </button>
                                <button type="button" class="btn-upload-for-slot px-1.5 py-0.5 text-[9.5px] font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded cursor-pointer transition-colors flex items-center gap-1" data-id="${doc.id}" title="Tải file .docx có sẵn từ máy tính">
                                    <i class="fa-solid fa-upload text-[8.5px]"></i>
                                </button>
                            `}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

                if (batchProgressBadge) {
            batchProgressBadge.textContent = `Đã khớp: ${filledCount}/${wf.documents.length} văn bản`;
        }

        // Attach buttons handlers
        batchDocumentsTableBody.querySelectorAll(".btn-edit-doc-detail").forEach(btn => {
            btn.onclick = () => {
                state.activeDocId = btn.getAttribute("data-id");
                switchViewMode("single");
            };
        });

        batchDocumentsTableBody.querySelectorAll(".btn-download-doc-single").forEach(btn => {
            btn.onclick = async () => {
                const docId = btn.getAttribute("data-id");
                await exportSingleDocument(docId);
            };
        });

        batchDocumentsTableBody.querySelectorAll(".btn-create-doc-from-scratch").forEach(btn => {
            btn.onclick = () => {
                state.activeDocId = btn.getAttribute("data-id");
                switchViewMode("single");
            };
        });

        batchDocumentsTableBody.querySelectorAll(".btn-upload-for-slot").forEach(btn => {
            btn.onclick = () => {
                const docId = btn.getAttribute("data-id");
                const singleInput = document.createElement("input");
                singleInput.type = "file";
                singleInput.accept = ".docx";
                singleInput.onchange = async (evt) => {
                    const f = evt.target.files[0];
                    if (f) {
                        const arrayBuffer = await f.arrayBuffer();
                        const paragraphs = await extractParagraphsFromBuffer(arrayBuffer);
                        const docObj = wf.documents.find(d => d.id === docId);
                        state.batchFiles[docId] = {
                            file: f,
                            name: f.name,
                            size: f.size,
                            arrayBuffer: arrayBuffer,
                            paragraphs: paragraphs,
                            mappings: detectEntitiesForDocument(docObj, paragraphs),
                            status: "matched"
                        };
                        renderBatchTable();
                        showToast(`Đã nạp file cho ${docObj.code}!`);
                    }
                };
                singleInput.click();
            };
        });
    }

    if (btnAutoScanAll) {
        btnAutoScanAll.onclick = () => {
            const wf = getCurrentWorkflow();
            let reScanned = 0;
            wf.documents.forEach(doc => {
                const item = state.batchFiles[doc.id];
                if (item && item.paragraphs) {
                    item.mappings = detectEntitiesForDocument(doc, item.paragraphs);
                    reScanned++;
                }
            });
            renderBatchTable();
            showToast(`Đã quét lại ${reScanned} văn bản!`);
        };
    }

    if (btnClearBatchList) {
        btnClearBatchList.onclick = () => {
            if (confirm("Bạn có chắc chắn muốn làm mới toàn bộ danh sách file đã nạp?")) {
                state.batchFiles = {};
                renderBatchTable();
                showToast("Đã làm mới danh sách!");
            }
        };
    }

    // -------------------------------------------------------------
    // Batch Tagging & ZIP Export
    // -------------------------------------------------------------
    if (btnExportAllZip) {
        btnExportAllZip.onclick = async () => {
            const wf = getCurrentWorkflow();
            const docsWithFiles = wf.documents.filter(d => state.batchFiles[d.id]);

            if (docsWithFiles.length === 0) {
                showToast("Chưa có file Word nào được nạp vào quy trình!", "error");
                return;
            }

            try {
                showToast(`Đang gắn thẻ XML và đóng gói ${docsWithFiles.length} file Word...`);
                const outZip = new JSZip();

                for (const doc of docsWithFiles) {
                    const item = state.batchFiles[doc.id];
                    const taggedBlob = await createTaggedDocxBlob(item.arrayBuffer, item.mappings);
                    const cleanFileName = `${doc.code.replace(/[\/\\]/g, "_")}_${doc.name.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]+/g, "_")}.docx`;
                    outZip.file(cleanFileName, taggedBlob);
                }

                const zipContent = await outZip.generateAsync({ type: "blob" });
                const zipFileName = `Templates_${wf.id}_Standardized.zip`;
                saveAs(zipContent, zipFileName);
                showToast(`Đã xuất thành công file ZIP: ${zipFileName}!`);
            } catch (err) {
                console.error("Batch ZIP export error:", err);
                showToast("Lỗi khi đóng gói file ZIP: " + err.message, "error");
            }
        };
    }

    async function createTaggedDocxBlob(arrayBuffer, mappings) {
        const zip = await JSZip.loadAsync(arrayBuffer);
        const targetFiles = Object.keys(zip.files).filter(fn => 
            fn === "word/document.xml" || fn.startsWith("word/header") || fn.startsWith("word/footer")
        );

        for (const fileName of targetFiles) {
            let xmlContent = await zip.file(fileName).async("string");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
            const paragraphs = xmlDoc.getElementsByTagName("w:p");

            for (let i = 0; i < paragraphs.length; i++) {
                const p = paragraphs[i];
                const tNodes = p.getElementsByTagName("w:t");
                if (tNodes.length === 0) continue;

                mappings.forEach(m => {
                    if (!m.originalText || m.originalText.trim() === "") return;
                    const target = m.originalText.trim();
                    const placeholder = `{${m.tag}}`;

                    for (let j = 0; j < tNodes.length; j++) {
                        const node = tNodes[j];
                        if (node.textContent && node.textContent.includes(target)) {
                            node.textContent = node.textContent.split(target).join(placeholder);
                        }
                    }

                    let fullPText = "";
                    for (let j = 0; j < tNodes.length; j++) fullPText += tNodes[j].textContent || "";

                    if (fullPText.includes(target)) {
                        const newFullText = fullPText.split(target).join(placeholder);
                        tNodes[0].textContent = newFullText;
                        for (let j = 1; j < tNodes.length; j++) tNodes[j].textContent = "";
                    }
                });
            }

            const serializer = new XMLSerializer();
            zip.file(fileName, serializer.serializeToString(xmlDoc));
        }

        return await zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
    }

    async function exportSingleDocument(docId) {
        const item = state.batchFiles[docId];
        if (!item) return;
        const wf = getCurrentWorkflow();
        const docObj = wf.documents.find(d => d.id === docId);

        try {
            const blob = await createTaggedDocxBlob(item.arrayBuffer, item.mappings);
            const fileName = `${docObj.code}_${docObj.name.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]+/g, "_")}.docx`;
            saveAs(blob, fileName);
            showToast(`Đã xuất template: ${fileName}`);
        } catch (err) {
            console.error("Single doc export error:", err);
            showToast("Lỗi xuất file: " + err.message, "error");
        }
    }

    // -------------------------------------------------------------
    // Single Document Deep Editor Controller (Template Studio 2.0)
    // -------------------------------------------------------------
    const BUILTIN_DOCX_FILE_MAP = {
        // Triển khai sửa chữa
        "tk_sc_3": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx",
        "tk_sc_5": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx",
        "tk_sc_8": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx",
        "tk_sc_11": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx",

        // Hình thức LCNT: Xây dựng chỉ định thầu rút gọn
        "cdtrg_1": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx",
        "cdtrg_2": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx",
        "cdtrg_3": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/1_Giay_moi_tham_gia.docx",
        "cdtrg_4": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/2_Bien_ban_hoan_thien_hop_dong.docx",
        "cdtrg_5": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/3_To_trinh_chi_dinh_thau.docx",
        "cdtrg_6": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/4_Quyet_dinh_chi_dinh_thau.docx",
        "cdtrg_7": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/07_Hop_dong_kinh_te.docx"
    };

    function getBuiltinTemplateForDoc(docId, docObj) {
        if (BUILTIN_DOCX_FILE_MAP[docId]) return BUILTIN_DOCX_FILE_MAP[docId];
        if (docObj && docObj.templateFile && docObj.templateFile.trim() !== "") return docObj.templateFile;
        return "";
    }

    function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function arrayBufferToBase64(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    // Pre-built Table Definitions Catalog (Unified with app.js)
    const STUDIO_BUILTIN_TABLE_VARS = [
        {
            tag: "BANG_HANG_HOA",
            name: "Danh mục Hàng hóa / Thiết bị / Dịch vụ",
            icon: "📦",
            desc: "Bảng chi tiết tên hàng hóa, quy cách phẩm chất, đơn vị tính, số lượng, đơn giá và tự động tính thành tiền.",
            isSystem: true,
            hasTotal: true,
            totalCol: "thanh_tien",
            currencyWord: true,
            columns: [
                { key: "stt", label: "STT", type: "number", align: "center", widthDx: 600, widthPct: "5%" },
                { key: "ten_hang", label: "Tên hàng hóa / Thiết bị / Dịch vụ", type: "text", align: "left", widthDx: 3400, widthPct: "36%" },
                { key: "dvt", label: "ĐVT", type: "text", align: "center", widthDx: 700, widthPct: "8%" },
                { key: "so_luong", label: "SL", type: "number", align: "right", widthDx: 800, widthPct: "8%" },
                { key: "don_gia", label: "Đơn giá (VNĐ)", type: "currency", align: "right", widthDx: 1400, widthPct: "16%" },
                { key: "thanh_tien", label: "Thành tiền (VNĐ)", type: "calc_amount", align: "right", widthDx: 1500, widthPct: "17%" },
                { key: "ghi_chu", label: "Ghi chú", type: "text", align: "left", widthDx: 1000, widthPct: "10%" }
            ],
            defaultRows: [
                { stt: 1, ten_hang: "Máy bơm ly tâm cánh hở trục đứng chuyên dụng", dvt: "Bộ", so_luong: 2, don_gia: 25000000, thanh_tien: 50000000, ghi_chu: "Mới 100%, CO/CQ" },
                { stt: 2, ten_hang: "Đầu vòi phun chữa cháy tạo bọt phân nhánh đa góc", dvt: "Chiếc", so_luong: 4, don_gia: 6000000, thanh_tien: 24000000, ghi_chu: "Chống gỉ sét" },
                { stt: 3, ten_hang: "Van khóa áp lực cao chuyên dụng mặt bích DN100", dvt: "Bộ", so_luong: 2, don_gia: 13000000, thanh_tien: 26000000, ghi_chu: "Bảo hành 24 tháng" }
            ],
            sampleRows: [
                { stt: 1, name: "Máy chủ lưu trữ dữ liệu chuyên dụng", unit: "Bộ", qty: 2, price: "35.000.000", total: "70.000.000", note: "Dell PowerEdge" },
                { stt: 2, name: "Bộ lưu điện UPS Online 3kVA", unit: "Chiếc", qty: 2, price: "15.000.000", total: "30.000.000", note: "APC Smart-UPS" }
            ]
        },
        {
            tag: "BANG_NHAN_SU",
            name: "Danh sách Nhân sự / Tổ chuyên gia / Tổ thẩm định",
            icon: "👥",
            desc: "Danh sách phân công nhân sự, cơ quan công tác, chức vụ, trình độ chuyên môn và vai trò trong tổ chuyên gia hoặc tổ thẩm định.",
            isSystem: true,
            hasTotal: false,
            columns: [
                { key: "stt", label: "STT", type: "number", align: "center", widthDx: 600, widthPct: "6%" },
                { key: "ho_ten", label: "Họ và tên", type: "text", align: "left", widthDx: 2800, widthPct: "26%" },
                { key: "don_vi", label: "Đơn vị / Chức vụ", type: "text", align: "left", widthDx: 2600, widthPct: "26%" },
                { key: "trinh_do", label: "Trình độ chuyên môn", type: "text", align: "left", widthDx: 2000, widthPct: "22%" },
                { key: "vai_tro", label: "Vai trò trong tổ", type: "text", align: "left", widthDx: 1800, widthPct: "20%" }
            ],
            defaultRows: [
                { stt: 1, ho_ten: "Nguyễn Văn Admin", don_vi: "Trưởng phòng Kỹ thuật hạ tầng", trinh_do: "Kỹ sư Xây dựng / Cảng HK", vai_tro: "Tổ trưởng" },
                { stt: 2, ho_ten: "Trần Thị Bích", don_vi: "Chuyên viên Phòng Kế hoạch - Kế toán", trinh_do: "Cử nhân Kinh tế", vai_tro: "Tổ phó" },
                { stt: 3, ho_ten: "Lê Văn Hùng", don_vi: "Kỹ sư Ban QLDA Cảng HKQT Cần Thơ", trinh_do: "Kỹ sư Điện lực & PCCC", vai_tro: "Thành viên" }
            ],
            sampleRows: [
                { stt: 1, name: "Nguyễn Văn Tuấn", role: "Chủ nhiệm dự án", deg: "Thạc sĩ CNTT", pos: "Chỉ đạo chung kỹ thuật", note: "15 năm kinh nghiệm" },
                { stt: 2, name: "Trần Minh Quang", role: "Kỹ sư trưởng", deg: "Kỹ sư Điện - Điện tử", pos: "Giám sát lắp đặt", note: "Chứng chỉ hành nghề Hạng I" }
            ]
        },
        {
            tag: "BANG_TIEN_DO",
            name: "Kế hoạch Tiến độ & Giải ngân thanh toán",
            icon: "📅",
            desc: "Kế hoạch phân kỳ tiến độ thực hiện các giai đoạn công việc và giải ngân thanh toán hợp đồng.",
            isSystem: true,
            hasTotal: true,
            totalCol: "so_tien",
            currencyWord: true,
            columns: [
                { key: "stt", label: "Đợt", type: "number", align: "center", widthDx: 600, widthPct: "6%" },
                { key: "noi_dung", label: "Giai đoạn / Nội dung thực hiện", type: "text", align: "left", widthDx: 3400, widthPct: "34%" },
                { key: "thoi_han", label: "Thời hạn hoàn thành", type: "text", align: "center", widthDx: 1800, widthPct: "18%" },
                { key: "ty_le", label: "Tỷ lệ (%)", type: "number", align: "right", widthDx: 1000, widthPct: "12%" },
                { key: "so_tien", label: "Số tiền (VNĐ)", type: "currency", align: "right", widthDx: 2200, widthPct: "30%" }
            ],
            defaultRows: [
                { stt: 1, noi_dung: "Tạm ứng hợp đồng sau khi ký kết và nhận bảo lãnh tạm ứng", thoi_han: "Trong 07 ngày", ty_le: 30, so_tien: 30000000 },
                { stt: 2, noi_dung: "Thanh toán đợt 2 sau khi giao hàng & nghiệm thu kỹ thuật tại công trình", thoi_han: "Trong 15 ngày", ty_le: 40, so_tien: 40000000 },
                { stt: 3, noi_dung: "Thanh toán quyết toán đợt cuối sau khi nghiệm thu bàn giao và thanh lý hợp đồng", thoi_han: "Trong 10 ngày", ty_le: 30, so_tien: 30000000 }
            ],
            sampleRows: [
                { stt: 1, task: "Khảo sát hiện trạng và chuẩn bị mặt bằng", days: 3, start: "10/02/2027", end: "12/02/2027", unit: "Nhà thầu" },
                { stt: 2, task: "Cung cấp, vận chuyển và lắp đặt thiết bị", days: 15, start: "13/02/2027", end: "27/02/2027", unit: "Nhà thầu & CĐT" },
                { stt: 3, task: "Chạy thử, kiểm định và nghiệm thu bàn giao", days: 7, start: "28/02/2027", end: "06/03/2027", unit: "Hội đồng nghiệm thu" }
            ]
        }
    ];

    // Standardized Storage Key: ho_so_custom_table_defs (shared across index.html & template-tool.html)
    function getAllStudioTableVars() {
        let customTables = [];
        try {
            const raw = localStorage.getItem("ho_so_custom_table_defs");
            if (raw) {
                customTables = JSON.parse(raw);
            } else {
                // Fallback to legacy key if exists and migrate
                const legacyRaw = localStorage.getItem("ho_so_custom_tables");
                if (legacyRaw) {
                    customTables = JSON.parse(legacyRaw);
                    localStorage.setItem("ho_so_custom_table_defs", JSON.stringify(customTables));
                }
            }
        } catch (e) {
            console.warn("Lỗi đọc custom tables trong Studio:", e);
        }
        if (!Array.isArray(customTables)) customTables = [];

        // Combine built-in with custom tables avoiding duplicates
        const combined = [...STUDIO_BUILTIN_TABLE_VARS];
        customTables.forEach(ct => {
            if (!combined.some(t => t.tag === ct.tag)) {
                combined.push(ct);
            }
        });
        return combined;
    }

    function saveCustomStudioTableDefinitions(customList) {
        try {
            localStorage.setItem("ho_so_custom_table_defs", JSON.stringify(customList));
        } catch (e) {
            console.error("Error saving ho_so_custom_table_defs in Studio:", e);
        }
    }

    function deleteCustomStudioTable(tag) {
        const table = getAllStudioTableVars().find(t => t.tag === tag);
        if (!table) return;
        if (table.isSystem) {
            alert("Không thể xóa 3 bảng chuẩn mực mặc định của hệ thống!");
            return;
        }
        if (!confirm(`Bạn có chắc chắn muốn xóa loại bảng {${tag}} - "${table.name}"?\nThao tác này sẽ xóa trên cả trang Tạo hồ sơ và Xưởng Studio.`)) {
            return;
        }

        let customList = [];
        try {
            const raw = localStorage.getItem("ho_so_custom_table_defs");
            if (raw) customList = JSON.parse(raw);
        } catch (e) {}

        customList = customList.filter(t => t.tag !== tag);
        saveCustomStudioTableDefinitions(customList);

        if (currentStudioActiveDictTableTag === tag) {
            currentStudioActiveDictTableTag = "BANG_HANG_HOA";
        }

        renderPaletteTableVars();
        updateStudioDictBadgeCounts();
        renderStudioDictTableView();
        showToast(`Đã xóa loại bảng {${tag}} thành công!`, "success");
    }

    // Auto-load template buffer for any document
    async function getOrLoadBufferForDocument(docId) {
        if (state.batchFiles[docId] && state.batchFiles[docId].arrayBuffer) {
            return state.batchFiles[docId];
        }

        const wf = getCurrentWorkflow();
        const docObj = (wf && wf.documents) ? (wf.documents.find(d => d.id === docId) || { id: docId, name: docId }) : { id: docId, name: docId };

        // 1. Kiểm tra mẫu tùy biến đã lưu trong localStorage
        const customB64 = localStorage.getItem("ho_so_custom_template_" + docId);
        let arrayBuffer = null;
        let fileName = "";
        let isCustom = false;

        if (customB64) {
            try {
                arrayBuffer = base64ToArrayBuffer(customB64);
                fileName = `${docId}_custom.docx`;
                isCustom = true;
            } catch (e) {
                console.warn("Lỗi giải mã template tùy biến từ localStorage:", e);
            }
        }

        // 2. Nếu chưa có, nạp từ bộ mẫu nhúng sẵn BUILTIN_DOCX_TEMPLATES (Chỉ khi có cấu hình tPath)
        if (!arrayBuffer && window.BUILTIN_DOCX_TEMPLATES) {
            const tPath = getBuiltinTemplateForDoc(docId, docObj);
            if (tPath && tPath.trim() !== "") {
                let b64 = window.BUILTIN_DOCX_TEMPLATES[tPath];
                if (!b64) {
                    const baseName = tPath.split("/").pop();
                    const matchedKey = Object.keys(window.BUILTIN_DOCX_TEMPLATES).find(k => k.endsWith(baseName));
                    if (matchedKey) b64 = window.BUILTIN_DOCX_TEMPLATES[matchedKey];
                }
                if (b64) {
                    arrayBuffer = base64ToArrayBuffer(b64);
                    fileName = tPath.split("/").pop();
                    isCustom = false;
                }
            }
        }

        if (!arrayBuffer) return null;

        const paragraphs = await extractParagraphsFromBuffer(arrayBuffer);
        const mappings = detectEntitiesForDocument(docObj, paragraphs);
        const styledHtml = await parseDocxToStyledHtml(arrayBuffer, mappings);

        const item = {
            id: docId,
            name: fileName,
            size: arrayBuffer.byteLength,
            arrayBuffer: arrayBuffer,
            paragraphs: paragraphs,
            styledHtml: styledHtml,
            mappings: mappings,
            isCustom: isCustom
        };

        state.batchFiles[docId] = item;
        return item;
    }

    // State for Studio
    let currentPaletteCat = "all";
    let savedCursorRange = null;
    let studioViewMode = "edit";
    let workingDraftHtml = {}; // "edit" (Khung Mẫu) | "sample" (Xem thử dữ liệu thật)

    // Save Selection in Canvas on any interaction
    function saveCanvasSelection() {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && documentContentDisplay) {
            const range = sel.getRangeAt(0);
            if (documentContentDisplay.contains(range.commonAncestorContainer)) {
                savedCursorRange = range.cloneRange();
            }
        }
    }

    // Insert Tag or Table at Cursor Position
    function insertTagAtCursor(tagString) {
        if (!documentContentDisplay) return;

        // Nếu đang ở chế độ xem thử mẫu, tự động chuyển về chế độ chỉnh sửa
        if (studioViewMode === "sample") {
            const btnEdit = document.getElementById("btnViewModeTemplateEdit");
            if (btnEdit) btnEdit.click();
        }

        if (typeof pushUndoState === "function") {
            pushUndoState(`Chèn thẻ ${tagString}`);
        }

        documentContentDisplay.focus();
        const sel = window.getSelection();
        let range = savedCursorRange;

        const isTable = tagString.startsWith("{BANG_") || tagString.startsWith("BANG_");
        const cleanTag = tagString.replace(/[{}]/g, "");
        const formattedTag = `{${cleanTag}}`;

        if (!range || !documentContentDisplay.contains(range.commonAncestorContainer)) {
            // Chèn vào cuối canvas
            const p = document.createElement("p");
            p.className = "mb-2 leading-relaxed text-slate-800";
            const badgeClass = isTable ? "tag-table-badge" : "tag-badge";
            p.innerHTML = `<span class="${badgeClass}" data-tag="${cleanTag}" contenteditable="false">${formattedTag}<span class="btn-remove-tag" data-tag="${cleanTag}" title="Xóa biến này" contenteditable="false">×</span></span>&nbsp;`;
            documentContentDisplay.appendChild(p);
            showToast(`Đã chèn thẻ ${formattedTag} vào cuối văn bản!`);
            if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            if (typeof renderContextualRecommendedVars === "function") renderContextualRecommendedVars();
            return;
        }

        sel.removeAllRanges();
        sel.addRange(range);

        const badge = document.createElement("span");
        badge.className = isTable ? "tag-table-badge" : "tag-badge";
        badge.setAttribute("data-tag", cleanTag);
        badge.setAttribute("contenteditable", "false");
        badge.innerHTML = `${formattedTag}<span class="btn-remove-tag" data-tag="${cleanTag}" title="Xóa biến này" contenteditable="false">×</span>`;

        range.deleteContents();
        range.insertNode(badge);

        const spacer = document.createTextNode(" ");
        range.setStartAfter(badge);
        range.insertNode(spacer);
        range.setStartAfter(spacer);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);
        savedCursorRange = range.cloneRange();

        if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
        showToast(`Đã chèn ${formattedTag} tại vị trí con trỏ!`);
        if (typeof renderContextualRecommendedVars === "function") {
            renderContextualRecommendedVars();
        }
    }

    // Render Single Document View
    async function renderSingleView() {
        window.renderSingleView = renderSingleView;
        const wf = getCurrentWorkflow();
        if (!state.activeDocId || !wf.documents.some(d => d.id === state.activeDocId)) {
            state.activeDocId = wf.documents[0] ? wf.documents[0].id : null;
        }

        const docObj = wf.documents.find(d => d.id === state.activeDocId) || wf.documents[0];
        if (!docObj) return;

        if (singleDocTitle) singleDocTitle.textContent = `${docObj.code} - ${docObj.name}`;
        const selectSingleDocSwitch = document.getElementById("selectSingleDocSwitch");
        if (selectSingleDocSwitch) {
            selectSingleDocSwitch.innerHTML = wf.documents.map(d => 
                `<option value="${d.id}" ${d.id === docObj.id ? "selected" : ""}>${d.code} - ${d.name}</option>`
            ).join("");
            selectSingleDocSwitch.onchange = async (e) => {
                state.activeDocId = e.target.value;
                await renderSingleView();
            };
        }

        const item = await getOrLoadBufferForDocument(docObj.id, docObj);
        if (singleDocFileNameBadge) {
            singleDocFileNameBadge.textContent = item ? item.name : "(Chưa có file mẫu .docx)";
        }

        const singleDocSourceBadge = document.getElementById("singleDocSourceBadge");
        if (singleDocSourceBadge) {
            if (item && item.isUploaded) {
                singleDocSourceBadge.className = "text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1";
                singleDocSourceBadge.innerHTML = `<i class="fa-solid fa-cloud-arrow-up text-emerald-600 text-[9px]"></i> File vừa tải lên`;
            } else if (item && item.isCustom) {
                singleDocSourceBadge.className = "text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1";
                singleDocSourceBadge.innerHTML = `<i class="fa-solid fa-star text-amber-500 text-[9px]"></i> Mẫu tùy biến (Đang dùng)`;
            } else if (item) {
                singleDocSourceBadge.className = "text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1";
                singleDocSourceBadge.innerHTML = `<i class="fa-solid fa-cube text-blue-500 text-[9px]"></i> Mẫu gốc hệ thống`;
            } else {
                singleDocSourceBadge.className = "text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1";
                singleDocSourceBadge.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-amber-600 text-[9px]"></i> Khởi tạo Mẫu Mới (Chưa có .docx)`;
            }
        }

        // Render Left Palette Tabs
        renderPaletteTextVars();
        renderPaletteTableVars();
        renderSingleMappingRows(item);

        // Render A4 Canvas
        renderCanvasContent(item);

        // Render Contextual Recommended Variables & Coverage
        if (typeof renderContextualRecommendedVars === "function") {
            renderContextualRecommendedVars();
        }
    }

    function escapeHtml(str) {
        return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Helper: Tạo khung mẫu văn bản hành chính Việt Nam chuẩn Nghị định 30/2020/NĐ-CP
    function generateDefaultDocumentScaffold(docObj) {
        const docName = (docObj && docObj.name) ? docObj.name : "VĂN BẢN HÀNH CHÍNH";
        const docCode = (docObj && docObj.code) ? docObj.code : "";
        const nameLower = (docName + " " + docCode).toLowerCase();

        let docTypeTitle = "TỜ TRÌNH";
        let soTag = "{SO_TO_TRINH}";
        let ngayTag = "{NGAY_TO_TRINH}";

        if (nameLower.includes("quyết định") || nameLower.includes("qd-") || nameLower.includes(".qđ")) {
            docTypeTitle = "QUYẾT ĐỊNH";
            soTag = "{SO_QUYET_DINH}";
            ngayTag = "{NGAY_QUYET_DINH}";
        } else if (nameLower.includes("giấy mời") || nameLower.includes("thư mời") || nameLower.includes("gm-") || nameLower.includes("tm-")) {
            docTypeTitle = "GIẤY MỜI";
            soTag = "{SO_GIAY_MOI}";
            ngayTag = "{NGAY_GIAY_MOI}";
        } else if (nameLower.includes("biên bản") || nameLower.includes("bb-")) {
            docTypeTitle = "BIÊN BẢN";
            soTag = "{SO_BIEN_BAN}";
            ngayTag = "{NGAY_BIEN_BAN}";
        } else if (nameLower.includes("hợp đồng") || nameLower.includes("hd-")) {
            docTypeTitle = "HỢP ĐỒNG KINH TẾ";
            soTag = "{SO_HOP_DONG}";
            ngayTag = "{NGAY_HOP_DONG}";
        } else if (nameLower.includes("báo cáo") || nameLower.includes("bc-")) {
            docTypeTitle = "BÁO CÁO";
            soTag = "{SO_BAO_CAO}";
            ngayTag = "{NGAY_BAO_CAO}";
        }

        if (docTypeTitle === "QUYẾT ĐỊNH") {
            return `
<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; font-family: 'Times New Roman', serif;">
    <div style="text-align: center; width: 45%;">
        <p style="margin: 0; font-size: 13pt; text-transform: uppercase;">{TEN_CHU_DAU_TU_VIET_HOA}</p>
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">{TEN_BAN_QUAN_LY_DU_AN}</p>
        <p style="margin: 0; font-size: 12pt;">Số: ${soTag}</p>
    </div>
    <div style="text-align: center; width: 50%;">
        <p style="margin: 0; font-size: 12.5pt; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</p>
        <p style="margin: 6px 0 0 0; font-size: 13pt; font-style: italic;">{DIA_DANH}, ${ngayTag}</p>
    </div>
</div>

<div style="text-align: center; margin: 28px 0 20px 0;">
    <h2 style="margin: 0; font-size: 16pt; font-weight: bold; text-transform: uppercase;">QUYẾT ĐỊNH</h2>
    <p style="margin: 6px 0 0 0; font-size: 13pt; font-style: italic;">Về việc phê duyệt: ${docObj.name || '{TEN_GOI_THAU}'}</p>
    <p style="margin: 2px 0 0 0; font-size: 13pt; font-weight: bold;">Gói thầu: {TEN_GOI_THAU}</p>
    <p style="margin: 2px 0 0 0; font-size: 13pt; font-style: italic;">Dự án / Công trình: {TEN_DU_AN}</p>
</div>

<div style="text-align: center; margin-bottom: 18px;">
    <p style="margin: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase;">{CHUC_VU_NGUOI_KY} {TEN_CHU_DAU_TU_VIET_HOA}</p>
</div>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23 tháng 6 năm 2023;</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27 tháng 02 năm 2024 của Chính phủ quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu về lựa chọn nhà thầu;</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ Quyết định thành lập và chức năng nhiệm vụ của {TEN_CHU_DAU_TU};</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Xét đề nghị tại Tờ trình số {SO_TO_TRINH} ngày {NGAY_TO_TRINH} của {CO_QUAN_TRINH} về việc phê duyệt {TEN_GOI_THAU},</p>

<div style="text-align: center; margin: 16px 0;">
    <p style="margin: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase;">QUYẾT ĐỊNH:</p>
</div>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;"><b>Điều 1.</b> Phê duyệt gói thầu: <b>{TEN_GOI_THAU}</b> thuộc dự án <b>{TEN_DU_AN}</b> với các nội dung chi tiết sau:</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Chủ đầu tư: {TEN_CHU_DAU_TU}.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Đơn vị thực hiện / Nhà thầu trúng thầu: <b>{TEN_NHA_THAU}</b> (Mã số thuế: {MA_SO_THUE}, Địa chỉ: {DIA_CHI_NHA_THAU}).</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Giá trị gói thầu: <b>{GIA_GOI_THAU_SO}</b> (Bằng chữ: <i>{GIA_GOI_THAU_CHU}</i>).</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Loại hợp đồng: {LOAI_HOP_DONG}.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Thời gian thực hiện: {THOI_GIAN_THUC_HIEN_GOI_THAU}.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">- Nguồn vốn: {NGUON_VON}.</p>

<div style="margin: 16px 0;">
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 6px;">Danh mục chi tiết:</p>
    <p style="font-size: 13pt; text-align: center;">{BANG_HANG_HOA}</p>
</div>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;"><b>Điều 2.</b> Giao {TEN_BAN_QUAN_LY_DU_AN} chịu trách nhiệm triển khai và phối hợp với nhà thầu {TEN_NHA_THAU} thực hiện theo đúng quy định hiện hành.</p>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 24px;"><b>Điều 3.</b> Các ông (bà) Trưởng phòng Kế hoạch, Kế toán trưởng và Thủ trưởng các đơn vị liên quan chịu trách nhiệm thi hành Quyết định này kể từ ngày ký./.</p>

<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 30px; font-family: 'Times New Roman', serif;">
    <div style="width: 45%;">
        <p style="margin: 0; font-size: 11pt; font-weight: bold; font-style: italic;">Nơi nhận:</p>
        <p style="margin: 2px 0 0 0; font-size: 10.5pt;">- Như Điều 3;</p>
        <p style="margin: 2px 0 0 0; font-size: 10.5pt;">- {CAP_QUYET_DINH_DAU_TU} (để b/c);</p>
        <p style="margin: 2px 0 0 0; font-size: 10.5pt;">- Lưu: VT, BQLDA.</p>
    </div>
    <div style="text-align: center; width: 45%;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">{CHUC_VU_NGUOI_KY}</p>
        <p style="margin: 4px 0 0 0; font-size: 11pt; font-style: italic;">(Ký, ghi rõ họ tên và đóng dấu)</p>
        <div style="height: 70px;"></div>
        <p style="margin: 0; font-size: 13pt; font-weight: bold;">{NGUOI_KY_CDT}</p>
    </div>
</div>
            `.trim();
        }

        // Khung mẫu Tờ trình và văn bản hành chính chung
        return `
<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; font-family: 'Times New Roman', serif;">
    <div style="text-align: center; width: 45%;">
        <p style="margin: 0; font-size: 13pt; text-transform: uppercase;">{TEN_CHU_DAU_TU_VIET_HOA}</p>
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">{TEN_BAN_QUAN_LY_DU_AN}</p>
        <p style="margin: 0; font-size: 12pt;">Số: ${soTag}</p>
    </div>
    <div style="text-align: center; width: 50%;">
        <p style="margin: 0; font-size: 12.5pt; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</p>
        <p style="margin: 6px 0 0 0; font-size: 13pt; font-style: italic;">{DIA_DANH}, ${ngayTag}</p>
    </div>
</div>

<div style="text-align: center; margin: 28px 0 20px 0;">
    <h2 style="margin: 0; font-size: 16pt; font-weight: bold; text-transform: uppercase;">${docTypeTitle}</h2>
    <p style="margin: 6px 0 0 0; font-size: 13pt; font-style: italic;">Về việc đề nghị thẩm định và phê duyệt: ${docObj.name || '{TEN_GOI_THAU}'}</p>
    <p style="margin: 2px 0 0 0; font-size: 13pt; font-weight: bold;">Dự án / Công trình: {TEN_DU_AN}</p>
</div>

<div style="text-align: center; margin-bottom: 18px;">
    <p style="margin: 0; font-size: 13pt; font-weight: bold;">Kính gửi: {TEN_CHU_DAU_TU}</p>
</div>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23 tháng 6 năm 2023;</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27 tháng 02 năm 2024 của Chính phủ quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu về lựa chọn nhà thầu;</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">Căn cứ nhu cầu thực tế và hồ sơ tài liệu của dự án {TEN_DU_AN},</p>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">{CO_QUAN_TRINH} kính trình {TEN_CHU_DAU_TU} xem xét, phê duyệt nội dung công việc với các thông tin chi tiết như sau:</p>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">1. Tên gói thầu / hạng mục: <b>{TEN_GOI_THAU}</b>.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">2. Giá dự toán / giá gói thầu: <b>{GIA_GOI_THAU_SO}</b> (Bằng chữ: <i>{GIA_GOI_THAU_CHU}</i>).</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">3. Đơn vị thực hiện / Nhà thầu đề xuất: <b>{TEN_NHA_THAU}</b>.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">4. Hình thức lựa chọn nhà thầu: {HINH_THUC_LCNT}.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">5. Loại hợp đồng: {LOAI_HOP_DONG}.</p>
<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 8px;">6. Thời gian thực hiện: {THOI_GIAN_THUC_HIEN_GOI_THAU}.</p>

<div style="margin: 16px 0;">
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 6px;">Bảng danh mục chi tiết:</p>
    <p style="font-size: 13pt; text-align: center;">{BANG_HANG_HOA}</p>
</div>

<p style="font-size: 13pt; text-indent: 1.27cm; line-height: 1.5; margin-bottom: 24px;">Kính trình {TEN_CHU_DAU_TU} xem xét, quyết định phê duyệt để làm cơ sở triển khai các bước tiếp theo./.</p>

<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 30px; font-family: 'Times New Roman', serif;">
    <div style="width: 45%;">
        <p style="margin: 0; font-size: 11pt; font-weight: bold; font-style: italic;">Nơi nhận:</p>
        <p style="margin: 2px 0 0 0; font-size: 10.5pt;">- Như trên;</p>
        <p style="margin: 2px 0 0 0; font-size: 10.5pt;">- Lưu: VT, BQLDA.</p>
    </div>
    <div style="text-align: center; width: 45%;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">{CO_QUAN_TRINH}</p>
        <p style="margin: 4px 0 0 0; font-size: 11pt; font-style: italic;">(Ký, ghi rõ họ tên)</p>
        <div style="height: 70px;"></div>
        <p style="margin: 0; font-size: 13pt; font-weight: bold;">{TRUONG_BAN_DHDA}</p>
    </div>
</div>
        `.trim();
    }

    // Render Canvas Content based on View Mode
    function renderCanvasContent(item) {
        if (!documentContentDisplay) return;

        const docId = state.activeDocId;
        const currentDraft = workingDraftHtml[docId] || localStorage.getItem("ho_so_custom_template_html_" + docId);
        const wf = getCurrentWorkflow();
        const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === docId) : { id: docId, name: docId, code: docId };

        if (studioViewMode === "edit") {
            documentContentDisplay.contentEditable = "true";
            documentContentDisplay.classList.remove("bg-amber-50/20");

            if (currentDraft && currentDraft.trim() !== "" && !item?.isUploaded) {
                // Hiển thị nội dung tùy biến từ bản thảo hoặc đã lưu
                documentContentDisplay.innerHTML = formatTemplateHtmlWithBadges(currentDraft);
            } else if (item && item.styledHtml && item.styledHtml.trim() !== "") {
                // Hiển thị từ file Word chuẩn OpenXML (giữ nguyên bảng 2 cột, căn giữa, in đậm/nghiêng)
                documentContentDisplay.innerHTML = formatTemplateHtmlWithBadges(item.styledHtml);
                workingDraftHtml[docId] = cleanCanvasHtmlForStorage();
                item.isUploaded = false;
                if (typeof pushUndoState === "function") pushUndoState("Nạp file Word");
            } else if (item && item.paragraphs && item.paragraphs.length > 0) {
                // Fallback nếu không có styledHtml
                const paragraphs = item.paragraphs || [];
                documentContentDisplay.innerHTML = paragraphs.map(p => {
                    let text = escapeHtml(p);
                    (item.mappings || []).forEach(m => {
                        if (m.originalText && text.includes(m.originalText)) {
                            text = text.split(m.originalText).join(`<span class="tag-badge" data-tag="${m.tag}" contenteditable="false">{${m.tag}}<span class="btn-remove-tag" data-tag="${m.tag}" title="Xóa biến này" contenteditable="false">×</span></span>`);
                        }
                    });
                    text = text.replace(/\{([A-Z0-9_]+)\}/g, (match, tag) => {
                        const isTable = tag.startsWith("BANG_");
                        return `<span class="${isTable ? 'tag-table-badge' : 'tag-badge'}" data-tag="${tag}" contenteditable="false">{${tag}}<span class="btn-remove-tag" data-tag="${tag}" title="Xóa biến này" contenteditable="false">×</span></span>`;
                    });
                    return `<p class="mb-2 leading-relaxed text-slate-800">${text}</p>`;
                }).join("");
                workingDraftHtml[docId] = cleanCanvasHtmlForStorage();
                item.isUploaded = false;
                if (typeof pushUndoState === "function") pushUndoState("Nạp file Word");
            } else {
                // Khởi tạo khung mẫu văn bản hành chính chuẩn Nghị định 30/2020/NĐ-CP
                const scaffold = generateDefaultDocumentScaffold(docObj);
                documentContentDisplay.innerHTML = formatTemplateHtmlWithBadges(scaffold);
            }
        } else {
            // Chế độ "Xem Thử Dữ Liệu Thật"
            documentContentDisplay.contentEditable = "false";
            documentContentDisplay.classList.add("bg-amber-50/20");

            let currentRawText = currentDraft || documentContentDisplay.innerHTML;
            if (!currentRawText || currentRawText.trim() === "" || currentRawText.includes("Chưa nạp được nội dung")) {
                currentRawText = generateDefaultDocumentScaffold(docObj);
            }

            const sampleHtml = renderSampleDataPreview(currentRawText, item);
            documentContentDisplay.innerHTML = `
                <div class="mb-4 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center justify-between">
                    <span class="flex items-center gap-1.5 font-bold">
                        <i class="fa-solid fa-eye text-amber-600"></i>
                        <span>Đang xem thử với dữ liệu thực tế mẫu. Bấm nút [Khung Mẫu ({TAG})] bên trên để tiếp tục chỉnh sửa.</span>
                    </span>
                    <span class="bg-amber-200/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold">SAMPLE MODE</span>
                </div>
                ${sampleHtml}
            `;
        }

        // Apply active zoom and update page counts
        if (documentContentDisplay) {
            documentContentDisplay.style.zoom = studioZoomLevel;
        }
        setTimeout(updateStudioPagination, 100);
        if (typeof renderContextualRecommendedVars === "function") {
            renderContextualRecommendedVars();
        }
    }

    // Convert raw HTML template tags into visible badges & page breaks
    function formatTemplateHtmlWithBadges(htmlStr) {
        if (!htmlStr) return "";
        let res = htmlStr;

        // Chuẩn hóa và chuyển mọi dạng {{TAG}} hoặc {TAG} thành badge tương tác có nút xóa (x)
        res = res.replace(/\{+([A-Z0-9_]+)\}+/g, (match, tag) => {
            if (tag === "PAGE_BREAK") {
                return `<div class="a4-page-break" contenteditable="false"><i class="fa-solid fa-file-invoice text-indigo-600 mr-1"></i> DẤU NGẮT TRANG A4 (Hết trang • Bắt đầu trang tiếp theo)</div>`;
            }
            const isTable = tag.startsWith("BANG_");
            const badgeClass = isTable ? "tag-table-badge" : "tag-badge";
            return `<span class="${badgeClass}" data-tag="${tag}" contenteditable="false">{${tag}}<span class="btn-remove-tag" data-tag="${tag}" title="Xóa biến này" contenteditable="false">×</span></span>`;
        });

        return res;
    }

    // Clean canvas HTML back into {TAG} format for storage
    function cleanCanvasHtmlForStorage() {
        if (!documentContentDisplay) return "";
        const clone = documentContentDisplay.cloneNode(true);

        // Xóa alert banner xem thử nếu có
        const alertBanner = clone.querySelector(".bg-gradient-to-r");
        if (alertBanner && alertBanner.textContent.includes("SAMPLE MODE")) alertBanner.remove();

        // Xóa các popover hoặc menu nổi
        clone.querySelectorAll("#tagActionPopover, .tag-action-popover, #selectionMenu").forEach(el => el.remove());

        // Chuyển dấu ngắt trang trở lại {PAGE_BREAK}
        clone.querySelectorAll(".a4-page-break").forEach(el => {
            const textNode = document.createTextNode("\n{PAGE_BREAK}\n");
            el.parentNode.replaceChild(textNode, el);
        });

        // Chuyển badge trở lại thành {TAG} thuần (loại bỏ nút x và text rác)
        clone.querySelectorAll(".tag-badge, .tag-table-badge").forEach(el => {
            el.querySelectorAll(".btn-remove-tag").forEach(b => b.remove());
            const rawTag = el.getAttribute("data-tag") || el.textContent.replace(/[×{}]/g, "").trim();
            const textNode = document.createTextNode(`{${rawTag}}`);
            el.parentNode.replaceChild(textNode, el);
        });

        return clone.innerHTML;
    }

    // Sample Data Provider for realistic preview
    const SAMPLE_ADMIN_DATA = {
        "TEN_CHU_DAU_TU": "Cảng Hàng không Quốc tế Cần Thơ",
        "TEN_CHU_DAU_TU_VIET_HOA": "CẢNG HÀNG KHÔNG QUỐC TẾ CẦN THƠ",
        "TEN_BAN_QUAN_LY_DU_AN": "BAN QUẢN LÝ DỰ ÁN & BẢO TRÌ",
        "CO_QUAN_TRINH": "Trưởng ban Quản lý Dự án",
        "CAP_QUYET_DINH_DAU_TU": "Tổng công ty Cảng hàng không Việt Nam - CTCP (ACV)",
        "DIA_DANH": "Cần Thơ",
        "TINH_THANH_PHO": "TP. Cần Thơ",
        "DIA_CHI_TRU_SO": "179B Lê Hồng Phong, P. Trà An, Q. Bình Thủy, TP. Cần Thơ",
        "NGUOI_KY_CDT": "Nguyễn Văn Admin",
        "CHUC_VU_NGUOI_KY": "Giám đốc Cảng HKQT Cần Thơ",
        "TRUONG_BAN_DHDA": "Trần Văn Quản Lý",
        "CHUC_VU_TRUONG_BAN": "Trưởng phòng Kỹ thuật hạ tầng",
        "KE_TOAN_TRUONG": "Lê Thị Tài Chính",
        "CHUC_VU_KE_TOAN": "Kế toán trưởng",
        "TEN_DU_AN": "Sửa chữa góc cua đường khẩn nguy chữa cháy và nâng cấp hệ thống an ninh hàng không",
        "TEN_CONG_TRINH": "Cảng Hàng không Quốc tế Cần Thơ",
        "NGUON_VON": "Quỹ đầu tư phát triển ACV năm 2027",
        "TEN_GOI_THAU": "Gói thầu số 4: Mua sắm trang thiết bị & dịch vụ sửa chữa khẩn nguy",
        "HINH_THUC_LCNT": "Chỉ định thầu rút gọn",
        "LOAI_HOP_DONG": "Trọn gói",
        "THOI_GIAN_THUC_HIEN_GOI_THAU": "30 ngày",
        "GIA_GOI_THAU_SO": "100.000.000 VNĐ",
        "GIA_GOI_THAU_CHU": "Một trăm triệu đồng chẵn",
        "GIA_DU_TOAN_SO": "100.000.000 VNĐ",
        "GIA_TRI_HOP_DONG_SO": "100.000.000 VNĐ",
        "GIA_TRI_HOP_DONG_CHU": "Một trăm triệu đồng chẵn",
        "GIA_TRI_TIET_KIEM_SO": "2.500.000 VNĐ",
        "TY_LE_TIET_KIEM": "2.5%",
        "TEN_NHA_THAU": "Công ty TNHH Kỹ thuật & Công nghệ Hàng không Tân Tiến",
        "TEN_NHA_THAU_VIET_HOA": "CÔNG TY TNHH KỸ THUẬT & CÔNG NGHỆ HÀNG KHÔNG TÂN TIẾN",
        "DIA_CHI_NHA_THAU": "Số 45 Đại lộ Hòa Bình, P. An Lạc, Q. Ninh Kiều, TP. Cần Thơ",
        "MA_SO_THUE": "1801234567",
        "SO_TAI_KHOAN": "1028889999 tại Vietcombank - CN Cần Thơ",
        "NGUOI_DAI_DIEN_PHAP_LUAT": "Trần Văn Giám Đốc",
        "CHUC_VU_DAI_DIEN": "Tổng Giám đốc",
        "SO_TO_TRINH": "04/ĐKNCC/TTr-KTHT",
        "SO_QUYET_DINH": "968/QĐ-CHKQTCT",
        "SO_GIAY_MOI": "GM-BQLDA",
        "SO_BIEN_BAN": "04/BB-HTHĐ",
        "SO_HOP_DONG": "26076/HĐKT-CHKQTCT",
        "SO_BAO_CAO": "05/BC-HĐTĐ-KQTĐ",
        "NGAY_TO_TRINH": "ngày 29 tháng 07 năm 2026",
        "NGAY_TO_TRINH_FULL": "ngày 29 tháng 07 năm 2026",
        "NGAY_QUYET_DINH": "ngày 31 tháng 07 năm 2026",
        "NGAY_QUYET_DINH_FULL": "ngày 31 tháng 07 năm 2026",
        "NGAY_GIAY_MOI": "ngày 01 tháng 08 năm 2026",
        "NGAY_GIAY_MOI_FULL": "ngày 01 tháng 08 năm 2026",
        "NGAY_BIEN_BAN": "ngày 03 tháng 08 năm 2026",
        "NGAY_BIEN_BAN_FULL": "ngày 03 tháng 08 năm 2026",
        "NGAY_HOP_DONG": "ngày 05 tháng 08 năm 2026",
        "NGAY_HOP_DONG_FULL": "ngày 05 tháng 08 năm 2026",
        "NGAY_KY_HOP_DONG": "ngày 05 tháng 08 năm 2026",
        "NGAY_BAO_CAO": "ngày 30 tháng 07 năm 2026",
        "NGAY_BAO_CAO_FULL": "ngày 30 tháng 07 năm 2026",
        "TEN_KEM_SO_NGAY_TO_TRINH": "Tờ trình số 04/ĐKNCC/TTr-KTHT ngày 29/07/2026",
        "TEN_KEM_SO_NGAY_QUYET_DINH": "Quyết định số 53/QĐ-HĐQT ngày 20/01/2025"
    };

    // Hàm phân giải dữ liệu hiển thị xem thử thông minh cho mọi loại biến (kể cả biến mới tạo)
    function resolvePreviewValueForTag(tag, item) {
        if (!tag) return "";
        const cleanTag = tag.replace(/[{}]/g, "").trim().toUpperCase();

        // 1. Dữ liệu chuỗi gốc (originalText) được gán thực tế từ tài liệu Word đang mở
        // Ưu tiên cao nhất vì đây là chữ thật người dùng đã chọn hoặc hệ thống bóc tách từ file Word
        if (item && Array.isArray(item.mappings)) {
            const m = item.mappings.find(map => map.tag && map.tag.toUpperCase() === cleanTag);
            if (m && m.originalText && String(m.originalText).trim()) {
                return String(m.originalText).trim();
            }
        }

        // 2. Dữ liệu thực tế từ ho_so_tu_dong_state_v3 (Dự án hiện hành trên Web App)
        try {
            const rawState = localStorage.getItem("ho_so_tu_dong_state_v3");
            if (rawState) {
                const savedAppState = JSON.parse(rawState);
                if (savedAppState.generalInfo && savedAppState.generalInfo[cleanTag]) {
                    const val = String(savedAppState.generalInfo[cleanTag]).trim();
                    if (val) return val;
                }
                if (Array.isArray(savedAppState.packages)) {
                    for (const pkg of savedAppState.packages) {
                        if (pkg && pkg[cleanTag]) {
                            const val = String(pkg[cleanTag]).trim();
                            if (val) return val;
                        }
                    }
                }
            }
        } catch (e) {
            console.warn("Lỗi đọc state_v3 cho preview:", e);
        }

        // 3. Tra cứu trong Từ điển biến toàn cục (MASTER_VARIABLES_CATALOG & Tùy biến người dùng)
        if (typeof MASTER_VARIABLES_CATALOG !== "undefined" && Array.isArray(MASTER_VARIABLES_CATALOG)) {
            const v = MASTER_VARIABLES_CATALOG.find(cat => cat.tag && cat.tag.toUpperCase() === cleanTag);
            if (v) {
                if (v.example && String(v.example).trim()) return String(v.example).trim();
                if (v.defaultValue && String(v.defaultValue).trim()) return String(v.defaultValue).trim();
                if (v.sampleValue && String(v.sampleValue).trim()) return String(v.sampleValue).trim();
                if (v.label && String(v.label).trim()) return v.label.trim();
            }
        }

        // 4. Tra cứu trong Dữ liệu mẫu chuẩn hành chính (SAMPLE_ADMIN_DATA)
        if (SAMPLE_ADMIN_DATA && SAMPLE_ADMIN_DATA[cleanTag]) {
            return SAMPLE_ADMIN_DATA[cleanTag];
        }

        // 5. Mẫu định dạng thông minh dựa trên ngữ nghĩa của mã thẻ
        if (cleanTag.includes("SO_")) return "05/BC-HĐTĐ-KQTĐ";
        if (cleanTag.includes("NGAY_")) return "ngày 16 tháng 10 năm 2026";
        if (cleanTag.includes("GIA_") || cleanTag.includes("TIEN_")) return "48.500.000 VNĐ";
        if (cleanTag.includes("HANG_MUC") || cleanTag.includes("GOI_THAU") || cleanTag.includes("DU_AN")) {
            return "Thuê sửa chữa thay thế khung mui che hành lí cho xe băng chuyền TUG VCA-110.08";
        }

        // 6. Fallback thân thiện: Chuyển tên mã thẻ thành tên tiếng Việt đọc được
        const humanLabel = cleanTag.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        return `[${humanLabel}]`;
    }

    function renderSampleDataPreview(rawHtml, item) {
        let text = rawHtml || cleanCanvasHtmlForStorage();
        if (!text) {
            text = (item && item.paragraphs || []).map(p => `<p class="mb-2 leading-relaxed text-slate-800">${escapeHtml(p)}</p>`).join("");
        }

        // Loại bỏ hoàn toàn wrapper badge (kể cả có nút remove button x) để đưa về dạng thuần {TAG}
        text = text.replace(/<span[^>]*class="[^"]*tag(?:-table)?-badge[^"]*"[^>]*>\{?([A-Z0-9_]+)\}?(?:<span[^>]*class="[^"]*btn-remove-tag[^"]*"[^>]*>.*?<\/span>)?\s*<\/span>/gi, '{$1}');

        // Đề phòng trường hợp text còn sót dạng {TAG} lồng nhau
        text = text.replace(/\{+([A-Z0-9_]+)\}+/g, '{$1}');

        // Thay thế tất cả các thẻ {TAG} bằng giá trị dữ liệu thật / dữ liệu mẫu tương ứng
        text = text.replace(/\{([A-Z0-9_]+)\}/g, (match, tag) => {
            if (tag === "PAGE_BREAK") {
                return `<div class="a4-page-break" contenteditable="false"><i class="fa-solid fa-file-invoice text-indigo-600 mr-1"></i> DẤU NGẮT TRANG A4 (Hết trang • Bắt đầu trang tiếp theo)</div>`;
            }
            if (tag.startsWith("BANG_")) {
                return renderSampleTableHtml(tag);
            }
            const sampleVal = resolvePreviewValueForTag(tag, item);
            if (sampleVal) {
                return `<span class="bg-emerald-50 text-emerald-950 font-semibold px-1 rounded border-b border-emerald-300" title="Biến: {${tag}}">${escapeHtml(sampleVal)}</span>`;
            }
            return `<span class="bg-amber-100 text-amber-900 px-1 rounded font-mono text-xs">{${tag}}</span>`;
        });

        return text;
    }

    function renderSampleTableHtml(tableTag) {
        const allTables = getAllStudioTableVars();
        const tDef = allTables.find(t => t.tag === tableTag) || {
            tag: tableTag,
            name: tableTag,
            columns: ["STT", "Nội dung", "Ghi chú"],
            sampleRows: [{ stt: 1, c1: "Dữ liệu mẫu hàng 1", c2: "Ghi chú mẫu" }]
        };

        const headers = (tDef.columns || []).map(c => {
            const colName = typeof c === "string" ? c : (c.label || c.key || "");
            return `<th class="border border-slate-600 p-2 font-bold bg-slate-100 text-slate-900 text-center">${colName}</th>`;
        }).join("");

        let rowsHtml = "";
        if (tDef.tag === "BANG_HANG_HOA") {
            rowsHtml = `
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">1</td>
                    <td class="border border-slate-600 p-1.5 font-medium">Máy bơm chữa cháy động cơ Diesel áp lực cao</td>
                    <td class="border border-slate-600 p-1.5 text-center">Bộ</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono">01</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono">65.000.000</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono font-bold">65.000.000</td>
                    <td class="border border-slate-600 p-1.5 text-center">Nhật Bản / Mới 100%</td>
                </tr>
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">2</td>
                    <td class="border border-slate-600 p-1.5 font-medium">Cuộn vòi chữa cháy chuyên dụng D65 chịu áp</td>
                    <td class="border border-slate-600 p-1.5 text-center">Cuộn</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono">10</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono">3.500.000</td>
                    <td class="border border-slate-600 p-1.5 text-right font-mono font-bold">35.000.000</td>
                    <td class="border border-slate-600 p-1.5 text-center">Đức / Mới 100%</td>
                </tr>
                <tr class="font-bold bg-slate-50">
                    <td colspan="5" class="border border-slate-600 p-2 text-center uppercase">Tổng cộng giá trị (Đã bao gồm thuế GTGT)</td>
                    <td class="border border-slate-600 p-2 text-right font-mono text-emerald-800">100.000.000</td>
                    <td class="border border-slate-600 p-2 text-center italic text-xs">VNĐ</td>
                </tr>
            `;
        } else if (tDef.tag === "BANG_NHAN_SU") {
            rowsHtml = `
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">1</td>
                    <td class="border border-slate-600 p-1.5 font-bold">Nguyễn Văn Tuấn</td>
                    <td class="border border-slate-600 p-1.5 text-center">Chủ nhiệm dự án</td>
                    <td class="border border-slate-600 p-1.5 text-center">Thạc sĩ Kỹ thuật Hàng không</td>
                    <td class="border border-slate-600 p-1.5">Chỉ huy trưởng thi công tại hiện trường</td>
                    <td class="border border-slate-600 p-1.5 text-center">CCHN Hạng I</td>
                </tr>
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">2</td>
                    <td class="border border-slate-600 p-1.5 font-bold">Trần Minh Quang</td>
                    <td class="border border-slate-600 p-1.5 text-center">Kỹ sư Trưởng</td>
                    <td class="border border-slate-600 p-1.5 text-center">Kỹ sư Điện &amp; Tự động hóa</td>
                    <td class="border border-slate-600 p-1.5">Phụ trách kiểm tra, đấu nối kỹ thuật</td>
                    <td class="border border-slate-600 p-1.5 text-center">10 năm kinh nghiệm</td>
                </tr>
            `;
        } else if (tDef.tag === "BANG_TIEN_DO") {
            rowsHtml = `
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">1</td>
                    <td class="border border-slate-600 p-1.5 font-medium">Chuẩn bị hồ sơ, vật tư và tiếp nhận mặt bằng thi công</td>
                    <td class="border border-slate-600 p-1.5 text-center font-mono">03</td>
                    <td class="border border-slate-600 p-1.5 text-center">05/08/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">08/08/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">Nhà thầu</td>
                </tr>
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">2</td>
                    <td class="border border-slate-600 p-1.5 font-medium">Giao hàng, vận chuyển và lắp đặt hoàn thiện thiết bị</td>
                    <td class="border border-slate-600 p-1.5 text-center font-mono">20</td>
                    <td class="border border-slate-600 p-1.5 text-center">09/08/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">28/08/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">Nhà thầu &amp; CĐT</td>
                </tr>
                <tr>
                    <td class="border border-slate-600 p-1.5 text-center">3</td>
                    <td class="border border-slate-600 p-1.5 font-medium">Chạy thử tải, kiểm định an toàn và nghiệm thu bàn giao</td>
                    <td class="border border-slate-600 p-1.5 text-center font-mono">07</td>
                    <td class="border border-slate-600 p-1.5 text-center">29/08/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">04/09/2026</td>
                    <td class="border border-slate-600 p-1.5 text-center">Hội đồng bàn giao</td>
                </tr>
            `;
        } else {
            // Dynamic rendering for ANY custom table!
            const rows = (tDef.defaultRows && tDef.defaultRows.length > 0) ? tDef.defaultRows :
                         (tDef.sampleRows && tDef.sampleRows.length > 0) ? tDef.sampleRows :
                         [ { stt: 1 }, { stt: 2 } ];
            const cols = tDef.columns || [];
            rowsHtml = rows.map((r, i) => {
                const cells = cols.map((c, colIdx) => {
                    const key = typeof c === "string" ? `col_${colIdx}` : (c.key || `col_${colIdx}`);
                    const align = (typeof c === "object" && c.align) ? c.align : (colIdx === 0 ? "center" : "left");
                    const type = (typeof c === "object" && c.type) ? c.type : "text";
                    let val = r[key] !== undefined ? r[key] : (colIdx === 0 ? (i + 1) : `Dữ liệu mẫu hàng ${i + 1}`);
                    if (type === "currency" && typeof val === "number") {
                        val = val.toLocaleString("vi-VN");
                    }
                    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right font-mono" : "text-left";
                    return `<td class="border border-slate-600 p-1.5 ${alignClass}">${escapeHtml(String(val))}</td>`;
                }).join("");
                return `<tr>${cells}</tr>`;
            }).join("");
        }

        return `
            <div class="my-4 overflow-x-auto not-italic">
                <table class="w-full border-collapse border border-slate-600 text-xs">
                    <thead>
                        <tr>${headers}</tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    // =============================================================
    // STUDIO A4 CANVAS ZOOM & MULTI-PAGE PAGINATION CONTROLLER
    // =============================================================
    const A4_PAGE_HEIGHT_PX = 1050; // Chuẩn chiều cao 1 trang A4 (96 DPI)
    let studioZoomLevel = parseFloat(localStorage.getItem("ho_so_studio_zoom")) || 1.0;
    let studioCurrentPage = 1;
    let studioTotalPages = 1;
    let isScrollingFromNavigation = false;

    function setStudioZoom(newZoom) {
        studioZoomLevel = Math.max(0.5, Math.min(1.75, Math.round(newZoom * 100) / 100));
        try {
            localStorage.setItem("ho_so_studio_zoom", String(studioZoomLevel));
        } catch (e) {}

        if (documentContentDisplay) {
            documentContentDisplay.style.zoom = studioZoomLevel;
        }

        const lblZoom = document.getElementById("lblStudioZoomLevel");
        if (lblZoom) lblZoom.textContent = Math.round(studioZoomLevel * 100) + "%";

        const btnReset = document.getElementById("btnStudioZoomReset");
        if (btnReset) {
            if (Math.abs(studioZoomLevel - 1.0) < 0.01) {
                btnReset.classList.remove("text-indigo-600", "bg-white", "shadow-xs");
                btnReset.classList.add("text-slate-700");
            } else {
                btnReset.classList.add("text-indigo-600", "bg-white", "shadow-xs");
                btnReset.classList.remove("text-slate-700");
            }
        }

        updateStudioPagination();
    }

    function studioZoomIn() {
        setStudioZoom(studioZoomLevel + 0.1);
    }

    function studioZoomOut() {
        setStudioZoom(studioZoomLevel - 0.1);
    }

    function studioZoomReset() {
        setStudioZoom(1.0);
    }

    function updateStudioPagination() {
        if (!documentContentDisplay || !docViewerWrapper) return;

        // Content height
        const contentHeight = documentContentDisplay.scrollHeight || documentContentDisplay.offsetHeight || A4_PAGE_HEIGHT_PX;
        
        // Manual breaks
        const manualBreaks = Array.from(documentContentDisplay.querySelectorAll(".a4-page-break"));
        let calculatedPages = Math.max(1, Math.ceil(contentHeight / A4_PAGE_HEIGHT_PX));
        if (manualBreaks.length > 0) {
            calculatedPages = Math.max(calculatedPages, manualBreaks.length + 1);
        }
        studioTotalPages = calculatedPages;

        if (!isScrollingFromNavigation) {
            const currentScrollTop = docViewerWrapper.scrollTop;
            if (manualBreaks.length > 0) {
                // If document has manual page breaks, calculate page by break element positions
                const wrapperRect = docViewerWrapper.getBoundingClientRect();
                let pageIndex = 1;
                manualBreaks.forEach((brk, idx) => {
                    const rect = brk.getBoundingClientRect();
                    // If page break top is above 35% of the viewport height, user has crossed into next page
                    if (rect.top <= wrapperRect.top + (wrapperRect.height * 0.35)) {
                        pageIndex = idx + 2;
                    }
                });
                studioCurrentPage = Math.min(studioTotalPages, Math.max(1, pageIndex));
            } else {
                const effectivePageHeight = A4_PAGE_HEIGHT_PX * studioZoomLevel;
                studioCurrentPage = Math.min(studioTotalPages, Math.max(1, Math.floor((currentScrollTop + (A4_PAGE_HEIGHT_PX * 0.3)) / effectivePageHeight) + 1));
            }
        }

        // Update indicators
        const lblTotal = document.getElementById("lblStudioTotalPages");
        if (lblTotal) lblTotal.textContent = String(studioTotalPages);

        const lblFloatTotal = document.getElementById("lblFloatingTotalPages");
        if (lblFloatTotal) lblFloatTotal.textContent = String(studioTotalPages);

        const inputPage = document.getElementById("inputStudioCurrentPage");
        if (inputPage) {
            inputPage.max = String(studioTotalPages);
            inputPage.value = String(studioCurrentPage);
        }

        const lblFloatCur = document.getElementById("lblFloatingCurrentPage");
        if (lblFloatCur) lblFloatCur.textContent = String(studioCurrentPage);

        // Update button disabled state
        const btnPrev = document.getElementById("btnStudioPrevPage");
        const btnNext = document.getElementById("btnStudioNextPage");
        const btnFloatPrev = document.getElementById("btnFloatingPrevPage");
        const btnFloatNext = document.getElementById("btnFloatingNextPage");

        if (btnPrev) btnPrev.disabled = studioCurrentPage <= 1;
        if (btnFloatPrev) btnFloatPrev.disabled = studioCurrentPage <= 1;
        if (btnNext) btnNext.disabled = studioCurrentPage >= studioTotalPages;
        if (btnFloatNext) btnFloatNext.disabled = studioCurrentPage >= studioTotalPages;

        // Floating pill visibility
        const floatingPill = document.getElementById("studioFloatingPagePill");
        if (floatingPill) {
            if (studioTotalPages > 1 || docViewerWrapper.scrollTop > 50) {
                floatingPill.classList.remove("opacity-0", "pointer-events-none");
                floatingPill.classList.add("opacity-100");
            } else {
                floatingPill.classList.remove("opacity-100");
                floatingPill.classList.add("opacity-0", "pointer-events-none");
            }
        }
    }

    function goToStudioPage(pageNum) {
        const targetPage = Math.max(1, Math.min(studioTotalPages, pageNum));
        if (!docViewerWrapper) return;

        isScrollingFromNavigation = true;
        studioCurrentPage = targetPage;

        const manualBreaks = documentContentDisplay ? Array.from(documentContentDisplay.querySelectorAll(".a4-page-break")) : [];
        if (targetPage === 1) {
            docViewerWrapper.scrollTo({ top: 0, behavior: "smooth" });
        } else if (manualBreaks.length >= targetPage - 1 && manualBreaks[targetPage - 2]) {
            const breakEl = manualBreaks[targetPage - 2];
            const wrapperRect = docViewerWrapper.getBoundingClientRect();
            const breakRect = breakEl.getBoundingClientRect();
            const targetScrollTop = docViewerWrapper.scrollTop + (breakRect.top - wrapperRect.top) - 10;
            docViewerWrapper.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
        } else {
            const effectivePageHeight = A4_PAGE_HEIGHT_PX * studioZoomLevel;
            const targetScrollTop = (targetPage - 1) * effectivePageHeight;
            docViewerWrapper.scrollTo({ top: targetScrollTop, behavior: "smooth" });
        }

        const inputPage = document.getElementById("inputStudioCurrentPage");
        if (inputPage) inputPage.value = String(targetPage);
        const lblFloatCur = document.getElementById("lblFloatingCurrentPage");
        if (lblFloatCur) lblFloatCur.textContent = String(targetPage);

        // Update button disabled state
        const btnPrev = document.getElementById("btnStudioPrevPage");
        const btnNext = document.getElementById("btnStudioNextPage");
        const btnFloatPrev = document.getElementById("btnFloatingPrevPage");
        const btnFloatNext = document.getElementById("btnFloatingNextPage");

        if (btnPrev) btnPrev.disabled = targetPage <= 1;
        if (btnFloatPrev) btnFloatPrev.disabled = targetPage <= 1;
        if (btnNext) btnNext.disabled = targetPage >= studioTotalPages;
        if (btnFloatNext) btnFloatNext.disabled = targetPage >= studioTotalPages;

        setTimeout(() => {
            isScrollingFromNavigation = false;
            updateStudioPagination();
        }, 600);
    }

    function insertPageBreakAtCursor() {
        if (!documentContentDisplay) return;

        if (studioViewMode === "sample") {
            const btnEdit = document.getElementById("btnViewModeTemplateEdit");
            if (btnEdit) btnEdit.click();
        }

        documentContentDisplay.focus();
        const breakHtml = `
            <div class="a4-page-break my-6 py-2 border-y-2 border-dashed border-indigo-300 bg-indigo-50/60 rounded text-center text-xs font-bold text-indigo-800 select-none not-italic" contenteditable="false">
                <span class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white border border-indigo-200 rounded-full shadow-2xs">
                    <i class="fa-solid fa-file-invoice text-indigo-600"></i>
                    <span>DẤU NGẮT TRANG A4 (Hết trang • Bắt đầu trang tiếp theo)</span>
                </span>
            </div>
            <p class="mb-2 leading-relaxed text-slate-800"><br></p>
        `;

        document.execCommand("insertHTML", false, breakHtml);
        documentContentDisplay.dispatchEvent(new Event("input", { bubbles: true }));
        updateStudioPagination();
        showToast("Đã chèn dấu ngắt trang A4 vào văn bản!", "success");
    }

    // Wiring Zoom and Pagination buttons
    const btnStudioZoomIn = document.getElementById("btnStudioZoomIn");
    if (btnStudioZoomIn) btnStudioZoomIn.onclick = studioZoomIn;

    const btnStudioZoomOut = document.getElementById("btnStudioZoomOut");
    if (btnStudioZoomOut) btnStudioZoomOut.onclick = studioZoomOut;

    const btnStudioZoomReset = document.getElementById("btnStudioZoomReset");
    if (btnStudioZoomReset) btnStudioZoomReset.onclick = studioZoomReset;

    const btnStudioPrevPage = document.getElementById("btnStudioPrevPage");
    if (btnStudioPrevPage) btnStudioPrevPage.onclick = () => goToStudioPage(studioCurrentPage - 1);

    const btnStudioNextPage = document.getElementById("btnStudioNextPage");
    if (btnStudioNextPage) btnStudioNextPage.onclick = () => goToStudioPage(studioCurrentPage + 1);

    const btnFloatingPrevPage = document.getElementById("btnFloatingPrevPage");
    if (btnFloatingPrevPage) btnFloatingPrevPage.onclick = () => goToStudioPage(studioCurrentPage - 1);

    const btnFloatingNextPage = document.getElementById("btnFloatingNextPage");
    if (btnFloatingNextPage) btnFloatingNextPage.onclick = () => goToStudioPage(studioCurrentPage + 1);

    const btnStudioInsertPageBreak = document.getElementById("btnStudioInsertPageBreak");
    if (btnStudioInsertPageBreak) btnStudioInsertPageBreak.onclick = insertPageBreakAtCursor;

    const inputStudioCurrentPage = document.getElementById("inputStudioCurrentPage");
    if (inputStudioCurrentPage) {
        inputStudioCurrentPage.onchange = (e) => goToStudioPage(parseInt(e.target.value, 10));
        inputStudioCurrentPage.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                goToStudioPage(parseInt(inputStudioCurrentPage.value, 10));
            }
        };
    }

    // Scroll listener on viewport
    if (docViewerWrapper) {
        let scrollTimeout;
        docViewerWrapper.addEventListener("scroll", () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateStudioPagination, 60);
        }, { passive: true });

        // Ctrl + Mouse Wheel to zoom
        docViewerWrapper.addEventListener("wheel", (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                if (e.deltaY < 0) studioZoomIn();
                else studioZoomOut();
            }
        }, { passive: false });
    }

    // Window resize recalculation
    window.addEventListener("resize", () => {
        updateStudioPagination();
    }, { passive: true });

    // Keyboard Shortcuts for Page navigation & Zoom
    document.addEventListener("keydown", (e) => {
        const modalOpen = document.getElementById("modalStudioVars") && !document.getElementById("modalStudioVars").classList.contains("hidden");
        const isEditingInput = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
        if (modalOpen || isEditingInput) return;

        if (e.key === "PageDown") {
            e.preventDefault();
            goToStudioPage(studioCurrentPage + 1);
        } else if (e.key === "PageUp") {
            e.preventDefault();
            goToStudioPage(studioCurrentPage - 1);
        } else if (e.ctrlKey && (e.key === "=" || e.key === "+")) {
            e.preventDefault();
            studioZoomIn();
        } else if (e.ctrlKey && e.key === "-") {
            e.preventDefault();
            studioZoomOut();
        } else if (e.ctrlKey && e.key === "0") {
            e.preventDefault();
            studioZoomReset();
        }
    });


    // =========================================================================
    // CONTEXTUAL RECOMMENDED VARIABLES & REAL-TIME COVERAGE ENGINE (STUDIO 2.0)
    // =========================================================================

    const STUDIO_DOC_VAR_MAP = {
        // 1. Mua sắm < 50tr
        "d50_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_CONG_TRINH", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "NGUON_VON", "CHUC_VU_TRUONG_BAN", "TRUONG_BAN_DHDA", "CAN_CU_PHAP_LY_CHUNG"],
        "d50_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "SO_BAO_CAO", "NGAY_BAO_CAO", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_CONG_TRINH", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "CAN_CU_PHAP_LY_CHUNG"],
        "d50_3": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "NGAY_QUYET_DINH"],
        "d50_4": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_BIEN_BAN", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "DAI_DIEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],

        // 2. Mua sắm 50tr - 100tr
        "d100_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "d100_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "d100_3": ["TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_BIEN_BAN", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "THOI_GIAN_THUC_HIEN", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],
        "d100_4": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN", "TEN_GOI_THAU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "KHO_BAC_NHA_NUOC", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],

        // 3. Chào giá hạn chế
        "cghc_1": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "NGUON_VON", "TRUONG_BAN_DHDA", "CHUC_VU_TRUONG_BAN"],
        "cghc_2": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],
        "cghc_3": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "SO_GIAY_MOI", "NGAY_GIAY_MOI", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "THOI_GIAN_HOP", "DIA_DIEM_HOP", "NGUOI_KY_CDT"],
        "cghc_4": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "BANG_DANH_GIA_HO_SO", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT"],
        "cghc_5": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT"],
        "cghc_6": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "SO_HOP_DONG", "NGAY_HOP_DONG", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "THOI_GIAN_THUC_HIEN", "NGUOI_KY_CDT"],

        // 4. Chỉ định thầu rút gọn (Chuẩn)
        "cdtrg_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "cdtrg_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "cdtrg_3": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_GIAY_MOI", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "THOI_GIAN_HOP", "DIA_DIEM_HOP", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT"],
        "cdtrg_4": ["TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "NGAY_GIAY_MOI", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "THOI_GIAN_HOP", "DIA_DIEM_HOP", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "TRUONG_BAN_DHDA", "CHUC_VU_TRUONG_BAN", "KE_TOAN_TRUONG", "CHUC_VU_KE_TOAN", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "TEN_NHA_THAU_VIET_TAT", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "GIA_TRI_GIAM_GIA", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "KHO_BAC_NHA_NUOC"],
        "cdtrg_5": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "GIA_TRI_GIAM_GIA", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUON_VON", "CHUC_VU_TRUONG_BAN", "TRUONG_BAN_DHDA"],
        "cdtrg_6": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "SO_TO_TRINH", "NGAY_TO_TRINH", "CO_QUAN_TRINH", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUON_VON", "KHO_BAC_NHA_NUOC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT"],
        "cdtrg_7": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "DIA_DIEM_HOP", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "DIA_CHI_TRU_SO", "KHO_BAC_NHA_NUOC", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "TEN_NHA_THAU_VIET_TAT", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN"],

        // 5. Thiết kế / Sửa chữa công trình (tk_sc_1..11)
        "tk_sc_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_CONG_TRINH", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "NGUON_VON", "CHUC_VU_TRUONG_BAN", "TRUONG_BAN_DHDA", "CAN_CU_PHAP_LY_CHUNG"],
        "tk_sc_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"]
    };

    function getStudioRecommendedVarsForDoc(docId, docObj) {
        let varList = [];
        if (STUDIO_DOC_VAR_MAP[docId]) {
            varList = [...STUDIO_DOC_VAR_MAP[docId]];
        } else if (docObj && Array.isArray(docObj.requiredVars) && docObj.requiredVars.length > 0) {
            varList = [...docObj.requiredVars];
        } else {
            const wf = getCurrentWorkflow();
            const found = wf?.documents?.find(d => d.id === docId);
            if (found && Array.isArray(found.requiredVars) && found.requiredVars.length > 0) {
                varList = [...found.requiredVars];
            } else {
                varList = [
                    "TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN",
                    "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU",
                    "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"
                ];
            }
        }

        // Tự động mở rộng các biến kèm theo dựa trên các tiền tố chuẩn
        const set = new Set();
        varList.forEach(t => {
            const clean = (t || "").replace(/[{}]/g, "").trim().toUpperCase();
            if (clean) set.add(clean);
        });

        const suffixes = ["TO_TRINH", "QUYET_DINH", "GIAY_MOI", "BIEN_BAN", "HOP_DONG", "BAO_CAO"];
        suffixes.forEach(sfx => {
            if (set.has(`NGAY_${sfx}`) || set.has(`SO_${sfx}`) || (sfx === "BIEN_BAN" && set.has("SO_BIEN_BAN_HOAN_THIEN"))) {
                set.add(`NGAY_${sfx}`);
                if (sfx === "BIEN_BAN") set.add("SO_BIEN_BAN_HOAN_THIEN");
                else set.add(`SO_${sfx}`);
            }
        });

        return Array.from(set);
    }

    function renderContextualRecommendedVars() {
        const box = document.getElementById("contextualRecommendedVarsBox");
        const chipsContainer = document.getElementById("contextualRecommendedChips");
        const badge = document.getElementById("recommendedCoverageBadge");
        const btnInsertAll = document.getElementById("btnInsertAllMissingRecommended");
        if (!box || !chipsContainer || !badge) return;

        const wf = getCurrentWorkflow();
        const docObj = wf?.documents?.find(d => d.id === state.activeDocId);
        if (!docObj) {
            box.classList.add("hidden");
            return;
        }
        box.classList.remove("hidden");

        const recommendedTags = getStudioRecommendedVarsForDoc(state.activeDocId, docObj);
        if (!recommendedTags || recommendedTags.length === 0) {
            box.classList.add("hidden");
            return;
        }

        // Quét các thẻ biến hiện diện trên Canvas
        const canvasContent = (documentContentDisplay ? (documentContentDisplay.innerText + " " + cleanCanvasHtmlForStorage()) : "");
        const tagMatches = canvasContent.match(/\{([A-Z0-9_]+)\}/g) || [];
        const presentTagsSet = new Set(tagMatches.map(m => m.replace(/[{}]/g, "").trim().toUpperCase()));

        let presentCount = 0;
        const missingTags = [];

        const chipsHtml = recommendedTags.map(tag => {
            const isPresent = presentTagsSet.has(tag);
            if (isPresent) {
                presentCount++;
            } else {
                missingTags.push(tag);
            }

            const catItem = (typeof MASTER_VARIABLES_CATALOG !== "undefined" && Array.isArray(MASTER_VARIABLES_CATALOG))
                ? MASTER_VARIABLES_CATALOG.find(v => v.tag === tag)
                : null;
            const label = catItem ? catItem.label.replace(/\(\*\)/g, "").trim() : tag;

            if (isPresent) {
                return `
                    <button type="button" 
                        class="btn-rec-tag-chip inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-all shadow-2xs" 
                        data-tag="${tag}" 
                        data-present="true"
                        title="Đã có trong mẫu: {${tag}} (${label}) - Bấm để tìm & cuộn đến vị trí biến">
                        <i class="fa-solid fa-check text-[9px] text-emerald-600"></i>
                        <span>{${tag}}</span>
                    </button>
                `;
            } else {
                return `
                    <button type="button" 
                        class="btn-rec-tag-chip inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100/90 text-amber-900 border border-amber-300 hover:bg-amber-200 cursor-pointer transition-all shadow-2xs" 
                        data-tag="${tag}" 
                        data-present="false"
                        title="Chưa có trong mẫu: {${tag}} (${label}) - Bấm để chèn ngay vào vị trí con trỏ">
                        <i class="fa-solid fa-plus text-[9px] text-amber-700"></i>
                        <span>{${tag}}</span>
                    </button>
                `;
            }
        }).join("");

        chipsContainer.innerHTML = chipsHtml;

        // Cập nhật nhãn thống kê độ phủ biến
        const totalCount = recommendedTags.length;
        if (presentCount === totalCount && totalCount > 0) {
            badge.className = "text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-400";
            badge.innerHTML = `<i class="fa-solid fa-check-double text-[9px] text-emerald-700"></i> ✓ Đầy đủ (${presentCount}/${totalCount})`;
            if (btnInsertAll) btnInsertAll.classList.add("hidden");
        } else {
            badge.className = "text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300";
            badge.textContent = `Có ${presentCount}/${totalCount} biến`;
            if (btnInsertAll) {
                btnInsertAll.classList.remove("hidden");
                btnInsertAll.textContent = `+ Chèn ${missingTags.length} biến thiếu`;
                btnInsertAll.onclick = () => {
                    insertAllMissingRecommended(missingTags);
                };
            }
        }

        // Bắt sự kiện click từng chip biến
        chipsContainer.querySelectorAll(".btn-rec-tag-chip").forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const tag = btn.getAttribute("data-tag");
                const isPresent = btn.getAttribute("data-present") === "true";
                if (isPresent) {
                    highlightTagInCanvas(tag);
                } else {
                    insertTagAtCursor(`{${tag}}`);
                    renderContextualRecommendedVars();
                }
            };
        });

        // Cập nhật popup Selection Menu với các biến còn thiếu hoặc hàng đầu
        updateSelectionMenuWithRecommended(missingTags.length > 0 ? missingTags : recommendedTags);
    }

    function highlightTagInCanvas(tag) {
        if (!documentContentDisplay) return;
        const cleanTag = tag.replace(/[{}]/g, "").trim().toUpperCase();
        const formattedTag = `{${cleanTag}}`;

        // 1. Tìm thẻ dạng badge
        const badges = Array.from(documentContentDisplay.querySelectorAll(".tag-badge, .tag-table-badge"));
        const match = badges.find(b => {
            const text = b.textContent.trim().toUpperCase();
            return text === formattedTag || text === cleanTag;
        });

        if (match) {
            match.scrollIntoView({ behavior: "smooth", block: "center" });
            match.classList.add("ring-4", "ring-emerald-400", "scale-125", "transition-all", "duration-300");
            showToast(`Đã tìm thấy biến ${formattedTag} trong văn bản!`);
            setTimeout(() => {
                match.classList.remove("ring-4", "ring-emerald-400", "scale-125", "transition-all", "duration-300");
            }, 1500);
            return;
        }

        // 2. Tìm theo text nodes
        const walker = document.createTreeWalker(documentContentDisplay, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue && node.nodeValue.includes(formattedTag)) {
                const parent = node.parentElement;
                if (parent) {
                    parent.scrollIntoView({ behavior: "smooth", block: "center" });
                    parent.classList.add("bg-yellow-200", "transition-colors", "duration-500");
                    showToast(`Đã định vị biến ${formattedTag} trong văn bản!`);
                    setTimeout(() => {
                        parent.classList.remove("bg-yellow-200", "transition-colors", "duration-500");
                    }, 1500);
                    return;
                }
            }
        }

        showToast(`Không tìm thấy thẻ ${formattedTag} trên trang!`, "info");
    }

    function insertAllMissingRecommended(missingTags) {
        if (!Array.isArray(missingTags) || missingTags.length === 0 || !documentContentDisplay) return;

        if (studioViewMode === "sample") {
            const btnEdit = document.getElementById("btnViewModeTemplateEdit");
            if (btnEdit) btnEdit.click();
        }

        if (typeof pushUndoState === "function") {
            pushUndoState(`Chèn ${missingTags.length} biến khuyến nghị`);
        }

        documentContentDisplay.focus();
        const sel = window.getSelection();
        let range = savedCursorRange;

        const p = document.createElement("p");
        p.className = "mb-2 leading-relaxed text-slate-800 flex flex-wrap gap-1.5 items-center my-2 p-2 bg-amber-50/70 border border-dashed border-amber-300 rounded";

        missingTags.forEach(tag => {
            const badge = document.createElement("span");
            const isTable = tag.startsWith("BANG_");
            badge.className = isTable ? "tag-table-badge" : "tag-badge";
            badge.setAttribute("data-tag", tag);
            badge.setAttribute("contenteditable", "false");
            badge.innerHTML = `{${tag}}<span class="btn-remove-tag" data-tag="${tag}" title="Xóa biến này" contenteditable="false">×</span>`;
            p.appendChild(badge);
            p.appendChild(document.createTextNode(" "));
        });

        if (range && documentContentDisplay.contains(range.commonAncestorContainer)) {
            sel.removeAllRanges();
            sel.addRange(range);
            range.deleteContents();
            range.insertNode(p);
            range.setStartAfter(p);
            range.collapse(true);
            savedCursorRange = range.cloneRange();
        } else {
            documentContentDisplay.appendChild(p);
        }

        if (state.activeDocId && studioViewMode === "edit") {
            workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
        }

        renderContextualRecommendedVars();
        showToast(`Đã tự động chèn ${missingTags.length} biến khuyến nghị vào văn bản!`);
    }

    function applyTagToSelection(tag) {
        if (!selectedTextToTag) return;
        const cleanTag = tag.replace(/[{}]/g, "").trim().toUpperCase();
        const item = state.batchFiles[state.activeDocId];

        if (typeof pushUndoState === "function") {
            pushUndoState(`Gán biến {${cleanTag}}`);
        }

        if (item) {
            item.mappings = item.mappings || [];
            item.mappings.push({
                tag: cleanTag,
                originalText: selectedTextToTag,
                tier: 2,
                reason: "Gán thủ công từ vùng chọn",
                count: 1
            });
            renderSingleMappingRows(item);
            renderBatchTable();
        }

        let inserted = false;
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && documentContentDisplay && documentContentDisplay.contains(sel.anchorNode)) {
            const range = sel.getRangeAt(0);
            const badge = document.createElement("span");
            const isTable = cleanTag.startsWith("BANG_");
            badge.className = isTable ? "tag-table-badge" : "tag-badge";
            badge.setAttribute("data-tag", cleanTag);
            badge.setAttribute("contenteditable", "false");
            badge.innerHTML = `{${cleanTag}}<span class="btn-remove-tag" data-tag="${cleanTag}" title="Xóa biến này" contenteditable="false">×</span>`;

            try {
                range.deleteContents();
                range.insertNode(badge);

                const spacer = document.createTextNode(" ");
                range.setStartAfter(badge);
                range.insertNode(spacer);
                range.setStartAfter(spacer);
                range.collapse(true);
                savedCursorRange = range.cloneRange();
                inserted = true;
            } catch (e) {
                console.warn("Could not insert badge via Range in applyTagToSelection:", e);
            }
        }

        if (!inserted && documentContentDisplay && selectedTextToTag) {
            const isTable = cleanTag.startsWith("BANG_");
            const rep = replaceTextWithBadgeAcrossNodes(documentContentDisplay, selectedTextToTag, cleanTag, isTable, true);
            if (rep > 0) inserted = true;
        }

        if (!inserted && item) {
            renderCanvasContent(item);
        }

        if (state.activeDocId && studioViewMode === "edit") {
            workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
        }

        const menu = document.getElementById("selectionMenu");
        if (menu) menu.classList.add("hidden");

        renderContextualRecommendedVars();
        showToast(`Đã gán {${cleanTag}} cho chuỗi "${selectedTextToTag}"!`);
    }

    function updateSelectionMenuWithRecommended(tags) {
        const container = document.getElementById("selectionMenuDynamicButtons");
        if (!container) return;

        const topTags = (Array.isArray(tags) && tags.length > 0)
            ? tags.slice(0, 5)
            : ["TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT"];

        const labelMap = {
            "TEN_DU_AN": "Dự án",
            "TEN_GOI_THAU": "Gói thầu",
            "TEN_NHA_THAU": "Nhà thầu",
            "TEN_NHA_THAU_VIET_HOA": "Nhà thầu (HOA)",
            "GIA_TRI_HOP_DONG_SO": "Giá HĐ",
            "GIA_GOI_THAU_SO": "Giá gói",
            "NGUOI_KY_CDT": "Người ký",
            "CHUC_VU_NGUOI_KY": "Chức vụ",
            "DIA_DANH": "Địa danh",
            "SO_TO_TRINH": "Số TTr",
            "NGAY_TO_TRINH": "Ngày TTr",
            "SO_QUYET_DINH": "Số QĐ",
            "NGAY_QUYET_DINH": "Ngày QĐ",
            "SO_GIAY_MOI": "Số GM",
            "NGAY_GIAY_MOI": "Ngày GM",
            "SO_BIEN_BAN_HOAN_THIEN": "Số BB",
            "NGAY_BIEN_BAN": "Ngày BB",
            "SO_HOP_DONG": "Số HĐ",
            "NGAY_HOP_DONG": "Ngày HĐ",
            "TRUONG_BAN_DHDA": "Trưởng ban",
            "MA_SO_THUE": "MST",
            "CAN_CU_PHAP_LY_CHUNG": "Căn cứ",
            "NGUON_VON": "Nguồn vốn",
            "THOI_GIAN_THUC_HIEN": "Tiến độ",
            "KHO_BAC_NHA_NUOC": "Kho bạc"
        };

        container.innerHTML = topTags.map(tag => {
            let label = labelMap[tag];
            if (!label) {
                const catItem = (typeof MASTER_VARIABLES_CATALOG !== "undefined" && Array.isArray(MASTER_VARIABLES_CATALOG))
                    ? MASTER_VARIABLES_CATALOG.find(v => v.tag === tag)
                    : null;
                label = catItem ? catItem.label.split("/")[0].replace(/\(\*\)/g, "").trim().slice(0, 10) : tag.slice(0, 10);
            }
            return `
                <button class="quick-tag-btn px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 rounded text-slate-200 hover:text-white font-medium cursor-pointer transition-colors" data-var="${tag}" title="{${tag}}">${label}</button>
            `;
        }).join("");

        container.querySelectorAll(".quick-tag-btn").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-var");
                applyTagToSelection(tag);
            };
        });
    }

    window.getStudioRecommendedVarsForDoc = getStudioRecommendedVarsForDoc;
    window.renderContextualRecommendedVars = renderContextualRecommendedVars;
    window.highlightTagInCanvas = highlightTagInCanvas;
    window.insertAllMissingRecommended = insertAllMissingRecommended;
    window.applyTagToSelection = applyTagToSelection;


    // Palette Tab 1: Render Text Variables
    function renderPaletteTextVars() {
        const container = document.getElementById("paletteVarsListContainer");
        if (!container) return;

        const search = (document.getElementById("paletteVarsSearchInput")?.value || "").toLowerCase().trim();
        const filtered = MASTER_VARIABLES_CATALOG.filter(v => {
            const matchesCat = (currentPaletteCat === "all") || (v.groupKey === currentPaletteCat);
            const matchesSearch = !search || 
                v.tag.toLowerCase().includes(search) || 
                v.label.toLowerCase().includes(search) || 
                (v.example && v.example.toLowerCase().includes(search));
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-6 text-center text-slate-400 italic text-xs">
                    Không tìm thấy biến phù hợp với từ khóa "${search}".
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(v => `
            <div class="palette-var-item p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2 transition-all">
                <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="font-mono font-bold text-emerald-800 text-xs bg-emerald-100/70 border border-emerald-300 px-1.5 py-0.2 rounded select-all cursor-pointer" title="Click để sao chép" onclick="navigator.clipboard.writeText('{${v.tag}}'); alert('Đã sao chép: {${v.tag}}');">{${v.tag}}</span>
                        <span class="text-[9.5px] text-slate-500 font-semibold truncate">${v.group}</span>
                    </div>
                    <div class="text-[11px] font-medium text-slate-800 truncate" title="${v.label}">${v.label}</div>
                    <div class="text-[10px] text-slate-500 italic truncate" title="Mẫu: ${v.example || ''}">Mẫu: ${v.example || '---'}</div>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" class="btn-insert-tag-cursor h-6 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] rounded shadow-2xs flex items-center gap-1 cursor-pointer transition-colors" data-tag="{${v.tag}}" title="Chèn vào vị trí con trỏ trong văn bản">
                        <i class="fa-solid fa-plus text-[9px]"></i>
                        <span>Chèn</span>
                    </button>
                    <button type="button" class="btn-copy-tag h-6 w-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded border border-slate-300 flex items-center justify-center cursor-pointer transition-colors" data-tag="{${v.tag}}" title="Sao chép mã {${v.tag}}">
                        <i class="fa-regular fa-copy text-[11px]"></i>
                    </button>
                </div>
            </div>
        `).join("");

        // Attach event listeners for insert & copy
        container.querySelectorAll(".btn-insert-tag-cursor").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                insertTagAtCursor(tag);
            };
        });

        container.querySelectorAll(".btn-copy-tag").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                navigator.clipboard.writeText(tag).then(() => {
                    showToast(`Đã sao chép ${tag} vào Clipboard!`);
                });
            };
        });
    }

    // Palette Tab 2: Render Table Variables (Supports Built-in & Custom Tables)
    function renderPaletteTableVars() {
        const container = document.getElementById("paletteTableVarsListContainer");
        if (!container) return;

        const tables = getAllStudioTableVars();
        container.innerHTML = tables.map(t => {
            const isSystem = !!t.isSystem;
            const badge = isSystem 
                ? `<span class="text-[9.5px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded shadow-2xs">HỆ THỐNG</span>`
                : `<span class="text-[9.5px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded shadow-2xs">⭐ TÙY BIẾN</span>`;
            
            const colsPreview = (t.columns || []).map(c => typeof c === "string" ? c : (c.label || c.key)).join(" • ");
            
            const deleteBtn = !isSystem ? `
                <button type="button" class="btn-delete-palette-table text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors" data-tag="${t.tag}" title="Xóa loại bảng tùy biến này">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            ` : '';

            return `
                <div class="p-2.5 bg-indigo-50/50 border border-indigo-200 rounded-lg space-y-2 hover:border-indigo-400 transition-all">
                    <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                                <span class="font-mono font-bold text-indigo-900 text-xs bg-indigo-100 border border-indigo-300 px-2 py-0.5 rounded select-all cursor-pointer" onclick="navigator.clipboard.writeText('{${t.tag}}'); window.TemplateStudio?.showToast('Đã sao chép: {${t.tag}}');">{${t.tag}}</span>
                                ${badge}
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 truncate" title="${escapeHtml(t.name)}">${escapeHtml(t.name)}</h4>
                            <p class="text-[10.5px] text-slate-600 line-clamp-2">${escapeHtml(t.desc || "")}</p>
                        </div>
                        ${deleteBtn}
                    </div>
                    
                    <div class="bg-white p-1.5 rounded border border-slate-200 text-[10px] text-slate-600">
                        <span class="font-bold text-slate-700">Các cột:</span> ${escapeHtml(colsPreview)}
                    </div>

                    <div class="flex items-center justify-between pt-1 border-t border-indigo-100 gap-1.5">
                        <button type="button" class="btn-copy-table-tag h-6 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs border border-slate-300 font-medium flex items-center gap-1 cursor-pointer transition-colors" data-tag="{${t.tag}}">
                            <i class="fa-regular fa-copy text-[10px]"></i>
                            <span>Copy mã</span>
                        </button>
                        <button type="button" class="btn-insert-table-cursor flex-1 h-6 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors" data-tag="{${t.tag}}">
                            <i class="fa-solid fa-plus text-[10px]"></i>
                            <span>+ Chèn bảng vào văn bản</span>
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        container.querySelectorAll(".btn-insert-table-cursor").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                insertTagAtCursor(tag);
            };
        });

        container.querySelectorAll(".btn-copy-table-tag").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                navigator.clipboard.writeText(tag).then(() => {
                    showToast(`Đã sao chép mã bảng ${tag}!`);
                });
            };
        });

        container.querySelectorAll(".btn-delete-palette-table").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                deleteCustomStudioTable(tag);
            };
        });

        // Wire Add Table button at top of Palette Tab 2
        const btnStudioAddNewTableVar = document.getElementById("btnStudioAddNewTableVar");
        if (btnStudioAddNewTableVar) {
            btnStudioAddNewTableVar.onclick = () => {
                openCreateCustomTableModal();
            };
        }
    }

    // Palette Tab 3: Render Assigned Mappings List
    function renderSingleMappingRows(item) {
        if (!singleMappingRowsContainer) return;
        const mappings = (item && item.mappings) ? item.mappings : [];
        if (singleDetectedCountBadge) singleDetectedCountBadge.textContent = `${mappings.length} biến`;

        const paletteDetectedCountBadge = document.getElementById("paletteDetectedCountBadge");
        if (paletteDetectedCountBadge) paletteDetectedCountBadge.textContent = String(mappings.length);

        if (mappings.length === 0) {
            singleMappingRowsContainer.innerHTML = `
                <div class="p-4 text-center text-slate-400 italic text-xs">
                    Chưa có biến nào được gắn thẻ tự động. Bạn có thể bôi đen chữ trên trang văn bản hoặc chèn từ Tab 1 &amp; Tab 2!
                </div>
            `;
            return;
        }

        const tierBadges = {
            1: `<span class="bg-emerald-100 text-emerald-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 1 (Chung)</span>`,
            2: `<span class="bg-blue-100 text-blue-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 2 (Gói)</span>`,
            3: `<span class="bg-amber-100 text-amber-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 3 (Số VB)</span>`,
            4: `<span class="bg-purple-100 text-purple-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 4 (Căn cứ)</span>`
        };

        singleMappingRowsContainer.innerHTML = mappings.map((m, idx) => `
            <div class="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div class="flex items-center justify-between">
                    <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-1.5 py-0.2 rounded text-[11px]">{${m.tag}}</span>
                    ${tierBadges[m.tier] || ""}
                    <div class="flex items-center space-x-1">
                        <button type="button" class="btn-insert-existing-tag text-emerald-600 hover:text-emerald-800 px-1 py-0.5 rounded hover:bg-emerald-50 cursor-pointer" data-tag="{${m.tag}}" title="Chèn biến này vào văn bản">
                            <i class="fa-solid fa-plus text-[10px]"></i>
                        </button>
                        <button type="button" class="btn-edit-single-mapping text-indigo-600 hover:text-indigo-800 px-1 py-0.5 rounded hover:bg-indigo-50 cursor-pointer" data-idx="${idx}" title="Chỉnh sửa biến">
                            <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                        </button>
                        <button type="button" class="btn-remove-single-mapping text-slate-400 hover:text-rose-600 px-1 cursor-pointer" data-idx="${idx}">&times;</button>
                    </div>
                </div>
                <div class="text-[11px] text-slate-600 truncate" title="${m.originalText}">
                    <span class="font-semibold text-slate-500">Chuỗi gốc:</span> "${m.originalText}"
                </div>
            </div>
        `).join("");

        singleMappingRowsContainer.querySelectorAll(".btn-remove-single-mapping").forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                item.mappings.splice(idx, 1);
                renderSingleMappingRows(item);
                renderCanvasContent(item);
                renderBatchTable();
            };
        });

        singleMappingRowsContainer.querySelectorAll(".btn-insert-existing-tag").forEach(btn => {
            btn.onclick = () => {
                const tag = btn.getAttribute("data-tag");
                insertTagAtCursor(tag);
            };
        });

        singleMappingRowsContainer.querySelectorAll(".btn-edit-single-mapping").forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                const m = item.mappings[idx];
                if (m) openEditVariableModal(m.tag, idx);
            };
        });
    }

    // Helper: Tạo file Word .docx hoàn chỉnh từ Canvas HTML chuẩn OpenXML
    async function createDocxFromCanvasHtml(cleanHtml) {
        if (!window.BUILTIN_DOCX_TEMPLATES) throw new Error("Chưa nạp bộ mẫu chuẩn hệ thống");
        const baseKey = Object.keys(window.BUILTIN_DOCX_TEMPLATES)[0];
        const baseB64 = window.BUILTIN_DOCX_TEMPLATES[baseKey];
        if (!baseB64) throw new Error("Không tìm thấy mẫu nền để khởi tạo file Word");

        const baseBuffer = base64ToArrayBuffer(baseB64);
        const zip = await JSZip.loadAsync(baseBuffer);
        const docXmlStr = await zip.file("word/document.xml").async("string");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(docXmlStr, "application/xml");
        const wNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

        const bodyNode = xmlDoc.getElementsByTagNameNS(wNS, "body")[0] || xmlDoc.getElementsByTagName("w:body")[0];
        if (!bodyNode) throw new Error("Cấu trúc file Word không hợp lệ");

        // Lưu lại sectPr cuối cùng (kích thước trang A4, lề chuẩn)
        const sectPrList = bodyNode.getElementsByTagNameNS(wNS, "sectPr");
        const sectPr = (sectPrList.length > 0) ? sectPrList[0].cloneNode(true) : null;

        // Xóa các node con hiện có trong body
        while (bodyNode.firstChild) {
            bodyNode.removeChild(bodyNode.firstChild);
        }

        // Tạo container tạm để duyệt DOM HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanHtml;

        // Helper tạo w:r
        function createWordRun(text, isBold = false, isItalic = false, isUnderline = false, fontSizePt = 13) {
            const r = xmlDoc.createElementNS(wNS, "w:r");
            const rPr = xmlDoc.createElementNS(wNS, "w:rPr");

            const rFonts = xmlDoc.createElementNS(wNS, "w:rFonts");
            rFonts.setAttributeNS(wNS, "w:ascii", "Times New Roman");
            rFonts.setAttributeNS(wNS, "w:hAnsi", "Times New Roman");
            rFonts.setAttributeNS(wNS, "w:cs", "Times New Roman");
            rPr.appendChild(rFonts);

            const szVal = String(Math.round(fontSizePt * 2));
            const sz = xmlDoc.createElementNS(wNS, "w:sz");
            sz.setAttributeNS(wNS, "w:val", szVal);
            rPr.appendChild(sz);
            const szCs = xmlDoc.createElementNS(wNS, "w:szCs");
            szCs.setAttributeNS(wNS, "w:val", szVal);
            rPr.appendChild(szCs);

            if (isBold) {
                rPr.appendChild(xmlDoc.createElementNS(wNS, "w:b"));
                rPr.appendChild(xmlDoc.createElementNS(wNS, "w:bCs"));
            }
            if (isItalic) {
                rPr.appendChild(xmlDoc.createElementNS(wNS, "w:i"));
                rPr.appendChild(xmlDoc.createElementNS(wNS, "w:iCs"));
            }
            if (isUnderline) {
                const u = xmlDoc.createElementNS(wNS, "w:u");
                u.setAttributeNS(wNS, "w:val", "single");
                rPr.appendChild(u);
            }
            r.appendChild(rPr);

            const t = xmlDoc.createElementNS(wNS, "w:t");
            t.setAttribute("xml:space", "preserve");
            t.textContent = text;
            r.appendChild(t);
            return r;
        }

        // Helper tạo w:p
        function createWordParagraph(align = "both", indentFirstLine = false) {
            const p = xmlDoc.createElementNS(wNS, "w:p");
            const pPr = xmlDoc.createElementNS(wNS, "w:pPr");

            if (align && align !== "left") {
                const jc = xmlDoc.createElementNS(wNS, "w:jc");
                jc.setAttributeNS(wNS, "w:val", align);
                pPr.appendChild(jc);
            }

            const spacing = xmlDoc.createElementNS(wNS, "w:spacing");
            spacing.setAttributeNS(wNS, "w:line", "360"); // 1.5 line spacing
            spacing.setAttributeNS(wNS, "w:lineRule", "auto");
            spacing.setAttributeNS(wNS, "w:after", "120"); // 6pt after
            pPr.appendChild(spacing);

            if (indentFirstLine) {
                const ind = xmlDoc.createElementNS(wNS, "w:ind");
                ind.setAttributeNS(wNS, "w:firstLine", "720"); // ~1.27cm
                pPr.appendChild(ind);
            }

            p.appendChild(pPr);
            return p;
        }

        // Helper tạo bảng 2 cột không viền (cho Header Quốc hiệu / Cơ quan)
        function createHeaderTwoColumnTable(leftEl, rightEl) {
            const tbl = xmlDoc.createElementNS(wNS, "w:tbl");
            const tblPr = xmlDoc.createElementNS(wNS, "w:tblPr");
            const tblW = xmlDoc.createElementNS(wNS, "w:tblW");
            tblW.setAttributeNS(wNS, "w:w", "9600");
            tblW.setAttributeNS(wNS, "w:type", "dxa");
            tblPr.appendChild(tblW);

            // Bỏ viền bảng
            const tblBorders = xmlDoc.createElementNS(wNS, "w:tblBorders");
            ["top", "left", "bottom", "right", "insideH", "insideV"].forEach(b => {
                const border = xmlDoc.createElementNS(wNS, "w:" + b);
                border.setAttributeNS(wNS, "w:val", "none");
                tblBorders.appendChild(border);
            });
            tblPr.appendChild(tblBorders);
            tbl.appendChild(tblPr);

            const tr = xmlDoc.createElementNS(wNS, "w:tr");

            // Ô trái
            const tc1 = xmlDoc.createElementNS(wNS, "w:tc");
            const tcPr1 = xmlDoc.createElementNS(wNS, "w:tcPr");
            const tcW1 = xmlDoc.createElementNS(wNS, "w:tcW");
            tcW1.setAttributeNS(wNS, "w:w", "4500");
            tcW1.setAttributeNS(wNS, "w:type", "dxa");
            tcPr1.appendChild(tcW1);
            tc1.appendChild(tcPr1);

            const leftPs = leftEl.querySelectorAll("p");
            if (leftPs.length > 0) {
                leftPs.forEach(lp => {
                    const wp = createWordParagraph("center", false);
                    const isBold = lp.style.fontWeight === "bold" || lp.querySelector("b, strong") !== null;
                    const isItalic = lp.style.fontStyle === "italic" || lp.querySelector("i, em") !== null;
                    wp.appendChild(createWordRun(lp.innerText || lp.textContent || "", isBold, isItalic, false, 12));
                    tc1.appendChild(wp);
                });
            } else {
                const wp = createWordParagraph("center", false);
                wp.appendChild(createWordRun(leftEl.innerText || leftEl.textContent || "", false, false, false, 12));
                tc1.appendChild(wp);
            }
            tr.appendChild(tc1);

            // Ô phải
            const tc2 = xmlDoc.createElementNS(wNS, "w:tc");
            const tcPr2 = xmlDoc.createElementNS(wNS, "w:tcPr");
            const tcW2 = xmlDoc.createElementNS(wNS, "w:tcW");
            tcW2.setAttributeNS(wNS, "w:w", "5100");
            tcW2.setAttributeNS(wNS, "w:type", "dxa");
            tcPr2.appendChild(tcW2);
            tc2.appendChild(tcPr2);

            const rightPs = rightEl.querySelectorAll("p");
            if (rightPs.length > 0) {
                rightPs.forEach(rp => {
                    const wp = createWordParagraph("center", false);
                    const isBold = rp.style.fontWeight === "bold" || rp.querySelector("b, strong") !== null;
                    const isItalic = rp.style.fontStyle === "italic" || rp.querySelector("i, em") !== null;
                    const isUnderline = rp.style.textDecoration === "underline";
                    wp.appendChild(createWordRun(rp.innerText || rp.textContent || "", isBold, isItalic, isUnderline, 12.5));
                    tc2.appendChild(wp);
                });
            } else {
                const wp = createWordParagraph("center", false);
                wp.appendChild(createWordRun(rightEl.innerText || rightEl.textContent || "", false, false, false, 12.5));
                tc2.appendChild(wp);
            }
            tr.appendChild(tc2);

            tbl.appendChild(tr);
            return tbl;
        }

        // Helper chuyển đổi <table> HTML thành <w:tbl> Word OpenXML
        function convertHtmlTableToWordTable(tableEl) {
            const tbl = xmlDoc.createElementNS(wNS, "w:tbl");
            const tblPr = xmlDoc.createElementNS(wNS, "w:tblPr");
            const tblW = xmlDoc.createElementNS(wNS, "w:tblW");
            tblW.setAttributeNS(wNS, "w:w", "9600");
            tblW.setAttributeNS(wNS, "w:type", "dxa");
            tblPr.appendChild(tblW);

            const tableStyle = (tableEl.getAttribute("style") || "").toLowerCase();
            const tableClass = (tableEl.getAttribute("class") || "").toLowerCase();
            const isBorderless = tableStyle.includes("border: none") || tableStyle.includes("border:none") || tableClass.includes("border-none") || (!tableStyle.includes("border") && !tableClass.includes("border-slate"));

            const tblBorders = xmlDoc.createElementNS(wNS, "w:tblBorders");
            ["top", "left", "bottom", "right", "insideH", "insideV"].forEach(b => {
                const border = xmlDoc.createElementNS(wNS, "w:" + b);
                if (isBorderless) {
                    border.setAttributeNS(wNS, "w:val", "none");
                } else {
                    border.setAttributeNS(wNS, "w:val", "single");
                    border.setAttributeNS(wNS, "w:sz", "4");
                    border.setAttributeNS(wNS, "w:space", "0");
                    border.setAttributeNS(wNS, "w:color", "auto");
                }
                tblBorders.appendChild(border);
            });
            tblPr.appendChild(tblBorders);
            tbl.appendChild(tblPr);

            const trList = tableEl.querySelectorAll("tr");
            trList.forEach(trEl => {
                const tr = xmlDoc.createElementNS(wNS, "w:tr");
                const cells = Array.from(trEl.children).filter(c => c.tagName === "TD" || c.tagName === "TH");
                const colCount = cells.length || 1;

                cells.forEach((cellEl, colIdx) => {
                    const tc = xmlDoc.createElementNS(wNS, "w:tc");
                    const tcPr = xmlDoc.createElementNS(wNS, "w:tcPr");
                    const cellStyle = cellEl.getAttribute("style") || "";

                    let widthDxa = Math.round(9600 / colCount);
                    if (cellStyle.includes("width:")) {
                        const m = cellStyle.match(/width:\s*(\d+)%/);
                        if (m && m[1]) widthDxa = Math.round(9600 * (parseInt(m[1], 10) / 100));
                    }
                    const tcW = xmlDoc.createElementNS(wNS, "w:tcW");
                    tcW.setAttributeNS(wNS, "w:w", String(widthDxa));
                    tcW.setAttributeNS(wNS, "w:type", "dxa");
                    tcPr.appendChild(tcW);
                    tc.appendChild(tcPr);

                    const pList = cellEl.querySelectorAll("p");
                    if (pList.length > 0) {
                        pList.forEach(pEl => {
                            const wp = convertHtmlParagraphToWordParagraph(pEl);
                            tc.appendChild(wp);
                        });
                    } else {
                        const wp = convertHtmlParagraphToWordParagraph(cellEl);
                        tc.appendChild(wp);
                    }

                    if (tc.getElementsByTagNameNS(wNS, "p").length === 0 && tc.getElementsByTagName("w:p").length === 0) {
                        const emptyP = createWordParagraph("left", false);
                        tc.appendChild(emptyP);
                    }

                    tr.appendChild(tc);
                });
                tbl.appendChild(tr);
            });

            return tbl;
        }

        // Helper chuyển đổi <p> hoặc element văn bản HTML thành <w:p> Word OpenXML
        function convertHtmlParagraphToWordParagraph(pEl) {
            const pStyle = pEl.getAttribute("style") || "";
            let align = "both";
            if (pStyle.includes("text-align: center") || pEl.classList.contains("text-center")) align = "center";
            else if (pStyle.includes("text-align: right") || pEl.classList.contains("text-right")) align = "right";
            else if (pStyle.includes("text-align: left") || pEl.classList.contains("text-left")) align = "left";
            else if (pStyle.includes("text-align: justify") || pEl.classList.contains("text-justify")) align = "both";

            const indentFirstLine = pStyle.includes("text-indent") && align === "both";
            const wp = createWordParagraph(align, indentFirstLine);

            function processNode(node, isBold, isItalic, isUnderline, fontSize) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    if (text) {
                        wp.appendChild(createWordRun(text, isBold, isItalic, isUnderline, fontSize));
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const tag = node.tagName.toUpperCase();
                    if (tag === "BR") {
                        const r = xmlDoc.createElementNS(wNS, "w:r");
                        r.appendChild(xmlDoc.createElementNS(wNS, "w:br"));
                        wp.appendChild(r);
                        return;
                    }
                    if (node.classList && (node.classList.contains("btn-remove-tag") || node.classList.contains("tag-action-popover"))) {
                        return; // Bỏ qua UI xóa thẻ
                    }

                    const nStyle = node.getAttribute("style") || "";
                    const newBold = isBold || tag === "STRONG" || tag === "B" || nStyle.includes("font-weight: bold") || (node.classList && node.classList.contains("tag-badge"));
                    const newItalic = isItalic || tag === "EM" || tag === "I" || nStyle.includes("font-style: italic");
                    const newUnderline = isUnderline || tag === "U" || nStyle.includes("text-decoration: underline");
                    let newFontSize = fontSize;
                    if (tag === "H1") newFontSize = 18;
                    else if (tag === "H2") newFontSize = 16;
                    else if (tag === "H3") newFontSize = 14;

                    for (let c = 0; c < node.childNodes.length; c++) {
                        processNode(node.childNodes[c], newBold, newItalic, newUnderline, newFontSize);
                    }
                }
            }

            if (pEl.childNodes.length === 0) {
                wp.appendChild(createWordRun("", false, false, false, 13));
            } else {
                for (let c = 0; c < pEl.childNodes.length; c++) {
                    processNode(pEl.childNodes[c], false, false, false, 13);
                }
            }

            return wp;
        }

        // Duyệt từng node con của tempDiv
        Array.from(tempDiv.children).forEach(el => {
            const style = el.getAttribute("style") || "";
            const isFlex = style.includes("display: flex") || style.includes("display:flex");

            if (isFlex && el.children.length >= 2) {
                // Khung 2 cột (Header hoặc Footer ký tên từ scaffold)
                const tbl = createHeaderTwoColumnTable(el.children[0], el.children[1]);
                bodyNode.appendChild(tbl);
                return;
            }

            if (el.tagName === "TABLE") {
                const tbl = convertHtmlTableToWordTable(el);
                bodyNode.appendChild(tbl);
                return;
            }

            if (el.tagName === "P" || el.tagName.startsWith("H")) {
                const wp = convertHtmlParagraphToWordParagraph(el);
                bodyNode.appendChild(wp);
            } else if (el.tagName === "DIV") {
                const innerPs = el.querySelectorAll("p");
                if (innerPs.length > 0) {
                    innerPs.forEach(ip => {
                        const wp = convertHtmlParagraphToWordParagraph(ip);
                        bodyNode.appendChild(wp);
                    });
                } else {
                    const wp = convertHtmlParagraphToWordParagraph(el);
                    bodyNode.appendChild(wp);
                }
            }
        });

        // Gắn lại sectPr vào cuối body
        if (sectPr) bodyNode.appendChild(sectPr);

        const serializer = new XMLSerializer();
        const updatedXml = serializer.serializeToString(xmlDoc);
        zip.file("word/document.xml", updatedXml);

        return await zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
    }

    // Save modified template as System Default
    async function applyAsSystemDefaultTemplate() {
        const docId = state.activeDocId;
        if (!documentContentDisplay) return;

        try {
            showToast("Đang đóng gói và lưu mẫu chuẩn...", "info");

            // 1. Lưu nội dung HTML đã chỉnh sửa
            const cleanHtml = cleanCanvasHtmlForStorage();
            workingDraftHtml[docId] = cleanHtml;
            localStorage.setItem("ho_so_custom_template_html_" + docId, cleanHtml);
            localStorage.setItem("ho_so_custom_template_time_" + docId, new Date().toISOString());

            let item = state.batchFiles[docId];
            let taggedBuffer = null;

            if (item && item.arrayBuffer) {
                // Đã có buffer file gốc -> áp dụng XML tags lên file gốc
                const taggedBlob = await createTaggedDocxBlob(item.arrayBuffer, item.mappings || []);
                taggedBuffer = await taggedBlob.arrayBuffer();
            } else {
                // Chưa có file mẫu .docx gốc -> Tạo file .docx chuẩn mới hoàn toàn từ HTML
                const generatedBlob = await createDocxFromCanvasHtml(cleanHtml);
                taggedBuffer = await generatedBlob.arrayBuffer();

                const wf = getCurrentWorkflow();
                const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === docId) : { id: docId, name: docId, code: docId };
                const paragraphs = await extractParagraphsFromBuffer(taggedBuffer);

                item = {
                    id: docId,
                    name: `${docObj.code || docId}_custom.docx`,
                    size: taggedBuffer.byteLength,
                    arrayBuffer: taggedBuffer,
                    paragraphs: paragraphs,
                    mappings: detectEntitiesForDocument(docObj, paragraphs),
                    isCustom: true,
                    status: "matched"
                };
                state.batchFiles[docId] = item;
            }

            const b64 = arrayBufferToBase64(taggedBuffer);
            localStorage.setItem("ho_so_custom_template_" + docId, b64);

            item.isCustom = true;
            item.arrayBuffer = taggedBuffer;

            // Cập nhật giao diện
            if (singleDocFileNameBadge) {
                singleDocFileNameBadge.textContent = item.name;
            }
            const singleDocSourceBadge = document.getElementById("singleDocSourceBadge");
            if (singleDocSourceBadge) {
                singleDocSourceBadge.className = "text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1";
                singleDocSourceBadge.innerHTML = `<i class="fa-solid fa-star text-amber-500 text-[9px]"></i> Mẫu tùy biến (Đang dùng)`;
            }

            renderBatchTable();
            showToast("⚡ Đã lưu làm Mẫu Chuẩn Hệ Thống! Trang Tạo Hồ Sơ sẽ lập tức dùng mẫu này.", "success");
        } catch (err) {
            console.error("Lỗi khi lưu mẫu chuẩn:", err);
            showToast("Lỗi khi lưu: " + err.message, "error");
        }
    }

    // Reset Template to Factory Original
    function resetSingleTemplate() {
        showToast("Chức năng khôi phục mẫu gốc đã được tắt để bảo vệ mẫu đang tùy biến!", "warning");
        return;
        const docId = state.activeDocId;
        if (!confirm("Bạn có chắc chắn muốn khôi phục về mẫu gốc ban đầu của hệ thống? Tất cả các chỉnh sửa tùy biến của văn bản này sẽ được đặt lại.")) {
            return;
        }

        delete workingDraftHtml[docId];
        localStorage.removeItem("ho_so_custom_template_" + docId);
        localStorage.removeItem("ho_so_custom_template_html_" + docId);
        localStorage.removeItem("ho_so_custom_template_time_" + docId);

        delete state.batchFiles[docId];
        renderSingleView();
        renderBatchTable();
        showToast("Đã khôi phục về Mẫu gốc hệ thống thành công!");
    }

    // Attach Studio Toolbar Actions
    const btnSaveAsSystemDefault = document.getElementById("btnSaveAsSystemDefault");
    if (btnSaveAsSystemDefault) btnSaveAsSystemDefault.onclick = applyAsSystemDefaultTemplate;

    const btnResetSingleTemplate = document.getElementById("btnResetSingleTemplate");
    if (btnResetSingleTemplate) btnResetSingleTemplate.onclick = resetSingleTemplate;

    if (btnDownloadSingleDocx) {
        btnDownloadSingleDocx.onclick = async () => {
            const docId = state.activeDocId;
            let item = state.batchFiles[docId];
            const wf = getCurrentWorkflow();
            const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === docId) : { id: docId, name: docId, code: docId };

            try {
                let blob = null;
                if (item && item.arrayBuffer) {
                    blob = await createTaggedDocxBlob(item.arrayBuffer, item.mappings || []);
                } else {
                    const cleanHtml = cleanCanvasHtmlForStorage();
                    blob = await createDocxFromCanvasHtml(cleanHtml);
                }
                const fileName = `${docObj.code}_${docObj.name.replace(/[^a-zA-Z0-9_À-ỹ]+/g, "_")}.docx`;
                saveAs(blob, fileName);
                showToast(`Đã xuất template: ${fileName}`);
            } catch (err) {
                console.error("Single doc export error:", err);
                showToast("Lỗi xuất file: " + err.message, "error");
            }
        };
    }

    // View Mode Toggle (Template Edit vs Sample Data)
    const btnViewModeTemplateEdit = document.getElementById("btnViewModeTemplateEdit");
    const btnViewModeSamplePreview = document.getElementById("btnViewModeSamplePreview");

    if (btnViewModeTemplateEdit && btnViewModeSamplePreview) {
        btnViewModeTemplateEdit.onclick = () => {
            studioViewMode = "edit";
            btnViewModeTemplateEdit.className = "px-3 py-1 rounded bg-white text-emerald-900 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all";
            btnViewModeSamplePreview.className = "px-3 py-1 rounded text-slate-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer transition-all";
            const item = state.batchFiles[state.activeDocId];
            if (item) renderCanvasContent(item);
        };

        btnViewModeSamplePreview.onclick = () => {
            if (state.activeDocId && studioViewMode === "edit") {
                workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            }
            studioViewMode = "sample";
            btnViewModeSamplePreview.className = "px-3 py-1 rounded bg-white text-indigo-900 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all";
            btnViewModeTemplateEdit.className = "px-3 py-1 rounded text-slate-600 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer transition-all";
            const item = state.batchFiles[state.activeDocId];
            if (item) renderCanvasContent(item);
        };
    }

    // Palette Tab Switchers
    const tabPaletteTextVars = document.getElementById("tabPaletteTextVars");
    const tabPaletteTableVars = document.getElementById("tabPaletteTableVars");
    const tabPaletteDetectedVars = document.getElementById("tabPaletteDetectedVars");

    const viewPaletteTextVars = document.getElementById("viewPaletteTextVars");
    const viewPaletteTableVars = document.getElementById("viewPaletteTableVars");
    const viewPaletteDetectedVars = document.getElementById("viewPaletteDetectedVars");

    function setPaletteTabActive(tabName) {
        if (!tabPaletteTextVars || !tabPaletteTableVars || !tabPaletteDetectedVars) return;

        tabPaletteTextVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-all";
        tabPaletteTableVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-indigo-800 hover:bg-indigo-50/50 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-all";
        tabPaletteDetectedVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-all";

        if (viewPaletteTextVars) viewPaletteTextVars.classList.add("hidden");
        if (viewPaletteTableVars) viewPaletteTableVars.classList.add("hidden");
        if (viewPaletteDetectedVars) viewPaletteDetectedVars.classList.add("hidden");

        if (tabName === "text") {
            tabPaletteTextVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-bold text-emerald-800 bg-white border border-slate-200 rounded shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all";
            if (viewPaletteTextVars) viewPaletteTextVars.classList.remove("hidden");
        } else if (tabName === "table") {
            tabPaletteTableVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-bold text-indigo-900 bg-white border border-slate-200 rounded shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all";
            if (viewPaletteTableVars) viewPaletteTableVars.classList.remove("hidden");
        } else if (tabName === "detected") {
            tabPaletteDetectedVars.className = "palette-tab flex-1 py-1.5 px-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all";
            if (viewPaletteDetectedVars) viewPaletteDetectedVars.classList.remove("hidden");
        }
    }

    if (tabPaletteTextVars) tabPaletteTextVars.onclick = () => setPaletteTabActive("text");
    if (tabPaletteTableVars) tabPaletteTableVars.onclick = () => setPaletteTabActive("table");
    if (tabPaletteDetectedVars) tabPaletteDetectedVars.onclick = () => setPaletteTabActive("detected");

    // Palette Search & Filters
    const paletteVarsSearchInput = document.getElementById("paletteVarsSearchInput");
    if (paletteVarsSearchInput) {
        paletteVarsSearchInput.oninput = () => renderPaletteTextVars();
    }

    const paletteCatChips = document.querySelectorAll(".palette-cat-chip");
    paletteCatChips.forEach(chip => {
        chip.onclick = () => {
            currentPaletteCat = chip.getAttribute("data-cat") || "all";
            paletteCatChips.forEach(c => {
                c.className = "palette-cat-chip px-1.5 py-0.5 rounded-full font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer";
            });
            chip.className = "palette-cat-chip px-2 py-0.5 rounded-full font-bold bg-slate-800 text-white cursor-pointer";
            renderPaletteTextVars();
        };
    });

    // -------------------------------------------------------------
    // Undo / Redo (Hoàn tác / Làm lại) System (Ctrl+Z / Ctrl+Y)
    // -------------------------------------------------------------
    const undoStack = [];
    const redoStack = [];
    const MAX_UNDO_STACK = 50;

    function pushUndoState(actionName = "Chỉnh sửa") {
        if (!documentContentDisplay) return;
        const currentHtml = documentContentDisplay.innerHTML;
        if (undoStack.length > 0 && undoStack[undoStack.length - 1].html === currentHtml) {
            return;
        }
        undoStack.push({
            html: currentHtml,
            action: actionName,
            time: Date.now()
        });
        if (undoStack.length > MAX_UNDO_STACK) undoStack.shift();
        redoStack.length = 0;
        updateUndoRedoButtons();
    }

    function performUndo() {
        if (undoStack.length === 0) {
            showToast("Không còn thao tác nào để hoàn tác!", "info");
            return;
        }
        const currentHtml = documentContentDisplay.innerHTML;
        redoStack.push({
            html: currentHtml,
            action: "Làm lại",
            time: Date.now()
        });

        const previousState = undoStack.pop();
        documentContentDisplay.innerHTML = previousState.html;

        if (state.activeDocId) {
            workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
        }
        renderContextualRecommendedVars();
        updateUndoRedoButtons();
        showToast(`Đã hoàn tác: ${previousState.action || 'Thao tác'} (Ctrl+Z)`);
    }

    function performRedo() {
        if (redoStack.length === 0) {
            showToast("Không còn thao tác nào để làm lại!", "info");
            return;
        }
        const currentHtml = documentContentDisplay.innerHTML;
        undoStack.push({
            html: currentHtml,
            action: "Hoàn tác",
            time: Date.now()
        });

        const nextState = redoStack.pop();
        documentContentDisplay.innerHTML = nextState.html;

        if (state.activeDocId) {
            workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
        }
        renderContextualRecommendedVars();
        updateUndoRedoButtons();
        showToast(`Đã làm lại thao tác (Ctrl+Y)`);
    }

    function updateUndoRedoButtons() {
        const btnUndo = document.getElementById("btnStudioUndo");
        const btnRedo = document.getElementById("btnStudioRedo");
        if (btnUndo) {
            btnUndo.disabled = (undoStack.length === 0);
            btnUndo.classList.toggle("opacity-40", undoStack.length === 0);
            btnUndo.classList.toggle("cursor-not-allowed", undoStack.length === 0);
            btnUndo.title = undoStack.length > 0
                ? `Hoàn tác: ${undoStack[undoStack.length - 1].action || 'Thao tác'} (Ctrl + Z)`
                : `Hoàn tác (Ctrl + Z)`;
        }
        if (btnRedo) {
            btnRedo.disabled = (redoStack.length === 0);
            btnRedo.classList.toggle("opacity-40", redoStack.length === 0);
            btnRedo.classList.toggle("cursor-not-allowed", redoStack.length === 0);
            btnRedo.title = redoStack.length > 0
                ? `Làm lại (Ctrl + Y hoặc Ctrl + Shift + Z)`
                : `Làm lại (Ctrl + Y)`;
        }
    }

    const btnStudioUndo = document.getElementById("btnStudioUndo");
    const btnStudioRedo = document.getElementById("btnStudioRedo");
    if (btnStudioUndo) btnStudioUndo.onclick = () => performUndo();
    if (btnStudioRedo) btnStudioRedo.onclick = () => performRedo();

    window.addEventListener("keydown", (e) => {
        if (state.viewMode !== "single" || studioViewMode !== "edit") return;
        const isCtrlOrCmd = e.ctrlKey || e.metaKey;
        if (isCtrlOrCmd && !e.altKey) {
            const key = e.key.toLowerCase();
            if (key === "z" && !e.shiftKey) {
                e.preventDefault();
                performUndo();
            } else if (key === "y" || (key === "z" && e.shiftKey)) {
                e.preventDefault();
                performRedo();
            }
        }
    });

    // -------------------------------------------------------------
    // Variable Deletion & Tag Action Popover Controller
    // -------------------------------------------------------------
    let activePopoverBadge = null;

    function showTagActionPopover(badge) {
        const popover = document.getElementById("tagActionPopover");
        if (!popover || !badge) return;
        activePopoverBadge = badge;
        const tag = badge.getAttribute("data-tag") || badge.textContent.replace(/[×{}]/g, "").trim();

        const lblName = document.getElementById("lblPopoverTagName");
        if (lblName) lblName.textContent = `{${tag}}`;

        const quickSwapList = document.getElementById("popoverQuickSwapList");
        if (quickSwapList) {
            quickSwapList.innerHTML = "";
            const wf = getCurrentWorkflow();
            const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === state.activeDocId) : null;
            const recVars = (docObj && typeof getStudioRecommendedVarsForDoc === "function")
                ? getStudioRecommendedVarsForDoc(docObj).slice(0, 6)
                : ["TEN_CHU_DAU_TU", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "SO_BAO_CAO"];

            recVars.forEach(v => {
                if (v !== tag) {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "px-1.5 py-0.5 bg-slate-800 hover:bg-emerald-700 text-slate-300 hover:text-white rounded text-[10px] font-mono cursor-pointer transition-colors";
                    btn.textContent = `{${v}}`;
                    btn.title = `Đổi thành {${v}}`;
                    btn.onclick = () => {
                        pushUndoState(`Đổi biến {${tag}} sang {${v}}`);
                        badge.setAttribute("data-tag", v);
                        const isTable = v.startsWith("BANG_");
                        badge.className = isTable ? "tag-table-badge" : "tag-badge";
                        badge.innerHTML = `{${v}}<span class="btn-remove-tag" data-tag="${v}" title="Xóa biến này" contenteditable="false">×</span>`;
                        hideTagActionPopover();
                        if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
                        renderContextualRecommendedVars();
                        showToast(`Đã đổi sang biến {${v}}! (Ctrl+Z để hoàn tác)`);
                    };
                    quickSwapList.appendChild(btn);
                }
            });
        }

        popover.classList.remove("hidden");
        const rect = badge.getBoundingClientRect();
        const popoverWidth = 260;
        let left = rect.left;
        let top = rect.bottom + 6;
        if (left + popoverWidth > window.innerWidth) left = window.innerWidth - popoverWidth - 16;
        if (left < 10) left = 10;
        popover.style.position = "fixed";
        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
    }

    function hideTagActionPopover() {
        const popover = document.getElementById("tagActionPopover");
        if (popover) popover.classList.add("hidden");
        activePopoverBadge = null;
    }

    const btnCloseTagPopover = document.getElementById("btnCloseTagPopover");
    if (btnCloseTagPopover) btnCloseTagPopover.onclick = hideTagActionPopover;

    const btnPopoverUnwrapTag = document.getElementById("btnPopoverUnwrapTag");
    if (btnPopoverUnwrapTag) {
        btnPopoverUnwrapTag.onclick = () => {
            if (!activePopoverBadge) return;
            const tag = activePopoverBadge.getAttribute("data-tag") || activePopoverBadge.textContent.replace(/[×{}]/g, "").trim();
            pushUndoState(`Gỡ thẻ biến {${tag}}`);
            const textNode = document.createTextNode(`{${tag}}`);
            activePopoverBadge.parentNode.replaceChild(textNode, activePopoverBadge);
            hideTagActionPopover();
            if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            renderContextualRecommendedVars();
            showToast(`Đã gỡ biến {${tag}} thành văn bản thường! (Ctrl+Z để hoàn tác)`);
        };
    }

    const btnPopoverDeleteTag = document.getElementById("btnPopoverDeleteTag");
    if (btnPopoverDeleteTag) {
        btnPopoverDeleteTag.onclick = () => {
            if (!activePopoverBadge) return;
            const tag = activePopoverBadge.getAttribute("data-tag") || activePopoverBadge.textContent.replace(/[×{}]/g, "").trim();
            pushUndoState(`Xóa biến {${tag}}`);
            activePopoverBadge.remove();
            hideTagActionPopover();
            if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            renderContextualRecommendedVars();
            showToast(`Đã xóa biến {${tag}} khỏi văn bản! (Ctrl+Z để hoàn tác)`);
        };
    }

    const btnRemoveTagFromSelection = document.getElementById("btnRemoveTagFromSelection");
    if (btnRemoveTagFromSelection) {
        btnRemoveTagFromSelection.onclick = () => {
            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0 || !documentContentDisplay) return;
            const range = sel.getRangeAt(0);

            let removedCount = 0;
            const badges = documentContentDisplay.querySelectorAll(".tag-badge, .tag-table-badge");
            badges.forEach(b => {
                if (sel.containsNode(b, true)) {
                    if (removedCount === 0) pushUndoState("Xóa các biến đã chọn");
                    b.remove();
                    removedCount++;
                }
            });

            if (removedCount === 0) {
                const parentEl = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
                const closestBadge = parentEl ? parentEl.closest(".tag-badge, .tag-table-badge") : null;
                if (closestBadge) {
                    pushUndoState("Xóa biến " + closestBadge.textContent);
                    closestBadge.remove();
                    removedCount++;
                }
            }

            if (removedCount > 0) {
                if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
                renderContextualRecommendedVars();
                showToast(`Đã xóa ${removedCount} thẻ biến! (Ctrl+Z để hoàn tác)`);
            } else {
                showToast("Vui lòng bôi đen thẻ biến cần xóa!", "info");
            }

            const menu = document.getElementById("selectionMenu");
            if (menu) menu.classList.add("hidden");
        };
    }

    // Canvas click delegation: Delete button 'x' & Tag Popover
    if (documentContentDisplay) {
        documentContentDisplay.addEventListener("click", (e) => {
            const removeBtn = e.target.closest(".btn-remove-tag");
            if (removeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const badge = removeBtn.closest(".tag-badge, .tag-table-badge");
                if (badge) {
                    const tag = badge.getAttribute("data-tag") || badge.textContent.replace(/[×{}]/g, "").trim();
                    pushUndoState(`Xóa biến {${tag}}`);
                    badge.remove();
                    if (state.activeDocId) workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
                    renderContextualRecommendedVars();
                    showToast(`Đã xóa biến {${tag}}! (Bấm Ctrl+Z để hoàn tác)`);
                }
                return;
            }

            const badge = e.target.closest(".tag-badge, .tag-table-badge");
            if (badge) {
                e.preventDefault();
                e.stopPropagation();
                showTagActionPopover(badge);
            } else {
                hideTagActionPopover();
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#tagActionPopover") && !e.target.closest(".tag-badge") && !e.target.closest(".tag-table-badge")) {
            hideTagActionPopover();
        }
    });

    // Save Selection in Canvas on any keyup/mouseup/selectionchange & real-time coverage updates
    let canvasInputDebounceTimer = null;
    let canvasUndoDebounceTimer = null;
    if (documentContentDisplay) {
        documentContentDisplay.addEventListener("input", () => {
            if (state.activeDocId && studioViewMode === "edit") {
                workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            }
            if (canvasInputDebounceTimer) clearTimeout(canvasInputDebounceTimer);
            canvasInputDebounceTimer = setTimeout(() => {
                if (typeof renderContextualRecommendedVars === "function") {
                    renderContextualRecommendedVars();
                }
            }, 300);

            if (canvasUndoDebounceTimer) clearTimeout(canvasUndoDebounceTimer);
            canvasUndoDebounceTimer = setTimeout(() => {
                pushUndoState("Chỉnh sửa nội dung");
            }, 800);
        });
        documentContentDisplay.addEventListener("keyup", saveCanvasSelection);
        documentContentDisplay.addEventListener("mouseup", saveCanvasSelection);
    }
    document.addEventListener("selectionchange", saveCanvasSelection);

    // Text selection & floating menu for quick tagging in Single View
    let selectedTextToTag = "";
    let activeSelectionRange = null;

    if (selectionMenu) {
        selectionMenu.addEventListener("mousedown", (e) => {
            // Prevent selection from collapsing on mousedown
            e.preventDefault();
        });
    }

    document.addEventListener("selectionchange", () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !documentContentDisplay || !documentContentDisplay.contains(sel.anchorNode)) {
            if (selectionMenu && !selectionMenu.contains(document.activeElement)) {
                selectionMenu.classList.add("hidden");
            }
            return;
        }

        const text = sel.toString().trim();
        if (text.length > 1 && text.length < 150) {
            selectedTextToTag = text;
            const range = sel.getRangeAt(0);
            activeSelectionRange = range.cloneRange();
            const rect = range.getBoundingClientRect();
            const wrapper = document.getElementById("docViewerWrapper");
            if (!wrapper) return;
            const wrapperRect = wrapper.getBoundingClientRect();

            selectionMenu.style.top = `${rect.top - wrapperRect.top + wrapper.scrollTop - 38}px`;
            selectionMenu.style.left = `${Math.max(10, rect.left - wrapperRect.left)}px`;
            selectionMenu.classList.remove("hidden");
        }
    });

    document.querySelectorAll(".quick-tag-btn").forEach(btn => {
        btn.onclick = () => {
            const tag = btn.getAttribute("data-var");
            applyTagToSelection(tag);
        };
    });

    const btnQuickCustomTag = document.getElementById("btnQuickCustomTag");
    if (btnQuickCustomTag) {
        btnQuickCustomTag.onclick = () => {
            const sel = window.getSelection();
            if ((!selectedTextToTag || !selectedTextToTag.trim()) && sel && !sel.isCollapsed && documentContentDisplay && documentContentDisplay.contains(sel.anchorNode)) {
                selectedTextToTag = sel.toString().trim();
            }
            if (!selectedTextToTag) return;
            let savedRange = null;
            if (sel && sel.rangeCount > 0 && documentContentDisplay && documentContentDisplay.contains(sel.anchorNode)) {
                savedRange = sel.getRangeAt(0).cloneRange();
            } else if (activeSelectionRange) {
                savedRange = activeSelectionRange.cloneRange();
            }
            openEditVariableModal(null, null, {
                mode: "selection",
                selectedText: selectedTextToTag,
                savedRange: savedRange
            });
        };
    }

    if (btnSingleAddCustomVar) {
        btnSingleAddCustomVar.onclick = () => {
            const item = state.batchFiles[state.activeDocId];
            if (!item) {
                showToast("Văn bản này chưa có file Word để thêm biến!", "error");
                return;
            }
            openEditVariableModal(null, null, {
                mode: "add_to_doc",
                addToCurrentDoc: true
            });
        };
    }

    const btnOpenAddVarModalFromPalette = document.getElementById("btnOpenAddVarModalFromPalette");
    if (btnOpenAddVarModalFromPalette) {
        btnOpenAddVarModalFromPalette.onclick = () => {
            openEditVariableModal(null, null, { mode: "catalog" });
        };
    }

    // -------------------------------------------------------------
    // Gợi ý & Nhận diện tự động từ Từ điển & Thông tin chung
    // -------------------------------------------------------------
    const btnRescanDictionaryVars = document.getElementById("btnRescanDictionaryVars");
    if (btnRescanDictionaryVars) {
        btnRescanDictionaryVars.onclick = () => rescanDocumentEntitiesFromDictionary();
    }

    async function rescanDocumentEntitiesFromDictionary() {
        const docId = state.activeDocId;
        if (!docId) {
            showToast("Vui lòng chọn một văn bản trước!", "warning");
            return;
        }
        const item = state.batchFiles[docId];
        if (!item) {
            showToast("Văn bản này chưa có nội dung hoặc file Word để quét!", "warning");
            return;
        }

        const paragraphs = item.paragraphs || [];
        if (paragraphs.length === 0) {
            showToast("Tài liệu không có đoạn văn nào để quét!", "warning");
            return;
        }

        const wf = getCurrentWorkflow();
        const docObj = (wf && wf.documents) ? wf.documents.find(d => d.id === docId) : { id: docId, name: docId, code: docId };

        const freshMappings = detectEntitiesForDocument(docObj, paragraphs);
        let addedCount = 0;

        item.mappings = item.mappings || [];
        freshMappings.forEach(fm => {
            const exists = item.mappings.some(m => m.tag === fm.tag || m.originalText === fm.originalText);
            if (!exists) {
                item.mappings.push(fm);
                addedCount++;
            }
        });

        // Tái tạo styledHtml nếu có file docx buffer
        if (item.arrayBuffer) {
            item.styledHtml = await parseDocxToStyledHtml(item.arrayBuffer, item.mappings);
        }

        delete workingDraftHtml[docId];
        localStorage.removeItem("ho_so_custom_template_html_" + docId);

        renderCanvasContent(item);
        renderSingleMappingRows(item);
        renderBatchTable();
        if (typeof renderContextualRecommendedVars === "function") {
            renderContextualRecommendedVars();
        }

        if (addedCount > 0) {
            showToast(`⚡ Đã quét Từ điển & Thông tin chung: Tự động gán thêm ${addedCount} biến!`, "success");
        } else {
            showToast("Đã quét xong: Các biến từ Từ điển & Thông tin chung đã được nhận diện đầy đủ!", "info");
        }
    }

    // -------------------------------------------------------------
    // Master Dictionary Modal Controller (2 Tabs: 1. Biến chữ | 2. Biến dạng bảng)
    // -------------------------------------------------------------
    let currentDictCatFilter = "all";
    let studioDictCurrentMode = "scalar"; // "scalar" or "table"
    let currentStudioActiveDictTableTag = "BANG_HANG_HOA";

    function switchStudioDictMode(mode) {
        studioDictCurrentMode = mode;
        const tabScalar = document.getElementById("tabStudioDictScalarMode");
        const tabTable = document.getElementById("tabStudioDictTableMode");
        const viewScalar = document.getElementById("studioDictScalarVarsView");
        const viewTable = document.getElementById("studioDictTableVarsView");

        if (mode === "scalar") {
            if (tabScalar) {
                tabScalar.className = "studio-dict-nav-tab px-3 py-1.5 font-bold text-xs border-b-2 border-emerald-600 text-emerald-700 flex items-center gap-1.5 cursor-pointer transition-all bg-white rounded-t";
            }
            if (tabTable) {
                tabTable.className = "studio-dict-nav-tab px-3 py-1.5 font-medium text-xs border-b-2 border-transparent text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/40 flex items-center gap-1.5 cursor-pointer transition-all rounded-t";
            }
            if (viewScalar) viewScalar.classList.remove("hidden");
            if (viewTable) viewTable.classList.add("hidden");
            renderStudioVarsTable();
        renderPaletteTextVars();
        } else {
            if (tabTable) {
                tabTable.className = "studio-dict-nav-tab px-3 py-1.5 font-bold text-xs border-b-2 border-indigo-600 text-indigo-700 flex items-center gap-1.5 cursor-pointer transition-all bg-white rounded-t";
            }
            if (tabScalar) {
                tabScalar.className = "studio-dict-nav-tab px-3 py-1.5 font-medium text-xs border-b-2 border-transparent text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/40 flex items-center gap-1.5 cursor-pointer transition-all rounded-t";
            }
            if (viewScalar) viewScalar.classList.add("hidden");
            if (viewTable) viewTable.classList.remove("hidden");
            renderStudioDictTableView();
        }
        updateStudioDictBadgeCounts();
    }

    function updateStudioDictBadgeCounts() {
        const badgeScalar = document.getElementById("badgeStudioDictScalarCount");
        if (badgeScalar) badgeScalar.textContent = String(MASTER_VARIABLES_CATALOG.length);

        const badgeTable = document.getElementById("badgeStudioDictTableCount");
        if (badgeTable) {
            const allDefs = getAllStudioTableVars();
            badgeTable.textContent = `${allDefs.length} loại`;
        }
    }

    function renderStudioDictTableView() {
        const allDefs = getAllStudioTableVars();
        if (!allDefs.find(t => t.tag === currentStudioActiveDictTableTag)) {
            currentStudioActiveDictTableTag = allDefs[0] ? allDefs[0].tag : "BANG_HANG_HOA";
        }

        // 1. Render pills
        const pillsContainer = document.getElementById("studioDictTableTypePills");
        if (pillsContainer) {
            pillsContainer.innerHTML = allDefs.map(tDef => {
                const isActive = tDef.tag === currentStudioActiveDictTableTag;
                const activeClass = isActive
                    ? "bg-indigo-600 text-white font-bold shadow-xs border-indigo-600"
                    : "bg-white hover:bg-indigo-50 text-slate-700 font-medium border-slate-200 hover:border-indigo-300";
                const isCustom = !tDef.isSystem;
                return `
                    <button type="button" class="btn-studio-dict-table-pill px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${activeClass}" data-table-tag="${tDef.tag}">
                        <span>${tDef.icon || "📋"}</span>
                        <span>{${tDef.tag}}</span>
                        ${isCustom ? '<span class="text-[9.5px] text-amber-500 font-bold" title="Bảng do bạn tự định nghĩa">⭐</span>' : ''}
                    </button>
                `;
            }).join("");

            pillsContainer.querySelectorAll(".btn-studio-dict-table-pill").forEach(btn => {
                btn.onclick = () => {
                    currentStudioActiveDictTableTag = btn.getAttribute("data-table-tag");
                    renderStudioDictTableView();
                };
            });
        }

        // 2. Active table details
        const activeDef = allDefs.find(t => t.tag === currentStudioActiveDictTableTag) || allDefs[0];
        if (!activeDef) return;

        const iconEl = document.getElementById("studioActiveTableIcon");
        const titleEl = document.getElementById("studioActiveTableTitle");
        const colCountBadge = document.getElementById("studioActiveTableColCountBadge");
        const typeBadge = document.getElementById("studioActiveTableTypeBadge");
        const descEl = document.getElementById("studioActiveTableDesc");
        const lblCode = document.getElementById("lblStudioActiveTableTagCode");
        const hintCode = document.getElementById("studioDictTableTagHint");
        const btnDelete = document.getElementById("btnStudioDictDeleteTable");

        if (iconEl) iconEl.textContent = activeDef.icon || "📋";
        if (titleEl) titleEl.textContent = `${activeDef.tag} - ${activeDef.name}`;
        if (colCountBadge) colCountBadge.textContent = `${(activeDef.columns || []).length} cột`;
        if (typeBadge) {
            typeBadge.textContent = activeDef.isSystem ? "HỆ THỐNG" : "⭐ TÙY BIẾN";
            typeBadge.className = activeDef.isSystem
                ? "text-[9.5px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded shadow-2xs"
                : "text-[9.5px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded shadow-2xs";
        }
        if (descEl) descEl.textContent = activeDef.desc || "Bảng tự động kẻ viền chuẩn Nghị định 30/2020/NĐ-CP.";
        if (lblCode) lblCode.textContent = `{${activeDef.tag}}`;
        if (hintCode) hintCode.textContent = `{${activeDef.tag}}`;

        if (btnDelete) {
            if (activeDef.isSystem) {
                btnDelete.classList.add("hidden");
            } else {
                btnDelete.classList.remove("hidden");
                btnDelete.onclick = () => {
                    deleteCustomStudioTable(activeDef.tag);
                };
            }
        }

        // 3. Render Columns Preview & Sample Visual Grid
        const gridContainer = document.getElementById("studioDictTableGridContainer");
        if (gridContainer) {
            const cols = activeDef.columns || [];
            
            // Sub-table 1: Columns configuration overview
            const colsRowsHtml = cols.map((c, idx) => {
                const key = typeof c === "string" ? `col_${idx + 1}` : (c.key || `col_${idx + 1}`);
                const label = typeof c === "string" ? c : (c.label || key);
                const type = (typeof c === "object" && c.type) ? c.type : "text";
                const align = (typeof c === "object" && c.align) ? c.align : "left";
                const width = (typeof c === "object" && c.widthPct) ? c.widthPct : "auto";
                const typeLabel = type === "currency" ? "Số tiền (VNĐ)" : type === "number" ? "Số lượng" : type === "calc_amount" ? "Thành tiền tự tính" : "Văn bản";

                return `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="border border-slate-200 px-2 py-1 text-center font-mono text-slate-500">${idx + 1}</td>
                        <td class="border border-slate-200 px-2 py-1 font-mono text-indigo-700 font-bold">${escapeHtml(key)}</td>
                        <td class="border border-slate-200 px-2 py-1 font-semibold text-slate-900">${escapeHtml(label)}</td>
                        <td class="border border-slate-200 px-2 py-1 text-slate-600">${typeLabel}</td>
                        <td class="border border-slate-200 px-2 py-1 text-center font-mono text-slate-600">${align}</td>
                        <td class="border border-slate-200 px-2 py-1 text-center font-mono text-slate-500">${width}</td>
                    </tr>
                `;
            }).join("");

            // Sub-table 2: Live Visual Sample
            const sampleHtml = renderSampleTableHtml(activeDef.tag);

            gridContainer.innerHTML = `
                <div class="p-3 space-y-4">
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                <i class="fa-solid fa-list-check text-indigo-600"></i>
                                <span>Cấu trúc chi tiết các cột:</span>
                            </span>
                        </div>
                        <table class="w-full border-collapse border border-slate-200 text-xs">
                            <thead class="bg-slate-100 text-slate-700 font-bold">
                                <tr>
                                    <th class="border border-slate-200 px-2 py-1 w-10 text-center">STT</th>
                                    <th class="border border-slate-200 px-2 py-1 w-28">Mã cột</th>
                                    <th class="border border-slate-200 px-2 py-1">Tiêu đề cột</th>
                                    <th class="border border-slate-200 px-2 py-1 w-32">Loại dữ liệu</th>
                                    <th class="border border-slate-200 px-2 py-1 w-20 text-center">Căn lề</th>
                                    <th class="border border-slate-200 px-2 py-1 w-20 text-center">Độ rộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${colsRowsHtml}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                <i class="fa-solid fa-eye text-emerald-600"></i>
                                <span>Hình ảnh mô phỏng bảng khi xuất file Word:</span>
                            </span>
                            <span class="text-[10px] text-slate-500 italic">Bảng tự động kẻ viền đầy đủ, phông Times New Roman 13pt</span>
                        </div>
                        ${sampleHtml}
                    </div>
                </div>
            `;
        }

        // Wire Copy Tag button
        const btnCopyTag = document.getElementById("btnStudioDictCopyTableTag");
        if (btnCopyTag) {
            btnCopyTag.onclick = () => {
                navigator.clipboard.writeText(`{${activeDef.tag}}`).then(() => {
                    showToast(`Đã sao chép mã {${activeDef.tag}} vào clipboard!`, "success");
                });
            };
        }

        // Wire Insert Tag button
        const btnInsertTag = document.getElementById("btnStudioDictInsertTable");
        if (btnInsertTag) {
            btnInsertTag.onclick = () => {
                insertTagAtCursor(`{${activeDef.tag}}`);
                closeStudioVarsModal();
                showToast(`Đã chèn {${activeDef.tag}} vào văn bản!`, "success");
            };
        }
    }

    function openStudioVarsModal() {
        if (!modalStudioVars) return;
        updateStudioDictBadgeCounts();
        if (studioDictCurrentMode === "scalar") {
            renderStudioVarsTable();
        } else {
            renderStudioDictTableView();
        }
        modalStudioVars.classList.remove("hidden");
        if (studioVarsSearchInput && studioDictCurrentMode === "scalar") {
            studioVarsSearchInput.value = "";
            setTimeout(() => studioVarsSearchInput.focus(), 100);
        }
    }

    function closeStudioVarsModal() {
        if (modalStudioVars) modalStudioVars.classList.add("hidden");
    }

    // Modal navigation tabs wiring
    const tabStudioDictScalarMode = document.getElementById("tabStudioDictScalarMode");
    const tabStudioDictTableMode = document.getElementById("tabStudioDictTableMode");
    if (tabStudioDictScalarMode) tabStudioDictScalarMode.onclick = () => switchStudioDictMode("scalar");
    if (tabStudioDictTableMode) tabStudioDictTableMode.onclick = () => switchStudioDictMode("table");

    const btnStudioDictAddTableVar = document.getElementById("btnStudioDictAddTableVar");
    if (btnStudioDictAddTableVar) {
        btnStudioDictAddTableVar.onclick = () => openCreateCustomTableModal();
    }

    const btnStudioDictResetTableDefs = document.getElementById("btnStudioDictResetTableDefs");
    if (btnStudioDictResetTableDefs) {
        btnStudioDictResetTableDefs.onclick = () => {
            if (confirm("Khôi phục danh mục bảng biến xạ về 3 bảng chuẩn ban đầu (Hàng hóa, Nhân sự, Tiến độ)? Các bảng tự tạo sẽ bị xóa.")) {
                localStorage.removeItem("ho_so_custom_table_defs");
                localStorage.removeItem("ho_so_custom_tables");
                currentStudioActiveDictTableTag = "BANG_HANG_HOA";
                renderPaletteTableVars();
                updateStudioDictBadgeCounts();
                renderStudioDictTableView();
                showToast("Đã khôi phục danh mục bảng về mặc định!");
            }
        };
    }

    function renderStudioVarsTable() {
        if (!studioVarsTableBody) return;

        const catCounts = { all: MASTER_VARIABLES_CATALOG.length, A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0 };
        MASTER_VARIABLES_CATALOG.forEach(v => {
            const k = (v.groupKey || "J").toUpperCase();
            if (catCounts[k] !== undefined) catCounts[k]++;
            else catCounts["J"]++;
        });

        for (const k in catCounts) {
            const el = document.getElementById(`countStudioVar_${k}`);
            if (el) el.textContent = catCounts[k];
        }
        const query = studioVarsSearchInput ? studioVarsSearchInput.value.trim().toLowerCase() : "";

        const filtered = MASTER_VARIABLES_CATALOG.filter(v => {
            if (currentDictCatFilter !== "all" && v.groupKey !== currentDictCatFilter) return false;
            if (!query) return true;
            return v.tag.toLowerCase().includes(query) || v.label.toLowerCase().includes(query) || v.group.toLowerCase().includes(query);
        });

        if (filtered.length === 0) {
            studioVarsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="py-6 text-center text-slate-400 italic">
                        Không tìm thấy mã thẻ phù hợp với từ khóa "${query}"
                    </td>
                </tr>
            `;
            return;
        }

        studioVarsTableBody.innerHTML = filtered.map((v, filteredIdx) => {
            const isFirst = filteredIdx === 0;
            const isLast = filteredIdx === filtered.length - 1;

            return `
            <tr class="studio-dict-var-row hover:bg-slate-50/80 transition-colors select-none" draggable="true" data-tag="${v.tag}">
                <td class="col-stt py-0.5 px-1 text-center text-slate-400 font-mono text-[9.5px] border-r border-slate-100 cursor-grab active:cursor-grabbing hover:bg-slate-100" title="Kéo thả để sắp xếp">
                    <div class="flex items-center justify-center gap-1">
                        <i class="fa-solid fa-grip-vertical text-[8px] text-slate-300"></i>
                        <span>${v.stt}</span>
                    </div>
                </td>
                <td class="col-tag py-0.5 px-2 border-r border-slate-100 font-mono">
                    <button type="button" class="btn-copy-tag group font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded flex items-center gap-1 transition-all cursor-pointer truncate max-w-full" data-tag="{${v.tag}}" title="Bấm để sao chép vào Word">
                        <span class="truncate">{${v.tag}}</span>
                        <i class="fa-regular fa-copy text-[9px] text-emerald-600 shrink-0"></i>
                    </button>
                </td>
                <td class="col-label py-0.5 px-2 text-slate-700 font-medium text-[11px] border-r border-slate-100 truncate" title="${v.label}">${v.label}</td>
                <td class="col-group py-0.5 px-2 border-r border-slate-100">
                    <span class="px-1.5 py-0.2 rounded text-[9.5px] font-semibold truncate block ${v.isGeneral ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700'}" title="${v.group}">${v.group}</span>
                </td>
                <td class="col-actions py-0.5 px-1 text-center">
                    <div class="flex items-center justify-center space-x-0.5">
                        <button type="button" class="btn-move-var-up text-[9px] font-bold text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all ${isFirst ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}" data-tag="${v.tag}" title="Di chuyển lên trên (▲)">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button type="button" class="btn-move-var-down text-[9px] font-bold text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all ${isLast ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}" data-tag="${v.tag}" title="Di chuyển xuống dưới (▼)">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                        <button type="button" class="btn-copy-tag text-[9.5px] font-bold text-emerald-700 hover:text-emerald-900 bg-white hover:bg-emerald-50 border border-slate-200 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all" data-tag="{${v.tag}}" title="Sao chép {${v.tag}}">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                        <button type="button" class="btn-edit-studio-var text-[9.5px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-1.5 h-5 rounded cursor-pointer transition-all flex items-center gap-0.5" data-tag="${v.tag}" title="Điều chỉnh tên biến và mã TAG">
                            <i class="fa-solid fa-pen-to-square text-[8.5px]"></i>
                            <span>Sửa</span>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        }).join("");

        studioVarsTableBody.querySelectorAll(".btn-move-var-up").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                moveStudioVariableInCatalog(tag, "up");
            };
        });

        studioVarsTableBody.querySelectorAll(".btn-move-var-down").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                moveStudioVariableInCatalog(tag, "down");
            };
        });

        studioVarsTableBody.querySelectorAll(".btn-copy-tag").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                if (navigator.clipboard) navigator.clipboard.writeText(tag);
                showToast(`Đã sao chép ${tag} vào clipboard!`);
            };
        });

        studioVarsTableBody.querySelectorAll(".btn-edit-studio-var").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                openEditVariableModal(tag);
            };
        });

        // Drag & Drop reordering support for Studio
        let draggedTag = null;
        studioVarsTableBody.querySelectorAll(".studio-dict-var-row").forEach(row => {
            row.addEventListener("dragstart", (e) => {
                draggedTag = row.getAttribute("data-tag");
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", draggedTag);
                row.classList.add("opacity-50", "bg-indigo-50");
            });

            row.addEventListener("dragend", () => {
                row.classList.remove("opacity-50", "bg-indigo-50");
                studioVarsTableBody.querySelectorAll(".studio-dict-var-row").forEach(r => {
                    r.classList.remove("border-t-2", "border-indigo-500", "bg-indigo-50/50");
                });
            });

            row.addEventListener("dragover", (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                row.classList.add("border-t-2", "border-indigo-500", "bg-indigo-50/50");
            });

            row.addEventListener("dragleave", () => {
                row.classList.remove("border-t-2", "border-indigo-500", "bg-indigo-50/50");
            });

            row.addEventListener("drop", (e) => {
                e.preventDefault();
                row.classList.remove("border-t-2", "border-indigo-500", "bg-indigo-50/50");
                const targetTag = row.getAttribute("data-tag");
                if (draggedTag && targetTag && draggedTag !== targetTag) {
                    moveStudioVariableToPosition(draggedTag, targetTag, "before");
                }
            });
        });
    }

    if (btnOpenStudioVarsModal) btnOpenStudioVarsModal.onclick = openStudioVarsModal;
    if (btnCloseStudioVarsModal) btnCloseStudioVarsModal.onclick = closeStudioVarsModal;
    if (btnFooterCloseStudioVarsModal) btnFooterCloseStudioVarsModal.onclick = closeStudioVarsModal;
    function setupSafeModalBackdropClose(modalElement, closeFn) {
        if (!modalElement || typeof closeFn !== "function") return;
        let isMouseDownOnBackdrop = false;

        modalElement.addEventListener("mousedown", (e) => {
            isMouseDownOnBackdrop = (e.target === modalElement);
        });

        modalElement.addEventListener("mouseup", (e) => {
            if (!isMouseDownOnBackdrop) {
                isMouseDownOnBackdrop = false;
            }
        });

        modalElement.addEventListener("click", (e) => {
            if (isMouseDownOnBackdrop && e.target === modalElement) {
                closeFn();
            }
            isMouseDownOnBackdrop = false;
        });
    }

    if (modalStudioVars) {
        setupSafeModalBackdropClose(modalStudioVars, closeStudioVarsModal);
    }
    if (studioVarsSearchInput) {
        studioVarsSearchInput.oninput = renderStudioVarsTable;
    }
    studioVarPills.forEach(pill => {
        pill.onclick = () => {
            studioVarPills.forEach(p => p.className = "studio-var-pill px-2 py-0.5 rounded-full font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors");
            pill.className = "studio-var-pill px-2 py-0.5 rounded-full font-bold bg-slate-800 text-white cursor-pointer transition-colors";
            currentDictCatFilter = pill.getAttribute("data-cat");
            renderStudioVarsTable();
        };
    });

    // Expose for external calls and debugging
    window.openEditVariableModal = openEditVariableModal;
    window.renderPaletteTextVars = renderPaletteTextVars;
    window.renderStudioVarsTable = renderStudioVarsTable;
    window.openStudioVarsModal = openStudioVarsModal;

    window.TemplateStudio = {
        state,
        STUDIO_WORKFLOWS,
        MASTER_VARIABLES_CATALOG,
        getAllStudioTableVars,
        openCreateCustomTableModal,
        openStudioVarsModal,
        deleteCustomStudioTable,
        renderPaletteTableVars,
        renderStudioDictTableView,
        setStudioZoom,
        studioZoomIn,
        studioZoomOut,
        studioZoomReset,
        goToStudioPage,
        updateStudioPagination,
        insertPageBreakAtCursor,
        detectEntitiesForDocument,
        processIncomingFiles,
        createTaggedDocxBlob,
        switchViewMode,
        renderBatchTable,
        renderSingleView,
        showToast
    };

    // -------------------------------------------------------------
    // Variable & TAG Editor Controller with Real-time Duplicate Check
    // -------------------------------------------------------------
    const LS_VARS_CUSTOMIZATIONS = "ho_so_vars_catalog_customizations";
    let activeEditingMappingIdx = null;

    function loadCatalogCustomizations() {
        try {
            const raw = localStorage.getItem(LS_VARS_CUSTOMIZATIONS);
            if (!raw) return;
            const savedList = JSON.parse(raw);
            if (!Array.isArray(savedList) || savedList.length === 0) return;

            const reordered = [];
            const remaining = [...MASTER_VARIABLES_CATALOG];

            savedList.forEach((savedVar, idx) => {
                const foundIdx = remaining.findIndex(v => 
                    (savedVar.origTag && v.tag && v.tag.toUpperCase() === savedVar.origTag.toUpperCase()) || 
                    (savedVar.tag && v.tag && v.tag.toUpperCase() === savedVar.tag.toUpperCase())
                );
                if (foundIdx !== -1) {
                    const item = remaining.splice(foundIdx, 1)[0];
                    item.label = savedVar.label;
                    item.tag = savedVar.tag;
                    item.group = savedVar.group;
                    item.groupKey = savedVar.groupKey;
                    item.isGeneral = savedVar.isGeneral;
                    item.example = savedVar.example;
                    item.stt = idx + 1;
                    reordered.push(item);
                } else {
                    savedVar.stt = idx + 1;
                    reordered.push(savedVar);
                }
            });

            // Append any builtin items that were not in savedList
            remaining.forEach(item => {
                item.stt = reordered.length + 1;
                reordered.push(item);
            });

            // Mutate MASTER_VARIABLES_CATALOG in-place
            MASTER_VARIABLES_CATALOG.length = 0;
            reordered.forEach(item => MASTER_VARIABLES_CATALOG.push(item));
        } catch (e) {
            console.warn("Error loading catalog customizations in Studio:", e);
        }
    }

    function moveStudioVariableInCatalog(tag, direction = "up") {
        if (!Array.isArray(MASTER_VARIABLES_CATALOG) || MASTER_VARIABLES_CATALOG.length === 0) return;

        // Current list based on active category filter
        const currentList = MASTER_VARIABLES_CATALOG.filter(v => {
            if (currentDictCatFilter !== "all" && v.groupKey !== currentDictCatFilter) return false;
            return true;
        });

        const listIdx = currentList.findIndex(v => v.tag === tag);
        if (listIdx === -1) return;

        const targetListIdx = direction === "up" ? listIdx - 1 : listIdx + 1;
        if (targetListIdx < 0 || targetListIdx >= currentList.length) return;

        const targetTag = currentList[targetListIdx].tag;

        const globalIdxA = MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === tag);
        const globalIdxB = MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === targetTag);
        if (globalIdxA === -1 || globalIdxB === -1) return;

        const temp = MASTER_VARIABLES_CATALOG[globalIdxA];
        MASTER_VARIABLES_CATALOG[globalIdxA] = MASTER_VARIABLES_CATALOG[globalIdxB];
        MASTER_VARIABLES_CATALOG[globalIdxB] = temp;

        MASTER_VARIABLES_CATALOG.forEach((v, i) => { v.stt = i + 1; });
        saveCatalogCustomizations();

        renderStudioVarsTable();
        renderPaletteTextVars();
        showToast(`Đã chuyển biến "${temp.label}" ${direction === "up" ? "lên" : "xuống"} vị trí #${MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === tag) + 1}!`, "info");
    }

    function moveStudioVariableToPosition(draggedTag, targetTag, position = "before") {
        if (!draggedTag || !targetTag || draggedTag === targetTag) return;
        const fromIdx = MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === draggedTag);
        if (fromIdx === -1) return;

        const [item] = MASTER_VARIABLES_CATALOG.splice(fromIdx, 1);
        let insertIdx = MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === targetTag);
        if (insertIdx === -1) {
            MASTER_VARIABLES_CATALOG.push(item);
        } else {
            if (position === "after") insertIdx += 1;
            MASTER_VARIABLES_CATALOG.splice(insertIdx, 0, item);
        }

        MASTER_VARIABLES_CATALOG.forEach((v, i) => { v.stt = i + 1; });
        saveCatalogCustomizations();

        renderStudioVarsTable();
        renderPaletteTextVars();
        showToast(`Đã chuyển biến "${item.label}" đến vị trí #${item.stt}!`, "success");
    }

    window.moveStudioVariableInCatalog = moveStudioVariableInCatalog;
    window.moveStudioVariableToPosition = moveStudioVariableToPosition;

    loadCatalogCustomizations();
    window.MASTER_VARIABLES_CATALOG = MASTER_VARIABLES_CATALOG;

    // (slugifyToUpperSnake declared below)

    let currentEditVarContext = null;

    function findRangeForTextInContainer(container, searchText) {
        if (!container || !searchText) return null;
        const cleanSearch = searchText.replace(/\u00a0/g, " ").trim();
        if (!cleanSearch) return null;

        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                if (node.parentElement && (
                    node.parentElement.classList.contains("tag-badge") || 
                    node.parentElement.classList.contains("tag-table-badge") || 
                    node.parentElement.closest("#selectionMenu") ||
                    node.parentElement.closest("#tagActionPopover")
                )) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        let fullText = "";
        const nodeRanges = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const start = fullText.length;
            const nodeText = (node.nodeValue || "").replace(/\u00a0/g, " ");
            fullText += nodeText;
            nodeRanges.push({ node, start, end: start + nodeText.length, len: nodeText.length });
        }

        const idx = fullText.indexOf(cleanSearch);
        if (idx === -1) return null;

        const endIdx = idx + cleanSearch.length;
        let startNode = null, startOffset = 0;
        let endNode = null, endOffset = 0;

        for (const nr of nodeRanges) {
            if (!startNode && idx >= nr.start && idx < nr.end) {
                startNode = nr.node;
                startOffset = idx - nr.start;
            }
            if (endIdx > nr.start && endIdx <= nr.end) {
                endNode = nr.node;
                endOffset = endIdx - nr.start;
                break;
            }
        }

        if (startNode && endNode) {
            try {
                const range = document.createRange();
                range.setStart(startNode, startOffset);
                range.setEnd(endNode, endOffset);
                return range;
            } catch (e) {
                console.warn("Error creating range in findRangeForTextInContainer:", e);
                return null;
            }
        }
        return null;
    }

    function replaceTextWithBadgeAcrossNodes(rootEl, searchStr, tag, isTable = false, onlyFirst = false) {
        if (!rootEl || !searchStr) return 0;
        const cleanSearch = searchStr.replace(/\u00a0/g, " ").trim();
        if (!cleanSearch) return 0;
        const cleanTag = (tag || "").replace(/[{}]/g, "").trim().toUpperCase();
        if (!cleanTag) return 0;

        let count = 0;
        while (true) {
            const range = findRangeForTextInContainer(rootEl, cleanSearch);
            if (!range) break;

            const badge = document.createElement("span");
            badge.className = isTable ? "tag-table-badge" : "tag-badge";
            badge.setAttribute("data-tag", cleanTag);
            badge.setAttribute("contenteditable", "false");
            badge.innerHTML = `{${cleanTag}}<span class="btn-remove-tag" data-tag="${cleanTag}" title="Xóa biến này" contenteditable="false">×</span>`;

            try {
                range.deleteContents();
                range.insertNode(badge);
                const spacer = document.createTextNode(" ");
                range.setStartAfter(badge);
                range.insertNode(spacer);
                count++;
            } catch (e) {
                console.warn("Could not insert badge into range in replaceTextWithBadgeAcrossNodes:", e);
                break;
            }

            if (onlyFirst) break;
            if (count >= 100) break;
        }
        return count;
    }

    function openEditVariableModal(tagToEdit = null, mappingIdx = null, options = {}) {
        const modal = document.getElementById("modalEditVariable");
        const title = document.getElementById("modalEditVariableTitle");
        const subtitle = document.getElementById("modalEditVariableSubtitle");
        const origTagInput = document.getElementById("editVarOriginalTag");
        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const tagPreview = document.getElementById("editVarTagPreview");
        const groupSelect = document.getElementById("editVarGroupSelect");
        const scopeSelect = document.getElementById("editVarScopeSelect");
        const exampleInput = document.getElementById("editVarExampleInput");
        const exampleLabel = document.getElementById("editVarExampleLabel");
        const btnDelete = document.getElementById("btnDeleteCustomVar");
        const bannerSelection = document.getElementById("editVarSelectionBanner");
        const bannerText = document.getElementById("editVarSelectionText");
        const applyScopeRow = document.getElementById("editVarApplyScopeRow");

        if (!modal) return;
        activeEditingMappingIdx = mappingIdx;
        currentEditVarContext = {
            mode: options.mode || (tagToEdit ? "edit" : "catalog"),
            selectedText: options.selectedText || "",
            savedRange: options.savedRange || null,
            addToCurrentDoc: !!options.addToCurrentDoc,
            mappingIdx: mappingIdx
        };

        // Reset banners
        if (bannerSelection) bannerSelection.classList.add("hidden");
        if (applyScopeRow) applyScopeRow.classList.add("hidden");
        if (exampleLabel) exampleLabel.textContent = "Giá trị ví dụ / gợi ý";
        const matchedCard = document.getElementById("editVarMatchedExistingCard");
        const matchedList = document.getElementById("editVarMatchedExistingList");
        if (matchedCard) matchedCard.classList.add("hidden");

        if (tagToEdit) {
            const cleanTag = tagToEdit.replace(/^[{]+|[}]+$/g, "");
            const v = MASTER_VARIABLES_CATALOG.find(item => item.tag === cleanTag);

            if (title) title.innerHTML = `<i class="fa-solid fa-pen-to-square text-indigo-600 mr-1.5"></i>Điều Chỉnh Biến Xạ {${cleanTag}}`;
            if (subtitle) subtitle.textContent = "Tự động rà soát trùng lặp và đồng bộ toàn hệ thống";
            if (origTagInput) origTagInput.value = cleanTag;
            if (labelInput) labelInput.value = v ? v.label : cleanTag;
            if (tagInput) tagInput.value = cleanTag;
            if (tagPreview) tagPreview.textContent = `{${cleanTag}}`;
            if (groupSelect && v && v.groupKey) groupSelect.value = v.groupKey;
            if (scopeSelect && v) scopeSelect.value = v.isGeneral ? "general" : "package";
            if (exampleInput) exampleInput.value = (v && v.example) || "";

            if (btnDelete) {
                if (v && (v.groupKey === "J" || v.isCustom)) btnDelete.classList.remove("hidden");
                else btnDelete.classList.add("hidden");
            }
        } else if (options.mode === "selection" && options.selectedText) {
            const rawSelected = options.selectedText.trim();
            if (title) title.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-emerald-600 mr-1.5"></i>Thêm Biến Mới Từ Vùng Chọn & Vào Từ Điển`;
            if (subtitle) subtitle.textContent = "Chuẩn hóa biến xạ từ Từ điển và tự động gán vào tài liệu Word";
            if (origTagInput) origTagInput.value = "";
            
            if (bannerSelection && bannerText) {
                bannerText.textContent = rawSelected;
                bannerSelection.classList.remove("hidden");
            }
            if (applyScopeRow) {
                applyScopeRow.classList.remove("hidden");
                const radioFirst = document.querySelector('input[name="editVarApplyOption"][value="selected"]');
                if (radioFirst) radioFirst.checked = true;
            }
            if (exampleLabel) exampleLabel.textContent = "Chuỗi văn bản gốc thực tế trong Word:";

            // Gợi ý và gán ngay các biến có sẵn phù hợp trong Từ điển
            if (matchedCard && matchedList) {
                const matches = findMatchingVariablesForText(rawSelected);
                if (matches && matches.length > 0) {
                    matchedList.innerHTML = matches.map((m) => `
                        <div class="p-1.5 rounded-md bg-white border border-indigo-200 hover:border-indigo-400 flex items-center justify-between gap-2 shadow-2xs">
                            <div class="flex-1 min-w-0">
                                <div class="font-bold text-slate-900 truncate text-[11px]">${escapeHtml(m.label)}</div>
                                <div class="text-[9.5px] text-slate-500 flex items-center gap-1.5">
                                    <span class="text-indigo-800 font-mono font-bold">{${m.tag}}</span>
                                    <span>•</span>
                                    <span class="text-slate-600">${escapeHtml(m.group || "")}</span>
                                    ${m.example ? `<span class="truncate max-w-[130px] text-slate-400">• Mẫu: "${escapeHtml(m.example)}"</span>` : ""}
                                </div>
                            </div>
                            <div class="flex items-center gap-1 shrink-0">
                                <button type="button" class="btn-fill-matched-var px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold cursor-pointer border border-slate-300" data-tag="${m.tag}" title="Điền thông tin biến này vào form bên dưới">
                                    <i class="fa-solid fa-pen-to-square text-[9px] mr-1"></i>Điền form
                                </button>
                                <button type="button" class="btn-quick-assign-matched-var px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[10.5px] font-bold cursor-pointer shadow-xs flex items-center gap-1" data-tag="${m.tag}" title="Gán biến này ngay lập tức vào văn bản">
                                    <i class="fa-solid fa-link text-[10px]"></i><span>Gán biến này</span>
                                </button>
                            </div>
                        </div>
                    `).join("");
                    matchedCard.classList.remove("hidden");

                    matchedList.querySelectorAll(".btn-fill-matched-var").forEach(btn => {
                        btn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const tag = btn.getAttribute("data-tag");
                            selectSuggestedVariable(tag);
                        };
                    });

                    matchedList.querySelectorAll(".btn-quick-assign-matched-var").forEach(btn => {
                        btn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const tag = btn.getAttribute("data-tag");
                            selectSuggestedVariable(tag);
                            saveVariableChanges();
                        };
                    });
                } else {
                    matchedCard.classList.add("hidden");
                }
            }

            const cleanLabel = rawSelected.length > 60 ? (rawSelected.substring(0, 57) + "...") : rawSelected;
            if (labelInput) labelInput.value = cleanLabel;

            const baseTag = slugifyToUpperSnake(cleanLabel.length > 35 ? cleanLabel.substring(0, 35) : cleanLabel);
            const isConflicted = isTagInUse(baseTag);
            let safeTag = baseTag || "BIEN_MOI";
            if (isConflicted) {
                const candidates = generateCandidateTags(baseTag);
                safeTag = candidates.length > 0 ? candidates[0] : `${baseTag}_1`;
            }
            if (tagInput) tagInput.value = safeTag;
            if (tagPreview) tagPreview.textContent = `{${safeTag}}`;

            let detectedGroup = "B";
            if (/căn cứ|quyết định|nghị định|thông tư|luật/i.test(rawSelected)) detectedGroup = "I";
            else if (/ngày\s+\d+|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/i.test(rawSelected)) detectedGroup = "F";
            else if (/đồng|vnđ|vnd|triệu|tỷ|\d{1,3}(?:\.\d{3}){2,}/i.test(rawSelected)) detectedGroup = "C";
            else if (/nhà thầu|công ty|doanh nghiệp|chi nhánh/i.test(rawSelected)) detectedGroup = "D";
            else if (/ban quản lý|chủ đầu tư|cảng hàng không|tổng công ty|phòng/i.test(rawSelected)) detectedGroup = "A";
            else if (/số:?\s*[\d\w\/\-]+/i.test(rawSelected)) detectedGroup = "E";

            if (groupSelect) groupSelect.value = detectedGroup;
            if (scopeSelect) scopeSelect.value = (detectedGroup === "A" || detectedGroup === "I") ? "general" : "package";
            if (exampleInput) exampleInput.value = rawSelected;
            if (btnDelete) btnDelete.classList.add("hidden");
        } else if (options.mode === "add_to_doc") {
            if (title) title.innerHTML = `<i class="fa-solid fa-square-plus text-emerald-600 mr-1.5"></i>Thêm Biến Mới Vào Văn Bản & Từ Điển`;
            if (subtitle) subtitle.textContent = "Tạo biến mới trong Từ điển và đưa vào danh sách biến của văn bản này";
            if (origTagInput) origTagInput.value = "";
            if (labelInput) labelInput.value = "";
            if (tagInput) tagInput.value = "";
            if (tagPreview) tagPreview.textContent = "{TAG}";
            if (groupSelect) groupSelect.value = "B";
            if (scopeSelect) scopeSelect.value = "package";
            if (exampleInput) exampleInput.value = "";
            if (exampleLabel) exampleLabel.textContent = "Chuỗi văn bản gốc cần thay thế (nếu có):";
            if (btnDelete) btnDelete.classList.add("hidden");
        } else {
            if (title) title.innerHTML = `<i class="fa-solid fa-pen-ruler text-indigo-600 mr-1.5"></i>Thêm Biến Xạ Mới Vào Từ Điển Chuẩn`;
            if (subtitle) subtitle.textContent = "Tự động rà soát trùng lặp và đồng bộ toàn hệ thống";
            if (origTagInput) origTagInput.value = "";
            if (labelInput) labelInput.value = "";
            if (tagInput) tagInput.value = "";
            if (tagPreview) tagPreview.textContent = "{TAG}";
            if (groupSelect) groupSelect.value = "A";
            if (scopeSelect) scopeSelect.value = "general";
            if (exampleInput) exampleInput.value = "";
            if (btnDelete) btnDelete.classList.add("hidden");
        }

        updateLabelMatchedBadge(labelInput ? labelInput.value : "");
        document.getElementById("editVarLabelSuggestionsDropdown")?.classList.add("hidden");

        validateVariableInputs();
        modal.classList.remove("hidden");
        setTimeout(() => {
            labelInput?.focus();
        }, 100);
    }

    function closeEditVariableModal() {
        const modal = document.getElementById("modalEditVariable");
        if (modal) modal.classList.add("hidden");
        document.getElementById("editVarLabelSuggestionsDropdown")?.classList.add("hidden");
        document.getElementById("editVarLabelMatchedBadge")?.classList.add("hidden");
        document.getElementById("editVarMatchedExistingCard")?.classList.add("hidden");
        activeEditingMappingIdx = null;
        currentEditVarContext = null;
    }
    window.closeEditVariableModal = closeEditVariableModal;
    window.openEditVariableModal = openEditVariableModal;

    // -------------------------------------------------------------
    // Tìm kiếm Tiếng Việt không dấu & Autocomplete Dropdown cho Từ điển
    // -------------------------------------------------------------
    let selectedSuggestionIndex = -1;

    function removeVietnameseTones(str) {
        if (!str) return "";
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str.trim();
    }

    function expandTextAbbreviations(str) {
        if (!str) return "";
        let s = " " + str + " ";
        s = s.replace(/\bhk\b/gi, "hang khong");
        s = s.replace(/\bbql\b/gi, "ban quan ly");
        s = s.replace(/\bblda\b/gi, "ban quan ly du an");
        s = s.replace(/\bcdt\b/gi, "chu dau tu");
        s = s.replace(/\btckh\b|\btc-kh\b/gi, "tai chinh ke hoach");
        s = s.replace(/\bqd\b/gi, "quyet dinh");
        s = s.replace(/\bnd\b/gi, "nghi dinh");
        s = s.replace(/\btt\b/gi, "to trinh");
        s = s.replace(/\bbc\b/gi, "bao cao");
        s = s.replace(/\bms\b/gi, "mua sam");
        s = s.replace(/\bhd\b/gi, "hop dong");
        return s.trim();
    }

    function findMatchingVariablesForText(text) {
        if (!text || !Array.isArray(MASTER_VARIABLES_CATALOG)) return [];
        const raw = text.trim();
        if (!raw) return [];

        const norm = removeVietnameseTones(raw.toLowerCase());
        const expNorm = expandTextAbbreviations(norm);
        const candidates = [];

        MASTER_VARIABLES_CATALOG.forEach(v => {
            let score = 0;
            const vLabelNorm = removeVietnameseTones((v.label || "").toLowerCase());
            const vTag = (v.tag || "").toUpperCase();
            const vExampleNorm = removeVietnameseTones((v.example || "").toLowerCase());

            // 1. Khớp chính xác hoặc chứa chuỗi ví dụ mẫu trong từ điển
            if (vExampleNorm) {
                if (vExampleNorm === norm || vExampleNorm === expNorm) score += 110;
                else if (vExampleNorm.includes(norm) || norm.includes(vExampleNorm)) score += 85;
                else if (vExampleNorm.includes(expNorm) || expNorm.includes(vExampleNorm)) score += 95;
            }

            // 2. Khớp nhãn tiếng Việt
            if (vLabelNorm === norm || vLabelNorm === expNorm) score += 105;
            else if (norm.includes(vLabelNorm) || vLabelNorm.includes(norm) || expNorm.includes(vLabelNorm) || vLabelNorm.includes(expNorm)) score += 70;

            // 3. Khớp theo từ khóa đặc thù
            if (/cang|tong cong ty|chu dau tu|blda|ban quan ly|hang khong/i.test(expNorm)) {
                if (vTag.includes("CHU_DAU_TU") || vTag.includes("BAN_QUAN_LY")) score += 60;
            }
            if (/phong|ban tc|ke hoach|ky thuat|tai chinh/i.test(expNorm)) {
                if (vTag.includes("PHONG") || vTag.includes("CO_QUAN_TRINH")) score += 60;
            }
            if (/so:?\s*[\d\w\/\-]+/i.test(norm) || /bcms|hdtd|to trinh|bao cao/i.test(expNorm)) {
                if (vTag.includes("SO_BAO_CAO") || vTag.includes("SO_TO_TRINH") || vTag.includes("SO_QUYET_DINH")) score += 55;
            }
            if (/ngay\s+\d+|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/i.test(norm)) {
                if (vTag.includes("NGAY")) score += 60;
            }
            if (/can cu|quyet dinh|nghi dinh|luat/i.test(expNorm)) {
                if (vTag.includes("QUYET_DINH") || vTag.includes("CAN_CU")) score += 55;
            }
            if (/hang muc|thue|sua chua|mua sam|xay lap|goi thau/i.test(expNorm)) {
                if (vTag === "TEN_GOI_THAU" || vTag === "TEN_DU_AN") score += 50;
            }

            // 4. Khớp tổ hợp từ
            const tokens = Array.from(new Set([...norm.split(/\s+/), ...expNorm.split(/\s+/)]))
                .filter(t => t.length > 1 && !/^(va|la|cua|ve|theo|tai|cho)$/.test(t));
            if (tokens.length > 0) {
                const matchTokens = tokens.filter(t => vLabelNorm.includes(t) || vExampleNorm.includes(t));
                if (matchTokens.length >= 2) {
                    score += (matchTokens.length / tokens.length) * 50;
                }
            }

            if (score >= 45) {
                candidates.push({ item: v, score });
            }
        });

        candidates.sort((a, b) => b.score - a.score);
        return candidates.map(c => c.item).slice(0, 3);
    }
    window.findMatchingVariablesForText = findMatchingVariablesForText;

    function searchCatalogVariables(query = "") {
        if (!Array.isArray(MASTER_VARIABLES_CATALOG) || MASTER_VARIABLES_CATALOG.length === 0) return [];
        const qRaw = (query || "").trim();
        if (!qRaw) {
            return MASTER_VARIABLES_CATALOG.slice(0, 30);
        }

        const qNorm = removeVietnameseTones(qRaw.toLowerCase());
        const qUpper = qRaw.toUpperCase();
        const tokens = qNorm.split(/\s+/).filter(Boolean);

        const scored = [];
        MASTER_VARIABLES_CATALOG.forEach(v => {
            const label = v.label || "";
            const tag = v.tag || "";
            const labelNorm = removeVietnameseTones(label.toLowerCase());
            const tagLower = tag.toLowerCase();

            let score = 0;
            if (labelNorm === qNorm) score += 100;
            if (tag === qUpper) score += 100;
            if (labelNorm.startsWith(qNorm)) score += 50;
            if (tagLower.startsWith(qNorm)) score += 40;
            if (labelNorm.includes(qNorm)) score += 30;
            if (tagLower.includes(qNorm)) score += 20;

            const allTokensMatch = tokens.length > 0 && tokens.every(tok => labelNorm.includes(tok) || tagLower.includes(tok));
            if (allTokensMatch) score += 25;

            if (score > 0) {
                scored.push({ item: v, score });
            }
        });

        scored.sort((a, b) => b.score - a.score);
        return scored.map(s => s.item).slice(0, 25);
    }

    function renderLabelSuggestions(query = "") {
        const dropdown = document.getElementById("editVarLabelSuggestionsDropdown");
        const list = document.getElementById("editVarLabelSuggestionsList");
        const countBadge = document.getElementById("lblSuggestionsCount");
        if (!dropdown || !list) return;

        const results = searchCatalogVariables(query);
        selectedSuggestionIndex = -1;

        if (countBadge) countBadge.textContent = `${results.length} biến`;

        let html = "";
        if (results.length === 0) {
            html += `
                <div class="p-2.5 text-center text-slate-500 text-[11px]">
                    <i class="fa-solid fa-circle-info text-amber-500 mr-1"></i>
                    Không có biến nào khớp từ khóa "<b>${escapeHtml(query)}</b>"
                </div>
            `;
        } else {
            results.forEach((v, idx) => {
                const groupShort = (v.group || "A").substring(0, 16);
                html += `
                    <div class="label-suggestion-item p-2 rounded hover:bg-emerald-50 cursor-pointer transition-colors border border-transparent hover:border-emerald-200 flex items-center justify-between gap-2" data-tag="${v.tag}" data-idx="${idx}">
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-slate-900 truncate text-[11px]">${escapeHtml(v.label)}</div>
                            <div class="text-[9.5px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span class="text-amber-800 bg-amber-100/70 px-1 rounded font-medium">${escapeHtml(groupShort)}</span>
                                <span>•</span>
                                <span>${v.isGeneral ? "Tầng 1 (Chung)" : "Tầng 2 (Gói)"}</span>
                                ${v.example ? `<span class="truncate max-w-[120px] text-slate-400">• VD: ${escapeHtml(v.example)}</span>` : ""}
                            </div>
                        </div>
                        <span class="font-mono font-bold text-[10.5px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                            {${v.tag}}
                        </span>
                    </div>
                `;
            });
        }

        const qUpper = query.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
        const exactMatch = results.some(v => v.label.toLowerCase() === query.trim().toLowerCase() || v.tag === qUpper);
        if (query.trim() && !exactMatch) {
            html += `
                <div id="itemCreateNewVarFromQuery" class="p-2 mt-1 rounded bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-900 cursor-pointer border border-indigo-200 flex items-center justify-between gap-2 transition-colors">
                    <div class="flex items-center gap-1.5 text-[11px] font-bold">
                        <i class="fa-solid fa-plus-circle text-indigo-600"></i>
                        <span>Tạo biến mới: "<b>${escapeHtml(query.trim())}</b>"</span>
                    </div>
                    <span class="text-[10px] text-indigo-700 font-mono font-semibold">
                        [Bấm để tạo mới]
                    </span>
                </div>
            `;
        }

        list.innerHTML = html;
        dropdown.classList.remove("hidden");

        list.querySelectorAll(".label-suggestion-item").forEach(el => {
            el.addEventListener("mousedown", (e) => {
                e.preventDefault();
                const tag = el.getAttribute("data-tag");
                selectSuggestedVariable(tag);
            });
        });

        const btnCreateNew = list.querySelector("#itemCreateNewVarFromQuery");
        if (btnCreateNew) {
            btnCreateNew.addEventListener("mousedown", (e) => {
                e.preventDefault();
                dropdown.classList.add("hidden");
                autoSuggestTagFromLabel();
                validateVariableInputs();
            });
        }
    }

    function selectSuggestedVariable(tag) {
        if (!tag) return;
        const v = MASTER_VARIABLES_CATALOG.find(item => item.tag === tag);
        if (!v) return;

        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const tagPreview = document.getElementById("editVarTagPreview");
        const groupSelect = document.getElementById("editVarGroupSelect");
        const scopeSelect = document.getElementById("editVarScopeSelect");
        const exampleInput = document.getElementById("editVarExampleInput");
        const matchedBadge = document.getElementById("editVarLabelMatchedBadge");
        const dropdown = document.getElementById("editVarLabelSuggestionsDropdown");

        if (labelInput) labelInput.value = v.label;
        if (tagInput) tagInput.value = v.tag;
        if (tagPreview) tagPreview.textContent = `{${v.tag}}`;
        if (groupSelect && v.groupKey) groupSelect.value = v.groupKey;
        if (scopeSelect) scopeSelect.value = v.isGeneral ? "general" : "package";
        if (exampleInput && !exampleInput.value) exampleInput.value = v.example || "";

        if (matchedBadge) {
            matchedBadge.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i><span>Khớp: {${v.tag}}</span>`;
            matchedBadge.classList.remove("hidden");
        }

        if (dropdown) dropdown.classList.add("hidden");

        validateVariableInputs();
        if (typeof showToast === "function") {
            showToast(`Đã chọn biến Từ điển: "${v.label}" {${v.tag}}`, "success");
        }
    }

    function updateLabelMatchedBadge(currentLabel = "") {
        const matchedBadge = document.getElementById("editVarLabelMatchedBadge");
        if (!matchedBadge) return;
        const trimmed = (currentLabel || "").trim();
        if (!trimmed) {
            matchedBadge.classList.add("hidden");
            return;
        }

        const exact = MASTER_VARIABLES_CATALOG.find(v => v.label.toLowerCase() === trimmed.toLowerCase());
        if (exact) {
            matchedBadge.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i><span>Khớp: {${exact.tag}}</span>`;
            matchedBadge.classList.remove("hidden");
        } else {
            matchedBadge.classList.add("hidden");
        }
    }

    function updateSuggestionHighlight(items) {
        items.forEach((item, idx) => {
            if (idx === selectedSuggestionIndex) {
                item.classList.add("bg-emerald-100", "border-emerald-300");
                item.scrollIntoView({ block: "nearest" });
            } else {
                item.classList.remove("bg-emerald-100", "border-emerald-300");
            }
        });
    }

    function slugifyToUpperSnake(str) {
        if (!str) return "";
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "D")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");
    }

    function isTagInUse(tag, origTag = "") {
        if (!tag) return null;
        const cleanTag = tag.trim().toUpperCase();
        const origClean = (origTag || "").trim().toUpperCase();
        if (cleanTag === origClean) return null;

        if (typeof MASTER_VARIABLES_CATALOG !== "undefined" && Array.isArray(MASTER_VARIABLES_CATALOG)) {
            const found = MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === cleanTag);
            if (found) return found;
        }
        if (typeof appState !== "undefined" && appState?.customVariables) {
            for (const k in appState.customVariables) {
                if (k.toUpperCase() === cleanTag) {
                    return {
                        tag: k,
                        label: appState.customVariables[k].label || k,
                        group: "J. Tùy biến bổ sung"
                    };
                }
            }
        }
        return null;
    }

    function generateCandidateTags(baseTag, origTag = "") {
        if (!baseTag) return [];
        const cleanBase = slugifyToUpperSnake(baseTag);
        if (!cleanBase) return [];

        const suffixes = ["_TO_TRINH", "_DA", "_GOI_THAU", "_BQL", "_MOI", "_1", "_2", "_3"];
        const candidates = [];

        for (const suf of suffixes) {
            const candidate = `${cleanBase}${suf}`;
            if (!isTagInUse(candidate, origTag) && !candidates.includes(candidate)) {
                candidates.push(candidate);
                if (candidates.length >= 4) break;
            }
        }

        if (candidates.length === 0) {
            for (let i = 1; i <= 10; i++) {
                const candidate = `${cleanBase}_${i}`;
                if (!isTagInUse(candidate, origTag) && !candidates.includes(candidate)) {
                    candidates.push(candidate);
                    if (candidates.length >= 3) break;
                }
            }
        }
        return candidates;
    }

    function autoSuggestTagFromLabel() {
        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const origTag = (document.getElementById("editVarOriginalTag")?.value || "").trim().toUpperCase();

        if (!labelInput || !tagInput) return;
        const label = labelInput.value.trim();
        if (!label) {
            if (typeof showToast === "function") {
                showToast("Vui lòng nhập Tên trường dữ liệu trước để gợi ý mã TAG!", "warning");
            } else {
                alert("Vui lòng nhập Tên trường dữ liệu trước để gợi ý mã TAG!");
            }
            labelInput.focus();
            return;
        }

        const baseTag = slugifyToUpperSnake(label);
        if (!baseTag) {
            if (typeof showToast === "function") {
                showToast("Tên trường dữ liệu không hợp lệ để tạo mã TAG!", "error");
            }
            return;
        }

        const conflictingVar = isTagInUse(baseTag, origTag);
        if (!conflictingVar) {
            tagInput.value = baseTag;
            validateVariableInputs();
            if (typeof showToast === "function") {
                showToast(`Đã tự động tạo mã TAG: {${baseTag}}`, "success");
            }
        } else {
            const candidates = generateCandidateTags(baseTag, origTag);
            const safeTag = candidates.length > 0 ? candidates[0] : `${baseTag}_1`;
            tagInput.value = safeTag;
            validateVariableInputs();
            if (typeof showToast === "function") {
                showToast(`Mã {${baseTag}} đã trùng với "${conflictingVar.label}". Đã tự động đề xuất mã an toàn: {${safeTag}}!`, "warning");
            }
        }
    }

    let isTagInputComposing = false;

    function validateVariableInputs() {
        const origTag = (document.getElementById("editVarOriginalTag")?.value || "").trim().toUpperCase();
        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const tagPreview = document.getElementById("editVarTagPreview");
        const tagFeedback = document.getElementById("editVarTagFeedback");
        const labelFeedback = document.getElementById("editVarLabelFeedback");
        const btnSave = document.getElementById("btnSaveEditVar");

        if (!tagInput || !labelInput || !btnSave) return;
        updateLabelMatchedBadge(labelInput.value);

        if (!tagInput.dataset.hasImeListener) {
            tagInput.dataset.hasImeListener = "true";
            tagInput.addEventListener("compositionstart", () => { isTagInputComposing = true; });
            tagInput.addEventListener("compositionend", () => {
                isTagInputComposing = false;
                tagInput.value = slugifyToUpperSnake(tagInput.value);
                validateVariableInputs();
            });
            tagInput.addEventListener("blur", () => {
                tagInput.value = slugifyToUpperSnake(tagInput.value);
                validateVariableInputs();
            });
        }

        if (isTagInputComposing) return;

        let rawTag = tagInput.value;
        let cleanTag = slugifyToUpperSnake(rawTag);
        if (document.activeElement !== tagInput) {
            tagInput.value = cleanTag;
        }

        if (tagPreview) tagPreview.textContent = cleanTag ? `{${cleanTag}}` : "{TAG}";

        const label = labelInput.value.trim();
        let isTagValid = false;
        let isDuplicate = false;
        let conflictingVar = null;

        if (!cleanTag) {
            if (tagFeedback) {
                tagFeedback.className = "mt-1 p-1.5 rounded text-[10.5px] bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1.5";
                tagFeedback.innerHTML = `<i class="fa-solid fa-circle-info text-slate-500"></i><span>Vui lòng nhập mã thẻ (viết HOA không dấu, ví dụ: <code>CHUC_VU_TRUONG_BAN</code>).</span>`;
                tagFeedback.classList.remove("hidden");
            }
            tagInput.className = "w-full pl-6 pr-6 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-mono font-bold uppercase focus:bg-white focus:ring-1 focus:ring-emerald-500";
        } else {
            conflictingVar = isTagInUse(cleanTag, origTag);
            const isReusingExistingVarInDoc = conflictingVar && currentEditVarContext && (currentEditVarContext.mode === "selection" || currentEditVarContext.mode === "add_to_doc");

            if (conflictingVar && isReusingExistingVarInDoc) {
                // Tái sử dụng biến có sẵn trong Từ điển cho văn bản (rất khuyến khích để tránh trùng lặp)
                isTagValid = true;
                isDuplicate = false;
                if (tagFeedback) {
                    tagFeedback.className = "mt-1 p-2 rounded text-[11px] bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-start gap-2 shadow-2xs";
                    tagFeedback.innerHTML = `
                        <i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 shrink-0 text-sm"></i>
                        <div class="flex-1">
                            <div><b>✅ Sử dụng biến có sẵn trong Từ điển:</b> Mã <code>{${cleanTag}}</code> (<em>"${conflictingVar.label}"</em>) sẽ được gán vào vị trí văn bản này.</div>
                            <div class="text-[10px] text-emerald-800 mt-0.5">Biến này thuộc ${conflictingVar.group || "Từ điển"} và sẽ tự động đồng bộ dữ liệu chuẩn toàn hệ thống.</div>
                        </div>
                    `;
                    tagFeedback.classList.remove("hidden");
                }
                tagInput.className = "w-full pl-6 pr-6 py-1.5 bg-emerald-50/50 border border-emerald-400 rounded text-xs text-emerald-950 font-mono font-bold uppercase focus:bg-white focus:ring-1 focus:ring-emerald-500";
            } else if (conflictingVar) {
                isDuplicate = true;
                const candidates = generateCandidateTags(cleanTag, origTag);
                const sampleName = label || "Phòng triển khai";
                if (tagFeedback) {
                    tagFeedback.className = "mt-1.5 p-2 rounded text-[11px] bg-rose-50 text-rose-900 border border-rose-300 flex items-start gap-2 shadow-xs";
                    tagFeedback.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation text-rose-600 mt-0.5 shrink-0 text-sm"></i>
                        <div class="flex-1 space-y-1.5">
                            <div>
                                <b>❌ TRÙNG LẶP MÃ THẺ!</b> Mã <code>{${cleanTag}}</code> đã được dùng cho biến: <b>"${conflictingVar.label}"</b> (${conflictingVar.group}).
                            </div>
                            <div class="text-[10px] text-amber-900 bg-amber-50/80 p-1.5 rounded border border-amber-200 leading-normal">
                                <span class="font-bold"><i class="fa-solid fa-lightbulb text-amber-600"></i> Đề xuất cho Admin:</span> Điều chỉnh lại tên biến mới có thêm ngữ cảnh (Ví dụ: <em>"${sampleName} tờ trình"</em> ➔ mã <code>{${cleanTag}_TO_TRINH}</code> hoặc <em>"${sampleName} dự án"</em>) để tránh trùng lặp và tránh ghi đè dữ liệu sai lệch giữa các văn bản.
                            </div>
                            ${candidates.length > 0 ? `
                            <div class="pt-0.5">
                                <div class="text-[10px] text-slate-700 font-semibold mb-1">Gợi ý mã thẻ an toàn (bấm để chọn nhanh):</div>
                                <div class="flex flex-wrap gap-1.5">
                                    ${candidates.map(c => `
                                        <button type="button" class="btn-choose-suggest-tag px-2 py-0.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 hover:border-emerald-500 rounded font-mono text-[10.5px] font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1" data-tag="${c}">
                                            <i class="fa-solid fa-plus text-[9px] text-emerald-600"></i><span>{${c}}</span>
                                        </button>
                                    `).join("")}
                                </div>
                            </div>
                            ` : ""}
                        </div>
                    `;
                    tagFeedback.classList.remove("hidden");

                    tagFeedback.querySelectorAll(".btn-choose-suggest-tag").forEach(btn => {
                        btn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const chosenTag = btn.getAttribute("data-tag");
                            if (chosenTag) {
                                tagInput.value = chosenTag;
                                validateVariableInputs();
                                tagInput.focus();
                            }
                        };
                    });
                }
                tagInput.className = "w-full pl-6 pr-6 py-1.5 bg-rose-50 border-2 border-rose-500 rounded text-xs text-rose-900 font-mono font-bold uppercase focus:bg-white focus:ring-2 focus:ring-rose-500";
            } else {
                isTagValid = true;
                if (tagFeedback) {
                    tagFeedback.className = "mt-1 p-1.5 rounded text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5";
                    tagFeedback.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i><span><b>✅ Mã thẻ hợp lệ!</b> Mã <code>{${cleanTag}}</code> là duy nhất và chưa từng bị trùng lặp.</span>`;
                    tagFeedback.classList.remove("hidden");
                }
                tagInput.className = "w-full pl-6 pr-6 py-1.5 bg-emerald-50/50 border border-emerald-400 rounded text-xs text-emerald-950 font-mono font-bold uppercase focus:bg-white focus:ring-1 focus:ring-emerald-500";
            }
        }

        let isLabelValid = label.length > 0;
        if (labelFeedback) {
            if (label.length === 0) {
                labelFeedback.textContent = "Tên trường dữ liệu không được để trống.";
                labelFeedback.className = "text-[10px] mt-0.5 text-rose-600";
                labelFeedback.classList.remove("hidden");
            } else {
                const dupLabelVar = MASTER_VARIABLES_CATALOG.find(v => v.label.toLowerCase() === label.toLowerCase() && v.tag.toUpperCase() !== origTag);
                if (dupLabelVar) {
                    if (dupLabelVar.tag.toUpperCase() === cleanTag) {
                        labelFeedback.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i> Khớp chuẩn với Từ điển hệ thống: <code>{${dupLabelVar.tag}}</code> (${dupLabelVar.group || "Chung"}).`;
                        labelFeedback.className = "text-[10px] mt-0.5 text-emerald-700 font-medium";
                        labelFeedback.classList.remove("hidden");
                    } else {
                        labelFeedback.innerHTML = `<i class="fa-solid fa-circle-info text-amber-500"></i> Lưu ý: Tên "${label}" đã có biến <code>{${dupLabelVar.tag}}</code> (${dupLabelVar.group}).`;
                        labelFeedback.className = "text-[10px] mt-0.5 text-amber-700 font-medium";
                        labelFeedback.classList.remove("hidden");
                    }
                } else {
                    labelFeedback.classList.add("hidden");
                }
            }
        }

        const btnSaveIcon = document.getElementById("btnSaveEditVarIcon");
        const btnSaveText = document.getElementById("btnSaveEditVarText");

        const isSelectionMode = currentEditVarContext && (currentEditVarContext.mode === "selection" || currentEditVarContext.mode === "add_to_doc");
        const isExistingInDict = !!(MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === cleanTag) || (typeof appState !== "undefined" && appState?.customVariables && appState.customVariables[cleanTag]));

        if (isSelectionMode && isExistingInDict) {
            // Gán biến có sẵn trong từ điển vào văn bản
            if (btnSaveText) btnSaveText.textContent = `Gán biến có sẵn {${cleanTag}}`;
            if (btnSaveIcon) btnSaveIcon.className = "fa-solid fa-link";
            btnSave.className = "px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all";
        } else if (isSelectionMode) {
            // Tạo biến mới và gán vào văn bản
            if (btnSaveText) btnSaveText.textContent = "Tạo biến mới & Gán vào Word";
            if (btnSaveIcon) btnSaveIcon.className = "fa-solid fa-circle-plus";
            btnSave.className = "px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all";
        } else {
            // Chế độ Quản trị Từ điển
            if (origTag) {
                if (btnSaveText) btnSaveText.textContent = "Cập nhật biến Từ điển";
                if (btnSaveIcon) btnSaveIcon.className = "fa-solid fa-floppy-disk";
            } else {
                if (btnSaveText) btnSaveText.textContent = "Thêm biến mới vào Từ điển";
                if (btnSaveIcon) btnSaveIcon.className = "fa-solid fa-circle-plus";
            }
            btnSave.className = "px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all";
        }

        btnSave.disabled = !isTagValid || isDuplicate || !isLabelValid;
    }

    function saveVariableChanges() {
        const origTag = (document.getElementById("editVarOriginalTag")?.value || "").trim().toUpperCase();
        const label = (document.getElementById("editVarLabelInput")?.value || "").trim();
        const newTag = (document.getElementById("editVarTagInput")?.value || "").trim().toUpperCase();
        const groupKey = document.getElementById("editVarGroupSelect")?.value || "A";
        const isGeneral = document.getElementById("editVarScopeSelect")?.value === "general";
        const example = (document.getElementById("editVarExampleInput")?.value || "").trim();

        const groupNames = {
            "A": "A. Chủ đầu tư",
            "B": "B. Dự án & Gói",
            "C": "C. Tài chính",
            "D": "D. Nhà thầu",
            "E": "E. Số hiệu VB",
            "F": "F. Ngày (ngắn)",
            "G": "G. Ngày (Full)",
            "H": "H. Tên trích dẫn",
            "I": "I. Căn cứ pháp lý",
            "J": "J. Tùy biến bổ sung"
        };
        const groupName = groupNames[groupKey] || "A. Chủ đầu tư";

        if (!newTag || !label) {
            showToast("Vui lòng điền đầy đủ Tên biến và Mã thẻ {TAG}!", "error");
            return;
        }

        // 1. Lưu hoặc cập nhật vào Từ điển MASTER_VARIABLES_CATALOG
        if (origTag) {
            const existing = MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === origTag);
            if (existing) {
                existing.label = label;
                existing.tag = newTag;
                existing.group = groupName;
                existing.groupKey = groupKey;
                existing.isGeneral = isGeneral;
                existing.example = example;
            }
        } else {
            const existing = MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === newTag);
            if (existing) {
                existing.label = label;
                existing.group = groupName;
                existing.groupKey = groupKey;
                existing.isGeneral = isGeneral;
                existing.example = example;
            } else {
                const newStt = MASTER_VARIABLES_CATALOG.length + 1;
                MASTER_VARIABLES_CATALOG.push({
                    stt: newStt,
                    groupKey: groupKey,
                    group: groupName,
                    label: label,
                    tag: newTag,
                    isGeneral: isGeneral,
                    example: example,
                    isCustom: true
                });
            }
        }

        // Đồng bộ vào ho_so_tu_dong_state_v3 để Trang Tạo Hồ Sơ cũng nhận diện được biến mới ngay
        try {
            const rawState = localStorage.getItem("ho_so_tu_dong_state_v3");
            if (rawState) {
                const appSt = JSON.parse(rawState);
                appSt.customVariables = appSt.customVariables || {};
                appSt.customVariables[newTag] = {
                    tag: newTag,
                    label: label,
                    group: groupName,
                    groupKey: groupKey,
                    isGeneral: isGeneral,
                    example: example,
                    isCustom: true
                };
                localStorage.setItem("ho_so_tu_dong_state_v3", JSON.stringify(appSt));
            }
        } catch (e) {
            console.warn("Could not sync custom variable to ho_so_tu_dong_state_v3:", e);
        }

        // 2. Xử lý ngữ cảnh gọi modal
        const ctx = currentEditVarContext || {};
        const item = state.batchFiles[state.activeDocId];

        if (ctx.mode === "selection" && ctx.selectedText) {
            if (typeof pushUndoState === "function") {
                pushUndoState(`Tạo & gán biến {${newTag}} từ vùng chọn`);
            }

            const isExistingTag = !!(MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === newTag) || (typeof appState !== "undefined" && appState?.customVariables && appState.customVariables[newTag]));
            const applyOption = document.querySelector('input[name="editVarApplyOption"]:checked')?.value || "selected";
            const isTable = newTag.startsWith("BANG_");

            if (applyOption === "all") {
                let replaceCount = 0;
                if (documentContentDisplay) {
                    replaceCount = replaceTextWithBadgeAcrossNodes(documentContentDisplay, ctx.selectedText, newTag, isTable);
                }
                if (item) {
                    item.mappings = item.mappings || [];
                    const existingMap = item.mappings.find(m => m.tag === newTag);
                    if (existingMap) {
                        existingMap.originalText = ctx.selectedText;
                        existingMap.count = (existingMap.count || 0) + (replaceCount || 1);
                    } else {
                        item.mappings.push({
                            tag: newTag,
                            originalText: ctx.selectedText,
                            tier: isGeneral ? 1 : 2,
                            reason: isExistingTag ? "Gán từ Từ điển (Tất cả vị trí)" : "Tạo mới (Tất cả vị trí)",
                            count: replaceCount || 1
                        });
                    }
                }
                showToast(isExistingTag ? `Đã gán biến có sẵn {${newTag}} cho ${replaceCount || 1} vị trí trong văn bản!` : `Đã tạo biến {${newTag}} và thay thế ${replaceCount || 1} vị trí trong văn bản!`, "success");
            } else {
                let inserted = false;
                let targetRange = null;
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0 && documentContentDisplay && documentContentDisplay.contains(sel.anchorNode)) {
                    targetRange = sel.getRangeAt(0);
                } else if (ctx.savedRange) {
                    targetRange = ctx.savedRange;
                }

                if (targetRange) {
                    const badge = document.createElement("span");
                    badge.className = isTable ? "tag-table-badge" : "tag-badge";
                    badge.setAttribute("data-tag", newTag);
                    badge.setAttribute("contenteditable", "false");
                    badge.innerHTML = `{${newTag}}<span class="btn-remove-tag" data-tag="${newTag}" title="Xóa biến này" contenteditable="false">×</span>`;

                    try {
                        targetRange.deleteContents();
                        targetRange.insertNode(badge);
                        const spacer = document.createTextNode(" ");
                        targetRange.setStartAfter(badge);
                        targetRange.insertNode(spacer);
                        targetRange.setStartAfter(spacer);
                        targetRange.collapse(true);
                        savedCursorRange = targetRange.cloneRange();
                        inserted = true;
                    } catch (e) {
                        console.warn("Could not insert badge via Range, falling back to text replacer:", e);
                    }
                }

                // BẢO ĐẢM 100%: Nếu targetRange bị null hoặc chèn không thành công:
                if (!inserted && documentContentDisplay && ctx.selectedText) {
                    const repCount = replaceTextWithBadgeAcrossNodes(documentContentDisplay, ctx.selectedText, newTag, isTable, true);
                    if (repCount > 0) inserted = true;
                }

                if (item) {
                    item.mappings = item.mappings || [];
                    const existingMap = item.mappings.find(m => m.tag === newTag);
                    if (existingMap) {
                        existingMap.originalText = ctx.selectedText;
                        existingMap.count = (existingMap.count || 0) + 1;
                    } else {
                        item.mappings.push({
                            tag: newTag,
                            originalText: ctx.selectedText,
                            tier: isGeneral ? 1 : 2,
                            reason: isExistingTag ? "Gán từ Từ điển (Vùng chọn)" : "Tạo mới (Vùng chọn)",
                            count: 1
                        });
                    }
                }
                showToast(isExistingTag ? `Đã gán biến có sẵn {${newTag}} vào văn bản!` : `Đã tạo biến Từ điển {${newTag}} và gán vào văn bản!`, "success");
            }

            if (state.activeDocId && studioViewMode === "edit") {
                workingDraftHtml[state.activeDocId] = cleanCanvasHtmlForStorage();
            }
            const selMenu = document.getElementById("selectionMenu");
            if (selMenu) selMenu.classList.add("hidden");

        } else if (ctx.mode === "add_to_doc" && item) {
            item.mappings = item.mappings || [];
            item.mappings.push({
                tag: newTag,
                originalText: example || label,
                tier: isGeneral ? 1 : 2,
                reason: "Thêm từ Từ điển",
                count: 1
            });
            showToast(`Đã thêm biến {${newTag}} vào Từ điển và danh sách biến của văn bản!`, "success");
        } else if (activeEditingMappingIdx !== null && item && item.mappings && item.mappings[activeEditingMappingIdx]) {
            item.mappings[activeEditingMappingIdx].tag = newTag;
            showToast(`Đã cập nhật biến {${newTag}}!`, "success");
        } else {
            showToast(`Đã lưu biến "${label}" với mã thẻ {${newTag}} vào Từ điển chuẩn!`, "success");
        }

        saveCatalogCustomizations();

        if (item) {
            renderSingleMappingRows(item);
            renderBatchTable();
            renderContextualRecommendedVars();
        }

        if (typeof renderPaletteTextVars === "function") renderPaletteTextVars();
        if (typeof renderStudioVarsTable === "function") renderStudioVarsTable();
        if (typeof updateStudioDictBadgeCounts === "function") updateStudioDictBadgeCounts();

        document.getElementById("modalEditVariable")?.classList.add("hidden");
        activeEditingMappingIdx = null;
        currentEditVarContext = null;
    }

    const LS_VARS_CUSTOMIZATIONS_TS = "ho_so_vars_catalog_customizations_ts";

    function saveCatalogCustomizations() {
        try {
            const customizations = MASTER_VARIABLES_CATALOG.map((v, i) => ({
                stt: i + 1,
                groupKey: v.groupKey,
                group: v.group,
                label: v.label,
                tag: v.tag,
                isGeneral: v.isGeneral,
                example: v.example,
                isCustom: !!v.isCustom
            }));
            const ts = Date.now().toString();
            localStorage.setItem(LS_VARS_CUSTOMIZATIONS, JSON.stringify(customizations));
            localStorage.setItem(LS_VARS_CUSTOMIZATIONS_TS, ts);

            window.dispatchEvent(new Event("storage"));

            if (typeof BroadcastChannel !== "undefined") {
                try {
                    const bc = new BroadcastChannel("ho_so_catalog_channel");
                    bc.postMessage({ type: "CATALOG_UPDATED", ts: ts });
                    bc.close();
                } catch(e) {}
            }

            // Tự động đồng bộ lên Google Sheets Cloud
            if (typeof triggerStudioAutoPushToGSheet === "function") {
                triggerStudioAutoPushToGSheet();
            }
        } catch (e) {
            console.warn("Could not save catalog customizations:", e);
        }
    }

    function resetCatalogToDefault() {
        showToast("Chức năng khôi phục mặc định đã được tắt để bảo vệ dữ liệu đang thiết lập!", "warning");
        return;
        if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ Danh mục Biến xạ về cấu hình chuẩn ban đầu? Mọi tùy chỉnh tên hoặc mã thẻ sẽ được đặt lại.")) {
            localStorage.removeItem(LS_VARS_CUSTOMIZATIONS);
            location.reload();
        }
    }

    // Attach listeners
    const btnAddNewVarFromStudioDict = document.getElementById("btnAddNewVarFromStudioDict");
    if (btnAddNewVarFromStudioDict) btnAddNewVarFromStudioDict.onclick = () => openEditVariableModal(null);

    const btnResetStudioVarsDefault = document.getElementById("btnResetStudioVarsDefault");
    if (btnResetStudioVarsDefault) btnResetStudioVarsDefault.onclick = resetCatalogToDefault;

    const btnCloseEditVarModal = document.getElementById("btnCloseEditVarModal");
    if (btnCloseEditVarModal) btnCloseEditVarModal.onclick = closeEditVariableModal;

    const btnCancelEditVar = document.getElementById("btnCancelEditVar");
    if (btnCancelEditVar) btnCancelEditVar.onclick = closeEditVariableModal;
    const btnAutoSuggestTag = document.getElementById("btnAutoSuggestTag");
    if (btnAutoSuggestTag) btnAutoSuggestTag.onclick = autoSuggestTagFromLabel;


    const editVarTagInput = document.getElementById("editVarTagInput");
    if (editVarTagInput) editVarTagInput.oninput = validateVariableInputs;

    const editVarLabelInput = document.getElementById("editVarLabelInput");
    const editVarLabelSuggestionsDropdown = document.getElementById("editVarLabelSuggestionsDropdown");
    const btnToggleLabelDropdown = document.getElementById("btnToggleLabelDropdown");

    if (editVarLabelInput) {
        editVarLabelInput.addEventListener("input", () => {
            renderLabelSuggestions(editVarLabelInput.value);
            updateLabelMatchedBadge(editVarLabelInput.value);
            validateVariableInputs();
        });

        editVarLabelInput.addEventListener("focus", () => {
            renderLabelSuggestions(editVarLabelInput.value);
        });

        editVarLabelInput.addEventListener("blur", () => {
            setTimeout(() => {
                editVarLabelSuggestionsDropdown?.classList.add("hidden");
            }, 250);
        });

        editVarLabelInput.addEventListener("keydown", (e) => {
            if (!editVarLabelSuggestionsDropdown || editVarLabelSuggestionsDropdown.classList.contains("hidden")) {
                if (e.key === "ArrowDown") {
                    renderLabelSuggestions(editVarLabelInput.value);
                    e.preventDefault();
                }
                return;
            }

            const items = editVarLabelSuggestionsDropdown.querySelectorAll(".label-suggestion-item, #itemCreateNewVarFromQuery");
            if (items.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
                updateSuggestionHighlight(items);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
                updateSuggestionHighlight(items);
            } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
                e.preventDefault();
                items[selectedSuggestionIndex]?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
            } else if (e.key === "Escape") {
                editVarLabelSuggestionsDropdown.classList.add("hidden");
                selectedSuggestionIndex = -1;
            }
        });
    }

    if (btnToggleLabelDropdown) {
        btnToggleLabelDropdown.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!editVarLabelSuggestionsDropdown) return;
            if (editVarLabelSuggestionsDropdown.classList.contains("hidden")) {
                renderLabelSuggestions(editVarLabelInput ? editVarLabelInput.value : "");
                editVarLabelInput?.focus();
            } else {
                editVarLabelSuggestionsDropdown.classList.add("hidden");
            }
        };
    }

    const btnSaveEditVar = document.getElementById("btnSaveEditVar");
    if (btnSaveEditVar) btnSaveEditVar.onclick = saveVariableChanges;

    const modalEditVariable = document.getElementById("modalEditVariable");
    if (modalEditVariable) {
        setupSafeModalBackdropClose(modalEditVariable, closeEditVariableModal);
    }


    // -------------------------------------------------------------
    // Custom Table Creation Modal Controller
    // -------------------------------------------------------------
    const modalCreateCustomTable = document.getElementById("modalCreateCustomTable");
    const btnCloseCustomTableModal = document.getElementById("btnCloseCustomTableModal");
    const btnCancelCustomTableModal = document.getElementById("btnCancelCustomTableModal");
    const btnSaveCustomTable = document.getElementById("btnSaveCustomTable");
    const btnAddCustomColumn = document.getElementById("btnAddCustomColumn");
    const customColumnsList = document.getElementById("customColumnsList");
    const inputCustomTableTag = document.getElementById("inputCustomTableTag");
    const inputCustomTableName = document.getElementById("inputCustomTableName");
    const inputCustomTableDesc = document.getElementById("inputCustomTableDesc");

    let customStudioTableColumnsDraft = [];

    function openCreateCustomTableModal() {
        if (!modalCreateCustomTable) return;
        modalCreateCustomTable.classList.remove("hidden");

        if (inputCustomTableTag) inputCustomTableTag.value = "";
        if (inputCustomTableName) inputCustomTableName.value = "";
        if (inputCustomTableDesc) inputCustomTableDesc.value = "";

        // Default columns draft
        customStudioTableColumnsDraft = [
            { key: "stt", label: "STT", type: "number", align: "center", widthPct: "8%" },
            { key: "noi_dung", label: "Nội dung / Hạng mục", type: "text", align: "left", widthPct: "45%" },
            { key: "so_luong", label: "Số lượng", type: "number", align: "right", widthPct: "15%" },
            { key: "ghi_chu", label: "Ghi chú", type: "text", align: "left", widthPct: "32%" }
        ];

        renderStudioCustomColumnsDraftList();
        if (inputCustomTableTag) inputCustomTableTag.focus();
    }

    function closeCreateCustomTableModal() {
        if (modalCreateCustomTable) modalCreateCustomTable.classList.add("hidden");
    }

    function renderStudioCustomColumnsDraftList() {
        if (!customColumnsList) return;
        let html = "";
        customStudioTableColumnsDraft.forEach((col, idx) => {
            html += `
                <div class="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-200 text-xs" data-col-idx="${idx}">
                    <span class="font-bold text-slate-400 w-5 text-center">${idx + 1}</span>
                    <input type="text" data-field="label" value="${escapeHtml(col.label)}" placeholder="Tên cột..." class="flex-1 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-medium">
                    <select data-field="type" class="border border-slate-300 rounded px-1.5 py-0.5 text-xs bg-slate-50">
                        <option value="text" ${col.type === 'text' ? 'selected' : ''}>Văn bản</option>
                        <option value="number" ${col.type === 'number' ? 'selected' : ''}>Số lượng</option>
                        <option value="currency" ${col.type === 'currency' ? 'selected' : ''}>Số tiền (VNĐ)</option>
                    </select>
                    <select data-field="align" class="border border-slate-300 rounded px-1.5 py-0.5 text-xs bg-slate-50">
                        <option value="left" ${col.align === 'left' ? 'selected' : ''}>Trái</option>
                        <option value="center" ${col.align === 'center' ? 'selected' : ''}>Giữa</option>
                        <option value="right" ${col.align === 'right' ? 'selected' : ''}>Phải</option>
                    </select>
                    <button type="button" data-action="delete-col" class="text-slate-400 hover:text-red-600 p-1 cursor-pointer" title="Xóa cột này">
                        <i class="fa-solid fa-trash-can text-[10px]"></i>
                    </button>
                </div>
            `;
        });
        customColumnsList.innerHTML = html;

        // Column delete
        customColumnsList.querySelectorAll('button[data-action="delete-col"]').forEach(btn => {
            btn.onclick = () => {
                const tr = btn.closest('[data-col-idx]');
                const cIdx = parseInt(tr.getAttribute("data-col-idx"), 10);
                if (customStudioTableColumnsDraft.length <= 1) {
                    showToast("Bảng cần tối thiểu ít nhất 1 cột!", "warning");
                    return;
                }
                customStudioTableColumnsDraft.splice(cIdx, 1);
                renderStudioCustomColumnsDraftList();
            };
        });

        // Field change sync
        customColumnsList.querySelectorAll('input, select').forEach(el => {
            el.onchange = () => {
                const tr = el.closest('[data-col-idx]');
                const cIdx = parseInt(tr.getAttribute("data-col-idx"), 10);
                const field = el.getAttribute("data-field");
                if (customStudioTableColumnsDraft[cIdx]) {
                    customStudioTableColumnsDraft[cIdx][field] = el.value;
                }
            };
        });
    }

    if (btnCloseCustomTableModal) btnCloseCustomTableModal.onclick = closeCreateCustomTableModal;
    if (btnCancelCustomTableModal) btnCancelCustomTableModal.onclick = closeCreateCustomTableModal;

    if (btnAddCustomColumn) {
        btnAddCustomColumn.onclick = () => {
            const nextIdx = customStudioTableColumnsDraft.length + 1;
            customStudioTableColumnsDraft.push({
                key: `col_${nextIdx}`,
                label: `Cột ${nextIdx}`,
                type: "text",
                align: "left",
                widthPct: "20%"
            });
            renderStudioCustomColumnsDraftList();
        };
    }

    if (btnSaveCustomTable) {
        btnSaveCustomTable.onclick = () => {
            let rawTag = (inputCustomTableTag ? inputCustomTableTag.value.trim() : "").toUpperCase();
            rawTag = rawTag.replace(/[^A-Z0-9_]/g, "_").replace(/^_+|_+$/g, "");
            if (!rawTag.startsWith("BANG_")) {
                rawTag = "BANG_" + rawTag;
            }

            if (rawTag === "BANG_") {
                showToast("Vui lòng nhập mã thẻ hợp lệ (VD: BANG_VAT_TU_PHU)!", "warning");
                if (inputCustomTableTag) inputCustomTableTag.focus();
                return;
            }

            const name = (inputCustomTableName ? inputCustomTableName.value.trim() : "") || rawTag;
            const desc = inputCustomTableDesc ? inputCustomTableDesc.value.trim() : "";

            // Check duplicate tag
            const existing = getAllStudioTableVars().find(t => t.tag === rawTag);
            if (existing) {
                showToast(`Mã thẻ {${rawTag}} đã tồn tại! Vui lòng chọn tên mã khác.`, "error");
                return;
            }

            // Sync columns
            customColumnsList.querySelectorAll('[data-col-idx]').forEach(tr => {
                const cIdx = parseInt(tr.getAttribute("data-col-idx"), 10);
                const lbl = tr.querySelector('input[data-field="label"]').value.trim();
                const typ = tr.querySelector('select[data-field="type"]').value;
                const alg = tr.querySelector('select[data-field="align"]').value;
                if (customStudioTableColumnsDraft[cIdx]) {
                    customStudioTableColumnsDraft[cIdx].label = lbl || `Cột ${cIdx + 1}`;
                    customStudioTableColumnsDraft[cIdx].type = typ;
                    customStudioTableColumnsDraft[cIdx].align = alg;
                    if (!customStudioTableColumnsDraft[cIdx].key) {
                        customStudioTableColumnsDraft[cIdx].key = `col_${cIdx + 1}`;
                    }
                }
            });

            // Ensure unique column keys
            customStudioTableColumnsDraft.forEach((c, i) => {
                if (!c.key) c.key = `col_${i + 1}`;
                if (i === 0 && !c.key) c.key = "stt";
            });

            const hasCurrency = customStudioTableColumnsDraft.some(c => c.type === "currency");
            const newTableDef = {
                tag: rawTag,
                name: name,
                icon: "📋",
                desc: desc || `Bảng dữ liệu {${rawTag}} chèn vào Word mẫu.`,
                isSystem: false,
                hasTotal: hasCurrency,
                totalCol: hasCurrency ? (customStudioTableColumnsDraft.find(c => c.type === "currency")?.key || "") : "",
                currencyWord: hasCurrency,
                columns: customStudioTableColumnsDraft,
                defaultRows: [
                    { stt: 1 }
                ]
            };

            let customList = [];
            try {
                const raw = localStorage.getItem("ho_so_custom_table_defs");
                if (raw) customList = JSON.parse(raw);
            } catch (e) {}

            customList.push(newTableDef);
            saveCustomStudioTableDefinitions(customList);

            currentStudioActiveDictTableTag = rawTag;
            renderPaletteTableVars();
            updateStudioDictBadgeCounts();
            renderStudioDictTableView();
            closeCreateCustomTableModal();
            showToast(`Đã tạo thành công loại bảng {${rawTag}}! Có thể copy mã Word hoặc chèn ngay bây giờ.`, "success");
        };
    }

    if (modalCreateCustomTable) {
        setupSafeModalBackdropClose(modalCreateCustomTable, closeCreateCustomTableModal);
    }

    // Cross-tab synchronization listener
    window.addEventListener("storage", (e) => {
        if (e.key === "ho_so_custom_table_defs") {
            renderPaletteTableVars();
            updateStudioDictBadgeCounts();
            if (studioDictCurrentMode === "table") {
                renderStudioDictTableView();
            }
            if (studioViewMode === "sample") {
                const item = state.batchFiles[state.activeDocId];
                if (item) renderCanvasContent(item);
            }
        }
    });

    // Cross-tab synchronization listener
    window.addEventListener("storage", (e) => {
        if (e.key === "ho_so_custom_table_defs") {
            renderPaletteTableVars();
            updateStudioDictBadgeCounts();
            if (studioDictCurrentMode === "table") {
                renderStudioDictTableView();
            }
            if (studioViewMode === "sample") {
                const item = state.batchFiles[state.activeDocId];
                if (item) renderCanvasContent(item);
            }
        }
        if (!e.key || e.key === "ho_so_vars_catalog_customizations" || e.key === "ho_so_vars_catalog_customizations_ts") {
            loadCatalogCustomizations();
            renderPaletteTextVars();
            if (typeof renderStudioVarsTable === "function") renderStudioVarsTable();
            if (studioViewMode === "sample") {
                const item = state.batchFiles[state.activeDocId];
                if (item) renderCanvasContent(item);
            }
        }
        if (e.key === "ho_so_tu_dong_matrix_custom" || e.key === "ho_so_tu_dong_implementation_matrix") {
            loadAllStudioWorkflows();
            initWorkflowSelector();
            renderBatchTable();
            if (state.viewMode === "single") {
                renderSingleView();
            }
            showToast("Đã đồng bộ Ma trận LCNT từ cấu hình hệ thống!", "info");
        }
    });

    // Initialize on page load
    loadAllStudioWorkflows();
    resolveInitialStudioContext();
    initWorkflowSelector();
    renderBatchTable();

    // 4-Tier Sync listeners for Studio
    let lastStudioSyncTs = localStorage.getItem("ho_so_vars_catalog_customizations_ts") || "";

    function syncStudioIfUpdated() {
        try {
            const currentTs = localStorage.getItem("ho_so_vars_catalog_customizations_ts") || "";
            if (currentTs && currentTs !== lastStudioSyncTs) {
                lastStudioSyncTs = currentTs;
                loadCatalogCustomizations();
                renderPaletteTextVars();
                if (typeof renderStudioVarsTable === "function") renderStudioVarsTable();
                if (studioViewMode === "sample") {
                    const item = state.batchFiles[state.activeDocId];
                    if (item) renderCanvasContent(item);
                }
            }
        } catch(e) {}
    }

    if (typeof BroadcastChannel !== "undefined") {
        try {
            const studioBC = new BroadcastChannel("ho_so_catalog_channel");
            studioBC.onmessage = (msg) => {
                if (msg.data && msg.data.type === "CATALOG_UPDATED") {
                    lastStudioSyncTs = String(msg.data.ts || "");
                    loadCatalogCustomizations();
                    renderPaletteTextVars();
                    if (typeof renderStudioVarsTable === "function") renderStudioVarsTable();
                    if (studioViewMode === "sample") {
                        const item = state.batchFiles[state.activeDocId];
                        if (item) renderCanvasContent(item);
                    }
                }
            };
        } catch(e) {}
    }

    
    // =============================================================
    // GOOGLE SHEETS CLOUD SYNC FOR TEMPLATE STUDIO 2.0 (2-WAY)
    // =============================================================
    let isStudioGSheetSyncing = false;
    let studioGSheetPushDebounce = null;

    async function pullStudioDataFromGoogleSheet(forceRender = true) {
        if (isStudioGSheetSyncing) return false;
        try {
            isStudioGSheetSyncing = true;
            const appCfg = (window.APP_CONFIG && typeof window.APP_CONFIG === "object") ? window.APP_CONFIG : {};
            const url = (localStorage.getItem("ho_so_gsheet_api_url") || appCfg.GSHEET_API_URL || "").trim();
            if (!url) return false;

            const fetchUrl = url + (url.includes("?") ? "&" : "?") + "action=getData&t=" + Date.now();
            const resp = await fetch(fetchUrl);
            if (!resp.ok) return false;
            const data = await resp.json();
            if (!data || !data.success || !Array.isArray(data.catalog) || data.catalog.length === 0) return false;

            // Cập nhật MASTER_VARIABLES_CATALOG
            MASTER_VARIABLES_CATALOG.length = 0;
            data.catalog.forEach((item, idx) => {
                MASTER_VARIABLES_CATALOG.push({
                    stt: item.stt || (idx + 1),
                    groupKey: item.groupKey || (item.group ? item.group.charAt(0) : "A"),
                    group: item.group || "A. Chủ đầu tư",
                    label: item.label,
                    tag: (item.tag || "").toUpperCase(),
                    isGeneral: !!item.isGeneral,
                    example: item.example || ""
                });
            });

            // Ghi nhận vào phiên hiện tại
            saveCatalogCustomizations();

            if (forceRender) {
                if (typeof renderPaletteTextVars === "function") renderPaletteTextVars();
                if (typeof renderStudioVarsTable === "function") renderStudioVarsTable();
                if (typeof updateStudioDictBadgeCounts === "function") updateStudioDictBadgeCounts();
            }
            console.log("Template Studio 2.0 synced from Google Sheets:", MASTER_VARIABLES_CATALOG.length, "variables");
            return true;
        } catch (e) {
            console.warn("Template Studio 2.0 Google Sheets sync error:", e);
            return false;
        } finally {
            setTimeout(() => { isStudioGSheetSyncing = false; }, 600);
        }
    }

    async function pushStudioDataToGoogleSheet() {
        try {
            const appCfg = (window.APP_CONFIG && typeof window.APP_CONFIG === "object") ? window.APP_CONFIG : {};
            const url = (localStorage.getItem("ho_so_gsheet_api_url") || appCfg.GSHEET_API_URL || "").trim();
            const adminKey = (localStorage.getItem("ho_so_gsheet_admin_key") || appCfg.GSHEET_ADMIN_KEY || "admin123").trim();
            if (!url) return false;

            const payload = {
                action: "syncFromWeb",
                adminKey: adminKey,
                catalog: MASTER_VARIABLES_CATALOG.map((v, i) => ({
                    stt: v.stt || (i + 1),
                    group: v.group,
                    groupKey: v.groupKey,
                    label: v.label,
                    tag: v.tag,
                    isGeneral: v.isGeneral,
                    example: v.example
                }))
            };

            const resp = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });
            return resp.ok;
        } catch(e) {
            return false;
        }
    }

    function triggerStudioAutoPushToGSheet() {
        if (isStudioGSheetSyncing) return;
        try {
            const appCfg = (window.APP_CONFIG && typeof window.APP_CONFIG === "object") ? window.APP_CONFIG : {};
            const url = (localStorage.getItem("ho_so_gsheet_api_url") || appCfg.GSHEET_API_URL || "").trim();
            if (!url) return;

            clearTimeout(studioGSheetPushDebounce);
            studioGSheetPushDebounce = setTimeout(() => {
                pushStudioDataToGoogleSheet().then(ok => {
                    if (ok && typeof showToast === "function") {
                        showToast("Đã tự động đồng bộ biến lên Google Sheets Cloud!", "info");
                    }
                });
            }, 800);
        } catch(e) {}
    }

    window.pullStudioDataFromGoogleSheet = pullStudioDataFromGoogleSheet;

    window.addEventListener("focus", syncStudioIfUpdated);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) syncStudioIfUpdated();
    });
    setInterval(syncStudioIfUpdated, 800);

    // Tự động tải từ Google Sheets khi khởi động Template Studio (hỗ trợ cả Tab Ẩn danh)
    setTimeout(() => {
        pullStudioDataFromGoogleSheet(true);
    }, 400);
})();