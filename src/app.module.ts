import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { PlatformsModule } from './platforms/platforms.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DiscoveryModule,
    PlatformsModule,
    WishlistModule,
    AffiliateModule,
    AnalyticsModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule { }
