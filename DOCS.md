# API Documentation
---
## Understanding URL Parameters
In our API endpoints, you might come across URLs that contain variables prefixed with a colon (`:`), such as `/api/messages/student/:studentId`.

### What is `:variable`?

The `:variable` syntax in URLs indicates a placeholder for a specific value. When making a request to such endpoints, you need to replace `:variable` with the actual value it represents.

### Example:

For the URL `/api/messages/student/:studentId`, you would replace `:studentId` with the actual ID of the student you want to interact with.

#### Example Request:

```http
GET /api/messages/student/12345
```

In this example, `12345` is the actual ID of the student.
---
## The API is live @ https://academify-f0qd.onrender.com
so every route documented is to be called as https://academify-f0qd.onrender.com/routename i.e /register/student is to be called as https://academify-f0qd.onrender.com/register/student

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
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
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
- **Example Request:**
  ```json
  {
    "reg": "20230001",
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
    "sender": "6115d591b8bbcd001bf18b7e",
    "content": "Don't forget about the upcoming exam."
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
    "content": "I have a question about the assignment."
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
- **Example Response:** Array of message objects

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
    "sender": "6115d591b8bbcd001bf18b7e",
    "content": "Your child did well in the recent test."
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
    "content": "I have a concern about my child's progress."
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
- **Example Response:** Array of message objects

---

## Parent Routes (All requests should contain the token in the auth header)

### Get Parent Information

Retrieves information about a Parent.

- **URL:** `/parent/profile`
- **Method:** `GET`
- **Description:** Get Parent information.
- **Example Response:**
  ```json
  {
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@gmail.com",
    },
    "children": [
      {
        "_id": "6152f8a91b6cf4a2443d2e4d",
        "firstName": "John",
        "lastName": "Doe",
        "reg": "20230001",
        "advisor": "6152f8a91b6cf4a2443d2e4c"
      },
      {
        "_id": "6152f8a91b6cf4a2443d2e4d",
        "firstName": "John",
        "lastName": "Doe",
        "reg": "20230001",
        "advisor": "6152f8a91b6cf4a2443d2e4c"
      }
    ]
  }
  ```
---

### Get Child Result

**URL:** `/parent/getChildResult`

**Method:** `GET`

**Description:** Fetches the result for a specific student under a parent.

- **Request Body:**
  - `reg` (string): Reg No of the student.
  - `semesterName` (string): The Semester Name : Harmattan / Rain.
  - `session` (string): The session eg: 2022/2023.
- **Example Request:**
  ```json
  {
    "reg": "12345566",
    "semesterName": "Harmattan",
    "session": "2022/2023"
  }
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

#### Edit Parent Profile/ Password

Edit the parent's Profile.

- **URL:** `/parent/editProfile`
- **Method:** `POST`
- **Description:** Saves the editted parent profile.
- **Request Body:**
  - `firstName` (string): First Name of the parent.
  - `lastName` (string): last Name of the parent.
  - `password` (string): password to be changed.
- **Example Request:**
  ```json
  {
    "firstName": "John",
    "lastName": "John",
    "password": "password"
  }
  ```
- **Example Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

Add child to the parent using reg no.

- **URL:** `/parent/addChild`
- **Method:** `POST`
- **Description:** Adds a child under a parent.
- **Request Body:**
  - `reg` (string): Reg No of the child.
- **Example Request:**
  ```json
  {
    "reg": "122345656"
  }
  ```
- **Example Response:**
  ```json
  {
    "message": "Child Added Successfully"
  }
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

### Upload Results

#### Description

This controller function handles the uploading of results to the database. It expects the uploaded results to be received as JSON in the request body.

- **URL:** Not applicable. This is a controller function and not directly accessible via a URL.
- **Method:** `POST`
- **Auth Required:** Yes
- **Permissions Required:** None

#### Request Body

- `results` (array of objects): An array of result objects to be uploaded to the database.


#### Responses

- **201 Created:** Results were successfully uploaded to the database.
  - **Content:** JSON object containing a success message and an authentication token.
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
