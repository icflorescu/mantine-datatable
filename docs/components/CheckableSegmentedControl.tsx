import { Checkbox, createStyles, SegmentedControl, Text } from '@mantine/core';
import { useId } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    gap: 4,
    flexDirection: 'column',
    ['@media (min-width: 375px)']: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  label: {
    width: 130,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  inputs: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginLeft: 18,
    ['@media (min-width: 375px)']: {
      marginLeft: 0,
    },
  },
  checkbox: {
    fontSize: 0,
  },
  segmentedControl: {
    width: 160,
  },
}));

export type CheckableSegmentedControlProps = {
  className?: string;
  label: string;
  data: string[];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  value: string;
  onChange: (value: string) => void;
};

export default function CheckableSegmentedControl({
  className,
  label,
  data,
  checked,
  onCheckedChange,
  value,
  onChange,
}: CheckableSegmentedControlProps) {
  const id = useId();
  const { cx, classes } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Text className={classes.label} size="sm" component="label" htmlFor={id}>
        {label}
      </Text>
      <div className={classes.inputs}>
        <Checkbox
          id={id}
          className={classes.checkbox}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <SegmentedControl
          className={classes.segmentedControl}
          size="xs"
          data={data}
          disabled={!checked}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
