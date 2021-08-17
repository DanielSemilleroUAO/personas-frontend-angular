import { Persona } from './persona.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {

  urlBase = "http://localhost:8080/personas-backend-java/webservice/persona";

  constructor(private httpClient: HttpClient){
  }

  cargarPersonas(){
    return this.httpClient.get(this.urlBase);
  }

  agregarPersona(persona: Persona){
    return this.httpClient.post(this.urlBase, persona);
  }

  modificarPersona(idPersona: number, persona: Persona){
    let url: string;
    url = this.urlBase + "/" + idPersona;
    this.httpClient.put(url, persona)
      .subscribe(
        (response)=>{
          console.log("resultado de modificar persona : " + response);
        },
        (error)=> console.log("error en moficiar persona" + error)
      );
  }

  eliminarPersona(idPersona: number){
    let url: string;
    url = this.urlBase + "/" + idPersona;
    this.httpClient.delete(url).subscribe(
      (response)=>{
        console.log("resultado de eliminar persona : " + response);
      },
      (error)=> console.log("error en eliminar persona" + error)
    );
  }

}
