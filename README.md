# Medvantage Core — Multi-Tenant Clinical Workflow Backend

Medvantage Core is an enterprise-grade, multi-tenant clinical SaaS backend built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **Redis**. The architecture implements strict role-based access control, cryptographic identity isolation, and an asynchronous, event-driven performance metrics infrastructure.

## System Architecture Topology

The infrastructure segregates processing layers to ensure maximum uptime, high throughput, and structural isolation:

  [ Client Layer ]      --> Postman / Frontend App
         │
         ▼
  [ Guard Perimeter ]   --> Identity Verification (Passport JWT) & RBAC Authorization
         │
         ▼
  [ Controller Layer ]  --> HTTP Ingress Parsing & Strict DTO Input Validation
         │
         ▼
  [ Service Domain ]    --> Business Contracts & Atomic Transactional Logic
         │
         ▼
  [ Persistence Layer ] --> Prisma Client communicating with PostgreSQL & Redis Cache Grid

Key Architectural Paradigms
Multi-Tenant Data Isolation

Tenant onboarding and management via the Clinic space workspace model.

1-to-1 Profile Extension Mapping Strategy: Generic identity User accounts are extended into specialized Doctor resource maps via rigid structural integrity constraints.

Cryptographic Identity Perimeter

Password security handled using adaptive salt factors through bcrypt.

Secure credential exchanges mint cryptographically signed stateless JWT Bearer Tokens.

Reflector-Driven Role-Based Access Control (RBAC)

Custom @Roles() decorator metadata binding alongside an automated execution evaluation RolesGuard.

Granular, case-sensitive endpoint access constraints (e.g., restricting doctor provisioning pipelines strictly to CLINIC_ADMIN).

Day 17 Advanced Event-Driven Paradigm

Decoupled Job Distribution: The core request-response lifecycle records transactional appointment data to PostgreSQL and fires an unblocking EventEmitter2 broadcast message before immediately responding to the client.

Asynchronous Background Processing: A background listener (AppointmentProcessor) intercepts the asynchronous event stream independently of the main threat pipeline.

High-Performance Caching & In-Memory Analytics Engine

The background lifecycle stream uses Redis standalone nodes (ioredis) to process fast metrics evaluations (INCR operations).

Sub-millisecond tracking capability for real-time analytics data grid visualization without causing lockouts on the database tier.

Technological Stack Grid
Framework: NestJS (TypeScript Node.js Enterprise Engine)

Data Layer ORM: Prisma Client Core

Primary Database: PostgreSQL

Memory Cache & Event Grid: Redis Engine via ioredis

Identity Management: Passport.js Ecosystem (passport-jwt)

Validation Layer: Class-Validator & Class-Transformer Pipes

Local Deployment & Setup Guide
1. Provision Environment Variable Files
Create a .env deployment configuration file at the root node directory of the system workspace:

Code snippet
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public"
JWT_SECRET="MEDVANTAGE_ENTERPRISE_CORE_SECRET_KEY_2026"
2. Install Development Framework Libraries
Bash
npm install
3. Initialize and Sync Storage Structures
Run migrations to lay down schemas across your local database instances:

Bash
npx prisma migrate dev --name init_medvantage_core_database
4. Boot Up Environment Caching Node Containers
Make sure your local Redis server environment instance is currently operational:

Bash
redis-server
5. Launch the Local Application Server
Bash
# Watch execution compiler mode
npm run start:dev
Comprehensive API Gateway Postman Integration Walkthrough
Phase 1: Security Network Registry Setup
Endpoint Path Location: POST /auth/register

Network Payload Matrix:

JSON
{
  "email": "executive.admin@medvantage.com",
  "password": "secureClinicPassword2026",
  "role": "CLINIC_ADMIN"
}
Phase 2: Credential Exchange Session Login
Endpoint Path Location: POST /auth/login

Network Payload Matrix:

JSON
{
  "email": "executive.admin@medvantage.com",
  "password": "secureClinicPassword2026"
}
Expected Response: Extracts a signed "accessToken" bearer string to place into authorization request properties.

Phase 3: Provision Multi-Tenant Clinical Spaces
Endpoint Path Location: POST /clinics

Security Verification: Authorization: Bearer <ADMIN_ACCESS_TOKEN>

Network Payload Matrix:

JSON
{
  "name": "Medvantage Health Capital — QC Headquarters",
  "address": "Katipunan Avenue, Quezon City"
}
Phase 4: Upgrade User Identity into Extended Doctor Profile Ledger
Endpoint Path Location: POST /doctors/:userId/profile

Security Verification: Authorization: Bearer <ADMIN_ACCESS_TOKEN>

Network Payload Matrix:

JSON
{
  "clinicId": "PASTE_CLINIC_UUID_HERE",
  "specialty": "PEDIATRICS",
  "licenseNo": "PRC-PEDI-88312"
}
Phase 5: Asynchronous Schedule Event-Driven Execution
Endpoint Path Location: POST /appointment

Security Verification: Authorization: Bearer <ANY_VALID_USER_TOKEN>

Network Payload Matrix:

JSON
{
  "clinicId": "PASTE_CLINIC_UUID_HERE",
  "doctorId": "PASTE_DOCTOR_PROFILE_UUID_HERE",
  "timeSlot": "2026-06-15T14:30:00.000Z"
}
System Trace Output Observation: Monitor your server shell terminal to verify live event intercepts and automatic Redis caching updates.

Bash
[EVENT INTERCEPTED]: Asynchronous workflow triggered for Appointment ID: <UUID>
[REDIS CACHE ENGINE COMPLETED]: Incremented metrics pipeline counter key: metrics:clinic:<UUID>:total-bookings -> Current Live Stand: 1
