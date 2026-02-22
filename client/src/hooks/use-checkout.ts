import { useMutation } from "@tanstack/react-query";
import { api, type InsertLead } from "@shared/routes";

// Using the simulated checkout endpoint
export function useCheckout() {
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.checkout.create.path, {
        method: api.checkout.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle validation errors or server errors
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong with the checkout.");
      }

      // Parse response with Zod schema
      return api.checkout.create.responses[200].parse(await res.json());
    },
  });
}
