import { Component } from '@angular/core';
import { ActividadesServicioApiService } from '../../../services/actividades-servicio-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'agregar-actividades-servicio.component.html',
  styleUrls: ['agregar-actividades-servicio.component.scss'],
})
export class AgregarActividadesServicioComponent {
  totalRecords: number = 0;
  errorMessage: string = '';
  formulario: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]],
    warrantyEndDate: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private actividadesServicioService: ActividadesServicioApiService
  ) {}

  ngOnInit() {}

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
}
