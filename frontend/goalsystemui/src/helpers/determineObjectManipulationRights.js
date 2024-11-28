export const hasAccess = (user, objectUserId) => {
   const userAccessLevel =
     user?.decodedJwt?.[
       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
     ] || "Guest";
   const userId = user?.decodedJwt?.sub;
 
   if (Array.isArray(userAccessLevel)) {
     if (userAccessLevel.includes("Admin")) {
       return true;
     }
   } else if (typeof userAccessLevel === "string") {
     if (userAccessLevel === "Admin") {
       return true;
     }
   }
 
   if (userId === objectUserId) {
     return true;
   }
   
   return false;
 };
 