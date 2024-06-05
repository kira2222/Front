import { Component } from '@angular/core';
import { OrdersApiService } from '../../services/orders-api.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Order } from '../../models/Order';
import { Observable, of } from 'rxjs';
import { Client } from '../../models/Client';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/modules/login/models/User';
import { Service } from '../../models/Service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'add-orders.component.html',
  styleUrls: ['add-orders.component.scss'],
})
export class AddOrdersComponent {
  totalRecords: number = 0;
  errorMessage: string = '';
  dataForm: FormGroup;
  filteredClients: Client[] = [];
  filteredUsers: User[] = [];
  filteredServices: Service[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ordersService: OrdersApiService,
    private router: Router
  ) {
    this.dataForm = this.fb.group({
      observations: ['', [Validators.required]],
      status: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
      orderServices: this.fb.array([]),
      technicianId: ['', [Validators.required]],
      scheduleDate: ['', [Validators.required]],
      scheduleTime: ['', [Validators.required]],
      totalCharged: [{ value: 0, disabled: true }],
    });
  }

  ngOnInit() {
    this.dataForm.valueChanges.subscribe((data) => {
      console.log(data);
      console.log(this.dataForm.get('technicianId')?.value);
    });
    this.orderServices.valueChanges.subscribe(() => {
      this.calculateTotalCharged();
    });
    this.showSnackbar('Orden creada exitosamente', true);

    this.searchClients('');
    this.searchUsers('');
    this.searchServices('');
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      this.dataForm.get('totalCharged')?.enable();

      const order: Order = this.dataForm.value;

      order.orderServices.forEach((orderService: any) => {
        orderService.orderServiceDate = this.transformDateForBackend(
          orderService.orderServiceDate
        );
        orderService.duration = this.transformDurationToBackend(
          orderService.duration
        );
      });

      this.ordersService.createOrder(order).subscribe(
        (response) => {
          this.showSnackbar('Orden creada exitosamente', true);

          setTimeout(() => {
            this.router.navigate(['/ordenes-trabajo']);
          }, 3000);
        },
        (error) => {
          console.error('Error al guardar la orden', error);
          this.showSnackbar('Error al guardar la orden', false);
        }
      );
    } else {
      this.markFieldsAsTouched(this.dataForm);
    }
  }

  onClientChange(event: any): void {
    const selectedClientId = event ? event.id : null;
    this.dataForm.get('clientId')?.setValue(selectedClientId);
  }

  searchClients(names: any): void {
    this.ordersService.searchClients(names).subscribe((clients) => {
      this.filteredClients = clients;
    });
  }

  searchUsers(name: any): void {
    this.ordersService.searchUsers(name).subscribe((users) => {
      this.filteredUsers = users;
    });
  }

  searchServices(description: any): void {
    this.ordersService.searchServices(description).subscribe((services) => {
      this.filteredServices = services;
    });
  }

  get orderServices(): FormArray {
    return this.dataForm.controls['orderServices'] as FormArray;
  }

  createOrderService(): FormGroup {
    return this.fb.group({
      serviceId: ['', [Validators.required]],
      observations: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      orderServiceDate: ['', [Validators.required]],
      price: [{ value: 0, disabled: false }, [Validators.required]],
    });
  }

  calculateTotalCharged(): void {
    const total = this.orderServices.controls.reduce((acc, control) => {
      return acc + (control.get('price')?.value || 0);
    }, 0);
    this.dataForm.get('totalCharged')?.setValue(total);
  }

  addOrderService(): void {
    this.orderServices.push(this.createOrderService());
  }

  removeOrderService(index: number): void {
    this.orderServices.removeAt(index);
  }

  onServiceChange(index: number, selectedService: any): void {
    const price = selectedService.price;
    this.orderServices.at(index).get('price')?.setValue(price);
    this.calculateTotalCharged();
  }

  // Utils

  markFieldsAsTouched(formGroup: FormGroup | FormArray): void {
    if (formGroup instanceof FormGroup || formGroup instanceof FormArray) {
      Object.values(formGroup.controls).forEach((control) => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFieldsAsTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  transformDateForBackend(date: string): string {
    const isoString = new Date(date).toISOString();
    return isoString.replace('Z', '');
  }

  transformDurationToBackend(time: string): string {
    if (!time || time.length !== 4) {
      console.error('Invalid time format. Expected HHmm format.');
      return '';
    }

    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(2), 10);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time. Hours or minutes are not numbers.');
      return '';
    }

    const totalSeconds = (hours * 60 + minutes) * 60;
    return `PT${totalSeconds}S`;
  }

  showSnackbar(message: string, isSuccess: boolean): void {
    const snackbarClass = isSuccess ? 'green-snackbar' : 'red-snackbar';

    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: [snackbarClass],
    });
  }
}
