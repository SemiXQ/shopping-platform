const API_URL: string = 'http://localhost:5000';

const goodsURL: string = API_URL + '/goods';
const getAllGoodsUrl: string = goodsURL;
const getGoodItemById: (id:string) => string = (id:string) => goodsURL + `/${id}`

export const GOOD_URLS = {
    getAll: getAllGoodsUrl,
    getItemById: getGoodItemById,
}