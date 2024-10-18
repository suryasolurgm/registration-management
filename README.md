# Registration Management System

This project is a Registration Management System built with Spring Boot for the backend and a simple HTML/JavaScript frontend.

## Prerequisites

- Java Development Kit (JDK) 11 or higher
- Maven
- MySQL

## Setting Up the Database

1. **Install MySQL**: If you don't have MySQL installed, download and install it from [MySQL Downloads](https://dev.mysql.com/downloads/).

2. **Create Database**: Open MySQL command line or a MySQL client and run the following commands to create a new database:

    ```sql
    CREATE DATABASE registration_management;
    ```

3. **Create User**: Create a new MySQL user and grant privileges to the database:

    ```sql
    CREATE USER 'registration_user'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON registration_management.* TO 'registration_user'@'localhost';
    FLUSH PRIVILEGES;
    ```

## Configuring the Backend

1. **Clone the Repository**: Clone this repository to your local machine.

    ```sh
    git clone https://github.com/suryasolurgm/registration-management.git
    cd registration-management
    ```

2. **Configure Application Properties**: Open `src/main/resources/application.properties` and update the MySQL database connection details:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/registration_management
    spring.datasource.username=registration_user
    spring.datasource.password=password
    spring.jpa.hibernate.ddl-auto=update
    ```

## Running the Backend

1. **Build the Project**: Use Maven to build the project.

    ```sh
    mvn clean install
    ```

2. **Run the Application**: Start the Spring Boot application.

    ```sh
    mvn spring-boot:run
    ```

    The backend will be running at `http://localhost:8080`.

## Running the Frontend

1. **Open HTML File**: Open `src/main/resources/static/index.html` in your web browser.

    The frontend will be available at `http://localhost:8080/index.html`.

## API Endpoints

- **GET /api/registrations**: Retrieve all registrations.
- **POST /api/registrations**: Create a new registration.
- **GET /api/registrations/{id}**: Retrieve a registration by ID.
- **PUT /api/registrations/{id}**: Update a registration by ID.
- **DELETE /api/registrations/{id}**: Delete a registration by ID.

## Troubleshooting

- Ensure MySQL is running and accessible.
- Verify the database connection details in `application.properties`.
- Check the console for any error messages during application startup.

## License

This project is licensed under the MIT License.