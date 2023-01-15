import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import * as models from './models';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private configService: ConfigService,
  ) {}

  createSequelizeOptions():
    | SequelizeModuleOptions
    | Promise<SequelizeModuleOptions> {
    return {
      logging: (msg) => this.logger.verbose(msg, 'Database'),
      dialect: this.configService.get('database.dialect'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      synchronize: this.configService.get('database.synchronize'),
      autoLoadModels: true,
      retryDelay: 3000,
      models: Object.values(models),
      pool: {
        min: this.configService.get('database.minPoolSize'),
        max: this.configService.get('database.maxPoolSize'),
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
    } as SequelizeModuleOptions;
  }
}
