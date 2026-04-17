@AGENTS.md

## Codebase Knowledge Graph (RAG)

A pre-built knowledge graph of this codebase lives in `graphify-out/`. Use it as a RAG system before answering architecture questions, tracing data flows, or finding where something is defined.

- `graphify-out/graph.json` — full graph (354 nodes, 425 edges, 65 communities)
- `graphify-out/GRAPH_REPORT.md` — god nodes, surprising connections, community map
- `graphify-out/graph.html` — interactive visual (open in browser)

**When to consult the graph:**
- Before searching for where something is defined or how data flows
- When asked about architecture, component relationships, or API structure
- When tracing auth, routing, or data-loading patterns

**Key facts from the graph:**
- `readData` / `writeData` (lib/db.ts) is the central data layer — all API routes and server components go through it
- `proxy()` (proxy.ts) is the auth boundary — it guards all `/admin/*` routes via `verifySessionToken`
- Admin pages follow a server/client split: server page fetches data via `readData`, passes it to a `*Manager` client component
- Portfolio is split: graphics (lightbox, image grid) and website (WordPress mShots screenshots)
- The design portfolio (public/portfolio/graphics/) contains product packaging, social media, logo, brand identity, 2D, and printables work

**How to query the graph:**
Run `/graphify query "<question>"` to do a BFS traversal and get a graph-grounded answer.
To rebuild after code changes: `/graphify --update`
