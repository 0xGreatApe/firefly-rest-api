import { RestService } from './rest.service';
export declare class RestController {
    private readonly restService;
    constructor(restService: RestService);
    getSwaps(first?: number, orderBy?: string, orderDirection?: string, poolId?: string): Promise<{
        id: any;
        fromAmount: any;
        toAmount: any;
        timestamp: any;
        pair: {
            fromToken: {
                decimals: any;
                symbol: any;
                tradeVolume: any;
            };
            toToken: {
                decimals: any;
                symbol: any;
                tradeVolume: any;
            };
        };
    }[]>;
    getPools(): Promise<{}>;
    getFactoryData(factoryId?: string): Promise<any>;
    getTokenData(tokenId: string): Promise<any>;
}
