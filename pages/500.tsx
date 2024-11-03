import { defaultMetaProps } from "@/components/layout/meta";

import Meta from "@/components/layout/meta";

export default function Custom500() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <Meta
        props={{
          ...defaultMetaProps,
          title: '500 | TrendsGit',
          ogUrl: 'https://trendsgit.com/500'
        }}
      />
      <h1 className="text-2xl font-light text-white">
        500 <span className="mx-3 text-4xl">|</span> Internal Server Occured
      </h1>
    </div>
  );
}
