export async function GET() {
  const csv = [
    "period,commission_saved,direct_order_mix,repeat_customer_value",
    "This month,4812,61,2.4",
  ].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=marginly-report.csv",
      "X-Marginly-Data": "illustrative",
    },
  });
}
