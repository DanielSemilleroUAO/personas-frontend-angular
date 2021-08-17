import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.personaService.obtenerPersonas().subscribe(
      (personasObtenidas: Persona[]) => {
        //cargamos los datos de personas obtenidos
        this.personas = personasObtenidas;
        this.personaService.setPersonas(this.personas);
        console.log('personas obtenenidas del subcriber: '+ this.personas);
      }
    );
  }

  irAgregar(){
    console.log('nos vamos a agregar');
    this.router.navigate(['./personas/agregar']);
  }

}
