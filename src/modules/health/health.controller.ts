import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    ping() {
        return {
            status: 'ok',
            message: 'KuchBhi backend running',
        };
    }
}
