import Link from 'next/link';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useEffect, useState } from 'react';
import { GitHubIcon, LoadingDots, SearchIcon } from '@/components/icons';
import DirectoryResults from './directory-results';
import { searchRepos } from 'src/services/repo.service';
import { getAllLanguages } from 'src/services/language.service';

export default function Directory({
  repos,
}: {
  repos: any[];
}) {

  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchedRepos, setSearchedRepos] = useState<any[] | null>(null);
  const debouncedQuery = useDebounce(query, 200);
  const [loading, setLoading] = useState(false); // Add a loading state
  const [languages, setLanguages] = useState<string[]>([]); // State for languages

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    performSearch();
  }, [debouncedQuery, selectedLanguage, selectedTopic]);

  async function performSearch() {
    const queryParams = new URLSearchParams();
    if (debouncedQuery.length > 0 || selectedLanguage) {
      setSearchedRepos(null);
      setLoading(true);

      if (debouncedQuery.length > 0) {
        queryParams.append('name', debouncedQuery);
      }

      if (selectedLanguage) {
        queryParams.append('language', selectedLanguage);
      }

      const { repos } = await searchRepos(queryParams.toString());

      setLoading(false);
      setSearchedRepos(repos);
    } else {
      setSearchedRepos(null);
    }
  }

  async function fetchLanguages() {
    try {
      const { languages } = await getAllLanguages();
      if (!languages.length) {
        throw new Error('Network response was not ok');
      }

      setLanguages(languages);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  }

  return (
    <aside className="flex-shrink-0 w-full bg-black sm:w-96 h-full overflow-scroll border-r border-gray-800">
      <div className="px-6 pt-6 pb-0 sticky top-0 bg-black z-20">
        <Link href="https://github.com/onurkanbakirci/trendsgit">
          <GitHubIcon className="h-6 w-6 text-white" />
        </Link>
        <p className="mt-8 text-2xl text-white font-bold">Historical Trending Repositories</p>
        <p className="mt-2 text-sm text-dark-accent-5">
          Search in trending repositories by historically
        </p>
        <form className="py-8 flex flex-col space-y-4">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search by repo name
            </label>
            <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
              <div className="absolute bg-black inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-dark-accent-3" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="text-white placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-black focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
                placeholder="Search by repo name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent default action on Enter key
                  }
                }}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              className="bg-black text-white border border-dark-accent-2 rounded px-2 py-1 text-sm flex-1"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            <select
              className="bg-black text-white border border-dark-accent-2 rounded px-2 py-1 text-sm flex-1"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">All Topics</option>
            </select>
          </div>
        </form>
      </div>

      {/* Directory list */}
      <nav
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
        aria-label="Directory"
      >
        {debouncedQuery.length === 0 && selectedLanguage == "" ? (
          repos.map((repo) => (
            <div key={repo.daysAgo} className="relative">
              <div className="bg-dark-accent-1 px-6 py-1 text-sm font-bold text-white uppercase">
                <h3>
                  {repo.daysAgo === 0
                    ? 'Today'
                    : repo.daysAgo === 1
                      ? 'Yesterday'
                      : repo.daysAgo <= 7
                        ? new Date(repo.repos[0].created_at).toLocaleDateString('en-US', { weekday: 'long' })
                        : new Date(repo.repos[0].created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                </h3>
              </div>
              <DirectoryResults repos={repo.repos} />
            </div>
          ))
        )
          : searchedRepos && searchedRepos.length > 0 ? (
            <DirectoryResults repos={searchedRepos} />
          )
            : !loading && (
              <div className="px-6 py-6">
                <p className="text-center text-gray-500">No results found</p>
              </div>
            )}
        {loading && (
          <div className="flex justify-center">
            <LoadingDots color={'#FFF'} />
          </div>
        )}
      </nav>
    </aside>
  );
}
