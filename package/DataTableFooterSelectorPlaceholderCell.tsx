import classes from './styles/DataTableFooterSelectorPlaceholderCell.css';
import cx from 'clsx';


export default function DataTableFooterSelectorPlaceholderCell({ shadowVisible }: { shadowVisible: boolean }) {
  return <th className={cx(classes.root, { [classes.shadowVisible]: shadowVisible })}></th>;
}
