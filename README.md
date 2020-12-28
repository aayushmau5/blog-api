# blog-api

A RESTful blog API to serve your blogs.

### API Endpoints

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

- Added support for pagination as well, You could do `/blogs?page=1&data=1` where `page` is the page number and `data` is the number of blogs you want per page.

- Pagination is supported in `/blogs` and `/user/:userId` routes.

### Authentication

Authentication is done using JWT.

**JWT must be passed as an Authorization Header**

##### Structure of Authorization Header

> Bearer \<token\>

Replace `<token>` with the JWT token you get after logging in.

### Structure of POST request/response

#### Signing Up a User

On `/user/signup`

The POST `/user/signup` requires two fields, `username` and `password`.

##### Constrains

- `username` should only contain alphabets and numbers.

- `password` must be atleast 6 characters long.

##### Request

```json
{
  "username": "demo",
  "password": "password"
}
```

##### Response

If everything checks out, you would get a `200` response.

```json
{
  "user": {
    "_id": "id",
    "username": "username"
  },
  "token": "a jwt token"
}
```

#### Logging In a User

On `/user/login`

Same constrains as Signing Up a User.

#### Request

```json
{
  "username": "demo",
  "password": "password"
}
```

##### Response

```json
{
  "user": {
    "_id": "userId",
    "username": "username"
  },
  "token": "a JWT"
}
```

#### Posting a Blog

On `/blogs`

**Requires Authentication**

##### Request

```json
{
  "title": "title",
  "post": "post",
  "public": true
}
```

`public` must be a boolean(true/false).

##### Response

```json
// 200 Response Code
{
  "success": true,
  "message": "Blog saved to the database",
  "blog": {
    "_id": "blogId",
    "title": "title",
    "post": "post",
    "public": true,
    "createdAt": "time",
    "updatedAt": "time",
    "author": {
      "_id": "id",
      "username": "username"
    },
    "comments": [
      {
        "_id": "id",
        "username": "username",
        "comment": "comment",
        "createdAt": "time",
        "updatedAt": "time"
      }
    ]
  }
}
```

#### Updating a Blog

**Requires Authentication**

Has the same Request body as `POST /blogs` request.

#### Adding a Comment

On `/blogs/blog/:blogId/comment`

**Doesn't require Authentication**

##### Request

Has same contrains as `Login` POST body.

```json
{
  "username": "username",
  "comment": "comment"
}
```

##### Response

```json
{
  "success": true,
  "message": "commented",
  "comment": {
    "_id": "id",
    "username": "username",
    "comment": "a comment",
    "createdAt": "time",
    "updatedAt": "time"
  }
}
```

### Structure of GET response

### GET /blogs

```json
{
  "blogs": [
    {
      "isPublic": true,
      "comments": ["comments"],
      "_id": "blogId",
      "title": "title",
      "post": "post",
      "author": {
        "_id": "userId",
        "username": "username"
      },
      "createdAt": "time",
      "updatedAt": "time"
    }
  ]
}
```

#### GET /user/:userId

```json
{
  "user": {
    "_id": "userId",
    "username": "author"
  },
  "blogs": [
    {
      "isPublic": true,
      "comments": ["comments"],
      "_id": "id",
      "title": "title",
      "post": "post",
      "createdAt": "time",
      "updatedAt": "time"
    }
  ]
}
```

#### GET /blogs/blog/:blogId

```json
{
  "blog": {
    "isPublic": true,
    "comments": [
      {
        "_id": "id",
        "username": "username",
        "comment": "a comment",
        "createdAt": "time",
        "updatedAt": "time"
      }
    ],
    "_id": "id",
    "title": "title",
    "post": "post",
    "author": {
      "_id": "id",
      "username": "user"
    },
    "createdAt": "time",
    "updatedAt": "time"
  }
}
```
