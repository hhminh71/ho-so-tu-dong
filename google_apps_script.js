/**
 * =========================================================================
 * GOOGLE APPS SCRIPT — NGUỒN DỮ LIỆU ONLINE TRUNG TÂM CHO "TẠO HỒ SƠ TỰ ĐỘNG"
 * =========================================================================
 * Hướng dẫn cài đặt trong 2 phút:
 * 1. Mở file Google Sheet (được lưu từ MauNhapLieu_HoSo_2Sheets_v3.xlsx)
 * 2. Vào menu "Tiện ích mở rộng" (Extensions) -> "Apps Script"
 * 3. Xóa hết mã cũ trong file Code.gs, dán toàn bộ nội dung file này vào
 * 4. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment)
 * 5. Chọn loại "Ứng dụng web" (Web app)
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)
 * 6. Bấm "Triển khai" và sao chép đường link Web App URL dán vào phần mềm!
 * =========================================================================
 */

// Mật mã xác thực quyền Admin khi lưu từ Web lên Sheet (bạn có thể đổi mật mã này)
const DEFAULT_ADMIN_SECRET = "admin123";

/**
 * 1. Xử lý yêu cầu GET: Đọc dữ liệu từ Google Sheet gửi về cho Web App
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "getData";
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Đọc Sheet 2: "Thông tin" (Chứa Từ điển 63+ biến & giá trị các gói)
    const wsInfo = getSheetByName(ss, ["Thông tin", "Thong tin", "Sheet2"]);
    const catalogData = parseInfoSheet(wsInfo);

    // 2. Đọc Sheet 1: "Định hướng" (Chứa Kế hoạch, Gói thầu, Tiến độ)
    const wsRoadmap = getSheetByName(ss, ["Định hướng", "Dinh huong", "Sheet1"]);
    const roadmapData = parseRoadmapSheet(wsRoadmap);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      sheetTitle: ss.getName(),
      catalog: catalogData.catalog,
      generalInfo: Object.assign({}, roadmapData.generalInfo, catalogData.generalInfo),
      packages: catalogData.packages.length > 0 ? catalogData.packages : roadmapData.packages,
      timelinePhases: roadmapData.timelinePhases
    };

    return createJsonResponse(response);
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString(),
      stack: err.stack
    });
  }
}

/**
 * 2. Xử lý yêu cầu POST: Ghi dữ liệu từ Web App ngược lên Google Sheet (Chỉ Admin)
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    const action = payload.action || "saveCatalog";
    const adminKey = payload.adminKey || "";

    // Kiểm tra quyền Admin cơ bản
    if (adminKey && adminKey !== DEFAULT_ADMIN_SECRET) {
      return createJsonResponse({
        success: false,
        error: "Mật mã Admin không chính xác. Không có quyền cập nhật dữ liệu trung tâm!"
      });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Cập nhật Từ điển biến (Sheet "Thông tin")
    if (payload.catalog && Array.isArray(payload.catalog)) {
      const wsInfo = getSheetByName(ss, ["Thông tin", "Thong tin", "Sheet2"]);
      if (wsInfo) {
        updateInfoSheet(wsInfo, payload.catalog, payload.packages);
      }
    }

    // Cập nhật Thông tin chung & Gói thầu (Sheet "Định hướng")
    if (payload.generalInfo || payload.roadmap) {
      const wsRoadmap = getSheetByName(ss, ["Định hướng", "Dinh huong", "Sheet1"]);
      if (wsRoadmap) {
        updateRoadmapSheet(wsRoadmap, payload.generalInfo, payload.packages);
      }
    }

    return createJsonResponse({
      success: true,
      message: "Đã cập nhật dữ liệu và từ điển lên Google Sheet thành công!",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

// -------------------------------------------------------------
// HÀM TRỢ GIÚP PHÂN TÍCH & ĐỌC GHI DỮ LIỆU
// -------------------------------------------------------------

function getSheetByName(ss, candidateNames) {
  const sheets = ss.getSheets();
  for (let i = 0; i < candidateNames.length; i++) {
    const target = candidateNames[i].toLowerCase();
    for (let j = 0; j < sheets.length; j++) {
      const name = sheets[j].getName().toLowerCase();
      if (name.includes(target) || target.includes(name)) {
        return sheets[j];
      }
    }
  }
  return sheets[0];
}

function parseInfoSheet(sheet) {
  if (!sheet) return { catalog: [], generalInfo: {}, packages: [] };

  const values = sheet.getDataRange().getValues();
  if (!values || values.length < 5) return { catalog: [], generalInfo: {}, packages: [] };

  // Dòng tiêu đề (Row 4, index 3)
  const headerRow = values[3];
  const pkgColumns = [];
  const packages = [];

  for (let c = 5; c < headerRow.length; c++) {
    const colName = String(headerRow[c] || "").trim();
    if (colName) {
      pkgColumns.push({ colIdx: c, name: colName });
      packages.push({
        id: "pkg_" + (packages.length + 1),
        name: colName.replace(/^Gói\s*\d+:\s*/i, ""),
        sheet_name: colName,
        fields: {}
      });
    }
  }

  const catalog = [];
  const generalInfo = {};

  // Dữ liệu từ Dòng 5 (index 4)
  for (let r = 4; r < values.length; r++) {
    const row = values[r];
    const stt = row[0];
    const group = String(row[1] || "").trim();
    const label = String(row[2] || "").trim();
    const rawTag = String(row[3] || "").trim();
    const tag = rawTag.replace(/[{}]/g, "").trim().toUpperCase();

    if (!tag) continue;

    const commonVal = String(row[4] !== undefined && row[4] !== null ? row[4] : "").trim();
    const isGeneral = commonVal !== "" || group.startsWith("A.") || group.startsWith("B.");

    if (commonVal) {
      generalInfo[tag] = commonVal;
    }

    pkgColumns.forEach((pkgCol, pIdx) => {
      const cellVal = String(row[pkgCol.colIdx] !== undefined && row[pkgCol.colIdx] !== null ? row[pkgCol.colIdx] : "").trim();
      if (cellVal) {
        packages[pIdx].fields[tag] = cellVal;
      }
    });

    catalog.push({
      stt: stt,
      group: group,
      groupKey: group.charAt(0).toUpperCase(),
      label: label,
      tag: tag,
      isGeneral: isGeneral,
      example: commonVal
    });
  }

  return { catalog: catalog, generalInfo: generalInfo, packages: packages };
}

