import { DataService } from './data-service';
import { Persona } from './persona.model';
import { Injectable } from "@angular/core";
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

@Injectable()
export class PersonaService {

  personas: Persona[] = [];

  constructor(private dataService: DataService){}

  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  obtenerPersonas(){
    return this.dataService.cargarPersonas();
  }

  agregaPersonas(persona: Persona){
    console.log("Persona a agregar " + persona.nombre);
    this.dataService.agregarPersona(persona).subscribe(
      (persona: Persona) => {
        //Recuperar el objeto Persona con id persona agregado
        console.log('se agrega al arreglo la persona recien insertada ' + persona.idPersona);
        this.personas.push(persona);
      }
    );
  }

  encontrarPersona(id: number){
    const persona: Persona = this.personas.find( persona => persona.idPersona == id);
    console.log('persona encontrada: ' + persona.idPersona + ' ' + persona.nombre);
    return persona;
  }

  modificarPersona(id: number, persona: Persona){
    console.log('persona a modificar: ' + persona.idPersona);
    const personaModificadaLocal = this.personas.find(persona => persona.idPersona == id);
    personaModificadaLocal.idPersona = persona.idPersona;
    personaModificadaLocal.nombre = persona.nombre;
    this.dataService.modificarPersona(id, persona);
  }

  eliminarPersona(id: number){
    console.log('Eliminar persona con id: ' + id);
    const index = this.personas.findIndex(persona => persona.idPersona == id);
    this.personas.splice(index,1);
    this.dataService.eliminarPersona(id);
  }

}
