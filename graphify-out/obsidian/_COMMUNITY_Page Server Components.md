---
type: community
cohesion: 0.20
members: 10
---

# Page Server Components

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[FeaturedProject Type (from Portfolio section)]] - code - app/page.tsx
- [[Home()]] - code - app/page.tsx
- [[ProjectsPage()]] - code - app/admin/projects/page.tsx
- [[ServiceItem Type (from Services section)]] - code - app/page.tsx
- [[fetchGoogleReviews (called in home page)]] - code - app/page.tsx
- [[fetchGoogleReviews()]] - code - lib/reviews.ts
- [[page.tsx_4]] - code - app/admin/projects/page.tsx
- [[page.tsx]] - code - app/page.tsx
- [[readData()]] - code - lib/db.ts
- [[reviews.ts]] - code - lib/reviews.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Page_Server_Components
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Admin Dashboard & CRUD]]
- 1 edge to [[_COMMUNITY_API Routes]]

## Top bridge nodes
- [[Home()]] - degree 7, connects to 1 community
- [[readData()]] - degree 3, connects to 1 community