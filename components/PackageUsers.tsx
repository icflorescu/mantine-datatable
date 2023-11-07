/* eslint-disable jsx-a11y/alt-text */
import { Container, Text } from '@mantine/core';
import { PRODUCT_NAME, WEBSITE_LINK } from '~/app/config';
import classes from './PackageUsers.module.css';

const USERS = [
  {
    name: 'kappa.ai',
    logo: { base: 'kapa', ext: 'png', themed: true, scale: 98, shift: 1 },
    link: 'https://kapa.ai',
  },
  {
    name: 'exdatis',
    logo: { base: 'exdatis', ext: 'svg', themed: true, scale: 92, shift: 2 },
    link: 'https://exdatis.ai',
  },
  {
    name: 'teachfloor',
    logo: { base: 'teachfloor', ext: 'svg', themed: true },
    link: 'https://www.teachfloor.com',
  },
  {
    name: 'MARKUP',
    logo: { base: 'markup', ext: 'png', themed: true, scale: 72 },
    link: 'https://www.getmarkup.com',
  },
  {
    name: 'InvenTree',
    logo: { base: 'inventree', ext: 'png', themed: true, scale: 140, shift: 1 },
    link: 'https://inventree.org',
  },
  {
    name: 'BookieBase',
    logo: { base: 'bookiebase', ext: 'svg', themed: true, scale: 72, shift: 2 },
    link: 'https://bookiebase.ie',
  },
  {
    name: 'Zipline',
    logo: { base: 'zipline', ext: 'png' },
    link: 'https://zipline.diced.sh',
  },
  {
    name: 'Pachtop',
    showText: true,
    logo: { base: 'pachtop', ext: 'png', scale: 84, shift: 2 },
    link: 'https://github.com/pacholoamit/pachtop',
  },
  {
    name: 'Ganymede',
    showText: true,
    logo: { base: 'ganymede', ext: 'png', scale: 82, shift: 2 },
    link: 'https://github.com/Zibbp/ganymede',
  },
  {
    name: 'COH3 Stats',
    showText: true,
    logo: { base: 'coh3-stats', ext: 'png', scale: 80, shift: 1 },
    link: 'https://coh3stats.com',
  },
  {
    name: 'ccrentals.org',
    showText: true,
    logo: { base: 'ccrentals', ext: 'svg', themed: true, scale: 84, shift: 1 },
    link: 'https://www.ccrentals.org',
  },
];

const ROOT_URL = `${process.env.GITHUB_PAGES === 'TRUE' ? WEBSITE_LINK : ''}/users/`;

export function PackageUsers() {
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{PRODUCT_NAME} is trusted by</h2>
      <Container className={classes.links}>
        {USERS.map(({ name, logo: { base, ext, themed, scale, shift }, link, showText }) => {
          const title = `${name} is using ${PRODUCT_NAME}`;
          const commonImageAttrs: React.ImgHTMLAttributes<HTMLImageElement> = {
            style: { height: `${scale || '100'}%`, marginTop: shift ? `-${shift}%` : undefined },
            alt: title,
          };

          return (
            <a key={name} className={classes.link} href={link} target="_blank" rel="noopener noreferrer" title={title}>
              {themed ? (
                <>
                  <img className={classes.light} {...commonImageAttrs} src={`${ROOT_URL}${base}-light.${ext}`} />
                  <img className={classes.dark} {...commonImageAttrs} src={`${ROOT_URL}${base}-dark.${ext}`} />
                </>
              ) : (
                <img {...commonImageAttrs} src={`${ROOT_URL}${base}.${ext}`} />
              )}
              {showText && (
                <Text c="dimmed" size="md" className={classes.text}>
                  {name}
                </Text>
              )}
            </a>
          );
        })}
      </Container>
    </div>
  );
}
