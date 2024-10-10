# API Documentation

---

## Understanding URL Parameters

In our API endpoints, you might come across URLs that contain variables prefixed with a colon (`:`), such as `/api/messages/student/:studentId`.

### What is `:variable`?

The `:variable` syntax in URLs indicates a placeholder for a specific value. When making a request to such endpoints, you need to replace `:variable` with the actual value it represents.

### Example

For the URL `/api/messages/student/:studentId`, you would replace `:studentId` with the actual ID of the student you want to interact with.

#### Example Request

```http
GET /api/messages/student/12345
```

In this example, `12345` is the actual ID of the student
---

## The API is live @ <https://academify-f0qd.onrender.com>

so every route documented is to be called as <https://academify-f0qd.onrender.com/routename> i.e /register/student is to be called as <https://academify-f0qd.onrender.com/register/student>

## Register Routes

### Register Student

Registers a new student account.

- **URL:** `/register/student`
- **Method:** `POST`
- **Description:** Register a new student account.
- **Request Body:**
  - `firstName` (string): The first name of the student.
  - `lastName` (string): The last name of the student.
  - `email` (string): The email address of the student.
  - `password` (string): The password of the student account.
  - `reg` (string): The registration number of the student.
  - `advisor` (string): The ID of the course advisor assigned to the student.
- **Example Request:**

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "reg": "20230001",
    "advisor": "6152f8a91b6cf4a2443d2e4c"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### Register Parent

Registers a new parent account.

- **URL:** `/register/parent`
- **Method:** `POST`
- **Description:** Register a new parent account.
- **Request Body:**
  - `firstName` (string): The first name of the parent.
  - `lastName` (string): The last name of the parent.
  - `email` (string): The email address of the parent.
  - `password` (string): The password of the parent account.
- **Example Request:**

  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "password": "password123"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### Register Course Advisor

Registers a new course advisor account.

- **URL:** `/register/courseadvisor`
- **Method:** `POST`
- **Description:** Register a new course advisor account.
- **Request Body:**
  - `firstName` (string): The first name of the course advisor.
  - `lastName` (string): The last name of the course advisor.
  - `email` (string): The email address of the course advisor.
  - `password` (string): The password of the course advisor account.
