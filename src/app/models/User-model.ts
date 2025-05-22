export interface UserModel {
    id: number,
    name: string,
    email: string,
    role: 'USER' | 'ADMIN'
}