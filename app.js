const STORAGE_KEY = "facturation.invoices.v3";
const LOGO_SRC = "assets/logo-zm-trans.png";
const SIGNATURE_SRC = "assets/signature-zm-trans.jpg";
const TOKEN_KEY = "facturation.authToken.v1";
const API_BASE_URL = String(window.API_BASE_URL || "").replace(/\/$/, "");
const BANK_INFO = {
  bankHolder: "ZM TRANS LOGISTICS SUARL",
  bankName: "BNDE SENEGAL",
  routingNumber: "SN169",
  accountNumber: "SN1690100200100647350103",
  iban: "001006473501",
  bic: "03"
};
const OLD_BANK_INFO = {
  bankHolder: "ZM TRANS",
  bankName: "BNDE SENEGAL",
  routingNumber: "SN169 01002",
  accountNumber: "SN169 01002 001005 201601_14",
  iban: "001005201601",
  bic: "14"
};

const els = {
  accountNumber: document.querySelector("#accountNumberInput"),
  addItemBtn: document.querySelector("#addItemBtn"),
  adminPanel: document.querySelector("#adminPanel"),
  authError: document.querySelector("#authError"),
  authScreen: document.querySelector("#authScreen"),
  balanceText: document.querySelector("#balanceText"),
  bankHolder: document.querySelector("#bankHolderInput"),
  bankName: document.querySelector("#bankNameInput"),
  bic: document.querySelector("#bicInput"),
  clientAddress: document.querySelector("#clientAddressInput"),
  clientEmail: document.querySelector("#clientEmailInput"),
  clientName: document.querySelector("#clientNameInput"),
  clientPhone: document.querySelector("#clientPhoneInput"),
  companyAddress: document.querySelector("#companyAddressInput"),
  companyEmail: document.querySelector("#companyEmailInput"),
  companyName: document.querySelector("#companyNameInput"),
  companyNinea: document.querySelector("#companyNineaInput"),
  companyPhone: document.querySelector("#companyPhoneInput"),
  companyRc: document.querySelector("#companyRcInput"),
  companyTaxId: document.querySelector("#companyTaxIdInput"),
  currency: document.querySelector("#currencyInput"),
  date: document.querySelector("#dateInput"),
  dashboardCount: document.querySelector("#dashboardCount"),
  dashboardTableBody: document.querySelector("#dashboardTableBody"),
  deleteBtn: document.querySelector("#deleteBtn"),
  deliveryDate: document.querySelector("#deliveryDateInput"),
  discountRate: document.querySelector("#discountRateInput"),
  documentType: document.querySelector("#documentTypeInput"),
  dueDate: document.querySelector("#dueDateInput"),
  duplicateBtn: document.querySelector("#duplicateBtn"),
  editingUserId: document.querySelector("#editingUserIdInput"),
  cancelUserEditBtn: document.querySelector("#cancelUserEditBtn"),
  form: document.querySelector("#invoiceForm"),
  iban: document.querySelector("#ibanInput"),
  invoiceList: document.querySelector("#invoiceList"),
  invoicePreview: document.querySelector("#invoicePreview"),
  itemsTable: document.querySelector("#itemsTable"),
  itemTemplate: document.querySelector("#itemRowTemplate"),
  loginEmail: document.querySelector("#loginEmailInput"),
  loginForm: document.querySelector("#loginForm"),
  loginPassword: document.querySelector("#loginPasswordInput"),
  logoutBtn: document.querySelector("#logoutBtn"),
  newInvoiceBtn: document.querySelector("#newInvoiceBtn"),
  newUserEmail: document.querySelector("#newUserEmailInput"),
  newUserName: document.querySelector("#newUserNameInput"),
  newUserPassword: document.querySelector("#newUserPasswordInput"),
  newUserRole: document.querySelector("#newUserRoleInput"),
  notes: document.querySelector("#notesInput"),
  number: document.querySelector("#numberInput"),
  pageTitle: document.querySelector("#pageTitle"),
  paid: document.querySelector("#paidInput"),
  paidMetric: document.querySelector("#paidMetric"),
  paymentMethod: document.querySelector("#paymentMethodInput"),
  paymentTerms: document.querySelector("#paymentTermsInput"),
  pendingMetric: document.querySelector("#pendingMetric"),
  printBtn: document.querySelector("#printBtn"),
  lateMetric: document.querySelector("#lateMetric"),
  revenueMetric: document.querySelector("#revenueMetric"),
  routingNumber: document.querySelector("#routingNumberInput"),
  search: document.querySelector("#searchInput"),
  status: document.querySelector("#statusInput"),
  subject: document.querySelector("#subjectInput"),
  taxRate: document.querySelector("#taxRateInput"),
  totalDueText: document.querySelector("#totalDueText"),
  currentUserText: document.querySelector("#currentUserText"),
  userForm: document.querySelector("#userForm"),
  saveUserBtn: document.querySelector("#saveUserBtn"),
  userHistory: document.querySelector("#userHistory"),
  userHistoryBody: document.querySelector("#userHistoryBody"),
  userHistoryTitle: document.querySelector("#userHistoryTitle"),
  userHistoryTotal: document.querySelector("#userHistoryTotal"),
  usersList: document.querySelector("#usersList"),
  workDetails: document.querySelector("#workDetailsInput")
};

