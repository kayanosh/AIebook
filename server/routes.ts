import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { log } from "./index";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

  app.post(api.paymentIntent.create.path, async (req, res) => {
    try {
      const input = api.paymentIntent.create.input.parse(req.body);

      // Allow only the two valid prices: £19.99 (1999p) or £49.99 (4999p)
      const allowedAmounts = [1999, 4999];
      if (!allowedAmounts.includes(input.amountInPence)) {
        return res.status(400).json({ message: "Invalid amount." });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: input.amountInPence,
        currency: "gbp",
        receipt_email: input.email,
        metadata: { email: input.email },
      });

      // Save/update lead
      let lead = await storage.getLeadByEmail(input.email);
      if (!lead) await storage.createLead({ email: input.email });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      
      const contact = await storage.createContactRequest(input);
      
      log(`New 1-on-1 coaching request from ${input.name} (${input.email})`);

      // Send email notification to admin
      try {
        await transporter.sendMail({
          from: `"Blueprint Site" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: "admin@mathrix.co.uk",
          subject: `New 1-on-1 Coaching Request from ${input.name}`,
          html: `
            <h2>New 1-on-1 Coaching Request</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${input.name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${input.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${input.phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${input.message}</td></tr>
            </table>
          `,
        });
        log(`Email notification sent to admin@mathrix.co.uk`);
      } catch (emailErr) {
        log(`Warning: could not send email notification — ${(emailErr as Error).message}`);
      }

      res.status(200).json({ 
        success: true, 
        message: "Your request has been sent! We'll get back to you within 24 hours." 
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
