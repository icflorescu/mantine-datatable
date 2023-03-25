# Changelog

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
