const STORAGE_KEY = "facturation.invoices.v3";
const CLIENTS_STORAGE_KEY = "facturation.clients.v1";
const DELETED_CLIENTS_STORAGE_KEY = "facturation.deletedClients.v1";
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
  backToListBtn: document.querySelector("#backToListBtn"),
  bic: document.querySelector("#bicInput"),
  chartPeakText: document.querySelector("#chartPeakText"),
  cancelClientFormBtn: document.querySelector("#cancelClientFormBtn"),
  clientAddress: document.querySelector("#clientAddressInput"),
  clientEmail: document.querySelector("#clientEmailInput"),
  clientForm: document.querySelector("#clientForm"),
  clientName: document.querySelector("#clientNameInput"),
  clientPhone: document.querySelector("#clientPhoneInput"),
  invoiceClientSelect: document.querySelector("#invoiceClientSelect"),
  clientSearch: document.querySelector("#clientSearchInput"),
  clientsList: document.querySelector("#clientsList"),
  clientsListTotal: document.querySelector("#clientsListTotal"),
  clientsNavLink: document.querySelector("#clientsNavLink"),
  clientsPage: document.querySelector("#clientsPage"),
  companyAddress: document.querySelector("#companyAddressInput"),
  companyEmail: document.querySelector("#companyEmailInput"),
  companyName: document.querySelector("#companyNameInput"),
  companyNinea: document.querySelector("#companyNineaInput"),
  companyPhone: document.querySelector("#companyPhoneInput"),
  companyRc: document.querySelector("#companyRcInput"),
  companyTaxId: document.querySelector("#companyTaxIdInput"),
  creationCrumb: document.querySelector("#creationCrumb"),
  currency: document.querySelector("#currencyInput"),
  date: document.querySelector("#dateInput"),
  dashboardCount: document.querySelector("#dashboardCount"),
  dashboardTableBody: document.querySelector("#dashboardTableBody"),
  deleteBtn: document.querySelector("#deleteBtn"),
  deliveryDate: document.querySelector("#deliveryDateInput"),
  discountRate: document.querySelector("#discountRateInput"),
  documentType: document.querySelector("#documentTypeInput"),
  documentTypeFilter: document.querySelector("#documentTypeFilterInput"),
  documentTypeLinks: document.querySelectorAll("[data-document-filter]"),
  dueDate: document.querySelector("#dueDateInput"),
  editingClientId: document.querySelector("#editingClientIdInput"),
  duplicateBtn: document.querySelector("#duplicateBtn"),
  editingUserId: document.querySelector("#editingUserIdInput"),
  cancelUserEditBtn: document.querySelector("#cancelUserEditBtn"),
  form: document.querySelector("#invoiceForm"),
  iban: document.querySelector("#ibanInput"),
  invoiceList: document.querySelector("#invoiceList"),
  invoiceListTotal: document.querySelector("#invoiceListTotal"),
  invoiceModal: document.querySelector("#invoiceModal"),
  invoiceModalBackdrop: document.querySelector("#invoiceModalBackdrop"),
  invoiceModalPreview: document.querySelector("#invoiceModalPreview"),
  invoiceModalTitle: document.querySelector("#invoiceModalTitle"),
  invoicePreview: document.querySelector("#invoicePreview"),
  invoicesNavLink: document.querySelector("#invoicesNavLink"),
  itemsTable: document.querySelector("#itemsTable"),
  itemTemplate: document.querySelector("#itemRowTemplate"),
  loginEmail: document.querySelector("#loginEmailInput"),
  loginForm: document.querySelector("#loginForm"),
  loginPassword: document.querySelector("#loginPasswordInput"),
  logoutBtn: document.querySelector("#logoutBtn"),
  modalCloseBtn: document.querySelector("#modalCloseBtn"),
  modalDeleteBtn: document.querySelector("#modalDeleteBtn"),
  modalEditBtn: document.querySelector("#modalEditBtn"),
  modalPrintBtn: document.querySelector("#modalPrintBtn"),
  modalSaveBtn: document.querySelector("#modalSaveBtn"),
  newInvoiceBtn: document.querySelector("#newInvoiceBtn"),
  newClientApartment: document.querySelector("#newClientApartmentInput"),
  newClientBusinessId: document.querySelector("#newClientBusinessIdInput"),
  newClientCity: document.querySelector("#newClientCityInput"),
  newClientContact: document.querySelector("#newClientContactInput"),
  newClientCountry: document.querySelector("#newClientCountryInput"),
  newClientEmail: document.querySelector("#newClientEmailInput"),
  newClientFax: document.querySelector("#newClientFaxInput"),
  newClientLegalId: document.querySelector("#newClientLegalIdInput"),
  newClientMobile: document.querySelector("#newClientMobileInput"),
  newClientName: document.querySelector("#newClientNameInput"),
  newClientNote: document.querySelector("#newClientNoteInput"),
  newClientPhone: document.querySelector("#newClientPhoneInput"),
  newClientPostalCode: document.querySelector("#newClientPostalCodeInput"),
  newClientState: document.querySelector("#newClientStateInput"),
  newClientStreet: document.querySelector("#newClientStreetInput"),
  newClientWebsite: document.querySelector("#newClientWebsiteInput"),
  newUserEmail: document.querySelector("#newUserEmailInput"),
  newUserName: document.querySelector("#newUserNameInput"),
  newUserPassword: document.querySelector("#newUserPasswordInput"),
  newUserRole: document.querySelector("#newUserRoleInput"),
  notes: document.querySelector("#notesInput"),
  number: document.querySelector("#numberInput"),
  pageTitle: document.querySelector("#pageTitle"),
  paid: document.querySelector("#paidInput"),
  paidMetric: document.querySelector("#paidMetric"),
  periodFilter: document.querySelector("#periodFilterInput"),
  paymentMethod: document.querySelector("#paymentMethodInput"),
  paymentTerms: document.querySelector("#paymentTermsInput"),
  pendingMetric: document.querySelector("#pendingMetric"),
  printBtn: document.querySelector("#printBtn"),
  lateMetric: document.querySelector("#lateMetric"),
  revenueMetric: document.querySelector("#revenueMetric"),
  revenueChart: document.querySelector("#revenueChart"),
  routingNumber: document.querySelector("#routingNumberInput"),
  saveInvoiceBtn: document.querySelector("#saveInvoiceBtn"),
  saveClientBtn: document.querySelector("#saveClientBtn"),
  search: document.querySelector("#searchInput"),
  showClientFormBtn: document.querySelector("#showClientFormBtn"),
  sortBy: document.querySelector("#sortByInput"),
  sortDirection: document.querySelector("#sortDirectionInput"),
  status: document.querySelector("#statusInput"),
  statusFilterButtons: document.querySelectorAll("[data-status-filter]"),
  subject: document.querySelector("#subjectInput"),
  taxRate: document.querySelector("#taxRateInput"),
  totalDueText: document.querySelector("#totalDueText"),
  currentUserText: document.querySelector("#currentUserText"),
  overviewNavLink: document.querySelector("#overviewNavLink"),
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
let deletedClientKeys = loadDeletedClientKeys();
let clients = loadClients();
let selectedId = invoices[0]?.id || null;
let authToken = localStorage.getItem(TOKEN_KEY) || "";
let currentUser = null;
let users = [];
let syncTimer = null;
let isHydrating = false;
let isCreatingInvoice = false;
let currentView = "invoices";
let invoiceStatusFilter = "all";
let welcomeTimer = null;

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
    clientId: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientBusinessId: "",
    clientLegalId: "",
    clientTaxId: "",
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
    clientId: invoice.clientId || "",
    clientBusinessId: invoice.clientBusinessId || "",
    clientLegalId: invoice.clientLegalId || "",
    clientTaxId: invoice.clientTaxId || "",
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

