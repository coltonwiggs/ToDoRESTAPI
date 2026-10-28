# To-Do List REST API

### This program is the backend of a To-Do List manager REST API using ASP.NET Core on .NET 10.
### This program allows users to create, read, update, and delete tasks in a to-do list, with the data being stored in a Microsoft SQL Server database.

## Stack:
	- Language: C#
	- Framework: ASP.NET Core on .NET 10
	- Database: Microsoft SQL Server

## Prerequisites:
	- .NET 10 SDK
	- Microsoft SQL Server or Microsoft SQL Server Express
	- A .NET 10 compatible IDE (i.e. Visual Studio, Visual Studio Code)

## Setup:
	1.	Clone the repository to your local machine from my GitHub profile:
		https://github.com/coltonwiggs/ToDoRESTAPI.git
		Download as ZIP and extract the files to a folder of your choice, OR, 
		Use Git to clone the repository directly:
			In terminal:
				git clone https://github.com/coltonwiggs/ToDoRESTAPI.git
				cd ToDoRESTAPI
				dotnet restore
				dotnet build
	2.	Open the project in your preferred IDE.
	3.	Add the following NuGet packages to your project if they are not already included:
			- Microsoft.EntityFrameworkCore
			- Microsoft.EntityFrameworkCore.Design
			- Microsoft.EntityFrameworkCore.Tools
	4.	Create a new Microsoft SQL Server database named "ToDoDB" (or any other desired name) using SQL Server Management Studio or any other database management tool of your choice.
	5.	Connect to the database from within your IDE. For Visual Studio:
			- Open Server Explorer
			- Right-click on "Data Connections" and select "Add Connection..."
			- Choose "Microsoft SQL Server" as the data source and click "Continue"
			- Enter your server name and authentication method, then select the newly created database from the dropdown list and click "OK"
			- The new database should now appear under "Data Connections" in Server Explorer.
	6.	In your database management tool, execute a new query from the newly created database.
			- Paste and execute the following SQL command to generate a connection string for your database:
				SELECT 'Data Source=' + @@SERVERNAME + 
					';Initial Catalog=' + DB_NAME() + 
					CASE type_desc 
						WHEN 'WINDOWS_LOGIN' THEN ';Trusted_Connection=True;TrustServerCertificate=True;' 
						ELSE ';User ID=' + SUSER_NAME() + ';Password=<<YourPassword>>;TrustServerCertificate=True;' 
					END AS ConnectionString 
				FROM sys.server_principals 
				WHERE name = SUSER_NAME();
	7.	Configure the database connection string in the appsettings.json file:
			"ConnectionStrings": {
				"DefaultConnection": "<paste the generated connection string here>"
			}
	9.	Run the following command in the terminal to create the table in your database:
			dotnet ef database update

## Running the application:
	1.	Run the application using your IDE or by executing the following command in the terminal:
			dotnet run
	2.	The application will start and listen for incoming HTTP requests on the default port.
	3.	To send requests to the API, use the ToDoRestAPI.http file included in the project. This file contains pre-configured HTTP requests for testing the API endpoints.
			- GET {{ToDo}}/api/todo: Retrieve all tasks
			- GET {{ToDo}}/api/todo/<taskID>: Retrieve a specific task by ID
			- POST {{ToDo}}/api/todo: Create a new task
			- PUT {{ToDo}}/api/todo/<taskID>: Update an existing task
			- DELETE {{ToDo}}/api/todo/<taskID>: Delete a task

## ToDoItem fields (columns of database table):
	- Id: Unique identifier for the task (integer)
	- Title: Title of the task (string)
	- Description: Description of the task (string)
	- IsCompleted: Status of the task (boolean)
	- DueDate: Due date/time of the task (DateTime)
	- CreatedAt: UTC timestamp of when the task was created (DateTime) (automatically set when the task is created/updated)

## HTTP Status Codes:
	- 200 OK: The request was successful, and the response body contains the requested data.
	- 201 Created: The request was successful, and a new resource was created. The response body contains the newly created resource.
	- 204 No Content: The request was successful, but there is no content to return in the response body.
	- 400 Bad Request: The request was invalid or malformed. The response body may contain additional information about the error.
	- 404 Not Found: The requested resource could not be found. The response body may contain additional information about the error.
	- 500 Internal Server Error: An unexpected error occurred on the server. The response body may contain additional information about the error.

## Developer Notes:
	As this project stands, only the basic backend functionality is implemented. A fully functional frontend for this application is currently in the works. 

### Thank you for viewing my To-Do List REST API project! If you have any questions or feedback, please reach out to me at cwiggs4417@gmail.com.