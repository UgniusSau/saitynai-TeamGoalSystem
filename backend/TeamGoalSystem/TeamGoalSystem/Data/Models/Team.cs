using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Auth.Model;

namespace TeamGoalSystem.Data.Models
{
    public class Team
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Office { get; set; }
        public required string Division { get; set; }
        public DateTime Created { get; set; }
        public required string TeamLeaderName { get; set; }
        public bool IsDeleted { get; set; }

        [Required]
        public required string UserId { get; set; }

        [ForeignKey("UserId")]
        public GoalSystemUser User { get; set; }

        public TeamDTO ToDto()
        {
            return new TeamDTO(Id, Title, Office, Division, Created, TeamLeaderName, new Guid(UserId));
        }
    }
}
