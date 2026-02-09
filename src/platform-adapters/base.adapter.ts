import { PlatformAdapter } from './platform-adapter.interface';

export abstract class BasePlatformAdapter implements PlatformAdapter {
    abstract platformName: string;

    abstract search(query: string);
    abstract getByProductKey(productKey: string);

    protected normalizePrice(value: any): number {
        return Number(value);
    }
}
