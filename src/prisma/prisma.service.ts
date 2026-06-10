import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('\x1b[34m[MEDVANTAGE DATA LAYER]\x1b[0m Relational PostgreSQL connection established cleanly.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}