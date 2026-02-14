export interface PlatformOffer {
    platform: string;              // amazon, blinkit, zepto
    productKey: string;             // logical product ID
    title: string;
    imageUrl?: string;

    price: number;                  // final payable price
    currency: 'INR';

    rating?: number;                // 0–5
    ratingCount?: number;

    deliveryTimeMinutes?: number;   // for quick commerce
    deliveryDate?: Date;            // for ecommerce

    productUrl: string;             // affiliate link

    metadata?: Record<string, any>; // platform-specific (optional)
}

// Platform Product Details
// base data