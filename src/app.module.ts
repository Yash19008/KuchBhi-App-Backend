import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/mongoose.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { PlatformsModule } from './modules/platforms/platforms.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AdminModule } from './modules/admin/admin.module';
import { HealthModule } from './modules/health/health.module';
import { OtpModule } from './modules/otp/otp.module';

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
    OtpModule,
  ],
})
export class AppModule { }
