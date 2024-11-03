import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getAllRepos, getRepo } from '../src/services/repo.service';

export default function Home({ repo }: { repo: any }) {
  return <Profile repo={repo} />;
}

export async function getServerSideProps() {

  const { repos } = await getAllRepos();
  const { repo } = await getRepo(1);

  return {
    props: {
      meta: defaultMetaProps,
      results: repos,
      repo: repo
    }
  };
};
