using FluentValidation;

namespace TeamGoalSystem.Data.Models.DTO
{
    public record GoalDTO(
        int Id,
        string Title,
        string Description,
        DateTime CreatedDate,
        DateTime FinishDate,
        bool IsCompleted
    );

    public record CreateGoalDTO(
        string Title,
        string Description,
        DateTime FinishDate,
        bool IsCompleted
    )
    {
        public class CreateGoalDTOValidator : AbstractValidator<CreateGoalDTO>
        {
            public CreateGoalDTOValidator()
            {
                RuleFor(x => x.Title).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
                RuleFor(x => x.FinishDate)
                    .NotEmpty()
                    .GreaterThanOrEqualTo(DateTime.Today.AddDays(-7))
                    .WithMessage("Date must be a week back or later.")
                    .LessThanOrEqualTo(DateTime.Today.AddYears(1))
                    .WithMessage("Date must be within the next year.");
            }
        }
    };

    public record UpdateGoalDTO(
        string Title,
        string Description,
        DateTime? FinishDate,
        bool? IsCompleted
    )
    {
        public class UpdateGoalDTOValidator : AbstractValidator<UpdateGoalDTO>
        {
            public UpdateGoalDTOValidator()
            {
                RuleFor(x => x.Title).MaximumLength(50);
                RuleFor(x => x.Description).MaximumLength(500);
                RuleFor(x => x.FinishDate)
                    .GreaterThanOrEqualTo(DateTime.Today.AddDays(-7))
                    .WithMessage("Date must be a week back or later.")
                    .LessThanOrEqualTo(DateTime.Today.AddYears(1))
                    .WithMessage("Date must be within the next year.");

                RuleFor(x => x)
                    .Must(AtLeastOnePropertyNotEmpty)
                    .WithMessage("At least one of Name, Surname, Role, Email or JoinDate must be provided.");

                RuleFor(x => x.FinishDate)
                    .Must((dto, finishDate) => finishDate >= DateTime.Today.AddDays(-7) && finishDate <= DateTime.Today.AddYears(1))
                    .WithMessage("Date must be a week back or later and within the next year.");

                RuleFor(x => x.IsCompleted)
                    .Must((dto, isCompleted) => isCompleted != true || dto.FinishDate.HasValue)
                    .WithMessage("FinishDate must be provided when the goal is completed.");
            }

            private bool AtLeastOnePropertyNotEmpty(UpdateGoalDTO dto)
            {
                return !string.IsNullOrEmpty(dto.Title) ||
                       !string.IsNullOrEmpty(dto.Description);
            }
        }
    };
}
