// Công Cụ Chuẩn Hóa Template Word (.docx) - Template Studio
(function () {
    // -------------------------------------------------------------
    // System Standard Variables Catalog
    // -------------------------------------------------------------
    const STANDARD_VARIABLES = [
        { key: "TEN_CHU_DAU_TU", label: "Tên Chủ đầu tư", desc: "VD: UBND phường Hoàn Kiếm", group: "CĐT" },
        { key: "TEN_CHU_DAU_TU_VIET_HOA", label: "Tên CĐT (IN HOA)", desc: "VD: UBND PHƯỜNG HOÀN KIẾM", group: "CĐT" },
        { key: "TEN_BAN_QUAN_LY_DU_AN", label: "Tên Ban QLDA", desc: "VD: BAN QUẢN LÝ ĐẦU TƯ VÀ XÂY DỰNG...", group: "CĐT" },
        { key: "CO_QUAN_TRINH", label: "Cơ quan trình", desc: "VD: Trưởng ban Điều hành dự án", group: "CĐT" },
        { key: "DIA_DANH", label: "Địa danh", desc: "VD: Phường Hoàn Kiếm / Hà Nội", group: "CĐT" },
        { key: "DIA_CHI_TRU_SO", label: "Địa chỉ trụ sở CĐT", desc: "VD: 18 Lê Lai, Hoàn Kiếm...", group: "CĐT" },
        { key: "TEN_DU_AN", label: "Tên dự án", desc: "VD: Sửa chữa, cải tạo trụ sở...", group: "Dự án" },
        { key: "TEN_CONG_TRINH", label: "Tên công trình", desc: "VD: Trụ sở UBND...", group: "Dự án" },
        { key: "NGUON_VON", label: "Nguồn vốn", desc: "VD: Ngân sách quận", group: "Dự án" },
        { key: "TEN_GOI_THAU", label: "Tên gói thầu", desc: "VD: Tư vấn giám sát thi công...", group: "Gói thầu" },
        { key: "HINH_THUC_LCNT", label: "Hình thức LCNT", desc: "VD: Chỉ định thầu rút gọn", group: "Gói thầu" },
        { key: "LOAI_HOP_DONG", label: "Loại hợp đồng", desc: "VD: Trọn gói", group: "Gói thầu" },
        { key: "THOI_GIAN_THUC_HIEN", label: "Thời gian thực hiện", desc: "VD: 90 ngày", group: "Gói thầu" },
        { key: "GIA_GOI_THAU_SO", label: "Giá gói thầu (số)", desc: "VD: 120.000.000", group: "Tài chính" },
        { key: "GIA_GOI_THAU_CHU", label: "Giá gói thầu (chữ)", desc: "VD: Một trăm hai mươi triệu đồng", group: "Tài chính" },
        { key: "GIA_TRI_HOP_DONG_SO", label: "Giá trị hợp đồng (số)", desc: "VD: 115.000.000", group: "Tài chính" },
        { key: "GIA_TRI_HOP_DONG_CHU", label: "Giá trị hợp đồng (chữ)", desc: "VD: Một trăm mười lăm triệu đồng chẵn", group: "Tài chính" },
        { key: "GIA_TRI_GIAM_GIA", label: "Giá trị giảm giá", desc: "VD: 5.000.000", group: "Tài chính" },
        { key: "KHO_BAC_NHA_NUOC", label: "Kho bạc Nhà nước", desc: "VD: Quận Hoàn Kiếm, TP. Hà Nội", group: "Tài chính" },
        { key: "TEN_NHA_THAU", label: "Tên nhà thầu", desc: "VD: Công ty TNHH Giám sát Xây dựng...", group: "Nhà thầu" },
        { key: "TEN_NHA_THAU_VIET_HOA", label: "Tên nhà thầu (IN HOA)", desc: "VD: CÔNG TY TNHH...", group: "Nhà thầu" },
        { key: "TEN_NHA_THAU_VIET_TAT", label: "Tên nhà thầu (viết tắt)", desc: "VD: Hà Thành", group: "Nhà thầu" },
        { key: "DAI_DIEN_NHA_THAU", label: "Người đại diện nhà thầu", desc: "VD: Đỗ Mạnh Cường", group: "Nhà thầu" },
        { key: "CHUC_VU_DAI_DIEN", label: "Chức vụ đại diện nhà thầu", desc: "VD: Giám đốc", group: "Nhà thầu" },
        { key: "DIA_CHI_NHA_THAU", label: "Địa chỉ trụ sở nhà thầu", desc: "VD: 125 Nguyễn Du...", group: "Nhà thầu" },
        { key: "MA_SO_THUE", label: "Mã số thuế nhà thầu", desc: "VD: 0109876543", group: "Nhà thầu" },
        { key: "NGUOI_KY_CDT", label: "Người ký Quyết định CĐT", desc: "VD: Nguyễn Văn An", group: "Nhân sự" },
        { key: "CHUC_VU_NGUOI_KY", label: "Chức vụ người ký CĐT", desc: "VD: Giám đốc Ban QLDA", group: "Nhân sự" },
        { key: "TRUONG_BAN_DHDA", label: "Trưởng ban ĐHDA", desc: "VD: Lê Thị Bích", group: "Nhân sự" },
        { key: "KE_TOAN_TRUONG", label: "Kế toán trưởng", desc: "VD: Phạm Thị Hoa", group: "Nhân sự" },
        { key: "SO_CONG_VAN_THAM_GIA", label: "Số công văn tham gia", desc: "VD: 315/CV-HT", group: "Số hiệu" },
        { key: "SO_BIEN_BAN_HOAN_THIEN", label: "Số biên bản hoàn thiện", desc: "VD: 145/BB-BQLDA", group: "Số hiệu" },
        { key: "SO_TO_TRINH", label: "Số tờ trình chỉ định thầu", desc: "VD: 146/TTr-ĐHDA", group: "Số hiệu" },
        { key: "SO_QUYET_DINH", label: "Số quyết định chỉ định thầu", desc: "VD: 147/QĐ-BQLDA", group: "Số hiệu" },
        { key: "THOI_GIAN_HOP", label: "Thời gian cuộc họp", desc: "VD: 08 giờ 30 phút, ngày 15/07/2025", group: "Khác" },
        { key: "DIA_DIEM_HOP", label: "Địa điểm cuộc họp", desc: "VD: Văn phòng Ban Quản lý dự án", group: "Khác" },
        { key: "NGAY_GIAY_MOI", label: "Ngày giấy mời", desc: "VD: 10/07/2025", group: "Ngày tháng" },
        { key: "NGAY_BIEN_BAN", label: "Ngày biên bản", desc: "VD: 15/07/2025", group: "Ngày tháng" },
        { key: "NGAY_TO_TRINH", label: "Ngày tờ trình", desc: "VD: 16/07/2025", group: "Ngày tháng" },
        { key: "NGAY_QUYET_DINH", label: "Ngày quyết định", desc: "VD: 18/07/2025", group: "Ngày tháng" }
    ];

    // -------------------------------------------------------------
    // State
    // -------------------------------------------------------------
    let currentZip = null;
    let originalDocxArrayBuffer = null;
    let originalFileName = "";
    let extractedParagraphs = [];
    let mappings = []; // [{ key: "TEN_DU_AN", originalText: "Sửa chữa trụ sở...", count: 3 }]
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
    const btnAddCustomVar = document.getElementById("btnAddCustomVar");
    const btnClearAllMapping = document.getElementById("btnClearAllMapping");
    const btnApplyAllTags = document.getElementById("btnApplyAllTags");
    const btnDownloadTemplate = document.getElementById("btnDownloadTemplate");
    const btnTestFillTemplate = document.getElementById("btnTestFillTemplate");

    const viewModeOriginal = document.getElementById("viewModeOriginal");
    const viewModeTagged = document.getElementById("viewModeTagged");
    const documentContentDisplay = document.getElementById("documentContentDisplay");
    const docViewerWrapper = document.getElementById("docViewerWrapper");
    const selectionMenu = document.getElementById("selectionMenu");

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
    // Upload & Drag-and-drop Handling
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

            // Extract document text
            const docXmlStr = await currentZip.file("word/document.xml").async("string");
            extractedParagraphs = parseDocxXmlToParagraphs(docXmlStr);

            // Show UI bars
            btnTriggerUpload.classList.add("hidden");
            fileInfoBar.classList.remove("hidden");
            workspaceArea.classList.remove("hidden");

            // Run Smart Heuristic Entity Detector
            runSmartEntityDetector();
            renderMappingTable();
            renderDocumentView();

            showToast(`Đã nạp file ${file.name} và tự động quét dữ liệu!`);
        } catch (err) {
            console.error("Error reading docx:", err);
            showToast("Không thể đọc file Word: " + err.message, "error");
        }
    }

    // -------------------------------------------------------------
    // Parse word/document.xml to clean paragraphs
    // -------------------------------------------------------------
    function parseDocxXmlToParagraphs(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const pNodes = xmlDoc.getElementsByTagName("w:p");
        const list = [];

        for (let i = 0; i < pNodes.length; i++) {
            const p = pNodes[i];
            const tNodes = p.getElementsByTagName("w:t");
            let text = "";
            for (let j = 0; j < tNodes.length; j++) {
                text += tNodes[j].textContent || "";
            }
            if (text.trim() !== "") {
                list.push(text.trim());
            }
        }
        return list;
    }

    // -------------------------------------------------------------
    // Smart Heuristic Entity Detector (Bộ quét thông minh)
    // -------------------------------------------------------------
    function runSmartEntityDetector() {
        mappings = [];
        const fullText = extractedParagraphs.join("\n");

        function addMatch(key, value) {
            if (!value || typeof value !== "string") return;
            const cleanVal = value.trim().replace(/^[\s:–—\-]+/, "").replace(/[\s;.,]+$/, "");
            if (cleanVal.length < 2) return;
            // Check if already mapped
            if (!mappings.some(m => m.key === key || m.originalText.toLowerCase() === cleanVal.toLowerCase())) {
                const count = countOccurrences(fullText, cleanVal);
                if (count > 0) {
                    mappings.push({
                        key: key,
                        originalText: cleanVal,
                        count: count
                    });
                }
            }
        }

        // 1. Quét Tên Chủ đầu tư / Ban QLDA
        const cdtRegex = /(?:Ủy ban nhân dân|UBND|Ban Quản lý dự án|Ban QLDA)[^\n,;]+/gi;
        const cdtMatches = fullText.match(cdtRegex);
        if (cdtMatches && cdtMatches.length > 0) {
            addMatch("TEN_CHU_DAU_TU", cdtMatches[0]);
            if (cdtMatches.length > 1) {
                addMatch("TEN_BAN_QUAN_LY_DU_AN", cdtMatches[1]);
            }
        }

        // 2. Quét Tên Dự án
        const duAnRegex = /(?:thuộc dự án|dự án|Dự án|công trình)[\s:]+([^\n,;.\"]+)/gi;
        let match;
        while ((match = duAnRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 5) {
                addMatch("TEN_DU_AN", match[1]);
                break;
            }
        }

        // 3. Quét Tên Gói thầu
        const goiThauRegex = /(?:gói thầu|Gói thầu)[\s:]+([^\n,;.\"]+)/gi;
        while ((match = goiThauRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 5) {
                addMatch("TEN_GOI_THAU", match[1]);
                break;
            }
        }

        // 4. Quét Tên Nhà thầu
        const nhaThauRegex = /(?:Công ty|Doanh nghiệp|CÔNG TY)[\s]+([^\n,;.\"]+)/gi;
        while ((match = nhaThauRegex.exec(fullText)) !== null) {
            if (match[0] && match[0].length > 8) {
                addMatch("TEN_NHA_THAU", match[0]);
                break;
            }
        }

        // 5. Quét Giá tiền (số và chữ)
        const giaSoRegex = /\b\d{1,3}(?:\.\d{3}){1,3}\b/g;
        const giaMatches = fullText.match(giaSoRegex);
        if (giaMatches && giaMatches.length > 0) {
            addMatch("GIA_TRI_HOP_DONG_SO", giaMatches[0]);
        }

        const giaChuRegex = /(?:Bằng chữ|bằng chữ)[\s:]+([^\n,;.)]+)/gi;
        while ((match = giaChuRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 4) {
                addMatch("GIA_TRI_HOP_DONG_CHU", match[1]);
                break;
            }
        }

        // 6. Quét Ngày tháng & Địa danh
        const ngayRegex = /([A-Za-zÀ-ỹ\s]+),\s+ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i;
        const ngayMatch = fullText.match(ngayRegex);
        if (ngayMatch) {
            addMatch("DIA_DANH", ngayMatch[1].trim());
            addMatch("NGAY_VAN_BAN", `${ngayMatch[2]}/${ngayMatch[3]}/${ngayMatch[4]}`);
        }

        // 7. Quét Người ký / Người đại diện
        const ngKyRegex = /(?:Ông|Bà|Ông\/Bà)[\s:]+([A-ZÀ-Ỵ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỵ][a-zà-ỹ]+){1,4})/g;
        while ((match = ngKyRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length > 3) {
                if (!mappings.some(m => m.key === "NGUOI_KY_CDT")) {
                    addMatch("NGUOI_KY_CDT", match[1]);
                } else {
                    addMatch("DAI_DIEN_NHA_THAU", match[1]);
                    break;
                }
            }
        }

        // 8. Quét Số hiệu văn bản
        const soRegex = /Số[\s:]+([0-9\/A-ZĐ_–\-]+)/gi;
        while ((match = soRegex.exec(fullText)) !== null) {
            if (match[1] && match[1].length >= 3 && !match[1].includes("...")) {
                addMatch("SO_QUYET_DINH", match[1]);
                break;
            }
        }
    }

    btnAutoScanAgain.addEventListener("click", () => {
        runSmartEntityDetector();
        renderMappingTable();
        renderDocumentView();
        showToast("Đã quét lại toàn bộ văn bản!");
    });

    function countOccurrences(text, phrase) {
        if (!phrase) return 0;
        try {
            const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const matches = text.match(new RegExp(escaped, "gi"));
            return matches ? matches.length : 0;
        } catch (e) {
            return 0;
        }
    }

    // -------------------------------------------------------------
    // Render Mapping Table UI
    // -------------------------------------------------------------
    function renderMappingTable() {
        mappingRowsContainer.innerHTML = "";
        detectedCountBadge.textContent = `${mappings.length} biến`;

        if (mappings.length === 0) {
            mappingRowsContainer.innerHTML = `
                <div class="text-center py-8 text-slate-400 text-xs">
                    <i class="fa-solid fa-list-check text-2xl mb-2 text-slate-300"></i>
                    <p>Chưa có biến nào được ánh xạ.</p>
                    <p class="text-[11px] mt-1 text-slate-400">Bấm "Thêm biến tùy chỉnh" hoặc bôi đen văn bản bên phải để gán thẻ nhanh!</p>
                </div>
            `;
            return;
        }

        mappings.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 hover:border-emerald-300 transition-colors";

            // Variable selector options
            let optionsHtml = "";
            STANDARD_VARIABLES.forEach(v => {
                const selected = v.key === item.key ? "selected" : "";
                optionsHtml += `<option value="${v.key}" ${selected}>{{${v.key}}} — ${v.label}</option>`;
            });

            row.innerHTML = `
                <div class="flex items-center justify-between gap-2">
                    <select class="var-select text-xs font-bold text-emerald-800 bg-white border border-slate-300 rounded-lg px-2 py-1 flex-1 focus:ring-emerald-500">
                        ${optionsHtml}
                    </select>
                    <div class="flex items-center space-x-1">
                        <span class="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">${item.count} lần</span>
                        <button class="btn-delete-row text-slate-400 hover:text-red-600 p-1 rounded text-xs" data-index="${index}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center space-x-1.5">
                    <span class="text-[11px] font-semibold text-slate-500 whitespace-nowrap">Từ trong file cũ:</span>
                    <input type="text" value="${item.originalText || ""}" class="input-orig-text text-xs px-2 py-1 bg-white border border-slate-300 rounded-lg flex-1 focus:ring-emerald-500" data-index="${index}">
                </div>
            `;
            mappingRowsContainer.appendChild(row);
        });

        // Event listeners for mapping rows
        mappingRowsContainer.querySelectorAll(".var-select").forEach((sel, idx) => {
            sel.addEventListener("change", (e) => {
                mappings[idx].key = e.target.value;
                renderDocumentView();
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
            btn.addEventListener("click", (e) => {
                const idx = parseInt(btn.getAttribute("data-index"), 10);
                mappings.splice(idx, 1);
                renderMappingTable();
                renderDocumentView();
            });
        });
    }

    btnAddCustomVar.addEventListener("click", () => {
        mappings.unshift({
            key: "TEN_GOI_THAU",
            originalText: "",
            count: 0
        });
        renderMappingTable();
    });

    btnClearAllMapping.addEventListener("click", () => {
        if (confirm("Bạn có chắc muốn xóa tất cả ánh xạ biến?")) {
            mappings = [];
            renderMappingTable();
            renderDocumentView();
        }
    });

    // -------------------------------------------------------------
    // Document Preview & Highlighting
    // -------------------------------------------------------------
    viewModeOriginal.addEventListener("click", () => {
        isTaggedView = false;
        viewModeOriginal.className = "px-2.5 py-1 rounded-md font-semibold bg-white text-slate-800 shadow-sm";
        viewModeTagged.className = "px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900";
        renderDocumentView();
    });

    viewModeTagged.addEventListener("click", () => {
        isTaggedView = true;
        viewModeTagged.className = "px-2.5 py-1 rounded-md font-semibold bg-emerald-600 text-white shadow-sm";
        viewModeOriginal.className = "px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900";
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

            // If Original View: highlight matched phrases in yellow
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
                // If Tagged View: replace matched phrases with {{KEY}} badge
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

            html += `<p class="mb-3 text-[13pt] leading-relaxed text-justify">${paragraphHtml}</p>`;
        });

        documentContentDisplay.innerHTML = html;
    }

    // -------------------------------------------------------------
    // Highlight Text & Quick Click-to-Tag Popup Menu
    // -------------------------------------------------------------
    documentContentDisplay.addEventListener("mouseup", () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 2) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const wrapperRect = docViewerWrapper.getBoundingClientRect();

            // Position popup above selection
            selectionMenu.style.left = `${rect.left - wrapperRect.left}px`;
            selectionMenu.style.top = `${rect.top - wrapperRect.top + docViewerWrapper.scrollTop - 40}px`;
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
                // Add or update mapping
                const existing = mappings.find(m => m.key === varKey);
                if (existing) {
                    existing.originalText = textToTag;
                    existing.count = countOccurrences(extractedParagraphs.join("\n"), textToTag);
                } else {
                    mappings.unshift({
                        key: varKey,
                        originalText: textToTag,
                        count: countOccurrences(extractedParagraphs.join("\n"), textToTag)
                    });
                }
                selectionMenu.classList.add("hidden");
                renderMappingTable();
                renderDocumentView();
                showToast(`Đã gán "${textToTag.substring(0, 20)}..." thành {{${varKey}}}`);
            }
        });
    });

    // -------------------------------------------------------------
    // One-Click Standardize & Generate Real Template (.docx)
    // -------------------------------------------------------------
    async function generateStandardizedDocxBlob() {
        if (!originalDocxArrayBuffer) throw new Error("Chưa nạp file Word!");

        const zip = await JSZip.loadAsync(originalDocxArrayBuffer);

        // Process document.xml and any headers/footers
        const targetFiles = Object.keys(zip.files).filter(fn => 
            fn === "word/document.xml" || fn.startsWith("word/header") || fn.startsWith("word/footer")
        );

        for (const fileName of targetFiles) {
            let xmlContent = await zip.file(fileName).async("string");

            // DOM-based replacement to handle text split across runs safely
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

                    // Check single node match
                    for (let j = 0; j < tNodes.length; j++) {
                        const node = tNodes[j];
                        if (node.textContent && node.textContent.includes(target)) {
                            node.textContent = node.textContent.split(target).join(placeholder);
                        }
                    }

                    // Check spanning nodes
                    let fullPText = "";
                    for (let j = 0; j < tNodes.length; j++) {
                        fullPText += tNodes[j].textContent || "";
                    }

                    if (fullPText.includes(target)) {
                        const newFullText = fullPText.split(target).join(placeholder);
                        tNodes[0].textContent = newFullText;
                        for (let j = 1; j < tNodes.length; j++) {
                            tNodes[j].textContent = "";
                        }
                    }
                });
            }

            const serializer = new XMLSerializer();
            const updatedXml = serializer.serializeToString(xmlDoc);
            zip.file(fileName, updatedXml);
        }

        return await zip.generateAsync({ type: "blob" });
    }

    btnApplyAllTags.addEventListener("click", async () => {
        if (mappings.length === 0) {
            showToast("Vui lòng thiết lập ít nhất 1 biến để gán thẻ!", "error");
            return;
        }

        try {
            btnApplyAllTags.disabled = true;
            btnApplyAllTags.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang xử lý Word XML...</span>`;

            processedZipBlob = await generateStandardizedDocxBlob();
            // Switch to tagged preview
            viewModeTagged.click();

            showToast(`Đã chuẩn hóa thành công! Có thể bấm "Tải Template" hoặc "Thử điền dữ liệu" ngay!`);
        } catch (err) {
            console.error("Apply tags error:", err);
            showToast("Lỗi khi chuẩn hóa: " + err.message, "error");
        } finally {
            btnApplyAllTags.disabled = false;
            btnApplyAllTags.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>GẮN THẺ PLACEHOLDER VÀO FILE WORD</span>`;
        }
    });

    btnDownloadTemplate.addEventListener("click", async () => {
        try {
            if (!processedZipBlob) {
                processedZipBlob = await generateStandardizedDocxBlob();
            }
            const outName = `Template_${originalFileName.replace(/\s+/g, "_")}`;
            saveAs(processedZipBlob, outName);
            showToast(`Đã tải về file template chuẩn: ${outName}`);
        } catch (err) {
            console.error("Download template error:", err);
            showToast("Lỗi tải template: " + err.message, "error");
        }
    });

    // -------------------------------------------------------------
    // Test Fill Template with Sample Data
    // -------------------------------------------------------------
    btnTestFillTemplate.addEventListener("click", async () => {
        try {
            btnTestFillTemplate.disabled = true;
            btnTestFillTemplate.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang thử nghiệm...</span>`;

            if (!processedZipBlob) {
                processedZipBlob = await generateStandardizedDocxBlob();
            }

            const testZip = await JSZip.loadAsync(processedZipBlob);
            let docXml = await testZip.file("word/document.xml").async("string");

            // Mock sample replacements
            const sampleData = {
                TEN_CHU_DAU_TU: "UBND Phường Thử Nghiệm",
                TEN_CHU_DAU_TU_VIET_HOA: "UBND PHƯỜNG THỬ NGHIỆM",
                TEN_BAN_QUAN_LY_DU_AN: "BAN QUẢN LÝ DỰ ÁN MẪU",
                TEN_DU_AN: "Dự án Nâng cấp và cải tạo cơ sở hạ tầng mẫu",
                TEN_GOI_THAU: "Gói thầu Tư vấn thiết kế bản vẽ thi công",
                TEN_NHA_THAU: "Công ty Cổ phần Xây lắp Mẫu Việt Nam",
                GIA_TRI_HOP_DONG_SO: "250.000.000",
                GIA_TRI_HOP_DONG_CHU: "Hai trăm năm mươi triệu đồng",
                NGUOI_KY_CDT: "Trần Văn Mẫu",
                DAI_DIEN_NHA_THAU: "Lê Văn Thử",
                DIA_DANH: "Hà Nội",
                NGAY_VAN_BAN: "20/10/2026",
                SO_QUYET_DINH: "999/QĐ-BQLDA"
            };

            for (const [k, v] of Object.entries(sampleData)) {
                docXml = docXml.split(`{{${k}}}`).join(v);
            }

            testZip.file("word/document.xml", docXml);
            const testedBlob = await testZip.generateAsync({ type: "blob" });
            const testFileName = `KET_QUA_TEST_${originalFileName}`;
            saveAs(testedBlob, testFileName);

            showToast(`Đã thử điền dữ liệu thành công vào ${testFileName}!`);
        } catch (err) {
            console.error("Test fill error:", err);
            showToast("Lỗi thử nghiệm: " + err.message, "error");
        } finally {
            btnTestFillTemplate.disabled = false;
            btnTestFillTemplate.innerHTML = `<i class="fa-solid fa-vial"></i> <span>Thử điền dữ liệu</span>`;
        }
    });

})();
