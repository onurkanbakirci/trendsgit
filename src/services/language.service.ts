const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAllLanguages() {
  const url = `${baseUrl}/api/languages`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const { data } = await response.json();
  return {
    languages: data
  };
}
