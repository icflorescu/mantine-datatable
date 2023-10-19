import { Button, createStyles, keyframes } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { SPONSOR_LINK } from '~/config';
import useButtonStyles from './useButtonStyles';

const BEAT_ANIMATION = keyframes({
  '0%': { transform: 'scale(1)', opacity: 1 },
  '7%': { transform: 'scale(1.1)', opacity: 0.5 },
  '14%': { transform: 'scale(1)', opacity: 1 },
  '21%': { transform: 'scale(1.1)', opacity: 0.5 },
  '30%': { transform: 'scale(1)', opacity: 1 },
});

const useStyles = createStyles((theme) => {
  return {
    buttonIconSponsor: {
      transformOrigin: 'center bottom',
      '&&': { marginRight: 6 },
      color: theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6],
      animation: `${BEAT_ANIMATION} 3s ease-in-out infinite`,
    },
  };
});

export default function SponsorsLinkButton() {
  const { classes, cx } = useStyles();
  const { classes: commonClasses } = useButtonStyles();
  return (
    <Button
      classNames={{
        root: commonClasses.button,
        icon: cx(commonClasses.buttonIcon, classes.buttonIconSponsor),
        label: commonClasses.buttonLabel,
      }}
      size="xs"
      variant="default"
      leftIcon={<IconHeartFilled size={18} />}
      component="a"
      href={SPONSOR_LINK}
      target="_blank"
      aria-label="Sponsor Mantine DataTable project on GitHub Sponsors"
    >
      Sponsor
    </Button>
  );
}
