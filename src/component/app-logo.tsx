import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function AppLogo() {
  return (
    <div
      className={` flex flex-row items-center leading-none text-white`}
    >
        <Image
        src="/logo.png"
        width={100}
        height={100}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]"></p> */}
    </div>
  );
}
