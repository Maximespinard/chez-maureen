import { Outlet, createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "@/lib/auth.middleware";
import { authClient } from "@/lib/auth-client";
import { PageTransition } from "@/components/transitions/page-transition";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
	server: {
		middleware: [authMiddleware],
	},
});

function AdminLayout() {
	const { data: session } = authClient.useSession();

	// Show loader if no session
	if (!session) {
		return <PageTransition isReady={false}>{null}</PageTransition>;
	}

	return (
		<PageTransition isReady={!!session}>
			<div className="bg-surface-warm flex h-screen">
				<AdminSidebar />
				<div className="flex flex-1 flex-col overflow-hidden">
					<AdminHeader />
					<main className="flex-1 overflow-auto p-6">
						<Outlet />
					</main>
				</div>
			</div>
		</PageTransition>
	);
}
