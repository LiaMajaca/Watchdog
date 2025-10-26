# LAID FIBA Engine: Lightweight Adaptive Intelligence Detector for Fraudulent Identity & Behavior Analytics

## 🌟 Hackathon Project Prompt: LAID FIBA Engine

**Project Title:** LAID FIBA Engine: Lightweight Adaptive Intelligence Detector for Fraudulent Identity & Behavior Analytics

### 🎯 The Core Mission

Develop a functioning Minimum Viable Product (MVP) of the **LAID FIBA Engine**—a **lightweight, Edge-deployed AI system** designed to combat the high rate of identity fraud and insider collusion in the South African social grant (SASSA) system. The solution must demonstrate a shift from **reactive auditing to proactive prevention.**

### 1. Problem Statement Focus

The project must solve the **latency, cost, and accountability gaps** of traditional security:

*   **Financial Leakage:** Stop the loss of funds caused by **mass identity theft** (ghost beneficiaries) and **insider collusion** (employees bypassing controls).
*   **Operational Blindness:** Solve the failure of legacy **Signature-Based IDS** to detect **behavioral deviation**—the subtle sign of new or internal fraud.
*   **Resource Constraints:** Provide an **affordable, resilient** solution that is viable for implementation in resource-constrained public sector environments.

### 2. Solution Pillars & Required Features (MVP)

The final deliverable must showcase a complete, end-to-end flow using four interconnected **Dockerized microservices** (Collector, Inference Engine, Response Agent, Dashboard).

| Pillar | Feature to Demonstrate | Technical Implementation |
| :--- | :--- | :--- |
| **P1: Adaptive Intelligence** | **Insider Threat Detection:** Use **ML Anomaly Models** (e.g., Isolation Forest) to detect **employee process bypass** (teller approving payment without mandatory biometric flag). | Pre-trained, compressed Python ML models (Scikit-learn) loaded via FastAPI/Flask API. |
| **P2: Proactive Prevention** | **Automated Action:** Trigger an instant, policy-driven defense mechanism. | **Response Agent** instantly executes a command (e.g., **Lock Account/Hold Payment**) based on a high-risk score ($>0.90$). |
| **P3: Explainability & Trust** | **Explainable AI (XAI) Output:** For every high-risk event, generate a clear, human-readable justification. | **XAI Panel** on the Web Dashboard clearly displays: "Teller A001 bypassed biometric check. **Action Justified.**" |
| **P4: Lightweight Resilience** | **Edge Simulation:** The entire system must run in the background with minimal CPU/RAM usage on a local Docker network. | All services must be orchestrated via **Docker Compose** with resource constraints set (e.g., $512\text{MB}$ RAM limits). |

### 3. Business & Security Integration (The Pitch)

The final presentation must clearly articulate these strategic points:

*   **Unique Value Proposition (UVP):** Instantaneous, affordable, and auditable prevention against identity and insider fraud.
*   **Unfair Advantage:** **XAI** and **Edge-Optimized Code** that competitors cannot easily replicate.
*   **Key Metric to Prove:** **Mean Time To Detect (MTTD)** must be near zero (milliseconds) to show the solution closes the latency gap left by existing **IDS** systems.

This prompt provides your team with a clear mission, defined technical constraints, and measurable deliverables for a winning hackathon submission.

---

## Table of Contents

