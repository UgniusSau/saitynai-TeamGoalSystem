using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TeamGoalSystem.Data.Models.DTO;

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
        public GoalDTO ToDto()
        {
            return new GoalDTO(Id, Title, Description, CreatedDate, FinishDate, IsCompleted);
        }
    }
}
