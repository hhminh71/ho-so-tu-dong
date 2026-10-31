// Tự Động Xuất Hồ Sơ Chỉ Định Thầu - Client Logic
(function () {
    // -------------------------------------------------------------
    // Initial State & Sample Data (matches the video demo)
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

    // Field mapping to general vs package
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
        activeDocType: 1
    };

    // Load from localStorage if present
    try {
        const saved = localStorage.getItem("ho_so_tu_dong_state_v2");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.packages && parsed.packages.length > 0) {
                appState = parsed;
            }
        }
    } catch (e) {
        console.warn("Could not load from localStorage:", e);
    }

    // Save to localStorage
    function saveState() {
        try {
            localStorage.setItem("ho_so_tu_dong_state_v2", JSON.stringify(appState));
        } catch (e) {
            console.warn("Could not save state:", e);
        }
    }

    // -------------------------------------------------------------
    // UI Helpers & DOM Elements
    // -------------------------------------------------------------
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
    const batchSummaryText = document.getElementById("batchSummaryText");
    const btnConfirmExportZip = document.getElementById("btnConfirmExportZip");
    const btnExportZipText = document.getElementById("btnExportZipText");

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
    // Render Package Dropdown
    // -------------------------------------------------------------
    
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
                        <label class="block text-[11px] font-semibold text-indigo-900">${v.label} <span class="text-indigo-500 font-mono text-[10px]">({{${v.key}}})</span></label>
                        <span class="text-[9px] bg-indigo-50 text-indigo-700 px-1 py-0.2 rounded">${v.targetSheet || "Từng gói thầu"}</span>
                    </div>
                    <input type="text" data-field="${v.key}" placeholder="VD: ${v.value || ''}" class="w-full text-xs px-2 py-1 h-7 border rounded border-indigo-200 focus:ring-1 focus:ring-indigo-500 bg-white text-slate-800">
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
                // If package name field changed, update dropdown
                if (field === "TEN_GOI_THAU" && val.trim()) {
                    currentPkg.name = val.split(" ").slice(0, 4).join(" ");
                    renderPackageDropdown();
                }
            }
        }

        saveState();
        updateProgress();
        renderDocumentPreview();
    });

    // -------------------------------------------------------------
    // Calculate Progress Bar & Badges
    // -------------------------------------------------------------
    function updateProgress() {
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        const inputs = document.querySelectorAll("[data-field]");
        let totalCount = inputs.length;
        let filledCount = 0;

        inputs.forEach(input => {
            if (input.value.trim() !== "") {
                filledCount++;
            }
        });

        // Update progress bar
        const percent = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
        progressText.textContent = `Đã điền: ${filledCount}/${totalCount}`;
        progressBar.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;

        // Update section badges
        const sections = document.querySelectorAll(".accordion-item");
        sections.forEach(sec => {
            const badge = sec.querySelector(".sec-badge");
            if (!badge) return;
            const secInputs = sec.querySelectorAll("[data-field]");
            let sFilled = 0;
            secInputs.forEach(inp => {
                if (inp.value.trim() !== "") sFilled++;
            });
            badge.textContent = `${sFilled}/${secInputs.length}`;
            if (sFilled === secInputs.length && secInputs.length > 0) {
                badge.className = "sec-badge text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold";
            } else {
                badge.className = "sec-badge text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium";
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
        btnToggleAll.querySelector("span").textContent = allOpen ? "Thu gọn tất cả" : "Mở tất cả";
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
                TEN_GOI_THAU: `Gói thầu tư vấn số ${count}`,
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
            localStorage.removeItem("ho_so_tu_dong_state_v2");
            // Clear inputs
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
    // Live Document Preview Render
    // -------------------------------------------------------------
    // Tab switching
    docTypeTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".tab-btn");
        if (!btn) return;
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        appState.activeDocType = parseInt(btn.getAttribute("data-doc"), 10);
        renderDocumentPreview();
    });

    function getMergedData() {
        const currentPkg = appState.packages[appState.activePackageIndex] || { fields: {} };
        return {
            ...appState.generalInfo,
            ...currentPkg.fields
        };
    }

    function valOrPlaceholder(key, data, isRed = true) {
        const val = data[key];
        if (val && val.trim() !== "") {
            return `<span class="filled-val">${val}</span>`;
        }
        return `<span class="placeholder-tag">{${key}}</span>`;
    }

    function renderDocumentPreview() {
        const data = getMergedData();
        let html = "";

        if (appState.activeDocType === 1) {
            // Giấy mời tham gia
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[12pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[11pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[11pt]">Số: GM-BQLDA</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[12pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11.5pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_GIAY_MOI", data)}</div>
                    </div>
                </div>

                <div class="text-center my-6">
                    <h2 class="font-bold text-[15pt] uppercase tracking-wide">GIẤY MỜI</h2>
                    <p class="font-bold text-[13pt] text-slate-700">Tham gia hoàn thiện hợp đồng chỉ định thầu</p>
                </div>

                <div class="text-center mb-5 font-bold text-[13pt]">
                    Kính gửi: ${valOrPlaceholder("TEN_NHA_THAU", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[13pt]">
                    <p class="indent-8">
                        Căn cứ Quyết định phê duyệt Kế hoạch lựa chọn nhà thầu dự án ${valOrPlaceholder("TEN_DU_AN", data)};
                    </p>
                    <p class="indent-8">
                        Hiện nay, ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} đang chuẩn bị tổ chức công tác chỉ định thầu cho gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b> thuộc dự án: <b>${valOrPlaceholder("TEN_DU_AN", data)}</b>.
                    </p>
                    <p class="indent-8">
                        Sau khi xem xét hồ sơ năng lực và kinh nghiệm của Quý đơn vị, ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)} trân trọng kính mời Quý Công ty tham gia hoàn thiện và ký kết hợp đồng cho gói thầu nêu trên với các nội dung chi tiết như sau:
                    </p>
                    <div class="pl-8 space-y-1 my-3">
                        <p><b>1. Tên gói thầu:</b> ${valOrPlaceholder("TEN_GOI_THAU", data)}.</p>
                        <p><b>2. Tên dự án:</b> ${valOrPlaceholder("TEN_DU_AN", data)}.</p>
                        <p><b>3. Địa điểm thực hiện:</b> ${valOrPlaceholder("DIA_CHI_TRU_SO", data)}.</p>
                        <p><b>4. Hình thức lựa chọn nhà thầu:</b> ${valOrPlaceholder("HINH_THUC_LCNT", data)}.</p>
                        <p><b>5. Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p><b>6. Thời gian thực hiện hợp đồng:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                        <p><b>7. Thời gian và địa điểm làm việc:</b> Vào hồi ${valOrPlaceholder("THOI_GIAN_HOP", data)}, tại ${valOrPlaceholder("DIA_DIEM_HOP", data)}.</p>
                    </div>
                    <p class="indent-8">
                        Kính đề nghị người đại diện hợp pháp hoặc người được ủy quyền của Quý Công ty có mặt đúng thời gian và địa điểm nêu trên để hai bên tiến hành các thủ tục theo quy định của pháp luật về đấu thầu.
                    </p>
                    <p class="indent-8">
                        Trân trọng thông báo./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-8 text-[12pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như trên;</p>
                        <p>- Lãnh đạo Ban;</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12.5pt]">GIÁM ĐỐC</p>
                        <div class="h-16"></div>
                        <p class="font-bold text-[13pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (appState.activeDocType === 2) {
            // Biên bản hoàn thiện HĐ
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[12pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[11pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[11pt]">Số: ${valOrPlaceholder("SO_BIEN_BAN_HOAN_THIEN", data)}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[12pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11.5pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_BIEN_BAN", data)}</div>
                    </div>
                </div>

                <div class="text-center my-6">
                    <h2 class="font-bold text-[15pt] uppercase tracking-wide">BIÊN BẢN</h2>
                    <p class="font-bold text-[13pt] text-slate-700">Hoàn thiện hợp đồng chỉ định thầu</p>
                    <p class="font-bold text-[12pt] mt-1 text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-600">Thuộc dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="space-y-3 leading-relaxed text-[13pt]">
                    <p class="indent-8">
                        Hôm nay, vào hồi ${valOrPlaceholder("THOI_GIAN_HOP", data)}, tại ${valOrPlaceholder("DIA_DIEM_HOP", data)}, hai bên chúng tôi gồm có:
                    </p>
                    <div>
                        <p class="font-bold uppercase text-emerald-900">I. ĐẠI DIỆN CHỦ ĐẦU TƯ (BÊN A): ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</p>
                        <div class="pl-4 space-y-0.5 text-xs">
                            <p>- Ông/Bà: <b>${valOrPlaceholder("NGUOI_KY_CDT", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_NGUOI_KY", data)}.</p>
                            <p>- Ông/Bà: <b>${valOrPlaceholder("TRUONG_BAN_DHDA", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_TRUONG_BAN", data)}.</p>
                            <p>- Ông/Bà: <b>${valOrPlaceholder("KE_TOAN_TRUONG", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_KE_TOAN", data)}.</p>
                            <p>- Địa chỉ trụ sở: ${valOrPlaceholder("DIA_CHI_TRU_SO", data)}.</p>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold uppercase text-emerald-900">II. ĐẠI DIỆN NHÀ THẦU ĐƯỢC CHỈ ĐỊNH (BÊN B): ${valOrPlaceholder("TEN_NHA_THAU_VIET_HOA", data)}</p>
                        <div class="pl-4 space-y-0.5 text-xs">
                            <p>- Ông/Bà: <b>${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</b> — Chức vụ: ${valOrPlaceholder("CHUC_VU_DAI_DIEN", data)}.</p>
                            <p>- Địa chỉ trụ sở: ${valOrPlaceholder("DIA_CHI_NHA_THAU", data)}.</p>
                            <p>- Mã số thuế: ${valOrPlaceholder("MA_SO_THUE", data)}.</p>
                            <p>- Theo Giấy mời tham gia hoàn thiện hợp đồng ngày ${valOrPlaceholder("NGAY_GIAY_MOI", data)}.</p>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold uppercase text-emerald-900">III. NỘI DUNG HOÀN THIỆN HỢP ĐỒNG:</p>
                        <div class="pl-4 space-y-1 text-xs">
                            <p>Hai bên đã tiến hành rà soát, thảo luận và thống nhất các điều khoản:</p>
                            <p><b>1. Nội dung công việc:</b> Thực hiện trọn vẹn công việc ${valOrPlaceholder("TEN_GOI_THAU", data)} theo đúng hồ sơ nhiệm vụ và tiêu chuẩn hiện hành.</p>
                            <p><b>2. Thời gian thực hiện:</b> ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)} kể từ ngày hợp đồng có hiệu lực.</p>
                            <p><b>3. Loại hợp đồng:</b> ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                            <p><b>4. Giá trị hợp đồng thống nhất:</b> <b>${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} VNĐ</b> (Bằng chữ: <i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>).</p>
                            <p><b>5. Thanh toán:</b> Qua Kho bạc Nhà nước ${valOrPlaceholder("KHO_BAC_NHA_NUOC", data)}.</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 pt-8 text-[12pt]">
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12.5pt]">ĐẠI DIỆN BÊN B</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-16"></div>
                        <p class="font-bold text-[13pt]">${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)}</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12.5pt]">ĐẠI DIỆN BÊN A</p>
                        <p class="text-xs italic">(Ký, họ tên và đóng dấu)</p>
                        <div class="h-16"></div>
                        <p class="font-bold text-[13pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        } else if (appState.activeDocType === 3) {
            // Tờ trình chỉ định thầu
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[12pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="font-bold text-[11pt] uppercase">${valOrPlaceholder("CO_QUAN_TRINH", data)}</div>
                        <div class="mt-1 text-[11pt]">Số: ${valOrPlaceholder("SO_TO_TRINH", data)}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[12pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11.5pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_TO_TRINH", data)}</div>
                    </div>
                </div>

                <div class="text-center my-6">
                    <h2 class="font-bold text-[15pt] uppercase tracking-wide">TỜ TRÌNH</h2>
                    <p class="font-bold text-[13pt] text-slate-700">Về việc phê duyệt kết quả lựa chọn nhà thầu (chỉ định thầu)</p>
                    <p class="font-bold text-[12pt] mt-1 text-emerald-800">Gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                </div>

                <div class="text-center mb-5 font-bold text-[13pt]">
                    Kính gửi: Giám đốc ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[13pt]">
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

                <div class="grid grid-cols-2 pt-8 text-[12pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như trên;</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12.5pt]">NGƯỜI TRÌNH</p>
                        <p class="text-xs italic">${valOrPlaceholder("CHUC_VU_TRUONG_BAN", data)}</p>
                        <div class="h-16"></div>
                        <p class="font-bold text-[13pt]">${valOrPlaceholder("TRUONG_BAN_DHDA", data)}</p>
                    </div>
                </div>
            `;
        } else if (appState.activeDocType === 4) {
            // Quyết định chỉ định thầu
            html = `
                <div class="grid grid-cols-2 text-center text-xs pb-3 border-b border-transparent">
                    <div>
                        <div class="font-bold text-[12pt] uppercase">${valOrPlaceholder("TEN_CHU_DAU_TU_VIET_HOA", data)}</div>
                        <div class="font-bold text-[11pt] uppercase">${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}</div>
                        <div class="mt-1 text-[11pt]">Số: ${valOrPlaceholder("SO_QUYET_DINH", data)}</div>
                    </div>
                    <div>
                        <div class="font-bold text-[11.5pt] uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div class="font-bold text-[12pt] underline pb-1">Độc lập – Tự do – Hạnh phúc</div>
                        <div class="italic text-[11.5pt] mt-1">${valOrPlaceholder("DIA_DANH", data)}, ngày ${valOrPlaceholder("NGAY_QUYET_DINH", data)}</div>
                    </div>
                </div>

                <div class="text-center my-6">
                    <h2 class="font-bold text-[15pt] uppercase tracking-wide">QUYẾT ĐỊNH</h2>
                    <p class="font-bold text-[13pt] text-slate-700">Về việc phê duyệt kết quả lựa chọn nhà thầu gói thầu: ${valOrPlaceholder("TEN_GOI_THAU", data)}</p>
                    <p class="italic text-xs text-slate-600">Thuộc dự án: ${valOrPlaceholder("TEN_DU_AN", data)}</p>
                </div>

                <div class="text-center mb-5 font-bold text-[13.5pt] uppercase text-emerald-950">
                    GIÁM ĐỐC ${valOrPlaceholder("TEN_BAN_QUAN_LY_DU_AN", data)}
                </div>

                <div class="space-y-2 leading-relaxed text-[13pt]">
                    <p class="indent-8 text-xs italic">
                        Căn cứ Luật Đấu thầu số 22/2023/QH15 ngày 23/06/2023;<br>
                        Căn cứ Luật Xây dựng và các nghị định hướng dẫn thi hành;<br>
                        Căn cứ Nghị định số 24/2024/NĐ-CP ngày 27/02/2024 của Chính phủ;<br>
                        ${valOrPlaceholder("CAN_CU_PHAP_LY_CHUNG", data)}<br>
                        Căn cứ Biên bản hoàn thiện hợp đồng số ${valOrPlaceholder("SO_BIEN_BAN_HOAN_THIEN", data)} ngày ${valOrPlaceholder("NGAY_BIEN_BAN", data)};<br>
                        Xét đề nghị của ${valOrPlaceholder("CO_QUAN_TRINH", data)} tại Tờ trình số ${valOrPlaceholder("SO_TO_TRINH", data)} ngày ${valOrPlaceholder("NGAY_TO_TRINH", data)},
                    </p>
                    <p class="text-center font-bold text-[14pt] my-2">QUYẾT ĐỊNH:</p>
                    <p class="indent-8">
                        <b>Điều 1.</b> Phê duyệt kết quả lựa chọn nhà thầu (chỉ định thầu rút gọn) gói thầu: <b>${valOrPlaceholder("TEN_GOI_THAU", data)}</b> thuộc dự án <b>${valOrPlaceholder("TEN_DU_AN", data)}</b> với các nội dung sau:
                    </p>
                    <div class="pl-8 space-y-1 my-2 text-xs">
                        <p>1. Đơn vị trúng thầu: <b>${valOrPlaceholder("TEN_NHA_THAU", data)}</b> (MST: ${valOrPlaceholder("MA_SO_THUE", data)}).</p>
                        <p>- Địa chỉ trụ sở: ${valOrPlaceholder("DIA_CHI_NHA_THAU", data)}.</p>
                        <p>- Người đại diện: Ông/Bà ${valOrPlaceholder("DAI_DIEN_NHA_THAU", data)} — Chức vụ: ${valOrPlaceholder("CHUC_VU_DAI_DIEN", data)}.</p>
                        <p>2. Giá chỉ định thầu: <b>${valOrPlaceholder("GIA_TRI_HOP_DONG_SO", data)} VNĐ</b> (Bằng chữ: <i>${valOrPlaceholder("GIA_TRI_HOP_DONG_CHU", data)}</i>).</p>
                        <p>3. Loại hợp đồng: ${valOrPlaceholder("LOAI_HOP_DONG", data)}.</p>
                        <p>4. Thời gian thực hiện: ${valOrPlaceholder("THOI_GIAN_THUC_HIEN", data)}.</p>
                        <p>5. Nguồn vốn: ${valOrPlaceholder("NGUON_VON", data)}.</p>
                    </div>
                    <p class="indent-8">
                        <b>Điều 2.</b> Giao cho ${valOrPlaceholder("CO_QUAN_TRINH", data)} chủ trì ký kết hợp đồng và giám sát việc triển khai thực hiện gói thầu theo đúng quy định.
                    </p>
                    <p class="indent-8">
                        <b>Điều 3.</b> Trưởng ban Điều hành dự án, Kế toán trưởng và người đại diện của ${valOrPlaceholder("TEN_NHA_THAU", data)} chịu trách nhiệm thi hành Quyết định này./.
                    </p>
                </div>

                <div class="grid grid-cols-2 pt-8 text-[12pt]">
                    <div class="text-left text-xs leading-normal">
                        <p class="font-bold italic">Nơi nhận:</p>
                        <p>- Như Điều 3;</p>
                        <p>- ${valOrPlaceholder("TEN_CHU_DAU_TU", data)};</p>
                        <p>- KBNN ${valOrPlaceholder("KHO_BAC_NHA_NUOC", data)};</p>
                        <p>- Lưu: VT, ĐHDA.</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold uppercase text-[12.5pt]">GIÁM ĐỐC</p>
                        <p class="text-xs italic">(Ký, ghi rõ họ tên và đóng dấu)</p>
                        <div class="h-16"></div>
                        <p class="font-bold text-[13pt]">${valOrPlaceholder("NGUOI_KY_CDT", data)}</p>
                    </div>
                </div>
            `;
        }

        documentPreviewContent.innerHTML = html;
    }

    // -------------------------------------------------------------
    // Excel Download & Import Logic
    // -------------------------------------------------------------
    btnDownloadSample.addEventListener("click", () => {
        // Direct link to the generated file
        const a = document.createElement("a");
        a.href = "MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx";
        a.download = "MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Đang tải file Excel mẫu...");
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

                // Map field names from Vietnamese label to variable key
                const fieldMapping = {
                    "Tên chủ đầu tư (*)": "TEN_CHU_DAU_TU",
                    "Tên chủ đầu tư": "TEN_CHU_DAU_TU",
                    "Tên CĐT (IN HOA)": "TEN_CHU_DAU_TU_VIET_HOA",
                    "Tên Ban QLDA (*)": "TEN_BAN_QUAN_LY_DU_AN",
                    "Tên Ban QLDA": "TEN_BAN_QUAN_LY_DU_AN",
                    "Cơ quan trình quyết định": "CO_QUAN_TRINH",
                    "Địa danh (nơi phát hành VB) (*)": "DIA_DANH",
                    "Địa danh (nơi phát hành VB)": "DIA_DANH",
                    "Tỉnh/Thành phố": "TINH_THANH_PHO",
                    "Địa chỉ trụ sở": "DIA_CHI_TRU_SO",
                    "Quyết định đầu tư": "CAP_QUYET_DINH_DAU_TU",
                    "Tên dự án (*)": "TEN_DU_AN",
                    "Tên dự án": "TEN_DU_AN",
                    "Tên công trình": "TEN_CONG_TRINH",
                    "Nguồn vốn": "NGUON_VON",
                    "Người ký (CĐT) (*)": "NGUOI_KY_CDT",
                    "Người ký (CĐT)": "NGUOI_KY_CDT",
                    "Chức vụ người ký (CĐT) (*)": "CHUC_VU_NGUOI_KY",
                    "Chức vụ người ký (CĐT)": "CHUC_VU_NGUOI_KY",
                    "Trưởng ban ĐHDA": "TRUONG_BAN_DHDA",
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
                        // Sheet thông tin chung
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
                        // Package sheet
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
    // Word (.docx) Generation & ZIP Export
    // -------------------------------------------------------------
    const docTemplatesMap = {
        1: { name: "1. Giay moi tham gia.docx", template: "templates/1_Giay_moi_tham_gia.docx" },
        2: { name: "2. Bien ban hoan thien hop dong.docx", template: "templates/2_Bien_ban_hoan_thien_hop_dong.docx" },
        3: { name: "3. To trinh chi dinh thau.docx", template: "templates/3_To_trinh_chi_dinh_thau.docx" },
        4: { name: "4. Quyet dinh chi dinh thau.docx", template: "templates/4_Quyet_dinh_chi_dinh_thau.docx" }
    };

    // Client-side Word replacement helper using JSZip
    async function renderDocxBlob(templateUrl, replacements) {
        const response = await fetch(templateUrl);
        if (!response.ok) throw new Error("Could not load template " + templateUrl);
        const arrayBuffer = await response.arrayBuffer();

        const zip = await JSZip.loadAsync(arrayBuffer);
        let docXml = await zip.file("word/document.xml").async("string");

        // Escape XML chars for values
        function escapeXml(unsafe) {
            return String(unsafe || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;")
                .replace(/\n/g, "</w:t><w:br/><w:t>");
        }

        for (const [key, rawVal] of Object.entries(replacements)) {
            const cleanVal = escapeXml(rawVal);
            const searchKey = `{{${key}}}`;
            docXml = docXml.split(searchKey).join(cleanVal);
        }

        zip.file("word/document.xml", docXml);
        return await zip.generateAsync({ type: "blob" });
    }

    // Single Doc Download
    btnExportSingleDoc.addEventListener("click", async () => {
        try {
            btnExportSingleDoc.disabled = true;
            btnExportSingleDoc.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang xuất...</span>`;

            const currentPkg = appState.packages[appState.activePackageIndex];
            const data = getMergedData();
            const docInfo = docTemplatesMap[appState.activeDocType];

            const blob = await renderDocxBlob(docInfo.template, data);
            const fileName = `${docInfo.name.replace(".docx", "")}_${currentPkg.name}.docx`;
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

        recalcBatchSummary();
    }

    function recalcBatchSummary() {
        const checkedPkgs = document.querySelectorAll(".pkg-checkbox:checked").length;
        const checkedDocs = document.querySelectorAll(".doc-checkbox:checked").length;
        const total = checkedPkgs * checkedDocs;

        batchSummaryText.textContent = `Đang chọn: ${checkedPkgs} gói thầu × ${checkedDocs} văn bản = ${total} file`;
        btnExportZipText.textContent = `Xuất ZIP (${total} file)`;
    }

    batchPackagesList.addEventListener("change", recalcBatchSummary);
    document.querySelectorAll(".doc-checkbox").forEach(cb => cb.addEventListener("change", recalcBatchSummary));

    btnOpenExportModal.addEventListener("click", () => {
        updateBatchModalUI();
        batchExportModal.classList.remove("hidden");
    });

    btnCloseExportModal.addEventListener("click", () => batchExportModal.classList.add("hidden"));
    btnCancelExport.addEventListener("click", () => batchExportModal.classList.add("hidden"));

    // Batch Export ZIP action
    btnConfirmExportZip.addEventListener("click", async () => {
        const checkedPkgIndexes = Array.from(document.querySelectorAll(".pkg-checkbox:checked")).map(cb => parseInt(cb.value, 10));
        const checkedDocTypes = Array.from(document.querySelectorAll(".doc-checkbox:checked")).map(cb => parseInt(cb.value, 10));

        if (checkedPkgIndexes.length === 0 || checkedDocTypes.length === 0) {
            alert("Vui lòng chọn ít nhất 1 gói thầu và 1 loại văn bản!");
            return;
        }

        try {
            btnConfirmExportZip.disabled = true;
            btnConfirmExportZip.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang đóng gói ZIP...</span>`;

            const zip = new JSZip();

            for (const pIdx of checkedPkgIndexes) {
                const pkg = appState.packages[pIdx];
                // Folder name for this package
                const folderName = `GoiThau_${String(pIdx + 1).padStart(2, '0')}_${(pkg.name || "GoiThau").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_")}`;
                const pkgFolder = zip.folder(folderName);

                // Merged data for this package
                const merged = {
                    ...appState.generalInfo,
                    ...pkg.fields
                };

                for (const dType of checkedDocTypes) {
                    const docInfo = docTemplatesMap[dType];
                    const docBlob = await renderDocxBlob(docInfo.template, merged);
                    pkgFolder.file(docInfo.name, docBlob);
                }
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            const projectName = (appState.generalInfo.TEN_DU_AN || "ChiDinhThau").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_");
            const zipFileName = `HoSo_CDT_${projectName}.zip`;

            saveAs(zipBlob, zipFileName);

            batchExportModal.classList.add("hidden");
            showToast(`Đã xuất thành công ${checkedPkgIndexes.length * checkedDocTypes.length} văn bản vào ${zipFileName}!`);
        } catch (err) {
            console.error("Batch export error:", err);
            showToast("Lỗi khi xuất file ZIP: " + err.message, "error");
        } finally {
            btnConfirmExportZip.disabled = false;
            recalcBatchSummary();
        }
    });

    // -------------------------------------------------------------
    // Initial Boot
    // -------------------------------------------------------------
    renderCustomVariablesUI();
    renderPackageDropdown();
    populateFormInputs();

})();
