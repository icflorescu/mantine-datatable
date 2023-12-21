'use client';

import { Code, Paper, Switch, type MantineSize } from '@mantine/core';
import type { DataTableVerticalAlign } from '__PACKAGE__';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { CheckableSegmentedControl } from '~/components/CheckableSegmentedControl';
import { CodeBlock } from '~/components/CodeBlock';
import { BasicTablePropertiesExample } from './BasicTablePropertiesExample';
import classes from './BasicTablePropertiesPageContent.module.css';

const INITIAL_BORDER_RADIUS: MantineSize = 'sm';
const INITIAL_SHADOW: MantineSize = 'sm';
const INITIAL_HORIZONTAL_SPACING: MantineSize = 'xs';
const INITIAL_VERTICAL_SPACING: MantineSize = 'xs';
const INITIAL_FONT_SIZE: MantineSize = 'sm';
const INITIAL_VERTICAL_ALIGN: DataTableVerticalAlign = 'center';

const MANTINE_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
const VERTICAL_ALIGNS: DataTableVerticalAlign[] = ['top', 'center', 'bottom'];

export function BasicTablePropertiesPageContent({ initialCode }: { initialCode: string }) {
  const [withTableBorder, setWithTableBorder] = useState(false);
  const [withRowBorders, setWithRowBorders] = useState(true);
  const [noHeader, setNoHeader] = useState(false);
  const [customizeBorderRadius, setCustomizeBorderRadius] = useState(false);
  const [borderRadius, setBorderRadius] = useState<MantineSize>(INITIAL_BORDER_RADIUS);
  const [customizeShadow, setCustomizeShadow] = useState(false);
  const [shadow, setShadow] = useState<MantineSize>(INITIAL_BORDER_RADIUS);
  const [withColumnBorders, setWithColumnBorders] = useState(false);
  const [striped, setStriped] = useState(false);
  const [highlightOnHover, setHighlightOnHover] = useState(false);
  const [customizeHorizontalSpacing, setCustomizeHorizontalSpacing] = useState(false);
  const [horizontalSpacing, setHorizontalSpacing] = useState<MantineSize>(INITIAL_HORIZONTAL_SPACING);
  const [customizeVerticalSpacing, setCustomizeVerticalSpacing] = useState(false);
  const [verticalSpacing, setVerticalSpacing] = useState<MantineSize>(INITIAL_VERTICAL_SPACING);
  const [customizeFz, setCustomizeFz] = useState(false);
  const [fz, setFz] = useState<MantineSize>(INITIAL_FONT_SIZE);
  const [customizeVerticalAlign, setCustomizeVerticalAlign] = useState(false);
  const [verticalAlign, setVerticalAlign] = useState<DataTableVerticalAlign>(INITIAL_VERTICAL_ALIGN);

  useEffect(() => {
    if (!withTableBorder) setCustomizeBorderRadius(false);
  }, [withTableBorder]);

  useEffect(() => {
    if (!customizeShadow) setShadow(INITIAL_SHADOW);
  }, [customizeShadow]);

  useEffect(() => {
    if (customizeBorderRadius) {
      setWithTableBorder(true);
    } else {
      setBorderRadius(INITIAL_BORDER_RADIUS);
    }
  }, [customizeBorderRadius]);

  useEffect(() => {
    if (!customizeHorizontalSpacing) setHorizontalSpacing(INITIAL_HORIZONTAL_SPACING);
  }, [customizeHorizontalSpacing]);

  useEffect(() => {
    if (!customizeVerticalSpacing) setVerticalSpacing(INITIAL_VERTICAL_SPACING);
  }, [customizeVerticalSpacing]);

  const adjustCode = useCallback(
    () =>
      initialCode
        .replace(/( +)withTableBorder=.*\n/, (_, spaces) => (withTableBorder ? `${spaces}withTableBorder\n` : ''))
        .replace(/( +)withRowBorders=.*\n/, (_, spaces) => (withRowBorders ? '' : `${spaces}withRowBorders={false}\n`))
        .replace(/( +)noHeader=.*\n/, (_, spaces) => (noHeader ? `${spaces}noHeader\n` : ''))
        .replace(/( +)borderRadius=.*\n/, (_, spaces) =>
          customizeBorderRadius ? `${spaces}borderRadius="${borderRadius}"\n` : ''
        )
        .replace(/( +)shadow=.*\n/, (_, spaces) => (customizeShadow ? `${spaces}shadow="${shadow}"\n` : ''))
        .replace(/( +)withColumnBorders=.*\n/, (_, spaces) => (withColumnBorders ? `${spaces}withColumnBorders\n` : ''))
        .replace(/( +)striped=.*\n/, (_, spaces) => (striped ? `${spaces}striped\n` : ''))
        .replace(/( +)highlightOnHover=.*\n/, (_, spaces) => (highlightOnHover ? `${spaces}highlightOnHover\n` : ''))
        .replace(/( +)horizontalSpacing=.*\n/, (_, spaces) =>
          customizeHorizontalSpacing ? `${spaces}horizontalSpacing="${horizontalSpacing}"\n` : ''
        )
        .replace(/( +)verticalSpacing=.*\n/, (_, spaces) =>
          customizeVerticalSpacing ? `${spaces}verticalSpacing="${verticalSpacing}"\n` : ''
        )
        .replace(/( +)fz=.*\n/, (_, spaces) => (customizeFz ? `${spaces}fz="${fz}"\n` : ''))
        .replace(/( +)verticalAlign=.*\n/, (_, spaces) =>
          customizeVerticalAlign ? `${spaces}verticalAlign="${verticalAlign}"\n` : ''
        ),
    [
      initialCode,
      withTableBorder,
      withRowBorders,
      noHeader,
      customizeBorderRadius,
      borderRadius,
      customizeShadow,
      shadow,
      withColumnBorders,
      striped,
      highlightOnHover,
      customizeHorizontalSpacing,
      horizontalSpacing,
      customizeVerticalSpacing,
      verticalSpacing,
      customizeFz,
      fz,
      customizeVerticalAlign,
      verticalAlign,
    ]
  );

  const [code, setCode] = useState(adjustCode());

  useEffect(() => {
    setCode(adjustCode());
  }, [adjustCode]);

  return (
    <>
      <Paper className={clsx(classes.controlGroups)} mt="lg" mb="xl" p="md" withBorder>
        <div className={classes.controls}>
          <Switch
            className={classes.control}
            label="Row borders"
            checked={withRowBorders}
            onChange={() => setWithRowBorders((v) => !v)}
          />
          <Code hidden>Row borders, withRowBorders</Code>
          <Switch
            className={classes.control}
            label="Column borders"
            checked={withColumnBorders}
            onChange={() => setWithColumnBorders((v) => !v)}
          />
          <Code hidden>Column borders, withColumnBorders</Code>
          <Switch
            className={classes.control}
            label="Striped"
            checked={striped}
            onChange={() => setStriped((v) => !v)}
          />
          <Code hidden>Striped</Code>
          <Switch
            className={classes.control}
            label="Highlight on hover"
            checked={highlightOnHover}
            onChange={() => setHighlightOnHover((v) => !v)}
          />
          <Code hidden>Highlight on hover, highlightOnHover</Code>
          <Switch
            className={classes.control}
            label="Table border"
            checked={withTableBorder}
            onChange={() => setWithTableBorder((v) => !v)}
          />
          <Code hidden>Table border, withTableBorder</Code>
          <Switch
            className={classes.control}
            label="No header"
            checked={noHeader}
            onChange={() => setNoHeader((v) => !v)}
          />
          <Code hidden>No header, noHeader</Code>
        </div>
        <div className={classes.controls}>
          <CheckableSegmentedControl
            className={classes.control}
            label="Shadow"
            documentAs="shadow"
            data={MANTINE_SIZES}
            checked={customizeShadow}
            onCheckedChange={setCustomizeShadow}
            value={shadow}
            onChange={(value) => setShadow(value as MantineSize)}
          />
          <CheckableSegmentedControl
            className={classes.control}
            label="Horizontal spacing"
            documentAs="horizontalSpacing"
            data={MANTINE_SIZES}
            checked={customizeHorizontalSpacing}
            onCheckedChange={setCustomizeHorizontalSpacing}
            value={horizontalSpacing}
            onChange={(value) => setHorizontalSpacing(value as MantineSize)}
          />
          <CheckableSegmentedControl
            className={classes.control}
            label="Vertical spacing"
            documentAs="verticalSpacing"
            data={MANTINE_SIZES}
            checked={customizeVerticalSpacing}
            onCheckedChange={setCustomizeVerticalSpacing}
            value={verticalSpacing}
            onChange={(value) => setVerticalSpacing(value as MantineSize)}
          />
          <CheckableSegmentedControl
            className={classes.control}
            label="Font size"
            documentAs="fontSize"
            data={MANTINE_SIZES}
            checked={customizeFz}
            onCheckedChange={setCustomizeFz}
            value={fz}
            onChange={(value) => setFz(value as MantineSize)}
          />
          <CheckableSegmentedControl
            className={classes.control}
            label="Border radius"
            documentAs="borderRadius"
            data={MANTINE_SIZES}
            checked={customizeBorderRadius}
            onCheckedChange={setCustomizeBorderRadius}
            value={borderRadius}
            onChange={(value) => setBorderRadius(value as MantineSize)}
          />
          <CheckableSegmentedControl
            className={classes.control}
            label="Vertical alignment"
            documentAs="verticalAlign"
            data={VERTICAL_ALIGNS}
            checked={customizeVerticalAlign}
            onCheckedChange={setCustomizeVerticalAlign}
            value={verticalAlign}
            onChange={(value) => setVerticalAlign(value as DataTableVerticalAlign)}
          />
        </div>
      </Paper>
      <BasicTablePropertiesExample
        withTableBorder={withTableBorder}
        withRowBorders={withRowBorders}
        noHeader={noHeader}
        customizeBorderRadius={customizeBorderRadius}
        borderRadius={borderRadius}
        customizeShadow={customizeShadow}
        shadow={shadow}
        withColumnBorders={withColumnBorders}
        striped={striped}
        highlightOnHover={highlightOnHover}
        customizeHorizontalSpacing={customizeHorizontalSpacing}
        horizontalSpacing={horizontalSpacing}
        customizeVerticalSpacing={customizeVerticalSpacing}
        verticalSpacing={verticalSpacing}
        customizeFz={customizeFz}
        fz={fz}
        customizeVerticalAlign={customizeVerticalAlign}
        verticalAlign={verticalAlign}
      />
      <CodeBlock code={code} />
    </>
  );
}
