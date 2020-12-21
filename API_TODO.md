## Routes

### Done

- GET `/blogs/` (To get all the public blogs)
- POST `/blogs/` (Posting a blog, requires authentication)
- GET `/blogs/blog/:blogId` (To get a specific blog)
- POST `/user/signup` (Signing Up the user)
- POST `/user/login` (Loggin in the user, get's back JWT)
- GET `/user/:userId` (Get a specific user)
- PUT `/blogs/blog/:blogId` (Updating a blog, requires authentication and only the user's blog)
- DELETE `/blogs/blog/:blogId` (Deleting a blog, requires authentication and only the user's blog)
- Refactor validation and sanitization to have it's own function
- POST `/blogs/blog/:blogId/comment` (commenting on a post)
- DELETE `/blogs/blog/:blogId/comment/:commentId` (Deleting a specific comment, requires authentication and only on user's blog comments)

### To be Implemented

- Use Query Parameter for blog pagination and limitation(Lookup countDocuments(), .skip() and .limit() in mongoose)

## Other ideas

- Make tests for the routes
- Properly document the API
- Refactor and give proper responses
