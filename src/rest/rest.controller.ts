import { Controller, Get, Query } from '@nestjs/common';
import { RestService } from './rest.service';
import { ApiQuery, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1')
export class RestController {
  constructor(private readonly restService: RestService) {}
  @ApiTags('Swaps and Pools')
  @Get('swaps')
  @ApiOperation({ summary: 'Get swap transactions' })
  @ApiQuery({
    name: 'first',
    required: false,
    type: Number,
    description: 'Number of results to return',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    description: 'Field to order by (default is timestamp)',
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    type: String,
    description: 'Order direction (asc/desc, default is desc)',
  })
  @ApiQuery({
    name: 'poolId',
    required: false,
    type: String,
    description: 'Filter by pool ID',
  })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSwaps(
    @Query('first') first?: number,
    @Query('orderBy') orderBy: string = 'timestamp',
    @Query('orderDirection') orderDirection: string = 'desc',
    @Query('poolId') poolId?: string,
  ) {
    const entriesToFetch = first ?? null;
    return await this.restService.getSwaps(
      entriesToFetch,
      orderBy,
      orderDirection,
      poolId,
    );
  }

  @ApiTags('Swaps and Pools')
  @Get('pools')
  @ApiOperation({ summary: 'Get summary of all pools' })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getPools() {
    return await this.restService.getPools();
  }
  //Factory Data
  @Get('factory')
  @ApiOperation({ summary: 'Get factory data' })
  @ApiQuery({
    name: 'factoryId',
    required: false,
    type: String,
    description: 'Factory ID (default is the Firefly V3 Factory address)',
    example: '0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95', // Provide example in Swagger
  })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getFactoryData(
    @Query('factoryId')
    factoryId: string = '0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95',
  ) {
    return await this.restService.getFactoryData(factoryId);
  }

  @Get('token')
  @ApiOperation({ summary: 'Get token data' })
  @ApiQuery({
    name: 'tokenId',
    required: true,
    type: String,
    description: 'Token ID',
  })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTokenData(@Query('tokenId') tokenId: string) {
    return await this.restService.getTokenData(tokenId);
  }
}
