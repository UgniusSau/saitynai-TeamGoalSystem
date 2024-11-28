using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Auth.Model;

namespace TeamGoalSystem.Data.Models
{
    public class Member
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Role { get; set; }
        public required string Email { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsDeleted { get; set; }
        public required Team Team { get; set; }

        [Required]
        public required string UserId { get; set; }

        [ForeignKey("UserId")]
        public GoalSystemUser User { get; set; }

        public MemberDTO ToDto()
        {
            return new MemberDTO(Id, Name, Surname, Role, Email, JoinDate, new Guid(UserId));
        }
    }
}
