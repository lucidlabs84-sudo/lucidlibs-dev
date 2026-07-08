const PROXY_BASE_URL = "https://api.lucidlibs.dev";

export interface CheckoutResult {
  checkout_url?: string;
  session_id?: string;
  duplicate?: boolean;
  message?: string;
  error?: string;
}

export async function openCheckout(email?: string): Promise<CheckoutResult> {
  const res = await fetch(`${PROXY_BASE_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email || "" }),
  });

  const data = await res.json() as CheckoutResult;

  if (data.duplicate) {
    return { duplicate: true, message: data.message };
  }

  if (data.error) {
    console.error("Checkout error:", data.error);
    return { error: data.error };
  }

  if (data.checkout_url) {
    window.open(data.checkout_url, "_blank", "noopener,noreferrer");
  }

  return data;
}
