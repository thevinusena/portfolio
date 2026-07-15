const pdfTriggers = [...document.querySelectorAll("#openPdf, [data-open-pdf]")];
const pdfModal = document.getElementById("pdfModal");
const closePdf = document.getElementById("closePdf");
const downloadPdf = document.getElementById("downloadPdf");
const pdfViewer = document.getElementById("pdfViewer");
let resumeTrigger = null;

function setResumeModal(open) {
  if (!pdfModal || !pdfTriggers.length) return;

  pdfModal.classList.toggle("is-open", open);
  pdfModal.setAttribute("aria-hidden", String(!open));
  pdfTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", String(open)));
  document.body.classList.toggle("modal-open", open);

  if (open) {
    resumeTrigger = document.activeElement;
    closePdf?.focus();
  } else {
    resumeTrigger?.focus?.();
  }
}

pdfTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    setResumeModal(true);
  });
});

closePdf?.addEventListener("click", () => setResumeModal(false));

pdfModal?.addEventListener("click", (event) => {
  if (event.target === pdfModal) {
    setResumeModal(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pdfModal?.classList.contains("is-open")) {
    setResumeModal(false);
  }
});

if (downloadPdf && pdfViewer) {
  downloadPdf.href = pdfViewer.getAttribute("src");
}
