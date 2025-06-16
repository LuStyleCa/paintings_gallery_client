export interface UserModel {
    id: number,
    username: string,
    email: string,
    role: 'USER' | 'ADMIN'
}