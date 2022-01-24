import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';
import { Participante, ParticipanteDocument } from './entities/participante.entity';

@Injectable()
export class ParticipantesService {
  constructor(@InjectModel(Participante.name) private participanteModel: Model<ParticipanteDocument>) {}

  deleteAll(){
    return this.participanteModel.deleteMany({})
  }

  create(createParticipanteDto: CreateParticipanteDto) {
    const participante = new this.participanteModel(createParticipanteDto);
    return participante.save();
  }

  async findOnebyOrganizationName(organizationName: string){
    return await this.participanteModel.exists({organizationName: organizationName});
  }
  findAll() {
    return this.participanteModel.find({},{_id:0,__v:0});
  }

  findOne(id: string) {
    return this.participanteModel.findById(id);
  }

  update(id: string, updateParticipanteDto: UpdateParticipanteDto) {
    return this.participanteModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: updateParticipanteDto,
    },
    {
      new: true,
    });
  }

  remove(id: string) {
    return this.participanteModel.deleteOne({
      _id: id,
    }).exec();
  }
}
