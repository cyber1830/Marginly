export type JobName =
  "benchmark.refresh" | "menu.analyze" | "visual.enhance" | "marketing.draft";

export type AgentJob = {
  id: string;
  name: JobName;
  restaurantId: string;
  payload: Record<string, unknown>;
  status: "queued" | "running" | "complete" | "failed";
};

/** Redis-backed queue seam. The local implementation is intentionally side-effect free. */
export interface AgentJobQueue {
  enqueue(job: Omit<AgentJob, "id" | "status">): Promise<AgentJob>;
  get(id: string): Promise<AgentJob | null>;
}

export class DemoJobQueue implements AgentJobQueue {
  private jobs = new Map<string, AgentJob>();
  async enqueue(input: Omit<AgentJob, "id" | "status">) {
    const job = {
      ...input,
      id: `job_${Date.now()}`,
      status: "queued" as const,
    };
    this.jobs.set(job.id, job);
    return job;
  }
  async get(id: string) {
    return this.jobs.get(id) ?? null;
  }
}

export class RedisJobQueue implements AgentJobQueue {
  constructor(
    private readonly redis: {
      lpush(key: string, value: string): Promise<number>;
      get(key: string): Promise<string | null>;
    },
  ) {}
  async enqueue(input: Omit<AgentJob, "id" | "status">) {
    const job = {
      ...input,
      id: `job_${Date.now()}`,
      status: "queued" as const,
    };
    await this.redis.lpush("marginly:agent-jobs", JSON.stringify(job));
    return job;
  }
  async get(id: string) {
    const value = await this.redis.get(`marginly:job:${id}`);
    return value ? (JSON.parse(value) as AgentJob) : null;
  }
}
