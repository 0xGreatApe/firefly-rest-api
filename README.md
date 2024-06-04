# Firefly Rest API

  <p align="center"> 
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>

## Description

This project exposes the Firefly V3 subgraph through a REST API built with the [Nest framework](https://github.com/nestjs/nest). The purpose of this API is to provide compatibility with data aggregators such as CoinMarketCap and CoinGecko.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

API documentation can be found at http://localhost:3000/ after running the application. The Swagger UI provides detailed information about each endpoint and allows you to test them interactively.

## API Endpoints

### Swaps

- **Endpoint:** /api/v1/swaps
- **Description:** Fetches swap transactions from the Firefly V3 subgraph.
- **Parameters:**
  - **first:** Number of results to return (default: 10)
  - **orderBy:** Field to order by (default: timestamp)
  - **orderDirection:** Order direction (asc/desc, default: desc)
  - **poolId:** Filter by pool ID (optional)

### Pools

- **Endpoint:** /api/v1/pools
- **Description:** Fetches a summary of all pools from the Firefly V3 subgraph.

### Factory

- **Endpoint:** /api/v1/factory
- **Description:** Fetches factory data from the Firefly V3 subgraph.
- **Parameters:**
  - **factoryId:** Factory ID (default: Firefly V3 Factory address 0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95)

### Token

- **Endpoint:** /api/v1/token
- **Description:** Fetches data for a specific token from the Firefly V3 subgraph.
- **Parameters:**
  - **tokenId**: Token ID (required)

## Example Queries

**Swap Query**

```
curl -X GET "http://localhost:3000/api/v1/swaps?first=10&orderBy=timestamp&orderDirection=desc"

```

**Pools Query**

```
curl -X GET "http://localhost:3000/api/v1/pools"

```

**Factory Query**

```
curl -X GET "http://localhost:3000/api/v1/factory?factoryId=0x8666EF9DC0cA5336147f1B11f2C4fC2ecA809B95"

```

**Token Query**

```
curl -X GET "http://localhost:3000/api/v1/token?tokenId=0x95cef13441be50d20ca4558cc0a27b601ac544e5"


```

## Deployments

The API has been setup for deploymnet on Vercel. The URL for the swagger docs on Vercel can be found [here](https://firefly-rest-api.vercel.app/)
