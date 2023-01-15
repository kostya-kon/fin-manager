import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WebhookData {
  @ApiProperty({
    description: 'Id of the webhook',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Webhook URL',
    example: 'https://webhook.site/5c6e66fb-e7d5-470f-b4e6-bf4fb7818d8d',
  })
  @IsString()
  url: string;
}
