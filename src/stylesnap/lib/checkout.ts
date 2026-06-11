const PROXY_BASE_URL = "https://api.lucidlibs.dev";

export async function openCheckout(email?: string): Promise<void> {
  const res = await fetch(`${PROXY_BASE_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email || "" }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("Checkout error:", data.error);
    alert("Failed to start checkout. Please try again.");
    return;
  }

  window.open(data.checkout_url, "_blank", "noopener,noreferrer");
}