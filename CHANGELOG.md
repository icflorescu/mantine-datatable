# Changelog

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
