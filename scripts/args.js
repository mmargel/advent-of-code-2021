export const validateDay = (day) => {
  if (!day) {
    throw new Error("Day number not supplies. Usage: yarn run day <dayNumber>");
  } else if (day <= 0) {
    throw new Error("Day number must be positive.");
  }
};
