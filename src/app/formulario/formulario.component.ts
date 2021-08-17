import { Persona } from './../persona.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from './../persona-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  nombreInput : string;
  idPersona: number;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idPersona = this.route.snapshot.params.idPersona;
    console.log('Recuperamos el parametro idPersona: ' + this.idPersona);
    if(this.idPersona != null){
      const persona = this.personaService.encontrarPersona(this.idPersona);
      if(persona != null){
        this.nombreInput = persona.nombre;
      }
    }
  }

  onGuardarPersona(){
    if(this.idPersona != null){
      this.personaService.modificarPersona(this.idPersona, new Persona(this.idPersona, this.nombreInput));
    } else {
      const personaGuardar = new Persona(this.idPersona, this.nombreInput);
      this.personaService.agregaPersonas(personaGuardar);
    }
    this.router.navigate(['personas']);
  }

  onEliminarPersona(){
    if(this.idPersona != null){
      console.log('Persona a eliminar: ' + this.idPersona);
      this.personaService.eliminarPersona(this.idPersona);
    }
    this.router.navigate(['personas']);
  }

}
