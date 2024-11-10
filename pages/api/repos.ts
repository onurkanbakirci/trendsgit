import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, language, created_at } = req.query;

  try {
    if (id) {
      const repo = await prisma.repo.findUnique({
        where: { id: parseInt(id as string) }
      });

      if (!repo) {
        return res.status(404).json({ error: 'Repo not found' });
      }

      return res.status(200).json({ data: repo });
    }

    if (name || language) {
      const whereClause: any = {};
      if (name) {
        whereClause.full_name = { contains: name as string };
      }
      if (language) {
        whereClause.language = { contains: language as string };
      }
      if (created_at) {
        const createdDate = new Date(created_at as string);
        const oneWeekPrior = new Date(
          createdDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        whereClause.created_at = {
          gte: oneWeekPrior,
          lte: createdDate
        };
      }

      const repos = await prisma.repo.findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc'
        }
      });

      return res.status(200).json({ data: repos });
    }

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const repos = await prisma.repo.findMany({
      where: {
        created_at: {
          gte: oneWeekAgo
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Group repos by days from today
    const today = new Date().toISOString().split('T')[0];

    const groupedData = repos.reduce((acc: any[], repo) => {
      const repoDate = new Date(repo.created_at).toISOString().split('T')[0];
      const diffDays = Math.floor(
        (new Date(today).getTime() - new Date(repoDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Find existing group or create new one
      let group = acc.find((g) => g.daysAgo === diffDays);
      if (!group) {
        group = { daysAgo: diffDays, repos: [] };
        acc.push(group);
      }
      group.repos.push(repo);
      return acc;
    }, []);

    // Sort groups by days ago
    groupedData.sort((a, b) => a.daysAgo - b.daysAgo);

    return res.status(200).json({ data: groupedData });
  } catch (e: any) {
    return res.status(500).json({
      error: e.toString()
    });
  }
}
