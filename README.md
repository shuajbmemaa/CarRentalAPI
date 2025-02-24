# Car Rental API
A RESTful API for managing car rentals, built with Node.js, Express, and MongoDB.

## Building a Scalable Backend: How Generic Repository, Services, and Utils Work Together
The application follows a **modular architecture** to ensure separation of concerns and maintainability. The **generic repository** acts as a base layer for database operations, providing reusable methods like findAll, insertOne, and deleteById that interact directly with MongoDB. This eliminates redundancy and ensures consistent data access across the application. The **services layer** builds on the repository, encapsulating business logic such as user authentication and car management. It acts as an intermediary between the controllers and the repository, ensuring that business rules are enforced before data is persisted. By using services and the generic repository, the **controllers** become much simpler and easier to understand, as they only handle request/response logic, including input validation using utility functions and schemas. They ensure that only valid data reaches the services, improving data integrity and security. **Query parameters** are used in the getRentalCars endpoint to filter and sort car listings dynamically, allowing users to refine results based on criteria like color, year, steering type, or number of seats. Finally, **utils** provide helper functions and validation logic, such as Joi schemas for input validation and utility methods for common tasks. Together, these components create a clean, scalable, and maintainable codebase where each layer has a distinct responsibility.

## Features
- User registration and authentication (JWT)
- Car management (create, read, delete)
- Filter cars by year, color, steering type, and seats
- Protected endpoints for authenticated users

### Prerequisites
- Node.js (v18+) - (check in terminal node -v)
- MongoDB
- Postman for testing

### 1. Clone Repository
```bash
git clone https://github.com/shuajbmemaa/RestApiProject.git
cd RestApiProject
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create .env file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/carRental
JWT_SECRET=your_super_secure_jwt_secret_here
```

### 4. Start Application
```bash
node index
```
## Testing the API using Postman


## Register new User
![image](https://github.com/user-attachments/assets/eba1b9c3-36de-491b-af98-50f90575cedc)
<br><br>

## Login User
![image](https://github.com/user-attachments/assets/e5b359eb-702f-4795-90a9-a2c824ae33f0)
<br><br>

## Get User profile (Requires JWT)
![image](https://github.com/user-attachments/assets/9d2e82bd-0d2f-4c8d-be77-17d255f93628)
<br><br>

## Add new car
![image](https://github.com/user-attachments/assets/cdbf635e-3774-4a88-bfd9-615b1b1dd6bf)
<br><br>

## Filter cars
![image](https://github.com/user-attachments/assets/af5dfef2-6488-47cb-8943-c10e495a92c7)
<br><br>

## Delete car

![image](https://github.com/user-attachments/assets/37244976-b904-498f-8b90-98977890a671)
<br><br>
