import { GraphqlService } from '../graphql/graphql.service';
export declare class RestService {
    private readonly graphqlService;
    constructor(graphqlService: GraphqlService);
    getSwaps(first: number, orderBy: string, orderDirection: string, poolId?: string): Promise<{
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
    private formatSwapsData;
    getPools(): Promise<{}>;
    private formatDataForSummary;
    getFactoryData(factoryId: string): Promise<any>;
    getTokenData(tokenId: string): Promise<any>;
}
