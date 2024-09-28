using FluentValidation;

namespace TeamGoalSystem.Data.Models.DTO
{
    public record TeamDTO(
        int Id,
        string Title,
        string Office,
        string Division,
        DateTime Created,
        string TeamLeaderName
    );

    public record CreateTeamDTO(
        string Title,
        string Office,
        string Division,
        string TeamLeaderName)
    {
        public class CreateTeamDTOValidator : AbstractValidator<CreateTeamDTO>
        {
            public CreateTeamDTOValidator()
            {
                RuleFor(x => x.Title).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Office).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Division).NotEmpty().MaximumLength(50);
                RuleFor(x => x.TeamLeaderName).NotEmpty().MaximumLength(50);
            }
        }
    };

    public record UpdateTeamDTO(
       string Title,
       string Office,
       string Division,
       string TeamLeaderName)
    {
        public class UpdateTeamDTOValidator : AbstractValidator<UpdateTeamDTO>
        {
            public UpdateTeamDTOValidator()
            {
                RuleFor(x => x.Title).MaximumLength(50);
                RuleFor(x => x.Office).MaximumLength(50);
                RuleFor(x => x.Division).MaximumLength(50);
                RuleFor(x => x.TeamLeaderName).MaximumLength(50);

                RuleFor(x => x)
                    .Must(AtLeastOnePropertyNotEmpty)
                    .WithMessage("At least one of Title, Office, Division, or TeamLeaderName must be provided.");
            }

            private bool AtLeastOnePropertyNotEmpty(UpdateTeamDTO dto)
            {
                return !string.IsNullOrEmpty(dto.Title) ||
                       !string.IsNullOrEmpty(dto.Office) ||
                       !string.IsNullOrEmpty(dto.Division) ||
                       !string.IsNullOrEmpty(dto.TeamLeaderName);
            }
        }
    };
}