import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertContactRequest } from "@shared/schema";

export function useContact() {
  return useMutation({
    mutationFn: async (data: InsertContactRequest) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong sending your request.");
      }

      return api.contact.create.responses[200].parse(await res.json());
    },
  });
}
