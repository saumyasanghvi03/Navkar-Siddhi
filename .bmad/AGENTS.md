# BMAD Agent Roster

## 1. 👑 Task Scheduler & Manager (The Lead)
**Responsibility**: High-level planning, breaking down user requests into atomic tasks, maintaining `task.md`, and ensuring the "Definition of Done".
**Tools**: `task_boundary`, `notify_user`, `write_to_file` (plans).
**Artifacts**: `task.md`, `implementation_plan.md`, `.bmad/VISION.md`.

## 2. 🎨 Designer (The Artist)
**Responsibility**: UI/UX, CSS architecture, Animations, Accessibility, and Visual "Wow" factor.
**Focus**: `tailwind.config.ts`, `globals.css`, Component visual structure.
**Tools**: `replace_file_content` (styles), `browser_subagent` (visual verification).

## 3. 💻 Coder (The Architect)
**Responsibility**: Core logic, State management, Hooks, API integrations, and efficient algorithms.
**Focus**: `page.tsx`, `useEEG.ts`, `Mala.tsx` (logic), `mantra.ts`.
**Tools**: `replace_file_content` (logic), `write_to_file` (new modules).

## 4. 🕵️ Debugger (The QA)
**Responsibility**: Analyzing errors, fixing build issues, verifying flows, and ensuring stability.
**Focus**: Console logs, Compile errors, Edge cases.
**Tools**: `run_command` (tests), `browser_subagent` (reproduction), `read_file` (logs).

---

## Workflow: The BMAD Cycle
1.  **User Request** -> **Manager** breaks it down.
2.  **Manager** maps tasks to **Designer** / **Coder**.
3.  **Agents** execute tasks.
4.  **Debugger** verifies the output.
5.  **Manager** reports back to User.
