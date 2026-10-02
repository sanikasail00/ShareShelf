# ShareShelf – Community Resource Sharing Platform

ShareShelf is a web-based community resource-sharing application that allows users to share useful resources such as books, electronics, college materials, tools and other items. Users can also view available resources and submit requests for required items.

## Features

* Browse available resources
* Add new resources
* View resource details
* Submit resource requests
* User sign-in and sign-up interface
* Category-based resource organization
* Responsive web interface

## Technologies Used

* React.js
* JavaScript
* HTML
* CSS
* AWS

  * Amazon S3
  * AWS Lambda
  * Amazon DynamoDB
  * Amazon API Gateway

## AWS Implementation

AWS services were used during the practical implementation and demonstration of the project.

* **Amazon S3:** Used for resource image storage.
* **AWS Lambda:** Used for backend processing.
* **Amazon DynamoDB:** Used to store resource and request information.
* **Amazon API Gateway:** Used to connect the frontend application with the backend.

## Project Flow

```text
User
  ↓
ShareShelf Frontend
  ↓
API Gateway
  ↓
AWS Lambda
  ↓
S3 / DynamoDB
  ↓
Response to User
```

## How to Run

Clone the repository and open the project folder.

```bash
npm install
npm run dev
```

The application can then be accessed through the local development server provided by Vite.

## Project Status

The ShareShelf application was implemented and demonstrated as part of an AWS cloud practical activity.
