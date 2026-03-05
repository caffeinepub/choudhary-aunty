import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Maker,
  Order,
  OrderStatus,
  Product,
  StateCount,
  Testimonial,
} from "../backend.d";
import {
  LOCAL_MAKERS,
  LOCAL_PRODUCTS,
  LOCAL_STATE_COUNTS,
  getLocalMakersByState,
  getLocalProductById,
  getLocalProductsByState,
} from "../constants/localData";
import { useActor } from "./useActor";

// ============================================
// MAKERS
// ============================================

export function useGetAllMakers() {
  const { actor, isFetching } = useActor();
  return useQuery<Maker[]>({
    queryKey: ["makers"],
    queryFn: async () => {
      if (!actor) return LOCAL_MAKERS;
      try {
        const result = await actor.getAllMakers();
        return result.length > 0 ? result : LOCAL_MAKERS;
      } catch {
        return LOCAL_MAKERS;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: LOCAL_MAKERS,
  });
}

export function useGetMakersByState(state: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Maker[]>({
    queryKey: ["makers", "state", state],
    queryFn: async () => {
      if (!actor || !state) return getLocalMakersByState(state);
      try {
        const result = await actor.getMakersByState(state);
        return result.length > 0 ? result : getLocalMakersByState(state);
      } catch {
        return getLocalMakersByState(state);
      }
    },
    enabled: !!actor && !isFetching && !!state,
    placeholderData: state ? getLocalMakersByState(state) : [],
  });
}

export function useGetMakerWithProducts(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<[Maker, Product[]] | null>({
    queryKey: ["maker", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) {
        const localMaker = LOCAL_MAKERS.find((m) => m.id === id);
        if (!localMaker) return null;
        const localProducts = LOCAL_PRODUCTS.filter((p) => p.makerId === id);
        return [localMaker, localProducts];
      }
      try {
        const result = await actor.getMakerWithProducts(id);
        if (!result) {
          const localMaker = LOCAL_MAKERS.find((m) => m.id === id);
          if (!localMaker) return null;
          const localProducts = LOCAL_PRODUCTS.filter((p) => p.makerId === id);
          return [localMaker, localProducts];
        }
        // If backend products list is empty for this maker, fill from local
        const [maker, backendProducts] = result;
        const products =
          backendProducts.length > 0
            ? backendProducts
            : LOCAL_PRODUCTS.filter((p) => p.makerId === id);
        return [maker, products];
      } catch {
        const localMaker = LOCAL_MAKERS.find((m) => m.id === id);
        if (!localMaker) return null;
        const localProducts = LOCAL_PRODUCTS.filter((p) => p.makerId === id);
        return [localMaker, localProducts];
      }
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

// ============================================
// PRODUCTS
// ============================================

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return LOCAL_PRODUCTS;
      try {
        const result = await actor.getAllProducts();
        if (result.length === 0) return LOCAL_PRODUCTS;
        // Merge: use backend results but fill in missing states from local
        const backendStates = new Set(result.map((p) => p.state));
        const missingLocalProducts = LOCAL_PRODUCTS.filter(
          (p) => !backendStates.has(p.state),
        );
        return [...result, ...missingLocalProducts];
      } catch {
        return LOCAL_PRODUCTS;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: LOCAL_PRODUCTS,
  });
}

export function useGetProductsByState(state: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "state", state],
    queryFn: async () => {
      if (!actor || !state) return getLocalProductsByState(state);
      try {
        const result = await actor.getProductsByState(state);
        return result.length > 0 ? result : getLocalProductsByState(state);
      } catch {
        return getLocalProductsByState(state);
      }
    },
    enabled: !!actor && !isFetching && !!state,
    placeholderData: state ? getLocalProductsByState(state) : [],
  });
}

export function useGetProductById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) {
        return getLocalProductById(id ?? 0n) ?? null;
      }
      try {
        const result = await actor.getProductById(id);
        return result ?? getLocalProductById(id) ?? null;
      } catch {
        return getLocalProductById(id) ?? null;
      }
    },
    enabled: !!actor && !isFetching && id !== null,
    placeholderData: id !== null ? (getLocalProductById(id) ?? null) : null,
  });
}

// ============================================
// TESTIMONIALS
// ============================================

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

// ============================================
// ORDERS
// ============================================

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

// ============================================
// STATE COUNTS
// ============================================

export function useGetStateCounts() {
  const { actor, isFetching } = useActor();
  return useQuery<StateCount[]>({
    queryKey: ["stateCounts"],
    queryFn: async () => {
      if (!actor) return LOCAL_STATE_COUNTS;
      try {
        const result = await actor.getStatesListWithProductCounts();
        if (result.length === 0) return LOCAL_STATE_COUNTS;
        // Merge: fill in missing states from local
        const backendStates = new Set(result.map((s) => s.state));
        const missingLocalCounts = LOCAL_STATE_COUNTS.filter(
          (s) => !backendStates.has(s.state),
        );
        return [...result, ...missingLocalCounts];
      } catch {
        return LOCAL_STATE_COUNTS;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: LOCAL_STATE_COUNTS,
  });
}

// ============================================
// MUTATIONS — Makers
// ============================================

export function useCreateMaker() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (maker: Maker) => {
      if (!actor) throw new Error("Not connected");
      return actor.createMaker(maker);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["makers"] }),
  });
}

export function useUpdateMaker() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (maker: Maker) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateMaker(maker);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["makers"] }),
  });
}

export function useDeleteMaker() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMaker(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["makers"] }),
  });
}

// ============================================
// MUTATIONS — Products
// ============================================

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(product);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(product);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ============================================
// MUTATIONS — Testimonials
// ============================================

export function useCreateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTestimonial(testimonial);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTestimonial(testimonial);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

// ============================================
// MUTATIONS — Seed All Data
// ============================================

export function useSeedAllData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      makers,
      products,
    }: {
      makers: import("../backend.d").Maker[];
      products: import("../backend.d").Product[];
    }) => {
      if (!actor) throw new Error("Not connected");
      // Create makers first and collect their real IDs
      const makerIdMap: Record<number, bigint> = {};
      for (let i = 0; i < makers.length; i++) {
        const id = await actor.createMaker(makers[i]);
        makerIdMap[i] = id;
      }
      // Create products — update makerId using makerIdMap
      for (const product of products) {
        // makerIdMap keys are 0-based index, products already have makerId set to (index+1)
        // Find corresponding real maker ID
        const indexKey = Number(product.makerId) - 1;
        const realMakerId = makerIdMap[indexKey] ?? product.makerId;
        await actor.createProduct({ ...product, makerId: realMakerId });
      }
      return makerIdMap;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["makers"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

// ============================================
// MUTATIONS — Orders
// ============================================

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}
