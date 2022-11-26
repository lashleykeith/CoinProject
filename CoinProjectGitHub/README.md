# Ecommerce App Installation
A detailed linux configuration using Amazon Lightsail.

## Docker Installation
1. You must go to the website https://docs.docker.com/desktop/install/mac-install/
2. Makre sure you click Mac with Intel Chip.
3. like the file that is downloaded called Docker.dmg

## Node Installation
1. Go to https://nodejs.org/en/download/ click macOSInstallter 64-bit/ARM64
2. After you install node you will need to make sure that npm on your machine matches the application
-  sudo npm install -g n
-  sudo n 16.13.2
- you must do this to insure that the frontend works

## Golang Installation
1.  Go to `https://go.dev/doc/install` and click Mac under step 2.  Then on step 1 click Download Go for Mac or you necessary operating system.


# Run the application

## First start the backend
- go the the directory inside of `CoinProject\flone-react-ecommerce-template-2022-02-21-23-53-49-utc\back-end`

- Now run the application using the following command `sudo docker-compose up`

## second start the frontend
- go the the directory inside of `CoinProject\flone-react-ecommerce-template-2022-02-21-23-53-49-utc\flone`

- Now run the application using the following command `npm start`

- The application will now run on `http://localhost:3000`



