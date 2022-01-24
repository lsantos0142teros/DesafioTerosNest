
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParticipanteDocument = Participante & Document;

@Schema()
export class Participante {
  @Prop({unique: true})
  organizationName: string;

  @Prop()
  customerFriendlyLogoUri: string;

  @Prop()
  customerFriendlyName: string;

  @Prop()
  url_server: string;
}

export const ParticipanteSchema = SchemaFactory.createForClass(Participante);
