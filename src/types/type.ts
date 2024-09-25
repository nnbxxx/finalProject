import { type } from 'os';
export interface IBackendRes<T> {
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
export interface IProduct {
    _id?: string;
    name: string;
    category?: string;
    brand?: string;
    price?: string | number;
    description?: string;
    shopName?: string;
    rating?: string;
    image?: any;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
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
    age: number | string,
    gender: string,
    address: string
};
export type User = {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    address: string;
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



export type Variant = {
    listColor: string[];
    listSize: string[];
    quantity: number;
};

export type Address = {
    _id: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
    default: boolean;
};


export type AddressLess = {
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
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

export type Cart = {
    _id?: string;
    user: string;
    total: number;
    items: ItemCart[];
};

export type Order = {
    _id: string;
    items: ItemCart[];
    userID: string;
    deliveryAddress: Address;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
};
export type checkoutOrder = {
    items: ItemCart[];
    userID: string;
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
