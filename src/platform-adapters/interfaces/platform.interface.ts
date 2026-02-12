export interface PlatformOffer {
    productKey: string;
    title: string;
    image: string;
    price: number;
    deliveryTime?: number;
    rating?: number;
    noOfReviews?: number;
    affiliateUrl: string;
    platform: string;
}

export interface PlatformAdapter {
    search(query: string): Promise<PlatformOffer[]>;
    getTrending(): Promise<PlatformOffer[]>;
    getOffersByProductKey?(productKey: string): Promise<PlatformOffer[]>;
}


// TODO
