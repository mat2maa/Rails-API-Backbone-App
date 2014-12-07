# Rails API Backbone App #
***
Included in this repository is the starer for a Rails API and Backbone web application.

# Getting Started #
***
*Note: The following setup presumes that you are running OS X 10.8 (Mountain Lion) or greater and have XCode and its Command Line Tools installed.*


The api is built in [Ruby on Rails API](https://github.com/rails-api/rails-api "RoRAPI") and a good guide for getting started with Ruby, Rails, Homebrew, Git and PostgreSQL can be found [here](https://gorails.com/setup/osx/10.9-mavericks "Initial Setup Instructions").

Once you have a fully up-and-running development machine, you can clone the repository and install a development instance.

# Installation #
***
In OS X Terminal git clone this repository into a folder using
```
git clone [git repository url] [folder]
```
<br>
Change directory to the root folder of the app.
<br>
Next, to install the contents of the Gemfile
```
bundle install
```
<br>
You should edit `config/database.yml` to match your Postgres setup. Then run
```
rake db:create
rake db:migrate
```
You should edit `config/secrets.yml` to with your account preferences and then populate the application database via
```
rake db:seed
```
# Fire it up!#
***
Fire up the server with 
```
rails s
```
and open <http://localhost:3000/>. You should now see a table listing the user that was just created.