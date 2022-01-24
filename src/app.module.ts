import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantesModule } from './participantes/participantes.module';

@Module({
  imports: [ParticipantesModule,MongooseModule.forRoot('mongodb+srv://lsantos0142:Z6zhkNwSUxN4PJx@cluster0.xz3at.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