let invoices = loadInvoices();
let selectedId = invoices[0]?.id || null;
let authToken = localStorage.getItem(TOKEN_KEY) || "";
let currentUser = null;
let users = [];
let syncTimer = null;
let isHydrating = false;

function today(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function defaultInvoice(seed = {}) {
  return {
    id: crypto.randomUUID(),
    documentType: "FACTURE",
    number: "197",
    date: today(),
    dueDate: today(14),
    deliveryDate: today(),
    status: "Brouillon",
    currency: "XOF",
    companyName: "ZM TRANS LOGISTICS_ SUARL",
    companyEmail: "contact@zmtrans.sn",
    companyPhone: "33 894 63 31",
    companyAddress: "Bargny RN1, en face gare de TER\n1er ETAGE, 3eme Appt\n20100 Dakar Sénégal",
    companyNinea: "012248218",
    companyRc: "SN.DKR.2025.B.25461",
    companyTaxId: "TVA : TVA\nSN.DKR.2025.B.25461",
    clientName: "Logistiquemhk",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    subject: "LOCATION BENNE SEMI REMORQUE A KEDOUGOU",
    workDetails: "La distance 40km/jr\nLes heures de travail c'est de 8h a 17h30",
    items: [
      {
        description: "Benne semi remorque",
        quantity: 26,
        price: 140000
      }
    ],
    taxRate: 0,
    discountRate: 0,
    paid: 0,
    paymentMethod: "Espèces cheque ou virement",
    paymentTerms: "Dès réception de la facture",
    notes: "",
    ...BANK_INFO,
    ...seed
  };
}

function bankValue(invoice, key) {
  return !invoice[key] || invoice[key] === OLD_BANK_INFO[key] ? BANK_INFO[key] : invoice[key];
}

function normalizeInvoice(invoice) {
  return defaultInvoice({
    ...invoice,
    documentType: invoice.documentType || "FACTURE",
    deliveryDate: invoice.deliveryDate || invoice.date || today(),
    companyPhone: invoice.companyPhone || "33 894 63 31",
    companyNinea: invoice.companyNinea || "012248218",
    companyRc: invoice.companyRc || "SN.DKR.2025.B.25461",
    companyTaxId: invoice.companyTaxId || "TVA : TVA\nSN.DKR.2025.B.25461",
    clientPhone: invoice.clientPhone || "",
    subject: invoice.subject || "",
    workDetails: invoice.workDetails || "",
    paymentMethod: invoice.paymentMethod || "Espèces cheque ou virement",
    paymentTerms: invoice.paymentTerms || "Dès réception de la facture",
    bankHolder: bankValue(invoice, "bankHolder"),
    bankName: bankValue(invoice, "bankName"),
    routingNumber: bankValue(invoice, "routingNumber"),
    accountNumber: bankValue(invoice, "accountNumber"),
    iban: bankValue(invoice, "iban"),
    bic: bankValue(invoice, "bic")
  });
}

function loadInvoices() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(saved) && saved.length
      ? saved.map(normalizeInvoice)
      : [defaultInvoice()];
  } catch {
    return [defaultInvoice()];
  }
}

function saveInvoices() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  scheduleSync();
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Erreur serveur");
  return data;
}

function isPersistedId(id) {
  return /^[a-f\d]{24}$/i.test(String(id || ""));
}

function scheduleSync() {
  if (!authToken || isHydrating) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncInvoices().catch((error) => console.error(error));
  }, 600);
}

