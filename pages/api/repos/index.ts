import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const baseDate = req.query.created_at
      ? new Date(req.query.created_at as string)
      : new Date();

    const oneWeekAgo = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const repos = await prisma.repo.findMany({
      where: {
        created_at: {
          gte: oneWeekAgo,
          ...(req.query.created_at ? { lt: baseDate } : { lte: baseDate })
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const groupedData = repos.reduce((acc: any[], repo) => {
      const repoDate = new Date(repo.created_at).toISOString().split('T')[0];
      const diffDays = Math.floor(
        (new Date().getTime() - new Date(repoDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      let group = acc.find((g) => g.daysAgo === diffDays);
      if (!group) {
        group = { daysAgo: diffDays, repos: [] };
        acc.push(group);
      }
      group.repos.push(repo);
      return acc;
    }, []);

    groupedData.sort((a, b) => a.daysAgo - b.daysAgo);

    return res.status(200).json({ data: groupedData });
  } catch (e: any) {
    return res.status(500).json({ error: e.toString() });
  }
}
