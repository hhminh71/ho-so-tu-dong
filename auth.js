/**
 * HỆ THỐNG XÁC THỰC, PHÂN QUYỀN & QUẢN LÝ NGƯỜI DÙNG (AUTH & RBAC)
 * Dành cho: Hệ thống Tạo Hồ Sơ Tự Động
 * Kế thừa kiến trúc bảo mật từ Quản Lý Kế Hoạch
 */

// -------------------------------------------------------------
// 1. CẤU HÌNH VAI TRÒ & QUYỀN HẠN
// -------------------------------------------------------------
const ROLES = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",       // Cán bộ lập hồ sơ
    REVIEWER: "REVIEWER",   // Lãnh đạo phê duyệt
    VIEWER: "VIEWER"        // Người xem tra cứu
};

const ROLE_INFO = {
    [ROLES.ADMIN]: {
        name: "ADMIN",
        label: "Quản trị viên (Admin)",
        shortLabel: "Admin",
        description: "Toàn quyền cấu hình quy trình, phân quyền tài khoản và phê duyệt",
        badgeClass: "bg-amber-500/20 text-amber-300 border border-amber-400/40",
        dotClass: "bg-amber-400",
        icon: "fa-shield-halved",
        canManageUsers: true,
        canConfigureMatrix: true,
        canCreateDocs: true,
        canExport: true
    },
    [ROLES.EDITOR]: {
        name: "EDITOR",
        label: "Cán bộ Lập hồ sơ (Editor)",
        shortLabel: "Cán bộ lập hồ sơ",
        description: "Lập kế hoạch, tạo hồ sơ, chuẩn hóa template và xuất tài liệu Word/Excel",
        badgeClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
        dotClass: "bg-emerald-400",
        icon: "fa-file-signature",
        canManageUsers: false,
        canConfigureMatrix: false,
        canCreateDocs: true,
        canExport: true
    },
    [ROLES.REVIEWER]: {
        name: "REVIEWER",
        label: "Lãnh đạo Phê duyệt (Reviewer)",
        shortLabel: "Lãnh đạo duyệt",
        description: "Kiểm tra tiến độ, rà soát dự thảo hồ sơ và phê duyệt quyết định",
        badgeClass: "bg-purple-500/20 text-purple-300 border border-purple-400/40",
        dotClass: "bg-purple-400",
        icon: "fa-stamp",
        canManageUsers: false,
        canConfigureMatrix: false,
        canCreateDocs: false,
        canExport: true
    },
    [ROLES.VIEWER]: {
        name: "VIEWER",
        label: "Người xem (Viewer)",
        shortLabel: "Chỉ xem",
        description: "Chỉ tra cứu quy trình, xem tiến độ và đối chiếu biểu mẫu",
        badgeClass: "bg-slate-400/20 text-slate-300 border border-slate-400/30",
        dotClass: "bg-slate-400",
        icon: "fa-eye",
        canManageUsers: false,
        canConfigureMatrix: false,
        canCreateDocs: false,
        canExport: false
    }
};

// Danh sách tài khoản mẫu ban đầu
const DEFAULT_USERS = [
    {
        id: "USR-001",
        email: "admin@company.vn",
        password: "admin123",
        name: "Nguyễn Văn Admin",
        department: "Phòng TC-KH & Ban Quản trị",
        role: ROLES.ADMIN,
        status: "ACTIVE", // ACTIVE | LOCKED
        createdAt: "2026-10-25 08:30",
        notes: "Quản trị viên trưởng toàn quyền hệ thống"
    },
    {
        id: "USR-002",
        email: "hoso@company.vn",
        password: "hoso123",
        name: "Trần Thị Mai (Lập hồ sơ)",
        department: "Tổ Mua sắm & Đấu thầu",
        role: ROLES.EDITOR,
        status: "ACTIVE",
        createdAt: "2026-10-26 09:15",
        notes: "Chuyên viên soạn thảo và tạo hồ sơ thầu"
    },
    {
        id: "USR-003",
        email: "lanhdao@company.vn",
        password: "lanhdao123",
        name: "Lê Hoàng Lãnh Đạo",
        department: "Ban Giám đốc Cảng",
        role: ROLES.REVIEWER,
        status: "ACTIVE",
        createdAt: "2026-10-28 14:00",
        notes: "Theo dõi tiến độ và ký duyệt tờ trình"
    },
    {
        id: "USR-004",
        email: "xem@company.vn",
        password: "xem123",
        name: "Hoàng Văn Xem (Thanh tra)",
        department: "Tổ Giám sát & Thanh tra nội bộ",
        role: ROLES.VIEWER,
        status: "ACTIVE",
        createdAt: "2026-10-30 11:20",
        notes: "Chỉ tra cứu tiến độ và kiểm tra biểu mẫu"
    }
];

