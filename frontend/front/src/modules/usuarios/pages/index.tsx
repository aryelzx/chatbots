import { useEffect, useState } from "react";
import { UsersLayout } from "../layout/layout";
import { useUsersServices } from "../services/users.service";
import type { IUser } from "../interfaces/user-interface";

function UsuariosPages() {
	const [users, setUsers] = useState<IUser[]>([]);
	async function handleGetAllUsers() {
		try {
			const { user } = await useUsersServices.getAll();
			setUsers(user);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}
	useEffect(() => {
		handleGetAllUsers();
	}, []);

	return (
		<UsersLayout>
	<div className="p-4">
	<h1 className="text-2xl font-bold mb-6">Usuários</h1>

	<div className="overflow-x-auto rounded-lg shadow border border-muted">
		<table className="min-w-full divide-y divide-muted bg-background text-sm">
			<thead className="bg-muted/30">
				<tr>
					<th className="px-4 py-3 text-left font-medium text-foreground">Nome</th>
					<th className="px-4 py-3 text-left font-medium text-foreground">Email</th>
					<th className="px-4 py-3 text-left font-medium text-foreground">CPF</th>
					<th className="px-4 py-3 text-left font-medium text-foreground">Cargo</th>
					<th className="px-4 py-3 text-center font-medium text-foreground">Tem Chat?</th>
					<th className="px-4 py-3 text-left font-medium text-foreground">Último Chat</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-muted">
				{users.map((user) => (
					<tr key={user.id} className="hover:bg-muted/10 transition">
						<td className="px-4 py-2">{user.nome}</td>
						<td className="px-4 py-2">{user.email}</td>
						<td className="px-4 py-2">{user.cpf}</td>
						<td className="px-4 py-2 capitalize">{user.role === "A" ? "Admin" : "Usuário"}</td>
						<td className="px-4 py-2 text-center">
							<span
								className={`inline-block w-3 h-3 rounded-full ${
									user.hasChat ? "bg-green-500" : "bg-red-500"
								}`}
								title={user.hasChat ? "Sim" : "Não"}
							></span>
						</td>
						<td className="px-4 py-2">
							{user.latestChat?.nome
								? user.latestChat.nome
								: <span className="text-muted-foreground italic">Nenhum</span>}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
</div>

		</UsersLayout>
	);
}
export { UsuariosPages };
