export async function postAddress(payload: { name: string; description: string; longitude: number; latitude: number }) {
	const URI = "http://localhost:8080/api/v1/address/";
	await fetch(URI, { method: "POST", body: JSON.stringify(payload) });
}
