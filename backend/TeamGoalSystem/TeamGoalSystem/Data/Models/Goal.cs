using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Auth.Model;

namespace TeamGoalSystem.Data.Models
{
    public class Goal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime FinishDate { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsDeleted { get; set; }
        public required Member Member { get; set; }

        [Required]
        public required string UserId { get; set; }

        [ForeignKey("UserId")]
        public GoalSystemUser User { get; set; }

        public GoalDTO ToDto()
        {
            return new GoalDTO(Id, Title, Description, CreatedDate, FinishDate, IsCompleted, new Guid(UserId));
        }
    }
}
