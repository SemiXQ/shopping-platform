import { Cart } from "src/app/data/models/cart";

export const sample_carts: Cart[] = [
    {
        user_id: '1',
        goods_info: [
            {
                good_id: '2',
                good_count: 10
            }
        ],
        price_amount: 0,
        isDirty: false,
        timeStamp: 1700313957,
    },
    {
        user_id: '2',
        goods_info: [],
        price_amount: 0,
        isDirty: false,
        timeStamp: 0
    }

]