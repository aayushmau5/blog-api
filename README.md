# blog-api

A blog REST API to serve your blogs.

### Endpoints

- POST `/user/signup` - Signing Up the user

- POST `/user/login` - Loggin in the user, get's back JWT

- GET `/user/:userId` - Get all data about a specific user and all the blogs by that user.

- GET `/blogs` - Get all public blogs

- POST `/blogs/` - Posting a blog, requires authentication

- GET `/blogs/blog/:blogId` - To get a specific blog

- PUT `/blogs/blog/:blogId` - Updating a blog, requires authentication and only the user's blog

- DELETE `/blogs/blog/:blogId` - Deleting a blog, requires authentication and only the signed in user's blog

- POST `/blogs/blog/:blogId/comment` - commenting on a post

- DELETE `/blogs/blog/:blogId/comment/:commentId` - Deleting a specific comment, requires authentication and only on signed in user's blog comments.

- Added support for pagination as well, You could do `/blogs?page=1&data=1` where `page` is the page number and `data` is the number of blogs you want to get per page.

- Pagination is supported in `/blogs` and `/user/:userId` routes.
