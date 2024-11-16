import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const repo = await prisma.repo.findUnique({
      where: { id: parseInt(id as string) }
    });

    if (!repo) {
      return res.status(404).json({ error: 'Repo not found' });
    }

    return res.status(200).json({ data: repo });
  } catch (e: any) {
    return res.status(500).json({ error: e.toString() });
  }
} 