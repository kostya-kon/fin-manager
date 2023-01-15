import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticDto } from './dto/statistic.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiOperation({ summary: 'Get statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        categoryname: {
          type: 'number',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Id not was not found',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  getStats(@Body() statisticDto: StatisticDto) {
    console.log(statisticDto);
    return this.statisticService.getStats(statisticDto);
  }
}
