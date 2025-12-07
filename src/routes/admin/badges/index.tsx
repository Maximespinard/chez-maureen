import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/badges/")({
	component: BadgesPage,
});

function BadgesPage() {
	return (
		<div>
			<div className="mb-6">
				<h1 className="text-text-dark text-2xl font-bold">Badges</h1>
				<p className="text-text-body text-sm">
					Gérez les badges (Bio, Local, Saison, Promo -20%, etc.)
				</p>
			</div>

			<div className="border-border-subtle rounded-lg border bg-white p-8 text-center">
				<p className="text-text-body">
					Page badges en construction... Les badges permettent de marquer les
					produits avec des labels comme Bio, Local, -20%, etc.
				</p>
			</div>
		</div>
	);
}
