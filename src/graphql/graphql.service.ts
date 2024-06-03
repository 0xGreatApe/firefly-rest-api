import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GraphqlService {
  private readonly graphqlUrl =
    'https://subgraph.fireflydex.io/subgraphs/name/firefly/v3';

  async fetchData(query: string): Promise<any> {
    try {
      const response = await axios.post(this.graphqlUrl, { query });
      if (response.data.errors) {
        throw new Error(
          `GraphQL errors: ${response.data.errors
            .map((err) => err.message)
            .join(', ')}`,
        );
      }
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from GraphQL API: ${error.message}`);
    }
  }

  async getSwaps(
    first: number,
    orderBy: string,
    orderDirection: string,
    poolId?: string,
  ): Promise<any> {
    const poolFilter = poolId ? `, where: { pool: "${poolId}" }` : '';
    const query = `
      {
        swaps(first: ${first}, orderBy: ${orderBy}, orderDirection: ${orderDirection} ${poolFilter}) {
          pool {
            token0 {
              id
              decimals
              symbol
              volumeUSD
            }
            token1 {
              id
              decimals
              symbol
              volumeUSD
            }
          }
          sender
          recipient
          amount0
          amount1
          id
          timestamp
          pool {
            id
          }
        }
      }
    `;
    return this.fetchData(query);
  }

  async getAllPools(): Promise<any> {
    const query = `
      {
        pools {
          id
          token0 {
            id
            name
            symbol
          }
          token1 {
            id
            name
            symbol
          }
          token0Price
          volumeToken0
          volumeToken1
        }
      }
    `;
    return this.fetchData(query);
  }

  async getFactoryData(factoryId: string): Promise<any> {
    const query = `
      {
        factories(id: "${factoryId}") {
          poolCount
          txCount
          totalVolumeUSD
          totalVolumeETH
          totalFeesUSD
          totalFeesETH
          totalValueLockedUSD
          totalValueLockedETH
        }
      }
    `;
    return this.fetchData(query);
  }

  async getTokenData(tokenId: string): Promise<any> {
    const query = `
      {
        token(id: "${tokenId}") {
          symbol
          name
          decimals
          totalSupply
          volumeUSD
          feesUSD
          txCount
          totalValueLocked
        }
      }
    `;
    return this.fetchData(query);
  }
}
