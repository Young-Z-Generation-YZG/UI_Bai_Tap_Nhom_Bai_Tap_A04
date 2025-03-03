import {
  BaseResponseType,
  PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';

export type ProductItemType = {
  _id: string;
  id: string;
  product_name: string;
  product_price: number;
  product_slug: string;
  product_imgs: { secure_url: string }[];
};

export type ProductResponseType = BaseResponseType<
  PaginationResponseType<ProductItemType[]>
>;
