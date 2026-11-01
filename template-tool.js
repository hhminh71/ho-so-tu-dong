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
        { stt: 35, tier: 2, groupKey: "D", group: "D. Nhà thầu", label: "Địa chỉ nhà thầu", tag: "DIA_CHI_NHA_THAU", isGeneral: false, example: "Số 45 đường CMT8, Bình Thủy, Cần Thơ" },
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
    // Standard Workflows Matrix Catalog
    // -------------------------------------------------------------
    const STUDIO_WORKFLOWS = {
        "chi_dinh_thau_rut_gon": {
            id: "chi_dinh_thau_rut_gon",
            name: "Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)",
            category: "LCNT",
            documents: [
                { id: "cdtrg_1", code: "01.TTr-KHLCNT", name: "01. Tờ trình phê duyệt Kế hoạch LCNT", keywords: ["tờ trình", "kế hoạch", "khlcnt", "01."] },
                { id: "cdtrg_2", code: "02.QD-KHLCNT", name: "02. Quyết định phê duyệt Kế hoạch LCNT", keywords: ["quyết định", "kế hoạch", "khlcnt", "02."] },
                { id: "cdtrg_3", code: "03.GM-TT", name: "03. Giấy mời tham gia hoàn thiện hợp đồng", keywords: ["giấy mời", "thư mời", "tham gia", "03."] },
                { id: "cdtrg_4", code: "04.BB-HT", name: "04. Biên bản hoàn thiện / thương thảo hợp đồng", keywords: ["biên bản", "hoàn thiện", "thương thảo", "04."] },
                { id: "cdtrg_5", code: "05.TTr-KQLCNT", name: "05. Tờ trình phê duyệt Kết quả LCNT", keywords: ["tờ trình", "kết quả", "kqlcnt", "05."] },
                { id: "cdtrg_6", code: "06.QD-KQLCNT", name: "06. Quyết định phê duyệt Kết quả LCNT", keywords: ["quyết định", "kết quả", "kqlcnt", "06."] },
                { id: "cdtrg_7", code: "07.HD-KT", name: "07. Hợp đồng kinh tế", keywords: ["hợp đồng", "kinh tế", "hd-kt", "07."] }
            ]
        },
        "trien_khai_sua_chua": {
            id: "trien_khai_sua_chua",
            name: "Triển khai: Hồ sơ sửa chữa, bảo trì",
            category: "Triển khai",
            documents: [
                { id: "tk_sc_1", code: "110.QĐ", name: "01. QĐ giao kế hoạch sửa chữa", keywords: ["giao kế hoạch", "110", "qđ giao"] },
                { id: "tk_sc_2", code: "BB-KT", name: "02. Biên bản kiểm tra đột xuất / hiện trạng", keywords: ["biên bản kiểm tra", "đột xuất", "hiện trạng"] },
                { id: "tk_sc_3", code: "01.TTr", name: "03. [TRIỂN KHAI] Tờ trình phê duyệt chủ trương", keywords: ["chủ trương", "triển khai", "tờ trình"] },
                { id: "tk_sc_4", code: "02.TTr", name: "04. [TL TỔ THẨM ĐỊNH] Tờ trình thành lập tổ", keywords: ["tổ thẩm định", "thành lập", "tờ trình"] },
                { id: "tk_sc_5", code: "930a.QĐ", name: "05. [TL TỔ THẨM ĐỊNH] Quyết định thành lập", keywords: ["quyết định thành lập", "tổ thẩm định"] },
                { id: "tk_sc_6", code: "03.BC", name: "06. Báo cáo bảo trì / Báo cáo KTKT", keywords: ["báo cáo bảo trì", "báo cáo ktkt"] },
                { id: "tk_sc_7", code: "04.TTr", name: "07. [KH LCNT] Tờ trình Kế hoạch LCNT", keywords: ["kh lcnt", "tờ trình"] },
                { id: "tk_sc_8", code: "05.BC", name: "08. [KH LCNT] Báo cáo thẩm định KHLCNT", keywords: ["thẩm định khlcnt", "báo cáo thẩm định"] },
                { id: "tk_sc_9", code: "968.QĐ", name: "09. [KH LCNT] Quyết định phê duyệt KHLCNT", keywords: ["phê duyệt khlcnt", "quyết định"] },
                { id: "tk_sc_10", code: "1125.QĐ", name: "10. [THIẾT KẾ & DỰ TOÁN] Quyết định phê duyệt", keywords: ["thiết kế", "dự toán", "quyết định"] },
                { id: "tk_sc_11", code: "06.HD", name: "11. Hợp đồng triển khai thực hiện", keywords: ["hợp đồng", "triển khai", "thực hiện"] }
            ]
        },
        "chao_gia_han_che": {
            id: "chao_gia_han_che",
            name: "Chào giá cạnh tranh hạn chế (Nội bộ)",
            category: "LCNT",
            documents: [
                { id: "cghc_1", code: "01.TTr-CT", name: "01. Tờ trình phê duyệt chủ trương chào giá", keywords: ["chủ trương", "chào giá"] },
                { id: "cghc_2", code: "02.BC-MS", name: "02. Báo cáo đề xuất phương án chào giá hạn chế", keywords: ["phương án", "đề xuất"] },
                { id: "cghc_3", code: "03.TM-CG", name: "03. Thư mời chào giá cạnh tranh", keywords: ["thư mời chào giá"] },
                { id: "cghc_4", code: "04.BB-MCG", name: "04. Biên bản mở báo giá và đối chiếu năng lực", keywords: ["mở báo giá", "đối chiếu"] },
                { id: "cghc_5", code: "05.BC-TH", name: "05. Báo cáo tổng hợp kết quả chào giá", keywords: ["báo cáo tổng hợp"] },
                { id: "cghc_6", code: "06.QD-PD", name: "06. Quyết định phê duyệt kết quả lựa chọn", keywords: ["quyết định phê duyệt", "kết quả"] },
                { id: "cghc_7", code: "07.HD-KT", name: "07. Hợp đồng mua bán / cung cấp dịch vụ", keywords: ["hợp đồng"] }
            ]
        },
        "duoi_100_trieu": {
            id: "duoi_100_trieu",
            name: "Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)",
            category: "LCNT",
            documents: [
                { id: "d100_1", code: "01.TTr-KHLCNT", name: "01. Tờ trình phê duyệt Kế hoạch LCNT", keywords: ["tờ trình", "kế hoạch"] },
                { id: "d100_2", code: "02.QD-KHLCNT", name: "02. Quyết định phê duyệt Kế hoạch LCNT", keywords: ["quyết định", "kế hoạch"] },
                { id: "d100_3", code: "03.BB-TT", name: "03. Biên bản thương thảo hoàn thiện đơn hàng", keywords: ["biên bản thương thảo"] },
                { id: "d100_4", code: "04.HD-KT", name: "04. Hợp đồng kinh tế và biên bản giao nhận", keywords: ["hợp đồng"] }
            ]
        },
        "duoi_50_trieu": {
            id: "duoi_50_trieu",
            name: "Mua sắm siêu rút gọn (Dưới 50 triệu)",
            category: "LCNT",
            documents: [
                { id: "d50_1", code: "01.TTr-MS", name: "01. Tờ trình phê duyệt chủ trương và dự toán", keywords: ["chủ trương", "dự toán"] },
                { id: "d50_2", code: "02.BC-MS", name: "02. Báo cáo thẩm định & phê duyệt mua sắm", keywords: ["báo cáo", "thẩm định"] },
                { id: "d50_3", code: "03.HD-KT", name: "03. Hợp đồng kinh tế / Đơn đặt hàng", keywords: ["hợp đồng", "đơn đặt hàng"] },
                { id: "d50_4", code: "04.BB-NT", name: "04. Biên bản nghiệm thu bàn giao và thanh lý", keywords: ["nghiệm thu", "thanh lý"] }
            ]
        },
        "trien_khai_mua_sam": {
            id: "trien_khai_mua_sam",
            name: "Triển khai: Hồ sơ mua sắm thiết bị",
            category: "Triển khai",
            documents: [
                { id: "tk_ms_1", code: "01.TTr-NCS", name: "01. Tờ trình nhu cầu mua sắm trang thiết bị", keywords: ["nhu cầu", "tờ trình"] },
                { id: "tk_ms_2", code: "02.QD-TC", name: "02. Quyết định phê duyệt chủ trương mua sắm", keywords: ["chủ trương", "quyết định"] },
                { id: "tk_ms_3", code: "03.BB-KTHS", name: "03. Biên bản kiểm tra cấu hình & thông số kỹ thuật", keywords: ["cấu hình", "thông số"] },
                { id: "tk_ms_4", code: "04.TTr-KHLCNT", name: "04. Tờ trình phê duyệt KHLCNT mua sắm", keywords: ["tờ trình khlcnt"] },
                { id: "tk_ms_5", code: "05.QD-KHLCNT", name: "05. Quyết định phê duyệt KHLCNT mua sắm", keywords: ["quyết định khlcnt"] }
            ]
        }
    };

    // -------------------------------------------------------------
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
    function initWorkflowSelector() {
        if (!studioWorkflowSelect) return;
        studioWorkflowSelect.innerHTML = Object.values(STUDIO_WORKFLOWS).map(wf => 
            `<option value="${wf.id}" ${wf.id === state.activeWorkflowId ? "selected" : ""}>[${wf.category}] ${wf.name}</option>`
        ).join("");

        studioWorkflowSelect.onchange = (e) => {
            state.activeWorkflowId = e.target.value;
            state.batchFiles = {};
            updateWorkflowBadge();
            renderBatchTable();
            showToast(`Đã chuyển sang: ${getCurrentWorkflow().name}`);
        };
        updateWorkflowBadge();
    }

    function getCurrentWorkflow() {
        return STUDIO_WORKFLOWS[state.activeWorkflowId] || STUDIO_WORKFLOWS["chi_dinh_thau_rut_gon"];
    }

    function updateWorkflowBadge() {
        const wf = getCurrentWorkflow();
        if (workflowBadgeInfo) {
            workflowBadgeInfo.textContent = `${wf.documents.length} văn bản chuẩn`;
        }
    }

    // -------------------------------------------------------------
    // View Switcher (Batch Mode vs Single Doc Editor)
    // -------------------------------------------------------------
    function switchViewMode(mode) {
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
            renderSingleView();
        }
    }

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

    // -------------------------------------------------------------
    // Batch Files Processing & Smart Matching
    // -------------------------------------------------------------
    if (btnTriggerBatchUpload) btnTriggerBatchUpload.onclick = () => batchDocxUploadInput.click();
    if (btnBrowseBatchFiles) btnBrowseBatchFiles.onclick = () => batchDocxUploadInput.click();

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

    if (batchDocxUploadInput) {
        batchDocxUploadInput.onchange = async (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) await processIncomingFiles(files);
            batchDocxUploadInput.value = "";
        };
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

        for (const file of docxFiles) {
            const fileNameLower = file.name.toLowerCase();
            let matchedDoc = null;

            // Find best matching doc in current workflow
            for (const doc of wf.documents) {
                if (state.batchFiles[doc.id]) continue; // already matched
                const hits = doc.keywords.filter(kw => fileNameLower.includes(kw.toLowerCase()));
                if (hits.length > 0) {
                    matchedDoc = doc;
                    break;
                }
            }

            // Fallback: match by code index or next empty slot
            if (!matchedDoc) {
                matchedDoc = wf.documents.find(d => !state.batchFiles[d.id]);
            }

            if (matchedDoc) {
                const arrayBuffer = await file.arrayBuffer();
                const paragraphs = await extractParagraphsFromBuffer(arrayBuffer);
                const mappings = detectEntitiesForDocument(matchedDoc, paragraphs);

                state.batchFiles[matchedDoc.id] = {
                    file: file,
                    name: file.name,
                    size: file.size,
                    arrayBuffer: arrayBuffer,
                    paragraphs: paragraphs,
                    mappings: mappings,
                    status: "matched"
                };
                matchedCount++;
            }
        }

        renderBatchTable();
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
    // 4-Tier Scoping & Anti-Collision Entity Detection
    // -------------------------------------------------------------
    function detectEntitiesForDocument(doc, paragraphs) {
        const fullText = paragraphs.join("\n");
        const mappings = [];

        function addMapping(tag, originalText, tier, reason) {
            if (!originalText || originalText.trim().length < 2) return;
            const cleanText = originalText.trim().replace(/^[\s:–—\-]+/, "").replace(/[\s;.,]+$/, "");
            if (mappings.some(m => m.tag === tag || m.originalText === cleanText)) return;

            mappings.push({
                tag: tag,
                originalText: cleanText,
                tier: tier,
                reason: reason,
                count: (fullText.match(new RegExp(cleanText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi")) || []).length
            });
        }

        // TẦNG 1: DÙNG CHUNG TOÀN DỰ ÁN (TIER 1)
        // Chủ đầu tư
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

        // TẦNG 2: THÔNG TIN GÓI THẦU (TIER 2)
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

        // Giá gói thầu / Giá hợp đồng
        const giaMatch = fullText.match(/([\d]{1,3}(?:\.[\d]{3})+)\s*(?:đồng|vnđ)/i);
        if (giaMatch && giaMatch[1]) {
            if (doc.code.includes("HD")) {
                addMapping("GIA_TRI_HOP_DONG_SO", giaMatch[1], 2, "Giá trị hợp đồng");
            } else {
                addMapping("GIA_GOI_THAU_SO", giaMatch[1], 2, "Giá gói thầu");
            }
        }

        // TẦNG 3: BIẾN ĐỊNH DANH RIÊNG VĂN BẢN (CHỐNG CHỒNG CHÉO SỐ VB VÀ NGÀY KÝ)
        // Số văn bản ở góc trái trên đầu (hỗ trợ đầy đủ ký tự tiếng Việt như ĐKNCC, QĐ, UBND)
        const soVbMatch = fullText.match(/số\s*[:–—\-]?\s*([0-9a-zA-ZÀ-ỹ\/\.\-_]+)/i);
        if (soVbMatch && soVbMatch[1] && soVbMatch[1].includes("/")) {
            const soStr = soVbMatch[1].trim();
            if (doc.code.includes("TTr-KHLCNT") || doc.code.includes("01.TTr")) {
                addMapping("SO_TO_TRINH", soStr, 3, "Số Tờ trình KHLCNT");
            } else if (doc.code.includes("QD-KHLCNT") || doc.code.includes("02.QD")) {
                addMapping("SO_QUYET_DINH", soStr, 3, "Số Quyết định KHLCNT");
            } else if (doc.code.includes("GM")) {
                addMapping("SO_GIAY_MOI", soStr, 3, "Số Giấy mời");
            } else if (doc.code.includes("BB")) {
                addMapping("SO_BIEN_BAN_HOAN_THIEN", soStr, 3, "Số Biên bản");
            } else if (doc.code.includes("TTr-KQLCNT") || doc.code.includes("05.TTr")) {
                addMapping("SO_TO_TRINH_KQLCNT", soStr, 3, "Số Tờ trình KQLCNT (Phân nhánh không trùng)");
            } else if (doc.code.includes("QD-KQLCNT") || doc.code.includes("06.QD")) {
                addMapping("SO_QUYET_DINH_KQLCNT", soStr, 3, "Số Quyết định KQLCNT (Phân nhánh không trùng)");
            } else if (doc.code.includes("HD")) {
                addMapping("SO_HOP_DONG", soStr, 3, "Số Hợp đồng kinh tế");
            }
        }

        // Ngày tháng trên tiêu đề văn bản (ngày dd tháng mm năm yyyy)
        const ngayLongMatch = fullText.match(/ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i);
        if (ngayLongMatch) {
            const rawLongDate = ngayLongMatch[0];
            if (doc.code.includes("TTr-KHLCNT")) {
                addMapping("NGAY_TO_TRINH_FULL", rawLongDate, 3, "Ngày Tờ trình KHLCNT đầy đủ (Header)");
            } else if (doc.code.includes("QD-KHLCNT")) {
                addMapping("NGAY_QUYET_DINH_FULL", rawLongDate, 3, "Ngày QĐ KHLCNT đầy đủ (Header)");
            } else if (doc.code.includes("GM")) {
                addMapping("NGAY_GIAY_MOI_FULL", rawLongDate, 3, "Ngày Giấy mời đầy đủ (Header)");
            } else if (doc.code.includes("BB")) {
                addMapping("NGAY_BIEN_BAN_FULL", rawLongDate, 3, "Ngày Biên bản đầy đủ (Header)");
            } else if (doc.code.includes("HD")) {
                addMapping("NGAY_HOP_DONG_FULL", rawLongDate, 3, "Ngày Hợp đồng đầy đủ (Header)");
            }
        }

        // TẦNG 4: BIẾN TRÍCH DẪN CĂN CỨ HỖN HỢP (TIER 4)
        // Tìm các câu trích dẫn căn cứ văn bản trước: "Căn cứ Tờ trình số ... ngày ..."
        const canCuTTrMatch = fullText.match(/tờ trình\s+(?:số\s+)?([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
        if (canCuTTrMatch) {
            addMapping("TEN_KEM_SO_NGAY_TO_TRINH", canCuTTrMatch[0], 4, "Trích dẫn căn cứ Tờ trình");
        }

        const canCuQdMatch = fullText.match(/quyết định\s+(?:số\s+)?([0-9a-zA-ZÀ-ỹ\/\.\-_]+)\s+ngày\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
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
            if (batchItem) filledCount++;

            const fileCell = batchItem ? `
                <div class="flex items-center space-x-1.5 font-medium text-slate-800">
                    <i class="fa-solid fa-file-word text-blue-600 text-sm"></i>
                    <span class="truncate max-w-[200px]" title="${batchItem.name}">${batchItem.name}</span>
                    <span class="text-[9.5px] text-slate-400 font-mono">(${(batchItem.size/1024).toFixed(0)}KB)</span>
                </div>
            ` : `
                <div class="text-slate-400 italic text-[11px] flex items-center gap-1">
                    <i class="fa-regular fa-circle-xmark text-slate-300"></i>
                    <span>Chưa có file</span>
                </div>
            `;

            // Tier distribution pills
            let tagsSummary = `<span class="text-slate-300 text-[10px]">—</span>`;
            if (batchItem && batchItem.mappings && batchItem.mappings.length > 0) {
                const t1 = batchItem.mappings.filter(m => m.tier === 1).length;
                const t2 = batchItem.mappings.filter(m => m.tier === 2).length;
                const t3 = batchItem.mappings.filter(m => m.tier === 3).length;
                const t4 = batchItem.mappings.filter(m => m.tier === 4).length;

                tagsSummary = `
                    <div class="flex flex-wrap items-center gap-1">
                        ${t1 > 0 ? `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 py-0.2 rounded text-[9.5px] font-bold" title="${t1} biến dùng chung dự án">🟢 ${t1} chung</span>` : ""}
                        ${t2 > 0 ? `<span class="bg-blue-50 text-blue-800 border border-blue-200 px-1 py-0.2 rounded text-[9.5px] font-bold" title="${t2} biến gói thầu">🔵 ${t2} gói</span>` : ""}
                        ${t3 > 0 ? `<span class="bg-amber-50 text-amber-800 border border-amber-200 px-1 py-0.2 rounded text-[9.5px] font-bold" title="${t3} biến định danh số VB riêng">🟡 ${t3} riêng</span>` : ""}
                        ${t4 > 0 ? `<span class="bg-purple-50 text-purple-800 border border-purple-200 px-1 py-0.2 rounded text-[9.5px] font-bold" title="${t4} biến trích dẫn căn cứ">🟣 ${t4} căn cứ</span>` : ""}
                    </div>
                `;
            }

            const statusBadge = batchItem 
                ? `<span class="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center justify-center gap-1"><i class="fa-solid fa-check"></i> Đã khớp</span>`
                : `<span class="bg-slate-100 text-slate-500 font-medium px-1.5 py-0.5 rounded text-[10px] flex items-center justify-center gap-1">Chờ file</span>`;

            return `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-2 px-2 text-center text-slate-400 font-mono text-[10.5px]">${idx + 1}</td>
                    <td class="py-2 px-2.5">
                        <div class="font-bold text-slate-900 text-[11px]">${doc.name}</div>
                        <div class="font-mono text-[9.5px] text-emerald-700">${doc.code}</div>
                    </td>
                    <td class="py-2 px-2.5">${fileCell}</td>
                    <td class="py-2 px-2.5">${tagsSummary}</td>
                    <td class="py-2 px-2 text-center">${statusBadge}</td>
                    <td class="py-2 px-2 text-center">
                        <div class="flex items-center justify-center space-x-1">
                            ${batchItem ? `
                                <button type="button" class="btn-edit-doc-detail px-2 py-0.5 text-[10.5px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded cursor-pointer" data-id="${doc.id}" title="Soát chi tiết biến và xem trước văn bản">
                                    <i class="fa-solid fa-pen-to-square text-[9.5px]"></i> Sửa chi tiết
                                </button>
                                <button type="button" class="btn-download-doc-single px-1.5 py-0.5 text-[10.5px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 rounded cursor-pointer" data-id="${doc.id}" title="Tải riêng template này">
                                    <i class="fa-solid fa-download text-[9.5px]"></i>
                                </button>
                            ` : `
                                <button type="button" class="btn-upload-for-slot px-2 py-0.5 text-[10.5px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded cursor-pointer" data-id="${doc.id}">
                                    <i class="fa-solid fa-plus text-[9.5px]"></i> Chọn file
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
    // Single Document Deep Editor Controller
    // -------------------------------------------------------------
    function renderSingleView() {
        const wf = getCurrentWorkflow();
        const docObj = wf.documents.find(d => d.id === state.activeDocId) || wf.documents[0];
        const item = state.batchFiles[docObj.id];

        if (singleDocTitle) singleDocTitle.textContent = `${docObj.code} - ${docObj.name}`;
        if (singleDocFileNameBadge) {
            singleDocFileNameBadge.textContent = item ? item.name : "(Chưa có file nạp)";
        }

        if (!item) {
            if (singleMappingRowsContainer) {
                singleMappingRowsContainer.innerHTML = `
                    <div class="p-6 text-center text-slate-400 italic">
                        Văn bản này chưa có file Word. Vui lòng quay lại danh sách bộ để nạp file.
                    </div>
                `;
            }
            if (documentContentDisplay) {
                documentContentDisplay.innerHTML = `
                    <div class="p-12 text-center text-slate-400 italic">
                        Chưa có nội dung văn bản.
                    </div>
                `;
            }
            return;
        }

        renderSingleMappingRows(item);
        renderSingleDocumentPreview(item);
    }

    function renderSingleMappingRows(item) {
        if (!singleMappingRowsContainer) return;
        const mappings = item.mappings || [];
        if (singleDetectedCountBadge) singleDetectedCountBadge.textContent = `${mappings.length} biến`;

        if (mappings.length === 0) {
            singleMappingRowsContainer.innerHTML = `
                <div class="p-4 text-center text-slate-400 italic">
                    Chưa có biến nào được gắn thẻ cho văn bản này. Bôi đen văn bản bên phải để gán thẻ nhanh!
                </div>
            `;
            return;
        }

        const tierBadges = {
            1: `<span class="bg-emerald-100 text-emerald-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 1 (Chung CĐT/DA)</span>`,
            2: `<span class="bg-blue-100 text-blue-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 2 (Gói thầu)</span>`,
            3: `<span class="bg-amber-100 text-amber-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 3 (Riêng số VB)</span>`,
            4: `<span class="bg-purple-100 text-purple-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">Tầng 4 (Căn cứ chéo)</span>`
        };

        singleMappingRowsContainer.innerHTML = mappings.map((m, idx) => `
            <div class="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div class="flex items-center justify-between">
                    <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-1.5 py-0.2 rounded text-[11px]">{${m.tag}}</span>
                    ${tierBadges[m.tier] || ""}
                    <div class="flex items-center space-x-1">
                        <button type="button" class="btn-edit-single-mapping text-indigo-600 hover:text-indigo-800 px-1 py-0.5 rounded hover:bg-indigo-50 cursor-pointer" data-idx="${idx}" title="Chỉnh sửa mã TAG hoặc chuỗi gốc">
                            <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                        </button>
                        <button type="button" class="btn-remove-single-mapping text-slate-400 hover:text-rose-600 px-1 cursor-pointer" data-idx="${idx}">&times;</button>
                    </div>
                </div>
                <div class="text-[11px] text-slate-600 truncate" title="${m.originalText}">
                    <span class="font-semibold text-slate-500">Chuỗi gốc:</span> "${m.originalText}"
                </div>
                <div class="flex items-center justify-between text-[10px] text-slate-400">
                    <span>${m.reason || ""}</span>
                    <span>Xuất hiện: <b>${m.count || 1}</b> lần</span>
                </div>
            </div>
        `).join("");

        singleMappingRowsContainer.querySelectorAll(".btn-remove-single-mapping").forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                item.mappings.splice(idx, 1);
                renderSingleMappingRows(item);
                renderSingleDocumentPreview(item);
                renderBatchTable();
            };
        });

        singleMappingRowsContainer.querySelectorAll(".btn-edit-single-mapping").forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                const m = item.mappings[idx];
                if (m) {
                    openEditVariableModal(m.tag, idx);
                }
            };
        });
    }

    function renderSingleDocumentPreview(item) {
        if (!documentContentDisplay) return;
        const paragraphs = item.paragraphs || [];

        if (state.currentTaggingView === "original") {
            documentContentDisplay.innerHTML = paragraphs.map(p => `<p class="mb-2 leading-relaxed text-slate-800">${escapeHtml(p)}</p>`).join("");
        } else {
            // Tagged view: highlight placeholders
            documentContentDisplay.innerHTML = paragraphs.map(p => {
                let text = escapeHtml(p);
                (item.mappings || []).forEach(m => {
                    if (m.originalText && text.includes(m.originalText)) {
                        text = text.split(m.originalText).join(`<span class="tag-badge">{${m.tag}}</span>`);
                    }
                });
                return `<p class="mb-2 leading-relaxed text-slate-800">${text}</p>`;
            }).join("");
        }
    }

    function escapeHtml(str) {
        return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    if (viewModeOriginal) {
        viewModeOriginal.onclick = () => {
            state.currentTaggingView = "original";
            viewModeOriginal.className = "px-2 py-0.2 rounded font-bold bg-white text-slate-800 shadow-xs cursor-pointer";
            viewModeTagged.className = "px-2 py-0.2 rounded text-slate-600 hover:text-slate-900 cursor-pointer";
            const item = state.batchFiles[state.activeDocId];
            if (item) renderSingleDocumentPreview(item);
        };
    }

    if (viewModeTagged) {
        viewModeTagged.onclick = () => {
            state.currentTaggingView = "tagged";
            viewModeTagged.className = "px-2 py-0.2 rounded font-bold bg-white text-slate-800 shadow-xs cursor-pointer";
            viewModeOriginal.className = "px-2 py-0.2 rounded text-slate-600 hover:text-slate-900 cursor-pointer";
            const item = state.batchFiles[state.activeDocId];
            if (item) renderSingleDocumentPreview(item);
        };
    }

    if (btnApplySingleTags) {
        btnApplySingleTags.onclick = () => {
            const item = state.batchFiles[state.activeDocId];
            if (!item) return;
            state.currentTaggingView = "tagged";
            if (viewModeTagged) viewModeTagged.click();
            showToast("Đã áp dụng các thẻ vào văn bản xem trước!");
        };
    }

    if (btnDownloadSingleDocx) {
        btnDownloadSingleDocx.onclick = async () => {
            if (state.activeDocId) await exportSingleDocument(state.activeDocId);
        };
    }

    // Text selection & floating menu for quick tagging in Single View
    let selectedTextToTag = "";
    document.addEventListener("selectionchange", () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !documentContentDisplay.contains(sel.anchorNode)) {
            if (selectionMenu && !selectionMenu.contains(document.activeElement)) {
                selectionMenu.classList.add("hidden");
            }
            return;
        }

        const text = sel.toString().trim();
        if (text.length > 1 && text.length < 150) {
            selectedTextToTag = text;
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const wrapperRect = document.getElementById("docViewerWrapper").getBoundingClientRect();

            selectionMenu.style.top = `${rect.top - wrapperRect.top + document.getElementById("docViewerWrapper").scrollTop - 35}px`;
            selectionMenu.style.left = `${Math.max(10, rect.left - wrapperRect.left)}px`;
            selectionMenu.classList.remove("hidden");
        }
    });

    document.querySelectorAll(".quick-tag-btn").forEach(btn => {
        btn.onclick = () => {
            const tag = btn.getAttribute("data-var");
            const item = state.batchFiles[state.activeDocId];
            if (!item || !selectedTextToTag) return;

            item.mappings = item.mappings || [];
            item.mappings.push({
                tag: tag,
                originalText: selectedTextToTag,
                tier: 2,
                reason: "Gán thủ công từ vùng chọn",
                count: 1
            });

            selectionMenu.classList.add("hidden");
            renderSingleMappingRows(item);
            renderSingleDocumentPreview(item);
            renderBatchTable();
            showToast(`Đã gán {${tag}} cho chuỗi "${selectedTextToTag}"!`);
        };
    });

    const btnQuickCustomTag = document.getElementById("btnQuickCustomTag");
    if (btnQuickCustomTag) {
        btnQuickCustomTag.onclick = () => {
            const item = state.batchFiles[state.activeDocId];
            if (!item || !selectedTextToTag) return;
            const customTag = prompt("Nhập tên mã thẻ chèn (viết HOA, ví dụ: SO_DIEN_THOAI_CDT):", "BIEN_MOI");
            if (!customTag || !customTag.trim()) return;
            const cleanTag = customTag.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
            item.mappings = item.mappings || [];
            item.mappings.push({
                tag: cleanTag,
                originalText: selectedTextToTag,
                tier: 2,
                reason: "Tùy biến từ vùng chọn",
                count: 1
            });
            selectionMenu.classList.add("hidden");
            renderSingleMappingRows(item);
            renderSingleDocumentPreview(item);
            renderBatchTable();
            showToast(`Đã gán thẻ {${cleanTag}} thành công!`);
        };
    }

    if (btnSingleAddCustomVar) {
        btnSingleAddCustomVar.onclick = () => {
            const item = state.batchFiles[state.activeDocId];
            if (!item) {
                showToast("Văn bản này chưa có file Word để thêm biến!", "error");
                return;
            }
            const origText = prompt("Nhập chuỗi văn bản gốc cần thay thế trong file Word:");
            if (!origText || !origText.trim()) return;
            const customTag = prompt("Nhập tên mã thẻ chèn {TAG} (viết HOA, ví dụ: DIA_CHI_CHI_NHANH):", "BIEN_MOI");
            if (!customTag || !customTag.trim()) return;
            const cleanTag = customTag.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");

            item.mappings = item.mappings || [];
            item.mappings.push({
                tag: cleanTag,
                originalText: origText.trim(),
                tier: 2,
                reason: "Thêm thủ công",
                count: 1
            });
            renderSingleMappingRows(item);
            renderSingleDocumentPreview(item);
            renderBatchTable();
            showToast(`Đã thêm biến {${cleanTag}}!`);
        };
    }

    // -------------------------------------------------------------
    // Master Dictionary Modal Controller
    // -------------------------------------------------------------
    let currentDictCatFilter = "all";

    function openStudioVarsModal() {
        if (!modalStudioVars) return;
        renderStudioVarsTable();
        modalStudioVars.classList.remove("hidden");
        if (studioVarsSearchInput) {
            studioVarsSearchInput.value = "";
            setTimeout(() => studioVarsSearchInput.focus(), 100);
        }
    }

    function closeStudioVarsModal() {
        if (modalStudioVars) modalStudioVars.classList.add("hidden");
    }

    function renderStudioVarsTable() {
        if (!studioVarsTableBody) return;
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

        studioVarsTableBody.innerHTML = filtered.map(v => `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="py-1.5 px-2 text-center text-slate-400 font-mono text-[10.5px]">${v.stt}</td>
                <td class="py-1.5 px-2.5">
                    <button type="button" class="btn-copy-tag group font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer" data-tag="{${v.tag}}" title="Bấm để sao chép vào Word">
                        <span>{${v.tag}}</span>
                        <i class="fa-regular fa-copy text-[10px] text-emerald-600 group-hover:scale-110"></i>
                    </button>
                </td>
                <td class="py-1.5 px-2.5 text-slate-700 font-medium text-[11.5px]">${v.label}</td>
                <td class="py-1.5 px-2.5">
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold ${v.isGeneral ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700'}">${v.group}</span>
                </td>
                <td class="py-1.5 px-2 text-center">
                    <div class="flex items-center justify-center space-x-1">
                        <button type="button" class="btn-copy-tag text-[10.5px] font-bold text-emerald-700 hover:text-emerald-900 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 px-1.5 py-0.5 rounded cursor-pointer" data-tag="{${v.tag}}" title="Sao chép">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                        <button type="button" class="btn-edit-studio-var text-[10.5px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1" data-tag="${v.tag}" title="Điều chỉnh tên biến và mã TAG">
                            <i class="fa-solid fa-pen-to-square text-[9.5px]"></i>
                            <span>Sửa</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

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
    }

    if (btnOpenStudioVarsModal) btnOpenStudioVarsModal.onclick = openStudioVarsModal;
    if (btnCloseStudioVarsModal) btnCloseStudioVarsModal.onclick = closeStudioVarsModal;
    if (btnFooterCloseStudioVarsModal) btnFooterCloseStudioVarsModal.onclick = closeStudioVarsModal;
    if (modalStudioVars) {
        modalStudioVars.onclick = (e) => { if (e.target === modalStudioVars) closeStudioVarsModal(); };
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
    window.TemplateStudio = {
        state,
        STUDIO_WORKFLOWS,
        MASTER_VARIABLES_CATALOG,
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
            if (!Array.isArray(savedList)) return;

            savedList.forEach(savedVar => {
                const existing = MASTER_VARIABLES_CATALOG.find(v => v.stt === savedVar.stt || v.tag === savedVar.origTag || v.tag === savedVar.tag);
                if (existing) {
                    existing.label = savedVar.label;
                    existing.tag = savedVar.tag;
                    existing.group = savedVar.group;
                    existing.groupKey = savedVar.groupKey;
                    existing.isGeneral = savedVar.isGeneral;
                    existing.example = savedVar.example;
                } else {
                    MASTER_VARIABLES_CATALOG.push(savedVar);
                }
            });
        } catch (e) {
            console.warn("Error loading catalog customizations in Studio:", e);
        }
    }

    loadCatalogCustomizations();

    function slugifyToUpperSnake(str) {
        if (!str) return "";
        return str.normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[đĐ]/g, "D")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");
    }

    function openEditVariableModal(tagToEdit = null, mappingIdx = null) {
        const modal = document.getElementById("modalEditVariable");
        const title = document.getElementById("modalEditVariableTitle");
        const origTagInput = document.getElementById("editVarOriginalTag");
        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const tagPreview = document.getElementById("editVarTagPreview");
        const groupSelect = document.getElementById("editVarGroupSelect");
        const scopeSelect = document.getElementById("editVarScopeSelect");
        const exampleInput = document.getElementById("editVarExampleInput");
        const btnDelete = document.getElementById("btnDeleteCustomVar");

        if (!modal) return;
        activeEditingMappingIdx = mappingIdx;

        if (tagToEdit) {
            const cleanTag = tagToEdit.replace(/^[{]+|[}]+$/g, "");
            const v = MASTER_VARIABLES_CATALOG.find(item => item.tag === cleanTag);

            if (title) title.textContent = `Điều Chỉnh Biến Xạ {${cleanTag}}`;
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
        } else {
            if (title) title.textContent = "Thêm Biến Xạ Mới & Mã Thẻ {TAG}";
            if (origTagInput) origTagInput.value = "";
            if (labelInput) labelInput.value = "";
            if (tagInput) tagInput.value = "";
            if (tagPreview) tagPreview.textContent = "{TAG}";
            if (groupSelect) groupSelect.value = "A";
            if (scopeSelect) scopeSelect.value = "general";
            if (exampleInput) exampleInput.value = "";
            if (btnDelete) btnDelete.classList.add("hidden");
        }

        validateVariableInputs();
        modal.classList.remove("hidden");
        setTimeout(() => {
            if (!tagToEdit) labelInput?.focus();
            else tagInput?.focus();
        }, 100);
    }

    function closeEditVariableModal() {
        const modal = document.getElementById("modalEditVariable");
        if (modal) modal.classList.add("hidden");
        activeEditingMappingIdx = null;
    }

    function validateVariableInputs() {
        const origTag = (document.getElementById("editVarOriginalTag")?.value || "").trim().toUpperCase();
        const labelInput = document.getElementById("editVarLabelInput");
        const tagInput = document.getElementById("editVarTagInput");
        const tagPreview = document.getElementById("editVarTagPreview");
        const tagFeedback = document.getElementById("editVarTagFeedback");
        const labelFeedback = document.getElementById("editVarLabelFeedback");
        const btnSave = document.getElementById("btnSaveEditVar");

        if (!tagInput || !labelInput || !btnSave) return;

        let rawTag = tagInput.value;
        let cleanTag = slugifyToUpperSnake(rawTag);
        if (tagInput.value !== cleanTag && document.activeElement === tagInput) {
            const pos = tagInput.selectionStart;
            tagInput.value = cleanTag;
            tagInput.setSelectionRange(pos, pos);
        } else {
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
            conflictingVar = MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === cleanTag && v.tag.toUpperCase() !== origTag);

            if (conflictingVar) {
                isDuplicate = true;
                if (tagFeedback) {
                    tagFeedback.className = "mt-1 p-1.5 rounded text-[10.5px] bg-rose-50 text-rose-800 border border-rose-300 flex items-start gap-1.5";
                    tagFeedback.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation text-rose-600 mt-0.5 shrink-0 text-xs"></i>
                        <div>
                            <b>❌ TRÙNG LẶP MÃ THẺ!</b> Mã <code>{${cleanTag}}</code> đã được dùng cho biến <b>"${conflictingVar.label}"</b> (${conflictingVar.group}). Trùng lặp mã thẻ sẽ khiến các văn bản trong quy trình bị ghi đè dữ liệu sai lệch. Vui lòng chọn mã khác!
                        </div>
                    `;
                    tagFeedback.classList.remove("hidden");
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
                    labelFeedback.innerHTML = `<i class="fa-solid fa-circle-info text-amber-500"></i> Lưu ý: Tên "${label}" đã có biến <code>{${dupLabelVar.tag}}</code> (${dupLabelVar.group}).`;
                    labelFeedback.className = "text-[10px] mt-0.5 text-amber-700 font-medium";
                    labelFeedback.classList.remove("hidden");
                } else {
                    labelFeedback.classList.add("hidden");
                }
            }
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

        // If editing an active document mapping in Single Editor
        if (activeEditingMappingIdx !== null && state.activeDocId) {
            const item = state.batchFiles[state.activeDocId];
            if (item && item.mappings && item.mappings[activeEditingMappingIdx]) {
                item.mappings[activeEditingMappingIdx].tag = newTag;
                renderSingleMappingRows(item);
                renderSingleDocumentPreview(item);
                renderBatchTable();
            }
        }

        saveCatalogCustomizations();

        renderStudioVarsTable();
        document.getElementById("modalEditVariable")?.classList.add("hidden");
        activeEditingMappingIdx = null;
        showToast(`Đã lưu biến "${label}" với mã thẻ {${newTag}} thành công!`, "success");
    }

    function saveCatalogCustomizations() {
        try {
            const customizations = MASTER_VARIABLES_CATALOG.map(v => ({
                stt: v.stt,
                groupKey: v.groupKey,
                group: v.group,
                label: v.label,
                tag: v.tag,
                isGeneral: v.isGeneral,
                example: v.example,
                isCustom: !!v.isCustom
            }));
            localStorage.setItem(LS_VARS_CUSTOMIZATIONS, JSON.stringify(customizations));
        } catch (e) {
            console.warn("Could not save catalog customizations:", e);
        }
    }

    function resetCatalogToDefault() {
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

    const editVarTagInput = document.getElementById("editVarTagInput");
    if (editVarTagInput) editVarTagInput.oninput = validateVariableInputs;

    const editVarLabelInput = document.getElementById("editVarLabelInput");
    if (editVarLabelInput) editVarLabelInput.oninput = validateVariableInputs;

    const btnSaveEditVar = document.getElementById("btnSaveEditVar");
    if (btnSaveEditVar) btnSaveEditVar.onclick = saveVariableChanges;

    const modalEditVariable = document.getElementById("modalEditVariable");
    if (modalEditVariable) {
        modalEditVariable.onclick = (e) => {
            if (e.target === modalEditVariable) closeEditVariableModal();
        };
    }

    // Initialize on page load
    initWorkflowSelector();
    renderBatchTable();

})();
