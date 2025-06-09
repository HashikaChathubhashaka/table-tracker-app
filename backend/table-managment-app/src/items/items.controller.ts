import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/roles.guard';
import { Roles } from '../authentication/roles.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post() // create item -> only Admin can create items
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  create(@Body() createItemDto: { name: string; category: string; price: number }) {
    return this.itemsService.create(createItemDto);
  }

  @Get() // items list should be accessible to all users
  findAll() {
    return this.itemsService.findAll();
  }

  @Put(':id') // update item -> only Admin can update items
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateItemDto: { name: string; category: string; price: number }) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete('delete-by-name') // delete by name -> only Admin can delete items
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  async removeByName(@Body('name') name: string) {
    return this.itemsService.removeByName(name);
  }
}
