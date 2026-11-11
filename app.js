// Tự Động Quản Lý & Xuất Hồ Sơ Mua Sắm, Xây Lắp - Core App Logic v3.0
(function () {
    // -------------------------------------------------------------
    // Master Procurement Matrix (Embedded + Async Sync)
    // -------------------------------------------------------------
    let PROCUREMENT_MATRIX = {"system": "Hệ thống Quản lý & Tự động xuất Hồ sơ Mua sắm, Xây lắp", "version": "3.0", "legalBases": ["Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023", "Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ", "Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 về công tác văn thư"], "procurementTypes": [{"id": "duoi_50_trieu", "code": "D50", "name": "Mua sắm (Dưới 50 triệu)", "badge": "< 50 triệu", "badgeColor": "emerald", "description": "Áp dụng mua sắm tài sản, thiết bị, sửa chữa thường xuyên dưới 50 triệu đồng theo dự toán nội bộ.", "threshold": 50000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d50_1", "code": "01.TTr-MS", "name": "01. Tờ trình phê duyệt chủ trương và dự toán", "desc": "Tờ trình đơn vị đề xuất mua sắm hàng hóa / sửa chữa", "requiredVars": ["TEN_DON_VI", "SO_TO_TRINH", "NGAY_TO_TRINH", "TEN_HANG_MUC", "LY_DO_MUA_SAM", "TONG_MUC_DAU_TU", "NGUON_VON", "TRUONG_DON_VI"]}, {"id": "d50_2", "code": "02.BC-MS", "name": "02. Báo cáo thẩm định & phê duyệt mua sắm", "desc": "Báo cáo phê duyệt kết quả mua sắm dưới 50 triệu", "requiredVars": ["TEN_DON_VI", "SO_BAO_CAO", "NGAY_BAO_CAO", "TEN_HANG_MUC", "TEN_NHA_THAU", "MA_SO_THUE", "GIA_TRI_MUA_SAM", "NGUOI_PHE_DUYET"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Nghiệm thu", "documents": [{"id": "d50_3", "code": "03.HD-KT", "name": "03. Hợp đồng kinh tế / Đơn đặt hàng", "desc": "Hợp đồng mua bán hoặc sửa chữa", "requiredVars": ["TEN_DON_VI", "DAI_DIEN_BEN_A", "TEN_NHA_THAU", "DAI_DIEN_BEN_B", "GIA_TRI_HOP_DONG", "THOI_GIAN_THUC_HIEN"]}, {"id": "d50_4", "code": "04.BB-NT", "name": "04. Biên bản nghiệm thu bàn giao và thanh lý", "desc": "Biên bản bàn giao thiết bị / hoàn thành sửa chữa", "requiredVars": ["TEN_DON_VI", "TEN_NHA_THAU", "NGAY_NGHIEM_THU", "NOI_DUNG_CONG_VIEC", "GIA_TRI_QUYET_TOAN"]}]}], "folder": "templates/Hinh_thuc_LCNT/Mua_sam_duoi_50tr"}, {"id": "duoi_100_trieu", "code": "D100", "name": "Xây dựng - Dưới 100tr", "badge": "50tr - 100tr", "badgeColor": "teal", "description": "Áp dụng chỉ định thầu siêu nhỏ không qua mạng theo Khoản 4 Điều 23 Luật Đấu thầu 2023.", "threshold": 100000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "d100_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Tờ trình phê duyệt KHLCNT gói mua sắm thường xuyên", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU", "HINH_THUC_LCNT", "NGUOI_TRINH"]}, {"id": "d100_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt của Người có thẩm quyền", "requiredVars": ["TEN_CHU_DAU_TU", "SO_QUYET_DINH", "NGAY_QUYET_DINH", "TEN_GOI_THAU", "NGUOI_KY_CDT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Ký kết & Thanh lý", "documents": [{"id": "d100_3", "code": "03.BB-TT", "name": "03. Biên bản thương thảo hoàn thiện đơn hàng", "desc": "Biên bản thống nhất giá và tiến độ giao hàng", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_THUONG_THAO", "THOI_GIAN_GIAO_HANG"]}, {"id": "d100_4", "code": "04.HD-KT", "name": "04. Hợp đồng kinh tế và biên bản giao nhận", "desc": "Hợp đồng kinh tế trọn gói", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG", "KHO_BAC_NHA_NUOC"]}]}], "folder": "templates/Hinh_thuc_LCNT/Xay_dung_duoi_100tr"}, {"id": "chao_gia_han_che", "code": "CGHC", "name": "Mua sắm - Chào giá hạn chế", "badge": "Chào giá NB", "badgeColor": "cyan", "description": "Gửi thư mời chào giá đến ít nhất 3 nhà thầu có năng lực để so sánh giá cạnh tranh.", "threshold": 500000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cghc_1", "code": "01.TTr-CT", "name": "01. Tờ trình phê duyệt chủ trương chào giá", "desc": "Tờ trình chủ trương mua sắm cạnh tranh", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "cghc_2", "code": "02.BC-MS", "name": "02. Báo cáo đề xuất phương án chào giá hạn chế", "desc": "Đề xuất danh sách ít nhất 3 nhà thầu", "requiredVars": ["TEN_CHU_DAU_TU", "DANH_SACH_3_NHA_THAU"]}, {"id": "cghc_3", "code": "03.TB-CG", "name": "03. Thư mời chào giá kèm bảng yêu cầu kỹ thuật", "desc": "Gửi các nhà thầu nộp thư báo giá", "requiredVars": ["TEN_NHA_THAU", "HAN_NOP_BAO_GIA", "YEU_CAU_KY_THUAT"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Đánh giá & Trao thầu", "documents": [{"id": "cghc_4", "code": "04.BB-MT", "name": "04. Biên bản mở thư chào giá", "desc": "Biên bản mở niêm phong các báo giá", "requiredVars": ["THOI_GIAN_MO_THAU", "DANH_SACH_GIA_CHAO"]}, {"id": "cghc_5", "code": "05.BB-DG", "name": "05. Biên bản họp đánh giá so sánh báo giá", "desc": "So sánh kỹ thuật và đơn giá", "requiredVars": ["TO_CHUYEN_GIA", "DON_VI_GIA_THAP_NHAT"]}, {"id": "cghc_6", "code": "06.BB-TT", "name": "06. Biên bản thương thảo hợp đồng", "desc": "Thương thảo với đơn vị có giá tốt nhất", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_THUONG_THAO"]}, {"id": "cghc_7", "code": "07.BC-DG", "name": "07. Báo cáo đánh giá kết quả chào giá", "desc": "Báo cáo trình lãnh đạo phê duyệt", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_DE_NGHI"]}, {"id": "cghc_8", "code": "08.TB-KQ", "name": "08. Thông báo kết quả chào giá", "desc": "Thông báo gửi các đơn vị tham gia", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_TRUNG_THAU"]}, {"id": "cghc_9", "code": "09.HD-KT", "name": "09. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế ký kết", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU_TRUNG", "GIA_TRI_HOP_DONG"]}]}], "folder": "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_han_che"}, {"id": "chi_dinh_thau_rut_gon", "code": "CDTRG", "name": "Xây dựng - Chỉ định thầu rút gọn", "badge": "CĐT Rút Gọn", "badgeColor": "emerald", "description": "Quy trình chuẩn theo Điều 78 Nghị định 24/2024/NĐ-CP (Tư vấn, Xây lắp, Hàng hóa).", "threshold": 1000000000, "phases": [{"phaseId": "chuan_bi", "phaseName": "Giai đoạn Chuẩn bị", "documents": [{"id": "cdtrg_1", "code": "01.TTr-KHLCNT", "name": "01. Tờ trình phê duyệt Kế hoạch LCNT", "desc": "Trình cấp thẩm quyền phê duyệt KHLCNT", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_DU_AN", "TEN_GOI_THAU", "GIA_GOI_THAU_SO"]}, {"id": "cdtrg_2", "code": "02.QD-KHLCNT", "name": "02. Quyết định phê duyệt Kế hoạch LCNT", "desc": "Quyết định phê duyệt KHLCNT", "requiredVars": ["SO_QUYET_DINH_KHLCNT", "NGAY_QUYET_DINH", "NGUOI_KY_CDT"]}, {"id": "cdtrg_3", "code": "03.GM-TT", "name": "03. Giấy mời tham gia hoàn thiện hợp đồng", "desc": "Gửi nhà thầu được chỉ định", "requiredVars": ["TEN_BAN_QUAN_LY_DU_AN", "TEN_NHA_THAU", "THOI_GIAN_HOP", "DIA_DIEM_HOP"]}]}, {"phaseId": "thuc_hien", "phaseName": "Giai đoạn Hoàn thiện & Phê duyệt", "documents": [{"id": "cdtrg_4", "code": "04.BB-HT", "name": "04. Biên bản hoàn thiện hợp đồng", "desc": "Biên bản hoàn thiện điều khoản hợp đồng", "requiredVars": ["SO_BIEN_BAN_HOAN_THIEN", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU", "DAI_DIEN_NHA_THAU"]}, {"id": "cdtrg_5", "code": "05.TTr-KQLCNT", "name": "05. Tờ trình phê duyệt kết quả chỉ định thầu", "desc": "Trình phê duyệt chỉ định thầu", "requiredVars": ["SO_TO_TRINH", "CO_QUAN_TRINH", "TRUONG_BAN_DHDA", "TEN_NHA_THAU"]}, {"id": "cdtrg_6", "code": "06.QD-KQLCNT", "name": "06. Quyết định phê duyệt kết quả chỉ định thầu", "desc": "Quyết định phê duyệt trúng thầu", "requiredVars": ["SO_QUYET_DINH", "NGUOI_KY_CDT", "GIA_TRI_HOP_DONG_SO", "THOI_GIAN_THUC_HIEN"]}, {"id": "cdtrg_7", "code": "07.HD-KT", "name": "07. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế chính thức", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO", "KHO_BAC_NHA_NUOC"]}]}], "folder": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon"}, {"id": "chao_gia_rong_rai", "code": "CGRR", "name": "Mua sắm - Chào giá rộng rãi", "folder": "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_rong_rai", "badge": "Chào giá RR", "badgeColor": "blue", "description": "Áp dụng phương thức chào giá cạnh tranh rộng rãi theo quy chế mua sắm và Luật Đấu thầu.", "threshold": 5000000000, "phases": [{"phaseId": "chuan_bi_cgrr", "phaseName": "Giai đoạn Chuẩn bị & Phát hành Yêu cầu báo giá", "documents": [{"id": "cgrr_1", "code": "01.TTr-CGRR", "name": "01. Tờ trình phê duyệt chủ trương và kế hoạch chào giá rộng rãi", "desc": "Tờ trình đơn vị đề xuất chào giá rộng rãi", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "cgrr_2", "code": "02.QD-CGRR", "name": "02. Quyết định phê duyệt chủ trương và phương án chào giá", "desc": "Phê duyệt phương án chào giá rộng rãi", "requiredVars": ["SO_QUYET_DINH", "NGAY_QUYET_DINH", "NGUOI_KY_CDT"]}, {"id": "cgrr_3", "code": "03.TB-CGRR", "name": "03. Thông báo mời chào giá rộng rãi kèm Bảng yêu cầu kỹ thuật", "desc": "Thông báo công khai mời các nhà thầu gửi báo giá", "requiredVars": ["TEN_GOI_THAU", "HAN_NOP_BAO_GIA", "YEU_CAU_KY_THUAT"]}]}, {"phaseId": "danh_gia_trao_thau_cgrr", "phaseName": "Giai đoạn Đánh giá báo giá & Ký kết hợp đồng", "documents": [{"id": "cgrr_4", "code": "04.BB-MT", "name": "04. Biên bản mở các bản chào giá", "desc": "Biên bản mở công khai các hồ sơ báo giá", "requiredVars": ["THOI_GIAN_MO_THAU", "DANH_SACH_GIA_CHAO"]}, {"id": "cgrr_5", "code": "05.BB-DG", "name": "05. Biên bản họp đánh giá và so sánh báo giá", "desc": "Đánh giá đáp ứng kỹ thuật và xếp hạng giá", "requiredVars": ["TO_CHUYEN_GIA", "DON_VI_GIA_THAP_NHAT"]}, {"id": "cgrr_6", "code": "06.BB-TT", "name": "06. Biên bản thương thảo và hoàn thiện hợp đồng", "desc": "Thương thảo các điều khoản với đơn vị xếp hạng 1", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_THUONG_THAO"]}, {"id": "cgrr_7", "code": "07.BC-DG", "name": "07. Báo cáo đánh giá kết quả chào giá rộng rãi", "desc": "Báo cáo trình người có thẩm quyền phê duyệt", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_DE_NGHI"]}, {"id": "cgrr_8", "code": "08.QD-PD-KQ", "name": "08. Quyết định phê duyệt kết quả lựa chọn nhà thầu", "desc": "Quyết định phê duyệt kết quả chào giá", "requiredVars": ["SO_QUYET_DINH", "GIA_TRUNG_THAU_SO"]}, {"id": "cgrr_9", "code": "09.TB-KQ", "name": "09. Thông báo kết quả lựa chọn nhà thầu", "desc": "Thông báo công khai kết quả trúng thầu", "requiredVars": ["TEN_NHA_THAU_TRUNG", "GIA_TRUNG_THAU"]}, {"id": "cgrr_10", "code": "10.HD-KT", "name": "10. Hợp đồng kinh tế", "desc": "Hợp đồng kinh tế chính thức", "requiredVars": ["TEN_CHU_DAU_TU", "TEN_NHA_THAU_TRUNG", "GIA_TRI_HOP_DONG"]}]}]}, {"id": "dau_thau_rong_rai_hh_xl", "code": "DTRR", "name": "Xây dựng - Đấu thầu rộng rãi qua mạng", "badge": "Đấu Thầu Rộng Rãi", "badgeColor": "rose", "description": "Đầy đủ 23 biểu mẫu theo chuẩn Hệ thống Mạng Đấu thầu Quốc gia qua 6 giai đoạn (từ chuẩn bị đến ký HĐ).", "threshold": 100000000000, "phases": [{"phaseId": "giai_doan_1_hsmt", "phaseName": "GĐ 1: Chuẩn bị Hồ sơ mời thầu (E-HSMT)", "documents": [{"id": "dtrr_1", "code": "01.QD-TL", "name": "01. Quyết định thành lập Tổ chuyên gia và Tổ thẩm định", "desc": "Thành lập tổ chấm thầu", "requiredVars": ["TO_TRUONG_CHUYEN_GIA", "TO_TRUONG_THAM_DINH"]}, {"id": "dtrr_2", "code": "02.BB-HOP-TCG", "name": "02. Biên bản họp Tổ chuyên gia thông qua dự thảo E-HSMT", "desc": "Họp rà soát tiêu chuẩn mời thầu", "requiredVars": ["NOI_DUNG_DU_THAO"]}, {"id": "dtrr_3", "code": "03.TTr-HSMT", "name": "03. Tờ trình đề nghị thẩm định, phê duyệt E-HSMT", "desc": "Trình thẩm định E-HSMT", "requiredVars": ["TEN_GOI_THAU", "GIA_GOI_THAU"]}, {"id": "dtrr_4", "code": "04.BB-HOP-TTD", "name": "04. Biên bản họp Tổ thẩm định E-HSMT", "desc": "Họp thẩm định E-HSMT", "requiredVars": ["KET_QUA_HOP_THAM_DINH"]}, {"id": "dtrr_5", "code": "05.BC-TD-HSMT", "name": "05. Báo cáo thẩm định E-HSMT", "desc": "Báo cáo thẩm định đạt yêu cầu", "requiredVars": ["KET_LUAN_THAM_DINH"]}, {"id": "dtrr_6", "code": "06.QD-PD-HSMT", "name": "06. Quyết định phê duyệt E-HSMT", "desc": "Phê duyệt để đăng tải mạng", "requiredVars": ["SO_QD_HSMT", "NGAY_KY"]}]}, {"phaseId": "giai_doan_2_to_chuc", "phaseName": "GĐ 2: Tổ chức Lựa chọn nhà thầu & Mở thầu", "documents": [{"id": "dtrr_7", "code": "07.TB-MT", "name": "07. Thông báo mời thầu (E-TBMT)", "desc": "Thông báo phát hành hồ sơ mời thầu", "requiredVars": ["SO_E_TBMT", "THOI_DIEM_DONG_THAU"]}, {"id": "dtrr_8", "code": "08.VB-LAM-RO", "name": "08. Văn bản làm rõ E-HSMT (nếu có)", "desc": "Giải đáp thắc mắc của nhà thầu", "requiredVars": ["NOI_DUNG_LAM_RO"]}, {"id": "dtrr_9", "code": "09.QD-SUA-DOI", "name": "09. Quyết định sửa đổi E-HSMT (nếu có)", "desc": "Điều chỉnh hồ sơ mời thầu", "requiredVars": ["NOI_DUNG_SUA_DOI"]}, {"id": "dtrr_10", "code": "10.BB-MO-THAU", "name": "10. Biên bản mở thầu điện tử", "desc": "Trích xuất danh sách nhà thầu dự thầu", "requiredVars": ["DANH_SACH_NHA_THAU_DU_THAU"]}]}, {"phaseId": "giai_doan_3_danh_gia", "phaseName": "GĐ 3: Đánh giá Hồ sơ dự thầu (E-HSDT)", "documents": [{"id": "dtrr_11", "code": "11.BB-HOP-PC", "name": "11. Biên bản họp Tổ chuyên gia phân công nhiệm vụ", "desc": "Phân công tổ viên chấm điểm", "requiredVars": ["PHAN_CONG_CHAM_THAU"]}, {"id": "dtrr_12", "code": "12.VB-LR-HSDT", "name": "12. Văn bản yêu cầu làm rõ E-HSDT (nếu có)", "desc": "Làm rõ hồ sơ dự thầu", "requiredVars": ["YEU_CAU_LAM_RO_HSDT"]}, {"id": "dtrr_13", "code": "13.BB-HOP-KQ", "name": "13. Biên bản họp Tổ chuyên gia thông qua kết quả chấm thầu", "desc": "Thống nhất xếp hạng nhà thầu", "requiredVars": ["XEP_HANG_NHA_THAU"]}, {"id": "dtrr_14", "code": "14.BC-DG-HSDT", "name": "14. Báo cáo đánh giá Hồ sơ dự thầu (E-HSDT)", "desc": "Báo cáo chấm thầu chính thức", "requiredVars": ["NHA_THAU_XEP_HANG_1"]}]}, {"phaseId": "giai_doan_4_thuong_thao", "phaseName": "GĐ 4: Thương thảo và Hoàn thiện hợp đồng", "documents": [{"id": "dtrr_15", "code": "15.GM-TT", "name": "15. Văn bản mời nhà thầu xếp hạng nhất vào thương thảo", "desc": "Mời thương thảo", "requiredVars": ["TEN_NHA_THAU_HANG_1", "LICH_THUONG_THAO"]}, {"id": "dtrr_16", "code": "16.BB-TT", "name": "16. Biên bản thương thảo hợp đồng", "desc": "Thương thảo các điều khoản", "requiredVars": ["GIA_THUONG_THAO_CUOI_CUNG"]}, {"id": "dtrr_17", "code": "17.BB-HT", "name": "17. Biên bản hoàn thiện hợp đồng", "desc": "Rà soát điều kiện hợp đồng", "requiredVars": ["GIA_TRI_HOP_DONG_THONG_NHAT"]}]}, {"phaseId": "giai_doan_5_phe_duyet", "phaseName": "GĐ 5: Thẩm định và Phê duyệt Kết quả LCNT", "documents": [{"id": "dtrr_18", "code": "18.TTr-KQLCNT", "name": "18. Tờ trình đề nghị thẩm định, phê duyệt Kết quả LCNT", "desc": "Trình phê duyệt trúng thầu", "requiredVars": ["TEN_DON_VI_TRUNG_THAU", "GIA_TRUNG_THAU"]}, {"id": "dtrr_19", "code": "19.BB-HOP-TTD", "name": "19. Biên bản họp Tổ thẩm định Kết quả LCNT", "desc": "Họp thẩm định kết quả", "requiredVars": ["Y_KIEN_TO_THAM_DINH"]}, {"id": "dtrr_20", "code": "20.BC-TD-KQ", "name": "20. Báo cáo thẩm định Kết quả LCNT", "desc": "Báo cáo thẩm định", "requiredVars": ["KET_LUAN_THAM_DINH_KQLCNT"]}, {"id": "dtrr_21", "code": "21.QD-PD-KQ", "name": "21. Quyết định phê duyệt Kết quả lựa chọn nhà thầu", "desc": "Quyết định phê duyệt trúng thầu chính thức", "requiredVars": ["SO_QUYET_DINH", "GIA_TRUNG_THAU_SO"]}]}, {"phaseId": "giai_doan_6_hop_dong", "phaseName": "GĐ 6: Công khai Kết quả & Ký kết Hợp đồng", "documents": [{"id": "dtrr_22", "code": "22.TB-KQ", "name": "22. Thông báo Kết quả lựa chọn nhà thầu", "desc": "Đăng tải kết quả trên mạng đấu thầu", "requiredVars": ["TEN_NHA_THAU_TRUNG_THAU"]}, {"id": "dtrr_23", "code": "23.HD-KT", "name": "23. Hợp đồng kinh tế chính thức (kèm phụ lục)", "desc": "Hợp đồng kinh tế xây lắp/mua sắm", "requiredVars": ["GIA_TRI_HOP_DONG", "BAO_DAM_THUC_HIEN_HD"]}]}], "folder": "templates/Hinh_thuc_LCNT/Xay_dung_dau_thau_rong_rai_qua_mang"}]};
    const DEFAULT_PROCUREMENT_MATRIX = JSON.parse(JSON.stringify(PROCUREMENT_MATRIX));

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
                    { "id": "tk_sc_3", "code": "01.TTr", "name": "[TRIỂN KHAI] Tờ trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-21", "docNo": "01/ĐKNCC/TTr-KTHT", "templateFile": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_sc_4", "code": "02.TTr", "name": "[TL TỔ THẨM ĐỊNH] Tờ Trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-22", "docNo": "02/ĐKNCC/TTr-KTHT", "templateFile": "" },
                    { "id": "tk_sc_5", "code": "930a.QĐ", "name": "[TL TỔ THẨM ĐỊNH] Quyết định", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-28", "docNo": "930a/QĐ-CHKQTCT", "templateFile": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx" },
                    { "id": "tk_sc_6", "code": "03.BC", "name": "BÁO CÁO BẢO TRÌ", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-29", "docNo": "03/BCTHBT-KTHT", "templateFile": "" },
                    { "id": "tk_sc_7", "code": "QĐ-DT", "name": "Phê duyệt dự toán G1", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "", "docNo": "", "templateFile": "" },
                    { "id": "tk_sc_8", "code": "04.TTr", "name": "[KH LCNT] Tờ trình", "signer": "PKTHT", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-29", "docNo": "04/ĐKNCC/TTr-KTHT", "templateFile": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx" },
                    { "id": "tk_sc_9", "code": "BB-TĐ", "name": "[KH LCNT] BB Thẩm định", "signer": "Tổ thẩm định", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-30", "docNo": "", "templateFile": "" },
                    { "id": "tk_sc_10", "code": "05.BC", "name": "[KH LCNT] BC Thẩm định", "signer": "Tổ thẩm định", "duration": 1, "dateFormula": { "type": "manual" }, "defaultDate": "2026-07-30", "docNo": "05/BC-HĐTĐ-KQTĐ", "templateFile": "" },
                    { "id": "tk_sc_11", "code": "968.QĐ", "name": "[KH LCNT] QĐ Phê Duyệt", "signer": "GĐ", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "2026-07-31", "docNo": "968/QĐ-CHKQTCT", "templateFile": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx" }
                ]
            },
            {
                "id": "trien_khai_mua_sam",
                "name": "2. Triển khai hồ sơ mua sắm",
                "code": "TK-MS",
                "description": "Áp dụng cho mua sắm hàng hóa, tài sản, trang thiết bị thường xuyên",
                "documents": [
                    { "id": "tk_ms_1", "code": "01.DX-NS", "name": "Báo cáo đề xuất nhu cầu mua sắm", "signer": "Đơn vị sử dụng", "duration": 2, "dateFormula": { "type": "manual" }, "defaultDate": "2026-01-12", "docNo": "01/BC-DXMS", "templateFile": "" },
                    { "id": "tk_ms_2", "code": "02.BB-HOP", "name": "Biên bản họp thống nhất danh mục mua sắm", "signer": "Hội đồng mua sắm", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "02/BB-HOP", "templateFile": "" },
                    { "id": "tk_ms_3", "code": "03.TM-BG", "name": "Thư mời báo giá / Biên bản thu thập 03 báo giá", "signer": "Tổ mua sắm", "duration": 3, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "03/TM-BG", "templateFile": "" },
                    { "id": "tk_ms_4", "code": "04.TTr-CTMS", "name": "Tờ trình phê duyệt chủ trương và dự toán mua sắm", "signer": "Phòng Kế hoạch", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "04/TTr-CTMS", "templateFile": "" },
                    { "id": "tk_ms_5", "code": "05.QĐ-CTMS", "name": "Quyết định phê duyệt chủ trương mua sắm", "signer": "Lãnh đạo đơn vị", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "05/QĐ-CTMS", "templateFile": "" },
                    { "id": "tk_ms_6", "code": "06.TTr-KHLCNT", "name": "Tờ trình đề nghị phê duyệt Kế hoạch LCNT", "signer": "Tổ mua sắm", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "06/TTr-KHLCNT", "templateFile": "" },
                    { "id": "tk_ms_7", "code": "07.QĐ-KHLCNT", "name": "Quyết định phê duyệt Kế hoạch LCNT mua sắm", "signer": "Cấp thẩm quyền", "duration": 1, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "07/QĐ-KHLCNT", "templateFile": "" }
                ]
            },
            {
                "id": "trien_khai_dau_tu",
                "name": "3. Triển khai hồ sơ đầu tư",
                "code": "TK-ĐT",
                "description": "Áp dụng cho dự án đầu tư xây dựng, cải tạo nâng cấp quy mô lớn",
                "documents": [
                    { "id": "tk_dt_1", "code": "01.TTr-CTDT", "name": "Tờ trình đề xuất chủ trương đầu tư", "signer": "Ban QLDA", "duration": 3, "dateFormula": { "type": "manual" }, "defaultDate": "2026-01-12", "docNo": "01/TTr-CTDT", "templateFile": "" },
                    { "id": "tk_dt_2", "code": "02.QĐ-CTDT", "name": "Quyết định phê duyệt chủ trương đầu tư", "signer": "Cấp quyết định ĐT", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "02/QĐ-CTDT", "templateFile": "" },
                    { "id": "tk_dt_3", "code": "03.NV-KS", "name": "Đề cương nhiệm vụ khảo sát, lập Báo cáo KT-KT", "signer": "Đơn vị tư vấn", "duration": 5, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "03/NV-KS", "templateFile": "" },
                    { "id": "tk_dt_4", "code": "04.TTr-BCKTKT", "name": "Tờ trình thẩm định Báo cáo KT-KT", "signer": "Ban QLDA", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "04/TTr-BCKTKT", "templateFile": "" },
                    { "id": "tk_dt_5", "code": "05.BC-TT", "name": "Báo cáo kết quả thẩm tra Báo cáo KT-KT", "signer": "Đơn vị thẩm tra", "duration": 5, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "05/BC-TT", "templateFile": "" },
                    { "id": "tk_dt_6", "code": "06.QĐ-PD-DA", "name": "Quyết định phê duyệt dự án đầu tư xây dựng", "signer": "Người có thẩm quyền", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "06/QĐ-PDDA", "templateFile": "" },
                    { "id": "tk_dt_7", "code": "07.TTr-KHLCNT", "name": "Tờ trình phê duyệt Kế hoạch LCNT tổng thể", "signer": "Chủ đầu tư", "duration": 3, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "07/TTr-KHLCNT", "templateFile": "" },
                    { "id": "tk_dt_8", "code": "08.QĐ-KHLCNT", "name": "Quyết định phê duyệt Kế hoạch LCNT tổng thể", "signer": "Cấp quyết định ĐT", "duration": 2, "dateFormula": { "type": "default" }, "defaultDate": "", "docNo": "08/QĐ-KHLCNT", "templateFile": "" }
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
                // Tự động dọn dẹp đường dẫn cũ không có thư mục phân cấp
                const rawStr = JSON.stringify(parsedImpl);
                if (rawStr.includes('"templates/01_To_trinh') || rawStr.includes('"templates/2_Bien_ban')) {
                    localStorage.removeItem("ho_so_tu_dong_implementation_matrix");
                } else {
                    IMPLEMENTATION_MATRIX = parsedImpl;
                }
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
                const rawStr = JSON.stringify(parsedCustom);
                if (rawStr.includes('"templates/01_To_trinh') || rawStr.includes('"templates/07_Hop_dong')) {
                    localStorage.removeItem("ho_so_tu_dong_matrix_custom");
                } else {
                    // Tự động chuẩn hóa / đồng bộ tên các quy trình chuẩn mặc định từ hệ thống (khớp 100% với 6 thư mục local thực tế)
                    const CANONICAL_PROCUREMENT_MAP = {
                        "duoi_50_trieu": { name: "Mua sắm (Dưới 50 triệu)", folder: "templates/Hinh_thuc_LCNT/Mua_sam_duoi_50tr" },
                        "duoi_100_trieu": { name: "Xây dựng - Dưới 100tr", folder: "templates/Hinh_thuc_LCNT/Xay_dung_duoi_100tr" },
                        "chao_gia_han_che": { name: "Mua sắm - Chào giá hạn chế", folder: "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_han_che" },
                        "chi_dinh_thau_rut_gon": { name: "Xây dựng - Chỉ định thầu rút gọn", folder: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon" },
                        "chao_gia_rong_rai": { name: "Mua sắm - Chào giá rộng rãi", folder: "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_rong_rai" },
                        "dau_thau_rong_rai_hh_xl": { name: "Xây dựng - Đấu thầu rộng rãi qua mạng", folder: "templates/Hinh_thuc_LCNT/Xay_dung_dau_thau_rong_rai_qua_mang" }
                    };
                    let hasMigration = false;
                    parsedCustom.procurementTypes.forEach(pt => {
                        // Di chuyển triệt để mục cũ chi_dinh_thau_thong_thuong sang chao_gia_rong_rai
                        if (pt.id === "chi_dinh_thau_thong_thuong" || (pt.name && pt.name.includes("Chỉ định thầu quy trình thông thường"))) {
                            pt.id = "chao_gia_rong_rai";
                            pt.code = "CGRR";
                            pt.name = "Mua sắm - Chào giá rộng rãi";
                            pt.folder = "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_rong_rai";
                            pt.badge = "Chào giá RR";
                            pt.badgeColor = "blue";
                            const defCgrr = DEFAULT_PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === "chao_gia_rong_rai");
                            if (defCgrr) {
                                pt.phases = JSON.parse(JSON.stringify(defCgrr.phases));
                                pt.threshold = defCgrr.threshold;
                                pt.description = defCgrr.description;
                            }
                            hasMigration = true;
                        } else if (CANONICAL_PROCUREMENT_MAP[pt.id]) {
                            const canonical = CANONICAL_PROCUREMENT_MAP[pt.id];
                            if (pt.name !== canonical.name) {
                                pt.name = canonical.name;
                                hasMigration = true;
                            }
                            if (!pt.folder || pt.folder !== canonical.folder) {
                                pt.folder = canonical.folder;
                                hasMigration = true;
                            }
                        }
                    });
                    // Đảm bảo không trùng lặp id
                    const seenIds = new Set();
                    parsedCustom.procurementTypes = parsedCustom.procurementTypes.filter(pt => {
                        if (seenIds.has(pt.id)) {
                            hasMigration = true;
                            return false;
                        }
                        seenIds.add(pt.id);
                        return true;
                    });
                    if (hasMigration) {
                        try {
                            localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(parsedCustom));
                        } catch (e) {}
                    }
                    PROCUREMENT_MATRIX = parsedCustom;
                }
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

    // Check if URL parameters specify workflow or doc
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const qWf = urlParams.get("workflow");
        const qDoc = urlParams.get("doc");
        if (qWf && PROCUREMENT_MATRIX.procurementTypes.some(pt => pt.id === qWf)) {
            appState.selectedProcurementTypeId = qWf;
        }
        if (qDoc) {
            appState.activeDocId = qDoc;
        }
    } catch (e) {}

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
                // Tự động làm sạch các bản lưu HTML cũ nếu có lỗi lặp ngày hoặc thiếu data-date-role
                if (appState.customDocumentHtml) {
                    for (const docKey in appState.customDocumentHtml) {
                        let h = appState.customDocumentHtml[docKey];
                        if (h) {
                            h = h.replace(/(,\s*)ngày\s+(<span[^>]*data-var-key="NGAY_[^>]*>)/gi, '$1$2');
                            h = h.replace(/(,\s*)ngày\s+ngày\s+/gi, '$1ngày ');
                            appState.customDocumentHtml[docKey] = h;
                        }
                    }
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

    // Re-apply and prioritize URL parameters over localStorage
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const qWf = urlParams.get("workflow");
        const qDoc = urlParams.get("doc");
        const qTab = urlParams.get("tab");
        if (qWf && PROCUREMENT_MATRIX.procurementTypes.some(pt => pt.id === qWf)) {
            appState.selectedProcurementTypeId = qWf;
        }
        if (qDoc) {
            appState.activeDocId = qDoc;
            appState.activeMainTab = "docs";
        }
        if (qTab === "docs" || window.location.hash === "#docs" || window.location.hash === "#tao-ho-so") {
            appState.activeMainTab = "docs";
        }
    } catch (e) {}

    // Tự động dọn dẹp các biến dự án chung (như TEN_DU_AN) bị lưu nhầm vào gói thầu cũ
    try {
        if (appState && appState.packages && Array.isArray(appState.packages)) {
            appState.packages.forEach(p => {
                if (p.fields) {
                    generalFieldsList.forEach(k => {
                        if (p.fields[k] !== undefined) {
                            if (!appState.generalInfo[k]) {
                                appState.generalInfo[k] = p.fields[k];
                            }
                            delete p.fields[k];
                        }
                    });
                }
            });
        }
    } catch(e) {}

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
        let pt = PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === appState.selectedProcurementTypeId);
        if (!pt && PROCUREMENT_MATRIX.procurementTypes && PROCUREMENT_MATRIX.procurementTypes.length > 0) {
            pt = PROCUREMENT_MATRIX.procurementTypes[0];
            appState.selectedProcurementTypeId = pt.id;
        }
        return pt || null;
    }

    function getAllDocsForCurrentType() {
        const pt = getCurrentProcurementType();
        const docs = [];
        if (!pt || !pt.phases) return docs;
        pt.phases.forEach(ph => {
            (ph.documents || []).forEach(doc => {
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

    function hasDocTemplate(docObj) {
        if (!docObj) return false;
        const docId = docObj.id || docObj.code || "";
        if (localStorage.getItem("ho_so_custom_template_" + docId)) return true;
        if (docObj.templateFile && docObj.templateFile.trim() !== "") return true;
        if (prebuiltDocxMap[docId] && prebuiltDocxMap[docId].trim() !== "") return true;
        return false;
    }


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
        "TEN_CHU_DAU_TU", "TEN_CHU_DAU_TU_VIET_HOA", "TEN_BAN_QUAN_LY_DU_AN", "CO_QUAN_TRINH", "CO_QUAN_TRINH_QUYET_DINH",
        "CAP_QUYET_DINH_DAU_TU", "DIA_DANH", "TINH_THANH_PHO", "DIA_CHI_TRU_SO", "TEN_DU_AN",
        "TEN_CONG_TRINH", "NGUON_VON", "TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU",
        "HINH_THUC_LCNT", "LOAI_HOP_DONG", "THOI_GIAN_THUC_HIEN", "THOI_GIAN_TO_CHUC_LCNT",
        "SO_TO_TRINH", "NGAY_TO_TRINH", "NGAY_TO_TRINH_FULL", "TEN_KEM_SO_NGAY_TO_TRINH",
        "SO_QUYET_DINH", "NGAY_QUYET_DINH", "NGAY_QUYET_DINH_FULL", "TEN_KEM_SO_NGAY_QUYET_DINH",
        "SO_GIAY_MOI", "NGAY_GIAY_MOI", "NGAY_GIAY_MOI_FULL", "TEN_KEM_SO_NGAY_GIAY_MOI",
        "SO_BIEN_BAN_HOAN_THIEN", "NGAY_BIEN_BAN", "NGAY_BIEN_BAN_FULL", "TEN_KEM_SO_NGAY_BIEN_BAN",
        "SO_HOP_DONG", "NGAY_HOP_DONG", "NGAY_HOP_DONG_FULL", "TEN_KEM_SO_NGAY_HOP_DONG",
        "SO_CONG_VAN_THAM_GIA",
        "TEN_NHA_THAU", "TEN_NHA_THAU_VIET_HOA", "DAI_DIEN_NHA_THAU", "CHUC_VU_DAI_DIEN",
        "DIA_CHI_NHA_THAU", "MA_SO_THUE", "GIA_TRI_HOP_DONG_SO", "GIA_TRI_HOP_DONG_CHU"
    ];

    function getRelevantVarsForDoc(docId) {
        let varSet;
        if (DOC_VAR_MAP[docId]) {
            varSet = new Set(DOC_VAR_MAP[docId]);
        } else {
            const docs = getAllDocsForCurrentType();
            const doc = docs.find(d => d.id === docId);
            if (doc && Array.isArray(doc.requiredVars) && doc.requiredVars.length > 0) {
                varSet = new Set(doc.requiredVars);
            } else {
                varSet = new Set(commonGeneralKeys.concat(["TEN_GOI_THAU", "GIA_GOI_THAU_SO", "GIA_GOI_THAU_CHU", "TEN_NHA_THAU", "GIA_TRI_HOP_DONG_SO"]));
            }
        }
        // Tự động mở rộng các biến dẫn xuất: _FULL và TEN_KEM_SO_NGAY_...
        const suffixes = ["TO_TRINH", "QUYET_DINH", "GIAY_MOI", "BIEN_BAN", "HOP_DONG"];
        suffixes.forEach(sfx => {
            if (varSet.has(`NGAY_${sfx}`) || varSet.has(`SO_${sfx}`) || (sfx === "BIEN_BAN" && varSet.has("SO_BIEN_BAN_HOAN_THIEN"))) {
                varSet.add(`NGAY_${sfx}`);
                varSet.add(`NGAY_${sfx}_FULL`);
                varSet.add(`TEN_KEM_SO_NGAY_${sfx}`);
                if (sfx === "BIEN_BAN") varSet.add("SO_BIEN_BAN_HOAN_THIEN");
                else varSet.add(`SO_${sfx}`);
            }
        });
        return varSet;
    }



    // -------------------------------------------------------------
    // Roadmap & Timeline Controller Functions
    // -------------------------------------------------------------

    // =============================================================
    // ROADMAP HIGHLIGHTING FOR ACTIVE DOC & PACKAGE (WHEN SWITCHING TO TAB 1)
    // =============================================================
    let roadmapAuraTimer = null;

    function clearRoadmapAura() {
        if (roadmapAuraTimer) {
            clearTimeout(roadmapAuraTimer);
            roadmapAuraTimer = null;
        }
        document.querySelectorAll(".timeline-row-aura-red").forEach(el => el.classList.remove("timeline-row-aura-red"));
        document.querySelectorAll("#rmPackagesList .field-aura-highlight-red").forEach(el => el.classList.remove("field-aura-highlight-red"));
        const implWrapper = document.getElementById("rmImplementationTypeWrapper");
        if (implWrapper) implWrapper.classList.remove("field-aura-highlight-red");
    }

    function highlightRoadmapForActiveDoc(activeDocId, activePkgIdx) {
        clearRoadmapAura();

        // 1. Nổi hào quang đỏ ô Gói thầu bên trên
        if (activePkgIdx !== undefined && activePkgIdx >= 0) {
            const pkgCard = document.querySelector(`#rmPackagesList [data-pkg-idx="${activePkgIdx}"]`);
            if (pkgCard) {
                pkgCard.classList.add("field-aura-highlight-red");
            }
        }

        // 2. Nổi hào quang đỏ ô Triển khai bên trên
        const implWrapper = document.getElementById("rmImplementationTypeWrapper");
        if (implWrapper) {
            implWrapper.classList.add("field-aura-highlight-red");
        }

        // 3. Nổi hào quang đỏ cả hàng văn bản trong bảng Tiến độ
        let targetRow = null;
        if (activeDocId) {
            targetRow = document.querySelector(`#rmTimelineContainer tr[data-doc-id="${activeDocId}"]`);
            if (!targetRow) {
                const activeDoc = getCurrentActiveDoc();
                if (activeDoc) {
                    const docCodeClean = (activeDoc.code || "").toLowerCase();
                    const docNameClean = (activeDoc.name || "").toLowerCase().replace(/^[0-9\.\s]+/, "");
                    const allRows = Array.from(document.querySelectorAll("#rmTimelineContainer tbody tr"));
                    targetRow = allRows.find(tr => {
                        const rowText = tr.innerText.toLowerCase();
                        return (docCodeClean && rowText.includes(docCodeClean)) || (docNameClean && rowText.includes(docNameClean));
                    });
                }
            }
        }

        if (targetRow) {
            targetRow.classList.add("timeline-row-aura-red");
            // Tự động cuộn mượt hàng này vào giữa tầm nhìn
            setTimeout(() => {
                targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 150);
        }

        // Tự động gỡ bỏ hào quang sau 8 giây
        roadmapAuraTimer = setTimeout(() => {
            clearRoadmapAura();
        }, 8000);
    }

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

            if (btnNavRoadmap) btnNavRoadmap.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all bg-emerald-600 text-white shadow-xs cursor-pointer";
            if (btnNavDocs) btnNavDocs.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 cursor-pointer";

            // Đồng bộ gói thầu đang xem từ Tab 2 sang Tab 1
            if (appState.activePackageIndex !== undefined) {
                appState.selectedRoadmapPackageIndex = appState.activePackageIndex;
            }

            renderRoadmapUI();

            // Nổi hào quang đỏ cho hàng văn bản, ô gói thầu và ô triển khai bên trên
            highlightRoadmapForActiveDoc(appState.activeDocId, appState.activePackageIndex);
        } else {
            if (viewRoadmap) viewRoadmap.classList.add("hidden");
            if (viewDocs) viewDocs.classList.remove("hidden");
            if (headerProcurement) headerProcurement.classList.remove("hidden");

            // Thứ 1: Bên Tab tạo hồ sơ phải làm chìm ô Quy trình (không được chọn hoặc hiệu chỉnh vì đã chọn tại Tab 1)
            if (procurementTypeSelect) {
                procurementTypeSelect.disabled = true;
                procurementTypeSelect.classList.add("opacity-65", "cursor-not-allowed", "pointer-events-none");
            }

            if (btnNavDocs) btnNavDocs.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all bg-emerald-600 text-white shadow-xs cursor-pointer";
            if (btnNavRoadmap) btnNavRoadmap.className = "px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 cursor-pointer";

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
                procurementTypeSelect.disabled = true;
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


    // =============================================================
    // DYNAMIC TIMELINE PHASES GENERATOR FOR ALL PACKAGES
    // =============================================================
    function syncPackageProcurementTypeToPhase(pkg, pkgIdx, forceReset = false) {
        if (!appState.projectRoadmap) return;
        if (!appState.projectRoadmap.timelinePhases) appState.projectRoadmap.timelinePhases = [];
        const phases = appState.projectRoadmap.timelinePhases;

        const ptId = pkg.procurementTypeId || "chi_dinh_thau_rut_gon";
        const pt = (typeof PROCUREMENT_MATRIX !== "undefined" && PROCUREMENT_MATRIX.procurementTypes)
            ? (PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === ptId) || PROCUREMENT_MATRIX.procurementTypes[3] || PROCUREMENT_MATRIX.procurementTypes[0])
            : null;
        if (!pt) return;

        // Tìm phase đã có tương ứng với gói thầu này
        let phase = phases.find(p => p.packageId === pkg.id || (p.packageIndex !== undefined && p.packageIndex === pkgIdx));
        if (!phase) {
            const pkgName = (pkg.name || "").toLowerCase();
            const pkgNum = `gói thầu số ${pkgIdx + 1}`.toLowerCase();
            const pkgNumShort = `gói ${pkgIdx + 1}`.toLowerCase();
            phase = phases.find(p => {
                if (!p.isPackage) return false;
                const pTitle = (p.title || "").toLowerCase();
                return pTitle.includes(pkgNum) || pTitle.includes(pkgNumShort) || pTitle.includes(pkgName);
            });
        }

        // Gom toàn bộ danh mục tài liệu/thủ tục từ ma trận quy trình LCNT được chọn
        const allDocs = [];
        (pt.phases || []).forEach(ph => {
            (ph.documents || []).forEach(d => allDocs.push({ ...d, phaseName: ph.phaseName }));
        });

        const romanCodes = ["II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
        const phaseCode = romanCodes[pkgIdx] || `${pkgIdx + 2}`;

        if (!phase) {
            // Tạo mới Giai đoạn thủ tục cho gói thầu này
            const tasks = allDocs.map((doc, dIdx) => ({
                id: `task_${pkgIdx + 1}_${dIdx}`,
                stt: `${dIdx + 1}`,
                name: doc.name,
                docNo: "",
                signer: "",
                date: "",
                duration: doc.duration !== undefined ? doc.duration : 1,
                note: "",
                status: "Đang làm",
                dateFormula: { type: dIdx === 0 ? "manual" : "default" },
                docCode: doc.code || "",
                templateFile: doc.templateFile || "",
                docId: doc.id
            }));

            phase = {
                id: `phase_pkg_${pkg.id || (pkgIdx + 1)}`,
                packageId: pkg.id,
                packageIndex: pkgIdx,
                code: phaseCode,
                title: pkg.name || `Gói thầu số ${pkgIdx + 1}`,
                isPackage: true,
                packageName: pkg.name || `Gói thầu số ${pkgIdx + 1}`,
                tasks: tasks
            };
            phases.push(phase);
        } else {
            // Cập nhật thông tin phase hiện có
            phase.packageId = pkg.id;
            phase.packageIndex = pkgIdx;
            phase.isPackage = true;
            if (!phase.code || phase.code === "I") phase.code = phaseCode;
            phase.title = pkg.name || phase.title;
            phase.packageName = pkg.name || phase.packageName;

            // Nếu đổi quy trình LCNT hoặc phase chưa có tasks nào
            const existingTasks = phase.tasks || [];
            if (forceReset || existingTasks.length === 0) {
                phase.tasks = allDocs.map((doc, dIdx) => {
                    const existing = existingTasks.find(et => et.docId === doc.id || (et.docCode && et.docCode === doc.code));
                    return {
                        id: existing ? existing.id : `task_${pkgIdx + 1}_${dIdx}`,
                        stt: `${dIdx + 1}`,
                        name: doc.name,
                        docNo: existing ? existing.docNo : "",
                        signer: existing ? existing.signer : "",
                        date: existing ? existing.date : "",
                        duration: existing ? existing.duration : (doc.duration !== undefined ? doc.duration : 1),
                        note: existing ? existing.note : "",
                        status: existing ? existing.status : "Đang làm",
                        dateFormula: existing ? existing.dateFormula : { type: dIdx === 0 ? "manual" : "default" },
                        docCode: doc.code || "",
                        templateFile: doc.templateFile || "",
                        docId: doc.id
                    };
                });
            }
        }
    }

    function ensureTimelinePhasesForPackages() {
        if (!appState.projectRoadmap || !appState.projectRoadmap.packages) return;
        const pkgs = appState.projectRoadmap.packages;
        pkgs.forEach((pkg, idx) => {
            syncPackageProcurementTypeToPhase(pkg, idx, false);
        });
    }

    function renderRoadmapUI() {
        if (!appState.projectRoadmap) {
            appState.projectRoadmap = JSON.parse(JSON.stringify(defaultRoadmap));
        }
        ensureTimelinePhasesForPackages();
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
                card.setAttribute("data-pkg-idx", idx);
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
                                    ${[...PROCUREMENT_MATRIX.procurementTypes].sort(sortWorkflowAZ).map(pt => `<option value="${pt.id}" ${pt.id === (pkg.procurementTypeId || "chi_dinh_thau_rut_gon") ? "selected" : ""}>${pt.name}</option>`).join("")}
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
                    syncPackageProcurementTypeToPhase(pkg, idx, true);
                    renderTimelineTable();
                    recalculateAllTaskDates(false, true);
                    saveState();
                    showToast(`Đã cập nhật danh mục thủ tục cho ${pkg.name}`);
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

        ensureTimelinePhasesForPackages();
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
                } else if (phase.packageId && phase.packageId === currentPkg.id) {
                    shouldShowPhase = true;
                } else if (phase.packageIndex !== undefined && phase.packageIndex === selPkgIdx) {
                    shouldShowPhase = true;
                } else {
                    const pTitle = (phase.title || "").toLowerCase();
                    const pkgName = (currentPkg.name || "").toLowerCase();
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
                                    <tr class="hover:bg-slate-50 transition-colors h-6" data-phase-idx="${pIdx}" data-task-idx="${realTaskIdx}" data-task-id="${task.id}" data-doc-id="${linkedDocId}">
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
    // Jump to Field & Red Aura Glowing Highlight (Hào quang đỏ quanh Biến)
    // -------------------------------------------------------------
    let currentHighlightedWrapper = null;
    let currentHighlightTimeout = null;

    function highlightFieldWithRedAura(fieldKey, options = {}) {
        if (!fieldKey) return null;
        const cleanKey = fieldKey.replace(/^[{]+|[}]+$/g, "").trim();

        // Xóa hào quang cũ nếu có
        if (currentHighlightedWrapper) {
            currentHighlightedWrapper.classList.remove("field-aura-highlight-red");
            currentHighlightedWrapper = null;
        }
        if (currentHighlightTimeout) {
            clearTimeout(currentHighlightTimeout);
            currentHighlightTimeout = null;
        }

        // Tìm input / textarea / select khớp mã biến
        const input = document.querySelector(`[data-field="${cleanKey}"]`)
                   || document.querySelector(`[data-field="${cleanKey.toUpperCase()}"]`)
                   || document.querySelector(`[data-custom-field="${cleanKey}"]`);

        if (!input) {
            if (options.showErrorToast) {
                showToast(`Không tìm thấy trường: ${cleanKey}`, "error");
            }
            return null;
        }

        // Mở rộng hiển thị nếu đang bị ẩn do lọc
        const wrapper = input.closest(".field-item") || input.parentElement;
        if (wrapper && wrapper.style.display === "none") {
            appState.filterByDoc = false;
            applyVariableFilter();
        }

        // Mở Section chứa trường nếu đang đóng
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

        // Đóng dropdown thiếu nếu đang mở
        const dropdown = document.getElementById("missingFieldsDropdown");
        if (dropdown) dropdown.classList.add("hidden");

        // Cuộn mượt mà đưa ô nhập liệu vào giữa màn hình
        const targetWrapper = wrapper || input;
        targetWrapper.scrollIntoView({ behavior: "smooth", block: "center" });

        // Tạo hào quang màu đỏ bao quanh cả tên biến (label) và ô nhập liệu (input)
        targetWrapper.classList.add("field-aura-highlight-red");
        currentHighlightedWrapper = targetWrapper;

        // Tự động thu hồi hào quang sau 5 giây
        currentHighlightTimeout = setTimeout(() => {
            if (targetWrapper) targetWrapper.classList.remove("field-aura-highlight-red");
            if (currentHighlightedWrapper === targetWrapper) currentHighlightedWrapper = null;
        }, 5000);

        // Hủy hào quang sớm khi người dùng tương tác với ô
        const onInteract = () => {
            if (targetWrapper) targetWrapper.classList.remove("field-aura-highlight-red");
            if (currentHighlightedWrapper === targetWrapper) currentHighlightedWrapper = null;
            input.removeEventListener("input", onInteract);
            input.removeEventListener("change", onInteract);
            input.removeEventListener("blur", onInteract);
        };
        input.addEventListener("input", onInteract, { once: true });
        input.addEventListener("change", onInteract, { once: true });
        input.addEventListener("blur", onInteract, { once: true });

        // Focus vào input trừ khi bị tắt (ví dụ khi mở chuột phải context menu)
        if (!options.noFocus) {
            setTimeout(() => {
                try {
                    input.focus();
                    if (typeof input.select === "function" && input.type !== "date") {
                        input.select();
                    }
                } catch(e) {}
            }, 200);
        }

        return input;
    }

    function jumpToField(fieldKey) {
        return highlightFieldWithRedAura(fieldKey, { showErrorToast: true });
    }

    window.highlightFieldWithRedAura = highlightFieldWithRedAura;

    // =============================================================
    // PREVIEW VARIABLE HIGHLIGHTING (WHEN SELECTING LEFT FORM FIELD)
    // =============================================================
    function getMatchingPreviewElements(fieldKey) {
        if (!documentPreviewContent || !fieldKey) return [];
        const cleanKey = fieldKey.trim();
        let selector = `[data-var-key="${cleanKey}"]`;
        if (cleanKey.endsWith("_FULL")) {
            const base = cleanKey.replace(/_FULL$/, "");
            selector += `, [data-var-key="${base}"]`;
        } else if (cleanKey.startsWith("TEN_KEM_SO_NGAY_")) {
            const sfx = cleanKey.replace("TEN_KEM_SO_NGAY_", "");
            selector += `, [data-var-key="SO_${sfx}"], [data-var-key="NGAY_${sfx}"]`;
        }
        return Array.from(documentPreviewContent.querySelectorAll(selector));
    }

    function clearPreviewVariablesHighlight() {
        if (!documentPreviewContent) return;
        const highlighted = documentPreviewContent.querySelectorAll(".preview-var-highlight-active");
        highlighted.forEach(el => {
            el.classList.remove("preview-var-highlight-active");
            el.removeAttribute("data-highlighted-by-field");
        });
    }

    function highlightPreviewVariables(fieldKey, options = {}) {
        clearPreviewVariablesHighlight();
        if (!fieldKey || !documentPreviewContent) return;

        const matches = getMatchingPreviewElements(fieldKey);
        if (!matches || matches.length === 0) return;

        matches.forEach(el => {
            el.classList.add("preview-var-highlight-active");
            el.setAttribute("data-highlighted-by-field", fieldKey);
        });

        if (!options.noScroll && matches.length > 0) {
            const firstEl = matches[0];
            const scrollContainer = documentPreviewContent.parentElement;
            if (scrollContainer) {
                const cRect = scrollContainer.getBoundingClientRect();
                const elRect = firstEl.getBoundingClientRect();
                if (elRect.top < cRect.top + 30 || elRect.bottom > cRect.bottom - 30) {
                    firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        }
    }

    function reapplyActiveFieldPreviewHighlight() {
        const active = document.activeElement;
        if (active && active.hasAttribute && active.hasAttribute("data-field")) {
            const fieldKey = active.getAttribute("data-field");
            highlightPreviewVariables(fieldKey, { noScroll: true });
        }
    }

    // Lắng nghe focus vào ô điền biến bên trái -> Highlight trên Preview
    document.addEventListener("focusin", (e) => {
        const input = e.target.closest && e.target.closest("[data-field]");
        if (input) {
            const fieldKey = input.getAttribute("data-field");
            highlightPreviewVariables(fieldKey);
        }
    });

    // Lắng nghe click trực tiếp vào ô điền biến bên trái
    document.addEventListener("click", (e) => {
        const input = e.target.closest && e.target.closest("[data-field]");
        if (input) {
            const fieldKey = input.getAttribute("data-field");
            highlightPreviewVariables(fieldKey);
        }
    });

    // Lắng nghe rời khỏi ô điền biến bên trái -> Tắt Highlight trên Preview
    document.addEventListener("focusout", (e) => {
        const input = e.target.closest && e.target.closest("[data-field]");
        if (input) {
            setTimeout(() => {
                const curActive = document.activeElement;
                if (!curActive || !curActive.closest || !curActive.closest("[data-field]")) {
                    clearPreviewVariablesHighlight();
                }
            }, 60);
        }
    });


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
            if (sec.id === "secCustomVariables" || sec.id === "accordionSecTableVars") return;

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
        syncFormLabelsFromDictionary();
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
            opt.className = "bg-white text-slate-900 font-medium py-1";
            opt.style.color = "#0f172a";
            opt.style.backgroundColor = "#ffffff";
            if (pt.id === appState.selectedProcurementTypeId) {
                opt.selected = true;
            }
            procurementTypeSelect.appendChild(opt);
        });

        // Tab 2 làm chìm ô Quy trình (không cho chọn hoặc hiệu chỉnh)
        procurementTypeSelect.disabled = true;

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

    function selectDocumentById(docId) {
        const docs = getAllDocsForCurrentType();
        const target = docs.find(d => d.id === docId);
        if (!target) return;
        appState.activeDocId = target.id;
        if (window.history && window.history.replaceState && appState.activeMainTab === "docs") {
            window.history.replaceState({
                tab: "docs",
                activeDocId: target.id,
                pkgIdx: appState.activePackageIndex
            }, "", "#docs");
        }
        saveState();
        renderDocTabs();
        renderDocumentPreview();
        applyVariableFilter();
    }

    function renderDocTabs() {
        const docs = getAllDocsForCurrentType();

        if (!docs.some(d => d.id === appState.activeDocId)) {
            if (docs.length > 0) appState.activeDocId = docs[0].id;
        }

        const activeIdx = docs.findIndex(d => d.id === appState.activeDocId);
        const curNum = activeIdx >= 0 ? activeIdx + 1 : 1;
        const totalDocs = docs.length;

        // 1. Update Dropdown Combobox (for quick jump across 20+ docs)
        const docQuickSelector = document.getElementById("docQuickSelector");
        if (docQuickSelector) {
            docQuickSelector.innerHTML = "";
            docs.forEach((d, idx) => {
                const opt = document.createElement("option");
                opt.value = d.id;
                const numStr = String(idx + 1).padStart(2, '0');
                const totalStr = String(totalDocs).padStart(2, '0');
                opt.textContent = `${numStr}/${totalStr}. [${d.code}] ${d.name}`;
                if (d.id === appState.activeDocId) opt.selected = true;
                docQuickSelector.appendChild(opt);
            });
        }

        // 2. Update Counter Badge & Stepper Buttons
        const docCounterBadge = document.getElementById("docCounterBadge");
        if (docCounterBadge) {
            docCounterBadge.textContent = `${String(curNum).padStart(2, '0')} / ${String(totalDocs).padStart(2, '0')}`;
        }
        const btnPrevDoc = document.getElementById("btnPrevDoc");
        const btnNextDoc = document.getElementById("btnNextDoc");
        if (btnPrevDoc) btnPrevDoc.disabled = activeIdx <= 0;
        if (btnNextDoc) btnNextDoc.disabled = activeIdx >= totalDocs - 1;

        // 3. Update Modal Button Text
        const btnOpenAllDocsModalText = document.getElementById("btnOpenAllDocsModalText");
        if (btnOpenAllDocsModalText) {
            btnOpenAllDocsModalText.textContent = `Tất cả (${totalDocs})`;
        }

        // 4. Render Horizontal Tab Strip
        if (docTypeTabs) {
            docTypeTabs.innerHTML = "";
            docs.forEach((doc, idx) => {
                const btn = document.createElement("button");
                const isActive = doc.id === appState.activeDocId;
                btn.type = "button";
                btn.setAttribute("data-doc-id", doc.id);
                btn.className = `tab-btn px-2 py-0.5 text-[10.5px] rounded transition-all whitespace-nowrap flex items-center gap-1 ${isActive ? 'active shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'}`;
                btn.title = `${idx + 1}/${totalDocs}: ${doc.name} (${doc.desc || ''})`;
                btn.innerHTML = `<span class="opacity-60 font-mono text-[9px]">${idx + 1}.</span><span class="font-bold">${doc.code}</span>`;

                btn.addEventListener("click", () => {
                    selectDocumentById(doc.id);
                });

                docTypeTabs.appendChild(btn);

                if (isActive) {
                    setTimeout(() => {
                        try {
                            btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        } catch (e) {}
                    }, 50);
                }
            });
        }
    }

    // -------------------------------------------------------------
    // Render Custom Variables from Template Studio
    // -------------------------------------------------------------
    function renderCustomVariablesUI() {
        // Section 10 (Biến bổ sung từ Template Studio) has been removed.
        // Migrate any legacy custom variables directly into MASTER_VARIABLES_CATALOG
        try {
            const customVarsJson = localStorage.getItem("ho_so_custom_variables");
            if (customVarsJson) {
                const customVars = JSON.parse(customVarsJson);
                if (Array.isArray(customVars)) {
                    let hasNew = false;
                    customVars.forEach(v => {
                        if (v && v.key) {
                            const cleanTag = v.key.replace(/^[{]+|[}]+$/g, "").toUpperCase();
                            const exists = MASTER_VARIABLES_CATALOG.find(m => m.tag.toUpperCase() === cleanTag);
                            if (!exists) {
                                MASTER_VARIABLES_CATALOG.push({
                                    stt: MASTER_VARIABLES_CATALOG.length + 1,
                                    groupKey: "J",
                                    group: "J. Tùy biến bổ sung",
                                    label: v.label || cleanTag,
                                    tag: cleanTag,
                                    isGeneral: v.targetSheet === "Thông tin chung",
                                    example: v.value || "",
                                    isCustom: true
                                });
                                hasNew = true;
                            }
                        }
                    });
                    if (hasNew && typeof saveCatalogCustomizations === "function") {
                        saveCatalogCustomizations();
                    }
                }
                localStorage.removeItem("ho_so_custom_variables");
            }
        } catch (e) {
            localStorage.removeItem("ho_so_custom_variables");
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
        syncFormLabelsFromDictionary();
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        const inputs = document.querySelectorAll("[data-field]");
        const mergedData = getMergedData();

        inputs.forEach(input => {
            const field = input.getAttribute("data-field");
            if (mergedData[field] !== undefined) {
                input.value = mergedData[field] || "";
            } else if (generalFieldsList.includes(field)) {
                input.value = appState.generalInfo[field] || "";
            } else {
                input.value = currentPkg.fields[field] || "";
            }
        });

        updateProgress();
        if (typeof renderTableEditor === "function") {
            renderTableEditor();
        }
        renderDocumentPreview();
        applyVariableFilter();
        if (typeof window.refreshExpandableTextareas === "function") {
            window.refreshExpandableTextareas();
        }
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
            // Xóa triệt để biến chung khỏi tất cả các gói thầu để không bị che khuất (shadowing)
            (appState.packages || []).forEach(p => {
                if (p.fields && p.fields[field] !== undefined) delete p.fields[field];
            });
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

        // Nếu người dùng sửa ô Ngày tháng Full (_FULL), tự động parse về ngắn (dd/mm/yyyy) để lưu & sync
        if (field.endsWith("_FULL")) {
            const baseField = field.replace(/_FULL$/, "");
            const parsedShort = parseDateToDDMMYYYY(val);
            if (parsedShort) {
                const currentPkg = appState.packages[appState.activePackageIndex];
                if (currentPkg && currentPkg.fields) currentPkg.fields[baseField] = parsedShort;
                syncDocFieldChangeToTimeline(baseField, parsedShort);
            }
        } else if (field.startsWith("TEN_KEM_SO_NGAY_")) {
            // Nếu người dùng sửa trích dẫn Tên văn bản kèm số & ngày
            const m = val.match(/^(?:Tờ trình|Quyết định|Giấy mời|Biên bản|Hợp đồng).*?\s+([^\s]+)\s+ngày\s+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
            if (m) {
                const extractedNo = m[1];
                const extractedDate = m[2];
                let noKey = "", dateKey = "";
                if (field.includes("TO_TRINH")) { noKey = "SO_TO_TRINH"; dateKey = "NGAY_TO_TRINH"; }
                else if (field.includes("QUYET_DINH")) { noKey = "SO_QUYET_DINH"; dateKey = "NGAY_QUYET_DINH"; }
                else if (field.includes("GIAY_MOI")) { noKey = "SO_GIAY_MOI"; dateKey = "NGAY_GIAY_MOI"; }
                else if (field.includes("BIEN_BAN")) { noKey = "SO_BIEN_BAN_HOAN_THIEN"; dateKey = "NGAY_BIEN_BAN"; }
                else if (field.includes("HOP_DONG")) { noKey = "SO_HOP_DONG"; dateKey = "NGAY_HOP_DONG"; }

                const currentPkg = appState.packages[appState.activePackageIndex];
                if (noKey && currentPkg && currentPkg.fields) {
                    currentPkg.fields[noKey] = extractedNo;
                    syncDocFieldChangeToTimeline(noKey, extractedNo);
                }
                if (dateKey && currentPkg && currentPkg.fields) {
                    const normD = parseDateToDDMMYYYY(extractedDate);
                    currentPkg.fields[dateKey] = normD;
                    syncDocFieldChangeToTimeline(dateKey, normD);
                }
            }
        }

        // Đồng bộ ngược lại task ở Tab Tiến độ nếu người dùng đổi số/ngày tại form
        syncDocFieldChangeToTimeline(field, val);

        // Tự động cập nhật các ô phái sinh khác trong Section 8
        const mergedNow = getMergedData();
        ["TO_TRINH", "QUYET_DINH", "GIAY_MOI", "BIEN_BAN", "HOP_DONG"].forEach(sfx => {
            const fullInp = document.querySelector(`input[data-field="NGAY_${sfx}_FULL"]`);
            if (fullInp && field !== `NGAY_${sfx}_FULL` && document.activeElement !== fullInp) {
                fullInp.value = mergedNow[`NGAY_${sfx}_FULL`] || "";
            }
            const nameInp = document.querySelector(`input[data-field="TEN_KEM_SO_NGAY_${sfx}"]`);
            if (nameInp && field !== `TEN_KEM_SO_NGAY_${sfx}` && document.activeElement !== nameInp) {
                nameInp.value = mergedNow[`TEN_KEM_SO_NGAY_${sfx}`] || "";
            }
            const shortInp = document.querySelector(`input[data-field="NGAY_${sfx}"]`);
            if (shortInp && field !== `NGAY_${sfx}` && document.activeElement !== shortInp) {
                shortInp.value = mergedNow[`NGAY_${sfx}`] || "";
            }
            const noKey = sfx === "BIEN_BAN" ? "SO_BIEN_BAN_HOAN_THIEN" : `SO_${sfx}`;
            const noInp = document.querySelector(`input[data-field="${noKey}"]`);
            if (noInp && field !== noKey && document.activeElement !== noInp) {
                noInp.value = mergedNow[noKey] || "";
            }
        });

        saveState();
        updateProgress();
        if (typeof renderTableEditor === "function") {
            renderTableEditor();
        }
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
            if (sec.id === "accordionSecTableVars") return;
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
    
    // =============================================================
    // Giai đoạn 3: Biến xạ dạng bảng (Table Variables) & Lặp dòng Word OpenXML
    // =============================================================
    const defaultGoodsItems = [
        { stt: 1, ten_hang: "Máy bơm chữa cháy Diesel cao áp 50HP", dvt: "Bộ", so_luong: 2, don_gia: 45000000, thanh_tien: 90000000, ghi_chu: "Mới 100%, CO/CQ" },
        { stt: 2, ten_hang: "Tủ điều khiển hệ thống bơm tự động đa tầng", dvt: "Bộ", so_luong: 1, don_gia: 10000000, thanh_tien: 10000000, ghi_chu: "Tiêu chuẩn PCCC" }
    ];

    function formatCurrencyVND(num) {
        if (num === null || num === undefined || num === "") return "0";
        const n = Number(String(num).replace(/[^\d.-]/g, ""));
        if (isNaN(n)) return "0";
        return n.toLocaleString("vi-VN");
    }

    function readVietnameseCurrency(num) {
        if (num === null || num === undefined || num === 0 || num === "0") return "Không đồng";
        num = Math.round(Number(String(num).replace(/[^\d.-]/g, "")));
        if (isNaN(num) || num === 0) return "Không đồng";
        if (num < 0) return "Âm " + readVietnameseCurrency(-num);

        const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

        function readThreeDigits(n, showZeroHundred) {
            let h = Math.floor(n / 100);
            let t = Math.floor((n % 100) / 10);
            let u = n % 10;
            let res = "";

            if (h > 0 || showZeroHundred) {
                res += digits[h] + " trăm ";
            }

            if (t > 1) {
                res += digits[t] + " mươi ";
                if (u === 1) res += "mốt ";
                else if (u === 5) res += "lăm ";
                else if (u > 0) res += digits[u] + " ";
            } else if (t === 1) {
                res += "mười ";
                if (u === 5) res += "lăm ";
                else if (u > 0) res += digits[u] + " ";
            } else {
                if (h > 0 || showZeroHundred) {
                    if (u > 0) res += "lẻ " + digits[u] + " ";
                } else {
                    if (u > 0) res += digits[u] + " ";
                }
            }
            return res.trim();
        }

        const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
        let groups = [];
        let temp = num;
        while (temp > 0) {
            groups.push(temp % 1000);
            temp = Math.floor(temp / 1000);
        }

        let result = "";
        for (let i = groups.length - 1; i >= 0; i--) {
            const g = groups[i];
            if (g > 0) {
                const showZeroHundred = (i < groups.length - 1);
                const str = readThreeDigits(g, showZeroHundred);
                result += str + " " + units[i] + " ";
            }
        }

        result = result.trim() + " đồng";
        if (num % 1000 === 0) {
            result += " chẵn";
        }
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    // =============================================================
    // ĐA DẠNG HÓA BIẾN XẠ DẠNG BẢNG ({BANG_...}) & QUẢN LÝ TẬP TRUNG
    // =============================================================

    const DEFAULT_TABLE_DEFINITIONS = [
        {
            tag: "BANG_HANG_HOA",
            name: "Danh mục hàng hóa / Thiết bị / Dịch vụ",
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
            ]
        },
        {
            tag: "BANG_NHAN_SU",
            name: "Danh sách nhân sự / Tổ chuyên gia / Tổ thẩm định",
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
            ]
        },
        {
            tag: "BANG_TIEN_DO",
            name: "Kế hoạch tiến độ & Giải ngân thanh toán",
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
            ]
        }
    ];

    let currentActiveDictTableTag = "BANG_HANG_HOA";

    function getAllTableDefinitions() {
        let custom = [];
        try {
            const raw = localStorage.getItem("ho_so_custom_table_defs");
            if (raw) custom = JSON.parse(raw);
        } catch (e) {
            console.error("Error loading ho_so_custom_table_defs:", e);
        }
        return [...DEFAULT_TABLE_DEFINITIONS, ...(Array.isArray(custom) ? custom : [])];
    }

    function saveCustomTableDefinitions(customList) {
        try {
            localStorage.setItem("ho_so_custom_table_defs", JSON.stringify(customList));
        } catch (e) {
            console.error("Error saving ho_so_custom_table_defs:", e);
        }
    }

    function getTableDefinitionByTag(tag) {
        if (!tag) return null;
        const cleanTag = tag.replace(/[{}\s]/g, "");
        const all = getAllTableDefinitions();
        return all.find(t => t.tag === cleanTag) || null;
    }

    function getTableRowsForPackage(pkgIdx, tag) {
        const pkgs = appState.packages || [];
        const targetPkg = pkgs[pkgIdx] || pkgs[appState.activePackageIndex];
        if (!targetPkg) return [];
        if (!targetPkg.tableData) targetPkg.tableData = {};

        const tableDef = getTableDefinitionByTag(tag);
        if (!Array.isArray(targetPkg.tableData[tag])) {
            const seed = (tableDef && tableDef.defaultRows) ? JSON.parse(JSON.stringify(tableDef.defaultRows)) : [];
            targetPkg.tableData[tag] = seed;
        }
        return targetPkg.tableData[tag];
    }

    function getActiveTableRows(tag) {
        const targetTag = tag || currentActiveDictTableTag || "BANG_HANG_HOA";
        return getTableRowsForPackage(appState.activePackageIndex, targetTag);
    }

    // Backward-compatible alias for existing BANG_HANG_HOA consumers
    function getTableDataForActivePackage() {
        return getTableRowsForPackage(appState.activePackageIndex, "BANG_HANG_HOA");
    }

    // Generalized Word OpenXML (<w:tbl>) Table Builder for ANY table definition
    function buildGenericDocxTableXml(tableDef, items) {
        if (!tableDef) return "";
        if (!items || !Array.isArray(items)) items = [];

        const columns = tableDef.columns || [];
        let rowsXml = "";

        // 1. Header Row
        let headerCellsXml = "";
        let gridColsXml = "";
        columns.forEach(col => {
            const w = col.widthDx || 1500;
            gridColsXml += `<w:gridCol w:w="${w}"/>`;
            const jcVal = col.align === "right" ? "right" : (col.align === "center" ? "center" : "left");
            headerCellsXml += `
            <w:tc>
                <w:tcPr><w:tcW w:w="${w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr>
                <w:p><w:pPr><w:jc w:val="${jcVal}"/><w:spacing w:before="60" w:after="60"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>${escapeXml(col.label)}</w:t></w:r></w:p>
            </w:tc>`;
        });

        rowsXml += `
        <w:tr>
            <w:trPr>
                <w:tblHeader/>
                <w:cantSplit/>
            </w:trPr>
            ${headerCellsXml}
        </w:tr>`;

        // 2. Data Rows
        let totalVal = 0;
        items.forEach((item, rIdx) => {
            let rowCellsXml = "";
            columns.forEach(col => {
                const w = col.widthDx || 1500;
                const jcVal = col.align === "right" ? "right" : (col.align === "center" ? "center" : "left");
                let cellVal = "";

                if (col.key === "stt") {
                    cellVal = String(item.stt || (rIdx + 1));
                } else if (col.type === "currency") {
                    const num = Number(item[col.key]) || 0;
                    cellVal = formatCurrencyVND(num);
                    if (tableDef.totalCol === col.key) totalVal += num;
                } else if (col.type === "calc_amount") {
                    const q = Number(item.so_luong) || 0;
                    const p = Number(item.don_gia) || 0;
                    const amount = item.thanh_tien !== undefined ? Number(item.thanh_tien) : (q * p);
                    cellVal = formatCurrencyVND(amount);
                    if (tableDef.totalCol === col.key) totalVal += amount;
                } else {
                    cellVal = escapeXml(String(item[col.key] !== undefined && item[col.key] !== null ? item[col.key] : ""));
                }

                const isBold = (col.type === "calc_amount" || col.key === "thanh_tien");
                rowCellsXml += `
                <w:tc>
                    <w:tcPr><w:tcW w:w="${w}" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr>
                    <w:p><w:pPr><w:jc w:val="${jcVal}"/><w:spacing w:before="40" w:after="40"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>${isBold ? '<w:b/>' : ''}<w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>${cellVal}</w:t></w:r></w:p>
                </w:tc>`;
            });

            rowsXml += `
            <w:tr>
                <w:trPr><w:cantSplit/></w:trPr>
                ${rowCellsXml}
            </w:tr>`;
        });

        // 3. Total Row (if hasTotal)
        if (tableDef.hasTotal) {
            let totalColIdx = columns.findIndex(c => c.key === tableDef.totalCol);
            if (totalColIdx === -1) totalColIdx = columns.length - 1;
            const spanCols = Math.max(1, totalColIdx);
            let spanDx = 0;
            for (let i = 0; i < spanCols; i++) {
                spanDx += (columns[i].widthDx || 1500);
            }
            const totalColDx = columns[totalColIdx].widthDx || 1500;
            const remainingCols = columns.length - totalColIdx - 1;
            let remainingDx = 0;
            for (let i = totalColIdx + 1; i < columns.length; i++) {
                remainingDx += (columns[i].widthDx || 1000);
            }

            let remainTcXml = "";
            if (remainingCols > 0) {
                remainTcXml = `
                <w:tc>
                    <w:tcPr><w:tcW w:w="${remainingDx}" w:type="dxa"/>${remainingCols > 1 ? `<w:gridSpan w:val="${remainingCols}"/>` : ''}<w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/><w:vAlign w:val="center"/></w:tcPr>
                    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="50" w:after="50"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>VNĐ</w:t></w:r></w:p>
                </w:tc>`;
            }

            rowsXml += `
            <w:tr>
                <w:trPr><w:cantSplit/></w:trPr>
                <w:tc>
                    <w:tcPr><w:tcW w:w="${spanDx}" w:type="dxa"/><w:gridSpan w:val="${spanCols}"/><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/><w:vAlign w:val="center"/></w:tcPr>
                    <w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="50" w:after="50"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>TỔNG CỘNG:</w:t></w:r></w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr><w:tcW w:w="${totalColDx}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/><w:vAlign w:val="center"/></w:tcPr>
                    <w:p><w:pPr><w:jc w:val="right"/><w:spacing w:before="50" w:after="50"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:color w:val="047857"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>${formatCurrencyVND(totalVal)}</w:t></w:r></w:p>
                </w:tc>
                ${remainTcXml}
            </w:tr>`;

            // 4. In Words Row
            if (tableDef.currencyWord) {
                let allDx = 0;
                columns.forEach(c => { allDx += (c.widthDx || 1500); });
                const totalWords = readVietnameseCurrency(totalVal);
                rowsXml += `
                <w:tr>
                    <w:trPr><w:cantSplit/></w:trPr>
                    <w:tc>
                        <w:tcPr><w:tcW w:w="${allDx}" w:type="dxa"/><w:gridSpan w:val="${columns.length}"/><w:vAlign w:val="center"/></w:tcPr>
                        <w:p><w:pPr><w:jc w:val="left"/><w:spacing w:before="60" w:after="60"/></w:pPr>
                            <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>Số tiền bằng chữ: </w:t></w:r>
                            <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:i/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>${escapeXml(totalWords)}.</w:t></w:r>
                        </w:p>
                    </w:tc>
                </w:tr>`;
            }
        }

        return `
        <w:tbl>
            <w:tblPr>
                <w:tblW w:w="5000" w:type="pct"/>
                <w:jc w:val="center"/>
                <w:tblBorders>
                    <w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                    <w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                    <w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                    <w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                    <w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                </w:tblBorders>
                <w:tblCellMar>
                    <w:top w:w="120" w:type="dxa"/>
                    <w:left w:w="140" w:type="dxa"/>
                    <w:bottom w:w="120" w:type="dxa"/>
                    <w:right w:w="140" w:type="dxa"/>
                </w:tblCellMar>
            </w:tblPr>
            <w:tblGrid>
                ${gridColsXml}
            </w:tblGrid>
            ${rowsXml}
        </w:tbl>`;
    }

    // Backward-compatible alias for buildDocxTableXml
    function buildDocxTableXml(items, totalAmount, totalAmountWords) {
        const def = getTableDefinitionByTag("BANG_HANG_HOA");
        return buildGenericDocxTableXml(def, items);
    }

    // Generalized HTML Administrative Table Renderer for Live Document Preview
    function renderGenericTableHtml(tableDef, items) {
        if (!tableDef) return "";
        if (!items || !Array.isArray(items)) items = [];

        const columns = tableDef.columns || [];
        let headerThs = columns.map(c => {
            const alignClass = c.align === "right" ? "text-right" : (c.align === "center" ? "text-center" : "text-left");
            return `<th class="py-1.5 px-2 font-bold text-slate-800 ${alignClass}" style="width: ${c.widthPct || 'auto'}">${escapeXml(c.label)}</th>`;
        }).join("");

        let rowsHtml = "";
        let totalVal = 0;
        items.forEach((item, rIdx) => {
            const tds = columns.map(c => {
                const alignClass = c.align === "right" ? "text-right" : (c.align === "center" ? "text-center" : "text-left");
                let valStr = "";
                if (c.key === "stt") {
                    valStr = String(item.stt || (rIdx + 1));
                } else if (c.type === "currency") {
                    const num = Number(item[c.key]) || 0;
                    valStr = formatCurrencyVND(num);
                    if (tableDef.totalCol === c.key) totalVal += num;
                } else if (c.type === "calc_amount") {
                    const q = Number(item.so_luong) || 0;
                    const p = Number(item.don_gia) || 0;
                    const amount = item.thanh_tien !== undefined ? Number(item.thanh_tien) : (q * p);
                    valStr = formatCurrencyVND(amount);
                    if (tableDef.totalCol === c.key) totalVal += amount;
                } else {
                    valStr = escapeXml(String(item[c.key] !== undefined && item[c.key] !== null ? item[c.key] : ""));
                }
                const isBold = (c.type === "calc_amount" || c.key === "thanh_tien");
                return `<td class="py-1.5 px-2 ${alignClass} ${isBold ? 'font-bold text-emerald-800' : ''}">${valStr}</td>`;
            }).join("");

            rowsHtml += `<tr class="border-b border-slate-200 hover:bg-slate-50/50">${tds}</tr>`;
        });

        let totalRowHtml = "";
        if (tableDef.hasTotal) {
            let totalColIdx = columns.findIndex(c => c.key === tableDef.totalCol);
            if (totalColIdx === -1) totalColIdx = columns.length - 1;
            const spanCols = Math.max(1, totalColIdx);
            const remainingCols = columns.length - totalColIdx - 1;

            totalRowHtml = `
            <tr class="font-bold bg-slate-50 border-b border-slate-300">
                <td colspan="${spanCols}" class="py-1.5 px-2 text-center uppercase tracking-wider text-slate-800">TỔNG CỘNG:</td>
                <td class="py-1.5 px-2 text-right text-emerald-800 font-extrabold">${formatCurrencyVND(totalVal)}</td>
                ${remainingCols > 0 ? `<td colspan="${remainingCols}" class="py-1.5 px-2 text-center text-slate-700">VNĐ</td>` : ''}
            </tr>`;

            if (tableDef.currencyWord) {
                const words = readVietnameseCurrency(totalVal);
                totalRowHtml += `
                <tr class="italic text-slate-700 bg-white">
                    <td colspan="${columns.length}" class="py-1.5 px-3">
                        <span class="font-bold not-italic text-slate-800">Số tiền bằng chữ:</span> ${words}.
                    </td>
                </tr>`;
            }
        }

        return `
        <div class="table-var-container my-3" data-var-key="${tableDef.tag}" title="Biến bảng: {${tableDef.tag}} (Tùy chỉnh trong Từ Điển Biến Xạ -> Tab Biến dạng bảng)">
            <table class="w-full text-left text-xs border border-slate-300 border-collapse table-var-table">
                <thead class="bg-slate-100 border-b-2 border-slate-300">
                    <tr>${headerThs}</tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                    ${rowsHtml}
                    ${totalRowHtml}
                </tbody>
            </table>
        </div>`;
    }

    // Backward-compatible alias
    function renderTableVariableHtml(data) {
        const def = getTableDefinitionByTag("BANG_HANG_HOA");
        const items = getTableRowsForPackage(appState.activePackageIndex, "BANG_HANG_HOA");
        return renderGenericTableHtml(def, items);
    }

        // Live Document Preview Render (Administrative Standard Format)
    // -------------------------------------------------------------
    function getMergedData() {
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        const pkgFieldsClean = { ...(currentPkg.fields || {}) };
        // Đảm bảo các biến chung (như TEN_DU_AN) không bao giờ bị ghi đè bởi gói thầu
        generalFieldsList.forEach(k => { delete pkgFieldsClean[k]; });
        const merged = {
            ...pkgFieldsClean,
            ...(appState.generalInfo || {})
        };
        // Tự động link ngày tháng & số văn bản từ Tab 1: Định hướng & Tiến độ
        syncTimelineDatesAndDocNosToData(merged);

        // Bổ sung dữ liệu cho TẤT CẢ các Biến xạ dạng bảng ({BANG_...})
        getAllTableDefinitions().forEach(tDef => {
            const tRows = getTableRowsForPackage(appState.activePackageIndex, tDef.tag);
            merged[tDef.tag] = tRows;
            if (tDef.tag === "BANG_HANG_HOA") {
                let tableSum = 0;
                tRows.forEach(it => {
                    const q = Number(it.so_luong) || 0;
                    const p = Number(it.don_gia) || 0;
                    tableSum += (it.thanh_tien !== undefined ? Number(it.thanh_tien) : (q * p));
                });
                merged["TONG_TIEN_BANG_SO"] = formatCurrencyVND(tableSum);
                merged["TONG_TIEN_BANG_CHU"] = readVietnameseCurrency(tableSum);
                merged["SO_LUONG_HANG_HOA"] = tRows.length;
            }
        });
        return merged;
    }

    function getMergedDataForPackage(pkgIdx) {
        const pkgs = appState.packages || [];
        const targetPkg = pkgs[pkgIdx] || { fields: {} };
        const pkgFieldsClean = { ...(targetPkg.fields || {}) };
        generalFieldsList.forEach(k => { delete pkgFieldsClean[k]; });
        const merged = {
            ...pkgFieldsClean,
            ...(appState.generalInfo || {})
        };
        const prevIdx = appState.activePackageIndex;
        appState.activePackageIndex = pkgIdx;
        syncTimelineDatesAndDocNosToData(merged);
        appState.activePackageIndex = prevIdx;

        // Bổ sung dữ liệu cho TẤT CẢ các Biến xạ dạng bảng ({BANG_...})
        getAllTableDefinitions().forEach(tDef => {
            const tRows = getTableRowsForPackage(pkgIdx, tDef.tag);
            merged[tDef.tag] = tRows;
            if (tDef.tag === "BANG_HANG_HOA") {
                let tableSum = 0;
                tRows.forEach(it => {
                    const q = Number(it.so_luong) || 0;
                    const p = Number(it.don_gia) || 0;
                    tableSum += (it.thanh_tien !== undefined ? Number(it.thanh_tien) : (q * p));
                });
                merged["TONG_TIEN_BANG_SO"] = formatCurrencyVND(tableSum);
                merged["TONG_TIEN_BANG_CHU"] = readVietnameseCurrency(tableSum);
                merged["SO_LUONG_HANG_HOA"] = tRows.length;
            }
        });
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

        // 3. Tự động sinh các biến Ngày tháng Full (ngày dd tháng mm năm yyyy) và Tên kèm Số & Ngày (VD: Tờ trình 11/ĐKNCC/TTr-KTHT ngày 10/02/2027)
        const docConfigs = [
            { sfx: "TO_TRINH", title: "Tờ trình", no: merged.SO_TO_TRINH, date: merged.NGAY_TO_TRINH },
            { sfx: "QUYET_DINH", title: "Quyết định", no: merged.SO_QUYET_DINH, date: merged.NGAY_QUYET_DINH },
            { sfx: "GIAY_MOI", title: "Giấy mời", no: merged.SO_GIAY_MOI || "GM-BQLDA", date: merged.NGAY_GIAY_MOI },
            { sfx: "BIEN_BAN", title: "Biên bản hoàn thiện hợp đồng", no: merged.SO_BIEN_BAN_HOAN_THIEN || merged.SO_BIEN_BAN, date: merged.NGAY_BIEN_BAN },
            { sfx: "HOP_DONG", title: "Hợp đồng kinh tế", no: merged.SO_HOP_DONG, date: merged.NGAY_HOP_DONG }
        ];

        docConfigs.forEach(cfg => {
            // Ngày tháng đầy đủ cho phần Header: "ngày dd tháng mm năm yyyy"
            merged[`NGAY_${cfg.sfx}_FULL`] = formatDateLongVN(cfg.date);

            // Tên văn bản kèm Số và Ngày (Ví dụ: "Tờ trình 11/ĐKNCC/TTr-KTHT ngày 10/02/2027")
            if (cfg.no && cfg.date) {
                merged[`TEN_KEM_SO_NGAY_${cfg.sfx}`] = `${cfg.title} ${cfg.no} ngày ${cfg.date}`;
            } else if (cfg.no) {
                merged[`TEN_KEM_SO_NGAY_${cfg.sfx}`] = `${cfg.title} ${cfg.no}`;
            } else if (cfg.date) {
                merged[`TEN_KEM_SO_NGAY_${cfg.sfx}`] = `${cfg.title} ngày ${cfg.date}`;
            } else {
                merged[`TEN_KEM_SO_NGAY_${cfg.sfx}`] = "";
            }
        });
    }

    function formatDateLongVN(dateVal) {
        if (!dateVal || String(dateVal).trim() === "") {
            return "ngày ..... tháng ..... năm 202...";
        }
        let str = String(dateVal).trim();
        let day = "", month = "", year = "";

        if (str.includes("/")) {
            const parts = str.split("/");
            if (parts.length === 3) {
                day = parts[0].trim();
                month = parts[1].trim();
                year = parts[2].trim();
            }
        } else if (str.includes("-")) {
            const parts = str.split("-");
            if (parts.length === 3) {
                year = parts[0].trim();
                month = parts[1].trim();
                day = parts[2].trim();
            }
        }

        if (day && month && year) {
            const d = parseInt(day, 10);
            const m = parseInt(month, 10);
            const y = parseInt(year, 10);
            if (!isNaN(d) && !isNaN(m) && !isNaN(y) && y > 1900) {
                const dStr = String(d).padStart(2, '0');
                const mStr = String(m).padStart(2, '0');
                return `ngày ${dStr} tháng ${mStr} năm ${y}`;
            }
        }

        if (str.toLowerCase().includes("tháng") || str.toLowerCase().includes("năm")) {
            return str.startsWith("ngày") ? str : `ngày ${str}`;
        }

        return `ngày ${str}`;
    }

    function valOrPlaceholderDateHeader(key, data) {
        const fullKey = key.endsWith("_FULL") ? key : key + "_FULL";
        const val = data[fullKey] || (data[key] ? formatDateLongVN(data[key]) : "");
        if (val && String(val).trim() !== "" && !val.includes(".....")) {
            const formatted = formatDateLongVN(val);
            return `<span class="filled-val" data-var-key="${key}" data-date-role="header" title="Ngày ban hành văn bản: {${key}} (Double-click để sửa trực tiếp)">${formatted}</span>`;
        }
        return `<span class="placeholder-tag" data-var-key="${key}" data-date-role="header" data-missing-key="${key}" title="Ngày ban hành văn bản: {${key}} (Double-click để nhập ngày)"><i class="fa-solid fa-calendar-days text-[9px] text-amber-700"></i> ngày ..... tháng ..... năm 202...</span>`;
    }

    function parseDateToDDMMYYYY(str) {
        if (!str) return "";
        str = String(str).trim();
        const regexLong = /ngày\s*(\d{1,2})\s*tháng\s*(\d{1,2})\s*năm\s*(\d{4})/i;
        const match = str.match(regexLong);
        if (match) {
            const d = match[1].padStart(2, '0');
            const m = match[2].padStart(2, '0');
            const y = match[3];
            return `${d}/${m}/${y}`;
        }
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(str)) {
            const parts = str.split("-");
            return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
        }
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
            const parts = str.split("/");
            return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
        }
        return str;
    }

    function valOrPlaceholder(key, data) {
        const tableDef = getTableDefinitionByTag(key);
        if (tableDef) {
            const tableRows = (data && Array.isArray(data[key]))
                ? data[key]
                : getTableRowsForPackage(appState.activePackageIndex, tableDef.tag);
            return renderGenericTableHtml(tableDef, tableRows);
        }
        const val = data[key];
        if (val && String(val).trim() !== "") {
            return `<span class="filled-val" data-var-key="${key}" title="Biến: {${key}} (Double-click để sửa trực tiếp, Quét khối/chuột phải để quản lý)">${val}</span>`;
        }
        return `<span class="placeholder-tag" data-var-key="${key}" data-missing-key="${key}" title="Biến: {${key}} (Double-click để gõ trực tiếp, Bấm để nhảy tới ô nhập liệu)"><i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${key}}</span>`;
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
                    <div class="rule-agency-header"></div>
                    <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_TO_TRINH", data) || "....../VB"}</div>
                </div>
                <div>
                    <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                    <div class="font-bold text-[11.5pt]">Độc lập – Tự do – Hạnh phúc</div>
                    <div class="rule-motto-header"></div>
                    <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_TO_TRINH", data)}</div>
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
                        <div class="rule-agency-header"></div>
                        <div class="mt-1 text-[10.5pt]">Số: GM-BQLDA</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt]">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="rule-motto-header"></div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_GIAY_MOI", data)}</div>
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
                    <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_BIEN_BAN", data)}</div>
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
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_QUYET_DINH", data)}</div>
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
                        <div class="rule-agency-header"></div>
                        <div class="mt-1 text-[10.5pt]">Số: ${valOrPlaceholder("SO_QUYET_DINH", data) || "....../QĐ"}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[11.5pt]">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="rule-motto-header"></div>
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_QUYET_DINH", data)}</div>
                    </div>
                </div>

                <div class="text-center my-5">
                    <h2 class="font-bold text-[14pt] uppercase tracking-wide">QUYẾT ĐỊNH</h2>
                    <p class="font-bold text-[12pt]">Về việc phê duyệt Kế hoạch lựa chọn nhà thầu</p>
                    <p class="font-bold text-[11.5pt] mt-1">Dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="text-center mb-4 font-bold text-[12.5pt] uppercase">
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
                        <div class="italic text-[11pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ${valOrPlaceholderDateHeader("NGAY_QUYET_DINH", data)}</div>
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
                    <p class="indent-8 text-xs font-semibold text-slate-800">
                        Danh mục hàng hóa, khối lượng và đơn giá chi tiết:
                    </p>
                    ${valOrPlaceholder("BANG_HANG_HOA", data)}
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

        // 0. Nếu có template tùy biến từ Template Studio (chuẩn hóa nguồn), áp dụng làm khung mẫu
        const savedStudioHtml = localStorage.getItem("ho_so_custom_template_html_" + docId);
        const savedStudioTime = localStorage.getItem("ho_so_custom_template_time_" + docId) || "v1";
        if (savedStudioHtml && savedStudioHtml.trim() !== "") {
            if (!appState._appliedStudioTimes) appState._appliedStudioTimes = {};
            if (appState._appliedStudioTimes[docId] !== savedStudioTime) {
                if (appState.customDocumentHtml) {
                    delete appState.customDocumentHtml[docId];
                }
                appState._appliedStudioTimes[docId] = savedStudioTime;
            }

            html = savedStudioHtml.replace(/\{([A-Z0-9_]+)\}/g, (match, tag) => {
                return valOrPlaceholder(tag, data);
            });
        }

        // Kiểm tra xem văn bản này đã có bản chỉnh sửa tùy biến trực tiếp hay chưa
        if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
        const btnResetPreviewDoc = document.getElementById("btnResetPreviewDoc");

        if (appState.customDocumentHtml[docId]) {
            // Tải lại bản tùy biến của người dùng và điền các giá trị biến mới nhất
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = appState.customDocumentHtml[docId];

            // AUTO-HEAL: Phục hồi các thẻ span của biến nếu vô tình bị trình duyệt xóa khi sửa trực tiếp
            // 1. Phục hồi biến TEN_DU_AN nếu thẻ span bị mất trong dòng "Dự án: ..." hoặc "thuộc dự án: ..."
            tempDiv.querySelectorAll("p, div, h2, b").forEach(el => {
                const text = el.textContent || "";
                if (!el.querySelector('[data-var-key="TEN_DU_AN"]') && !el.querySelector('p, div')) {
                    if (text.includes("Dự án:") || text.includes("Dự án :")) {
                        const projectVal = data["TEN_DU_AN"] || "";
                        el.innerHTML = el.innerHTML.replace(
                            /(Dự án\s*:\s*)([^<]*)/i,
                            `$1<span class="filled-val" data-var-key="TEN_DU_AN" title="Biến: {TEN_DU_AN}">${projectVal || '{TEN_DU_AN}'}</span>`
                        );
                    } else if (text.includes("cho dự án:") || text.includes("thuộc dự án:")) {
                        const projectVal = data["TEN_DU_AN"] || "";
                        el.innerHTML = el.innerHTML.replace(
                            /(cho dự án\s*:\s*<b>|thuộc dự án\s*:\s*<b>)([^<]*)/i,
                            `$1<span class="filled-val" data-var-key="TEN_DU_AN" title="Biến: {TEN_DU_AN}">${projectVal || '{TEN_DU_AN}'}</span>`
                        );
                    }
                }
            });

            // 2. Phục hồi biến TEN_GOI_THAU nếu bị mất span
            tempDiv.querySelectorAll("p, div, b").forEach(el => {
                const text = el.textContent || "";
                if (!el.querySelector('[data-var-key="TEN_GOI_THAU"]') && !el.querySelector('p, div')) {
                    if (text.includes("Tên gói thầu:") || text.includes("gói thầu:")) {
                        const pkgVal = data["TEN_GOI_THAU"] || "";
                        el.innerHTML = el.innerHTML.replace(
                            /(Tên gói thầu\s*:\s*<b>|gói thầu\s*:\s*<b>)([^<]*)/i,
                            `$1<span class="filled-val" data-var-key="TEN_GOI_THAU" title="Biến: {TEN_GOI_THAU}">${pkgVal || '{TEN_GOI_THAU}'}</span>`
                        );
                    }
                }
            });

            // 3. Phục hồi các biến khác nếu giá trị cũ tồn tại trong HTML nhưng mất span
            if (!appState._lastKnownValues) appState._lastKnownValues = {};
            for (const k in data) {
                const oldVal = appState._lastKnownValues[k];
                const curVal = data[k];
                if (oldVal && typeof oldVal === "string" && oldVal.trim().length >= 4 && oldVal !== curVal) {
                    if (tempDiv.querySelectorAll(`[data-var-key="${k}"]`).length === 0) {
                        if (tempDiv.innerHTML.includes(oldVal)) {
                            tempDiv.innerHTML = tempDiv.innerHTML.split(oldVal).join(`<span class="filled-val" data-var-key="${k}" title="Biến: {${k}}">${curVal}</span>`);
                        }
                    }
                }
            }

            tempDiv.querySelectorAll("[data-var-key]").forEach(el => {
                const k = el.getAttribute("data-var-key");
                const currentVal = data[k];

                let isHeaderDate = el.getAttribute("data-date-role") === "header";
                if (!isHeaderDate && k && k.startsWith("NGAY_")) {
                    if (el.closest('.grid-cols-2') || el.parentElement?.textContent.includes("Độc lập") || el.parentElement?.innerHTML.includes("DIA_DANH")) {
                        isHeaderDate = true;
                        el.setAttribute("data-date-role", "header");
                    }
                }

                if (isHeaderDate) {
                    // Xóa chữ ", ngày " hoặc "ngày " bị thừa ở text node trước span
                    if (el.previousSibling && el.previousSibling.nodeType === Node.TEXT_NODE) {
                        el.previousSibling.textContent = el.previousSibling.textContent
                            .replace(/,\s*ngày\s*$/i, ', ')
                            .replace(/\bngày\s*$/i, '');
                    }
                }

                if (currentVal && String(currentVal).trim() !== "") {
                    el.className = "filled-val";
                    el.textContent = isHeaderDate ? formatDateLongVN(currentVal) : currentVal;
                } else {
                    el.className = "placeholder-tag";
                    el.innerHTML = isHeaderDate
                        ? `<i class="fa-solid fa-calendar-days text-[9px] text-amber-700"></i> ngày ..... tháng ..... năm 202...`
                        : `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${k}}`;
                }
            });

            // Làm sạch triệt để mọi lỗi lặp "ngày ngày" trong tiêu đề
            tempDiv.querySelectorAll(".grid-cols-2").forEach(grid => {
                grid.innerHTML = grid.innerHTML.replace(/(,\s*)ngày\s+ngày\s+/gi, '$1ngày ');
            });

            // Lưu lại HTML đã được cập nhật giá trị biến và phục hồi span
            appState.customDocumentHtml[docId] = tempDiv.innerHTML;

            documentPreviewContent.innerHTML = tempDiv.innerHTML;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
        } else {
            documentPreviewContent.innerHTML = html;
            if (btnResetPreviewDoc) btnResetPreviewDoc.classList.add("hidden");
        }

        // Cập nhật lại giá trị đã biết mới nhất để phục vụ auto-heal cho các lần nhập sau
        appState._lastKnownValues = { ...data };

        // Áp dụng chế độ xem Bản in Word chuẩn nếu đang bật
        if (appState.previewPrintMode && documentPreviewContent) {
            documentPreviewContent.classList.add("preview-print-mode");
        } else if (documentPreviewContent) {
            documentPreviewContent.classList.remove("preview-print-mode");
        }
        if (typeof updatePrintModeButtonUI === "function") updatePrintModeButtonUI();

        // Duy trì highlight biến nếu người dùng đang focus vào ô nhập liệu bên trái
        if (typeof reapplyActiveFieldPreviewHighlight === "function") {
            reapplyActiveFieldPreviewHighlight();
        }

        // Cập nhật trạng thái file mẫu (Badge & Nút Studio)
        const docTemplateStatusBadge = document.getElementById("docTemplateStatusBadge");
        const btnOpenStudioFromPreview = document.getElementById("btnOpenStudioFromPreview");
        const hasTpl = hasDocTemplate(activeDoc);

        if (docTemplateStatusBadge) {
            docTemplateStatusBadge.classList.remove("hidden");
            if (hasTpl) {
                const isCustom = !!localStorage.getItem("ho_so_custom_template_" + activeDoc.id);
                docTemplateStatusBadge.className = "text-[10px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap " +
                    (isCustom ? "bg-amber-50 text-amber-900 border-amber-300" : "bg-emerald-50 text-emerald-800 border-emerald-300");
                docTemplateStatusBadge.innerHTML = isCustom 
                    ? `<i class="fa-solid fa-star text-amber-500 text-[9px]"></i> Mẫu tùy biến`
                    : `<i class="fa-solid fa-file-word text-blue-600 text-[9px]"></i> Đã có mẫu .docx`;
            } else {
                docTemplateStatusBadge.className = "text-[10px] font-semibold px-2 py-0.5 rounded border bg-amber-50 text-amber-900 border-amber-300 flex items-center gap-1 whitespace-nowrap";
                docTemplateStatusBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-600 text-[9px]"></i> Chưa có mẫu .docx`;
            }
        }
        if (btnOpenStudioFromPreview) {
            if (!hasTpl) {
                btnOpenStudioFromPreview.className = "text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-400 shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer whitespace-nowrap";
                btnOpenStudioFromPreview.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-amber-600 text-[10px]"></i> <span>Tạo mẫu Studio</span>`;
            } else {
                btnOpenStudioFromPreview.className = "text-[10px] bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 font-bold px-2 py-0.5 rounded border border-slate-300 shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer whitespace-nowrap";
                btnOpenStudioFromPreview.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-amber-500 text-[10px]"></i> <span>Sửa mẫu Studio</span>`;
            }
        }

        if (!hasTpl && documentPreviewContent) {
            const warningBanner = document.createElement("div");
            warningBanner.className = "mb-4 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg text-amber-900 text-xs flex items-center justify-between shadow-2xs print:hidden";
            warningBanner.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base shrink-0"></i>
                    <div>
                        <p class="font-bold">Văn bản này chưa có file mẫu .docx trong thư mục tương ứng.</p>
                        <p class="text-[11px] text-amber-700">Bạn có thể tự khởi tạo và thiết kế mẫu mới bằng cách bấm nút <b>"Tạo mẫu Studio"</b>.</p>
                    </div>
                </div>
                <button type="button" onclick="document.getElementById('btnOpenStudioFromPreview').click()" class="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[11px] shrink-0 cursor-pointer transition-all shadow-xs">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> Tạo mẫu ngay
                </button>
            `;
            documentPreviewContent.insertBefore(warningBanner, documentPreviewContent.firstChild);
        }
    }

    // -------------------------------------------------------------
        // Master Variables Catalog for 2-Sheet Excel & Lookup Dictionary
    // -------------------------------------------------------------
    const MASTER_VARIABLES_CATALOG = [
        // A. Chủ đầu tư
        { stt: 1, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Chủ đầu tư (*)", tag: "TEN_CHU_DAU_TU", isGeneral: true, example: "Cảng Hàng không Quốc tế Cần Thơ" },
        { stt: 2, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Chủ đầu tư (IN HOA)", tag: "TEN_CHU_DAU_TU_VIET_HOA", isGeneral: true, example: "CẢNG HÀNG KHÔNG QUỐC TẾ CẦN THƠ" },
        { stt: 3, groupKey: "A", group: "A. Chủ đầu tư", label: "Tên Ban QLDA / Phòng ban (*)", tag: "TEN_BAN_QUAN_LY_DU_AN", isGeneral: true, example: "PHÒNG KỸ THUẬT HẠ TẦNG" },
        { stt: 4, groupKey: "A", group: "A. Chủ đầu tư", label: "Cơ quan trình quyết định", tag: "CO_QUAN_TRINH", isGeneral: true, example: "Trưởng ban Điều hành dự án" },
        { stt: 5, groupKey: "A", group: "A. Chủ đầu tư", label: "Cấp quyết định đầu tư", tag: "CAP_QUYET_DINH_DAU_TU", isGeneral: true, example: "Tổng công ty Cảng hàng không Việt Nam (TCT)" },
        { stt: 6, groupKey: "A", group: "A. Chủ đầu tư", label: "Địa danh phát hành văn bản (*)", tag: "DIA_DANH", isGeneral: true, example: "Cần Thơ" },
        { stt: 7, groupKey: "A", group: "A. Chủ đầu tư", label: "Tỉnh / Thành phố", tag: "TINH_THANH_PHO", isGeneral: true, example: "TP. Cần Thơ" },
        { stt: 8, groupKey: "A", group: "A. Chủ đầu tư", label: "Địa chỉ trụ sở CĐT", tag: "DIA_CHI_TRU_SO", isGeneral: true, example: "179B Lê Hồng Phong, Trà An, Bình Thủy, TP. Cần Thơ" },
        { stt: 9, groupKey: "A", group: "A. Chủ đầu tư", label: "Người ký quyết định CĐT (*)", tag: "NGUOI_KY_CDT", isGeneral: true, example: "Nguyễn Văn A" },
        { stt: 10, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ người ký CĐT", tag: "CHUC_VU_NGUOI_KY", isGeneral: true, example: "Giám đốc" },
        { stt: 11, groupKey: "A", group: "A. Chủ đầu tư", label: "Trưởng ban Điều hành dự án", tag: "TRUONG_BAN_DHDA", isGeneral: true, example: "Trần Văn B" },
        { stt: 12, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ Trưởng ban ĐHDA", tag: "CHUC_VU_TRUONG_BAN", isGeneral: true, example: "Trưởng phòng Kỹ thuật hạ tầng" },
        { stt: 13, groupKey: "A", group: "A. Chủ đầu tư", label: "Kế toán trưởng", tag: "KE_TOAN_TRUONG", isGeneral: true, example: "Lê Thị C" },
        { stt: 14, groupKey: "A", group: "A. Chủ đầu tư", label: "Chức vụ Kế toán trưởng", tag: "CHUC_VU_KE_TOAN", isGeneral: true, example: "Kế toán trưởng" },

        // B. Dự án & Gói thầu
        { stt: 15, groupKey: "B", group: "B. Dự án & Gói", label: "Tên dự án (*)", tag: "TEN_DU_AN", isGeneral: true, example: "Sửa chữa góc cua đường khẩn nguy chữa cháy..." },
        { stt: 16, groupKey: "B", group: "B. Dự án & Gói", label: "Tên công trình", tag: "TEN_CONG_TRINH", isGeneral: true, example: "Sửa chữa góc cua đường khẩn nguy chữa cháy..." },
        { stt: 17, groupKey: "B", group: "B. Dự án & Gói", label: "Nguồn vốn", tag: "NGUON_VON", isGeneral: true, example: "Quỹ đầu tư phát triển TCT" },
        { stt: 18, groupKey: "B", group: "B. Dự án & Gói", label: "Tên gói thầu (*)", tag: "TEN_GOI_THAU", isGeneral: false, example: "Thi công XDCT sửa chữa góc cua đường khẩn nguy" },
        { stt: 19, groupKey: "B", group: "B. Dự án & Gói", label: "Hình thức LCNT", tag: "HINH_THUC_LCNT", isGeneral: false, example: "Chỉ định thầu rút gọn" },
        { stt: 20, groupKey: "B", group: "B. Dự án & Gói", label: "Loại hợp đồng", tag: "LOAI_HOP_DONG", isGeneral: false, example: "Trọn gói" },
        { stt: 21, groupKey: "B", group: "B. Dự án & Gói", label: "Thời gian thực hiện gói thầu", tag: "THOI_GIAN_THUC_HIEN", isGeneral: false, example: "30 ngày" },
        { stt: 22, groupKey: "B", group: "B. Dự án & Gói", label: "Thời gian tổ chức LCNT", tag: "THOI_GIAN_TO_CHUC", isGeneral: false, example: "Quý I/2027" },
        { stt: 22.1, groupKey: "B", group: "B. Dự án & Gói", label: "Bảng danh mục hàng hóa / Thiết bị (Bảng lặp OpenXML)", tag: "BANG_HANG_HOA", isGeneral: false, isTable: true, example: "[Bảng danh mục hàng hóa, số lượng, đơn giá, thành tiền]" },
        { stt: 22.2, groupKey: "C", group: "C. Tài chính", label: "Tổng tiền bảng hàng hóa (Số)", tag: "TONG_TIEN_BANG_SO", isGeneral: false, example: "100.000.000" },
        { stt: 22.3, groupKey: "C", group: "C. Tài chính", label: "Tổng tiền bảng hàng hóa (Chữ)", tag: "TONG_TIEN_BANG_CHU", isGeneral: false, example: "Một trăm triệu đồng chẵn" },

        // C. Tài chính
        { stt: 23, groupKey: "C", group: "C. Tài chính", label: "Giá gói thầu (số) (*)", tag: "GIA_GOI_THAU_SO", isGeneral: false, example: "850.000.000" },
        { stt: 24, groupKey: "C", group: "C. Tài chính", label: "Giá gói thầu (chữ) (*)", tag: "GIA_GOI_THAU_CHU", isGeneral: false, example: "Tám trăm năm mươi triệu đồng chẵn" },
        { stt: 25, groupKey: "C", group: "C. Tài chính", label: "Giá trị hợp đồng (số)", tag: "GIA_TRI_HOP_DONG_SO", isGeneral: false, example: "835.000.000" },
        { stt: 26, groupKey: "C", group: "C. Tài chính", label: "Giá trị hợp đồng (chữ)", tag: "GIA_TRI_HOP_DONG_CHU", isGeneral: false, example: "Tám trăm ba mươi lăm triệu đồng" },
        { stt: 27, groupKey: "C", group: "C. Tài chính", label: "Giá trị giảm giá", tag: "GIA_TRI_GIAM_GIA", isGeneral: false, example: "15.000.000" },
        { stt: 28, groupKey: "C", group: "C. Tài chính", label: "Chi phí tư vấn", tag: "CHI_PHI_TU_VAN", isGeneral: false, example: "8.000.000" },
        { stt: 29, groupKey: "C", group: "C. Tài chính", label: "Kho bạc Nhà nước / Nơi giao dịch", tag: "KHO_BAC_NHA_NUOC", isGeneral: true, example: "Kho bạc Nhà nước Cần Thơ" },

        // D. Nhà thầu
        { stt: 30, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (*)", tag: "TEN_NHA_THAU", isGeneral: false, example: "Công ty TNHH Xây dựng Giao thông Miền Tây" },
        { stt: 31, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (IN HOA)", tag: "TEN_NHA_THAU_VIET_HOA", isGeneral: false, example: "CÔNG TY TNHH XÂY DỰNG GIAO THÔNG MIỀN TÂY" },
        { stt: 32, groupKey: "D", group: "D. Nhà thầu", label: "Tên nhà thầu (viết tắt)", tag: "TEN_NHA_THAU_VIET_TAT", isGeneral: false, example: "MT-CONS" },
        { stt: 33, groupKey: "D", group: "D. Nhà thầu", label: "Người đại diện nhà thầu", tag: "DAI_DIEN_NHA_THAU", isGeneral: false, example: "Lê Hoàng E" },
        { stt: 34, groupKey: "D", group: "D. Nhà thầu", label: "Chức vụ đại diện nhà thầu", tag: "CHUC_VU_DAI_DIEN", isGeneral: false, example: "Tổng Giám đốc" },
        { stt: 35, groupKey: "D", group: "D. Nhà thầu", label: "Địa chỉ trụ sở nhà thầu", tag: "DIA_CHI_NHA_THAU", isGeneral: false, example: "Số 45 đường CMT8, Bình Thủy, Cần Thơ" },
        { stt: 36, groupKey: "D", group: "D. Nhà thầu", label: "Mã số thuế nhà thầu", tag: "MA_SO_THUE", isGeneral: false, example: "1807654321" },

        // E. Số hiệu VB
        { stt: 37, groupKey: "E", group: "E. Số hiệu VB", label: "Số tờ trình chỉ định thầu", tag: "SO_TO_TRINH", isGeneral: false, example: "11/ĐKNCC/TTr-KTHT" },
        { stt: 38, groupKey: "E", group: "E. Số hiệu VB", label: "Số quyết định chỉ định thầu", tag: "SO_QUYET_DINH", isGeneral: false, example: "968/QĐ-CHKQTCT" },
        { stt: 39, groupKey: "E", group: "E. Số hiệu VB", label: "Số giấy mời", tag: "SO_GIAY_MOI", isGeneral: false, example: "GM-BQLDA" },
        { stt: 40, groupKey: "E", group: "E. Số hiệu VB", label: "Số biên bản hoàn thiện", tag: "SO_BIEN_BAN_HOAN_THIEN", isGeneral: false, example: "04/BB-HT" },
        { stt: 41, groupKey: "E", group: "E. Số hiệu VB", label: "Số hợp đồng kinh tế", tag: "SO_HOP_DONG", isGeneral: false, example: "26076" },
        { stt: 42, groupKey: "E", group: "E. Số hiệu VB", label: "Số công văn tham gia", tag: "SO_CONG_VAN_THAM_GIA", isGeneral: false, example: "315/CV-HT" },
        { stt: 42.1, groupKey: "E", group: "E. Số hiệu VB", label: "Thời gian họp hoàn thiện HĐ", tag: "THOI_GIAN_HOP", isGeneral: false, example: "08 giờ 30 phút, ngày 15/07/2025" },
        { stt: 42.2, groupKey: "E", group: "E. Số hiệu VB", label: "Địa điểm họp hoàn thiện HĐ", tag: "DIA_DIEM_HOP", isGeneral: false, example: "Văn phòng Ban Quản lý dự án" },

        // F. Ngày tháng (ngắn)
        { stt: 43, groupKey: "F", group: "F. Ngày (dd/mm/yyyy)", label: "Ngày Tờ trình (dd/mm/yyyy)", tag: "NGAY_TO_TRINH", isGeneral: false, example: "10/02/2027" },
        { stt: 44, groupKey: "F", group: "F. Ngày (dd/mm/yyyy)", label: "Ngày Quyết định (dd/mm/yyyy)", tag: "NGAY_QUYET_DINH", isGeneral: false, example: "11/02/2027" },
        { stt: 45, groupKey: "F", group: "F. Ngày (dd/mm/yyyy)", label: "Ngày Giấy mời (dd/mm/yyyy)", tag: "NGAY_GIAY_MOI", isGeneral: false, example: "11/02/2027" },
        { stt: 46, groupKey: "F", group: "F. Ngày (dd/mm/yyyy)", label: "Ngày Biên bản hoàn thiện (dd/mm/yyyy)", tag: "NGAY_BIEN_BAN", isGeneral: false, example: "14/02/2027" },
        { stt: 47, groupKey: "F", group: "F. Ngày (dd/mm/yyyy)", label: "Ngày Hợp đồng (dd/mm/yyyy)", tag: "NGAY_HOP_DONG", isGeneral: false, example: "15/02/2027" },

        // G. Ngày tháng (Full)
        { stt: 48, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Tờ trình (Đầy đủ)", tag: "NGAY_TO_TRINH_FULL", isGeneral: false, example: "ngày 10 tháng 02 năm 2027" },
        { stt: 49, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Quyết định (Đầy đủ)", tag: "NGAY_QUYET_DINH_FULL", isGeneral: false, example: "ngày 11 tháng 02 năm 2027" },
        { stt: 50, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Giấy mời (Đầy đủ)", tag: "NGAY_GIAY_MOI_FULL", isGeneral: false, example: "ngày 11 tháng 02 năm 2027" },
        { stt: 51, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Biên bản (Đầy đủ)", tag: "NGAY_BIEN_BAN_FULL", isGeneral: false, example: "ngày 14 tháng 02 năm 2027" },
        { stt: 52, groupKey: "G", group: "G. Ngày (Full)", label: "Ngày Hợp đồng (Đầy đủ)", tag: "NGAY_HOP_DONG_FULL", isGeneral: false, example: "ngày 15 tháng 02 năm 2027" },

        // H. Tên trích dẫn
        { stt: 53, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Tờ trình", tag: "TEN_KEM_SO_NGAY_TO_TRINH", isGeneral: false, example: "Tờ trình 11/ĐKNCC/TTr-KTHT ngày 10/02/2027" },
        { stt: 54, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Quyết định", tag: "TEN_KEM_SO_NGAY_QUYET_DINH", isGeneral: false, example: "Quyết định 968/QĐ-CHKQTCT ngày 11/02/2027" },
        { stt: 55, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Giấy mời", tag: "TEN_KEM_SO_NGAY_GIAY_MOI", isGeneral: false, example: "Giấy mời GM-BQLDA ngày 11/02/2027" },
        { stt: 56, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Biên bản", tag: "TEN_KEM_SO_NGAY_BIEN_BAN", isGeneral: false, example: "Biên bản hoàn thiện hợp đồng 04/BB-HT ngày 14/02/2027" },
        { stt: 57, groupKey: "H", group: "H. Tên trích dẫn", label: "Tên + Số + Ngày Hợp đồng", tag: "TEN_KEM_SO_NGAY_HOP_DONG", isGeneral: false, example: "Hợp đồng kinh tế 26076 ngày 15/02/2027" },

        // I. Căn cứ pháp lý
        { stt: 58, groupKey: "I", group: "I. Căn cứ pháp lý", label: "Căn cứ pháp lý chung (*)", tag: "CAN_CU_PHAP_LY_CHUNG", isGeneral: true, example: "Căn cứ Luật Đấu thầu số 22/2023/QH15..." }
    ];

    // -------------------------------------------------------------
    // Dynamic Form Label Synchronization with Dictionary
    // Ensures 100% label consistency between Form and Catalog
    // -------------------------------------------------------------
    function syncFormLabelsFromDictionary() {
        if (typeof MASTER_VARIABLES_CATALOG === "undefined" || !Array.isArray(MASTER_VARIABLES_CATALOG)) return;

        const catMap = {};
        MASTER_VARIABLES_CATALOG.forEach(item => {
            if (item.tag) catMap[item.tag.toUpperCase()] = item;
        });

        if (window.appState && window.appState.customVariables) {
            for (const k in window.appState.customVariables) {
                const cv = window.appState.customVariables[k];
                catMap[k.toUpperCase()] = {
                    tag: k,
                    label: cv.label || k,
                    isGeneral: false
                };
            }
        }

        const fieldInputs = document.querySelectorAll("[data-field]");
        fieldInputs.forEach(input => {
            const tag = input.getAttribute("data-field");
            if (!tag) return;
            const upperTag = tag.trim().toUpperCase();
            const catItem = catMap[upperTag];
            if (!catItem) return;

            const wrapper = input.closest(".field-item") || input.parentElement;
            if (!wrapper) return;
            const labelEl = wrapper.querySelector(".field-label") || wrapper.querySelector("label");
            if (!labelEl) return;

            let labelText = catItem.label || upperTag;
            const isRequired = labelText.includes("(*)") || labelEl.querySelector(".text-red-500") !== null;
            labelText = labelText.replace(/\s*\(\*\)\s*/g, "").trim();

            if (isRequired) {
                labelEl.innerHTML = `${escapeHtml(labelText)} <span class="text-red-500">*</span>`;
            } else {
                labelEl.textContent = labelText;
            }

            if (catItem.example) {
                input.setAttribute("placeholder", "VD: " + catItem.example);
            }

            labelEl.setAttribute("title", `Mã thẻ Word: {${upperTag}} để đồng bộ với Từ điển`);
            input.setAttribute("title", `Mã thẻ Word: {${upperTag}}`);
        });
    }


    // Export entire application state to 2-Sheet Excel file (Định hướng & Thông tin)
    // -------------------------------------------------------------
    function exportStateToExcel() {
        try {
            if (typeof XLSX === "undefined") {
                showToast("Thư viện SheetJS (XLSX) chưa sẵn sàng!", "error");
                return;
            }

            const wb = XLSX.utils.book_new();

            // 1. Build Sheet "Định hướng"
            const ws1Data = [
                ["KẾ HOẠCH & TIẾN ĐỘ THỦ TỤC DỰ ÁN"],
                ["Chuẩn hóa theo Luật Đấu thầu số 22/2023/QH15 & Nghị định 24/2024/NĐ-CP | Nhập dữ liệu tự động đồng bộ sang Tab 1 & Tab 2"],
                [],
                ["I. THÔNG TIN CHUNG DỰ ÁN"],
                ["Tên dự án (*):", appState.generalInfo.TEN_DU_AN || (appState.projectRoadmap && appState.projectRoadmap.projectName) || "", "Cấp quyết định đầu tư:", appState.generalInfo.CAP_QUYET_DINH_DAU_TU || (appState.projectRoadmap && appState.projectRoadmap.approver) || ""],
                ["Chủ đầu tư / Đơn vị thực hiện (*):", appState.generalInfo.TEN_CHU_DAU_TU || (appState.projectRoadmap && appState.projectRoadmap.investorName) || "", "Nguồn vốn:", appState.generalInfo.NGUON_VON || (appState.projectRoadmap && appState.projectRoadmap.fundingSource) || ""],
                ["Địa danh phát hành văn bản (*):", appState.generalInfo.DIA_DANH || "Cần Thơ", "Tỉnh / Thành phố:", appState.generalInfo.TINH_THANH_PHO || "TP. Cần Thơ"],
                [],
                ["II. KẾ HOẠCH CÁC GÓI THẦU (ÁP DỤNG TRONG DỰ ÁN)"],
                ["STT", "Mã gói", "Tên gói thầu", "Lĩnh vực", "Giá gói dự kiến (VNĐ)", "Phương thức LCNT định hướng"]
            ];

            const rmPackages = (appState.projectRoadmap && Array.isArray(appState.projectRoadmap.packages)) ? appState.projectRoadmap.packages : [];
            rmPackages.forEach((pkg, idx) => {
                ws1Data.push([
                    idx + 1,
                    pkg.id || `GOI_${idx + 1}`,
                    pkg.name || `Gói thầu số ${idx + 1}`,
                    pkg.categoryLabel || pkg.category || "Tư vấn",
                    pkg.estimatedPrice || (pkg.fields && pkg.fields.GIA_GOI_THAU_SO) || "",
                    pkg.procurementTypeId ? getProcurementTypeName(pkg.procurementTypeId) : (pkg.fields?.HINH_THUC_LCNT || "")
                ]);
            });

            ws1Data.push([]);
            ws1Data.push(["III. BẢNG TRÌNH TỰ THỦ TỤC & TIẾN ĐỘ VĂN BẢN (ĐỒNG BỘ TAB 1)"]);
            ws1Data.push(["STT", "Phạm vi / Gói thầu", "Tên công việc / Thủ tục", "Mã văn bản", "Đơn vị ký", "Chế độ", "Thứ", "Ngày ký", "Thời gian", "Số văn bản"]);

            let taskStt = 1;
            const rmPhases = (appState.projectRoadmap && Array.isArray(appState.projectRoadmap.timelinePhases)) ? appState.projectRoadmap.timelinePhases : [];
            rmPhases.forEach(phase => {
                const scopeName = phase.title || (phase.isPackage ? "Gói thầu" : "Triển khai");
                (phase.tasks || []).forEach(task => {
                    ws1Data.push([
                        taskStt++,
                        scopeName,
                        task.name || "",
                        task.docCode || "",
                        task.signer || "",
                        task.mode === "auto" ? "Tự động" : "Thủ công",
                        task.dayOfWeek || "",
                        task.date ? formatDateToVN(task.date) : "",
                        task.duration !== undefined ? task.duration : 1,
                        task.docNo || ""
                    ]);
                });
            });

            const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);
            ws1["!cols"] = [
                { wch: 6 },
                { wch: 22 },
                { wch: 45 },
                { wch: 18 },
                { wch: 24 },
                { wch: 38 },
                { wch: 10 },
                { wch: 14 },
                { wch: 10 },
                { wch: 22 }
            ];
            XLSX.utils.book_append_sheet(wb, ws1, "Định hướng");

            // 2. Build Sheet "Thông tin"
            const ws2Data = [
                ["BẢNG BIẾN XẠ THÔNG TIN DỰ ÁN & CÁC GÓI THẦU"],
                ["Cột D: Dùng chung toàn dự án (điền 1 lần) | Cột E, F, G: Riêng từng gói thầu | Tự động đồng bộ sang Tab 2 (Tạo hồ sơ)"],
                [],
                ["STT", "Phân nhóm thông tin", "Tên trường dữ liệu", "Mã biến xạ {TAG}", "Giá trị DÙNG CHUNG toàn dự án"]
            ];

            const activePackages = (appState.packages && appState.packages.length > 0) ? appState.packages : rmPackages;
            activePackages.forEach((pkg, idx) => {
                ws2Data[3].push(`Gói ${idx + 1}: ${pkg.name || `Gói ${idx + 1}`}`);
            });

            MASTER_VARIABLES_CATALOG.forEach(v => {
                const row = [
                    v.stt,
                    v.group,
                    v.label,
                    v.tag,
                    v.isGeneral ? (appState.generalInfo[v.tag] || "") : ""
                ];

                activePackages.forEach((pkg, pIdx) => {
                    const pkgMerged = getMergedDataForPackage(pIdx);
                    row.push(v.isGeneral ? "" : (pkgMerged[v.tag] || ""));
                });

                ws2Data.push(row);
            });

            // Append custom variables if any
            if (appState.customVariables && Object.keys(appState.customVariables).length > 0) {
                let custStt = MASTER_VARIABLES_CATALOG.length + 1;
                for (const cKey in appState.customVariables) {
                    const cVar = appState.customVariables[cKey];
                    const row = [
                        custStt++,
                        "J. Tùy biến bổ sung",
                        cVar.label || cKey,
                        cKey,
                        ""
                    ];
                    activePackages.forEach((pkg, pIdx) => {
                        const pkgMerged = getMergedDataForPackage(pIdx);
                        row.push(pkgMerged[cKey] || "");
                    });
                    ws2Data.push(row);
                }
            }

            const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);
            ws2["!cols"] = [
                { wch: 6 },
                { wch: 24 },
                { wch: 40 },
                { wch: 32 },
                { wch: 42 }
            ];
            activePackages.forEach(() => {
                ws2["!cols"].push({ wch: 36 });
            });
            XLSX.utils.book_append_sheet(wb, ws2, "Thông tin");

            // Format export file name
            const projNameClean = (appState.generalInfo.TEN_DU_AN || "DuAn")
                .replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]+/g, "_")
                .substring(0, 30);
            const now = new Date();
            const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
            const fileName = `HoSo_${projNameClean}_${dateStr}.xlsx`;

            XLSX.writeFile(wb, fileName);
            showToast(`Đã xuất thành công file Excel 2 Sheet: ${fileName}`);
        } catch (err) {
            console.error("Export Excel error:", err);
            showToast("Lỗi khi xuất file Excel: " + err.message, "error");
        }
    }

    // Excel Sample Generation & Smart Import (2-Sheet & Legacy)
    // -------------------------------------------------------------
    if (btnDownloadSample) {
        btnDownloadSample.addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = "MauNhapLieu_HoSo_2Sheets_v3.xlsx";
            link.download = "MauNhapLieu_HoSo_2Sheets_v3.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("Đang tải file Excel mẫu 2 Sheet (Định hướng & Thông tin)...");
        });
    }

    if (btnImportExcel) {
        btnImportExcel.addEventListener("click", () => {
            excelFileInput.click();
        });
    }

    const btnExportExcel = document.getElementById("btnExportExcel");
    const btnExportExcelRoadmap = document.getElementById("btnExportExcelRoadmap");
    if (btnExportExcel) btnExportExcel.addEventListener("click", exportStateToExcel);
    if (btnExportExcelRoadmap) btnExportExcelRoadmap.addEventListener("click", exportStateToExcel);

    excelFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetNames = workbook.SheetNames || [];
                const sheetDinhHuong = sheetNames.find(s => {
                    const norm = s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return norm.includes("dinh huong");
                });
                const sheetThongTin = sheetNames.find(s => {
                    const norm = s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return norm.includes("thong tin");
                });

                if (sheetDinhHuong || sheetThongTin) {
                    // ==========================================
                    // 2-SHEET WORKBOOK IMPORT
                    // ==========================================
                    let newGeneralInfo = { ...appState.generalInfo };
                    let importedPackages = [];
                    let importedTimelinePhases = [];

                    // 1. Parse Sheet "Định hướng" if present
                    if (sheetDinhHuong) {
                        const wsDH = workbook.Sheets[sheetDinhHuong];
                        const rowsDH = XLSX.utils.sheet_to_json(wsDH, { header: 1 });

                        let section = "";
                        let packageRows = [];
                        let taskRows = [];

                        for (let rIdx = 0; rIdx < rowsDH.length; rIdx++) {
                            const row = rowsDH[rIdx];
                            if (!row || row.length === 0) continue;
                            const firstCell = String(row[0] || "").trim();

                            if (firstCell.includes("I. THÔNG TIN CHUNG")) {
                                section = "general";
                                continue;
                            } else if (firstCell.includes("II. KẾ HOẠCH CÁC GÓI THẦU")) {
                                section = "packages";
                                continue;
                            } else if (firstCell.includes("III. BẢNG TRÌNH TỰ THỦ TỤC") || firstCell.includes("III. TIẾN ĐỘ")) {
                                section = "timeline";
                                continue;
                            }

                            if (section === "general") {
                                for (let c = 0; c < row.length; c++) {
                                    const val = String(row[c] || "").trim();
                                    const nextVal = (row[c+1] !== undefined && row[c+1] !== null) ? String(row[c+1]).trim() : "";
                                    if (val.startsWith("Tên dự án") && nextVal) {
                                        newGeneralInfo.TEN_DU_AN = nextVal;
                                        newGeneralInfo.TEN_CONG_TRINH = nextVal;
                                        if (appState.projectRoadmap) appState.projectRoadmap.projectName = nextVal;
                                    } else if ((val.startsWith("Chủ đầu tư") || val.includes("Đơn vị thực hiện")) && nextVal) {
                                        newGeneralInfo.TEN_CHU_DAU_TU = nextVal;
                                        newGeneralInfo.TEN_CHU_DAU_TU_VIET_HOA = nextVal.toUpperCase();
                                        if (appState.projectRoadmap) appState.projectRoadmap.investorName = nextVal;
                                    } else if (val.startsWith("Cấp quyết định") && nextVal) {
                                        newGeneralInfo.CAP_QUYET_DINH_DAU_TU = nextVal;
                                        if (appState.projectRoadmap) appState.projectRoadmap.approver = nextVal;
                                    } else if (val.startsWith("Nguồn vốn") && nextVal) {
                                        newGeneralInfo.NGUON_VON = nextVal;
                                        if (appState.projectRoadmap) appState.projectRoadmap.fundingSource = nextVal;
                                    } else if (val.startsWith("Địa danh") && nextVal) {
                                        newGeneralInfo.DIA_DANH = nextVal;
                                    } else if (val.startsWith("Tỉnh / Thành phố") && nextVal) {
                                        newGeneralInfo.TINH_THANH_PHO = nextVal;
                                    }
                                }
                            } else if (section === "packages") {
                                if (firstCell === "STT" || firstCell.toLowerCase().includes("mã gói")) continue;
                                if (row[2] || row[1]) {
                                    packageRows.push(row);
                                }
                            } else if (section === "timeline") {
                                if (firstCell === "STT" || firstCell.toLowerCase().includes("phạm vi")) continue;
                                if (row[1] || row[2]) {
                                    taskRows.push(row);
                                }
                            }
                        }

                        if (packageRows.length > 0) {
                            importedPackages = packageRows.map((r, i) => {
                                const pkgName = String(r[2] || `Gói thầu ${i+1}`).trim();
                                const catLabel = String(r[3] || "Tư vấn").trim();
                                let cat = "tu_van";
                                const catLower = catLabel.toLowerCase();
                                if (catLower.includes("xây") || catLower.includes("xay")) cat = "xay_lap";
                                else if (catLower.includes("mua")) cat = "mua_sam";
                                else if (catLower.includes("phi")) cat = "phi_tu_van";

                                const rawPrice = r[4] !== undefined ? String(r[4]).trim() : "";
                                const rawProc = r[5] !== undefined ? String(r[5]).trim() : "";
                                let procId = "chi_dinh_thau_rut_gon";
                                if (typeof PROCUREMENT_MATRIX !== "undefined" && PROCUREMENT_MATRIX.procurementTypes) {
                                    const match = PROCUREMENT_MATRIX.procurementTypes.find(pt => 
                                        rawProc.toLowerCase().includes(pt.name.toLowerCase()) || 
                                        pt.id === rawProc
                                    );
                                    if (match) procId = match.id;
                                }

                                return {
                                    id: String(r[1] || `pkg_${i+1}`).trim(),
                                    name: pkgName,
                                    category: cat,
                                    categoryLabel: catLabel,
                                    procurementTypeId: procId,
                                    estimatedPrice: rawPrice,
                                    contractType: "Trọn gói",
                                    duration: "30 ngày",
                                    status: "Đang làm",
                                    fields: {
                                        TEN_GOI_THAU: pkgName,
                                        GIA_GOI_THAU_SO: rawPrice,
                                        HINH_THUC_LCNT: rawProc || getProcurementTypeName(procId)
                                    }
                                };
                            });
                        }

                        if (taskRows.length > 0) {
                            const phaseMap = new Map();
                            taskRows.forEach(r => {
                                const scope = String(r[1] || "Triển khai").trim();
                                if (!phaseMap.has(scope)) {
                                    const isPkg = !scope.toLowerCase().includes("triển khai") && !scope.toLowerCase().includes("trien khai");
                                    phaseMap.set(scope, {
                                        id: `phase_${phaseMap.size + 1}`,
                                        title: scope,
                                        isPackage: isPkg,
                                        tasks: []
                                    });
                                }
                                const ph = phaseMap.get(scope);
                                const tMode = String(r[5] || "").toLowerCase().includes("tự động") ? "auto" : "manual";

                                let isoDate = "";
                                const rawDate = r[7] !== undefined ? String(r[7]).trim() : "";
                                if (rawDate) {
                                    if (rawDate.includes("/")) {
                                        const p = rawDate.split("/");
                                        if (p.length === 3) isoDate = `${p[2].padStart(4,"20")}-${p[1].padStart(2,"0")}-${p[0].padStart(2,"0")}`;
                                    } else if (rawDate.includes("-")) {
                                        isoDate = rawDate;
                                    }
                                }

                                ph.tasks.push({
                                    id: `task_${ph.tasks.length + 1}`,
                                    name: String(r[2] || "").trim(),
                                    docCode: String(r[3] || "").trim(),
                                    signer: String(r[4] || "").trim(),
                                    mode: tMode,
                                    dayOfWeek: String(r[6] || "").trim(),
                                    date: isoDate,
                                    duration: parseInt(r[8], 10) || 1,
                                    docNo: String(r[9] || "").trim(),
                                    status: "Đã xong"
                                });
                            });
                            importedTimelinePhases = Array.from(phaseMap.values());
                        }
                    }

                    // 2. Parse Sheet "Thông tin" if present
                    let packagesFromInfo = [];
                    if (sheetThongTin) {
                        const wsTT = workbook.Sheets[sheetThongTin];
                        const rowsTT = XLSX.utils.sheet_to_json(wsTT, { header: 1 });

                        let headerRowIdx = -1;
                        for (let r = 0; r < rowsTT.length; r++) {
                            const rowStr = (rowsTT[r] || []).map(c => String(c || "")).join(" ");
                            if (rowStr.includes("Mã biến xạ") || rowStr.includes("{TAG}") || rowStr.includes("Phân nhóm")) {
                                headerRowIdx = r;
                                break;
                            }
                        }

                        if (headerRowIdx !== -1) {
                            const headerRow = rowsTT[headerRowIdx];
                            const pkgColIndices = [];
                            for (let c = 5; c < headerRow.length; c++) {
                                const hName = String(headerRow[c] || "").trim();
                                if (hName) {
                                    pkgColIndices.push({ colIdx: c, name: hName });
                                    packagesFromInfo.push({
                                        id: `pkg-${packagesFromInfo.length + 1}`,
                                        name: hName.replace(/^Gói\s*\d+:\s*/i, ""),
                                        sheet_name: hName,
                                        fields: {}
                                    });
                                }
                            }

                            for (let r = headerRowIdx + 1; r < rowsTT.length; r++) {
                                const row = rowsTT[r];
                                if (!row || row.length === 0) continue;
                                const tagRaw = String(row[3] || "").trim();
                                const tag = tagRaw.replace(/[{}]/g, "").trim();
                                if (!tag) continue;

                                const commonVal = (row[4] !== undefined && row[4] !== null) ? String(row[4]).trim() : "";
                                if (commonVal !== "") {
                                    newGeneralInfo[tag] = commonVal;
                                }

                                pkgColIndices.forEach((pCol, pIdx) => {
                                    const val = (row[pCol.colIdx] !== undefined && row[pCol.colIdx] !== null) ? String(row[pCol.colIdx]).trim() : "";
                                    if (val !== "") {
                                        packagesFromInfo[pIdx].fields[tag] = val;
                                    }
                                });
                            }
                        }
                    }

                    appState.generalInfo = newGeneralInfo;

                    if (importedPackages.length > 0) {
                        appState.projectRoadmap.packages = importedPackages.map((rp, i) => {
                            const pInfo = packagesFromInfo[i] || { fields: {} };
                            return {
                                ...rp,
                                fields: { ...rp.fields, ...pInfo.fields }
                            };
                        });
                    } else if (packagesFromInfo.length > 0) {
                        appState.projectRoadmap.packages = packagesFromInfo.map((p, i) => ({
                            id: p.id || `pkg_${i+1}`,
                            name: p.name || `Gói thầu ${i+1}`,
                            category: "tu_van",
                            categoryLabel: "Tư vấn",
                            procurementTypeId: "chi_dinh_thau_rut_gon",
                            estimatedPrice: p.fields.GIA_GOI_THAU_SO || "",
                            contractType: p.fields.LOAI_HOP_DONG || "Trọn gói",
                            duration: p.fields.THOI_GIAN_THUC_HIEN || "30 ngày",
                            status: "Đang làm",
                            fields: p.fields
                        }));
                    }

                    if (importedTimelinePhases.length > 0) {
                        appState.projectRoadmap.timelinePhases = importedTimelinePhases;
                    }

                    if (packagesFromInfo.length > 0) {
                        appState.packages = packagesFromInfo;
                    } else if (importedPackages.length > 0) {
                        appState.packages = importedPackages.map(ip => ({
                            id: ip.id,
                            name: ip.name,
                            sheet_name: ip.name,
                            fields: { ...ip.fields }
                        }));
                    }

                    syncRoadmapToDocs();
                    saveState();
                    renderRoadmapUI();
                    renderPackageDropdown();
                    populateFormInputs();
                    renderInteractivePreview();

                    const totalPkgs = (appState.packages || []).length;
                    showToast(`Đã import thành công file Excel 2 Sheet (${totalPkgs} gói thầu)!`);
                } else {
                    // ==========================================
                    // LEGACY MULTI-SHEET WORKBOOK FALLBACK
                    // ==========================================
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
                        renderInteractivePreview();
                        showToast(`Đã import thành công ${newPackages.length} gói thầu từ file Excel cũ!`);
                    } else {
                        showToast("Không tìm thấy dữ liệu gói thầu trong file!", "error");
                    }
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
    // Variable Categories Manager Controller (Add / Edit / Remove)
    // -------------------------------------------------------------
    const LS_VARIABLE_CATEGORIES = "ho_so_var_categories";
    const DEFAULT_VARIABLE_CATEGORIES = [
        { key: "A", name: "A. Chủ đầu tư" },
        { key: "B", name: "B. Dự án & Gói" },
        { key: "C", name: "C. Tài chính" },
        { key: "D", name: "D. Nhà thầu" },
        { key: "E", name: "E. Số hiệu VB" },
        { key: "F", name: "F. Ngày (ngắn)" },
        { key: "G", name: "G. Ngày (Full)" },
        { key: "H", name: "H. Tên trích dẫn" },
        { key: "I", name: "I. Căn cứ pháp lý" },
        { key: "J", name: "J. Tùy biến bổ sung" }
    ];

    let currentCategories = [...DEFAULT_VARIABLE_CATEGORIES];

    function loadVariableCategories() {
        try {
            const raw = localStorage.getItem(LS_VARIABLE_CATEGORIES);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    currentCategories = parsed;
                }
            }
        } catch(e) {
            console.warn("Could not load variable categories:", e);
        }
    }

    function saveVariableCategories() {
        try {
            localStorage.setItem(LS_VARIABLE_CATEGORIES, JSON.stringify(currentCategories));
        } catch(e) {
            console.warn("Could not save variable categories:", e);
        }
    }

    loadVariableCategories();

    function populateGroupDropdowns() {
        const editVarGroupSelect = document.getElementById("editVarGroupSelect");
        const inputNewVarGroup = document.getElementById("inputNewVarGroup");

        const optionsHtml = `<option value="">-- (Để trống / Chưa phân nhóm) --</option>` +
            currentCategories.map(c => `<option value="${c.key}">${c.name}</option>`).join("");

        if (editVarGroupSelect) {
            const curVal = editVarGroupSelect.value;
            editVarGroupSelect.innerHTML = optionsHtml;
            if (currentCategories.some(c => c.key === curVal) || curVal === "") {
                editVarGroupSelect.value = curVal;
            } else {
                editVarGroupSelect.value = "";
            }
        }

        if (inputNewVarGroup) {
            const curVal = inputNewVarGroup.value;
            inputNewVarGroup.innerHTML = optionsHtml;
            if (currentCategories.some(c => c.key === curVal)) {
                inputNewVarGroup.value = curVal;
            } else if (currentCategories.length > 0) {
                inputNewVarGroup.value = currentCategories[0].key;
            }
        }
    }

    function openManageCategoriesModal() {
        const modal = document.getElementById("modalManageCategories");
        if (!modal) return;
        renderManageCategoriesList();
        modal.classList.remove("hidden");
    }

    function closeManageCategoriesModal() {
        const modal = document.getElementById("modalManageCategories");
        if (modal) modal.classList.add("hidden");
    }

    function renderManageCategoriesList() {
        const container = document.getElementById("categoriesListContainer");
        if (!container) return;

        const allVars = [...MASTER_VARIABLES_CATALOG];
        if (appState && appState.customVariables) {
            for (const k in appState.customVariables) {
                allVars.push({
                    groupKey: appState.customVariables[k].groupKey || "",
                    group: appState.customVariables[k].group || ""
                });
            }
        }

        if (currentCategories.length === 0) {
            container.innerHTML = `
                <div class="p-6 text-center text-slate-400 italic text-xs">
                    Chưa có phân nhóm nào. Hãy thêm phân nhóm mới ở khung phía trên.
                </div>
            `;
            return;
        }

        container.innerHTML = currentCategories.map(cat => {
            const count = allVars.filter(v => v.groupKey === cat.key).length;
            return `
                <div class="flex items-center justify-between p-2 hover:bg-slate-50 gap-2 transition-colors" data-key="${cat.key}">
                    <span class="w-6 h-6 rounded bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200" title="Mã nhóm: ${cat.key}">${cat.key}</span>
                    <div class="flex-1 min-w-0">
                        <input type="text" class="input-cat-name w-full px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-purple-500 transition-colors" value="${escapeXml(cat.name)}" data-orig="${escapeXml(cat.name)}">
                    </div>
                    <span class="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${count > 0 ? 'bg-slate-100 text-slate-700 font-semibold' : 'bg-slate-50 text-slate-400 italic'}">
                        ${count} biến
                    </span>
                    <div class="flex items-center gap-1 shrink-0">
                        <button type="button" class="btn-save-cat px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded cursor-pointer transition-all flex items-center gap-1" data-key="${cat.key}" title="Lưu tên mới">
                            <i class="fa-solid fa-check text-[9px]"></i>
                            <span>Lưu</span>
                        </button>
                        <button type="button" class="btn-del-cat px-2 py-0.5 text-[10px] font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded cursor-pointer transition-all flex items-center gap-1" data-key="${cat.key}" title="Loại bỏ nhóm này (biến sẽ để trống)">
                            <i class="fa-regular fa-trash-can text-[9px]"></i>
                            <span>Xóa</span>
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        container.querySelectorAll(".btn-save-cat").forEach(btn => {
            btn.onclick = () => {
                const key = btn.getAttribute("data-key");
                const row = btn.closest("[data-key]");
                const input = row ? row.querySelector(".input-cat-name") : null;
                if (input) updateCategoryName(key, input.value);
            };
        });

        container.querySelectorAll(".input-cat-name").forEach(inp => {
            inp.onkeydown = (e) => {
                if (e.key === "Enter") {
                    const row = inp.closest("[data-key]");
                    const key = row ? row.getAttribute("data-key") : null;
                    if (key) updateCategoryName(key, inp.value);
                }
            };
        });

        container.querySelectorAll(".btn-del-cat").forEach(btn => {
            btn.onclick = () => {
                const key = btn.getAttribute("data-key");
                deleteCategory(key);
            };
        });
    }

    function deleteCategory(catKey) {
        const cat = currentCategories.find(c => c.key === catKey);
        if (!cat) return;

        const matchingVars = MASTER_VARIABLES_CATALOG.filter(v => v.groupKey === catKey);
        let customCount = 0;
        if (appState && appState.customVariables) {
            for (const k in appState.customVariables) {
                if (appState.customVariables[k].groupKey === catKey) customCount++;
            }
        }
        const totalMatching = matchingVars.length + customCount;

        const confirmMsg = totalMatching > 0
            ? `Xác nhận loại bỏ phân nhóm "${cat.name}"?\n\nCó ${totalMatching} biến đang thuộc nhóm này. Toàn bộ các biến sẽ được ĐỂ TRỐNG (Chưa phân nhóm) và không bị xóa mất dữ liệu.`
            : `Xác nhận loại bỏ phân nhóm "${cat.name}"?`;

        if (!confirm(confirmMsg)) return;

        // Reset variables belonging to this category to blank (để trống)
        matchingVars.forEach(v => {
            v.groupKey = "";
            v.group = "";
        });

        if (appState && appState.customVariables) {
            for (const k in appState.customVariables) {
                if (appState.customVariables[k].groupKey === catKey) {
                    appState.customVariables[k].groupKey = "";
                    appState.customVariables[k].group = "";
                }
            }
            saveState();
        }

        if (typeof saveCatalogCustomizations === "function") {
            saveCatalogCustomizations();
        }

        // Remove from currentCategories
        currentCategories = currentCategories.filter(c => c.key !== catKey);
        saveVariableCategories();

        if (currentVarCatFilter === catKey) {
            currentVarCatFilter = "all";
        }

        renderManageCategoriesList();
        renderVarsDictionaryTable();
        populateGroupDropdowns();

        showToast(`Đã loại bỏ phân nhóm "${cat.name}". ${totalMatching} biến đã được để trống.`);
    }

    function updateCategoryName(catKey, newName) {
        const cat = currentCategories.find(c => c.key === catKey);
        if (!cat) return;
        newName = (newName || "").trim();
        if (!newName) {
            showToast("Tên phân nhóm không được để trống!", "error");
            return;
        }

        cat.name = newName;

        // Update group on matching variables
        MASTER_VARIABLES_CATALOG.forEach(v => {
            if (v.groupKey === catKey) {
                v.group = newName;
            }
        });

        if (appState && appState.customVariables) {
            for (const k in appState.customVariables) {
                if (appState.customVariables[k].groupKey === catKey) {
                    appState.customVariables[k].group = newName;
                }
            }
            saveState();
        }

        saveVariableCategories();
        if (typeof saveCatalogCustomizations === "function") {
            saveCatalogCustomizations();
        }

        renderManageCategoriesList();
        renderVarsDictionaryTable();
        populateGroupDropdowns();

        showToast(`Đã đổi tên phân nhóm thành "${newName}".`);
    }

    function addNewCategory(key, name) {
        name = (name || "").trim();
        if (!name) {
            showToast("Vui lòng nhập tên phân nhóm mới!", "error");
            return false;
        }

        key = (key || "").trim().toUpperCase();
        if (!key) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (let i = 0; i < alphabet.length; i++) {
                const char = alphabet[i];
                if (!currentCategories.some(c => c.key === char)) {
                    key = char;
                    break;
                }
            }
            if (!key) key = "N" + (currentCategories.length + 1);
        }

        if (currentCategories.some(c => c.key === key)) {
            showToast(`Mã phân nhóm "${key}" đã tồn tại! Vui lòng chọn mã khác.`, "error");
            return false;
        }

        currentCategories.push({ key, name });
        saveVariableCategories();

        renderManageCategoriesList();
        renderVarsDictionaryTable();
        populateGroupDropdowns();

        showToast(`Đã thêm phân nhóm mới "${name}" (${key})!`);
        return true;
    }

    function resetDefaultCategories() {
        showToast("Chức năng khôi phục mặc định đã được tắt để bảo vệ dữ liệu đang thiết lập!", "warning");
        return;
        if (!confirm("Khôi phục danh sách phân nhóm về 10 nhóm chuẩn ban đầu (A -> J)?\nCác biến đang để trống hoặc thuộc nhóm tự tạo có thể cần được phân nhóm lại.")) return;

        currentCategories = JSON.parse(JSON.stringify(DEFAULT_VARIABLE_CATEGORIES));
        saveVariableCategories();

        currentVarCatFilter = "all";
        renderManageCategoriesList();
        renderVarsDictionaryTable();
        populateGroupDropdowns();

        showToast("Đã khôi phục 10 phân nhóm mặc định!", "info");
    }

    function renderVarsCategoryFilters(allVars) {
        const container = document.getElementById("varsCategoryFilters");
        if (!container) return;

        const counts = { all: allVars.length, __unassigned__: 0 };
        currentCategories.forEach(cat => {
            counts[cat.key] = 0;
        });

        allVars.forEach(v => {
            const k = v.groupKey;
            if (!k || !v.group || v.group.trim() === "" || !currentCategories.some(c => c.key === k)) {
                counts.__unassigned__++;
            } else {
                if (counts[k] !== undefined) counts[k]++;
                else counts[k] = 1;
            }
        });

        let pillsHtml = `
            <button type="button" data-cat="all" class="var-filter-pill px-2 py-0.2 rounded-full font-bold ${currentVarCatFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} cursor-pointer transition-colors">Tất cả (${counts.all})</button>
        `;

        currentCategories.forEach(cat => {
            const isActive = currentVarCatFilter === cat.key;
            pillsHtml += `
                <button type="button" data-cat="${cat.key}" class="var-filter-pill px-1.5 py-0.2 rounded-full font-medium ${isActive ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} cursor-pointer transition-colors">${cat.name} (${counts[cat.key] || 0})</button>
            `;
        });

        if (counts.__unassigned__ > 0) {
            const isActive = currentVarCatFilter === '__unassigned__';
            pillsHtml += `
                <button type="button" data-cat="__unassigned__" class="var-filter-pill px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-amber-800 text-white font-bold' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-dashed border-amber-300'} cursor-pointer transition-colors" title="Các biến chưa thuộc nhóm nào hoặc nhóm đã bị loại bỏ">⚠️ Để trống (${counts.__unassigned__})</button>
            `;
        }

        pillsHtml += `
            <button id="btnQuickPillManageCats" type="button" class="px-1.5 py-0.2 rounded-full font-semibold text-[9.5px] bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 cursor-pointer transition-colors flex items-center gap-1 ml-1" title="Quản lý và điều chỉnh phân nhóm">
                <i class="fa-solid fa-gear text-[8.5px]"></i>
                <span>Tùy chỉnh nhóm</span>
            </button>
        `;

        container.innerHTML = pillsHtml;

        container.querySelectorAll(".var-filter-pill").forEach(pill => {
            pill.addEventListener("click", () => {
                currentVarCatFilter = pill.getAttribute("data-cat");
                renderVarsDictionaryTable();
            });
        });

        const quickBtn = document.getElementById("btnQuickPillManageCats");
        if (quickBtn) {
            quickBtn.onclick = openManageCategoriesModal;
        }
    }

    // -------------------------------------------------------------
    // Tra cứu Biến xạ Word Template Modal Controller
    // -------------------------------------------------------------
    const modalVarsDictionary = document.getElementById("modalVarsDictionary");
    const btnOpenVarsModal = document.getElementById("btnOpenVarsModal");
    const btnCloseVarsModal = document.getElementById("btnCloseVarsModal");
    const btnFooterCloseVarsModal = document.getElementById("btnFooterCloseVarsModal");
    const varsSearchInput = document.getElementById("varsSearchInput");
    const varsPackageSelect = document.getElementById("varsPackageSelect");
    const varsDictionaryTableBody = document.getElementById("varsDictionaryTableBody");
    const countVarAll = document.getElementById("countVarAll");

    let currentVarCatFilter = "all";

    function copyTextToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopyText(text));
        } else {
            fallbackCopyText(text);
        }
    }

    function fallbackCopyText(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Fallback copy failed", err);
        }
        document.body.removeChild(textArea);
    }

    function openVarsDictionaryModal() {
        const userAccountDropdown = document.getElementById("userAccountDropdown");
        if (userAccountDropdown) userAccountDropdown.classList.add("hidden");
        initTableColumnResizing();
        applyColumnVisibility();
        const modal = document.getElementById("modalVarsDictionary");
        if (!modal) return;

        if (varsPackageSelect) {
            varsPackageSelect.innerHTML = "";
            const pkgs = appState.packages && appState.packages.length > 0 ? appState.packages : (appState.projectRoadmap?.packages || []);
            pkgs.forEach((p, idx) => {
                const opt = document.createElement("option");
                opt.value = idx;
                opt.textContent = `Gói ${idx + 1}: ${p.name || `Gói thầu ${idx + 1}`}`;
                if (idx === appState.activePackageIndex) opt.selected = true;
                varsPackageSelect.appendChild(opt);
            });
        }

        initDictModeTabs();
        updateDictBadgeCounts();
        if (activeDictModalMode === "table") {
            renderDictTableView();
        } else {
            renderVarsDictionaryTable();
        }
        modal.classList.remove("hidden");
        if (varsSearchInput) {
            varsSearchInput.value = "";
            setTimeout(() => varsSearchInput.focus(), 100);
        }
    }

    function closeVarsDictionaryModal() {
        if (modalVarsDictionary) modalVarsDictionary.classList.add("hidden");
        if (typeof syncFormLabelsFromDictionary === "function") syncFormLabelsFromDictionary();
        if (typeof populateFormInputs === "function") populateFormInputs();
    }

    function renderVarsDictionaryTable() {
        if (!varsDictionaryTableBody) return;

        const isAdmin = isUserAdmin();
        const dictReadOnlyBadge = document.getElementById("dictReadOnlyBadge");
        if (dictReadOnlyBadge) {
            dictReadOnlyBadge.classList.toggle("hidden", isAdmin);
        }
        if (btnAddNewVarFromDict) {
            btnAddNewVarFromDict.classList.toggle("hidden", !isAdmin);
        }
        if (btnManageCategories) {
            btnManageCategories.classList.toggle("hidden", !isAdmin);
        }

        const query = varsSearchInput ? varsSearchInput.value.trim().toLowerCase() : "";
        const selectedPkgIdx = varsPackageSelect ? parseInt(varsPackageSelect.value, 10) || 0 : 0;
        const mergedData = getMergedDataForPackage(selectedPkgIdx);

        const allVars = [...MASTER_VARIABLES_CATALOG];
        if (appState.customVariables) {
            let cStt = allVars.length + 1;
            for (const k in appState.customVariables) {
                allVars.push({
                    stt: cStt++,
                    groupKey: "J",
                    group: "J. Tùy biến bổ sung",
                    label: appState.customVariables[k].label || k,
                    tag: k,
                    isGeneral: false,
                    example: ""
                });
            }
        }

        renderVarsCategoryFilters(allVars);

        const filtered = allVars.filter(v => {
            if (currentVarCatFilter === "__unassigned__") {
                const hasValidCat = v.groupKey && v.group && v.group.trim() !== "" && currentCategories.some(c => c.key === v.groupKey);
                if (hasValidCat) return false;
            } else if (currentVarCatFilter !== "all" && v.groupKey !== currentVarCatFilter) {
                return false;
            }
            if (!query) return true;
            const inTag = v.tag.toLowerCase().includes(query);
            const inLabel = v.label.toLowerCase().includes(query);
            const inGroup = v.group.toLowerCase().includes(query);
            const curVal = String(v.isGeneral ? (appState.generalInfo[v.tag] || "") : (mergedData[v.tag] || "")).toLowerCase();
            return inTag || inLabel || inGroup || curVal.includes(query);
        });

        if (filtered.length === 0) {
            varsDictionaryTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="py-4 text-center text-slate-400 italic text-xs">
                        Không tìm thấy biến xạ phù hợp với từ khóa "${query}"
                    </td>
                </tr>
            `;
            return;
        }

                varsDictionaryTableBody.innerHTML = filtered.map((v, filteredIdx) => {
            const val = v.isGeneral ? (appState.generalInfo[v.tag] || "") : (mergedData[v.tag] || "");
            const valDisplay = val ? `<span class="text-slate-800 font-medium">${val}</span>` : `<span class="text-slate-300 italic">(chưa có giá trị)</span>`;
            const isFirst = filteredIdx === 0;
            const isLast = filteredIdx === filtered.length - 1;

            return `
                <tr class="dict-var-row hover:bg-slate-50/80 transition-colors select-none" draggable="${isAdmin ? "true" : "false"}" data-tag="${v.tag}">
                    <td class="col-stt py-0.5 px-1 text-center text-slate-400 font-mono text-[9.5px] border-r border-slate-100 ${isAdmin ? "cursor-grab active:cursor-grabbing hover:bg-slate-100" : "cursor-default"}" title="${isAdmin ? "Kéo thả để sắp xếp vị trí" : "Số thứ tự"}">
                        <div class="flex items-center justify-center gap-1">
                            ${isAdmin ? '<i class="fa-solid fa-grip-vertical text-[8px] text-slate-300"></i>' : ''}
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
                        ${(v.group && v.group.trim() !== "" && v.groupKey && currentCategories.some(c => c.key === v.groupKey))
                            ? `<span class="px-1.5 py-0.2 rounded text-[9.5px] font-semibold truncate block ${v.isGeneral ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700'}" title="${v.group}">${v.group}</span>`
                            : `<span class="px-1.5 py-0.2 rounded text-[9.5px] italic text-slate-400 bg-slate-50 border border-dashed border-slate-200 truncate block text-center" title="Chưa phân nhóm / Để trống">(Để trống)</span>`
                        }
                    </td>
                    <td class="col-scope py-0.5 px-2 border-r border-slate-100 text-[10px] text-slate-600 hidden">
                        ${v.isGeneral ? '<span class="text-blue-700 font-medium">Tầng 1 (Dự án)</span>' : '<span class="text-slate-600">Tầng 2 (Gói)</span>'}
                    </td>
                    <td class="col-val py-0.5 px-2 text-[10.5px] border-r border-slate-100 truncate" title="${val}">${valDisplay}</td>
                    <td class="col-actions py-0.5 px-1 text-center">
                        <div class="flex items-center justify-center space-x-0.5">
                            ${isAdmin ? `
                                <button type="button" class="btn-move-var-up text-[9px] font-bold text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all ${isFirst ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}" data-tag="${v.tag}" title="Di chuyển lên trên (▲)">
                                    <i class="fa-solid fa-arrow-up"></i>
                                </button>
                                <button type="button" class="btn-move-var-down text-[9px] font-bold text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all ${isLast ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}" data-tag="${v.tag}" title="Di chuyển xuống dưới (▼)">
                                    <i class="fa-solid fa-arrow-down"></i>
                                </button>
                                <button type="button" class="btn-copy-tag text-[9.5px] font-bold text-emerald-700 hover:text-emerald-900 bg-white hover:bg-emerald-50 border border-slate-200 w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all" data-tag="{${v.tag}}" title="Sao chép {${v.tag}}">
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                                <button type="button" class="btn-edit-var text-[9.5px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-1.5 h-5 rounded cursor-pointer transition-all flex items-center gap-0.5" data-tag="${v.tag}" title="Điều chỉnh tên biến và mã TAG">
                                    <i class="fa-solid fa-pen-to-square text-[8.5px]"></i>
                                    <span>Sửa</span>
                                </button>
                            ` : `
                                <button type="button" class="btn-copy-tag text-[9.5px] font-bold text-emerald-700 hover:text-emerald-900 bg-white hover:bg-emerald-50 border border-slate-200 px-2 h-5 rounded flex items-center gap-1 cursor-pointer transition-all" data-tag="{${v.tag}}" title="Sao chép mã thẻ {${v.tag}}">
                                    <i class="fa-regular fa-copy text-[8.5px]"></i>
                                    <span>Sao chép</span>
                                </button>
                            `}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

        varsDictionaryTableBody.querySelectorAll(".btn-move-var-up").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                moveVariableInCatalog(tag, "up");
            };
        });

        varsDictionaryTableBody.querySelectorAll(".btn-move-var-down").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tag = btn.getAttribute("data-tag");
                moveVariableInCatalog(tag, "down");
            };
        });

        varsDictionaryTableBody.querySelectorAll(".btn-copy-tag").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tagToCopy = btn.getAttribute("data-tag");
                copyTextToClipboard(tagToCopy);
                showToast(`Đã sao chép ${tagToCopy} vào clipboard!`);
            };
        });

        varsDictionaryTableBody.querySelectorAll(".btn-edit-var").forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const tagToEdit = btn.getAttribute("data-tag");
                openEditVariableModal(tagToEdit);
            };
        });

        // Drag & Drop reordering support
        let draggedTag = null;
        varsDictionaryTableBody.querySelectorAll(".dict-var-row").forEach(row => {
            row.addEventListener("dragstart", (e) => {
                draggedTag = row.getAttribute("data-tag");
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", draggedTag);
                row.classList.add("opacity-50", "bg-indigo-50");
            });

            row.addEventListener("dragend", () => {
                row.classList.remove("opacity-50", "bg-indigo-50");
                varsDictionaryTableBody.querySelectorAll(".dict-var-row").forEach(r => {
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
                    moveVariableToPosition(draggedTag, targetTag, "before");
                }
            });
        });

        applyColumnVisibility();
    }

    // -------------------------------------------------------------
    // Variable & TAG Editor Controller with Real-time Duplicate Check
    // -------------------------------------------------------------
    const LS_VARS_CUSTOMIZATIONS = "ho_so_vars_catalog_customizations";

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

            if (typeof syncFormLabelsFromDictionary === "function") {
                syncFormLabelsFromDictionary();
            }
        } catch (e) {
            console.warn("Error loading catalog customizations:", e);
        }
    }

    function moveVariableInCatalog(tag, direction = "up") {
        if (!Array.isArray(MASTER_VARIABLES_CATALOG) || MASTER_VARIABLES_CATALOG.length === 0) return;

        // Current list based on active category filter
        const currentList = MASTER_VARIABLES_CATALOG.filter(v => {
            if (currentVarCatFilter === "__unassigned__") {
                const hasValidCat = v.groupKey && v.group && v.group.trim() !== "" && currentCategories.some(c => c.key === v.groupKey);
                if (hasValidCat) return false;
            } else if (currentVarCatFilter !== "all" && v.groupKey !== currentVarCatFilter) {
                return false;
            }
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

        renderVarsDictionaryTable();
        showToast(`Đã chuyển biến "${temp.label}" ${direction === "up" ? "lên" : "xuống"} vị trí #${MASTER_VARIABLES_CATALOG.findIndex(v => v.tag === tag) + 1}!`, "info");
    }

    function moveVariableToPosition(draggedTag, targetTag, position = "before") {
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

        renderVarsDictionaryTable();
        showToast(`Đã chuyển biến "${item.label}" đến vị trí #${item.stt}!`, "success");
    }

    window.moveVariableInCatalog = moveVariableInCatalog;
    window.moveVariableToPosition = moveVariableToPosition;

    window.MASTER_VARIABLES_CATALOG = MASTER_VARIABLES_CATALOG;

    function migrateLegacyCustomVariables() {
        try {
            const customVarsJson = localStorage.getItem("ho_so_custom_variables");
            if (customVarsJson) {
                const customVars = JSON.parse(customVarsJson);
                if (Array.isArray(customVars)) {
                    let hasNew = false;
                    customVars.forEach(v => {
                        if (v && v.key) {
                            const cleanTag = v.key.replace(/^[{]+|[}]+$/g, "").toUpperCase();
                            const exists = MASTER_VARIABLES_CATALOG.find(m => m.tag.toUpperCase() === cleanTag);
                            if (!exists) {
                                MASTER_VARIABLES_CATALOG.push({
                                    stt: MASTER_VARIABLES_CATALOG.length + 1,
                                    groupKey: "J",
                                    group: "J. Tùy biến bổ sung",
                                    label: v.label || cleanTag,
                                    tag: cleanTag,
                                    isGeneral: v.targetSheet === "Thông tin chung",
                                    example: v.value || "",
                                    isCustom: true
                                });
                                hasNew = true;
                            }
                        }
                    });
                    if (hasNew && typeof saveCatalogCustomizations === "function") {
                        saveCatalogCustomizations();
                    }
                }
                localStorage.removeItem("ho_so_custom_variables");
            }
        } catch (e) {
            localStorage.removeItem("ho_so_custom_variables");
        }
    }

    // Call on script load
    loadCatalogCustomizations();
    migrateLegacyCustomVariables();

    function openEditVariableModal(tagToEdit = null) {
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
        populateGroupDropdowns();

        if (tagToEdit) {
            const cleanTag = tagToEdit.replace(/^[{]+|[}]+$/g, "");
            const v = MASTER_VARIABLES_CATALOG.find(item => item.tag === cleanTag) || 
                      (appState?.customVariables && appState.customVariables[cleanTag] ? {
                          tag: cleanTag,
                          label: appState.customVariables[cleanTag].label || cleanTag,
                          group: "J. Tùy biến bổ sung",
                          groupKey: "J",
                          isGeneral: false,
                          example: ""
                      } : null);

            if (title) title.textContent = `Điều Chỉnh Biến Xạ {${cleanTag}}`;
            if (origTagInput) origTagInput.value = cleanTag;
            if (labelInput) labelInput.value = v ? v.label : cleanTag;
            if (tagInput) tagInput.value = cleanTag;
            if (tagPreview) tagPreview.textContent = `{${cleanTag}}`;
            if (groupSelect && v && v.groupKey) groupSelect.value = v.groupKey;
            if (scopeSelect && v) scopeSelect.value = v.isGeneral ? "general" : "package";
            if (exampleInput) exampleInput.value = (v && v.example) || "";

            if (btnDelete) {
                if (v && (v.groupKey === "J" || v.isCustom)) {
                    btnDelete.classList.remove("hidden");
                } else {
                    btnDelete.classList.add("hidden");
                }
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
            conflictingVar = isTagInUse(cleanTag, origTag);

            if (conflictingVar) {
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
        if (!isUserAdmin()) {
            showToast("Chỉ Quản trị viên (Admin) mới có quyền chỉnh sửa Từ điển biến!", "warning");
            return;
        }
        const origTag = (document.getElementById("editVarOriginalTag")?.value || "").trim().toUpperCase();
        const label = (document.getElementById("editVarLabelInput")?.value || "").trim();
        const newTag = (document.getElementById("editVarTagInput")?.value || "").trim().toUpperCase();
        const groupKey = document.getElementById("editVarGroupSelect")?.value || "A";
        const isGeneral = document.getElementById("editVarScopeSelect")?.value === "general";
        const example = (document.getElementById("editVarExampleInput")?.value || "").trim();

        const groupCat = currentCategories.find(c => c.key === groupKey);
        const groupName = groupCat ? groupCat.name : (groupKey ? groupKey : "");

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

            if (origTag !== newTag && window.appState) {
                if (window.appState.generalInfo && window.appState.generalInfo[origTag] !== undefined) {
                    window.appState.generalInfo[newTag] = window.appState.generalInfo[origTag];
                    delete window.appState.generalInfo[origTag];
                }
                if (Array.isArray(window.appState.packages)) {
                    window.appState.packages.forEach(pkg => {
                        if (pkg.fields && pkg.fields[origTag] !== undefined) {
                            pkg.fields[newTag] = pkg.fields[origTag];
                            delete pkg.fields[origTag];
                        }
                    });
                }
            }

            // Always update matching DOM input labels immediately
            document.querySelectorAll(`[data-field="${origTag}"], [data-field="${newTag}"]`).forEach(el => {
                if (origTag !== newTag) el.setAttribute("data-field", newTag);
                const wrapper = el.closest(".field-item") || el.parentElement;
                const labelSibling = wrapper?.querySelector(".field-label") || wrapper?.querySelector("label");
                if (labelSibling) {
                    const isRequired = label.includes("(*)") || labelSibling.querySelector(".text-red-500") !== null;
                    const cleanLabel = label.replace(/\s*\(\*\)\s*/g, "").trim();
                    if (isRequired) {
                        labelSibling.innerHTML = `${escapeHtml(cleanLabel)} <span class="text-red-500">*</span>`;
                    } else {
                        labelSibling.textContent = cleanLabel;
                    }
                    labelSibling.setAttribute("title", `Mã thẻ Word: {${newTag}} để đồng bộ với Từ điển`);
                }
                if (example) el.setAttribute("placeholder", "VD: " + example);
            });
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
            if (window.appState) {
                if (isGeneral) {
                    window.appState.generalInfo[newTag] = example || "";
                } else {
                    if (Array.isArray(window.appState.packages)) {
                        window.appState.packages.forEach(pkg => {
                            pkg.fields = pkg.fields || {};
                            pkg.fields[newTag] = example || "";
                        });
                    }
                }
            }
        }

        saveCatalogCustomizations();

        if (typeof syncFormLabelsFromDictionary === "function") syncFormLabelsFromDictionary();
        if (typeof renderVarsDictionaryTable === "function") renderVarsDictionaryTable();
        if (typeof populateFormInputs === "function") populateFormInputs();
        if (typeof renderDocumentPreview === "function") renderDocumentPreview();
        if (typeof saveState === "function") saveState();

        document.getElementById("modalEditVariable")?.classList.add("hidden");
        showToast(`Đã lưu biến "${label}" với mã thẻ {${newTag}} thành công!`, "success");

        // Tự động đẩy lên Google Sheets nếu đã cấu hình (Auto-Push)
        try {
            if (typeof pushDataToGoogleSheet === "function" && isUserAdmin()) {
                const cfg = getGSheetConfig();
                if (cfg && cfg.url) {
                    pushDataToGoogleSheet(false).then(ok => {
                        if (ok) showToast("Đã tự động đồng bộ biến lên Google Sheets Cloud!", "info");
                    });
                }
            }
        } catch(e) {}
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

            // 1. In-tab custom event
            window.dispatchEvent(new Event("storage"));

            // 2. BroadcastChannel cross-tab/cross-window
            if (typeof BroadcastChannel !== "undefined") {
                try {
                    const bc = new BroadcastChannel("ho_so_catalog_channel");
                    bc.postMessage({ type: "CATALOG_UPDATED", ts: ts });
                    bc.close();
                } catch(e) {}
            }

            // 3. Tự động đồng bộ thứ tự & nội dung biến lên Google Sheets Cloud (Debounced Auto-Push)
            if (typeof triggerAutoPushCatalogToGSheet === "function") {
                triggerAutoPushCatalogToGSheet();
            }
        } catch (e) {
            console.warn("Could not save catalog customizations:", e);
        }
    }

    // 4-Tier Cross-Tab & Cross-Window Synchronization (Fully supports file:/// protocol)
    let lastCatalogSyncTs = localStorage.getItem(LS_VARS_CUSTOMIZATIONS_TS) || "";

    function syncCatalogIfUpdated() {
        try {
            const currentTs = localStorage.getItem(LS_VARS_CUSTOMIZATIONS_TS) || "";
            if (currentTs && currentTs !== lastCatalogSyncTs) {
                lastCatalogSyncTs = currentTs;
                loadCatalogCustomizations();
                if (typeof syncFormLabelsFromDictionary === "function") syncFormLabelsFromDictionary();
                if (typeof renderVarsDictionaryTable === "function") renderVarsDictionaryTable();
                if (typeof renderDocumentPreview === "function") renderDocumentPreview();
            }
        } catch(e) {}
    }

    // Tier 1: Storage event
    window.addEventListener("storage", (e) => {
        if (!e.key || e.key === LS_VARS_CUSTOMIZATIONS || e.key === LS_VARS_CUSTOMIZATIONS_TS) {
            loadCatalogCustomizations();
            if (typeof syncFormLabelsFromDictionary === "function") syncFormLabelsFromDictionary();
            if (typeof renderVarsDictionaryTable === "function") renderVarsDictionaryTable();
            if (typeof renderDocumentPreview === "function") renderDocumentPreview();
        }
    });

    // Tier 2: BroadcastChannel
    if (typeof BroadcastChannel !== "undefined") {
        try {
            const catalogBC = new BroadcastChannel("ho_so_catalog_channel");
            catalogBC.onmessage = (msg) => {
                if (msg.data && msg.data.type === "CATALOG_UPDATED") {
                    lastCatalogSyncTs = String(msg.data.ts || "");
                    loadCatalogCustomizations();
                    if (typeof syncFormLabelsFromDictionary === "function") syncFormLabelsFromDictionary();
                    if (typeof renderVarsDictionaryTable === "function") renderVarsDictionaryTable();
                    if (typeof renderDocumentPreview === "function") renderDocumentPreview();
                }
            };
        } catch(e) {}
    }

    // Tier 3: Window Focus & Visibility Change
    window.addEventListener("focus", syncCatalogIfUpdated);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) syncCatalogIfUpdated();
    });

    // Tier 4: Background Polling (every 800ms) for file:/// isolation
    setInterval(syncCatalogIfUpdated, 800);

    function resetCatalogToDefault() {
        showToast("Chức năng khôi phục mặc định đã được tắt để bảo vệ dữ liệu đang thiết lập!", "warning");
        return;
        if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ Danh mục Biến xạ về cấu hình chuẩn ban đầu? Mọi tùy chỉnh tên hoặc mã thẻ sẽ được đặt lại.")) {
            localStorage.removeItem(LS_VARS_CUSTOMIZATIONS);
            location.reload();
        }
    }

    // Attach event listeners for Edit Variable Modal
    const btnAddNewVarFromDict = document.getElementById("btnAddNewVarFromDict");
    if (btnAddNewVarFromDict) btnAddNewVarFromDict.onclick = () => openEditVariableModal(null);

    const btnResetVarsDefault = document.getElementById("btnResetVarsDefault");
    if (btnResetVarsDefault) btnResetVarsDefault.onclick = resetCatalogToDefault;

    const btnCloseEditVarModal = document.getElementById("btnCloseEditVarModal");
    if (btnCloseEditVarModal) btnCloseEditVarModal.onclick = closeEditVariableModal;

    const btnCancelEditVar = document.getElementById("btnCancelEditVar");
    if (btnCancelEditVar) btnCancelEditVar.onclick = closeEditVariableModal;
    const btnAutoSuggestTag = document.getElementById("btnAutoSuggestTag");
    if (btnAutoSuggestTag) btnAutoSuggestTag.onclick = autoSuggestTagFromLabel;


    const editVarTagInput = document.getElementById("editVarTagInput");
    if (editVarTagInput) editVarTagInput.oninput = validateVariableInputs;

    const editVarLabelInput = document.getElementById("editVarLabelInput");
    if (editVarLabelInput) editVarLabelInput.oninput = validateVariableInputs;

    const btnSaveEditVar = document.getElementById("btnSaveEditVar");
    if (btnSaveEditVar) btnSaveEditVar.onclick = saveVariableChanges;

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

    const modalEditVariable = document.getElementById("modalEditVariable");
    if (modalEditVariable) {
        setupSafeModalBackdropClose(modalEditVariable, closeEditVariableModal);
    }

    const ctxMenuEditVarTag = document.getElementById("ctxMenuEditVarTag");
    if (ctxMenuEditVarTag) {
        ctxMenuEditVarTag.onclick = (e) => {
            if (e) e.stopPropagation();
            document.getElementById("previewContextMenu")?.classList.add("hidden");

            let activeKey = null;
            if (lastSelectedSpan && lastSelectedSpan.getAttribute) {
                activeKey = lastSelectedSpan.getAttribute("data-var-key");
            }

            if (!activeKey && lastSelectedRange) {
                const parentSpan = lastSelectedRange.startContainer?.parentElement?.closest("[data-var-key]");
                if (parentSpan) activeKey = parentSpan.getAttribute("data-var-key");
            }

            if (!activeKey && lastSelectedText) {
                const cleanTxt = lastSelectedText.trim().toLowerCase();
                const matchedVar = MASTER_VARIABLES_CATALOG.find(v => 
                    (v.example && v.example.trim().toLowerCase() === cleanTxt) ||
                    (v.label && v.label.trim().toLowerCase() === cleanTxt)
                );
                if (matchedVar) {
                    activeKey = matchedVar.tag;
                } else {
                    const allData = typeof getMergedData === "function" ? getMergedData() : {};
                    for (const k in allData) {
                        if (allData[k] && String(allData[k]).trim().toLowerCase() === cleanTxt) {
                            activeKey = k;
                            break;
                        }
                    }
                }
                if (!activeKey) {
                    activeKey = slugifyToUpperSnake(lastSelectedText);
                }
            }

            openEditVariableModal(activeKey);
        };
    }

    window.openEditVariableModal = openEditVariableModal;
    window.closeEditVariableModal = closeEditVariableModal;

    window.exportStateToExcel = exportStateToExcel;
    
    function exportVarsCatalogToExcel() {
        if (typeof XLSX === "undefined") {
            showToast("Thư viện Excel (XLSX) chưa sẵn sàng!", "error");
            return;
        }

        try {
            const allVars = [...MASTER_VARIABLES_CATALOG];
            const selPkgIdx = varsPackageSelect ? parseInt(varsPackageSelect.value, 10) || 0 : 0;
            const mergedData = getMergedDataForPackage(selPkgIdx);
            const curPkg = appState?.packages ? appState.packages[selPkgIdx] : null;
            const pkgName = curPkg ? curPkg.name : "Gói thầu 1";

            const headers = [
                "STT",
                "Phân nhóm",
                "Mã thẻ chèn {TAG}",
                "Tên trường dữ liệu",
                "Phạm vi áp dụng",
                "Giá trị ví dụ / gợi ý",
                `Giá trị thực tế (${pkgName})`
            ];

            const rows = [headers];

            allVars.forEach((v, idx) => {
                const actualVal = v.isGeneral ? (appState?.generalInfo ? appState.generalInfo[v.tag] || "" : "") : (mergedData[v.tag] || "");
                rows.push([
                    idx + 1,
                    v.group || "J. Tùy biến bổ sung",
                    `{${v.tag}}`,
                    v.label || v.tag,
                    v.isGeneral ? "Tầng 1: Dùng chung dự án" : "Tầng 2 & 3: Riêng từng gói / VB",
                    v.example || "",
                    actualVal
                ]);
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(rows);

            ws["!cols"] = [
                { wch: 6 },
                { wch: 24 },
                { wch: 28 },
                { wch: 38 },
                { wch: 30 },
                { wch: 35 },
                { wch: 35 }
            ];

            XLSX.utils.book_append_sheet(wb, ws, "Danh mục biến xạ");

            const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            const fileName = `DanhMuc_BienXa_TongHop_${today}.xlsx`;
            XLSX.writeFile(wb, fileName);

            showToast(`Đã xuất tổng hợp ${allVars.length} biến xạ ra file Excel: ${fileName}!`, "success");
        } catch (err) {
            console.error("Lỗi xuất Excel danh mục biến xạ:", err);
            showToast("Có lỗi xảy ra khi xuất file Excel danh mục biến xạ!", "error");
        }
    }

    const btnExportVarsCatalogExcel = document.getElementById("btnExportVarsCatalogExcel");
    if (btnExportVarsCatalogExcel) {
        btnExportVarsCatalogExcel.onclick = exportVarsCatalogToExcel;
    }

    
    // -------------------------------------------------------------
    // Table Column Visibility & Resizing Controller
    // -------------------------------------------------------------
    const LS_DICT_COLS_VIS = "ho_so_vars_dict_col_vis";
    const LS_DICT_COLS_WIDTHS = "ho_so_vars_dict_col_widths";

    function applyColumnVisibility() {
        let colSettings = {};
        try {
            const saved = localStorage.getItem(LS_DICT_COLS_VIS);
            if (saved) colSettings = JSON.parse(saved);
        } catch(e) {}

        const defaultVis = {
            "col-stt": true,
            "col-tag": true,
            "col-label": true,
            "col-group": true,
            "col-scope": false,
            "col-val": true,
            "col-actions": true
        };

        const finalVis = Object.assign({}, defaultVis, colSettings);

        for (const colClass in finalVis) {
            const isVisible = finalVis[colClass];
            document.querySelectorAll(`#tableVarsDictionary th.${colClass}`).forEach(el => {
                if (isVisible) el.classList.remove("hidden");
                else el.classList.add("hidden");
            });
            document.querySelectorAll(`#varsDictionaryTableBody td.${colClass}`).forEach(el => {
                if (isVisible) el.classList.remove("hidden");
                else el.classList.add("hidden");
            });
            const chk = document.querySelector(`#dictColsDropdownMenu input[data-col="${colClass}"]`);
            if (chk) chk.checked = isVisible;
        }
    }

    function initTableColumnResizing() {
        const table = document.getElementById("tableVarsDictionary");
        if (!table) return;

        let savedWidths = {};
        try {
            const raw = localStorage.getItem(LS_DICT_COLS_WIDTHS);
            if (raw) savedWidths = JSON.parse(raw);
        } catch(e) {}

        const headers = table.querySelectorAll("thead th");
        headers.forEach(th => {
            const colClass = Array.from(th.classList).find(c => c.startsWith("col-"));
            if (colClass && savedWidths[colClass]) {
                th.style.width = savedWidths[colClass];
                th.style.minWidth = savedWidths[colClass];
            }

            const resizer = th.querySelector(".col-resizer");
            if (!resizer) return;

            let startX = 0;
            let startW = 0;

            const onMouseMove = (e) => {
                const diff = e.pageX - startX;
                const newW = Math.max(30, startW + diff);
                th.style.width = newW + "px";
                th.style.minWidth = newW + "px";
            };

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
                document.body.style.cursor = "";
                document.body.style.userSelect = "";

                if (colClass) {
                    savedWidths[colClass] = th.style.width;
                    try {
                        localStorage.setItem(LS_DICT_COLS_WIDTHS, JSON.stringify(savedWidths));
                    } catch(e) {}
                }
            };

            resizer.onmousedown = (e) => {
                e.preventDefault();
                e.stopPropagation();
                startX = e.pageX;
                startW = th.offsetWidth;
                document.body.style.cursor = "col-resize";
                document.body.style.userSelect = "none";
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            };
        });
    }

    // Attach Column Dropdown listeners
    const btnToggleDictColsDropdown = document.getElementById("btnToggleDictColsDropdown");
    const dictColsDropdownMenu = document.getElementById("dictColsDropdownMenu");

    if (btnToggleDictColsDropdown && dictColsDropdownMenu) {
        btnToggleDictColsDropdown.onclick = (e) => {
            e.stopPropagation();
            dictColsDropdownMenu.classList.toggle("hidden");
        };

        document.addEventListener("click", (e) => {
            if (!dictColsDropdownMenu.contains(e.target) && e.target !== btnToggleDictColsDropdown) {
                dictColsDropdownMenu.classList.add("hidden");
            }
        });

        dictColsDropdownMenu.querySelectorAll("input[data-col]").forEach(chk => {
            chk.onchange = () => {
                let colSettings = {};
                try {
                    const saved = localStorage.getItem(LS_DICT_COLS_VIS);
                    if (saved) colSettings = JSON.parse(saved);
                } catch(e) {}

                const col = chk.getAttribute("data-col");
                colSettings[col] = chk.checked;
                localStorage.setItem(LS_DICT_COLS_VIS, JSON.stringify(colSettings));
                applyColumnVisibility();
            };
        });
    }

    window.applyColumnVisibility = applyColumnVisibility;
    window.initTableColumnResizing = initTableColumnResizing;

    // Category Manager Modal Listeners
    const btnManageCategories = document.getElementById("btnManageCategories");
    const modalManageCategories = document.getElementById("modalManageCategories");
    const btnCloseManageCatsModal = document.getElementById("btnCloseManageCatsModal");
    const btnDoneManageCats = document.getElementById("btnDoneManageCats");
    const btnSubmitAddCategory = document.getElementById("btnSubmitAddCategory");
    const btnResetDefaultCategories = document.getElementById("btnResetDefaultCategories");

    if (btnManageCategories) btnManageCategories.addEventListener("click", openManageCategoriesModal);
    if (btnCloseManageCatsModal) btnCloseManageCatsModal.addEventListener("click", closeManageCategoriesModal);
    if (btnDoneManageCats) btnDoneManageCats.addEventListener("click", closeManageCategoriesModal);
    if (modalManageCategories) setupSafeModalBackdropClose(modalManageCategories, closeManageCategoriesModal);
    if (btnSubmitAddCategory) {
        btnSubmitAddCategory.addEventListener("click", () => {
            const keyInp = document.getElementById("inputNewCatKey");
            const nameInp = document.getElementById("inputNewCatName");
            if (addNewCategory(keyInp?.value, nameInp?.value)) {
                if (keyInp) keyInp.value = "";
                if (nameInp) nameInp.value = "";
            }
        });
    }
    if (btnResetDefaultCategories) btnResetDefaultCategories.addEventListener("click", resetDefaultCategories);

    window.openManageCategoriesModal = openManageCategoriesModal;
    window.closeManageCategoriesModal = closeManageCategoriesModal;
    window.deleteCategory = deleteCategory;
    window.addNewCategory = addNewCategory;
    window.updateCategoryName = updateCategoryName;
    window.getCurrentCategories = () => currentCategories;
    window.resetDefaultCategories = resetDefaultCategories;

    window.openVarsDictionaryModal = openVarsDictionaryModal;
    window.closeVarsDictionaryModal = closeVarsDictionaryModal;

    if (btnOpenVarsModal) btnOpenVarsModal.addEventListener("click", openVarsDictionaryModal);
    if (btnCloseVarsModal) btnCloseVarsModal.addEventListener("click", closeVarsDictionaryModal);
    if (btnFooterCloseVarsModal) btnFooterCloseVarsModal.addEventListener("click", closeVarsDictionaryModal);
    if (modalVarsDictionary) {
        setupSafeModalBackdropClose(modalVarsDictionary, closeVarsDictionaryModal);
    }
    if (varsSearchInput) {
        varsSearchInput.addEventListener("input", renderVarsDictionaryTable);
    }
    if (varsPackageSelect) {
        varsPackageSelect.addEventListener("change", renderVarsDictionaryTable);
    }

    const filterPills = document.querySelectorAll(".var-filter-pill");
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => {
                p.className = "var-filter-pill px-2 py-0.5 rounded-full font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors";
            });
            pill.className = "var-filter-pill px-2 py-0.5 rounded-full font-bold bg-slate-800 text-white cursor-pointer transition-colors";
            currentVarCatFilter = pill.getAttribute("data-cat");
            renderVarsDictionaryTable();
        });
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

    function base64ToUint8Array(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    
    async function getDocTemplateArrayBuffer(docObj) {
        if (!docObj) return null;
        let templateUrl = (docObj.templateFile !== undefined && docObj.templateFile !== "") 
            ? docObj.templateFile 
            : (prebuiltDocxMap[docObj.id] || "");

        let arrayBuffer = null;

        // 0. Kiểm tra mẫu tùy biến đã được chuẩn hóa & lưu từ Template Studio
        const docIdForCustom = docObj.id || docObj.code || "";
        const customStudioB64 = docIdForCustom 
            ? (localStorage.getItem("ho_so_custom_template_" + docIdForCustom) || (templateUrl ? localStorage.getItem("ho_so_custom_template_" + templateUrl) : null)) 
            : null;
        if (customStudioB64) {
            try {
                const bytes = base64ToUint8Array(customStudioB64);
                return bytes.buffer;
            } catch (e) {
                console.warn("Lỗi giải mã template tùy biến từ localStorage:", e);
            }
        }

        // Nếu văn bản chưa có file mẫu nào (thư mục chưa có file và chưa tạo trong Studio)
        if (!templateUrl || templateUrl.trim() === "") {
            return null;
        }

        // 1. Kiểm tra file mẫu tùy biến do người dùng upload trực tiếp
        if (window.customUploadedDocx && window.customUploadedDocx[templateUrl]) {
            arrayBuffer = window.customUploadedDocx[templateUrl];
        }

        // 2. Kiểm tra bộ mẫu có sẵn nhúng trực tiếp (Base64) - CHẠY 100% CẢ GIAO THỨC file:/// LẪN OFFLINE KHÔNG CẦN FETCH!
        if (!arrayBuffer && window.BUILTIN_DOCX_TEMPLATES) {
            let b64 = window.BUILTIN_DOCX_TEMPLATES[templateUrl];
            if (!b64) {
                const baseName = templateUrl.split("/").pop();
                const matchedKey = Object.keys(window.BUILTIN_DOCX_TEMPLATES).find(k => k.endsWith(baseName));
                if (matchedKey) b64 = window.BUILTIN_DOCX_TEMPLATES[matchedKey];
            }
            if (b64) {
                const bytes = base64ToUint8Array(b64);
                arrayBuffer = bytes.buffer;
            }
        }

        // 3. Fallback tải qua fetch nếu chạy trên web server (http / https)
        if (!arrayBuffer) {
            try {
                const response = await fetch(templateUrl);
                if (response.ok) {
                    arrayBuffer = await response.arrayBuffer();
                }
            } catch (err) {
                console.warn("fetch template failed:", err);
            }
        }

        return arrayBuffer;
    }

    async function renderDocxBlob(docId, replacements) {
        const allDocs = getAllDocsForCurrentType();
        const docObj = allDocs.find(d => d.id === docId);
        const arrayBuffer = await getDocTemplateArrayBuffer(docObj);

        if (!arrayBuffer) {
            throw new Error("Không thể nạp dữ liệu mẫu văn bản cho " + (docObj ? docObj.code : docId));
        }

        const zip = await JSZip.loadAsync(arrayBuffer);
        let docXml = await zip.file("word/document.xml").async("string");

        // Bước 1: Thay thế ngày tháng ở Header văn bản thành: "ngày dd tháng mm năm yyyy"
        const headerDateKeys = [
            "NGAY_TO_TRINH", "NGAY_QUYET_DINH", "NGAY_GIAY_MOI", "NGAY_BIEN_BAN",
            "NGAY_HOP_DONG", "NGAY_KY_HOP_DONG", "NGAY_BAO_CAO", "NGAY_NGHIEM_THU"
        ];
        for (const k of headerDateKeys) {
            const rawVal = replacements[k];
            if (rawVal) {
                const longDate = formatDateLongVN(rawVal);
                // Regex thay thế chuỗi ', ngày {{NGAY_...}}' hoặc ', ngày {NGAY_...}' trên dòng header
                const regHeader = new RegExp(`,\\s*ngày\\s*\\{+${k}\\}+`, 'gi');
                docXml = docXml.replace(regHeader, `, ${longDate}`);
            }
        }

        // Bước 2: Thay thế tất cả các biến xạ dạng bảng {BANG_...} thành bảng Word OpenXML <w:tbl>
        const allTableDefs = getAllTableDefinitions();
        for (const tableDef of allTableDefs) {
            const tag = tableDef.tag;
            const tableRows = (replacements && Array.isArray(replacements[tag]))
                ? replacements[tag]
                : getTableRowsForPackage(appState.activePackageIndex, tag);
            const tableXml = buildGenericDocxTableXml(tableDef, tableRows);

            // 2a. Nếu văn bản mẫu có hàng lặp {#BANG_...}...{/BANG_...}
            const regexRepeatRow = new RegExp(`<w:tr\\b[^>]*>(?:(?!<\\/w:tr>)[\\s\\S])*?\\{#${tag}\\}[\\s\\S]*?\\{/${tag}\\}[\\s\\S]*?<\\/w:tr>`, 'gi');
            if (regexRepeatRow.test(docXml)) {
                docXml = docXml.replace(regexRepeatRow, (matchedTr) => {
                    let cleanTemplateTr = matchedTr.replace(new RegExp(`\\{#${tag}\\}`, 'g'), '').replace(new RegExp(`\\{/${tag}\\}`, 'g'), '');
                    let generatedRows = "";
                    tableRows.forEach((item, idx) => {
                        let rowXml = cleanTemplateTr;
                        (tableDef.columns || []).forEach(col => {
                            let cellVal = "";
                            if (col.key === "stt") cellVal = String(item.stt || (idx + 1));
                            else if (col.type === "currency") cellVal = formatCurrencyVND(item[col.key] || 0);
                            else if (col.type === "calc_amount") {
                                const q = Number(item.so_luong) || 0;
                                const p = Number(item.don_gia) || 0;
                                cellVal = formatCurrencyVND(item.thanh_tien !== undefined ? Number(item.thanh_tien) : (q * p));
                            } else {
                                cellVal = escapeXml(String(item[col.key] || ""));
                            }
                            const upperKey = col.key.toUpperCase();
                            rowXml = rowXml.split(`{${upperKey}}`).join(cellVal);
                            rowXml = rowXml.split(`{{${upperKey}}}`).join(cellVal);
                        });
                        generatedRows += rowXml;
                    });
                    return generatedRows;
                });
            }

            // 2b. Nếu văn bản mẫu có tag {BANG_...} hoặc {{BANG_...}} (sinh trọn vẹn cả bảng OpenXML)
            const regexTablePara = new RegExp(`<w:p\\b[^>]*>(?:(?!<\\/w:p>)[\\s\\S])*?\\{+(?:${tag})\\}+[\\s\\S]*?<\\/w:p>`, 'gi');
            if (regexTablePara.test(docXml)) {
                docXml = docXml.replace(regexTablePara, tableXml);
            } else {
                docXml = docXml.split(`{{${tag}}}`).join(tableXml);
                docXml = docXml.split(`{${tag}}`).join(tableXml);
            }
        }

                // Bước 3: Thay thế toàn bộ biến xạ {{KEY}} và {KEY}
        for (const [key, rawVal] of Object.entries(replacements)) {
            if (key === "BANG_HANG_HOA") continue;
            const val = escapeXml(rawVal);
            const tag1 = `{{${key}}}`;
            const tag2 = `{${key}}`;

            docXml = docXml.split(tag1).join(val);
            docXml = docXml.split(tag2).join(val);
        }

        zip.file("word/document.xml", docXml);
        return await zip.generateAsync({ type: "blob" });
    }

    // Xuất toàn bộ văn bản trong quy trình vào DUY NHẤT 1 file Word (.docx), ngắt bằng Section Break (Next Page)
    async function renderMergedDocxBlob(docs, replacements) {
        if (!docs || docs.length === 0) {
            throw new Error("Không có văn bản nào trong quy trình để gộp.");
        }

        const firstBuf = await getDocTemplateArrayBuffer(docs[0]);
        if (!firstBuf) {
            throw new Error("Không thể nạp file mẫu ban đầu để khởi tạo tài liệu gộp.");
        }

        const baseZip = await JSZip.loadAsync(firstBuf);

        let combinedBodyXml = "";
        let finalSectPr = "";

        const headerDateKeys = [
            "NGAY_TO_TRINH", "NGAY_QUYET_DINH", "NGAY_GIAY_MOI", "NGAY_BIEN_BAN",
            "NGAY_HOP_DONG", "NGAY_KY_HOP_DONG", "NGAY_BAO_CAO", "NGAY_NGHIEM_THU"
        ];

        for (let i = 0; i < docs.length; i++) {
            const docObj = docs[i];
            const tmplBuf = await getDocTemplateArrayBuffer(docObj);
            if (!tmplBuf) continue;

            const currentZip = await JSZip.loadAsync(tmplBuf);
            let docXml = await currentZip.file("word/document.xml").async("string");

            // Thay thế ngày tháng Header
            for (const k of headerDateKeys) {
                const rawVal = replacements[k];
                if (rawVal) {
                    const longDate = formatDateLongVN(rawVal);
                    const regHeader = new RegExp(`,\\s*ngày\\s*\\{+${k}\\}+`, 'gi');
                    docXml = docXml.replace(regHeader, `, ${longDate}`);
                }
            }

            // Thay thế tất cả các biến xạ dạng bảng {BANG_...} thành bảng Word OpenXML <w:tbl>
            const allTableDefs = getAllTableDefinitions();
            for (const tableDef of allTableDefs) {
                const tag = tableDef.tag;
                const tableRows = (replacements && Array.isArray(replacements[tag]))
                    ? replacements[tag]
                    : getTableRowsForPackage(appState.activePackageIndex, tag);
                const tableXml = buildGenericDocxTableXml(tableDef, tableRows);

                const regexRepeatRow = new RegExp(`<w:tr\\b[^>]*>(?:(?!<\\/w:tr>)[\\s\\S])*?\\{#${tag}\\}[\\s\\S]*?\\{/${tag}\\}[\\s\\S]*?<\\/w:tr>`, 'gi');
                if (regexRepeatRow.test(docXml)) {
                    docXml = docXml.replace(regexRepeatRow, (matchedTr) => {
                        let cleanTemplateTr = matchedTr.replace(new RegExp(`\\{#${tag}\\}`, 'g'), '').replace(new RegExp(`\\{/${tag}\\}`, 'g'), '');
                        let generatedRows = "";
                        tableRows.forEach((item, idx) => {
                            let rowXml = cleanTemplateTr;
                            (tableDef.columns || []).forEach(col => {
                                let cellVal = "";
                                if (col.key === "stt") cellVal = String(item.stt || (idx + 1));
                                else if (col.type === "currency") cellVal = formatCurrencyVND(item[col.key] || 0);
                                else if (col.type === "calc_amount") {
                                    const q = Number(item.so_luong) || 0;
                                    const p = Number(item.don_gia) || 0;
                                    cellVal = formatCurrencyVND(item.thanh_tien !== undefined ? Number(item.thanh_tien) : (q * p));
                                } else {
                                    cellVal = escapeXml(String(item[col.key] || ""));
                                }
                                const upperKey = col.key.toUpperCase();
                                rowXml = rowXml.split(`{${upperKey}}`).join(cellVal);
                                rowXml = rowXml.split(`{{${upperKey}}}`).join(cellVal);
                            });
                            generatedRows += rowXml;
                        });
                        return generatedRows;
                    });
                }

                const regexTablePara = new RegExp(`<w:p\\b[^>]*>(?:(?!<\\/w:p>)[\\s\\S])*?\\{+(?:${tag})\\}+[\\s\\S]*?<\\/w:p>`, 'gi');
                if (regexTablePara.test(docXml)) {
                    docXml = docXml.replace(regexTablePara, tableXml);
                } else {
                    docXml = docXml.split(`{{${tag}}}`).join(tableXml);
                    docXml = docXml.split(`{${tag}}`).join(tableXml);
                }
            }

            // Thay thế toàn bộ biến xạ
            for (const [key, rawVal] of Object.entries(replacements)) {
                if (key === "BANG_HANG_HOA") continue;
                const val = escapeXml(rawVal);
                docXml = docXml.split(`{{${key}}}`).join(val);
                docXml = docXml.split(`{${key}}`).join(val);
            }

            // Trích xuất nội dung body và sectPr
            const startBodyTag = "<w:body>";
            const startBodyIdx = docXml.indexOf(startBodyTag);
            const endSectIdx = docXml.lastIndexOf("<w:sectPr");
            const endBodyIdx = docXml.lastIndexOf("</w:body>");

            if (startBodyIdx !== -1 && endSectIdx !== -1 && endBodyIdx !== -1) {
                const bodyContent = docXml.substring(startBodyIdx + startBodyTag.length, endSectIdx);
                let sectPr = docXml.substring(endSectIdx, endBodyIdx);

                if (!sectPr.includes("<w:type")) {
                    sectPr = sectPr.replace("<w:sectPr", '<w:sectPr><w:type w:val="nextPage"/>');
                }

                const isLast = (i === docs.length - 1);
                if (!isLast) {
                    // Chèn Section Break (Next Page) ở cuối mỗi văn bản
                    combinedBodyXml += bodyContent;
                    combinedBodyXml += `<w:p><w:pPr>${sectPr}</w:pPr></w:p>`;
                } else {
                    combinedBodyXml += bodyContent;
                    finalSectPr = sectPr;
                }
            }
        }

        if (!finalSectPr) {
            finalSectPr = '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1152" w:right="1008" w:bottom="1152" w:left="1584" w:header="720" w:footer="720" w:gutter="0"/><w:cols w:space="720"/><w:docGrid w:linePitch="360"/></w:sectPr>';
        }

        const baseXml = await baseZip.file("word/document.xml").async("string");
        const bodyStart = baseXml.indexOf("<w:body>");
        const headerPrefix = baseXml.substring(0, bodyStart + "<w:body>".length);

        const mergedXml = `${headerPrefix}${combinedBodyXml}${finalSectPr}</w:body></w:document>`;
        baseZip.file("word/document.xml", mergedXml);
        return await baseZip.generateAsync({ type: "blob" });
    }

    // Single Word Export Button

    // Bấm vào biến còn thiếu trên bản xem trước A4 sẽ nhảy ngay đến ô nhập liệu bên trái
    if (documentPreviewContent) {
        let placeholderClickTimer = null;
        documentPreviewContent.addEventListener("click", (e) => {
            const tag = e.target.closest(".placeholder-tag");
            if (!tag) return;
            const key = tag.getAttribute("data-missing-key") || tag.textContent.replace(/[{}]/g, "").trim();
            if (key) {
                clearTimeout(placeholderClickTimer);
                placeholderClickTimer = setTimeout(() => {
                    jumpToField(key);
                }, 250);
            }
        });

        // Double-click to highlight left field with red aura & directly edit in preview
        documentPreviewContent.addEventListener("dblclick", (e) => {
            clearTimeout(placeholderClickTimer);
            const varSpan = e.target.closest("[data-var-key]");
            if (varSpan) {
                e.preventDefault();
                e.stopPropagation();
                const varKey = varSpan.getAttribute("data-var-key");
                if (varKey) {
                    highlightFieldWithRedAura(varKey, { noFocus: true });
                }
                makeVariableInlineEditable(varSpan);
            }
        });
    }

        // Controllers for Document Quick Selector, Stepper, and All Docs Modal
        const docQuickSelector = document.getElementById("docQuickSelector");
        if (docQuickSelector) {
            docQuickSelector.addEventListener("change", (e) => {
                selectDocumentById(e.target.value);
            });
        }

        const btnPrevDoc = document.getElementById("btnPrevDoc");
        if (btnPrevDoc) {
            btnPrevDoc.addEventListener("click", () => {
                const docs = getAllDocsForCurrentType();
                const curIdx = docs.findIndex(d => d.id === appState.activeDocId);
                if (curIdx > 0) {
                    selectDocumentById(docs[curIdx - 1].id);
                }
            });
        }

        const btnNextDoc = document.getElementById("btnNextDoc");
        if (btnNextDoc) {
            btnNextDoc.addEventListener("click", () => {
                const docs = getAllDocsForCurrentType();
                const curIdx = docs.findIndex(d => d.id === appState.activeDocId);
                if (curIdx >= 0 && curIdx < docs.length - 1) {
                    selectDocumentById(docs[curIdx + 1].id);
                }
            });
        }

        // Horizontal Tabs Scroll Buttons
        const tabsWrapper = document.getElementById("docTypeTabsWrapper");
        const btnScrollTabsLeft = document.getElementById("btnScrollTabsLeft");
        const btnScrollTabsRight = document.getElementById("btnScrollTabsRight");
        if (btnScrollTabsLeft && tabsWrapper) {
            btnScrollTabsLeft.addEventListener("click", () => {
                tabsWrapper.scrollBy({ left: -200, behavior: "smooth" });
            });
        }
        if (btnScrollTabsRight && tabsWrapper) {
            btnScrollTabsRight.addEventListener("click", () => {
                tabsWrapper.scrollBy({ left: 200, behavior: "smooth" });
            });
        }

        // Quick Export Zip button on Preview Header (with Pre-Flight Quality Audit)
        const btnQuickExportZip = document.getElementById("btnQuickExportZip");
        if (btnQuickExportZip) {
            btnQuickExportZip.addEventListener("click", () => {
                const audit = runPreflightAudit({ showModal: false, scope: "all" });
                if (audit && (audit.missingCount > 0 || audit.errorCount > 0)) {
                    runPreflightAudit({ showModal: true, scope: "all" });
                } else {
                    const modal = document.getElementById("batchExportModal");
                    if (modal) modal.classList.remove("hidden");
                }
            });
        }

        // Modal: All Documents in Procedure Catalog
        function renderAllDocsCatalogModal() {
            const docs = getAllDocsForCurrentType();
            const procType = getCurrentProcurementType();
            const tbody = document.getElementById("modalAllDocsTableBody");
            const titleEl = document.getElementById("modalAllDocsTitle");
            const subtitleEl = document.getElementById("modalAllDocsSubtitle");
            const countEl = document.getElementById("modalAllDocsCount");
            if (!tbody) return;

            if (titleEl) titleEl.textContent = `Danh mục Văn bản: ${procType.name}`;
            if (subtitleEl) subtitleEl.textContent = `Thứ tự toàn bộ ${docs.length} văn bản / biểu mẫu trong quy trình này`;
            if (countEl) countEl.textContent = `Tổng số: ${docs.length} văn bản`;

            tbody.innerHTML = "";
            docs.forEach((doc, idx) => {
                const tr = document.createElement("tr");
                const isActive = doc.id === appState.activeDocId;
                tr.className = isActive ? "bg-emerald-50 font-semibold" : "hover:bg-slate-50";

                const hasTemplate = Boolean(doc.template || doc.templateUrl);
                tr.innerHTML = `
                    <td class="p-2 text-center text-slate-500 font-mono text-[11px]">${String(idx + 1).padStart(2, '0')}</td>
                    <td class="p-2 font-mono font-bold text-slate-800 text-[11px]">${doc.code}</td>
                    <td class="p-2">
                        <div class="text-slate-900 font-medium">${doc.name}</div>
                        ${doc.desc ? `<div class="text-[10px] text-slate-500">${doc.desc}</div>` : ''}
                    </td>
                    <td class="p-2 text-center">
                        ${hasTemplate 
                            ? `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] bg-emerald-100 text-emerald-800 font-medium"><i class="fa-solid fa-circle-check text-[9px]"></i> Đã có mẫu</span>`
                            : `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] bg-blue-100 text-blue-800 font-medium"><i class="fa-solid fa-wand-magic-sparkles text-[9px]"></i> Mẫu chuẩn</span>`
                        }
                    </td>
                    <td class="p-2 text-center">
                        <button type="button" class="btn-select-doc-from-modal px-2 py-1 text-[10.5px] rounded ${isActive ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300'} transition-all cursor-pointer" data-doc-id="${doc.id}">
                            ${isActive ? 'Đang xem' : 'Xem & Soạn'}
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            tbody.querySelectorAll(".btn-select-doc-from-modal").forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.getAttribute("data-doc-id");
                    selectDocumentById(id);
                    document.getElementById("modalAllDocsCatalog")?.classList.add("hidden");
                });
            });
        }

        const btnOpenAllDocsModal = document.getElementById("btnOpenAllDocsModal");
        const modalAllDocsCatalog = document.getElementById("modalAllDocsCatalog");
        const btnCloseAllDocsModal = document.getElementById("btnCloseAllDocsModal");
        const btnCloseAllDocsModalBtn = document.getElementById("btnCloseAllDocsModalBtn");
        const btnModalDownloadZip = document.getElementById("btnModalDownloadZip");

        if (btnOpenAllDocsModal && modalAllDocsCatalog) {
            btnOpenAllDocsModal.addEventListener("click", () => {
                renderAllDocsCatalogModal();
                modalAllDocsCatalog.classList.remove("hidden");
            });
        }
        if (btnCloseAllDocsModal && modalAllDocsCatalog) {
            btnCloseAllDocsModal.addEventListener("click", () => modalAllDocsCatalog.classList.add("hidden"));
        }
        if (btnCloseAllDocsModalBtn && modalAllDocsCatalog) {
            btnCloseAllDocsModalBtn.addEventListener("click", () => modalAllDocsCatalog.classList.add("hidden"));
        }
        if (btnModalDownloadZip) {
            btnModalDownloadZip.addEventListener("click", () => {
                modalAllDocsCatalog?.classList.add("hidden");
                document.getElementById("batchExportModal")?.classList.remove("hidden");
            });
        }

        const btnModalDownloadMergedDocx = document.getElementById("btnModalDownloadMergedDocx");
        if (btnModalDownloadMergedDocx) {
            btnModalDownloadMergedDocx.addEventListener("click", () => {
                modalAllDocsCatalog?.classList.add("hidden");
                const btnMerged = document.getElementById("btnExportMergedDocx");
                if (btnMerged) btnMerged.click();
            });
        }

        btnExportSingleDoc.addEventListener("click", async () => {
        const activeDoc = getCurrentActiveDoc();
        if (!activeDoc) return;

        if (!hasDocTemplate(activeDoc)) {
            showToast(`Văn bản "${activeDoc.name}" chưa có file mẫu .docx. Bạn hãy bấm "Tạo mẫu Studio" để thiết kế mẫu!`, "warning");
            return;
        }

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
            btnExportSingleDoc.innerHTML = `<i class="fa-solid fa-download"></i> <span>Tải Word (.docx)</span>`;
        }
    });

    const btnExportMergedDocx = document.getElementById("btnExportMergedDocx");
    if (btnExportMergedDocx) {
        btnExportMergedDocx.addEventListener("click", async () => {
            const allDocs = getAllDocsForCurrentType();
            if (!allDocs || allDocs.length === 0) {
                showToast("Không có văn bản nào trong quy trình để gộp!", "error");
                return;
            }

            const docsWithTemplate = allDocs.filter(d => hasDocTemplate(d));
            if (docsWithTemplate.length === 0) {
                showToast("Chưa có văn bản nào trong quy trình này có file mẫu .docx để gộp!", "warning");
                return;
            }
            if (docsWithTemplate.length < allDocs.length) {
                showToast(`Quy trình có ${docsWithTemplate.length}/${allDocs.length} văn bản có mẫu .docx. Đang gộp các văn bản đã có mẫu...`, "info");
            }

            const currentPkg = appState.packages[appState.activePackageIndex] || { name: "GoiThau" };
            const procType = getCurrentProcurementType();

            try {
                btnExportMergedDocx.disabled = true;
                btnExportMergedDocx.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-white"></i> <span>Đang gộp...</span>`;

                const data = getMergedData();
                const blob = await renderMergedDocxBlob(docsWithTemplate, data);

                const safeProcCode = (procType.code || "QuyTrinh").replace(/[^a-zA-Z0-9_-]/g, "_");
                const safePkgName = (currentPkg.name || "GoiThau").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_");
                const fileName = `Tron_bo_ho_so_${safeProcCode}_${safePkgName}.docx`;

                saveAs(blob, fileName);
                showToast(`Đã xuất 1 file Word trọn bộ (${docsWithTemplate.length} văn bản ngắt Section) thành công!`, "success");
            } catch (err) {
                console.error("Export merged docx error:", err);
                showToast("Lỗi khi xuất file Word gộp: " + err.message, "error");
            } finally {
                btnExportMergedDocx.disabled = false;
                btnExportMergedDocx.innerHTML = `<i class="fa-solid fa-file-word text-[11px]"></i> <span>Tải 1 File Gộp (Section)</span>`;
            }
        });
    }

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
        syncPackageProcurementTypeToPhase(newPkg, pCount - 1, true);
        appState.selectedRoadmapPackageIndex = pCount - 1;
        renderRoadmapUI();
        saveState();
        showToast("Đã bổ sung gói thầu mới và tạo danh mục thủ tục tự động!");
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

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Hàm so sánh tên theo thứ tự bảng chữ cái A-Z (bỏ số thứ tự ở đầu nếu có để xếp chuẩn theo chữ)
    function sortWorkflowAZ(a, b) {
        const cleanA = (a?.name || "").replace(/^\d+[\.\s\-]+/, '').trim();
        const cleanB = (b?.name || "").replace(/^\d+[\.\s\-]+/, '').trim();
        return cleanA.localeCompare(cleanB, 'vi', { sensitivity: 'base', numeric: true });
    }

    function getWorkflowTemplateFolder(item, category) {
        if (!item) return "";
        if (item.folder && item.folder.trim() !== "") {
            return item.folder.trim();
        }
        const cat = category || activeAdminCategory;
        const KNOWN_WORKFLOW_FOLDERS = {
            // 1. Hình thức Lựa chọn nhà thầu (LCNT)
            "duoi_50_trieu": "templates/Hinh_thuc_LCNT/Mua_sam_duoi_50tr",
            "duoi_100_trieu": "templates/Hinh_thuc_LCNT/Xay_dung_duoi_100tr",
            "chao_gia_han_che": "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_han_che",
            "chao_gia_rong_rai": "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_rong_rai",
            "chi_dinh_thau_rut_gon": "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon",
            "chi_dinh_thau_thong_thuong": "templates/Hinh_thuc_LCNT/Mua_sam_chao_gia_rong_rai",
            "dau_thau_rong_rai_hh_xl": "templates/Hinh_thuc_LCNT/Xay_dung_dau_thau_rong_rai_qua_mang",
            "dau_thau_rong_rai_qua_mang": "templates/Hinh_thuc_LCNT/Xay_dung_dau_thau_rong_rai_qua_mang",

            // 2. Quy trình Triển khai dự án
            "trien_khai_sua_chua": "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua",
            "trien_khai_mua_sam": "templates/Quy_trinh_trien_khai/Trien_khai_mua_sam",
            "trien_khai_dau_tu": "templates/Quy_trinh_trien_khai/Trien_khai_dau_tu"
        };

        if (KNOWN_WORKFLOW_FOLDERS[item.id]) {
            return KNOWN_WORKFLOW_FOLDERS[item.id];
        }

        const basePrefix = cat === "implementation" ? "templates/Quy_trinh_trien_khai" : "templates/Hinh_thuc_LCNT";
        const safeName = (item.code || item.id || "quy_trinh").replace(/[^a-zA-Z0-9_-]/g, "_");
        return `${basePrefix}/${safeName}`;
    }

    function getAbsoluteLocalPath(relPath) {
        if (!relPath) return "";
        const cleanRel = relPath.replace(/\//g, "\\");
        let driveBase = "I:\\My Drive\\APP\\Projects\\ho-so-tu-dong";
        try {
            if (window.location.protocol === "file:") {
                let pathname = decodeURIComponent(window.location.pathname);
                pathname = pathname.replace(/^\/([a-zA-Z]:)/, '$1').replace(/\/[^/]*$/, '').replace(/\//g, '\\');
                if (pathname) driveBase = pathname;
            }
        } catch (e) {}
        return `${driveBase}\\${cleanRel}`;
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

        // 1. Render Left Column List: Thon gọn, chỉ thể hiện tên, sắp xếp A-Z
        if (activeAdminCategory === "procurement") {
            const sortedList = [...PROCUREMENT_MATRIX.procurementTypes].sort(sortWorkflowAZ);
            if (!activeAdminTypeId || !sortedList.some(pt => pt.id === activeAdminTypeId)) {
                activeAdminTypeId = sortedList[0]?.id;
            }

            sortedList.forEach((pt) => {
                const card = document.createElement("div");
                const isActive = pt.id === activeAdminTypeId;
                const isDefault = DEFAULT_PROCUREMENT_MATRIX.procurementTypes.some(d => d.id === pt.id);

                card.className = isActive 
                    ? "group w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-50 text-emerald-950 font-bold border-l-3 border-emerald-600 border border-emerald-300 text-xs shadow-2xs transition-all cursor-pointer"
                    : "group w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-200 text-xs transition-all cursor-pointer";

                card.innerHTML = `
                    <div class="truncate flex-1 pr-1 text-left" title="${escapeHtml(pt.name)}">
                        ${escapeHtml(pt.name)}
                    </div>
                    <div class="flex items-center space-x-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" class="btn-clone-matrix-type text-slate-400 hover:text-indigo-600 p-0.5" title="Nhân bản quy trình">
                            <i class="fa-regular fa-copy text-[10px]"></i>
                        </button>
                        ${!isDefault ? `
                            <button type="button" class="btn-delete-matrix-type text-slate-400 hover:text-rose-600 p-0.5" title="Xóa quy trình">
                                <i class="fa-regular fa-trash-can text-[10px]"></i>
                            </button>
                        ` : ''}
                    </div>
                    ${isActive ? '<i class="fa-solid fa-chevron-right text-emerald-600 text-[9.5px] ml-1 shrink-0 group-hover:hidden"></i>' : ''}
                `;

                card.addEventListener("click", () => {
                    saveCurrentAdminInputs();
                    activeAdminTypeId = pt.id;
                    renderAdminMatrixModal();
                });

                card.querySelector('.btn-clone-matrix-type')?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    cloneProcurementWorkflow(pt.id);
                });

                card.querySelector('.btn-delete-matrix-type')?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    deleteProcurementWorkflow(pt.id);
                });

                matrixTypesList.appendChild(card);
            });
        } else {
            // Implementation Types
            const sortedList = [...IMPLEMENTATION_MATRIX.implementationTypes].sort(sortWorkflowAZ);
            if (!activeAdminImplTypeId || !sortedList.some(it => it.id === activeAdminImplTypeId)) {
                activeAdminImplTypeId = sortedList[0]?.id;
            }

            sortedList.forEach((it) => {
                const card = document.createElement("div");
                const isActive = it.id === activeAdminImplTypeId;
                const isDefault = DEFAULT_IMPLEMENTATION_MATRIX.implementationTypes.some(d => d.id === it.id);

                card.className = isActive 
                    ? "group w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-50 text-emerald-950 font-bold border-l-3 border-emerald-600 border border-emerald-300 text-xs shadow-2xs transition-all cursor-pointer"
                    : "group w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-200 text-xs transition-all cursor-pointer";

                card.innerHTML = `
                    <div class="truncate flex-1 pr-1 text-left" title="${escapeHtml(it.name)}">
                        ${escapeHtml(it.name)}
                    </div>
                    <div class="flex items-center space-x-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" class="btn-clone-matrix-type text-slate-400 hover:text-indigo-600 p-0.5" title="Nhân bản quy trình">
                            <i class="fa-regular fa-copy text-[10px]"></i>
                        </button>
                        ${!isDefault ? `
                            <button type="button" class="btn-delete-matrix-type text-slate-400 hover:text-rose-600 p-0.5" title="Xóa quy trình">
                                <i class="fa-regular fa-trash-can text-[10px]"></i>
                            </button>
                        ` : ''}
                    </div>
                    ${isActive ? '<i class="fa-solid fa-chevron-right text-emerald-600 text-[9.5px] ml-1 shrink-0 group-hover:hidden"></i>' : ''}
                `;

                card.addEventListener("click", () => {
                    saveCurrentAdminInputs();
                    activeAdminImplTypeId = it.id;
                    renderAdminMatrixModal();
                });

                card.querySelector('.btn-clone-matrix-type')?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    cloneImplementationWorkflow(it.id);
                });

                card.querySelector('.btn-delete-matrix-type')?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    deleteImplementationWorkflow(it.id);
                });

                matrixTypesList.appendChild(card);
            });
        }

        // 2. Render Right Column: Selected Type Info & Doc Templates Table
        const currentItem = getActiveAdminType();
        const matrixTypeNameInput = document.getElementById("matrixTypeNameInput");
        const matrixTypeCodeInput = document.getElementById("matrixTypeCodeInput");
        const matrixTypeLegalInput = document.getElementById("matrixTypeLegalInput");
        const matrixTypeFolderInput = document.getElementById("matrixTypeFolderInput");
        const matrixTypeLocalPathText = document.getElementById("matrixTypeLocalPathText");
        const adminFolderLabel = document.getElementById("adminFolderLabel");

        if (matrixTypeNameInput) matrixTypeNameInput.value = currentItem.name || "";
        if (matrixTypeCodeInput) matrixTypeCodeInput.value = currentItem.code || "";
        if (matrixTypeLegalInput) matrixTypeLegalInput.value = (activeAdminCategory === "procurement" ? currentItem.legalBasis : currentItem.description) || "";

        const currentFolder = getWorkflowTemplateFolder(currentItem, activeAdminCategory);
        if (matrixTypeFolderInput) matrixTypeFolderInput.value = currentItem.folder || currentFolder;
        if (matrixTypeLocalPathText) matrixTypeLocalPathText.textContent = getAbsoluteLocalPath(currentItem.folder || currentFolder);
        if (adminFolderLabel) {
            adminFolderLabel.innerHTML = activeAdminCategory === "procurement"
                ? '<i class="fa-solid fa-folder-open text-amber-500"></i><span>Đường dẫn thư mục chứa file mẫu (.docx) của Hình thức LCNT này</span>'
                : '<i class="fa-solid fa-folder-open text-amber-500"></i><span>Đường dẫn thư mục chứa file mẫu (.docx) của Quy trình Triển khai này</span>';
        }

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
            // Mẫu thuộc Quy trình triển khai sửa chữa
            { value: "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/01_To_trinh_KHLCNT.docx", label: "01_To_trinh_KHLCNT.docx (TK Sửa chữa)" },
            { value: "templates/Quy_trinh_trien_khai/Trien_khai_sua_chua/02_Quyet_dinh_KHLCNT.docx", label: "02_Quyet_dinh_KHLCNT.docx (TK Sửa chữa)" },
            // Mẫu thuộc Chỉ định thầu rút gọn
            { value: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/1_Giay_moi_tham_gia.docx", label: "1_Giay_moi_tham_gia.docx (CĐT Rút gọn)" },
            { value: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/2_Bien_ban_hoan_thien_hop_dong.docx", label: "2_Bien_ban_hoan_thien_hop_dong.docx (CĐT Rút gọn)" },
            { value: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/3_To_trinh_chi_dinh_thau.docx", label: "3_To_trinh_chi_dinh_thau.docx (CĐT Rút gọn)" },
            { value: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/4_Quyet_dinh_chi_dinh_thau.docx", label: "4_Quyet_dinh_chi_dinh_thau.docx (CĐT Rút gọn)" },
            { value: "templates/Hinh_thuc_LCNT/Xay_dung_chi_dinh_thau_rut_gon/07_Hop_dong_kinh_te.docx", label: "07_Hop_dong_kinh_te.docx (CĐT Rút gọn)" }
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
        const matrixTypeFolderInput = document.getElementById("matrixTypeFolderInput");

        if (matrixTypeNameInput) currentItem.name = matrixTypeNameInput.value.trim() || currentItem.name;
        if (matrixTypeCodeInput) currentItem.code = matrixTypeCodeInput.value.trim();
        if (matrixTypeFolderInput) currentItem.folder = matrixTypeFolderInput.value.trim();
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

    const btnCopyMatrixFolder = document.getElementById("btnCopyMatrixFolder");
    if (btnCopyMatrixFolder) {
        btnCopyMatrixFolder.addEventListener("click", () => {
            const matrixTypeFolderInput = document.getElementById("matrixTypeFolderInput");
            const rel = matrixTypeFolderInput ? matrixTypeFolderInput.value.trim() : "";
            const abs = getAbsoluteLocalPath(rel);
            const copyText = abs || rel;
            if (!copyText) return;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(copyText).then(() => {
                    showToast(`Đã sao chép đường dẫn: ${copyText}`, "success");
                }).catch(() => {
                    fallbackCopyPath(copyText);
                });
            } else {
                fallbackCopyPath(copyText);
            }
        });
    }

    function fallbackCopyPath(text) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast(`Đã sao chép đường dẫn: ${text}`, "success");
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

            // KHÔNG THOÁT BẢNG: Cập nhật lại giao diện modal ngay lập tức để người dùng tiếp tục thao tác
            renderAdminMatrixModal();

            // Hiệu ứng phản hồi trực quan trên nút Lưu
            const origHtml = btnSaveMatrixSettings.innerHTML;
            btnSaveMatrixSettings.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-200"></i><span>✓ Đã lưu thành công!</span>';
            btnSaveMatrixSettings.classList.add("bg-emerald-700");
            setTimeout(() => {
                btnSaveMatrixSettings.innerHTML = origHtml;
                btnSaveMatrixSettings.classList.remove("bg-emerald-700");
            }, 1800);

            showToast("✓ Đã lưu và áp dụng cấu hình ma trận thành công! (Bảng tiếp tục mở để bạn chỉnh sửa)", "success");
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

    // =============================================================
    // WORKFLOW CLONE & DELETE CONTROLLERS (1-CLICK & SAFE REMOVAL)
    // =============================================================
    function cloneProcurementWorkflow(typeId) {
        saveCurrentAdminInputs();
        const src = PROCUREMENT_MATRIX.procurementTypes.find(t => t.id === typeId);
        if (!src) return;
        const newId = `hinh_thuc_clone_${Date.now()}`;
        const cloned = JSON.parse(JSON.stringify(src));
        cloned.id = newId;
        cloned.name = `${cloned.name} (Bản sao)`;
        cloned.code = `${cloned.code || 'CLONE'}_COPY`;
        // Generate distinct IDs for documents so templates don't conflict
        (cloned.phases || []).forEach((ph, pIdx) => {
            ph.phaseId = `ph_clone_${Date.now()}_${pIdx}`;
            (ph.documents || []).forEach((doc, dIdx) => {
                const oldDocId = doc.id;
                const newDocId = `doc_clone_${Date.now()}_${pIdx}_${dIdx}`;
                doc.id = newDocId;
                // Copy custom template if present
                try {
                    const customTpl = localStorage.getItem(`ho_so_custom_template_${oldDocId}`);
                    if (customTpl) {
                        localStorage.setItem(`ho_so_custom_template_${newDocId}`, customTpl);
                    }
                } catch(e) {}
            });
        });
        PROCUREMENT_MATRIX.procurementTypes.push(cloned);
        try {
            localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(PROCUREMENT_MATRIX));
            window.dispatchEvent(new Event("storage"));
        } catch(e) {}
        activeAdminTypeId = newId;
        initProcurementTypeSelector();
        renderAdminMatrixModal();
        showToast(`Đã nhân bản quy trình thành "${cloned.name}"!`, "success");
    }

    function deleteProcurementWorkflow(typeId) {
        const idx = PROCUREMENT_MATRIX.procurementTypes.findIndex(t => t.id === typeId);
        if (idx === -1) return;
        const target = PROCUREMENT_MATRIX.procurementTypes[idx];
        if (!confirm(`Bạn có chắc chắn muốn xóa quy trình "${target.name}" không?`)) return;
        PROCUREMENT_MATRIX.procurementTypes.splice(idx, 1);
        try {
            localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(PROCUREMENT_MATRIX));
            window.dispatchEvent(new Event("storage"));
        } catch(e) {}
        activeAdminTypeId = PROCUREMENT_MATRIX.procurementTypes[0]?.id || "";
        initProcurementTypeSelector();
        renderAdminMatrixModal();
        showToast(`Đã xóa quy trình "${target.name}"!`, "info");
    }

    function cloneImplementationWorkflow(typeId) {
        saveCurrentAdminInputs();
        const src = IMPLEMENTATION_MATRIX.implementationTypes.find(t => t.id === typeId);
        if (!src) return;
        const newId = `trien_khai_clone_${Date.now()}`;
        const cloned = JSON.parse(JSON.stringify(src));
        cloned.id = newId;
        cloned.name = `${cloned.name} (Bản sao)`;
        cloned.code = `${cloned.code || 'TK'}_COPY`;
        (cloned.documents || []).forEach((doc, dIdx) => {
            const oldDocId = doc.id;
            const newDocId = `tk_clone_${Date.now()}_${dIdx}`;
            doc.id = newDocId;
            try {
                const customTpl = localStorage.getItem(`ho_so_custom_template_${oldDocId}`);
                if (customTpl) {
                    localStorage.setItem(`ho_so_custom_template_${newDocId}`, customTpl);
                }
            } catch(e) {}
        });
        IMPLEMENTATION_MATRIX.implementationTypes.push(cloned);
        try {
            localStorage.setItem("ho_so_tu_dong_implementation_matrix", JSON.stringify(IMPLEMENTATION_MATRIX));
            window.dispatchEvent(new Event("storage"));
        } catch(e) {}
        activeAdminImplTypeId = newId;
        renderAdminMatrixModal();
        showToast(`Đã nhân bản quy trình triển khai thành "${cloned.name}"!`, "success");
    }

    function deleteImplementationWorkflow(typeId) {
        const idx = IMPLEMENTATION_MATRIX.implementationTypes.findIndex(t => t.id === typeId);
        if (idx === -1) return;
        const target = IMPLEMENTATION_MATRIX.implementationTypes[idx];
        if (!confirm(`Bạn có chắc chắn muốn xóa quy trình "${target.name}" không?`)) return;
        IMPLEMENTATION_MATRIX.implementationTypes.splice(idx, 1);
        try {
            localStorage.setItem("ho_so_tu_dong_implementation_matrix", JSON.stringify(IMPLEMENTATION_MATRIX));
            window.dispatchEvent(new Event("storage"));
        } catch(e) {}
        activeAdminImplTypeId = IMPLEMENTATION_MATRIX.implementationTypes[0]?.id || "";
        renderAdminMatrixModal();
        showToast(`Đã xóa quy trình "${target.name}"!`, "info");
    }

    // =============================================================
    // SMART WORKFLOW GENERATOR CONTROLLER (DROP-TO-WORKFLOW)
    // =============================================================
    function smartParseDocFileName(filename, index = 0) {
        let clean = (filename || "").replace(/\.(docx|doc)$/i, "").trim();
        let numStr = "";
        let rest = clean;
        const numMatch = clean.match(/^([0-9]{1,2})[\.\s_\-]+(.*)$/);
        if (numMatch) {
            numStr = numMatch[1].padStart(2, '0');
            rest = numMatch[2].trim();
        } else {
            numStr = String(index + 1).padStart(2, '0');
        }

        let words = rest.replace(/[\_\-]+/g, ' ').trim();
        const lower = words.toLowerCase();
        let codeType = "VB";
        if (lower.includes("to trinh") || lower.includes("tờ trình") || lower.startsWith("ttr")) {
            codeType = "TTr";
        } else if (lower.includes("quyet dinh") || lower.includes("quyết định") || lower.startsWith("qd") || lower.startsWith("qđ")) {
            codeType = "QĐ";
        } else if (lower.includes("bien ban") || lower.includes("biên bản") || lower.startsWith("bb")) {
            codeType = "BB";
        } else if (lower.includes("hop dong") || lower.includes("hợp đồng") || lower.startsWith("hd") || lower.startsWith("hđ")) {
            codeType = "HĐ";
        } else if (lower.includes("bao cao") || lower.includes("báo cáo") || lower.startsWith("bc")) {
            codeType = "BC";
        } else if (lower.includes("thong bao") || lower.includes("thông báo") || lower.startsWith("tb")) {
            codeType = "TB";
        } else if (lower.includes("giay moi") || lower.includes("giấy mời") || lower.startsWith("gm")) {
            codeType = "GM";
        } else if (lower.includes("thu moi") || lower.includes("thư mời")) {
            codeType = "TM";
        }

        let displayName = words;
        if (displayName.length > 0) {
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }
        if (!displayName.startsWith(numStr)) {
            displayName = `${numStr}. ${displayName}`;
        }

        const docCode = `${numStr}.${codeType}`;
        return {
            order: parseInt(numStr, 10) || (index + 1),
            numStr: numStr,
            code: docCode,
            name: displayName
        };
    }

    let smartWorkflowFilesDraft = [];

    const modalSmartWorkflowFromFiles = document.getElementById("modalSmartWorkflowFromFiles");
    const btnOpenSmartWorkflowModal = document.getElementById("btnOpenSmartWorkflowModal");
    const btnCloseSmartWfModal = document.getElementById("btnCloseSmartWfModal");
    const btnCancelSmartWfModal = document.getElementById("btnCancelSmartWfModal");
    const smartWfDropZone = document.getElementById("smartWfDropZone");
    const inputSmartWorkflowFiles = document.getElementById("inputSmartWorkflowFiles");
    const smartWfCategory = document.getElementById("smartWfCategory");
    const smartWfNameInput = document.getElementById("smartWfNameInput");
    const smartWfCodeInput = document.getElementById("smartWfCodeInput");
    const smartWfDescInput = document.getElementById("smartWfDescInput");
    const smartWfDocCountBadge = document.getElementById("smartWfDocCountBadge");
    const btnClearSmartWfList = document.getElementById("btnClearSmartWfList");
    const smartWfDocsTableBody = document.getElementById("smartWfDocsTableBody");
    const btnSubmitSmartWorkflow = document.getElementById("btnSubmitSmartWorkflow");

    function openSmartWorkflowModal() {
        smartWorkflowFilesDraft = [];
        if (smartWfNameInput) smartWfNameInput.value = "";
        if (smartWfCodeInput) smartWfCodeInput.value = "";
        if (smartWfDescInput) smartWfDescInput.value = "";
        if (smartWfCategory) smartWfCategory.value = activeAdminCategory || "procurement";
        renderSmartWfDraftTable();
        if (modalSmartWorkflowFromFiles) modalSmartWorkflowFromFiles.classList.remove("hidden");
    }

    function closeSmartWorkflowModal() {
        if (modalSmartWorkflowFromFiles) modalSmartWorkflowFromFiles.classList.add("hidden");
        smartWorkflowFilesDraft = [];
    }

    function renderSmartWfDraftTable() {
        if (!smartWfDocsTableBody) return;
        smartWfDocsTableBody.innerHTML = "";

        if (smartWfDocCountBadge) {
            smartWfDocCountBadge.textContent = `${smartWorkflowFilesDraft.length} file`;
        }

        if (btnSubmitSmartWorkflow) {
            btnSubmitSmartWorkflow.disabled = smartWorkflowFilesDraft.length === 0;
        }

        if (smartWorkflowFilesDraft.length === 0) {
            smartWfDocsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="p-4 text-center text-slate-400 italic text-[11px]">
                        Chưa có file nào. Hãy kéo thả hoặc bấm vào ô trên để nạp các file Word (.docx) vào hệ thống.
                    </td>
                </tr>
            `;
            return;
        }

        smartWorkflowFilesDraft.forEach((item, idx) => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-slate-50 border-b border-slate-100 transition-colors";
            tr.innerHTML = `
                <td class="py-1 px-2 text-center font-bold text-slate-500 font-mono">${idx + 1}</td>
                <td class="py-1 px-2">
                    <input type="text" class="w-full text-xs font-bold font-mono text-indigo-900 bg-white border border-slate-300 rounded px-1.5 py-0.5 focus:ring-1 focus:ring-indigo-500 doc-draft-code" value="${escapeHtml(item.code)}">
                </td>
                <td class="py-1 px-2">
                    <input type="text" class="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded px-1.5 py-0.5 focus:ring-1 focus:ring-indigo-500 doc-draft-name" value="${escapeHtml(item.name)}">
                </td>
                <td class="py-1 px-2">
                    <div class="flex items-center gap-1.5 text-slate-600 truncate" title="${escapeHtml(item.fileName)}">
                        <i class="fa-regular fa-file-word text-blue-600 text-xs"></i>
                        <span class="truncate font-mono text-[10.5px]">${escapeHtml(item.fileName)}</span>
                        <span class="text-[9.5px] text-slate-400 shrink-0">(${Math.round(item.fileSize / 1024)} KB)</span>
                    </div>
                </td>
                <td class="py-1 px-2 text-center">
                    <button type="button" class="btn-remove-draft text-slate-400 hover:text-rose-600 cursor-pointer p-1" title="Xóa file này khỏi danh sách">
                        <i class="fa-regular fa-trash-can text-xs"></i>
                    </button>
                </td>
            `;

            tr.querySelector(".doc-draft-code")?.addEventListener("input", (e) => {
                item.code = e.target.value;
            });
            tr.querySelector(".doc-draft-name")?.addEventListener("input", (e) => {
                item.name = e.target.value;
            });
            tr.querySelector(".btn-remove-draft")?.addEventListener("click", () => {
                smartWorkflowFilesDraft.splice(idx, 1);
                renderSmartWfDraftTable();
            });

            smartWfDocsTableBody.appendChild(tr);
        });
    }

    async function handleSmartWfFilesAdded(files) {
        if (!files || files.length === 0) return;
        const validFiles = Array.from(files).filter(f => /\.(docx|doc)$/i.test(f.name));
        if (validFiles.length === 0) {
            alert("Vui lòng chọn các file định dạng Word (.docx hoặc .doc)!");
            return;
        }

        // Sort files naturally by filename so 01, 02, 03... are ordered correctly
        validFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

        for (let i = 0; i < validFiles.length; i++) {
            const f = validFiles[i];
            const parsed = smartParseDocFileName(f.name, smartWorkflowFilesDraft.length);
            
            // Read file as Base64 DataURL
            const base64Promise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(f);
            });

            const base64 = await base64Promise;

            smartWorkflowFilesDraft.push({
                file: f,
                fileName: f.name,
                fileSize: f.size,
                code: parsed.code,
                name: parsed.name,
                order: parsed.order,
                base64: base64
            });
        }

        // Auto suggest workflow name if still empty
        if (smartWfNameInput && !smartWfNameInput.value.trim() && smartWorkflowFilesDraft.length > 0) {
            smartWfNameInput.value = `Quy trình ${smartWorkflowFilesDraft.length} bước (${smartWorkflowFilesDraft[0].name.replace(/^[0-9\.\s]+/, '')})`;
        }
        if (smartWfCodeInput && !smartWfCodeInput.value.trim()) {
            smartWfCodeInput.value = `QT_${Date.now().toString().slice(-4)}`;
        }

        renderSmartWfDraftTable();
    }

    if (btnOpenSmartWorkflowModal) {
        btnOpenSmartWorkflowModal.addEventListener("click", openSmartWorkflowModal);
    }
    if (btnCloseSmartWfModal) {
        btnCloseSmartWfModal.addEventListener("click", closeSmartWorkflowModal);
    }
    if (btnCancelSmartWfModal) {
        btnCancelSmartWfModal.addEventListener("click", closeSmartWorkflowModal);
    }
    if (btnClearSmartWfList) {
        btnClearSmartWfList.addEventListener("click", () => {
            smartWorkflowFilesDraft = [];
            renderSmartWfDraftTable();
        });
    }

    if (smartWfDropZone) {
        smartWfDropZone.addEventListener("click", () => {
            if (inputSmartWorkflowFiles) inputSmartWorkflowFiles.click();
        });

        smartWfDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            smartWfDropZone.classList.add("border-indigo-500", "bg-indigo-100/60");
        });
        smartWfDropZone.addEventListener("dragleave", (e) => {
            e.preventDefault();
            smartWfDropZone.classList.remove("border-indigo-500", "bg-indigo-100/60");
        });
        smartWfDropZone.addEventListener("drop", async (e) => {
            e.preventDefault();
            smartWfDropZone.classList.remove("border-indigo-500", "bg-indigo-100/60");
            if (e.dataTransfer && e.dataTransfer.files) {
                await handleSmartWfFilesAdded(e.dataTransfer.files);
            }
        });
    }

    if (inputSmartWorkflowFiles) {
        inputSmartWorkflowFiles.addEventListener("change", async (e) => {
            if (e.target.files) {
                await handleSmartWfFilesAdded(e.target.files);
                e.target.value = "";
            }
        });
    }

    if (btnSubmitSmartWorkflow) {
        btnSubmitSmartWorkflow.addEventListener("click", () => {
            const wfName = (smartWfNameInput?.value || "").trim();
            if (!wfName) {
                alert("Vui lòng nhập tên quy trình!");
                smartWfNameInput?.focus();
                return;
            }
            if (smartWorkflowFilesDraft.length === 0) {
                alert("Vui lòng nạp ít nhất 1 file Word mẫu!");
                return;
            }

            const category = smartWfCategory?.value || "procurement";
            const wfCode = (smartWfCodeInput?.value || "").trim() || "QT_MOI";
            const wfDesc = (smartWfDescInput?.value || "").trim() || "Quy trình thiết lập tự động từ chùm file Word mẫu";
            const timestamp = Date.now();

            if (category === "procurement") {
                const newId = `hinh_thuc_auto_${timestamp}`;
                const newWf = {
                    id: newId,
                    name: wfName,
                    code: wfCode,
                    badge: `${smartWorkflowFilesDraft.length} văn bản`,
                    badgeColor: "indigo",
                    legalBasis: wfDesc,
                    desc: wfDesc,
                    phases: [
                        {
                            phaseId: `phase_auto_${timestamp}`,
                            phaseName: "Danh mục hồ sơ quy trình",
                            documents: smartWorkflowFilesDraft.map((item, idx) => ({
                                id: `doc_auto_${timestamp}_${idx}`,
                                code: item.code,
                                name: item.name,
                                desc: `Mẫu văn bản tải từ ${item.fileName}`,
                                templateFile: item.fileName
                            }))
                        }
                    ]
                };

                // Store uploaded Word base64 into localStorage
                smartWorkflowFilesDraft.forEach((item, idx) => {
                    const docId = newWf.phases[0].documents[idx].id;
                    if (item.base64) {
                        try {
                            localStorage.setItem(`ho_so_custom_template_${docId}`, item.base64);
                        } catch(e) {
                            console.error("Storage error:", e);
                        }
                    }
                });

                PROCUREMENT_MATRIX.procurementTypes.push(newWf);
                try {
                    localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(PROCUREMENT_MATRIX));
                    window.dispatchEvent(new Event("storage"));
                } catch(e) {}

                activeAdminCategory = "procurement";
                activeAdminTypeId = newId;
                if (typeof appState !== "undefined") {
                    appState.selectedProcurementTypeId = newId;
                }
            } else {
                const newId = `trien_khai_auto_${timestamp}`;
                const newWf = {
                    id: newId,
                    name: wfName,
                    code: wfCode,
                    description: wfDesc,
                    documents: smartWorkflowFilesDraft.map((item, idx) => ({
                        id: `tk_auto_${timestamp}_${idx}`,
                        code: item.code,
                        name: item.name,
                        signer: "Đơn vị thực hiện",
                        duration: 1,
                        dateFormula: { type: idx === 0 ? "manual" : "default" },
                        defaultDate: idx === 0 ? "2026-01-12" : "",
                        docNo: `${item.code}/VB`,
                        templateFile: item.fileName
                    }))
                };

                smartWorkflowFilesDraft.forEach((item, idx) => {
                    const docId = newWf.documents[idx].id;
                    if (item.base64) {
                        try {
                            localStorage.setItem(`ho_so_custom_template_${docId}`, item.base64);
                        } catch(e) {
                            console.error("Storage error:", e);
                        }
                    }
                });

                IMPLEMENTATION_MATRIX.implementationTypes.push(newWf);
                try {
                    localStorage.setItem("ho_so_tu_dong_implementation_matrix", JSON.stringify(IMPLEMENTATION_MATRIX));
                    window.dispatchEvent(new Event("storage"));
                } catch(e) {}

                activeAdminCategory = "implementation";
                activeAdminImplTypeId = newId;
                if (typeof appState !== "undefined" && appState.projectRoadmap) {
                    appState.projectRoadmap.implementationTypeId = newId;
                    applyImplementationTypeToRoadmap(newId, false);
                    recalculateAllTaskDates(false, true);
                }
            }

            closeSmartWorkflowModal();
            initProcurementTypeSelector();
            renderRoadmapUI();
            renderDocTabs();
            renderDocumentPreview();
            renderAdminMatrixModal();

            showToast(`⚡ Đã thiết lập xong quy trình "${wfName}" gồm ${smartWorkflowFilesDraft.length} mẫu văn bản!`, "success");
        });
    }

    // Expose helpers for automation & testing
    window.syncFormLabelsFromDictionary = syncFormLabelsFromDictionary;
    window.smartParseDocFileName = smartParseDocFileName;
    window.cloneProcurementWorkflow = cloneProcurementWorkflow;
    window.deleteProcurementWorkflow = deleteProcurementWorkflow;
    window.cloneImplementationWorkflow = cloneImplementationWorkflow;
    window.deleteImplementationWorkflow = deleteImplementationWorkflow;
    window.openSmartWorkflowModal = openSmartWorkflowModal;
    window.closeSmartWorkflowModal = closeSmartWorkflowModal;
    window.renderSmartWfDraftTable = renderSmartWfDraftTable;
    window.getSmartWorkflowFilesDraft = () => smartWorkflowFilesDraft;
    window.setSmartWorkflowFilesDraft = (files) => { smartWorkflowFilesDraft = files; };
    window.handleSmartWfFilesAdded = handleSmartWfFilesAdded;


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

        // Backward-compatibility aliases for table editor
    function renderTableEditor() {
        if (typeof renderDictTableView === "function") renderDictTableView();
    }
    function addTableRow() {
        const rows = getTableRowsForPackage(appState.activePackageIndex, "BANG_HANG_HOA");
        rows.push({ stt: rows.length + 1, ten_hang: "", dvt: "Bộ", so_luong: 1, don_gia: 0, thanh_tien: 0, ghi_chu: "" });
        saveState();
        renderDocumentPreview();
        if (typeof renderDictTableView === "function") renderDictTableView();
    }
    function deleteTableRow(idx) {
        const rows = getTableRowsForPackage(appState.activePackageIndex, "BANG_HANG_HOA");
        if (idx >= 0 && idx < rows.length) {
            rows.splice(idx, 1);
            rows.forEach((r, i) => { r.stt = i + 1; });
            saveState();
            renderDocumentPreview();
            if (typeof renderDictTableView === "function") renderDictTableView();
        }
    }
    function clearAllTableRows() {
        const curPkg = appState.packages[appState.activePackageIndex];
        if (curPkg && curPkg.tableData) {
            curPkg.tableData["BANG_HANG_HOA"] = [];
            saveState();
            renderDocumentPreview();
            if (typeof renderDictTableView === "function") renderDictTableView();
        }
    }
    function syncTableToPrices() {
        const rows = getTableRowsForPackage(appState.activePackageIndex, "BANG_HANG_HOA");
        let sum = 0;
        rows.forEach(r => {
            const q = Number(r.so_luong) || 0;
            const p = Number(r.don_gia) || 0;
            sum += (r.thanh_tien !== undefined ? Number(r.thanh_tien) : (q * p));
        });
        const totalStr = formatCurrencyVND(sum);
        const totalWords = readVietnameseCurrency(sum);
        const curPkg = appState.packages[appState.activePackageIndex];
        if (curPkg && curPkg.fields) {
            curPkg.fields["GIA_GOI_THAU_SO"] = totalStr;
            curPkg.fields["GIA_GOI_THAU_CHU"] = totalWords;
            curPkg.fields["GIA_TRI_HOP_DONG_SO"] = totalStr;
            curPkg.fields["GIA_TRI_HOP_DONG_CHU"] = totalWords;
            saveState();
            renderDocumentPreview();
        }
    }

    // Expose helpers globally for testing or inline onclicks
    
    // =============================================================
    // Event Listeners for Table Variables Editor & Excel Paste Modal
    // =============================================================
    const btnAddTableRow = document.getElementById("btnAddTableRow");
    if (btnAddTableRow) {
        btnAddTableRow.addEventListener("click", addTableRow);
    }

    const btnClearTableRows = document.getElementById("btnClearTableRows");
    if (btnClearTableRows) {
        btnClearTableRows.addEventListener("click", clearAllTableRows);
    }

    const btnSyncTableToPrice = document.getElementById("btnSyncTableToPrice");
    if (btnSyncTableToPrice) {
        btnSyncTableToPrice.addEventListener("click", syncTableToPrices);
    }

    // Input changes inside table editor body
    const tblGoodsItemsBody = document.getElementById("tblGoodsItemsBody");
    if (tblGoodsItemsBody) {
        tblGoodsItemsBody.addEventListener("input", (e) => {
            const input = e.target.closest("input[data-col]");
            if (!input) return;
            const rowIdx = parseInt(input.getAttribute("data-row-idx"), 10);
            const col = input.getAttribute("data-col");
            const tableData = getTableDataForActivePackage();
            const item = tableData[rowIdx];
            if (!item) return;

            let val = input.value;
            if (col === "so_luong") {
                item.so_luong = Number(val) || 0;
            } else if (col === "don_gia") {
                const rawNum = Number(val.replace(/[^\d.-]/g, "")) || 0;
                item.don_gia = rawNum;
            } else {
                item[col] = val;
            }

            // Recalculate line total
            const qty = Number(item.so_luong) || 0;
            const price = Number(item.don_gia) || 0;
            item.thanh_tien = qty * price;

            // Update row's displayed total
            const tr = input.closest("tr");
            if (tr) {
                const totalCell = tr.querySelector("td.text-emerald-700");
                if (totalCell) totalCell.textContent = formatCurrencyVND(item.thanh_tien);
            }

            // Update overall summary
            let overallTotal = 0;
            tableData.forEach(it => {
                const q = Number(it.so_luong) || 0;
                const p = Number(it.don_gia) || 0;
                overallTotal += (it.thanh_tien !== undefined ? Number(it.thanh_tien) : (q * p));
            });
            const totalEl = document.getElementById("tableSummaryTotalFormatted");
            if (totalEl) totalEl.textContent = formatCurrencyVND(overallTotal) + " VNĐ";
            const wordsEl = document.getElementById("tableSummaryInWords");
            if (wordsEl) wordsEl.textContent = readVietnameseCurrency(overallTotal);

            saveState();
            renderDocumentPreview();
        });

        // Format unit price with thousands separator on blur
        tblGoodsItemsBody.addEventListener("blur", (e) => {
            const input = e.target.closest('input[data-col="don_gia"]');
            if (input) {
                const rawNum = Number(input.value.replace(/[^\d.-]/g, "")) || 0;
                input.value = formatCurrencyVND(rawNum);
            }
        }, true);

        // Click on delete row button
        tblGoodsItemsBody.addEventListener("click", (e) => {
            const btnDelete = e.target.closest('button[data-action="delete"]');
            if (btnDelete) {
                const rowIdx = parseInt(btnDelete.getAttribute("data-row-idx"), 10);
                deleteTableRow(rowIdx);
            }
        });
    }

    // Modal Paste from Excel logic
    const modalPasteExcelTable = document.getElementById("modalPasteExcelTable");
    const btnOpenPasteExcel = document.getElementById("btnOpenPasteExcel");
    const btnClosePasteExcelModal = document.getElementById("btnClosePasteExcelModal");
    const btnCancelPasteExcel = document.getElementById("btnCancelPasteExcel");
    const txtExcelPasteArea = document.getElementById("txtExcelPasteArea");
    const excelPreviewContainer = document.getElementById("excelPreviewContainer");
    const excelParsedCount = document.getElementById("excelParsedCount");
    const tblExcelPreviewBody = document.getElementById("tblExcelPreviewBody");
    const btnConfirmImportExcel = document.getElementById("btnConfirmImportExcel");
    const chkReplaceExistingTable = document.getElementById("chkReplaceExistingTable");

    let parsedExcelItems = [];

    function openPasteExcelModal() {
        if (!modalPasteExcelTable) return;
        modalPasteExcelTable.classList.remove("hidden");
        if (txtExcelPasteArea) {
            txtExcelPasteArea.value = "";
            txtExcelPasteArea.focus();
        }
        if (excelPreviewContainer) excelPreviewContainer.classList.add("hidden");
        parsedExcelItems = [];
    }

    function closePasteExcelModal() {
        if (modalPasteExcelTable) modalPasteExcelTable.classList.add("hidden");
        parsedExcelItems = [];
    }

    function parseExcelText(rawText) {
        if (!rawText || !rawText.trim()) {
            parsedExcelItems = [];
            if (excelPreviewContainer) excelPreviewContainer.classList.add("hidden");
            return;
        }

        const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const items = [];

        lines.forEach((line, idx) => {
            // Split by tab (Excel/Google Sheets standard clipboard format)
            let cols = line.split("\t").map(c => c.trim());
            if (cols.length === 1 && line.includes(";")) {
                cols = line.split(";").map(c => c.trim());
            }

            // Skip header lines like "STT", "Tên hàng", "Đơn giá"...
            const lineLower = line.toLowerCase();
            if (lineLower.includes("tên hàng") || lineLower.includes("quy cách") || lineLower.includes("thành tiền") || lineLower.includes("đơn giá")) {
                return;
            }

            let name = "";
            let unit = "Bộ";
            let qty = 1;
            let price = 0;
            let note = "";

            if (cols.length >= 6) {
                // Format: STT | Name | Unit | Qty | Price | (Amount) | Note
                name = cols[1];
                unit = cols[2] || "Bộ";
                qty = Number(cols[3].replace(/[^\d.-]/g, "")) || 1;
                price = Number(cols[4].replace(/[^\d.-]/g, "")) || 0;
                note = cols[6] || cols[5] || "";
            } else if (cols.length >= 4) {
                // Check if first col is number (STT)
                if (/^\d+$/.test(cols[0]) && cols.length >= 5) {
                    name = cols[1];
                    unit = cols[2] || "Bộ";
                    qty = Number(cols[3].replace(/[^\d.-]/g, "")) || 1;
                    price = Number(cols[4].replace(/[^\d.-]/g, "")) || 0;
                } else {
                    // Format: Name | Unit | Qty | Price
                    name = cols[0];
                    unit = cols[1] || "Bộ";
                    qty = Number(cols[2].replace(/[^\d.-]/g, "")) || 1;
                    price = Number(cols[3].replace(/[^\d.-]/g, "")) || 0;
                    note = cols[4] || "";
                }
            } else if (cols.length >= 2) {
                // Minimal format: Name | Price
                name = cols[0];
                price = Number(cols[1].replace(/[^\d.-]/g, "")) || 0;
            }

            if (name) {
                items.push({
                    stt: items.length + 1,
                    ten_hang: name,
                    dvt: unit,
                    so_luong: qty,
                    don_gia: price,
                    thanh_tien: qty * price,
                    ghi_chu: note
                });
            }
        });

        parsedExcelItems = items;

        if (excelPreviewContainer && tblExcelPreviewBody) {
            if (items.length > 0) {
                excelPreviewContainer.classList.remove("hidden");
                if (excelParsedCount) excelParsedCount.textContent = items.length;

                let previewHtml = "";
                items.forEach((it, i) => {
                    previewHtml += `
                        <tr>
                            <td class="p-1 text-center font-bold text-slate-500">${i + 1}</td>
                            <td class="p-1 font-medium text-slate-800">${escapeXml(it.ten_hang)}</td>
                            <td class="p-1 text-center">${escapeXml(it.dvt)}</td>
                            <td class="p-1 text-right font-medium">${it.so_luong}</td>
                            <td class="p-1 text-right">${formatCurrencyVND(it.don_gia)}</td>
                            <td class="p-1 text-right font-bold text-emerald-700">${formatCurrencyVND(it.thanh_tien)}</td>
                        </tr>
                    `;
                });
                tblExcelPreviewBody.innerHTML = previewHtml;
            } else {
                excelPreviewContainer.classList.add("hidden");
            }
        }
    }

    if (btnOpenPasteExcel) btnOpenPasteExcel.addEventListener("click", openPasteExcelModal);
    if (btnClosePasteExcelModal) btnClosePasteExcelModal.addEventListener("click", closePasteExcelModal);
    if (btnCancelPasteExcel) btnCancelPasteExcel.addEventListener("click", closePasteExcelModal);

    if (txtExcelPasteArea) {
        txtExcelPasteArea.addEventListener("input", (e) => {
            parseExcelText(e.target.value);
        });
        txtExcelPasteArea.addEventListener("paste", (e) => {
            setTimeout(() => {
                parseExcelText(txtExcelPasteArea.value);
            }, 50);
        });
    }

    if (btnConfirmImportExcel) {
        btnConfirmImportExcel.addEventListener("click", () => {
            if (!parsedExcelItems || parsedExcelItems.length === 0) {
                showToast("Chưa có dữ liệu nào được nhận diện. Vui lòng dán dữ liệu từ Excel vào ô trước!", "warning");
                return;
            }

            const curPkg = appState.packages[appState.activePackageIndex];
            if (!curPkg) return;

            const isReplace = !chkReplaceExistingTable || chkReplaceExistingTable.checked;
            const targetTag = currentActiveDictTableTag || "BANG_HANG_HOA";
            if (!curPkg.tableData) curPkg.tableData = {};

            if (isReplace) {
                curPkg.tableData[targetTag] = parsedExcelItems;
            } else {
                if (!Array.isArray(curPkg.tableData[targetTag])) {
                    curPkg.tableData[targetTag] = [];
                }
                const existing = curPkg.tableData[targetTag];
                parsedExcelItems.forEach(it => {
                    it.stt = existing.length + 1;
                    existing.push(it);
                });
            }

            saveState();
            renderDictTableView();
            renderDocumentPreview();
            closePasteExcelModal();
            showToast(`Đã nhập thành công ${parsedExcelItems.length} dòng từ Excel vào ${targetTag}!`, "success");
        });
    }

    
    // =============================================================
    // CONTROLLER: TỪ ĐIỂN BIẾN XẠ - TAB BIẾN ĐƠN LẺ & TAB BIẾN DẠNG BẢNG
    // =============================================================

    let activeDictModalMode = "scalar"; // "scalar" | "table"
    let customTableColumnsDraft = [];

    function initDictModeTabs() {
        const tabScalar = document.getElementById("tabDictScalarMode");
        const tabTable = document.getElementById("tabDictTableMode");
        const viewScalar = document.getElementById("dictScalarVarsView");
        const viewTable = document.getElementById("dictTableVarsView");

        if (!tabScalar || !tabTable) return;

        function switchMode(mode) {
            activeDictModalMode = mode;
            if (mode === "scalar") {
                tabScalar.className = "dict-nav-tab px-3 py-1.5 font-bold text-xs border-b-2 border-emerald-600 text-emerald-700 flex items-center gap-1.5 cursor-pointer transition-all bg-white rounded-t shadow-2xs";
                tabTable.className = "dict-nav-tab px-3 py-1.5 font-medium text-xs border-b-2 border-transparent text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/40 flex items-center gap-1.5 cursor-pointer transition-all rounded-t";
                if (viewScalar) viewScalar.classList.remove("hidden");
                if (viewTable) viewTable.classList.add("hidden");
                renderVarsDictionaryTable();
            } else {
                tabTable.className = "dict-nav-tab px-3 py-1.5 font-bold text-xs border-b-2 border-indigo-600 text-indigo-700 flex items-center gap-1.5 cursor-pointer transition-all bg-white rounded-t shadow-2xs";
                tabScalar.className = "dict-nav-tab px-3 py-1.5 font-medium text-xs border-b-2 border-transparent text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/40 flex items-center gap-1.5 cursor-pointer transition-all rounded-t";
                if (viewScalar) viewScalar.classList.add("hidden");
                if (viewTable) viewTable.classList.remove("hidden");
                renderDictTableView();
            }
        }

        tabScalar.onclick = () => switchMode("scalar");
        tabTable.onclick = () => switchMode("table");

        // Update badge counts
        updateDictBadgeCounts();
    }

    function updateDictBadgeCounts() {
        const badgeScalar = document.getElementById("badgeDictScalarCount");
        const badgeTable = document.getElementById("badgeDictTableCount");

        if (badgeScalar) {
            const allVars = [...MASTER_VARIABLES_CATALOG];
            if (appState.customVariables) {
                allVars.push(...Object.keys(appState.customVariables));
            }
            badgeScalar.textContent = allVars.length;
        }

        if (badgeTable) {
            const allDefs = getAllTableDefinitions();
            badgeTable.textContent = `${allDefs.length} loại`;
        }
    }

    function renderDictTableView() {
        // 1. Populate Package Selector inside Table View
        const pkgSelect = document.getElementById("dictTablePkgSelect");
        if (pkgSelect) {
            pkgSelect.innerHTML = "";
            const pkgs = appState.packages && appState.packages.length > 0 ? appState.packages : (appState.projectRoadmap?.packages || []);
            pkgs.forEach((p, idx) => {
                const opt = document.createElement("option");
                opt.value = idx;
                opt.textContent = `Gói ${idx + 1}: ${p.name || `Gói thầu số ${idx + 1}`}`;
                if (idx === appState.activePackageIndex) opt.selected = true;
                pkgSelect.appendChild(opt);
            });
            pkgSelect.onchange = () => {
                appState.activePackageIndex = parseInt(pkgSelect.value, 10) || 0;
                renderDictTableView();
                renderDocumentPreview();
            };
        }

        // 2. Render Table Type Switcher Pills
        const pillsContainer = document.getElementById("dictTableTypePills");
        const allDefs = getAllTableDefinitions();

        // Ensure active tag exists
        if (!allDefs.find(t => t.tag === currentActiveDictTableTag)) {
            currentActiveDictTableTag = allDefs[0] ? allDefs[0].tag : "BANG_HANG_HOA";
        }

        if (pillsContainer) {
            let pillsHtml = "";
            allDefs.forEach(tDef => {
                const isActive = tDef.tag === currentActiveDictTableTag;
                const activeClass = isActive
                    ? "bg-indigo-600 text-white font-bold shadow-xs border-indigo-600"
                    : "bg-white hover:bg-indigo-50 text-slate-700 font-medium border-slate-200 hover:border-indigo-300";

                const isCustom = !tDef.isSystem;
                pillsHtml += `
                    <div class="inline-flex items-center rounded-lg border text-xs px-2 py-1 gap-1.5 transition-all cursor-pointer ${activeClass} dict-table-pill" data-table-tag="${tDef.tag}">
                        <span class="text-sm">${tDef.icon || '📊'}</span>
                        <span class="font-semibold">${escapeXml(tDef.name)}</span>
                        <code class="px-1 py-0.2 rounded text-[10px] font-mono ${isActive ? 'bg-indigo-700/80 text-white' : 'bg-slate-100 text-indigo-700 font-bold'}">{${tDef.tag}}</code>
                        <button type="button" class="btn-copy-pill-tag ml-0.5 hover:text-emerald-400 p-0.5" data-copy-tag="{${tDef.tag}}" title="Sao chép nhanh mã {${tDef.tag}}">
                            <i class="fa-solid fa-copy text-[10px]"></i>
                        </button>
                        ${isCustom ? `
                        <button type="button" class="btn-del-custom-table ml-0.5 text-red-400 hover:text-red-700 p-0.5" data-del-tag="${tDef.tag}" title="Xóa loại bảng tự tạo này">
                            <i class="fa-solid fa-xmark text-[11px]"></i>
                        </button>` : ''}
                    </div>
                `;
            });
            pillsContainer.innerHTML = pillsHtml;

            // Click listener for pills
            pillsContainer.querySelectorAll(".dict-table-pill").forEach(el => {
                el.onclick = (e) => {
                    if (e.target.closest(".btn-copy-pill-tag") || e.target.closest(".btn-del-custom-table")) return;
                    const tag = el.getAttribute("data-table-tag");
                    if (tag) {
                        currentActiveDictTableTag = tag;
                        renderDictTableView();
                    }
                };
            });

            // Fast copy on pill
            pillsContainer.querySelectorAll(".btn-copy-pill-tag").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const tagCode = btn.getAttribute("data-copy-tag");
                    copyTagToClipboardWithToast(tagCode);
                };
            });

            // Delete custom table definition
            pillsContainer.querySelectorAll(".btn-del-custom-table").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const tag = btn.getAttribute("data-del-tag");
                    deleteCustomTableDefinition(tag);
                };
            });
        }

        // 3. Render Active Table Banner
        const activeDef = getTableDefinitionByTag(currentActiveDictTableTag) || allDefs[0];
        const iconEl = document.getElementById("activeTableIcon");
        const titleEl = document.getElementById("activeTableTitle");
        const descEl = document.getElementById("activeTableDesc");
        const tagCodeEl = document.getElementById("lblActiveTableTagCode");
        const hintCodeEl = document.getElementById("dictTableTagHint");
        const badgeRowsEl = document.getElementById("activeTableRowCountBadge");

        const targetRows = getTableRowsForPackage(appState.activePackageIndex, activeDef.tag);

        if (iconEl) iconEl.textContent = activeDef.icon || "📊";
        if (titleEl) titleEl.textContent = `${activeDef.tag} - ${activeDef.name}`;
        if (descEl) descEl.textContent = activeDef.desc || "Bảng biến xạ chuẩn thể thức văn bản hành chính Việt Nam.";
        if (tagCodeEl) tagCodeEl.textContent = `{${activeDef.tag}}`;
        if (hintCodeEl) hintCodeEl.textContent = `{${activeDef.tag}}`;
        if (badgeRowsEl) badgeRowsEl.textContent = `${targetRows.length} dòng`;

        // 4. Render Active Table Grid
        renderDictCurrentTableGrid(activeDef, targetRows);

        // 5. Setup Action Buttons
        setupDictTableActions(activeDef);
    }

    function copyTagToClipboardWithToast(tagText) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(tagText).then(() => {
                showToast(`Đã sao chép mã ${tagText} vào bộ nhớ tạm! Dán vào bất kỳ vị trí nào trong file Word (.docx) mẫu.`, "success");
            }).catch(() => {
                copyTextToClipboard(tagText);
                showToast(`Đã sao chép mã ${tagText}!`, "success");
            });
        } else {
            copyTextToClipboard(tagText);
            showToast(`Đã sao chép mã ${tagText}!`, "success");
        }
    }

    function renderDictCurrentTableGrid(tableDef, rows) {
        const table = document.getElementById("dictCurrentTableGrid");
        if (!table) return;

        const columns = tableDef.columns || [];
        let theadHtml = `<thead class="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200 z-10 select-none"><tr>`;
        columns.forEach(col => {
            const alignClass = col.align === "right" ? "text-right" : (col.align === "center" ? "text-center" : "text-left");
            theadHtml += `<th class="py-1.5 px-2 ${alignClass}" style="width: ${col.widthPct || 'auto'}">${escapeXml(col.label)}</th>`;
        });
        theadHtml += `<th class="py-1.5 px-1.5 w-8 text-center"></th></tr></thead>`;

        let tbodyHtml = `<tbody class="divide-y divide-slate-100 bg-white">`;
        let totalVal = 0;

        rows.forEach((row, rIdx) => {
            const stt = row.stt || (rIdx + 1);
            row.stt = stt;

            tbodyHtml += `<tr data-row-idx="${rIdx}" class="hover:bg-slate-50/70 transition-colors">`;
            columns.forEach(col => {
                const alignClass = col.align === "right" ? "text-right" : (col.align === "center" ? "text-center" : "text-left");
                
                if (col.key === "stt") {
                    tbodyHtml += `<td class="py-1 px-1.5 text-center font-bold text-slate-500 text-[11px]">${stt}</td>`;
                } else if (col.type === "calc_amount" || col.key === "thanh_tien") {
                    const q = Number(row.so_luong) || 0;
                    const p = Number(row.don_gia) || 0;
                    const amount = row.thanh_tien !== undefined ? Number(row.thanh_tien) : (q * p);
                    row.thanh_tien = amount;
                    totalVal += amount;
                    tbodyHtml += `<td class="py-1 px-2 text-right font-bold text-emerald-700 text-xs whitespace-nowrap cell-calc-amount">${formatCurrencyVND(amount)}</td>`;
                } else if (col.type === "currency") {
                    const num = Number(row[col.key]) || 0;
                    if (tableDef.totalCol === col.key) totalVal += num;
                    tbodyHtml += `
                        <td class="py-1 px-1.5">
                            <input type="text" data-col="${col.key}" data-row-idx="${rIdx}" data-type="currency" value="${formatCurrencyVND(num)}" class="w-full text-right font-medium">
                        </td>
                    `;
                } else if (col.type === "number") {
                    const num = Number(row[col.key]) || 0;
                    tbodyHtml += `
                        <td class="py-1 px-1.5">
                            <input type="number" min="0" data-col="${col.key}" data-row-idx="${rIdx}" value="${num}" class="w-full text-right font-medium">
                        </td>
                    `;
                } else {
                    const val = escapeXml(String(row[col.key] !== undefined && row[col.key] !== null ? row[col.key] : ""));
                    tbodyHtml += `
                        <td class="py-1 px-1.5">
                            <input type="text" data-col="${col.key}" data-row-idx="${rIdx}" value="${val}" placeholder="${escapeXml(col.label)}..." class="w-full ${alignClass}">
                        </td>
                    `;
                }
            });

            tbodyHtml += `
                <td class="py-1 px-1 text-center">
                    <button type="button" data-action="delete-dict-row" data-row-idx="${rIdx}" class="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer" title="Xóa dòng này">
                        <i class="fa-solid fa-trash-can text-[11px]"></i>
                    </button>
                </td>
            </tr>`;
        });

        tbodyHtml += `</tbody>`;
        table.innerHTML = theadHtml + tbodyHtml;

        // Update Summary Footer
        const totalFormattedEl = document.getElementById("dictTableTotalFormatted");
        const inWordsEl = document.getElementById("dictTableInWords");
        const wordsRowEl = document.getElementById("dictTableWordsRow");
        const summaryCardEl = document.getElementById("dictTableSummaryCard");

        if (tableDef.hasTotal) {
            if (summaryCardEl) summaryCardEl.classList.remove("hidden");
            if (totalFormattedEl) totalFormattedEl.textContent = formatCurrencyVND(totalVal) + " VNĐ";
            if (wordsRowEl && tableDef.currencyWord) {
                wordsRowEl.classList.remove("hidden");
                if (inWordsEl) inWordsEl.textContent = readVietnameseCurrency(totalVal);
            } else if (wordsRowEl) {
                wordsRowEl.classList.add("hidden");
            }
        } else {
            if (totalFormattedEl) totalFormattedEl.textContent = `${rows.length} mục`;
            if (wordsRowEl) wordsRowEl.classList.add("hidden");
        }
    }

    function setupDictTableActions(activeDef) {
        const btnCopy = document.getElementById("btnCopyActiveTableTag");
        if (btnCopy) {
            btnCopy.onclick = () => {
                copyTagToClipboardWithToast(`{${activeDef.tag}}`);
            };
        }

        const btnAddRow = document.getElementById("btnAddRowInDict");
        if (btnAddRow) {
            btnAddRow.onclick = () => {
                const rows = getTableRowsForPackage(appState.activePackageIndex, activeDef.tag);
                const newRow = { stt: rows.length + 1 };
                (activeDef.columns || []).forEach(c => {
                    if (c.key === "stt") return;
                    if (c.type === "number") newRow[c.key] = 1;
                    else if (c.type === "currency") newRow[c.key] = 0;
                    else if (c.type === "calc_amount") newRow[c.key] = 0;
                    else newRow[c.key] = "";
                });
                rows.push(newRow);
                saveState();
                renderDictTableView();
                renderDocumentPreview();

                setTimeout(() => {
                    const lastTr = document.querySelector(`#dictCurrentTableGrid tr[data-row-idx="${rows.length - 1}"] input`);
                    if (lastTr) lastTr.focus();
                }, 50);
            };
        }

        const btnClearRows = document.getElementById("btnClearActiveTableRows");
        if (btnClearRows) {
            btnClearRows.onclick = () => {
                if (confirm(`Bạn có chắc chắn muốn xóa toàn bộ dòng trong bảng "${activeDef.name}" của gói này không?`)) {
                    const pkgs = appState.packages || [];
                    const curPkg = pkgs[appState.activePackageIndex];
                    if (curPkg && curPkg.tableData) {
                        curPkg.tableData[activeDef.tag] = [];
                        saveState();
                        renderDictTableView();
                        renderDocumentPreview();
                        showToast(`Đã làm trống bảng ${activeDef.tag}.`);
                    }
                }
            };
        }

        const btnSyncPrice = document.getElementById("btnSyncActiveTablePrice");
        if (btnSyncPrice) {
            if (activeDef.hasTotal) {
                btnSyncPrice.classList.remove("hidden");
                btnSyncPrice.onclick = () => {
                    const rows = getTableRowsForPackage(appState.activePackageIndex, activeDef.tag);
                    let sum = 0;
                    rows.forEach(r => {
                        if (activeDef.totalCol === "thanh_tien") {
                            const q = Number(r.so_luong) || 0;
                            const p = Number(r.don_gia) || 0;
                            sum += (r.thanh_tien !== undefined ? Number(r.thanh_tien) : (q * p));
                        } else if (activeDef.totalCol && r[activeDef.totalCol] !== undefined) {
                            sum += Number(r[activeDef.totalCol]) || 0;
                        }
                    });

                    const totalStr = formatCurrencyVND(sum);
                    const totalWords = readVietnameseCurrency(sum);

                    const curPkg = appState.packages[appState.activePackageIndex];
                    if (curPkg && curPkg.fields) {
                        curPkg.fields["GIA_GOI_THAU_SO"] = totalStr;
                        curPkg.fields["GIA_GOI_THAU_CHU"] = totalWords;
                        curPkg.fields["GIA_TRI_HOP_DONG_SO"] = totalStr;
                        curPkg.fields["GIA_TRI_HOP_DONG_CHU"] = totalWords;

                        // Update DOM inputs if visible
                        const inpGiaGoi = document.querySelector('[data-field="GIA_GOI_THAU_SO"]');
                        if (inpGiaGoi) inpGiaGoi.value = totalStr;
                        const inpGiaGoiChu = document.querySelector('[data-field="GIA_GOI_THAU_CHU"]');
                        if (inpGiaGoiChu) inpGiaGoiChu.value = totalWords;

                        saveState();
                        renderDocumentPreview();
                        showToast(`Đã đồng bộ tổng (${totalStr} VNĐ) vào Giá gói thầu & Hợp đồng!`, "success");
                    }
                };
            } else {
                btnSyncPrice.classList.add("hidden");
            }
        }

        const btnPasteExcel = document.getElementById("btnPasteExcelInDict");
        if (btnPasteExcel) {
            btnPasteExcel.onclick = () => {
                openPasteExcelModal();
            };
        }

        const btnResetDefs = document.getElementById("btnResetTableDefs");
        if (btnResetDefs) {
            btnResetDefs.onclick = () => {
            showToast("Chức năng khôi phục mặc định đã được tắt để bảo vệ dữ liệu đang thiết lập!", "warning");
            return;
                if (confirm("Khôi phục danh mục bảng biến xạ về 3 bảng chuẩn ban đầu (Hàng hóa, Nhân sự, Tiến độ)? Các bảng tự tạo sẽ bị xóa.")) {
                    localStorage.removeItem("ho_so_custom_table_defs");
                    currentActiveDictTableTag = "BANG_HANG_HOA";
                    updateDictBadgeCounts();
                    renderDictTableView();
                    showToast("Đã khôi phục các bảng chuẩn ban đầu!");
                }
            };
        }

        // Custom table delete button on top bar
        const btnDeleteCustom = document.getElementById("btnDeleteCustomTableDef");
        if (btnDeleteCustom) {
            if (!activeDef.isSystem) {
                btnDeleteCustom.classList.remove("hidden");
                btnDeleteCustom.onclick = () => {
                    deleteCustomTableDefinition(activeDef.tag);
                };
            } else {
                btnDeleteCustom.classList.add("hidden");
            }
        }
    }

    // Interactive in-place cell editing inside table grid
    const dictCurrentTableGrid = document.getElementById("dictCurrentTableGrid");
    if (dictCurrentTableGrid) {
        dictCurrentTableGrid.addEventListener("input", (e) => {
            const input = e.target.closest("input[data-col]");
            if (!input) return;
            const rIdx = parseInt(input.getAttribute("data-row-idx"), 10);
            const colKey = input.getAttribute("data-col");
            const isCurr = input.getAttribute("data-type") === "currency";

            const tableDef = getTableDefinitionByTag(currentActiveDictTableTag);
            if (!tableDef) return;
            const rows = getTableRowsForPackage(appState.activePackageIndex, tableDef.tag);
            const row = rows[rIdx];
            if (!row) return;

            let val = input.value;
            if (isCurr || colKey === "don_gia" || colKey === "so_tien") {
                const rawNum = Number(val.replace(/[^\d.-]/g, "")) || 0;
                row[colKey] = rawNum;
            } else if (colKey === "so_luong" || colKey === "ty_le") {
                row[colKey] = Number(val) || 0;
            } else {
                row[colKey] = val;
            }

            // Recalculate amount if BANG_HANG_HOA
            if (tableDef.tag === "BANG_HANG_HOA") {
                const q = Number(row.so_luong) || 0;
                const p = Number(row.don_gia) || 0;
                row.thanh_tien = q * p;
                const tr = input.closest("tr");
                if (tr) {
                    const calcCell = tr.querySelector(".cell-calc-amount");
                    if (calcCell) calcCell.textContent = formatCurrencyVND(row.thanh_tien);
                }
            }

            // Update Summary
            let overallTotal = 0;
            rows.forEach(r => {
                if (tableDef.totalCol === "thanh_tien") {
                    const q = Number(r.so_luong) || 0;
                    const p = Number(r.don_gia) || 0;
                    overallTotal += (r.thanh_tien !== undefined ? Number(r.thanh_tien) : (q * p));
                } else if (tableDef.totalCol && r[tableDef.totalCol] !== undefined) {
                    overallTotal += Number(r[tableDef.totalCol]) || 0;
                }
            });

            const totalFormattedEl = document.getElementById("dictTableTotalFormatted");
            if (totalFormattedEl && tableDef.hasTotal) {
                totalFormattedEl.textContent = formatCurrencyVND(overallTotal) + " VNĐ";
            }
            const inWordsEl = document.getElementById("dictTableInWords");
            if (inWordsEl && tableDef.currencyWord) {
                inWordsEl.textContent = readVietnameseCurrency(overallTotal);
            }

            saveState();
            renderDocumentPreview();
        });

        dictCurrentTableGrid.addEventListener("blur", (e) => {
            const input = e.target.closest('input[data-type="currency"]');
            if (input) {
                const rawNum = Number(input.value.replace(/[^\d.-]/g, "")) || 0;
                input.value = formatCurrencyVND(rawNum);
            }
        }, true);

        dictCurrentTableGrid.addEventListener("click", (e) => {
            const btnDel = e.target.closest('button[data-action="delete-dict-row"]');
            if (btnDel) {
                const rIdx = parseInt(btnDel.getAttribute("data-row-idx"), 10);
                const tableDef = getTableDefinitionByTag(currentActiveDictTableTag);
                if (!tableDef) return;
                const rows = getTableRowsForPackage(appState.activePackageIndex, tableDef.tag);
                if (rIdx >= 0 && rIdx < rows.length) {
                    rows.splice(rIdx, 1);
                    rows.forEach((r, i) => { r.stt = i + 1; });
                    saveState();
                    renderDictTableView();
                    renderDocumentPreview();
                    showToast("Đã xóa dòng khỏi bảng.");
                }
            }
        });
    }

    function deleteCustomTableDefinition(tag) {
        if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn loại bảng "${tag}" không?`)) return;

        let custom = [];
        try {
            const raw = localStorage.getItem("ho_so_custom_table_defs");
            if (raw) custom = JSON.parse(raw);
        } catch (e) {}

        custom = custom.filter(t => t.tag !== tag);
        saveCustomTableDefinitions(custom);

        // Delete from all packages
        (appState.packages || []).forEach(p => {
            if (p.tableData && p.tableData[tag]) {
                delete p.tableData[tag];
            }
        });

        currentActiveDictTableTag = "BANG_HANG_HOA";
        saveState();
        updateDictBadgeCounts();
        renderDictTableView();
        renderDocumentPreview();
        showToast(`Đã xóa loại bảng ${tag} thành công!`);
    }

    // Modal Create / Edit Custom Table Controller
    const modalCreateCustomTable = document.getElementById("modalCreateCustomTable");
    const btnOpenCreateCustomTableModal = document.getElementById("btnOpenCreateCustomTableModal");
    const btnCloseCustomTableModal = document.getElementById("btnCloseCustomTableModal");
    const btnCancelCustomTableModal = document.getElementById("btnCancelCustomTableModal");
    const btnSaveCustomTable = document.getElementById("btnSaveCustomTable");
    const btnAddCustomColumn = document.getElementById("btnAddCustomColumn");
    const customColumnsList = document.getElementById("customColumnsList");
    const inputCustomTableTag = document.getElementById("inputCustomTableTag");
    const inputCustomTableName = document.getElementById("inputCustomTableName");
    const inputCustomTableDesc = document.getElementById("inputCustomTableDesc");

    function openCreateCustomTableModal() {
        if (!modalCreateCustomTable) return;
        modalCreateCustomTable.classList.remove("hidden");

        if (inputCustomTableTag) inputCustomTableTag.value = "";
        if (inputCustomTableName) inputCustomTableName.value = "";
        if (inputCustomTableDesc) inputCustomTableDesc.value = "";

        // Default columns draft: STT, Tên, Số lượng, Đơn giá, Ghi chú
        customTableColumnsDraft = [
            { key: "stt", label: "STT", type: "number", align: "center", widthPct: "8%" },
            { key: "noi_dung", label: "Nội dung / Hạng mục", type: "text", align: "left", widthPct: "45%" },
            { key: "so_luong", label: "Số lượng", type: "number", align: "right", widthPct: "15%" },
            { key: "ghi_chu", label: "Ghi chú", type: "text", align: "left", widthPct: "32%" }
        ];

        renderCustomColumnsDraftList();
        if (inputCustomTableTag) inputCustomTableTag.focus();
    }

    function closeCreateCustomTableModal() {
        if (modalCreateCustomTable) modalCreateCustomTable.classList.add("hidden");
    }

    function renderCustomColumnsDraftList() {
        if (!customColumnsList) return;
        let html = "";
        customTableColumnsDraft.forEach((col, idx) => {
            html += `
                <div class="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-200 text-xs" data-col-idx="${idx}">
                    <span class="font-bold text-slate-400 w-5 text-center">${idx + 1}</span>
                    <input type="text" data-field="label" value="${escapeXml(col.label)}" placeholder="Tên cột..." class="flex-1 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-medium">
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
            btn.onclick = (e) => {
                const tr = btn.closest('[data-col-idx]');
                const cIdx = parseInt(tr.getAttribute("data-col-idx"), 10);
                if (customTableColumnsDraft.length <= 1) {
                    showToast("Bảng cần có ít nhất 1 cột!", "warning");
                    return;
                }
                customTableColumnsDraft.splice(cIdx, 1);
                renderCustomColumnsDraftList();
            };
        });

        // Field change listener
        customColumnsList.querySelectorAll("input, select").forEach(el => {
            el.onchange = () => {
                const tr = el.closest('[data-col-idx]');
                const cIdx = parseInt(tr.getAttribute("data-col-idx"), 10);
                const field = el.getAttribute("data-field");
                if (customTableColumnsDraft[cIdx]) {
                    customTableColumnsDraft[cIdx][field] = el.value;
                }
            };
        });
    }

    if (btnOpenCreateCustomTableModal) btnOpenCreateCustomTableModal.onclick = openCreateCustomTableModal;
    if (btnCloseCustomTableModal) btnCloseCustomTableModal.onclick = closeCreateCustomTableModal;
    if (btnCancelCustomTableModal) btnCancelCustomTableModal.onclick = closeCreateCustomTableModal;

    if (btnAddCustomColumn) {
        btnAddCustomColumn.onclick = () => {
            const nextIdx = customTableColumnsDraft.length + 1;
            customTableColumnsDraft.push({
                key: `col_${nextIdx}`,
                label: `Cột ${nextIdx}`,
                type: "text",
                align: "left",
                widthPct: "20%"
            });
            renderCustomColumnsDraftList();
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
            const existing = getTableDefinitionByTag(rawTag);
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
                if (customTableColumnsDraft[cIdx]) {
                    customTableColumnsDraft[cIdx].label = lbl || `Cột ${cIdx + 1}`;
                    customTableColumnsDraft[cIdx].type = typ;
                    customTableColumnsDraft[cIdx].align = alg;
                    if (!customTableColumnsDraft[cIdx].key) {
                        customTableColumnsDraft[cIdx].key = `col_${cIdx + 1}`;
                    }
                }
            });

            // Ensure unique column keys
            customTableColumnsDraft.forEach((c, i) => {
                if (!c.key) c.key = `col_${i + 1}`;
                if (i === 0 && !c.key) c.key = "stt";
            });

            const hasCurrency = customTableColumnsDraft.some(c => c.type === "currency");
            const newTableDef = {
                tag: rawTag,
                name: name,
                icon: "📋",
                desc: desc || `Bảng dữ liệu {${rawTag}} chèn vào Word mẫu.`,
                isSystem: false,
                hasTotal: hasCurrency,
                totalCol: hasCurrency ? (customTableColumnsDraft.find(c => c.type === "currency")?.key || "") : "",
                currencyWord: hasCurrency,
                columns: customTableColumnsDraft,
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
            saveCustomTableDefinitions(customList);

            currentActiveDictTableTag = rawTag;
            updateDictBadgeCounts();
            renderDictTableView();
            closeCreateCustomTableModal();
            showToast(`Đã tạo thành công loại bảng {${rawTag}}! Bạn có thể copy mã Word ngay bây giờ.`, "success");
        };
    }



    // Listen for storage events across tabs (e.g. custom tables created/deleted in Template Studio)
    window.addEventListener("storage", (e) => {
        if (e.key === "ho_so_custom_table_defs") {
            try {
                if (typeof updateDictBadgeCounts === "function") updateDictBadgeCounts();
                if (typeof renderDictTableView === "function") renderDictTableView();
                if (typeof renderDocumentPreview === "function") renderDocumentPreview();
            } catch (err) {
                console.warn("Storage sync error in app.js:", err);
            }
        }
    });

    // Expose helpers globally
    window.renderTableEditor = renderTableEditor;
    window.addTableRow = addTableRow;
    window.deleteTableRow = deleteTableRow;
    window.clearAllTableRows = clearAllTableRows;
    window.syncTableToPrices = syncTableToPrices;
    window.getTableDataForActivePackage = getTableDataForActivePackage;
    window.formatCurrencyVND = formatCurrencyVND;
    window.readVietnameseCurrency = readVietnameseCurrency;
    window.buildDocxTableXml = buildDocxTableXml;
    window.getAllTableDefinitions = getAllTableDefinitions;
    window.getTableDefinitionByTag = getTableDefinitionByTag;
    window.buildGenericDocxTableXml = buildGenericDocxTableXml;
    window.renderGenericTableHtml = renderGenericTableHtml;
    window.renderDictTableView = renderDictTableView;
    window.renderDocxBlob = renderDocxBlob;
    window.renderMergedDocxBlob = renderMergedDocxBlob;

    window.appState = appState;
    window.PROCUREMENT_MATRIX = PROCUREMENT_MATRIX;
    window.recalculateAllTaskDates = recalculateAllTaskDates;
    window.openTaskFormulaModal = openTaskFormulaModal;
    window.openEditPackageModal = openEditPackageModal;
    window.renderAdminMatrixModal = renderAdminMatrixModal;
    window.switchMainTab = switchMainTab;
    window.applyVariableToSelection = applyVariableToSelection;
    window.renderDocumentPreview = renderDocumentPreview;
    window.getAllDocsForCurrentType = getAllDocsForCurrentType;
    window.renderDocTabs = renderDocTabs;
    window.renderDocxBlob = renderDocxBlob;
    window.renderMergedDocxBlob = renderMergedDocxBlob;
    window.getCurrentActiveDoc = getCurrentActiveDoc;
    window.getMergedData = getMergedData;
    window.selectDocumentById = selectDocumentById;
    window.renderAllDocsCatalogModal = renderAllDocsCatalogModal;
    window.makeVariableInlineEditable = makeVariableInlineEditable;
    window.commitVariableEdit = commitVariableEdit;
    window.openProcurementMatrixModal = () => {
        const dd = document.getElementById("userAccountDropdown");
        if (dd) dd.classList.add("hidden");
        activeAdminTypeId = appState.selectedProcurementTypeId || PROCUREMENT_MATRIX.procurementTypes[0].id;
        renderAdminMatrixModal();
        const m = document.getElementById("modalProcurementMatrixManager");
        if (m) m.classList.remove("hidden");
    };

        // -------------------------------------------------------------
    // Auto-Expand & Toggle Expand/Collapse for Multi-line Textareas
    // -------------------------------------------------------------
    let isLegalBasisExpanded = false;

    function adjustTextareaHeight(textarea, isExpanded) {
        if (!textarea) return;
        if (isExpanded) {
            textarea.style.height = "auto";
            const scrollH = textarea.scrollHeight;
            const targetH = Math.min(Math.max(scrollH + 8, 90), 650);
            textarea.style.height = `${targetH}px`;
            textarea.style.overflowY = scrollH > 650 ? "auto" : "hidden";
        } else {
            textarea.style.height = "46px";
            textarea.style.overflowY = "auto";
        }
    }

    function initAutoExpandTextareas() {
        const textareaLegal = document.getElementById("textareaLegalBasis");
        const btnToggle = document.getElementById("btnToggleExpandLegal");

        function updateBtnUI() {
            if (!btnToggle) return;
            if (isLegalBasisExpanded) {
                btnToggle.innerHTML = `<i class="fa-solid fa-down-left-and-up-right-to-center text-[9px]"></i> <span>Thu gọn</span>`;
                btnToggle.className = "text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 cursor-pointer transition-all shadow-2xs";
                btnToggle.title = "Bấm để thu gọn ô nhập liệu về kích thước mặc định";
            } else {
                btnToggle.innerHTML = `<i class="fa-solid fa-up-right-and-down-left-from-center text-[9px]"></i> <span>Bung vừa nội dung</span>`;
                btnToggle.className = "text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1 cursor-pointer transition-all shadow-2xs";
                btnToggle.title = "Bấm để tự động bung/giãn ô vừa vặn với toàn bộ nội dung";
            }
        }

        if (btnToggle && textareaLegal) {
            btnToggle.addEventListener("click", () => {
                isLegalBasisExpanded = !isLegalBasisExpanded;
                updateBtnUI();
                adjustTextareaHeight(textareaLegal, isLegalBasisExpanded);
            });

            // Double click on the textarea toggles expand/collapse
            textareaLegal.addEventListener("dblclick", (e) => {
                if (e.target === textareaLegal) {
                    isLegalBasisExpanded = !isLegalBasisExpanded;
                    updateBtnUI();
                    adjustTextareaHeight(textareaLegal, isLegalBasisExpanded);
                }
            });

            // Dynamic adjustment on input if currently expanded
            textareaLegal.addEventListener("input", () => {
                if (isLegalBasisExpanded) {
                    adjustTextareaHeight(textareaLegal, true);
                }
            });
        }

        window.refreshExpandableTextareas = () => {
            if (textareaLegal && isLegalBasisExpanded) {
                adjustTextareaHeight(textareaLegal, true);
            }
        };
        window.adjustTextareaHeight = adjustTextareaHeight;
    }

    initProcurementTypeSelector();
    renderDocTabs();
    renderCustomVariablesUI();
    renderPackageDropdown();
    initAutoExpandTextareas();
    populateFormInputs();
    applyVariableFilter();
    const initialTab = (window.location.hash === "#docs" || window.location.hash === "#tao-ho-so" || appState.activeMainTab === "docs") 
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

    // (slugifyToUpperSnake is declared in global scope with full Vietnamese support)

    // Nút chuyển đổi Chế độ Xem Bản In Word (đen trắng NĐ 30) vs Soạn thảo (nổi bật biến)
    function updatePrintModeButtonUI() {
        const btn = document.getElementById("btnTogglePrintMode");
        const btnText = document.getElementById("btnTogglePrintModeText");
        const btnIcon = document.getElementById("btnTogglePrintModeIcon");
        if (!btn) return;
        if (typeof appState !== "undefined" && appState && appState.previewPrintMode) {
            btn.className = "text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-0.5 rounded border border-blue-600 shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer whitespace-nowrap";
            if (btnIcon) btnIcon.className = "fa-solid fa-file-word text-white text-[10px]";
            if (btnText) btnText.textContent = "Bản in chuẩn";
        } else {
            btn.className = "text-[10px] bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-900 font-bold px-2 py-0.5 rounded border border-slate-300 shadow-2xs flex items-center space-x-1 h-6 transition-all cursor-pointer whitespace-nowrap";
            if (btnIcon) btnIcon.className = "fa-solid fa-file-lines text-blue-600 text-[10px]";
            if (btnText) btnText.textContent = "Bản in Word";
        }
    }

    const btnTogglePrintMode = document.getElementById("btnTogglePrintMode");
    if (btnTogglePrintMode) {
        btnTogglePrintMode.addEventListener("click", () => {
            appState.previewPrintMode = !appState.previewPrintMode;
            if (documentPreviewContent) {
                if (appState.previewPrintMode) {
                    documentPreviewContent.classList.add("preview-print-mode");
                    showToast("Đã bật chế độ Xem bản in Word chuẩn (đen trắng theo NĐ 30/2020)!", "info");
                } else {
                    documentPreviewContent.classList.remove("preview-print-mode");
                    showToast("Đã trở về chế độ Soạn thảo (nổi bật biến xạ)!", "info");
                }
            }
            updatePrintModeButtonUI();
            saveState();
        });
    }

    const btnTogglePreviewEdit = document.getElementById("btnTogglePreviewEdit");
    const btnTogglePreviewEditText = document.getElementById("btnTogglePreviewEditText");
    const btnResetPreviewDoc = document.getElementById("btnResetPreviewDoc");
    const btnOpenStudioFromPreview = document.getElementById("btnOpenStudioFromPreview");
    const linkOpenStudioMenu = document.getElementById("linkOpenStudioMenu");

    if (btnOpenStudioFromPreview) {
        btnOpenStudioFromPreview.addEventListener("click", () => {
            const curDoc = getCurrentActiveDoc();
            const wfId = appState.selectedProcurementTypeId || "chi_dinh_thau_rut_gon";
            const docId = curDoc ? curDoc.id : (appState.activeDocId || "");
            window.open(`template-tool.html?workflow=${encodeURIComponent(wfId)}&doc=${encodeURIComponent(docId)}&mode=single`, "_blank");
        });
    }

    if (linkOpenStudioMenu) {
        linkOpenStudioMenu.addEventListener("click", (e) => {
            e.preventDefault();
            const curDoc = getCurrentActiveDoc();
            const wfId = appState.selectedProcurementTypeId || "chi_dinh_thau_rut_gon";
            const docId = curDoc ? curDoc.id : (appState.activeDocId || "");
            window.location.href = `template-tool.html?workflow=${encodeURIComponent(wfId)}&doc=${encodeURIComponent(docId)}`;
        });
    }

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
        documentPreviewContent.addEventListener("input", (e) => {
            const activeDoc = getCurrentActiveDoc();
            if (!activeDoc) return;

            // 1. Nhận diện biến đang được sửa trực tiếp trên Preview để đồng bộ ngược về Form
            let targetSpan = null;
            if (e.target && e.target.nodeType === Node.ELEMENT_NODE) {
                targetSpan = e.target.closest("[data-var-key]");
            }
            if (!targetSpan) {
                const sel = window.getSelection();
                if (sel && sel.anchorNode) {
                    const node = sel.anchorNode.nodeType === Node.ELEMENT_NODE ? sel.anchorNode : sel.anchorNode.parentElement;
                    targetSpan = node ? node.closest("[data-var-key]") : null;
                }
            }
            if (!targetSpan && activeEditingVarSpan) {
                targetSpan = activeEditingVarSpan;
            }
            // Nếu không xác định được targetSpan từ sự kiện/con trỏ, quét tìm span nào có nội dung vừa bị người dùng thay đổi
            if (!targetSpan) {
                const currentData = getMergedData();
                const allSpans = documentPreviewContent.querySelectorAll("[data-var-key]");
                for (const s of allSpans) {
                    const k = s.getAttribute("data-var-key");
                    const txt = s.innerText.replace(/\u00a0/g, ' ').trim();
                    const expected = currentData[k] || "";
                    if (txt !== "" && !txt.startsWith("{") && txt !== expected) {
                        targetSpan = s;
                        break;
                    }
                }
            }

            if (targetSpan) {
                const varKey = targetSpan.getAttribute("data-var-key");
                if (varKey) {
                    let newVal = targetSpan.innerText.replace(/\u00a0/g, ' ').trim();
                    if (newVal.startsWith("{") && newVal.endsWith("}")) {
                        newVal = "";
                    }

                    let valToSave = newVal;
                    if (varKey.startsWith("NGAY_")) {
                        const parsed = parseDateToDDMMYYYY(newVal);
                        if (parsed) valToSave = parsed;
                    }

                    // Đồng bộ ngay vào appState
                    if (generalFieldsList.includes(varKey)) {
                        appState.generalInfo[varKey] = valToSave;
                    } else {
                        const currentPkg = appState.packages[appState.activePackageIndex];
                        if (currentPkg) {
                            if (!currentPkg.fields) currentPkg.fields = {};
                            currentPkg.fields[varKey] = valToSave;
                            if (varKey === "TEN_GOI_THAU" && valToSave.trim()) {
                                currentPkg.name = valToSave.split(" ").slice(0, 4).join(" ");
                                renderPackageDropdown();
                            }
                        }
                    }

                    // Đồng bộ ngay sang ô nhập liệu tương ứng ở bảng bên trái
                    const formInput = document.querySelector(`input[data-field="${varKey}"], textarea[data-field="${varKey}"]`);
                    if (formInput && formInput.value !== valToSave) {
                        formInput.value = valToSave;
                        formInput.classList.add("bg-emerald-50");
                        clearTimeout(formInput._syncHighlightTimer);
                        formInput._syncHighlightTimer = setTimeout(() => formInput.classList.remove("bg-emerald-50"), 800);
                    }

                    // Đồng bộ sang các vị trí khác cùng chứa biến này trên Preview
                    const allMatching = documentPreviewContent.querySelectorAll(`[data-var-key="${varKey}"]`);
                    allMatching.forEach(s => {
                        if (s !== targetSpan) {
                            const isHdr = s.getAttribute("data-date-role") === "header";
                            if (valToSave !== "") {
                                s.className = "filled-val";
                                s.textContent = isHdr ? formatDateLongVN(valToSave) : valToSave;
                            } else {
                                s.className = "placeholder-tag";
                                s.innerHTML = isHdr
                                    ? `<i class="fa-solid fa-calendar-days text-[9px] text-amber-700"></i> ngày ..... tháng ..... năm 202...`
                                    : `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${varKey}}`;
                            }
                        }
                    });

                    // Đồng bộ với Tab 1 Tiến độ
                    syncDocFieldChangeToTimeline(varKey, valToSave);
                    updateProgress();
                }
            }

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

            // Highlight corresponding field in left panel with glowing red aura
            if (lastSelectedSpan) {
                const varKey = lastSelectedSpan.getAttribute("data-var-key");
                if (varKey) {
                    highlightFieldWithRedAura(varKey, { noFocus: true });
                }
            }

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
            } else if (sel && sel.rangeCount > 0) {
                lastSelectedRange = sel.getRangeAt(0).cloneRange();
                lastSelectedText = "";
            } else {
                if (document.caretRangeFromPoint) {
                    lastSelectedRange = document.caretRangeFromPoint(e.clientX, e.clientY);
                } else if (document.caretPositionFromPoint) {
                    const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
                    if (pos) {
                        const range = document.createRange();
                        range.setStart(pos.offsetNode, pos.offset);
                        range.collapse(true);
                        lastSelectedRange = range;
                    }
                }
                lastSelectedText = "";
            }

            const menu = document.getElementById("previewContextMenu");
            const previewLabel = document.getElementById("ctxSelectionPreview");
            if (!menu) return;

            if (previewLabel) {
                previewLabel.textContent = lastSelectedText 
                    ? `Vùng chọn: "${lastSelectedText.slice(0, 25)}${lastSelectedText.length > 25 ? '...' : ''}"` 
                    : "Vị trí con trỏ (chèn mới)";
            }

            // Position context menu
            let x = e.clientX, y = e.clientY;
            if (x + 280 > window.innerWidth) x = window.innerWidth - 285;
            if (y + 280 > window.innerHeight) y = window.innerHeight - 285;

            menu.style.left = `${Math.max(10, x)}px`;
            menu.style.top = `${Math.max(10, y)}px`;

            // Toggle Copy / Paste buttons in Context Menu
            const ctxMenuCopyVar = document.getElementById("ctxMenuCopyVar");
            const ctxMenuCopyVarText = document.getElementById("ctxMenuCopyVarText");
            const ctxMenuPasteVar = document.getElementById("ctxMenuPasteVar");
            const ctxMenuPasteVarText = document.getElementById("ctxMenuPasteVarText");

            if (lastSelectedSpan && ctxMenuCopyVar) {
                const tag = lastSelectedSpan.getAttribute("data-var-key");
                if (ctxMenuCopyVarText) ctxMenuCopyVarText.textContent = `Sao chép biến {${tag}}`;
                ctxMenuCopyVar.classList.remove("hidden");
            } else if (ctxMenuCopyVar) {
                ctxMenuCopyVar.classList.add("hidden");
            }

            if (window.lastCopiedVar && ctxMenuPasteVar) {
                if (ctxMenuPasteVarText) ctxMenuPasteVarText.textContent = `Dán biến {${window.lastCopiedVar.varKey}}`;
                ctxMenuPasteVar.classList.remove("hidden");
            } else if (ctxMenuPasteVar) {
                ctxMenuPasteVar.classList.add("hidden");
            }

            menu.classList.remove("hidden");
        });
    }

    // -------------------------------------------------------------
    // Intelligent Copy & Paste for Variables (.filled-val [data-var-key])
    // -------------------------------------------------------------
    let lastCopiedVar = null;
    window.lastCopiedVar = lastCopiedVar;

    function copyVariableToClipboard(varKey, val) {
        window.lastCopiedVar = { varKey, val };
        lastCopiedVar = window.lastCopiedVar;
        const htmlToCopy = `<span class="filled-val" data-var-key="${varKey}" title="Biến: {${varKey}}">${val}</span>`;
        if (navigator.clipboard && navigator.clipboard.write) {
            try {
                const blobHtml = new Blob([htmlToCopy], { type: "text/html" });
                const blobText = new Blob([val], { type: "text/plain" });
                const item = new ClipboardItem({
                    "text/html": blobHtml,
                    "text/plain": blobText
                });
                navigator.clipboard.write([item]).catch(() => {});
            } catch (err) {}
        }
        showToast(`Đã sao chép biến {${varKey}}! Bạn có thể dán (Ctrl+V) vào bất cứ đâu.`, "success");
    }

    function pasteVariableIntoPreview(varKey) {
        const data = getMergedData();
        const currentVal = data[varKey] !== undefined ? data[varKey] : `{${varKey}}`;
        const activeDoc = getCurrentActiveDoc();
        if (!activeDoc) return;

        const span = document.createElement("span");
        span.className = (currentVal && String(currentVal).trim() !== "") ? "filled-val" : "placeholder-tag";
        span.setAttribute("data-var-key", varKey);
        span.title = `Biến: {${varKey}}`;
        span.textContent = currentVal || `{${varKey}}`;

        if (lastSelectedRange) {
            lastSelectedRange.deleteContents();
            lastSelectedRange.insertNode(span);

            const newRange = document.createRange();
            newRange.setStartAfter(span);
            newRange.collapse(true);
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
            lastSelectedRange = newRange.cloneRange();
        } else if (documentPreviewContent) {
            documentPreviewContent.appendChild(span);
        }

        if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
        appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
        if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
        saveState();
        showToast(`Đã dán biến {${varKey}} và liên kết dữ liệu tự động!`, "success");
    }

    window.copyVariableToClipboard = copyVariableToClipboard;
    window.pasteVariableIntoPreview = pasteVariableIntoPreview;

    // Context Menu Copy/Paste Handlers
    const ctxMenuCopyVar = document.getElementById("ctxMenuCopyVar");
    const ctxMenuPasteVar = document.getElementById("ctxMenuPasteVar");
    if (ctxMenuCopyVar) {
        ctxMenuCopyVar.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            if (lastSelectedSpan) {
                const varKey = lastSelectedSpan.getAttribute("data-var-key");
                const data = getMergedData();
                const val = data[varKey] || lastSelectedSpan.textContent;
                copyVariableToClipboard(varKey, val);
            }
        });
    }

    if (ctxMenuPasteVar) {
        ctxMenuPasteVar.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            if (window.lastCopiedVar && window.lastCopiedVar.varKey) {
                pasteVariableIntoPreview(window.lastCopiedVar.varKey);
            }
        });
    }

    if (documentPreviewContent) {
        // Native copy listener: Preserve variable metadata
        documentPreviewContent.addEventListener("copy", (e) => {
            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

            const range = sel.getRangeAt(0);
            const container = document.createElement("div");
            container.appendChild(range.cloneContents());

            // 1. Check if selection is inside a single variable span
            const startNode = range.startContainer;
            const parentSpan = startNode.nodeType === Node.ELEMENT_NODE 
                ? startNode.closest("[data-var-key]") 
                : startNode.parentElement?.closest("[data-var-key]");

            if (parentSpan) {
                const varKey = parentSpan.getAttribute("data-var-key");
                const data = getMergedData();
                const currentVal = data[varKey] || parentSpan.textContent;
                const htmlToCopy = `<span class="filled-val" data-var-key="${varKey}" title="Biến: {${varKey}}">${currentVal}</span>`;

                window.lastCopiedVar = { varKey, val: currentVal };
                lastCopiedVar = window.lastCopiedVar;

                e.clipboardData.setData("text/html", htmlToCopy);
                e.clipboardData.setData("text/plain", currentVal);
                e.clipboardData.setData("application/x-ho-so-var", JSON.stringify({ varKey, val: currentVal }));
                e.preventDefault();
                return;
            }

            // 2. Check if selection contains multiple variable spans
            if (container.querySelector("[data-var-key]")) {
                const data = getMergedData();
                container.querySelectorAll("[data-var-key]").forEach(span => {
                    const k = span.getAttribute("data-var-key");
                    span.className = "filled-val";
                    span.setAttribute("title", `Biến: {${k}}`);
                    if (data[k]) span.textContent = data[k];
                });

                const firstSpan = container.querySelector("[data-var-key]");
                if (firstSpan) {
                    const firstKey = firstSpan.getAttribute("data-var-key");
                    window.lastCopiedVar = { varKey: firstKey, val: firstSpan.textContent };
                    lastCopiedVar = window.lastCopiedVar;
                }

                e.clipboardData.setData("text/html", container.innerHTML);
                e.clipboardData.setData("text/plain", sel.toString());
                e.preventDefault();
                return;
            }
        });

        // Native paste listener: Automatically rebind variable spans and tags
        documentPreviewContent.addEventListener("paste", (e) => {
            const customVarJson = e.clipboardData?.getData("application/x-ho-so-var");
            const htmlData = e.clipboardData?.getData("text/html");
            const textData = e.clipboardData?.getData("text/plain");

            let fragmentToInsert = null;

            // Case 1: Custom ho-so-var metadata
            if (customVarJson) {
                try {
                    const parsed = JSON.parse(customVarJson);
                    if (parsed && parsed.varKey) {
                        const varKey = parsed.varKey;
                        const data = getMergedData();
                        const currentVal = data[varKey] !== undefined ? data[varKey] : parsed.val;
                        const span = document.createElement("span");
                        span.className = (currentVal && String(currentVal).trim() !== "") ? "filled-val" : "placeholder-tag";
                        span.setAttribute("data-var-key", varKey);
                        span.title = `Biến: {${varKey}}`;
                        span.textContent = currentVal || `{${varKey}}`;

                        fragmentToInsert = document.createDocumentFragment();
                        fragmentToInsert.appendChild(span);
                    }
                } catch (err) {}
            }

            // Case 2: HTML with data-var-key
            if (!fragmentToInsert && htmlData && htmlData.includes("data-var-key")) {
                const temp = document.createElement("div");
                temp.innerHTML = htmlData;
                const data = getMergedData();
                temp.querySelectorAll("[data-var-key]").forEach(span => {
                    const varKey = span.getAttribute("data-var-key");
                    const currentVal = data[varKey] !== undefined ? data[varKey] : span.textContent;
                    span.className = (currentVal && String(currentVal).trim() !== "") ? "filled-val" : "placeholder-tag";
                    span.title = `Biến: {${varKey}}`;
                    span.textContent = currentVal || `{${varKey}}`;
                });

                fragmentToInsert = document.createDocumentFragment();
                while (temp.firstChild) {
                    fragmentToInsert.appendChild(temp.firstChild);
                }
            }

            // Case 3: Raw tag {TAG} or {{TAG}} pasted as text
            if (!fragmentToInsert && textData) {
                const trimmed = textData.trim();
                const tagMatch = trimmed.match(/^\{+([A-Z0-9_]{3,})\}+$/);
                if (tagMatch) {
                    const varKey = tagMatch[1];
                    const data = getMergedData();
                    const exists = MASTER_VARIABLES_CATALOG.some(v => v.tag === varKey) || data[varKey] !== undefined;
                    if (exists) {
                        const currentVal = data[varKey];
                        const span = document.createElement("span");
                        span.className = (currentVal && String(currentVal).trim() !== "") ? "filled-val" : "placeholder-tag";
                        span.setAttribute("data-var-key", varKey);
                        span.title = `Biến: {${varKey}}`;
                        span.textContent = currentVal || `{${varKey}}`;

                        fragmentToInsert = document.createDocumentFragment();
                        fragmentToInsert.appendChild(span);
                    }
                }
            }

            // If we have variable fragment to insert
            if (fragmentToInsert) {
                e.preventDefault();
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    range.deleteContents();

                    const lastChild = fragmentToInsert.lastChild;
                    range.insertNode(fragmentToInsert);

                    if (lastChild) {
                        const newRange = document.createRange();
                        newRange.setStartAfter(lastChild);
                        newRange.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                        lastSelectedRange = newRange.cloneRange();
                    }
                } else if (lastSelectedRange) {
                    lastSelectedRange.deleteContents();
                    lastSelectedRange.insertNode(fragmentToInsert);
                } else {
                    documentPreviewContent.appendChild(fragmentToInsert);
                }

                // Save to customDocumentHtml
                const activeDoc = getCurrentActiveDoc();
                if (activeDoc) {
                    if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
                    appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
                }
                if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");
                saveState();
                showToast("Đã dán biến xạ và đồng bộ dữ liệu tự động thành công!", "success");
            }
        });
    }

    // -------------------------------------------------------------
    // Direct Inline Variable Editing via Double-Click
    // -------------------------------------------------------------
    let activeEditingVarSpan = null;

    function makeVariableInlineEditable(span) {
        if (!span) return;
        const varKey = span.getAttribute("data-var-key");
        if (!varKey) return;

        // If another span is currently being edited, commit and save it first
        if (activeEditingVarSpan && activeEditingVarSpan !== span) {
            commitVariableEdit(activeEditingVarSpan, true);
        }

        activeEditingVarSpan = span;

        // Determine original value
        const isPlaceholder = span.classList.contains("placeholder-tag");
        const originalVal = isPlaceholder ? "" : span.innerText.trim();
        span.dataset.originalVal = originalVal;

        if (isPlaceholder) {
            span.textContent = "";
        }

        // Enable contenteditable on this specific span
        span.contentEditable = "true";
        span.classList.add("var-inline-editing");

        // Focus & đặt con trỏ thân thiện
        span.focus();
        if (!isPlaceholder && span.textContent.length > 0) {
            try {
                const range = document.createRange();
                range.selectNodeContents(span);
                range.collapse(false);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            } catch (err) {}
        }

        // Undo / Redo history stack for Ctrl+Z
        const undoStack = [span.innerText];
        const redoStack = [];
        let isUndoRedoAction = false;

        // Position Floating Toolbar thông minh
        const badge = document.getElementById("varEditFloatingBadge");
        const badgeKey = document.getElementById("varEditBadgeKey");
        const btnSave = document.getElementById("btnVarEditSave");
        const btnCancel = document.getElementById("btnVarEditCancel");

        function updateBadgePosition() {
            if (!badge || badge.classList.contains("hidden")) return;
            const rect = span.getBoundingClientRect();
            let topPos = rect.bottom + 6;
            if (topPos + 40 > window.innerHeight) {
                topPos = Math.max(5, rect.top - 38);
            }
            let leftPos = Math.max(10, Math.min(rect.left, window.innerWidth - 420));
            badge.style.top = `${topPos}px`;
            badge.style.left = `${leftPos}px`;
        }

        if (badge && badgeKey) {
            badgeKey.textContent = `{${varKey}}`;
            updateBadgePosition();
            badge.classList.remove("hidden");

            // Quan trọng: Chống blur trên span khi click chuột vào toolbar hoặc các nút
            badge.onmousedown = (e) => {
                e.preventDefault();
            };
        }

        window.addEventListener("scroll", updateBadgePosition, { passive: true });
        if (documentPreviewContent) {
            documentPreviewContent.addEventListener("scroll", updateBadgePosition, { passive: true });
        }

        function finishEdit(shouldSave) {
            cleanupListeners();
            commitVariableEdit(span, shouldSave);
        }

        function onBtnSaveClick(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            finishEdit(true);
        }

        function onBtnCancelClick(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            finishEdit(false);
        }

        if (btnSave) btnSave.onclick = onBtnSaveClick;
        if (btnCancel) btnCancel.onclick = onBtnCancelClick;

        function handleKeydown(e) {
            // 1. Phím Enter: Lưu & Hoàn tất (không Shift)
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                finishEdit(true);
                return;
            }

            // 2. Phím Esc: Hủy bỏ & Khôi phục 100%
            if (e.key === "Escape") {
                e.preventDefault();
                finishEdit(false);
                return;
            }

            // 3. Phím Ctrl + Z: Hoàn tác (Undo)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
                e.preventDefault();
                if (undoStack.length > 1) {
                    const current = undoStack.pop();
                    redoStack.push(current);
                    const prev = undoStack[undoStack.length - 1];
                    isUndoRedoAction = true;
                    span.innerText = prev;
                    handleInput();
                    try {
                        const range = document.createRange();
                        range.selectNodeContents(span);
                        range.collapse(false);
                        const sel = window.getSelection();
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                    } catch (err) {}
                    isUndoRedoAction = false;
                } else if (undoStack.length === 1) {
                    isUndoRedoAction = true;
                    span.innerText = originalVal;
                    handleInput();
                    try {
                        const range = document.createRange();
                        range.selectNodeContents(span);
                        range.collapse(false);
                        const sel = window.getSelection();
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                    } catch (err) {}
                    isUndoRedoAction = false;
                }
                return;
            }

            // 4. Phím Ctrl + Y hoặc Ctrl + Shift + Z: Làm lại (Redo)
            if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
                ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")) {
                e.preventDefault();
                if (redoStack.length > 0) {
                    const nextVal = redoStack.pop();
                    undoStack.push(nextVal);
                    isUndoRedoAction = true;
                    span.innerText = nextVal;
                    handleInput();
                    try {
                        const range = document.createRange();
                        range.selectNodeContents(span);
                        range.collapse(false);
                        const sel = window.getSelection();
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                    } catch (err) {}
                    isUndoRedoAction = false;
                }
                return;
            }
        }

        function handleInput() {
            const rawVal = span.innerText.replace(/\u00a0/g, ' ').trim();

            if (!isUndoRedoAction) {
                const lastVal = undoStack[undoStack.length - 1];
                if (lastVal !== span.innerText) {
                    undoStack.push(span.innerText);
                    redoStack.length = 0;
                }
            }

            let valToSave = rawVal;
            if (varKey.startsWith("NGAY_")) {
                const parsed = parseDateToDDMMYYYY(rawVal);
                if (parsed) valToSave = parsed;
            }

            // Đồng bộ trực tiếp vào appState khi người dùng gõ từng ký tự
            if (generalFieldsList.includes(varKey)) {
                appState.generalInfo[varKey] = valToSave;
            } else {
                const currentPkg = appState.packages[appState.activePackageIndex];
                if (currentPkg) {
                    if (!currentPkg.fields) currentPkg.fields = {};
                    currentPkg.fields[varKey] = valToSave;
                }
            }

            // Đồng bộ sang ô nhập liệu bên trái ngay khi gõ
            const formInput = document.querySelector(`input[data-field="${varKey}"], textarea[data-field="${varKey}"]`);
            if (formInput && formInput.value !== valToSave) {
                formInput.value = valToSave;
                formInput.classList.add("bg-emerald-50");
                clearTimeout(formInput._syncHighlightTimer);
                formInput._syncHighlightTimer = setTimeout(() => formInput.classList.remove("bg-emerald-50"), 800);
            }

            // Đồng bộ sang các span khác cùng biến
            const allSpans = documentPreviewContent.querySelectorAll(`[data-var-key="${varKey}"]`);
            allSpans.forEach(s => {
                if (s !== span) {
                    const isHdr = s.getAttribute("data-date-role") === "header";
                    s.textContent = isHdr ? formatDateLongVN(valToSave) : valToSave;
                }
            });

            syncDocFieldChangeToTimeline(varKey, valToSave);
            updateProgress();
            updateBadgePosition();
        }

        // Bấm bên ngoài để lưu ("hoặc bấm bên ngoài là lưu")
        function handleDocumentMouseDown(e) {
            if (span.contains(e.target)) return;
            if (badge && badge.contains(e.target)) return;
            // Người dùng click ra bên ngoài: Hoàn tất & Lưu ngay lập tức!
            finishEdit(true);
        }

        function cleanupListeners() {
            span.removeEventListener("keydown", handleKeydown);
            span.removeEventListener("input", handleInput);
            document.removeEventListener("mousedown", handleDocumentMouseDown);
            window.removeEventListener("scroll", updateBadgePosition);
            if (documentPreviewContent) {
                documentPreviewContent.removeEventListener("scroll", updateBadgePosition);
            }
            if (badge) badge.onmousedown = null;
            if (btnSave) btnSave.onclick = null;
            if (btnCancel) btnCancel.onclick = null;
        }

        span.addEventListener("keydown", handleKeydown);
        span.addEventListener("input", handleInput);
        setTimeout(() => {
            document.addEventListener("mousedown", handleDocumentMouseDown);
        }, 60);
    }

    function commitVariableEdit(span, shouldSave) {
        if (!span) return;
        const varKey = span.getAttribute("data-var-key");
        const badge = document.getElementById("varEditFloatingBadge");
        if (badge) badge.classList.add("hidden");

        span.removeAttribute("contenteditable");
        span.classList.remove("var-inline-editing");
        if (activeEditingVarSpan === span) {
            activeEditingVarSpan = null;
        }

        const originalVal = span.dataset.originalVal !== undefined ? span.dataset.originalVal : "";

        if (!shouldSave) {
            // 1. Phục hồi lại thẻ span trên Preview
            if (originalVal === "") {
                span.className = "placeholder-tag";
                span.innerHTML = `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${varKey}}`;
            } else {
                span.className = "filled-val";
                span.textContent = originalVal;
            }

            // 2. Phục hồi lại appState
            if (generalFieldsList.includes(varKey)) {
                if (!appState.generalInfo) appState.generalInfo = {};
                appState.generalInfo[varKey] = originalVal;
                (appState.packages || []).forEach(p => {
                    if (p.fields && p.fields[varKey] !== undefined) delete p.fields[varKey];
                });
            } else {
                const currentPkg = appState.packages[appState.activePackageIndex];
                if (currentPkg && currentPkg.fields) {
                    currentPkg.fields[varKey] = originalVal;
                }
            }

            // 3. Phục hồi lại ô nhập liệu tương ứng ở bảng bên trái
            const formInput = document.querySelector(`input[data-field="${varKey}"], textarea[data-field="${varKey}"]`);
            if (formInput) {
                formInput.value = originalVal;
            }

            // 4. Phục hồi các vị trí khác cùng chứa biến này
            const allMatchingSpans = documentPreviewContent.querySelectorAll(`[data-var-key="${varKey}"]`);
            allMatchingSpans.forEach(el => {
                const isHeaderDate = el.getAttribute("data-date-role") === "header";
                if (originalVal !== "") {
                    el.className = "filled-val";
                    el.textContent = isHeaderDate ? formatDateLongVN(originalVal) : originalVal;
                } else {
                    el.className = "placeholder-tag";
                    el.innerHTML = isHeaderDate
                        ? `<i class="fa-solid fa-calendar-days text-[9px] text-amber-700"></i> ngày ..... tháng ..... năm 202...`
                        : `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${varKey}}`;
                }
            });

            syncDocFieldChangeToTimeline(varKey, originalVal);
            updateProgress();
            saveState();
            showToast(`Đã hủy chỉnh sửa biến {${varKey}}, khôi phục giá trị ban đầu!`, "info");
            return;
        }

        const newVal = span.innerText.trim();

        // If editing a date variable, normalize to DD/MM/YYYY
        let normalizedVal = newVal;
        if (varKey.startsWith("NGAY_")) {
            normalizedVal = parseDateToDDMMYYYY(newVal);
        }
        const newValToSave = normalizedVal;

        // 1. Update data in state
        if (generalFieldsList.includes(varKey)) {
            if (!appState.generalInfo) appState.generalInfo = {};
            appState.generalInfo[varKey] = newValToSave || newVal;
            (appState.packages || []).forEach(p => {
                if (p.fields && p.fields[varKey] !== undefined) delete p.fields[varKey];
            });
        } else {
            const currentPkg = appState.packages[appState.activePackageIndex];
            if (currentPkg) {
                if (!currentPkg.fields) currentPkg.fields = {};
                currentPkg.fields[varKey] = newValToSave || newVal;
            }
        }

        if (window.customVariables && window.customVariables[varKey]) {
            window.customVariables[varKey].value = newVal;
        }

        // 2. Update all occurrences of this variable in document preview
        const allMatchingSpans = documentPreviewContent.querySelectorAll(`[data-var-key="${varKey}"]`);
        allMatchingSpans.forEach(el => {
            const isHeaderDate = el.getAttribute("data-date-role") === "header";
            if (normalizedVal !== "") {
                el.className = "filled-val";
                el.textContent = isHeaderDate ? formatDateLongVN(normalizedVal) : normalizedVal;
            } else {
                el.className = "placeholder-tag";
                el.innerHTML = isHeaderDate
                    ? `<i class="fa-solid fa-calendar-days text-[9px] text-amber-700"></i> ngày ..... tháng ..... năm 202...`
                    : `<i class="fa-solid fa-pen-to-square text-[9px] text-amber-700"></i> {${varKey}}`;
            }
            el.setAttribute("data-var-key", varKey);
            el.title = `Biến: {${varKey}} (Double-click để sửa trực tiếp, Chuột phải để quản lý)`;
        });

        // 3. Update input field on left form accordion
        const formInput = document.querySelector(`input[data-field="${varKey}"], textarea[data-field="${varKey}"]`);
        if (formInput) {
            formInput.value = newValToSave || newVal;
            formInput.classList.add("bg-emerald-50");
            setTimeout(() => formInput.classList.remove("bg-emerald-50"), 1200);
        }

        // 4. Two-way sync to Tab 1 if linked date or docNo
        syncDocFieldChangeToTimeline(varKey, newValToSave || newVal);

        // 5. Update customDocumentHtml if user has a customized template
        const activeDoc = getCurrentActiveDoc();
        if (activeDoc && appState.customDocumentHtml && appState.customDocumentHtml[activeDoc.id]) {
            appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
        }

        saveState();
        updateProgress();

        if (newVal !== originalVal) {
            showToast(`Đã lưu biến {${varKey}}: "${newVal.slice(0, 30)}${newVal.length > 30 ? '...' : ''}"`, "success");
        }
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
    window.populateCtxVarsSubmenu = populateCtxVarsSubmenu;

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
        if (!activeDoc) {
            showToast("Vui lòng chọn một văn bản trên Preview trước!", "error");
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

        if (lastSelectedRange) {
            lastSelectedRange.deleteContents();
            lastSelectedRange.insertNode(span);

            const newRange = document.createRange();
            newRange.setStartAfter(span);
            newRange.collapse(true);
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
            lastSelectedRange = newRange.cloneRange();
        } else if (documentPreviewContent) {
            documentPreviewContent.appendChild(span);
        }

        // Save custom document HTML
        if (!appState.customDocumentHtml) appState.customDocumentHtml = {};
        appState.customDocumentHtml[activeDoc.id] = documentPreviewContent.innerHTML;
        if (btnResetPreviewDoc) btnResetPreviewDoc.classList.remove("hidden");

        saveState();
    }

        // Helper: Smart Detection of Context (Group, Scope, Label, Tag) from selected text
    function detectContextFromText(text) {
        if (!text) {
            return {
                groupKey: "J",
                groupName: "J. Tùy biến bổ sung",
                isGeneral: false,
                suggestedLabel: "Biến bổ sung",
                suggestedKey: "BIEN_MOI_" + Date.now().toString().slice(-4)
            };
        }
        const trimmed = text.trim();
        const lower = trimmed.toLowerCase();

        // 1. Căn cứ pháp lý
        if (/^(căn cứ|can cu)/i.test(trimmed) || lower.includes("luật đấu thầu") || lower.includes("nghị định") || lower.includes("thông tư")) {
            let label = "Căn cứ pháp lý";
            let tag = "CAN_CU_PHAP_LY";
            if (lower.includes("luật đấu thầu")) {
                const matchNum = trimmed.match(/(\d+[\d\/a-zA-Z\-_]*)/);
                tag = matchNum ? `CAN_CU_LUAT_DAU_THAU_${matchNum[1].replace(/[^0-9]/g, "")}` : "CAN_CU_LUAT_DAU_THAU";
                label = "Căn cứ Luật Đấu thầu" + (matchNum ? ` số ${matchNum[1]}` : "");
            } else if (lower.includes("nghị định")) {
                const matchNum = trimmed.match(/nghị định số\s*([0-9\/]+)/i);
                tag = matchNum ? `CAN_CU_ND_${matchNum[1].replace(/[^0-9]/g, "_")}` : "CAN_CU_NGHI_DINH";
                label = matchNum ? `Căn cứ Nghị định ${matchNum[1]}` : "Căn cứ Nghị định";
            } else if (lower.includes("thông tư")) {
                const matchNum = trimmed.match(/thông tư số\s*([0-9\/]+)/i);
                tag = matchNum ? `CAN_CU_TT_${matchNum[1].replace(/[^0-9]/g, "_")}` : "CAN_CU_THONG_TU";
                label = matchNum ? `Căn cứ Thông tư ${matchNum[1]}` : "Căn cứ Thông tư";
            } else {
                const words = trimmed.split(/\s+/).slice(0, 5).join(" ");
                label = words;
                tag = slugifyToUpperSnake(words).slice(0, 24);
            }
            return {
                groupKey: "I",
                groupName: "I. Căn cứ pháp lý",
                isGeneral: true,
                suggestedLabel: label,
                suggestedKey: tag
            };
        }

        // 2. Số hiệu văn bản
        if (/(quyết định số|tờ trình số|thông báo số|biên bản số|công văn số|\/qđ-|\/ttr-|\/tb-|\/bb-|\/bql)/i.test(trimmed)) {
            let label = "Số hiệu văn bản";
            let tag = "SO_VAN_BAN";
            if (/tờ trình/i.test(trimmed)) {
                label = "Số Tờ trình";
                tag = "SO_TO_TRINH";
            } else if (/quyết định/i.test(trimmed)) {
                label = "Số Quyết định";
                tag = "SO_QUYET_DINH";
            } else if (/thông báo/i.test(trimmed)) {
                label = "Số Thông báo";
                tag = "SO_THONG_BAO";
            } else if (/biên bản/i.test(trimmed)) {
                label = "Số Biên bản";
                tag = "SO_BIEN_BAN";
            }
            return {
                groupKey: "E",
                groupName: "E. Số hiệu VB",
                isGeneral: false,
                suggestedLabel: label,
                suggestedKey: tag
            };
        }

        // 3. Ngày tháng
        if (/ngày\s+\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4}/i.test(trimmed)) {
            return {
                groupKey: "G",
                groupName: "G. Ngày (Full)",
                isGeneral: false,
                suggestedLabel: "Ngày ban hành (Full)",
                suggestedKey: "NGAY_BAN_HANH_FULL"
            };
        }
        if (/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}\b/.test(trimmed)) {
            return {
                groupKey: "F",
                groupName: "F. Ngày (dd/mm/yyyy)",
                isGeneral: false,
                suggestedLabel: "Ngày văn bản (dd/mm/yyyy)",
                suggestedKey: "NGAY_VAN_BAN"
            };
        }

        // 4. Tài chính
        if (/(\b\d{1,3}(\.\d{3})+|\b\d+)\s*(đồng|vnd|vnđ)/i.test(trimmed) || /giá gói|dự toán|tiết kiệm/i.test(trimmed)) {
            return {
                groupKey: "C",
                groupName: "C. Tài chính",
                isGeneral: false,
                suggestedLabel: "Giá trị / Số tiền",
                suggestedKey: "GIA_TRI_TIEN"
            };
        }

        // 5. Nhà thầu
        if (/^(công ty|doanh nghiệp|nhà thầu|tổng công ty|liên danh)/i.test(trimmed) || /tên nhà thầu/i.test(trimmed)) {
            const shortName = trimmed.replace(/^(công ty|tnhh|cổ phần|cp|tổng công ty)\s+/i, "").split(/\s+/).slice(0, 3).join(" ");
            return {
                groupKey: "D",
                groupName: "D. Nhà thầu",
                isGeneral: false,
                suggestedLabel: `Nhà thầu ${shortName}`,
                suggestedKey: `NHA_THAU_${slugifyToUpperSnake(shortName).slice(0, 18)}`
            };
        }

        // 6. Chủ đầu tư
        if (/(chủ đầu tư|ban quản lý|ban điều hành|ban qlda|cảng hàng không|giám đốc ban)/i.test(trimmed)) {
            return {
                groupKey: "A",
                groupName: "A. Chủ đầu tư",
                isGeneral: true,
                suggestedLabel: trimmed.length > 35 ? trimmed.slice(0, 35) + "..." : trimmed,
                suggestedKey: "DON_VI_CDT"
            };
        }

        // 7. Dự án & Gói thầu
        if (/(dự án|công trình|gói thầu|hạng mục)/i.test(trimmed)) {
            return {
                groupKey: "B",
                groupName: "B. Dự án & Gói thầu",
                isGeneral: /dự án|công trình/i.test(trimmed),
                suggestedLabel: trimmed.length > 35 ? trimmed.slice(0, 35) + "..." : trimmed,
                suggestedKey: /gói thầu/i.test(trimmed) ? "TEN_GOI_THAU_MOI" : "TEN_DU_AN_MOI"
            };
        }

        // 8. Tùy biến bổ sung (Default)
        const words = trimmed.split(/\s+/).slice(0, 4).join(" ");
        return {
            groupKey: "J",
            groupName: "J. Tùy biến bổ sung",
            isGeneral: false,
            suggestedLabel: words.length > 35 ? words.slice(0, 35) : words,
            suggestedKey: slugifyToUpperSnake(words).slice(0, 22)
        };
    }

    function validateNewVarInputs() {
        const keyInput = document.getElementById("inputNewVarKey");
        const labelInput = document.getElementById("inputNewVarLabel");
        const preview = document.getElementById("newVarKeyPreview");
        const feedback = document.getElementById("newVarKeyFeedback");
        const btnConfirm = document.getElementById("btnConfirmCreateVar");

        if (!keyInput || !labelInput || !btnConfirm) return;

        let rawKey = keyInput.value;
        let cleanKey = slugifyToUpperSnake(rawKey);
        if (keyInput.value !== cleanKey && document.activeElement === keyInput) {
            const pos = keyInput.selectionStart;
            keyInput.value = cleanKey;
            keyInput.setSelectionRange(pos, pos);
        } else {
            keyInput.value = cleanKey;
        }

        if (preview) preview.textContent = cleanKey ? `{${cleanKey}}` : "{TAG}";

        const label = labelInput.value.trim();
        let isKeyValid = false;
        let isDuplicate = false;
        let conflictingVar = null;

        if (!cleanKey) {
            if (feedback) {
                feedback.className = "mt-1 p-1.5 rounded text-[10.5px] bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1.5";
                feedback.innerHTML = `<i class="fa-solid fa-circle-info text-slate-500"></i><span>Vui lòng nhập mã thẻ (viết HOA không dấu, ví dụ: <code>CAN_CU_LUAT_DAU_THAU</code>).</span>`;
                feedback.classList.remove("hidden");
            }
            keyInput.className = "w-full pl-6 pr-6 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-mono font-bold uppercase focus:bg-white focus:ring-1 focus:ring-emerald-500";
        } else {
            conflictingVar = isTagInUse(cleanKey);

            if (conflictingVar) {
                isDuplicate = true;
                const candidates = generateCandidateTags(cleanKey);
                const sampleName = label || "Biến mới";
                if (feedback) {
                    feedback.className = "mt-1.5 p-2 rounded text-[11px] bg-rose-50 text-rose-900 border border-rose-300 flex items-start gap-2 shadow-xs";
                    feedback.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation text-rose-600 mt-0.5 shrink-0 text-sm"></i>
                        <div class="flex-1 space-y-1.5">
                            <div>
                                <b>❌ TRÙNG LẶP MÃ THẺ!</b> Mã <code>{${cleanKey}}</code> đã được dùng cho biến: <b>"${conflictingVar.label}"</b> (${conflictingVar.group}).
                            </div>
                            <div class="text-[10px] text-amber-900 bg-amber-50/80 p-1.5 rounded border border-amber-200 leading-normal">
                                <span class="font-bold"><i class="fa-solid fa-lightbulb text-amber-600"></i> Đề xuất:</span> Điều chỉnh lại tên hiển thị (Ví dụ: <em>"${sampleName} tờ trình"</em> ➔ mã <code>{${cleanKey}_TO_TRINH}</code>) hoặc bấm chọn nhanh một trong các gợi ý an toàn bên dưới:
                            </div>
                            ${candidates.length > 0 ? `
                            <div class="pt-0.5">
                                <div class="text-[10px] text-slate-700 font-semibold mb-1">Gợi ý mã thẻ an toàn (bấm để chọn nhanh):</div>
                                <div class="flex flex-wrap gap-1.5">
                                    ${candidates.map(c => `
                                        <button type="button" class="btn-choose-new-var-tag px-2 py-0.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 hover:border-emerald-500 rounded font-mono text-[10.5px] font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1" data-tag="${c}">
                                            <i class="fa-solid fa-plus text-[9px] text-emerald-600"></i><span>{${c}}</span>
                                        </button>
                                    `).join("")}
                                </div>
                            </div>
                            ` : ""}
                        </div>
                    `;
                    feedback.classList.remove("hidden");

                    feedback.querySelectorAll(".btn-choose-new-var-tag").forEach(btn => {
                        btn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const chosen = btn.getAttribute("data-tag");
                            if (chosen) {
                                keyInput.value = chosen;
                                validateNewVarInputs();
                                keyInput.focus();
                            }
                        };
                    });
                }
                keyInput.className = "w-full pl-6 pr-6 py-1.5 bg-rose-50 border-2 border-rose-500 rounded text-xs text-rose-900 font-mono font-bold uppercase focus:bg-white focus:ring-2 focus:ring-rose-500";
            } else {
                isKeyValid = true;
                if (feedback) {
                    feedback.className = "mt-1 p-1.5 rounded text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5";
                    feedback.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i><span><b>✅ Mã thẻ hợp lệ!</b> Mã <code>{${cleanKey}}</code> là duy nhất và chưa từng bị trùng lặp.</span>`;
                    feedback.classList.remove("hidden");
                }
                keyInput.className = "w-full pl-6 pr-6 py-1.5 bg-emerald-50/50 border border-emerald-400 rounded text-xs text-emerald-950 font-mono font-bold uppercase focus:bg-white focus:ring-1 focus:ring-emerald-500";
            }
        }

        const isLabelValid = label.length > 0;
        btnConfirm.disabled = !isKeyValid || isDuplicate || !isLabelValid;
    }

    function autoSuggestNewVarKey() {
        const labelInput = document.getElementById("inputNewVarLabel");
        const keyInput = document.getElementById("inputNewVarKey");
        if (!labelInput || !keyInput) return;

        const label = labelInput.value.trim();
        if (!label) {
            showToast("Vui lòng nhập Tên hiển thị trên form trước để gợi ý mã TAG!", "warning");
            labelInput.focus();
            return;
        }

        const baseTag = slugifyToUpperSnake(label);
        if (!baseTag) {
            showToast("Tên hiển thị không hợp lệ để tạo mã TAG!", "error");
            return;
        }

        const conflicting = isTagInUse(baseTag);
        if (!conflicting) {
            keyInput.value = baseTag;
            validateNewVarInputs();
            showToast(`Đã tự động tạo mã TAG: {${baseTag}}`, "success");
        } else {
            const candidates = generateCandidateTags(baseTag);
            const safeTag = candidates.length > 0 ? candidates[0] : `${baseTag}_1`;
            keyInput.value = safeTag;
            validateNewVarInputs();
            showToast(`Mã {${baseTag}} đã trùng với "${conflicting.label}". Đã đề xuất mã an toàn: {${safeTag}}!`, "warning");
        }
    }

    // Context Menu: "Bổ sung Biến xạ mới"
    const ctxMenuAddVar = document.getElementById("ctxMenuAddVar");
    const modalCreateVar = document.getElementById("modalCreateVarFromPreview");
    const inputNewVarKey = document.getElementById("inputNewVarKey");
    const inputNewVarLabel = document.getElementById("inputNewVarLabel");
    const inputNewVarVal = document.getElementById("inputNewVarVal");
    const btnSuggestNewVarKey = document.getElementById("btnSuggestNewVarKey");
    const btnConfirmCreateVar = document.getElementById("btnConfirmCreateVar");
    const btnCloseCreateVarModal = document.getElementById("btnCloseCreateVarModal");
    const btnCancelCreateVar = document.getElementById("btnCancelCreateVar");

    if (btnSuggestNewVarKey) btnSuggestNewVarKey.onclick = autoSuggestNewVarKey;
    if (inputNewVarKey) inputNewVarKey.oninput = validateNewVarInputs;
    if (inputNewVarLabel) inputNewVarLabel.oninput = validateNewVarInputs;

    if (modalCreateVar) {
        setupSafeModalBackdropClose(modalCreateVar, () => modalCreateVar.classList.add("hidden"));
    }
    if (btnCloseCreateVarModal) {
        btnCloseCreateVarModal.onclick = () => modalCreateVar?.classList.add("hidden");
    }
    if (btnCancelCreateVar) {
        btnCancelCreateVar.onclick = () => modalCreateVar?.classList.add("hidden");
    }

    if (ctxMenuAddVar) {
        ctxMenuAddVar.addEventListener("click", () => {
            document.getElementById("previewContextMenu")?.classList.add("hidden");
            if (!lastSelectedText && window.lastSelectedText) {
                lastSelectedText = window.lastSelectedText;
            }
            if (!lastSelectedRange && window.lastSelectedRange) {
                lastSelectedRange = window.lastSelectedRange;
            }
            if (!lastSelectedText && !lastSelectedRange) {
                showToast("Vui lòng quét khối văn bản cần tạo biến trước!", "error");
                return;
            }

            const rawText = lastSelectedText.trim();
            const detected = detectContextFromText(rawText);

            if (inputNewVarVal) inputNewVarVal.value = rawText;
            if (inputNewVarLabel) inputNewVarLabel.value = detected.suggestedLabel;

            const groupSelect = document.getElementById("inputNewVarGroup");
            if (groupSelect) groupSelect.value = detected.groupKey;

            const scopeSelect = document.getElementById("inputNewVarScope");
            if (scopeSelect) scopeSelect.value = detected.isGeneral ? "general" : "package";

            const grpBadge = document.getElementById("newVarDetectedGroupBadge");
            if (grpBadge) grpBadge.classList.remove("hidden");
            const scopeBadge = document.getElementById("newVarDetectedScopeBadge");
            if (scopeBadge) scopeBadge.classList.remove("hidden");

            let safeKey = detected.suggestedKey;
            if (isTagInUse(safeKey)) {
                const candidates = generateCandidateTags(safeKey);
                if (candidates.length > 0) safeKey = candidates[0];
                else safeKey = `${safeKey}_1`;
            }
            if (inputNewVarKey) inputNewVarKey.value = safeKey;

            validateNewVarInputs();

            if (modalCreateVar) modalCreateVar.classList.remove("hidden");
            setTimeout(() => {
                inputNewVarLabel?.focus();
                inputNewVarLabel?.select();
            }, 100);
        });
    }

    if (btnConfirmCreateVar) {
        btnConfirmCreateVar.addEventListener("click", () => {
            const key = inputNewVarKey ? inputNewVarKey.value.trim().toUpperCase() : "";
            const label = inputNewVarLabel ? inputNewVarLabel.value.trim() : key;
            const val = inputNewVarVal ? inputNewVarVal.value.trim() : "";
            const groupKey = document.getElementById("inputNewVarGroup")?.value || "J";
            const isGeneral = document.getElementById("inputNewVarScope")?.value === "general";

            const groupNames = {
                "A": "A. Chủ đầu tư",
                "B": "B. Dự án & Gói thầu",
                "C": "C. Tài chính",
                "D": "D. Nhà thầu",
                "E": "E. Số hiệu VB",
                "F": "F. Ngày (dd/mm/yyyy)",
                "G": "G. Ngày (Full)",
                "H": "H. Tên trích dẫn",
                "I": "I. Căn cứ pháp lý",
                "J": "J. Tùy biến bổ sung"
            };
            const groupName = groupNames[groupKey] || "J. Tùy biến bổ sung";

            if (!key || !label) {
                alert("Vui lòng nhập đầy đủ Mã biến xạ và Tên hiển thị!");
                return;
            }

            // 1. Add to MASTER_VARIABLES_CATALOG and save customizations
            const cleanTag = key.replace(/^[{]+|[}]+$/g, "").toUpperCase();
            const existingCat = MASTER_VARIABLES_CATALOG.find(v => v.tag.toUpperCase() === cleanTag);
            if (existingCat) {
                existingCat.label = label;
                existingCat.groupKey = groupKey;
                existingCat.group = groupName;
                existingCat.isGeneral = isGeneral;
                existingCat.example = val;
            } else {
                MASTER_VARIABLES_CATALOG.push({
                    stt: MASTER_VARIABLES_CATALOG.length + 1,
                    groupKey: groupKey,
                    group: groupName,
                    label: label,
                    tag: cleanTag,
                    isGeneral: isGeneral,
                    example: val,
                    isCustom: true
                });
            }
            if (typeof saveCatalogCustomizations === "function") saveCatalogCustomizations();
            if (typeof renderVarsDictionaryTable === "function") renderVarsDictionaryTable();

            // 2. Set value in appState
            if (isGeneral) {
                appState.generalInfo[cleanTag] = val;
            } else {
                const curPkg = appState.packages[appState.activePackageIndex];
                if (curPkg) {
                    if (!curPkg.fields) curPkg.fields = {};
                    curPkg.fields[cleanTag] = val;
                }
            }

            // 3. Apply to selection in preview
            applyVariableToSelection(cleanTag);
            populateFormInputs();

            if (modalCreateVar) modalCreateVar.classList.add("hidden");
            showToast(`Đã tạo biến {${cleanTag}} thuộc nhóm "${groupName}" thành công!`, "success");
        });
    }

    // =============================================================
    // Controller: Chèn / Gán Biến Xạ Có Sẵn Vào Văn Bản (Preview)
    // =============================================================
    const modalInsertVar = document.getElementById("modalInsertVar");
    const ctxMenuInsertVar = document.getElementById("ctxMenuInsertVar");
    const inputSearchInsertVar = document.getElementById("inputSearchInsertVar");
    const selectInsertVarCategory = document.getElementById("selectInsertVarCategory");
    const insertVarTableBody = document.getElementById("insertVarTableBody");
    const insertVarCountLabel = document.getElementById("insertVarCountLabel");
    const btnCloseInsertVarModal = document.getElementById("btnCloseInsertVarModal");
    const btnCancelInsertVar = document.getElementById("btnCancelInsertVar");
    const btnSwitchToCreateNewVar = document.getElementById("btnSwitchToCreateNewVar");

    let currentInsertScopeFilter = "all"; // "all" | "general" | "package"

    function openInsertVariableModal() {
        document.getElementById("previewContextMenu")?.classList.add("hidden");

        const modal = document.getElementById("modalInsertVar");
        const badge = document.getElementById("insertVarTargetBadge");
        const desc = document.getElementById("insertVarContextDesc");
        const searchInput = document.getElementById("inputSearchInsertVar");
        const catSelect = document.getElementById("selectInsertVarCategory");

        if (!modal) return;

        // Context label
        if (lastSelectedText && lastSelectedText.trim()) {
            if (badge) {
                badge.textContent = "Thay thế vùng chọn";
                badge.className = "px-2 py-0.5 text-[10px] rounded-full font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30";
            }
            if (desc) {
                desc.textContent = `Vùng chọn: "${lastSelectedText.slice(0, 45)}${lastSelectedText.length > 45 ? '...' : ''}" sẽ được gán biến`;
            }
        } else {
            if (badge) {
                badge.textContent = "Chèn tại con trỏ";
                badge.className = "px-2 py-0.5 text-[10px] rounded-full font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30";
            }
            if (desc) {
                desc.textContent = "Biến được chọn sẽ được chèn ngay tại vị trí con trỏ trong văn bản";
            }
        }

        // Populate Category dropdown
        if (catSelect) {
            catSelect.innerHTML = `<option value="all">-- Tất cả phân nhóm (${MASTER_VARIABLES_CATALOG.length}) --</option>`;
            if (Array.isArray(currentCategories)) {
                currentCategories.forEach(cat => {
                    const count = MASTER_VARIABLES_CATALOG.filter(v => v.groupKey === cat.key || v.group === cat.name).length;
                    catSelect.innerHTML += `<option value="${cat.key}">${cat.name} (${count})</option>`;
                });
            }
            catSelect.value = "all";
        }

        // Reset search & scope
        if (searchInput) searchInput.value = "";
        currentInsertScopeFilter = "all";
        updateInsertScopePillsUI();

        // Render table
        renderInsertVarTable();

        modal.classList.remove("hidden");
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 150);
    }

    function updateInsertScopePillsUI() {
        const pills = document.querySelectorAll("#insertVarScopePills .insert-scope-pill");
        pills.forEach(p => {
            if (p.getAttribute("data-scope") === currentInsertScopeFilter) {
                p.className = "insert-scope-pill px-2.5 py-1 rounded-md font-bold transition-all bg-purple-100 text-purple-900 shadow-2xs cursor-pointer";
            } else {
                p.className = "insert-scope-pill px-2.5 py-1 rounded-md font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
            }
        });
    }

    function renderInsertVarTable() {
        const tbody = document.getElementById("insertVarTableBody");
        const searchInput = document.getElementById("inputSearchInsertVar");
        const catSelect = document.getElementById("selectInsertVarCategory");
        const countLabel = document.getElementById("insertVarCountLabel");
        if (!tbody) return;

        const q = (searchInput?.value || "").toLowerCase().trim();
        const selectedCat = catSelect?.value || "all";
        const mergedData = getMergedData();

        const filteredVars = MASTER_VARIABLES_CATALOG.filter(v => {
            // Category check
            if (selectedCat !== "all") {
                if (v.groupKey !== selectedCat && v.group !== selectedCat) return false;
            }
            // Scope check
            if (currentInsertScopeFilter === "general" && !v.isGeneral) return false;
            if (currentInsertScopeFilter === "package" && v.isGeneral) return false;
            // Search query check
            if (q) {
                const tagMatch = v.tag.toLowerCase().includes(q);
                const labelMatch = (v.label || "").toLowerCase().includes(q);
                const valMatch = (mergedData[v.tag] ? String(mergedData[v.tag]).toLowerCase().includes(q) : false);
                const exMatch = (v.example || "").toLowerCase().includes(q);
                if (!tagMatch && !labelMatch && !valMatch && !exMatch) return false;
            }
            return true;
        });

        if (countLabel) {
            countLabel.textContent = `Hiển thị ${filteredVars.length}/${MASTER_VARIABLES_CATALOG.length} biến xạ`;
        }

        if (filteredVars.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="py-8 text-center text-slate-400">
                        <i class="fa-solid fa-inbox text-2xl mb-1 text-slate-300 block"></i>
                        Không tìm thấy biến xạ nào khớp với bộ lọc "${q || selectedCat}"
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = "";
        filteredVars.forEach(v => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-purple-50/60 cursor-pointer transition-colors group";
            
            const currentVal = mergedData[v.tag] !== undefined && mergedData[v.tag] !== "" ? String(mergedData[v.tag]) : "";
            const isGen = !!v.isGeneral;
            const scopeBadge = isGen
                ? `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200" title="Tầng 1: Dùng chung toàn bộ dự án">
                     <i class="fa-solid fa-layer-group text-[8px]"></i> Tầng 1: Chung
                   </span>`
                : `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200" title="Tầng 2: Riêng từng gói thầu">
                     <i class="fa-solid fa-box text-[8px]"></i> Tầng 2: Riêng gói
                   </span>`;

            tr.innerHTML = `
                <td class="py-1.5 px-2.5 whitespace-nowrap">
                    <span class="font-mono font-bold text-purple-700 bg-purple-50 group-hover:bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200 text-[11px] select-all">
                        {${v.tag}}
                    </span>
                </td>
                <td class="py-1.5 px-2.5 font-medium text-slate-800">
                    <div>${v.label}</div>
                    ${v.example ? `<div class="text-[9.5px] text-slate-400 truncate max-w-xs italic">Ví dụ: ${v.example}</div>` : ""}
                </td>
                <td class="py-1.5 px-2 text-center whitespace-nowrap">
                    <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                        ${v.group || v.groupKey || "---"}
                    </span>
                </td>
                <td class="py-1.5 px-2 text-center whitespace-nowrap">
                    ${scopeBadge}
                </td>
                <td class="py-1.5 px-2.5 max-w-[180px] truncate">
                    ${currentVal ? `<span class="text-slate-800 font-semibold" title="${currentVal}">${currentVal}</span>` : `<span class="text-slate-400 italic text-[10px]">(Trống)</span>`}
                </td>
                <td class="py-1.5 px-2.5 text-right whitespace-nowrap">
                    <button type="button" class="btn-do-insert px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10.5px] transition-colors shadow-2xs flex items-center gap-1 ml-auto cursor-pointer">
                        <i class="fa-solid fa-arrow-down-to-bracket text-[9px]"></i>
                        <span>Chèn</span>
                    </button>
                </td>
            `;

            const handleInsert = (e) => {
                e.stopPropagation();
                applyVariableToSelection(v.tag);
                document.getElementById("modalInsertVar")?.classList.add("hidden");
                showToast(`Đã chèn biến {${v.tag}} vào văn bản thành công!`, "success");
            };

            tr.querySelector(".btn-do-insert")?.addEventListener("click", handleInsert);
            tr.addEventListener("dblclick", handleInsert);

            tbody.appendChild(tr);
        });
    }

    // Context Menu: "Chèn biến xạ có sẵn..."
    if (ctxMenuInsertVar) {
        ctxMenuInsertVar.addEventListener("click", () => {
            openInsertVariableModal();
        });
    }
    const oldCtxMerge = document.getElementById("ctxMenuMergeVars");
    if (oldCtxMerge) {
        oldCtxMerge.addEventListener("click", () => {
            openInsertVariableModal();
        });
    }
    const oldCtxLink = document.getElementById("ctxMenuLinkVar");
    if (oldCtxLink) {
        oldCtxLink.addEventListener("click", () => {
            openInsertVariableModal();
        });
    }

    // Modal Search and Filter Events
    if (inputSearchInsertVar) {
        inputSearchInsertVar.addEventListener("input", renderInsertVarTable);
    }
    if (selectInsertVarCategory) {
        selectInsertVarCategory.addEventListener("change", renderInsertVarTable);
    }

    document.querySelectorAll("#insertVarScopePills .insert-scope-pill").forEach(btn => {
        btn.addEventListener("click", () => {
            currentInsertScopeFilter = btn.getAttribute("data-scope") || "all";
            updateInsertScopePillsUI();
            renderInsertVarTable();
        });
    });

    if (btnCloseInsertVarModal) {
        btnCloseInsertVarModal.addEventListener("click", () => {
            document.getElementById("modalInsertVar")?.classList.add("hidden");
        });
    }
    if (btnCancelInsertVar) {
        btnCancelInsertVar.addEventListener("click", () => {
            document.getElementById("modalInsertVar")?.classList.add("hidden");
        });
    }

    if (btnSwitchToCreateNewVar) {
        btnSwitchToCreateNewVar.addEventListener("click", () => {
            document.getElementById("modalInsertVar")?.classList.add("hidden");
            openCreateVarModal();
        });
    }

    window.openInsertVariableModal = openInsertVariableModal;

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


    // =============================================================
    // GIAI ĐOẠN 1: QUẢN LÝ DỰ ÁN ĐỘC LẬP (.hoso) & KIỂM TOÁN CHẤT LƯỢNG (PRE-FLIGHT AUDIT)
    // =============================================================

    // -------------------------------------------------------------
    // 1. Independent Project Bundle Management (.hoso / .json)
    // -------------------------------------------------------------
    function exportProjectBundle() {
        try {
            const projectName = (appState.generalInfo && appState.generalInfo.TEN_DU_AN) ? appState.generalInfo.TEN_DU_AN.trim() : "Du_An";
            const safeName = projectName.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_").substring(0, 45) || "Du_An";
            const now = new Date();
            const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
            const fileName = `[HoSo]_${safeName}_${dateStr}.hoso`;

            const bundle = {
                fileFormat: "HO_SO_TU_DONG_PROJECT",
                version: "3.0",
                exportedAt: now.toISOString(),
                projectName: projectName,
                appState: JSON.parse(JSON.stringify(appState)),
                customizations: {
                    catalogCustomizations: JSON.parse(localStorage.getItem(LS_VARS_CUSTOMIZATIONS) || "[]"),
                    variableCategories: JSON.parse(localStorage.getItem(LS_VARIABLE_CATEGORIES) || "[]"),
                    customMatrix: localStorage.getItem("ho_so_tu_dong_matrix_custom") ? JSON.parse(localStorage.getItem("ho_so_tu_dong_matrix_custom")) : null,
                    customImplementation: localStorage.getItem("ho_so_tu_dong_implementation_matrix") ? JSON.parse(localStorage.getItem("ho_so_tu_dong_implementation_matrix")) : null
                }
            };

            const jsonStr = JSON.stringify(bundle, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast(`Đã lưu dự án ra máy: ${fileName}`, "success");
        } catch (err) {
            console.error("Export project error:", err);
            showToast("Lỗi khi lưu file dự án: " + err.message, "error");
        }
    }

    function importProjectBundle(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (!data || (!data.appState && !data.packages && !data.generalInfo)) {
                    showToast("File không đúng cấu trúc dự án (.hoso) hợp lệ!", "error");
                    return;
                }

                const incomingState = data.appState ? data.appState : data;

                // Restore appState
                appState = Object.assign(appState, incomingState);
                if (appState.filterByDoc === undefined) appState.filterByDoc = true;

                // Restore customizations if available
                if (data.customizations) {
                    if (Array.isArray(data.customizations.catalogCustomizations) && data.customizations.catalogCustomizations.length > 0) {
                        localStorage.setItem(LS_VARS_CUSTOMIZATIONS, JSON.stringify(data.customizations.catalogCustomizations));
                        loadCatalogCustomizations();
                    }
                    if (Array.isArray(data.customizations.variableCategories) && data.customizations.variableCategories.length > 0) {
                        localStorage.setItem(LS_VARIABLE_CATEGORIES, JSON.stringify(data.customizations.variableCategories));
                        loadVariableCategories();
                    }
                    if (data.customizations.customMatrix) {
                        localStorage.setItem("ho_so_tu_dong_matrix_custom", JSON.stringify(data.customizations.customMatrix));
                        PROCUREMENT_MATRIX = data.customizations.customMatrix;
                    }
                    if (data.customizations.customImplementation) {
                        localStorage.setItem("ho_so_tu_dong_implementation_matrix", JSON.stringify(data.customizations.customImplementation));
                        IMPLEMENTATION_MATRIX = data.customizations.customImplementation;
                    }
                }

                saveState();

                // Re-render UI components
                initProcurementTypeSelector();
                populateFormInputs();
                renderPackageDropdown();
                renderDocTabs();
                renderRoadmapUI();
                renderTimelineTable();
                renderVarsDictionaryTable();
                renderCustomVariablesUI();
                populateGroupDropdowns();
                updateProgress();
                renderDocumentPreview();

                const pName = (appState.generalInfo && appState.generalInfo.TEN_DU_AN) ? appState.generalInfo.TEN_DU_AN : "Dự án";
                showToast(`Đã mở dự án thành công: ${pName}`, "success");
            } catch (err) {
                console.error("Import project error:", err);
                showToast("Lỗi khi đọc file dự án: " + err.message, "error");
            }
        };
        reader.readAsText(file);
    }

    function createNewBlankProject() {
        if (!confirm("Tạo dự án mới sẽ làm mới toàn bộ biểu mẫu để làm hồ sơ cho dự án khác.\nBạn nên Lưu dự án (.hoso) hiện tại trước nếu cần.\n\nBạn có chắc chắn muốn tạo mới không?")) {
            return;
        }

        const blankGeneral = {};
        generalFieldsList.forEach(k => { blankGeneral[k] = ""; });
        blankGeneral.TEN_DU_AN = "Dự án mới";
        blankGeneral.DIA_DANH = appState.generalInfo?.DIA_DANH || "";
        blankGeneral.TINH_THANH_PHO = appState.generalInfo?.TINH_THANH_PHO || "";
        blankGeneral.TEN_CHU_DAU_TU = appState.generalInfo?.TEN_CHU_DAU_TU || "";
        blankGeneral.TEN_CHU_DAU_TU_VIET_HOA = appState.generalInfo?.TEN_CHU_DAU_TU_VIET_HOA || "";
        blankGeneral.TEN_BAN_QUAN_LY_DU_AN = appState.generalInfo?.TEN_BAN_QUAN_LY_DU_AN || "";

        const blankPackage = {
            id: "pkg_1",
            name: "Gói thầu số 1",
            fields: {
                "TEN_GOI_THAU": "Gói thầu số 1",
                "HINH_THUC_LCNT": "Chỉ định thầu rút gọn",
                "LOAI_HOP_DONG": "Trọn gói"
            }
        };

        appState.generalInfo = blankGeneral;
        appState.packages = [blankPackage];
        appState.activePackageIndex = 0;
        appState.customDocumentHtml = {};
        appState.projectRoadmap = JSON.parse(JSON.stringify(defaultRoadmap));
        if (appState.projectRoadmap.packages) {
            appState.projectRoadmap.packages = [
                {
                    id: "pkg_1",
                    name: "Gói thầu số 1",
                    category: "tu_van",
                    categoryLabel: "Tư vấn",
                    procurementTypeId: "chi_dinh_thau_rut_gon",
                    fields: { "TEN_GOI_THAU": "Gói thầu số 1" }
                }
            ];
        }

        saveState();

        populateFormInputs();
        renderPackageDropdown();
        renderDocTabs();
        renderRoadmapUI();
        renderTimelineTable();
        renderVarsDictionaryTable();
        renderCustomVariablesUI();
        populateGroupDropdowns();
        updateProgress();
        renderDocumentPreview();

        showToast("Đã tạo dự án mới thành công. Hãy bắt đầu nhập thông tin!", "info");
    }

    // Project Dropdown Events
    const btnProjectMenu = document.getElementById("btnProjectMenu");
    const projectMenuDropdown = document.getElementById("projectMenuDropdown");
    const projectMenuWrapper = document.getElementById("projectMenuWrapper");
    const btnProjectSave = document.getElementById("btnProjectSave");
    const btnProjectOpen = document.getElementById("btnProjectOpen");
    const btnProjectNew = document.getElementById("btnProjectNew");
    const fileProjectBundleInput = document.getElementById("fileProjectBundleInput");

    if (btnProjectMenu && projectMenuDropdown) {
        btnProjectMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            projectMenuDropdown.classList.toggle("hidden");
        });
    }

    if (btnProjectSave) {
        btnProjectSave.addEventListener("click", () => {
            const userAccountDropdown = document.getElementById("userAccountDropdown");
            if (userAccountDropdown) userAccountDropdown.classList.add("hidden");
            if (projectMenuDropdown) projectMenuDropdown.classList.add("hidden");
            exportProjectBundle();
        });
    }

    if (btnProjectOpen && fileProjectBundleInput) {
        btnProjectOpen.addEventListener("click", () => {
            const userAccountDropdown = document.getElementById("userAccountDropdown");
            if (userAccountDropdown) userAccountDropdown.classList.add("hidden");
            if (projectMenuDropdown) projectMenuDropdown.classList.add("hidden");
            fileProjectBundleInput.value = "";
            fileProjectBundleInput.click();
        });
        fileProjectBundleInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                importProjectBundle(e.target.files[0]);
            }
        });
    }

    if (btnProjectNew) {
        btnProjectNew.addEventListener("click", () => {
            const userAccountDropdown = document.getElementById("userAccountDropdown");
            if (userAccountDropdown) userAccountDropdown.classList.add("hidden");
            if (projectMenuDropdown) projectMenuDropdown.classList.add("hidden");
            createNewBlankProject();
        });
    }

    document.addEventListener("click", (e) => {
        if (projectMenuWrapper && projectMenuDropdown && !projectMenuWrapper.contains(e.target)) {
            projectMenuDropdown.classList.add("hidden");
        }
    });

    // -------------------------------------------------------------
    // 2. Pre-Flight Quality Control & Audit System
    // -------------------------------------------------------------
    let currentAuditScope = "doc"; // "doc" | "all"

    function runPreflightAudit(options = { showModal: true }) {
        const activeDoc = getCurrentActiveDoc();
        const procType = getCurrentProcurementType();
        const docs = getAllDocsForCurrentType();

        const scope = (options && options.scope) ? options.scope : currentAuditScope;
        currentAuditScope = scope;

        // Update scope buttons UI
        const btnScopeDoc = document.getElementById("btnAuditScopeDoc");
        const btnScopeAll = document.getElementById("btnAuditScopeAll");
        if (btnScopeDoc && btnScopeAll) {
            if (scope === "doc") {
                btnScopeDoc.className = "px-2 py-0.5 rounded font-bold transition-all bg-white text-emerald-800 shadow-2xs cursor-pointer";
                btnScopeAll.className = "px-2 py-0.5 rounded font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
            } else {
                btnScopeAll.className = "px-2 py-0.5 rounded font-bold transition-all bg-white text-emerald-800 shadow-2xs cursor-pointer";
                btnScopeDoc.className = "px-2 py-0.5 rounded font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
            }
        }

        // 1. Missing Variables Scan
        const allInputs = Array.from(document.querySelectorAll("[data-field]"));
        const targetInputs = scope === "doc"
            ? allInputs.filter(inp => {
                const item = inp.closest(".field-item");
                return !item || item.style.display !== "none" || (appState.onlyUnfilled && inp.value.trim() === "");
              })
            : allInputs;

        const missingItems = [];
        targetInputs.forEach(input => {
            const val = input.value.trim();
            if (!val) {
                const key = input.getAttribute("data-field");
                const labelEl = input.closest(".field-item")?.querySelector(".field-label");
                const label = labelEl ? labelEl.textContent.replace("*", "").trim() : key;
                const sec = input.closest(".accordion-item");
                const sectionTitle = sec ? (sec.querySelector(".accordion-header span")?.textContent?.trim() || "") : "Thông tin chung";
                missingItems.push({ key, label, section: sectionTitle, input });
            }
        });

        // 2. Timeline Chronology & Logic Checks
        const merged = getMergedData();
        const timelineIssues = [];

        const dateTTr = parseDateString(merged.NGAY_TO_TRINH);
        const dateQD = parseDateString(merged.NGAY_QUYET_DINH);
        const dateGM = parseDateString(merged.NGAY_GIAY_MOI);
        const dateBB = parseDateString(merged.NGAY_BIEN_BAN || merged.NGAY_BIEN_BAN_HOAN_THIEN);
        const dateHD = parseDateString(merged.NGAY_HOP_DONG || merged.NGAY_KY_HOP_DONG);

        if (dateTTr && dateQD && dateQD < dateTTr) {
            timelineIssues.push({
                type: "error",
                title: "Trình tự Tờ trình và Quyết định bị đảo ngược",
                desc: `Ngày Quyết định (${merged.NGAY_QUYET_DINH}) trước Ngày Tờ trình (${merged.NGAY_TO_TRINH})!`
            });
        }
        if (dateQD && dateGM && dateGM < dateQD) {
            timelineIssues.push({
                type: "error",
                title: "Trình tự Quyết định và Giấy mời bị đảo ngược",
                desc: `Ngày Giấy mời (${merged.NGAY_GIAY_MOI}) trước Ngày Quyết định KHLCNT (${merged.NGAY_QUYET_DINH})!`
            });
        }
        if (dateGM && dateBB && dateBB < dateGM) {
            timelineIssues.push({
                type: "error",
                title: "Trình tự Giấy mời và Biên bản bị đảo ngược",
                desc: `Ngày Biên bản hoàn thiện (${merged.NGAY_BIEN_BAN || merged.NGAY_BIEN_BAN_HOAN_THIEN}) trước Ngày Giấy mời (${merged.NGAY_GIAY_MOI})!`
            });
        }
        if (dateBB && dateHD && dateHD < dateBB) {
            timelineIssues.push({
                type: "error",
                title: "Trình tự Biên bản và Hợp đồng bị đảo ngược",
                desc: `Ngày ký Hợp đồng (${merged.NGAY_HOP_DONG || merged.NGAY_KY_HOP_DONG}) trước Ngày Biên bản hoàn thiện!`
            });
        }

        // Weekend Date Warnings
        const dateChecks = [
            { name: "Ngày Tờ trình", dt: dateTTr, str: merged.NGAY_TO_TRINH },
            { name: "Ngày Quyết định", dt: dateQD, str: merged.NGAY_QUYET_DINH },
            { name: "Ngày Giấy mời", dt: dateGM, str: merged.NGAY_GIAY_MOI },
            { name: "Ngày Biên bản", dt: dateBB, str: (merged.NGAY_BIEN_BAN || merged.NGAY_BIEN_BAN_HOAN_THIEN) },
            { name: "Ngày Hợp đồng", dt: dateHD, str: (merged.NGAY_HOP_DONG || merged.NGAY_KY_HOP_DONG) }
        ];

        dateChecks.forEach(dc => {
            if (dc.dt && (dc.dt.getDay() === 0 || dc.dt.getDay() === 6)) {
                const dayName = dc.dt.getDay() === 0 ? "Chủ Nhật" : "Thứ Bảy";
                timelineIssues.push({
                    type: "warning",
                    title: `${dc.name} rơi vào ngày nghỉ (${dayName})`,
                    desc: `${dc.name} (${dc.str}) trùng vào ${dayName}. Hãy rà soát lại nếu đơn vị không làm việc cuối tuần.`
                });
            }
        });

        // 3. Document Template Completeness
        const previewEl = document.getElementById("documentPreviewContent");
        let unreplacedCount = 0;
        if (previewEl) {
            const txt = previewEl.innerText || "";
            const matches = txt.match(/\{[A-Z0-9_]{3,}\}/g) || [];
            unreplacedCount = matches.length;
        }

        // 4. Calculate Readiness Score (0 - 100%)
        const missingCount = missingItems.length;
        const errorCount = timelineIssues.filter(i => i.type === "error").length;
        const warningCount = timelineIssues.filter(i => i.type === "warning").length;

        let score = 100 - (missingCount * 4) - (errorCount * 25) - (warningCount * 4) - (unreplacedCount * 2);
        if (score < 0) score = 0;
        if (score > 100) score = 100;

        // 5. Render Modal Preflight Audit UI
        const modal = document.getElementById("modalPreflightAudit");
        const auditBadgeStatus = document.getElementById("auditBadgeStatus");
        const auditScoreVal = document.getElementById("auditScoreVal");
        const auditScoreDesc = document.getElementById("auditScoreDesc");
        const auditMissingCountVal = document.getElementById("auditMissingCountVal");
        const auditMissingBadge = document.getElementById("auditMissingBadge");
        const auditMissingDesc = document.getElementById("auditMissingDesc");
        const auditDateIssuesVal = document.getElementById("auditDateIssuesVal");
        const auditDateDesc = document.getElementById("auditDateDesc");
        const auditDateStatusBadge = document.getElementById("auditDateStatusBadge");
        const auditMissingList = document.getElementById("auditMissingList");
        const auditTimelineCheckList = document.getElementById("auditTimelineCheckList");
        const auditDocsStatusBadge = document.getElementById("auditDocsStatusBadge");
        const auditDocsCheckList = document.getElementById("auditDocsCheckList");

        if (auditScoreVal) {
            auditScoreVal.textContent = `${score}%`;
            if (score === 100) {
                auditScoreVal.className = "text-2xl font-black text-emerald-600";
                if (auditScoreDesc) auditScoreDesc.textContent = "Hồ sơ hoàn hảo, sẵn sàng xuất!";
                if (auditBadgeStatus) {
                    auditBadgeStatus.textContent = "🟢 100% Sẵn sàng";
                    auditBadgeStatus.className = "px-2 py-0.5 text-[10px] rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30";
                }
            } else if (score >= 70) {
                auditScoreVal.className = "text-2xl font-black text-amber-600";
                if (auditScoreDesc) auditScoreDesc.textContent = "Cần bổ sung một số mục trước khi nộp";
                if (auditBadgeStatus) {
                    auditBadgeStatus.textContent = "🟡 Cần lưu ý";
                    auditBadgeStatus.className = "px-2 py-0.5 text-[10px] rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30";
                }
            } else {
                auditScoreVal.className = "text-2xl font-black text-rose-600";
                if (auditScoreDesc) auditScoreDesc.textContent = "Chưa đủ điều kiện phát hành";
                if (auditBadgeStatus) {
                    auditBadgeStatus.textContent = "🔴 Chưa sẵn sàng";
                    auditBadgeStatus.className = "px-2 py-0.5 text-[10px] rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30";
                }
            }
        }

        if (auditMissingCountVal) auditMissingCountVal.textContent = missingCount;
        if (auditMissingBadge) auditMissingBadge.textContent = missingCount;
        if (auditMissingDesc) {
            auditMissingDesc.textContent = (scope === "doc" && activeDoc)
                ? `Ô trống trong ${activeDoc.code}`
                : `Ô trống toàn dự án`;
        }

        if (auditDateIssuesVal) {
            if (errorCount > 0) {
                auditDateIssuesVal.innerHTML = `<span class="text-rose-600">${errorCount} lỗi đảo</span>`;
                if (auditDateDesc) auditDateDesc.textContent = "Sai trình tự thời gian";
                if (auditDateStatusBadge) {
                    auditDateStatusBadge.textContent = `${errorCount} lỗi cần chỉnh`;
                    auditDateStatusBadge.className = "text-[10.5px] font-semibold text-rose-600";
                }
            } else if (warningCount > 0) {
                auditDateIssuesVal.innerHTML = `<span class="text-amber-600">${warningCount} lưu ý</span>`;
                if (auditDateDesc) auditDateDesc.textContent = "Trùng ngày cuối tuần";
                if (auditDateStatusBadge) {
                    auditDateStatusBadge.textContent = `${warningCount} cảnh báo ngày nghỉ`;
                    auditDateStatusBadge.className = "text-[10.5px] font-semibold text-amber-600";
                }
            } else {
                auditDateIssuesVal.innerHTML = `<span class="text-emerald-600">Chuẩn</span>`;
                if (auditDateDesc) auditDateDesc.textContent = "Trình tự hợp lệ";
                if (auditDateStatusBadge) {
                    auditDateStatusBadge.textContent = "Trình tự hợp lệ";
                    auditDateStatusBadge.className = "text-[10.5px] font-semibold text-emerald-600";
                }
            }
        }

        // Render Missing Variables List with 1-Click "Điền ngay"
        if (auditMissingList) {
            if (missingItems.length === 0) {
                auditMissingList.innerHTML = `
                    <div class="p-3 text-center text-emerald-700 bg-emerald-50 rounded-lg font-bold flex items-center justify-center gap-2">
                        <i class="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                        <span>Đã điền đầy đủ tất cả các trường dữ liệu cần thiết!</span>
                    </div>`;
            } else {
                auditMissingList.innerHTML = "";
                missingItems.forEach(item => {
                    const row = document.createElement("div");
                    row.className = "flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white transition-colors";
                    row.innerHTML = `
                        <div class="min-w-0 pr-2">
                            <div class="font-bold text-slate-800 text-[11.5px] truncate">${item.label}</div>
                            <div class="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span class="font-mono text-emerald-700 font-semibold bg-emerald-50 px-1 rounded border border-emerald-200/60">{${item.key}}</span>
                                <span>•</span>
                                <span>${item.section}</span>
                            </div>
                        </div>
                        <button type="button" class="btn-audit-jump shrink-0 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10.5px] transition-colors shadow-2xs cursor-pointer flex items-center gap-1">
                            <i class="fa-solid fa-arrow-right-to-bracket text-[9px]"></i>
                            <span>Điền ngay</span>
                        </button>
                    `;
                    const btnJump = row.querySelector(".btn-audit-jump");
                    btnJump.addEventListener("click", () => {
                        if (modal) modal.classList.add("hidden");
                        const inp = item.input;
                        if (inp) {
                            const acc = inp.closest(".accordion-item");
                            if (acc) {
                                const c = acc.querySelector(".accordion-content");
                                if (c && c.classList.contains("hidden")) {
                                    c.classList.remove("hidden");
                                    const chevron = acc.querySelector(".accordion-header i.fa-chevron-down");
                                    if (chevron) chevron.classList.add("rotate-180");
                                }
                            }
                            inp.scrollIntoView({ behavior: "smooth", block: "center" });
                            setTimeout(() => {
                                inp.focus();
                                inp.classList.add("ring-4", "ring-emerald-400", "bg-emerald-50");
                                setTimeout(() => {
                                    inp.classList.remove("ring-4", "ring-emerald-400", "bg-emerald-50");
                                }, 2200);
                            }, 300);
                        }
                    });
                    auditMissingList.appendChild(row);
                });
            }
        }

        // Render Timeline Issues List
        if (auditTimelineCheckList) {
            if (timelineIssues.length === 0) {
                auditTimelineCheckList.innerHTML = `
                    <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                        <span>Logic trình tự chuẩn xác (Tờ trình &rarr; Quyết định &rarr; Giấy mời &rarr; Biên bản &rarr; Hợp đồng). Không rơi vào cuối tuần.</span>
                    </div>`;
            } else {
                auditTimelineCheckList.innerHTML = "";
                timelineIssues.forEach(iss => {
                    const el = document.createElement("div");
                    const isErr = iss.type === "error";
                    el.className = `p-2 rounded-lg border flex items-start gap-2 ${isErr ? "bg-rose-50/70 border-rose-200 text-rose-900" : "bg-amber-50/70 border-amber-200 text-amber-900"}`;
                    el.innerHTML = `
                        <i class="fa-solid ${isErr ? "fa-circle-xmark text-rose-600" : "fa-triangle-exclamation text-amber-600"} text-sm mt-0.5 shrink-0"></i>
                        <div class="text-xs">
                            <div class="font-bold">${iss.title}</div>
                            <div class="text-[11px] opacity-90">${iss.desc}</div>
                        </div>
                    `;
                    auditTimelineCheckList.appendChild(el);
                });
            }
        }

        // Render Docs Completeness
        if (auditDocsStatusBadge) {
            auditDocsStatusBadge.textContent = `${docs.length} văn bản trong quy trình`;
        }
        if (auditDocsCheckList) {
            auditDocsCheckList.innerHTML = `
                <div class="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Quy trình hiện tại: <strong class="text-slate-800">${procType.name}</strong></span>
                    <span class="text-slate-500 font-mono">${procType.code}</span>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Văn bản đang xem trên Preview: <strong class="text-slate-800">${activeDoc ? activeDoc.name : "Chưa chọn"}</strong></span>
                    <span class="text-slate-500 font-mono">${activeDoc ? activeDoc.code : ""}</span>
                </div>
                <div class="flex items-center justify-between py-1">
                    <span>Mã thẻ chưa thay thế trên Preview:</span>
                    <span class="${unreplacedCount > 0 ? "text-amber-700 font-bold" : "text-emerald-700 font-bold"}">
                        ${unreplacedCount > 0 ? `${unreplacedCount} thẻ chưa điền` : "Đã thay thế 100%"}
                    </span>
                </div>
            `;
        }

        if (options && options.showModal !== false && modal) {
            modal.classList.remove("hidden");
        }

        return { score, missingCount, errorCount, warningCount, unreplacedCount };
    }

    // Preflight Audit UI Events
    const btnPreflightAudit = document.getElementById("btnPreflightAudit");
    const btnClosePreflightAudit = document.getElementById("btnClosePreflightAudit");
    const btnAuditClose = document.getElementById("btnAuditClose");
    const btnAuditProceedZip = document.getElementById("btnAuditProceedZip");

    if (btnPreflightAudit) {
        btnPreflightAudit.addEventListener("click", () => {
            runPreflightAudit({ showModal: true });
        });
    }

    if (btnClosePreflightAudit) {
        btnClosePreflightAudit.addEventListener("click", () => {
            const modal = document.getElementById("modalPreflightAudit");
            if (modal) modal.classList.add("hidden");
        });
    }

    if (btnAuditClose) {
        btnAuditClose.addEventListener("click", () => {
            const modal = document.getElementById("modalPreflightAudit");
            if (modal) modal.classList.add("hidden");
        });
    }

    if (btnAuditProceedZip) {
        btnAuditProceedZip.addEventListener("click", () => {
            const auditModal = document.getElementById("modalPreflightAudit");
            if (auditModal) auditModal.classList.add("hidden");
            const batchModal = document.getElementById("batchExportModal");
            if (batchModal) batchModal.classList.remove("hidden");
        });
    }

    const btnAuditScopeDoc = document.getElementById("btnAuditScopeDoc");
    const btnAuditScopeAll = document.getElementById("btnAuditScopeAll");
    if (btnAuditScopeDoc) {
        btnAuditScopeDoc.addEventListener("click", () => {
            runPreflightAudit({ showModal: true, scope: "doc" });
        });
    }
    if (btnAuditScopeAll) {
        btnAuditScopeAll.addEventListener("click", () => {
            runPreflightAudit({ showModal: true, scope: "all" });
        });
    }

    // Expose functions globally for integrations & automation
    window.runPreflightAudit = runPreflightAudit;
    window.exportProjectBundle = exportProjectBundle;
    window.importProjectBundle = importProjectBundle;
    window.createNewBlankProject = createNewBlankProject;
    window.selectDocumentById = selectDocumentById;
    window.renderDocumentPreview = renderDocumentPreview;

    
    function isUserAdmin() {
        if (window.authApp && typeof window.authApp.isAdmin === "function") {
            return window.authApp.isAdmin();
        }
        try {
            const raw = localStorage.getItem("hstd_current_user_v1");
            if (raw) {
                const u = JSON.parse(raw);
                return u && u.role === "ADMIN";
            }
        } catch(e) {}
        return true; // Default admin if auth not initialized
    }


    // =============================================================
    // GOOGLE SHEETS CLOUD SYNCHRONIZATION MODULE (2-WAY REALTIME)
    // =============================================================
    const LS_GSHEET_URL = "ho_so_gsheet_api_url";
    let gsheetPushDebounceTimer = null;
    let isGSheetSyncInProgress = false;

    function triggerAutoPushCatalogToGSheet() {
        if (isGSheetSyncInProgress) return;
        if (typeof isUserAdmin === "function" && !isUserAdmin()) return;

        try {
            const cfg = getGSheetConfig();
            if (!cfg || !cfg.url) return;

            clearTimeout(gsheetPushDebounceTimer);
            gsheetPushDebounceTimer = setTimeout(() => {
                if (typeof pushDataToGoogleSheet === "function" && isUserAdmin()) {
                    pushDataToGoogleSheet(false).then(ok => {
                        if (ok) {
                            showToast("Đã tự động đồng bộ thứ tự biến lên Google Sheets Cloud!", "info");
                        }
                    });
                }
            }, 800);
        } catch(e) {}
    }
    window.triggerAutoPushCatalogToGSheet = triggerAutoPushCatalogToGSheet;
    const LS_GSHEET_KEY = "ho_so_gsheet_admin_key";

    function getGSheetConfig() {
        const appCfg = (window.APP_CONFIG && typeof window.APP_CONFIG === "object") ? window.APP_CONFIG : {};
        const globalUrl = (appCfg.GSHEET_API_URL || "").trim();
        const globalKey = (appCfg.GSHEET_ADMIN_KEY || "admin123").trim();

        const localUrl = (localStorage.getItem(LS_GSHEET_URL) || "").trim();
        const localKey = (localStorage.getItem(LS_GSHEET_KEY) || "").trim();

        return {
            url: localUrl || globalUrl || "",
            adminKey: localKey || globalKey || "admin123",
            globalUrl: globalUrl,
            isFromConfigFile: !localUrl && !!globalUrl
        };
    }

    
    function downloadConfigFile(url, key) {
        const content = `/**
 * =========================================================================
 * FILE CẤU HÌNH TOÀN CỤC — DỰ ÁN TẠO HỒ SƠ TỰ ĐỘNG
 * =========================================================================
 * Cấu hình tại file này sẽ tự động áp dụng vĩnh viễn cho TẤT CẢ các trình duyệt:
 * Cốc Cốc, Google Chrome, Microsoft Edge, Firefox... và KỂ CẢ CHẾ ĐỘ ẨN DANH (Incognito)!
 * =========================================================================
 */
window.APP_CONFIG = {
    // 1. Đường link Google Apps Script Web App (URL kết thúc bằng /exec)
    GSHEET_API_URL: "${(url || '').trim()}",

    // 2. Mật mã Quản trị viên Admin (mặc định: admin123)
    GSHEET_ADMIN_KEY: "${(key || 'admin123').trim()}",

    // 3. Tự động tải dữ liệu từ Google Sheets về khi mở ứng dụng (Auto-Pull)
    AUTO_PULL_ON_LOAD: true,

    // 4. Tự động đẩy thay đổi lên Google Sheets khi Admin chỉnh sửa (Auto-Push)
    AUTO_PUSH_ON_CHANGE: true
};
`;
        const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "config.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Đã tải file config.js! Vui lòng lưu đè vào thư mục dự án để áp dụng vĩnh viễn.", "success");
    }
    window.downloadConfigFile = downloadConfigFile;

    function saveGSheetConfig(url, key) {
        localStorage.setItem(LS_GSHEET_URL, (url || "").trim());
        localStorage.setItem(LS_GSHEET_KEY, (key || "").trim());
    }

    
    function validateGSheetApiUrl(rawUrl) {
        const valDiv = document.getElementById("gsheetUrlValidationMsg");
        if (!valDiv) return;
        const url = (rawUrl || "").trim();

        if (!url) {
            valDiv.classList.add("hidden");
            return;
        }

        if (url.includes("/macros/library/")) {
            valDiv.className = "mt-1.5 p-2 rounded bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-normal leading-relaxed";
            valDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-amber-600 mr-1 text-xs"></i> <strong>Lưu ý:</strong> Link bạn vừa dán là loại <em>"Thư viện" (Library)</em>, không thể truyền dữ liệu API. Vui lòng vào Google Sheet &rarr; Apps Script &rarr; Triển khai &rarr; Tùy chọn triển khai mới &rarr; Chọn loại <strong>"Ứng dụng web" (Web app)</strong> để lấy link kết thúc bằng <strong>/exec</strong>.';
            valDiv.classList.remove("hidden");
        } else if (url.includes("/exec")) {
            valDiv.className = "mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-normal";
            valDiv.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> <strong>Chính xác:</strong> Đây là đường link Ứng dụng web (Web App API) hợp lệ!';
            valDiv.classList.remove("hidden");
        } else {
            valDiv.className = "mt-1.5 p-2 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-normal";
            valDiv.innerHTML = '<i class="fa-solid fa-circle-info text-blue-600 mr-1"></i> Đường link Web App thường có dạng: <code>https://script.google.com/macros/s/.../exec</code>';
            valDiv.classList.remove("hidden");
        }
    }

    function openGoogleSheetSyncModal() {
        const modal = document.getElementById("modalGoogleSheetSync");
        if (!modal) return;
        const config = getGSheetConfig();
        const inpUrl = document.getElementById("gsheetApiUrlInput");
        const inpKey = document.getElementById("gsheetAdminKeyInput");
        const btnPush = document.getElementById("btnGSheetPush");
        const statusBox = document.getElementById("gsheetSyncStatusBox");

        if (inpUrl) {
            inpUrl.value = config.url;
            validateGSheetApiUrl(config.url);
            inpUrl.oninput = (e) => validateGSheetApiUrl(e.target.value);
        }
        if (inpKey) inpKey.value = config.adminKey;
        if (statusBox) statusBox.classList.add("hidden");
        const originBadge = document.getElementById("gsheetConfigOriginBadge");
        if (originBadge) {
            originBadge.classList.toggle("hidden", !config.globalUrl);
        }

        const isAdmin = isUserAdmin();
        if (btnPush) {
            btnPush.disabled = !isAdmin;
            btnPush.classList.toggle("opacity-50", !isAdmin);
            btnPush.classList.toggle("cursor-not-allowed", !isAdmin);
            btnPush.title = isAdmin ? "Lưu từ điển và dữ liệu lên Google Sheet" : "Chỉ Admin mới có quyền cập nhật lên Google Sheet";
        }

        modal.classList.remove("hidden");
    }

    function closeGoogleSheetSyncModal() {
        const modal = document.getElementById("modalGoogleSheetSync");
        if (modal) modal.classList.add("hidden");
    }

    
    // =============================================================
    // GOOGLE SHEETS LIVE STATUS INDICATOR & FOUC PREVENTION
    // =============================================================
    let lastGSheetSyncTimestamp = null;

    function showInitialCloudSyncNotice(customMsg) {
        const el = document.getElementById("cloudInitialSyncNotice");
        const txt = document.getElementById("cloudInitialSyncNoticeText");
        if (!el) return;
        if (txt && customMsg) txt.textContent = customMsg;
        el.classList.remove("opacity-0", "-translate-y-3", "pointer-events-none");
        el.classList.add("opacity-100", "translate-y-0");
    }

    function hideInitialCloudSyncNotice() {
        const el = document.getElementById("cloudInitialSyncNotice");
        if (!el) return;
        el.classList.remove("opacity-100", "translate-y-0");
        el.classList.add("opacity-0", "-translate-y-3", "pointer-events-none");
    }

    function updateGSheetNavbarStatus(status, customMsg = "") {
        const btn = document.getElementById("btnOpenGSheetSyncModal");
        const ping = document.getElementById("gsheetStatusPing");
        const dot = document.getElementById("gsheetStatusDot");
        const icon = document.getElementById("gsheetStatusIcon");
        const text = document.getElementById("gsheetStatusText");
        if (!btn) return;

        if (status === "syncing") {
            if (ping) {
                ping.className = "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75";
                ping.classList.remove("hidden");
            }
            if (dot) dot.className = "relative inline-flex rounded-full h-2 w-2 bg-amber-400";
            if (icon) icon.className = "fa-solid fa-arrows-rotate fa-spin text-amber-300 text-[11px]";
            if (text) text.textContent = customMsg || "Đang đồng bộ...";
            btn.title = "Đang truyền dữ liệu với Google Sheets Cloud...";
        } else if (status === "connected" || status === "success") {
            lastGSheetSyncTimestamp = new Date();
            const timeStr = lastGSheetSyncTimestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if (ping) ping.classList.add("hidden");
            if (dot) dot.className = "relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]";
            if (icon) icon.className = "fa-solid fa-cloud-check text-emerald-300 text-[11px]";
            if (text) text.textContent = "Google Sheets";
            btn.title = `Google Sheets Cloud: Đã kết nối & Đồng bộ lúc ${timeStr} (Bấm để xem cài đặt)`;
        } else if (status === "error" || status === "disconnected") {
            if (ping) ping.classList.add("hidden");
            if (dot) dot.className = "relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_#f43f5e]";
            if (icon) icon.className = "fa-solid fa-cloud-slash text-rose-300 text-[11px]";
            if (text) text.textContent = "Mất kết nối";
            btn.title = customMsg ? `Lỗi: ${customMsg}` : "Lỗi kết nối Google Sheets Cloud (Bấm để xem chi tiết)";
        } else if (status === "unconfigured") {
            if (ping) ping.classList.add("hidden");
            if (dot) dot.className = "relative inline-flex rounded-full h-2 w-2 bg-slate-400";
            if (icon) icon.className = "fa-solid fa-cloud text-slate-300 text-[11px]";
            if (text) text.textContent = "Google Sheets";
            btn.title = "Chưa cấu hình Google Sheets Cloud (Bấm để cài đặt)";
        }
    }
    window.updateGSheetNavbarStatus = updateGSheetNavbarStatus;

    async function pullDataFromGoogleSheet(showToasts = true) {
        isGSheetSyncInProgress = true;
        const config = getGSheetConfig();
        updateGSheetNavbarStatus("syncing", "Đang tải...");
        const statusBox = document.getElementById("gsheetSyncStatusBox");

        if (!config.url) {
            if (showToasts) showToast("Vui lòng cấu hình đường link Google Apps Script Web App trước!", "warning");
            openGoogleSheetSyncModal();
            return false;
        }

        try {
            if (showToasts) showToast("Đang kết nối tải dữ liệu từ Google Sheets...", "info");
            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-blue-50 border border-blue-200 text-blue-800";
                statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang tải dữ liệu từ Google Sheets...';
                statusBox.classList.remove("hidden");
            }

            const fetchUrl = config.url + (config.url.includes("?") ? "&" : "?") + "action=getData&t=" + Date.now();
            const resp = await fetch(fetchUrl);
            if (!resp.ok) throw new Error("Mã phản hồi HTTP: " + resp.status);
            const data = await resp.json();

            if (!data || !data.success) {
                throw new Error(data?.error || "Không nhận được dữ liệu hợp lệ từ Google Sheet");
            }

            // 1. Cập nhật Từ điển biến
            if (Array.isArray(data.catalog) && data.catalog.length > 0) {
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
                saveCatalogCustomizations();
                syncFormLabelsFromDictionary();
            }

            // 2. Cập nhật Thông tin chung dự án
            if (data.generalInfo) {
                appState.generalInfo = Object.assign(appState.generalInfo || {}, data.generalInfo);
            }

            // 3. Cập nhật các gói thầu
            if (Array.isArray(data.packages) && data.packages.length > 0) {
                data.packages.forEach((pkg, idx) => {
                    if (!appState.packages[idx]) {
                        appState.packages[idx] = { name: pkg.name, fields: {} };
                    }
                    if (pkg.name) appState.packages[idx].name = pkg.name;
                    appState.packages[idx].fields = Object.assign(appState.packages[idx].fields || {}, pkg.fields || {});
                });
            }

            // 4. Cập nhật tiến độ Roadmap
            if (Array.isArray(data.timelinePhases) && data.timelinePhases.length > 0) {
                if (appState.projectRoadmap) {
                    appState.projectRoadmap.timelinePhases = data.timelinePhases;
                }
            }

            saveState();

            // Re-render UI components
            populateFormInputs();
            renderPackageDropdown();
            renderDocTabs();
            renderRoadmapUI();
            renderTimelineTable();
            renderVarsDictionaryTable();
            renderDocumentPreview();

            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-emerald-50 border border-emerald-200 text-emerald-800";
                statusBox.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Đồng bộ thành công ${data.catalog ? data.catalog.length : 0} biến từ Google Sheet "${data.sheetTitle || ''}"!`;
            }

            if (showToasts) showToast(`Đã đồng bộ thành công dữ liệu từ Google Sheets!`, "success");
            updateGSheetNavbarStatus("connected");
            return true;
        } catch (err) {
            console.error("GSheet Pull Error:", err);
            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-rose-50 border border-rose-200 text-rose-800";
                statusBox.innerHTML = `<i class="fa-solid fa-circle-exclamation text-rose-600 mr-1"></i> Lỗi đồng bộ: ${err.message}`;
            }
            if (showToasts) showToast("Lỗi đồng bộ Google Sheets: " + err.message, "error");
            updateGSheetNavbarStatus("error", err.message);
            return false;
        } finally {
            setTimeout(() => { isGSheetSyncInProgress = false; }, 600);
        }
    }

    async function pushDataToGoogleSheet(showToasts = true) {
        if (!isUserAdmin()) {
            if (showToasts) showToast("Chỉ tài khoản Quản trị viên (Admin) mới có quyền lưu lên Google Sheet!", "warning");
            return false;
        }

        const config = getGSheetConfig();
        const statusBox = document.getElementById("gsheetSyncStatusBox");

        if (!config.url) {
            if (showToasts) showToast("Vui lòng cấu hình đường link Google Apps Script Web App trước!", "warning");
            openGoogleSheetSyncModal();
            return false;
        }

        try {
            if (showToasts) showToast("Đang lưu Từ điển & Dữ liệu lên Google Sheets...", "info");
            updateGSheetNavbarStatus("syncing", "Đang lưu...");
            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-blue-50 border border-blue-200 text-blue-800";
                statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang ghi dữ liệu lên Google Sheets...';
                statusBox.classList.remove("hidden");
            }

            const payload = {
                action: "syncFromWeb",
                adminKey: config.adminKey,
                catalog: MASTER_VARIABLES_CATALOG.map((v, i) => ({
                    stt: v.stt || (i + 1),
                    group: v.group,
                    groupKey: v.groupKey,
                    label: v.label,
                    tag: v.tag,
                    isGeneral: v.isGeneral,
                    example: v.example
                })),
                generalInfo: appState.generalInfo || {},
                packages: (appState.packages || []).map((p, i) => ({
                    id: p.id || `pkg_${i+1}`,
                    name: p.name,
                    fields: p.fields || {}
                }))
            };

            const resp = await fetch(config.url, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });

            if (!resp.ok) throw new Error("Mã phản hồi HTTP: " + resp.status);
            const res = await resp.json();

            if (!res || !res.success) {
                throw new Error(res?.error || "Không thể ghi dữ liệu lên Google Sheet");
            }

            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-emerald-50 border border-emerald-200 text-emerald-800";
                statusBox.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> ${res.message || 'Đã lưu lên Google Sheets thành công!'}`;
            }

            if (showToasts) showToast(res.message || "Đã lưu lên Google Sheets thành công!", "success");
            updateGSheetNavbarStatus("connected");
            return true;
        } catch(err) {
            console.error("GSheet Push Error:", err);
            if (statusBox) {
                statusBox.className = "p-2.5 rounded-lg text-xs bg-rose-50 border border-rose-200 text-rose-800";
                statusBox.innerHTML = `<i class="fa-solid fa-circle-exclamation text-rose-600 mr-1"></i> Lỗi ghi: ${err.message}`;
            }
            if (showToasts) showToast("Lỗi khi lưu lên Google Sheets: " + err.message, "error");
            updateGSheetNavbarStatus("error", err.message);
            return false;
        } finally {
            setTimeout(() => { isGSheetSyncInProgress = false; }, 600);
        }
    }

    // Attach UI Event Listeners for Google Sheets Sync
    const btnOpenGSheetSyncModal = document.getElementById("btnOpenGSheetSyncModal");
    const btnDropdownGSheetSync = document.getElementById("btnDropdownGSheetSync");
    const btnDictGSheetSync = document.getElementById("btnDictGSheetSync");
    const btnCloseGSheetSync = document.getElementById("btnCloseGSheetSync");
    const btnSaveGSheetConfig = document.getElementById("btnSaveGSheetConfig");
    const btnGSheetPull = document.getElementById("btnGSheetPull");
    const btnGSheetPush = document.getElementById("btnGSheetPush");
    const btnToggleAdminKey = document.getElementById("btnToggleAdminKeyVisibility");

    if (btnOpenGSheetSyncModal) btnOpenGSheetSyncModal.onclick = openGoogleSheetSyncModal;
    if (btnDropdownGSheetSync) btnDropdownGSheetSync.onclick = () => {
        const dd = document.getElementById("userAccountDropdown");
        if (dd) dd.classList.add("hidden");
        openGoogleSheetSyncModal();
    };
    if (btnDictGSheetSync) btnDictGSheetSync.onclick = openGoogleSheetSyncModal;
    if (btnCloseGSheetSync) btnCloseGSheetSync.onclick = closeGoogleSheetSyncModal;

    
    const btnCopyIncognitoLink = document.getElementById("btnCopyIncognitoLink");
    if (btnCopyIncognitoLink) {
        btnCopyIncognitoLink.onclick = () => {
            const url = (document.getElementById("gsheetApiUrlInput")?.value || "").trim();
            if (!url) {
                showToast("Vui lòng nhập đường link Google Apps Script trước!", "warning");
                return;
            }
            const cleanBase = window.location.href.split("#")[0].split("?")[0];
            const incognitoUrl = `${cleanBase}#gsheet=${encodeURIComponent(url)}`;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(incognitoUrl).then(() => {
                    showToast("Đã sao chép link Tab Ẩn Danh! Hãy mở Cửa sổ Ẩn danh và dán (Ctrl+V) vào thanh địa chỉ.", "success");
                }).catch(() => {
                    prompt("Sao chép link mở Tab Ẩn danh dưới đây:", incognitoUrl);
                });
            } else {
                prompt("Sao chép link mở Tab Ẩn danh dưới đây:", incognitoUrl);
            }
        };
    }

    const btnDownloadConfigJs = document.getElementById("btnDownloadConfigJs");
    if (btnDownloadConfigJs) {
        btnDownloadConfigJs.onclick = () => {
            const url = document.getElementById("gsheetApiUrlInput")?.value || "";
            const key = document.getElementById("gsheetAdminKeyInput")?.value || "admin123";
            if (!url) {
                showToast("Vui lòng dán link Google Apps Script vào ô trước khi tải file config.js!", "warning");
                return;
            }
            downloadConfigFile(url, key);
        };
    }

    if (btnSaveGSheetConfig) {
        btnSaveGSheetConfig.onclick = () => {
            const url = document.getElementById("gsheetApiUrlInput")?.value || "";
            const key = document.getElementById("gsheetAdminKeyInput")?.value || "";
            saveGSheetConfig(url, key);
            showToast("Đã lưu cấu hình Google Sheets thành công!", "success");
            closeGoogleSheetSyncModal();
        };
    }

    if (btnGSheetPull) btnGSheetPull.onclick = () => pullDataFromGoogleSheet(true);
    if (btnGSheetPush) btnGSheetPush.onclick = () => pushDataToGoogleSheet(true);

    if (btnToggleAdminKey) {
        btnToggleAdminKey.onclick = () => {
            const inp = document.getElementById("gsheetAdminKeyInput");
            if (inp) {
                inp.type = inp.type === "password" ? "text" : "password";
            }
        };
    }

    // Expose helpers globally
    window.isUserAdmin = isUserAdmin;
    window.openGoogleSheetSyncModal = openGoogleSheetSyncModal;
    window.getGSheetConfig = getGSheetConfig;
    window.pullDataFromGoogleSheet = pullDataFromGoogleSheet;
    window.pushDataToGoogleSheet = pushDataToGoogleSheet;

    
    // Tự động nhận link Google Sheets từ URL (Hỗ trợ 100% cho Tab Ẩn danh hoặc máy khác)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let gsheetParam = urlParams.get("gsheet");
        if (!gsheetParam && window.location.hash.includes("gsheet=")) {
            const hMatch = window.location.hash.match(/gsheet=([^&]+)/);
            if (hMatch) gsheetParam = decodeURIComponent(hMatch[1]);
        }
        if (gsheetParam) {
            saveGSheetConfig(gsheetParam, "admin123");
        }
    } catch(e) {}

    // Tự động tải dữ liệu từ Google Sheets về khi mở Web App (Auto-Pull cực nhanh + Chống giật FOUC)
    const startupCfg = getGSheetConfig();
    if (startupCfg && startupCfg.url) {
        showInitialCloudSyncNotice();
        updateGSheetNavbarStatus("syncing", "Đang nạp...");
        setTimeout(() => {
            pullDataFromGoogleSheet(false).then(ok => {
                hideInitialCloudSyncNotice();
                if (ok) {
                    console.log("Google Sheets Auto-Pull on load successful");
                    updateGSheetNavbarStatus("connected");
                } else {
                    updateGSheetNavbarStatus("error");
                }
            }).catch(e => {
                hideInitialCloudSyncNotice();
                updateGSheetNavbarStatus("error", e.message);
            });
        }, 80);
    } else {
        updateGSheetNavbarStatus("unconfigured");
    }

    switchMainTab(initialTab, false);


})();
