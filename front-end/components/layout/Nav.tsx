import Link from 'next/link';
import Image from 'next/image';

const Nav: React.FC = () => {
    return (
        <header className="shadow-lg">
            <div className=" container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center hover:shadow-heavy duration-200">
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
                                className="text-sm font-semibold hover:text-white transition-colors hover:shadow-heavy duration-200 py-2 px-3 rounded-md hover:bg-secondary"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/teams"
                                className="text-sm font-semibold hover:text-white transition-colors hover:shadow-heavy duration-200 py-2 px-3 rounded-md hover:bg-secondary"
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
