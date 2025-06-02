import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableItem } from './table-items.schema';

@Injectable()
export class TableItemsService {
  constructor(
    @InjectModel(TableItem.name) private tableItemModel: Model<TableItem>,
  ) {}

  async addItem(tableNumber: number, item: TableItem): Promise<TableItem> {
    const newItem = new this.tableItemModel({ ...item, tableNumber });
    return newItem.save();
  }

  async updateItems(tableNumber: number, items: TableItem[]): Promise<void> {
    await this.tableItemModel.deleteMany({ tableNumber });
    await this.tableItemModel.insertMany(
      items.map(item => ({ ...item, tableNumber })),
    );
  }

  async clearItems(tableNumber: number): Promise<void> {
    await this.tableItemModel.deleteMany({ tableNumber });
  }

  async getItemsByTableNumber(tableNumber: number): Promise<TableItem[]> {
    return this.tableItemModel.find({ tableNumber }).exec();
  }
  async getTableOrderedBoolean(tableNumber: number): Promise<boolean> {
    const items = await this.tableItemModel.find({ tableNumber }).exec();
    // make ordered boolean true if there are items in the table
    // and false if there are no items in the table
    
    return items.length > 0;
  }
}