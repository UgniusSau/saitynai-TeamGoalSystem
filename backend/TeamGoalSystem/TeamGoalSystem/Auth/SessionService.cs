using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Helpers;

namespace TeamGoalSystem.Auth
{
    public class SessionService
    {
        private readonly GoalSystemContext _systemContext;

        public SessionService(GoalSystemContext systemContext)
        {
            _systemContext = systemContext;
        }

        public async Task createSessionAsync(Guid sessionId, string userId, string refreshtoken, DateTime expiresAt)
        {
            _systemContext.Sessions.Add(new Session()
            {
                Id = sessionId,
                UserId = userId,
                InitiatedAt = DateTimeOffset.Now,
                ExpiresAt = expiresAt,
                LastRefreshToken = refreshtoken.ToSHA256(),
                IsRevoked = false
            });

            await _systemContext.SaveChangesAsync();
        }

        public async Task ExtendSessionAsync(Guid sessionId, string refreshToken, DateTime expiresAt)
        {
            var session = await _systemContext.Sessions.FindAsync(sessionId);
            session.ExpiresAt = expiresAt;
            session.LastRefreshToken = refreshToken.ToSHA256();

            await _systemContext.SaveChangesAsync();
        }

        public async Task InvalidateSessionAsync(Guid sessionId)
        {
            var session = await _systemContext.Sessions.FindAsync(sessionId);
            if (session is null)
                return;

            session.IsRevoked = true;
            await _systemContext.SaveChangesAsync();
        }

        public async Task<bool> IsSessionValidAsync(Guid sessionId, string refreshToken)
        {
            var session = await _systemContext.Sessions.FindAsync(sessionId);
            return session is not null && session.ExpiresAt > DateTimeOffset.UtcNow && !session.IsRevoked &&
                   session.LastRefreshToken.Equals(refreshToken.ToSHA256());
        }
    }
}
