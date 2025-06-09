import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}

  async create(createItemDto: { name: string; category: string; price: number }): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item | null> {
    return this.itemModel.findById(id).exec();
  }
  
  async update(id: string, updateItemDto: { name: string; category: string; price: number }): Promise<Item | null> {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }
  
  async remove(id: string): Promise<Item | null> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
  
  // Add to items.service.ts
  async removeByName(name: string) {
    return this.itemModel.deleteOne({ name });
  }
  
}