async function syncInvoices() {
  if (!authToken) return;
  for (const invoice of [...invoices]) {
    const payload = { ...invoice, totalSnapshot: calculate(invoice).total };
    if (isPersistedId(invoice.id)) {
      await apiFetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
    } else {
      const { invoice: saved } = await apiFetch("/api/invoices", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      invoices = invoices.map((item) => item.id === invoice.id ? normalizeInvoice(saved) : item);
      if (selectedId === invoice.id) selectedId = saved.id;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    }
  }
}

function selectedInvoice() {
  return invoices.find((invoice) => invoice.id === selectedId) || invoices[0];
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function calculate(invoice) {
  const subtotal = invoice.items.reduce((sum, item) => {
    return sum + numberValue(item.quantity) * numberValue(item.price);
  }, 0);
  const discount = subtotal * (numberValue(invoice.discountRate) / 100);
  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * (numberValue(invoice.taxRate) / 100);
  const total = taxable + tax;
  const balance = Math.max(total - numberValue(invoice.paid), 0);

  return { subtotal, discount, taxable, tax, total, balance };
}

function money(amount, currency) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "XOF" ? 0 : 2
  }).format(numberValue(amount));
}

function amountText(amount, currency) {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: currency === "XOF" ? 0 : 2
  }).format(numberValue(amount))} ${currency}`;
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function documentNumberLabel(type) {
  if (type === "DEVIS") return "Devis";
  if (type === "FACTURE PRO FORMA") return "Facture pro forma";
  return "Facture";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function linesHtml(values) {
  return values.filter(Boolean).map(escapeHtml).join("<br>");
}

function pluralizeDays(quantity) {
  const value = numberValue(quantity);
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(value)} ${value > 1 ? "jours" : "jour"}`;
}

function amountInWords(amount) {
  const units = [
    "zero", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
    "onze", "douze", "treize", "quatorze", "quinze", "seize"
  ];
  const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];

  function underHundred(number) {
    if (number < 17) return units[number];
    if (number < 20) return `dix-${units[number - 10]}`;
    if (number < 70) {
      const ten = Math.floor(number / 10);
      const unit = number % 10;
      if (unit === 0) return tens[ten];
      if (unit === 1) return `${tens[ten]} et un`;
      return `${tens[ten]}-${units[unit]}`;
    }
    if (number < 80) return `soixante-${underHundred(number - 60)}`;
    if (number === 80) return "quatre-vingts";
    return `quatre-vingt-${underHundred(number - 80)}`;
  }

  function underThousand(number) {
    if (number < 100) return underHundred(number);
    const hundred = Math.floor(number / 100);
    const rest = number % 100;
    const prefix = hundred === 1 ? "cent" : `${units[hundred]} cent`;
    return rest ? `${prefix} ${underHundred(rest)}` : prefix;
  }

  function words(number) {
    if (number < 1000) return underThousand(number);
    if (number < 1000000) {
      const thousand = Math.floor(number / 1000);
      const rest = number % 1000;
      const prefix = thousand === 1 ? "mille" : `${words(thousand)} mille`;
      return rest ? `${prefix} ${underThousand(rest)}` : prefix;
    }
    const million = Math.floor(number / 1000000);
    const rest = number % 1000000;
    const prefix = `${words(million)} million${million > 1 ? "s" : ""}`;
    return rest ? `${prefix} ${words(rest)}` : prefix;
  }

  const rounded = Math.round(numberValue(amount));
  return words(rounded).replace(/^./, (letter) => letter.toUpperCase());
}

