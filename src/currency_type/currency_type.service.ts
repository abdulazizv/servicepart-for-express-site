import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CurrencyType } from './entities/currency_type.entity';

@Injectable()
export class CurrencyTypeService {
  constructor(
    @InjectModel(CurrencyType) private currencyRepo: typeof CurrencyType,
  ) {}
  async create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return await this.currencyRepo.create(createCurrencyTypeDto);
  }

  async findAll() {
    const allCurrency = await this.currencyRepo.findAll({
      include: { all: true },
    });
    if (!allCurrency) {
      throw new HttpException('Currencies not found!', HttpStatus.NOT_FOUND);
    }
    return allCurrency;
  }

  async findOne(id: number) {
    const oneCurrency = await this.currencyRepo.findByPk(id);
    if (!oneCurrency) {
      throw new HttpException(
        'Error, Information not found! ID is not correct',
        HttpStatus.NOT_FOUND,
      );
    }
    return oneCurrency;
  }

  async update(id: number, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    await this.currencyRepo.update(updateCurrencyTypeDto, {
      where: {
        id: id,
      },
    });
    return true;
  }

  async remove(id: number) {
    await this.currencyRepo.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
