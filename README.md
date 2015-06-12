#Projects Application

#Setup Dokku
git remote add dokku dokku@projects.joe-burton.com:projects
git add .
git commit -m "firtst commit"
git push dokku master

#Install MongoDB on Digital Ocean
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#Installing Dokku MongodDB Plugin
https://github.com/jeffutter/dokku-mongodb-plugin

git clone https://github.com/jeffutter/dokku-mongodb-plugin.git /var/lib/dokku/plugins/mongodb
dokku plugins-install

#Start MongoDD
dokku mongodb:start

#Create a database and associate it with app: dokku mongodb:create <database> <project>
dokku mongodb:create projects projects

#Link database to app - mongodb:link <app> <database>

#Remove database - app dokku mongodb:delete <database> <project>
dokku mongodb:delete projects projects

#Config - retrive environment variables
dokku config projects

MONGODB_DATABASE: projects-production
MONGODB_HOST:     172.17.0.17
MONGODB_PASSWORD: a3pWM2JQZ3UrR1lDQ0N0TG1aVXFJK2FWcml3cGt1c1FsK08xbHpJUkNsOD0K
MONGODB_PORT:     27017
MONGODB_USERNAME: projects
MONGO_URI:        mongodb://projects:a3pWM2JQZ3UrR1lDQ0N0TG1aVXFJK2FWcml3cGt1c1FsK08xbHpJUkNsOD0K@172.17.0.17:27017/projects-production
MONGO_URL:        mongodb://projects:a3pWM2JQZ3UrR1lDQ0N0TG1aVXFJK2FWcml3cGt1c1FsK08xbHpJUkNsOD0K@172.17.0.17:27017/projects-production


MongoDB Query stuff: 
$ dokku mongodb:console
$ db.projects.find().pretty()


#Start app locally
cd ~/Sites/projects
DEBUG=myapp npm start


#References
	- setup dokku, http://markrabey.com/2015/02/08/express-site-with-digital-ocean-and-dokku/ 
	- mongodb setup, https://www.youtube.com/watch?v=xpD9AOcWlgc
	- http://pythonhackers.com/p/jeffutter/dokku-mongodb-plugin
	- https://github.com/jeffutter/dokku-mongodb-plugin
	- http://stackoverflow.com/questions/24853848/deploying-node-js-app-with-mongodb-with-dokku-on-digital-ocean
	- https://www.andrewmunsell.com/blog/dokku-tutorial-digital-ocean
