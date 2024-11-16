import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { language, name } = req.query;

  try {
    const repos = await prisma.repo.findMany({
      where: {
        OR: [
          { full_name: { contains: name as string } },
          { language: { contains: language as string } }
        ]
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return res.status(200).json({ data: repos });
  } catch (e: any) {
    return res.status(500).json({ error: e.toString() });
  }
}
