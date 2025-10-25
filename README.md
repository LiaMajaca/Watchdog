# Watchdog: **LAID FIBA Engine** hackathon team:

***

## 🌟 Hackathon Project: LAID FIBA Engine

**Project Title:** LAID FIBA Engine: Lightweight Adaptive Intelligence Detector for Fraudulent Identity & Behavior Analytics

### 🎯 The Core Mission

Develop a functioning Minimum Viable Product (MVP) of the **LAID FIBA Engine**—a **lightweight, Edge-deployed AI system** designed to combat the high rate of identity fraud and insider collusion in the South African social grant (SASSA) system. The solution must demonstrate a shift from **reactive auditing to proactive prevention.**

### 1. Problem Statement Focus

The project must solve the **latency, cost, and accountability gaps** of traditional security:

* **Financial Leakage:** Stop the loss of funds caused by **mass identity theft** (ghost beneficiaries) and **insider collusion** (employees bypassing controls).
* **Operational Blindness:** Solve the failure of legacy **Signature-Based IDS** to detect **behavioral deviation**—the subtle sign of new or internal fraud.
* **Resource Constraints:** Provide an **affordable, resilient** solution that is viable for implementation in resource-constrained public sector environments.

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

* **Unique Value Proposition (UVP):** Instantaneous, affordable, and auditable prevention against identity and insider fraud.
* **Unfair Advantage:** **XAI** and **Edge-Optimized Code** that competitors cannot easily replicate.
* **Key Metric to Prove:** **Mean Time To Detect (MTTD)** must be near zero (milliseconds) to show the solution closes the latency gap left by existing **IDS** systems.

***
