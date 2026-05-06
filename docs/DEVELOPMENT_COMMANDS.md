# Development Commands

## Local or Codespaces workflow

1. Install dependencies:
   - `npm ci`
2. Start development server:
   - `npm run dev`
3. Run quality checks:
   - `npm run typecheck`
   - `npm run lint`
   - `npm test`
   - `npm run build`

## GitHub Actions verification

After pushing a branch:
1. Open the repository on GitHub.
2. Open the **Actions** tab.
3. Select the latest **CI** run for your branch/PR.
4. Confirm all required steps pass: Install, Typecheck, Lint, Test, Build.

## Preview platform verification (if connected)

### Vercel
1. Open the PR in GitHub.
2. Open the Vercel preview link from PR checks.
3. Confirm the page renders "Harmonia 31" and loads without console errors.

### Netlify
1. Open the deploy-preview link from PR checks.
2. Confirm the page renders "Harmonia 31" and loads without console errors.

## Notes

- No private rule corpus is required for these checks.
- Private-rule ingestion remains deferred as `awaiting-private-rule-pack`.
