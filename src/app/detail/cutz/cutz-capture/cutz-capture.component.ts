import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cutz-capture',
  templateUrl: './cutz-capture.component.html',
  styleUrls: ['./cutz-capture.component.scss']
})
export class CutzCaptureComponent implements OnInit {
  cutzCaptureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cutzCaptureForm = this.fb.group({
      fecha_alta: [''],
      id_cortex: [''],
      estatus: ['ACTIVO'],
      descripcion: [''],
      total: ['']
    });
  }

  ngOnInit(): void {
    // Inicializar el formulario con datos si es necesario
  }

  onSubmit(): void {
    if (this.cutzCaptureForm.valid) {
      const formData = this.cutzCaptureForm.value;
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
    const cantidad = this.cutzCaptureForm.get('cantidad')?.value;
    const costo = this.cutzCaptureForm.get('costo')?.value;
    const total = cantidad * costo;
    this.cutzCaptureForm.get('total')?.setValue(total);
  }

  validar(): boolean {
    this.cutzCaptureForm.get('fecha_alta')?.setValue(new Date().toISOString().split('T')[0]);
    if (this.cutzCaptureForm.get('descripcion')?.value === '') {
      alert('Es necesario indicar la descripción del Corte');
      return false;
    }
    return true;
  }
}
