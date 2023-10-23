# User Management API with Node.js and SQL

This is a user management API built using Node.js and an SQL database (PostgreSQL). The API allows you to perform user-related operations, including user creation, retrieval, update, and deletion, while focusing on security and best practices.

## Requirements

1. **Node.js and PostgreSQL Database**

   - Implement the necessary configuration to connect to the PostgreSQL database.
   - Set up a schema or table structure to store user data.

2. **Validation and Error Handling**

   - Validate user input to ensure required fields are provided and have appropriate formats.
   - Handle errors that may occur during database operations and provide meaningful error messages in the API responses.

3. **SQL Queries**

   - Create SQL queries to insert new users, retrieve user details, update user details, and delete users.
   - Utilize parameterized queries or prepared statements to prevent SQL injection attacks.

4. **RESTful API Endpoints with Express.js**

   - Create API endpoints for creating, retrieving, updating, and deleting users.
   - Use appropriate HTTP methods (POST, GET, PUT/PATCH, DELETE) and URL patterns for each endpoint.

5. **Authentication with JWT**

   - Implement user authentication using JSON Web Tokens (JWT).
   - Protect the API endpoints, allowing only authenticated requests to access the user management functionality.


6. **Pagination for User Listing**

   - Modify the API endpoint for retrieving user details to support pagination.
   - Allow clients to specify the page number and the number of users per page.

7. **Security Enhancements**

   - Implement input validation and sanitization techniques to prevent common security vulnerabilities (e.g., SQL injection, cross-site scripting).
   - Hash user passwords before storing them in the database using hashing algorithms such as bcrypt or Argon2.
   - Write unit tests to ensure the correctness of the API endpoints.

########################################################################

## Code Overview Documentaion
Application File Structure
Entry Point: server.js
Database: 
	-	Path: ./Database
	-	Sub: Prisma

src: 
	-	Path: ./src
	-	Sub: [app.js – middlewares - modules - utils - tests]
 
modules:
	-	Path: ./src/modules
	-	Sub: Authentication – User

Authentication: 
	-	Path: ./src/modules/Authentication
	-	Description: Contains all authentication logic
	-	Sub: 
		o	authRouter.js: contains the endpoint for signin
		o	authController.js:
				 contains the logic for signing user in
				Contains authenticate user logic
		o	Jwt.js: contains the logic for creating and verifying token
		o	signinValidation: contains input validation, sanitization and escaping

User: 
	-	Path: ./src/modules/User
	-	Description: Contains all User logic
 
	-	Sub: 
 
		o	userRouter.js: contains the endpoints for
				create new user => POST /api/users
				get all users (includes pagination) => GET /api/users
				get one user by id => GET /api/users/:uid/profile
				update user by id => PATCH /api/users/:id/update
				delete user by id => DELETE /api/users/:id/delete
   
		o	userController.js:
				contains all crud operations on user login

		o	userValidation:
				 contains create user’s input validation, sanitization and escaping
				contains update user’s input validation, sanitization and escaping

Middlewares
	-	Path: ./src/middlewates/User
	-	Description: Contains all middleware in the app
 
	-	Sub: 
 
		o	Error
				appError.js: I have created a personalized error class to standardize the format of my error responses.

		o	Validation
				Validate.js: captures input validation error if exists

Utils
	-	Path: ./src/utils
	-	Description: Contains all helpers that I have used in the application
 
	-	Sub: 
 
		o	Api-features.js: 
				A generic class contains the pagination logic, could be extended to handle any type of filters or sorting
		o	catchAsync.js:
				A middleware to handle asynchronous errors
		o	Response.js
				A generic class to standardize the shape of my response

Tests
	-	Path: ./src/tests
	-	Description: Contains test logic
	-	Not finished:  I  ran out of time
  
#####################################################

Technologies & Tools

	Interaction with Database
		1-	I have Implemented the necessary configuration to connect to postgreSQL database, and have created schema (table structure) using Prisma ORM.
		2-	I have used Prisma to interact with the database using it’s built-in methods.

	 User authentication
		1-	I have user jsonwebtoken (JWT) to authenticate users and protect routes in my application.
	
	Input validation & security (sql injection)
		1-	I have validated and sanitized user input using express-validator library.
		2-	To prevent SQL injection I took a variety of approaches:
			a.	I have used a strong ORM (prisma) which explicitly protect against sql injection
			b.	I have avoided to use native sql queries.

	Prevent Cross Site Scripting (XXS)
		1-	I have used the helmet middleware which sets headers to protect against XXS
		2-	I have used escaping technique, which is available in the validation schema.

	Prevent brute force and denial of service
		1-	I have used rate-limit middleware to control the number of request sent from the same IP address in a specific time window.

	Prevent parameter pollution
		1-	I have used http-parameter-pollution (hpp) which prevent this vulnerability by considering only the last appearance of the parameter.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- An SQL database (e.g., PostgreSQL) and the necessary connection details.

### Installation

1. Clone this repository:

   ```shell
   git clone https://github.com/your-username/user-management-api.git
   cd user-management-api
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Configure your SQL database connection in a `.env` file.

4. Start the API server:

   ```shell
   npm start
   ```

Your API should now be running at `http://localhost:3000` (or another specified port).

## API Endpoints

The API offers the following endpoints:

- `POST /api/users` - Create a new user.
- `GET /api/users` - Get all users
- `GET /api/users/:userId/profile` - Get user details by ID.
- `PATCH /api/users/:userId/update` - Update user details by ID.
- `DELETE /api/users/:userId/delete` - Delete a user by ID.

### Authentication

To protect the API endpoints, include a JWT token in the request headers using the `Authorization` header. Example:

```
Authorization: Bearer your-jwt-token
```

## License

This project is licensed under the [MIT License](LICENSE).


## Contact

- Omar Abd El-Rahman - [omarabdelrahman180@gmail.com]

Feel free to reach out with any questions or feedback.
