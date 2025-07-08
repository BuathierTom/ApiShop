export function useAuth() {
  const user = localStorage.getItem('user');
  const parsed = user ? JSON.parse(user) : null;

  return {
    isAuthenticated: !!parsed,
    user: parsed as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    } | null,
  };
}
