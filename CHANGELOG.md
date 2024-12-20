# Changelog

The following is a list of notable changes to the Mantine DataTable component.  
Minor versions that are not listed in the changelog are bug fixes and small improvements.

## 7.15.1 (2024-12-20)

- Fix [#682](https://github.com/icflorescu/mantine-datatable/issues/682) - request to remove CSS source maps from the dist
- Update dev dependencies to ensure compatibility with Mantine 7.15.1 and Next.js 15 GA
- Fix a few type imports

## 7.14.5 (2024-10-26)

- Remove leftover `console.log` statement

## 7.14.4 (2024-10-26)

- Revert previous commit to fix regression (https://github.com/icflorescu/mantine-datatable/issues/663#issuecomment-2501215033)

## 7.14.3 (2024-10-26)

- Fix [#663](https://github.com/icflorescu/mantine-datatable/issues/663) - buttons not clickable inside emptyState

## 7.14.2 (2024-10-26)

- Fix [#659](https://github.com/icflorescu/mantine-datatable/issues/659) - filter popup not closing after clicking outside
- Fix [#645](https://github.com/icflorescu/mantine-datatable/issues/645) - implement `filterPopoverProps` to allow overriding the default filter popover behavior
- Update dev dependencies to ensure compatibility with Mantine 7.14.2 and Next.js 15
- Update build workflow Node.js version
- Minor docs app fixes

## 7.12.4 (2024-09-04)

- Fix [#627](https://github.com/icflorescu/mantine-datatable/issues/627)
- Fix [#614](https://github.com/icflorescu/mantine-datatable/issues/614)

## 7.12.3 (2024-09-04)

- Fix [#625](https://github.com/icflorescu/mantine-datatable/issues/625) - after implementing row dragging support, inputs inside columns were losing focus

## 7.12.2 (2024-09-04)

- Update dev dependencies to ensure compatibility with Mantine 7.12.2

## 7.11.3 (2024-07-30)

- Update dev dependencies
- Implement drag and drop support (see [#616](https://github.com/icflorescu/mantine-datatable/pull/616))

## 7.11.2 (2024-07-10)

- Update dev dependencies
- Emphasize that PRs should be made against the `next` branch in the README and on the [documentation website](https://icflorescu.github.io/mantine-datatable/)

## 7.11.1 (2024-06-30)

- Add new `paginationWithControls` prop (thanks to [@ValentinJS](https://github.com/ValentinJS) for PR [#611](https://github.com/icflorescu/mantine-datatable/pull/611))
- Minor docs website improvements

## 7.11.0 (2024-06-30)

- Attempt to fix issue [#596](https://github.com/icflorescu/mantine-datatable/issues/596) again, thanks to [@gfazioli](https://github.com/gfazioli) for PR [#608](https://github.com/icflorescu/mantine-datatable/pull/608)
- Update deps to ensure compatibility with Mantine 7.11.0

## 7.10.4 (2024-06-24)

- Revert [#603](https://github.com/icflorescu/mantine-datatable/pull/603) due to issue [#605](https://github.com/icflorescu/mantine-datatable/issues/605)

## 7.10.3 (2024-06-18)

- Fix issue [#596](https://github.com/icflorescu/mantine-datatable/issues/596) (new columns don't appear when added to `useDataTableColumns`), thanks to [@gfazioli](https://github.com/gfazioli) for PR [#603](https://github.com/icflorescu/mantine-datatable/pull/603)
- Update dev dependencies

## 7.10.2 (2024-06-15)

- Update dev dependencies to ensure compatibility with Mantine 7.10.2 and Next.js 14.2.4

## 7.10.1 (2024-06-03)

- Update dev dependencies to ensure compatibility with Mantine 7.10.1
- Add support for sorting by nested property in columns (see PR [#600](https://github.com/icflorescu/mantine-datatable/pull/600))
- Fix issue [#593](https://github.com/icflorescu/mantine-datatable/issues/593) (`cursor: pointer` not showing when using `onRowClick`)

## 7.9.1 (2024-05-10)

- Update dev dependencies to ensure compatibility with Mantine 7.9.1
- Improve row expansion styling to hide bottom border when being rendered in the last row of the table
- Fix [#588](https://github.com/icflorescu/mantine-datatable/issues/588) - `withRowBorders=false` being ignored in the last row
- Add documentation notice about `pinFirstColumn` and `pinLastColumn` not being supported in combination with nested tables

## 7.9.0 (2024-05-03)

- Update dev dependencies to ensure compatibility with Mantine 7.9
- Update GitHub workflow action versions

## 7.8.2 (2024-04-26)

- Add `rowExpansion.expandable` property defining if row can be expanded (see [#579](https://github.com/icflorescu/mantine-datatable/issues/579), by [@camdarley](https://github.com/camdarley))
- Update dev dependencies to ensure compatibility with Mantine 7.8.1, Next.js 14.2.3 and React 18.3

## 7.8.1 (2024-04-12)

- Update all internal `<Text/>` components to output divs instead of paragraphs to avoid issues such as [#570](https://github.com/icflorescu/mantine-datatable/issues/570)

## 7.8.0 (2024-04-12)

- Update peer dependencies to Mantine 7.8
- Remove `useDragToggleColumns` hook, previously deprecated in favor of `useDataTableColumns`
- Make the scroll shadows gentler, especially in dark mode
- Optimize scroll-triggered re-renders by using a `debouncedProcessScrolling` method
- Implement `maxHeight` property

## 7.7.0 (2024-04-04)

- Allow passing getInitialValueInEffect to useLocalStorage hook in useDataTableColumns (see [#560](https://github.com/icflorescu/mantine-datatable/pull/560) by [@Sajarin-M](https://github.com/Sajarin-M))
- Update dev dependencies to ensure compatibility with Mantine 7.7.0
- Update peer deps to exclude Mantine `7.7.1` due to [this bug](https://github.com/mantinedev/mantine/issues/6017) that causes "maximum update depth exceeded"
- Add a default value of `'mantine-datatable'` to `storeColumnsKey` (used as a prefix in the `useDataTableColumns` hook)

## 7.6.1 (2024-03-05)

- Update dev dependencies to ensure compatibility with Mantine 7.6.1 & Next.js 14.1.2

## 7.6.0 (2024-02-28)

- Update dev dependencies to ensure compatibility with Mantine 7.6.0
- Fix [#553](https://github.com/icflorescu/mantine-datatable/issues/553) - loading spinner makes the table too dark in dark mode

## 7.5.0 (2024-01-27)

- Update dev dependencies to ensure compatibility with Mantine 7.5.0

## 7.4.6 (2024-01-21)

- Improve first and last column pinning CSS to allow combining the feature with column groups
- Improve last column pinning CSS to fix a minor glitch in webkit browsers
- A few documentation improvements

## 7.4.5 (2024-01-20)

- Improve column toggling UX & code efficiency
- Update dev dependencies to ensure compatibility with Mantine 7.4.2 and Next.js 14.1

## 7.4.4 (2024-01-17)

- Fix unhandled Runtime Error with column dragging/toggling (PR [#514](https://github.com/icflorescu/mantine-datatable/pull/514))
- Update dev dependencies

## 7.4.3 (2024-01-10)

- Implement the `selectionCheckboxProps` property to allow customizing all selection checkboxes at once

## 7.4.2 (2024-01-10)

- Improve default column toggling behavior

## 7.4.1 (2024-01-08)

- Implement `pinFirstColumn` feature
- Fix minor UI glitch when using highlight on hover and the table contains no records (issue [#508](https://github.com/icflorescu/mantine-datatable/issues/508))
- Expose `tableRef` property to access the table element

## 7.4.0 (2024-01-04)

- Ensure compatibility with Mantine 7.4
- Minor docs improvements

## 7.3.5 (2023-12-29)

- Minor README updates

## 7.3.4 (2023-12-28)

- Minor README improvements

## 7.3.2 (2023-12-21)

- Fix checkbox inside filter popover not working (issue [#481](https://github.com/icflorescu/mantine-datatable/issues/481))

## 7.3.1 (2023-12-21)

- Implement column resizing (see [#490](https://github.com/icflorescu/mantine-datatable/pull/490));
- Deprecate `useDragToggleColumns` hook in favor of `useDataTableColumns`;
- Implement `onRowDoubleClick` and `onCellDoubleClick` callbacks;
- Fix typos in the documentation;
- Update deps to ensure compatibility with Mantine 7.3.2

## 7.3.0 (2023-12-07)

- Implement column dragging and toggling (see [#483](https://github.com/icflorescu/mantine-datatable/pull/483));
- Implement `selectionColumnClassName` and `selectionColumnStyle` properties;
- Update deps to ensure compatibility with Mantine 7.3.0

## 7.1.7 (2023-11-13)

- Make sure to omit `stickyHeader` and `stickyHeaderOffset` properties from inherited Table component props to avoid confusion, since Mantine DataTable header is sticky "as needed"

## 7.1.6 (2023-11-10)

- Add `selectionTrigger` property to allow maximizing the selection area to the entire cell holding the checkbox

## 7.1.5 (2023-11-08)

- Fix backgrounds for selection cell and last column when using `pinLastColumn` feature (see issues [#464](https://github.com/icflorescu/mantine-datatable/issues/464) and [#465](https://github.com/icflorescu/mantine-datatable/issues/465))

## 7.1.4 (2023-11-07)

- Improve shadows positioning CSS

## 7.1.3 (2023-11-07)

- Implement `pinLastColumn` feature
- Add missing `package.json` fields (`main` and `module`)

## 7.1.2 (2023-11-06)

- Switch to `tsup` building, to fix usage issues with Remix & Next.js

## 7.1.1 (2023-11-03)

- Switch to `esm` export only, to fix this issue: https://github.com/icflorescu/mantine-datatable/issues/451  
  This is a potentially breaking change and I'm sorry to do it in a patch release, but the library needs to work with Next.js pages router

## 7.1.0 (2023-11-01)

### First V7 release! 🎉

This is a **major rewrite** of the library internals, with the following goals in mind:

- **Mantine V7 compatibility** - switch the styling approach from CSS-in-JS to PostCSS (or PostCSS modules)
- Make the repo easier to maintain by switching from a monorepo approach to a single-package that includes the source code, documentation and examples; this should also make it easier for new contributors to get started
- Streamline the build process - switch from `esbuild` to plain `tsc` and `postcss` commands
- Rewrite the entire documentation website to make use of Next.js app router and React Server Components; this should also ensure the package will work properly in such an environment

### Since the V7 is a major rewrite, it contains a number of **BREAKING CHANGES**, including but not limited to:

- The `sx` styling properties are no longer supported; use `style`, `className`, `styles` and `classNames` instead
- The column `textAlignment` property was renamed to `textAlign`
- The table `verticalAlignment` property was renamed to `verticalAlign`
- The internal context-menu functionality was removed in favor of using the [Mantine ContextMenu](https://icflorescu.github.io/mantine-contextmenu/) package (built by the same author), which is more flexible and feature-rich
- Some method signatures (such as click handlers) were changed from `(record, index) => ...` to `({ record, index }) => ...` for clarity

## 7.1.0-alpha.1 to alpha-5 (2023-10-01 to 2023-10-31)

- Initial V7 alpha releases

## 6.0.0 (2023-10-01)

- Bump version to 6.0.0 to match the compatible versions of `@mantine/hooks` and `@mantine/core`. From now on, let's keep the major version of `mantine-datatable` in sync with the major version of Mantine core

## 2.9.11 (2023-08-11)

- The internal `useElementOuterSize` hook now return floats instead of integers, for better shadow rendering

## 2.9.10 (2023-08-11)

- Use a custom `useElementOuterSize` hook instead of Mantine's `useElementSize` to avoid [this bug](https://github.com/icflorescu/mantine-datatable/issues/404)

## 2.9.9 (2023-08-10)

- Fix `@mantine/core` & `@mantine/hooks` peer dependencies version numbers in `package.json` to `>=6 <=6.0.17 || >=6.0.19`

## 2.9.8 (2023-08-10)

- Try to lock `@mantine/hooks` and `@mantine/core` peer dependencies to `!= 6.0.18`, to avoid a [bug](https://github.com/icflorescu/mantine-datatable/issues/398) introduced by the [`use-element-size` hook](https://mantine.dev/hooks/use-element-size/)

## 2.9.3 (2023-07-30)

- Fix a minor display bug when using rows selection inside nested tables (see [#387](https://github.com/icflorescu/mantine-datatable/issues/387))

## 2.9.0 (2023-07-20)

- Relax `customRowAttributes` & `customCellAttributes` return types to `Record<string, unknown>` in order to support custom event handlers (see [#380](https://github.com/icflorescu/mantine-datatable/discussions/380))

## 2.8.3 (2023-07-12)

- Fix a bug when filtering popover triggers sorting button (see [#368](https://github.com/icflorescu/mantine-datatable/issues/368))

## 2.8.0 (2023-07-05)

- Make records selection feature optional for generic usage (see [#361](https://github.com/icflorescu/mantine-datatable/issues/361))

## 2.7.1 (2023-06-29)

- Fix row context menu not showing properly when used on tables inside modals (see [#354](https://github.com/icflorescu/mantine-datatable/issues/354))

## 2.7.0 (2023-06-28)

- Add `defaultColumnProps` (see [#340](https://github.com/icflorescu/mantine-datatable/issues/340))

## 2.6.5 (2023-06-27)

- Relax `peerDependencies` (to Mantine 6.x)

## 2.6.0 (2023-06-12)

- Implement column groups (issue [#207](https://github.com/icflorescu/mantine-datatable/issues/207) / PR [#330](https://github.com/icflorescu/mantine-datatable/pull/330) / thanks to [@MatthijsMud](https://github.com/MatthijsMud))
- Accept `scrollAreaProps` (issue [#327](https://github.com/icflorescu/mantine-datatable/issues/327)/ PR [#328](https://github.com/icflorescu/mantine-datatable/issues/327))

## 2.5.6 (2023-06-06)

- Allow `idAccessor` to be a string **or** a function, in order to support composite keys (issue #315)

## 2.5.5 (2023-06-01)

- Improve filtering support documentation

## 2.5.1 (2023-05-22)

- Implement filtering support, thanks to @MatthijsMud (PR #297)

## 2.5.0 (2023-05-17)

- Slight change in the default sorting behavior (issue #295)

## 2.4.9 (2023-04-24)

- Implement column footers (issue #252)

## 2.4.7 (2023-04-21)

- Internal refactoring of the pagination component

## 2.4.6 (2023-04-20)

- Make `rowExpansion.expanded.onRecordIdsChange` optional
- Implement `noHeader` property to hide the table header (issue #253)
- Add nested tables examples

## 2.4.5 (2023-04-19)

- Improve sort icons accessibility (issue #263)

## 2.4.4 (2023-04-18)

- Fix `paginationColor` not being applied correctly to the page size selector (issue #261)

## 2.4.3 (2023-04-18)

- Implement additional properies to improve accesibility: `allRecordsSelectionCheckboxProps`, `getRecordSelectionCheckboxProps`, `getPaginationControlProps`

## 2.4.1 (2023-04-13)

- Pass the original event to the `onCellClick` and `onRowClick` callbacks

## 2.4.0 (2023-04-13)

- Implement custom sort icons

## 2.3.2 (2023-04-03)

- Prevent row click when clicking the selector cell (issue #238)

## 2.3.0 (2023-04-01)

- Export utility functions: `differenceBy`, `getValueAtPath`, `humanize`, `uniqBy`

## 2.2.6 (2023-03-25)

- Add Jest tests (thanks to @AlexcastroDev)
- Improve sort column header accessibility (thanks to @arperry)

## 2.2.1 (2023-03-16)

- Minor performance improvements
- Fix left scroll shadow (when row selection enabled) regression due to Mantine 6.x upgrade

## 2.2.0 (2023-03-16)

- Update to TypeScript 5.x

## 2.1.2 (2023-03-16)

- Add `scrollViewportRef` property to access the scroll viewport element
- Adjust the infinite scrolling example to use the new `scrollViewportRef` property

## 2.1.0 (2023-03-16)

- Add `onScrollToTop`, `onScrollToBottom`, `onScrollToLeft` and `onScrollToRight` callbacks
- Add infinite scrolling example

## 2.0.0 (2023-03-10)

- Ensure Mantine 6.x compatibility

## 1.8.8 (2023-03-10)

- Switch from `tabler-icons-react` to `@tabler/icons-react`

## 1.8.7 (2023-03-10)

- Fix incorrect sorting arrow direction (#191)
- Decrease space between column name and sorting arrow

## 1.8.6 (2023-02-20)

- Fix row column border color not being applied correctly

## 1.8.1 (2023-02-06)

- Improve `bodyRef` property type

## 1.8.0 (2023-02-06)

- Fix `noWrap` column property not working
- Expose `bodyRef` property to access the table body element (useful for animating table row operations with [AutoAnimate](https://auto-animate.formkit.com/))

## 1.7.38 (2023-02-01)

- Ensure footer background respects theme color scheme

## 1.7.37 (2023-02-01)

- Implement `noWrap` column property
- Use explicit type imports in package

## 1.7.35 (2023-01-22)

- Implement `defaultColumnRender` property to customize the default column render function

## 1.7.28 (2022-12-16)

- Implement additional row styling properties (`rowClassName`, `rowStyle`, `rowSx`)

## 1.7.24 (2022-12-07)

- Implement the [custom row / cell attributes](https://icflorescu.github.io/mantine-datatable/examples/custom-row-or-cell-attributes) feature

## 1.7.17 (2022-11-15)

- Update Mantine to 3.8.0 & TypeScript to 4.9.3

## 1.7.16 (2022-11-15)

- Update Mantine to 3.7.2

## 1.7.15 (2022-11-08)

- Update Mantine to 3.7.1

## 1.7.14 (2022-11-02)

- Implement [#116](https://github.com/icflorescu/mantine-datatable/issues/116): custom loader component
- Add `loaderColor` property

## 1.7.13 (2022-10-31)

- Implement [#100](https://github.com/icflorescu/mantine-datatable/issues/100): page size selector

## 1.7.12 (2022-10-31)

- Fix [#110](https://github.com/icflorescu/mantine-datatable/issues/110): context-menu positioning bug in RTL display mode

## 1.7.11 (2022-10-25)

- Implement [#101](https://github.com/icflorescu/mantine-datatable/issues/101): `isRecordSelectable: (record: T) => boolean` property to prevent the selection of certain records

## 1.7.10 (2022-10-25)

- Fix [#102](https://github.com/icflorescu/mantine-datatable/issues/102): `paginationText` was overriden when no records were found
- Add `loadingText` option

## 1.7.9 (2022-10-15)

- Implement row expansion [controlled mode](https://icflorescu.github.io/mantine-datatable/examples/row-expansion-examples)
- Implement margin props on the DataTable component (m, my, mx, mt, mb, ml, mr)

## 1.7.8 (2022-10-14)

- Add [cell click handlers](https://icflorescu.github.io/mantine-datatable/examples/handling-cell-clicks)
- Add `recordIndex` as a second parameter on various hadlers and callbacks (such as `onRowClick`, column `render`, etc.)

## 1.7.0 (2022-09-26)

- Implement the [row expansion feature](https://icflorescu.github.io/mantine-datatable/examples/expanding-rows)

## 1.1.0 (2022-09-06)

- Drop `lodash` peer dependency

## 1.0.0 (2022-08-23)

- Initial release
