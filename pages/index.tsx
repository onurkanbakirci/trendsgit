import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getAllRepos, getRepo } from '../src/services/repo.service';

export default function Home({ repo }: { repo: any }) {
  return <Profile repo={repo} />;
}

export async function getServerSideProps() {

  const { repos } = await getAllRepos();

  return {
    props: {
      meta: defaultMetaProps,
      results: repos,
      repo: repos[0].repos[0]
    }
  };
};
