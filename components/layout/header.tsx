import { clearToken } from "@/lib/token";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            AeroCompliance Pro
          </Link>

          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/aircraft" className="hover:text-gray-300">
              Aircraft
            </Link>
            <Link href="/audits" className="hover:text-gray-300">
              Audits
            </Link>
            <Link href="/compliance" className="hover:text-gray-300">
              Compliance
            </Link>
            <Link href="/notifications" className="hover:text-gray-300">
              Notifications
            </Link>
            <Link href="/records" className="hover:text-gray-300">
              Records
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
