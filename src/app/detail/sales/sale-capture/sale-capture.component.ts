import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sale-capture',
  templateUrl: './sale-capture.component.html',
  styleUrls: ['./sale-capture.component.scss']
})
export class SaleCaptureComponent implements OnInit {
  saleCaptureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.saleCaptureForm = this.fb.group({
      id_venta: [''],
      id_articulo: [''],
      costo: [''],
      disponible: [''],
      cantidad: [''],
      total: [''],
      tipo_pago: ['']
    });
  }

  ngOnInit(): void {
    // Inicializar el formulario con datos si es necesario
  }

  onSubmit(): void {
    if (this.saleCaptureForm.valid) {
      const formData = this.saleCaptureForm.value;
      console.log('Form Data:', formData);
      // Aquí puedes agregar la lógica para enviar los datos a tu servidor
    }
  }

  cancelar(): void {
    // Lógica para cancelar el formulario
    console.log('Formulario cancelado');
  }

  soloNumeros(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  cambiaCobro(): void {
    // Lógica para cambiar el cobro basado en la cantidad y el costo
    const cantidad = this.saleCaptureForm.get('cantidad')?.value;
    const costo = this.saleCaptureForm.get('costo')?.value;
    const total = cantidad * costo;
    this.saleCaptureForm.get('total')?.setValue(total);
  }
}
