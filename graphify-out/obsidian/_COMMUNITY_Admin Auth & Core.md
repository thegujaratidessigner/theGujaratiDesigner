---
type: community
cohesion: 0.10
members: 24
---

# Admin Auth & Core

**Cohesion:** 0.10 - loosely connected
**Members:** 24 nodes

## Members
- [[Admin Layout]] - code - app/admin/layout.tsx
- [[Admin Login Page]] - code - app/admin/login/page.tsx
- [[Auth Login API Route]] - code - app/api/auth/login/route.ts
- [[Auth Logout API Route]] - code - app/api/auth/logout/route.ts
- [[Auth Utility (libauth)]] - code - lib/auth.ts
- [[COOKIE_NAME Constant]] - code - lib/auth.ts
- [[COOKIE_NAME constant (from libauth)]] - code - proxy.ts
- [[HMAC-SHA256 Session Token Auth]] - code - lib/auth.ts
- [[LoginForm Component]] - code - app/admin/login/page.tsx
- [[POST apiauthlogin endpoint]] - code - app/admin/login/page.tsx
- [[Testimonials.tsx]] - code - app/_components/sections/Testimonials.tsx
- [[auth.ts]] - code - lib/auth.ts
- [[checkPassword Function]] - code - lib/auth.ts
- [[checkPassword()]] - code - lib/auth.ts
- [[createSessionToken Function]] - code - lib/auth.ts
- [[createSessionToken()]] - code - lib/auth.ts
- [[hmacSign()]] - code - lib/auth.ts
- [[next()]] - code - app/_components/sections/Testimonials.tsx
- [[prev()]] - code - app/_components/sections/Testimonials.tsx
- [[proxy()]] - code - proxy.ts
- [[proxy.ts]] - code - proxy.ts
- [[verifySessionToken (from libauth)]] - code - proxy.ts
- [[verifySessionToken Function]] - code - lib/auth.ts
- [[verifySessionToken()]] - code - lib/auth.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Auth_&_Core
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_API Routes]]
- 1 edge to [[_COMMUNITY_Admin Dashboard & CRUD]]

## Top bridge nodes
- [[proxy()]] - degree 8, connects to 1 community
- [[createSessionToken()]] - degree 3, connects to 1 community
- [[Admin Layout]] - degree 2, connects to 1 community
- [[checkPassword()]] - degree 2, connects to 1 community