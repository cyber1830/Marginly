import { NextResponse } from "next/server";
import Redis from "ioredis";
import { DemoJobQueue, RedisJobQueue, type JobName } from "../../../lib/jobs";
import { hasDemoSession } from "../../../lib/auth";

const allowed = new Set<JobName>([
  "benchmark.refresh",
  "menu.analyze",
  "visual.enhance",
  "marketing.draft",
]);
export async function POST(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  if (!allowed.has(body.name))
    return NextResponse.json(
      { error: "Unsupported agent job" },
      { status: 400 },
    );
  const queue = process.env.REDIS_URL
    ? new RedisJobQueue(new Redis(process.env.REDIS_URL))
    : new DemoJobQueue();
  const job = await queue.enqueue({
    name: body.name,
    restaurantId: body.restaurantId || "demo-restaurant",
    payload: body.payload || {},
  });
  return NextResponse.json(
    { ok: true, job, illustrative: !process.env.REDIS_URL },
    { status: 202 },
  );
}
