import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableStatusService } from './table-status.service';
import { TableStatusGateway } from './table-status.gateway';
import { TableStatusController } from './table-status.controller';
import { TableStatus, TableStatusSchema } from './table-status.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TableStatus.name, schema: TableStatusSchema }])],
  providers: [TableStatusService, TableStatusGateway],
  controllers: [TableStatusController],
  exports: [TableStatusService],
})
export class TableStatusModule {}