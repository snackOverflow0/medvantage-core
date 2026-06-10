import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import Redis from 'ioredis';

@Injectable()
export class AppointmentProcessor {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  @OnEvent('appointment.placed', { async: true })
  async handleAsynchronousAnalyticsCounter(payload: { appointmentId: string; doctorLicense: string; clinicId: string }) {
    console.log(`[EVENT INTERCEPTED]: Asynchronous workflow triggered for Appointment ID: ${payload.appointmentId}`);

    const cacheMetricsKey = `metrics:clinic:${payload.clinicId}:total-bookings`;

    try {
      const newTotalCount = await this.redisClient.incr(cacheMetricsKey);
      
      console.log(`[REDIS CACHE ENGINE COMPLETED]: Incremented metrics pipeline counter key: ${cacheMetricsKey} -> Current Live Stand: ${newTotalCount}`);
    } catch (error) {
      console.error('[BACKGROUND PIPELINE RUNTIME CRASH]: Redis data caching connection timed out.', error);
    }
  }
}