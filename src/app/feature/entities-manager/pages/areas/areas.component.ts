import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { JsonFormComponent } from '../../../../shared/components/json-form/json-form.component';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';

@Component({
  selector: 'areas-entites-manager',
  imports: [JsonFormComponent, TableCompositionComponent],
  templateUrl: './areas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AreasComponent {
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
