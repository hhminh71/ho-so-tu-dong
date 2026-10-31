// Công Cụ Chuẩn Hóa Template Word (.docx) & Đồng Bộ Excel - Template Studio
(function () {
    // -------------------------------------------------------------
    // System Standard Variables Catalog
    // -------------------------------------------------------------
    const STANDARD_VARIABLES = [
        { key: "TEN_CHU_DAU_TU", label: "Tên Chủ đầu tư", desc: "VD: UBND phường Hoàn Kiếm", defaultSheet: "Thông tin chung" },
        { key: "TEN_CHU_DAU_TU_VIET_HOA", label: "Tên CĐT (IN HOA)", desc: "VD: UBND PHƯỜNG HOÀN KIẾM", defaultSheet: "Thông tin chung" },
        { key: "TEN_BAN_QUAN_LY_DU_AN", label: "Tên Ban QLDA", desc: "VD: BAN QUẢN LÝ ĐẦU TƯ VÀ XÂY DỰNG...", defaultSheet: "Thông tin chung" },
        { key: "CO_QUAN_TRINH", label: "Cơ quan trình", desc: "VD: Trưởng ban Điều hành dự án", defaultSheet: "Thông tin chung" },
        { key: "DIA_DANH", label: "Địa danh", desc: "VD: Phường Hoàn Kiếm", defaultSheet: "Thông tin chung" },
        { key: "DIA_CHI_TRU_SO", label: "Địa chỉ trụ sở CĐT", desc: "VD: 18 Lê Lai, Hoàn Kiếm...", defaultSheet: "Thông tin chung" },
        { key: "TEN_DU_AN", label: "Tên dự án", desc: "VD: Sửa chữa, cải tạo trụ sở...", defaultSheet: "Thông tin chung" },
        { key: "TEN_CONG_TRINH", label: "Tên công trình", desc: "VD: Trụ sở UBND...", defaultSheet: "Thông tin chung" },
        { key: "NGUON_VON", label: "Nguồn vốn", desc: "VD: Ngân sách quận", defaultSheet: "Thông tin chung" },
        { key: "TEN_GOI_THAU", label: "Tên gói thầu", desc: "VD: Tư vấn giám sát thi công...", defaultSheet: "Từng gói thầu" },
        { key: "HINH_THUC_LCNT", label: "Hình thức LCNT", desc: "VD: Chỉ định thầu rút gọn", defaultSheet: "Từng gói thầu" },
        { key: "LOAI_HOP_DONG", label: "Loại hợp đồng", desc: "VD: Trọn gói", defaultSheet: "Từng gói thầu" },
        { key: "THOI_GIAN_THUC_HIEN", label: "Thời gian thực hiện", desc: "VD: 90 ngày", defaultSheet: "Từng gói thầu" },
        { key: "GIA_GOI_THAU_SO", label: "Giá gói thầu (số)", desc: "VD: 120.000.000", defaultSheet: "Từng gói thầu" },
        { key: "GIA_GOI_THAU_CHU", label: "Giá gói thầu (chữ)", desc: "VD: Một trăm hai mươi triệu đồng", defaultSheet: "Từng gói thầu" },
        { key: "GIA_TRI_HOP_DONG_SO", label: "Giá trị hợp đồng (số)", desc: "VD: 115.000.000", defaultSheet: "Từng gói thầu" },
        { key: "GIA_TRI_HOP_DONG_CHU", label: "Giá trị hợp đồng (chữ)", desc: "VD: Một trăm mười lăm triệu đồng chẵn", defaultSheet: "Từng gói thầu" },
        { key: "GIA_TRI_GIAM_GIA", label: "Giá trị giảm giá", desc: "VD: 5.000.000", defaultSheet: "Từng gói thầu" },
        { key: "KHO_BAC_NHA_NUOC", label: "Kho bạc Nhà nước", desc: "VD: Quận Hoàn Kiếm, TP. Hà Nội", defaultSheet: "Từng gói thầu" },
        { key: "TEN_NHA_THAU", label: "Tên nhà thầu", desc: "VD: Công ty TNHH Giám sát Xây dựng...", defaultSheet: "Từng gói thầu" },
        { key: "TEN_NHA_THAU_VIET_HOA", label: "Tên nhà thầu (IN HOA)", desc: "VD: CÔNG TY TNHH...", defaultSheet: "Từng gói thầu" },
        { key: "TEN_NHA_THAU_VIET_TAT", label: "Tên nhà thầu (viết tắt)", desc: "VD: Hà Thành", defaultSheet: "Từng gói thầu" },
        { key: "DAI_DIEN_NHA_THAU", label: "Người đại diện nhà thầu", desc: "VD: Đỗ Mạnh Cường", defaultSheet: "Từng gói thầu" },
        { key: "CHUC_VU_DAI_DIEN", label: "Chức vụ đại diện nhà thầu", desc: "VD: Giám đốc", defaultSheet: "Từng gói thầu" },
        { key: "DIA_CHI_NHA_THAU", label: "Địa chỉ trụ sở nhà thầu", desc: "VD: 125 Nguyễn Du...", defaultSheet: "Từng gói thầu" },
        { key: "MA_SO_THUE", label: "Mã số thuế nhà thầu", desc: "VD: 0109876543", defaultSheet: "Từng gói thầu" },
        { key: "NGUOI_KY_CDT", label: "Người ký Quyết định CĐT", desc: "VD: Nguyễn Văn An", defaultSheet: "Thông tin chung" },
        { key: "CHUC_VU_NGUOI_KY", label: "Chức vụ người ký CĐT", desc: "VD: Giám đốc Ban QLDA", defaultSheet: "Thông tin chung" },
        { key: "TRUONG_BAN_DHDA", label: "Trưởng ban ĐHDA", desc: "VD: Lê Thị Bích", defaultSheet: "Thông tin chung" },
        { key: "KE_TOAN_TRUONG", label: "Kế toán trưởng", desc: "VD: Phạm Thị Hoa", defaultSheet: "Thông tin chung" },
        { key: "SO_CONG_VAN_THAM_GIA", label: "Số công văn tham gia", desc: "VD: 315/CV-HT", defaultSheet: "Từng gói thầu" },
        { key: "SO_BIEN_BAN_HOAN_THIEN", label: "Số biên bản hoàn thiện", desc: "VD: 145/BB-BQLDA", defaultSheet: "Từng gói thầu" },
        { key: "SO_TO_TRINH", label: "Số tờ trình chỉ định thầu", desc: "VD: 146/TTr-ĐHDA", defaultSheet: "Từng gói thầu" },
        { key: "SO_QUYET_DINH", label: "Số quyết định chỉ định thầu", desc: "VD: 147/QĐ-BQLDA", defaultSheet: "Từng gói thầu" },
        { key: "THOI_GIAN_HOP", label: "Thời gian cuộc họp", desc: "VD: 08 giờ 30 phút, ngày 15/07/2025", defaultSheet: "Từng gói thầu" },
        { key: "DIA_DIEM_HOP", label: "Địa điểm cuộc họp", desc: "VD: Văn phòng Ban Quản lý dự án", defaultSheet: "Từng gói thầu" },
        { key: "NGAY_GIAY_MOI", label: "Ngày giấy mời", desc: "VD: 10/07/2025", defaultSheet: "Từng gói thầu" },
        { key: "NGAY_BIEN_BAN", label: "Ngày biên bản", desc: "VD: 15/07/2025", defaultSheet: "Từng gói thầu" },
        { key: "NGAY_TO_TRINH", label: "Ngày tờ trình", desc: "VD: 16/07/2025", defaultSheet: "Từng gói thầu" },
        { key: "NGAY_QUYET_DINH", label: "Ngày quyết định", desc: "VD: 18/07/2025", defaultSheet: "Từng gói thầu" }
    ];

    // State
    let currentZip = null;
    let originalDocxArrayBuffer = null;
    let originalFileName = "";
    let extractedParagraphs = [];
    let mappings = []; // [{ key, label, originalText, count, targetSheet, isNew }]
    let discoveredSuggestions = []; // suggestions for new variables
    let customSheets = ["Thông tin chung", "Từng gói thầu"];
    let isTaggedView = false;
    let processedZipBlob = null;

    // DOM Elements
    const dropZone = document.getElementById("dropZone");
    const docxUploadInput = document.getElementById("docxUploadInput");
    const btnTriggerUpload = document.getElementById("btnTriggerUpload");
    const fileInfoBar = document.getElementById("fileInfoBar");
    const uploadedFileName = document.getElementById("uploadedFileName");
    const uploadedFileSize = document.getElementById("uploadedFileSize");
    const btnChooseAnotherFile = document.getElementById("btnChooseAnotherFile");
    const btnAutoScanAgain = document.getElementById("btnAutoScanAgain");

    const workspaceArea = document.getElementById("workspaceArea");
    const mappingRowsContainer = document.getElementById("mappingRowsContainer");
    const detectedCountBadge = document.getElementById("detectedCountBadge");
    const discoveredSuggestionsBox = document.getElementById("discoveredSuggestionsBox");
    const suggestionsChipsContainer = document.getElementById("suggestionsChipsContainer");
    const btnAcceptAllSuggestions = document.getElementById("btnAcceptAllSuggestions");
    const btnAddCustomVar = document.getElementById("btnAddCustomVar");
    const btnCreateNewSheet = document.getElementById("btnCreateNewSheet");
    const btnClearAllMapping = document.getElementById("btnClearAllMapping");

    const btnApplyAllTags = document.getElementById("btnApplyAllTags");
    const btnDownloadTemplate = document.getElementById("btnDownloadTemplate");
    const btnDownloadUpdatedExcel = document.getElementById("btnDownloadUpdatedExcel");
    const btnSyncToMainApp = document.getElementById("btnSyncToMainApp");
    const btnTestFillTemplate = document.getElementById("btnTestFillTemplate");

    const viewModeOriginal = document.getElementById("viewModeOriginal");
    const viewModeTagged = document.getElementById("viewModeTagged");
    const documentContentDisplay = document.getElementById("documentContentDisplay");
    const docViewerWrapper = document.getElementById("docViewerWrapper");
    const selectionMenu = document.getElementById("selectionMenu");
    const btnQuickCustomTag = document.getElementById("btnQuickCustomTag");

    // Toast
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
        setTimeout(() => toast.classList.add("translate-y-20", "opacity-0"), 3200);
    }

    // -------------------------------------------------------------
    // Upload Handling
    // -------------------------------------------------------------
    btnTriggerUpload.addEventListener("click", () => docxUploadInput.click());
    btnChooseAnotherFile.addEventListener("click", () => docxUploadInput.click());

    docxUploadInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-emerald-500", "bg-emerald-50/20");
    });
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-emerald-500", "bg-emerald-50/20");
    });
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-emerald-500", "bg-emerald-50/20");
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });

    async function handleFile(file) {
        if (!file.name.endsWith(".docx")) {
            showToast("Vui lòng tải lên file định dạng Word (.docx)!", "error");
            return;
        }

        originalFileName = file.name;
        uploadedFileName.textContent = file.name;
        uploadedFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;

        try {
            originalDocxArrayBuffer = await file.arrayBuffer();
            currentZip = await JSZip.loadAsync(originalDocxArrayBuffer);

            const docXmlStr = await currentZip.file("word/document.xml").async("string");
            extractedParagraphs = parseDocxXmlToParagraphs(docXmlStr);

            btnTriggerUpload.classList.add("hidden");
            fileInfoBar.classList.remove("hidden");
            workspaceArea.classList.remove("hidden");

            runDeepEntityDetector();
            renderMappingTable();
            renderDocumentView();

            showToast(`Đã nạp file và quét tìm biến thành công!`);
        } catch (err) {
            console.error("Error reading docx:", err);
            showToast("Không thể đọc file: " + err.message, "error");
        }
    }

    function parseDocxXmlToParagraphs(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const pNodes = xmlDoc.getElementsByTagName("w:p");
        const list = [];
        for (let i = 0; i < pNodes.length; i++) {
            const tNodes = pNodes[i].getElementsByTagName("w:t");
            let text = "";
            for (let j = 0; j < tNodes.length; j++) text += tNodes[j].textContent || "";
            if (text.trim() !== "") list.push(text.trim());
        }
        return list;
    }

    // -------------------------------------------------------------
    // Deep Entity & New Variables Detector
    // -------------------------------------------------------------
    function runDeepEntityDetector() {
        mappings = [];
        discoveredSuggestions = [];
        const fullText = extractedParagraphs.join("\n");

        function countOccurrences(phrase) {
            if (!phrase) return 0;
            try {
                const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const m = fullText.match(new RegExp(escaped, "gi"));
                return m ? m.length : 0;
            } catch (e) {
                return 0;
            }
        }

        function addStandard(key, value) {
            if (!value) return;
            const clean = value.trim().replace(/^[\s:–—\-]+/, "").replace(/[\s;.,]+$/, "");
            if (clean.length < 2) return;
            const std = STANDARD_VARIABLES.find(v => v.key === key);
            if (!mappings.some(m => m.key === key || m.originalText.toLowerCase() === clean.toLowerCase())) {
                const c = countOccurrences(clean);
                if (c > 0) {
                    mappings.push({
                        key: key,
                        label: std ? std.label : key,
                        originalText: clean,
                        count: c,
                        targetSheet: std ? std.defaultSheet : "Thông tin chung",
                        isNew: false
                    });
                }
            }
        }

        function addDiscovered(key, label, value, defaultSheet = "Từng gói thầu") {
            if (!value) return;
            const clean = value.trim().replace(/^[\s:–—\-]+/, "").replace(/[\s;.,]+$/, "");
            if (clean.length < 2) return;
            if (!mappings.some(m => m.key === key) && !discoveredSuggestions.some(s => s.key === key)) {
                const c = countOccurrences(clean);
                if (c > 0) {
                    discoveredSuggestions.push({
                        key: key,
                        label: label,
                        value: clean,
                        count: c,
                        defaultSheet: defaultSheet
                    });
                }
            }
        }

        // 1. Quét biến chuẩn
        const cdtRegex = /(?:Ủy ban nhân dân|UBND|Ban Quản lý dự án|Ban QLDA)[^\n,;]+/gi;
        const cdtMatches = fullText.match(cdtRegex);
        if (cdtMatches && cdtMatches.length > 0) {
            addStandard("TEN_CHU_DAU_TU", cdtMatches[0]);
            if (cdtMatches.length > 1) addStandard("TEN_BAN_QUAN_LY_DU_AN", cdtMatches[1]);
        }

        const duAnRegex = /(?:thuộc dự án|dự án|Dự án|công trình)[\s:]+([^\n,;.\"]+)/gi;
        let match;
        while ((match = duAnRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 5) {
                addStandard("TEN_DU_AN", match[1]);
                break;
            }
        }

        const goiThauRegex = /(?:gói thầu|Gói thầu)[\s:]+([^\n,;.\"]+)/gi;
        while ((match = goiThauRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 5) {
                addStandard("TEN_GOI_THAU", match[1]);
                break;
            }
        }

        const nhaThauRegex = /(?:Công ty|Doanh nghiệp|CÔNG TY)[\s]+([^\n,;.\"]+)/gi;
        while ((match = nhaThauRegex.exec(fullText)) !== null) {
            if (match[0] && match[0].length > 8) {
                addStandard("TEN_NHA_THAU", match[0]);
                break;
            }
        }

        const giaSoRegex = /\b\d{1,3}(?:\.\d{3}){1,3}\b/g;
        const giaMatches = fullText.match(giaSoRegex);
        if (giaMatches && giaMatches.length > 0) {
            addStandard("GIA_TRI_HOP_DONG_SO", giaMatches[0]);
        }

        const giaChuRegex = /(?:Bằng chữ|bằng chữ)[\s:]+([^\n,;.)]+)/gi;
        while ((match = giaChuRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 4) {
                addStandard("GIA_TRI_HOP_DONG_CHU", match[1]);
                break;
            }
        }

        const ngayRegex = /([A-Za-zÀ-ỹ\s]+),\s+ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i;
        const ngayMatch = fullText.match(ngayRegex);
        if (ngayMatch) {
            addStandard("DIA_DANH", ngayMatch[1].trim());
            addStandard("NGAY_QUYET_DINH", `${ngayMatch[2]}/${ngayMatch[3]}/${ngayMatch[4]}`);
        }

        const ngKyRegex = /(?:Ông|Bà|Ông\/Bà)[\s:]+([A-ZÀ-Ỵ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỵ][a-zà-ỹ]+){1,4})/g;
        while ((match = ngKyRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 3) {
                if (!mappings.some(m => m.key === "NGUOI_KY_CDT")) addStandard("NGUOI_KY_CDT", match[1]);
                else { addStandard("DAI_DIEN_NHA_THAU", match[1]); break; }
            }
        }

        // 2. Quét BIẾN XẠ MỚI (Discovered Custom Variables)
        // 2.1 Số tài khoản ngân hàng
        const stkRegex = /(?:Số tài khoản|STK|tài khoản số)[\s:]+([0-9]{8,16})/i;
        const stkMatch = fullText.match(stkRegex);
        if (stkMatch) addDiscovered("SO_TAI_KHOAN_NGAN_HANG", "Số tài khoản ngân hàng", stkMatch[1], "Từng gói thầu");

        // 2.2 Tên ngân hàng
        const bankRegex = /(?:tại ngân hàng|ngân hàng|mở tại)[\s:]+([^\n,;.]+)/i;
        const bankMatch = fullText.match(bankRegex);
        if (bankMatch) addDiscovered("TEN_NGAN_HANG", "Tên ngân hàng mở TK", bankMatch[1], "Từng gói thầu");

        // 2.3 Thời gian bảo hành
        const bhRegex = /(?:bảo hành|thời gian bảo hành)[\s:]+([0-9]+\s+tháng)/i;
        const bhMatch = fullText.match(bhRegex);
        if (bhMatch) addDiscovered("THOI_GIAN_BAO_HANH", "Thời gian bảo hành", bhMatch[1], "Từng gói thầu");

        // 2.4 Bảo đảm thực hiện hợp đồng
        const bdRegex = /(?:bảo đảm thực hiện hợp đồng|bảo lãnh hợp đồng)[\s:]+([^\n,;.]+)/i;
        const bdMatch = fullText.match(bdRegex);
        if (bdMatch) addDiscovered("BAO_DAM_HOP_DONG", "Bảo đảm thực hiện HĐ", bdMatch[1], "Từng gói thầu");

        // 2.5 Số điện thoại / Email liên hệ
        const telRegex = /(?:Điện thoại|SĐT|Tel)[\s:]+([0-9\.\s]{9,15})/i;
        const telMatch = fullText.match(telRegex);
        if (telMatch) addDiscovered("SO_DIEN_THOAI", "Số điện thoại liên hệ", telMatch[1].trim(), "Thông tin chung");

        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
        const emailMatch = fullText.match(emailRegex);
        if (emailMatch) addDiscovered("EMAIL_LIEN_HE", "Email liên hệ", emailMatch[1], "Thông tin chung");

        // 2.6 Tỷ lệ tạm ứng
        const tamUngRegex = /(?:tạm ứng)[\s:]+([0-9]{1,2}\s*%\s*[^\n,;.]*)/i;
        const tuMatch = fullText.match(tamUngRegex);
        if (tuMatch) addDiscovered("TY_LE_TAM_UNG", "Tỷ lệ tạm ứng hợp đồng", tuMatch[1].trim(), "Từng gói thầu");

        renderDiscoveredSuggestions();
    }

    function renderDiscoveredSuggestions() {
        if (!discoveredSuggestions || discoveredSuggestions.length === 0) {
            discoveredSuggestionsBox.classList.add("hidden");
            return;
        }

        discoveredSuggestionsBox.classList.remove("hidden");
        suggestionsChipsContainer.innerHTML = "";

        discoveredSuggestions.forEach((sug, idx) => {
            const chip = document.createElement("div");
            chip.className = "inline-flex items-center space-x-1 px-2 py-0.5 bg-white border border-amber-300 rounded-md text-[11px] shadow-xs hover:bg-amber-100 cursor-pointer";
            chip.innerHTML = `
                <span class="font-bold text-amber-900">${sug.label}:</span>
                <span class="text-slate-600 truncate max-w-[120px]">${sug.value}</span>
                <i class="fa-solid fa-plus text-emerald-600 ml-1"></i>
            `;
            chip.addEventListener("click", () => {
                // Add to mappings
                mappings.push({
                    key: sug.key,
                    label: sug.label,
                    originalText: sug.value,
                    count: sug.count,
                    targetSheet: sug.defaultSheet,
                    isNew: true
                });
                discoveredSuggestions.splice(idx, 1);
                renderDiscoveredSuggestions();
                renderMappingTable();
                renderDocumentView();
                showToast(`Đã thêm biến "${sug.label}" vào bảng!`);
            });
            suggestionsChipsContainer.appendChild(chip);
        });
    }

    btnAcceptAllSuggestions.addEventListener("click", () => {
        discoveredSuggestions.forEach(sug => {
            mappings.push({
                key: sug.key,
                label: sug.label,
                originalText: sug.value,
                count: sug.count,
                targetSheet: sug.defaultSheet,
                isNew: true
            });
        });
        const count = discoveredSuggestions.length;
        discoveredSuggestions = [];
        renderDiscoveredSuggestions();
        renderMappingTable();
        renderDocumentView();
        showToast(`Đã thêm ${count} biến mới vào bảng!`);
    });

    // -------------------------------------------------------------
    // Render Mapping Table UI (Compact & Sheet Customized)
    // -------------------------------------------------------------
    function renderMappingTable() {
        mappingRowsContainer.innerHTML = "";
        detectedCountBadge.textContent = `${mappings.length} biến`;

        if (mappings.length === 0) {
            mappingRowsContainer.innerHTML = `
                <div class="text-center py-6 text-slate-400 text-xs">
                    <i class="fa-solid fa-list-check text-xl mb-1 text-slate-300"></i>
                    <p>Chưa có biến nào được ánh xạ.</p>
                    <p class="text-[10px] mt-0.5 text-slate-400">Bấm "Thêm biến mới" hoặc bôi đen văn bản bên phải để gán thẻ!</p>
                </div>
            `;
            return;
        }

        mappings.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1 hover:border-emerald-300 transition-colors text-xs";

            // Standard variable selector options
            let optionsHtml = "";
            STANDARD_VARIABLES.forEach(v => {
                const selected = v.key === item.key ? "selected" : "";
                optionsHtml += `<option value="${v.key}" ${selected}>{{${v.key}}} — ${v.label}</option>`;
            });
            // If item.key is custom not in standard
            if (!STANDARD_VARIABLES.some(v => v.key === item.key)) {
                optionsHtml = `<option value="${item.key}" selected>{{${item.key}}} — ${item.label || item.key}</option>` + optionsHtml;
            }

            // Sheet destination options
            let sheetsHtml = "";
            customSheets.forEach(s => {
                const sel = (item.targetSheet === s) ? "selected" : "";
                sheetsHtml += `<option value="${s}" ${sel}>Sheet: ${s}</option>`;
            });
            sheetsHtml += `<option value="__NEW_SHEET__">+ Tạo sheet mới...</option>`;

            const newBadge = item.isNew ? `<span class="bg-indigo-100 text-indigo-700 font-bold px-1 py-0.2 rounded text-[9px] uppercase">Mới</span>` : "";

            row.innerHTML = `
                <div class="flex items-center justify-between gap-1.5">
                    <div class="flex items-center space-x-1 flex-1">
                        ${newBadge}
                        <select class="var-select text-xs font-bold text-emerald-800 bg-white border border-slate-300 rounded px-1.5 py-0.5 h-6 flex-1 focus:ring-emerald-500">
                            ${optionsHtml}
                        </select>
                    </div>
                    <div class="flex items-center space-x-1">
                        <select class="sheet-select text-[11px] font-medium text-slate-700 bg-white border border-slate-300 rounded px-1.5 py-0.5 h-6 focus:ring-indigo-500">
                            ${sheetsHtml}
                        </select>
                        <span class="text-[10px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-bold">${item.count} lần</span>
                        <button class="btn-delete-row text-slate-400 hover:text-red-600 p-0.5 rounded text-xs" data-index="${index}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center space-x-1.5">
                    <span class="text-[10px] font-semibold text-slate-500 whitespace-nowrap">Từ trong file cũ:</span>
                    <input type="text" value="${item.originalText || ""}" class="input-orig-text text-xs px-2 py-0.5 h-6 bg-white border border-slate-300 rounded flex-1 focus:ring-emerald-500 text-slate-800" data-index="${index}">
                </div>
            `;
            mappingRowsContainer.appendChild(row);
        });

        // Event listeners
        mappingRowsContainer.querySelectorAll(".var-select").forEach((sel, idx) => {
            sel.addEventListener("change", (e) => {
                const std = STANDARD_VARIABLES.find(v => v.key === e.target.value);
                mappings[idx].key = e.target.value;
                if (std) {
                    mappings[idx].label = std.label;
                    mappings[idx].targetSheet = std.defaultSheet;
                }
                renderDocumentView();
            });
        });

        mappingRowsContainer.querySelectorAll(".sheet-select").forEach((sel, idx) => {
            sel.addEventListener("change", (e) => {
                if (e.target.value === "__NEW_SHEET__") {
                    const newSheet = prompt("Nhập tên Sheet Excel mới cần tạo:", "Pháp lý & Bổ sung");
                    if (newSheet && newSheet.trim()) {
                        const cleanName = newSheet.trim();
                        if (!customSheets.includes(cleanName)) customSheets.push(cleanName);
                        mappings[idx].targetSheet = cleanName;
                        renderMappingTable();
                        showToast(`Đã thêm Sheet "${cleanName}"!`);
                    } else {
                        renderMappingTable();
                    }
                } else {
                    mappings[idx].targetSheet = e.target.value;
                }
            });
        });

        mappingRowsContainer.querySelectorAll(".input-orig-text").forEach(inp => {
            inp.addEventListener("input", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"), 10);
                const newVal = e.target.value;
                mappings[idx].originalText = newVal;
                const fullText = extractedParagraphs.join("\n");
                mappings[idx].count = countOccurrences(fullText, newVal);
                renderDocumentView();
            });
        });

        mappingRowsContainer.querySelectorAll(".btn-delete-row").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.getAttribute("data-index"), 10);
                mappings.splice(idx, 1);
                renderMappingTable();
                renderDocumentView();
            });
        });
    }

    function countOccurrences(fullText, phrase) {
        if (!phrase) return 0;
        try {
            const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const m = fullText.match(new RegExp(escaped, "gi"));
            return m ? m.length : 0;
        } catch (e) {
            return 0;
        }
    }

    btnCreateNewSheet.addEventListener("click", () => {
        const name = prompt("Nhập tên Sheet Excel mới cần tạo trong file mẫu:", "Bảo đảm & Hợp đồng");
        if (name && name.trim()) {
            const clean = name.trim();
            if (!customSheets.includes(clean)) {
                customSheets.push(clean);
                renderMappingTable();
                showToast(`Đã tạo Sheet mới: ${clean}`);
            }
        }
    });

    btnAddCustomVar.addEventListener("click", () => {
        const varName = prompt("Nhập mã biến (viết hoa không dấu, vd: SO_HOP_DONG, THOI_HAN_BAO_HANH):", "BIEN_MOI");
        if (varName && varName.trim()) {
            const cleanKey = varName.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
            const label = prompt("Nhập tên tiếng Việt hiển thị (vd: Số hợp đồng, Thời hạn bảo hành):", cleanKey);
            mappings.unshift({
                key: cleanKey,
                label: label || cleanKey,
                originalText: "",
                count: 0,
                targetSheet: "Từng gói thầu",
                isNew: true
            });
            renderMappingTable();
        }
    });

    btnClearAllMapping.addEventListener("click", () => {
        if (confirm("Bạn có chắc muốn xóa tất cả ánh xạ biến?")) {
            mappings = [];
            renderMappingTable();
            renderDocumentView();
        }
    });

    // -------------------------------------------------------------
    // Document Preview
    // -------------------------------------------------------------
    viewModeOriginal.addEventListener("click", () => {
        isTaggedView = false;
        viewModeOriginal.className = "px-2 py-0.5 rounded font-semibold bg-white text-slate-800 shadow-xs";
        viewModeTagged.className = "px-2 py-0.5 rounded text-slate-600 hover:text-slate-900";
        renderDocumentView();
    });

    viewModeTagged.addEventListener("click", () => {
        isTaggedView = true;
        viewModeTagged.className = "px-2 py-0.5 rounded font-semibold bg-emerald-600 text-white shadow-xs";
        viewModeOriginal.className = "px-2 py-0.5 rounded text-slate-600 hover:text-slate-900";
        renderDocumentView();
    });

    function escapeHtml(text) {
        return (text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function renderDocumentView() {
        if (!extractedParagraphs || extractedParagraphs.length === 0) {
            documentContentDisplay.innerHTML = `<p class="text-slate-400 italic">Chưa có nội dung văn bản.</p>`;
            return;
        }

        let html = "";
        extractedParagraphs.forEach(p => {
            let paragraphHtml = escapeHtml(p);

            if (!isTaggedView) {
                mappings.forEach(m => {
                    if (m.originalText && m.originalText.trim() !== "") {
                        const escaped = m.originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        paragraphHtml = paragraphHtml.replace(
                            new RegExp(`(${escaped})`, "gi"),
                            `<span class="highlight-match">$1</span>`
                        );
                    }
                });
            } else {
                mappings.forEach(m => {
                    if (m.originalText && m.originalText.trim() !== "") {
                        const escaped = m.originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        paragraphHtml = paragraphHtml.replace(
                            new RegExp(`(${escaped})`, "gi"),
                            `<span class="tag-badge">{{${m.key}}}</span>`
                        );
                    }
                });
            }
            html += `<p class="mb-2.5 text-[12pt] leading-relaxed text-justify">${paragraphHtml}</p>`;
        });

        documentContentDisplay.innerHTML = html;
    }

    // -------------------------------------------------------------
    // Highlight Text & Quick Click-to-Tag
    // -------------------------------------------------------------
    documentContentDisplay.addEventListener("mouseup", () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 2) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const wrapperRect = docViewerWrapper.getBoundingClientRect();

            selectionMenu.style.left = `${rect.left - wrapperRect.left}px`;
            selectionMenu.style.top = `${rect.top - wrapperRect.top + docViewerWrapper.scrollTop - 35}px`;
            selectionMenu.classList.remove("hidden");
            selectionMenu.setAttribute("data-selected-text", selectedText);
        } else {
            selectionMenu.classList.add("hidden");
        }
    });

    selectionMenu.querySelectorAll(".quick-tag-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const varKey = btn.getAttribute("data-var");
            const textToTag = selectionMenu.getAttribute("data-selected-text");

            if (textToTag) {
                const std = STANDARD_VARIABLES.find(v => v.key === varKey);
                const existing = mappings.find(m => m.key === varKey);
                if (existing) {
                    existing.originalText = textToTag;
                    existing.count = countOccurrences(extractedParagraphs.join("\n"), textToTag);
                } else {
                    mappings.unshift({
                        key: varKey,
                        label: std ? std.label : varKey,
                        originalText: textToTag,
                        count: countOccurrences(extractedParagraphs.join("\n"), textToTag),
                        targetSheet: std ? std.defaultSheet : "Thông tin chung",
                        isNew: false
                    });
                }
                selectionMenu.classList.add("hidden");
                renderMappingTable();
                renderDocumentView();
                showToast(`Đã gán "${textToTag.substring(0, 20)}..." thành {{${varKey}}}`);
            }
        });
    });

    btnQuickCustomTag.addEventListener("click", (e) => {
        e.stopPropagation();
        const textToTag = selectionMenu.getAttribute("data-selected-text");
        if (!textToTag) return;
        const name = prompt("Nhập mã biến mới (VD: SO_HOP_DONG, THOI_HAN_BAO_HANH):", "BIEN_MOI");
        if (name && name.trim()) {
            const cleanKey = name.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
            const label = prompt("Tên tiếng Việt hiển thị:", cleanKey);
            mappings.unshift({
                key: cleanKey,
                label: label || cleanKey,
                originalText: textToTag,
                count: countOccurrences(extractedParagraphs.join("\n"), textToTag),
                targetSheet: "Từng gói thầu",
                isNew: true
            });
            selectionMenu.classList.add("hidden");
            renderMappingTable();
            renderDocumentView();
            showToast(`Đã tạo và gán biến mới: {{${cleanKey}}}`);
        }
    });

    // -------------------------------------------------------------
    // Word (.docx) XML Tagging & Template Output
    // -------------------------------------------------------------
    async function generateStandardizedDocxBlob() {
        if (!originalDocxArrayBuffer) throw new Error("Chưa nạp file Word!");
        const zip = await JSZip.loadAsync(originalDocxArrayBuffer);

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
                    const placeholder = `{{${m.key}}}`;

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

        return await zip.generateAsync({ type: "blob" });
    }

    btnApplyAllTags.addEventListener("click", async () => {
        if (mappings.length === 0) {
            showToast("Vui lòng thiết lập ít nhất 1 biến!", "error");
            return;
        }
        try {
            btnApplyAllTags.disabled = true;
            btnApplyAllTags.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang xử lý XML...</span>`;
            processedZipBlob = await generateStandardizedDocxBlob();
            viewModeTagged.click();
            showToast("Đã gắn thẻ XML thành công! Có thể tải file Word hoặc cập nhật Excel!");
        } catch (err) {
            console.error("Apply tags error:", err);
            showToast("Lỗi gắn thẻ: " + err.message, "error");
        } finally {
            btnApplyAllTags.disabled = false;
            btnApplyAllTags.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>1. Gắn Thẻ Word XML</span>`;
        }
    });

    btnDownloadTemplate.addEventListener("click", async () => {
        try {
            if (!processedZipBlob) processedZipBlob = await generateStandardizedDocxBlob();
            const outName = `Template_${originalFileName.replace(/\s+/g, "_")}`;
            saveAs(processedZipBlob, outName);
            showToast(`Đã tải về file template: ${outName}`);
        } catch (err) {
            showToast("Lỗi tải template: " + err.message, "error");
        }
    });

    // -------------------------------------------------------------
    // EXCEL SYNC: Bổ sung biến xạ vào Sheet mẫu & Xuất Excel mới
    // -------------------------------------------------------------
    btnDownloadUpdatedExcel.addEventListener("click", async () => {
        if (mappings.length === 0) {
            showToast("Chưa có biến nào để đưa vào Excel!", "error");
            return;
        }

        try {
            btnDownloadUpdatedExcel.disabled = true;
            btnDownloadUpdatedExcel.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo Excel...`;

            // 1. Fetch base Excel template
            const response = await fetch("MauNhapLieu_ChiDinhThau_SAMPLE_v2.xlsx");
            let workbook;
            if (response.ok) {
                const ab = await response.arrayBuffer();
                workbook = XLSX.read(ab, { type: "array" });
            } else {
                workbook = XLSX.utils.book_new();
            }

            // 2. Group mappings by target sheet
            const grouped = {};
            mappings.forEach(m => {
                const sheet = m.targetSheet || "Thông tin chung";
                if (!grouped[sheet]) grouped[sheet] = [];
                grouped[sheet].push(m);
            });

            // 3. Update or create sheets in workbook
            for (const [sheetName, items] of Object.entries(grouped)) {
                if (sheetName === "Thông tin chung") {
                    let ws = workbook.Sheets["Thông tin chung"];
                    let rows = ws ? XLSX.utils.sheet_to_json(ws, { header: 1 }) : [];
                    if (rows.length === 0) {
                        rows.push(["THÔNG TIN CHUNG — HỒ SƠ CHỈ ĐỊNH THẦU"]);
                        rows.push(["Điền 1 lần — áp dụng cho TẤT CẢ gói thầu"]);
                        rows.push([]);
                        rows.push(["STT", "Tên trường", "Giá trị (điền vào đây)", "Ghi chú / Ví dụ"]);
                    }

                    // Section divider
                    rows.push([null, "E. Biến bổ sung từ Template (" + (originalFileName || "Dự án cũ") + ")", null, null]);
                    let sttCounter = rows.length;
                    items.forEach(m => {
                        rows.push([
                            sttCounter++,
                            m.label || m.key,
                            m.originalText || `[${m.key}]`,
                            `Thẻ tag: {{${m.key}}}`
                        ]);
                    });
                    const newWs = XLSX.utils.aoa_to_sheet(rows);
                    newWs['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 60 }, { wch: 40 }];
                    workbook.Sheets["Thông tin chung"] = newWs;

                } else if (sheetName === "Từng gói thầu") {
                    // Update all package sheets in workbook
                    workbook.SheetNames.forEach(sName => {
                        if (sName !== "Thông tin chung") {
                            let ws = workbook.Sheets[sName];
                            let rows = ws ? XLSX.utils.sheet_to_json(ws, { header: 1 }) : [];
                            if (rows.length > 0) {
                                rows.push([null, "F. Biến bổ sung riêng cho gói thầu", null, null]);
                                let sttCounter = rows.length;
                                items.forEach(m => {
                                    rows.push([
                                        sttCounter++,
                                        m.label || m.key,
                                        m.originalText || `[${m.key}]`,
                                        `Thẻ tag: {{${m.key}}}`
                                    ]);
                                });
                                const newWs = XLSX.utils.aoa_to_sheet(rows);
                                newWs['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 60 }, { wch: 40 }];
                                workbook.Sheets[sName] = newWs;
                            }
                        }
                    });

                } else {
                    // Custom new sheet!
                    let rows = [
                        [sheetName.toUpperCase()],
                        ["Biến xạ bổ sung cho: " + sheetName],
                        [],
                        ["STT", "Tên trường", "Giá trị (điền vào đây)", "Ghi chú / Ví dụ"]
                    ];
                    let sttCounter = 1;
                    items.forEach(m => {
                        rows.push([
                            sttCounter++,
                            m.label || m.key,
                            m.originalText || `[${m.key}]`,
                            `Thẻ tag: {{${m.key}}}`
                        ]);
                    });
                    const newWs = XLSX.utils.aoa_to_sheet(rows);
                    newWs['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 60 }, { wch: 40 }];
                    if (workbook.SheetNames.includes(sheetName)) {
                        workbook.Sheets[sheetName] = newWs;
                    } else {
                        XLSX.utils.book_append_sheet(workbook, newWs, sheetName);
                    }
                }
            }

            // Write workbook
            const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const excelBlob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const outExcelName = "MauNhapLieu_ChiDinhThau_SAMPLE_v3_Updated.xlsx";
            saveAs(excelBlob, outExcelName);

            showToast(`Đã xuất file Excel mẫu mới: ${outExcelName}!`);
        } catch (err) {
            console.error("Excel update error:", err);
            showToast("Lỗi khi xuất file Excel: " + err.message, "error");
        } finally {
            btnDownloadUpdatedExcel.disabled = false;
            btnDownloadUpdatedExcel.innerHTML = `<i class="fa-solid fa-file-arrow-down"></i> <span>Xuất File Excel Mới (.xlsx)</span>`;
        }
    });

    // -------------------------------------------------------------
    // Sync Custom Variables to Main App Form
    // -------------------------------------------------------------
    btnSyncToMainApp.addEventListener("click", () => {
        if (mappings.length === 0) {
            showToast("Chưa có biến nào để đồng bộ!", "error");
            return;
        }

        const customVars = mappings.map(m => ({
            key: m.key,
            label: m.label || m.key,
            value: m.originalText,
            targetSheet: m.targetSheet
        }));

        localStorage.setItem("ho_so_custom_variables", JSON.stringify(customVars));
        showToast("Đã đồng bộ biến vào Form Tạo Hồ Sơ! Bạn có thể quay lại trang chính để điền!");
    });

    // -------------------------------------------------------------
    // Test Fill Template
    // -------------------------------------------------------------
    btnTestFillTemplate.addEventListener("click", async () => {
        try {
            btnTestFillTemplate.disabled = true;
            btnTestFillTemplate.textContent = "Đang thử nghiệm...";

            if (!processedZipBlob) processedZipBlob = await generateStandardizedDocxBlob();
            const testZip = await JSZip.loadAsync(processedZipBlob);
            let docXml = await testZip.file("word/document.xml").async("string");

            mappings.forEach(m => {
                docXml = docXml.split(`{{${m.key}}}`).join(`[ĐÃ ĐIỀN: ${m.label || m.key}]`);
            });

            testZip.file("word/document.xml", docXml);
            const testedBlob = await testZip.generateAsync({ type: "blob" });
            saveAs(testedBlob, `TEST_DA_DIEN_${originalFileName}`);
            showToast("Đã tạo file test điền thành công!");
        } catch (err) {
            showToast("Lỗi test: " + err.message, "error");
        } finally {
            btnTestFillTemplate.disabled = false;
            btnTestFillTemplate.innerHTML = `<i class="fa-solid fa-vial"></i> Thử nghiệm điền dữ liệu mẫu vào template vừa tạo`;
        }
    });

})();
