
# Image Caption Generator

This repository contains code for an Image Caption Generator. Follow the steps below to set up and run the client and server components of this project.

## Client Setup

### Step 1: Install Dependencies

Navigate to the `client` directory using the terminal and run the following command to install the required dependencies:

```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

Create an `.env` file in the `client` directory and add the following environment variables with your desired values:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pasdasdfsdfsafasdf
CLERK_SECRET_KEY=asdfsadfasdfasdf

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

OPENAI_API_KEY=asdfsadfasdfasdfsda
```

### Step 3: Start the Client

In the `client` directory, run the following command to start the client application:

```bash
npm run dev
```

## Server Setup

### Step 1: Activate Virtual Environment

Navigate to the `server` directory using the terminal and activate the virtual environment with the following commands:

```bash
cd server
python -m venv .venv (Do this if you dont have .venv directory in your root)
cd .venv
cd scripts
./activate
cd ..
```

### Step 2: Start the Server

Return to the root path of the server directory and start the server using the following command:

```bash
cd ..
uvicorn api:app --reload
```

The server will start listening on port 8000.

## Project Start

With both the client and server set up and running, you can now use the Image Caption Generator.

Feel free to modify the environment variables and configurations as needed for your project.

Make sure to replace the placeholder values in the environment variables with your actual API keys and URLs. This README file provides clear instructions for setting up and running your image caption generator project. 

Code by @Iam-DeepakVel. 

If you'd like to work together, just go to https://iamdeepak.tech and get in touch with me. I'd love to hear from you!
