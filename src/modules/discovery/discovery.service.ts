import { Injectable } from '@nestjs/common';
import { PlatformOffer } from '../../types/platform-offer';
import { AmazonAdapter } from '../../platform-adapters/amazon/amazon.adapter';

@Injectable()
export class DiscoveryService {
    private adapters = [
        new AmazonAdapter(),
        // add more adapters later
    ];

    async search(query: string) {
        // Fetch offers from all platforms in parallel
        const offersByPlatform = await Promise.all(
            this.adapters.map(adapter => adapter.search(query)),
        );

        const offers: PlatformOffer[] = offersByPlatform.flat();

        // Compute factors
        const fastest = this.getFastestDelivery(offers);
        const cheapest = this.getCheapest(offers);
        const highestRated = this.getHighestRated(offers);

        return {
            query,
            topResults: {
                fastestDelivery: fastest?.[0] ?? null,
                cheapest: cheapest?.[0] ?? null,
                highestRated: highestRated?.[0] ?? null,
            },
            moreResults: {
                fastestDelivery: fastest ?? [],
                cheapest: cheapest ?? [],
                highestRated: highestRated ?? [],
            },
            relatedQueries: this.getRelatedQueries(query),
        };
    }

    // FACTOR HELPERS
    private getFastestDelivery(offers: PlatformOffer[]) {
        return offers
            .filter(o => o.deliveryTimeMinutes !== undefined)
            .sort((a, b) => a.deliveryTimeMinutes! - b.deliveryTimeMinutes!);
    }

    private getCheapest(offers: PlatformOffer[]) {
        return [...offers].sort((a, b) => a.price - b.price);
    }

    private getHighestRated(offers: PlatformOffer[]) {
        return offers
            .filter(o => o.rating !== undefined)
            .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    private getRelatedQueries(query: string): string[] {
        return [
            `best ${query}`,
            `${query} under 1000`,
            `top rated ${query}`,
        ];
    }
}
