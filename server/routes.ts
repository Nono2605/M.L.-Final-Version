import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { storage } from "./storage";
import { insertQuoteSchema, updateQuoteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new quote request
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      
      // Log the quote creation for debugging
      console.log("New quote created:", {
        id: quote.id,
        projectType: quote.projectType,
        service: quote.service,
        superficie: quote.superficie
      });
      
      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating quote:", error);
        res.status(500).json({ 
          message: "Erreur interne du serveur" 
        });
      }
    }
  });

  // Get all quotes (for admin purposes)
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ 
        message: "Erreur lors de la récupération des devis" 
      });
    }
  });

  // Get a specific quote by ID
  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "ID invalide" 
        });
      }

      const quote = await storage.getQuote(id);
      if (!quote) {
        return res.status(404).json({ 
          message: "Devis non trouvé" 
        });
      }

      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ 
        message: "Erreur lors de la récupération du devis" 
      });
    }
  });

  // Update a quote (for admin use)
  app.patch("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "ID invalide" 
        });
      }

      const validatedData = updateQuoteSchema.parse(req.body);
      const quote = await storage.updateQuote(id, validatedData);
      
      if (!quote) {
        return res.status(404).json({ 
          message: "Devis non trouvé" 
        });
      }

      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating quote:", error);
        res.status(500).json({ 
          message: "Erreur lors de la mise à jour du devis" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  
  // Configure Socket.io
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : true,
      methods: ["GET", "POST"]
    }
  });

  // WebSocket event handlers
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
    
    // Add your custom WebSocket events here
  });

  return httpServer;
}
