export declare class GraphqlService {
    private readonly graphqlUrl;
    fetchData(query: string): Promise<any>;
    getSwaps(first: number, orderBy: string, orderDirection: string, poolId?: string): Promise<any>;
    getAllPools(): Promise<any>;
    getFactoryData(factoryId: string): Promise<any>;
    getTokenData(tokenId: string): Promise<any>;
}
