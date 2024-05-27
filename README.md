
# UniHive (Project for managing club events)

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [UML Diagrams](#uml-diagrams)
* [Mockups](#mockups)
* [Project Report](#project-report)
* [Authors](#authors)


## About The Project

UniHive is a comprehensive and efficient platform for managing club events. It facilitates the creation,
promotion, and coordination of club events, making it easy for students to discover the activities offered by
various clubs. It also provides students with the opportunity to join clubs at their school, thereby promoting
their engagement in student life.

## Built With

* **Spring Boot**: Java-based framework for creating standalone, production-grade Spring-based applications.
* **React**: A free and open-source front-end JavaScript library for building user interfaces based on components.
* **Supabase**: An open-source database infrastructure built on PostgreSQL.
* **GitHub Actions**: Utilized for continuous integration and deployment workflows. GitHub Actions automate tasks such as running tests, building and deploying your application, and more.
* **Heroku**: Deployment platform used to host and manage your application in the cloud. Heroku enables seamless deployment of web applications, providing scalability, reliability, and ease of management.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:

* **Java Development Kit (JDK)**: Ensure you have Java installed on your machine.
* **Node.js**: Make sure you have Node.js installed.
* **npm or Yarn**: Install either npm or Yarn package manager, which comes bundled with Node.js.
* **Git**: Ensure you have Git installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/m-elhamlaoui/development-platform-biog.git
   ```

2. Navigate to the backend directory
    ```sh
   cd unihive-backend
   ```

3. Install backend dependencies
    ```sh
   ./mvnw clean install
   ```

4. Start the backend server
    ```sh
   ./mvnw spring-boot:run
   ```

5. In a new terminal, navigate to the frontend directory
    ```sh
   cd unihive-fe
   ```

6. Install frontend dependencies
    ```sh
   npm install
   ``` 
   or
   ```sh
    yarn install
   ```

7. Start the frontend server
    ```sh
    npm run dev
   ``` 
   or
   ```sh
    yarn run dev
   ```
Now you can access the application by visiting http://localhost:5173 in your web browser.

## UML Diagrams

### Use case diagram

<img src="UML Diagrams\use_case_diagram.png" width="600"/>

### Class diagram

<img src="UML Diagrams\class_diagram.png" width="600"/>

## Mockups

### Home page
<img src="Mockups\Home Page.png" width="700"/>

### Login page
<img src="Mockups\Log in Page.png" width="700"/>

### Forgotten Password page
<img src="Mockups\Forgotten Password Page.png" width="700"/>

### SignUp page
<img src="Mockups\Sign up Page.png" width="700"/>

### Events page
<img src="Mockups\Events Page.png" width="700"/>

### Events page (events drop-down)
<img src="Mockups\Events Page (Events Drop-Down).png" width="700"/>

### Event page
<img src="Mockups\Event Page.png" width="700"/>

### Clubs page
<img src="Mockups\Clubs Page.png" width="700"/>

### Club profile page (events)
<img src="Mockups\Club Profile Page (Events).png" width="700"/>

### Club profile page (contact)
<img src="Mockups\Club Profile Page (Contact).png" width="700"/>

### Club profile page (about)
<img src="Mockups\Club Profile Page (About).png" width="700"/>

### Calendar page
<img src="Mockups\Calendar Page.jpeg" width="700"/>

### User profile page
<img src="Mockups\User Profile Page.png" width="700"/>

### User profile page (settings)
<img src="Mockups\User Profile Settings Page.png" width="700"/>

### Super Admin dashboard
<img src="Mockups\Superadmin Dashboard Page.png" width="700"/>

### Super Admin dashboard (admins table)
<img src="Mockups\Superadmin Admins Page.png" width="700"/>

### Super Admin dashboard (add)
<img src="Mockups\Superadmin Admins Add Page.png" width="700"/>

### Super Admin dashboard (edit)
<img src="Mockups\Superadmin Admins Edit Page.png" width="700"/>

### Super Admin dashboard (delete)
<img src="Mockups\Superadmin Admins Delete Page.png" width="700"/>

### Super Admin dashboard (clubs table)
<img src="Mockups\Superadmin Clubs page.png" width="700"/>

### Super Admin dashboard (events table)
<img src="Mockups\Superadmin Events Page.png" width="700"/>

### Super Admin dashboard (schools table)
<img src="Mockups\Superadmin Schools Page.png" width="700"/>

### Super Admin dashboard (students table)
<img src="Mockups\Superadmin Students Page.png" width="700"/>

### Super Admin dashboard (requests table)
<img src="Mockups\Superadmin Requests Page.png" width="700"/>

### Super Admin profile
<img src="Mockups\Superadmin Profile Page.png" width="700"/>

### Admin Dashboard
<img src="Mockups\Admin Dashboard Page.png" width="700"/>

### Admin Dashboard (clubs table)
<img src="Mockups\Admin Clubs Page.png" width="700"/>

### Admin Dashboard (events table)
<img src="Mockups\Admin Events Page.png" width="700"/>

### Admin Dashboard (students table)
<img src="Mockups\Admin Students Page.png" width="700"/>

### Admin Dashboard (requests)
<img src="Mockups\Admin Request Page.png" width="700"/>

### Admin profile
<img src="Mockups\Admin Profile Page.png" width="700"/>

### Admin Dashboard (events table)
<img src="Mockups\Admin Events Page.png" width="700"/>

### Contact page
<img src="Mockups\Contact Page.jpg" width="700"/>

### About page
<img src="Mockups\About Page.jpg" width="700"/>

## Project Report
For detailed information about the project, including design decisions, implementation details, and future improvements, please refer to the project report. You can access the report [here](Project%20Report.pdf).

## Authors

* **Boutaina Moustaine** - [Boutaina Moustaine](https://github.com/BoutainaM-dev)
* **Ilyass Krichi** -[Ilyass Krichi](https://github.com/IlyassKrichi)
* **Oumaima Nadir** - [Oumaima Nadir](https://github.com/nadiroumaima)
* **Ghita Loukili** - [Ghita Loukili](https://github.com/GhitaLoukili)