function parseRoadmapSheet(sheet) {
  const res = { generalInfo: {}, packages: [], timelinePhases: [] };
  if (!sheet) return res;

  const values = sheet.getDataRange().getValues();
  if (!values || values.length === 0) return res;

  // Đọc thông tin chung
  for (let r = 0; r < Math.min(values.length, 10); r++) {
    const row = values[r];
    for (let c = 0; c < row.length; c++) {
      const cell = String(row[c] || "").trim();
      const nextCell = String(row[c+1] || "").trim();
      if (cell.includes("Tên dự án") && nextCell) res.generalInfo.TEN_DU_AN = nextCell;
      if (cell.includes("Chủ đầu tư") && nextCell) res.generalInfo.TEN_CHU_DAU_TU = nextCell;
      if (cell.includes("Cấp quyết định") && nextCell) res.generalInfo.CAP_QUYET_DINH_DAU_TU = nextCell;
      if (cell.includes("Nguồn vốn") && nextCell) res.generalInfo.NGUON_VON = nextCell;
      if (cell.includes("Địa danh") && nextCell) res.generalInfo.DIA_DANH = nextCell;
      if (cell.includes("Tỉnh / Thành phố") && nextCell) res.generalInfo.TINH_THANH_PHO = nextCell;
    }
  }

  return res;
}

function updateInfoSheet(sheet, catalogList, packagesList) {
  if (!sheet || !Array.isArray(catalogList)) return;

  const startRow = 5;
  const numRows = catalogList.length;

  for (let i = 0; i < numRows; i++) {
    const item = catalogList[i];
    const r = startRow + i;

    sheet.getRange(r, 1).setValue(item.stt || (i + 1));
    sheet.getRange(r, 2).setValue(item.group || "");
    sheet.getRange(r, 3).setValue(item.label || "");
    sheet.getRange(r, 4).setValue(item.tag || "");
    if (item.example) {
      sheet.getRange(r, 5).setValue(item.example);
    }
  }
}

function updateRoadmapSheet(sheet, generalInfo, packages) {
  if (!sheet) return;
  // Cập nhật thông tin chung nếu có
  if (generalInfo) {
    if (generalInfo.TEN_DU_AN) sheet.getRange("B5").setValue(generalInfo.TEN_DU_AN);
    if (generalInfo.CAP_QUYET_DINH_DAU_TU) sheet.getRange("G5").setValue(generalInfo.CAP_QUYET_DINH_DAU_TU);
    if (generalInfo.TEN_CHU_DAU_TU) sheet.getRange("B6").setValue(generalInfo.TEN_CHU_DAU_TU);
    if (generalInfo.NGUON_VON) sheet.getRange("G6").setValue(generalInfo.NGUON_VON);
    if (generalInfo.DIA_DANH) sheet.getRange("B7").setValue(generalInfo.DIA_DANH);
    if (generalInfo.TINH_THANH_PHO) sheet.getRange("G7").setValue(generalInfo.TINH_THANH_PHO);
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
