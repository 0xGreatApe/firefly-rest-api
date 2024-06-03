import { Injectable } from '@nestjs/common';

import { GraphqlService } from '../graphql/graphql.service';

@Injectable()
export class RestService {
  constructor(private readonly graphqlService: GraphqlService) {}

  async getSwaps(
    first: number,
    orderBy: string,
    orderDirection: string,
    poolId?: string,
  ) {
    try {
      const data = await this.graphqlService.getSwaps(
        first,
        orderBy,
        orderDirection,
        poolId,
      );
      console.log('Swaps data:', data); // Log the received data
      if (!data || !data.data || !data.data.swaps) {
        throw new Error('Invalid data format received from GraphQL API');
      }
      return this.formatSwapsData(data);
    } catch (error) {
      console.error('Error in getSwaps:', error);
      throw error;
    }
  }

  private formatSwapsData(data: { data: { swaps: any[] } }) {
    return data.data.swaps.map((swap) => ({
      id: swap.id,
      fromAmount: swap.amount0.toString(),
      toAmount: swap.amount1.toString(),
      timestamp: swap.timestamp,
      pair: {
        fromToken: {
          decimals: swap.pool.token0.decimals,
          symbol: swap.pool.token0.symbol,
          tradeVolume: swap.pool.token0.volumeUSD,
        },
        toToken: {
          decimals: swap.pool.token1.decimals,
          symbol: swap.pool.token1.symbol,
          tradeVolume: swap.pool.token1.volumeUSD,
        },
      },
    }));
  }

  async getPools() {
    try {
      const data = await this.graphqlService.getAllPools();
      console.log('All pools data:', data); // Log the received data
      if (!data || !data.data || !data.data.pools) {
        throw new Error('Invalid data format received from GraphQL API');
      }
      return this.formatDataForSummary(data);
    } catch (error) {
      console.error('Error in getPools:', error);
      throw error;
    }
  }

  private formatDataForSummary(data: { data: { pools: any[] } }) {
    const formattedData = {};

    data.data.pools.forEach((pool) => {
      const key = `${pool.token0.id}_${pool.token1.id}`;
      formattedData[key] = {
        base_id: pool.token0.id,
        base_name: pool.token0.name,
        base_symbol: pool.token0.symbol,
        quote_id: pool.token1.id,
        quote_name: pool.token1.name,
        quote_symbol: pool.token1.symbol,
        last_price: pool.token0Price,
        base_volume: pool.volumeToken0,
        quote_volume: pool.volumeToken1,
      };
    });

    return formattedData;
  }

  async getFactoryData(factoryId: string) {
    try {
      const data = await this.graphqlService.getFactoryData(factoryId);
      console.log('Factory data:', data); // Log the received data
      if (!data || !data.data || !data.data.factories) {
        throw new Error('Invalid data format received from GraphQL API');
      }
      return data.data.factories;
    } catch (error) {
      console.error('Error in getFactoryData:', error);
      throw error;
    }
  }

  async getTokenData(tokenId: string) {
    try {
      const data = await this.graphqlService.getTokenData(tokenId);
      console.log('Token data:', data); // Log the received data
      if (!data || !data.data || !data.data.token) {
        throw new Error('Invalid data format received from GraphQL API');
      }
      return data.data.token;
    } catch (error) {
      console.error('Error in getTokenData:', error);
      throw error;
    }
  }
}
