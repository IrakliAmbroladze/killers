export type ContextType = {
  commentsQuantities: Record<string, number>;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};
