import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionData } from './classes/transaction-data.class';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request data',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @ApiOperation({ summary: 'Get transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [TransactionData],
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'page', type: Number, example: 1, required: true })
  @ApiParam({ name: 'limit', type: Number, example: 15, required: true })
  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.transactionService.findAll(page, limit);
  }

  @ApiOperation({ summary: 'Delete transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
