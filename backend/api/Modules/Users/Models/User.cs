namespace ModularApi.Modules.Users.Models
{
    public class User
    {
       public int Id { get; set; }

        public string Role { get; set; } // 'A' = Admin, 'U' = User

        public string? Email { get; set; }

        public string? Nome { get; set; }

        public string? Cpf { get; set; } 

        public string Senha { get; set; } 
    }
}
