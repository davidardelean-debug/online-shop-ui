import { CartItem } from "../entities/CartItem";

export default class CartService {
  static addToCart(cartItem: CartItem, cart: CartItem[]): CartItem[] {
    const existingItem = cart.find(
      (item) => item.product.id === cartItem.product.id,
    );

    if (existingItem)
      return this.updateCartItemQuantity(existingItem, cart, cartItem.quantity);
    else return [...cart, cartItem];
  }
  static removeFromCart(cartItem: CartItem, cart: CartItem[]): CartItem[] {
    return cart.filter((item) => item.product.id != cartItem.product.id);
  }

  static updateCartItemQuantity(
    cartItem: CartItem,
    cart: CartItem[],
    newQuantity: number,
  ): CartItem[] {
    if (newQuantity != 0)
      return cart.map((item) =>
        item.product.id == cartItem.product.id
          ? { ...item, quantity: newQuantity }
          : item,
      );
    else if (newQuantity == 0) return this.removeFromCart(cartItem, cart);

    return cart;
  }

  static clearCart(): CartItem[] {
    return [];
  }

  static calculateCartTotal(cart: CartItem[]): string {
    return cart
      .reduce((acc, value) => acc + value.product.price * value.quantity, 0)
      .toFixed(2);
  }
}
