import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://task:task@cluster0.oqwabdu.mongodb.net/?retryWrites=true&w=majority', { dbName: "QBH" }), UserModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
//mongodb://localhost:27017