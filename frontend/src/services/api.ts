// API Service Layer for Frontend-Backend Communication
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor: Attach Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: Handle 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// --- API DEFINITIONS ---

// Auth API
export const authAPI = {
  register: (userData: any) => api.post("/auth/register", userData),
  login: (credentials: any) => api.post("/auth/login", credentials),
  getMe: () => api.get("/auth/me"),
  updateDetails: (userData: any) => api.put("/auth/me", userData),
  changePassword: (passwords: any) =>
    api.put("/auth/change-password", passwords),
  logout: () => api.post("/auth/logout"),
};

// Services API
export const servicesAPI = {
  getAll: (params?: any) => api.get("/services", { params }),
  getById: (id: string) => api.get(`/services/${id}`),
  getCategories: () => api.get("/services/categories/list"),
  // Admin Only
  create: (formData: FormData) =>
    api.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: string, formData: FormData) =>
    api.put(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/services/${id}`),
  deleteImage: (id: string, imageId: string) =>
    api.delete(`/services/${id}/images/${imageId}`),
};

// Blog API
export const blogAPI = {
  getAll: (params?: any) => api.get("/blog", { params }),
  getById: (id: string) => api.get(`/blog/${id}`),
  getBySlug: (slug: string) => api.get(`/blog/slug/${slug}`),
  getCategories: () => api.get("/blog/categories/list"),
  getTags: () => api.get("/blog/tags/list"),
  getFeatured: () => api.get("/blog/featured/list"),
  // Admin Only
  create: (formData: FormData) =>
    api.post("/blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: string, formData: FormData) =>
    api.put(`/blog/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/blog/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/blog/${id}/status`, { status }),
  deleteImage: (id: string, imageId: string) =>
    api.delete(`/blog/${id}/images/${imageId}`),
};

// Bookings API
export const bookingsAPI = {
  // Public/User
  create: (bookingData: any) => api.post("/bookings", bookingData),
  getMyBookings: (params?: any) => api.get("/bookings/my-bookings", { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  cancel: (id: string) => api.put(`/bookings/${id}/cancel`),
  getAvailableSlots: (date: string) =>
    api.get(`/bookings/available-slots?date=${date}`),

  // Admin Only
  getAll: (params?: any) => api.get("/bookings", { params }),
  confirm: (id: string) => api.put(`/bookings/${id}/confirm`),
  assignTechnician: (id: string, technicianId: string) =>
    api.put(`/bookings/${id}/assign`, { technician: technicianId }),
  updateStatus: (id: string, status: string) =>
    api.put(`/bookings/${id}/status`, { status }),
};

// Contact API
export const contactAPI = {
  sendMessage: (data: any) => api.post("/contact", data),
  // Admin Only
  getAll: (params?: any) => api.get("/contact", { params }),
  getById: (id: string) => api.get(`/contact/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/contact/${id}/status`, { status }),
  resolve: (id: string) => api.put(`/contact/${id}/resolve`),
  close: (id: string) => api.put(`/contact/${id}/close`),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

// Users API (Admin Only)
export const usersAPI = {
  getAll: (params?: any) => api.get("/users", { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (userData: any) => api.post("/users", userData),
  update: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  delete: (id: string) => api.delete(`/users/${id}`),
  updateRole: (id: string, role: string) =>
    api.put(`/users/${id}/role`, { role }),
  getTechnicians: () => api.get("/users/technicians/list"),
};

// Admin Stats API
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard"),
  getAnalytics: (period: string) =>
    api.get("/admin/analytics", { params: { period } }),
  getSystemHealth: () => api.get("/admin/health"),
};

export default api;
