import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
export { default } from '.';
import { getAllRepos, getRepo } from 'src/services/repo.service';
import { defaultMetaProps } from '@/components/layout/meta';

interface Params extends ParsedUrlQuery {
    repo: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { id } = context.params as Params;

    var repoData = await getRepo(parseInt(id as string));

    if (!repoData) {
        return {
            notFound: true,
        };
    }

    const { repos } = await getAllRepos();

    const ogUrl = `https://trendsgit.com/${repoData.repo.full_name}`;
    const meta = {
        ...defaultMetaProps,
        title: `${repoData.repo.full_name}'s Profile | TrendsGit`,
        ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
        ogUrl: `https://trendsgit.com/${repoData.repo.full_name}`
    };

    return {
        props: {
            meta,
            results: repos,
            repo: repoData.repo
        }
    };
};