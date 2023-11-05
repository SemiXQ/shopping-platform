import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Good } from 'src/app/data/models/good';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-good-item',
  templateUrl: './good-item.component.html',
  styleUrls: ['./good-item.component.less']
})
export class GoodItemComponent {
  good!: Good | undefined;
  quantityControl!: FormControl;
  constructor(private route: ActivatedRoute, 
              private goodService: GoodsService) {
    this.quantityControl = new FormControl<number>(1, [
      Validators.max(5),
      Validators.min(1)
    ]);
    route.params.subscribe(params => {
      this.good = goodService.getGoodById(params['id']);
    })
  }

  onSubmit() {
    // console.log(event);
    console.log("here", this.quantityControl.value);
  }
}
