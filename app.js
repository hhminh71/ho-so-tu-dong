// Tự Động Quản Lý & Xuất Hồ Sơ Mua Sắm, Xây Lắp - Core App Logic v3.0
(function () {
    // -------------------------------------------------------------
    // Master Procurement Matrix (Embedded + Async Sync)
    // -------------------------------------------------------------
    let PROCUREMENT_MATRIX = {"system": "Hệ thống Quản lý & Tự động xuất Hồ sơ Mua sắm, Xây lắp", "version": "3.0", "legalBases": ["Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023", "Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ", "Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 về công tác văn thư"], "procurementTypes": [{"id": "duoi_50_trieu", "code": "D50", "name": "1. Mua sắm siêu rút gọn (Dưới 50 triệu)", "badge": "< 50 triệu", "badgeColor": "emerald", "description": "Áp dụng mua sắm tài sản, thiết bị, sửa chữa thường xuyên dưới 50 triệu đồng theo dự toán nội bộ.", "threshold": 50000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d50_1", "code": "01.TTr-MS", "name": "01. Tờ trình phê duyệt chủ trương và dự toán", "desc": "Tờ trình đơn vị đề xuất mua sắm hàng hóa / sửa chữa", "requiredVars": ["TEN_DON_VI", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_HANG_MUC", "LY_DO_MUA_SAM", "TONG_MUC_DAU_TU", "NGUON_VON", "TRUONG_DON_VI"]}, {"id": "d50_2", "code": "02.BC-MS", "name": "02. Báo cáo thẩm định & phê duyệt mua sắm", "desc": "Báo cáo phê duyệt kết quả mua sắm dưới 50 triệu", "requiredVars": ["TEN_DON_VI", "SO_BAO_CAO", "NGAY_BAO_CAO", "TEN_HANG_MUC", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_TRI_MUA_SAM", "NGUOI_PHE_DUYET"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Nghiệm thu", "documents": [{"id": "d50_3", "code": "03.HD-KT", "name": "03. Hợp đồng kinh tế / Đơn đặt hàng", "desc": "Hợp đồng mua bán hoặc sửa chữa", "requiredVars": ["TEN_DON_VI", "DAI_DIEN_BEN_A", "TEN_NHA_THAU", "DAI_DIEN_BEN_B", "GIA_TRI_HOP_DONG", "THOI_GIAN_THUC_HIEN"]}, {"id": "d50_4", "code": "04.BB-NT", "name": "04. Biên bản nghiệm thu bàn giao và thanh lý", "desc": "Biên bản bàn giao thiết bị / hoàn thành sửa chữa", "requiredVars": ["TEN_DON_VI", "TEN_NHA_THAU", "NGAY_NGHIEM_THU", "NOI_DUNG_CONG_VIEC", "GIA_TRI_QUYET_TOAN"]}]}]}, {"id": "duoi_100_trieu", "code": "D100", "name": "2. Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)", "badge": "50tr - 100tr", "badgeColor": "teal", "description": "Áp dụng chỉ định thầu siêu nhỏ không qua mạng theo Khoản 4 Điều 23 Luật Đấu thầu 2023.", "threshold": 100000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d100_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Tờ trình phê duyệt KHLCNT gói mua sắm thường xuyên", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU", "HINH_THUC_LCNT", "NGUOI_TRINH"]}, {"id": "d100_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt của Người có thẩm quyền", "requiredVars": ["TEN_CHU_DAU_TU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_GOI_THAU", "NGUOI_KY_CDT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Thanh lý", "documents": [{"id": "d100_3", "code": "03.BB-TT", "name": "03. Biên bản thương thảo hoàn thiện đơn hàng", "desc": "Biên bản thống nhất giá và tiến độ giao hàng", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_THUONG_THAO", "THOI_GIAN_GIAO_HANG"]}, {"id": "d100_4", "code": "04.HD-KT", "name": "04. Hợp đồng kinh tế và biên bản giao nhận", "desc": "Hợp đồng kinh tế trọn gói", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chao_gia_han_che", "code": "CGHC", "name": "3. Chào giá cạnh tranh hạn chế (Nội bộ)", "badge": "Chào giá NB", "badgeColor": "cyan", "description": "Gửi thư mời chào giá đến ít nhất 3 nhà thầu có năng lực để so sánh giá cạnh tranh.", "threshold": 500000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cghc_1", "code": "01.TTr-CT", "name": "01. Tờ trình phê duyệt chủ trương chào giá", "desc": "Tờ trình chủ trương mua sắm cạnh tranh", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "cghc_2", "code": "02.BC-MS", "name": "02. Báo cáo đề xuất phương án chào giá hạn chế", "desc": "Đề xuất danh sách ít nhất 3 nhà thầu", "requiredVars": ["TEN_CHU_DAU_TU", "DANH_SACH_3_NHA_THAU"]}, {"id": "cghc_3", "code": "03.TB-CG", "name": "03. Thư mời chào giá kèm bảng yêu cầu kỹ thuật", "desc": "Gửi các nhà thầu nộp thư báo giá", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_BAO_GIA", "YEU_CAU_KY_THUAT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Đánh giá & Trao thầu", "documents": [{"id": "cghc_4", "code": "04.BB-MT", "name": "04. Biên bản mở thư chào giá", "desc": "Biên bản mở niêm phong các báo giá", "requiredVars": ["THOI_GIAN_MO_THAU", "DANH_SACH_GIA_CHAO"]}, {"id": "cghc_5", "code": "05.BB-DG", "name": "05. Biên bản họp đánh giá so sánh báo giá", "desc": "So sánh kỹ thuật và đơn giá", "requiredVars": ["TO_CHUYEN_GIA", "DON_VI_GIA_THAP_NHAT"]}, {"id": "cghc_6", "code": "06.BB-TT", "name": "06. Biên bản thương thảo hợp đồng", "desc": "Thương thảo với đơn vị có giá tốt nhất", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_THUONG_THAO"]}, {"id": "cghc_7", "code": "07.BC-DG", "name": "07. Báo cáo đánh giá kết quả chào giá", "desc": "Báo cáo trình lãnh đạo phê duyệt", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_DE_NGHI"]}, {"id": "cghc_8", "code": "08.TB-KQ", "name": "08. Thông báo kết quả chào giá", "desc": "Thông báo gửi các đơn vị tham gia", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_TRUNG_THAU"]}, {"id": "cghc_9", "code": "09.HD-KT", "name": "09. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế ký kết", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU_TRUNG", "GIA_TRI_HOP_DONG"]}]}]}, {"id": "chi_dinh_thau_rut_gon", "code": "CDTRG", "name": "4. Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)", "badge": "CĐT Rút Gọn", "badgeColor": "emerald", "description": "Quy trình chuẩn theo Điều 78 Nghị định 24/2024/NĐ-CP (Tư vấn, Xây lắp, Hàng hóa).", "threshold": 1000000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cdtrg_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Trình cấp thẩm quyền phê duyệt KHLCNT", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO"]}, {"id": "cdtrg_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt KHLCNT", "requiredVars": ["SO_QUYET_DINH_KHLCNT", "NGAY_QUYET_DINH", "NGUOI_KY_CDT"]}, {"id": "cdtrg_3", "code": "03.GM-TT", "name": "03. Giấy mời tham gia hoàn thiện hợp đồng", "desc": "Gửi nhà thầu được chỉ định", "requiredVars": ["TEN_BAN_QUAN_LY_DU_AN", "TEN_NHA_THAU", "THOI_GIAN_HOP", "DIA_DIEM_HOP"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Hoàn thiện & Phê duyệt", "documents": [{"id": "cdtrg_4", "code": "04.BB-HT", "name": "04. Biên bản hoàn thiện hợp đồng", "desc": "Biên bản hoàn thiện điều khoản hợp đồng", "requiredVars": ["SO_BIEN_BAN_HOAN_THIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "DAI_DIEN_NHA_THAU"]}, {"id": "cdtrg_5", "code": "05.TTr-KQLCNT", "name": "05. Tờ trình phê duyệt kết quả chỉ định thầu", "desc": "Trình phê duyệt chỉ định thầu", "requiredVars": ["SO_TO_TRINH", "CO_QUAN_TRINH", "TRUONG_BAN_DHDA", "TEN_NHA_THAU"]}, {"id": "cdtrg_6", "code": "06.QD-KQLCNT", "name": "06. Quyết định phê duyệt kết quả chỉ định thầu", "desc": "Quyết định phê duyệt trúng thầu", "requiredVars": ["SO_QUYET_DINH", "NGUOI_KY_CDT", "GIA_TRI_HOP_DONG_SO", "THOI_GIAN_THUC_HIEN"]}, {"id": "cdtrg_7", "code": "07.HD-KT", "name": "07. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế chính thức", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chi_dinh_thau_thong_thuong", "code": "CDTTT", "name": "5. Chỉ định thầu quy trình thông thường (HSYC & HSĐX)", "badge": "CĐT Thông Thường", "badgeColor": "indigo", "description": "Áp dụng gói thầu cần lập Hồ sơ yêu cầu, đánh giá Hồ sơ đề xuất và thẩm định kết quả.", "threshold": 5000000000, "phases": [{"phaseId": "chuan_bi_hsyc", "phaseName": "Giai đoạn Chuẩn bị Hồ sơ yêu cầu", "documents": [{"id": "cdttt_1", "code": "01.QD-TCG", "name": "01. Quyết định thành lập Tổ chuyên gia & Tổ thẩm định", "desc": "Thành lập ban bệ tổ chức chỉ định thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "cdttt_2", "code": "02.TTr-HSYC", "name": "02. Tờ trình đề nghị phê duyệt Hồ sơ yêu cầu (E-HSYC)", "desc": "Trình duyệt E-HSYC", "requiredVars": ["TEN_GOI_THAU", "TIEU_CHUAN_DANH_GIA"]}, {"id": "cdttt_3", "code": "03.BC-TD-HSYC", "name": "03. Báo cáo thẩm định Hồ sơ yêu cầu", "desc": "Tổ thẩm định kiểm tra HSYC", "requiredVars": ["KET_QUA_THAM_DINH_HSYC"]}, {"id": "cdttt_4", "code": "04.QD-PD-HSYC", "name": "04. Quyết định phê duyệt Hồ sơ yêu cầu", "desc": "Ban hành HSYC chính thức", "requiredVars": ["SO_QD_HSYC", "NGAY_BAN_HANH"]}, {"id": "cdttt_5", "code": "05.TM-HSDX", "name": "05. Thư mời nộp Hồ sơ đề xuất", "desc": "Gửi đơn vị dự kiến chỉ định", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_HSDX"]}]}, {"phaseId": "danh_gia_trao_thau", "phaseName": "Giai đoạn Đánh giá & Phê duyệt kết quả", "documents": [{"id": "cdttt_6", "code": "06.BB-M-HSDX", "name": "06. Biên bản mở Hồ sơ đề xuất", "desc": "Mở hồ sơ đề xuất", "requiredVars": ["THOI_GIAN_MO_THAU"]}, {"id": "cdttt_7", "code": "07.BC-DG-HSDX", "name": "07. Báo cáo đánh giá Hồ sơ đề xuất", "desc": "Đánh giá năng lực, kinh nghiệm, tài chính", "requiredVars": ["KET_QUA_DANH_GIA"]}, {"id": "cdttt_8", "code": "08.BB-TT", "name": "08. Biên bản thương thảo hợp đồng", "desc": "Thương thảo hoàn thiện", "requiredVars": ["GIA_THUONG_THAO"]}, {"id": "cdttt_9", "code": "09.TTr-KQLCNT", "name": "09. Tờ trình đề nghị phê duyệt Kết quả chỉ định thầu", "desc": "Trình kết quả LCNT", "requiredVars": ["GIA_TRUNG_THAU_SO"]}, {"id": "cdttt_10", "code": "10.BC-TD-KQ", "name": "10. Báo cáo thẩm định Kết quả lựa chọn nhà thầu", "desc": "Thẩm định trước khi ký duyệt", "requiredVars": ["Y_KIEN_THAM_DINH"]}, {"id": "cdttt_11", "code": "11.QD-PD-KQ", "name": "11. Quyết định phê duyệt Kết quả chỉ định thầu", "desc": "Quyết định phê duyệt chính thức", "requiredVars": ["SO_QUYET_DINH"]}, {"id": "cdttt_12", "code": "12.HD-KT", "name": "12. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế", "requiredVars": ["GIA_TRI_HOP_DONG_SO"]}]}]}, {"id": "dau_thau_rong_rai_hh_xl", "code": "DTRR", "name": "6. Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)", "badge": "Đấu Thầu Rộng Rãi", "badgeColor": "rose", "description": "Đầy đủ 23 biểu mẫu theo chuẩn Hệ thống Mạng Đấu thầu Quốc gia qua 6 giai đoạn (từ chuẩn bị đến ký HĐ).", "threshold": 100000000000, "phases": [{"phaseId": "giai_doan_1_hsmt", "phaseName": "GĐ 1: Chuẩn bị Hồ sơ mời thầu (E-HSMT)", "documents": [{"id": "dtrr_1", "code": "01.QD-TL", "name": "01. Quyết định thành lập Tổ chuyên gia và Tổ thẩm định", "desc": "Thành lập tổ chấm thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "dtrr_2", "code": "02.BB-HOP-TCG", "name": "02. Biên bản họp Tổ chuyên gia thông qua dự thảo E-HSMT", "desc": "Họp rà soát tiêu chuẩn mời thầu", "requiredVars": ["NOI_DUNG_DU_THAO"]}, {"id": "dtrr_3", "code": "03.TTr-HSMT", "name": "03. Tờ trình đề nghị thẩm định, phê duyệt E-HSMT", "desc": "Trình thẩm định E-HSMT", "requiredVars": ["TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "dtrr_4", "code": "04.BB-HOP-TTD", "name": "04. Biên bản họp Tổ thẩm định E-HSMT", "desc": "Họp thẩm định E-HSMT", "requiredVars": ["KET_QUA_HOP_THAM_DINH"]}, {"id": "dtrr_5", "code": "05.BC-TD-HSMT", "name": "05. Báo cáo thẩm định E-HSMT", "desc": "Báo cáo thẩm định đạt yêu cầu", "requiredVars": ["KET_LUAN_THAM_DINH"]}, {"id": "dtrr_6", "code": "06.QD-PD-HSMT", "name": "06. Quyết định phê duyệt E-HSMT", "desc": "Phê duyệt để đăng tải mạng", "requiredVars": ["SO_QD_HSMT", "NGAY_KY"]}]}, {"phaseId": "giai_doan_2_to_chuc", "phaseName": "GĐ 2: Tổ chức Lựa chọn nhà thầu & Mở thầu", "documents": [{"id": "dtrr_7", "code": "07.TB-MT", "name": "07. Thông báo mời thầu (E-TBMT)", "desc": "Thông báo phát hành hồ sơ mời thầu", "requiredVars": ["SO_E_TBMT", "THOI_DIEM_DONG_THAU"]}, {"id": "dtrr_8", "code": "08.VB-LAM-RO", "name": "08. Văn bản làm rõ E-HSMT (nếu có)", "desc": "Giải đáp thắc mắc của nhà thầu", "requiredVars": ["NOI_DUNG_LAM_RO"]}, {"id": "dtrr_9", "code": "09.QD-SUA-DOI", "name": "09. Quyết định sửa đổi E-HSMT (nếu có)", "desc": "Điều chỉnh hồ sơ mời thầu", "requiredVars": ["NOI_DUNG_SUA_DOI"]}, {"id": "dtrr_10", "code": "10.BB-MO-THAU", "name": "10. Biên bản mở thầu điện tử", "desc": "Trích xuất danh sách nhà thầu dự thầu", "requiredVars": ["DANH_SACH_NHA_THAU_DU_THAU"]}]}, {"phaseId": "giai_doan_3_danh_gia", "phaseName": "GĐ 3: Đánh giá Hồ sơ dự thầu (E-HSDT)", "documents": [{"id": "dtrr_11", "code": "11.BB-HOP-PC", "name": "11. Biên bản họp Tổ chuyên gia phân công nhiệm vụ", "desc": "Phân công tổ viên chấm điểm", "requiredVars": ["PHAN_CONG_CHAM_THAU"]}, {"id": "dtrr_12", "code": "12.VB-LR-HSDT", "name": "12. Văn bản yêu cầu làm rõ E-HSDT (nếu có)", "desc": "Làm rõ hồ sơ dự thầu", "requiredVars": ["YEU_CAU_LAM_RO_HSDT"]}, {"id": "dtrr_13", "code": "13.BB-HOP-KQ", "name": "13. Biên bản họp Tổ chuyên gia thông qua kết quả chấm thầu", "desc": "Thống nhất xếp hạng nhà thầu", "requiredVars": ["XEP_HANG_NHA_THAU"]}, {"id": "dtrr_14", "code": "14.BC-DG-HSDT", "name": "14. Báo cáo đánh giá Hồ sơ dự thầu (E-HSDT)", "desc": "Báo cáo chấm thầu chính thức", "requiredVars": ["NHA_THAU_XEP_HANG_1"]}]}, {"phaseId": "giai_doan_4_thuong_thao", "phaseName": "GĐ 4: Thương thảo và Hoàn thiện hợp đồng", "documents": [{"id": "dtrr_15", "code": "15.GM-TT", "name": "15. Văn bản mời nhà thầu xếp hạng nhất vào thương thảo", "desc": "Mời thương thảo", "requiredVars": ["TEN_NHA_THAU_HANG_1", "LICH_THUONG_THAO"]}, {"id": "dtrr_16", "code": "16.BB-TT", "name": "16. Biên bản thương thảo hợp đồng", "desc": "Thương thảo các điều khoản", "requiredVars": ["GIA_THUONG_THAO_CUOI_CUNG"]}, {"id": "dtrr_17", "code": "17.BB-HT", "name": "17. Biên bản hoàn thiện hợp đồng", "desc": "Rà soát điều kiện hợp đồng", "requiredVars": ["GIA_TRI_HOP_DONG_THONG_NHAT"]}]}, {"phaseId": "giai_doan_5_phe_duyet", "phaseName": "GĐ 5: Thẩm định và Phê duyệt Kết quả LCNT", "documents": [{"id": "dtrr_18", "code": "18.TTr-KQLCNT", "name": "18. Tờ trình đề nghị thẩm định, phê duyệt Kết quả LCNT", "desc": "Trình phê duyệt trúng thầu", "requiredVars": ["TEN_DON_VI_TRUNG_THAU", "GIA_TRUNG_THAU"]}, {"id": "dtrr_19", "code": "19.BB-HOP-TTD", "name": "19. Biên bản họp Tổ thẩm định Kết quả LCNT", "desc": "Họp thẩm định kết quả", "requiredVars": ["Y_KIEN_TO_THAM_DINH"]}, {"id": "dtrr_20", "code": "20.BC-TD-KQ", "name": "20. Báo cáo thẩm định Kết quả LCNT", "desc": "Báo cáo thẩm định", "requiredVars": ["KET_LUAN_THAM_DINH_KQLCNT"]}, {"id": "dtrr_21", "code": "21.QD-PD-KQ", "name": "21. Quyết định phê duyệt Kết quả lựa chọn nhà thầu", "desc": "Quyết định phê duyệt trúng thầu chính thức", "requiredVars": ["SO_QUYET_DINH", "GIA_TRUNG_THAU_SO"]}]}, {"phaseId": "giai_doan_6_hop_dong", "phaseName": "GĐ 6: Công khai Kết quả & Ký kết Hợp đồng", "documents": [{"id": "dtrr_22", "code": "22.TB-KQ", "name": "22. Thông báo Kết quả lựa chọn nhà thầu", "desc": "Đăng tải kết quả trên mạng đấu thầu", "requiredVars": ["TEN_NHA_THAU_TRUNG_THAU"]}, {"id": "dtrr_23", "code": "23.HD-KT", "name": "23. Hợp đồng kinh tế chính thức (kèm phụ lục)", "desc": "Hợp đồng kinh tế xây lắp/mua sắm", "requiredVars": ["GIA_TRI_HOP_DONG", "BAO_DAM_THUC_HIEN_HD"]}]}]}]};
    const DEFAULT_PROCUREMENT_MATRIX = JSON.parse(JSON.stringify({"system": "Hệ thống Quản lý & Tự động xuất Hồ sơ Mua sắm, Xây lắp", "version": "3.0", "legalBases": ["Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023", "Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ", "Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 về công tác văn thư"], "procurementTypes": [{"id": "duoi_50_trieu", "code": "D50", "name": "1. Mua sắm siêu rút gọn (Dưới 50 triệu)", "badge": "< 50 triệu", "badgeColor": "emerald", "description": "Áp dụng mua sắm tài sản, thiết bị, sửa chữa thường xuyên dưới 50 triệu đồng theo dự toán nội bộ.", "threshold": 50000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d50_1", "code": "01.TTr-MS", "name": "01. Tờ trình phê duyệt chủ trương và dự toán", "desc": "Tờ trình đơn vị đề xuất mua sắm hàng hóa / sửa chữa", "requiredVars": ["TEN_DON_VI", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_HANG_MUC", "LY_DO_MUA_SAM", "TONG_MUC_DAU_TU", "NGUON_VON", "TRUONG_DON_VI"]}, {"id": "d50_2", "code": "02.BC-MS", "name": "02. Báo cáo thẩm định & phê duyệt mua sắm", "desc": "Báo cáo phê duyệt kết quả mua sắm dưới 50 triệu", "requiredVars": ["TEN_DON_VI", "SO_BAO_CAO", "NGAY_BAO_CAO", "TEN_HANG_MUC", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_TRI_MUA_SAM", "NGUOI_PHE_DUYET"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Nghiệm thu", "documents": [{"id": "d50_3", "code": "03.HD-KT", "name": "03. Hợp đồng kinh tế / Đơn đặt hàng", "desc": "Hợp đồng mua bán hoặc sửa chữa", "requiredVars": ["TEN_DON_VI", "DAI_DIEN_BEN_A", "TEN_NHA_THAU", "DAI_DIEN_BEN_B", "GIA_TRI_HOP_DONG", "THOI_GIAN_THUC_HIEN"]}, {"id": "d50_4", "code": "04.BB-NT", "name": "04. Biên bản nghiệm thu bàn giao và thanh lý", "desc": "Biên bản bàn giao thiết bị / hoàn thành sửa chữa", "requiredVars": ["TEN_DON_VI", "TEN_NHA_THAU", "NGAY_NGHIEM_THU", "NOI_DUNG_CONG_VIEC", "GIA_TRI_QUYET_TOAN"]}]}]}, {"id": "duoi_100_trieu", "code": "D100", "name": "2. Mua sắm thường xuyên 50tr - 100tr (Khoản 4 Điều 23)", "badge": "50tr - 100tr", "badgeColor": "teal", "description": "Áp dụng chỉ định thầu siêu nhỏ không qua mạng theo Khoản 4 Điều 23 Luật Đấu thầu 2023.", "threshold": 100000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d100_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Tờ trình phê duyệt KHLCNT gói mua sắm thường xuyên", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU", "HINH_THUC_LCNT", "NGUOI_TRINH"]}, {"id": "d100_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt của Người có thẩm quyền", "requiredVars": ["TEN_CHU_DAU_TU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_GOI_THAU", "NGUOI_KY_CDT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Thanh lý", "documents": [{"id": "d100_3", "code": "03.BB-TT", "name": "03. Biên bản thương thảo hoàn thiện đơn hàng", "desc": "Biên bản thống nhất giá và tiến độ giao hàng", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_THUONG_THAO", "THOI_GIAN_GIAO_HANG"]}, {"id": "d100_4", "code": "04.HD-KT", "name": "04. Hợp đồng kinh tế và biên bản giao nhận", "desc": "Hợp đồng kinh tế trọn gói", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chao_gia_han_che", "code": "CGHC", "name": "3. Chào giá cạnh tranh hạn chế (Nội bộ)", "badge": "Chào giá NB", "badgeColor": "cyan", "description": "Gửi thư mời chào giá đến ít nhất 3 nhà thầu có năng lực để so sánh giá cạnh tranh.", "threshold": 500000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cghc_1", "code": "01.TTr-CT", "name": "01. Tờ trình phê duyệt chủ trương chào giá", "desc": "Tờ trình chủ trương mua sắm cạnh tranh", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "cghc_2", "code": "02.BC-MS", "name": "02. Báo cáo đề xuất phương án chào giá hạn chế", "desc": "Đề xuất danh sách ít nhất 3 nhà thầu", "requiredVars": ["TEN_CHU_DAU_TU", "DANH_SACH_3_NHA_THAU"]}, {"id": "cghc_3", "code": "03.TB-CG", "name": "03. Thư mời chào giá kèm bảng yêu cầu kỹ thuật", "desc": "Gửi các nhà thầu nộp thư báo giá", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_BAO_GIA", "YEU_CAU_KY_THUAT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Đánh giá & Trao thầu", "documents": [{"id": "cghc_4", "code": "04.BB-MT", "name": "04. Biên bản mở thư chào giá", "desc": "Biên bản mở niêm phong các báo giá", "requiredVars": ["THOI_GIAN_MO_THAU", "DANH_SACH_GIA_CHAO"]}, {"id": "cghc_5", "code": "05.BB-DG", "name": "05. Biên bản họp đánh giá so sánh báo giá", "desc": "So sánh kỹ thuật và đơn giá", "requiredVars": ["TO_CHUYEN_GIA", "DON_VI_GIA_THAP_NHAT"]}, {"id": "cghc_6", "code": "06.BB-TT", "name": "06. Biên bản thương thảo hợp đồng", "desc": "Thương thảo với đơn vị có giá tốt nhất", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_THUONG_THAO"]}, {"id": "cghc_7", "code": "07.BC-DG", "name": "07. Báo cáo đánh giá kết quả chào giá", "desc": "Báo cáo trình lãnh đạo phê duyệt", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_DE_NGHI"]}, {"id": "cghc_8", "code": "08.TB-KQ", "name": "08. Thông báo kết quả chào giá", "desc": "Thông báo gửi các đơn vị tham gia", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_TRUNG_THAU"]}, {"id": "cghc_9", "code": "09.HD-KT", "name": "09. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế ký kết", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU_TRUNG", "GIA_TRI_HOP_DONG"]}]}]}, {"id": "chi_dinh_thau_rut_gon", "code": "CDTRG", "name": "4. Chỉ định thầu rút gọn (Tư vấn < 500tr; XL/HH < 1 tỷ)", "badge": "CĐT Rút Gọn", "badgeColor": "emerald", "description": "Quy trình chuẩn theo Điều 78 Nghị định 24/2024/NĐ-CP (Tư vấn, Xây lắp, Hàng hóa).", "threshold": 1000000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cdtrg_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Trình cấp thẩm quyền phê duyệt KHLCNT", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO"]}, {"id": "cdtrg_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt KHLCNT", "requiredVars": ["SO_QUYET_DINH_KHLCNT", "NGAY_QUYET_DINH", "NGUOI_KY_CDT"]}, {"id": "cdtrg_3", "code": "03.GM-TT", "name": "03. Giấy mời tham gia hoàn thiện hợp đồng", "desc": "Gửi nhà thầu được chỉ định", "requiredVars": ["TEN_BAN_QUAN_LY_DU_AN", "TEN_NHA_THAU", "THOI_GIAN_HOP", "DIA_DIEM_HOP"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Hoàn thiện & Phê duyệt", "documents": [{"id": "cdtrg_4", "code": "04.BB-HT", "name": "04. Biên bản hoàn thiện hợp đồng", "desc": "Biên bản hoàn thiện điều khoản hợp đồng", "requiredVars": ["SO_BIEN_BAN_HOAN_THIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "DAI_DIEN_NHA_THAU"]}, {"id": "cdtrg_5", "code": "05.TTr-KQLCNT", "name": "05. Tờ trình phê duyệt kết quả chỉ định thầu", "desc": "Trình phê duyệt chỉ định thầu", "requiredVars": ["SO_TO_TRINH", "CO_QUAN_TRINH", "TRUONG_BAN_DHDA", "TEN_NHA_THAU"]}, {"id": "cdtrg_6", "code": "06.QD-KQLCNT", "name": "06. Quyết định phê duyệt kết quả chỉ định thầu", "desc": "Quyết định phê duyệt trúng thầu", "requiredVars": ["SO_QUYET_DINH", "NGUOI_KY_CDT", "GIA_TRI_HOP_DONG_SO", "THOI_GIAN_THUC_HIEN"]}, {"id": "cdtrg_7", "code": "07.HD-KT", "name": "07. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế chính thức", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "KHO_BAC_NHA_NUOC"]}]}]}, {"id": "chi_dinh_thau_thong_thuong", "code": "CDTTT", "name": "5. Chỉ định thầu quy trình thông thường (HSYC & HSĐX)", "badge": "CĐT Thông Thường", "badgeColor": "indigo", "description": "Áp dụng gói thầu cần lập Hồ sơ yêu cầu, đánh giá Hồ sơ đề xuất và thẩm định kết quả.", "threshold": 5000000000, "phases": [{"phaseId": "chuan_bi_hsyc", "phaseName": "Giai đoạn Chuẩn bị Hồ sơ yêu cầu", "documents": [{"id": "cdttt_1", "code": "01.QD-TCG", "name": "01. Quyết định thành lập Tổ chuyên gia & Tổ thẩm định", "desc": "Thành lập ban bệ tổ chức chỉ định thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "cdttt_2", "code": "02.TTr-HSYC", "name": "02. Tờ trình đề nghị phê duyệt Hồ sơ yêu cầu (E-HSYC)", "desc": "Trình duyệt E-HSYC", "requiredVars": ["TEN_GOI_THAU", "TIEU_CHUAN_DANH_GIA"]}, {"id": "cdttt_3", "code": "03.BC-TD-HSYC", "name": "03. Báo cáo thẩm định Hồ sơ yêu cầu", "desc": "Tổ thẩm định kiểm tra HSYC", "requiredVars": ["KET_QUA_THAM_DINH_HSYC"]}, {"id": "cdttt_4", "code": "04.QD-PD-HSYC", "name": "04. Quyết định phê duyệt Hồ sơ yêu cầu", "desc": "Ban hành HSYC chính thức", "requiredVars": ["SO_QD_HSYC", "NGAY_BAN_HANH"]}, {"id": "cdttt_5", "code": "05.TM-HSDX", "name": "05. Thư mời nộp Hồ sơ đề xuất", "desc": "Gửi đơn vị dự kiến chỉ định", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_HSDX"]}]}, {"phaseId": "danh_gia_trao_thau", "phaseName": "Giai đoạn Đánh giá & Phê duyệt kết quả", "documents": [{"id": "cdttt_6", "code": "06.BB-M-HSDX", "name": "06. Biên bản mở Hồ sơ đề xuất", "desc": "Mở hồ sơ đề xuất", "requiredVars": ["THOI_GIAN_MO_THAU"]}, {"id": "cdttt_7", "code": "07.BC-DG-HSDX", "name": "07. Báo cáo đánh giá Hồ sơ đề xuất", "desc": "Đánh giá năng lực, kinh nghiệm, tài chính", "requiredVars": ["KET_QUA_DANH_GIA"]}, {"id": "cdttt_8", "code": "08.BB-TT", "name": "08. Biên bản thương thảo hợp đồng", "desc": "Thương thảo hoàn thiện", "requiredVars": ["GIA_THUONG_THAO"]}, {"id": "cdttt_9", "code": "09.TTr-KQLCNT", "name": "09. Tờ trình đề nghị phê duyệt Kết quả chỉ định thầu", "desc": "Trình kết quả LCNT", "requiredVars": ["GIA_TRUNG_THAU_SO"]}, {"id": "cdttt_10", "code": "10.BC-TD-KQ", "name": "10. Báo cáo thẩm định Kết quả lựa chọn nhà thầu", "desc": "Thẩm định trước khi ký duyệt", "requiredVars": ["Y_KIEN_THAM_DINH"]}, {"id": "cdttt_11", "code": "11.QD-PD-KQ", "name": "11. Quyết định phê duyệt Kết quả chỉ định thầu", "desc": "Quyết định phê duyệt chính thức", "requiredVars": ["SO_QUYET_DINH"]}, {"id": "cdttt_12", "code": "12.HD-KT", "name": "12. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế", "requiredVars": ["GIA_TRI_HOP_DONG_SO"]}]}]}, {"id": "dau_thau_rong_rai_hh_xl", "code": "DTRR", "name": "6. Đấu thầu rộng rãi qua mạng (E-HSMT Xây lắp & Mua sắm)", "badge": "Đấu Thầu Rộng Rãi", "badgeColor": "rose", "description": "Đầy đủ 23 biểu mẫu theo chuẩn Hệ thống Mạng Đấu thầu Quốc gia qua 6 giai đoạn (từ chuẩn bị đến ký HĐ).", "threshold": 100000000000, "phases": [{"phaseId": "giai_doan_1_hsmt", "phaseName": "GĐ 1: Chuẩn bị Hồ sơ mời thầu (E-HSMT)", "documents": [{"id": "dtrr_1", "code": "01.QD-TL", "name": "01. Quyết định thành lập Tổ chuyên gia và Tổ thẩm định", "desc": "Thành lập tổ chấm thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "dtrr_2", "code": "02.BB-HOP-TCG", "name": "02. Biên bản họp Tổ chuyên gia thông qua dự thảo E-HSMT", "desc": "Họp rà soát tiêu chuẩn mời thầu", "requiredVars": ["NOI_DUNG_DU_THAO"]}, {"id": "dtrr_3", "code": "03.TTr-HSMT", "name": "03. Tờ trình đề nghị thẩm định, phê duyệt E-HSMT", "desc": "Trình thẩm định E-HSMT", "requiredVars": ["TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "dtrr_4", "code": "04.BB-HOP-TTD", "name": "04. Biên bản họp Tổ thẩm định E-HSMT", "desc": "Họp thẩm định E-HSMT", "requiredVars": ["KET_QUA_HOP_THAM_DINH"]}, {"id": "dtrr_5", "code": "05.BC-TD-HSMT", "name": "05. Báo cáo thẩm định E-HSMT", "desc": "Báo cáo thẩm định đạt yêu cầu", "requiredVars": ["KET_LUAN_THAM_DINH"]}, {"id": "dtrr_6", "code": "06.QD-PD-HSMT", "name": "06. Quyết định phê duyệt E-HSMT", "desc": "Phê duyệt để đăng tải mạng", "requiredVars": ["SO_QD_HSMT", "NGAY_KY"]}]}, {"phaseId": "giai_doan_2_to_chuc", "phaseName": "GĐ 2: Tổ chức Lựa chọn nhà thầu & Mở thầu", "documents": [{"id": "dtrr_7", "code": "07.TB-MT", "name": "07. Thông báo mời thầu (E-TBMT)", "desc": "Thông báo phát hành hồ sơ mời thầu", "requiredVars": ["SO_E_TBMT", "THOI_DIEM_DONG_THAU"]}, {"id": "dtrr_8", "code": "08.VB-LAM-RO", "name": "08. Văn bản làm rõ E-HSMT (nếu có)", "desc": "Giải đáp thắc mắc của nhà thầu", "requiredVars": ["NOI_DUNG_LAM_RO"]}, {"id": "dtrr_9", "code": "09.QD-SUA-DOI", "name": "09. Quyết định sửa đổi E-HSMT (nếu có)", "desc": "Điều chỉnh hồ sơ mời thầu", "requiredVars": ["NOI_DUNG_SUA_DOI"]}, {"id": "dtrr_10", "code": "10.BB-MO-THAU", "name": "10. Biên bản mở thầu điện tử", "desc": "Trích xuất danh sách nhà thầu dự thầu", "requiredVars": ["DANH_SACH_NHA_THAU_DU_THAU"]}]}, {"phaseId": "giai_doan_3_danh_gia", "phaseName": "GĐ 3: Đánh giá Hồ sơ dự thầu (E-HSDT)", "documents": [{"id": "dtrr_11", "code": "11.BB-HOP-PC", "name": "11. Biên bản họp Tổ chuyên gia phân công nhiệm vụ", "desc": "Phân công tổ viên chấm điểm", "requiredVars": ["PHAN_CONG_CHAM_THAU"]}, {"id": "dtrr_12", "code": "12.VB-LR-HSDT", "name": "12. Văn bản yêu cầu làm rõ E-HSDT (nếu có)", "desc": "Làm rõ hồ sơ dự thầu", "requiredVars": ["YEU_CAU_LAM_RO_HSDT"]}, {"id": "dtrr_13", "code": "13.BB-HOP-KQ", "name": "13. Biên bản họp Tổ chuyên gia thông qua kết quả chấm thầu", "desc": "Thống nhất xếp hạng nhà thầu", "requiredVars": ["XEP_HANG_NHA_THAU"]}, {"id": "dtrr_14", "code": "14.BC-DG-HSDT", "name": "14. Báo cáo đánh giá Hồ sơ dự thầu (E-HSDT)", "desc": "Báo cáo chấm thầu chính thức", "requiredVars": ["NHA_THAU_XEP_HANG_1"]}]}, {"phaseId": "giai_doan_4_thuong_thao", "phaseName": "GĐ 4: Thương thảo và Hoàn thiện hợp đồng", "documents": [{"id": "dtrr_15", "code": "15.GM-TT", "name": "15. Văn bản mời nhà thầu xếp hạng nhất vào thương thảo", "desc": "Mời thương thảo", "requiredVars": ["TEN_NHA_THAU_HANG_1", "LICH_THUONG_THAO"]}, {"id": "dtrr_16", "code": "16.BB-TT", "name": "16. Biên bản thương thảo hợp đồng", "desc": "Thương thảo các điều khoản", "requiredVars": ["GIA_THUONG_THAO_CUOI_CUNG"]}, {"id": "dtrr_17", "code": "17.BB-HT", "name": "17. Biên bản hoàn thiện hợp đồng", "desc": "Rà soát điều kiện hợp đồng", "requiredVars": ["GIA_TRI_HOP_DONG_THONG_NHAT"]}]}, {"phaseId": "giai_doan_5_phe_duyet", "phaseName": "GĐ 5: Thẩm định và Phê duyệt Kết quả LCNT", "documents": [{"id": "dtrr_18", "code": "18.TTr-KQLCNT", "name": "18. Tờ trình đề nghị thẩm định, phê duyệt Kết quả LCNT", "desc": "Trình phê duyệt trúng thầu", "requiredVars": ["TEN_DON_VI_TRUNG_THAU", "GIA_TRUNG_THAU"]}, {"id": "dtrr_19", "code": "19.BB-HOP-TTD", "name": "19. Biên bản họp Tổ thẩm định Kết quả LCNT", "desc": "Họp thẩm định kết quả", "requiredVars": ["Y_KIEN_TO_THAM_DINH"]}, {"id": "dtrr_20", "code": "20.BC-TD-KQ", "name": "20. Báo cáo thẩm định Kết quả LCNT", "desc": "Báo cáo thẩm định", "requiredVars": ["KET_LUAN_THAM_DINH_KQLCNT"]}, {"id": "dtrr_21", "code": "21.QD-PD-KQ", "name": "21. Quyết định phê duyệt Kết quả lựa chọn nhà thầu", "desc": "Quyết định phê duyệt trúng thầu chính thức", "requiredVars": ["SO_QUYET_DINH", "GIA_TRUNG_THAU_SO"]}]}, {"phaseId": "giai_doan_6_hop_dong", "phaseName": "GĐ 6: Công khai Kết quả & Ký kết Hợp đồng", "documents": [{"id": "dtrr_22", "code": "22.TB-KQ", "name": "22. Thông báo Kết quả lựa chọn nhà thầu", "desc": "Đăng tải kết quả trên mạng đấu thầu", "requiredVars": ["TEN_NHA_THAU_TRUNG_THAU"]}, {"id": "dtrr_23", "code": "23.HD-KT", "name": "23. Hợp đồng kinh tế chính thức (kèm phụ lục)", "desc": "Hợp đồng kinh tế xây lắp/mua sắm", "requiredVars": ["GIA_TRI_HOP_DONG", "BAO_DAM_THUC_HIEN_HD"]}]}]}]}));

    // -------------------------------------------------------------
    // Implementation Matrix (Quy trình Triển khai dự án)
    // -------------------------------------------------------------
    const DEFAULT_IMPLEMENTATION_MATRIX = {
        "version": "1.0",
        "implementationTypes": [
            {
                "id": "trien_khai_sua_chua",
                "name": "1. Triển khai hồ sơ sửa chữa",
                "code": "TK-SC",
                "description": "Áp dụng cho các dự án sửa chữa, bảo trì, khắc phục hư hỏng",
                "documents": [
                    { "id": "tk_sc_1", "code": "110.QĐ", "name": "QĐ giao kế hoạch", "signer": "TCT", "duration": 2, "dateFormula": { "type": "manual" }, "defaultDate": "2026-01-12", "docNo": "110/QĐ-TCTCHKVN", "templateFile": "" },
                    { "id": "tk_sc_2", "code": "BB-KT", "name": "Biên bản kiểm tra đột xuất", "signer": "Các phòng VCA", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-04-04", "docNo": "", "templateFile": "" },
                    { "id": "tk_sc_3", "code": "01.TTr", "name": "[TRIỂN KHAI] Tờ trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-21", "docNo": "01/ĐKNCC/TTr-KTHT", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_sc_4", "code": "02.TTr", "name": "[TL TỔ THẨM ĐỊNH] Tờ Trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-22", "docNo": "02/ĐKNCC/TTr-KTHT", "templateFile": "" },
                    { "id": "tk_sc_5", "code": "930a.QĐ", "name": "[TL TỔ THẨM ĐỊNH] Quyết định", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-28", "docNo": "930a/QĐ-CHKQTCT", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" },
                    { "id": "tk_sc_6", "code": "03.BC", "name": "BÁO CÁO BẢO TRÌ", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-29", "docNo": "03/BCTHBT-KTHT", "templateFile": "" },
                    { "id": "tk_sc_7", "code": "QĐ-DT", "name": "Phê duyệt dự toán G1", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "", "docNo": "", "templateFile": "" },
                    { "id": "tk_sc_8", "code": "04.TTr", "name": "[KH LCNT] Tờ trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-29", "docNo": "04/ĐKNCC/TTr-KTHT", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_sc_9", "code": "BB-TĐ", "name": "[KH LCNT] BB Thẩm định", "signer": "Tổ thẩm định", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-30", "docNo": "", "templateFile": "templates/2_Bien_ban_hoan_thien_hop_dong.docx" },
                    { "id": "tk_sc_10", "code": "05.BC", "name": "[KH LCNT] BC Thẩm định", "signer": "Tổ thẩm định", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-30", "docNo": "05/BC-HĐTĐ-KQTĐ", "templateFile": "" },
                    { "id": "tk_sc_11", "code": "968.QĐ", "name": "[KH LCNT] QĐ Phê Duyệt", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-31", "docNo": "968/QĐ-CHKQTCT", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" }
                ]
            },
            {
                "id": "trien_khai_mua_sam",
                "name": "2. Triển khai hồ sơ mua sắm",
                "code": "TK-MS",
                "description": "Áp dụng cho mua sắm hàng hóa, tài sản, trang thiết bị thường xuyên",
                "documents": [
                    { "id": "tk_ms_1", "code": "01.DX-NS", "name": "Báo cáo đề xuất nhu cầu mua sắm", "signer": "Đơn vị sử dụng", "duration": 2, "dateFormula": { "type": "manual" }, "defaultDate": "2026-01-12", "docNo": "01/BC-DXMS", "templateFile": "" },
                    { "id": "tk_ms_2", "code": "02.BB-HOP", "name": "Biên bản họp thống nhất danh mục mua sắm", "signer": "Hội đồng mua sắm", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "02/BB-HOP", "templateFile": "templates/2_Bien_ban_hoan_thien_hop_dong.docx" },
                    { "id": "tk_ms_3", "code": "03.TM-BG", "name": "Thư mời báo giá / Biên bản thu thập 03 báo giá", "signer": "Tổ mua sắm", "duration": 3, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "03/TM-BG", "templateFile": "templates/1_Giay_moi_tham_gia.docx" },
                    { "id": "tk_ms_4", "code": "04.TTr-CTMS", "name": "Tờ trình phê duyệt chủ trương và dự toán mua sắm", "signer": "Phòng Kế hoạch", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "04/TTr-CTMS", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_ms_5", "code": "05.QĐ-CTMS", "name": "Quyết định phê duyệt chủ trương mua sắm", "signer": "Lãnh đạo đơn vị", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "05/QĐ-CTMS", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" },
                    { "id": "tk_ms_6", "code": "06.TTr-KHLCNT", "name": "Tờ trình đề nghị phê duyệt Kế hoạch LCNT", "signer": "Tổ mua sắm", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "06/TTr-KHLCNT", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_ms_7", "code": "07.QĐ-KHLCNT", "name": "Quyết định phê duyệt Kế hoạch LCNT mua sắm", "signer": "Cấp thẩm quyền", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "07/QĐ-KHLCNT", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" }
                ]
            },
            {
                "id": "trien_khai_dau_tu",
                "name": "3. Triển khai hồ sơ đầu tư",
                "code": "TK-ĐT",
                "description": "Áp dụng cho dự án đầu tư xây dựng, cải tạo nâng cấp quy mô lớn",
                "documents": [
                    { "id": "tk_dt_1", "code": "01.TTr-CTDT", "name": "Tờ trình đề xuất chủ trương đầu tư", "signer": "Ban QLDA", "duration": 3, "dateFormula": { "type": "manual" }, "defaultDate": "2026-01-12", "docNo": "01/TTr-CTDT", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_dt_2", "code": "02.QĐ-CTDT", "name": "Quyết định phê duyệt chủ trương đầu tư", "signer": "Cấp quyết định ĐT", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "02/QĐ-CTDT", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" },
                    { "id": "tk_dt_3", "code": "03.NV-KS", "name": "Đề cương nhiệm vụ khảo sát, lập Báo cáo KT-KT", "signer": "Đơn vị tư vấn", "duration": 5, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "03/NV-KS", "templateFile": "" },
                    { "id": "tk_dt_4", "code": "04.TTr-BCKTKT", "name": "Tờ trình thẩm định Báo cáo KT-KT", "signer": "Ban QLDA", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "04/TTr-BCKTKT", "templateFile": "" },
                    { "id": "tk_dt_5", "code": "05.BC-TT", "name": "Báo cáo kết quả thẩm tra Báo cáo KT-KT", "signer": "Đơn vị thẩm tra", "duration": 5, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "05/BC-TT", "templateFile": "" },
                    { "id": "tk_dt_6", "code": "06.QĐ-PD-DA", "name": "Quyết định phê duyệt dự án đầu tư xây dựng", "signer": "Người có thẩm quyền", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "06/QĐ-PDDA", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" },
                    { "id": "tk_dt_7", "code": "07.TTr-KHLCNT", "name": "Tờ trình phê duyệt Kế hoạch LCNT tổng thể", "signer": "Chủ đầu tư", "duration": 3, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "07/TTr-KHLCNT", "templateFile": "templates/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_dt_8", "code": "08.QĐ-KHLCNT", "name": "Quyết định phê duyệt Kế hoạch LCNT tổng thể", "signer": "Cấp quyết định ĐT", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "08/QĐ-KHLCNT", "templateFile": "templates/02_Quyet_dinh_KHLCNT.docx" }
                ]
            }
        ]
    };

    let IMPLEMENTATION_MATRIX = JSON.parse(JSON.stringify(DEFAULT_IMPLEMENTATION_MATRIX));

    try {
        const savedCustomImpl = localStorage.getItem("ho_so_tu_dong_implementation_matrix");
        if (savedCustomImpl) {
            const parsedImpl = JSON.parse(savedCustomImpl);
            if (parsedImpl.implementationTypes && parsedImpl.implementationTypes.length > 0) {
                IMPLEMENTATION_MATRIX = parsedImpl;
            }
        }
    } catch (e) {
        console.warn("Could not load custom implementation matrix:", e);
    }

    // Load custom matrix config from localStorage if edited by Admin
    try {
        const savedCustomMatrix = localStorage.getItem("ho_so_tu_dong_matrix_custom");
        if (savedCustomMatrix) {
            const parsedCustom = JSON.parse(savedCustomMatrix);
            if (parsedCustom.procurementTypes && parsedCustom.procurementTypes.length > 0) {
                PROCUREMENT_MATRIX = parsedCustom;
            }
        }
    } catch (e) {
        console.warn("Could not load custom matrix:", e);
    }

    // -------------------------------------------------------------
    // Initial State & Sample Data (Matches Video Demo & Standards)
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // Project Roadmap & Procedural Timeline Model
    // -------------------------------------------------------------
    const sampleTimelinePhases = [{"id": "phase_1", "code": "I", "title": "Triển khai", "isPackage": false, "packageName": "", "tasks": [{"stt": "1", "name": "QĐ giao kế hoạch", "docNo": "110/QĐ-TCTCHKVN", "signer": "TCT", "date": "2026-01-12", "duration": 2, "note": "", "status": "Đã xong", "id": "task_0_0", "dateFormula": {"type": "manual"}}, {"stt": "2", "name": "Biên bản kiểm tra đột xuất", "docNo": "", "signer": "Các phòng VCA", "date": "2026-04-04", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_1", "dateFormula": {"type": "manual"}}, {"stt": "3", "name": "[TRIỂN KHAI] Tờ trình", "docNo": "01/ĐKNCC/TTr-KTHT", "signer": "PKTHT", "date": "2026-07-21", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_2", "dateFormula": {"type": "manual"}}, {"stt": "4", "name": "[TL TỔ THẨM ĐỊNH] Tờ Trình", "docNo": "02/ĐKNCC/TTr-KTHT", "signer": "PKTHT", "date": "2026-07-22", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_3", "dateFormula": {"type": "default"}}, {"stt": "5", "name": "[TL TỔ THẨM ĐỊNH] Quyết định", "docNo": "930a/QĐ-CHKQTCT", "signer": "GĐ", "date": "2026-07-28", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_4", "dateFormula": {"type": "manual"}}, {"stt": "6", "name": "BÁO CÁO BẢO TRÌ", "docNo": "03/BCTHBT-KTHT", "signer": "", "date": "2026-07-29", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_5", "dateFormula": {"type": "default"}}, {"stt": "", "name": "Phê duyệt dự toán G1", "docNo": "", "signer": "", "date": "", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_6", "dateFormula": {"type": "manual"}}, {"stt": "7", "name": "[KH LCNT] Tờ trình", "docNo": "04/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-07-29", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_7", "dateFormula": {"type": "manual"}}, {"stt": "8", "name": "[KH LCNT] BB Thẩm định", "docNo": "", "signer": "", "date": "2026-07-30", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_8", "dateFormula": {"type": "manual"}}, {"stt": "9", "name": "[KH LCNT] BC Thẩm định", "docNo": "05/BC-HĐTĐ-KQTĐ", "signer": "", "date": "2026-07-30", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_9", "dateFormula": {"type": "manual"}}, {"stt": "10", "name": "[KH LCNT] QĐ Phê Duyệt", "docNo": "968/QĐ-CHKQTCT", "signer": "", "date": "2026-07-31", "duration": 1, "note": "", "status": "Đã xong", "id": "task_0_10", "dateFormula": {"type": "default"}}]}, {"id": "phase_2", "code": "II", "title": "Gói thầu số 1: Thẩm tra bản vẽ thiết kế thi công và dự toán công trình", "isPackage": true, "packageName": "Gói thầu số 1: Thẩm tra bản vẽ thiết kế thi công và dự toán công trình", "tasks": [{"stt": "11", "name": "[LCNT] Tờ trình", "docNo": "06/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-07-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_0", "dateFormula": {"type": "manual"}}, {"stt": "12", "name": "[LCNT] Thư mời Quan tâm", "docNo": "969/CHKQTCT-KTHT", "signer": "", "date": "2026-07-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_1", "dateFormula": {"type": "default"}}, {"stt": "", "name": "Biên bản thương thảo hợp đồng", "docNo": "", "signer": "", "date": "2026-08-03", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_2", "dateFormula": {"type": "manual"}}, {"stt": "13", "name": "[KQ LCNT GÓI 1] Tờ trình", "docNo": "07/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-08-03", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_3", "dateFormula": {"type": "default"}}, {"stt": "14", "name": "[KQ LCNT GÓI 1] BB Thẩm định", "docNo": "", "signer": "", "date": "2026-08-03", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_4", "dateFormula": {"type": "manual"}}, {"stt": "15", "name": "[KQ LCNT GÓI 1] BC Thẩm định", "docNo": "08/BC-HĐTĐ-KQTĐ", "signer": "", "date": "2026-08-03", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_5", "dateFormula": {"type": "manual"}}, {"stt": "16", "name": "[KQ LCNT GÓI 1] QĐ Phê Duyệt", "docNo": "994/QĐ-CHKQTCT", "signer": "", "date": "2026-08-05", "duration": 1, "note": "", "status": "Đã xong", "id": "task_1_6", "dateFormula": {"type": "manual"}}, {"stt": "17", "name": "[KQ LCNT GÓI 1] Thông báo", "docNo": "", "signer": "", "date": "2026-08-05", "duration": 1, "note": "", "status": "Đã xong", "id": "task_1_7", "dateFormula": {"type": "manual"}}, {"stt": "18", "name": "HỢP ĐỒNG", "docNo": "26059", "signer": "", "date": "2026-08-17", "duration": 1, "note": "5 ngày", "status": "Đã xin số xong", "id": "task_1_8", "dateFormula": {"type": "manual"}}, {"stt": "19", "name": "Sản phẩm gói 1 (thẩm tra TK và DT)", "docNo": "", "signer": "", "date": "2026-08-18", "duration": 1, "note": "", "status": "Đã xong", "id": "task_1_9", "dateFormula": {"type": "default"}}, {"stt": "", "name": "NGHIỆM THU", "docNo": "", "signer": "", "date": "2026-08-28", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_10", "dateFormula": {"type": "custom", "refTaskId": "task_1_14", "offsetDays": 0}}, {"stt": "", "name": "[THIẾT KẾ & DỰ TOÁN] Tờ trình", "docNo": "09/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-08-19", "duration": 1, "note": "", "status": "Đã xong", "id": "task_1_11", "dateFormula": {"type": "default"}}, {"stt": "", "name": "[THIẾT KẾ & DỰ TOÁN] BB họp thẩm định", "docNo": "", "signer": "", "date": "2026-08-20", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_12", "dateFormula": {"type": "default"}}, {"stt": "", "name": "[THIẾT KẾ & DỰ TOÁN] BC thẩm định", "docNo": "10/BC-HĐTĐ-KQTĐ", "signer": "", "date": "2026-08-20", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_13", "dateFormula": {"type": "default"}}, {"stt": "", "name": "[THIẾT KẾ & DỰ TOÁN] Quyết định", "docNo": "1125/QĐ-CHKQTCT", "signer": "", "date": "2026-08-28", "duration": 0, "note": "", "status": "Đã xong", "id": "task_1_14", "dateFormula": {"type": "manual"}}]}, {"id": "phase_3", "code": "IV", "title": "Gói thầu số 2: Thi công XDCT", "isPackage": true, "packageName": "Gói thầu số 2: Thi công XDCT", "tasks": [{"stt": "24", "name": "[KH LCNT] Tờ trình", "docNo": "11/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-08-28", "duration": 1, "note": "", "status": "Đã xong", "id": "task_2_0", "dateFormula": {"type": "custom", "refTaskId": "task_1_14", "offsetDays": 0}}, {"stt": "25", "name": "[KH LCNT] BB Thẩm định", "docNo": "", "signer": "", "date": "2026-08-28", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_1", "dateFormula": {"type": "manual"}}, {"stt": "26", "name": "[KH LCNT] BC Thẩm định", "docNo": "12/BC-HĐTĐ-KQTĐ", "signer": "", "date": "", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_2", "dateFormula": {"type": "manual"}}, {"stt": "27", "name": "[KH LCNT] QĐ Phê Duyệt", "docNo": "1126/QĐ-CHKQTCT", "signer": "", "date": "2026-08-28", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_3", "dateFormula": {"type": "manual"}}, {"stt": "", "name": "[LCNT] Tờ trình", "docNo": "13/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-08-28", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_4", "dateFormula": {"type": "default"}}, {"stt": "29", "name": "[LCNT] Thư mời Quan tâm", "docNo": "1131/CHKQTCT-KTHT", "signer": "", "date": "2026-08-28", "duration": 3, "note": "", "status": "Đã xong", "id": "task_2_5", "dateFormula": {"type": "default"}}, {"stt": "30", "name": "Biên bản thương thảo hợp đồng", "docNo": "", "signer": "", "date": "2026-08-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_6", "dateFormula": {"type": "default"}}, {"stt": "31", "name": "[KQ LCNT] Tờ trình", "docNo": "14/ĐKNCC/TTr-KTHT", "signer": "", "date": "2026-08-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_7", "dateFormula": {"type": "default"}}, {"stt": "32", "name": "[KQ LCNT] BB Thẩm định", "docNo": "", "signer": "", "date": "2026-08-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_8", "dateFormula": {"type": "default"}}, {"stt": "33", "name": "[KQ LCNT] BC Thẩm định", "docNo": "15/BC-HĐTĐ-KQTĐ", "signer": "", "date": "2026-08-31", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_9", "dateFormula": {"type": "default"}}, {"stt": "34", "name": "[KQ LCNT] QĐ Phê Duyệt", "docNo": "1143 /QĐ-CHKQTCT", "signer": "", "date": "2026-09-03", "duration": 0, "note": "", "status": "Đã xong", "id": "task_2_10", "dateFormula": {"type": "manual"}}, {"stt": "35", "name": "[KQ LCNT] Thông báo", "docNo": "", "signer": "", "date": "2026-09-03", "duration": 1, "note": "", "status": "Đã xong", "id": "task_2_11", "dateFormula": {"type": "default"}}, {"stt": "36", "name": "HỢP ĐỒNG", "docNo": "26076", "signer": "", "date": "2026-09-04", "duration": 30, "note": "", "status": "Đã xong", "id": "task_2_12", "dateFormula": {"type": "default"}}, {"stt": "", "name": "LẬP BP ĐẢM BẢO ANAT", "docNo": "", "signer": "", "date": "2026-09-04", "duration": 15, "note": "", "status": "Chưa xong", "id": "task_2_13", "dateFormula": {"type": "custom", "refTaskId": "task_2_12", "offsetDays": 0}}, {"stt": "", "name": "NGHIỆM THU", "docNo": "", "signer": "", "date": "2026-10-19", "duration": 0, "note": "", "status": "Chưa xong", "id": "task_2_14", "dateFormula": {"type": "custom", "refTaskId": "task_2_12", "offsetDays": 15}}]}];

    const defaultRoadmap = {
        projectName: "Sửa chữa góc cua đường khẩn nguy chữa cháy phía tây Sân đỗ tàu bay",
        investorName: "Cảng Hàng không Quốc tế Cần Thơ",
        investorUpper: "CẢNG HÀNG KHÔNG QUỐC TẾ CẦN THƠ",
        pmuName: "PHÒNG KỸ THUẬT HẠ TẦNG",
        approver: "Tổng công ty Cảng hàng không Việt Nam (TCT)",
        fundingSource: "Quỹ đầu tư phát triển TCT",
        decisionPlanNo: "110/QĐ-TCTCHKVN",
        decisionPlanDate: "2026-01-12",
        implementationTypeId: "trien_khai_sua_chua",
        packages: [
            {
                id: "pkg_1",
                name: "Gói thầu số 1: Thẩm tra bản vẽ thiết kế thi công và dự toán công trình",
                category: "tu_van",
                categoryLabel: "Tư vấn",
                procurementTypeId: "chi_dinh_thau_rut_gon",
                estimatedPrice: "35.000.000",
                contractType: "Trọn gói",
                duration: "15 ngày",
                status: "Đã xong",
                fields: {
                    "TEN_GOI_THAU": "Thẩm tra bản vẽ thiết kế thi công và dự toán công trình",
                    "GIA_GOI_THAU_SO": "35.000.000",
                    "GIA_GOI_THAU_CHU": "Ba mươi lăm triệu đồng chẵn",
                    "HINH_THUC_LCNT": "Chỉ định thầu rút gọn",
                    "LOAI_HOP_DONG": "Trọn gói",
                    "THOI_GIAN_THUC_HIEN": "15 ngày",
                    "SO_TO_TRINH": "06/ĐKNCC/TTr-KTHT",
                    "NGAY_TO_TRINH": "31/07/2026",
                    "SO_QUYET_DINH": "994/QĐ-CHKQTCT",
                    "NGAY_QUYET_DINH": "05/08/2026",
                    "GIA_TRI_HOP_DONG_SO": "34.500.000",
                    "GIA_TRI_HOP_DONG_CHU": "Ba mươi tư triệu năm trăm nghìn đồng"
                }
            },
            {
                id: "pkg_2",
                name: "Gói thầu số 2: Thi công XDCT",
                category: "xay_lap",
                categoryLabel: "Xây lắp",
                procurementTypeId: "chi_dinh_thau_rut_gon",
                estimatedPrice: "850.000.000",
                contractType: "Trọn gói",
                duration: "30 ngày",
                status: "Đang thực hiện",
                fields: {
                    "TEN_GOI_THAU": "Thi công XDCT sửa chữa góc cua đường khẩn nguy chữa cháy",
                    "GIA_GOI_THAU_SO": "850.000.000",
                    "GIA_GOI_THAU_CHU": "Tám trăm năm mươi triệu đồng chẵn",
                    "HINH_THUC_LCNT": "Chỉ định thầu rút gọn",
                    "LOAI_HOP_DONG": "Trọn gói",
                    "THOI_GIAN_THUC_HIEN": "30 ngày",
                    "SO_TO_TRINH": "11/ĐKNCC/TTr-KTHT",
                    "NGAY_TO_TRINH": "28/08/2026",
                    "SO_QUYET_DINH": "1143/QĐ-CHKQTCT",
                    "NGAY_QUYET_DINH": "03/09/2026",
                    "GIA_TRI_HOP_DONG_SO": "835.000.000",
                    "GIA_TRI_HOP_DONG_CHU": "Tám trăm ba mươi lăm triệu đồng"
                }
            }
        ],
        timelinePhases: sampleTimelinePhases
    };

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
        activeMainTab: "roadmap", // "roadmap" (1. Định hướng & Tiến độ) vs "docs" (2. Tạo Hồ Sơ)
        projectRoadmap: JSON.parse(JSON.stringify(defaultRoadmap)),
        selectedRoadmapPackageIndex: 0, // 0: Gói 1, 1: Gói 2, -1: Tất cả, "trien_khai": Chỉ Triển khai
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

    const commonGeneralKeys = [
        "TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH_QUYET_DINH",
        "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN",
        "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU",
        "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC_LCNT",
        "SO_TO_TRINH", "NGAY_TO_TRINH", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "SO_GIAY_MOI", "NGAY_GIAY_MOI",
        "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "SO_HOP_DONG", "NGAY_HOP_DONG",
        "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN",
        "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU"
    ];

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
    // Roadmap & Timeline Controller Functions
    // -------------------------------------------------------------
    function switchMainTab(tabName, updateHistory = true) {
        appState.activeMainTab = tabName;
        const viewRoadmap = document.getElementById("viewRoadmap");
        const viewDocs = document.getElementById("viewDocs");
        const btnNavRoadmap = document.getElementById("btnNavRoadmap");
        const btnNavDocs = document.getElementById("btnNavDocs");
        const headerProcurement = document.getElementById("headerProcurementTypeWrapper");

        // Đồng bộ Browser History để nút Back / Forward trên trình duyệt hoạt động chuẩn xác
        if (updateHistory && window.history && window.history.pushState) {
            const targetHash = `#${tabName}`;
            if (window.location.hash !== targetHash) {
                window.history.pushState({ 
                    tab: tabName, 
                    activeDocId: appState.activeDocId, 
                    pkgIdx: appState.activePackageIndex 
                }, "", targetHash);
            }
        }

        if (tabName === "roadmap") {
            if (viewRoadmap) viewRoadmap.classList.remove("hidden");
            if (viewDocs) viewDocs.classList.add("hidden");
            if (headerProcurement) headerProcurement.classList.add("hidden");

            if (btnNavRoadmap) btnNavRoadmap.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all bg-emerald-600 text-white shadow-xs";
            if (btnNavDocs) btnNavDocs.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-200/60";

            renderRoadmapUI();
        } else {
            if (viewRoadmap) viewRoadmap.classList.add("hidden");
            if (viewDocs) viewDocs.classList.remove("hidden");
            if (headerProcurement) headerProcurement.classList.remove("hidden");

            if (btnNavDocs) btnNavDocs.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all bg-emerald-600 text-white shadow-xs";
            if (btnNavRoadmap) btnNavRoadmap.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-200/60";

            syncRoadmapToDocs();
            renderPackageDropdown();
            populateFormInputs();
            renderDocTabs();
            renderDocumentPreview();
            applyVariableFilter();
        }
        saveState();
    }

    function syncRoadmapToDocs() {
        if (!appState.projectRoadmap) return;
        const rm = appState.projectRoadmap;

        // Đồng bộ thông tin chung
        appState.generalInfo.TEN_DU_AN = rm.projectName || appState.generalInfo.TEN_DU_AN;
        appState.generalInfo.TEN_CONG_TRINH = rm.projectName || appState.generalInfo.TEN_CONG_TRINH;
        appState.generalInfo.TEN_CHU_DAU_TU = rm.investorName || appState.generalInfo.TEN_CHU_DAU_TU;
        appState.generalInfo.TEN_CHU_DAU_TU_VIET_HOA = (rm.investorName || appState.generalInfo.TEN_CHU_DAU_TU).toUpperCase();
        appState.generalInfo.CAP_QUYET_DINH_DAU_TU = rm.approver || appState.generalInfo.CAP_QUYET_DINH_DAU_TU;
        appState.generalInfo.NGUON_VON = rm.fundingSource || appState.generalInfo.NGUON_VON;

        // Đồng bộ danh sách gói thầu và link ngày tháng, số văn bản từ Tab tiến độ
        if (Array.isArray(rm.packages) && rm.packages.length > 0) {
            appState.packages = rm.packages.map((pkg, idx) => {
                const existing = appState.packages[idx] || { fields: {} };
                const fieldsMerged = {
                    ...existing.fields,
                    TEN_GOI_THAU: pkg.fields?.TEN_GOI_THAU || pkg.name,
                    GIA_GOI_THAU_SO: pkg.fields?.GIA_GOI_THAU_SO || pkg.estimatedPrice || "",
                    GIA_GOI_THAU_CHU: pkg.fields?.GIA_GOI_THAU_CHU || "",
                    HINH_THUC_LCNT: pkg.fields?.HINH_THUC_LCNT || getProcurementTypeName(pkg.procurementTypeId),
                    LOAI_HOP_DONG: pkg.contractType || pkg.fields?.LOAI_HOP_DONG || "Trọn gói",
                    THOI_GIAN_THUC_HIEN: pkg.duration || pkg.fields?.THOI_GIAN_THUC_HIEN || "30 ngày",
                    ...(pkg.fields || {})
                };

                // Link số văn bản & ngày ký từ timeline phase của gói này
                const phases = rm.timelinePhases || [];
                const pkgPhase = phases.find(p => p.isPackage && (
                    p.title.includes(pkg.name) || 
                    p.title.includes(`gói thầu số ${idx + 1}`) || 
                    p.title.includes(`gói ${idx + 1}`)
                )) || phases[idx + 1];

                if (pkgPhase && Array.isArray(pkgPhase.tasks)) {
                    pkgPhase.tasks.forEach(t => {
                        const name = (t.name || "").toLowerCase();
                        const docCode = (t.docCode || "").toLowerCase();
                        const docNo = t.docNo ? t.docNo.trim() : "";
                        const vnDate = t.date ? formatDateToVN(t.date) : "";

                        if (docCode.includes("ttr-khlcnt") || (name.includes("tờ trình") && (name.includes("kh lcnt") || name.includes("khlcnt")))) {
                            if (docNo) fieldsMerged.SO_TO_TRINH = docNo;
                            if (vnDate) fieldsMerged.NGAY_TO_TRINH = vnDate;
                        } else if (docCode.includes("qd-khlcnt") || ((name.includes("qđ") || name.includes("quyết định")) && (name.includes("kh lcnt") || name.includes("khlcnt")))) {
                            if (docNo) fieldsMerged.SO_QUYET_DINH = docNo;
                            if (vnDate) fieldsMerged.NGAY_QUYET_DINH = vnDate;
                        } else if (docCode.includes("gm") || name.includes("thư mời") || name.includes("giấy mời")) {
                            if (docNo) fieldsMerged.SO_GIAY_MOI = docNo;
                            if (vnDate) fieldsMerged.NGAY_GIAY_MOI = vnDate;
                        } else if (docCode.includes("bb") || (name.includes("biên bản") && (name.includes("thương thảo") || name.includes("hoàn thiện")))) {
                            if (docNo) fieldsMerged.SO_BIEN_BAN_HOAN_THIEN = docNo;
                            if (vnDate) fieldsMerged.NGAY_BIEN_BAN = vnDate;
                        } else if (docCode.includes("hd") || name.includes("hợp đồng")) {
                            if (docNo) fieldsMerged.SO_HOP_DONG = docNo;
                            if (vnDate) fieldsMerged.NGAY_HOP_DONG = vnDate;
                        }
                    });
                }

                return {
                    name: pkg.name || `Gói thầu ${idx + 1}`,
                    procurementTypeId: pkg.procurementTypeId || "chi_dinh_thau_rut_gon",
                    fields: fieldsMerged
                };
            });
        }

        // Đảm bảo activePackageIndex hợp lệ
        if (appState.activePackageIndex >= appState.packages.length) {
            appState.activePackageIndex = 0;
        }

        // Cập nhật selectedProcurementTypeId theo gói đang active
        const curPkg = appState.packages[appState.activePackageIndex];
        if (curPkg && curPkg.procurementTypeId) {
            appState.selectedProcurementTypeId = curPkg.procurementTypeId;
            if (procurementTypeSelect) {
                procurementTypeSelect.value = curPkg.procurementTypeId;
            }
        }
    }

    function getProcurementTypeName(id) {
        const pt = PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === id);
        return pt ? pt.name : "Chỉ định thầu rút gọn";
    }


    function applyImplementationTypeToRoadmap(implTypeId, forceReset = false) {
        if (!appState.projectRoadmap) return;
        const rm = appState.projectRoadmap;
        if (!implTypeId) implTypeId = rm.implementationTypeId || "trien_khai_sua_chua";
        rm.implementationTypeId = implTypeId;

        const implType = IMPLEMENTATION_MATRIX.implementationTypes.find(t => t.id === implTypeId) 
            || IMPLEMENTATION_MATRIX.implementationTypes[0];
        if (!implType) return;

        if (!rm.timelinePhases) rm.timelinePhases = [];
        let phase1 = rm.timelinePhases.find(p => p.id === "phase_1" || p.code === "I" || (p.title && p.title.toLowerCase().includes("triển khai")));

        if (!phase1) {
            phase1 = {
                id: "phase_1",
                code: "I",
                title: `Triển khai: ${implType.name}`,
                isPackage: false,
                packageName: "",
                tasks: []
            };
            rm.timelinePhases.unshift(phase1);
        } else {
            phase1.title = `Triển khai: ${implType.name}`;
        }

        const existingTasks = phase1.tasks || [];
        if (forceReset || existingTasks.length === 0) {
            phase1.tasks = (implType.documents || []).map((doc, idx) => ({
                id: `task_0_${idx}`,
                stt: `${idx + 1}`,
                name: doc.name,
                docNo: doc.docNo || "",
                signer: doc.signer || "",
                date: doc.defaultDate || "",
                duration: doc.duration !== undefined ? doc.duration : 1,
                note: "",
                status: idx === 0 && doc.defaultDate ? "Đã xong" : "Đang làm",
                dateFormula: doc.dateFormula ? JSON.parse(JSON.stringify(doc.dateFormula)) : { type: idx === 0 ? "manual" : "default" },
                docCode: doc.code || "",
                templateFile: doc.templateFile || "",
                docId: doc.id
            }));
        } else {
            // Sync tasks while keeping user inputs
            const newTasks = (implType.documents || []).map((doc, idx) => {
                const existing = existingTasks.find(et => et.docId === doc.id || et.docCode === doc.code || et.name === doc.name) || existingTasks[idx];
                if (existing) {
                    return {
                        ...existing,
                        id: existing.id || `task_0_${idx}`,
                        stt: `${idx + 1}`,
                        name: doc.name || existing.name,
                        docCode: doc.code || existing.docCode || "",
                        templateFile: doc.templateFile !== undefined ? doc.templateFile : existing.templateFile,
                        docId: doc.id,
                        signer: existing.signer || doc.signer || ""
                    };
                } else {
                    return {
                        id: `task_0_${idx}`,
                        stt: `${idx + 1}`,
                        name: doc.name,
                        docNo: doc.docNo || "",
                        signer: doc.signer || "",
                        date: doc.defaultDate || "",
                        duration: doc.duration !== undefined ? doc.duration : 1,
                        note: "",
                        status: "Đang làm",
                        dateFormula: doc.dateFormula ? JSON.parse(JSON.stringify(doc.dateFormula)) : { type: "default" },
                        docCode: doc.code || "",
                        templateFile: doc.templateFile || "",
                        docId: doc.id
                    };
                }
            });
            phase1.tasks = newTasks;
        }
    }

    function renderRoadmapUI() {
        if (!appState.projectRoadmap) {
            appState.projectRoadmap = JSON.parse(JSON.stringify(defaultRoadmap));
        }
        const rm = appState.projectRoadmap;
        if (appState.selectedRoadmapPackageIndex === undefined) {
            appState.selectedRoadmapPackageIndex = 0; // Default to Gói 1
        }

        // Điền các trường thuộc tính dự án
        const rmProjectName = document.getElementById("rmProjectName");
        const rmInvestorName = document.getElementById("rmInvestorName");
        const rmApprover = document.getElementById("rmApprover");
        const rmFundingSource = document.getElementById("rmFundingSource");
        const rmPackageCountBadge = document.getElementById("rmPackageCountBadge");

        if (rmProjectName) rmProjectName.value = rm.projectName || "";
        if (rmInvestorName) rmInvestorName.value = rm.investorName || "";
        if (rmApprover) rmApprover.value = rm.approver || "";
        if (rmFundingSource) rmFundingSource.value = rm.fundingSource || "";
        if (rmPackageCountBadge) rmPackageCountBadge.textContent = rm.packages ? rm.packages.length : 0;

        if (!rm.implementationTypeId) {
            rm.implementationTypeId = "trien_khai_sua_chua";
        }

        const rmImplSelect = document.getElementById("rmImplementationTypeSelect");
        if (rmImplSelect) {
            rmImplSelect.innerHTML = IMPLEMENTATION_MATRIX.implementationTypes.map(it => 
                `<option value="${it.id}" ${it.id === rm.implementationTypeId ? "selected" : ""}>${it.name}</option>`
            ).join("");

            rmImplSelect.onchange = (e) => {
                const newTypeId = e.target.value;
                rm.implementationTypeId = newTypeId;
                applyImplementationTypeToRoadmap(newTypeId, true);
                recalculateAllTaskDates(false, true);
                renderRoadmapUI();
                saveState();
                showToast(`Đã chuyển quy trình Triển khai sang: ${rmImplSelect.options[rmImplSelect.selectedIndex].text}`);
            };
        }

        const btnConfigImplModalTop = document.getElementById("btnConfigImplModalTop");
        if (btnConfigImplModalTop) {
            btnConfigImplModalTop.onclick = (e) => {
                e.preventDefault();
                activeAdminCategory = "implementation";
                activeAdminImplTypeId = rm.implementationTypeId || IMPLEMENTATION_MATRIX.implementationTypes[0].id;
                renderAdminMatrixModal();
                const m = document.getElementById("modalProcurementMatrixManager");
                if (m) m.classList.remove("hidden");
            };
        }

        // Render Package Cards (Ultra-compact styling)
        const rmPackagesList = document.getElementById("rmPackagesList");
        if (rmPackagesList) {
            rmPackagesList.innerHTML = "";
            (rm.packages || []).forEach((pkg, idx) => {
                const card = document.createElement("div");
                const isSelected = appState.selectedRoadmapPackageIndex === idx;

                card.className = isSelected 
                    ? "bg-emerald-50/30 hover:bg-white rounded border-2 border-emerald-500 p-1.5 shadow-xs transition-all flex flex-col justify-between cursor-pointer ring-1 ring-emerald-300"
                    : "bg-slate-50 hover:bg-white rounded border border-slate-200 hover:border-slate-300 p-1.5 shadow-2xs transition-all flex flex-col justify-between cursor-pointer";

                const categoryColors = {
                    "tu_van": "bg-blue-50 text-blue-700 border-blue-200",
                    "xay_lap": "bg-amber-50 text-amber-800 border-amber-200",
                    "mua_sam": "bg-emerald-50 text-emerald-800 border-emerald-200",
                    "phi_tu_van": "bg-purple-50 text-purple-700 border-purple-200"
                };
                const catClass = categoryColors[pkg.category] || "bg-slate-100 text-slate-700 border-slate-200";

                const isDone = pkg.status === "Đã xong";
                const statusBadge = isDone 
                    ? `<span class="bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded text-[9.5px] font-bold"><i class="fa-solid fa-check"></i> Xong</span>`
                    : `<span class="bg-amber-100 text-amber-900 px-1 py-0.2 rounded text-[9.5px] font-bold"><i class="fa-solid fa-spinner fa-spin"></i> Đang làm</span>`;

                const activeBadge = isSelected
                    ? `<span class="bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded text-[9.5px] flex items-center gap-0.5"><i class="fa-solid fa-eye"></i> Đang xem thủ tục</span>`
                    : `<span class="text-slate-400 hover:text-emerald-700 text-[9.5px] font-bold underline flex items-center gap-0.5"><i class="fa-regular fa-eye"></i> Bấm để xem thủ tục</span>`;

                card.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between gap-1 pb-1 mb-1 border-b border-slate-200/60">
                            <div class="flex items-center space-x-1 min-w-0">
                                <span class="bg-slate-800 text-white font-bold text-[9.5px] px-1 py-0.2 rounded shrink-0">#${idx + 1}</span>
                                <h3 class="font-bold text-slate-900 text-[11px] truncate" title="${pkg.name}">${pkg.name}</h3>
                            </div>
                            <span class="border font-bold px-1.5 py-0 rounded text-[9.5px] shrink-0 ${catClass}">${pkg.categoryLabel || pkg.category || "Tư vấn"}</span>
                        </div>

                        <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10.5px] mb-1">
                            <div>
                                <span class="text-slate-400 block text-[9px] uppercase font-bold">Giá gói dự kiến</span>
                                <span class="font-bold text-slate-800">${pkg.estimatedPrice || "---"} VNĐ</span>
                            </div>
                            <div>
                                <span class="text-slate-400 block text-[9px] uppercase font-bold">Loại HĐ / Thời gian</span>
                                <span class="font-medium text-slate-700 truncate block">${pkg.contractType || "Trọn gói"} (${pkg.duration || "---"})</span>
                            </div>
                            <div class="col-span-2 mt-0.5">
                                <span class="text-slate-400 block text-[9px] uppercase font-bold">Phương thức LCNT định hướng</span>
                                <select class="pkg-procurement-select w-full bg-white border border-slate-300 rounded px-1 py-0 h-5 text-[10px] font-bold text-emerald-950 mt-0.2 cursor-pointer" data-pkg-idx="${idx}">
                                    ${PROCUREMENT_MATRIX.procurementTypes.map(pt => `<option value="${pt.id}" ${pt.id === (pkg.procurementTypeId || "chi_dinh_thau_rut_gon") ? "selected" : ""}>${pt.name}</option>`).join("")}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="pt-1 border-t border-slate-200/60 flex items-center justify-between">
                        <div class="flex items-center space-x-1">
                            ${statusBadge}
                            ${activeBadge}
                        </div>
                        <div class="flex items-center space-x-1">
                            <button type="button" class="btn-edit-pkg px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded border border-slate-300 text-[10px] flex items-center space-x-0.5 h-5.5" data-pkg-idx="${idx}" title="Chỉnh sửa thông tin gói thầu này">
                                <i class="fa-solid fa-pencil text-[8.5px] text-amber-600"></i>
                                <span>Sửa</span>
                            </button>
                            <button type="button" class="btn-create-docs px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-2xs text-[10px] flex items-center space-x-1 h-5.5" data-pkg-idx="${idx}" title="Chuyển sang Tab 2 để soạn hồ sơ cho gói thầu này">
                                <i class="fa-solid fa-file-signature text-[9px]"></i>
                                <span>Soạn hồ sơ</span>
                            </button>
                        </div>
                    </div>
                `;

                // Click card selects package and reveals its timeline procedures
                card.addEventListener("click", (e) => {
                    if (e.target.closest(".pkg-procurement-select") || e.target.closest(".btn-create-docs") || e.target.closest(".btn-edit-pkg")) {
                        return;
                    }
                    appState.selectedRoadmapPackageIndex = idx;
                    renderRoadmapUI();
                });

                // Handle procurement type change for this package
                const sel = card.querySelector(".pkg-procurement-select");
                sel.addEventListener("change", (e) => {
                    e.stopPropagation();
                    pkg.procurementTypeId = e.target.value;
                    saveState();
                });

                // Handle Click "Sửa thông tin gói"
                const btnEdit = card.querySelector(".btn-edit-pkg");
                if (btnEdit) {
                    btnEdit.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEditPackageModal(idx);
                    });
                }

                // Handle Click "Soạn hồ sơ gói này"
                const btnCreate = card.querySelector(".btn-create-docs");
                btnCreate.addEventListener("click", (e) => {
                    e.stopPropagation();
                    appState.activePackageIndex = idx;
                    appState.selectedProcurementTypeId = pkg.procurementTypeId || "chi_dinh_thau_rut_gon";
                    switchMainTab("docs");
                    showToast(`Đã chuyển sang soạn hồ sơ cho: ${pkg.name}`);
                });

                rmPackagesList.appendChild(card);
            });
        }

        // Render Package Filter Pills on Timeline Header
        renderPackageFilterPills();

        // Render Timeline Checklist with auto-calculation
        renderTimelineTable();
        recalculateAllTaskDates(false, true);
    }

    function renderPackageFilterPills() {
        const pillsContainer = document.getElementById("rmPackageFilterPills");
        if (!pillsContainer || !appState.projectRoadmap) return;
        pillsContainer.innerHTML = "";

        const pkgs = appState.projectRoadmap.packages || [];

        // Pill: I. Triển khai + Gói đang chọn
        pkgs.forEach((p, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            const isActive = appState.selectedRoadmapPackageIndex === idx;
            btn.className = isActive 
                ? "px-2 py-0.2 rounded font-bold text-[10px] bg-emerald-600 text-white shadow-2xs" 
                : "px-2 py-0.2 rounded font-medium text-[10px] text-slate-700 hover:bg-slate-200";
            btn.innerHTML = `<i class="fa-solid fa-box text-[8.5px] mr-0.5"></i> Gói ${idx + 1}`;
            btn.title = `Xem mục Triển khai + Thủ tục của ${p.name}`;
            btn.addEventListener("click", () => {
                appState.selectedRoadmapPackageIndex = idx;
                renderRoadmapUI();
            });
            pillsContainer.appendChild(btn);
        });

        // Pill: Chỉ mục Triển khai
        const btnOnlyInit = document.createElement("button");
        btnOnlyInit.type = "button";
        const isInitActive = appState.selectedRoadmapPackageIndex === "trien_khai";
        btnOnlyInit.className = isInitActive 
            ? "px-1.5 py-0.2 rounded font-bold text-[10px] bg-indigo-600 text-white shadow-2xs" 
            : "px-1.5 py-0.2 rounded font-medium text-[10px] text-slate-700 hover:bg-slate-200";
        btnOnlyInit.textContent = "Chỉ Triển khai";
        btnOnlyInit.title = "Chỉ xem các bước Triển khai chung của dự án";
        btnOnlyInit.addEventListener("click", () => {
            appState.selectedRoadmapPackageIndex = "trien_khai";
            renderRoadmapUI();
        });
        pillsContainer.appendChild(btnOnlyInit);

        // Pill: Xem tất cả
        const btnAll = document.createElement("button");
        btnAll.type = "button";
        const isAllActive = appState.selectedRoadmapPackageIndex === -1;
        btnAll.className = isAllActive 
            ? "px-1.5 py-0.2 rounded font-bold text-[10px] bg-slate-800 text-white shadow-2xs" 
            : "px-1.5 py-0.2 rounded font-medium text-[10px] text-slate-700 hover:bg-slate-200";
        btnAll.textContent = "Tất cả gói";
        btnAll.title = "Xem toàn bộ thủ tục của tất cả các gói";
        btnAll.addEventListener("click", () => {
            appState.selectedRoadmapPackageIndex = -1;
            renderRoadmapUI();
        });
        pillsContainer.appendChild(btnAll);
    }

    
    // -------------------------------------------------------------
    // Date & Day-of-Week & Formula Calculation Engine
    // -------------------------------------------------------------
    function parseDateString(dateStr) {
        if (!dateStr || !dateStr.trim()) return null;
        const clean = dateStr.trim();
        const parts = clean.split(/[-/]/);
        if (parts.length !== 3) return null;
        let y, m, d;
        if (parts[0].length === 4) {
            y = parseInt(parts[0], 10);
            m = parseInt(parts[1], 10) - 1;
            d = parseInt(parts[2], 10);
        } else {
            d = parseInt(parts[0], 10);
            m = parseInt(parts[1], 10) - 1;
            y = parseInt(parts[2], 10);
        }
        const dt = new Date(y, m, d);
        return isNaN(dt.getTime()) ? null : dt;
    }

    function formatDateToIso(dateObj) {
        if (!dateObj || isNaN(dateObj.getTime())) return "";
        const pad = (n) => String(n).padStart(2, '0');
        return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
    }

    function getDayOfWeekInVietnamese(dateStr) {
        if (!dateStr) return "---";
        const dt = parseDateString(dateStr);
        if (!dt) return "---";
        const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        return days[dt.getDay()];
    }

    function addDaysToDate(dateStr, days) {
        const dt = parseDateString(dateStr);
        if (!dt) return "";
        dt.setDate(dt.getDate() + (parseInt(days, 10) || 0));
        return formatDateToIso(dt);
    }

    function ensureTaskDefaults() {
        if (!appState.projectRoadmap || !appState.projectRoadmap.timelinePhases) return;

        const blueprintConfigs = {
            // Phase 0
            "0_0": { type: "manual", date: "2026-01-12", dur: 2 },
            "0_1": { type: "manual", date: "2026-04-04", dur: 1 },
            "0_2": { type: "manual", date: "2026-07-21", dur: 1 },
            "0_3": { type: "default", dur: 1 },
            "0_4": { type: "manual", date: "2026-07-28", dur: 1 },
            "0_5": { type: "default", dur: 1 },
            "0_6": { type: "manual", date: "", dur: 1 },
            "0_7": { type: "manual", date: "2026-07-29", dur: 1 },
            "0_8": { type: "manual", date: "2026-07-30", dur: 1 },
            "0_9": { type: "manual", date: "2026-07-30", dur: 1 },
            "0_10": { type: "default", dur: 1 },

            // Phase 1
            "1_0": { type: "manual", date: "2026-07-31", dur: 0 },
            "1_1": { type: "default", dur: 0 },
            "1_2": { type: "manual", date: "2026-08-03", dur: 0 },
            "1_3": { type: "default", dur: 0 },
            "1_4": { type: "manual", date: "2026-08-03", dur: 0 },
            "1_5": { type: "manual", date: "2026-08-03", dur: 0 },
            "1_6": { type: "manual", date: "2026-08-05", dur: 1 },
            "1_7": { type: "manual", date: "2026-08-05", dur: 1 },
            "1_8": { type: "manual", date: "2026-08-17", dur: 1 },
            "1_9": { type: "default", dur: 1 },
            "1_10": { type: "custom", refTaskId: "task_1_14", offsetDays: 0, dur: 0 },
            "1_11": { type: "default", dur: 1 },
            "1_12": { type: "default", dur: 0 },
            "1_13": { type: "default", dur: 0 },
            "1_14": { type: "manual", date: "2026-08-28", dur: 0 },

            // Phase 2
            "2_0": { type: "custom", refTaskId: "task_1_14", offsetDays: 0, dur: 1 },
            "2_1": { type: "manual", date: "2026-08-28", dur: 0 },
            "2_2": { type: "manual", date: "", dur: 0 },
            "2_3": { type: "manual", date: "2026-08-28", dur: 0 },
            "2_4": { type: "default", dur: 0 },
            "2_5": { type: "default", dur: 3 },
            "2_6": { type: "default", dur: 0 },
            "2_7": { type: "default", dur: 0 },
            "2_8": { type: "default", dur: 0 },
            "2_9": { type: "default", dur: 0 },
            "2_10": { type: "manual", date: "2026-09-03", dur: 0 },
            "2_11": { type: "default", dur: 1 },
            "2_12": { type: "default", dur: 30 },
            "2_13": { type: "custom", refTaskId: "task_2_12", offsetDays: 0, dur: 15 },
            "2_14": { type: "custom", refTaskId: "task_2_12", offsetDays: 15, dur: 0 }
        };

        if (!appState._roadmapEngineV2) {
            appState.projectRoadmap.timelinePhases.forEach((ph, pIdx) => {
                (ph.tasks || []).forEach((t, tIdx) => {
                    t.id = `task_${pIdx}_${tIdx}`;
                    const bp = blueprintConfigs[`${pIdx}_${tIdx}`];
                    if (bp) {
                        t.duration = bp.dur !== undefined ? bp.dur : (t.duration !== undefined ? t.duration : 1);
                        if (bp.type === "custom") {
                            t.dateFormula = { type: "custom", refTaskId: bp.refTaskId, offsetDays: bp.offsetDays || 0 };
                        } else if (bp.type === "manual") {
                            t.dateFormula = { type: "manual" };
                            if (bp.date !== undefined && (!t.date || t.date === "")) t.date = bp.date;
                        } else {
                            t.dateFormula = { type: "default" };
                        }
                    } else if (!t.dateFormula) {
                        t.dateFormula = t.date ? { type: "manual" } : { type: "default" };
                    }
                    if (!t.dayOfWeek && t.date) {
                        t.dayOfWeek = getDayOfWeekInVietnamese(t.date);
                    }
                });
            });
            appState._roadmapEngineV2 = true;
        } else {
            appState.projectRoadmap.timelinePhases.forEach((ph, pIdx) => {
                (ph.tasks || []).forEach((t, tIdx) => {
                    if (!t.id) t.id = `task_${pIdx}_${tIdx}`;
                    if (!t.dayOfWeek && t.date) t.dayOfWeek = getDayOfWeekInVietnamese(t.date);
                    if (t.duration === undefined || t.duration === null || t.duration === "") t.duration = 1;
                    if (!t.dateFormula) {
                        t.dateFormula = t.date ? { type: "manual" } : { type: "default" };
                    }
                });
            });
        }
    }

    function getPreviousTaskInProject(pIdx, tIdx) {
        const phases = appState.projectRoadmap.timelinePhases || [];
        const priorTasks = [];
        for (let pi = 0; pi <= pIdx; pi++) {
            const p = phases[pi];
            if (!p || !p.tasks) continue;
            const maxTi = (pi === pIdx) ? tIdx : p.tasks.length;
            for (let ti = 0; ti < maxTi; ti++) {
                priorTasks.push(p.tasks[ti]);
            }
        }
        for (let i = priorTasks.length - 1; i >= 0; i--) {
            if (priorTasks[i] && priorTasks[i].date) {
                return priorTasks[i];
            }
        }
        return priorTasks.length > 0 ? priorTasks[priorTasks.length - 1] : null;
    }

    function getModeBadgeHtml(task) {
        const formula = task.dateFormula || { type: "default" };
        if (formula.type === "custom") {
            return `
                <button type="button" class="btn-task-formula-badge inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 cursor-pointer shadow-2xs transition-colors" data-task-id="${task.id}" title="Chế độ Công thức riêng: Phụ thuộc vào mốc khác (Bấm để cài đặt)">
                    <i class="fa-solid fa-link text-[8.5px] text-purple-600"></i>
                    <span>Liên kết</span>
                </button>
            `;
        } else if (formula.type === "manual") {
            return `
                <button type="button" class="btn-task-formula-badge inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer shadow-2xs transition-colors" data-task-id="${task.id}" title="Chế độ Thủ công: Mốc ngày cố định do người dùng nhập (Bấm để cài đặt)">
                    <i class="fa-solid fa-thumbtack text-[8.5px] text-amber-600"></i>
                    <span>Thủ công</span>
                </button>
            `;
        } else {
            return `
                <button type="button" class="btn-task-formula-badge inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer shadow-2xs transition-colors" data-task-id="${task.id}" title="Chế độ Tự động: Ngày = Ngày việc trước + Thời gian việc trước (Bấm để cài đặt)">
                    <i class="fa-solid fa-arrows-rotate text-[8.5px] text-blue-600"></i>
                    <span>Tự động</span>
                </button>
            `;
        }
    }

    function updateTimelineDomInPlace() {
        if (!appState.projectRoadmap || !appState.projectRoadmap.timelinePhases) return;
        const phases = appState.projectRoadmap.timelinePhases;
        const taskMap = {};
        phases.forEach((p, pi) => {
            (p.tasks || []).forEach((t, ti) => {
                if (!t.id) t.id = `task_${pi}_${ti}`;
                taskMap[t.id] = { task: t, p, pi, ti };
            });
        });

        const rows = document.querySelectorAll("#rmTimelineContainer tr[data-task-id]");
        rows.forEach(tr => {
            const taskId = tr.getAttribute("data-task-id");
            const info = taskMap[taskId];
            if (!info) return;
            const { task: t, p, pi, ti } = info;

            // Date input
            const dateInput = tr.querySelector(".task-date-input");
            if (dateInput && document.activeElement !== dateInput) {
                dateInput.value = t.date || "";
            }

            // Day of week badge
            const dayBadge = tr.querySelector(".task-day-badge");
            if (dayBadge) {
                const dayName = t.dayOfWeek || getDayOfWeekInVietnamese(t.date);
                dayBadge.textContent = dayName;
                const isWeekend = dayName.includes("Chủ Nhật") || dayName.includes("Thứ Bảy");
                dayBadge.className = `task-day-badge text-[9.5px] font-bold ${isWeekend ? 'text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200' : 'text-slate-700'}`;
            }

            // Mode Badge
            const modeCell = tr.querySelector(".task-mode-cell");
            if (modeCell) {
                modeCell.innerHTML = getModeBadgeHtml(t);
                const badgeBtn = modeCell.querySelector(".btn-task-formula-badge");
                if (badgeBtn) {
                    badgeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        openTaskFormulaModal(p, pi, t, ti);
                    });
                }
            }

            // Duration input
            const durInput = tr.querySelector(".task-duration-input");
            if (durInput && document.activeElement !== durInput) {
                durInput.value = t.duration !== undefined ? t.duration : 1;
            }

            // Formula icon in duration cell
            const formulaBtn = tr.querySelector(".btn-task-formula");
            if (formulaBtn) {
                const formula = t.dateFormula || { type: "default" };
                const icon = formulaBtn.querySelector("i");
                if (icon) {
                    if (formula.type === "custom") {
                        icon.className = "fa-solid fa-link text-[9px] text-purple-600 font-bold";
                    } else if (formula.type === "manual") {
                        icon.className = "fa-solid fa-thumbtack text-[9px] text-amber-600 font-bold";
                    } else {
                        icon.className = "fa-solid fa-arrows-rotate text-[9px] text-blue-500";
                    }
                }
            }
        });
    }

    function recalculateAllTaskDates(showToastNotification = false, updateInPlaceOnly = true) {
        if (!appState.projectRoadmap || !appState.projectRoadmap.timelinePhases) return;
        const phases = appState.projectRoadmap.timelinePhases;

        const allTasks = [];
        const taskMap = {};
        phases.forEach((p, pi) => {
            (p.tasks || []).forEach((t, ti) => {
                if (!t.id) t.id = `task_${pi}_${ti}`;
                allTasks.push({ p, pi, t, ti });
                taskMap[t.id] = t;
            });
        });

        let lastTaskWithDate = null;

        allTasks.forEach((item, idx) => {
            const { t } = item;
            const formula = t.dateFormula || { type: "default" };

            if (formula.type === "manual") {
                // Fixed date anchor set by user
                if (t.date) {
                    lastTaskWithDate = t;
                }
            } else if (formula.type === "custom" && formula.refTaskId) {
                // Dependent on milestone
                const refTask = taskMap[formula.refTaskId] || allTasks.find(x => x.t.id === formula.refTaskId || x.t.name === formula.refTaskId)?.t;
                if (refTask && refTask.date) {
                    const refDur = parseInt(refTask.duration, 10) || 0;
                    const offset = parseInt(formula.offsetDays, 10) || 0;
                    t.date = addDaysToDate(refTask.date, refDur + offset);
                    lastTaskWithDate = t;
                }
            } else {
                // Default chain: Date = Prev Date + Prev Duration
                if (idx === 0) {
                    if (t.date) lastTaskWithDate = t;
                } else if (lastTaskWithDate && lastTaskWithDate.date) {
                    const prevDur = parseInt(lastTaskWithDate.duration, 10) || 0;
                    t.date = addDaysToDate(lastTaskWithDate.date, prevDur);
                    lastTaskWithDate = t;
                }
            }

            t.dayOfWeek = getDayOfWeekInVietnamese(t.date);
        });

        if (updateInPlaceOnly) {
            updateTimelineDomInPlace();
        } else {
            renderTimelineTable(window.currentTimelineFilter || "all");
        }
        saveState();
        if (showToastNotification) {
            showToast("Đã tự động tính toán lại ngày và thứ cho toàn bộ văn bản!", "success");
        }
    }

    let currentFormulaContext = null;

    function openTaskFormulaModal(phase, pIdx, task, tIdx) {
        currentFormulaContext = { phase, pIdx, task, tIdx };
        const modal = document.getElementById("modalTaskFormulaConfig");
        if (!modal) return;

        const nameEl = document.getElementById("formulaTaskNameDisplay");
        const docNoEl = document.getElementById("formulaTaskDocNoDisplay");
        const dateEl = document.getElementById("formulaTaskDateDisplay");
        const dayEl = document.getElementById("formulaTaskDayDisplay");

        if (nameEl) nameEl.textContent = `[${phase.title}] #${task.stt || (tIdx + 1)}: ${task.name}`;
        if (docNoEl) docNoEl.textContent = task.docNo || "Chưa có số";
        if (dateEl) dateEl.textContent = task.date || "Chưa có ngày";
        if (dayEl) dayEl.textContent = getDayOfWeekInVietnamese(task.date);

        const formula = task.dateFormula || { type: "default" };
        const radios = document.querySelectorAll('input[name="formulaType"]');
        radios.forEach(r => {
            r.checked = (r.value === (formula.type || "default"));
        });

        const customControls = document.getElementById("customFormulaControls");
        const refSelect = document.getElementById("formulaRefTaskSelect");
        const offsetInput = document.getElementById("formulaOffsetDays");

        if (customControls) {
            customControls.classList.toggle("hidden", formula.type !== "custom");
        }

        if (refSelect) {
            refSelect.innerHTML = "";
            const allPhases = appState.projectRoadmap.timelinePhases || [];
            allPhases.forEach((p, pi) => {
                (p.tasks || []).forEach((t, ti) => {
                    if (t === task) return;
                    const opt = document.createElement("option");
                    opt.value = t.id || `task_${pi}_${ti}`;
                    const dStr = t.date ? ` (${t.date})` : "";
                    opt.textContent = `[${p.code || (pi + 1)}] #${t.stt || (ti + 1)}: ${t.name}${dStr}`;
                    if (formula.refTaskId && (t.id === formula.refTaskId || t.name === formula.refTaskId)) {
                        opt.selected = true;
                    }
                    refSelect.appendChild(opt);
                });
            });
        }

        if (offsetInput) {
            offsetInput.value = formula.offsetDays !== undefined ? formula.offsetDays : 0;
        }

        updateFormulaModalPreview();
        modal.classList.remove("hidden");
    }

    function updateFormulaModalPreview() {
        if (!currentFormulaContext) return;
        const { task, pIdx, tIdx } = currentFormulaContext;
        const selectedRadio = document.querySelector('input[name="formulaType"]:checked');
        const fType = selectedRadio ? selectedRadio.value : "default";

        const customControls = document.getElementById("customFormulaControls");
        if (customControls) {
            customControls.classList.toggle("hidden", fType !== "custom");
        }

        let calculatedDate = "";
        if (fType === "manual") {
            calculatedDate = task.date || "";
        } else if (fType === "custom") {
            const refSelect = document.getElementById("formulaRefTaskSelect");
            const offsetInput = document.getElementById("formulaOffsetDays");
            const refId = refSelect ? refSelect.value : "";
            const offset = parseInt(offsetInput ? offsetInput.value : 0, 10) || 0;

            let refTask = null;
            (appState.projectRoadmap.timelinePhases || []).forEach(p => {
                (p.tasks || []).forEach(t => {
                    if (t.id === refId || t.name === refId) refTask = t;
                });
            });

            if (refTask && refTask.date) {
                const refDur = parseInt(refTask.duration, 10) || 0;
                calculatedDate = addDaysToDate(refTask.date, refDur + offset);
            }
        } else {
            const prevTask = getPreviousTaskInProject(pIdx, tIdx);
            if (prevTask && prevTask.date) {
                const prevDur = parseInt(prevTask.duration, 10) || 0;
                calculatedDate = addDaysToDate(prevTask.date, prevDur);
            } else {
                calculatedDate = task.date || "";
            }
        }

        const previewDiv = document.getElementById("formulaCalcPreview");
        const previewDay = document.getElementById("formulaCalcDayOfWeek");
        if (previewDiv) {
            previewDiv.textContent = calculatedDate || "(Chưa đủ mốc để tính)";
        }
        if (previewDay) {
            previewDay.textContent = calculatedDate ? getDayOfWeekInVietnamese(calculatedDate) : "---";
        }
    }

    function renderTimelineTable(filterMode = "all") {
        window.currentTimelineFilter = filterMode;
        const rmTimelineContainer = document.getElementById("rmTimelineContainer");
        const rmTimelineStats = document.getElementById("rmTimelineStats");
        if (!rmTimelineContainer || !appState.projectRoadmap) return;

        ensureTaskDefaults();

        const phases = appState.projectRoadmap.timelinePhases || [];
        rmTimelineContainer.innerHTML = "";

        const taskMap = {};
        phases.forEach((p, pi) => {
            (p.tasks || []).forEach((t, ti) => {
                if (!t.id) t.id = `task_${pi}_${ti}`;
                taskMap[t.id] = t;
            });
        });

        const selPkgIdx = appState.selectedRoadmapPackageIndex;
        const pkgs = appState.projectRoadmap.packages || [];
        const currentPkg = (selPkgIdx >= 0 && selPkgIdx < pkgs.length) ? pkgs[selPkgIdx] : null;

        let totalTasks = 0;
        let finishedTasks = 0;
        let renderedPhaseCount = 0;

        phases.forEach((phase, pIdx) => {
            const isInitPhase = phase.code === "I" || phase.title.toLowerCase().includes("triển khai") || !phase.isPackage;
            
            let shouldShowPhase = false;
            if (selPkgIdx === -1) {
                shouldShowPhase = true;
            } else if (selPkgIdx === "trien_khai") {
                shouldShowPhase = isInitPhase;
            } else if (selPkgIdx >= 0 && currentPkg) {
                if (isInitPhase) {
                    shouldShowPhase = true;
                } else {
                    const pTitle = phase.title.toLowerCase();
                    const pkgName = currentPkg.name.toLowerCase();
                    const pkgNum = `gói thầu số ${selPkgIdx + 1}`.toLowerCase();
                    const pkgNumShort = `gói ${selPkgIdx + 1}`.toLowerCase();

                    if (pTitle.includes(pkgNum) || pTitle.includes(pkgNumShort) || pTitle.includes(pkgName) || pkgName.includes(pTitle)) {
                        shouldShowPhase = true;
                    }
                    if (selPkgIdx === 0 && pTitle.includes("thiết kế & dự toán")) {
                        shouldShowPhase = true;
                    }
                }
            }

            if (!shouldShowPhase) return;
            renderedPhaseCount++;

            const phaseWrapper = document.createElement("div");
            phaseWrapper.className = "border border-slate-200 rounded overflow-hidden shadow-2xs";

            let tasksToRender = phase.tasks || [];
            totalTasks += tasksToRender.length;
            finishedTasks += tasksToRender.filter(t => t.status === "Đã xong").length;

            if (filterMode === "unfinished") {
                tasksToRender = tasksToRender.filter(t => t.status !== "Đã xong");
            }

            const phaseTasksDone = (phase.tasks || []).filter(t => t.status === "Đã xong").length;
            const phaseTotal = (phase.tasks || []).length;
            const isPhaseDone = phaseTasksDone === phaseTotal && phaseTotal > 0;

            const badgePhaseColor = isInitPhase 
                ? "bg-slate-800 text-white" 
                : "bg-emerald-700 text-white";

            const implOptionsHtml = IMPLEMENTATION_MATRIX.implementationTypes.map(it => 
                `<option value="${it.id}" ${it.id === (appState.projectRoadmap.implementationTypeId || "trien_khai_sua_chua") ? "selected" : ""}>${it.name}</option>`
            ).join("");

            phaseWrapper.innerHTML = `
                <div class="bg-slate-50 hover:bg-slate-100/70 px-2 py-1 border-b border-slate-200 flex items-center justify-between cursor-pointer phase-header h-6.5 select-none transition-colors">
                    <div class="flex items-center space-x-1.5 min-w-0">
                        <span class="w-4 h-4 rounded text-[9.5px] font-bold flex items-center justify-center ${badgePhaseColor}">${phase.code || (pIdx + 1)}</span>
                        <span class="font-bold text-[11px] text-slate-800 truncate">${phase.title}</span>
                        ${isInitPhase ? `
                            <span class="text-[9px] bg-slate-200 text-slate-700 px-1 py-0 rounded font-medium">Toàn dự án</span>
                            <select class="sel-phase-impl-type bg-white border border-slate-300 rounded px-1 py-0 h-5 text-[9.5px] font-bold text-slate-700 ml-1 cursor-pointer" title="Đổi quy trình triển khai cho toàn dự án" onclick="event.stopPropagation()">
                                ${implOptionsHtml}
                            </select>
                            <button type="button" class="btn-config-impl-phase p-0.5 text-slate-400 hover:text-emerald-700 text-[10px]" title="Cấu hình danh mục văn bản triển khai" onclick="event.stopPropagation()">
                                <i class="fa-solid fa-gear"></i>
                            </button>
                        ` : `<span class="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0 rounded font-medium">Gói ${selPkgIdx !== undefined && selPkgIdx >= 0 ? selPkgIdx + 1 : ''}</span>`}
                    </div>
                    <div class="flex items-center space-x-1.5 shrink-0">
                        <span class="text-[9.5px] font-bold px-1.5 py-0 rounded-full ${isPhaseDone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">${phaseTasksDone}/${phaseTotal} việc</span>
                        <i class="fa-solid fa-chevron-down text-slate-400 text-[9px] transition-transform"></i>
                    </div>
                </div>
                <div class="phase-content overflow-x-auto">
                    <table class="w-full text-[10.5px] text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold text-[9px] uppercase tracking-wider h-5">
                                <th class="py-0.5 px-1 w-7 text-center">STT</th>
                                <th class="py-0.5 px-1.5">Tên công việc / Thủ tục</th>
                                <th class="py-0.5 px-1 w-32">Số văn bản</th>
                                <th class="py-0.5 px-1 w-20">Đơn vị ký</th>
                                <th class="py-0.5 px-1 w-20 text-center" title="Chế độ tính ngày: Tự động tiếp nối, Liên kết mốc, hoặc Thủ công">Chế độ</th>
                                <th class="py-0.5 px-1 w-14 text-center">Thứ</th>
                                <th class="py-0.5 px-1 w-24 text-center">Ngày ký</th>
                                <th class="py-0.5 px-1 w-16 text-center">Thời gian</th>
                                <th class="py-0.5 px-1 w-16 text-center">Tiến độ</th>
                                <th class="py-0.5 px-1 w-12 text-center">Soạn</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${tasksToRender.map((task) => {
                                const realTaskIdx = (phase.tasks || []).indexOf(task);
                                const isDone = task.status === "Đã xong";
                                const badgeClass = isDone 
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                                    : (task.status === "Đang làm" ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-slate-100 text-slate-700 border-slate-200");
                                
                                const dayName = task.dayOfWeek || getDayOfWeekInVietnamese(task.date);
                                const isWeekend = dayName.includes("Chủ Nhật") || dayName.includes("Thứ Bảy");
                                const formula = task.dateFormula || { type: "default" };
                                const isCustomFormula = formula.type === "custom";
                                const isManual = formula.type === "manual";
                                const formulaIconClass = isCustomFormula 
                                    ? "fa-solid fa-link text-[9px] text-purple-600 font-bold" 
                                    : (isManual ? "fa-solid fa-thumbtack text-[9px] text-amber-600 font-bold" : "fa-solid fa-arrows-rotate text-[9px] text-blue-500");
                                const formulaTooltip = isCustomFormula 
                                    ? "Công thức: Phụ thuộc vào công việc mốc khác (Bấm để sửa)" 
                                    : (isManual ? "Ngày mốc cố định thủ công (Bấm để cài công thức)" : "Công thức mặc định: Tiếp nối ngày việc trước + thời gian (Bấm để sửa)");

                                // Detect linked document for this task
                                let linkedDocCode = task.docCode || "";
                                let linkedDocName = "";
                                let linkedDocId = task.docId || "";

                                if (isInitPhase) {
                                    const curImpl = IMPLEMENTATION_MATRIX.implementationTypes.find(t => t.id === appState.projectRoadmap.implementationTypeId) || IMPLEMENTATION_MATRIX.implementationTypes[0];
                                    if (curImpl) {
                                        const mDoc = (curImpl.documents || []).find(d => d.id === task.docId || d.code === task.docCode || d.name === task.name);
                                        if (mDoc) {
                                            linkedDocCode = mDoc.code;
                                            linkedDocName = mDoc.name;
                                            linkedDocId = mDoc.id;
                                        }
                                    }
                                } else {
                                    let pkgForPhase = currentPkg;
                                    if (!pkgForPhase && selPkgIdx === -1) {
                                        pkgForPhase = pkgs.find(p => phase.title.includes(p.name) || (phase.packageName && p.name.includes(phase.packageName))) || pkgs[0];
                                    }
                                    if (pkgForPhase) {
                                        const pt = PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === pkgForPhase.procurementTypeId) || PROCUREMENT_MATRIX.procurementTypes[3];
                                        if (pt) {
                                            const allTypeDocs = [];
                                            (pt.phases || []).forEach(ph => (ph.documents || []).forEach(d => allTypeDocs.push(d)));
                                            let mDoc = allTypeDocs.find(d => d.id === task.docId || (d.code && task.docCode && d.code.toLowerCase() === task.docCode.toLowerCase()));
                                            if (!mDoc) {
                                                mDoc = allTypeDocs.find(d => {
                                                    const dNameClean = d.name.toLowerCase().replace(/^[0-9\.\s]+/, "");
                                                    const tNameClean = task.name.toLowerCase().replace(/^\[.*?\]\s*/, "").replace(/^[0-9\.\s]+/, "");
                                                    return dNameClean.includes(tNameClean) || tNameClean.includes(dNameClean) || (d.code && task.name.toLowerCase().includes(d.code.toLowerCase()));
                                                });
                                            }
                                            if (mDoc) {
                                                linkedDocCode = mDoc.code;
                                                linkedDocName = mDoc.name;
                                                linkedDocId = mDoc.id;
                                            }
                                        }
                                    }
                                }

                                return `
                                    <tr class="hover:bg-slate-50 transition-colors h-6" data-phase-idx="${pIdx}" data-task-idx="${realTaskIdx}" data-task-id="${task.id}">
                                        <td class="py-0.5 px-1 text-center text-slate-400 font-bold text-[10px]">${task.stt || (realTaskIdx + 1)}</td>
                                        <td class="py-0.5 px-1.5 font-bold text-slate-800 text-[10.5px]">
                                            <div class="flex items-center gap-1.5 flex-wrap">
                                                <span class="truncate max-w-[280px]" title="${task.name}">${task.name}</span>
                                                ${linkedDocCode ? `
                                                    <button type="button" class="btn-link-doc-pill px-1.5 py-0.2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 border border-blue-200 rounded font-mono text-[9px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0" data-phase-idx="${pIdx}" data-task-idx="${realTaskIdx}" data-task-id="${task.id}" data-doc-id="${linkedDocId}" title="Văn bản liên kết: ${linkedDocName || task.name} (Bấm để sang Tab 2 soạn)">
                                                        <i class="fa-solid fa-file-word text-blue-600 text-[8.5px]"></i>
                                                        <span>${linkedDocCode}</span>
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </td>
                                        <td class="py-0.5 px-1">
                                            <input type="text" class="task-docno-input w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-800 placeholder-slate-300 focus:ring-1 focus:ring-emerald-500 transition-all" value="${task.docNo || ''}" placeholder="Nhập số VB..." title="Chỉnh sửa số văn bản trực tiếp" data-p-idx="${pIdx}" data-t-idx="${realTaskIdx}" data-task-id="${task.id}">
                                        </td>
                                        <td class="py-0.5 px-1 text-slate-600 text-[10px] truncate" title="${task.signer || ''}">${task.signer || "---"}</td>
                                        <td class="py-0.5 px-1 text-center task-mode-cell">
                                            ${getModeBadgeHtml(task)}
                                        </td>
                                        <td class="py-0.5 px-1 text-center">
                                            <span class="task-day-badge text-[9.5px] font-bold ${isWeekend ? 'text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200' : 'text-slate-700'}">${dayName}</span>
                                        </td>
                                        <td class="py-0.5 px-1 text-center">
                                            <input type="date" class="task-date-input w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 rounded px-1 py-0.5 font-mono text-[9.5px] text-slate-800 focus:ring-1 focus:ring-emerald-500" value="${task.date || ''}" title="Ngày ký / thực hiện văn bản" data-p-idx="${pIdx}" data-t-idx="${realTaskIdx}" data-task-id="${task.id}">
                                        </td>
                                        <td class="py-0.5 px-1 text-center">
                                            <div class="flex items-center justify-center space-x-0.5">
                                                <input type="number" min="0" max="999" class="task-duration-input w-10 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 rounded px-0.5 py-0.5 text-center text-[10px] font-bold text-slate-800 focus:ring-1 focus:ring-emerald-500" value="${task.duration !== undefined ? task.duration : 1}" title="Thời gian thực hiện văn bản (ngày)" data-p-idx="${pIdx}" data-t-idx="${realTaskIdx}" data-task-id="${task.id}">
                                                <button type="button" class="btn-task-formula p-0.5 rounded hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors" data-p-idx="${pIdx}" data-t-idx="${realTaskIdx}" data-task-id="${task.id}" title="${formulaTooltip}">
                                                    <i class="${formulaIconClass}"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="py-0.5 px-1 text-center">
                                            <span class="inline-block px-1 py-0 rounded border font-bold text-[9px] ${badgeClass}">${task.status || "Chưa làm"}</span>
                                        </td>
                                        <td class="py-0.5 px-1 text-center">
                                            <button type="button" class="btn-task-soan px-1.5 py-0 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-300 hover:border-emerald-300 rounded font-bold text-[9px] h-4.5" data-phase-idx="${pIdx}" data-task-idx="${realTaskIdx}" title="Mở sang Tab 2 để soạn văn bản này">
                                                <i class="fa-solid fa-pen-to-square text-[8px]"></i> Soạn
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    </table>
                </div>
            `;

            // Toggle collapse
            const header = phaseWrapper.querySelector(".phase-header");
            const content = phaseWrapper.querySelector(".phase-content");
            const chevron = phaseWrapper.querySelector(".fa-chevron-down");
            header.addEventListener("click", () => {
                content.classList.toggle("hidden");
                chevron.style.transform = content.classList.contains("hidden") ? "rotate(-90deg)" : "rotate(0deg)";
            });

            // Handle editable Document Number
            phaseWrapper.querySelectorAll(".task-docno-input").forEach(input => {
                input.addEventListener("input", (e) => {
                    const tr = e.target.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    phases[pI].tasks[tI].docNo = e.target.value.trim();
                });
                input.addEventListener("change", () => {
                    saveState();
                });
            });

            // Handle editable Date with REAL-TIME AUTO CASCADE
            phaseWrapper.querySelectorAll(".task-date-input").forEach(input => {
                const handleDate = (el) => {
                    const tr = el.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    const taskId = tr.getAttribute("data-task-id");
                    const t = taskMap[taskId] || phases[pI].tasks[tI];
                    if (!t) return;

                    const val = el.value;
                    t.date = val;
                    t.dayOfWeek = getDayOfWeekInVietnamese(val);
                    
                    // Manually setting a date marks it as a fixed milestone anchor
                    t.dateFormula = { type: "manual" };

                    // TỰ ĐỘNG TÍNH TOÁN DÂY CHUYỀN NGAY LẬP TỨC (không cần bấm nút)
                    recalculateAllTaskDates(false, true);
                };

                input.addEventListener("input", (e) => {
                    if (e.target.value && e.target.value.length === 10) {
                        handleDate(e.target);
                    }
                });
                input.addEventListener("change", (e) => {
                    handleDate(e.target);
                });
            });

            // Handle editable Duration with REAL-TIME AUTO CASCADE
            phaseWrapper.querySelectorAll(".task-duration-input").forEach(input => {
                const handleDur = (el) => {
                    const tr = el.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    const taskId = tr.getAttribute("data-task-id");
                    const t = taskMap[taskId] || phases[pI].tasks[tI];
                    if (!t) return;

                    const val = parseInt(el.value, 10);
                    t.duration = isNaN(val) ? 0 : val;
                    // TỰ ĐỘNG TÍNH TOÁN DÂY CHUYỀN NGAY KHI GÕ HOẶC BẤM TĂNG/GIẢM (không cần bấm nút)
                    recalculateAllTaskDates(false, true);
                };

                input.addEventListener("input", (e) => handleDur(e.target));
                input.addEventListener("change", (e) => handleDur(e.target));
            });

            // Handle Formula Badge and Formula Button
            phaseWrapper.querySelectorAll(".btn-task-formula-badge, .btn-task-formula").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const tr = btn.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    const taskId = tr.getAttribute("data-task-id");
                    const t = taskMap[taskId] || phases[pI].tasks[tI];
                    openTaskFormulaModal(phases[pI], pI, t, tI);
                });
            });

            // Handle Navigation to Tab 2 for Document
            const handleNavigateToDoc = (pI, tI, taskId, docId) => {
                const p = phases[pI];
                if (!p) return;
                const t = taskMap[taskId] || (p.tasks || [])[tI];
                if (!t) return;

                if (p.isPackage || (!p.code || p.code !== "I" && !p.title.toLowerCase().includes("triển khai"))) {
                    let targetPkgIdx = selPkgIdx >= 0 ? selPkgIdx : 0;
                    const pTitle = p.title.toLowerCase();
                    pkgs.forEach((pkg, pki) => {
                        if (pTitle.includes(pkg.name.toLowerCase()) || pTitle.includes(`gói thầu số ${pki + 1}`) || pTitle.includes(`gói ${pki + 1}`)) {
                            targetPkgIdx = pki;
                        }
                    });
                    appState.activePackageIndex = targetPkgIdx;
                    const curPkg = pkgs[targetPkgIdx];
                    if (curPkg) {
                        appState.selectedProcurementTypeId = curPkg.procurementTypeId || "chi_dinh_thau_rut_gon";
                        const pt = PROCUREMENT_MATRIX.procurementTypes.find(tp => tp.id === appState.selectedProcurementTypeId);
                        if (pt) {
                            const allDocs = [];
                            (pt.phases || []).forEach(ph => (ph.documents || []).forEach(d => allDocs.push(d)));
                            const matched = allDocs.find(d => d.id === docId || d.id === t.docId || (d.code && t.docCode && d.code === t.docCode) || d.name === t.name);
                            if (matched) {
                                appState.activeDocId = matched.id;
                            }
                        }
                    }
                } else {
                    if (docId || t.docId) {
                        appState.activeDocId = docId || t.docId;
                    }
                }

                switchMainTab("docs");
                showToast(`Đã chuyển sang soạn thảo: ${t.name}`);
            };

            // Wire .btn-link-doc-pill
            phaseWrapper.querySelectorAll(".btn-link-doc-pill").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const tr = btn.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    const taskId = tr.getAttribute("data-task-id");
                    const docId = btn.getAttribute("data-doc-id");
                    handleNavigateToDoc(pI, tI, taskId, docId);
                });
            });

            // Wire .btn-task-soan
            phaseWrapper.querySelectorAll(".btn-task-soan").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const tr = btn.closest("tr");
                    const pI = parseInt(tr.getAttribute("data-phase-idx"), 10);
                    const tI = parseInt(tr.getAttribute("data-task-idx"), 10);
                    const taskId = tr.getAttribute("data-task-id");
                    handleNavigateToDoc(pI, tI, taskId);
                });
            });

            // Wire Phase I Header implementation type selector and config gear
            const selImpl = phaseWrapper.querySelector(".sel-phase-impl-type");
            if (selImpl) {
                selImpl.addEventListener("change", (e) => {
                    e.stopPropagation();
                    const newTypeId = e.target.value;
                    appState.projectRoadmap.implementationTypeId = newTypeId;
                    applyImplementationTypeToRoadmap(newTypeId, true);
                    recalculateAllTaskDates(false, true);
                    renderRoadmapUI();
                    saveState();
                    showToast(`Đã áp dụng quy trình: ${selImpl.options[selImpl.selectedIndex].text}`);
                });
            }
            const btnCfgImpl = phaseWrapper.querySelector(".btn-config-impl-phase");
            if (btnCfgImpl) {
                btnCfgImpl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    activeAdminCategory = "implementation";
                    activeAdminImplTypeId = appState.projectRoadmap.implementationTypeId || IMPLEMENTATION_MATRIX.implementationTypes[0].id;
                    renderAdminMatrixModal();
                    const m = document.getElementById("modalProcurementMatrixManager");
                    if (m) m.classList.remove("hidden");
                });
            }

            rmTimelineContainer.appendChild(phaseWrapper);
        });

        if (rmTimelineStats) {
            const scopeText = selPkgIdx >= 0 && currentPkg 
                ? `Đang xem: Mục Triển khai + Gói ${selPkgIdx + 1}` 
                : (selPkgIdx === "trien_khai" ? "Đang xem: Mục Triển khai" : "Đang xem: Tất cả");
            rmTimelineStats.textContent = `${scopeText} | Đã xong ${finishedTasks}/${totalTasks} việc (${totalTasks > 0 ? Math.round(finishedTasks/totalTasks*100) : 0}%)`;
        }
    }

        // Parse CSV Timeline from User text
    function parseCsvTimelineText(csvText) {
        if (!csvText || !csvText.trim()) return null;

        const lines = csvText.trim().split(/\r?\n/);
        let projectTitle = "Dự án mới";
        if (lines[0].includes("Thứ tự thủ tục:")) {
            projectTitle = lines[0].split("Thứ tự thủ tục:")[1].split(",")[0].trim();
        }

        const phases = [];
        let currentPhase = null;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Simple CSV split handling quotes
            const row = [];
            let inQuotes = false;
            let currentVal = "";
            for (let c = 0; c < line.length; c++) {
                const char = line[c];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    row.push(currentVal.trim());
                    currentVal = "";
                } else {
                    currentVal += char;
                }
            }
            row.push(currentVal.trim());

            if (row.length === 0 || !row.some(x => x)) continue;

            const stt = row[0] || "";
            const name = row[1] || "";

            // Check header row
            if (stt === "Stt" || name === "Tên công việc") continue;

            // Check Phase Header (I, II, III, IV, or "Gói thầu...")
            const isPhaseHeader = ["I", "II", "III", "IV", "V", "VI", "VII"].includes(stt) || name.toLowerCase().includes("gói thầu") || name.toLowerCase().includes("triển khai");

            if (isPhaseHeader) {
                const title = name || stt;
                const isPkg = title.toLowerCase().includes("gói thầu") || title.toLowerCase().includes("gói");
                currentPhase = {
                    id: `phase_${phases.length + 1}`,
                    code: stt || String(phases.length + 1),
                    title: title,
                    isPackage: isPkg,
                    packageName: isPkg ? title : "",
                    tasks: []
                };
                phases.push(currentPhase);
                continue;
            }

            if (!currentPhase) {
                currentPhase = {
                    id: "phase_1",
                    code: "I",
                    title: "Triển khai",
                    isPackage: false,
                    tasks: []
                };
                phases.push(currentPhase);
            }

            currentPhase.tasks.push({
                stt: stt,
                name: name,
                docNo: row[2] || row[3] || "",
                signer: row[4] || "",
                date: row[6] || "",
                duration: row[7] || "",
                note: row[8] || "",
                status: row[9] || "Đã xong"
            });
        }

        // Extract packages from phases
        const extractedPackages = [];
        phases.forEach((p, idx) => {
            if (p.isPackage) {
                const isConsulting = p.title.toLowerCase().includes("thẩm tra") || p.title.toLowerCase().includes("tư vấn") || p.title.toLowerCase().includes("thiết kế");
                extractedPackages.push({
                    id: `pkg_${idx + 1}`,
                    name: p.title,
                    category: isConsulting ? "tu_van" : "xay_lap",
                    categoryLabel: isConsulting ? "Tư vấn" : "Xây lắp",
                    procurementTypeId: "chi_dinh_thau_rut_gon",
                    estimatedPrice: isConsulting ? "35.000.000" : "850.000.000",
                    contractType: "Trọn gói",
                    duration: isConsulting ? "15 ngày" : "30 ngày",
                    status: "Đang thực hiện",
                    fields: {
                        TEN_GOI_THAU: p.title.replace(/^Gói thầu số \d+:\s*/i, ""),
                        GIA_GOI_THAU_SO: isConsulting ? "35.000.000" : "850.000.000",
                        GIA_GOI_THAU_CHU: isConsulting ? "Ba mươi lăm triệu đồng chẵn" : "Tám trăm năm mươi triệu đồng chẵn",
                        HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                        LOAI_HOP_DONG: "Trọn gói",
                        THOI_GIAN_THUC_HIEN: isConsulting ? "15 ngày" : "30 ngày"
                    }
                });
            }
        });

        return {
            projectName: projectTitle,
            packages: extractedPackages.length > 0 ? extractedPackages : defaultRoadmap.packages,
            timelinePhases: phases
        };
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
                if (window.history && window.history.replaceState && appState.activeMainTab === "docs") {
                    window.history.replaceState({
                        tab: "docs",
                        activeDocId: doc.id,
                        pkgIdx: appState.activePackageIndex
                    }, "", "#docs");
                }
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

    function syncDocFieldChangeToTimeline(field, val) {
        if (!appState.projectRoadmap || !Array.isArray(appState.projectRoadmap.timelinePhases)) return;
        const phases = appState.projectRoadmap.timelinePhases;
        const selPkgIdx = appState.activePackageIndex !== undefined ? appState.activePackageIndex : 0;
        const pkgs = appState.projectRoadmap.packages || [];
        const currentPkg = pkgs[selPkgIdx];

        let pkgPhase = null;
        if (currentPkg) {
            pkgPhase = phases.find(p => p.isPackage && (
                p.title.includes(currentPkg.name) || 
                p.title.includes(`gói thầu số ${selPkgIdx + 1}`) || 
                p.title.includes(`gói ${selPkgIdx + 1}`)
            ));
        }
        if (!pkgPhase && phases.length > 1) {
            pkgPhase = phases[selPkgIdx + 1] || phases[1];
        }

        if (pkgPhase && Array.isArray(pkgPhase.tasks)) {
            let matchedTask = null;
            let isDateField = false;

            if (field === "SO_TO_TRINH") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("tờ trình") && !((t.name || "").toLowerCase().includes("kết quả") || (t.name || "").toLowerCase().includes("kq")));
            } else if (field === "NGAY_TO_TRINH") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("tờ trình") && !((t.name || "").toLowerCase().includes("kết quả") || (t.name || "").toLowerCase().includes("kq")));
                isDateField = true;
            } else if (field === "SO_QUYET_DINH") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("quyết định") || (t.name || "").toLowerCase().includes("qđ"));
            } else if (field === "NGAY_QUYET_DINH") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("quyết định") || (t.name || "").toLowerCase().includes("qđ"));
                isDateField = true;
            } else if (field === "SO_GIAY_MOI") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("thư mời") || (t.name || "").toLowerCase().includes("giấy mời"));
            } else if (field === "NGAY_GIAY_MOI") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("thư mời") || (t.name || "").toLowerCase().includes("giấy mời"));
                isDateField = true;
            } else if (field === "SO_BIEN_BAN_HOAN_THIEN" || field === "SO_BIEN_BAN") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("biên bản"));
            } else if (field === "NGAY_BIEN_BAN") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("biên bản"));
                isDateField = true;
            } else if (field === "SO_HOP_DONG") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("hợp đồng"));
            } else if (field === "NGAY_HOP_DONG" || field === "NGAY_KY_HOP_DONG") {
                matchedTask = pkgPhase.tasks.find(t => (t.name || "").toLowerCase().includes("hợp đồng"));
                isDateField = true;
            }

            if (matchedTask) {
                if (isDateField) {
                    let isoDate = val;
                    if (val && val.includes("/")) {
                        const parts = val.split("/");
                        if (parts.length === 3) isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                    }
                    if (isoDate && isoDate.length === 10) {
                        matchedTask.date = isoDate;
                        matchedTask.dayOfWeek = getDayOfWeekInVietnamese(isoDate);
                        matchedTask.dateFormula = { type: "manual" };
                    }
                } else {
                    matchedTask.docNo = val;
                }
            }
        }
    }

    // Handle input change with two-way sync
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

        // Đồng bộ ngược lại task ở Tab Tiến độ nếu người dùng đổi số/ngày tại form
        syncDocFieldChangeToTimeline(field, val);

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
        const merged = {
            ...appState.generalInfo,
            ...currentPkg.fields
        };
        // Tự động link ngày tháng & số văn bản từ Tab 1: Định hướng & Tiến độ
        syncTimelineDatesAndDocNosToData(merged);
        return merged;
    }

    function formatDateToVN(dateStr) {
        if (!dateStr || String(dateStr).trim() === "") return "";
        const str = String(dateStr).trim();
        if (str.includes("/")) return str;
        if (str.includes("-")) {
            const parts = str.split("-");
            if (parts.length === 3) {
                return `${parts[2].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[0]}`;
            }
        }
        return str;
    }

    function syncTimelineDatesAndDocNosToData(merged) {
        if (!appState.projectRoadmap || !Array.isArray(appState.projectRoadmap.timelinePhases)) return;
        const phases = appState.projectRoadmap.timelinePhases;
        const selPkgIdx = appState.activePackageIndex !== undefined ? appState.activePackageIndex : 0;
        const pkgs = appState.projectRoadmap.packages || [];
        const currentPkg = pkgs[selPkgIdx];

        // 1. Map package-level phase
        let pkgPhase = null;
        if (currentPkg) {
            pkgPhase = phases.find(p => p.isPackage && (
                p.title.includes(currentPkg.name) || 
                p.title.includes(`gói thầu số ${selPkgIdx + 1}`) || 
                p.title.includes(`gói ${selPkgIdx + 1}`)
            ));
        }
        if (!pkgPhase && phases.length > 1) {
            pkgPhase = phases[selPkgIdx + 1] || phases[1];
        }

        if (pkgPhase && Array.isArray(pkgPhase.tasks)) {
            pkgPhase.tasks.forEach(t => {
                const name = (t.name || "").toLowerCase();
                const docCode = (t.docCode || "").toLowerCase();
                const docNo = t.docNo ? t.docNo.trim() : "";
                const vnDate = t.date ? formatDateToVN(t.date) : "";

                // Tờ trình KHLCNT
                if (docCode.includes("ttr-khlcnt") || (name.includes("tờ trình") && (name.includes("kh lcnt") || name.includes("khlcnt")))) {
                    if (docNo) merged.SO_TO_TRINH = docNo;
                    if (vnDate) merged.NGAY_TO_TRINH = vnDate;
                }
                // Quyết định KHLCNT
                else if (docCode.includes("qd-khlcnt") || ((name.includes("qđ") || name.includes("quyết định")) && (name.includes("kh lcnt") || name.includes("khlcnt")))) {
                    if (docNo) merged.SO_QUYET_DINH = docNo;
                    if (vnDate) merged.NGAY_QUYET_DINH = vnDate;
                }
                // Giấy mời / Thư mời
                else if (docCode.includes("gm") || name.includes("thư mời") || name.includes("giấy mời")) {
                    if (docNo) merged.SO_GIAY_MOI = docNo;
                    if (vnDate) merged.NGAY_GIAY_MOI = vnDate;
                }
                // Biên bản thương thảo / hoàn thiện
                else if (docCode.includes("bb") || (name.includes("biên bản") && (name.includes("thương thảo") || name.includes("hoàn thiện")))) {
                    if (docNo) {
                        merged.SO_BIEN_BAN_HOAN_THIEN = docNo;
                        merged.SO_BIEN_BAN = docNo;
                    }
                    if (vnDate) merged.NGAY_BIEN_BAN = vnDate;
                }
                // Tờ trình KQ LCNT / chỉ định thầu
                else if (docCode.includes("ttr-kqlcnt") || (name.includes("tờ trình") && (name.includes("kq lcnt") || name.includes("kết quả")))) {
                    if (docNo) merged.SO_TO_TRINH_KQLCNT = docNo;
                    if (vnDate) merged.NGAY_TO_TRINH_KQLCNT = vnDate;
                }
                // Quyết định KQ LCNT / chỉ định thầu
                else if (docCode.includes("qd-kqlcnt") || ((name.includes("qđ") || name.includes("quyết định")) && (name.includes("kq lcnt") || name.includes("kết quả") || name.includes("chỉ định thầu")))) {
                    if (docNo) merged.SO_QUYET_DINH_KQLCNT = docNo;
                    if (vnDate) merged.NGAY_QUYET_DINH_KQLCNT = vnDate;
                }
                // Hợp đồng
                else if (docCode.includes("hd") || name.includes("hợp đồng")) {
                    if (docNo) merged.SO_HOP_DONG = docNo;
                    if (vnDate) {
                        merged.NGAY_HOP_DONG = vnDate;
                        merged.NGAY_KY_HOP_DONG = vnDate;
                    }
                }
            });
        }

        // 2. Map according to the currently active document
        const activeDoc = getCurrentActiveDoc();
        if (activeDoc) {
            // If active doc is Tờ trình KQ LCNT (cdtrg_5), use its specific numbers in preview
            if (activeDoc.id === "cdtrg_5" && merged.SO_TO_TRINH_KQLCNT) {
                merged.SO_TO_TRINH = merged.SO_TO_TRINH_KQLCNT;
                if (merged.NGAY_TO_TRINH_KQLCNT) merged.NGAY_TO_TRINH = merged.NGAY_TO_TRINH_KQLCNT;
            }
            // If active doc is QĐ KQ LCNT (cdtrg_6), use its specific numbers
            if (activeDoc.id === "cdtrg_6" && merged.SO_QUYET_DINH_KQLCNT) {
                merged.SO_QUYET_DINH = merged.SO_QUYET_DINH_KQLCNT;
                if (merged.NGAY_QUYET_DINH_KQLCNT) merged.NGAY_QUYET_DINH = merged.NGAY_QUYET_DINH_KQLCNT;
            }
            // If active doc is Hợp đồng (cdtrg_7)
            if (activeDoc.id === "cdtrg_7") {
                if (merged.SO_QUYET_DINH_KQLCNT) merged.SO_QUYET_DINH = merged.SO_QUYET_DINH_KQLCNT;
                if (merged.NGAY_QUYET_DINH_KQLCNT) merged.NGAY_QUYET_DINH = merged.NGAY_QUYET_DINH_KQLCNT;
            }
        }
    }

    function valOrPlaceholder(key, data) {
        const val = data[key];
        if (val && String(val).trim() !== "") {
            return `<span class="filled-val" data-var-key="${key}" title="Biến: {${key}} (Quét khối hoặc chuột phải để đổi/gộp biến)">${val}</span>`;
        }
        return `<span class="placeholder-tag" data-var-key="${key}" data-missing-key="${key}" title="Bấm để nhảy tới ô nhập liệu {${key}}"><i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${key}}</span>`;
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

        // Kiểm tra xem văn bản này đã có bản chỉnh sửa tùy biến trực tiếp hay chưa
        if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
        const btnResetPreviewDoc = document.getElementById("btnResetPreviewDoc");

        if (appState.customDocumentHtml[docId]) {
            // Tải lại bản tùy biến của người dùng và điền các giá trị biến mới nhất
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = appState.customDocumentHtml[docId];
            tempDiv.querySelectorAll("[data-var-key]").forEach(el => {
                const k = el.getAttribute("data-var-key");
                const currentVal = data[k];
                if (currentVal && String(currentVal).trim() !== "") {
                    el.className = "filled-val";
                    el.textContent = currentVal;
                } else {
                    el.className = "placeholder-tag";
                    el.innerHTML = `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${k}}`;
                }
            });
            documentPreviewContent.innerHTML = tempDiv.innerHTML;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
        } else {
            documentPreviewContent.innerHTML = html;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.add("hidden");
        }
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
        const allDocs = getAllDocsForCurrentType();
        const docObj = allDocs.find(d => d.id === docId);
        let templateUrl = (docObj && docObj.templateFile !== undefined) ? docObj.templateFile : (prebuiltDocxMap[docId] || "");
        if (!templateUrl) templateUrl = "templates/3_To_trinh_chi_dinh_thau.docx";

        let arrayBuffer;
        if (window.customUploadedDocx && window.customUploadedDocx[templateUrl]) {
            arrayBuffer = window.customUploadedDocx[templateUrl];
        } else {
            const response = await fetch(templateUrl);
            if (!response.ok) throw new Error("Không thể tải file mẫu: " + templateUrl);
            arrayBuffer = await response.arrayBuffer();
        }

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

    // -------------------------------------------------------------
    // Roadmap & Timeline Event Listeners
    // -------------------------------------------------------------
    const btnNavRoadmap = document.getElementById("btnNavRoadmap");
    const btnNavDocs = document.getElementById("btnNavDocs");
    const btnGoToDocs = document.getElementById("btnGoToDocs");

    if (btnNavRoadmap) btnNavRoadmap.addEventListener("click", () => switchMainTab("roadmap", true));
    if (btnNavDocs) btnNavDocs.addEventListener("click", () => switchMainTab("docs", true));
    if (btnGoToDocs) btnGoToDocs.addEventListener("click", () => switchMainTab("docs", true));

    const btnBackToRoadmap = document.getElementById("btnBackToRoadmap");
    if (btnBackToRoadmap) {
        btnBackToRoadmap.addEventListener("click", () => {
            if (window.history && window.history.length > 1) {
                window.history.back();
            } else {
                switchMainTab("roadmap", true);
            }
        });
    }

    // Lắng nghe sự kiện Back / Forward của trình duyệt (PopState)
    window.addEventListener("popstate", (e) => {
        let targetTab = "roadmap";
        if (e.state && e.state.tab) {
            targetTab = e.state.tab;
            if (e.state.activeDocId) {
                appState.activeDocId = e.state.activeDocId;
            }
            if (e.state.pkgIdx !== undefined) {
                appState.activePackageIndex = e.state.pkgIdx;
            }
        } else {
            const hash = window.location.hash;
            if (hash === "#docs" || hash === "#tao-ho-so") {
                targetTab = "docs";
            } else {
                targetTab = "roadmap";
            }
        }
        switchMainTab(targetTab, false);
    });

    // Sync input changes from Roadmap to state
    const rmProjectName = document.getElementById("rmProjectName");
    const rmInvestorName = document.getElementById("rmInvestorName");
    const rmApprover = document.getElementById("rmApprover");
    const rmFundingSource = document.getElementById("rmFundingSource");

    if (rmProjectName) rmProjectName.addEventListener("input", (e) => {
        if (!appState.projectRoadmap) appState.projectRoadmap = {};
        appState.projectRoadmap.projectName = e.target.value;
        appState.generalInfo.TEN_DU_AN = e.target.value;
        appState.generalInfo.TEN_CONG_TRINH = e.target.value;
        saveState();
    });

    if (rmInvestorName) rmInvestorName.addEventListener("input", (e) => {
        if (!appState.projectRoadmap) appState.projectRoadmap = {};
        appState.projectRoadmap.investorName = e.target.value;
        appState.generalInfo.TEN_CHU_DAU_TU = e.target.value;
        appState.generalInfo.TEN_CHU_DAU_TU_VIET_HOA = e.target.value.toUpperCase();
        saveState();
    });

    if (rmApprover) rmApprover.addEventListener("input", (e) => {
        if (!appState.projectRoadmap) appState.projectRoadmap = {};
        appState.projectRoadmap.approver = e.target.value;
        appState.generalInfo.CAP_QUYET_DINH_DAU_TU = e.target.value;
        saveState();
    });

    if (rmFundingSource) rmFundingSource.addEventListener("input", (e) => {
        if (!appState.projectRoadmap) appState.projectRoadmap = {};
        appState.projectRoadmap.fundingSource = e.target.value;
        appState.generalInfo.NGUON_VON = e.target.value;
        saveState();
    });

    // Add Package button
    const btnAddPackageRoadmap = document.getElementById("btnAddPackageRoadmap");
    const btnAddPackageCard = document.getElementById("btnAddPackageCard");
    function handleAddNewPackage() {
        const pCount = (appState.projectRoadmap.packages || []).length + 1;
        const newPkg = {
            id: `pkg_${Date.now()}`,
            name: `Gói thầu số ${pCount}: Mua sắm trang thiết bị & dịch vụ`,
            category: "mua_sam",
            categoryLabel: "Mua sắm",
            procurementTypeId: "chi_dinh_thau_rut_gon",
            estimatedPrice: "100.000.000",
            contractType: "Trọn gói",
            duration: "30 ngày",
            status: "Chưa thực hiện",
            fields: {
                TEN_GOI_THAU: `Gói thầu số ${pCount}: Mua sắm trang thiết bị & dịch vụ`,
                GIA_GOI_THAU_SO: "100.000.000",
                GIA_GOI_THAU_CHU: "Một trăm triệu đồng chẵn",
                HINH_THUC_LCNT: "Chỉ định thầu rút gọn",
                LOAI_HOP_DONG: "Trọn gói",
                THOI_GIAN_THUC_HIEN: "30 ngày"
            }
        };
        appState.projectRoadmap.packages.push(newPkg);
        renderRoadmapUI();
        saveState();
        showToast("Đã bổ sung gói thầu mới vào định hướng dự án!");
    }
    if (btnAddPackageRoadmap) btnAddPackageRoadmap.addEventListener("click", handleAddNewPackage);
    if (btnAddPackageCard) btnAddPackageCard.addEventListener("click", handleAddNewPackage);

    // Timeline Filter Buttons
    const rmFilterAllTasks = document.getElementById("rmFilterAllTasks");
    const rmFilterUnfinishedTasks = document.getElementById("rmFilterUnfinishedTasks");

    if (rmFilterAllTasks) rmFilterAllTasks.addEventListener("click", () => {
        rmFilterAllTasks.className = "px-2 py-0.5 text-[10.5px] font-bold rounded bg-slate-800 text-white h-5.5";
        rmFilterUnfinishedTasks.className = "px-2 py-0.5 text-[10.5px] font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 h-5.5";
        renderTimelineTable("all");
    });

    if (rmFilterUnfinishedTasks) rmFilterUnfinishedTasks.addEventListener("click", () => {
        rmFilterUnfinishedTasks.className = "px-2 py-0.5 text-[10.5px] font-bold rounded bg-slate-800 text-white h-5.5";
        rmFilterAllTasks.className = "px-2 py-0.5 text-[10.5px] font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 h-5.5";
        renderTimelineTable("unfinished");
    });

    // Modal Import CSV Logic
    const importCsvModal = document.getElementById("importCsvModal");
    const btnOpenImportCsvModal = document.getElementById("btnOpenImportCsvModal");
    const btnCloseCsvModal = document.getElementById("btnCloseCsvModal");
    const btnCancelCsvModal = document.getElementById("btnCancelCsvModal");
    const btnLoadSampleCsv = document.getElementById("btnLoadSampleCsv");
    const btnConfirmImportCsv = document.getElementById("btnConfirmImportCsv");
    const csvInputTextarea = document.getElementById("csvInputTextarea");

    const sampleCsvRawString = "Thứ tự thủ tục: Sửa chữa góc cua đường khẩn nguy chữa cháy phía tây Sân đỗ tàu bay,,,,,,,,,,,\nStt,Tên công việc,Số VBản,Số VBản,Người/Đơn vị ký duyệt,Thứ trong tuần,Ngày / tháng,Số ngày thực hiện văn bản,Ghi chú,Tiến độ,,\nI,Triển khai,,,,,,,,,,\n1,QĐ giao kế hoạch,110/QĐ-TCTCHKVN,,TCT,Thứ Hai,2026-01-12,2,,Đã xong,,\n2,Biên bản kiểm tra đột xuất,,,Các phòng VCA,Thứ Bảy,2026-04-04,1,,Đã xong,,\n3,[TRIỂN KHAI] Tờ trình,01/ĐKNCC/TTr-KTHT,,PKTHT,Thứ Ba,2026-07-21,1,,Đã xong,,\n4,[TL TỔ THẨM ĐỊNH] Tờ Trình,\"02/ĐKNCC/TTr-KTHT\",,PKTHT,Thứ Tư,2026-07-22,1,,Đã xong,,\n5,[TL TỔ THẨM ĐỊNH] Quyết định,930a/QĐ-CHKQTCT,930A,GĐ,Thứ Ba,2026-07-28,1,,Đã xong,,\n6,BÁO CÁO BẢO TRÌ,03/BCTHBT-KTHT,,,Thứ Tư,2026-07-29,1,,Đã xong,,\n,Phê duyệt dự toán G1,,,,-,,1,,Đã xong,,\n7,[KH LCNT] Tờ trình,\"04/ĐKNCC/TTr-KTHT\",,,Thứ Tư,2026-07-29,1,,Đã xong,,\n8,[KH LCNT] BB Thẩm định,,,,Thứ Năm,2026-07-30,1,,Đã xong,,\n9,[KH LCNT] BC Thẩm định,05/BC-HĐTĐ-KQTĐ,,,Thứ Năm,2026-07-30,1,,Đã xong,,\n10,[KH LCNT] QĐ Phê Duyệt,    968/QĐ-CHKQTCT,968,,Thứ Sáu,2026-07-31,1,,Đã xong,,\nII,Gói thầu số 1: Thẩm tra bản vẽ thiết kế thi công và dự toán công trình,,,,,,,,Đã xong,,\n11,[LCNT] Tờ trình,\"06/ĐKNCC/TTr-KTHT\",,,Thứ Sáu,2026-07-31,0,,Đã xong,,\n12,[LCNT] Thư mời Quan tâm,969/CHKQTCT-KTHT,969,,Thứ Sáu,2026-07-31,0,,Đã xong,có số chưa ?,\n,Biên bản thương thảo hợp đồng,,,,,2026-08-03,0,,Đã xong,,\n13,[KQ LCNT GÓI 1] Tờ trình,07/ĐKNCC/TTr-KTHT,,,Thứ Hai,2026-08-03,0,,Đã xong,,\n14,[KQ LCNT GÓI 1] BB Thẩm định,,,,Thứ Hai,2026-08-03,0,,Đã xong,,\n15,[KQ LCNT GÓI 1] BC Thẩm định,08/BC-HĐTĐ-KQTĐ,,,Thứ Hai,2026-08-03,0,,Đã xong,,\n16,[KQ LCNT GÓI 1] QĐ Phê Duyệt,    994/QĐ-CHKQTCT,994,,Thứ Tư,2026-08-05,1,,Đã xong,,\n17,[KQ LCNT GÓI 1] Thông báo,,,,Thứ Tư,2026-08-05,1,,Đã xong,,\n18,HỢP ĐỒNG,,26059,,Thứ Hai,2026-08-17,1,5 ngày,Đã xin số xong,,\n19,Sản phẩm gói 1 (thẩm tra TK và DT),,,,Thứ Ba,2026-08-18,1,,Đã xong,,\n,NGHIỆM THU,,,,Thứ Sáu,2026-08-28,,,Đã xong,,\n,[THIẾT KẾ & DỰ TOÁN] Tờ trình,09/ĐKNCC/TTr-KTHT,,,Thứ Tư,2026-08-19,1,,Đã xong,,\n,[THIẾT KẾ & DỰ TOÁN] BB họp thẩm định,,,,Thứ Năm,2026-08-20,0,,Đã xong,,\n,[THIẾT KẾ & DỰ TOÁN] BC thẩm định,10/BC-HĐTĐ-KQTĐ,,,Thứ Năm,2026-08-20,0,,Đã xong,,\n,[THIẾT KẾ & DỰ TOÁN] Quyết định,1125/QĐ-CHKQTCT,,,Thứ Sáu,2026-08-28,0,,Đã xong,,\nIV,Gói thầu số 2: Thi công XDCT,,,,-,,,,,,\n24,[KH LCNT] Tờ trình,11/ĐKNCC/TTr-KTHT,,,Thứ Sáu,2026-08-28,1,,Đã xong,,\n25,[KH LCNT] BB Thẩm định,,,,Thứ Sáu,2026-08-28,0,,Đã xong,,\n26,[KH LCNT] BC Thẩm định,12/BC-HĐTĐ-KQTĐ,,,Thứ Sáu,,0,,Đã xong,,\n27,[KH LCNT] QĐ Phê Duyệt,1126/QĐ-CHKQTCT,,,Thứ Sáu,2026-08-28,0,,Đã xong,,\n,[LCNT] Tờ trình,13/ĐKNCC/TTr-KTHT,,,Thứ Sáu,2026-08-28,0,,Đã xong,,\n29,[LCNT] Thư mời Quan tâm,1131/CHKQTCT-KTHT,,,Thứ Sáu,2026-08-28,3,,Đã xong,,\n30,Biên bản thương thảo hợp đồng,,,,Thứ Hai,2026-08-31,0,,Đã xong,đợi bb đề xuất của DTC,\"30/8 DTC gửi nhưng lỗi giá, đã phản hồi và báo cb\"\n31,[KQ LCNT] Tờ trình,14/ĐKNCC/TTr-KTHT,,,Thứ Hai,2026-08-31,0,,Đã xong,,\n32,[KQ LCNT] BB Thẩm định,,,,Thứ Hai,2026-08-31,0,,Đã xong,,\n33,[KQ LCNT] BC Thẩm định,15/BC-HĐTĐ-KQTĐ,,,Thứ Hai,2026-08-31,0,,Đã xong,,\n34,[KQ LCNT] QĐ Phê Duyệt,   1143 /QĐ-CHKQTCT,,,Thứ Năm,2026-09-03,0,,Đã xong,,\n35,[KQ LCNT] Thông báo,,,,Thứ Năm,2026-09-03,1,,Đã xong,,\n36,HỢP ĐỒNG,,26076,,Thứ Sáu,2026-09-04,30,,Đã xong,,\n,LẬP BP ĐẢM BẢO ANAT,,,,,2026-09-04,15,,,,\n,NGHIỆM THU,,,,Thứ Hai,2026-10-19,,,,,";

    if (btnOpenImportCsvModal) btnOpenImportCsvModal.addEventListener("click", () => {
        importCsvModal.classList.remove("hidden");
    });
    if (btnCloseCsvModal) btnCloseCsvModal.addEventListener("click", () => importCsvModal.classList.add("hidden"));
    if (btnCancelCsvModal) btnCancelCsvModal.addEventListener("click", () => importCsvModal.classList.add("hidden"));

    if (btnLoadSampleCsv) btnLoadSampleCsv.addEventListener("click", () => {
        csvInputTextarea.value = sampleCsvRawString;
    });

    if (btnConfirmImportCsv) btnConfirmImportCsv.addEventListener("click", () => {
        const text = csvInputTextarea.value;
        if (!text || !text.trim()) {
            alert("Vui lòng dán nội dung CSV hoặc bấm 'Nạp dữ liệu mẫu Sân bay Cần Thơ'!");
            return;
        }
        const parsed = parseCsvTimelineText(text);
        if (parsed) {
            appState.projectRoadmap.projectName = parsed.projectName || appState.projectRoadmap.projectName;
            appState.projectRoadmap.packages = parsed.packages;
            appState.projectRoadmap.timelinePhases = parsed.timelinePhases;
            syncRoadmapToDocs();
            renderRoadmapUI();
            importCsvModal.classList.add("hidden");
            saveState();
            showToast(`Đã phân tích thành công: ${parsed.packages.length} gói thầu & ${parsed.timelinePhases.length} giai đoạn!`);
        }
    });

    
    // -------------------------------------------------------------
    // Package Edit Controller (Chỉnh sửa thông tin gói thầu)
    // -------------------------------------------------------------
    function openEditPackageModal(idx) {
        if (!appState.projectRoadmap || !appState.projectRoadmap.packages) return;
        const pkg = appState.projectRoadmap.packages[idx];
        if (!pkg) return;

        const modal = document.getElementById("modalEditPackage");
        const editPkgIndex = document.getElementById("editPkgIndex");
        const editPkgName = document.getElementById("editPkgName");
        const editPkgCategory = document.getElementById("editPkgCategory");
        const editPkgPrice = document.getElementById("editPkgPrice");
        const editPkgProcurementType = document.getElementById("editPkgProcurementType");
        const editPkgContractType = document.getElementById("editPkgContractType");
        const editPkgDuration = document.getElementById("editPkgDuration");
        const editPkgStatus = document.getElementById("editPkgStatus");

        if (!modal || !editPkgIndex) return;

        editPkgIndex.value = idx;
        if (editPkgName) editPkgName.value = pkg.name || "";
        if (editPkgCategory) editPkgCategory.value = pkg.category || "tu_van";
        if (editPkgPrice) editPkgPrice.value = pkg.estimatedPrice || "";
        if (editPkgContractType) editPkgContractType.value = pkg.contractType || "Trọn gói";
        if (editPkgDuration) editPkgDuration.value = pkg.duration || "30 ngày";
        if (editPkgStatus) editPkgStatus.value = pkg.status || "Đang thực hiện";

        // Populate procurement types
        if (editPkgProcurementType) {
            editPkgProcurementType.innerHTML = "";
            PROCUREMENT_MATRIX.procurementTypes.forEach(pt => {
                const opt = document.createElement("option");
                opt.value = pt.id;
                opt.textContent = pt.name;
                if (pt.id === (pkg.procurementTypeId || "chi_dinh_thau_rut_gon")) {
                    opt.selected = true;
                }
                editPkgProcurementType.appendChild(opt);
            });
        }

        modal.classList.remove("hidden");
    }

    // Modal Close event delegation for rock-solid reliability
    document.addEventListener("click", (e) => {
        if (e.target.closest("#btnCloseEditPkgModal") || e.target.closest("#btnCancelEditPkg")) {
            const m = document.getElementById("modalEditPackage");
            if (m) m.classList.add("hidden");
        }
        if (e.target.closest("#btnCloseMatrixModal") || e.target.closest("#btnCancelMatrixModal")) {
            const m = document.getElementById("modalProcurementMatrixManager");
            if (m) m.classList.add("hidden");
        }
        if (e.target.closest("#btnCloseCsvModal") || e.target.closest("#btnCancelCsvModal")) {
            const m = document.getElementById("importCsvModal");
            if (m) m.classList.add("hidden");
        }
        if (e.target.closest("#btnCloseFormulaModal") || e.target.closest("#btnCancelFormulaModal")) {
            const m = document.getElementById("modalTaskFormulaConfig");
            if (m) m.classList.add("hidden");
        }
        if (e.target.closest("#btnCloseCreateVarModal") || e.target.closest("#btnCancelCreateVar")) {
            const m = document.getElementById("modalCreateVarFromPreview");
            if (m) m.classList.add("hidden");
        }
        if (e.target.closest("#btnCloseMergeVarsModal") || e.target.closest("#btnCancelMergeVars")) {
            const m = document.getElementById("modalMergeVars");
            if (m) m.classList.add("hidden");
        }
    });

    const formEditPackage = document.getElementById("formEditPackage");
    if (formEditPackage) {
        formEditPackage.addEventListener("submit", (e) => {
            e.preventDefault();
            const editPkgIndex = document.getElementById("editPkgIndex");
            const editPkgName = document.getElementById("editPkgName");
            const editPkgCategory = document.getElementById("editPkgCategory");
            const editPkgPrice = document.getElementById("editPkgPrice");
            const editPkgProcurementType = document.getElementById("editPkgProcurementType");
            const editPkgContractType = document.getElementById("editPkgContractType");
            const editPkgDuration = document.getElementById("editPkgDuration");
            const editPkgStatus = document.getElementById("editPkgStatus");
            const modal = document.getElementById("modalEditPackage");

            const idx = parseInt(editPkgIndex ? editPkgIndex.value : -1, 10);
            if (isNaN(idx) || idx < 0 || !appState.projectRoadmap.packages[idx]) return;

            const pkg = appState.projectRoadmap.packages[idx];
            if (editPkgName) pkg.name = editPkgName.value.trim();
            if (editPkgCategory) {
                pkg.category = editPkgCategory.value;
                const catLabels = { "tu_van": "Tư vấn", "xay_lap": "Xây lắp", "mua_sam": "Mua sắm", "phi_tu_van": "Phi tư vấn" };
                pkg.categoryLabel = catLabels[pkg.category] || "Tư vấn";
            }
            if (editPkgPrice) pkg.estimatedPrice = editPkgPrice.value.trim();
            if (editPkgProcurementType) pkg.procurementTypeId = editPkgProcurementType.value;
            if (editPkgContractType) pkg.contractType = editPkgContractType.value;
            if (editPkgDuration) pkg.duration = editPkgDuration.value.trim();
            if (editPkgStatus) pkg.status = editPkgStatus.value;

            // Sync with package fields
            if (!pkg.fields) pkg.fields = {};
            pkg.fields.TEN_GOI_THAU = pkg.name;
            pkg.fields.GIA_GOI_THAU_SO = pkg.estimatedPrice;
            pkg.fields.HINH_THUC_LCNT = getProcurementTypeName(pkg.procurementTypeId);
            pkg.fields.LOAI_HOP_DONG = pkg.contractType;
            pkg.fields.THOI_GIAN_THUC_HIEN = pkg.duration;

            syncRoadmapToDocs();
            renderRoadmapUI();
            saveState();
            if (modal) modal.classList.add("hidden");
            showToast(`Đã lưu thay đổi cho gói thầu #${idx + 1}!`, "success");
        });
    }

    const btnDeletePkgInModal = document.getElementById("btnDeletePkgInModal");
    if (btnDeletePkgInModal) {
        btnDeletePkgInModal.addEventListener("click", () => {
            const editPkgIndex = document.getElementById("editPkgIndex");
            const modal = document.getElementById("modalEditPackage");
            const idx = parseInt(editPkgIndex ? editPkgIndex.value : -1, 10);
            if (isNaN(idx) || idx < 0 || !appState.projectRoadmap.packages[idx]) return;

            if (appState.projectRoadmap.packages.length <= 1) {
                alert("Dự án cần có ít nhất 1 gói thầu, không thể xóa hết!");
                return;
            }

            if (confirm(`Bạn có chắc chắn muốn xóa gói thầu: "${appState.projectRoadmap.packages[idx].name}"?`)) {
                appState.projectRoadmap.packages.splice(idx, 1);
                if (appState.selectedRoadmapPackageIndex >= appState.projectRoadmap.packages.length) {
                    appState.selectedRoadmapPackageIndex = 0;
                }
                syncRoadmapToDocs();
                renderRoadmapUI();
                saveState();
                if (modal) modal.classList.add("hidden");
                showToast("Đã xóa gói thầu thành công!", "info");
            }
        });
    }

    // -------------------------------------------------------------
    // User Account & Admin Matrix Settings Controller
    // -------------------------------------------------------------
    const btnUserAccount = document.getElementById("btnUserAccount");
    const userAccountDropdown = document.getElementById("userAccountDropdown");
    const btnOpenMatrixSettings = document.getElementById("btnOpenMatrixSettings");

    if (btnUserAccount && userAccountDropdown) {
        btnUserAccount.addEventListener("click", (e) => {
            e.stopPropagation();
            userAccountDropdown.classList.toggle("hidden");
        });
        document.addEventListener("click", (e) => {
            if (!userAccountDropdown.contains(e.target) && !btnUserAccount.contains(e.target)) {
                userAccountDropdown.classList.add("hidden");
            }
        });
    }

    let activeAdminCategory = "procurement"; // "procurement" | "implementation"
    let activeAdminTypeId = "chi_dinh_thau_rut_gon";
    let activeAdminImplTypeId = "trien_khai_sua_chua";

    function getActiveAdminType() {
        if (activeAdminCategory === "implementation") {
            return IMPLEMENTATION_MATRIX.implementationTypes.find(t => t.id === activeAdminImplTypeId) 
                || IMPLEMENTATION_MATRIX.implementationTypes[0];
        }
        return PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === activeAdminTypeId) 
            || PROCUREMENT_MATRIX.procurementTypes[0];
    }

    function renderAdminMatrixModal() {
        const matrixTypesList = document.getElementById("matrixTypesList");
        const adminTabProcurement = document.getElementById("adminTabProcurement");
        const adminTabImplementation = document.getElementById("adminTabImplementation");
        const adminCategoryBadge = document.getElementById("adminCategoryBadge");
        const modalAdminMatrixTitle = document.getElementById("modalAdminMatrixTitle");
        const modalAdminMatrixSubtitle = document.getElementById("modalAdminMatrixSubtitle");

        const adminCol1ListTitle = document.getElementById("adminCol1ListTitle");
        const adminCol2InfoTitle = document.getElementById("adminCol2InfoTitle");
        const adminNameLabel = document.getElementById("adminNameLabel");
        const adminLegalLabel = document.getElementById("adminLegalLabel");
        const adminDocsListTitle = document.getElementById("adminDocsListTitle");

        if (activeAdminCategory === "procurement") {
            if (adminCol1ListTitle) adminCol1ListTitle.textContent = "Danh sách hình thức LCNT";
            if (adminCol2InfoTitle) adminCol2InfoTitle.textContent = "Thông tin Hình thức LCNT đang chọn";
            if (adminNameLabel) adminNameLabel.textContent = "Tên hiển thị hình thức LCNT *";
            if (adminLegalLabel) adminLegalLabel.textContent = "Căn cứ pháp lý áp dụng";
            if (adminDocsListTitle) adminDocsListTitle.textContent = "Thứ tự & Danh mục mẫu văn bản của hình thức này:";
        } else {
            if (adminCol1ListTitle) adminCol1ListTitle.textContent = "Danh sách quy trình triển khai";
            if (adminCol2InfoTitle) adminCol2InfoTitle.textContent = "Thông tin Quy trình Triển khai đang chọn";
            if (adminNameLabel) adminNameLabel.textContent = "Tên quy trình triển khai *";
            if (adminLegalLabel) adminLegalLabel.textContent = "Mô tả phạm vi áp dụng";
            if (adminDocsListTitle) adminDocsListTitle.textContent = "Thứ tự & Danh mục mẫu văn bản của quy trình này:";
        }

        if (adminTabProcurement && adminTabImplementation) {
            if (activeAdminCategory === "procurement") {
                adminTabProcurement.className = "px-3 py-1 rounded text-xs font-bold transition-all bg-emerald-600 text-white shadow-2xs";
                adminTabImplementation.className = "px-3 py-1 rounded text-xs font-bold transition-all bg-white text-slate-700 hover:bg-slate-200 border border-slate-300";
                if (adminCategoryBadge) adminCategoryBadge.textContent = "Đang cấu hình: Hình thức LCNT & Gói thầu";
                if (modalAdminMatrixTitle) modalAdminMatrixTitle.textContent = "Quản Trị Hình Thức Lựa Chọn Nhà Thầu & Mẫu Văn Bản";
                if (modalAdminMatrixSubtitle) modalAdminMatrixSubtitle.textContent = "Chế độ Admin: Điều chỉnh tên hình thức LCNT và gán sắp xếp thứ tự mẫu văn bản quy trình";
            } else {
                adminTabProcurement.className = "px-3 py-1 rounded text-xs font-bold transition-all bg-white text-slate-700 hover:bg-slate-200 border border-slate-300";
                adminTabImplementation.className = "px-3 py-1 rounded text-xs font-bold transition-all bg-emerald-600 text-white shadow-2xs";
                if (adminCategoryBadge) adminCategoryBadge.textContent = "Đang cấu hình: Quy trình Triển khai dự án";
                if (modalAdminMatrixTitle) modalAdminMatrixTitle.textContent = "Quản Trị Quy Trình Triển Khai Dự Án & Mẫu Văn Bản";
                if (modalAdminMatrixSubtitle) modalAdminMatrixSubtitle.textContent = "Chế độ Admin: Điều chỉnh quy trình Triển khai (sửa chữa, mua sắm, đầu tư...) và gán mẫu văn bản";
            }
        }

        if (!matrixTypesList) return;
        matrixTypesList.innerHTML = "";

        // 1. Render Left Column List
        if (activeAdminCategory === "procurement") {
            PROCUREMENT_MATRIX.procurementTypes.forEach((pt) => {
                const btn = document.createElement("button");
                btn.type = "button";
                const isActive = pt.id === activeAdminTypeId;

                btn.className = isActive 
                    ? "w-full text-left p-2 rounded bg-emerald-100/70 border border-emerald-400 font-bold text-emerald-950 text-[11px] shadow-2xs transition-all flex items-start justify-between"
                    : "w-full text-left p-2 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] transition-all flex items-start justify-between";

                const allTypeDocs = [];
                (pt.phases || []).forEach(ph => (ph.documents || []).forEach(d => allTypeDocs.push(d)));
                const docsCount = allTypeDocs.length;
                const tplsCount = allTypeDocs.filter(d => {
                    const t = d.templateFile !== undefined ? d.templateFile : (prebuiltDocxMap[d.id] || "");
                    return Boolean(t && t.trim() !== "");
                }).length;

                btn.innerHTML = `
                    <div class="min-w-0 pr-1">
                        <div class="truncate">${pt.name}</div>
                        <div class="text-[9.5px] text-slate-500 font-normal flex items-center gap-1.5 mt-0.5">
                            <span>${docsCount} mẫu văn bản</span>
                            <span>•</span>
                            <span class="${tplsCount === docsCount ? 'text-emerald-700 font-bold' : (tplsCount > 0 ? 'text-teal-700' : 'text-amber-700 font-bold')}">
                                ${tplsCount}/${docsCount} có mẫu
                            </span>
                        </div>
                    </div>
                    ${isActive ? '<i class="fa-solid fa-chevron-right text-emerald-600 text-[10px] mt-1 shrink-0"></i>' : ''}
                `;

                btn.addEventListener("click", () => {
                    saveCurrentAdminInputs();
                    activeAdminTypeId = pt.id;
                    renderAdminMatrixModal();
                });

                matrixTypesList.appendChild(btn);
            });
        } else {
            // Implementation Types
            IMPLEMENTATION_MATRIX.implementationTypes.forEach((it) => {
                const btn = document.createElement("button");
                btn.type = "button";
                const isActive = it.id === activeAdminImplTypeId;

                btn.className = isActive 
                    ? "w-full text-left p-2 rounded bg-emerald-100/70 border border-emerald-400 font-bold text-emerald-950 text-[11px] shadow-2xs transition-all flex items-start justify-between"
                    : "w-full text-left p-2 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] transition-all flex items-start justify-between";

                const docsCount = (it.documents || []).length;
                const tplsCount = (it.documents || []).filter(d => Boolean(d.templateFile && d.templateFile.trim() !== "")).length;

                btn.innerHTML = `
                    <div class="min-w-0 pr-1">
                        <div class="truncate">${it.name}</div>
                        <div class="text-[9.5px] text-slate-500 font-normal flex items-center gap-1.5 mt-0.5">
                            <span>${docsCount} mẫu văn bản</span>
                            <span>•</span>
                            <span class="${tplsCount === docsCount ? 'text-emerald-700 font-bold' : (tplsCount > 0 ? 'text-teal-700' : 'text-amber-700 font-bold')}">
                                ${tplsCount}/${docsCount} có mẫu
                            </span>
                        </div>
                    </div>
                    ${isActive ? '<i class="fa-solid fa-chevron-right text-emerald-600 text-[10px] mt-1 shrink-0"></i>' : ''}
                `;

                btn.addEventListener("click", () => {
                    saveCurrentAdminInputs();
                    activeAdminImplTypeId = it.id;
                    renderAdminMatrixModal();
                });

                matrixTypesList.appendChild(btn);
            });
        }

        // 2. Render Right Column: Selected Type Info & Doc Templates Table
        const currentItem = getActiveAdminType();
        const matrixTypeNameInput = document.getElementById("matrixTypeNameInput");
        const matrixTypeCodeInput = document.getElementById("matrixTypeCodeInput");
        const matrixTypeLegalInput = document.getElementById("matrixTypeLegalInput");

        if (matrixTypeNameInput) matrixTypeNameInput.value = currentItem.name || "";
        if (matrixTypeCodeInput) matrixTypeCodeInput.value = currentItem.code || "";
        if (matrixTypeLegalInput) matrixTypeLegalInput.value = (activeAdminCategory === "procurement" ? currentItem.legalBasis : currentItem.description) || "";

        renderAdminDocsTable(currentItem);
    }

    function renderAdminDocsTable(item) {
        const matrixDocsTableBody = document.getElementById("matrixDocsTableBody");
        if (!matrixDocsTableBody) return;
        matrixDocsTableBody.innerHTML = "";

        let allDocs = [];
        if (activeAdminCategory === "implementation") {
            if (!item.documents) item.documents = [];
            allDocs = item.documents.map((d, dIdx) => ({ ...d, _phaseIdx: 0, _docIdx: dIdx }));
        } else {
            if (!item.phases || item.phases.length === 0) {
                item.phases = [{ phaseId: "phase_1", phaseName: "Thủ tục thực hiện", documents: [] }];
            }
            item.phases.forEach((ph, pIdx) => {
                (ph.documents || []).forEach((doc, dIdx) => {
                    allDocs.push({ ...doc, _phaseIdx: pIdx, _docIdx: dIdx });
                });
            });
        }

        if (allDocs.length === 0) {
            const emptyTr = document.createElement("tr");
            emptyTr.innerHTML = `<td colspan="5" class="p-3 text-center text-slate-400 italic text-[11px]">Chưa có mẫu văn bản nào. Bấm "+ Thêm mẫu văn bản" để bổ sung.</td>`;
            matrixDocsTableBody.appendChild(emptyTr);
            return;
        }

        const SYSTEM_TEMPLATES = [
            { value: "", label: "-- Chưa gán mẫu (để trống) --" },
            { value: "templates/01_To_trinh_KHLCNT.docx", label: "01_To_trinh_KHLCNT.docx" },
            { value: "templates/02_Quyet_dinh_KHLCNT.docx", label: "02_Quyet_dinh_KHLCNT.docx" },
            { value: "templates/1_Giay_moi_tham_gia.docx", label: "1_Giay_moi_tham_gia.docx" },
            { value: "templates/2_Bien_ban_hoan_thien_hop_dong.docx", label: "2_Bien_ban_hoan_thien_hop_dong.docx" },
            { value: "templates/3_To_trinh_chi_dinh_thau.docx", label: "3_To_trinh_chi_dinh_thau.docx" },
            { value: "templates/4_Quyet_dinh_chi_dinh_thau.docx", label: "4_Quyet_dinh_chi_dinh_thau.docx" },
            { value: "templates/07_Hop_dong_kinh_te.docx", label: "07_Hop_dong_kinh_te.docx" }
        ];

        allDocs.forEach((doc, idx) => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-slate-50 h-7 transition-colors";

            const currentTpl = doc.templateFile !== undefined ? doc.templateFile : (prebuiltDocxMap[doc.id] || "");
            const hasTpl = Boolean(currentTpl && currentTpl.trim() !== "");

            let optionsHtml = '';
            let matched = false;
            SYSTEM_TEMPLATES.forEach(t => {
                const isSel = t.value === currentTpl;
                if (isSel) matched = true;
                optionsHtml += `<option value="${t.value}" ${isSel ? 'selected' : ''}>${t.label}</option>`;
            });

            if (currentTpl && !matched) {
                const shortName = currentTpl.split('/').pop();
                optionsHtml = `<option value="${currentTpl}" selected>📄 ${shortName} (Tùy chỉnh)</option>` + optionsHtml;
            }

            tr.innerHTML = `
                <td class="py-1 px-1.5 text-center">
                    <div class="flex items-center justify-center space-x-0.5">
                        <button type="button" class="btn-move-up w-5 h-5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-[9px] flex items-center justify-center disabled:opacity-30 disabled:hover:bg-slate-100" ${idx === 0 ? "disabled" : ""} title="Di chuyển văn bản lên trên">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button type="button" class="btn-move-down w-5 h-5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-[9px] flex items-center justify-center disabled:opacity-30 disabled:hover:bg-slate-100" ${idx === allDocs.length - 1 ? "disabled" : ""} title="Di chuyển văn bản xuống dưới">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </td>
                <td class="py-1 px-1.5">
                    <input type="text" class="doc-code-input w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-800" value="${doc.code || ''}">
                </td>
                <td class="py-1 px-1.5">
                    <input type="text" class="doc-name-input w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[11px] font-medium text-slate-800" value="${doc.name || ''}">
                </td>
                <td class="py-1 px-1.5">
                    <div class="flex items-center space-x-1">
                        <span class="doc-tpl-indicator shrink-0">
                            ${hasTpl 
                                ? '<i class="fa-solid fa-file-word text-blue-600 text-[11px]" title="Đã gán file mẫu Word"></i>' 
                                : '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-[11px]" title="Chưa có mẫu template"></i>'
                            }
                        </span>
                        <select class="doc-tpl-select flex-1 rounded px-1.5 py-0.5 h-6 text-[10px] transition-colors ${hasTpl ? 'bg-emerald-50/70 border border-emerald-300 text-emerald-950 font-medium' : 'bg-amber-50 border border-amber-300 text-amber-900 font-bold'}">
                            ${optionsHtml}
                        </select>
                        <label class="cursor-pointer text-slate-400 hover:text-emerald-700 p-0.5 shrink-0" title="Tải file Word .docx mẫu từ máy tính để gán cho văn bản này">
                            <i class="fa-solid fa-file-arrow-up text-xs"></i>
                            <input type="file" accept=".docx" class="hidden doc-tpl-upload">
                        </label>
                    </div>
                </td>
                <td class="py-1 px-1.5 text-center">
                    <button type="button" class="btn-del-doc text-slate-400 hover:text-rose-600 text-[11px] p-1" title="Xóa mẫu này">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
            `;

            const getTargetDoc = () => {
                if (activeAdminCategory === "implementation") {
                    return item.documents[idx];
                } else {
                    return item.phases[doc._phaseIdx].documents[doc._docIdx];
                }
            };

            const codeInput = tr.querySelector(".doc-code-input");
            const nameInput = tr.querySelector(".doc-name-input");
            if (codeInput) {
                codeInput.addEventListener("input", (e) => {
                    const target = getTargetDoc();
                    if (target) target.code = e.target.value.trim();
                });
            }
            if (nameInput) {
                nameInput.addEventListener("input", (e) => {
                    const target = getTargetDoc();
                    if (target) target.name = e.target.value.trim();
                });
            }

            const tplSelect = tr.querySelector(".doc-tpl-select");
            const tplIndicator = tr.querySelector(".doc-tpl-indicator");
            if (tplSelect) {
                tplSelect.addEventListener("change", (e) => {
                    const chosen = e.target.value;
                    const target = getTargetDoc();
                    if (target) target.templateFile = chosen;
                    if (chosen) {
                        tplSelect.className = "doc-tpl-select flex-1 rounded px-1.5 py-0.5 h-6 text-[10px] transition-colors bg-emerald-50/70 border border-emerald-300 text-emerald-950 font-medium";
                        if (tplIndicator) tplIndicator.innerHTML = '<i class="fa-solid fa-file-word text-blue-600 text-[11px]" title="Đã gán file mẫu Word"></i>';
                    } else {
                        tplSelect.className = "doc-tpl-select flex-1 rounded px-1.5 py-0.5 h-6 text-[10px] transition-colors bg-amber-50 border border-amber-300 text-amber-900 font-bold";
                        if (tplIndicator) tplIndicator.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-[11px]" title="Chưa có mẫu template"></i>';
                    }
                });
            }

            const tplUpload = tr.querySelector(".doc-tpl-upload");
            if (tplUpload) {
                tplUpload.addEventListener("change", (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        if (!window.customUploadedDocx) window.customUploadedDocx = {};
                        window.customUploadedDocx[file.name] = re.target.result;
                        const target = getTargetDoc();
                        if (target) target.templateFile = file.name;
                        renderAdminDocsTable(item);
                        showToast(`Đã gán file mẫu "${file.name}" cho văn bản!`, "success");
                    };
                    reader.readAsArrayBuffer(file);
                });
            }

            const btnUp = tr.querySelector(".btn-move-up");
            if (btnUp) {
                btnUp.addEventListener("click", () => {
                    if (idx > 0) {
                        swapDocsInType(item, idx, idx - 1);
                        renderAdminDocsTable(item);
                    }
                });
            }

            const btnDown = tr.querySelector(".btn-move-down");
            if (btnDown) {
                btnDown.addEventListener("click", () => {
                    if (idx < allDocs.length - 1) {
                        swapDocsInType(item, idx, idx + 1);
                        renderAdminDocsTable(item);
                    }
                });
            }

            const btnDel = tr.querySelector(".btn-del-doc");
            if (btnDel) {
                btnDel.addEventListener("click", () => {
                    if (confirm(`Bạn có chắc muốn xóa văn bản: "${doc.name}"?`)) {
                        removeDocFromType(item, idx);
                        renderAdminDocsTable(item);
                    }
                });
            }

            matrixDocsTableBody.appendChild(tr);
        });
    }

    function swapDocsInType(item, fromIdx, toIdx) {
        if (activeAdminCategory === "implementation") {
            const temp = item.documents[fromIdx];
            item.documents[fromIdx] = item.documents[toIdx];
            item.documents[toIdx] = temp;
        } else {
            const flat = [];
            item.phases.forEach(ph => (ph.documents || []).forEach(d => flat.push(d)));
            const temp = flat[fromIdx];
            flat[fromIdx] = flat[toIdx];
            flat[toIdx] = temp;
            item.phases = [{
                phaseId: "phase_main",
                phaseName: "Quy trình thủ tục",
                documents: flat
            }];
        }
    }

    function removeDocFromType(item, idx) {
        if (activeAdminCategory === "implementation") {
            item.documents.splice(idx, 1);
        } else {
            const flat = [];
            item.phases.forEach(ph => (ph.documents || []).forEach(d => flat.push(d)));
            flat.splice(idx, 1);
            item.phases = [{
                phaseId: "phase_main",
                phaseName: "Quy trình thủ tục",
                documents: flat
            }];
        }
    }

    function saveCurrentAdminInputs() {
        const currentItem = getActiveAdminType();
        if (!currentItem) return;
        const matrixTypeNameInput = document.getElementById("matrixTypeNameInput");
        const matrixTypeCodeInput = document.getElementById("matrixTypeCodeInput");
        const matrixTypeLegalInput = document.getElementById("matrixTypeLegalInput");

        if (matrixTypeNameInput) currentItem.name = matrixTypeNameInput.value.trim() || currentItem.name;
        if (matrixTypeCodeInput) currentItem.code = matrixTypeCodeInput.value.trim();
        if (matrixTypeLegalInput) {
            if (activeAdminCategory === "procurement") {
                currentItem.legalBasis = matrixTypeLegalInput.value.trim();
            } else {
                currentItem.description = matrixTypeLegalInput.value.trim();
            }
        }
    }

    // Modal Category Switcher Buttons
    const adminTabProcurement = document.getElementById("adminTabProcurement");
    const adminTabImplementation = document.getElementById("adminTabImplementation");

    if (adminTabProcurement) {
        adminTabProcurement.addEventListener("click", () => {
            saveCurrentAdminInputs();
            activeAdminCategory = "procurement";
            renderAdminMatrixModal();
        });
    }
    if (adminTabImplementation) {
        adminTabImplementation.addEventListener("click", () => {
            saveCurrentAdminInputs();
            activeAdminCategory = "implementation";
            renderAdminMatrixModal();
        });
    }

    if (btnOpenMatrixSettings) {
        btnOpenMatrixSettings.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dd = document.getElementById("userAccountDropdown");
            if (dd) dd.classList.add("hidden");
            activeAdminCategory = "procurement";
            activeAdminTypeId = appState.selectedProcurementTypeId || PROCUREMENT_MATRIX.procurementTypes[0].id;
            renderAdminMatrixModal();
            const modal = document.getElementById("modalProcurementMatrixManager");
            if (modal) modal.classList.remove("hidden");
        });
    }

    const btnOpenImplementationSettings = document.getElementById("btnOpenImplementationSettings");
    if (btnOpenImplementationSettings) {
        btnOpenImplementationSettings.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dd = document.getElementById("userAccountDropdown");
            if (dd) dd.classList.add("hidden");
            activeAdminCategory = "implementation";
            activeAdminImplTypeId = appState.projectRoadmap?.implementationTypeId || IMPLEMENTATION_MATRIX.implementationTypes[0].id;
            renderAdminMatrixModal();
            const modal = document.getElementById("modalProcurementMatrixManager");
            if (modal) modal.classList.remove("hidden");
        });
    }

    const btnAddNewDocToType = document.getElementById("btnAddNewDocToType");
    if (btnAddNewDocToType) {
        btnAddNewDocToType.addEventListener("click", () => {
            const currentItem = getActiveAdminType();
            if (!currentItem) return;

            const newCode = prompt("Nhập mã hiệu văn bản mới (ví dụ: 08.QD-PD hoặc 12.BB-TK):", "08.QD-MOI");
            if (!newCode) return;
            const newName = prompt("Nhập tên mẫu văn bản (ví dụ: Quyết định phê duyệt bổ sung):", "Quyết định phê duyệt bổ sung");
            if (!newName) return;

            if (activeAdminCategory === "implementation") {
                if (!currentItem.documents) currentItem.documents = [];
                currentItem.documents.push({
                    id: `custom_tk_doc_${Date.now()}`,
                    code: newCode.trim(),
                    name: newName.trim(),
                    signer: "Đơn vị thực hiện",
                    duration: 1,
                    dateFormula: { type: "default" },
                    defaultDate: "",
                    docNo: "",
                    templateFile: ""
                });
            } else {
                if (!currentItem.phases || currentItem.phases.length === 0) {
                    currentItem.phases = [{ phaseId: "phase_main", phaseName: "Quy trình", documents: [] }];
                }
                currentItem.phases[0].documents.push({
                    id: `custom_doc_${Date.now()}`,
                    code: newCode.trim(),
                    name: newName.trim(),
                    desc: "Văn bản mẫu bổ sung theo quy trình quản trị"
                });
            }

            renderAdminDocsTable(currentItem);
            showToast("Đã thêm mẫu văn bản mới!");
        });
    }

    const btnAddNewProcurementType = document.getElementById("btnAddNewProcurementType");
    if (btnAddNewProcurementType) {
        btnAddNewProcurementType.addEventListener("click", () => {
            if (activeAdminCategory === "implementation") {
                const newName = prompt("Nhập tên Quy trình Triển khai mới (ví dụ: 4. Triển khai dự án khẩn cấp):", "");
                if (!newName || !newName.trim()) return;

                const newId = `trien_khai_${Date.now()}`;
                IMPLEMENTATION_MATRIX.implementationTypes.push({
                    id: newId,
                    name: newName.trim(),
                    code: "TK-MOI",
                    description: "Quy trình triển khai tùy biến bởi quản trị viên",
                    documents: [
                        { id: `doc_${Date.now()}_1`, code: "01.TTr", name: "Tờ trình đề xuất triển khai", signer: "Chủ đầu tư", duration: 2, dateFormula: { type: "manual" }, defaultDate: "2026-01-12", docNo: "01/TTr", templateFile: "templates/01_To_trinh_KHLCNT.docx" },
                        { id: `doc_${Date.now()}_2`, code: "02.QD", name: "Quyết định phê duyệt triển khai", signer: "Cấp thẩm quyền", duration: 1, dateFormula: { type: "default" }, defaultDate: "", docNo: "02/QĐ", templateFile: "templates/02_Quyet_dinh_KHLCNT.docx" }
                    ]
                });

                activeAdminImplTypeId = newId;
                renderAdminMatrixModal();
                showToast(`Đã thêm Quy trình Triển khai mới: ${newName}!`);
            } else {
                const newName = prompt("Nhập tên Hình thức LCNT mới (ví dụ: 7. Đặt hàng dịch vụ công ích):", "");
                if (!newName || !newName.trim()) return;

                const newId = `hinh_thuc_${Date.now()}`;
                PROCUREMENT_MATRIX.procurementTypes.push({
                    id: newId,
                    name: newName.trim(),
                    code: "HT_MOI",
                    legalBasis: "Luật Đấu thầu số 22/2023/QH15",
                    desc: "Hình thức lựa chọn nhà thầu tùy biến bởi quản trị viên",
                    phases: [
                        {
                            phaseId: "ph_1",
                            phaseName: "Giai đoạn thực hiện",
                            documents: [
                                { id: `doc_${Date.now()}_1`, code: "01.TTr", name: "Tờ trình đề xuất thực hiện" },
                                { id: `doc_${Date.now()}_2`, code: "02.QD", name: "Quyết định phê duyệt" }
                            ]
                        }
                    ]
                });

                activeAdminTypeId = newId;
                renderAdminMatrixModal();
                showToast(`Đã thêm Hình thức LCNT mới: ${newName}!`);
            }
        });
    }

    const btnSaveMatrixSettings = document.getElementById("btnSaveMatrixSettings");
    if (btnSaveMatrixSettings) {
        btnSaveMatrixSettings.addEventListener("click", () => {
            saveCurrentAdminInputs();

            try {
                localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(PROCUREMENT_MATRIX));
                localStorage.setItem("ho_so_tu_dong_implementation_matrix", JSON.stringify(IMPLEMENTATION_MATRIX));
            } catch (err) {
                console.error("Save custom matrix error:", err);
            }

            // Sync active implementation type with roadmap
            if (appState.projectRoadmap) {
                applyImplementationTypeToRoadmap(appState.projectRoadmap.implementationTypeId, false);
                recalculateAllTaskDates(false, true);
            }

            // Apply changes across the app
            initProcurementTypeSelector();
            renderRoadmapUI();
            renderDocTabs();
            renderDocumentPreview();

            const modal = document.getElementById("modalProcurementMatrixManager");
            if (modal) modal.classList.add("hidden");
            showToast("Đã lưu và áp dụng toàn diện cấu hình LCNT, Triển khai & thứ tự mẫu văn bản!", "success");
        });
    }

    const btnResetMatrixDefault = document.getElementById("btnResetMatrixDefault");
    if (btnResetMatrixDefault) {
        btnResetMatrixDefault.addEventListener("click", () => {
            if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ Ma trận Hình thức LCNT & Quy trình Triển khai về mặc định ban đầu?")) {
                PROCUREMENT_MATRIX = JSON.parse(JSON.stringify(DEFAULT_PROCUREMENT_MATRIX));
                IMPLEMENTATION_MATRIX = JSON.parse(JSON.stringify(DEFAULT_IMPLEMENTATION_MATRIX));
                try {
                    localStorage.removeItem("ho_so_tu_dong_matrix_custom");
                    localStorage.removeItem("ho_so_tu_dong_implementation_matrix");
                } catch (e) {}

                activeAdminTypeId = PROCUREMENT_MATRIX.procurementTypes[0].id;
                activeAdminImplTypeId = IMPLEMENTATION_MATRIX.implementationTypes[0].id;
                if (appState.projectRoadmap) {
                    appState.projectRoadmap.implementationTypeId = "trien_khai_sua_chua";
                    applyImplementationTypeToRoadmap("trien_khai_sua_chua", true);
                    recalculateAllTaskDates(false, true);
                }

                initProcurementTypeSelector();
                renderRoadmapUI();
                renderDocTabs();
                renderDocumentPreview();
                renderAdminMatrixModal();
                showToast("Đã khôi phục Ma trận LCNT & Quy trình Triển khai về mặc định ban đầu!", "info");
            }
        });
    }

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // Task Formula Modal Controllers (Auto real-time calculation)
    // -------------------------------------------------------------
    const formulaTypeRadios = document.querySelectorAll('input[name="formulaType"]');
    formulaTypeRadios.forEach(r => r.addEventListener("change", updateFormulaModalPreview));

    const formulaRefSelect = document.getElementById("formulaRefTaskSelect");
    if (formulaRefSelect) formulaRefSelect.addEventListener("change", updateFormulaModalPreview);

    const formulaOffsetInput = document.getElementById("formulaOffsetDays");
    if (formulaOffsetInput) formulaOffsetInput.addEventListener("input", updateFormulaModalPreview);

    const btnCloseFormulaModal = document.getElementById("btnCloseFormulaModal");
    if (btnCloseFormulaModal) {
        btnCloseFormulaModal.addEventListener("click", () => {
            document.getElementById("modalTaskFormulaConfig")?.classList.add("hidden");
        });
    }

    const btnCancelFormulaModal = document.getElementById("btnCancelFormulaModal");
    if (btnCancelFormulaModal) {
        btnCancelFormulaModal.addEventListener("click", () => {
            document.getElementById("modalTaskFormulaConfig")?.classList.add("hidden");
        });
    }

    const btnApplyFormulaSave = document.getElementById("btnApplyFormulaSave");
    if (btnApplyFormulaSave) {
        btnApplyFormulaSave.addEventListener("click", () => {
            if (!currentFormulaContext) return;
            const { task } = currentFormulaContext;
            const selectedRadio = document.querySelector('input[name="formulaType"]:checked');
            const fType = selectedRadio ? selectedRadio.value : "default";

            const refSelect = document.getElementById("formulaRefTaskSelect");
            const offsetInput = document.getElementById("formulaOffsetDays");
            const offset = parseInt(offsetInput ? offsetInput.value : 0, 10) || 0;

            task.dateFormula = {
                type: fType,
                refTaskId: fType === "custom" ? (refSelect ? refSelect.value : "") : "",
                offsetDays: offset
            };

            const previewDiv = document.getElementById("formulaCalcPreview");
            const calculatedDate = previewDiv ? previewDiv.textContent.trim() : "";
            if (calculatedDate && calculatedDate.length === 10) {
                task.date = calculatedDate;
                task.dayOfWeek = getDayOfWeekInVietnamese(calculatedDate);
            }

            document.getElementById("modalTaskFormulaConfig")?.classList.add("hidden");
            // Tự động tính toán dây chuyền ngay lập tức và render lại đầy đủ
            recalculateAllTaskDates(false, false);
            showToast(`Đã áp dụng chế độ tính ngày cho: ${task.name}!`, "success");
        });
    }

        // Expose helpers globally for testing or inline onclicks
    window.appState = appState;
    window.PROCUREMENT_MATRIX = PROCUREMENT_MATRIX;
    window.recalculateAllTaskDates = recalculateAllTaskDates;
    window.openTaskFormulaModal = openTaskFormulaModal;
    window.openEditPackageModal = openEditPackageModal;
    window.renderAdminMatrixModal = renderAdminMatrixModal;
    window.switchMainTab = switchMainTab;
    window.applyVariableToSelection = applyVariableToSelection;
    window.renderDocumentPreview = renderDocumentPreview;
    window.openProcurementMatrixModal = () => {
        const dd = document.getElementById("userAccountDropdown");
        if (dd) dd.classList.add("hidden");
        activeAdminTypeId = appState.selectedProcurementTypeId || PROCUREMENT_MATRIX.procurementTypes[0].id;
        renderAdminMatrixModal();
        const m = document.getElementById("modalProcurementMatrixManager");
        if (m) m.classList.remove("hidden");
    };

        initProcurementTypeSelector();
    renderDocTabs();
    renderCustomVariablesUI();
    renderPackageDropdown();
    populateFormInputs();
    applyVariableFilter();
    const initialTab = (window.location.hash === "#docs" || window.location.hash === "#tao-ho-so") 
        ? "docs" 
        : (appState.activeMainTab || "roadmap");

    if (window.history && window.history.replaceState) {
        window.history.replaceState({
            tab: initialTab,
            activeDocId: appState.activeDocId,
            pkgIdx: appState.activePackageIndex
        }, "", `#${initialTab}`);
    }


    // =============================================================
    // PREVIEW INLINE EDITING & CONTEXT MENU CONTROLLERS
    // =============================================================
    let isPreviewEditing = false;
    let lastSelectedRange = null;
    let lastSelectedText = "";
    let lastSelectedSpan = null;

    function slugifyToUpperSnake(str) {
        if (!str) return "BIEN_MOI_" + Date.now().toString().slice(-4);
        let s = str.trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d").replace(/Đ/g, "D")
            .replace(/[^a-zA-Z0-9\s_]/g, "")
            .trim()
            .replace(/\s+/g, "_")
            .toUpperCase();
        if (!s) s = "BIEN_MOI_" + Date.now().toString().slice(-4);
        return s.slice(0, 30);
    }

    const btnTogglePreviewEdit = document.getElementById("btnTogglePreviewEdit");
    const btnTogglePreviewEditText = document.getElementById("btnTogglePreviewEditText");
    const btnResetPreviewDoc = document.getElementById("btnResetPreviewDoc");

    if (btnTogglePreviewEdit) {
        btnTogglePreviewEdit.addEventListener("click", () => {
            isPreviewEditing = !isPreviewEditing;
            if (documentPreviewContent) {
                documentPreviewContent.setAttribute("contenteditable", isPreviewEditing ? "true" : "false");
            }
            if (isPreviewEditing) {
                btnTogglePreviewEdit.className = "text-[10.5px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-0.5 rounded shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer";
                if (btnTogglePreviewEditText) btnTogglePreviewEditText.textContent = "Khóa xem";
                showToast("Đã bật chỉnh sửa trực tiếp. Bạn có thể gõ nội dung hoặc quét khối chuột phải để gán/gộp biến xạ.");
            } else {
                btnTogglePreviewEdit.className = "text-[10.5px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold px-2 py-0.5 rounded border border-slate-300 shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer";
                if (btnTogglePreviewEditText) btnTogglePreviewEditText.textContent = "Sửa trực tiếp";
            }
        });
    }

    // Save custom HTML when user edits preview directly
    if (documentPreviewContent) {
        documentPreviewContent.addEventListener("input", () => {
            const activeDoc = getCurrentActiveDoc();
            if (!activeDoc) return;
            if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
            appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
            saveState();
        });

        // Right-Click Context Menu Listener on Document Preview
        documentPreviewContent.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            const sel = window.getSelection();
            lastSelectedSpan = e.target.closest("[data-var-key]");

            if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
                lastSelectedRange = sel.getRangeAt(0).cloneRange();
                lastSelectedText = sel.toString().trim();
            } else if (lastSelectedSpan) {
                const range = document.createRange();
                range.selectNodeContents(lastSelectedSpan);
                sel.removeAllRanges();
                sel.addRange(range);
                lastSelectedRange = range.cloneRange();
                lastSelectedText = lastSelectedSpan.textContent.trim();
            } else {
                lastSelectedRange = null;
                lastSelectedText = "";
            }

            const menu = document.getElementById("previewContextMenu");
            const previewLabel = document.getElementById("ctxSelectionPreview");
            if (!menu) return;

            if (previewLabel) {
                previewLabel.textContent = lastSelectedText 
                    ? `Vùng chọn: "${lastSelectedText.slice(0, 25)}${lastSelectedText.length > 25 ? '...' : ''}"` 
                    : "Chọn văn bản để gán biến";
            }

            // Populate existing variables submenu
            populateCtxVarsSubmenu();

            // Position context menu
            let x = e.clientX, y = e.clientY;
            if (x + 270 > window.innerWidth) x = window.innerWidth - 275;
            if (y + 280 > window.innerHeight) y = window.innerHeight - 285;

            menu.style.left = `${Math.max(10, x)}px`;
            menu.style.top = `${Math.max(10, y)}px`;
            menu.classList.remove("hidden");
            document.getElementById("ctxLinkVarSubmenu")?.classList.add("hidden");
        });
    }

    // Dismiss context menu on click outside
    document.addEventListener("click", (e) => {
        const menu = document.getElementById("previewContextMenu");
        if (menu && !menu.contains(e.target)) {
            menu.classList.add("hidden");
            document.getElementById("ctxLinkVarSubmenu")?.classList.add("hidden");
        }
    });

    // Populate Submenu for "Link vào Biến xạ có sẵn"
    function populateCtxVarsSubmenu() {
        const container = document.getElementById("ctxVarListContainer");
        if (!container) return;
        container.innerHTML = "";

        const data = getMergedData();
        const allKeys = Object.keys(data).concat(commonGeneralKeys);
        const uniqueKeys = Array.from(new Set(allKeys)).filter(k => k && k.trim() !== "");

        uniqueKeys.sort().forEach(key => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "w-full text-left px-2 py-1 hover:bg-emerald-50 rounded text-[10px] flex items-center justify-between transition-colors border-b border-slate-50";
            const val = data[key] ? String(data[key]).slice(0, 22) : "(trống)";
            btn.innerHTML = `
                <div class="truncate pr-1">
                    <span class="font-bold text-slate-800 font-mono">{${key}}</span>
                    <span class="text-slate-400 block text-[9px] truncate">${val}</span>
                </div>
                <i class="fa-solid fa-link text-emerald-600 text-[8.5px] shrink-0"></i>
            `;

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                applyVariableToSelection(key);
                document.getElementById("previewContextMenu")?.classList.add("hidden");
            });

            container.appendChild(btn);
        });

        // Filter search input
        const searchInput = document.getElementById("ctxVarSearchInput");
        if (searchInput) {
            searchInput.value = "";
            searchInput.oninput = (e) => {
                const q = e.target.value.toLowerCase();
                container.querySelectorAll("button").forEach(btn => {
                    const text = btn.textContent.toLowerCase();
                    btn.style.display = text.includes(q) ? "flex" : "none";
                });
            };
        }
    }

    // Toggle Link Submenu
    const ctxMenuLinkVar = document.getElementById("ctxMenuLinkVar");
    if (ctxMenuLinkVar) {
        ctxMenuLinkVar.addEventListener("click", (e) => {
            e.stopPropagation();
            const sub = document.getElementById("ctxLinkVarSubmenu");
            if (sub) sub.classList.toggle("hidden");
        });
    }

    function applyVariableToSelection(varKey) {
        const activeDoc = getCurrentActiveDoc();
        if (!activeDoc || !lastSelectedRange) {
            showToast("Vui lòng quét khối một vùng văn bản trên Preview trước!", "error");
            return;
        }

        const data = getMergedData();
        const span = document.createElement("span");
        const val = data[varKey];
        if (val && String(val).trim() !== "") {
            span.className = "filled-val";
            span.textContent = val;
        } else {
            span.className = "placeholder-tag";
            span.innerHTML = `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${varKey}}`;
        }
        span.setAttribute("data-var-key", varKey);
        span.title = `Biến: {${varKey}}`;

        lastSelectedRange.deleteContents();
        lastSelectedRange.insertNode(span);

        // Save custom document HTML
        if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
        appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
        if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");

        saveState();
        showToast(`Đã link vùng chọn vào biến: {${varKey}}!`, "success");
    }

    // Context Menu: "Bổ sung Biến xạ mới"
    const ctxMenuAddVar = document.getElementById("ctxMenuAddVar");
    const modalCreateVar = document.getElementById("modalCreateVarFromPreview");
    const inputNewVarKey = document.getElementById("inputNewVarKey");
    const inputNewVarLabel = document.getElementById("inputNewVarLabel");
    const inputNewVarVal = document.getElementById("inputNewVarVal");
    const btnConfirmCreateVar = document.getElementById("btnConfirmCreateVar");

    if (ctxMenuAddVar) {
        ctxMenuAddVar.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            if (!lastSelectedText && !lastSelectedRange) {
                showToast("Vui lòng quét khối văn bản cần tạo biến trước!", "error");
                return;
            }

            const suggestedKey = slugifyToUpperSnake(lastSelectedText);
            if (inputNewVarKey) inputNewVarKey.value = suggestedKey;
            if (inputNewVarLabel) inputNewVarLabel.value = lastSelectedText || "Biến bổ sung";
            if (inputNewVarVal) inputNewVarVal.value = lastSelectedText;

            if (modalCreateVar) modalCreateVar.classList.remove("hidden");
        });
    }

    if (btnConfirmCreateVar) {
        btnConfirmCreateVar.addEventListener("click", () => {
            const key = inputNewVarKey ? inputNewVarKey.value.trim().toUpperCase() : "";
            const label = inputNewVarLabel ? inputNewVarLabel.value.trim() : key;
            const val = inputNewVarVal ? inputNewVarVal.value.trim() : "";

            if (!key) {
                alert("Vui lòng nhập Mã biến xạ!");
                return;
            }

            // 1. Add to custom variables in localStorage
            let customVars = [];
            try {
                const saved = localStorage.getItem("ho_so_custom_variables");
                if (saved) customVars = JSON.parse(saved);
            } catch (e) {}

            const existingIdx = customVars.findIndex(v => v.key === key);
            const varObj = { key: key, label: label, value: val, targetSheet: "Thông tin chung" };
            if (existingIdx >= 0) {
                customVars[existingIdx] = varObj;
            } else {
                customVars.push(varObj);
            }
            localStorage.setItem("ho_so_custom_variables", JSON.stringify(customVars));

            // 2. Set value in appState
            appState.generalInfo[key] = val;

            // 3. Apply to selection in preview
            applyVariableToSelection(key);

            // 4. Update Section 10 UI on the left
            renderCustomVariablesUI();
            populateFormInputs();

            if (modalCreateVar) modalCreateVar.classList.add("hidden");
            showToast(`Đã tạo và gán thành công biến xạ: {${key}}!`, "success");
        });
    }

    // Context Menu: "Gộp các biến xạ đã chọn"
    const ctxMenuMergeVars = document.getElementById("ctxMenuMergeVars");
    const modalMergeVars = document.getElementById("modalMergeVars");
    const mergeVarsDetectedList = document.getElementById("mergeVarsDetectedList");
    const inputMergedVarKey = document.getElementById("inputMergedVarKey");
    const inputMergedVarLabel = document.getElementById("inputMergedVarLabel");
    const btnConfirmMergeVars = document.getElementById("btnConfirmMergeVars");
    let detectedVarsInSelection = [];

    if (ctxMenuMergeVars) {
        ctxMenuMergeVars.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            if (!lastSelectedRange) {
                showToast("Vui lòng quét khối đoạn văn bản chứa các biến cần gộp!", "error");
                return;
            }

            // Find all [data-var-key] within selection
            const frag = lastSelectedRange.cloneContents();
            const spans = frag.querySelectorAll("[data-var-key]");
            detectedVarsInSelection = Array.from(spans).map(s => s.getAttribute("data-var-key"));

            if (mergeVarsDetectedList) {
                if (detectedVarsInSelection.length > 0) {
                    mergeVarsDetectedList.innerHTML = `
                        <div class="font-bold text-purple-900 mb-0.5">Phát hiện ${detectedVarsInSelection.length} biến trong vùng chọn:</div>
                        <div class="flex flex-wrap gap-1">
                            ${detectedVarsInSelection.map(k => `<span class="bg-purple-200 text-purple-900 font-mono px-1 rounded text-[9px]">{${k}}</span>`).join("")}
                        </div>
                    `;
                } else {
                    mergeVarsDetectedList.innerHTML = `<span class="text-slate-500 italic">Vùng chọn sẽ được gom thành một biến duy nhất với giá trị: "${lastSelectedText}"</span>`;
                }
            }

            const defaultKey = detectedVarsInSelection.length > 0 ? detectedVarsInSelection.join("_GOP_").slice(0, 25) : slugifyToUpperSnake(lastSelectedText);
            if (inputMergedVarKey) inputMergedVarKey.value = defaultKey;
            if (inputMergedVarLabel) inputMergedVarLabel.value = `Biến gộp (${detectedVarsInSelection.join(", ") || lastSelectedText.slice(0, 20)})`;

            if (modalMergeVars) modalMergeVars.classList.remove("hidden");
        });
    }

    if (btnConfirmMergeVars) {
        btnConfirmMergeVars.addEventListener("click", () => {
            const key = inputMergedVarKey ? inputMergedVarKey.value.trim().toUpperCase() : "";
            const label = inputMergedVarLabel ? inputMergedVarLabel.value.trim() : key;
            const val = lastSelectedText || "";

            if (!key) {
                alert("Vui lòng nhập Mã biến gộp!");
                return;
            }

            // Add to custom variables
            let customVars = [];
            try {
                const saved = localStorage.getItem("ho_so_custom_variables");
                if (saved) customVars = JSON.parse(saved);
            } catch (e) {}

            customVars.push({ key: key, label: label, value: val, targetSheet: "Thông tin chung" });
            localStorage.setItem("ho_so_custom_variables", JSON.stringify(customVars));

            appState.generalInfo[key] = val;
            applyVariableToSelection(key);
            renderCustomVariablesUI();
            populateFormInputs();

            if (modalMergeVars) modalMergeVars.classList.add("hidden");
            showToast(`Đã gộp thành công biến xạ: {${key}}!`, "success");
        });
    }

    // Context Menu: "Hủy liên kết biến xạ (giữ chữ thường)"
    const ctxMenuUnlinkVar = document.getElementById("ctxMenuUnlinkVar");
    if (ctxMenuUnlinkVar) {
        ctxMenuUnlinkVar.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            const activeDoc = getCurrentActiveDoc();
            if (!activeDoc || !lastSelectedRange) return;

            const textNode = document.createTextNode(lastSelectedText);
            lastSelectedRange.deleteContents();
            lastSelectedRange.insertNode(textNode);

            if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
            appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
            saveState();
            showToast("Đã hủy liên kết biến xạ thành văn bản thuần!");
        });
    }

    // Formatting Buttons in Context Menu
    const ctxFormatBold = document.getElementById("ctxFormatBold");
    const ctxFormatItalic = document.getElementById("ctxFormatItalic");
    const ctxFormatUnderline = document.getElementById("ctxFormatUnderline");

    [
        { btn: ctxFormatBold, cmd: "bold" },
        { btn: ctxFormatItalic, cmd: "italic" },
        { btn: ctxFormatUnderline, cmd: "underline" }
    ].forEach(({ btn, cmd }) => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                document.execCommand(cmd, false, null);
                const activeDoc = getCurrentActiveDoc();
                if (activeDoc && documentPreviewContent) {
                    if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
                    appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
                    saveState();
                }
            });
        }
    });

    // Reset preview document button
    if (btnResetPreviewDoc) {
        btnResetPreviewDoc.addEventListener("click", () => {
            const activeDoc = getCurrentActiveDoc();
            if (!activeDoc) return;
            if (confirm(`Bạn có chắc muốn khôi phục lại nội dung văn bản mẫu ban đầu của: "${activeDoc.name}"?`)) {
                if (appState.customDocumentHtml) {
                    delete appState.customDocumentHtml[activeDoc.id];
                }
                saveState();
                renderDocumentPreview();
                showToast("Đã khôi phục lại mẫu văn bản gốc ban đầu!", "info");
            }
        });
    }


    switchMainTab(initialTab, false);

})();
