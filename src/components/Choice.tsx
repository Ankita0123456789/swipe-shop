/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "motion/react";

const Choice = ({ opacity, scale, imageSrc }: any) => {
  return (
    <motion.div
      className="fixed top-1/2 right-1/2 text-white p-3 rounded-full z-10 translate-x-1/2 -translate-y-1/2"
      style={{ opacity, scale }}
    >
      <img src={imageSrc} alt="cart" />
    </motion.div>
  );
};

export default Choice;
