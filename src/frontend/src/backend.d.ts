import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ReserveOrderId = bigint;
export type OrderId = bigint;
export interface RankedAd {
    campaignId: AdCampaignId;
    makerId: MakerId;
    productId: ProductId;
    adType: string;
    adRankScore: number;
}
export type Time = bigint;
export type OrderItemId = bigint;
export interface StateCount {
    count: bigint;
    state: string;
}
export interface UserProfile {
    name: string;
    address: string;
    phone: string;
}
export interface OrderItem {
    id: OrderItemId;
    oilLevel: string;
    customerPrincipal?: Principal;
    saltLevel: string;
    productId: ProductId;
    orderId: OrderId;
    portionSize: string;
    spiceLevel: string;
    quantity: number;
    sweetnessLevel: string;
}
export type MakerId = bigint;
export interface CrmStats {
    loyalCustomers: bigint;
    totalOrders: bigint;
    newCustomers: bigint;
    totalRevenue: number;
    totalCustomers: bigint;
    atRiskCustomers: bigint;
    avgOrderValue: number;
}
export type CampaignId = bigint;
export interface CrmCampaign {
    id: CampaignId;
    status: string;
    name: string;
    createdAt: Time;
    sentCount: bigint;
    triggerType: string;
    channel: string;
    targetSegment: string;
}
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
    customerId?: CustomerId;
    quantityKg: number;
}
export interface BusBookingStats {
    toCityCounts: Array<[string, bigint]>;
    totalBookings: bigint;
    fromCityCounts: Array<[string, bigint]>;
}
export type BookingId = bigint;
export interface AdCampaign {
    id: AdCampaignId;
    status: string;
    totalOrders: bigint;
    targetState: string;
    name: string;
    createdAt: Time;
    bidPerClick: number;
    makerId: MakerId;
    totalImpressions: bigint;
    qualityScore: number;
    dailyBudget: number;
    totalSpend: number;
    adType: string;
    targetCategory: string;
    totalRevenue: number;
    totalClicks: bigint;
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
export type CustomerId = bigint;
export interface AdAnalytics {
    cpo: number;
    clicks: bigint;
    orders: bigint;
    roas: number;
    campaignId: AdCampaignId;
    impressions: bigint;
    totalSpend: number;
    totalRevenue: number;
}
export interface CustomerAccount {
    id: CustomerId;
    oilPreference: string;
    principal: Principal;
    asharfiPoints: bigint;
    signupDate: Time;
    city: string;
    name: string;
    spicePreference: string;
    email: string;
    state: string;
    sweetnessPreference: string;
    regionPreference: string;
    phone: string;
    dietType: string;
    lifecycleStage: string;
}
export type AdCampaignId = bigint;
export type ProductId = bigint;
export type TestimonialId = bigint;
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
export interface Testimonial {
    id: TestimonialId;
    customerName: string;
    createdAt: Time;
    message: string;
    rating: bigint;
    location: string;
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
    addAsharfiPoints(customerId: CustomerId, points: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookBus(customerName: string, customerPhone: string, fromCity: string, toCity: string, travelDate: Time, seatCount: bigint): Promise<BookingId>;
    convertReserveToOrder(reserveOrderId: ReserveOrderId): Promise<OrderId>;
    createAdCampaign(makerId: MakerId, name: string, adType: string, dailyBudget: number, bidPerClick: number, targetState: string, targetCategory: string): Promise<AdCampaignId>;
    createCampaign(name: string, channel: string, targetSegment: string, triggerType: string): Promise<CampaignId>;
    createMaker(maker: Maker): Promise<MakerId>;
    createOrder(productId: ProductId, customerName: string, customerPhone: string, customerAddress: string, quantityKg: number, advanceAmount: number, whatsappOrderText: string, customerId: CustomerId | null): Promise<OrderId>;
    createOrderItem(orderId: OrderId, productId: ProductId, quantity: number, spiceLevel: string, oilLevel: string, saltLevel: string, sweetnessLevel: string, portionSize: string): Promise<OrderItemId>;
    createProduct(product: Product): Promise<ProductId>;
    createTestimonial(testimonial: Testimonial): Promise<TestimonialId>;
    deleteMaker(id: MakerId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteTestimonial(id: TestimonialId): Promise<void>;
    getAdAnalytics(campaignId: AdCampaignId): Promise<AdAnalytics>;
    getAdCampaignsByMaker(makerId: MakerId): Promise<Array<AdCampaign>>;
    getAllAdCampaigns(): Promise<Array<AdCampaign>>;
    getAllCampaigns(): Promise<Array<CrmCampaign>>;
    getAllCustomers(): Promise<Array<CustomerAccount>>;
    getAllMakers(): Promise<Array<Maker>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getBusBookingStats(): Promise<BusBookingStats>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCrmStats(): Promise<CrmStats>;
    getCustomerById(id: CustomerId): Promise<CustomerAccount | null>;
    getMakerWithProducts(id: MakerId): Promise<[Maker, Array<Product>] | null>;
    getMakersByState(state: string): Promise<Array<Maker>>;
    getMyAccount(): Promise<CustomerAccount | null>;
    getMyOrderItems(): Promise<Array<OrderItem>>;
    getMyOrders(phone: string): Promise<Array<Order>>;
    getOrderById(orderId: OrderId): Promise<Order | null>;
    getOrderItemsByOrder(orderId: OrderId): Promise<Array<OrderItem>>;
    getPlatformAdRevenue(): Promise<number>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getProductsByState(state: string): Promise<Array<Product>>;
    getRankedAds(state: string, category: string): Promise<Array<RankedAd>>;
    getStatesListWithProductCounts(): Promise<Array<StateCount>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    pauseAdCampaign(id: AdCampaignId): Promise<void>;
    recordAdClick(campaignId: AdCampaignId, productId: ProductId, makerId: MakerId): Promise<number>;
    recordAdConversion(campaignId: AdCampaignId, orderValue: number): Promise<void>;
    recordAdImpression(campaignId: AdCampaignId, productId: ProductId, makerId: MakerId): Promise<void>;
    recordCustomerEvent(customerId: CustomerId, eventType: string, productId: ProductId): Promise<void>;
    registerCustomer(name: string, phone: string, email: string, city: string, state: string): Promise<CustomerAccount>;
    reserveProduct(productId: ProductId, customerName: string, customerPhone: string, customerAddress: string, quantityKg: number, advanceAmount: number, whatsappOrderText: string, customerId: CustomerId | null): Promise<ReserveOrderId>;
    resumeAdCampaign(id: AdCampaignId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedData(): Promise<void>;
    updateCampaignStatus(id: CampaignId, status: string): Promise<void>;
    updateMaker(maker: Maker): Promise<void>;
    updateMyAccount(name: string, phone: string, email: string, city: string, state: string, dietType: string, spicePreference: string, oilPreference: string, sweetnessPreference: string, regionPreference: string): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
}
