import classes from './styles/DataTableEmptyRow.css';
import cx from 'clsx';

export default function DataTableEmptyRow() {
  return (
    <tr className={cx(classes.root)}>
      <td />
    </tr>
  );
}
