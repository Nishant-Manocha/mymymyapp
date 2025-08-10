export const BACKEND_URL = "https://finguard-server.onrender.com";

export async function checkBackendConnection() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`);
    if (res.ok) {
      console.log("✅ Backend connected!");
      return true;
    } else {
      console.log("❌ Backend not connected (status code)");
      return false;
    }
  } catch (err) {
    console.log("❌ Backend not connected (network error)");
    return false;
  }
}
