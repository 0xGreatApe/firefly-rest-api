"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestService = void 0;
const common_1 = require("@nestjs/common");
const graphql_service_1 = require("../graphql/graphql.service");
let RestService = exports.RestService = class RestService {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
    }
    async getSwaps(first, orderBy, orderDirection, poolId) {
        try {
            const data = await this.graphqlService.getSwaps(first, orderBy, orderDirection, poolId);
            console.log('Swaps data:', data);
            if (!data || !data.data || !data.data.swaps) {
                throw new Error('Invalid data format received from GraphQL API');
            }
            return this.formatSwapsData(data);
        }
        catch (error) {
            console.error('Error in getSwaps:', error);
            throw error;
        }
    }
    formatSwapsData(data) {
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
            console.log('All pools data:', data);
            if (!data || !data.data || !data.data.pools) {
                throw new Error('Invalid data format received from GraphQL API');
            }
            return this.formatDataForSummary(data);
        }
        catch (error) {
            console.error('Error in getPools:', error);
            throw error;
        }
    }
    formatDataForSummary(data) {
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
    async getFactoryData(factoryId) {
        try {
            const data = await this.graphqlService.getFactoryData(factoryId);
            console.log('Factory data:', data);
            if (!data || !data.data || !data.data.factories) {
                throw new Error('Invalid data format received from GraphQL API');
            }
            return data.data.factories;
        }
        catch (error) {
            console.error('Error in getFactoryData:', error);
            throw error;
        }
    }
    async getTokenData(tokenId) {
        try {
            const data = await this.graphqlService.getTokenData(tokenId);
            console.log('Token data:', data);
            if (!data || !data.data || !data.data.token) {
                throw new Error('Invalid data format received from GraphQL API');
            }
            return data.data.token;
        }
        catch (error) {
            console.error('Error in getTokenData:', error);
            throw error;
        }
    }
};
exports.RestService = RestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [graphql_service_1.GraphqlService])
], RestService);
//# sourceMappingURL=rest.service.js.map