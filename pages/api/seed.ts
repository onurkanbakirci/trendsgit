import type { NextApiRequest, NextApiResponse } from 'next';
import getTrendingRepos from 'scripts/github-setup';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const message = await getTrendingRepos();

  if (message) {
    res.status(500).json({
      error: { message }
    });
  } else {
    res.status(200).send('ok.');
  }
}

export default handler;
