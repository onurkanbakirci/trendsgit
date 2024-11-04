import Link from 'next/link';
import BlurImage from '../blur-image';
import { CheckInCircleIcon, ForkIcon, StarIcon, WatchIcon } from '@/components/icons';
import { languageColors } from '../language-colors';

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${Math.round(num / 100000) / 10}M`;
  } else if (num >= 1000) {
    return `${Math.round(num / 100) / 10}K`;
  }
  return num.toString();
};

export default function DirectoryResults({ repos }: { repos: any[] }) {
  return (
    <ul role="list" className="relative z-0 directory-divide-y">
      {repos?.map((repo) => (
        <li key={repo.id}>
          <Link href={`/${repo.id}`}>
            <div className="relative px-6 py-4 flex items-center space-x-3 focus-within:ring-0">
              <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                <BlurImage
                  src={repo.owner_avatar_url || '/default-repo-image.png'}
                  alt={repo.title}
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium text-white truncate">
                    {repo.full_name}
                  </p>
                  {repo.isVerified && (
                    <CheckInCircleIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <p className="text-sm text-dark-accent-5 truncate">
                  {repo.shortDescription || repo.description}
                </p>
                <div className="flex space-x-4 mt-2 text-sm text-dark-accent-5">
                  <div className="flex items-center">
                    <StarIcon />
                    {formatNumber(repo.stargazers_count)}
                  </div>
                  <div className="flex items-center">
                    <ForkIcon />
                    {formatNumber(repo.forks_count)}
                  </div>
                  <div className="flex items-center">
                    <WatchIcon />
                    {formatNumber(repo.subscribers_count)}
                  </div>
                  {repo.language && (
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${languageColors[repo.language] || 'bg-gray-400'
                        }`} />
                      {repo.language}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
