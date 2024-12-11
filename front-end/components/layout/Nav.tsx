import Link from 'next/link';
import Image from 'next/image';

const Nav: React.FC = () => {
    return (
        <header className="shadow-lg bg-secondary">
            <div className=" container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center hover:shadow-md hover:shadow-neutral-400 duration-200">
                    <Image
                        src="/images/TeamTrackLogo.png"
                        alt="TeamTrack logo"
                        width={200}
                        height={50}
                        className="w-auto h-10"
                    />
                </Link>
                <nav className="text-primary">
                    <ul className="text-text flex items-center space-x-1">
                        <li>
                            <Link
                                href="/"
                                className="text-sm font-semibold hover:text-white hover:shadow-md hover:shadow-neutral-400 transition-shadow duration-200 rounded px-3 py-2 hover:bg-accent"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/teams"
                                className="text-sm font-semibold hover:text-white transition-colors  hover:shadow-md hover:shadow-neutral-400 transition-shadow duration-200 rounded px-3 py-2 hover:bg-accent"
                            >
                                Teams
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Nav;
