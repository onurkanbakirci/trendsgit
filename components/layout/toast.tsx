import { getGradient } from '@/lib/gradients';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Toast({ username }: { username?: string }) {
  const [bannerHidden, setBannerHidden] = useState(true);

  useEffect(() => {
    setBannerHidden(Cookies.get('mongo-banner-hidden') === 'true');
  }, []);

  return bannerHidden ? null : (
    <div
      className={`rounded-[16px] ${getGradient(
        username
      )} w-11/12 sm:w-[581px] h-[160px] sm:h-[80px] p-0.5 absolute z-10 bottom-10 left-0 right-0 mx-auto`}
    >
      <div className="rounded-[14px] w-full h-full bg-[#111111] flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-white text-[13px] font-mono w-[304px] h-[40px] flex items-center justify-center p-3">
          Our data is updated daily at UTC 00:00 to ensure you have the latest insights and trends.
          <button
            className="contents underline text-blue-400 font-bold"
            onClick={() => {
              setBannerHidden(true);
              Cookies.set('mongo-banner-hidden', 'true');
            }}
          >
            Dismiss →
          </button>
        </p>

      </div>
    </div>
  );
}
