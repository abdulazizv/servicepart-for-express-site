import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';

@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @Post()
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.create(createCurrencyTypeDto);
  }

  @Get()
  findAll() {
    return this.currencyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return this.currencyTypeService.update(+id, updateCurrencyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.remove(+id);
  }
}
