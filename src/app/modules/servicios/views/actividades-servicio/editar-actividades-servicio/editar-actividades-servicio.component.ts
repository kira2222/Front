import { Component } from '@angular/core';
import { ActividadesServicioApiService } from '../../../services/actividades-servicio-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'editar-actividades-servicio.component.html',
  styleUrls: ['editar-actividades-servicio.component.scss'],
})
export class EditarActividadesServicioComponent {
  totalRecords: number = 0;
  errorMessage: string = '';
  id: number | null = null;
  formulario: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]],
    activityDate: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private actividadesServicioService: ActividadesServicioApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      this.getActividadDeServicio(this.id);
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Formulario válido', this.formulario.value);
      alert('Formulario válido');
    } else {
      console.log('Formulario inválido');
      this.markFieldsAsTouched(this.formulario);
    }
  }

  markFieldsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  getActividadDeServicio(id: number) {
    const response =
      this.actividadesServicioService.getActividadDeServicioById(id);

    response.subscribe({
      next: (value) => {
        const { data } = value;
        this.formulario.setValue({
          description: data.description,
          priority: data.priority,
          status: data.status,
          activityDate: data.activityDate,
        });
      },
      error: (err) => {
        console.log(err);
        this.errorMessage =
          'Ha ocurrido un problema al intentar traer los registros de la tabla. Por favor contacte un administrador de inmediato.';
      },
    });
  }
}
