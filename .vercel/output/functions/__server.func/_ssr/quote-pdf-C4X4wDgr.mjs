import { t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-pdf-C4X4wDgr.js
async function generateQuotePdf(quote, businessName) {
	const mod = await import(
		/* @vite-ignore */
		"jspdf"
);
	const doc = new (mod.default ?? mod.jsPDF ?? mod)({
		unit: "pt",
		format: "a4"
	});
	const marginX = 48;
	let y = 56;
	doc.setFontSize(20);
	doc.setFont("helvetica", "bold");
	doc.text(businessName || "Cotización", marginX, y);
	y += 18;
	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(110);
	doc.text("Cotización profesional", marginX, y);
	doc.setTextColor(0);
	y += 36;
	doc.setFontSize(11);
	doc.setFont("helvetica", "bold");
	doc.text("Cliente:", marginX, y);
	doc.setFont("helvetica", "normal");
	doc.text(quote.customer_name || "—", 108, y);
	y += 16;
	doc.setFont("helvetica", "bold");
	doc.text("Fecha:", marginX, y);
	doc.setFont("helvetica", "normal");
	doc.text(new Date(quote.created_at).toLocaleDateString("es-CL"), 108, y);
	if (quote.valid_until) {
		doc.setFont("helvetica", "bold");
		doc.text("Válida hasta:", 268, y);
		doc.setFont("helvetica", "normal");
		doc.text(new Date(quote.valid_until).toLocaleDateString("es-CL"), 348, y);
	}
	y += 28;
	doc.setFillColor(244, 244, 248);
	doc.rect(marginX, y, 500, 22, "F");
	doc.setFont("helvetica", "bold");
	doc.setFontSize(10);
	doc.text("Descripción", 56, y + 15);
	doc.text("Cant.", 348, y + 15);
	doc.text("Precio", 408, y + 15);
	doc.text("Total", 498, y + 15);
	y += 22;
	doc.setFont("helvetica", "normal");
	(quote.items ?? []).forEach((item) => {
		y += 22;
		if (y > 720) {
			doc.addPage();
			y = 56;
		}
		doc.text(String(item.name ?? "—").slice(0, 48), 56, y);
		doc.text(String(item.qty ?? 0), 348, y);
		doc.text(fmtCLP(Number(item.price ?? 0)), 408, y);
		doc.text(fmtCLP(Number(item.qty ?? 0) * Number(item.price ?? 0)), 498, y);
	});
	y += 30;
	doc.setDrawColor(220);
	doc.line(328, y, 548, y);
	y += 18;
	doc.text("Subtotal", 408, y);
	doc.text(fmtCLP(quote.subtotal), 498, y);
	y += 16;
	doc.text("IVA (19%)", 408, y);
	doc.text(fmtCLP(quote.tax), 498, y);
	y += 18;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(12);
	doc.text("Total", 408, y);
	doc.text(fmtCLP(quote.total), 498, y);
	if (quote.notes) {
		y += 40;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(110);
		doc.text("Notas:", marginX, y);
		y += 14;
		const lines = doc.splitTextToSize(quote.notes, 500);
		doc.text(lines, marginX, y);
	}
	doc.save(`Cotizacion-${quote.customer_name || "cliente"}-${new Date(quote.created_at).toISOString().slice(0, 10)}.pdf`);
}
//#endregion
export { generateQuotePdf };
