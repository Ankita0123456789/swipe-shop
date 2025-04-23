import React from "react";
import { easeOut, motion, useMotionValue, useTransform } from "motion/react";

import cart from "../assets/cart.png";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";
import Choice from "./Choice";

interface CardProps {
  title: string;
  imageUrl: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  onAddToCart: (id: number) => void;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  id: number;
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  brand,
  price,
  originalPrice,
  discountPercentage,
  onAddToCart,
  onLike,
  onDislike,
  id,
}) => {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const rotate = useTransform(offsetX, [-200, 0, 200], [-30, 0, 30], {
    ease: easeOut,
  });
  const opacityX = useTransform(offsetX, [-300, 0, 300], [0, 1, 0], {
    ease: easeOut,
  });
  const opacityY = useTransform(offsetY, [-300, 0, 300], [0, 1, 0], {
    ease: easeOut,
  });
  const opacity = useTransform(() => {
    if (offsetX.get() !== 0) {
      return opacityX.get();
    } else if (offsetY.get() < 0) {
      return opacityY.get();
    }
    return 1;
  });
  const likeScale = useTransform(offsetX, [0, 200], [0.8, 1.2]);
  const likeOpacity = useTransform(offsetX, [0, 100, 200], [0, 1, 1]);
  const dislikeScale = useTransform(offsetX, [-200, 0], [1.2, 0.8]);
  const dislikeOpacity = useTransform(offsetX, [-200, -100, 0], [1, 0.5, 0]);

  const cartScale = useTransform(offsetY, [-200, 0], [1.2, 0.8]);
  const cartOpacity = useTransform(offsetY, [-200, -100, 0], [1, 0.5, 0]);

  return (
    <>
      <Choice opacity={likeOpacity} scale={likeScale} imageSrc={like} />
      <Choice
        opacity={dislikeOpacity}
        scale={dislikeScale}
        imageSrc={dislike}
      />
      <Choice opacity={cartOpacity} scale={cartScale} imageSrc={cart} />
      <motion.div
        drag
        whileDrag={{ scale: 1.05 }}
        dragConstraints={{ bottom: 0 }}
        dragElastic={0.15}
        dragSnapToOrigin
        dragMomentum={true}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
        dragDirectionLock
        onDragEnd={(_, info) => {
          const SWIPE_THRESHOLD = 200;
          const VELOCITY_THRESHOLD = 0.1;

          if (
            Math.abs(info.offset.x) > SWIPE_THRESHOLD &&
            Math.abs(info.velocity.x) > VELOCITY_THRESHOLD
          ) {
            if (info.offset.x > 0) {
              // Right swipe - Like
              onLike(id);
            } else {
              // Left swipe - Dislike
              onDislike(id);
            }
            return;
          }
          if (
            info.offset.y < -SWIPE_THRESHOLD ||
            info.velocity.y < -VELOCITY_THRESHOLD
          ) {
            // Up swipe - Add to cart
            onAddToCart(id);
          }
        }}
        style={{
          x: offsetX,
          y: offsetY,
          rotate: rotate,
          opacity: opacity,
        }}
        className="absolute top-10 inset-0 flex items-center justify-center"
      >
        <div className="border border-gray-300 rounded-lg max-w-sm m-4 overflow-hidden h-[550px]">
          <div className="bg-white relative">
            <img src={imageUrl} alt={title} className="w-[400px] h-[450px]" />
            {discountPercentage !== 0 && (
              <div className="absolute top-3 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                -{discountPercentage}%
              </div>
            )}
          </div>
          <div className="py-3 px-auto bg-white h-40">
            {brand && (
              <p className="text-sm uppercase text-gray-500 font-medium">
                {brand}
              </p>
            )}
            <h2 className="text-xl font-semibold mb-1">{title}</h2>

            <div className="flex items-center justify-center space-x-2">
              {price && (
                <span className="text-gray-800 text-lg font-bold">₹{price}</span>
              )}
              {originalPrice && price && discountPercentage !== 0 && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
