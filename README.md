# Employee Management System

A full-stack **Employee Management System** developed using **Java, Spring Boot, MySQL, HTML, CSS, and JavaScript**.

This application provides a user-friendly dashboard for managing employee records with complete CRUD operations, search, department filtering, sorting, pagination, and dashboard statistics.

---

## 📌 Project Overview

The Employee Management System is designed to simplify employee record management through a web-based application.

The backend is built using **Java and Spring Boot**, with **Spring Data JPA/Hibernate** for database operations. Employee information is stored in a **MySQL** database, while the frontend provides an interactive dashboard using **HTML, CSS, and JavaScript**.

The frontend communicates with the backend through **REST APIs**.

---

## 🚀 Features

* ➕ Add new employees
* 👥 View all employee records
* ✏️ Edit employee information
* 🗑️ Delete employees
* 🔍 Search employees by name, email, or department
* 🏢 Filter employees by department
* ↕️ Sort employees by name and salary
* 📄 Pagination for employee records
* 📊 Dashboard statistics
* 💾 Persistent data storage using MySQL
* 🔗 REST API integration
* ⚠️ Error handling and user notifications
* 🔄 Automatic data loading from the backend

---

## 🛠️ Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript

### Database

* MySQL

### Development Tools

* Eclipse / Spring Tool Suite
* MySQL Workbench
* Git
* GitHub

---

## 🏗️ Project Structure

```text
employee-management-system/
│
├── .mvn/
│   └── wrapper/
│
├── employee-frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/anusha/employee_management_system/
│   │   │       ├── controller/
│   │   │       ├── entity/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── .gitattributes
├── .gitignore
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

---

## 🔄 Application Workflow

```text
User
  │
  ▼
HTML / CSS / JavaScript Frontend
  │
  ▼
REST API
  │
  ▼
Spring Boot Backend
  │
  ▼
Spring Data JPA / Hibernate
  │
  ▼
MySQL Database
```

The frontend sends HTTP requests to the Spring Boot REST API.

The backend processes the requests and performs database operations using Spring Data JPA and Hibernate.

The results are then returned to the frontend and displayed in the dashboard.

---

## 🗄️ Database Setup

This project uses **MySQL** for storing employee information.

### 1. Create the database

Open MySQL Workbench and create the database:

```sql
CREATE DATABASE employee_db;
```

### 2. Configure the application

Update the database configuration in:

```text
src/main/resources/application.properties
```

Use your own MySQL username and password.

**Do not upload real database passwords or other credentials to GitHub.**

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## ▶️ How to Run the Project

### Step 1: Clone the repository

```bash
git clone https://github.com/Anushakuruba/employee-management-system.git
```

### Step 2: Open the project

Open the project using:

* Eclipse
* Spring Tool Suite
* IntelliJ IDEA

### Step 3: Configure MySQL

Make sure:

* MySQL is installed and running
* `employee_db` database exists
* Your MySQL credentials are configured correctly

### Step 4: Run the Spring Boot application

Run the main Spring Boot application from your IDE.

The backend will start on:

```text
http://localhost:8080
```

### Step 5: Open the frontend

Open:

```text
employee-frontend/index.html
```

You can use a browser or VS Code Live Server to run the frontend.

---

## 🔗 REST API Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/employees`      | Get all employees  |
| GET    | `/api/employees/{id}` | Get employee by ID |
| POST   | `/api/employees`      | Add a new employee |
| PUT    | `/api/employees/{id}` | Update employee    |
| DELETE | `/api/employees/{id}` | Delete employee    |

### Example API URL

```text
http://localhost:8080/api/employees
```

---

## 🖥️ Application Screenshots

Screenshots of the application will be added here.

### Dashboard

*Add dashboard screenshot here.*

### Add Employee

*Add add-employee screenshot here.*

### Employee Management

*Add employee list screenshot here.*

### Search, Filter & Sort

*Add search/filter/sort screenshot here.*

---

## ✅ Testing

The following functionality has been tested successfully:

* Add employee
* Edit employee
* Delete employee
* Search employees
* Department filtering
* Name sorting
* Salary sorting
* Pagination
* Browser refresh
* MySQL data persistence
* Frontend and backend API communication

---

## 🔮 Future Enhancements

Possible future improvements include:

* User authentication and authorization
* Admin and employee roles
* Employee profile management
* Employee attendance management
* Salary management
* Email notifications
* Advanced reporting and analytics
* Cloud deployment
* Mobile-friendly improvements

---

## 🎯 Learning Outcomes

Through this project, the following concepts were practiced:

* Java application development
* Spring Boot
* REST API development
* Spring Data JPA
* Hibernate
* MySQL database integration
* CRUD operations
* Frontend and backend integration
* JavaScript API communication
* Exception handling
* Git and GitHub
* Full-stack application development

---

## 👩‍💻 Author

**Anusha**

MCA Graduate | Java | Spring Boot | MySQL | Full-Stack Development

---

## ⭐ If You Like This Project

If you find this project useful, feel free to ⭐ star the repository.
