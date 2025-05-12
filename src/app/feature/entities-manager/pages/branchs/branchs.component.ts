import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicFormComponent } from '../../../../shared/components/form/dynamic-form.component';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { TableComponent } from '../../../../shared/components/table-composition/table/table.component';

@Component({
  selector: 'branchs-entities-manager',
  imports: [TableCompositionComponent],
  templateUrl: './branchs.component.html',
})
export default class BranchsComponent {
  sucursales = [
    {
      nombre: 'Sucursal A',
      ciudad: 'Cuenca',
      telefono: '07-1234567',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal B',
      ciudad: 'Quito',
      telefono: '02-7654321',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal C',
      ciudad: 'Guayaquil',
      telefono: '04-9876543',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal D',
      ciudad: 'Loja',
      telefono: '07-1112233',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal E',
      ciudad: 'Ambato',
      telefono: '03-3344556',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal F',
      ciudad: 'Riobamba',
      telefono: '03-9988776',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal G',
      ciudad: 'Manta',
      telefono: '05-2233445',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal H',
      ciudad: 'Esmeraldas',
      telefono: '06-6677889',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal I',
      ciudad: 'Tena',
      telefono: '06-5544332',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal J',
      ciudad: 'Ibarra',
      telefono: '06-3344556',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal A',
      ciudad: 'Cuenca',
      telefono: '07-1234566',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal B',
      ciudad: 'Quito',
      telefono: '02-7654321',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal C',
      ciudad: 'Guayaquil',
      telefono: '04-9876543',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal D',
      ciudad: 'Loja',
      telefono: '07-1112233',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal E',
      ciudad: 'Ambato',
      telefono: '03-3344556',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal F',
      ciudad: 'Riobamba',
      telefono: '03-9988776',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal G',
      ciudad: 'Manta',
      telefono: '05-2233445',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal H',
      ciudad: 'Esmeraldas',
      telefono: '06-6677889',
      estado: 'Inactiva',
    },
    {
      nombre: 'Sucursal I',
      ciudad: 'Tena',
      telefono: '06-5544332',
      estado: 'Activa',
    },
    {
      nombre: 'Sucursal J',
      ciudad: 'Ibarra',
      telefono: '06-3344556',
      estado: 'Activa',
    },
  ];
}
