import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebhookData } from './classes/webhook-data.class';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @ApiOperation({ summary: 'Create webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhookService.create(createWebhookDto);
  }

  @ApiOperation({ summary: 'Get all webhooks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [WebhookData],
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.webhookService.findAll();
  }

  @ApiOperation({ summary: 'Get webhook by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: WebhookData,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Webhook id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, example: 1, required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Webhook id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhookService.update(+id, updateWebhookDto);
  }

  @ApiOperation({ summary: 'Delete webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Webhook id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(+id);
  }
}
