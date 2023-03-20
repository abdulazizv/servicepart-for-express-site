import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusRepo: typeof Status,
  ) {}
  async create(createStatusDto: CreateStatusDto) {
    return await this.statusRepo.create(createStatusDto);
  }

  async findAll() {
    const allStatus = await this.statusRepo.findAll({ include: { all: true } });
    if (allStatus.length < 1) {
      throw new HttpException('Statuses not found', HttpStatus.NOT_FOUND);
    }
    return allStatus;
  }

  async findOne(id: number) {
    const oneStatus = await this.statusRepo.findByPk(id);
    if (!oneStatus) {
      throw new HttpException('ID is not correct', HttpStatus.NOT_FOUND);
    }
    return oneStatus;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const check = await this.statusRepo.findByPk(id);
    if (!check) {
      throw new HttpException('ID is not correct! ', HttpStatus.NOT_FOUND);
    }
    await this.statusRepo.update(updateStatusDto, {
      where: {
        id: id,
      },
    });
    return true;
  }

  async remove(id: number) {
    const check = await this.statusRepo.findByPk(id);
    if (!check) {
      throw new HttpException('ID is not correct', HttpStatus.NOT_FOUND);
    }
    await this.statusRepo.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
