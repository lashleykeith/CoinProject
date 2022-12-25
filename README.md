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
![1getdomainname](https://user-images.githubusercontent.com/21030885/209463783-8d53c055-68ef-4081-b505-396ecf541d36.png)

- then click create record
![2createcord](https://user-images.githubusercontent.com/21030885/209463789-cf4b23ea-e26f-4613-a0cf-2b82db69ffc6.png)

- copy the public IP address of your website.
![3copythepublicIP](https://user-images.githubusercontent.com/21030885/209463791-792fdcbd-5adb-4f8a-b298-7237c0daa46e.png)

- make sure your backend app is running 
1. first go to the backend folder and run the following commands `sudo docker-compose up -d` and then `sudo docker-compose -f`

- Then install nginx using the following commands
- `sudo apt update -y` `sudo apt install nginx` `sudo systemctl start nginx`
- Open up the default document in nginx `sudo vi /etc/nginx/sites-available/default
` you will see a document that looks like this.
![4nginx](https://user-images.githubusercontent.com/21030885/209463802-b5bcf734-795e-41f7-bcbe-65f54660bffb.png)

- press i and scroll down to where it says `server_name _;` you are going to replace the `_;` with the domain name`bestorangesusa.com;`
- scroll up to where it says `# First attempt to serve request as file, then` and replace it with this `proxy_pass http://localhost:3000;`
![5replacethiscomment](https://user-images.githubusercontent.com/21030885/209463803-c8d1daf7-4103-4ff6-9cca-9f37c7a63b16.png)

- set the `$host` variable to the domain name is it isn't already.  On the line where it says `listen 80 default server;` and `listen[::]80 default_server` replace with `listen 80;` and then `server_name bestorange.com` under that.
![6amkesureyouchangethissection](https://user-images.githubusercontent.com/21030885/209463804-7651dbe6-c8e2-4521-9215-b1785edf9762.png)

- Make sure you comment these lines out like this.
![7replaced](https://user-images.githubusercontent.com/21030885/209463809-542762ed-cb2c-4f82-bcf2-29d091113ffe.png)
![8makesureyoucommenttheselinesout](https://user-images.githubusercontent.com/21030885/209463813-09897029-9f78-499f-9b6d-093501b799bc.png)

- Go to `location / {` and make sure the following has lines commented out like this
![9makesurethattheselinesarecommentedout](https://user-images.githubusercontent.com/21030885/209463817-0fe5c57d-6741-420f-a4a0-cdd2f2930b15.png)

2. Make sure the frontend works
- in the folder where the react app is run the commands `pm2 delete 0` then `pm2 start npm --name "app name" -- start`
3. Activate the HTTPS Website
- restart nginx `sudo systemctl restart nginx`
- check the website `curl https://bestorangesusa.com` and then `https://bestorangesusa.com` in the chrome browser.
- Install snapd on server `sudo apt update`,`sudo apt install snapd`
- Install cerbot by using these comands `sudo snap install --classic certbot`, `sudo ln -s /snap/bin/certbot /usr/bin/certbot`,  
- Now connect domain with ssl `sudo certbot --nginx`
- Restart Nginx `
muhammadsoba957
Dec 23, 2022, 10:23 PM
ReportSpam
have delete my server now it is difficult for me to launch a new server with all packages download and run applictation with ssl but i told you with all steps with easy way
1. create a record with domain name in route53

2 install nginx and start
sudo update -y
sudo apt-get install nginx -y
3 open vi /etc/nginx/sites-available/default replace content like this
server {
listen 80;
server_name soban.store;


location / {
proxy_pass http://localhost:3000;
}
}
4. restart nginx
`sudo systemctl restart nginx`
5. check website on chrome like bestorangesusa.com
6. install snapd on server
`sudo apt update`
`sudo apt install snapd`
7. install certbot by using these commands
`sudo snap install --classic certbot`
`sudo ln -s /snap/bin/certbot /usr/bin/certbot`
8. now connect domain with ssl
`sudo certbot --nginx`
9.restart nginx `sudo systemctl restart nginx`
10. Check the website in the browser.
