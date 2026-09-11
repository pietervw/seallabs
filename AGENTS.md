<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Verification and delivery

- `npm run verify:fast` is the routine local and pull-request gate (lint and TypeScript checks).
- `npm run verify` adds the production build; `npm run verify:full` is the stable alias for the most complete available check.
- Run the relevant verification before declaring work complete. Open a PR for Pete to review and merge; do not push directly to `master`.
