# Ecommerce App Installation
The website runs on HTTPS as requested and this requirement can be viewed at this address here:
[Website](https://bestorangesusa.com/)
However the database and backend functions will not be test at this addressed.  They can be tested however on your localhost or on your installation in your own server.

A detailed linux configuration using Amazon Lightsail.

## Docker Installation
1. You must go to the website https://docs.docker.com/desktop/install/mac-install/
2. Makre sure you click Mac with Intel Chip.
3. like the file that is downloaded called Docker.dmg
![1InstallDocker](https://user-images.githubusercontent.com/21030885/204086266-feb75bf5-5629-45a3-8f12-ce605ce0e1aa.png)

## Node Installation
1. Go to https://nodejs.org/en/download/ click macOSInstallter 64-bit/ARM64
2. After you install node you will need to make sure that npm on your machine matches the application
-  sudo npm install -g n
-  sudo n 16.13.2
- you must do this to insure that the frontend works
![2nodeinstall](https://user-images.githubusercontent.com/21030885/204086286-0d8264c4-30c1-40bb-ae29-2b37bb2dcec2.png)

## Golang Installation
1.  Go to `https://go.dev/doc/install` and click Mac under step 2.  Then on step 1 click Download Go for Mac or you necessary operating system.
![installgolang](https://user-images.githubusercontent.com/21030885/204086292-f4eb9b92-6b6b-478c-a9ec-761608c392f4.png)


# Check the system
- Now make sure you have the appropiate requirements run `docker --version`
- You should see this version `Docker version 20.10.20` or higher
- Run `npm -v` 
- You will get this version  `Node version 16.13.2`


![Screenshot_1](https://user-images.githubusercontent.com/21030885/204087518-20625bcc-3fed-46d3-903a-26aa49712eec.png)





# Run the application

## First start the backend
- go the the directory inside of `CoinProject\flone-react-ecommerce-template-2022-02-21-23-53-49-utc\back-end`

- Now run the application using the following command `sudo docker-compose up`

## second start the frontend
- go the the directory inside of `CoinProject\flone-react-ecommerce-template-2022-02-21-23-53-49-utc\flone`

- Now run the application using the following command `npm start`

- The application will now run on `http://localhost:3000`

# Install the application on AWS Lightsail

# Run the application on HTTPS
- go to your domain name on AWS console in Route 53

- then click create record

- copy the public IP address of your website.

- make sure your backend app is running 
1. first go to the backend folder and run the following commands `sudo docker-compose up -d` and then `sudo docker-compose -f`

- Then install nginx using the following commands
- `sudo apt update -y` `sudo apt install nginx` `sudo systemctl start nginx`


