import { PRODUCT_NAME } from '~/app/config';
import classes from './HeroImage.module.css';
import picture from './hero.png';

export function HeroImage() {
  return (
    <div className={classes.root}>
      <img src={picture.src} alt={PRODUCT_NAME} />
      <div className={classes.rightShadow} />
    </div>
  );
}
