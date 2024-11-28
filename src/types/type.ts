import { type } from 'os';
import { SetStateAction } from 'react';
export interface IBackendRes<T> {
    items: SetStateAction<ICartItem[]>;
    error?: string | string[];
    message?: string;
    statusCode: number | string;
    data?: T;
}
export interface IModelPaginate<T> {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}
export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        email: string;
        name: string;
        role: string
    }
}
export type ItemCart = {
    user?: string;
    product: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    selected?: boolean;
};
export interface ICartItem {
    product: string,
    name: string,
    quantity: number,
    price: number,
    _id: string,
    isDeleted: boolean,
    deletedAt: Date
    selected?: boolean;
}
export interface ICart {
    _id: string,
    user: string,
    total: number,
    createdBy: any
    isDeleted: boolean,
    deletedAt: Date,
    items: ICartItem[]
}
export interface IAddress {
    province: string;
    district: string;
    ward: string;
    detail: string;
}
export enum RECEIPT_STATUS {
    CONFIRMED = 'CONFIRMED', //ĐƠN HÀNG ĐÃ XÁC NHẬN
    UNCONFIRMED = 'UNCONFIRMED', // ĐƠN HÀNG MỚI 
    PREPARE = 'PREPARE',// SHOP ĐANG CHUẨN BỊ HÀNG
    ON_DELIVERY = 'ON_DELIVERY',// ĐANG GIAO HÀNG
    DELIVERED = 'DELIVERED',// ĐÃ GIAO HÀNG THÀNH CÔNG
    CANCEL = 'CANCEL'// HỦY ĐƠN HÀNG
}
export enum PAYMENT_METHOD {
    COD = 'COD',
    VNPAY = 'VNPAY'
}

export interface IOrder {
    _id: string;
    user: string;
    address: IAddress;
    items: ICartItem[]
    supplier: string;
    total: number;
    notes: string;
    createdBy: any;
    statusUser: RECEIPT_STATUS;
    statusSupplier: RECEIPT_STATUS;
    isCheckout: boolean;
    confirmationDate: Date;
    isDeleted: boolean;
    deletedAt: any;
    createdAt: any;
    updatedAt: any;
    paymentMethod: any

}
export type Order = {
    _id: string;
    items: ItemCart[];
    user: string;
    deliveryAddress: Address;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
};
export interface IProductFavorite {

}
export interface IProduct {
    _id: string;
    name: string;
    category: string;
    brand: string;
    price: string | number;
    stock: string | number;
    description: string;
    shopName: string;
    rating: string;
    images: any;
    createdBy: string;
    isDeleted: boolean;
    deletedAt: boolean | null;
    createdAt: string;
    updatedAt: string;
}
export interface ICategory {
    _id?: string;
    name: string;
};

export type SignIn = {
    username: string;
    password: string;
};
export type SignUp = {
    name: string,
    email: string,
    password: string,
    // age: number | string,
    // gender: string,
    // address: string
};
export type User = {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    address: string;
    avatar: string;
    point?: string;
};


export type updatePassword = {
    user: string;
    oldPass: string;
    newPass: string;
};
export type updateEmail = {
    userId: string;
    newEmail: string;
};

export type Address = {
    _id?: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
    isDefault?: boolean;
};


export type AddressLess = {
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
    selected?: boolean;
};

export type UpdateAddress = {
    address: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};



export type Cart = {
    _id?: string;
    user: string;
    total: number;
    items: ItemCart[];
};

export type checkoutOrder = {
    items: ItemCart[];
    user: string;
    deliveryAddress: string;
    paymentMethod: string;
    total: number;
};

export type RemoveItemCart = {
    user: string;
    product: string;
};

export type updateOrder = {
    order: string;
    status: string;
};

export type upAvatar = {
    img: string;
    user: string;
};

export type getSizeOfColor = {
    id: string;
    color: string;
};

export type variantColor = {
    size: string;
    quantity: number;
};

export type Brand = {
    brand: string;
    quantity: number;
};

export type itemCartRandomVari = {
    product: string;
    image: string;
    name: string;
    price: number;
};

export type productByCate = {
    category: string;
    sort: string;
    brand: string;
    color: string;
    pageNumber: number;
};

export type findProduct = {
    keyword: string;
    sort: string;
    brand: string;
    color: string;
    pageNumber: number;
};

export type orderStatus = {
    status: string;
    user: string;
};
export type RVariant = {
    size: number;
    color: string;
    quantity: number;
};
export type upUser = {
    user: string;
    email: string;
    fullName: string;
    gender: string;
    birthDay: string;
    phone: string;
};



export type Comment = {
    [x: string]: any;
    _id: string;
    user: {
        avatar: string,
        name: string
    };
    product: {

    };
    rating: string;
    // like: number;
    // images: string;
};

export type Coupon = {
    _id: string;
    code: string;
    name: string;
    isActive: boolean;

};