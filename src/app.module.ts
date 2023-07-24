import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017', { dbName: "QBH" }), UserModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
//mongodb://localhost:27017