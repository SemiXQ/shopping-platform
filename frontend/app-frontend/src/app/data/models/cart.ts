interface GoodCount {
    good_id: string,
    good_count: number
}

export class Cart {
    id!: string;
    goods_info!: GoodCount[];
    price_amount!: number;
    isDirty!: boolean;
}