const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAllRepos() {
  return getReposByCreationDate(new Date().toISOString());
}

export async function getReposByCreationDate(created_at: string) {
  const url = `${baseUrl}/api/repos?created_at=${created_at}`;
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
  const url = `${baseUrl}/api/repos/${id}`;
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
  const url = `${baseUrl}/api/repos/search?${query}`;
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