- **Example Request:**

  ```json
  {
    "firstName": "Francesca",
    "lastName": "Smith",
    "email": "francesca.smith@example.com",
    "password": "password123"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### Register Course Coordinator

Registers a new course coordinator account.

- **URL:** `/register/coursecoordinator`
- **Method:** `POST`
- **Description:** Register a new course coordinator account.
- **Request Body:**
  - `firstName` (string): The first name of the course coordinator.
  - `lastName` (string): The last name of the course coordinator.
  - `email` (string): The email address of the course coordinator.
  - `password` (string): The password of the course coordinator account.
- **Example Request:**

  ```json
  {
   "firstName": "Chidozie",
   "lastName": "Inya",
   "email": "chidozie.inya@gmail.com",
   "password": "1234567890",
   "role": "course_coordinator"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

---

## Login Routes

### Login Student

Logs in a student.

- **URL:** `/login/student`
- **Method:** `POST`
- **Description:** Log in a student account.
- **Request Body:**
  - `email` (string): The email address of the student.
  - `password` (string): The password of the student account.
- **Example Request:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Example Response:**

  ```json
  {
   "token": "eyJhbGciOi....",
   "userID": "67066dd.....",
   "userType": "course_coordinator"
  }
  ```

### Login Parent

Logs in a parent.

- **URL:** `/login/parent`
- **Method:** `POST`
- **Description:** Log in a parent account.
- **Request Body:**
  - `email` (string): The email address of the parent.
  - `password` (string): The password of the parent account.
- **Example Request:**

  ```json
  {
    "email": "jane.doe@example.com",
    "password": "password123"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### Login Course Advisor

Logs in a course advisor.

- **URL:** `/login/courseadvisor`
- **Method:** `POST`
- **Description:** Log in a course advisor account.
- **Request Body:**
  - `email` (string): The email address of the course advisor.
  - `password` (string): The password of the course advisor account.
- **Example Request:**

  ```json
  {
    "email": "francesca.smith@example.com",
    "password": "password123"
  }
  ```

- **Example Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### Login Course Coordinator

Logs in a course coordinator.

- **URL:** `/login/coursecoordinator`
- **Method:** `POST`
- **Description:** Log in a course coordinator account.
- **Request Body:**
  - `email` (string): The email address of the course coordinator.
  - `password` (string): The password of the course coordinator account.
- **Example Request:**

  ```json
  {
    "email": "chidozie.inya@gmail.com",
    "password": "1234567890"
  }
  ```

- **Example Response:**

  ```json
  {
   "token": "eyJhbGciOiJ....",
   "userID": "67066ddf.....",
   "userType": "course_coordinator"
  }
  ```
---

### Route to Get All Course Advisors

#### Description

This route allows you to retrieve a list of all course advisors.

- **URL:** `/advisors/get-all`
- **Method:** `GET`
- **Auth Required:** No
- **Permissions Required:** None

#### Parameters

None

#### Responses

- **200 OK:** Successfully retrieved the list of course advisors.
  - **Content:** JSON array containing details of all course advisors.
- **500 Internal Server Error:** An error occurred on the server while processing the request.

#### Example Response

```json
[
  {
    "_id": "611fc69c8f5d670015c4d78a",
    "name": "Mrs. Francesca",
    "department": "Computer Science",
    "email": "francesca@example.com"
  },
  {
    "_id": "611fc6c38f5d670015c4d78b",
    "name": "Mr. John Doe",
    "department": "Electrical Engineering",
    "email": "john@example.com"
  }
]
```

### Route to Get All Course Coordinator

#### Description

This route allows you to retrieve a list of all course advisors.

- **URL:** `/coordinators/get-all`
- **Method:** `GET`
- **Auth Required:** No
- **Permissions Required:** None

#### Parameters

None

#### Responses

- **200 OK:** Successfully retrieved the list of course advisors.
  - **Content:** JSON array containing details of all course advisors.
- **500 Internal Server Error:** An error occurred on the server while processing the request.

#### Example Response

```json
[
  {
    "_id": "67066ddf9da.....",
    "user": {
      "_id": "67066ddf9.....",
      "firstName": "Chidozie",
      "lastName": "Inya",
      "email": "chidozie.inya@gmail.com",
      "password": "hashedpassword",
      "role": "course_coordinator",
      "createdAt": "2024-10-09T11:49:51.270Z",
      "updatedAt": "2024-10-09T11:49:51.270Z",
      "__v": 0
    },
    "courses": [],
    "createdAt": "2024-10-09T11:49:51.431Z",
    "updatedAt": "2024-10-09T11:49:51.431Z",
    "__v": 0
  }
]
```
---

## Student Routes

### Get Student by Registration Number

Retrieves information about a student by their registration number.

- **URL:** `/student/:regNo`
- **Method:** `GET`
- **Description:** Get student information by registration number.
- **Example Response:**

  ```json
  {
    "_id": "6152f8a91b6cf4a2443d2e4d",
    "firstName": "John",
    "lastName": "Doe",
    "reg": "20230001",
    "advisor": "6152f8a91b6cf4a2443d2e4c"
  }
  ```

---

### Get Student Result

**URL:** `/student/result/:studentId`

**Method:** `GET`

**Description:** Fetches the result for a specific student based on the provided student ID.

**Parameters:**

- `studentId` (required): The unique identifier of the student for whom the result is to be fetched.

**Example:**

```http
GET /api/student/result/1234567890
```

**Response:**

```json
{
  "results": [
    {
      "_id": "6115d593b8bbcd001bf18b80",
      "student": "1234567890",
      "course": {
        "_id": "6115d591b8bbcd001bf18b7f",
        "code": "MTH101",
        "name": "Mathematics",
        "level": 100
      },
      "grade": "A",
      "semester": "6115d591b8bbcd001bf18b7e",
      "createdAt": "2022-08-12T09:32:19.734Z",
      "updatedAt": "2022-08-12T09:32:19.734Z",
      "__v": 0
    },
    {
      "_id": "6115d593b8bbcd001bf18b81",
      "student": "1234567890",
      "course": {
        "_id": "6115d591b8bbcd001bf18b7d",
        "code": "PHY101",
        "name": "Physics",
        "level": 100
      },
      "grade": "B",
      "semester": "6115d591b8bbcd001bf18b7e",
      "createdAt": "2022-08-12T09:32:19.734Z",
      "updatedAt": "2022-08-12T09:32:19.734Z",
      "__v": 0
    }
  ]
}
```

---

## Courses Routes

### Register Courses

Registers courses for a student.

- **URL:** `/course/register`
- **Method:** `POST`
- **Description:** Register courses for a student.
- **Request Body:**
  - `reg` (string): The registration number of the student.
  - `courseCodes` (array of strings): An array of course codes to register.
  - `session`: session to register student courses.
  - `semester`: sememster to register student courses.
- **Example Request:**

  ```json
  {
    "reg": "20230001",
  "session": "2021/2022",
  "semester":"rain", 
    "courseCodes": ["MTH 101","PHY 101", "CHM 101"]
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Courses registered successfully"
  }
  ```

### Get Courses by Level and Semester

Retrieves courses for a particular level and semester.

- **URL:** `/courses/:level/:semester`
- **Method:** `GET`
- **Description:** Get courses for a particular level and semester.
- **Example Response:** Array of course objects

---

Here’s the modified documentation based on the provided format:

---

## Messaging Routes

### Messaging between Course Advisor and Student

#### Send Message to Student

Sends a message to a student.

- **URL:** `/api/messages/student/:studentId`
- **Method:** `POST`
- **Description:** Send a message to a student.
- **Request Body:**
  - `sender` (string): The ID of the sender of the message.
  - `content` (string): The content of the message.
- **Example Request:**

  ```json
  {
    "sender": "6648834ecf24d9004483a65c",
    "content": "This is a test message to the student."
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Message sent to student successfully"
  }
  ```

#### Send Student Message to Advisor

Sends a message from a student to their advisor.

- **URL:** `/api/messages/student/advisor/:studentId`
- **Method:** `POST`
- **Description:** Send a message from a student to their advisor.
- **Request Body:**
  - `content` (string): The content of the message.
- **Example Request:**

  ```json
  {
    "content": "This is a test message from student to the advisor."
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Message sent to advisor successfully"
  }
  ```

#### Get Messages from Student

Fetches messages from a student.

- **URL:** `/api/messages/student/:studentId`
- **Method:** `GET`
- **Description:** Fetch messages from a student.
- **Example Response:** Array of message objects.

  ```json
  [
    {
      "sender": "6648834ecf24d9004483a65c",
      "receiver": "662222f300b1dc1f9411b680",
      "content": "This is a test message to the student."
    },
    {
      "sender": "662222f300b1dc1f9411b680",
      "receiver": "6648834ecf24d9004483a65c",
      "content": "This is a test message from the student to the advisor."
    }
  ]
  ```

### Messaging between Parent and Course Advisor

#### Send Message to Parent

Sends a message to a parent.

- **URL:** `/api/messages/parent/:parentId`
- **Method:** `POST`
- **Description:** Send a message to a parent.
- **Request Body:**
  - `sender` (string): The user ID of the sender of the message.
  - `content` (string): The content of the message.
- **Example Request:**

  ```json
  {
    "sender": "662222f300b1dc1f9411b680",
    "content": "This is a test message to the parent."
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Message sent to parent successfully"
  }
  ```

#### Send Parent Message to Advisor

Sends a message from a parent to their child's advisor.

- **URL:** `/api/messages/parent/advisor/:parentId/:advisorId`
- **Method:** `POST`
- **Description:** Send a message from a parent to their child's advisor.
- **Request Body:**
  - `content` (string): The content of the message.
- **Example Request:**

  ```json
  {
    "content": "This is a test message from parent to advisor."
  }
  ```

- **Example Response:**

  ```json
  {
    "message": "Message sent to advisor successfully"
  }
  ```

#### Get Messages from Parent

Fetches messages from a parent.

- **URL:** `/api/messages/parent/:parentId`
- **Method:** `GET`
- **Description:** Fetch messages from a parent.
- **Example Response:** Array of message objects.

  ```json
  [
    {
      "sender": "662222f300b1dc1f9411b680",
      "receiver": "6639ad4166675a0044a8a2ab",
      "content": "This is a test message to the parent."
    }
  ]
  ```

### Messaging between Course Advisor and Parent/Student

#### Get Messages for an Advisor

Fetches all messages sent to an advisor.

- **URL:** `/api/messages/advisor/:advisorId`
- **Method:** `GET`
- **Description:** Fetch messages sent to an advisor.
- **Example Response:** Array of message objects.

  ```json
  [
    {
      "sender": "662222f300b1dc1f9411b680",
      "receiver": "666c0fdc610c095424bf438c",
      "content": "This is a test message from student to advisor."
    },
    {
      "sender": "6639ad4166675a0044a8a2ab",
      "receiver": "666c0fdc610c095424bf438c",
      "content": "This is a test message from parent to advisor."
    }
  ]
  ```
  
## Course Adviser Routes

### `getProfile`

#### Description

Retrieves the profile information of the authenticated course advisor.

- **URL:** `/profile/advisors`
- **Method:** `GET`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Responses

- **200 OK:** Successfully retrieved the profile information.
  - **Content:** JSON object containing the profile information.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Course advisor not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Response

```json
{
  "profile": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "photo": "path/to/photo.jpg",
    "level": "100"
  },
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

---

### `updatePassword`

#### Description

Updates the password of the authenticated course advisor.

- **URL:** `/advisors/update-password`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `newPassword` (string, required): The new password.

#### Responses

- **200 OK:** Password updated successfully.
  - **Content:** JSON object with a success message.
- **400 Bad Request:** Invalid request body or missing required fields.
  - **Content:** JSON object with an error message.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Course advisor not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Request Body

```json
{
  "newPassword": "newPassword123"
}
```

#### Example Response

```json
{
  "message": "Password updated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

---

### 3. `getAllCourseAdvisors`

#### Description

Fetches all course advisors from the database.

- **URL:** `/advisors/get-all`
- **Method:** `GET`
- **Auth Required:** No
- **Permissions Required:** None

#### Responses

- **200 OK:** Successfully retrieved the list of course advisors.
  - **Content:** JSON array containing details of all course advisors.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Response

```json
[
  {
    "_id": "611fc69c8f5d670015c4d78a",
    "name": "Francesca Smith",
    "email": "francesca@example.com"
  },
  {
    "_id": "611fc6c38f5d670015c4d78b",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

### `updateProfile`

#### Description

Updates the profile information of the authenticated course advisor.

- **URL:** `/advisors/update-profile`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `firstName` (string): The new first name.
- `lastName` (string): The new last name.
- `email` (string): The new email address.
- `level` (string): The new level.

---

### `uploadResults`

#### Description

This controller function handles the uploading of results to the database. It expects the uploaded results to be received as JSON in the request body.

- **URL:** `/advisors/upload-results`
- **Method:** `POST`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `academicYear` (string): The academic year for the results being uploaded.
- `semester` (string): The semester for the results being uploaded.
- `course` (string): The course for which the results are being uploaded.
- `results` (array of objects): An array of result objects to be uploaded to the database.

#### Responses

- **201 Created:** Results were successfully uploaded to the database.
  - **Content:** JSON object containing a success message and an authentication token.

- **400 Bad Request:** Missing required parameters in the request body.
  - **Content:** JSON object containing an error message.
- **500 Internal Server Error:** An error occurred while processing the request on the server side.

#### Example Response

```json
{
  "message": "Results uploaded successfully",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

#### Error Response

```json
{
  "message": "Internal server error"
}
```

---

### `createSemester`

#### Description

Creates a new semester with an array of courses.

- **URL:** `/advisors/semesters`
- **Method:** `POST`
- **Auth Required:** `Yes`
- **Permissions Required:** `None`

##### Request Body

- `name` (string, required): The name of the semester ('Harmattan' or 'Rain').
- `session` (string, required): The session of the semester.
- `courses` (array of objects, required): An array of course objects.
- `name` (string, required): The name of the course.
- `code` (string, required): The code of the course.
- `credits` (number, required): The number of credits for the course.
- `type` (string, required): The type of the course ('Compulsory', 'Elective', etc.).

##### Example Request

```json
Copy code
{
  "name": "Harmattan",
  "session": "2023/2024",
  "courses": [
    {
      "name": "Mathematics",
      "code": "MATH101",
      "credits": 3,
      "type": "Compulsory"
    },
    {
      "name": "Physics",
      "code": "PHY101",
      "credits": 4,
      "type": "Compulsory"
    }
  ]
}
```

#### Example Response

```json
Copy code
{
  "_id": "60c72b2f9b1e8c3b9cb8e9e7",
  "name": "Harmattan",
  "session": "2023/2024",
  "courses": [
    {
      "name": "Mathematics",
      "code": "MATH101",
      "credits": 3,
      "type": "Compulsory"
    },
    {
      "name": "Physics",
      "code": "PHY101",
      "credits": 4,
      "type": "Compulsory"
    }
  ],
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

### Get Semesters by Session and name

#### Description

Retrieves a semester along with its courses based on the provided session and name.

- **URL:** `/advisors/semesters`
- **Method:** `GET`
- **Auth Required:** `Yes`
- **Permissions Required:** `None`
**Query Parameters:**
- session (string, required): The session of the semester.
- name (string, required): The name of the semester (either 'Harmattan' or 'Rain').

#### Responses

- **200 OK:** Semester found.
  - **Content:** JSON object with semester details and its courses.
- **400 Bad Request:** Invalid query parameters.
  - **Content:** JSON object with an error message.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Semester not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Request

```http
GET /semesters?session=2023/2024&name=Harmattan
Authorization: Bearer <your_token_here>
```

#### Example Response

```json
{
  "_id": "60c72b2f9b1e8c3b9cb8e9e9",
  "name": "Harmattan",
  "session": "2023/2024",
  "courses": [
    {
      "_id": "60c72b2f9b1e8c3b9cb8e9e7",
      "name": "Mathematics",
      "code": "MATH101",
      "credits": 3,
      "type": "Compulsory",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "_id": "60c72b2f9b1e8c3b9cb8e9e8",
      "name": "Physics",
      "code": "PHY101",
      "credits": 4,
      "type": "Compulsory",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

### Get result

#### Description

Retrieves  result.

- **URL:** `/advisors/view-results`
- **Method:** `GET`
- **Auth Required:** `Yes`
- **Permissions Required:** `None`
**Query Parameters:**
- semester (string, required): Id of semester.
- course (string, required): Id of course.

#### Responses

- **200 OK:** Semester found.
  - **Content:** JSON object with semester details and its courses.
- **400 Bad Request:** Invalid query parameters.
  - **Content:** JSON object with an error message.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Semester not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.
  
#### Example Request

```http
GET http://localhost:5000/advisors/view-results?semester=666c76476c3862539975c76e&course=6621b93813c28c2a6caa444f
Authorization: Bearer <your_token_here>
```

#### Example Response
```json
[
  {
    "_id": "666c80aed41e9659ecf1b590",
    "exam": 85,
    "lab": 90,
    "test": 75,
    "regno": "2024001",
    "semester": "666c76476c3862539975c76e",
    "course": "6621b93813c28c2a6caa444f",
    "createdAt": "2024-06-14T17:41:02.495Z",
    "updatedAt": "2024-06-14T17:41:02.495Z",
    "__v": 0
  }
]
```

---
## Course Coordinator Routes

### `getProfile`

#### Description

Retrieves the profile information of the authenticated course advisor.

- **URL:** `/profile/coordinators`
- **Method:** `GET`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Responses

- **200 OK:** Successfully retrieved the profile information.
  - **Content:** JSON object containing the profile information.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Course advisor not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Response

```json
{
  "profile": {
    "userID": "67066ddf9daf8f316b181c11",
    "roleID": "67066ddf9daf8f316b181c13",
    "name": "Chidozie Inya",
    "email": "chidozie.inya@gmail.com",
    "courses": []
  },
  "token": "eyJhbGci...."
}
```

---

### `updatePassword`

#### Description

Updates the password of the authenticated course advisor.

- **URL:** `/coordinators/update-password`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `newPassword` (string, required): The new password.

#### Responses

- **200 OK:** Password updated successfully.
  - **Content:** JSON object with a success message.
- **400 Bad Request:** Invalid request body or missing required fields.
  - **Content:** JSON object with an error message.
- **401 Unauthorized:** Authentication failure.
  - **Content:** JSON object with an error message.
- **404 Not Found:** Course advisor not found.
  - **Content:** JSON object with an error message.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Request Body

```json
{
  "newPassword": "newPassword123"
}
```

#### Example Response

```json
{
  "message": "Password updated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

---

### 3. `getAllCourseCoordinator`

#### Description

Fetches all course coordinator from the database.

- **URL:** `/coordinator/get-all`
- **Method:** `GET`
- **Auth Required:** No
- **Permissions Required:** None

#### Responses

- **200 OK:** Successfully retrieved the list of course advisors.
  - **Content:** JSON array containing details of all course advisors.
- **500 Internal Server Error:** An error occurred on the server while processing the request.
  - **Content:** JSON object with an error message.

#### Example Response

```json
[
  {
    "_id": "67066ddf9daf8f316b181c13",
    "user": {
      "_id": "67066ddf9daf8f316b181c11",
      "firstName": "Chidozie",
      "lastName": "Inya",
      "email": "chidozie.inya@gmail.com",
      "password": "hashed password",
      "role": "course_coordinator",
      "createdAt": "2024-10-09T11:49:51.270Z",
      "updatedAt": "2024-10-09T18:13:14.828Z",
      "__v": 0
    },
    "courses": [],
    "createdAt": "2024-10-09T11:49:51.431Z",
    "updatedAt": "2024-10-09T11:49:51.431Z",
    "__v": 0
  }
]
```

---

### `updateProfile`

#### Description

Updates the profile information of the authenticated course coordinators.

- **URL:** `/coordinators/update-profile`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `firstName` (string): The new first name.
- `lastName` (string): The new last name.
- `email` (string): The new email address.
- `courses` (object): The courses they are coordinating.

---

### `uploadResults`

#### Description

This controller function handles the uploading of results to the database. It expects the uploaded results to be received as JSON in the request body.

- **URL:** `/coordinators/upload-results`
- **Method:** `POST`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `academicYear` (string): The academic year for the results being uploaded.
- `semester` (string): The semester for the results being uploaded.
- `course` (string): The course for which the results are being uploaded.
- `results` (array of objects): An array of result objects to be uploaded to the database.

#### Responses

- **201 Created:** Results were successfully uploaded to the database.
  - **Content:** JSON object containing a success message and an authentication token.

- **400 Bad Request:** Missing required parameters in the request body.
  - **Content:** JSON object containing an error message.
- **500 Internal Server Error:** An error occurred while processing the request on the server side.

#### Example Response

```json
{
  "message": "Results uploaded successfully",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

#### Error Response

```json
{
  "message": "Internal server error"
}
```

---

### Add Courses

#### Description

Adds the courses coordinated by course coordinator.

- **URL:** `/coordinators/add-courses`
- **Method:** `POST`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `coordinatorId` (string): The ID of the course coordinator to whom the courses are being added.
- `courseIds` (array of strings): An array of course IDs to be added to the course coordinator's profile.

#### Responses

- **201 Created:** Courses were successfully added to the course coordinator.
  - **Content:** JSON object containing an error message, indicating missing fields or a list of duplicate courses that are already assigned.

- **400 Bad Request:** Missing required parameters in the request body or duplicate courses found.
  - **Content:** JSON object containing an error message, indicating missing fields or a list of duplicate courses that are already assigned.
- **404 Not Found:**  Course Coordinator or some courses were not found in the database.
  -**Content:** JSON object containing an error message.
- **500 Internal Server Error:** An error occurred while processing the request on the server side.

#### Example Response

```json
{
  "message": "Courses added successfully",
  "courses": [
    "6621b94113c28c2a6caa4494"
  ]
}
```

#### Error Response

```json
{
  "message": "These courses are already assigned: 6621b94113c28c2a6caa4494"
}
```

---

### Remove Courses from Course Coordinators

#### Description

Removes the courses coordinated by course coordinator.

- **URL:** `/coordinators/remove-courses`
- **Method:** `POST`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Responses

- **201 Ok:** Courses were successfully removed from the course coordinator.
  - **Content:** JSON object containing a success message and the updated list of courses.

- **400 Bad Request:** Missing required parameters in the request body.
  - **Content:** JSON object containing an error message, indicating the missing fields.
- **404 Not Found:**  Course Coordinator or some courses were not found in the database.
  -**Content:** JSON object containing an error message.
- **500 Internal Server Error:** An error occurred while processing the request on the server side.
  -**Content:** JSON object containing an error message.

#### Example Request Body

```json
{
  "coordinatorId":"67066ddf9daf8f316b181c13",
  "courseIds": ["6621b94113c28c2a6caa4494","6621b94013c28c2a6caa4488",
    "6621b94213c28c2a6caa4497",
    "6621b94213c28c2a6caa4497"]
}
```

#### Example Response

```json
{
  "message": "Courses removed successfully",
  "courses": [
    "6621b94013c28c2a6caa4488",
    "6621b94213c28c2a6caa4497",
    "6621b94213c28c2a6caa4497"
  ]
}
```
---

### 
