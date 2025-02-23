import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rent-capture',
  templateUrl: './rent-capture.component.html',
  styleUrls: ['./rent-capture.component.scss']
})
export class RentCaptureComponent implements OnInit {
  rentCaptureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rentCaptureForm = this.fb.group({
      renta_cortesia: [''],
      id_reg: [''],
      importe_hieloprivado: [''],
      clave_patin: [''],
      id_patin: [''],
      id_renta: [''],
      id_cliente: [''],
      tipo_renta: [''],
      tipo_pago: [''],
      id_instructor: [''],
      motivo: [''],
      renta: [''],
      tiempoF: [''],
      txtSeguridad: ['']
    });
  }

  ngOnInit(): void {
    // Inicializar el formulario con datos si es necesario
  }

  onSubmit(): void {
    if (this.rentCaptureForm.valid) {
      const formData = this.rentCaptureForm.value;
      console.log('Form Data:', formData);
      // Aquí puedes agregar la lógica para enviar los datos a tu servidor
    }
  }

  cancelar(): void {
    // Lógica para cancelar el formulario
    console.log('Formulario cancelado');
  }
}