const STORAGE_KEY_USERS = "hstd_users_list_v1";
const STORAGE_KEY_CURRENT_USER = "hstd_current_user_v1";
const STORAGE_KEY_LAST_ACTIVE = "hstd_last_active_time";

// -------------------------------------------------------------
// 2. CLASS QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN
// -------------------------------------------------------------
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.editingUserId = null;
    }

    // Lấy danh sách users từ localStorage
    loadUsers() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_USERS);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.error("Lỗi đọc danh sách người dùng:", e);
        }
        this.saveUsers(DEFAULT_USERS);
        return DEFAULT_USERS;
    }

    saveUsers(users) {
        this.users = users;
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }

    // Lấy thông tin user đang đăng nhập
    loadCurrentUser() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
            if (raw) {
                const u = JSON.parse(raw);
                // Kiểm tra hết hạn phiên (Admin: 8h, User thường: 30p không hoạt động)
                const lastActive = parseInt(localStorage.getItem(STORAGE_KEY_LAST_ACTIVE) || "0", 10);
                const now = Date.now();
                const timeoutMs = (u.role === ROLES.ADMIN) ? 8 * 60 * 60 * 1000 : 30 * 60 * 1000;

                if (lastActive && (now - lastActive > timeoutMs)) {
                    this.logout("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                    return null;
                }
                this.recordActivity();
                return u;
            }
        } catch (e) {
            console.error("Lỗi đọc phiên làm việc:", e);
        }
        return null;
    }

    recordActivity() {
        localStorage.setItem(STORAGE_KEY_LAST_ACTIVE, Date.now().toString());
    }

    // Đăng nhập
    login(emailOrUsername, password) {
        const cleanEmail = String(emailOrUsername || "").trim().toLowerCase();
        const cleanPass = String(password || "").trim();

        if (!cleanEmail) {
            throw new Error("Vui lòng nhập Email hoặc Tên tài khoản.");
        }
        if (!cleanPass) {
            throw new Error("Vui lòng nhập Mật khẩu.");
        }

        const found = this.users.find(u => {
            const uEmail = String(u.email || "").toLowerCase();
            const uPrefix = uEmail.split("@")[0];
            return (uEmail === cleanEmail || uPrefix === cleanEmail);
        });

        if (!found) {
            throw new Error("Tài khoản không tồn tại trong hệ thống.");
        }

        if (found.password !== cleanPass) {
            throw new Error("Mật khẩu không chính xác. Vui lòng thử lại.");
        }

        if (found.status === "LOCKED") {
            throw new Error("Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên.");
        }

        this.currentUser = { ...found };
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(this.currentUser));
        this.recordActivity();
        return this.currentUser;
    }

    // Đăng xuất
    logout(message = "") {
        this.currentUser = null;
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
        localStorage.removeItem(STORAGE_KEY_LAST_ACTIVE);
        if (message) {
            sessionStorage.setItem("hstd_logout_notice", message);
        }
        this.updateUI();
    }

    // Kiểm tra quyền hạn
    hasPermission(permissionName) {
        if (!this.currentUser) return false;
        const meta = ROLE_INFO[this.currentUser.role];
        if (!meta) return false;
        return !!meta[permissionName];
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === ROLES.ADMIN;
    }

    // Cập nhật giao diện toàn hệ thống
    updateUI() {
        const loginOverlay = document.getElementById("appLoginOverlay");
        const userHeaderBlock = document.getElementById("userHeaderBlock");
        const headerUserName = document.getElementById("headerUserName");
        const headerUserRoleBadge = document.getElementById("headerUserRoleBadge");
        const headerUserAvatar = document.getElementById("headerUserAvatar");
        const dropdownUserName = document.getElementById("dropdownUserName");
        const dropdownUserRole = document.getElementById("dropdownUserRole");
        const dropdownUserDept = document.getElementById("dropdownUserDept");
        const btnOpenUserManagement = document.getElementById("btnOpenUserManagement");
        const btnOpenMatrixSettings = document.getElementById("btnOpenMatrixSettings");
        const btnOpenImplementationSettings = document.getElementById("btnOpenImplementationSettings");

        // 1. Kiểm tra trạng thái đăng nhập
        if (!this.currentUser) {
            if (loginOverlay) loginOverlay.classList.remove("hidden");
            const notice = sessionStorage.getItem("hstd_logout_notice");
            if (notice) {
                const noticeEl = document.getElementById("loginSessionNotice");
                if (noticeEl) {
                    noticeEl.textContent = notice;
                    noticeEl.classList.remove("hidden");
                }
                sessionStorage.removeItem("hstd_logout_notice");
            }
            return;
        }

        // Đã đăng nhập: Ẩn overlay Login
        if (loginOverlay) loginOverlay.classList.add("hidden");

        // 2. Cập nhật thông tin lên Header
        const roleMeta = ROLE_INFO[this.currentUser.role] || ROLE_INFO[ROLES.VIEWER];
        
        if (headerUserName) {
            headerUserName.textContent = this.currentUser.name || this.currentUser.email;
        }

        if (headerUserRoleBadge) {
            headerUserRoleBadge.className = `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${roleMeta.badgeClass}`;
            headerUserRoleBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${roleMeta.dotClass}"></span><span>${roleMeta.shortLabel}</span>`;
        }

        if (headerUserAvatar) {
            const firstLetter = (this.currentUser.name || this.currentUser.email || "U").charAt(0).toUpperCase();
            headerUserAvatar.textContent = firstLetter;
        }

        // 3. Cập nhật Dropdown Menu User
        if (dropdownUserName) dropdownUserName.textContent = this.currentUser.name;
        if (dropdownUserRole) dropdownUserRole.textContent = roleMeta.label;
        if (dropdownUserDept) dropdownUserDept.textContent = this.currentUser.department || "Cảng HKQT Cần Thơ";

        // 4. Phân quyền hiển thị các nút Admin
        const isAdmin = this.isAdmin();
        if (btnOpenUserManagement) {
            btnOpenUserManagement.style.display = isAdmin ? "flex" : "none";
        }
        if (btnOpenMatrixSettings) {
            btnOpenMatrixSettings.style.display = isAdmin ? "flex" : "none";
        }
        if (btnOpenImplementationSettings) {
            btnOpenImplementationSettings.style.display = isAdmin ? "flex" : "none";
        }
    }
}

