import { Checkbox, Code, SegmentedControl, Text, rem } from '@mantine/core';
import { useId } from '@mantine/hooks';
import clsx from 'clsx';
import classes from './CheckableSegmentedControl.module.css';

export type CheckableSegmentedControlProps = {
  className?: string;
  label: string;
  documentAs?: string;
  data: string[];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  value: string;
  onChange: (value: string) => void;
};

export function CheckableSegmentedControl({
  className,
  label,
  documentAs,
  data,
  checked,
  onCheckedChange,
  value,
  onChange,
}: CheckableSegmentedControlProps) {
  const id = useId();
  return (
    <div className={clsx(classes.root, className)}>
      <Text
        className={classes.label}
        size="sm"
        component="label"
        htmlFor={id}
        data-search={documentAs ? true : undefined}
      >
        {label}
      </Text>
      {documentAs && <Code hidden>{documentAs}</Code>}
      <div className={classes.inputs}>
        <Checkbox id={id} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
        <SegmentedControl
          style={{ width: rem(160) }}
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
