# Sahyogi

### Real-Time Disaster Relief & Community Assistance Platform

**Sahyogi** is a full-stack disaster-relief and community assistance platform developed by **Team Binary Minds**. It connects citizens who need help with volunteers and NGOs through a coordinated, location-aware workflow.

The platform is designed to make emergency assistance faster, more organized, and easier to manage through real-time request tracking, geographic matching, role-based dashboards, and intelligent request prioritization.

## Team

**Binary Minds**

## Key Features

* **Multi-role platform**

  * Citizens can submit and track assistance requests.
  * Volunteers can discover, accept, and complete missions.
  * NGOs can monitor requests and coordinate relief operations.

* **AI-assisted request triage**

  * Categorizes incoming assistance requests.
  * Helps prioritize requests based on urgency and available information.

* **Geo-based assistance matching**

  * Uses geographic information to connect requests with nearby resources and volunteers.

* **Interactive live maps**

  * Visualizes requests, volunteers, and operational activity using interactive maps.

* **Volunteer mission workflow**

  * Request creation
  * Request prioritization
  * Volunteer assignment
  * Mission acceptance
  * Progress tracking
  * Mission completion

* **Role-specific dashboards**

  * Dedicated interfaces for citizens, volunteers, and NGO coordinators.

* **Demo mode**

  * Includes pre-seeded data for demonstrating the platform without requiring a live disaster scenario.

## Technology Stack

### Frontend

* React
* TypeScript
* TanStack Start
* TanStack Router
* Tailwind CSS
* shadcn/ui
* Leaflet

### Development

* Vite
* ESLint
* Prettier
* npm / Bun

## Project Structure

```text
sahyogi-aid-connect-main/
├── public/
├── src/
│   ├── components/
│   ├── routes/
│   ├── lib/
│   └── ...
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

You can verify your installation with:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd sahyogi-aid-connect-main
```

Install dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

Sahyogi can be deployed using modern web hosting platforms that support Vite/TanStack applications.

For a Vercel deployment:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables, if applicable.
4. Deploy the project.
5. Verify the production build and application routes.

## Application Workflow

```text
Citizen
   │
   ▼
Create Assistance Request
   │
   ▼
Request Triage & Prioritization
   │
   ▼
Location-Based Matching
   │
   ▼
NGO / Volunteer Coordination
   │
   ▼
Volunteer Mission
   │
   ▼
Mission Completion
```

## Purpose

Sahyogi aims to provide a unified digital coordination layer for disaster-relief and community assistance operations, reducing communication gaps between people requesting help, volunteers, and organizations coordinating relief efforts.

## Team Binary Minds

Sahyogi is developed by **Binary Minds** with a focus on practical technology for emergency coordination, community support, and efficient resource utilization.

