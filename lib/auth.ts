export interface AdminUser {
  email: string
  name: string
}

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("adminUser")
  return user ? JSON.parse(user) : null
}

export const logoutAdmin = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminAuth")
  localStorage.removeItem("adminUser")
}
