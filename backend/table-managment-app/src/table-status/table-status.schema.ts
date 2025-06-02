import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableStatusDocument = TableStatus & Document;

@Schema({ collection: 'tableStatus' }) // Specify custom collection name
export class TableStatus {
  @Prop({ required: true })
  tableName: string;

  @Prop({ default: false })
  ordered: boolean;

  @Prop({ default: false })
  preparing: boolean;

  @Prop({ default: false })
  prepared: boolean;

  @Prop({ default: false })
  served: boolean;

  @Prop({ default: false })
  billed: boolean;

  // logs for each status change

  @Prop({ default: null })
  orderedBy: string;

  @Prop({ default: null })
  preparingBy: string;

  @Prop({ default: null })
  preparedBy: string;

  @Prop({ default: null })
  servedBy: string;

  @Prop({ default: null })
  billedBy: string;

}

export const TableStatusSchema = SchemaFactory.createForClass(TableStatus);