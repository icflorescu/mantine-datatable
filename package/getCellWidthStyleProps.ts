export default function getCellWidthStyleProps({
  width,
  propertyName,
  expandedColumnPropertyName,
}: {
  width: string | number | undefined;
  propertyName: string;
  expandedColumnPropertyName: string | undefined;
}) {
  return propertyName === expandedColumnPropertyName ? { width: '100%' } : { width, minWidth: width, maxWidth: width };
}
