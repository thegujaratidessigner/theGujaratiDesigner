---
type: community
cohesion: 0.24
members: 20
---

# API Routes

**Cohesion:** 0.24 - loosely connected
**Members:** 20 nodes

## Members
- [[DELETE()]] - code - app/api/services/[id]/route.ts
- [[GET()]] - code - app/api/services/route.ts
- [[POST()]] - code - app/api/services/route.ts
- [[PUT()]] - code - app/api/services/[id]/route.ts
- [[db.ts]] - code - lib/db.ts
- [[filename()]] - code - app/api/projects/[type]/[id]/route.ts
- [[generateId()_1]] - code - lib/db.ts
- [[isAddonSection()]] - code - app/api/packages/[category]/[id]/route.ts
- [[isMain()]] - code - app/api/packages/[category]/[id]/route.ts
- [[isValidType()]] - code - app/api/projects/[type]/[id]/route.ts
- [[route.ts_1]] - code - app/api/auth/login/route.ts
- [[route.ts]] - code - app/api/auth/logout/route.ts
- [[route.ts_6]] - code - app/api/featured/route.ts
- [[route.ts_5]] - code - app/api/packages/[category]/[id]/route.ts
- [[route.ts_4]] - code - app/api/packages/[category]/route.ts
- [[route.ts_3]] - code - app/api/projects/[type]/[id]/route.ts
- [[route.ts_2]] - code - app/api/projects/[type]/route.ts
- [[route.ts_8]] - code - app/api/services/[id]/route.ts
- [[route.ts_7]] - code - app/api/services/route.ts
- [[writeData()]] - code - lib/db.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/API_Routes
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_Admin Auth & Core]]
- 1 edge to [[_COMMUNITY_Page Server Components]]

## Top bridge nodes
- [[POST()]] - degree 13, connects to 1 community
- [[GET()]] - degree 9, connects to 1 community
- [[db.ts]] - degree 3, connects to 1 community