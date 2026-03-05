import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: TestimonialId;
    customerName: string;
    createdAt: Time;
    message: string;
    rating: bigint;
    location: string;
}
export interface Product {
    id: ProductId;
    mrp: number;
    usp: string;
    preparationMethod: string;
    name: string;
    isAvailable: boolean;
    makerId: MakerId;
    sellingPrice: number;
    description: string;
    state: string;
    imageUrl: string;
    minBatchKg: number;
    category: string;
    ingredients: Array<string>;
}
export type Time = bigint;
export type OrderId = bigint;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    customerPhone: string;
    whatsappOrderText: string;
    createdAt: Time;
    makerId: MakerId;
    productId: ProductId;
    customerAddress: string;
    advanceAmount: number;
    totalAmount: number;
    quantityKg: number;
}
export interface Maker {
    id: MakerId;
    bio: string;
    name: string;
    photoUrl: string;
    isActive: boolean;
    whatsappNumber: string;
    state: string;
    story: string;
}
export type MakerId = bigint;
export type ProductId = bigint;
export type TestimonialId = bigint;
export interface StateCount {
    count: bigint;
    state: string;
}
export interface UserProfile {
    name: string;
    address: string;
    phone: string;
}
export enum OrderStatus {
    preparing = "preparing",
    pending = "pending",
    dispatched = "dispatched",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createMaker(maker: Maker): Promise<MakerId>;
    createOrder(productId: ProductId, customerName: string, customerPhone: string, customerAddress: string, quantityKg: number, advanceAmount: number, whatsappOrderText: string): Promise<OrderId>;
    createProduct(product: Product): Promise<ProductId>;
    createTestimonial(testimonial: Testimonial): Promise<TestimonialId>;
    deleteMaker(id: MakerId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteTestimonial(id: TestimonialId): Promise<void>;
    getAllMakers(): Promise<Array<Maker>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMakerWithProducts(id: MakerId): Promise<[Maker, Array<Product>] | null>;
    getMakersByState(state: string): Promise<Array<Maker>>;
    getOrderById(orderId: OrderId): Promise<Order | null>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getProductsByState(state: string): Promise<Array<Product>>;
    getStatesListWithProductCounts(): Promise<Array<StateCount>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedData(): Promise<void>;
    updateMaker(maker: Maker): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
}
