import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  readonly developmentFormat = winston.format.combine(
    winston.format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  );

  readonly productionFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  );

  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      level: this.configService.get('LOG_LEVEL') || 'info',
      format:
        this.configService.get('NODE_ENV') === 'production'
          ? this.productionFormat
          : this.developmentFormat,
      transports: [new winston.transports.Console()],
    };
  }
}
