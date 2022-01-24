import { Module } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Participante,ParticipanteSchema } from './entities/participante.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [MongooseModule.forFeature([{ name: Participante.name, schema: ParticipanteSchema }]),
    ScheduleModule.forRoot(),
    HttpModule],
  controllers: [ParticipantesController],
  providers: [ParticipantesService, CronService]
})
export class ParticipantesModule {}