// Khởi tạo Singleton
const authApp = new AuthManager();

// -------------------------------------------------------------
// 3. XỬ LÝ SỰ KIỆN GIAO DIỆN (LOGIN, MODAL PHÂN QUYỀN)
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // 1. Cập nhật UI ban đầu
    authApp.updateUI();

    // 2. Bắt sự kiện người dùng hoạt động để gia hạn session
    ["mousedown", "keydown", "scroll", "touchstart"].forEach(evt => {
        document.addEventListener(evt, () => {
            if (authApp.currentUser) {
                authApp.recordActivity();
            }
        }, { passive: true });
    });

    // ---------------------------------------------------------
    // SỰ KIỆN FORM LOGIN
    // ---------------------------------------------------------
    const formLogin = document.getElementById("formAppLogin");
    const inputEmail = document.getElementById("loginInputEmail");
    const inputPass = document.getElementById("loginInputPassword");
    const btnTogglePass = document.getElementById("btnToggleLoginPass");
    const loginError = document.getElementById("loginErrorMessage");
    const btnSubmit = document.getElementById("btnLoginSubmit");

    if (btnTogglePass && inputPass) {
        btnTogglePass.addEventListener("click", () => {
            const isPassword = inputPass.getAttribute("type") === "password";
            inputPass.setAttribute("type", isPassword ? "text" : "password");
            const icon = btnTogglePass.querySelector("i");
            if (icon) {
                icon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
            }
        });
    }

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            if (loginError) loginError.classList.add("hidden");

            try {
                if (btnSubmit) {
                    btnSubmit.disabled = true;
                    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang xác thực...</span>`;
                }

                setTimeout(() => {
                    try {
                        authApp.login(inputEmail.value, inputPass.value);
                        authApp.updateUI();
                    } catch (err) {
                        if (loginError) {
                            loginError.textContent = err.message;
                            loginError.classList.remove("hidden");
                        }
                    } finally {
                        if (btnSubmit) {
                            btnSubmit.disabled = false;
                            btnSubmit.innerHTML = `<i class="fa-solid fa-right-to-bracket text-xs"></i> <span>Đăng nhập hệ thống</span>`;
                        }
                    }
                }, 300);
            } catch (err) {
                if (loginError) {
                    loginError.textContent = err.message;
                    loginError.classList.remove("hidden");
                }
            }
        });
    }

    // Quick Login Pills (Bấm 1 click để điền tài khoản)
    document.querySelectorAll(".btn-quick-login").forEach(btn => {
        btn.addEventListener("click", () => {
            const email = btn.getAttribute("data-email");
            const pass = btn.getAttribute("data-pass");
            if (inputEmail) inputEmail.value = email;
            if (inputPass) inputPass.value = pass;
            if (formLogin) {
                formLogin.dispatchEvent(new Event("submit"));
            }
        });
    });

    // ---------------------------------------------------------
    // SỰ KIỆN ĐĂNG XUẤT & DROPDOWN HEADER
    // ---------------------------------------------------------
    const btnLogout = document.getElementById("btnAppLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
                authApp.logout();
                window.location.reload();
            }
        });
    }

    // ---------------------------------------------------------
    // SỰ KIỆN MODAL PHÂN QUYỀN (USER MANAGEMENT MODAL)
    // ---------------------------------------------------------
    const modalUserMgmt = document.getElementById("modalUserManagement");
    const btnOpenUserMgmt = document.getElementById("btnOpenUserManagement");
    const btnCloseUserMgmt = document.getElementById("btnCloseUserManagement");
    const inputSearchUsers = document.getElementById("inputSearchUsers");
    const selectFilterRole = document.getElementById("selectFilterUserRole");
    const btnOpenAddUser = document.getElementById("btnOpenAddUserModal");
    const btnResetUsers = document.getElementById("btnResetDefaultUsers");

    // Mở modal
    if (btnOpenUserMgmt && modalUserMgmt) {
        btnOpenUserMgmt.addEventListener("click", () => {
            const dropdown = document.getElementById("userAccountDropdown");
            if (dropdown) dropdown.classList.add("hidden");

            if (!authApp.isAdmin()) {
                alert("Bạn không có quyền truy cập trang quản lý người dùng!");
                return;
            }
            renderUserTable();
            modalUserMgmt.classList.remove("hidden");
        });
    }

    // Đóng modal
    if (btnCloseUserMgmt && modalUserMgmt) {
        btnCloseUserMgmt.addEventListener("click", () => {
            modalUserMgmt.classList.add("hidden");
        });
    }

    // Tìm kiếm & Lọc
    if (inputSearchUsers) {
        inputSearchUsers.addEventListener("input", () => renderUserTable());
    }
    if (selectFilterRole) {
        selectFilterRole.addEventListener("change", () => renderUserTable());
    }

    // Khôi phục tài khoản mẫu
    if (btnResetUsers) {
        btnResetUsers.addEventListener("click", () => {
            if (confirm("Bạn có chắc muốn khôi phục danh sách tài khoản về mặc định ban đầu?")) {
                authApp.saveUsers([...DEFAULT_USERS]);
                renderUserTable();
                alert("Đã khôi phục danh sách người dùng mặc định.");
            }
        });
    }

    // Hàm render bảng danh sách người dùng
    function renderUserTable() {
        const tbody = document.getElementById("userTableBody");
        if (!tbody) return;

        const q = String(inputSearchUsers?.value || "").toLowerCase().trim();
        const roleFilter = selectFilterRole?.value || "ALL";

        const filtered = authApp.users.filter(u => {
            const matchQuery = !q || 
                (u.name && u.name.toLowerCase().includes(q)) ||
                (u.email && u.email.toLowerCase().includes(q)) ||
                (u.department && u.department.toLowerCase().includes(q));

            const matchRole = (roleFilter === "ALL") || (u.role === roleFilter);
            return matchQuery && matchRole;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-4 py-8 text-center text-slate-400">
                        <i class="fa-solid fa-user-slash text-2xl mb-2 text-slate-300"></i>
                        <p class="text-xs">Không tìm thấy tài khoản phù hợp với điều kiện lọc.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map((u, idx) => {
            const roleMeta = ROLE_INFO[u.role] || ROLE_INFO[ROLES.VIEWER];
            const isCurrentUser = authApp.currentUser && authApp.currentUser.email === u.email;
            const isLocked = u.status === "LOCKED";
            const firstLetter = (u.name || u.email || "U").charAt(0).toUpperCase();

            return `
                <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td class="px-3 py-2 text-slate-400 font-mono text-[10px] text-center w-8">${idx + 1}</td>
                    <td class="px-3 py-2">
                        <div class="flex items-center space-x-2">
                            <div class="w-7 h-7 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                                ${firstLetter}
                            </div>
                            <div class="min-w-0">
                                <div class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                    <span>${u.name || "Chưa đặt tên"}</span>
                                    ${isCurrentUser ? '<span class="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-semibold">Bạn</span>' : ''}
                                </div>
                                <div class="text-[10px] text-slate-500 font-mono">${u.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-3 py-2 text-slate-700 font-medium text-[11px]">${u.department || "Chưa rõ"}</td>
                    <td class="px-3 py-2">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${roleMeta.badgeClass}">
                            <i class="fa-solid ${roleMeta.icon} text-[9px]"></i>
                            <span>${roleMeta.shortLabel}</span>
                        </span>
                    </td>
                    <td class="px-3 py-2 text-center">
                        ${isLocked 
                            ? '<span class="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200"><i class="fa-solid fa-lock text-[9px]"></i> Đã khóa</span>' 
                            : '<span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"><i class="fa-solid fa-circle-check text-[9px]"></i> Hoạt động</span>'
                        }
                    </td>
                    <td class="px-3 py-2 text-right space-x-1 whitespace-nowrap">
                        <button type="button" class="btn-edit-user px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-medium transition-colors" data-id="${u.id || u.email}" title="Chỉnh sửa tài khoản">
                            <i class="fa-solid fa-pen-to-square text-blue-600"></i> Sửa
                        </button>
                        ${!isCurrentUser ? `
                            <button type="button" class="btn-toggle-lock px-2 py-1 rounded ${isLocked ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' : 'bg-amber-50 hover:bg-amber-100 text-amber-700'} text-[10.5px] font-medium transition-colors" data-id="${u.id || u.email}" title="${isLocked ? 'Mở khóa' : 'Khóa tài khoản'}">
                                <i class="fa-solid ${isLocked ? 'fa-unlock' : 'fa-lock'}"></i> ${isLocked ? 'Mở' : 'Khóa'}
                            </button>
                            <button type="button" class="btn-delete-user px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10.5px] font-medium transition-colors" data-id="${u.id || u.email}" title="Xóa tài khoản">
                                <i class="fa-solid fa-trash-can"></i> Xóa
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join("");

        // Gán sự kiện nút Sửa, Khóa, Xóa
        tbody.querySelectorAll(".btn-edit-user").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                openEditUserModal(id);
            });
        });

        tbody.querySelectorAll(".btn-toggle-lock").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const target = authApp.users.find(u => (u.id === id || u.email === id));
                if (target) {
                    target.status = target.status === "LOCKED" ? "ACTIVE" : "LOCKED";
                    authApp.saveUsers([...authApp.users]);
                    renderUserTable();
                }
            });
        });

        tbody.querySelectorAll(".btn-delete-user").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                if (confirm("Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống?")) {
                    const next = authApp.users.filter(u => !(u.id === id || u.email === id));
                    authApp.saveUsers(next);
                    renderUserTable();
                }
            });
        });
    }

    // ---------------------------------------------------------
    // FORM THÊM / SỬA USER (MODAL CON)
    // ---------------------------------------------------------
    const modalEditUser = document.getElementById("modalEditUser");
    const formEditUser = document.getElementById("formEditUser");
    const editModalTitle = document.getElementById("editUserModalTitle");
    const inputEditName = document.getElementById("editUserName");
    const inputEditEmail = document.getElementById("editUserEmail");
    const inputEditPass = document.getElementById("editUserPassword");
    const inputEditDept = document.getElementById("editUserDept");
    const selectEditRole = document.getElementById("editUserRole");
    const selectEditStatus = document.getElementById("editUserStatus");
    const inputEditNotes = document.getElementById("editUserNotes");
    const btnCloseEditUser = document.getElementById("btnCloseEditUserModal");
    const btnCancelEditUser = document.getElementById("btnCancelEditUser");

    function openEditUserModal(userId = null) {
        authApp.editingUserId = userId;
        if (!modalEditUser) return;

        if (userId) {
            const user = authApp.users.find(u => (u.id === userId || u.email === userId));
            if (!user) return;
            if (editModalTitle) editModalTitle.textContent = "Chỉnh Sửa Tài Khoản Người Dùng";
            if (inputEditName) inputEditName.value = user.name || "";
            if (inputEditEmail) {
                inputEditEmail.value = user.email || "";
                inputEditEmail.disabled = true; // Không đổi email khi edit
            }
            if (inputEditPass) inputEditPass.value = user.password || "";
            if (inputEditDept) inputEditDept.value = user.department || "";
            if (selectEditRole) selectEditRole.value = user.role || ROLES.EDITOR;
            if (selectEditStatus) selectEditStatus.value = user.status || "ACTIVE";
            if (inputEditNotes) inputEditNotes.value = user.notes || "";
        } else {
            if (editModalTitle) editModalTitle.textContent = "Thêm Mới Tài Khoản Người Dùng";
            if (inputEditName) inputEditName.value = "";
            if (inputEditEmail) {
                inputEditEmail.value = "";
                inputEditEmail.disabled = false;
            }
            if (inputEditPass) inputEditPass.value = "123456";
            if (inputEditDept) inputEditDept.value = "";
            if (selectEditRole) selectEditRole.value = ROLES.EDITOR;
            if (selectEditStatus) selectEditStatus.value = "ACTIVE";
            if (inputEditNotes) inputEditNotes.value = "";
        }

        modalEditUser.classList.remove("hidden");
    }

    if (btnOpenAddUser) {
        btnOpenAddUser.addEventListener("click", () => openEditUserModal(null));
    }
    if (btnCloseEditUser) {
        btnCloseEditUser.addEventListener("click", () => modalEditUser?.classList.add("hidden"));
    }
    if (btnCancelEditUser) {
        btnCancelEditUser.addEventListener("click", () => modalEditUser?.classList.add("hidden"));
    }

    if (formEditUser) {
        formEditUser.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = inputEditName?.value.trim() || "";
            const email = inputEditEmail?.value.trim().toLowerCase() || "";
            const password = inputEditPass?.value.trim() || "";
            const department = inputEditDept?.value.trim() || "";
            const role = selectEditRole?.value || ROLES.EDITOR;
            const status = selectEditStatus?.value || "ACTIVE";
            const notes = inputEditNotes?.value.trim() || "";

            if (!email) {
                alert("Vui lòng nhập địa chỉ Email.");
                return;
            }
            if (!password) {
                alert("Vui lòng nhập mật khẩu.");
                return;
            }

            if (authApp.editingUserId) {
                // Cập nhật
                const idx = authApp.users.findIndex(u => (u.id === authApp.editingUserId || u.email === authApp.editingUserId));
                if (idx !== -1) {
                    authApp.users[idx] = {
                        ...authApp.users[idx],
                        name,
                        password,
                        department,
                        role,
                        status,
                        notes
                    };
                    // Nếu sửa chính mình
                    if (authApp.currentUser && authApp.currentUser.email === authApp.users[idx].email) {
                        authApp.currentUser = { ...authApp.users[idx] };
                        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(authApp.currentUser));
                        authApp.updateUI();
                    }
                }
            } else {
                // Thêm mới
                if (authApp.users.some(u => u.email.toLowerCase() === email)) {
                    alert("Email này đã tồn tại trong hệ thống!");
                    return;
                }
                const newUser = {
                    id: "USR-" + Date.now().toString().slice(-4),
                    email,
                    password,
                    name: name || email.split("@")[0],
                    department,
                    role,
                    status,
                    createdAt: new Date().toLocaleString("vi-VN"),
                    notes
                };
                authApp.users.push(newUser);
            }

            authApp.saveUsers([...authApp.users]);
            renderUserTable();
            modalEditUser.classList.add("hidden");
            alert("Đã lưu thông tin tài khoản thành công!");
        });
    }
});
