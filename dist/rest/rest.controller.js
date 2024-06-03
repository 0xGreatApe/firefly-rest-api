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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestController = void 0;
const common_1 = require("@nestjs/common");
const rest_service_1 = require("./rest.service");
const swagger_1 = require("@nestjs/swagger");
let RestController = exports.RestController = class RestController {
    constructor(restService) {
        this.restService = restService;
    }
    async getSwaps(first, orderBy = 'timestamp', orderDirection = 'desc', poolId) {
        const entriesToFetch = first ?? null;
        return await this.restService.getSwaps(entriesToFetch, orderBy, orderDirection, poolId);
    }
    async getPools() {
        return await this.restService.getPools();
    }
    async getFactoryData(factoryId = '0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95') {
        return await this.restService.getFactoryData(factoryId);
    }
    async getTokenData(tokenId) {
        return await this.restService.getTokenData(tokenId);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Swaps and Pools'),
    (0, common_1.Get)('swaps'),
    (0, swagger_1.ApiOperation)({ summary: 'Get swap transactions' }),
    (0, swagger_1.ApiQuery)({
        name: 'first',
        required: false,
        type: Number,
        description: 'Number of results to return',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'orderBy',
        required: false,
        type: String,
        description: 'Field to order by (default is timestamp)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'orderDirection',
        required: false,
        type: String,
        description: 'Order direction (asc/desc, default is desc)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'poolId',
        required: false,
        type: String,
        description: 'Filter by pool ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully fetched swap transactions',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    fromAmount: { type: 'string' },
                    toAmount: { type: 'string' },
                    timestamp: { type: 'string' },
                    pair: {
                        type: 'object',
                        properties: {
                            fromToken: {
                                type: 'object',
                                properties: {
                                    decimals: { type: 'number' },
                                    symbol: { type: 'string' },
                                    tradeVolume: { type: 'string' },
                                },
                            },
                            toToken: {
                                type: 'object',
                                properties: {
                                    decimals: { type: 'number' },
                                    symbol: { type: 'string' },
                                    tradeVolume: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('first')),
    __param(1, (0, common_1.Query)('orderBy')),
    __param(2, (0, common_1.Query)('orderDirection')),
    __param(3, (0, common_1.Query)('poolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], RestController.prototype, "getSwaps", null);
__decorate([
    (0, swagger_1.ApiTags)('Swaps and Pools'),
    (0, common_1.Get)('pools'),
    (0, swagger_1.ApiOperation)({ summary: 'Get summary of all pools' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully fetched pools summary',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    base_id: { type: 'string' },
                    base_name: { type: 'string' },
                    base_symbol: { type: 'string' },
                    quote_id: { type: 'string' },
                    quote_name: { type: 'string' },
                    quote_symbol: { type: 'string' },
                    last_price: { type: 'number' },
                    base_volume: { type: 'number' },
                    quote_volume: { type: 'number' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestController.prototype, "getPools", null);
__decorate([
    (0, common_1.Get)('factory'),
    (0, swagger_1.ApiOperation)({ summary: 'Get factory data' }),
    (0, swagger_1.ApiQuery)({
        name: 'factoryId',
        required: false,
        type: String,
        description: 'Factory ID (default is the Firefly V3 Factory address)',
        example: '0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully fetched factory data',
        schema: {
            type: 'object',
            properties: {
                poolCount: { type: 'number' },
                txCount: { type: 'number' },
                totalVolumeUSD: { type: 'number' },
                totalVolumeETH: { type: 'number' },
                totalFeesUSD: { type: 'number' },
                totalFeesETH: { type: 'number' },
                totalValueLockedUSD: { type: 'number' },
                totalValueLockedETH: { type: 'number' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('factoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestController.prototype, "getFactoryData", null);
__decorate([
    (0, common_1.Get)('token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get token data' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenId',
        required: true,
        type: String,
        description: 'Token ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully fetched token data',
        schema: {
            type: 'object',
            properties: {
                symbol: { type: 'string' },
                name: { type: 'string' },
                decimals: { type: 'number' },
                totalSupply: { type: 'number' },
                volumeUSD: { type: 'number' },
                feesUSD: { type: 'number' },
                txCount: { type: 'number' },
                totalValueLocked: { type: 'number' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestController.prototype, "getTokenData", null);
exports.RestController = RestController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], RestController);
//# sourceMappingURL=rest.controller.js.map