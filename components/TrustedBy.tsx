/* eslint-disable jsx-a11y/alt-text */
import { Container, Text } from '@mantine/core';
import { PRODUCT_NAME, WEBSITE_LINK } from '~/app/config';
import classes from './TrustedBy.module.css';

const ITEMS: {
  name: string;
  showText?: boolean;
  logo: { base: string; ext: 'png' | 'webp' | 'svg'; themed?: true; scale?: number; shift?: number };
  link: string;
  shift?: number;
}[] = [
  {
    name: 'Namecheap',
    logo: { base: 'namecheap', ext: 'svg', themed: true },
    link: 'https://www.namecheap.com',
  },
  {
    name: 'EasyWP',
    logo: { base: 'easywp', ext: 'svg', themed: true },
    link: 'https://www.easywp.com',
  },
  {
    name: 'CodeParrot.AI',
    showText: true,
    logo: { base: 'codeparrot', ext: 'svg', shift: 3, scale: 110 },
    link: 'https://codeparrot.ai',
    shift: 1,
  },
  {
    name: 'OmicsStudio',
    logo: { base: 'omicsstudio', ext: 'svg', themed: true },
    link: 'https://omicsstudio.com',
  },
  {
    name: 'SegmentX',
    showText: true,
    logo: { base: 'segmentx', ext: 'png', shift: 5, scale: 110 },
    link: 'https://segmentx.ai',
    shift: 1.5,
  },
  {
    name: 'Aquarino',
    logo: { base: 'aquarino', ext: 'svg', shift: 2 },
    link: 'http://aquarino.com.br',
  },
  {
    name: 'Dera',
    showText: true,
    logo: { base: 'dera', ext: 'webp', shift: 10 },
    link: 'https://getdera.com/',
    shift: 1,
  },
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
    logo: { base: 'pachtop', ext: 'png', scale: 84, shift: 5 },
    link: 'https://pachtop.com',
    shift: 0.25,
  },
  {
    name: 'Ganymede',
    showText: true,
    logo: { base: 'ganymede', ext: 'png', scale: 82, shift: 4 },
    link: 'https://github.com/Zibbp/ganymede',
    shift: 0.25,
  },
  {
    name: 'COH3 Stats',
    showText: true,
    logo: { base: 'coh3-stats', ext: 'png', scale: 80, shift: 4.5 },
    link: 'https://coh3stats.com',
    shift: 0.5,
  },
  {
    name: 'ccrentals.org',
    showText: true,
    logo: { base: 'ccrentals', ext: 'svg', themed: true, scale: 84, shift: 3 },
    link: 'https://www.ccrentals.org',
    shift: 0.5,
  },
];

const ROOT_URL = `${process.env.GITHUB_PAGES === 'TRUE' ? WEBSITE_LINK : ''}/users/`;

export function TrustedBy() {
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{PRODUCT_NAME} is trusted by</h2>
      <Container className={classes.links}>
        {ITEMS.map(({ name, logo: { base, ext, themed, scale, shift: imageShift }, link, showText, shift }) => {
          const title = `${name} is using ${PRODUCT_NAME}`;
          const commonImageAttrs: React.ImgHTMLAttributes<HTMLImageElement> = {
            style: {
              height: `${scale || '100'}%`,
              marginTop: imageShift && imageShift > 0 ? `-${imageShift}%` : undefined,
              marginBottom: imageShift && imageShift < 0 ? `-${imageShift}%` : undefined,
            },
            alt: title,
          };

          return (
            <a
              key={name}
              className={classes.link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              style={
                shift
                  ? {
                      marginTop: shift < 0 ? `-${shift}%` : undefined,
                      marginBottom: shift > 0 ? `-${shift}%` : undefined,
                    }
                  : undefined
              }
            >
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
