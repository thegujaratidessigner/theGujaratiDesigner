---
type: community
cohesion: 0.13
members: 21
---

# Admin Dashboard & CRUD

**Cohesion:** 0.13 - loosely connected
**Members:** 21 nodes

## Members
- [[AddonManager Sub-Component]] - code - app/admin/packages/_client.tsx
- [[Admin Dashboard Page]] - code - app/admin/page.tsx
- [[Admin Featured Page (Server Component)]] - code - app/admin/featured/page.tsx
- [[Admin Packages Page (Server Component)]] - code - app/admin/packages/page.tsx
- [[Admin Projects Page (Server Component)]] - code - app/admin/projects/page.tsx
- [[Admin Services Page (Server Component)]] - code - app/admin/services/page.tsx
- [[AdminNav()]] - code - app/admin/_components/AdminNav.tsx
- [[AdminNav.tsx]] - code - app/admin/_components/AdminNav.tsx
- [[FeaturedManager Client Component]] - code - app/admin/featured/_client.tsx
- [[GraphicsManager Sub-Component]] - code - app/admin/projects/_client.tsx
- [[POSTPUTDELETE apipackages endpoints]] - code - app/admin/packages/_client.tsx
- [[POSTPUTDELETE apiprojectsgraphics endpoints]] - code - app/admin/projects/_client.tsx
- [[POSTPUTDELETE apiprojectswebsite endpoints]] - code - app/admin/projects/_client.tsx
- [[POSTPUTDELETE apiservices endpoints]] - code - app/admin/services/_client.tsx
- [[PUT apifeatured endpoint]] - code - app/admin/featured/_client.tsx
- [[PackageList Sub-Component]] - code - app/admin/packages/_client.tsx
- [[PackagesManager Client Component]] - code - app/admin/packages/_client.tsx
- [[ProjectsManager Client Component]] - code - app/admin/projects/_client.tsx
- [[ServicesManager Client Component]] - code - app/admin/services/_client.tsx
- [[WebsiteManager Sub-Component]] - code - app/admin/projects/_client.tsx
- [[readData (DB utility, called in home page)]] - code - app/page.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Dashboard_&_CRUD
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Page Server Components]]
- 1 edge to [[_COMMUNITY_Admin Auth & Core]]

## Top bridge nodes
- [[readData (DB utility, called in home page)]] - degree 6, connects to 1 community
- [[Admin Dashboard Page]] - degree 3, connects to 1 community