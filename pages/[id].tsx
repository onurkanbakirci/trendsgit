import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
export { default } from '.';
import { getRepo } from 'src/services/repo.service';
import { defaultMetaProps } from '@/components/layout/meta';

interface Params extends ParsedUrlQuery {
    repo: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { id } = context.params as Params;

    if (!id) {
        return {
            notFound: true,
        };
    }

    const ogUrl = `https://trendsgit.com/`;
    const meta = {
        ...defaultMetaProps,
        title: `Profile | TrendsGit`,
        ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
        ogUrl
    };

    return {
        props: {
            meta,
            id
        }
    };
};