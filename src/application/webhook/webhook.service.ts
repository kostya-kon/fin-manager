import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Webhook } from 'src/database/models/webhook.model';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Webhook)
    private webhookModel: typeof Webhook,
  ) {}
  create(createWebhookDto: CreateWebhookDto) {
    return this.webhookModel.create({ ...createWebhookDto });
  }

  findAll() {
    return this.webhookModel.findAll();
  }

  findOne(id: number) {
    const webhook = this.webhookModel.findByPk(id);
    if (!webhook) {
      throw new NotFoundException(`Webhook with id=${id} not found`);
    }
    return webhook;
  }

  async update(id: number, updateWebhookDto: UpdateWebhookDto) {
    const webhook = await this.webhookModel.findByPk(id);
    if (!webhook) {
      throw new NotFoundException(`Webhook with id=${id} not found`);
    }
    return webhook.update(updateWebhookDto);
  }

  async remove(id: number) {
    const webhook = await this.webhookModel.findByPk(id);
    if (!webhook) {
      throw new NotFoundException(`Webhook with id=${id} not found`);
    }
    return webhook.destroy();
  }
}
