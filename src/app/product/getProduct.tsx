export async function getProduct() {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
}

export async function getProductByID(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}

export async function getProductByCategory(id: string) {
  const res = await fetch(`https://dummyjson.com/products/category/${id}`);
  return res.json();
}
