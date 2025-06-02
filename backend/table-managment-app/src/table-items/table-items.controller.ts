import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { TableItemsService } from './table-items.service';
import { TableItem } from './table-items.schema';

@Controller('table-items')
export class TableItemsController {
  constructor(private readonly tableItemsService: TableItemsService) {}

  @Post(':tableNumber')
  async addItem(
    @Param('tableNumber') tableNumber: number,
    @Body() item: TableItem,
  ) {
    return this.tableItemsService.addItem(tableNumber, item);
  }

  @Put(':tableNumber')
  async updateItems(
    @Param('tableNumber') tableNumber: number,
    @Body() items: TableItem[],
  ) {
    return this.tableItemsService.updateItems(tableNumber, items);
  }

  @Delete(':tableNumber')
  async clearItems(@Param('tableNumber') tableNumber: number) {
    return this.tableItemsService.clearItems(tableNumber);
  }

  @Get(':tableNumber')
  async getItemsByTableNumber(@Param('tableNumber') tableNumber: number) {
    return this.tableItemsService.getItemsByTableNumber(tableNumber);
  }

  @Get('/ordered/:tableNumber')
  async getTableOrderedBoolean(@Param('tableNumber') tableNumber: number) {
    return this.tableItemsService.getTableOrderedBoolean(tableNumber);
  }
}