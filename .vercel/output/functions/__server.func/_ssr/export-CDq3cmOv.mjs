//#region node_modules/.nitro/vite/services/ssr/assets/export-CDq3cmOv.js
function downloadCsv(filename, rows, columns) {
	if (typeof window === "undefined") return;
	const cols = columns ?? (rows[0] ? Object.keys(rows[0]).map((k) => ({
		key: k,
		label: k
	})) : []);
	const escape = (v) => {
		if (v === null || v === void 0) return "";
		const s = typeof v === "object" ? JSON.stringify(v) : String(v);
		return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s;
	};
	const header = cols.map((c) => escape(c.label)).join(",");
	const body = rows.map((r) => cols.map((c) => escape(r[c.key])).join(",")).join("\n");
	const csv = "﻿" + header + "\n" + body;
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
//#endregion
export { downloadCsv as t };
