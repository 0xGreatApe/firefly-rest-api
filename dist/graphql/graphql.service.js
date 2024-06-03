"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GraphqlService = exports.GraphqlService = class GraphqlService {
    constructor() {
        this.graphqlUrl = 'https://subgraph.fireflydex.io/subgraphs/name/firefly/v3';
    }
    async fetchData(query) {
        try {
            const response = await axios_1.default.post(this.graphqlUrl, { query });
            if (response.data.errors) {
                throw new Error(`GraphQL errors: ${response.data.errors
                    .map((err) => err.message)
                    .join(', ')}`);
            }
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching data from GraphQL API: ${error.message}`);
        }
    }
    async getSwaps(first, orderBy, orderDirection, poolId) {
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
    async getAllPools() {
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
    async getFactoryData(factoryId) {
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
    async getTokenData(tokenId) {
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
};
exports.GraphqlService = GraphqlService = __decorate([
    (0, common_1.Injectable)()
], GraphqlService);
//# sourceMappingURL=graphql.service.js.map