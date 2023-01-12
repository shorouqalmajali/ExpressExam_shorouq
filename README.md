# ExpressExam_shorouq

User model:
id: PK, autogenerated
firstname: string maximum length 255
lastname: string maximum length 255
email: string of type email
hashed_password: string maximum length 255;
Create:
• Method: POST
• URL: /users
• Request body:
{
 "firstname": "John",
 "lastname": "Doe",
 "email": "john.doe@example.com",
 "hashed_password": "hash123"
}
• Success response:
{
 "status": "success",
 "user": {
 "id": 1,
 "firstname": "John",
 "lastname": "Doe",
 "email": "john.doe@example.com",
 "hashed_password": "hash123" // use bcrypt
 }
}
• Error response:
{
 "status": "error",
 "message": "A user with this email address already
exists."
}
Read:
• Method: GET
• URL: /users/1
• Success response:
{
 "status": "success",
 "user": {
 "id": 1,
 "firstname": "John",
 "lastname": "Doe",
 "email": "john.doe@example.com",
 "hashed_password": "hash123"
 }
}
• Error response:
{
 "status": "error",
 "message": "User not found."
}
Update:
• Method: ?
• URL: ?
• Request body:
{
 "firstname": "Jane",
 "lastname": "Doe",
 "email": "jane.doe@example.com",
 "hashed_password": "newhash456"
}
• Success response:
{
 "status": "success",
 "user": {
 "id": 1,
 "firstname": "Jane",
 "lastname": "Doe",
 "email": "jane.doe@example.com",
 "hashed_password": "newhash456"
 }
}
• Error response:
{
 "status": "error",
 "message": "User not found."
}
Delete:
• Method: DELETE
• URL: /users/1
• Success response:
{
 "status": "success"
}
• Error response:
{
 "status": "error",
 "message": "User not found."
}
Salary model
id: PK, autogenerated
user_id: FK, references the id field in the user model
salary: integer
effective_date: date
Create: creates salary for a spicific user
• Method: Post
• URL: /salary/4/create
• Request body:
{
 "salary": 500,
 "effective_date":"01-01-2021"
}
• Success response:
{
 "status": "success",
 "salary": {
 "user_id":1
 "salary": 500,
 "effective_date":"01-01-2021"
 }
}
• Error response:
{
 "status": "error",
 "message": "A user with this id doesn’t exists."
}
Update: updates salary for a spicific user
• Method: Put
• URL: /salary/4/update
• Request body:
{
 "salary": 900
}
• Success response:
{
 "status": "success",
 "salary": {
 "user_id":1
 "salary": 900,
 "effective_date":"01-01-2021"
 }
}
• Error response:
{
 "status": "error",
 "message": "A user with this id doesn’t exists."
}
Read: Get salary for specific user
• Method: GET
• URL: /users/1/salary
• Success response:
{
 "status": "success",
 "user": {
 "id": 1,
 "firstname": "John",
 "lastname": "Doe",
 "salaries":[{
"salary":900,
"effective_date": xxx
 ]}
}
• Error response:
{
 "status": "error",
 "message": "User not found."
}