function uniqueInvoiceNumbers(source) {
  const used = new Set();
  let highest = source.reduce((max, invoice) => Math.max(max, invoiceNumberValue(invoice)), 0);

  return source.map((invoice) => {
    const number = String(invoice.number || "").trim();
    if (number && !used.has(number)) {
      used.add(number);
      return invoice;
    }

    highest += 1;
    const next = String(highest).padStart(3, "0");
    used.add(next);
    return { ...invoice, number: next };
  });
}

function loadInvoices() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(saved) && saved.length
      ? uniqueInvoiceNumbers(saved.map(normalizeInvoice))
      : [defaultInvoice()];
  } catch {
    return [defaultInvoice()];
  }
}

function loadDeletedClientKeys() {
  try {
    const saved = JSON.parse(localStorage.getItem(DELETED_CLIENTS_STORAGE_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveDeletedClientKeys() {
  localStorage.setItem(DELETED_CLIENTS_STORAGE_KEY, JSON.stringify([...deletedClientKeys]));
}

function clientKey(client) {
  return String(client.name || "").trim().toLowerCase();
}

function defaultClient(seed = {}) {
  return {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    contact: "",
    phone: "",
    mobile: "",
    fax: "",
    website: "",
    address: "",
    country: "Senegal",
    street: "",
    apartment: "",
    postalCode: "",
    city: "",
    state: "",
    businessId: "",
    legalId: "",
    taxId: "",
    note: "",
    createdAt: new Date().toISOString(),
    ...seed
  };
}

function composeClientAddress(client) {
  return [
    client.street,
    client.apartment,
    [client.postalCode, client.city].filter(Boolean).join(" "),
    client.state,
    client.country
  ].filter(Boolean).join("\n");
}

function normalizeClient(client) {
  const address = String(client.address || "").trim();
  const normalized = defaultClient({
    ...client,
    name: String(client.name || "").trim(),
    email: String(client.email || "").trim(),
    contact: String(client.contact || "").trim(),
    phone: String(client.phone || "").trim(),
    mobile: String(client.mobile || "").trim(),
    fax: String(client.fax || "").trim(),
    website: String(client.website || "").trim(),
    country: String(client.country || "Senegal").trim(),
    street: String(client.street || "").trim(),
    apartment: String(client.apartment || "").trim(),
    postalCode: String(client.postalCode || "").trim(),
    city: String(client.city || "").trim(),
    state: String(client.state || "").trim(),
    businessId: String(client.businessId || "").trim(),
    legalId: String(client.legalId || "").trim(),
    taxId: String(client.taxId || "").trim(),
    note: String(client.note || "").trim(),
    address,
    createdAt: client.createdAt || new Date().toISOString()
  });
  return {
    ...normalized,
    address: normalized.address || composeClientAddress(normalized)
  };
}

function clientsFromInvoices() {
  const byName = new Map();
  invoices.forEach((invoice) => {
    const name = String(invoice.clientName || "").trim();
    if (!name) return;
    const key = name.toLowerCase();
    if (byName.has(key)) return;
    byName.set(key, normalizeClient({
      name,
      email: invoice.clientEmail,
      phone: invoice.clientPhone,
      address: invoice.clientAddress,
      createdAt: invoice.createdAt || new Date().toISOString()
    }));
  });
  return [...byName.values()];
}

function mergeClients(source) {
  const merged = new Map();
  [...source.map(normalizeClient), ...clientsFromInvoices()].forEach((client) => {
    const key = clientKey(client);
    if (!key) return;
    if (deletedClientKeys?.has(key)) return;
    const existing = merged.get(key);
    merged.set(key, existing
      ? {
          ...existing,
          email: existing.email || client.email,
          contact: existing.contact || client.contact,
          phone: existing.phone || client.phone,
          mobile: existing.mobile || client.mobile,
          fax: existing.fax || client.fax,
          website: existing.website || client.website,
          address: existing.address || client.address,
          country: existing.country || client.country,
          street: existing.street || client.street,
          apartment: existing.apartment || client.apartment,
          postalCode: existing.postalCode || client.postalCode,
          city: existing.city || client.city,
          state: existing.state || client.state,
          businessId: existing.businessId || client.businessId,
          legalId: existing.legalId || client.legalId,
          taxId: existing.taxId || client.taxId,
          note: existing.note || client.note
        }
      : client);
  });
  return [...merged.values()].sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

function loadClients() {
  try {
    const saved = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || "null");
    return mergeClients(Array.isArray(saved) ? saved : []);
  } catch {
    return mergeClients([]);
  }
}

function saveClients() {
  clients = mergeClients(clients);
  localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
}

function saveInvoices() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  saveClients();
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
  if (!response.ok) {
    const error = new Error(data.error || "Erreur serveur");
    error.status = response.status;
    error.path = path;
    throw error;
  }
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

function fieldValue(field) {
  return field?.value || "";
}

function setFieldValue(field, value) {
  if (field) field.value = value || "";
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
  invoice.clientId = els.invoiceClientSelect.value;
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
  renderClients();
}

function fillForm(invoice) {
  els.accountNumber.value = invoice.accountNumber;
  els.bankHolder.value = invoice.bankHolder;
  els.bankName.value = invoice.bankName;
  els.bic.value = invoice.bic;
  els.clientAddress.value = invoice.clientAddress;
  els.clientEmail.value = invoice.clientEmail;
  els.invoiceClientSelect.value = invoice.clientId || "";
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

function invoiceNumberValue(invoice) {
  const number = String(invoice.number || "").match(/\d+/g)?.join("") || "0";
  return Number(number);
}

function documentListTitle(type) {
  if (type === "DEVIS") return "Devis";
  if (type === "FACTURE PRO FORMA") return "Factures pro forma";
  return "Factures";
}

function documentActionLabel(type) {
  if (type === "DEVIS") return "Nouveau devis";
  if (type === "FACTURE PRO FORMA") return "Nouvelle pro forma";
  return "Nouvelle facture";
}

function nextInvoiceNumber() {
  const highestNumber = invoices.reduce((max, invoice) => {
    return Math.max(max, invoiceNumberValue(invoice));
  }, 0);
  return String(highestNumber + 1).padStart(3, "0");
}

function sortedInvoices(source = invoices) {
  const sortBy = els.sortBy?.value || "number";
  const direction = els.sortDirection?.value === "asc" ? 1 : -1;
  const statusRank = {
    "En retard": 4,
    Envoyee: 3,
    Brouillon: 2,
    Payee: 1
  };

  return [...source].sort((a, b) => {
    let result = 0;
    if (sortBy === "number") {
      result = invoiceNumberValue(a) - invoiceNumberValue(b);
    } else if (sortBy === "date") {
      result = new Date(a.date || 0) - new Date(b.date || 0);
    } else if (sortBy === "status") {
      result = (statusRank[a.status] || 0) - (statusRank[b.status] || 0);
    } else if (sortBy === "client") {
      result = String(a.clientName || "").localeCompare(String(b.clientName || ""), "fr");
    } else if (sortBy === "amount") {
      result = calculate(a).total - calculate(b).total;
    }

    if (result === 0) {
      result = invoiceNumberValue(a) - invoiceNumberValue(b);
    }
    return result * direction;
  });
}

function invoiceMatchesFilters(invoice) {
  const typeFilter = els.documentTypeFilter?.value || "all";
  const periodFilter = els.periodFilter?.value || "current-year";
  const invoiceYear = new Date(invoice.date || "").getFullYear();
  const currentYear = new Date().getFullYear();

  if (typeFilter !== "all" && invoice.documentType !== typeFilter) return false;
  if (periodFilter === "current-year" && invoiceYear !== currentYear) return false;
  if (invoiceStatusFilter === "paid" && invoice.status !== "Payee") return false;
  if (invoiceStatusFilter === "unpaid" && invoice.status === "Payee") return false;
  if (invoiceStatusFilter === "due" && invoice.status !== "En retard") return false;
  return true;
}

function showView(view) {
  currentView = view;
  isCreatingInvoice = false;
  closeInvoiceModal();
  render();
  if (view === "overview") {
    triggerWelcomeAnimation();
  }
  const target = view === "overview" ? ".dashboard" : view === "clients" ? ".clients-page" : ".document-browser";
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showDocumentList(type = "FACTURE") {
  currentView = "invoices";
  isCreatingInvoice = false;
  invoiceStatusFilter = "all";
  if (els.documentTypeFilter) els.documentTypeFilter.value = type;
  els.statusFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.statusFilter === "all");
  });
  render();
  document.querySelector(".document-browser")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openInvoiceModal() {
  const invoice = selectedInvoice();
  renderSummary();
  renderPreview();
  els.invoiceModalTitle.textContent = `${invoice.documentType} ${invoice.number}`;
  els.invoiceModalPreview.innerHTML = els.invoicePreview.innerHTML;
  els.invoiceModal.hidden = false;
  document.body.classList.add("invoice-modal-open");
}

function closeInvoiceModal() {
  if (!els.invoiceModal) return;
  els.invoiceModal.hidden = true;
  document.body.classList.remove("invoice-modal-open", "modal-printing");
}

async function saveSelectedInvoice() {
  readForm();
  if (authToken) {
    clearTimeout(syncTimer);
    await syncInvoices().catch((error) => console.error(error));
  }
}

function editSelectedInvoice() {
  closeInvoiceModal();
  currentView = "invoices";
  isCreatingInvoice = true;
  render();
  document.querySelector(".page-head")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function deleteSelectedInvoice() {
  const invoice = selectedInvoice();
  if (!invoice) return;
  if (!confirm(`Supprimer ${invoice.documentType.toLowerCase()} numero ${invoice.number} ?`)) return;

  const currentId = selectedId;
  if (invoices.length === 1) {
    invoices = [defaultInvoice({ number: nextInvoiceNumber() })];
  } else {
    invoices = invoices.filter((item) => item.id !== selectedId);
  }
  selectedId = invoices[0].id;
  closeInvoiceModal();
  saveInvoices();
  if (authToken && isPersistedId(currentId)) {
    await apiFetch(`/api/invoices/${currentId}`, { method: "DELETE" });
  }
  isCreatingInvoice = false;
  currentView = "invoices";
  render();
}

function safeFileName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();
}

function currentStylesText() {
  return [...document.styleSheets].map((sheet) => {
    try {
      return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
    } catch {
      return "";
    }
  }).join("\n");
}

function downloadInvoiceFile() {
  const invoice = selectedInvoice();
  renderSummary();
  renderPreview();

  const documentName = `${safeFileName(invoice.documentType)}-${safeFileName(invoice.number)}`;
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(invoice.documentType)} ${escapeHtml(invoice.number)}</title>
    <style>
      ${currentStylesText()}
      body { margin: 0; background: #fff; }
      .saved-invoice-page { display: grid; min-height: 100vh; place-items: start center; padding: 24px; background: #fff; }
      .zm-document { box-shadow: none; }
    </style>
  </head>
  <body>
    <main class="saved-invoice-page">
      ${els.invoicePreview.innerHTML}
    </main>
  </body>
</html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${documentName}.html`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderList() {
  const query = els.search.value.trim().toLowerCase();
  const visibleInvoices = sortedInvoices(invoices.filter((invoice) => {
    if (!invoiceMatchesFilters(invoice)) return false;
    return [invoice.number, invoice.clientName, invoice.status, invoice.documentType]
      .join(" ")
      .toLowerCase()
      .includes(query);
  }));

  els.invoiceList.innerHTML = visibleInvoices.length
    ? ""
    : '<p class="empty-state invoice-table-empty">Pas de donnees</p>';
  els.invoiceListTotal.textContent = `${visibleInvoices.length} ${visibleInvoices.length > 1 ? "FACTURES" : "FACTURE"}`;

  visibleInvoices.forEach((invoice) => {
    const totals = calculate(invoice);
    const card = document.createElement("button");
    card.className = `invoice-card${invoice.id === selectedId ? " active" : ""}`;
    card.type = "button";
    card.innerHTML = `
      <span class="invoice-number-pill">
        <strong>${escapeHtml(invoice.number)}</strong>
      </span>
      <strong>${escapeHtml(invoice.clientName || "Client sans nom")}</strong>
      <span class="invoice-date-stack">
        <span>${escapeHtml(formatDate(invoice.date))}</span>
        <span>${escapeHtml(formatDate(invoice.dueDate))}</span>
      </span>
      <span class="status ${statusClass(invoice.status)}">${escapeHtml(invoice.status)}</span>
      <span class="invoice-amount">${money(totals.total, invoice.currency)}</span>
      <span class="invoice-meta">
        <span>${escapeHtml(invoice.paymentMethod || "Non defini")}</span>
      </span>
    `;
    card.addEventListener("click", () => {
      selectedId = invoice.id;
      isCreatingInvoice = false;
      render();
      openInvoiceModal();
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

function monthlyRevenueData() {
  const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: monthFormatter.format(date).replace(".", ""),
      total: 0
    };
  });
  const byKey = new Map(months.map((month) => [month.key, month]));

  invoices.forEach((invoice) => {
    if (invoice.documentType !== "FACTURE") return;
    const date = new Date(invoice.date || "");
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const month = byKey.get(key);
    if (month) month.total += calculate(invoice).total;
  });

  return months;
}

function renderRevenueChart(currency) {
  const months = monthlyRevenueData();
  const peak = Math.max(...months.map((month) => month.total), 0);
  els.chartPeakText.textContent = `${money(peak, currency)} max`;
  els.revenueChart.innerHTML = months.map((month) => {
    const height = peak ? Math.max(10, Math.round((month.total / peak) * 100)) : 0;
    return `
      <div class="chart-bar-item" title="${escapeHtml(month.label)}: ${money(month.total, currency)}">
        <div class="chart-bar-track">
          <span class="chart-bar" style="height: ${height}%"></span>
        </div>
        <strong>${escapeHtml(month.label)}</strong>
        <span>${money(month.total, currency)}</span>
      </div>
    `;
  }).join("");
}

function renderDashboard() {
  const stats = dashboardStats();
  const currency = selectedInvoice()?.currency || "XOF";

  els.dashboardCount.textContent = `${stats.count} facture${stats.count > 1 ? "s" : ""}`;
  els.revenueMetric.textContent = money(stats.revenue, currency);
  els.paidMetric.textContent = money(stats.paid, currency);
  els.pendingMetric.textContent = money(stats.balance, currency);
  els.lateMetric.textContent = money(stats.late, currency);
  renderRevenueChart(currency);

  els.dashboardTableBody.innerHTML = "";
  sortedInvoices().forEach((invoice) => {
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
      openInvoiceModal();
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
  renderClients();
}

function triggerWelcomeAnimation() {
  clearTimeout(welcomeTimer);
  document.body.classList.remove("welcome-active");
  void document.body.offsetWidth;
  document.body.classList.add("welcome-active");
  welcomeTimer = setTimeout(() => {
    document.body.classList.remove("welcome-active");
  }, 20000);
}

async function loadRemoteInvoices() {
  isHydrating = true;
  try {
    const { invoices: remoteInvoices } = await apiFetch("/api/invoices");
    if (remoteInvoices.length) {
      invoices = uniqueInvoiceNumbers(remoteInvoices.map(normalizeInvoice));
    } else {
      await syncInvoices();
    }
    selectedId = invoices[0]?.id || null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    await syncInvoices();
    clients = mergeClients(clients);
    saveClients();
    render();
  } finally {
    isHydrating = false;
  }
}

async function loadRemoteClients() {
  if (!authToken) {
    clients = loadClients();
    renderClients();
    return;
  }
  try {
    const data = await apiFetch("/api/clients");
    clients = mergeClients(data.clients || []);
    saveClients();
    renderClients();
  } catch (error) {
    console.error(error);
    clients = loadClients();
    renderClients();
  }
}

async function loadUsers() {
  if (!requireAdminAction(false)) return;
  const data = await apiFetch("/api/users");
  users = data.users;
  renderUsers();
}

function clientDocumentCount(name) {
  const key = String(name || "").trim().toLowerCase();
  return invoices.filter((invoice) => String(invoice.clientName || "").trim().toLowerCase() === key).length;
}

function renderClients() {
  clients = mergeClients(clients);
  renderClientOptions();
  const query = String(els.clientSearch?.value || "").trim().toLowerCase();
  const visibleClients = clients.filter((client) => {
    return [
      client.name,
      client.email,
      client.contact,
      client.phone,
      client.mobile,
      client.address,
      client.businessId,
      client.legalId,
      client.taxId
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  els.clientsList.innerHTML = visibleClients.length
    ? ""
    : '<p class="empty-state invoice-table-empty">Pas de clients.</p>';
  els.clientsListTotal.textContent = `${visibleClients.length} CLIENT${visibleClients.length > 1 ? "S" : ""}`;

  visibleClients.forEach((client) => {
    const row = document.createElement("div");
    row.className = "client-row";
    const documentCount = clientDocumentCount(client.name);
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(client.name || "Client sans nom")}</strong>
        <span>${escapeHtml(client.contact || client.email || "Contact non renseigne")}</span>
      </div>
      <div>
        <strong>${escapeHtml(client.phone || client.mobile || "Telephone non renseigne")}</strong>
        <span>${escapeHtml(client.email || "Email non renseigne")}</span>
      </div>
      <p>${escapeHtml(client.address || "Adresse non renseignee")}</p>
      <strong>${documentCount} document${documentCount > 1 ? "s" : ""}</strong>
      <div class="client-row-actions">
        <button type="button" data-action="edit">Modifier</button>
        <button class="danger" type="button" data-action="delete">Supprimer</button>
      </div>
    `;
    row.querySelector('[data-action="edit"]').addEventListener("click", () => startClientEdit(client));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteClient(client));
    els.clientsList.append(row);
  });
}

function renderClientOptions() {
  if (!els.invoiceClientSelect) return;
  const currentValue = els.invoiceClientSelect.value;
  els.invoiceClientSelect.innerHTML = `
    <option value="">Selectionner un client</option>
    ${clients.map((client) => `
      <option value="${escapeHtml(client.id)}">${escapeHtml(client.name || "Client sans nom")}</option>
    `).join("")}
  `;
  els.invoiceClientSelect.value = clients.some((client) => client.id === currentValue) ? currentValue : "";
}

function applyClientToInvoice(client) {
  const invoice = selectedInvoice();
  if (!invoice || !client) return;

  invoice.clientId = client.id;
  invoice.clientName = client.name || "";
  invoice.clientEmail = client.email || "";
  invoice.clientPhone = client.phone || client.mobile || "";
  invoice.clientAddress = client.address || composeClientAddress(client);
  invoice.clientBusinessId = client.businessId || "";
  invoice.clientLegalId = client.legalId || "";
  invoice.clientTaxId = client.taxId || "";

  saveInvoices();
  fillForm(invoice);
  renderSummary();
  renderPreview();
  renderList();
  renderDashboard();
}

function resetClientForm() {
  setFieldValue(els.editingClientId, "");
  els.clientForm.reset();
  els.clientForm.hidden = true;
  setFieldValue(els.newClientCountry, "Senegal");
  els.saveClientBtn.textContent = "Ajouter le client";
  els.showClientFormBtn.textContent = "Nouveau client";
}

function readClientForm() {
  const client = normalizeClient({
    id: fieldValue(els.editingClientId) || crypto.randomUUID(),
    name: fieldValue(els.newClientName),
    email: fieldValue(els.newClientEmail),
    contact: fieldValue(els.newClientContact),
    phone: fieldValue(els.newClientPhone),
    mobile: fieldValue(els.newClientMobile),
    fax: fieldValue(els.newClientFax),
    website: fieldValue(els.newClientWebsite),
    country: fieldValue(els.newClientCountry) || "Senegal",
    street: fieldValue(els.newClientStreet),
    apartment: fieldValue(els.newClientApartment),
    postalCode: fieldValue(els.newClientPostalCode),
    city: fieldValue(els.newClientCity),
    state: fieldValue(els.newClientState),
    businessId: fieldValue(els.newClientBusinessId),
    legalId: fieldValue(els.newClientLegalId),
    taxId: fieldValue(els.newClientTaxId),
    note: fieldValue(els.newClientNote)
  });
  return {
    ...client,
    address: composeClientAddress(client)
  };
}

function fillClientForm(client) {
  setFieldValue(els.editingClientId, client.id);
  setFieldValue(els.newClientName, client.name);
  setFieldValue(els.newClientEmail, client.email);
  setFieldValue(els.newClientContact, client.contact);
  setFieldValue(els.newClientPhone, client.phone);
  setFieldValue(els.newClientMobile, client.mobile);
  setFieldValue(els.newClientFax, client.fax);
  setFieldValue(els.newClientWebsite, client.website);
  setFieldValue(els.newClientCountry, client.country || "Senegal");
  setFieldValue(els.newClientStreet, client.street);
  setFieldValue(els.newClientApartment, client.apartment);
  setFieldValue(els.newClientPostalCode, client.postalCode);
  setFieldValue(els.newClientCity, client.city);
  setFieldValue(els.newClientState, client.state);
  setFieldValue(els.newClientBusinessId, client.businessId);
  setFieldValue(els.newClientLegalId, client.legalId);
  setFieldValue(els.newClientTaxId, client.taxId);
  setFieldValue(els.newClientNote, client.note);
}

function startClientEdit(client) {
  fillClientForm(client);
  els.clientForm.hidden = false;
  els.saveClientBtn.textContent = "Sauvegarder le client";
  els.showClientFormBtn.textContent = "Client en modification";
  els.clientForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveClientLocally(client, isEditing) {
  if (isEditing) {
    clients = clients.map((item) => item.id === client.id ? client : item);
  } else {
    clients = [client, ...clients];
  }
  deletedClientKeys.delete(clientKey(client));
  saveDeletedClientKeys();
  saveClients();
  resetClientForm();
  renderClients();
}

async function createClient(event) {
  event.preventDefault();
  const client = readClientForm();
  if (!client.name) return;
  const isEditing = Boolean(fieldValue(els.editingClientId));

  try {
    if (authToken && isEditing && isPersistedId(client.id)) {
      const data = await apiFetch(`/api/clients/${client.id}`, {
        method: "PUT",
        body: JSON.stringify(client)
      });
      clients = clients.map((item) => item.id === client.id ? normalizeClient(data.client) : item);
    } else if (isEditing) {
      clients = clients.map((item) => item.id === client.id ? client : item);
    } else if (authToken) {
      const data = await apiFetch("/api/clients", {
        method: "POST",
        body: JSON.stringify(client)
      });
      clients = [normalizeClient(data.client), ...clients];
    } else {
      clients = [client, ...clients];
    }
    deletedClientKeys.delete(clientKey(client));
    saveDeletedClientKeys();
    saveClients();
    resetClientForm();
    renderClients();
  } catch (error) {
    if (error.status === 404 && String(error.path || "").startsWith("/api/clients")) {
      saveClientLocally(client, isEditing);
      alert("Client enregistre localement. Le backend Render doit etre redeploye pour enregistrer les clients dans MongoDB.");
      return;
    }
    alert(error.message);
  }
}

async function deleteClient(client) {
  const documentCount = clientDocumentCount(client.name);
  const detail = documentCount
    ? ` ${documentCount} document${documentCount > 1 ? "s" : ""} resteront dans l'historique.`
    : "";
  if (!confirm(`Supprimer le client ${client.name} ?${detail}`)) return;

  try {
    if (authToken && isPersistedId(client.id)) {
      await apiFetch(`/api/clients/${client.id}`, { method: "DELETE" });
    }
    deletedClientKeys.add(clientKey(client));
    saveDeletedClientKeys();
    clients = clients.filter((item) => item.id !== client.id);
    saveClients();
    renderClients();
  } catch (error) {
    if (error.status === 404 && String(error.path || "").startsWith("/api/clients")) {
      deletedClientKeys.add(clientKey(client));
      saveDeletedClientKeys();
      clients = clients.filter((item) => item.id !== client.id);
      saveClients();
      renderClients();
      alert("Client supprime localement. Le backend Render doit etre redeploye pour synchroniser cette action.");
      return;
    }
    alert(error.message);
  }
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
  await loadRemoteClients();
  await loadUsers();
  currentView = "overview";
  isCreatingInvoice = false;
  render();
  triggerWelcomeAnimation();
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
    await loadRemoteClients();
    await loadUsers();
    currentView = "overview";
    isCreatingInvoice = false;
    render();
    triggerWelcomeAnimation();
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
  if (isCreatingInvoice) {
    els.pageTitle.textContent = documentListTitle(invoice.documentType);
    els.creationCrumb.hidden = false;
  } else if (currentView === "invoices") {
    els.pageTitle.textContent = documentListTitle(els.documentTypeFilter?.value);
    els.creationCrumb.hidden = true;
  } else if (currentView === "overview") {
    els.pageTitle.textContent = "Vue d'ensemble";
    els.creationCrumb.hidden = true;
  } else if (currentView === "clients") {
    els.pageTitle.textContent = "Clients";
    els.creationCrumb.hidden = true;
  } else {
    els.pageTitle.textContent = `${invoice.documentType} ${invoice.number} - ${invoice.clientName || "Client"}`;
    els.creationCrumb.hidden = true;
  }
  els.totalDueText.textContent = money(totals.total, invoice.currency);
  els.balanceText.textContent = money(totals.balance, invoice.currency);
  els.newInvoiceBtn.textContent = documentActionLabel(els.documentTypeFilter?.value);
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
    invoice.clientAddress,
    invoice.clientBusinessId ? `Business ID: ${invoice.clientBusinessId}` : "",
    invoice.clientLegalId ? `NINEA / RC: ${invoice.clientLegalId}` : "",
    invoice.clientTaxId ? `Tax ID: ${invoice.clientTaxId}` : ""
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
  document.body.classList.toggle("invoice-create-mode", isCreatingInvoice);
  document.body.classList.toggle("invoice-list-mode", !isCreatingInvoice && currentView === "invoices");
  document.body.classList.toggle("overview-mode", !isCreatingInvoice && currentView === "overview");
  document.body.classList.toggle("clients-mode", !isCreatingInvoice && currentView === "clients");
  els.documentTypeLinks.forEach((link) => {
    link.classList.toggle("active", !isCreatingInvoice && currentView === "invoices" && link.dataset.documentFilter === els.documentTypeFilter?.value);
  });
  els.overviewNavLink.classList.toggle("active", !isCreatingInvoice && currentView === "overview");
  els.clientsNavLink.classList.toggle("active", !isCreatingInvoice && currentView === "clients");
  renderClientOptions();
  fillForm(invoice);
  renderList();
  renderDashboard();
  renderClients();
  renderSummary();
  renderPreview();
}

els.form.addEventListener("input", readForm);
els.form.addEventListener("change", readForm);
els.invoiceClientSelect.addEventListener("change", () => {
  const client = clients.find((item) => item.id === els.invoiceClientSelect.value);
  if (client) applyClientToInvoice(client);
});
els.search.addEventListener("input", renderList);
els.documentTypeFilter.addEventListener("change", render);
els.periodFilter.addEventListener("change", renderList);
els.statusFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    invoiceStatusFilter = button.dataset.statusFilter;
    els.statusFilterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderList();
  });
});
els.documentTypeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showDocumentList(link.dataset.documentFilter);
  });
});
els.overviewNavLink.addEventListener("click", (event) => {
  event.preventDefault();
  showView("overview");
});
els.clientsNavLink.addEventListener("click", (event) => {
  event.preventDefault();
  showView("clients");
});
els.clientSearch.addEventListener("input", renderClients);
els.showClientFormBtn.addEventListener("click", () => {
  resetClientForm();
  els.clientForm.hidden = false;
  els.saveClientBtn.textContent = "Ajouter le client";
  els.showClientFormBtn.textContent = "Nouveau client";
  els.newClientName.focus();
});
els.cancelClientFormBtn.addEventListener("click", resetClientForm);
els.clientForm.addEventListener("submit", createClient);
els.sortBy.addEventListener("change", () => {
  renderList();
  renderDashboard();
});
els.sortDirection.addEventListener("change", () => {
  renderList();
  renderDashboard();
});

