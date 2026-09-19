export async function uploadOrderDocument(orderId: string, file: File) {
  const urlRes = await fetch("/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, contentType: file.type }),
  });
  if (!urlRes.ok) throw new Error("Could not get upload URL");
  const { url } = await urlRes.json();

  const putRes = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!putRes.ok)
    throw new Error(`Could not upload the file (${putRes.status})`);

  const doneRes = await fetch("/api/upload-complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!doneRes.ok) throw new Error("Could not save document");
}
