using FluentValidation;

namespace TeamGoalSystem.Data.Models.DTO
{
    public record MemberDTO(
         int Id,
         string Name,
         string Surname,
         string Role,
         string Email,
         DateTime JoinDate
    );

    public record CreateMemberDTO(
        string Name,
        string Surname,
        string Role,
        string Email,
        DateTime JoinDate
    )
    { 
        public class CreateMemberDTOValidator : AbstractValidator<CreateMemberDTO>
        {
            public CreateMemberDTOValidator()
            {
                RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Surname).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Role).NotEmpty().MaximumLength(50);
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.JoinDate)
                               .NotEmpty()
                               .GreaterThanOrEqualTo(DateTime.Today.AddDays(-7))
                               .WithMessage("Date must be a week back or later.")
                               .LessThanOrEqualTo(DateTime.Today.AddYears(1))
                               .WithMessage("Date must be within the next year.");
            }
        }
    };

    public record UpdateMemberDTO(
       string Name,
       string Surname,
       string Role,
       string Email,
       DateTime JoinDate
    )
    {
        public class UpdateMemberDTOValidator : AbstractValidator<UpdateMemberDTO>
        {
            public UpdateMemberDTOValidator()
            {
                RuleFor(x => x.Name).MaximumLength(50);
                RuleFor(x => x.Surname).MaximumLength(50);
                RuleFor(x => x.Role).MaximumLength(50);
                RuleFor(x => x.Email).EmailAddress();
                RuleFor(x => x.JoinDate)
                               .GreaterThanOrEqualTo(DateTime.Today.AddDays(-7))
                               .WithMessage("Date must be a week back or later.")
                               .LessThanOrEqualTo(DateTime.Today.AddYears(1))
                               .WithMessage("Date must be within the next year.");

                RuleFor(x => x)
                    .Must(AtLeastOnePropertyNotEmpty)
                    .WithMessage("At least one of Name, Surname, Role, Email or JoinDate must be provided.");
            }

            private bool AtLeastOnePropertyNotEmpty(UpdateMemberDTO dto)
            {
                return !string.IsNullOrEmpty(dto.Name) ||
                       !string.IsNullOrEmpty(dto.Surname) ||
                       !string.IsNullOrEmpty(dto.Role) ||
                       !string.IsNullOrEmpty(dto.Email) ||
                       dto.JoinDate != default;
            }
        }
    };
}
