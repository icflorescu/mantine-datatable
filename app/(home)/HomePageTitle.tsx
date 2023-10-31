import { Text, Title } from '@mantine/core';
import classes from './HomePageTitle.module.css';

export function HomePageTitle() {
  return (
    <Title className={classes.root} order={2}>
      The{' '}
      <Text className="nowrap" span inherit variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 30 }}>
        table component
      </Text>
      <br />
      for your data-rich
      <br />
      Mantine applications
    </Title>
  );
}
