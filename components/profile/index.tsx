import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  GitHubIcon,
  StarIcon,
  WatchIcon,
  ForkIcon,
  LawIcon,
  LoadingDots,
} from '@/components/icons';
import BlurImage from '../blur-image';
import { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { languageColors } from '../language-colors';
import { useRepoContext } from 'context/RepoContext';

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${Math.round(num / 100000) / 10}M`;
  } else if (num >= 1000) {
    return `${Math.round(num / 100) / 10}K`;
  }
  return num?.toString();
};

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({ id }: { id: any }) {
  const { repos } = useRepoContext();
  
  const [data, setData] = useState<any>();

  const [readmeContent, setReadmeContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  function getRepoById(repoId: any) {
    for (const item of repos) {
      const repo = item.repos.find((r: any) => r.id == repoId);
      if (repo) {
        return repo;
      }
    }    
    return null;
  }

  async function fetchReadme() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://raw.githubusercontent.com/${data.full_name}/${data.default_branch}/README.md`
      );

      const content = await response.text();
      setReadmeContent(content);
    } catch (error) {
      console.error('Error fetching README:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setData({
      ...getRepoById(id)
    })
    fetchReadme();
  }, [repos, id])

  return (
    <div className="min-h-screen pb-20">
      <div>
        <div
          className={`h-48 w-full lg:h-64 
          ${getGradient(data?.full_name)}`}
        />
        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
            <BlurImage
              src={data?.owner_avatar_url}
              alt={data?.owner_login}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center space-x-2">
                <a
                  href={data?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <h1 className="text-2xl font-semibold text-white truncate">
                    {data?.full_name}
                  </h1>
                </a>
                <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              </div>
              <div className="mt-2 flex space-x-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <StarIcon />
                  {formatNumber(data?.stargazers_count)}
                </div>
                <div className="flex items-center">
                  <ForkIcon />
                  {formatNumber(data?.forks_count)}
                </div>
                <div className="flex items-center">
                  <WatchIcon />
                  {formatNumber(data?.subscribers_count)}
                </div>
                {data?.language && (
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${languageColors[data?.language] || 'bg-gray-400'
                      }`} />
                    {data?.language}
                  </div>
                )}
                <div className="flex items-center">
                  <LawIcon className="w-4 h-4 mr-2" />
                  {data?.license_name || 'No License'}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <a
                href={data?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-white font-mono bg-black focus:outline-none focus:ring-0 transition-all"
              >
                <GitHubIcon className="mr-3 h-5 w-5 text-white" />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  disabled={tab.name !== 'Profile'}
                  className={`${tab.name === 'Profile'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                    }
                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className={`${profileWidth} mt-16`}>
        <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono prose prose-headings:text-white prose-a:text-white">
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingDots color={'#FFF'} />
            </div>
          ) : readmeContent ? (
            <Markdown options={{ disableParsingRawHTML: true }}>{readmeContent}</Markdown>
          ) : (
            <p>No readme.md file</p>
          )}
        </article>
      </div>
    </div>
  );
}

const tabs = [
  { name: 'README.md' },
];