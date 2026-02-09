import { PlatformOffer } from '../types/platform-offer';

export interface PlatformAdapter {
    platformName: string;

    search(query: string): Promise<PlatformOffer[]>;

    getByProductKey(productKey: string): Promise<PlatformOffer[]>;
}
