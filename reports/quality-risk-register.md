# Quality Risk Register

| Risk | Severity | Evidence | Fixed now? | Follow-up recommendation |
|---|---|---|---|---|
| Missing ignore rules may lead to accidental commits of build/dependency artifacts | High | `dist/`, `node_modules/`, `tsconfig.tsbuildinfo` appeared as untracked before fix | Yes | Keep `.gitignore` reviewed when new tooling outputs are introduced |
| Large production bundle warning (>500kB) may impact load performance | Medium | `npm run build` warning from Vite/Rollup chunk-size threshold | No | Plan code-splitting and route/lazy-loading pass without changing musical-domain behavior |
| Moderate transitive dependency vulnerabilities | Medium | `npm install` audit summary reported 5 moderate vulnerabilities | No | Run targeted `npm audit` triage and apply non-breaking updates with full CI verification |
| Boundary-policy enforcement relies on documentation only | Low | `src/shared/README.md` notes social enforcement | Partially | Add import-boundary lint rules in a dedicated architecture-governance prompt |
