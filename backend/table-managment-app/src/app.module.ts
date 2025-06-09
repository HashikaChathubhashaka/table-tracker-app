import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module'; // Module for managing menu items
// import { GatewayModule } from './gateway/gateway.module'; //for testing purposes
import { TableStatusModule } from './table-status/table-status.module'; // Module for managing table status
import { TableItemsModule } from './table-items/table-items.module'; // Module for managing table items

// for authentication and user information
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module'; 

import { SettingsModule } from './settings/settings.module'; // Module for managing settings

import * as dotenv from 'dotenv'; 
dotenv.config(); // Load environment variables from .env file
@Module({
  imports: [
    
MongooseModule.forRoot(
  process.env.MONGODB_URI || "mongodb://localhost:27017/tablemanagmentapp"
),
    ItemsModule, // The module for accessing menu items
    TableStatusModule,
    TableItemsModule, // The module for managing table items
    // GatewayModule // The module for the WebSocket gateway - testing
    UserModule, // The module for user management
    AuthModule, // The module for authentication
    SettingsModule,


  ],
})
export class AppModule {}