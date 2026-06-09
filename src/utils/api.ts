import type { ApiResponse } from "@/types";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(data.error || data.message || "Something went wrong");
  }

  return data;
}

export async function apiUpload<T>(
  url: string,
  formData: FormData
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(data.error || data.message || "Upload failed");
  }

  return data;
}
