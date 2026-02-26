import { z } from "zod";
import { insertLeadSchema, insertContactRequestSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  checkout: {
    create: {
      method: "POST" as const,
      path: "/api/checkout" as const,
      input: insertLeadSchema,
      responses: {
        200: z.object({ success: z.boolean(), downloadUrl: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
  paymentIntent: {
    create: {
      method: "POST" as const,
      path: "/api/create-payment-intent" as const,
      input: z.object({ email: z.string().email(), amountInPence: z.number() }),
      responses: {
        200: z.object({ clientSecret: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
  contact: {
    create: {
      method: "POST" as const,
      path: "/api/contact" as const,
      input: insertContactRequestSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
