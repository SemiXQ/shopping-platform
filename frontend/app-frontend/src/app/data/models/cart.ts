interface GoodCount {
    good_id: string,
    good_count: number
}

export interface GoodDetail extends GoodCount {
    good_name: string,
    good_imgUrl: string,
    good_price: number,
    good_preprice: number
}

export class Cart {
    user_id!: string;
    goods_info!: GoodCount[];
    price_amount!: number;
    isDirty!: boolean;
    timeStamp!: number;
}

export class DetailedCart extends Cart {
    good_detail!: GoodDetail[]
}