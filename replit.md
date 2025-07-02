# SuisseToiture®️ - Professional Steam Cleaning Services

## Overview

SuisseToiture®️ is a modern web application for a Swiss steam cleaning company that specializes in eco-friendly cleaning services for roofs, facades, and terraces. The application features a multi-step quote request system with a responsive design and administrative dashboard for managing client inquiries.

## System Architecture

This is a full-stack web application built with a modern TypeScript stack:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tool**: Vite for development and bundling
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL storage
- **Build Tool**: esbuild for production builds

## Key Components

### Quote Request System
The application centers around a 7-step quote request wizard:
1. Project type selection (house/building)
2. Service type selection (roof/facade/terrace)
3. Service details selection (cleaning/treatment)
4. Area specification and address
5. Contact information collection
6. Preferred contact method
7. Confirmation and submission

### Administrative Dashboard
- Password-protected admin panel (password: 123456)
- Quote management with status tracking
- Quote filtering and detailed viewing
- Notes and status updates functionality

### Database Schema
The system uses a single main table for quotes with comprehensive fields:
- Project and service details
- Client contact information
- Address components (street, number, postal code, city)
- Communication preferences (email, phone, WhatsApp)
- Administrative fields (status, notes, timestamps)

## Data Flow

1. **Quote Creation**: Users progress through the multi-step form, with data temporarily stored in localStorage
2. **Form Submission**: Complete form data is validated and sent to the backend API
3. **Database Storage**: Quote data is persisted using Drizzle ORM to PostgreSQL
4. **Admin Management**: Administrators can view, filter, and update quote statuses through the dashboard

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with hooks and modern patterns
- **Styling**: Tailwind CSS with custom Swiss-themed color palette
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for internationalization (French locale)
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL with connection pooling
- **ORM**: Drizzle with schema-first approach and type safety
- **Validation**: Zod schemas for runtime type checking
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development Tools
- **TypeScript**: Strict typing throughout the application
- **Vite**: Fast development server with HMR
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Production Build Process
1. Frontend assets built using Vite and output to `dist/public`
2. Backend compiled using esbuild with external package bundling
3. Single production server serves both static assets and API endpoints

### Environment Configuration
- **Development**: Uses Vite dev server with Express middleware mode
- **Production**: Express serves static files and handles API routes
- **HTTPS Enforcement**: Automatic redirect to HTTPS in production environments

### Database Migration
- Drizzle Kit configured for PostgreSQL schema management
- Migration files generated in `./migrations` directory
- Schema defined in `shared/schema.ts` for type sharing

## Changelog
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.