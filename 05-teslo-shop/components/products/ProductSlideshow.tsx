import { Slide } from "react-slideshow-image";

import Styles from "./ProductSlideshow.module.css";
import "react-slideshow-image/dist/styles.css";

interface ProductSlideshowProps {
  images: string[];
}

export const ProductSlideshow = ({ images }: ProductSlideshowProps) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = image.includes("https://") ? image : `/products/${image}`;

        return (
          <div className={Styles["each-slide-effect"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
