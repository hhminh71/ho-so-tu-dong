// Tự Động Quản Lý & Xuất Hồ Sơ Mua Sắm, Xây Lắp - Core App Logic v3.0
(function () {
    // -------------------------------------------------------------
    // Master Procurement Matrix (Embedded + Async Sync)
    // -------------------------------------------------------------
    const PROCUREMENT_MATRIX = {"system": "Hệ thống Quản lý & Tự động xuất Hồ sơ Mua sắm, Xây lắp", "version": "3.0", "legalBases": ["Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023", "Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ", "Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 về công tác văn thư"], "procurementTypes": [{"id": "duoi_50_trieu", "code": "D50", "name": "1. Mua sắm siêu rút gọn (Dưới 50 triệu)", "badge": "< 50 triệu", "badgeColor": "emerald", "description": "Áp dụng mua sắm tài sản, thiết bị, sửa chữa thường xuyên dưới 50 triệu đồng theo dự toán nội bộ.", "threshold": 50000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d50_1", "code": "01.TTr-MS", "name": "01. Tờ trình phê duyệt chủ trương và dự toán", "desc": "Tờ trình đơn vị đề xuất mua sắm hàng hóa / sửa chữa", "requiredVars": ["TEN_DON_VI", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_HANG_MUC", "LY_DO_MUA_SAM", "TONG_MUC_DAU_TU", "NGUON_VON", "TRUONG_DON_VI"]}, {"id": "d50_2", "code": "02.BC-MS", "name": "02. Báo cáo thẩm định & phê duyệt mua sắm", "desc": "Báo cáo phê duyệt kết quả mua sắm dưới 50 triệu", "requiredVars": ["TEN_DON_VI", "SO_BAO_CAO", "NGAY_BAO_CAO", "TEN_HANG_MUC", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_TRI_MUA_SAM", "NGUOI_PHE_DUYET"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Nghiệm thu", "documents": [{"id": "d50_3", "code": "03.HD-KT", "name": "03. Hợp đồng kinh tế / Đơn đặt hàng", "desc": "Hợp đồng mua bán hoặc sửa chữa", "requiredVars": ["TEN_DON_VI", "DAI_DIEN_BEN_A", "TEN_NHA_THAU", "DAI_DIEN_BEN_B", "GIA_TRI_HOP_DONG", "THOI_GIAN_THUC_HIEN"]}, {"id": "d50_4", "code": "04.BB-NT", "name": "04. Biên bản nghiệm thu bàn giao và thanh lý", "desc": "Biên bản bàn giao thiết bị / hoàn thành sửa chữa", "requiredVars": ["TEN_DON_VI", "TEN_NHA_THAU", "NGAY_NGHIEM_THU", "NOI_DUNG_CONG_VIEC", "GIA_TRI_QUYET_TOAN"]}]}]}, {"id": "duoi_100_trieu", "code": "D100", "name": "2. Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)", "badge": "50tr - 100tr", "badgeColor": "teal", "description": "Áp dụng chỉ định thầu siêu nhỏ không qua mạng theo Khoản 4 Điều 23 Luật Đấu thầu 2023.", "threshold": 100000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d100_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Tờ trình phê duyệt KHLCNT gói mua sắm thường xuyên", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU", "HINH_THUC_LCNT", "NGUOI_TRINH"]}, {"id": "d100_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt của Người có thẩm quyền", "requiredVars": ["TEN_CHU_DAU_TU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_GOI_THAU", "NGUOI_KY_CDT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Thanh lý", "documents": [{"id": "d100_3", "code": "03.BB-TT", "name": "03. Biên bản thương thảo hoàn thiện đơn hàng", "desc": "Biên bản thống nhất giá và tiến độ giao hàng", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_THUONG_THAO", "THOI_GIAN_GIAO_HANG"]}, {"id": "d100_4", "code": "04.HD-KT", "name": "04. Hợp đồng kinh tế và biên bản giao nhận", "desc": "Hợp đồng kinh tế trọn gói", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chao_gia_han_che", "code": "CGHC", "name": "3. Chào giá cạnh tranh hạn chế (Nội bộ)", "badge": "Chào giá NB", "badgeColor": "cyan", "description": "Gửi thư mời chào giá đến ít nhất 3 nhà thầu có năng lực để so sánh giá cạnh tranh.", "threshold": 500000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cghc_1", "code": "01.TTr-CT", "name": "01. Tờ trình phê duyệt chủ trương chào giá", "desc": "Tờ trình chủ trương mua sắm cạnh tranh", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "cghc_2", "code": "02.BC-MS", "name": "02. Báo cáo đề xuất phương án chào giá hạn chế", "desc": "Đề xuất danh sách ít nhất 3 nhà thầu", "requiredVars": ["TEN_CHU_DAU_TU", "DANH_SACH_3_NHA_THAU"]}, {"id": "cghc_3", "code": "03.TB-CG", "name": "03. Thư mời chào giá kèm bảng yêu cầu kỹ thuật", "desc": "Gửi các nhà thầu nộp thư báo giá", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_BAO_GIA", "YEU_CAU_KY_THUAT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Đánh giá & Trao thầu", "documents": [{"id": "cghc_4", "code": "04.BB-MT", "name": "04. Biên bản mở thư chào giá", "desc": "Biên bản mở niêm phong các báo giá", "requiredVars": ["THOI_GIAN_MO_THAU", "DANH_SACH_GIA_CHAO"]}, {"id": "cghc_5", "code": "05.BB-DG", "name": "05. Biên bản họp đánh giá so sánh báo giá", "desc": "So sánh kỹ thuật và đơn giá", "requiredVars": ["TO_CHUYEN_GIA", "DON_VI_GIA_THAP_NHAT"]}, {"id": "cghc_6", "code": "06.BB-TT", "name": "06. Biên bản thương thảo hợp đồng", "desc": "Thương thảo với đơn vị có giá tốt nhất", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_THUONG_THAO"]}, {"id": "cghc_7", "code": "07.BC-DG", "name": "07. Báo cáo đánh giá kết quả chào giá", "desc": "Báo cáo trình lãnh đạo phê duyệt", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_DE_NGHI"]}, {"id": "cghc_8", "code": "08.TB-KQ", "name": "08. Thông báo kết quả chào giá", "desc": "Thông báo gửi các đơn vị tham gia", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_TRUNG_THAU"]}, {"id": "cghc_9", "code": "09.HD-KT", "name": "09. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế ký kết", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU_TRUNG", "GIA_TRI_HOP_DONG"]}]}]}, {"id": "chi_dinh_thau_rut_gon", "code": "CDTRG", "name": "4. Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)", "badge": "CĐT Rút Gọn", "badgeColor": "emerald", "description": "Quy trình chuẩn theo Điều 78 Nghị định 24/2024/NĐ-CP (Tư vấn, Xây lắp, Hàng hóa).", "threshold": 1000000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cdtrg_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Trình cấp thẩm quyền phê duyệt KHLCNT", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO"]}, {"id": "cdtrg_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt KHLCNT", "requiredVars": ["SO_QUYET_DINH_KHLCNT", "NGAY_QUYET_DINH", "NGUOI_KY_CDT"]}, {"id": "cdtrg_3", "code": "03.GM-TT", "name": "03. Giấy mời tham gia hoàn thiện hợp đồng", "desc": "Gửi nhà thầu được chỉ định", "requiredVars": ["TEN_BAN_QUAN_LY_DU_AN", "TEN_NHA_THAU", "THOI_GIAN_HOP", "DIA_DIEM_HOP"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Hoàn thiện & Phê duyệt", "documents": [{"id": "cdtrg_4", "code": "04.BB-HT", "name": "04. Biên bản hoàn thiện hợp đồng", "desc": "Biên bản hoàn thiện điều khoản hợp đồng", "requiredVars": ["SO_BIEN_BAN_HOAN_THIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "DAI_DIEN_NHA_THAU"]}, {"id": "cdtrg_5", "code": "05.TTr-KQLCNT", "name": "05. Tờ trình phê duyệt kết quả chỉ định thầu", "desc": "Trình phê duyệt chỉ định thầu", "requiredVars": ["SO_TO_TRINH", "CO_QUAN_TRINH", "TRUONG_BAN_DHDA", "TEN_NHA_THAU"]}, {"id": "cdtrg_6", "code": "06.QD-KQLCNT", "name": "06. Quyết định phê duyệt kết quả chỉ định thầu", "desc": "Quyết định phê duyệt trúng thầu", "requiredVars": ["SO_QUYET_DINH", "NGUOI_KY_CDT", "GIA_TRI_HOP_DONG_SO", "THOI_GIAN_THUC_HIEN"]}, {"id": "cdtrg_7", "code": "07.HD-KT", "name": "07. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế chính thức", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chi_dinh_thau_thong_thuong", "code": "CDTTT", "name": "5. Chỉ định thầu quy trình thông thường (HSYC & HSĐX)", "badge": "CĐT Thông Thường", "badgeColor": "indigo", "description": "Áp dụng gói thầu cần lập Hồ sơ yêu cầu, đánh giá Hồ sơ đề xuất và thẩm định kết quả.", "threshold": 5000000000, "phases": [{"phaseId": "chuan_bi_hsyc", "phaseName": "Giai đoạn Chuẩn bị Hồ sơ yêu cầu", "documents": [{"id": "cdttt_1", "code": "01.QD-TCG", "name": "01. Quyết định thành lập Tổ chuyên gia & Tổ thẩm định", "desc": "Thành lập ban bệ tổ chức chỉ định thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "cdttt_2", "code": "02.TTr-HSYC", "name": "02. Tờ trình đề nghị phê duyệt Hồ sơ yêu cầu (E-HSYC)", "desc": "Trình duyệt E-HSYC", "requiredVars": ["TEN_GOI_THAU", "TIEU_CHUAN_DANH_GIA"]}, {"id": "cdttt_3", "code": "03.BC-TD-HSYC", "name": "03. Báo cáo thẩm định Hồ sơ yêu cầu", "desc": "Tổ thẩm định kiểm tra HSYC", "requiredVars": ["KET_QUA_THAM_DINH_HSYC"]}, {"id": "cdttt_4", "code": "04.QD-PD-HSYC", "name": "04. Quyết định phê duyệt Hồ sơ yêu cầu", "desc": "Ban hành HSYC chính thức", "requiredVars": ["SO_QD_HSYC", "NGAY_BAN_HANH"]}, {"id": "cdttt_5", "code": "05.TM-HSDX", "name": "05. Thư mời nộp Hồ sơ đề xuất", "desc": "Gửi đơn vị dự kiến chỉ định", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_HSDX"]}]}, {"phaseId": "danh_gia_trao_thau", "phaseName": "Giai đoạn Đánh giá & Phê duyệt kết quả", "documents": [{"id": "cdttt_6", "code": "06.BB-M-HSDX", "name": "06. Biên bản mở Hồ sơ đề xuất", "desc": "Mở hồ sơ đề xuất", "requiredVars": ["THOI_GIAN_MO_THAU"]}, {"id": "cdttt_7", "code": "07.BC-DG-HSDX", "name": "07. Báo cáo đánh giá Hồ sơ đề xuất", "desc": "Đánh giá năng lực, kinh nghiệm, tài chính", "requiredVars": ["KET_QUA_DANH_GIA"]}, {"id": "cdttt_8", "code": "08.BB-TT", "name": "08. Biên bản thương thảo hợp đồng", "desc": "Thương thảo hoàn thiện", "requiredVars": ["GIA_THUONG_THAO"]}, {"id": "cdttt_9", "code": "09.TTr-KQLCNT", "name": "09. Tờ trình đề nghị phê duyệt Kết quả chỉ định thầu", "desc": "Trình kết quả LCNT", "requiredVars": ["GIA_TRUNG_THAU_SO"]}, {"id": "cdttt_10", "code": "10.BC-TD-KQ", "name": "10. Báo cáo thẩm định Kết quả lựa chọn nhà thầu", "desc": "Thẩm định trước khi ký duyệt", "requiredVars": ["Y_KIEN_THAM_DINH"]}, {"id": "cdttt_11", "code": "11.QD-PD-KQ", "name": "11. Quyết định phê duyệt Kết quả chỉ định thầu", "desc": "Quyết định phê duyệt chính thức", "requiredVars": ["SO_QUYET_DINH"]}, {"id": "cdttt_12", "code": "12.HD-KT", "name": "12. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế", "requiredVars": ["GIA_TRI_HOP_DONG_SO"]}]}]}, {"id": "dau_thau_rong_rai_hh_xl", "code": "DTRR", "name": "6. Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)", "badge": "Đấu Thầu Rộng Rãi", "badgeColor": "rose", "description": "Đầy đủ 23 biểu mẫu theo chuẩn Hệ thống Mạng Đấu thầu Quốc gia qua 6 giai đoạn (từ chuẩn bị đến ký HĐ).", "threshold": 100000000000, "phases": [{"phaseId": "giai_doan_1_hsmt", "phaseName": "GĐ 1: Chuẩn bị Hồ sơ mời thầu (E-HSMT)", "documents": [{"id": "dtrr_1", "code": "01.QD-TL", "name": "01. Quyết định thành lập Tổ chuyên gia và Tổ thẩm định", "desc": "Thành lập tổ chấm thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "dtrr_2", "code": "02.BB-HOP-TCG", "name": "02. Biên bản họp Tổ chuyên gia thông qua dự thảo E-HSMT", "desc": "Họp rà soát tiêu chuẩn mời thầu", "requiredVars": ["NOI_DUNG_DU_THAO"]}, {"id": "dtrr_3", "code": "03.TTr-HSMT", "name": "03. Tờ trình đề nghị thẩm định, phê duyệt E-HSMT", "desc": "Trình thẩm định E-HSMT", "requiredVars": ["TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "dtrr_4", "code": "04.BB-HOP-TTD", "name": "04. Biên bản họp Tổ thẩm định E-HSMT", "desc": "Họp thẩm định E-HSMT", "requiredVars": ["KET_QUA_HOP_THAM_DINH"]}, {"id": "dtrr_5", "code": "05.BC-TD-HSMT", "name": "05. Báo cáo thẩm định E-HSMT", "desc": "Báo cáo thẩm định đạt yêu cầu", "requiredVars": ["KET_LUAN_THAM_DINH"]}, {"id": "dtrr_6", "code": "06.QD-PD-HSMT", "name": "06. Quyết định phê duyệt E-HSMT", "desc": "Phê duyệt để đăng tải mạng", "requiredVars": ["SO_QD_HSMT", "NGAY_KY"]}]}, {"phaseId": "giai_doan_2_to_chuc", "phaseName": "GĐ 2: Tổ chức Lựa chọn nhà thầu & Mở thầu", "documents": [{"id": "dtrr_7", "code": "07.TB-MT", "name": "07. Thông báo mời thầu (E-TBMT)", "desc": "Thông báo phát hành hồ sơ mời thầu", "requiredVars": ["SO_E_TBMT", "THOI_DIEM_DONG_THAU"]}, {"id": "dtrr_8", "code": "08.VB-LAM-RO", "name": "08. Văn bản làm rõ E-HSMT (nếu có)", "desc": "Giải đáp thắc mắc của nhà thầu", "requiredVars": ["NOI_DUNG_LAM_RO"]}, {"id": "dtrr_9", "code": "09.QD-SUA-DOI", "name": "09. Quyết định sửa đổi E-HSMT (nếu có)", "desc": "Điều chỉnh hồ sơ mời thầu", "requiredVars": ["NOI_DUNG_SUA_DOI"]}, {"id": "dtrr_10", "code": "10.BB-MO-THAU", "name": "10. Biên bản mở thầu điện tử", "desc": "Trích xuất danh sách nhà thầu dự thầu", "requiredVars": ["DANH_SACH_NHA_THAU_DU_THAU"]}]}, {"phaseId": "giai_doan_3_danh_gia", "phaseName": "GĐ 3: Đánh giá Hồ sơ dự thầu (E-HSDT)", "documents": [{"id": "dtrr_11", "code": "11.BB-HOP-PC", "name": "11. Biên bản họp Tổ chuyên gia phân công nhiệm vụ", "desc": "Phân công tổ viên chấm điểm", "requiredVars": ["PHAN_CONG_CHAM_THAU"]}, {"id": "dtrr_12", "code": "12.VB-LR-HSDT", "name": "12. Văn bản yêu cầu làm rõ E-HSDT (nếu có)", "desc": "Làm rõ hồ sơ dự thầu", "requiredVars": ["YEU_CAU_LAM_RO_HSDT"]}, {"id": "dtrr_13", "code": "13.BB-HOP-KQ", "name": "13. Biên bản họp Tổ chuyên gia thông qua kết quả chấm thầu", "desc": "Thống nhất xếp hạng nhà thầu", "requiredVars": ["XEP_HANG_NHA_THAU"]}, {"id": "dtrr_14", "code": "14.BC-DG-HSDT", "name": "14. Báo cáo đánh giá Hồ sơ dự thầu (E-HSDT)", "desc": "Báo cáo chấm thầu chính thức", "requiredVars": ["NHA_THAU_XEP_HANG_1"]}]}, {"phaseId": "giai_doan_4_thuong_thao", "phaseName": "GĐ 4: Thương thảo và Hoàn thiện hợp đồng", "documents": [{"id": "dtrr_15", "code": "15.GM-TT", "name": "15. Văn bản mời nhà thầu xếp hạng nhất vào thương thảo", "desc": "Mời thương thảo", "requiredVars": ["TEN_NHA_THAU_HANG_1", "LICH_THUONG_THAO"]}, {"id": "dtrr_16", "code": "16.BB-TT", "name": "16. Biên bản thương thảo hợp đồng", "desc": "Thương thảo các điều khoản", "requiredVars": ["GIA_THUONG_THAO_CUOI_CUNG"]}, {"id": "dtrr_17", "code": "17.BB-HT", "name": "17. Biên bản hoàn thiện hợp đồng", "desc": "Rà soát điều kiện hợp đồng", "requiredVars": ["GIA_TRI_HOP_DONG_THONG_NHAT"]}]}, {"phaseId": "giai_doan_5_phe_duyet", "phaseName": "GĐ 5: Thẩm định và Phê duyệt Kết quả LCNT", "documents": [{"id": "dtrr_18", "code": "18.TTr-KQLCNT", "name": "18. Tờ trình đề nghị thẩm định, phê duyệt Kết quả LCNT", "desc": "Trình phê duyệt trúng thầu", "requiredVars": ["TEN_DON_VI_TRUNG_THAU", "GIA_TRUNG_THAU"]}, {"id": "dtrr_19", "code": "19.BB-HOP-TTD", "name": "19. Biên bản họp Tổ thẩm định Kết quả LCNT", "desc": "Họp thẩm định kết quả", "requiredVars": ["Y_KIEN_TO_THAM_DINH"]}, {"id": "dtrr_20", "code": "20.BC-TD-KQ", "name": "20. Báo cáo thẩm định Kết quả LCNT", "desc": "Báo cáo thẩm định", "requiredVars": ["KET_LUAN_THAM_DINH_KQLCNT"]}, {"id": "dtrr_21", "code": "21.QD-PD-KQ", "name": "21. Quyết định phê duyệt Kết quả lựa chọn nhà thầu", "desc": "Quyết định phê duyệt trúng thầu chính thức", "requiredVars": ["SO_QUYET_DINH", "GIA_TRUNG_THAU_SO"]}]}, {"phaseId": "giai_doan_6_hop_dong", "phaseName": "GĐ 6: Công khai Kết quả & Ký kết Hợp đồng", "documents": [{"id": "dtrr_22", "code": "22.TB-KQ", "name": "22. Thông báo Kết quả lựa chọn nhà thầu", "desc": "Đăng tải kết quả trên mạng đấu thầu", "requiredVars": ["TEN_NHA_THAU_TRUNG_THAU"]}, {"id": "dtrr_23", "code": "23.HD-KT", "name": "23. Hợp đồng kinh tế chính thức (kèm phụ lục)", "desc": "Hợp đồng kinh tế xây lắp/mua sắm", "requiredVars": ["GIA_TRI_HOP_DONG", "BAO_DAM_THUC_HIEN_HD"]}]}]}]};

    // -------------------------------------------------------------
    // Initial State & Sample Data (Matches Video Demo & Standards)
    // -------------------------------------------------------------
    const defaultGeneralInfo = {
        TEN_CHU_DAU_TU: "UBND phường Hoàn Kiếm",
        TEN_CHU_DAU_TU_VIET_HOA: "UBND PHƯỜNG HOÀN KIẾM",
        TEN_BAN_QUAN_LY_DU_AN: "BAN QUẢN LÝ ĐẦU TƯ VÀ XÂY DỰNG HOÀN KIẾM",
        CO_QUAN_TRINH: "Trưởng ban Điều hành dự án",
        DIA_DANH: "Phường Hoàn Kiếm",
        TINH_THANH_PHO: "TP. Hà Nội",
        DIA_CHI_TRU_SO: "18 Lê Lai, Phường Hoàn Kiếm, Quận Hoàn Kiếm, TP. Hà Nội",
        CAP_QUYET_DINH_DAU_TU: "UBND THÀNH PHỐ HÀ NỘI",
        TEN_DU_AN: "Sửa chữa, cải tạo trụ sở UBND phường Hoàn Kiếm",
        TEN_CONG_TRINH: "Trụ sở UBND phường Hoàn Kiếm",
        NGUON_VON: "Ngân sách quận",
        NGUOI_KY_CDT: "Nguyễn Văn An",
        CHUC_VU_NGUOI_KY: "Giám đốc Ban QLDA",
        TRUONG_BAN_DHDA: "Lê Thị Bích",
        CHUC_VU_TRUONG_BAN: "Trưởng ban Điều hành dự án",
        KE_TOAN_TRUONG: "Phạm Thị Hoa",
        CHUC_VU_KE_TOAN: "Kế toán trưởng",
        CAN_CU_PHAP_LY_CHUNG: "Căn cứ Quyết định số 456/QĐ-UBND ngày 10/02/2025 của UBND quận Hoàn Kiếm về việc phê duyệt chủ trương đầu tư dự án;\nCăn cứ Quyết định số 789/QĐ-UBND ngày 15/04/2025 của UBND quận Hoàn Kiếm về việc phê duyệt dự toán chuẩn bị đầu tư;\nCăn cứ Quyết định số 1023/QĐ-UBND ngày 01/05/2025 của UBND quận Hoàn Kiếm về việc phê duyệt Kế hoạch lựa chọn nhà thầu;\nCăn cứ Quyết định số 234/QĐ-BQLDA ngày 05/01/2025 về việc phân công nhiệm vụ các thành viên Ban QLDA;"
    };

    const defaultPackages = [
        {
            id: "pkg-1",
            name: "Tư vấn thiết kế",
            sheet_name: "Tư vấn thiết kế",
            fields: {
                TEN_GOI_THAU: "Tư vấn lập báo cáo kinh tế kỹ thuật sửa chữa, cải tạo trụ sở UBND phường Hoàn Kiếm",
                HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                LOAI_HOP_DONG: "Trọn gói",
                THOI_GIAN_THUC_HIEN: "30 ngày",
                THOI_GIAN_TO_CHUC: "Quý IV/2025",
                GIA_GOI_THAU_SO: "308.000.000",
                GIA_GOI_THAU_CHU: "Ba trăm lẻ tám triệu đồng",
                GIA_TRI_HOP_DONG_SO: "300.000.000",
                GIA_TRI_HOP_DONG_CHU: "Ba trăm triệu đồng chẵn",
                GIA_TRI_GIAM_GIA: "8.000.000",
                CHI_PHI_TU_VAN: "50.000.000",
                KHO_BAC_NHA_NUOC: "Quận Hoàn Kiếm, TP. Hà Nội",
                TEN_NHA_THAU: "Công ty TNHH Tư vấn Thiết kế Kiến trúc Thăng Long",
                TEN_NHA_THAU_VIET_HOA: "CÔNG TY TNHH TƯ VẤN THIẾT KẾ KIẾN TRÚC THĂNG LONG",
                TEN_NHA_THAU_VIET_TAT: "Thăng Long",
                DAI_DIEN_NHA_THAU: "Trần Quốc Tuấn",
                CHUC_VU_DAI_DIEN: "Giám đốc",
                DIA_CHI_NHA_THAU: "Số 45 Hàng Chuối, Quận Hai Bà Trưng, TP. Hà Nội",
                MA_SO_THUE: "0108654321",
                SO_CONG_VAN_THAM_GIA: "156/CV-TL",
                SO_BIEN_BAN_HOAN_THIEN: "88/BB-BQLDA",
                SO_TO_TRINH: "89/TTr-ĐHDA",
                SO_QUYET_DINH: "90/QĐ-BQLDA",
                THOI_GIAN_HOP: "08 giờ 30 phút, ngày 10 tháng 07 năm 2025",
                DIA_DIEM_HOP: "Văn phòng Ban Quản lý dự án",
                NGAY_GIAY_MOI: "05/07/2025",
                NGAY_BIEN_BAN: "10/07/2025",
                NGAY_TO_TRINH: "11/07/2025",
                NGAY_QUYET_DINH: "14/07/2025"
            }
        },
        {
            id: "pkg-2",
            name: "Tư vấn thẩm tra",
            sheet_name: "Tư vấn thẩm tra",
            fields: {
                TEN_GOI_THAU: "Tư vấn thẩm tra báo cáo kinh tế kỹ thuật sửa chữa, cải tạo trụ sở UBND phường Hoàn Kiếm",
                HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                LOAI_HOP_DONG: "Trọn gói",
                THOI_GIAN_THUC_HIEN: "15 ngày",
                THOI_GIAN_TO_CHUC: "Quý IV/2025",
                GIA_GOI_THAU_SO: "45.000.000",
                GIA_GOI_THAU_CHU: "Bốn mươi lăm triệu đồng",
                GIA_TRI_HOP_DONG_SO: "42.000.000",
                GIA_TRI_HOP_DONG_CHU: "Bốn mươi hai triệu đồng chẵn",
                GIA_TRI_GIAM_GIA: "3.000.000",
                CHI_PHI_TU_VAN: "8.000.000",
                KHO_BAC_NHA_NUOC: "Quận Hoàn Kiếm, TP. Hà Nội",
                TEN_NHA_THAU: "Công ty CP Tư vấn Xây dựng Thăng Long",
                TEN_NHA_THAU_VIET_HOA: "CÔNG TY CP TƯ VẤN XÂY DỰNG THĂNG LONG",
                TEN_NHA_THAU_VIET_TAT: "Tư vấn Thăng Long",
                DAI_DIEN_NHA_THAU: "Phạm Quốc Hùng",
                CHUC_VU_DAI_DIEN: "Giám đốc",
                DIA_CHI_NHA_THAU: "Số 78 Lý Thường Kiệt, Quận Hoàn Kiếm, TP. Hà Nội",
                MA_SO_THUE: "0107654321",
                SO_CONG_VAN_THAM_GIA: "203/CV-TL",
                SO_BIEN_BAN_HOAN_THIEN: "112/BB-BQLDA",
                SO_TO_TRINH: "113/TTr-ĐHDA",
                SO_QUYET_DINH: "114/QĐ-BQLDA",
                THOI_GIAN_HOP: "14 giờ 00 phút, ngày 12 tháng 07 năm 2025",
                DIA_DIEM_HOP: "Văn phòng Ban Quản lý dự án",
                NGAY_GIAY_MOI: "08/07/2025",
                NGAY_BIEN_BAN: "12/07/2025",
                NGAY_TO_TRINH: "13/07/2025",
                NGAY_QUYET_DINH: "15/07/2025"
            }
        },
        {
            id: "pkg-3",
            name: "Tư vấn giám sát",
            sheet_name: "Tư vấn giám sát",
            fields: {
                TEN_GOI_THAU: "Tư vấn giám sát thi công sửa chữa, cải tạo trụ sở UBND phường Hoàn Kiếm",
                HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                LOAI_HOP_DONG: "Trọn gói",
                THOI_GIAN_THUC_HIEN: "90 ngày",
                THOI_GIAN_TO_CHUC: "Quý IV/2025",
                GIA_GOI_THAU_SO: "120.000.000",
                GIA_GOI_THAU_CHU: "Một trăm hai mươi triệu đồng",
                GIA_TRI_HOP_DONG_SO: "115.000.000",
                GIA_TRI_HOP_DONG_CHU: "Một trăm mười lăm triệu đồng chẵn",
                GIA_TRI_GIAM_GIA: "5.000.000",
                CHI_PHI_TU_VAN: "35.000.000",
                KHO_BAC_NHA_NUOC: "Quận Hoàn Kiếm, TP. Hà Nội",
                TEN_NHA_THAU: "Công ty TNHH Giám sát Xây dựng Hà Thành",
                TEN_NHA_THAU_VIET_HOA: "CÔNG TY TNHH GIÁM SÁT XÂY DỰNG HÀ THÀNH",
                TEN_NHA_THAU_VIET_TAT: "Hà Thành",
                DAI_DIEN_NHA_THAU: "Đỗ Mạnh Cường",
                CHUC_VU_DAI_DIEN: "Giám đốc",
                DIA_CHI_NHA_THAU: "125 Nguyễn Du, Quận Hai Bà Trưng, TP. Hà Nội",
                MA_SO_THUE: "0109876543",
                SO_CONG_VAN_THAM_GIA: "315/CV-HT",
                SO_BIEN_BAN_HOAN_THIEN: "145/BB-BQLDA",
                SO_TO_TRINH: "146/TTr-ĐHDA",
                SO_QUYET_DINH: "147/QĐ-BQLDA",
                THOI_GIAN_HOP: "08 giờ 30 phút, ngày 15 tháng 07 năm 2025",
                DIA_DIEM_HOP: "Văn phòng Ban Quản lý dự án",
                NGAY_GIAY_MOI: "10/07/2025",
                NGAY_BIEN_BAN: "15/07/2025",
                NGAY_TO_TRINH: "16/07/2025",
                NGAY_QUYET_DINH: "18/07/2025"
            }
        }
    ];

    const generalFieldsList = [
        "TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH",
        "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "CAP_QUYET_DINH_DAU_TU",
        "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON",
        "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "TRUONG_BAN_DHDA", "CHUC_VU_TRUONG_BAN", "KE_TOAN_TRUONG", "CHUC_VU_KE_TOAN",
        "CAN_CU_PHAP_LY_CHUNG"
    ];

    // State
    let appState = {
        generalInfo: JSON.parse(JSON.stringify(defaultGeneralInfo)),
        packages: JSON.parse(JSON.stringify(defaultPackages)),
        activePackageIndex: 0,
        selectedProcurementTypeId: "chi_dinh_thau_rut_gon",
        activeDocId: "cdtrg_3",
        filterByDoc: true,
        onlyUnfilled: false
    };

    // Load from localStorage if present
    try {
        const saved = localStorage.getItem("ho_so_tu_dong_state_v3");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.packages && parsed.packages.length > 0) {
                appState = Object.assign(appState, parsed);
                if (appState.filterByDoc === undefined) {
                    appState.filterByDoc = true;
                }
            }
        } else {
            const oldSaved = localStorage.getItem("ho_so_tu_dong_state_v2");
            if (oldSaved) {
                const oldParsed = JSON.parse(oldSaved);
                if (oldParsed.packages && oldParsed.packages.length > 0) {
                    appState.generalInfo = oldParsed.generalInfo || appState.generalInfo;
                    appState.packages = oldParsed.packages || appState.packages;
                }
            }
        }
    } catch (e) {
        console.warn("Could not load from localStorage:", e);
    }

    function saveState() {
        try {
            localStorage.setItem("ho_so_tu_dong_state_v3", JSON.stringify(appState));
        } catch (e) {
            console.warn("Could not save state:", e);
        }
    }

    // -------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------
    const procurementTypeSelect = document.getElementById("procurementTypeSelect");
    const packageSelect = document.getElementById("packageSelect");
    const btnAddPackage = document.getElementById("btnAddPackage");
    const btnRenamePackage = document.getElementById("btnRenamePackage");
    const btnClearAll = document.getElementById("btnClearAll");
    const btnToggleAll = document.getElementById("btnToggleAll");
    const btnDownloadSample = document.getElementById("btnDownloadSample");
    const btnImportExcel = document.getElementById("btnImportExcel");
    const excelFileInput = document.getElementById("excelFileInput");
    const btnOpenExportModal = document.getElementById("btnOpenExportModal");
    const btnExportSingleDoc = document.getElementById("btnExportSingleDoc");
    const docTypeTabs = document.getElementById("docTypeTabs");
    const documentPreviewContent = document.getElementById("documentPreviewContent");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const progressPercent = document.getElementById("progressPercent");

    // Modal elements
    const batchExportModal = document.getElementById("batchExportModal");
    const btnCloseExportModal = document.getElementById("btnCloseExportModal");
    const btnCancelExport = document.getElementById("btnCancelExport");
    const batchPackagesList = document.getElementById("batchPackagesList");
    const batchDocumentsList = document.getElementById("batchDocumentsList");
    const batchSummaryText = document.getElementById("batchSummaryText");
    const btnConfirmExportZip = document.getElementById("btnConfirmExportZip");
    const btnExportZipText = document.getElementById("btnExportZipText");
    const modalProcurementSubtitle = document.getElementById("modalProcurementSubtitle");

    // Toast element
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMsg");
    const toastIcon = document.getElementById("toastIcon");

    function showToast(msg, type = "success") {
        toastMsg.textContent = msg;
        if (type === "success") {
            toastIcon.className = "fa-solid fa-circle-check text-emerald-400";
        } else if (type === "error") {
            toastIcon.className = "fa-solid fa-circle-exclamation text-rose-400";
        } else {
            toastIcon.className = "fa-solid fa-circle-info text-blue-400";
        }
        toast.classList.remove("translate-y-20", "opacity-0");
        setTimeout(() => {
            toast.classList.add("translate-y-20", "opacity-0");
        }, 3200);
    }

    // -------------------------------------------------------------
    // Procurement Matrix Helpers
    // -------------------------------------------------------------
    function getCurrentProcurementType() {
        const pt = PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === appState.selectedProcurementTypeId);
        return pt || PROCUREMENT_MATRIX.procurementTypes[3];
    }

    function getAllDocsForCurrentType() {
        const pt = getCurrentProcurementType();
        const docs = [];
        pt.phases.forEach(ph => {
            ph.documents.forEach(doc => {
                docs.push({
                    ...doc,
                    phaseName: ph.phaseName
                });
            });
        });
        return docs;
    }

    function getCurrentActiveDoc() {
        const docs = getAllDocsForCurrentType();
        let doc = docs.find(d => d.id === appState.activeDocId);
        if (!doc && docs.length > 0) {
            doc = docs[0];
            appState.activeDocId = doc.id;
        }
        return doc;
    }

    const prebuiltDocxMap = {
        "cdtrg_1": "templates/01_To_trinh_KHLCNT.docx",
        "d100_1": "templates/01_To_trinh_KHLCNT.docx",
        "cdtrg_2": "templates/02_Quyet_dinh_KHLCNT.docx",
        "d100_2": "templates/02_Quyet_dinh_KHLCNT.docx",
        "cdtrg_3": "templates/1_Giay_moi_tham_gia.docx",
        "cdtrg_4": "templates/2_Bien_ban_hoan_thien_hop_dong.docx",
        "cdtrg_5": "templates/3_To_trinh_chi_dinh_thau.docx",
        "cdtrg_6": "templates/4_Quyet_dinh_chi_dinh_thau.docx",
        "cdtrg_7": "templates/07_Hop_dong_kinh_te.docx",
        "d50_3": "templates/07_Hop_dong_kinh_te.docx",
        "d100_4": "templates/07_Hop_dong_kinh_te.docx",
        "cghc_9": "templates/07_Hop_dong_kinh_te.docx",
        "cdttt_12": "templates/07_Hop_dong_kinh_te.docx",
        "dtrr_23": "templates/07_Hop_dong_kinh_te.docx"
    };


    // -------------------------------------------------------------
    // Document Variable Mappings (Mapping biến xạ theo từng loại văn bản)
    // -------------------------------------------------------------
    const DOC_VAR_MAP = {
        // 1. Mua sắm < 50tr
        "d50_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_CONG_TRINH", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "NGUON_VON", "CHUC_VU_TRUONG_BAN", "TRUONG_BAN_DHDA", "CAN_CU_PHAP_LY_CHUNG"],
        "d50_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_CONG_TRINH", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "CAN_CU_PHAP_LY_CHUNG"],
        "d50_3": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "NGAY_QUYET_DINH"],
        "d50_4": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_BIEN_BAN", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "DAI_DIEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],

        // 2. Mua sắm 50tr - 100tr
        "d100_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "d100_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "d100_3": ["TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_BIEN_BAN", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "THOI_GIAN_THUC_HIEN", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],
        "d100_4": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN", "TEN_GOI_THAU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "KHO_BAC_NHA_NUOC", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY"],

        // 4. Chỉ định thầu rút gọn (Chuẩn)
        "cdtrg_1": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "cdtrg_2": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_DU_AN", "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT", "CAN_CU_PHAP_LY_CHUNG"],
        "cdtrg_3": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "NGAY_GIAY_MOI", "TEN_DU_AN", "TEN_GOI_THAU", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "THOI_GIAN_HOP", "DIA_DIEM_HOP", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT"],
        "cdtrg_4": ["TEN_BAN_QUAN_LY_DU_AN", "DIA_DANH", "TINH_THANH_PHO", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "NGAY_GIAY_MOI", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "THOI_GIAN_HOP", "DIA_DIEM_HOP", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "TRUONG_BAN_DHDA", "CHUC_VU_TRUONG_BAN", "KE_TOAN_TRUONG", "CHUC_VU_KE_TOAN", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "TEN_NHA_THAU_VIET_TAT", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "GIA_TRI_GIAM_GIA", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "KHO_BAC_NHA_NUOC"],
        "cdtrg_5": ["TEN_CHU_DAU_TU", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "SO_TO_TRINH", "NGAY_TO_TRINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "GIA_TRI_GIAM_GIA", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUON_VON", "CHUC_VU_TRUONG_BAN", "TRUONG_BAN_DHDA"],
        "cdtrg_6": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "CAN_CU_PHAP_LY_CHUNG", "SO_TO_TRINH", "NGAY_TO_TRINH", "CO_QUAN_TRINH", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "NGUON_VON", "KHO_BAC_NHA_NUOC", "CHUC_VU_NGUOI_KY", "NGUOI_KY_CDT"],
        "cdtrg_7": ["TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "DIA_DANH", "TINH_THANH_PHO", "TEN_DU_AN", "TEN_GOI_THAU", "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "DIA_DIEM_HOP", "NGUOI_KY_CDT", "CHUC_VU_NGUOI_KY", "DIA_CHI_TRU_SO", "KHO_BAC_NHA_NUOC", "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "TEN_NHA_THAU_VIET_TAT", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN", "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN"]
    };

    function getRelevantVarsForDoc(docId) {
        if (DOC_VAR_MAP[docId]) {
            return new Set(DOC_VAR_MAP[docId]);
        }
        const docs = getAllDocsForCurrentType();
        const doc = docs.find(d => d.id === docId);
        if (doc && Array.isArray(doc.requiredVars) && doc.requiredVars.length > 0) {
            return new Set(doc.requiredVars);
        }
        return new Set(commonGeneralKeys.concat(["TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO"]));
    }


    // -------------------------------------------------------------
    // Jump to Field & Missing Fields Tracking (Hỗ trợ định vị ô chưa điền)
    // -------------------------------------------------------------
    function jumpToField(fieldKey) {
        if (!fieldKey) return;
        const input = document.querySelector(`[data-field="${fieldKey}"]`) || document.querySelector(`[data-custom-field="${fieldKey}"]`);
        if (!input) {
            showToast(`Không tìm thấy trường: ${fieldKey}`, "error");
            return;
        }

        // Nếu trường này đang bị ẩn do đang lọc theo file khác, tự động chuyển sang chế độ hiển thị toàn bộ
        const wrapper = input.closest(".field-item");
        if (wrapper && wrapper.style.display === "none") {
            appState.filterByDoc = false;
            applyVariableFilter();
            showToast("Đã chuyển sang chế độ toàn bộ biến để điền trường này", "info");
        }

        // Mở Section chứa trường này nếu đang đóng
        const accordionItem = input.closest(".accordion-item");
        if (accordionItem) {
            accordionItem.style.display = "";
            const content = accordionItem.querySelector(".accordion-content");
            const chevron = accordionItem.querySelector(".accordion-header .fa-chevron-down");
            if (content && content.classList.contains("hidden")) {
                content.classList.remove("hidden");
                if (chevron) chevron.style.transform = "rotate(0deg)";
            }
        }

        // Đóng dropdown danh sách nếu đang mở
        const dropdown = document.getElementById("missingFieldsDropdown");
        if (dropdown) dropdown.classList.add("hidden");

        // Cuộn màn hình và focus mượt mà
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
            input.focus();
            input.classList.add("field-highlight-pulse");
            setTimeout(() => {
                input.classList.remove("field-highlight-pulse");
            }, 1800);
        }, 180);
    }

    function getUnfilledList() {
        const isFiltered = !!appState.filterByDoc;
        const activeDoc = getCurrentActiveDoc();
        const relevantVars = (isFiltered && activeDoc) ? getRelevantVarsForDoc(activeDoc.id) : null;

        const list = [];
        const allInputs = Array.from(document.querySelectorAll("[data-field]"));
        allInputs.forEach(input => {
            const key = input.getAttribute("data-field");
            if (isFiltered && relevantVars && !relevantVars.has(key)) return;

            if (input.value.trim() === "") {
                const sec = input.closest(".accordion-item");
                const secTitle = sec ? (sec.querySelector(".accordion-header span")?.textContent?.trim() || "") : "";
                const labelEl = input.closest(".field-item")?.querySelector(".field-label");
                const label = labelEl ? labelEl.textContent.replace("*", "").trim() : key;
                list.push({
                    key: key,
                    label: label,
                    section: secTitle,
                    input: input
                });
            }
        });
        return list;
    }

    function applyVariableFilter() {
        const activeDoc = getCurrentActiveDoc();
        const filterScopeBadge = document.getElementById("filterScopeBadge");
        const btnToggleScope = document.getElementById("btnToggleScope");
        const btnToggleScopeText = document.getElementById("btnToggleScopeText");
        const btnToggleScopeIcon = document.getElementById("btnToggleScopeIcon");

        const isFiltered = !!appState.filterByDoc;
        const relevantVars = (isFiltered && activeDoc) ? getRelevantVarsForDoc(activeDoc.id) : null;

        // Cập nhật nhãn trạng thái lọc trên thanh công cụ
        if (filterScopeBadge) {
            if (isFiltered && activeDoc) {
                filterScopeBadge.textContent = `File: ${activeDoc.code}`;
                filterScopeBadge.title = `Chỉ hiển thị các biến phục vụ file: ${activeDoc.name}`;
                filterScopeBadge.className = "bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.2 rounded text-[10px] truncate max-w-[170px]";
            } else {
                filterScopeBadge.textContent = "Toàn bộ dự án";
                filterScopeBadge.title = "Đang hiển thị tất cả các biến xạ của dự án";
                filterScopeBadge.className = "bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold px-1.5 py-0.2 rounded text-[10px] truncate max-w-[170px]";
            }
        }

        if (btnToggleScopeText) {
            btnToggleScopeText.textContent = isFiltered ? "Hiện tất cả biến" : "Chỉ biến theo file";
        }
        if (btnToggleScopeIcon) {
            btnToggleScopeIcon.className = isFiltered ? "fa-solid fa-layer-group text-indigo-600 text-[10px]" : "fa-solid fa-filter text-emerald-600 text-[10px]";
        }
        if (btnToggleScope) {
            btnToggleScope.title = isFiltered ? "Bấm để mở rộng hiển thị toàn bộ biến của dự án" : "Bấm để lọc gọn lại, chỉ hiển thị biến thuộc file đang chọn";
        }

        // Cập nhật trạng thái nút Lọc chỉ ô trống
        const btnFilterUnfilledOnly = document.getElementById("btnFilterUnfilledOnly");
        const btnFilterUnfilledText = document.getElementById("btnFilterUnfilledText");
        const isOnlyUnfilled = !!appState.onlyUnfilled;
        if (btnFilterUnfilledOnly && btnFilterUnfilledText) {
            if (isOnlyUnfilled) {
                btnFilterUnfilledOnly.className = "px-2 py-0.5 text-[10.5px] font-bold rounded border transition-all flex items-center space-x-1 bg-amber-500 text-white border-amber-600 shadow-xs h-6";
                btnFilterUnfilledText.textContent = "Hiện đủ các ô";
                btnFilterUnfilledOnly.title = "Bấm để quay lại hiển thị cả các ô đã điền";
            } else {
                btnFilterUnfilledOnly.className = "px-2 py-0.5 text-[10.5px] font-bold rounded border transition-all flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-2xs h-6";
                btnFilterUnfilledText.textContent = "Chỉ ô trống";
                btnFilterUnfilledOnly.title = "Bấm để chỉ hiển thị các trường còn trống chưa điền dữ liệu";
            }
        }

        // Ẩn / hiện từng trường nhập liệu .field-item
        const allFieldWrappers = document.querySelectorAll(".field-item");
        allFieldWrappers.forEach(wrapper => {
            const input = wrapper.querySelector("[data-field]");
            if (!input) return;
            const fieldKey = input.getAttribute("data-field");
            const isFilled = input.value.trim() !== "";

            let shouldShow = true;
            if (isFiltered && relevantVars && !relevantVars.has(fieldKey)) {
                shouldShow = false;
            }
            if (isOnlyUnfilled && isFilled) {
                shouldShow = false;
            }

            wrapper.style.display = shouldShow ? "" : "none";
        });

        // Tối ưu các hàng đôi .grid.grid-cols-2 (nếu 1 cột bị ẩn thì cột còn lại dàn đều 100%)
        document.querySelectorAll(".accordion-content .grid.grid-cols-2").forEach(grid => {
            const items = Array.from(grid.children).filter(el => el.classList.contains("field-item"));
            if (items.length === 2) {
                const [item1, item2] = items;
                const vis1 = item1.style.display !== "none";
                const vis2 = item2.style.display !== "none";

                if (!vis1 && !vis2) {
                    grid.style.display = "none";
                } else {
                    grid.style.display = "";
                    if (vis1 && !vis2) {
                        item1.classList.add("col-span-2");
                    } else if (!vis1 && vis2) {
                        item2.classList.add("col-span-2");
                    } else {
                        item1.classList.remove("col-span-2");
                        item2.classList.remove("col-span-2");
                    }
                }
            }
        });

        // Ẩn các Accordion Section không có trường nào thuộc văn bản đang chọn
        const sections = document.querySelectorAll(".accordion-item");
        sections.forEach(sec => {
            if (sec.id === "secCustomVariables") return;

            const secInputs = Array.from(sec.querySelectorAll("[data-field]")).filter(inp => {
                const item = inp.closest(".field-item");
                return !item || item.style.display !== "none";
            });

            if (isFiltered && secInputs.length === 0) {
                sec.style.display = "none";
            } else {
                sec.style.display = "";
                // Tự động mở rộng các Section đang có trường hiển thị để tiện nhập liệu
                if (isFiltered) {
                    const content = sec.querySelector(".accordion-content");
                    const chevron = sec.querySelector(".accordion-header .fa-chevron-down");
                    if (content && content.classList.contains("hidden")) {
                        content.classList.remove("hidden");
                        if (chevron) chevron.style.transform = "rotate(0deg)";
                    }
                }
            }
        });

        // Cập nhật lại thanh tiến độ và các badge
        updateProgress();
    }

    // -------------------------------------------------------------
    // Populate Procurement Type Dropdown & Doc Tabs
    // -------------------------------------------------------------
    function initProcurementTypeSelector() {
        if (!procurementTypeSelect) return;
        procurementTypeSelect.innerHTML = "";

        PROCUREMENT_MATRIX.procurementTypes.forEach(pt => {
            const opt = document.createElement("option");
            opt.value = pt.id;
            opt.textContent = `${pt.name}`;
            if (pt.id === appState.selectedProcurementTypeId) {
                opt.selected = true;
            }
            procurementTypeSelect.appendChild(opt);
        });

        procurementTypeSelect.addEventListener("change", (e) => {
            appState.selectedProcurementTypeId = e.target.value;
            const docs = getAllDocsForCurrentType();
            if (docs.length > 0) {
                appState.activeDocId = docs[0].id;
            }
            saveState();
            renderDocTabs();
            renderDocumentPreview();
            applyVariableFilter();
            showToast(`Đã chuyển quy trình: ${getCurrentProcurementType().name}`);
        });
    }

    function renderDocTabs() {
        if (!docTypeTabs) return;
        docTypeTabs.innerHTML = "";
        const docs = getAllDocsForCurrentType();

        if (!docs.some(d => d.id === appState.activeDocId)) {
            if (docs.length > 0) appState.activeDocId = docs[0].id;
        }

        docs.forEach(doc => {
            const btn = document.createElement("button");
            const isActive = doc.id === appState.activeDocId;
            btn.type = "button";
            btn.setAttribute("data-doc-id", doc.id);
            btn.className = `tab-btn px-2 py-0.5 text-[11px] rounded transition-all whitespace-nowrap ${isActive ? 'active shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'}`;
            btn.title = `${doc.name} (${doc.desc || ''})`;
            btn.innerHTML = `<span class="font-bold">${doc.code}</span>`;

            btn.addEventListener("click", () => {
                document.querySelectorAll("#docTypeTabs .tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                appState.activeDocId = doc.id;
                saveState();
                renderDocumentPreview();
                applyVariableFilter();
            });

            docTypeTabs.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // Render Custom Variables from Template Studio
    // -------------------------------------------------------------
    function renderCustomVariablesUI() {
        const customVarsJson = localStorage.getItem("ho_so_custom_variables");
        const customSection = document.getElementById("customVariablesSection");
        const customContainer = document.getElementById("customVariablesContainer");
        const customBadge = document.getElementById("customVarsBadge");
        if (!customSection || !customContainer) return;

        if (!customVarsJson) {
            customSection.classList.add("hidden");
            return;
        }

        try {
            const customVars = JSON.parse(customVarsJson);
            if (!Array.isArray(customVars) || customVars.length === 0) {
                customSection.classList.add("hidden");
                return;
            }

            customSection.classList.remove("hidden");
            if (customBadge) customBadge.textContent = `${customVars.length} biến`;
            customContainer.innerHTML = "";

            customVars.forEach(v => {
                if (v.targetSheet === "Thông tin chung" && !generalFieldsList.includes(v.key)) {
                    generalFieldsList.push(v.key);
                }

                const div = document.createElement("div");
                div.className = "space-y-0.5";
                div.innerHTML = `
                    <div class="flex items-center justify-between">
                        <label class="field-label">${v.label} <span class="text-indigo-500 font-mono text-[9px]">({{${v.key}}})</span></label>
                        <span class="text-[9px] bg-indigo-50 text-indigo-700 px-1 py-0.2 rounded">${v.targetSheet || "Từng gói thầu"}</span>
                    </div>
                    <input type="text" data-field="${v.key}" placeholder="VD: ${v.value || ''}" class="w-full text-xs px-2 py-0.5 h-6 border rounded border-indigo-200 focus:ring-1 focus:ring-emerald-500 bg-white text-slate-800">
                `;
                customContainer.appendChild(div);
            });
        } catch (e) {
            console.warn("Could not render custom variables:", e);
        }
    }

    function renderPackageDropdown() {
        packageSelect.innerHTML = "";
        appState.packages.forEach((pkg, idx) => {
            const opt = document.createElement("option");
            opt.value = idx;
            opt.textContent = `Gói ${idx + 1}: ${pkg.name}`;
            if (idx === appState.activePackageIndex) opt.selected = true;
            packageSelect.appendChild(opt);
        });
    }

    // -------------------------------------------------------------
    // Populate Form Inputs from Current State
    // -------------------------------------------------------------
    function populateFormInputs() {
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        const inputs = document.querySelectorAll("[data-field]");

        inputs.forEach(input => {
            const field = input.getAttribute("data-field");
            if (generalFieldsList.includes(field)) {
                input.value = appState.generalInfo[field] || "";
            } else {
                input.value = currentPkg.fields[field] || "";
            }
        });

        updateProgress();
        renderDocumentPreview();
        applyVariableFilter();
    }

    // Handle input change
    document.getElementById("formAccordionContainer").addEventListener("input", function (e) {
        const input = e.target.closest("[data-field]");
        if (!input) return;

        const field = input.getAttribute("data-field");
        const val = input.value;

        if (generalFieldsList.includes(field)) {
            appState.generalInfo[field] = val;
        } else {
            const currentPkg = appState.packages[appState.activePackageIndex];
            if (currentPkg) {
                currentPkg.fields[field] = val;
                if (field === "TEN_GOI_THAU" && val.trim()) {
                    currentPkg.name = val.split(" ").slice(0, 4).join(" ");
                    renderPackageDropdown();
                }
            }
        }

        saveState();
        updateProgress();
        renderDocumentPreview();
        applyVariableFilter();
    });

    // -------------------------------------------------------------
    // Calculate Progress Bar & Badges
    // -------------------------------------------------------------
    function updateProgress() {
        const isFiltered = !!appState.filterByDoc;
        const activeDoc = getCurrentActiveDoc();

        const allInputs = Array.from(document.querySelectorAll("[data-field]"));
        const targetInputs = isFiltered
            ? allInputs.filter(inp => {
                const item = inp.closest(".field-item");
                return !item || item.style.display !== "none" || (appState.onlyUnfilled && inp.value.trim() === "");
              })
            : allInputs;

        let totalCount = targetInputs.length;
        let filledCount = 0;
        const unfilledList = [];

        allInputs.forEach(input => {
            const val = input.value.trim();
            const key = input.getAttribute("data-field");
            const labelEl = input.closest(".field-item")?.querySelector(".field-label");
            const label = labelEl ? labelEl.textContent.replace("*", "").trim() : key;
            const sec = input.closest(".accordion-item");
            const secTitle = sec ? (sec.querySelector(".accordion-header span")?.textContent?.trim() || "") : "";

            if (val !== "") {
                if (targetInputs.includes(input)) filledCount++;
                input.classList.remove("border-amber-400", "bg-amber-50/25");
            } else {
                // Viền cảnh báo vàng hổ phách nhạt cho ô trống
                input.classList.add("border-amber-400", "bg-amber-50/25");
                if (targetInputs.includes(input)) {
                    unfilledList.push({ key, label, section: secTitle, input });
                }
            }
        });

        const percent = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
        const missingCount = totalCount - filledCount;

        if (isFiltered && activeDoc) {
            progressText.textContent = `Đã điền: ${filledCount}/${totalCount} (${activeDoc.code})`;
        } else {
            progressText.textContent = `Đã điền: ${filledCount}/${totalCount} (Cả dự án)`;
        }
        progressBar.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;

        // Cập nhật Nút bấm "Đi tới ô trống (X)"
        const btnJumpMissing = document.getElementById("btnJumpMissing");
        const btnJumpMissingText = document.getElementById("btnJumpMissingText");
        if (btnJumpMissing && btnJumpMissingText) {
            if (missingCount > 0) {
                btnJumpMissing.classList.remove("hidden");
                btnJumpMissingText.textContent = `Đi tới ô trống (${missingCount})`;
                btnJumpMissing.title = `Còn ${missingCount} ô chưa điền. Bấm để tự động di chuyển con trỏ tới ô tiếp theo`;
            } else {
                btnJumpMissing.classList.add("hidden");
            }
        }

        // Cập nhật Danh sách sổ xuống các ô chưa điền
        const missingListEl = document.getElementById("missingFieldsList");
        if (missingListEl) {
            if (unfilledList.length === 0) {
                missingListEl.innerHTML = `<div class="p-2 text-center text-emerald-700 font-bold"><i class="fa-solid fa-circle-check"></i> Đã điền đầy đủ 100%!</div>`;
            } else {
                missingListEl.innerHTML = "";
                unfilledList.forEach((item, idx) => {
                    const row = document.createElement("div");
                    row.className = "flex items-center justify-between p-1 bg-amber-50/50 hover:bg-amber-100 rounded border border-amber-200/60 cursor-pointer transition-colors";
                    row.innerHTML = `
                        <div class="min-w-0 pr-1">
                            <div class="font-bold text-slate-800 text-[11px] truncate">${idx + 1}. ${item.label}</div>
                            <div class="text-[9.5px] text-amber-800 truncate">${item.section || item.key}</div>
                        </div>
                        <button type="button" class="shrink-0 px-1.5 py-0.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-[9.5px] font-bold">Điền</button>
                    `;
                    row.addEventListener("click", () => {
                        jumpToField(item.key);
                    });
                    missingListEl.appendChild(row);
                });
            }
        }

        // Cập nhật Section Badges: Nếu còn thiếu thì hiển thị màu VÀNG HỔ PHÁCH CẢNH BÁO
        const sections = document.querySelectorAll(".accordion-item");
        sections.forEach(sec => {
            const badge = sec.querySelector(".sec-badge");
            if (!badge) return;
            const secInputs = Array.from(sec.querySelectorAll("[data-field]")).filter(inp => {
                if (!isFiltered) return true;
                const item = inp.closest(".field-item");
                return !item || item.style.display !== "none" || (appState.onlyUnfilled && inp.value.trim() === "");
            });
            let sFilled = 0;
            secInputs.forEach(inp => {
                if (inp.value.trim() !== "") sFilled++;
            });

            const sTotal = secInputs.length;
            const sMissing = sTotal - sFilled;

            if (sTotal === 0) {
                badge.textContent = `0/0`;
                badge.className = "sec-badge text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-medium";
            } else if (sFilled === sTotal) {
                badge.textContent = `${sFilled}/${sTotal}`;
                badge.className = "sec-badge text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold";
            } else {
                // Section còn thiếu: NỔI BẬT MÀU VÀNG HỔ PHÁCH KÈM ICON CẢNH BÁO
                badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-[9px] mr-0.5 text-amber-600"></i> ${sFilled}/${sTotal} (Thiếu ${sMissing})`;
                badge.className = "sec-badge text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded-full font-bold animate-pulse";
            }
        });
    }

    // -------------------------------------------------------------
    // Accordion expand / collapse
    // -------------------------------------------------------------
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const chevron = header.querySelector(".fa-chevron-down");
            if (content.classList.contains("hidden")) {
                content.classList.remove("hidden");
                if (chevron) chevron.style.transform = "rotate(0deg)";
            } else {
                content.classList.add("hidden");
                if (chevron) chevron.style.transform = "rotate(-90deg)";
            }
        });
    });


    // Button toggle giữa chế độ Lọc biến theo file vs Toàn bộ biến dự án

    // Nút Đi tới ô trống tiếp theo
    const btnJumpMissing = document.getElementById("btnJumpMissing");
    if (btnJumpMissing) {
        btnJumpMissing.addEventListener("click", () => {
            const unfilled = getUnfilledList();
            if (unfilled.length > 0) {
                jumpToField(unfilled[0].key);
            } else {
                showToast("Tất cả các trường đã được điền đủ 100%!", "success");
            }
        });
    }

    // Toggle Dropdown danh sách ô chưa điền
    const progressClickArea = document.getElementById("progressClickArea");
    const missingFieldsDropdown = document.getElementById("missingFieldsDropdown");
    const btnCloseMissingDropdown = document.getElementById("btnCloseMissingDropdown");

    if (progressClickArea && missingFieldsDropdown) {
        progressClickArea.addEventListener("click", (e) => {
            e.stopPropagation();
            missingFieldsDropdown.classList.toggle("hidden");
        });
    }
    if (btnCloseMissingDropdown && missingFieldsDropdown) {
        btnCloseMissingDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            missingFieldsDropdown.classList.add("hidden");
        });
    }
    document.addEventListener("click", (e) => {
        if (missingFieldsDropdown && !missingFieldsDropdown.contains(e.target) && !progressClickArea?.contains(e.target)) {
            missingFieldsDropdown.classList.add("hidden");
        }
    });

    // Nút Lọc chỉ ô trống
    const btnFilterUnfilledOnly = document.getElementById("btnFilterUnfilledOnly");
    if (btnFilterUnfilledOnly) {
        btnFilterUnfilledOnly.addEventListener("click", () => {
            appState.onlyUnfilled = !appState.onlyUnfilled;
            applyVariableFilter();
            showToast(appState.onlyUnfilled ? "Chế độ: Đang chỉ hiển thị các ô còn trống chưa điền" : "Đã hiển thị lại đầy đủ tất cả các ô");
        });
    }

    const btnToggleScope = document.getElementById("btnToggleScope");
    if (btnToggleScope) {
        btnToggleScope.addEventListener("click", () => {
            appState.filterByDoc = !appState.filterByDoc;
            saveState();
            applyVariableFilter();
            showToast(appState.filterByDoc ? "Đã lọc hiển thị biến theo văn bản đang xem" : "Đã hiển thị toàn bộ biến của dự án");
        });
    }

    let allOpen = true;
    btnToggleAll.addEventListener("click", () => {
        allOpen = !allOpen;
        document.querySelectorAll(".accordion-content").forEach(c => {
            if (allOpen) {
                c.classList.remove("hidden");
            } else {
                c.classList.add("hidden");
            }
        });
        document.querySelectorAll(".accordion-header .fa-chevron-down").forEach(ch => {
            ch.style.transform = allOpen ? "rotate(0deg)" : "rotate(-90deg)";
        });
        btnToggleAll.querySelector("span").textContent = allOpen ? "Mở tất cả" : "Thu gọn tất cả";
    });

    // -------------------------------------------------------------
    // Package Switcher & Management
    // -------------------------------------------------------------
    packageSelect.addEventListener("change", (e) => {
        appState.activePackageIndex = parseInt(e.target.value, 10);
        saveState();
        populateFormInputs();
    });

    btnAddPackage.addEventListener("click", () => {
        const count = appState.packages.length + 1;
        const newPkg = {
            id: `pkg-${Date.now()}`,
            name: `Gói thầu ${count}`,
            sheet_name: `Gói thầu ${count}`,
            fields: {
                TEN_GOI_THAU: `Gói thầu số ${count}`,
                HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                LOAI_HOP_DONG: "Trọn gói",
                THOI_GIAN_THUC_HIEN: "30 ngày",
                THOI_GIAN_TO_CHUC: "Quý IV/2025",
                GIA_GOI_THAU_SO: "",
                GIA_GOI_THAU_CHU: "",
                GIA_TRI_HOP_DONG_SO: "",
                GIA_TRI_HOP_DONG_CHU: "",
                GIA_TRI_GIAM_GIA: "",
                CHI_PHI_TU_VAN: "",
                KHO_BAC_NHA_NUOC: appState.packages[0]?.fields.KHO_BAC_NHA_NUOC || "",
                TEN_NHA_THAU: "",
                TEN_NHA_THAU_VIET_HOA: "",
                TEN_NHA_THAU_VIET_TAT: "",
                DAI_DIEN_NHA_THAU: "",
                CHUC_VU_DAI_DIEN: "Giám đốc",
                DIA_CHI_NHA_THAU: "",
                MA_SO_THUE: "",
                SO_CONG_VAN_THAM_GIA: "",
                SO_BIEN_BAN_HOAN_THIEN: "",
                SO_TO_TRINH: "",
                SO_QUYET_DINH: "",
                THOI_GIAN_HOP: "08 giờ 30 phút",
                DIA_DIEM_HOP: "Văn phòng Ban Quản lý dự án",
                NGAY_GIAY_MOI: "",
                NGAY_BIEN_BAN: "",
                NGAY_TO_TRINH: "",
                NGAY_QUYET_DINH: ""
            }
        };
        appState.packages.push(newPkg);
        appState.activePackageIndex = appState.packages.length - 1;
        saveState();
        renderPackageDropdown();
        populateFormInputs();
        showToast(`Đã thêm ${newPkg.name}`);
    });

    btnRenamePackage.addEventListener("click", () => {
        const currentPkg = appState.packages[appState.activePackageIndex];
        const newName = prompt("Nhập tên hiển thị cho gói thầu:", currentPkg.name);
        if (newName && newName.trim()) {
            currentPkg.name = newName.trim();
            saveState();
            renderPackageDropdown();
        }
    });

    btnClearAll.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu đang điền để nhập lại từ đầu?")) {
            localStorage.removeItem("ho_so_tu_dong_state_v3");
            for (let k in appState.generalInfo) appState.generalInfo[k] = "";
            appState.packages.forEach(p => {
                for (let fk in p.fields) p.fields[fk] = "";
            });
            saveState();
            populateFormInputs();
            showToast("Đã xóa trắng toàn bộ dữ liệu!", "info");
        }
    });

    // -------------------------------------------------------------
    // Live Document Preview Render (Administrative Standard Format)
    // -------------------------------------------------------------
    function getMergedData() {
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        return {
            ...appState.generalInfo,
            ...currentPkg.fields
        };
    }

    function valOrPlaceholder(key, data) {
        const val = data[key];
        if (val && String(val).trim() !== "") {
            return `<span class="filled-val">${val}</span>`;
        }
        return `<span class="placeholder-tag" data-missing-key="${key}" title="Bấm để nhảy tới ô nhập liệu ${key}"><i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${key}}</span>`;
    }

    function renderDocumentPreview() {
        const data = getMergedData();
        const activeDoc = getCurrentActiveDoc();
        if (!activeDoc) return;

        const docId = activeDoc.id;
        let html = "";

        const headerHtml = `
            <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                <div>
                    <div class="font-bold text-[11.5pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                    <div class="font-bold text-[10.5pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                    <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_TO_TRINH", data) || "....../VB"}</div>
                </div>
                <div>
                    <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                    <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                    <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_TO_TRINH", data) || "..... tháng ..... năm 202..."}</div>
                </div>
            </div>
        `;

        if (docId === "cdtrg_3") {
            // Giấy mời tham gia hoàn thiện hợp đồng
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[10.5pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[10.5pt]">Số: GM-BQLDA</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_GIAY_MOI", data)}</div>
                    </div>
                </div>

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">GIẤY MỜI</h2>
                    <p class="font-bold text-[12pt] text-slate-700">Tham gia hoàn thiện hợp đồng chỉ định thầu</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12pt]">
                    Kính gửi: ${valOrPlaceholder("TEN_NHA_THAU", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[12pt]">
                    <p class="indent-8">
                        Căn cứ Quyết định phê duyệt Kế hoạch lựa chọn nhà thầu dự án ${valOrPlaceholder("TEN_DU_AN", data)};
                    </p>
                    <p class="indent-8">
                        Hiện nay, ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} đang chuẩn bị tổ chức công tác chỉ định thầu cho gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b> thuộc dự án: <b>${valOrPlaceholder("TEN_DU_AN", data)}</b>.
                    </p>
                    <p class="indent-8">
                        Qua xem xét điều kiện năng lực và kinh nghiệm, Ban Quản lý dự án trân trọng kính mời đại diện có thẩm quyền của <b>${valOrPlaceholder("TEN_NHA_THAU", data)}</b> đến văn phòng để tham gia hoàn thiện các nội dung hợp đồng chỉ định thầu:
                    </p>
                    <div class="pl-8 space-y-1 my-3 text-[11pt]">
                        <p>• <b>Thời gian họp:</b> ${valOrPlaceholder("THOI_GIAN_HOP", data)}</p>
                        <p>• <b>Địa điểm:</b> ${valOrPlaceholder("DIA_DIEM_HOP", data)}</p>
                        <p>• <b>Nội dung:</b> Thống nhất các điều khoản hợp đồng gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                        <p>• <b>Thành phần tham gia:</b> Đại diện hợp pháp và cán bộ kỹ thuật phụ trách của đơn vị.</p>
                    </div>
                    <p class="indent-8">
                        Rất mong sự có mặt đúng giờ của Quý đơn vị để buổi làm việc đạt kết quả tốt đẹp./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như trên;</p>
                        <p>- Giám đốc (để b/c);</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (docId === "cdtrg_4") {
            // Biên bản hoàn thiện hợp đồng
            html = `
                <div class="text-center pb-2">
                    <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                    <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                    <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_BIEN_BAN", data)}</div>
                </div>

                <div class="text-center my-4">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">BIÊN BẢN HOÀN THIỆN HỢP ĐỒNG</h2>
                    <p class="font-bold text-[12pt] text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-600">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                    <p class="text-xs text-slate-500 mt-0.5">Số: ${valOrPlaceholder("SO_BIEN_BAN_HOAN_THIEN", data)}</p>
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}<br>
                        Căn cứ Giấy mời số GM-BQLDA ngày ${valOrPlaceholder("NGAY_GIAY_MOI", data)} của ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)};
                    </p>
                    <p>Hôm nay, vào hồi ${valOrPlaceholder("THOI_GIAN_HOP", data)}, tại ${valOrPlaceholder("DIA_DIEM_HOP", data)}, chúng tôi gồm có:</p>
                    
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-xs space-y-1">
                        <p class="font-bold text-slate-900 uppercase">I. ĐẠI DIỆN BÊN GIAO THẦU (BÊN A): ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</p>
                        <p>- Ông/Bà: <b>${valOrPlaceholder("NGUOI_KY_CDT", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p>- Ông/Bà: <b>${valOrPlaceholder("TRUONG_BAN_DHDA", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_TRUONG_BAN", data)}</p>
                        <p>- Ông/Bà: <b>${valOrPlaceholder("KE_TOAN_TRUONG", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_KE_TOAN", data)}</p>
                        
                        <p class="font-bold text-slate-900 uppercase mt-2">II. ĐẠI DIỆN BÊN NHẬN THẦU (BÊN B): ${valOrPlaceholder("TEN_NHA_THAU", data)}</p>
                        <p>- Ông/Bà: <b>${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_DAI_DIEN", data)}</p>
                        <p>- Địa chỉ: ${valOrPlaceholder("DIA_CHI_NHA_THAU", data)}</p>
                        <p>- Mã số thuế: ${valOrPlaceholder("MA_SO_THUE", data)}</p>
                    </div>

                    <p>Hai bên đã tiến hành rà soát và thống nhất các nội dung hoàn thiện hợp đồng như sau:</p>
                    <div class="pl-6 space-y-1 text-xs">
                        <p><b>1. Giá gói thầu phê duyệt:</b> ${valOrPlaceholder("GIA_GOI_THAU_SO", data)} đồng (<i>${valOrPlaceholder("GIA_GOI_THAU_CHU", data)}</i>).</p>
                        <p><b>2. Giá trị hợp đồng hoàn thiện:</b> <b class="text-emerald-700">${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} đồng</b> (<i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>).</p>
                        <p class="text-emerald-600"><i>(Giá trị tiết kiệm thông qua đàm phán, hoàn thiện: ${valOrPlaceholder("GIA_TRI_GIAM_GIA", data)} đồng)</i></p>
                        <p><b>3. Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p><b>4. Thời gian thực hiện:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                        <p><b>5. Phương thức thanh toán:</b> Chuyển khoản qua Kho bạc Nhà nước ${valOrPlaceholder("KHO_BAC_NHA_NUOC", data)}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">ĐẠI DIỆN BÊN B</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">ĐẠI DIỆN BÊN A</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (docId === "cdtrg_5" || docId === "d50_1" || docId === "cghc_1" || docId === "cdttt_9") {
            // Tờ trình kết quả chỉ định thầu
            html = `
                ${headerHtml}

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">TỜ TRÌNH</h2>
                    <p class="font-bold text-[12pt] text-slate-700">Về việc phê duyệt kết quả lựa chọn nhà thầu (chỉ định thầu)</p>
                    <p class="font-bold text-[11.5pt] mt-1 text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12pt]">
                    Kính gửi: Giám đốc ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP của Chính phủ về lựa chọn nhà thầu;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}<br>
                        Căn cứ Biên bản hoàn thiện hợp đồng số ${valOrPlaceholder("SO_BIEN_BAN_HOAN_THIEN", data)} ngày ${valOrPlaceholder("NGAY_BIEN_BAN", data)};
                    </p>
                    <p class="indent-8">
                        ${valOrPlaceholder("CO_QUAN_TRINH", data)} kính trình Giám đốc ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} xem xét, phê duyệt kết quả chỉ định thầu gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b> thuộc dự án <b>${valOrPlaceholder("TEN_DU_AN", data)}</b> với các nội dung chính:
                    </p>
                    <div class="pl-8 space-y-1 my-3 text-xs">
                        <p><b>1. Đơn vị đề nghị chỉ định thầu:</b> ${valOrPlaceholder("TEN_NHA_THAU", data)} (MST: ${valOrPlaceholder("MA_SO_THUE", data)}).</p>
                        <p><b>2. Giá gói thầu phê duyệt:</b> ${valOrPlaceholder("GIA_GOI_THAU_SO", data)} VNĐ (<i>${valOrPlaceholder("GIA_GOI_THAU_CHU", data)}</i>).</p>
                        <p><b>3. Giá đề nghị chỉ định thầu:</b> <b>${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} VNĐ</b> (<i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>).</p>
                        <p class="text-emerald-700"><i>(Tiết kiệm thông qua chỉ định thầu: ${valOrPlaceholder("GIA_TRI_GIAM_GIA", data)} VNĐ)</i></p>
                        <p><b>4. Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p><b>5. Thời gian thực hiện:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                        <p><b>6. Nguồn vốn:</b> ${valOrPlaceholder("NGUON_VON", data)}.</p>
                    </div>
                    <p class="indent-8">
                        Kính trình Giám đốc xem xét ban hành Quyết định phê duyệt để làm cơ sở ký kết hợp đồng./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như trên;</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">NGƯỜI TRÌNH</p>
                        <p class="text-xs italic">${valOrPlaceholder("CHUC_VU_TRUONG_BAN", data)}</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("TRUONG_BAN_DHDA", data)}</p>
                    </div>
                </div>
            `;
        } else if (docId === "cdtrg_6" || docId === "cdttt_11" || docId === "dtrr_21") {
            // Quyết định chỉ định thầu
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[10.5pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_QUYET_DINH", data)}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_QUYET_DINH", data)}</div>
                    </div>
                </div>

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">QUYẾT ĐỊNH</h2>
                    <p class="font-bold text-[12pt] text-slate-700">Về việc phê duyệt kết quả lựa chọn nhà thầu gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-600">Thuộc dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12.5pt] uppercase text-emerald-950">
                    GIÁM ĐỐC ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}<br>
                        Xét Tờ trình số ${valOrPlaceholder("SO_TO_TRINH", data)} ngày ${valOrPlaceholder("NGAY_TO_TRINH", data)} của ${valOrPlaceholder("CO_QUAN_TRINH", data)};
                    </p>

                    <p class="text-center font-bold text-xs uppercase my-2">QUYẾT ĐỊNH:</p>
                    <p class="indent-8">
                        <b>Điều 1.</b> Phê duyệt kết quả lựa chọn nhà thầu gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b> thuộc dự án <b>${valOrPlaceholder("TEN_DU_AN", data)}</b> với các nội dung sau:
                    </p>
                    <div class="pl-8 space-y-1 text-xs">
                        <p>1. Đơn vị trúng thầu: <b>${valOrPlaceholder("TEN_NHA_THAU_VIET_HOA", data)}</b>.</p>
                        <p>2. Giá trúng thầu: <b>${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} đồng</b> (<i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>).</p>
                        <p>3. Loại hợp đồng: ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p>4. Thời gian thực hiện hợp đồng: ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                        <p>5. Nguồn vốn: ${valOrPlaceholder("NGUON_VON", data)}.</p>
                    </div>

                    <p class="indent-8">
                        <b>Điều 2.</b> Giao ${valOrPlaceholder("CO_QUAN_TRINH", data)} chịu trách nhiệm phối hợp với nhà thầu hoàn thiện, ký kết và quản lý thực hiện hợp đồng theo đúng quy định hiện hành.
                    </p>
                    <p class="indent-8">
                        <b>Điều 3.</b> Quyết định này có hiệu lực kể từ ngày ký. Các bên liên quan chịu trách nhiệm thi hành Quyết định này./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như Điều 3;</p>
                        <p>- KBNN ${valOrPlaceholder("KHO_BAC_NHA_NUOC", data)};</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
                } else if (docId === "cdtrg_2" || docId === "d100_2") {
            // Quyết định phê duyệt Kế hoạch lựa chọn nhà thầu (02.QD-KHLCNT)
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[10.5pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_QUYET_DINH", data) || "....../QĐ-UBND"}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_QUYET_DINH", data) || "..... tháng ..... năm 202..."}</div>
                    </div>
                </div>

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">QUYẾT ĐỊNH</h2>
                    <p class="font-bold text-[12pt] text-slate-700">Về việc phê duyệt Kế hoạch lựa chọn nhà thầu</p>
                    <p class="font-bold text-[11.5pt] mt-1 text-emerald-800">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12.5pt] uppercase text-emerald-950">
                    ${valOrPlaceholder("CAP_QUYET_DINH_DAU_TU", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}<br>
                        Xét Tờ trình số ${valOrPlaceholder("SO_TO_TRINH", data)} ngày ${valOrPlaceholder("NGAY_TO_TRINH", data)} của ${valOrPlaceholder("CO_QUAN_TRINH", data) || valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)};
                    </p>

                    <p class="text-center font-bold text-xs uppercase my-2">QUYẾT ĐỊNH:</p>
                    <p class="indent-8">
                        <b>Điều 1.</b> Phê duyệt Kế hoạch lựa chọn nhà thầu cho dự án: <b>${valOrPlaceholder("TEN_DU_AN", data)}</b> với các nội dung chi tiết sau:
                    </p>
                    <div class="pl-8 space-y-1 text-xs">
                        <p>1. <b>Tên gói thầu:</b> ${valOrPlaceholder("TEN_GOI_THAU", data)}.</p>
                        <p>2. <b>Giá gói thầu:</b> <b>${valOrPlaceholder("GIA_GOI_THAU_SO", data)} đồng</b> (<i>${valOrPlaceholder("GIA_GOI_THAU_CHU", data)}</i>).</p>
                        <p>3. <b>Nguồn vốn:</b> ${valOrPlaceholder("NGUON_VON", data)}.</p>
                        <p>4. <b>Hình thức lựa chọn nhà thầu:</b> ${valOrPlaceholder("HINH_THUC_LCNT", data)}.</p>
                        <p>5. <b>Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p>6. <b>Thời gian bắt đầu tổ chức LCNT:</b> ${valOrPlaceholder("THOI_GIAN_TO_CHUC", data)}.</p>
                        <p>7. <b>Thời gian thực hiện gói thầu:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                    </div>

                    <p class="indent-8">
                        <b>Điều 2.</b> Giao cho ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} căn cứ Kế hoạch lựa chọn nhà thầu được duyệt tổ chức triển khai thực hiện các bước tiếp theo tuân thủ đúng quy định hiện hành của Nhà nước về đấu thầu.
                    </p>
                    <p class="indent-8">
                        <b>Điều 3.</b> Quyết định này có hiệu lực kể từ ngày ký. Chánh Văn phòng, Giám đốc ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} và Thủ trưởng các đơn vị liên quan chịu trách nhiệm thi hành Quyết định này./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như Điều 3;</p>
                        <p>- Lưu: VT, BQLDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (docId === "cdtrg_1" || docId === "d100_1") {
            // Tờ trình KHLCNT
            html = `
                ${headerHtml}

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">TỜ TRÌNH</h2>
                    <p class="font-bold text-[12pt] text-slate-700">Về việc đề nghị phê duyệt Kế hoạch lựa chọn nhà thầu</p>
                    <p class="font-bold text-[11.5pt] mt-1 text-emerald-800">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12pt]">
                    Kính gửi: ${valOrPlaceholder("CAP_QUYET_DINH_DAU_TU", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}
                    </p>
                    <p class="indent-8">
                        ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} kính trình Cấp quyết định đầu tư xem xét, phê duyệt Kế hoạch lựa chọn nhà thầu cho dự án: <b>${valOrPlaceholder("TEN_DU_AN", data)}</b> với gói thầu:
                    </p>
                    <div class="pl-8 space-y-1 my-3 text-xs">
                        <p>• <b>Tên gói thầu:</b> ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                        <p>• <b>Giá gói thầu:</b> ${valOrPlaceholder("GIA_GOI_THAU_SO", data)} đồng (<i>${valOrPlaceholder("GIA_GOI_THAU_CHU", data)}</i>)</p>
                        <p>• <b>Nguồn vốn:</b> ${valOrPlaceholder("NGUON_VON", data)}</p>
                        <p>• <b>Hình thức LCNT:</b> ${valOrPlaceholder("HINH_THUC_LCNT", data)}</p>
                        <p>• <b>Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}</p>
                        <p>• <b>Thời gian thực hiện:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}</p>
                    </div>
                    <p class="indent-8">
                        Kính trình xem xét, quyết định phê duyệt làm cơ sở triển khai các bước tiếp theo./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như kính gửi;</p>
                        <p>- Lưu: VT, BQLDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (docId === "cdtrg_7" || docId === "d50_3" || docId === "d100_4" || docId === "cghc_9" || docId === "cdttt_12" || docId === "dtrr_23") {
            // Hợp đồng kinh tế
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[10.5pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_QUYET_DINH", data)}/HĐ</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_QUYET_DINH", data)}</div>
                    </div>
                </div>

                <div class="text-center my-4">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">HỢP ĐỒNG KINH TẾ</h2>
                    <p class="font-bold text-[12pt] text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-600">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="space-y-2 leading-relaxed text-[11.5pt]">
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-xs space-y-1">
                        <p class="font-bold text-slate-900 uppercase">BÊN A (BÊN GIAO THẦU): ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</p>
                        <p>Đại diện: <b>${valOrPlaceholder("NGUOI_KY_CDT", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p>Địa chỉ: ${valOrPlaceholder("DIA_CHI_TRU_SO", data)}</p>
                        <p class="font-bold text-slate-900 uppercase mt-2">BÊN B (BÊN NHẬN THẦU): ${valOrPlaceholder("TEN_NHA_THAU", data)}</p>
                        <p>Đại diện: <b>${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_DAI_DIEN", data)}</p>
                        <p>Địa chỉ: ${valOrPlaceholder("DIA_CHI_NHA_THAU", data)} | MST: ${valOrPlaceholder("MA_SO_THUE", data)}</p>
                    </div>

                    <p class="indent-8 text-xs">
                        <b>Điều 1. Nội dung công việc:</b> Bên A giao và Bên B nhận thực hiện gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b>.
                    </p>
                    <p class="indent-8 text-xs">
                        <b>Điều 2. Giá trị hợp đồng:</b> <b>${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} VNĐ</b> (<i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>). Hình thức: ${valOrPlaceholder("LOAI_HOP_DONG", data)}.
                    </p>
                    <p class="indent-8 text-xs">
                        <b>Điều 3. Thời gian thực hiện:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-6 text-[11.5pt]">
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">ĐẠI DIỆN BÊN B</p>
                        <p class="text-xs italic">(Ký tên & đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">ĐẠI DIỆN BÊN A</p>
                        <p class="text-xs italic">(Ký tên & đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else {
            // General Blueprint for any other document in matrix
            html = `
                ${headerHtml}

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">${activeDoc.name.replace(/^[0-9]+\.\s*/, '')}</h2>
                    <p class="font-bold text-[11.5pt] text-slate-700">Mã hiệu: ${activeDoc.code} — ${activeDoc.desc || ''}</p>
                    <p class="font-bold text-[11pt] mt-1 text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-500">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="space-y-3 leading-relaxed text-[11.5pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}
                    </p>

                    <div class="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs space-y-1.5">
                        <div class="font-bold text-slate-900 border-b pb-1">THÔNG TIN HỒ SƠ & DỮ LIỆU ĐÃ NHẬP:</div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>• Đơn vị chủ đầu tư: ${valOrPlaceholder("TEN_CHU_DAU_TU", data)}</div>
                            <div>• Ban QLDA: ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                            <div>• Tên dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</div>
                            <div>• Tên gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</div>
                            <div>• Nhà thầu thực hiện: ${valOrPlaceholder("TEN_NHA_THAU", data)}</div>
                            <div>• Giá trị gói thầu: ${valOrPlaceholder("GIA_GOI_THAU_SO", data)} VNĐ</div>
                            <div>• Giá trị thực hiện: ${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} VNĐ</div>
                            <div>• Loại hợp đồng: ${valOrPlaceholder("LOAI_HOP_DONG", data)} (${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)})</div>
                        </div>
                    </div>

                    <div class="border-l-2 border-emerald-500 pl-3 py-1 bg-emerald-50/50 text-xs text-slate-700">
                        <p class="font-bold text-emerald-950">Nội dung văn bản theo quy chuẩn quản lý hồ sơ:</p>
                        <p class="mt-0.5">Văn bản này được tự động thiết lập và liên kết toàn diện với dữ liệu nhập từ form & file Excel mẫu. Khi xuất hàng loạt sang Word (.docx), hệ thống sẽ điền đầy đủ các thông số pháp lý và cấu trúc bảng biểu theo Nghị định 30/2020/NĐ-CP.</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 pt-8 text-[11.5pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như trên;</p>
                        <p>- Các bên liên quan;</p>
                        <p>- Lưu: VT, BQLDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12pt]">${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-14"></div>
                        <p class="font-bold text-[12.5pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        }

        documentPreviewContent.innerHTML = html;
    }

    // -------------------------------------------------------------
    // Excel Sample Generation & Import (SheetJS)
    // -------------------------------------------------------------
    btnDownloadSample.addEventListener("click", () => {
        window.location.href = "MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx";
    });

    btnImportExcel.addEventListener("click", () => {
        excelFileInput.click();
    });

    excelFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const fieldMapping = {
                    "Tên Chủ đầu tư (*)": "TEN_CHU_DAU_TU",
                    "Tên Chủ đầu tư": "TEN_CHU_DAU_TU",
                    "Tên Chủ đầu tư (IN HOA)": "TEN_CHU_DAU_TU_VIET_HOA",
                    "Tên Ban QLDA (*)": "TEN_BAN_QUAN_LY_DU_AN",
                    "Tên Ban QLDA": "TEN_BAN_QUAN_LY_DU_AN",
                    "Cơ quan trình quyết định": "CO_QUAN_TRINH",
                    "Địa danh phát hành văn bản (*)": "DIA_DANH",
                    "Địa danh phát hành văn bản": "DIA_DANH",
                    "Tỉnh / Thành phố": "TINH_THANH_PHO",
                    "Địa chỉ trụ sở CĐT": "DIA_CHI_TRU_SO",
                    "Cấp quyết định đầu tư": "CAP_QUYET_DINH_DAU_TU",
                    "Tên dự án (*)": "TEN_DU_AN",
                    "Tên dự án": "TEN_DU_AN",
                    "Tên công trình": "TEN_CONG_TRINH",
                    "Nguồn vốn": "NGUON_VON",
                    "Người ký quyết định CĐT (*)": "NGUOI_KY_CDT",
                    "Người ký quyết định CĐT": "NGUOI_KY_CDT",
                    "Chức vụ người ký CĐT": "CHUC_VU_NGUOI_KY",
                    "Trưởng ban Điều hành dự án": "TRUONG_BAN_DHDA",
                    "Chức vụ Trưởng ban ĐHDA": "CHUC_VU_TRUONG_BAN",
                    "Kế toán trưởng": "KE_TOAN_TRUONG",
                    "Chức vụ Kế toán trưởng": "CHUC_VU_KE_TOAN",
                    "Tên gói thầu (*)": "TEN_GOI_THAU",
                    "Tên gói thầu": "TEN_GOI_THAU",
                    "Hình thức LCNT": "HINH_THUC_LCNT",
                    "Loại hợp đồng": "LOAI_HOP_DONG",
                    "Thời gian thực hiện gói thầu": "THOI_GIAN_THUC_HIEN",
                    "Thời gian tổ chức LCNT": "THOI_GIAN_TO_CHUC",
                    "Giá gói thầu (số) (*)": "GIA_GOI_THAU_SO",
                    "Giá gói thầu (số)": "GIA_GOI_THAU_SO",
                    "Giá gói thầu (chữ) (*)": "GIA_GOI_THAU_CHU",
                    "Giá gói thầu (chữ)": "GIA_GOI_THAU_CHU",
                    "Giá trị hợp đồng (số)": "GIA_TRI_HOP_DONG_SO",
                    "Giá trị hợp đồng (chữ)": "GIA_TRI_HOP_DONG_CHU",
                    "Giá trị giảm giá": "GIA_TRI_GIAM_GIA",
                    "Chi phí tư vấn": "CHI_PHI_TU_VAN",
                    "Kho bạc Nhà nước": "KHO_BAC_NHA_NUOC",
                    "Tên nhà thầu (*)": "TEN_NHA_THAU",
                    "Tên nhà thầu": "TEN_NHA_THAU",
                    "Tên nhà thầu (IN HOA)": "TEN_NHA_THAU_VIET_HOA",
                    "Tên nhà thầu (viết tắt)": "TEN_NHA_THAU_VIET_TAT",
                    "Người đại diện nhà thầu": "DAI_DIEN_NHA_THAU",
                    "Chức vụ đại diện nhà thầu": "CHUC_VU_DAI_DIEN",
                    "Địa chỉ nhà thầu": "DIA_CHI_NHA_THAU",
                    "Mã số thuế nhà thầu": "MA_SO_THUE",
                    "Số công văn tham gia": "SO_CONG_VAN_THAM_GIA",
                    "Số biên bản hoàn thiện HĐ": "SO_BIEN_BAN_HOAN_THIEN",
                    "Số tờ trình chỉ định thầu": "SO_TO_TRINH",
                    "Số quyết định chỉ định thầu": "SO_QUYET_DINH",
                    "Thời gian họp hoàn thiện HĐ": "THOI_GIAN_HOP",
                    "Địa điểm họp hoàn thiện HĐ": "DIA_DIEM_HOP",
                    "Ngày giấy mời": "NGAY_GIAY_MOI",
                    "Ngày biên bản hoàn thiện HĐ": "NGAY_BIEN_BAN",
                    "Ngày tờ trình": "NGAY_TO_TRINH",
                    "Ngày quyết định": "NGAY_QUYET_DINH"
                };

                let newGeneralInfo = { ...appState.generalInfo };
                let newPackages = [];

                workbook.SheetNames.forEach((sheetName, sIdx) => {
                    const sheet = workbook.Sheets[sheetName];
                    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    if (sIdx === 0 || sheetName.includes("chung")) {
                        let canCuList = [];
                        rows.forEach(r => {
                            if (r && r[1] && r[2] !== undefined) {
                                const fieldLabel = String(r[1]).trim();
                                const val = String(r[2]).trim();
                                if (fieldMapping[fieldLabel]) {
                                    newGeneralInfo[fieldMapping[fieldLabel]] = val;
                                } else if (fieldLabel.startsWith("Căn cứ")) {
                                    canCuList.push(val);
                                }
                            }
                        });
                        if (canCuList.length > 0) {
                            newGeneralInfo.CAN_CU_PHAP_LY_CHUNG = canCuList.join("\n");
                        }
                    } else {
                        let pkgFields = {};
                        rows.forEach(r => {
                            if (r && r[1] && r[2] !== undefined) {
                                const fieldLabel = String(r[1]).trim();
                                const val = String(r[2]).trim();
                                if (fieldMapping[fieldLabel]) {
                                    pkgFields[fieldMapping[fieldLabel]] = val;
                                }
                            }
                        });

                        newPackages.push({
                            id: `pkg-${Date.now()}-${sIdx}`,
                            name: sheetName,
                            sheet_name: sheetName,
                            fields: pkgFields
                        });
                    }
                });

                if (newPackages.length > 0) {
                    appState.generalInfo = newGeneralInfo;
                    appState.packages = newPackages;
                    appState.activePackageIndex = 0;
                    saveState();
                    renderPackageDropdown();
                    populateFormInputs();
                    showToast(`Đã import thành công ${newPackages.length} gói thầu từ file Excel!`);
                } else {
                    showToast("Không tìm thấy dữ liệu gói thầu trong file!", "error");
                }
            } catch (err) {
                console.error("Excel import error:", err);
                showToast("Lỗi khi đọc file Excel!", "error");
            }
            excelFileInput.value = "";
        };
        reader.readAsArrayBuffer(file);
    });

    // -------------------------------------------------------------
    // Word (.docx) Generation & Replacement Helper
    // -------------------------------------------------------------
    function escapeXml(unsafe) {
        return String(unsafe || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")
            .replace(/\n/g, "</w:t><w:br/><w:t>");
    }

    async function renderDocxBlob(docId, replacements) {
        let templateUrl = prebuiltDocxMap[docId] || "templates/3_To_trinh_chi_dinh_thau.docx";
        const response = await fetch(templateUrl);
        if (!response.ok) throw new Error("Could not load template " + templateUrl);
        const arrayBuffer = await response.arrayBuffer();

        const zip = await JSZip.loadAsync(arrayBuffer);
        let docXml = await zip.file("word/document.xml").async("string");

        for (const [key, rawVal] of Object.entries(replacements)) {
            const val = escapeXml(rawVal);
            const tag1 = `{{${key}}}`;
            const tag2 = `{${key}}`;

            docXml = docXml.split(tag1).join(val);
            docXml = docXml.split(tag2).join(val);
        }

        zip.file("word/document.xml", docXml);
        return await zip.generateAsync({ type: "blob" });
    }

    // Single Word Export Button

    // Bấm vào biến còn thiếu trên bản xem trước A4 sẽ nhảy ngay đến ô nhập liệu bên trái
    if (documentPreviewContent) {
        documentPreviewContent.addEventListener("click", (e) => {
            const tag = e.target.closest(".placeholder-tag");
            if (!tag) return;
            const key = tag.getAttribute("data-missing-key") || tag.textContent.replace(/[{}]/g, "").trim();
            if (key) {
                jumpToField(key);
            }
        });
    }

        btnExportSingleDoc.addEventListener("click", async () => {
        const activeDoc = getCurrentActiveDoc();
        if (!activeDoc) return;

        const currentPkg = appState.packages[appState.activePackageIndex] || { name: "GoiThau" };
        try {
            btnExportSingleDoc.disabled = true;
            btnExportSingleDoc.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang xuất...</span>`;

            const data = getMergedData();
            const blob = await renderDocxBlob(activeDoc.id, data);
            const safeDocName = activeDoc.code.replace(/[^a-zA-Z0-9_-]/g, "_");
            const safePkgName = currentPkg.name.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_");
            const fileName = `${safeDocName}_${safePkgName}.docx`;

            saveAs(blob, fileName);
            showToast(`Đã xuất ${fileName} thành công!`);
        } catch (err) {
            console.error("Export doc error:", err);
            showToast("Lỗi khi xuất file docx: " + err.message, "error");
        } finally {
            btnExportSingleDoc.disabled = false;
            btnExportSingleDoc.innerHTML = `<i class="fa-solid fa-download"></i> <span>Xuất Word (.docx)</span>`;
        }
    });

    // -------------------------------------------------------------
    // Batch Export Modal Logic
    // -------------------------------------------------------------
    function updateBatchModalUI() {
        const pt = getCurrentProcurementType();
        if (modalProcurementSubtitle) {
            modalProcurementSubtitle.textContent = `Quy trình: ${pt.name}`;
        }

        batchPackagesList.innerHTML = "";
        appState.packages.forEach((pkg, idx) => {
            const label = document.createElement("label");
            label.className = "flex items-center space-x-2 cursor-pointer text-xs p-1 rounded hover:bg-slate-100 font-medium text-slate-800";
            label.innerHTML = `
                <input type="checkbox" checked value="${idx}" class="pkg-checkbox rounded text-emerald-600 focus:ring-emerald-500">
                <span>Gói ${idx + 1}: ${pkg.name}</span>
            `;
            batchPackagesList.appendChild(label);
        });

        batchDocumentsList.innerHTML = "";
        const docs = getAllDocsForCurrentType();
        docs.forEach(doc => {
            const label = document.createElement("label");
            label.className = "flex items-center space-x-1.5 cursor-pointer text-[11px] p-1 rounded hover:bg-slate-100 font-medium text-slate-800";
            label.innerHTML = `
                <input type="checkbox" checked value="${doc.id}" data-code="${doc.code}" data-name="${doc.name}" class="doc-checkbox rounded text-emerald-600 focus:ring-emerald-500">
                <span class="truncate" title="${doc.name}">${doc.code} - ${doc.name.replace(/^[0-9]+\.\s*/, '')}</span>
            `;
            batchDocumentsList.appendChild(label);
        });

        batchPackagesList.querySelectorAll(".pkg-checkbox").forEach(cb => cb.addEventListener("change", recalcBatchSummary));
        batchDocumentsList.querySelectorAll(".doc-checkbox").forEach(cb => cb.addEventListener("change", recalcBatchSummary));

        recalcBatchSummary();
    }

    function recalcBatchSummary() {
        const checkedPkgs = document.querySelectorAll(".pkg-checkbox:checked").length;
        const checkedDocs = document.querySelectorAll(".doc-checkbox:checked").length;
        const total = checkedPkgs * checkedDocs;

        batchSummaryText.textContent = `Đang chọn: ${checkedPkgs} gói thầu × ${checkedDocs} văn bản = ${total} file`;
        btnExportZipText.textContent = `Xuất ZIP (${total} file)`;
    }

    btnOpenExportModal.addEventListener("click", () => {
        updateBatchModalUI();
        batchExportModal.classList.remove("hidden");
    });

    btnCloseExportModal.addEventListener("click", () => batchExportModal.classList.add("hidden"));
    btnCancelExport.addEventListener("click", () => batchExportModal.classList.add("hidden"));

    // Batch Export ZIP action
    btnConfirmExportZip.addEventListener("click", async () => {
        const checkedPkgIndexes = Array.from(document.querySelectorAll(".pkg-checkbox:checked")).map(cb => parseInt(cb.value, 10));
        const checkedDocs = Array.from(document.querySelectorAll(".doc-checkbox:checked")).map(cb => ({
            id: cb.value,
            code: cb.getAttribute("data-code"),
            name: cb.getAttribute("data-name")
        }));

        if (checkedPkgIndexes.length === 0 || checkedDocs.length === 0) {
            alert("Vui lòng chọn ít nhất 1 gói thầu và 1 loại văn bản!");
            return;
        }

        try {
            btnConfirmExportZip.disabled = true;
            btnConfirmExportZip.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang đóng gói ZIP...</span>`;

            const zip = new JSZip();

            for (const pIdx of checkedPkgIndexes) {
                const pkg = appState.packages[pIdx];
                const folderName = `GoiThau_${String(pIdx + 1).padStart(2, '0')}_${(pkg.name || "GoiThau").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_")}`;
                const pkgFolder = zip.folder(folderName);

                const merged = {
                    ...appState.generalInfo,
                    ...pkg.fields
                };

                for (const doc of checkedDocs) {
                    const docBlob = await renderDocxBlob(doc.id, merged);
                    const safeFileName = `${doc.code.replace(/[^a-zA-Z0-9_-]/g, "_")}_${(doc.name || "VanBan").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_")}.docx`;
                    pkgFolder.file(safeFileName, docBlob);
                }
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            const projectName = (appState.generalInfo.TEN_DU_AN || "HoSo").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_");
            const zipFileName = `HoSo_${getCurrentProcurementType().code}_${projectName}.zip`;

            saveAs(zipBlob, zipFileName);
            batchExportModal.classList.add("hidden");
            showToast(`Đã xuất thành công ${checkedPkgIndexes.length * checkedDocs.length} văn bản vào ${zipFileName}!`);
        } catch (err) {
            console.error("Batch export error:", err);
            showToast("Lỗi khi xuất file ZIP: " + err.message, "error");
        } finally {
            btnConfirmExportZip.disabled = false;
            recalcBatchSummary();
        }
    });

    // -------------------------------------------------------------
    // Initial Boot Sequence
    // -------------------------------------------------------------
    initProcurementTypeSelector();
    renderDocTabs();
    renderCustomVariablesUI();
    renderPackageDropdown();
    populateFormInputs();
    applyVariableFilter();

})();