function readForm() {
  const invoice = selectedInvoice();
  if (!invoice) return;

  invoice.accountNumber = els.accountNumber.value.trim();
  invoice.bankHolder = els.bankHolder.value.trim();
  invoice.bankName = els.bankName.value.trim();
  invoice.bic = els.bic.value.trim();
  invoice.clientAddress = els.clientAddress.value.trim();
  invoice.clientEmail = els.clientEmail.value.trim();
  invoice.clientName = els.clientName.value.trim();
  invoice.clientPhone = els.clientPhone.value.trim();
  invoice.companyAddress = els.companyAddress.value.trim();
  invoice.companyEmail = els.companyEmail.value.trim();
  invoice.companyName = els.companyName.value.trim();
  invoice.companyNinea = els.companyNinea.value.trim();
  invoice.companyPhone = els.companyPhone.value.trim();
  invoice.companyRc = els.companyRc.value.trim();
  invoice.companyTaxId = els.companyTaxId.value.trim();
  invoice.currency = els.currency.value;
  invoice.date = els.date.value;
  invoice.deliveryDate = els.deliveryDate.value;
  invoice.discountRate = numberValue(els.discountRate.value);
  invoice.documentType = els.documentType.value;
  invoice.dueDate = els.dueDate.value;
  invoice.iban = els.iban.value.trim();
  invoice.notes = els.notes.value.trim();
  invoice.number = els.number.value.trim();
  invoice.paid = numberValue(els.paid.value);
  invoice.paymentMethod = els.paymentMethod.value.trim();
  invoice.paymentTerms = els.paymentTerms.value.trim();
  invoice.routingNumber = els.routingNumber.value.trim();
  invoice.status = els.status.value;
  invoice.subject = els.subject.value.trim();
  invoice.taxRate = numberValue(els.taxRate.value);
  invoice.workDetails = els.workDetails.value.trim();
  invoice.items = [...els.itemsTable.querySelectorAll(".item-row")].map((row) => ({
    description: row.querySelector('[data-field="description"]').value.trim(),
    quantity: numberValue(row.querySelector('[data-field="quantity"]').value),
    price: numberValue(row.querySelector('[data-field="price"]').value)
  }));

  saveInvoices();
  renderSummary();
  renderPreview();
  renderList();
  renderDashboard();
}

function fillForm(invoice) {
  els.accountNumber.value = invoice.accountNumber;
  els.bankHolder.value = invoice.bankHolder;
  els.bankName.value = invoice.bankName;
  els.bic.value = invoice.bic;
  els.clientAddress.value = invoice.clientAddress;
  els.clientEmail.value = invoice.clientEmail;
  els.clientName.value = invoice.clientName;
  els.clientPhone.value = invoice.clientPhone;
  els.companyAddress.value = invoice.companyAddress;
  els.companyEmail.value = invoice.companyEmail;
  els.companyName.value = invoice.companyName;
  els.companyNinea.value = invoice.companyNinea;
  els.companyPhone.value = invoice.companyPhone;
  els.companyRc.value = invoice.companyRc;
  els.companyTaxId.value = invoice.companyTaxId;
  els.currency.value = invoice.currency;
  els.date.value = invoice.date;
  els.deliveryDate.value = invoice.deliveryDate;
  els.discountRate.value = invoice.discountRate;
  els.documentType.value = invoice.documentType;
  els.dueDate.value = invoice.dueDate;
  els.iban.value = invoice.iban;
  els.notes.value = invoice.notes;
  els.number.value = invoice.number;
  els.paid.value = invoice.paid;
  els.paymentMethod.value = invoice.paymentMethod;
  els.paymentTerms.value = invoice.paymentTerms;
  els.routingNumber.value = invoice.routingNumber;
  els.status.value = invoice.status;
  els.subject.value = invoice.subject;
  els.taxRate.value = invoice.taxRate;
  els.workDetails.value = invoice.workDetails;

  els.itemsTable.innerHTML = "";
  invoice.items.forEach((item) => addItemRow(item));
}

function addItemRow(item = { description: "", quantity: 1, price: 0 }) {
  const row = els.itemTemplate.content.firstElementChild.cloneNode(true);
  row.querySelector('[data-field="description"]').value = item.description;
  row.querySelector('[data-field="quantity"]').value = item.quantity;
  row.querySelector('[data-field="price"]').value = item.price;
  row.querySelector('[data-action="remove"]').addEventListener("click", () => {
    if (els.itemsTable.children.length === 1) return;
    row.remove();
    readForm();
  });
  row.addEventListener("input", readForm);
  els.itemsTable.append(row);
  updateRowTotal(row);
}

function updateAllRowTotals() {
  [...els.itemsTable.querySelectorAll(".item-row")].forEach(updateRowTotal);
}

function updateRowTotal(row) {
  const quantity = numberValue(row.querySelector('[data-field="quantity"]').value);
  const price = numberValue(row.querySelector('[data-field="price"]').value);
  row.querySelector(".line-total").textContent = money(quantity * price, els.currency.value);
}

