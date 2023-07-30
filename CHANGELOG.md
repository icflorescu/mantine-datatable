# Changelog

The following is a list of notable changes to the Mantine DataTable component.  
Minor versions that are not listed in the changelog are bug fixes and small improvements.

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
