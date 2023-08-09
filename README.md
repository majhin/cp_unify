# cp_unify
Company Placement portal README

Welcome to the README for the Company Data Management System project. This project aims to create an interface for company employees to efficiently manage and compile their data for report generation. The system will allow users to fill in data, store it in a database, and download it in CSV format. Additionally, the project includes a bonus feature to fetch and display real available jobs using external APIs.

#################Table of Contents#################
Introduction
Features
Setup
Usage
Bonus Feature
CSV Data Format
Contributing
License

Introduction
A simple nodejs Backend(Express) with NoSQL database (MongoDB), server side rendering (EJS) and authorization system (Passport-Local). MVC folder structure is implemented for better readability including the comments surrounding each route and controller. Bootstrap has been used for the visuals including the toasts notifications for confirmation needed where ever. A library that handles CSV has been used in the serving process where once the file has been sent, it's deleted from the server.

#################Features#################
The Company Data Management System includes the following key features:

Sign Up and Sign In functionality for employees.
Student details management, including college, placement status, course scores, and interview results.
Interview scheduling and management, allowing assignment of students and result marking.
External Jobs List (Bonus Feature) that fetches real available jobs using open APIs.
Data export to CSV format for easy reporting.

#################Setup#################
To set up the project locally, follow these steps:

Clone the repository from GitHub:
bash git clone <repository_url>
Install the necessary dependencies: npm install

Set up your database connection and environment variables. (.env already provided)

Run the development server: npm start

#################Usage#################
The Company Data Management System provides an intuitive web interface for performing the following tasks:

Sign up and log in for employees.
Manage student details, including adding new students and updating their information.
Schedule and manage interviews, including assigning students and marking results.
Export data to CSV format for report generation.
Bonus Feature: External Jobs List
The bonus feature of the project fetches real available jobs in India for React and Node.js using external APIs. The jobs are displayed on a minimalistic page, and users can follow the provided links to apply directly.

#################CSV Data Format#################
The CSV export feature generates a CSV file with the following columns:

Student ID
Student Name
Student College
Student Status
DSA Final Score
WebD Final Score
React Final Score
Interview Date
Interview Company
Interview Student Result
Please note that each student may have multiple entries based on the interviews they have participated in.

#################Contributing#################
Contributions to the Company Data Management System project are welcome! If you have ideas for improvements or would like to report issues, please submit a pull request or open an issue on GitHub.

#################License#################
This project is licensed under the MIT License.

Thank you for your interest in this project. For any further assistance or inquiries, please don't hesitate to contact us. Happy coding!
