import { Injectable, signal } from '@angular/core';

export interface CartItem {
    productId: string;
    storeProductId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
    color: string;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Using signals for reactive state
    private cartItems = signal<CartItem[]>([]);
    private showCartTrigger = signal<number>(0);

    items = this.cartItems.asReadonly();
    cartAutoOpen = this.showCartTrigger.asReadonly();

    get totalItems() {
        return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
    }

    get totalPrice() {
        return this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    addToCart(product: any, quantity: number, size: string, color: string, image: string) {
        const current = this.cartItems();
        const existingIndex = current.findIndex(i =>
            i.productId === product.productId &&
            i.size === size &&
            i.color === color
        );

        if (existingIndex > -1) {
            const updated = [...current];
            updated[existingIndex].quantity += quantity;
            this.cartItems.set(updated);
        } else {
            const newItem: CartItem = {
                productId: product.productId,
                storeProductId: product.store?.storeId || '',
                name: product.title,
                price: product.store?.price || 0,
                quantity: quantity,
                image: image,
                size: size,
                color: color
            };
            this.cartItems.set([...current, newItem]);
        }

        // Trigger modal auto-open
        this.showCartTrigger.update(v => v + 1);
    }

    updateQuantity(productId: string, size: string, color: string, newQty: number) {
        const current = this.cartItems();
        const updated = current.map(item => {
            if (item.productId === productId && item.size === size && item.color === color) {
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0);

        this.cartItems.set(updated);
    }

    removeItem(productId: string, size: string, color: string) {
        this.cartItems.set(
            this.cartItems().filter(i => !(i.productId === productId && i.size === size && i.color === color))
        );
    }

    clearCart() {
        this.cartItems.set([]);
    }
}
