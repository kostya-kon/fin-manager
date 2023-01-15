import { OmitType, PartialType } from '@nestjs/swagger';
import { WebhookData } from '../classes/webhook-data.class';

export class CreateWebhookDto extends PartialType(
  OmitType(WebhookData, ['id'] as const),
) {}
