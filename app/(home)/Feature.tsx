import { Center, Flex, Text } from '@mantine/core';
import type { WithRequiredProperty } from '__PACKAGE__';
import classes from './Feature.module.css';

export type FeatureProps = WithRequiredProperty<
  React.PropsWithChildren<{
    icon: React.FC<{ size?: string | number }>;
    title: string;
  }>,
  'children'
>;

export function Feature({ icon: Icon, title, children }: FeatureProps) {
  return (
    <Flex className={classes.root} direction={{ base: 'row', xs: 'column' }} gap="md">
      <Center className={classes.iconContainer} w={48} h={48}>
        <Icon size={24} />
      </Center>
      <div>
        <Text className={classes.title} fw={700}>
          {title}
        </Text>
        <Text className={classes.description} size="sm">
          {children}
        </Text>
      </div>
    </Flex>
  );
}
