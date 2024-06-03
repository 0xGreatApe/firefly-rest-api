export interface Pair {
    id: string;
    token0: {
        id: string;
        symbol: string;
        name: string;
    };
    token1: {
        id: string;
        symbol: string;
        name: string;
    };
    reserve0: string;
    reserve1: string;
    totalSupply: string;
    volumeToken0: string;
    volumeToken1: string;
    volumeUSD: string;
}
