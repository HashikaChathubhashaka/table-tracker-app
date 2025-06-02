import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { TableStatus } from './table-status.schema';

@Controller('table-status')
export class TableStatusController {
  constructor(private readonly tableStatusService: TableStatusService) {}

  @Get()
  async getAllTableStatuses(): Promise<TableStatus[]> {
    return this.tableStatusService.getAllTableStatuses();
  }

  @Get(':tableName')
  async getTableStatusByTableName(@Param('tableName') tableName: string): Promise<TableStatus | null> {
    return this.tableStatusService.getTableStatusByTableName(tableName);
  }

  @Post()
  async createTableStatus(@Body() tableStatus: TableStatus): Promise<TableStatus> {
    return this.tableStatusService.createTableStatus(tableStatus);
  }

  @Put(':tableName')
  async updateTableStatusByTableName(@Param('tableName') tableName: string, @Body() tableStatus: Partial<TableStatus>): Promise<TableStatus | null> {
    return this.tableStatusService.updateTableStatusByTableName(tableName, tableStatus);
  }

  @Delete(':tableName')
  async deleteTableStatusByTableName(@Param('tableName') tableName: string): Promise<TableStatus | null> {
    return this.tableStatusService.deleteTableStatusByTableName(tableName);
  }
}