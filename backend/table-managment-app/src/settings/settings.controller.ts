import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/roles.guard';
import { Roles } from '../authentication/roles.decorator';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('table-count')
  async getTableCount() {
    return await this.settingsService.getTableCount();
  }

  @Put('table-count')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  async updateTableCount(@Body('tableCount') tableCount: number) {
    return this.settingsService.updateTableCount(tableCount);
  }
}