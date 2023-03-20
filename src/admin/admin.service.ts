import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    return await this.adminRepo.create(createAdminDto);
  }

  async findAll() {
    const allAdmins = await this.adminRepo.findAll();
    if (allAdmins.length < 1) {
      throw new HttpException('Admins not found', HttpStatus.NOT_FOUND);
    }
    return allAdmins;
  }

  async findOne(id: number) {
    const oneAdmin = await this.adminRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!oneAdmin) {
      throw new HttpException('ID is not correct', HttpStatus.NOT_FOUND);
    }
    return oneAdmin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const check = await this.adminRepo.findByPk(id);
    if (!check) {
      throw new HttpException('ID is not correct', HttpStatus.NOT_FOUND);
    }
    await this.adminRepo.update(updateAdminDto, {
      where: {
        id: id,
      },
    });
    return true;
  }

  async remove(id: number) {
    const check = await this.adminRepo.findByPk(id);
    if (!check) {
      throw new HttpException('ID is not correct', HttpStatus.NOT_FOUND);
    }
    await this.adminRepo.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }

  async signup(username: string, password: string) {
    return await this.adminRepo.create({
      user_name: username,
      hashed_password: password,
    });
  }

  async getWithUsername(user_name: string) {
    const data = await this.adminRepo.findOne({
      where: {
        user_name: user_name,
      },
    });
    if (!data) {
      return null;
    }
    return data;
  }
}
