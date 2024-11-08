import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getAllRepos } from '../src/services/repo.service';
import { useRepoContext } from '../context/RepoContext';
import { useEffect } from 'react';

export default function Home({ id, repos }: { id: any, repos: any }) {
  const { setRepos } = useRepoContext();

  useEffect(() => {
    const fetchRepos = async () => { // Define async function to fetch repos
      const { repos } = await getAllRepos();
      setRepos(repos);
    };

    const checkAndFetchRepos = async () => { // New async function to handle logic
      if (repos && repos.length > 0) { // Check if repos is not empty
        setRepos(repos);
      } else {
        await fetchRepos(); // Await fetchRepos if repos is invalid
      }
    };

    checkAndFetchRepos(); // Call the new function
  }, [repos, setRepos]);

  return <Profile id={id} />;
}

export async function getServerSideProps() {

  const { repos } = await getAllRepos();

  return {
    props: {
      meta: defaultMetaProps,
      repos,
      id: repos[0].repos[0].id
    }
  };
};
