const AUTH_STORAGE_KEY = "ritesh_portfolio_admin_auth";

export function getStoredAuth() {
  const value = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    clearStoredAuth();
    return null;
  }
}

export function getStoredToken() {
  return getStoredAuth()?.token || "";
}

export function setStoredAuth(authPayload) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
