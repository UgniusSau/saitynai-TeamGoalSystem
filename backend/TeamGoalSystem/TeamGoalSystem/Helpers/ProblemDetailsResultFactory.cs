using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;

namespace TeamGoalSystem.Helpers
{
    public class ProblemDetailsResultFactory : IFluentValidationAutoValidationResultFactory
    {
        public IActionResult CreateActionResult(ActionExecutingContext context, ValidationProblemDetails? validationProblemDetails)
        {
            var problemDetails = new
            {
                Title = "Unprocessable entity",
                Status = 422,
                Type = "https://tools.ietf.org/html/rfc4918#section-11.2",
                ValidationErrors = validationProblemDetails?.Errors
            };

            return new ObjectResult(problemDetails)
            {
                StatusCode = 422 
            };
        }
    }
}