function renderList() {
  const query = els.search.value.trim().toLowerCase();
  const visibleInvoices = invoices.filter((invoice) => {
    return [invoice.number, invoice.clientName, invoice.status, invoice.documentType]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  els.invoiceList.innerHTML = visibleInvoices.length
    ? ""
    : '<p class="empty-state">Aucune facture trouvee.</p>';

  visibleInvoices.forEach((invoice) => {
    const totals = calculate(invoice);
    const card = document.createElement("button");
    card.className = `invoice-card${invoice.id === selectedId ? " active" : ""}`;
    card.type = "button";
    card.innerHTML = `
      <span class="status ${statusClass(invoice.status)}">${escapeHtml(invoice.documentType)} - ${escapeHtml(invoice.status)}</span>
      <strong>${escapeHtml(invoice.clientName || "Client sans nom")}</strong>
      <span class="invoice-meta">
        <span>${escapeHtml(invoice.number)}</span>
        <span>${money(totals.total, invoice.currency)}</span>
      </span>
    `;
    card.addEventListener("click", () => {
      selectedId = invoice.id;
      render();
    });
    els.invoiceList.append(card);
  });
}

function statusClass(status) {
  if (status === "Payee") return "payee";
  if (status === "Envoyee") return "envoyee";
  if (status === "En retard") return "retard";
  return "";
}

function dashboardStats() {
  return invoices.reduce((stats, invoice) => {
    if (invoice.documentType !== "FACTURE") return stats;
    const totals = calculate(invoice);
    const effectiveBalance = invoice.status === "Payee" ? 0 : totals.balance;
    const effectivePaid = invoice.status === "Payee"
      ? totals.total
      : Math.min(numberValue(invoice.paid), totals.total);
    stats.count += 1;
    stats.revenue += totals.total;
    stats.balance += effectiveBalance;
    stats.paid += effectivePaid;
    if (invoice.status === "En retard") stats.late += effectiveBalance;
    return stats;
  }, { balance: 0, count: 0, late: 0, paid: 0, revenue: 0 });
}

function renderDashboard() {
  const stats = dashboardStats();
  const currency = selectedInvoice()?.currency || "XOF";

  els.dashboardCount.textContent = `${stats.count} facture${stats.count > 1 ? "s" : ""}`;
  els.revenueMetric.textContent = money(stats.revenue, currency);
  els.paidMetric.textContent = money(stats.paid, currency);
  els.pendingMetric.textContent = money(stats.balance, currency);
  els.lateMetric.textContent = money(stats.late, currency);

  els.dashboardTableBody.innerHTML = "";
  invoices.forEach((invoice) => {
    const totals = calculate(invoice);
    const effectiveBalance = invoice.status === "Payee" ? 0 : totals.balance;
    const row = document.createElement("tr");
    row.className = invoice.id === selectedId ? "active" : "";
    row.innerHTML = `
      <td>${escapeHtml(invoice.documentType)} ${escapeHtml(invoice.number)}</td>
      <td>${escapeHtml(invoice.clientName || "Client sans nom")}</td>
      <td><span class="status ${statusClass(invoice.status)}">${escapeHtml(invoice.status)}</span></td>
      <td>${escapeHtml(formatDate(invoice.date))}</td>
      <td>${money(totals.total, invoice.currency)}</td>
      <td>${money(effectiveBalance, invoice.currency)}</td>
    `;
    row.addEventListener("click", () => {
      selectedId = invoice.id;
      render();
      document.querySelector(".topbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.dashboardTableBody.append(row);
  });
}

function renderAuthState() {
  const connected = Boolean(currentUser && authToken);
  const isAdmin = currentUser?.role === "admin";
  els.authScreen.classList.toggle("hidden", connected);
  els.currentUserText.textContent = connected
    ? `${currentUser.name} (${currentUser.role === "admin" ? "Admin" : "Utilisateur"})`
    : "Non connecte";
  els.adminPanel.hidden = !isAdmin;
  if (!isAdmin) {
    users = [];
    els.usersList.innerHTML = "";
    els.userHistory.hidden = true;
    resetUserForm();
  }
}

async function loadRemoteInvoices() {
  isHydrating = true;
  try {
    const { invoices: remoteInvoices } = await apiFetch("/api/invoices");
    if (remoteInvoices.length) {
      invoices = remoteInvoices.map(normalizeInvoice);
    } else {
      await syncInvoices();
    }
    selectedId = invoices[0]?.id || null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    await syncInvoices();
    render();
  } finally {
    isHydrating = false;
  }
}

async function loadUsers() {
  if (!requireAdminAction(false)) return;
  const data = await apiFetch("/api/users");
  users = data.users;
  renderUsers();
}

function requireAdminAction(showMessage = true) {
  const allowed = currentUser?.role === "admin";
  if (!allowed && showMessage) {
    alert("Action reservee a l'administrateur.");
  }
  return allowed;
}

function renderUsers() {
  els.usersList.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("div");
    row.className = "user-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(user.name)}</strong>
        <span>${escapeHtml(user.email)}</span>
      </div>
      <em>${escapeHtml(user.role === "admin" ? "Admin" : "Utilisateur")}</em>
      <span>${user.invoiceCount || 0} facture${(user.invoiceCount || 0) > 1 ? "s" : ""}</span>
      <strong>${money(user.revenue || 0, "XOF")}</strong>
      <div class="user-actions">
        <button type="button" data-action="history">Historique</button>
        <button type="button" data-action="edit">Modifier</button>
        <button type="button" class="danger" data-action="delete">Supprimer</button>
      </div>
    `;
    row.querySelector('[data-action="history"]').addEventListener("click", () => showUserHistory(user));
    row.querySelector('[data-action="edit"]').addEventListener("click", () => startUserEdit(user));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteUser(user));
    els.usersList.append(row);
  });
}

function resetUserForm() {
  els.editingUserId.value = "";
  els.userForm.reset();
  els.newUserPassword.required = true;
  els.saveUserBtn.textContent = "Ajouter";
  els.cancelUserEditBtn.hidden = true;
}

function startUserEdit(user) {
  if (!requireAdminAction()) return;
  els.editingUserId.value = user.id;
  els.newUserName.value = user.name;
  els.newUserEmail.value = user.email;
  els.newUserRole.value = user.role;
  els.newUserPassword.value = "";
  els.newUserPassword.required = false;
  els.saveUserBtn.textContent = "Modifier";
  els.cancelUserEditBtn.hidden = false;
  els.userForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function deleteUser(user) {
  if (!requireAdminAction()) return;
  if (user.id === currentUser?.id) {
    alert("Vous ne pouvez pas supprimer votre propre compte.");
    return;
  }
  if (!confirm(`Supprimer l'utilisateur ${user.name} ? Ses anciennes factures restent dans l'historique admin.`)) return;
  await apiFetch(`/api/users/${user.id}`, { method: "DELETE" });
  await loadUsers();
}

async function showUserHistory(user) {
  if (!requireAdminAction()) return;
  const { invoices: userInvoices } = await apiFetch(`/api/users/${user.id}/invoices`);
  const normalized = userInvoices.map(normalizeInvoice);
  const total = normalized.reduce((sum, invoice) => sum + calculate(invoice).total, 0);
  els.userHistory.hidden = false;
  els.userHistoryTitle.textContent = `Historique de ${user.name}`;
  els.userHistoryTotal.textContent = money(total, "XOF");
  els.userHistoryBody.innerHTML = "";
  normalized.forEach((invoice) => {
    const totals = calculate(invoice);
    const balance = invoice.status === "Payee" ? 0 : totals.balance;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(invoice.documentType)} ${escapeHtml(invoice.number)}</td>
      <td>${escapeHtml(invoice.clientName || "Client sans nom")}</td>
      <td><span class="status ${statusClass(invoice.status)}">${escapeHtml(invoice.status)}</span></td>
      <td>${escapeHtml(formatDate(invoice.date))}</td>
      <td>${money(totals.total, invoice.currency)}</td>
      <td>${money(balance, invoice.currency)}</td>
    `;
    row.addEventListener("click", () => {
      const existing = invoices.find((item) => item.id === invoice.id);
      if (!existing) invoices = [invoice, ...invoices];
      selectedId = invoice.id;
      render();
      document.querySelector(".topbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.userHistoryBody.append(row);
  });
}

async function login(email, password) {
  els.authError.textContent = "";
  const { token, user } = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  authToken = token;
  currentUser = user;
  localStorage.setItem(TOKEN_KEY, token);
  renderAuthState();
  await loadRemoteInvoices();
  await loadUsers();
}

async function restoreSession() {
  if (!authToken) {
    renderAuthState();
    return;
  }
  try {
    const { user } = await apiFetch("/api/me");
    currentUser = user;
    renderAuthState();
    await loadRemoteInvoices();
    await loadUsers();
  } catch {
    authToken = "";
    currentUser = null;
    localStorage.removeItem(TOKEN_KEY);
    renderAuthState();
  }
}

function renderSummary() {
  const invoice = selectedInvoice();
  const totals = calculate(invoice);
  els.pageTitle.textContent = `${invoice.documentType} ${invoice.number} - ${invoice.clientName || "Client"}`;
  els.totalDueText.textContent = money(totals.total, invoice.currency);
  els.balanceText.textContent = money(totals.balance, invoice.currency);
  updateAllRowTotals();
}

function renderPreview() {
  const invoice = selectedInvoice();
  const totals = calculate(invoice);
  const lineTaxRate = numberValue(invoice.taxRate) / 100;
  const companyAddress = linesHtml(invoice.companyAddress.split("\n"));
  const companyLegal = linesHtml([
    `NINEA: ${invoice.companyNinea} RC:`,
    invoice.companyRc,
    invoice.companyTaxId
  ]);
  const companyContact = linesHtml([invoice.companyPhone, invoice.companyEmail]);
  const clientDetails = linesHtml([
    invoice.clientName,
    invoice.clientPhone,
    invoice.clientEmail,
    invoice.clientAddress
  ]);
  const lines = invoice.items
    .filter((item) => item.description || item.quantity || item.price)
    .map((item) => {
      const lineSubtotal = numberValue(item.quantity) * numberValue(item.price);
      const lineTax = lineSubtotal * lineTaxRate;
      return `
        <div class="zm-table-row">
          <strong>${escapeHtml(item.description || "Ligne sans description")}</strong>
          <strong>${escapeHtml(pluralizeDays(item.quantity))}</strong>
          <strong class="num">${amountText(item.price, invoice.currency)}</strong>
          <strong class="num">${amountText(lineTax, invoice.currency)}</strong>
          <strong class="num">${amountText(lineSubtotal + lineTax, invoice.currency)}</strong>
        </div>
      `;
    })
    .join("");

  els.invoicePreview.innerHTML = `
    <div class="zm-document">
      <header class="zm-header">
        <img class="zm-logo" src="${LOGO_SRC}" alt="ZM Trans Logistics">
        <div class="zm-company">
          <h3>${escapeHtml(invoice.documentType)}</h3>
          <strong>${escapeHtml(invoice.companyName)}</strong>
          <p>${companyAddress}</p>
          <p>${companyLegal}</p>
          <p>${companyContact}</p>
        </div>
      </header>

      <section class="zm-meta">
        <div class="zm-billed">
          <strong>FACTURÉ À</strong>
          <p>${clientDetails}</p>
        </div>
        <dl>
          <dt>${escapeHtml(documentNumberLabel(invoice.documentType))} N°:</dt>
          <dd>${escapeHtml(invoice.number)}</dd>
          <dt>Date:</dt>
          <dd>${escapeHtml(formatDate(invoice.date))}</dd>
          <dt>Échéance:</dt>
          <dd>${escapeHtml(formatDate(invoice.dueDate))}</dd>
          <dt>Date de livraison:</dt>
          <dd>${escapeHtml(formatDate(invoice.deliveryDate))}</dd>
          <dt>Mode de paiement:</dt>
          <dd>${escapeHtml(invoice.paymentMethod)}</dd>
        </dl>
      </section>

      <section class="zm-subject">
        ${invoice.subject ? `<p><strong>Objet :</strong> <em>${escapeHtml(invoice.subject)}</em></p>` : ""}
        ${invoice.workDetails ? `<p>${escapeHtml(invoice.workDetails)}</p>` : ""}
      </section>

      <section class="zm-table">
        <div class="zm-table-head">
          <span>DESCRIPTION</span>
          <span>NOMBRE DE JOUR</span>
          <span>PRIX (${escapeHtml(invoice.currency)})</span>
          <span>TVA (${escapeHtml(invoice.currency)})</span>
          <span>MONTANT (${escapeHtml(invoice.currency)})</span>
        </div>
        ${lines || '<p class="empty-state">Ajoutez une prestation.</p>'}
      </section>

      <section class="zm-total-area">
        <div class="zm-words">
          <p><em>Arrêté à la somme ${escapeHtml(amountInWords(totals.total))}.</em></p>
          <p><em>Condition de paiement : ${escapeHtml(invoice.paymentTerms)}</em></p>
          ${invoice.notes ? `<p>${escapeHtml(invoice.notes)}</p>` : ""}
        </div>
        <div class="zm-totals">
          <div><span>TOTAL H.T.:</span><strong>${amountText(totals.subtotal, invoice.currency)}</strong></div>
          ${totals.discount ? `<div><span>REMISE:</span><strong>${amountText(totals.discount, invoice.currency)}</strong></div>` : ""}
          ${totals.tax ? `<div><span>TVA:</span><strong>${amountText(totals.tax, invoice.currency)}</strong></div>` : ""}
          <h4>MONTANT TOTAL (${escapeHtml(invoice.currency)})</h4>
          <div class="payable"><span>TOTAL À PAYER(${escapeHtml(invoice.currency)})</span><strong>${amountText(totals.balance, invoice.currency)}</strong></div>
        </div>
      </section>

      <section class="zm-signature">
        <strong>SIGNATURE:</strong>
        <img class="signature-image" src="${SIGNATURE_SRC}" alt="Signature ZM Trans Logistics">
      </section>

      <footer class="zm-payment">
        <h4>INFORMATIONS DE PAIEMENT:</h4>
        <p>
          <strong>Titulaire de compte:</strong> ${escapeHtml(invoice.bankHolder)}
          <strong>Banque:</strong> ${escapeHtml(invoice.bankName)}
          <strong>Routing Number:</strong> ${escapeHtml(invoice.routingNumber)}
          <strong>N° de compte:</strong> ${escapeHtml(invoice.accountNumber)}
          <strong>IBAN:</strong> ${escapeHtml(invoice.iban)}
          <strong>BIC:</strong> ${escapeHtml(invoice.bic)}
        </p>
      </footer>
    </div>
  `;
}

function render() {
  const invoice = selectedInvoice();
  selectedId = invoice.id;
  fillForm(invoice);
  renderList();
  renderDashboard();
  renderSummary();
  renderPreview();
}

els.form.addEventListener("input", readForm);
els.form.addEventListener("change", readForm);
els.search.addEventListener("input", renderList);

els.addItemBtn.addEventListener("click", () => {
  addItemRow();
  readForm();
});

els.newInvoiceBtn.addEventListener("click", () => {
  const invoice = defaultInvoice({
    number: String(invoices.length + 1).padStart(3, "0"),
    date: today(),
    dueDate: today(14),
    deliveryDate: today()
  });
  invoices = [invoice, ...invoices];
  selectedId = invoice.id;
  saveInvoices();
  render();
});

els.duplicateBtn.addEventListener("click", () => {
  const source = selectedInvoice();
  const copy = defaultInvoice({
    ...structuredClone(source),
    id: crypto.randomUUID(),
    number: `${source.number}-COPIE`,
    status: "Brouillon",
    date: today(),
    dueDate: today(14),
    deliveryDate: today()
  });
  invoices = [copy, ...invoices];
  selectedId = copy.id;
  saveInvoices();
  render();
});

els.deleteBtn.addEventListener("click", async () => {
  const currentId = selectedId;
  if (invoices.length === 1) {
    invoices = [defaultInvoice()];
  } else {
    invoices = invoices.filter((invoice) => invoice.id !== selectedId);
  }
  selectedId = invoices[0].id;
  saveInvoices();
  if (authToken && isPersistedId(currentId)) {
    await apiFetch(`/api/invoices/${currentId}`, { method: "DELETE" });
  }
  render();
});

els.printBtn.addEventListener("click", () => window.print());

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await login(els.loginEmail.value.trim(), els.loginPassword.value);
    els.loginPassword.value = "";
  } catch (error) {
    els.authError.textContent = error.message;
  }
});

els.logoutBtn.addEventListener("click", () => {
  authToken = "";
  currentUser = null;
  localStorage.removeItem(TOKEN_KEY);
  renderAuthState();
});

els.userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireAdminAction()) return;
  try {
    const payload = {
      name: els.newUserName.value,
      email: els.newUserEmail.value,
      role: els.newUserRole.value
    };
    if (els.newUserPassword.value) payload.password = els.newUserPassword.value;
    if (els.editingUserId.value) {
      await apiFetch(`/api/users/${els.editingUserId.value}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
    } else {
      if (!payload.password) throw new Error("Mot de passe obligatoire");
      await apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload)
      });
    }
    resetUserForm();
    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
});

els.cancelUserEditBtn.addEventListener("click", resetUserForm);

resetUserForm();
render();
restoreSession();
