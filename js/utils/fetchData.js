export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error('Fetch error:', err.message);
    throw err;
  }
}
