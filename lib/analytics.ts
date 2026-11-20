export type FunnelEvent =
  | "hero_cta_click"
  | "benchmark_used"
  | "slider_interacted"
  | "lead_form_started"
  | "lead_form_submitted"
  | "demo_booked";

export async function track(
  event: FunnelEvent,
  properties: Record<string, unknown> = {},
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: event, properties }),
    });
  } catch {
    // Analytics must never block a conversion or workspace interaction.
  }
}
