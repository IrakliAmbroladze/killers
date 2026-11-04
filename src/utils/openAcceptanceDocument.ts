export const openAcceptanceDocument = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const win = window.open("", "_blank");
  try {
    const res = await fetch(`/api/document-url?orderId=${orderId}`);
    if (!res.ok) throw new Error(`document-url failed (${res.status})`);
    const { url } = await res.json();
    if (win) win.location.href = url;
  } catch (e) {
    console.error(e);
    win?.close();
  }
};
