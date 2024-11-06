// User API
import { Address, IAccount, IBackendRes, ICart, ICategory, IModelPaginate, IOrder, IProduct, SignIn, SignUp } from "../types/type";
import instance from "../utils/axios-customize";

export const userLogin = (user: SignIn) => {
    return instance.post<IBackendRes<IAccount>>("auth/login", {
        username: user.username,
        password: user.password,
    })
}
export const userSignup = (user: SignUp) => {
    const { name, email, password } = user;
    // const { name, email, password, age, gender, address } = user;
    return instance.post<any>("auth/register", {
        name, email, password,
    })
}
export const getUserInfo = (_id: string) => {
    return instance.get<IBackendRes<any>>(`users/${_id}`)
}
export const updateUserProfile = (data: any) => {
    return instance.patch<IBackendRes<any>>(`users/profile`, data)
}

export const getAddressUserDefault = () => {
    return instance.get<IBackendRes<any>>(`address-user/user/default-address`)
}
export const updateAddressUserDefault = (id: string) => {
    return instance.patch<IBackendRes<any>>(`/address-user/user/default/${id}`);
}
export const removeAddressUser = (id: string) => {
    return instance.delete<IBackendRes<any>>(`/address-user/user/remove/${id}`);
}
export const userLogout = () => {
    return instance.post<IBackendRes<string>>("auth/logout")
}
export const getProfileUser = () => {
    return instance.get<IBackendRes<any>>(`auth/account`)
}
export const userRetryActive = (email: string) => {
    return instance.post<IBackendRes<any>>("auth/retry-active", { email });
}
export const userCheckCodeActive = (email: string, code: string) => {
    return instance.post<IBackendRes<any>>("auth/check-code", { email, code })
}
export const userRetryPassword = (email: string) => {
    return instance.post<IBackendRes<any>>("auth/retry-password", { email })
}
export const userChangePassword = (email: string, code: string, password: string, newPassword: string) => {
    return instance.post<IBackendRes<any>>("auth/retry-password", { email, code, password, newPassword })
}

export const callFetchListProduct = (query: string) => {
    return instance.get<IBackendRes<IModelPaginate<IProduct>>>(`products?populate=category&fields=category.name&${query}`);
}
export const callFetchListFavouriteProduct = () => {
    return instance.get<IBackendRes<any>>(`like-products/user`)
}
export const callFetchListCategory = (query: string) => {

    return instance.get<IBackendRes<IModelPaginate<ICategory>>>(`categories?${query}`);
}
export const callFetchProductById = (id: string) => {
    return instance.get<IBackendRes<IProduct>>(`products/${id}`);
}
export const checkFavoriteProduct = (id: string) => {
    return instance.get<IBackendRes<any>>(`like-products/user/${id}`);
}
export const addFavoriteProduct = (data: any) => {
    return instance.post<IBackendRes<any>>(`like-products/add`, data)
}
export const removeFavoriteProduct = (id: string) => {
    return instance.delete<IBackendRes<any>>(`like-products/${id}`)
}
export const fetchCommentProduct = (id: string) => {
    return instance.get<IBackendRes<any>>(`reviews?current=1&pageSize=1111&productId=${id}`);
}

export const getCartByUser = () => {
    return instance.get<IBackendRes<ICart>>(`carts/user`)
}
export const getCouponsByUser = (id: string) => {
    return instance.get<IBackendRes<any>>(`users/coupon/${id}`)
}
export const removeCartItemUser = (id: string) => {
    return instance.delete<IBackendRes<ICart>>(`carts/${id}`)
}
export const addCartItemUser = (product: any) => {
    return instance.post<IBackendRes<ICart>>(`carts/add`, { product })
}
export const checkoutReceipt = (data: any) => {
    return instance.post<IBackendRes<any>>(`receipts`, data)
}
export const unactiveCouponReceipt = (id: string, data: any) => {
    return instance.post<IBackendRes<any>>(`receipts/coupon/unactive/${id}`, data);
}
export const activeCouponReceipt = (id: string, data: any) => {
    return instance.post<IBackendRes<any>>(`receipts/coupon/active/${id}`, data);
}

export const callFetchListReceipt = (query: string) => {
    return instance.get<IBackendRes<IModelPaginate<any>>>(`receipts?current=1&pageSize=999?${query}`);
}
export const getReceiptById = (id: string) => {
    return instance.get<IBackendRes<IOrder>>(`receipts/${id}`)
}
export const returnReceipt = (data: any) => {
    return instance.post<IBackendRes<any>>(`receipts/user/return`, data)
}


export const callCreateNewUserAddress = (data: Address) => {
    return instance.post<IBackendRes<any>>(`/address-user`, data)
}
export const callFetchListUserAddress = (userId: string) => {
    return instance.get<IBackendRes<IModelPaginate<any>>>(`address-user?current=1&pageSize=111&user=${userId}`)
}

export const callCreateNewReviewProduct = (data: any) => {
    return instance.post<IBackendRes<any>>(`reviews`, data);
}