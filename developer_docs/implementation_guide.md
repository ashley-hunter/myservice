# Documentation Implementation Guide

## Getting Started

The documentation site is a Jekyll project consisting of HPE themed layouts and all the necessary configuration to build and deploy your documentation site. 

Using these layouts will provide a consistent user experience across all services.

To incorporate the documentation into your project it should be added as a submodule in your repository.

Each service's documentation should be accessible from both the GitHub site and the site hosted in the gh-pages branch of the repository.

## Using the Templates

### Adding the Submodule

Git submodules are designed to be a way to incorporate another project within your project.

We need to add the submodule to it's own subfolder call `documentation`. 

To do this open Git Bash and navigate to your repository directory. To add the submodule enter the following command:

    git submodule add https://github.hpe.com/ashley-glenn-hunter/caf-documentation-base.git documentation


### Installing Jekyll and its Dependencies

To build the documentation on a local machine you will need to install Jekyll's dependencies.

##### Ruby

Download the windows installer & Ruby Development Kit (http://rubyinstaller.org/)

Run installer, ensuring that you check the `Add Ruby executables to your PATH` option

Extract Ruby Developer Kit to a 'DevKit' folder in the Ruby directory. The Ruby directory is usually located in `C:\RubyXX-x64`.

Navigate to the 'DevKit' directory in the Command Prompt, then we need to run the following commands:

```
ruby dk.rb init  
ruby dk.rb review  
ruby dk.rb install  
```

##### Installing RubyGems

Download RubyGems zip file (https://rubygems.org/pages/download)

Extract zip and navigate to the directory in Command Prompt (Run as Administrator).

Install using the following command:

	ruby setup.rb

##### Installing Bundler

Simply enter the following in the Command Prompt to install Bundler:

	gem install bundle

**Note**: If an error occurs when trying to install node modules or rubygems this is likely because proxy settings have not been configured correctly. To resolve this you can set the proxies by using the following commands: (replace with the appropriate proxy and port).

	set http_proxy=http://{{proxy}}:{{port}}  
    set https_proxy=http://{{proxy}}:{{port}}

##### Installing Grunt

Grunt is a task runner that allow the automation of tasks. We can use Grunt to easily build the documentation, host it on a local webserver and deploy the documentation site.

Grunt and Grunt plugins are installed and managed via [npm](https://www.npmjs.org/), the [Node.js](https://nodejs.org/) package manager.

Once Node.js and npm are installed we can open the Command Prompt and install the Grunt CLI by using the following command:

	npm install -g grunt-cli
    
##### Installing Jekyll

Using Command Prompt navigate to the submodule folder within your repository. Enter the following commands:

	bundle install
    npm install
    
This will install Jekyll and the Grunt tasks.

### Configuring Grunt Tasks

Grunt tasks are configured in the Gruntfile.js file which can be found in the submodule folder. 

To enable publishing of site automatically using Grunt you will need to enter the required information into the Gruntfile.js under the `buildcontrol` task.

You must specify the `remote` property which should contain the url to the Git repository. The easiest method is using SSH, however if you need to specify specific login information you can provide the login name and token granting access.

![grunt configuration](images/grunttask.png)

### Writing Documentation

Documentation should be written in markdown format in the `pages` -> `en-us` folder. To add links to a page either in the top navigation bar or the side navigation bar, update the appropriate json file in the `_data` folder.

Each markdown file should specify how it should be presented by adding a layout attribute at the top of the page. Eg:

```
---
layout: default
---

Page content goes here.
```

Additionally, you should grant the documentation team access so they can make changes directly and submit pull requests.

### Testing Documentation

Testing the documentation site before publishing will help identify any errors. The Command Prompt output when running on a local machine is more helpful than the error messages GitHub provides when building the documentation fails.

To there are two available grunt tasks for testing documentation on a local machine, `build` and `serve`.

The `build` task will build the Jekyll project.

The `serve` task will build the Jekyll project, host it on a local webserver. This task will also watch for any changes to files and rebuild when necessary.

To run a task, type `grunt` followed by the task name you want to run in the Command Prompt.

### Publishing Documentation

Before publishing documentation ensure that the site has been configured correctly. A configuration file called `_config.yml` will need to have the `baseurl` property set correctly. It should be set to the url your GitHub pages site will be located at, eg:

	https://pages.github.hpe.com/caf/elements

**Note**: There should be no trailing '/' in the url.

Documentation can then be published to the `gh-pages` branch using the `grunt publish` task. 

Arrange assistance from the release engineering team to ensure previous versions of the documentation are be preserved in another folder.

## Provided Layouts

### Landing Page Layout

When you wish to implement a landing for your GitHub page, you can make use of the `landing` layout provided. 

The landing page had a header section that has a background image, logo, title, slogan and a button. 
The next section contains an overview as well as a short description of the tent pole features.
The third section contains some images of the product in use.
The final section provides links to social sites such as Twitter and GitHub.

To set these attributes, we simply have to set the layout to `landing` and define the other required attributes in the YAML Frontmatter for that page.

This can be seen below:  
```yaml
---
layout: landing

logo: assets/img/caflogo.png
title: Common Application Framework <br><small>from the Big Data group at Hewlett Packard Enterprise</small>
slogan: The Microservices based solution to your Big Data Analytics problems the <br>Common Application Framework accelerates time to value.
button:
    title: Learn More
    url: pages/en-us/what_is_caf

features:
    title: About CAF
    subtitle: Common Application Framework is a platform for building next generation cloud based applications. It provides Identity Management, Storage, Auditing, Job Services, Data Processing and Document Classification services as well as frameworks for creating new services. Developed using Microservices architecture, the Framework utilizes fault-tolerant queues for messaging, Docker containers for packaging and rapid deployment as well as Apache Mesos with Marathon for orchestration and massive scalability.
    feature_list:
        - icon: hpe-expand
          title: Scalable
          subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        - icon: hpe-cube
          title: Containerized
          subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        - icon: hpe-cloud
          title: Cloud Based
          subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        - icon: hpe-shield-configure
          title: Fault Tolerant
          subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

showcase:
    title: Made with CAF
    subtitle: CAF is being used to develop next generation enterprise applications.
    left_showcase: 
    	img: 'assets/img/showcase/showcase-2.png'
        url: ''
    center_showcase: 
    	img: 'assets/img/showcase/showcase-1.png'
        url: ''
    right_showcase: 
    	img: 'assets/img/showcase/showcase-3.png'
        url: ''

social:
    title: Get Involved
    subtitle: Get involved in the CAF project. Suggest new features, report issues or take part in development.
    social_list:
        - icon: hpe-social-twitter
          title: Twitter
          subtitle: Follow us on Twitter to keep up with the latest news and updates from the CAF team or to get in touch with us!
          link:
            title: '@caf'
            url: http://twitter.com
        - icon: hpe-social-github
          title: GitHub
          subtitle: Fork CAF services on GitHub and submit a pull request to help contribute to the project! Or if you have discovered an issue, report it to us.
          link:
            title: Fork CAF
            url: https://github.hpe.com/caf
        - icon: hpe-chat
          title: Blog
          subtitle: Follow our blog to find out all of the exciting news and announcements regarding CAF.
          link:
            title: Read More Here
            url: pages/blog.html
---
```

The above YAML would result in the following:

![Alt text](images/landing_example.PNG)

---------------------------------------

### API Landing Page Layout

The `api-landing` layout can be used to provide several links to the most important sections of the documentation available at a glance.

The layout is comprised of a header, an optional description or overview and finally several description panels that provide links to other parts of the documentation.
Each panel should contain an icon, a header, a description and a url.

To set these attributes, we simply have to set the layout to `api-landing` and define the other required attributes in the YAML Frontmatter for that page.

This can be seen below:  

```yaml
---
layout: api-landing
title: Getting Started

header: Api & Docs
description: From raw HTTP to helper libraries, get up and running quickly in your language of choice.
links:
    - icon: hpe-alarm
      title: Quickstarts
      description: A set of simple tutorials with code snippets on how to use CAF Audit.
      url: quickstarts
    - icon: hpe-task
      title: Tutorials
      description: Sample applications that cover common use cases in a variety of languages. Download, test drive, and tweet them yourself.
      url: tutorials
    - icon: hpe-code
      title: API Reference
      description: In-depth reference docs for the REST APIs provided by CAF Audit
      url: api
    - icon: hpe-catalog
      title: Helper Libraries
      description: Interact with CAF Audit APIs in Java, Node.js, Ruby, Python, PHP, C#, Javascript and more.
      url: helper-libs
---
```

The above YAML would result in the following:

![Alt text](images/api-landing_example.PNG)

---------------------------------------

### Default Layout

The `default` layout can be used for pages that contain content solely obtained from a markdown file. For example any pages that simply contain text, images, code samples etc.. should all use the default layout.

To use the default layout add the following to the top of the markdown page:

```yaml
---
layout: default
title: Page Title Here
last_updated: Created and last modified by John Smith on May 1, 2016
---
```
The `title` attribute allows you to specify the page title, and the `last_updated` attribute (optional) allows you to identify when the page was created/last modified.

An example of how a page using this layout might look:

![Alt text](images/default_layout.PNG)

---------------------------------------

### Blog Layout

The `blog` layout can be used to create a *blog* page for your service. This can be useful to provide information about new releases, upcoming versions or other useful information.

To use the `blog` layout add the following to the top of your HTML file (see note below):

```yaml
---
layout: blog
---
```


Your documentation folder should container a folder called `_posts` which should contain the markdown files for each blog post. Blog posts should be named using the following format to ensure posts are ordered correctly: YEAR-MONTH-DAY-Blog_Title.md

Posts should have the following attributes at the top of the markdown file:

```
---
title: Title here
author: John Smith
datestamp: May 1st 2016 - 10:50am
---
```

You can configure the path of the blog index page and the number of posts to display on each page in the `_config.yml` file.

**Note:** The page using the blog layout should be named `index.html` and ideally placed in a blog subfolder. This is due to requirements of the `jekyll-pagination` plugin being used. For more information visit [here](https://github.com/jekyll/jekyll-paginate).

![Alt text](images/blog_layout.png)

---------------------------------------

### Team Layout

The `team` layout can be used to show the developers currently working on a particular service. 
It can also be used to provide contact details for each member and links to their social sites such as Twitter, GitHub etc..

To use the `team` layout add the following to the top of your markdown file:

```yaml
---
layout: team

header: The Elements Team

team_members:
    - name: Gita Narasimhan
      email: gita.narasimhan@hpe.com
      avatar: /assets/img/user.png
      social:
        - title: Email
          icon: hpe-social-email
          url: mailto:gita.narasimhan@hpe.com

    - name: Alastair Payne
      email: alastair.stu.payne@hpe.com
      avatar: /assets/img/user.png
      social:
        - title: Email
          icon: hpe-social-email
          url: mailto:alastair.stu.payne@hpe.com

    - name: Ashley Hunter
      email: ashley-glenn.hunter@hpe.com
      avatar: /assets/img/user.png
      social:
        - title: Twitter
          icon: hpe-social-twitter
          url: https://twitter.com/ashh640
        - title: GitHub
          icon: hpe-social-github
          url: https://github.com/ashh640
        - title: Email
          icon: hpe-social-email
          url: mailto:ashley-glenn.hunter@hpe.com
---
```

An example of how a page using this layout might look:

![Alt text](images/team_layout.png)

---------------------------------------

### Swagger Layout

The `swagger` layout can be used to present APIs in a user friendly way. Swagger definitions can be provided in either `YAML` or `JSON`. The swagger definition should follow the specification [found here](http://swagger.io/specification/).

To use the `swagger` layout set the layout attribute to `swagger`. An addition title attribute can be set to specify the page title.

##### Load YAML/JSON file

The easiest way to display your API is to load a YAML or JSON file containing your Swagger schema from your repository.

To do this simply add the `swagger_url` attribute to the YAML Frontmatter and set it's value to the relative path to the .yaml, .yml or .json file.

And example of this might look like this:

```yaml
---
layout: swagger
title: API
swagger_url: swagger.yaml
---
```

**Note:** The url provided must point to a file on the same domain, this cannot be a file loaded from an external site due to browser security restrictions. To allow loading from a different domain you must ensure that the server allows requests from the GitHub pages domain.

##### Alternate Method - Embedded YAML

An alternative method of specifying a Swagger schema is to simply add the YAML directly to your markdown file within the YAML frontmatter region.

Simply add the Swagger YAML below the layout attribute. This can be seen below:

```yaml
---
layout: swagger
title: API

# Swagger YAML goes here
swagger: "2.0"
info:
  title: "CAF Job Service"
  version: "1.0"
  description: |
    Allows background operations to be sent to the CAF Workers, and for the
    operations to be tracked and controlled.
basePath: /job-service/v1
tags:
  - name: Jobs
    description: Job Control
# ....
---
```

##### Alternate Method - Embedded JSON

A Swagger schema in `JSON` format can also be embedded directly into the markdown file.

The slight difference when using `JSON` is you must specify the `swagger_json` attribute and add the `JSON` as the value of this attribute.

An example can be seen below:

```yaml
---
title: API Json
layout: swagger

# Swagger JSON goes here
swagger_json: {
    "swagger": "2.0",
    "info": {
        "title": "CAF Job Service",
        "version": "1.0",
        "description": "Allows background operations to be sent to the CAF Workers, and for the\noperations to be tracked and controlled."
    },
    "basePath": "/job-service/v1",
    "tags": [
        {
            "name": "Jobs",
            "description": "Job Control"
        }
    ],
    # ....
  }
---
```

#### Swagger 'Try' Functionality

The Swagger layout provides the option to allow a user to try out an API within the browser. The layout will create a form that contains all of the fields for the parameters required and will allow the user to input some sample values and view the response.

The form enforces validation based on whether or not a field is required and also the data type of the field to ensure data is in the correct format.

This functionality is disabled by default. To enabled it simply add the following on to the top of the YAML frontmatter:

```yaml
---
title: API
layout: swagger
swagger_try_enabled: true

swagger: 2.0
# ....
---
```

**Note:** A deployed version of your service must be available to use the Swagger Try functionality. Note also that the server the hosts the service must accept cross origin requests from this the GitHub Pages site. For more information  [read here](https://github.com/swagger-api/swagger-editor/blob/master/docs/cors.md).

Below is an example of how a complete Swagger layout would look like:

![Alt text](images/swagger_example.PNG)

## Adding Showcase Entry

A showcase site for CAF components can be found at [cafapi.github.io](http://cafapi.github.io) and provides a brief description of each service along with a link to each service's documentation site.

To add your service to the showcase page:

- Fork the [https://github.com/CAFapi/CAFapi.github.io](https://github.com/CAFapi/CAFapi.github.io) repository.
- Add a new section with an overview of your service:
	+ Add a new markdown file under `showcase` -> `en-us` -> `services`
	+ Update the showcase.json file found in the `_data` folder
- Schedule review of showcase entry and service documentation with Frank. This review should be run from the fork and show the finished showcase entry and service docs.
- Submit pull request for Frank to review.
- Frank will approve or reject content. If approved he will merge the changes.
