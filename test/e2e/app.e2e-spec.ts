import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Initialize the Nest application before running tests
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Close the Nest application after all tests have run
  afterAll(async () => {
    await app.close();
  });

  // Define variables for test parameters
  const first = 10;
  const orderBy = 'timestamp';
  const orderDirection = 'desc';
  const poolId = '0x01b9966064dab277c168b74abe92010ccd4779df';

  // Known values for testing
  const knownSwapPoolId = '0x01b9966064dab277c168b74abe92010ccd4779df';
  const knownFromDecimals = '18';
  const knownToDecimals = '6';
  const knownFromTokenSymbol = 'LAB.m';
  const knownToTokenSymbol = 'USDC';

  // Test for basic functionality of getSwaps without optional parameters
  // Should return a full list of all recent swaps conducted in the correct format
  it('/api/v1/swaps (GET) - basic', () => {
    return request(app.getHttpServer())
      .get(
        `/api/v1/swaps?first=${first}&orderBy=${orderBy}&orderDirection=${orderDirection}`,
      )
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeLessThanOrEqual(first);
        res.body.forEach((swap) => {
          expect(swap).toHaveProperty('id');
          expect(swap).toHaveProperty('fromAmount');
          expect(swap).toHaveProperty('toAmount');
          expect(swap).toHaveProperty('timestamp');
          expect(swap).toHaveProperty('pair');
          expect(swap.pair).toHaveProperty('fromToken');
          expect(swap.pair.fromToken).toHaveProperty('decimals');
          expect(swap.pair.fromToken).toHaveProperty('symbol');
          expect(swap.pair.fromToken).toHaveProperty('tradeVolume');
          expect(swap.pair).toHaveProperty('toToken');
          expect(swap.pair.toToken).toHaveProperty('decimals');
          expect(swap.pair.toToken).toHaveProperty('symbol');
          expect(swap.pair.toToken).toHaveProperty('tradeVolume');
        });
      });
  });

  // Test for getSwaps functionality with poolId parameter
  // Verify correct Token swap data is returned for the specified poolId
  it('/api/v1/swaps (GET) - with poolId', () => {
    return request(app.getHttpServer())
      .get(
        `/api/v1/swaps?first=${first}&orderBy=${orderBy}&orderDirection=${orderDirection}&poolId=${poolId}`,
      )
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach((swap) => {
          expect(swap).toHaveProperty('id');
          expect(swap).toHaveProperty('fromAmount');
          expect(swap).toHaveProperty('toAmount');
          expect(swap).toHaveProperty('timestamp');
          expect(swap).toHaveProperty('pair');
          expect(swap.pair).toHaveProperty('fromToken');
          expect(swap.pair.fromToken).toHaveProperty('decimals');
          expect(swap.pair.fromToken).toHaveProperty('symbol');
          expect(swap.pair.fromToken).toHaveProperty('tradeVolume');
          expect(swap.pair).toHaveProperty('toToken');
          expect(swap.pair.toToken).toHaveProperty('decimals');
          expect(swap.pair.toToken).toHaveProperty('symbol');
          expect(swap.pair.toToken).toHaveProperty('tradeVolume');

          // Check known values
          if (swap.id === knownSwapPoolId) {
            expect(swap.pair.fromToken.decimals).toBe(knownFromDecimals);
            expect(swap.pair.toToken.decimals).toBe(knownToDecimals);
            expect(swap.pair.fromToken.symbol).toBe(knownFromTokenSymbol);
            expect(swap.pair.toToken.symbol).toBe(knownToTokenSymbol);
          }
        });
      });
  });

  // Test for getSwaps functionality with first parameter
  it('/api/v1/swaps (GET) - with first parameter', () => {
    const firstParam = 5; // Define specific value for first parameter
    return request(app.getHttpServer())
      .get(
        `/api/v1/swaps?first=${firstParam}&orderBy=${orderBy}&orderDirection=${orderDirection}`,
      )
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeLessThanOrEqual(firstParam);
        res.body.forEach((swap) => {
          expect(swap).toHaveProperty('id');
          expect(swap).toHaveProperty('fromAmount');
          expect(swap).toHaveProperty('toAmount');
          expect(swap).toHaveProperty('timestamp');
          expect(swap).toHaveProperty('pair');
          expect(swap.pair).toHaveProperty('fromToken');
          expect(swap.pair.fromToken).toHaveProperty('decimals');
          expect(swap.pair.fromToken).toHaveProperty('symbol');
          expect(swap.pair.fromToken).toHaveProperty('tradeVolume');
          expect(swap.pair).toHaveProperty('toToken');
          expect(swap.pair.toToken).toHaveProperty('decimals');
          expect(swap.pair.toToken).toHaveProperty('symbol');
          expect(swap.pair.toToken).toHaveProperty('tradeVolume');
        });
      });
  });

  // Test for getPools functionality
  it('/api/v1/pools (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/pools')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        Object.values(res.body).forEach((pool) => {
          expect(pool).toHaveProperty('base_id');
          expect(pool).toHaveProperty('base_name');
          expect(pool).toHaveProperty('base_symbol');
          expect(pool).toHaveProperty('quote_id');
          expect(pool).toHaveProperty('quote_name');
          expect(pool).toHaveProperty('quote_symbol');
          expect(pool).toHaveProperty('last_price');
          expect(pool).toHaveProperty('base_volume');
          expect(pool).toHaveProperty('quote_volume');
        });
      });
  });

  // Test for getFactoryData functionality with default factoryId
  it('/api/v1/factory (GET) - default factoryId', () => {
    return request(app.getHttpServer())
      .get('/api/v1/factory')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        const factoryData = res.body[0];
        expect(factoryData).toHaveProperty('poolCount');
        expect(factoryData).toHaveProperty('txCount');
        expect(factoryData).toHaveProperty('totalVolumeUSD');
        expect(factoryData).toHaveProperty('totalVolumeETH');
        expect(factoryData).toHaveProperty('totalFeesUSD');
        expect(factoryData).toHaveProperty('totalFeesETH');
        expect(factoryData).toHaveProperty('totalValueLockedUSD');
        expect(factoryData).toHaveProperty('totalValueLockedETH');
      });
  });

  // Test for getFactoryData functionality with specific factoryId
  it('/api/v1/factory (GET) - specific factoryId', () => {
    const factoryId = '0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95'; // Define specific factory ID
    return request(app.getHttpServer())
      .get(`/api/v1/factory?factoryId=${factoryId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        const factoryData = res.body[0];
        expect(factoryData).toHaveProperty('poolCount');
        expect(factoryData).toHaveProperty('txCount');
        expect(factoryData).toHaveProperty('totalVolumeUSD');
        expect(factoryData).toHaveProperty('totalVolumeETH');
        expect(factoryData).toHaveProperty('totalFeesUSD');
        expect(factoryData).toHaveProperty('totalFeesETH');
        expect(factoryData).toHaveProperty('totalValueLockedUSD');
        expect(factoryData).toHaveProperty('totalValueLockedETH');
      });
  });

  // Test for getTokenData functionality
  it('/api/v1/token (GET)', () => {
    const tokenId = '0x95cef13441be50d20ca4558cc0a27b601ac544e5'; // Known token ID
    const expectedSymbol = 'MANTA';
    const expectedName = 'Manta';
    const expectedDecimals = '18';

    return request(app.getHttpServer())
      .get(`/api/v1/token?tokenId=${tokenId}`)
      .expect(200)
      .expect((res) => {
        const tokenData = res.body;
        expect(tokenData).toHaveProperty('symbol');
        expect(tokenData).toHaveProperty('name');
        expect(tokenData).toHaveProperty('decimals');
        expect(tokenData).toHaveProperty('totalSupply');
        expect(tokenData).toHaveProperty('volumeUSD');
        expect(tokenData).toHaveProperty('feesUSD');
        expect(tokenData).toHaveProperty('txCount');
        expect(tokenData).toHaveProperty('totalValueLocked');

        // Check known values
        expect(tokenData.symbol).toBe(expectedSymbol);
        expect(tokenData.name).toBe(expectedName);
        expect(tokenData.decimals).toBe(expectedDecimals);
      });
  });
});
