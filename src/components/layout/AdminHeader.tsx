import { LogOut, Menu  } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminStore } from "@/stores/admin.store";
import { authClient } from "@/lib/auth-client";

export function AdminHeader() {
	const { toggleSidebar } = useAdminStore();
	const { data: session } = authClient.useSession();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await authClient.signOut();
		navigate({ to: "/" });
	};

	return (
		<header className="border-border-subtle sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
			{/* Mobile Menu Toggle */}
			<button
				onClick={toggleSidebar}
				className="text-text-body rounded-lg p-2 transition-colors hover:bg-gray-50 lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu className="size-5" />
			</button>

			{/* Spacer for desktop */}
			<div className="hidden lg:block" />

			{/* User Menu */}
			<div className="flex items-center gap-4">
				{session?.user && (
					<div className="text-sm">
						<span className="text-text-dark font-medium">
							{session.user.name || session.user.email}
						</span>
					</div>
				)}

				<button
					onClick={handleLogout}
					className="text-text-body flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
					title="Déconnexion"
				>
					<LogOut className="size-4" />
					<span className="hidden sm:inline">Déconnexion</span>
				</button>
			</div>
		</header>
	);
}
