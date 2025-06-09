import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TableStatus, TableStatusDocument } from './table-status.schema';
import { TableStatusGateway } from './table-status.gateway';

@Injectable()
export class TableStatusService {
  constructor(
    @InjectModel(TableStatus.name) private tableStatusModel: Model<TableStatusDocument>,
    private readonly tableStatusGateway: TableStatusGateway,
  ) {}

  async getAllTableStatuses(): Promise<TableStatus[]> {
    return this.tableStatusModel.find().exec();
  }

  async getTableStatusByTableName(tableName: string): Promise<TableStatus | null> {
    return this.tableStatusModel.findOne({ tableName }).exec();
  }

  async createTableStatus(tableStatus: TableStatus): Promise<TableStatus> {
    const newTableStatus = new this.tableStatusModel(tableStatus);
    return newTableStatus.save();
  }

  async updateTableStatusByTableName(tableName: string, tableStatus: Partial<TableStatus>): Promise<TableStatus | null> {
    const updatedTableStatus = await this.tableStatusModel.findOneAndUpdate({ tableName }, tableStatus, { new: true }).exec();
    if (updatedTableStatus) {
      this.tableStatusGateway.sendTableStatusUpdate(updatedTableStatus);
    }
    return updatedTableStatus;
  }

  async deleteTableStatusByTableName(tableName: string): Promise<TableStatus | null> {
    const deletedTableStatus = await this.tableStatusModel.findOneAndDelete({ tableName }).exec();
    if (deletedTableStatus) {
      this.tableStatusGateway.sendTableStatusUpdate({ tableName, deleted: true });
    }
    return deletedTableStatus;
  }
}



