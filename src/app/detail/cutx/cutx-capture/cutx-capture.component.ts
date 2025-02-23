import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cutx-capture',
  templateUrl: './cutx-capture.component.html',
  styleUrls: ['./cutx-capture.component.scss']
})
export class CutxCaptureComponent implements OnInit {
  cutxCaptureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cutxCaptureForm = this.fb.group({
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
    if (this.cutxCaptureForm.valid) {
      const formData = this.cutxCaptureForm.value;
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
    const cantidad = this.cutxCaptureForm.get('cantidad')?.value;
    const costo = this.cutxCaptureForm.get('costo')?.value;
    const total = cantidad * costo;
    this.cutxCaptureForm.get('total')?.setValue(total);
  }

  validar(): boolean {
    this.cutxCaptureForm.get('fecha_alta')?.setValue(new Date().toISOString().split('T')[0]);
    if (this.cutxCaptureForm.get('descripcion')?.value === '') {
      alert('Es necesario indicar la descripción del Corte');
      return false;
    }
    return true;
  }
}
