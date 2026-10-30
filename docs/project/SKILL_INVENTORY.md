# SKILL INVENTORY — OOPS LAB
**Project:** OOPS LAB  
**Central ID:** OOPS-20261030-0001  
**Task ID:** OOPS-20261030-0001-T02  
**Last Updated:** 2026-10-30T23:36:00+05:30  

---

## 1. Overview and Discovery Summary

In accordance with Section 3 of the Master Development Instructions, all available skills within the Google Antigravity environment were inspected, cataloged, and read in their entirety.

The inventory below maps each discovered capability to its specific responsibilities within the OOPS LAB engineering lifecycle:
- **UI/UX & Frontend Development:** `generative_ui`
- **Architecture, Documentation & Governance:** `antigravity-guide`, `agy-customizations`
- **Component Integration & Extension:** `ui-plugin-navigation`, `plugin`
- **Automation & Background Tasks:** `automation`
- **Maintenance & Migration:** `migrate-workflows`

---

## 2. Skill Inventory Register

| Skill name | File location | Purpose | Relevant tasks | Read status | Usage status | Notes |
|---|---|---|---|---|---|---|
| `generative_ui` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\generative_ui\SKILL.md` | Renders rich interactive HTML widgets inline in chat or as standalone HTML artifacts using Tailwind CSS and inline JS. | Frontend prototypes, simulation step previews, interactive memory visualizations, educational walkthrough cards | Read | Active | Must use gstatic Tailwind script. Adhere to semantic CSS theme variables (`--background`, `--card`, `--border`, `--foreground`). Minimum text size 12px. Inline embeds capped at 500px height. |
| `antigravity-guide` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\antigravity_guide\SKILL.md` | Comprehensive guide, quick reference, and sitemap for Google Antigravity CLI, IDE, 2.0 app, Python SDK, slash commands, keybindings, and sandbox permissions. | Development environment alignment, IDE/CLI operations, sandbox governance | Read | Active | Provides authoritative reference for Antigravity surfaces, terminal sandboxing policies, slash commands (`/goal`, `/plan`, etc.), and agent coordination. |
| `agy-customizations` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\agy-customizations\SKILL.md` | Comprehensive guide for the Antigravity Customization System (rules, skills, plugins, hooks, MCP servers), loading priority, and discovery mechanisms. | Governance setup (T03), custom project rules (`AGENTS.md`, `.agents/rules/`), MCP integration | Read | Active | Enforces progressive disclosure, loading priority (workspace > declared > global > builtin), and deduplication rules. Defines guidelines for `AGENTS.md`. |
| `automation` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\automation\SKILL.md` | Interactive workflow to design and create scheduled background automations (`sidecar.json`) running on cron schedules with dedicated agent conversations. | Background CI/CD checks, periodic audit verification, regression monitoring | Read | Applicable for scheduled automation | Configures cron sidecars with `CRON_TZ` prefix. Strict rule: never hallucinate MCP or CLI commands not verified in environment. User must manually enable sidecars. |
| `plugin` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\plugin\SKILL.md` | Manages and creates namespaced customization bundles containing skills, agents, rules, MCP servers, and hooks. | Packaging project extensions, tool consolidation | Read | Applicable for plugin bundling | Details Language Server RPC calls (`lsrpc`), plugin directory naming conventions (`dir` hash vs name), and lifecycle management without hand-editing configs. |
| `ui-plugin-navigation` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\ui-plugin-navigation\SKILL.md` | Discovers UI plugin panels backed by sidecars and surfaces one-click `sidecar://` navigation pills in chat to toggle auxiliary panels. | Sidecar UI integration, auxiliary pane navigation for dev panels | Read | Applicable for UI sidecars | Surface pills sparingly using `sidecar://<sidecar-id>/<view-path>`. Only emit for active and running auxiliary pane entrypoints. |
| `migrate-workflows` | `C:\Users\LENOVO\.gemini\antigravity\builtin\skills\migrate-workflows\SKILL.md` | Autonomously migrates deprecated `.agents/workflows/*.md` files into modern `SKILL.md` packages and safely archives old files as `.md.bak`. | Maintenance, legacy workspace cleanup | Read | Not applicable (clean workspace) | Verifies that the workspace is clean of deprecated legacy workflow files. |

---

## 3. Skill Traceability & Architectural Alignment

### 3.1 Frontend & Simulation Visualizers
- **`generative_ui`** is directly applicable to the simulation and visualization requirements of OOPS LAB (Sections 7, 8, 10). It provides the exact protocol for previewing memory models, heap/stack representations, and interactive Java simulation steps in chat and auxiliary preview panes using semantic design tokens.

### 3.2 Engineering Standards & Project Rules
- **`agy-customizations`** and **`antigravity-guide`** directly govern how we configure project-level rules (e.g. `AGENTS.md`, `GEMINI.md`) in Task T03, ensuring strict adherence to the one-task-at-a-time rule, audit logging, and sandbox security constraints.

### 3.3 Extensibility & Auxiliary Integration
- **`plugin`** and **`ui-plugin-navigation`** provide the mechanisms if we package custom OOPS LAB diagnostic tools or auxiliary execution monitors as Antigravity plugins.

---
*Verified and recorded under task OOPS-20261030-0001-T02.*

