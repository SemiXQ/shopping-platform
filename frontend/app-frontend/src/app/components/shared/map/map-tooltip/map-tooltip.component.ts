import { Component, Input } from '@angular/core';
import { Store } from 'src/app/data/models/store';

@Component({
  selector: 'app-map-tooltip',
  templateUrl: './map-tooltip.component.html',
  styleUrls: ['./map-tooltip.component.less']
})
export class MapTooltipComponent {
  @Input({required: true}) storeData!: Store;
}
