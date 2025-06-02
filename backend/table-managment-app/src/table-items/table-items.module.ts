import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableItemsService } from './table-items.service';
import { TableItemsController } from './table-items.controller';
import { TableItem, TableItemSchema } from './table-items.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TableItem.name, schema: TableItemSchema }]),
  ],
  providers: [TableItemsService],
  controllers: [TableItemsController],
})
export class TableItemsModule {}