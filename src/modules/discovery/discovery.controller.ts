import { Controller, Get, Query } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';

@Controller('discovery')
export class DiscoveryController {
    constructor(private readonly discoveryService: DiscoveryService) { }

    @Get('search')
    async search(@Query('q') query: string) {
        return this.discoveryService.search(query);
    }
}
