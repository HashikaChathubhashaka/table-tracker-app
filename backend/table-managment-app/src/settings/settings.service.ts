import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './settings.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Settings.name) private settingsModel: Model<Settings>) {}

  async getTableCount(): Promise<number> {
    const settings = await this.settingsModel.findOne();
    return settings?.tableCount ?? 0;
  }

  async updateTableCount(count: number): Promise<Settings> {
    let settings = await this.settingsModel.findOne();
    if (!settings) {
      settings = new this.settingsModel({ tableCount: count });
    } else {
      settings.tableCount = count;
    }
    return settings.save();
  }
}