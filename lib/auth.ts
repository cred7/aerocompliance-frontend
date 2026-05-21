import { api } from "./api";

export async function loginUser(credentials: {
  username: string;
  password: string;
}) {
  const { data } = await api.post("/api/users/users/login/", credentials);

  return data; // expects { access, refresh }
}
