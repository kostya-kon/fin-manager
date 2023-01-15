import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './application/category/category.module';
import { SequelizeConfigService } from './database/sequelize-config.service';
import { RootWinstonModule } from './winston/root-winston.module';
import { ConfigModule } from '@nestjs/config';
import { BankModule } from './application/bank/bank.module';
import { TransactionModule } from './application/transaction/transaction.module';
import { WebhookModule } from './application/webhook/webhook.module';
import { StatisticModule } from './application/statistic/statistic.module';
import databaseConfig from './config/database.config ';

@Module({
  imports: [
    CategoryModule,
    RootWinstonModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    BankModule,
    TransactionModule,
    WebhookModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
