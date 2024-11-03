const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAllRepos() {
  const url = `${baseUrl}/api/repos`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const { data } = await response.json();
  return {
    repos: data
  };
}

export async function getRepo(id: number) {
  const url = `${baseUrl}/api/repos?id=${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const { data } = await response.json();
  return {
    repo: data
  };
}

export async function searchRepos(query: string) {
  const url = `${baseUrl}/api/repos?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const { data } = await response.json();
  return {
    repos: data
  };
}
