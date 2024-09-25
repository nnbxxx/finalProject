// User API
import { IAccount, IBackendRes, ICategory, IModelPaginate, IProduct, SignIn, SignUp } from "../types/type";
import instance from "../utils/axios-customize";

export const userLogin = (user: SignIn) => {
    return instance.post<IBackendRes<IAccount>>("auth/login", {
        username: user.username,
        password: user.password,
    })
}
export const userSignup = (user: SignUp) => {
    const { name, email, password, age, gender, address } = user;
    return instance.post<any>("auth/register", {
        name, email, password, age, gender, address
    })
}
export const userLogout = () => {
    return instance.post<IBackendRes<string>>("auth/logout")
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
export const callFetchListCategory = (query: string) => {

    return instance.get<IBackendRes<IModelPaginate<ICategory>>>(`categories?${query}`);
}
export const callFetchProductById = (id: string) => {
    return instance.get<IBackendRes<IProduct>>(`products/${id}`);
}
