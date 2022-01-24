import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { ParticipantesService } from 'src/participantes/participantes.service';


@Injectable()
export class CronService {
    constructor(private httpService: HttpService, private participantesService: ParticipantesService) {}

    @Cron('*/30 * * * * *')
    async runEvery15Seconds() {
        let value = await lastValueFrom(this.httpService.get("https://data.directory.openbankingbrasil.org.br/participants"));
        await new Promise((resolve) => setTimeout((resolve),10000));
        for (let i of value.data) {
            var nome_org: string = JSON.parse(JSON.stringify((i.OrganisationName)));
            var nome: string = JSON.parse(JSON.stringify((i.AuthorisationServers[0].CustomerFriendlyName)));
            var logo: string = JSON.parse(JSON.stringify((i.AuthorisationServers[0].CustomerFriendlyLogoUri)));
            var link: string = JSON.parse(JSON.stringify((i.AuthorisationServers[0].OpenIDDiscoveryDocument)));
            const participante = {
                organizationName: nome_org,
                customerFriendlyLogoUri: logo,
                customerFriendlyName: nome,
                url_server: link
            };
            const exists = await this.participantesService.findOnebyOrganizationName(nome_org);
            if(!(exists)){
                this.participantesService.create(participante)
            }
        }
    }
}