*   [Project Overview](#project-overview)
*   [Architecture](#architecture)
*   [Microservices](#microservices)
    *   [Collector](#collector)
    *   [Inference Engine](#inference-engine)
    *   [Response Agent](#response-agent)
    *   [Dashboard](#dashboard)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Project](#running-the-project)
*   [Features (Dashboard Specific)](#features-dashboard-specific)
*   [Tech Stack (Dashboard Specific)](#tech-stack-dashboard-specific)
*   [Mock Data (Dashboard Specific)](#mock-data-dashboard-specific)
*   [Styling (Dashboard Specific)](#styling-dashboard-specific)
*   [Build for Production (Dashboard Specific)](#build-for-production-dashboard-specific)
*   [Contributing](#contributing)
*   [License](#license)

---

## Project Overview

The LAID FIBA Engine is a lightweight, Edge-deployed AI system designed to combat identity fraud and insider collusion within the South African social grant (SASSA) system. This project aims to shift from reactive auditing to proactive prevention by leveraging adaptive intelligence, automated actions, and explainable AI.

## Architecture

The system is composed of four interconnected Dockerized microservices, orchestrated using Docker Compose:

1.  **Collector:** Gathers and preprocesses data.
2.  **Inference Engine:** Applies ML anomaly models to detect fraudulent behavior.
3.  **Response Agent:** Triggers policy-driven defense mechanisms based on risk scores.
4.  **Dashboard:** Provides a real-time, explainable interface for monitoring and investigation.

## Microservices

### Collector

*   **Purpose:** Responsible for collecting raw data from various sources (e.g., transaction logs, biometric checks) and preparing it for analysis by the Inference Engine.
*   **Technology:** Python (Flask), Docker.
*   **Location:** `src/collector/`

### Inference Engine

*   **Purpose:** Houses the machine learning anomaly detection models (e.g., Isolation Forest) to identify suspicious patterns indicative of fraud or insider threats.
*   **Technology:** Python (Flask, Scikit-learn), Docker.
*   **Location:** `src/inference_engine/`

### Response Agent

*   **Purpose:** Acts on the insights provided by the Inference Engine. Based on predefined policies and risk scores, it triggers automated defense mechanisms (e.g., locking accounts, holding payments).
*   **Technology:** Python (Flask), Docker.
*   **Location:** `src/response_agent/`

### Dashboard

*   **Purpose:** Provides a user-friendly interface for monitoring the system, visualizing risk, displaying real-time alerts, and presenting Explainable AI (XAI) outputs.
*   **Technology:** React 18 with TypeScript, Tailwind CSS, Recharts, Lucide React, Docker.
*   **Location:** `src/dashboard/`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Watchdog
    ```
    (Note: If you are already in the project directory, you can skip cloning.)

### Running the Project

1.  **Build and run the Docker containers:**
    Navigate to the root directory of the project (where `docker-compose.yml` is located) and run:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images for all microservices and start them.

2.  **Access the Dashboard:**
    Once all services are running, open your web browser and navigate to:
    ```
    http://localhost:80
    ```
    You should see the LAID FIBA Engine Dashboard.

## Features (Dashboard Specific)

-   **Real-time Dashboard**: Auto-updating stats and alerts every 3 seconds
-   **Live Alert Feed**: Scrollable list of fraud alerts with severity indicators
-   **Risk Visualization**: Interactive scatter plot showing transaction risk distribution
-   **Modern UI**: Dark theme with Tailwind CSS and Lucide icons
-   **Responsive Design**: Works on desktop and mobile devices

## Tech Stack (Dashboard Specific)

-   React 18 with TypeScript
-   Tailwind CSS for styling
-   Recharts for data visualization
-   Lucide React for icons

## Mock Data (Dashboard Specific)

The dashboard uses simulated data that updates every 3 seconds:
-   Random fraud alerts with different severity levels
-   Fluctuating risk scores and statistics
-   Dynamic scatter plot data points
-   Occasional system status changes

## Styling (Dashboard Specific)

-   Dark theme with custom color palette
-   Modern card-based layout
-   Responsive grid system
-   Smooth transitions and hover effects
-   Professional SASSA fraud detection interface

## Build for Production (Dashboard Specific)

To create an optimized production build for the dashboard:

```bash
cd src/dashboard
npm install # if not already installed
npm run build
```
This creates an optimized production build in the `build` folder within the `src/dashboard` directory.

## Contributing

We welcome contributions to the LAID FIBA Engine! Please see our `CONTRIBUTING.md` (to be created) for more details.

## License

This project is licensed under the MIT License - see the `LICENSE` (to be created) file for details.