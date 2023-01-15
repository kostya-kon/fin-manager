import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { Webhook } from 'src/database/models/webhook.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Webhook])],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
