import { prisma } from '@/lib/db';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch trending page
    const response = await axios.get('https://github.com/trending?since=daily');
    const $ = cheerio.load(response.data);
    const repos = [];

    // Find repository links and extract owner/repo
    const repoLinks = $('a[href*="/"]:has(.octicon-repo)');

    for (const link of repoLinks) {
      const href = $(link).attr('href');
      if (!href) continue;

      // Remove leading slash and get owner/repo
      const fullName = href.substring(1);

      try {
        // Fetch detailed repo information from GitHub API
        const apiResponse = await axios.get(
          `https://api.github.com/repos/${fullName}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json'
              // Add your GitHub token if you have one
              // 'Authorization': 'token YOUR_GITHUB_TOKEN'
            }
          }
        );

        const repoData = apiResponse.data;

        repos.push({
          github_id: repoData.id.toString(),
          node_id: repoData.node_id.toString(),
          name: repoData.name,
          full_name: repoData.full_name,
          owner_login: repoData.owner.login,
          owner_id: repoData.owner.id.toString(),
          owner_avatar_url: repoData.owner.avatar_url,
          owner_html_url: repoData.owner.html_url,
          html_url: repoData.html_url,
          description: repoData.description,
          url: repoData.url,
          size: repoData.size,
          stargazers_count: repoData.stargazers_count,
          watchers_count: repoData.watchers_count,
          language: repoData.language,
          forks_count: repoData.forks_count,
          open_issues_count: repoData.open_issues_count,
          license_key: repoData.license?.key || null,
          license_name: repoData.license?.name || null,
          topics: repoData.topics.join(','), // Converting array to comma-separated string
          default_branch: repoData.default_branch,
          subscribers_count: repoData.subscribers_count,
          created_at: new Date(Date.now())
        });
      } catch (apiError) {
        console.error(`Failed to fetch details for ${fullName}:`, apiError);
      }

      // Add a small delay to avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const reversedRepos = repos.reverse();

    try {
      const insert = await prisma.repo.createMany({
        data: reversedRepos
      });

      if (insert.count === repos.length) {
        console.log('Successfully inserted records');
      }
    } catch (insertError) {
      console.error('Error inserting records:', insertError);
      // Optionally, you can send a more specific error response
      res
        .status(500)
        .json({ error: 'Failed to insert records', details: insertError });
    }
    res.status(200).send('ok.');
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
}

export default handler;