els.addItemBtn.addEventListener("click", () => {
  addItemRow();
  readForm();
});

els.newInvoiceBtn.addEventListener("click", () => {
  const activeType = els.documentTypeFilter?.value && els.documentTypeFilter.value !== "all"
    ? els.documentTypeFilter.value
    : "FACTURE";
  const invoice = defaultInvoice({
    documentType: activeType,
    number: nextInvoiceNumber(),
    date: today(),
    dueDate: today(14),
    deliveryDate: today()
  });
  invoices = [invoice, ...invoices];
  selectedId = invoice.id;
  isCreatingInvoice = true;
  saveInvoices();
  render();
  document.querySelector(".page-head")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.backToListBtn.addEventListener("click", () => {
  isCreatingInvoice = false;
  currentView = "invoices";
  render();
  document.querySelector(".document-browser")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.saveInvoiceBtn.addEventListener("click", async () => {
  readForm();
  const savedType = selectedInvoice().documentType;
  if (authToken) {
    clearTimeout(syncTimer);
    await syncInvoices().catch((error) => console.error(error));
  }
  showDocumentList(savedType);
  document.querySelector(".document-browser")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.modalCloseBtn.addEventListener("click", closeInvoiceModal);
els.invoiceModalBackdrop.addEventListener("click", closeInvoiceModal);
els.modalPrintBtn.addEventListener("click", () => {
  document.body.classList.add("modal-printing");
  window.print();
});
els.modalSaveBtn.addEventListener("click", downloadInvoiceFile);
els.modalEditBtn.addEventListener("click", editSelectedInvoice);
els.modalDeleteBtn.addEventListener("click", deleteSelectedInvoice);
window.addEventListener("afterprint", () => {
  document.body.classList.remove("modal-printing");
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.invoiceModal.hidden) {
    closeInvoiceModal();
  }
});

els.duplicateBtn.addEventListener("click", () => {
  const source = selectedInvoice();
  const copy = defaultInvoice({
    ...structuredClone(source),
    id: crypto.randomUUID(),
    number: nextInvoiceNumber(),
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

els.deleteBtn.addEventListener("click", deleteSelectedInvoice);

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
  clearTimeout(welcomeTimer);
  document.body.classList.remove("welcome-active");
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
