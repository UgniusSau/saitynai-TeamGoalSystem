﻿namespace TeamGoalSystem.Data.Models.Auth
{
    public class RegisterUserRequest
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Password { get; set; }
    }
}
