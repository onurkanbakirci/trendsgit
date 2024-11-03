//reduce datetime of every recodr on database created_at time on repo table

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repos = await prisma.repo.findMany();
  const updatedRepos = await Promise.all(
    repos.map(async (repo) => {
      const updatedRepo = await prisma.repo.update({
        where: { id: repo.id },
        //reduce dat -1 day
        data: {
          created_at: new Date(
            new Date(repo.created_at).getTime() - 24 * 60 * 60 * 1000
          )
        }
      });
      return updatedRepo;
    })
  );

  res.status(200).json({ data: updatedRepos });
}
