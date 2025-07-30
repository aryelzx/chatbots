import { LoaderComponent } from "@/shared/components/loader";
import { useEffect, useState } from "react";
import type { IUser } from "../interfaces/user-interface";
import { UsersLayout } from "../layout/layout";
import { usersServices } from "../services/users.service";

function UsuariosPages() {
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState(false);
	async function handleGetAllUsers() {
		try {
			setLoading(true);
			const { user } = await usersServices.getAll();
			setUsers(user);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		handleGetAllUsers();
	}, []);

	return (
		<UsersLayout>
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-6">Usuários</h1>
				<p className="text-muted-foreground mb-4">
					Lista de usuários cadastrados no sistema.
				</p>
				<div className="overflow-x-auto rounded-lg shadow border border-muted">
					<table className="min-w-full divide-y divide-muted bg-background text-sm">
						<thead className="bg-muted/30">
							<tr>
								<th className="px-4 py-3 text-left font-medium text-foreground">
									Nome
								</th>
								<th className="px-4 py-3 text-left font-medium text-foreground">
									Email
								</th>
								<th className="px-4 py-3 text-left font-medium text-foreground">
									CPF
								</th>
								<th className="px-4 py-3 text-left font-medium text-foreground">
									Cargo
								</th>
								<th className="px-4 py-3 text-center font-medium text-foreground">
									Tem Chat?
								</th>
								<th className="px-4 py-3 text-left font-medium text-foreground">
									Último Chat
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-muted">
							{loading ? (
								<tr>
									<td
										colSpan={6}
										className="text-center py-4 item-center"
									>
										<div className="flex justify-center">
											<LoaderComponent
												variant="blue"
												message="Carregando usuários"
											/>
										</div>
									</td>
								</tr>
							) : (
								users.map((user) => (
									<tr
										key={user.id}
										className="hover:bg-muted/10 transition"
									>
										<td className="px-4 py-2">
											{user.nome}
										</td>
										<td className="px-4 py-2">
											{user.email}
										</td>
										<td className="px-4 py-2">
											{user.cpf}
										</td>
										<td className="px-4 py-2 capitalize">
											{user.role === "A"
												? "Admin"
												: "Usuário"}
										</td>
										<td className="px-4 py-2 text-center">
											<span
												className={`inline-block w-3 h-3 rounded-full ${user.hasChat
														? "bg-green-500"
														: "bg-red-500"
													}`}
												title={
													user.hasChat ? "Sim" : "Não"
												}
											></span>
										</td>
										<td className="px-4 py-2">
											{user.latestChat?.nome ? (
												user.latestChat.nome
											) : (
												<span className="text-muted-foreground italic">
													Nenhum
												</span>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</UsersLayout>
	);
}
export { UsuariosPages };
