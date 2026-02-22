import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.checkout.create.path, async (req, res) => {
    try {
      const input = api.checkout.create.input.parse(req.body);
      
      // Try to get existing lead, if not create one
      let lead = await storage.getLeadByEmail(input.email);
      if (!lead) {
        lead = await storage.createLead(input);
      }
      
      // In a real app we'd process payment here. 
      // For this fake flow, we just return success and a dummy download URL
      res.status(200).json({ 
        success: true, 
        downloadUrl: "#download-ready" 
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
