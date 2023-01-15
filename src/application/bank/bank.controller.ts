import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { BankData } from './classes/bank-data.class';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @ApiOperation({ summary: 'Create bank' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @ApiOperation({ summary: 'Get all banks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BankData],
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.bankService.findAll();
  }

  @ApiOperation({ summary: 'Get bank by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BankData,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, example: 1, required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update bank' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(+id, updateBankDto);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id);
  }
}
