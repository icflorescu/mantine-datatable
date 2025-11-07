# Mantine DataTable - Copilot Instructions

This is a dual-purpose repository containing both the **Mantine DataTable** component package and its documentation website. Understanding this hybrid architecture is crucial for effective development.

## Project Architecture

### Dual Repository Structure
- **Package code**: `package/` - The actual DataTable component exported to npm
- **Documentation site**: `app/`, `components/` - Next.js app with examples and docs
- **Build outputs**: Package builds to `dist/`, docs build for GitHub Pages deployment

### Package Development Flow
```bash
# Core development commands (use pnpm, not yarn despite legacy docs)
pnpm dev              # Start Next.js dev server for docs/examples
pnpm build:package    # Build package only (tsup + postcss)
pnpm build:docs       # Build documentation site
pnpm build            # Build both package and docs
pnpm lint             # ESLint + TypeScript checks
```

### Component Architecture Pattern
The DataTable follows a **composition-based architecture** with specialized sub-components:

```typescript
// Main component in package/DataTable.tsx
DataTable -> {
  DataTableHeader,
  DataTableRow[],
  DataTableFooter,
  DataTablePagination,
  DataTableLoader,
  DataTableEmptyState
}
```

Each sub-component has its own `.tsx`, `.css`, and sometimes `.module.css` files. Always maintain this parallel structure when adding features.

## Development Conventions

### Import Alias Pattern
Examples use `import { DataTable } from '__PACKAGE__'` - this resolves to the local package during development. Never import from `mantine-datatable` in examples.

### TypeScript Patterns
- **Generic constraints**: `DataTable<T>` where T extends record type
- **Prop composition**: Props inherit from base Mantine components (TableProps, etc.)
- **Accessor pattern**: Use `idAccessor` prop for custom ID fields, defaults to `'id'`

### CSS Architecture
- **Layered imports**: `styles.css` imports all component styles
- **CSS layers**: `@layer mantine, mantine-datatable` for proper specificity
- **Utility classes**: Defined in `utilityClasses.css` for common patterns
- **CSS variables**: Dynamic values injected via `cssVariables.ts`

### Hook Patterns
Custom hooks follow the pattern `useDataTable*` and are located in `package/hooks/`:
- `useDataTableColumns` - Column management and persistence
- `useRowExpansion` - Row expansion state
- `useLastSelectionChangeIndex` - Selection behavior

## Documentation Development

### Example Structure
Each example in `app/examples/` follows this pattern:
```
feature-name/
├── page.tsx                    # Next.js page with controls
├── FeatureExample.tsx          # Actual DataTable implementation
└── FeaturePageContent.tsx      # Documentation content
```

### Code Block Convention
Use the `CodeBlock` component for syntax highlighting. Example files should be minimal and focused on demonstrating a single feature clearly.

## Data Patterns

### Record Structure
Examples use consistent data shapes:
- `companies.json` - Basic company data with id, name, address
- `employees.json` - Employee data with departments/relationships  
- `async.ts` - Simulated API calls with delay/error simulation

### Selection Patterns
- **Gmail-style additive selection**: Shift+click for range selection
- **Trigger modes**: `'checkbox'` | `'row'` | `'cell'`
- **Custom selection logic**: Use `isRecordSelectable` for conditional selection

## Build System

### Package Build (tsup)
- **ESM**: `tsup.esm.ts` - Modern module format
- **CJS**: `tsup.cjs.ts` - CommonJS compatibility  
- **Types**: `tsup.dts.ts` - TypeScript declarations
- **CSS**: PostCSS processes styles to `dist/`

### Documentation Deployment
- **GitHub Pages**: `output: 'export'` in `next.config.js`
- **Base path**: `/mantine-datatable` when `GITHUB_PAGES=true`
- **Environment injection**: Package version, NPM downloads via build-time fetch

## Common Patterns

### Adding New Features
1. Create component in `package/` with `.tsx` and `.css` files
2. Add to main `DataTable.tsx` component composition
3. Export new types from `package/types/index.ts`
4. Create example in `app/examples/new-feature/`
5. Update main navigation in `app/config.ts`

### Styling New Components
- Use CSS custom properties for theming
- Follow existing naming: `.mantine-datatable-component-name`
- Import CSS in `package/styles.css`
- Add utility classes to `utilityClasses.css` if reusable

### TypeScript Integration
- Extend base Mantine props where possible
- Use composition over inheritance for prop types
- Export all public types from `package/types/index.ts`
- Maintain strict null checks and proper generics

## Performance Considerations

- **Virtualization**: Not implemented - DataTable handles reasonable record counts (< 1000s)
- **Memoization**: Use `useMemo` for expensive column calculations
- **CSS-in-JS**: Avoided in favor of CSS modules for better performance
- **Bundle size**: Keep dependencies minimal (only Mantine + React)