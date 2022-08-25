export default function getCellWidthStyleProps({
  width,
  accessor,
  expandedColumnAccessor,
}: {
  width: string | number | undefined;
  accessor: string;
  expandedColumnAccessor: string | undefined;
}) {
  return accessor === expandedColumnAccessor ? { width: '100%' } : { width, minWidth: width, maxWidth: width };
}
