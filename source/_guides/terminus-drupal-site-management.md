---
title: Using Terminus to Create and Update Drupal Sites on Pantheon
permalink: docs/guides/:basename/
description: Detailed information on creating and updating new Pantheon Drupal sites using Terminus and the command line.
tags: [cli]
contributors:
  - erikmathy
date: 2/25/2015
---
## Create Sites Faster and More Efficiently
The latest version of Pantheon's CLI, [Terminus](/docs/terminus/), incorporates not only Drush and WP-CLI, but also the vast majority of tasks available to you within the Pantheon Dashboard. You can create new sites, clone one environment to another, create branches, check for upstream updates, and more. By using Terminus, a site administrator can massively reduce the time spent on relatively simple tasks. In this guide, we will walk through the basics of creating a completely new Drupal site on Pantheon, installing some contrib modules, committing code, and cloning from one site environment to another&mdash;all through the Terminus CLI.

## Installing Terminus
Installing Terminus is a fairly straight forward process. Just follow [these instructions](https://github.com/pantheon-systems/cli/wiki/Installation).

After you install Terminus, do a quick status check to make sure it works. Depending on your OS, the output may vary, but here's a sample:

```nohighlight
$ terminus auth login
Your email address?: email@domain.com
Your dashboard password (input will not be shown):
Logging in as email@domain.com
Saving session data

        .+.
        .+?:
         .+??.
           ??? .
           +???.
      +?????????=.
      .???????????.
      .????????????.

     ########### ########
     ############.#######.
     ####### ####  .......
     ######## #### #######                50 41 4E 54 48 45 4F 4E
     #########.####.######        _____________  __  ________  ____  ______
     ######  ...                 /_  __/ __/ _ \/  |/  /  _/ |/ / / / / __/
     #######.??.##########        / / / _// , _/ /|_/ // //    / /_/ /\ \
     #######~+??.#########       /_/ /___/_/|_/_/  /_/___/_/|_/\____/___/
     ########.??..
     #########.??.#######.
     #########.+?? ######.
               .+?.
         .????????????.
           +??????????,
            .????++++++.
              ????.
              .???,
               .~??.
                 .??
                  .?,.
```

Excellent! You've installed Terminus and logged into your Pantheon account. For a full list of commands, [refer to this page](https://github.com/pantheon-systems/cli/wiki/Available-Commands).

## Using Terminus

### List Your Current Sites

Terminus can be used on any Pantheon hosted website you have, and it can also create new sites! Let's get a list of your current Pantheon sites:

```nohighlight
$ terminus sites show
+--------------------------+-----------+---------------+--------------------------+
| Site                     | Framework | Service Level | UUID                     |
+--------------------------+-----------+---------------+--------------------------+
| terminus-create          | drupal8   | free          | terminus-create          |
| git-import-example       | drupal    | free          | git-import-example       |
+--------------------------+-----------+---------------+--------------------------+
```
### Create a Brand New Site

Now let's create a new site:

```nohighlight
$ terminus sites create
Human readable label for the site: Terminus CLI Create
Machine name of the site; used as part of the default URL [ if left blank will be terminusclicreate]: terminus-cli-create

  1. None

Choose organization: 1

 1. WordPress
 2. OpenPublish
 3. FreakPress
 4. RedHen Raiser
 5. OpenPublic
 6. Awesome Codebase
 7. Pushtape
 8. OpenAid
 9. Panopoly
 10. Open Outreach
 11. Panopoly
 12. C suite
 13. Commerce Kickstart
 14. Kickstart
 15. OpenScholar
 16. Drupal 8 SXSW
 17. Static HTML
 18. Drupal 8
 19. Open Restaurant
 20. Mukurtu CMS
 21. EasyFlow
 22. Backdrop
 23. CiviCRM Starter Kit
 24. Community Media Starter Kit
 25. DKAN
 26. Drupal 6
 27. Restaurant
 28. Atrium
 29. EC LMS
 30. OpenIdeaL
 31. Plato Típico
 32. Introduction to Theming Basics for Drupal 7
 33. Drupal 7

Select one: 33
Creating new Drupal 7 installation ...
Working ............................................
Success: Pow! You created a new site!

$ terminus sites show
+--------------------------+-----------+---------------+--------------------------+
| Site                     | Framework | Service Level | UUID                     |
+--------------------------+-----------+---------------+--------------------------+
| terminus-cli-create      | drupal    | free          | terminus-cli-create      |
| terminus-create          | drupal8   | free          | terminus-create          |
| git-import-example       | drupal    | free          | git-import-example       |
+--------------------------+-----------+---------------+--------------------------+

```

###Update the Code

Now that the site is created, the next step is to run a Drush install command to get a fully functional Drupal set ready to go for development. Terminus will run most available Drush commands by simply adding the word "drush" to the command directly afterward, along with the site's Pantheon machine name.

```nohighlight
$ terminus drush "site-install"
Running drush site-install  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
Could not find a Drupal settings.php file at ./sites/default/settings.php.
You are about to create a sites/dev-terminus-cli-create.pantheon.io/files directory and create a sites/dev-terminus-cli-create.pantheon.io/settings.php file and DROP all tables in your 'pantheon' database. Do you want to continue? (y/n): y
Starting Drupal installation. This takes a few seconds ...                  [ok]
Installation complete.  User name: admin  User password: ********         [ok]
```

You should now be able to open a web browser and see your brand new Drupal site! For fun, you can at any time use an "open" command to see an environment in your default browser.

```bash
open http://dev-terminus-cli-create.pantheon.io
```

![Dev environment in browser](/source/docs/assets/images/terminus-cli-open-http.png)

There is also the `terminus site dashboard` command if, at any point in time, you want to open the site's Pantheon Dashboard.

```nohighlight
$ terminus site dashboard
Do you want to open your dashboard link in a web browser? [y/n] y
```

![Dashboard in browser](/source/docs/assets/images/dashboard/terminus-cli-open-dash.png)

Also, the status of each of the environments within the site can be seen using a `terminus site environments` command.

```nohighlight
$ terminus site environments
+------+------------+--------------------------------------+---------------+---------+
| Name | Created    | Domain                               | OnServer Dev? | Locked? |
+------+------------+--------------------------------------+---------------+---------+
| test | 1423175994 | test-terminus-cli-create.pantheon.io | false         | false   |
| dev  | 1423175993 | dev-terminus-cli-create.pantheon.io  | true          | false   |
| live | 1423175995 | live-terminus-cli-create.pantheon.io | false         | false   |
+------+------------+--------------------------------------+---------------+---------+
```

###Install Contrib Modules and Themes
While the site's Dev environment is still in SFTP mode, we can use Drush to download and install some Drupal contrib modules, such as Views and Administration Menu.

```nohighlight
$ terminus drush "dl admin_menu"
Running drush dl admin_menu  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
Project admin_menu (7.x-3.0-rc5) downloaded to                         [success]
/srv/bindings/c183403f14224eac8471ec0000f9e653/code/sites/all/modules/admin_menu.
Project admin_menu contains 3 modules: admin_devel, admin_menu_toolbar, admin_menu.
tests-MacBook-Pro:~ erikmathy$ terminus drush "en admin_menu,admin_menu_toolbar"
Running drush en admin_menu,admin_menu_toolbar  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
The following extensions will be enabled: admin_menu, admin_menu_toolbar
Do you really want to continue? (y/n): y
admin_menu was enabled successfully.                                        [ok]
admin_menu_toolbar was enabled successfully.                                [ok]
```

Not bad, eh? All this without a single GUI or web browser click! If you look at the site's Dashboard, the new code will be displayed there, waiting to be committed.

![The dashboard showing the code was deployed to the Dev environment](/docs/assets/images/dashboard/terminus-cli-code-to-commit-dashboard.png)

Let's commit it all into the Git repo with the `terminus site code commit` command:

```nohighlight
$ terminus site code commit
Commit 1 changes? [y/n] y
Success: Successfully committed.
+---------------------+--------+--------+------------------------------------------+------------------+
| Time                | Author | Labels | Hash                                     | Message          |
+---------------------+--------+--------+------------------------------------------+------------------+
| 2015-02-05T22:40:14 | Root   | dev    | 4297d007d1697e1b9a90073510183149dd1c827f | "Initial Commit" |
+---------------------+--------+--------+------------------------------------------+------------------+
```

Open the Pantheon Dashboard, and you'll see the new files are shown in the Git commit log.

![The dashboard's showing the code was deployed to the Dev environment](/source/docs/assets/images/dashboard/terminus-cli-code-committed-dashboard.png)

To see what a commit message looks like, let's download Bootstrap and then commit it as well.

```nohighlight
$ terminus drush "dl bootstrap"
Running drush dl bootstrap  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
Project bootstrap (7.x-3.0) downloaded to                              [success]
/srv/bindings/c183403f14224eac8471ec0000f9e653/code/sites/all/themes/bootstrap.
$ terminus site code commit --message="Adding bootstrap."
Commit 1 changes? [y/n] y
Success: Successfully commited.
+---------------------+---------+-----------+------------------------------------------+-------------------+
| Time                | Author  | Labels    | Hash                                     | Message           |
+---------------------+---------+-----------+------------------------------------------+-------------------+
| 2015-02-11T18:25:44 | E Mathy | dev       | 34e988fe427f7dfe9f9af0046c83d49268e1f1ac | Adding bootstrap. |
| 2015-02-06T17:37:19 | E Mathy | dev | 246c89c82505a3025f1fcadf56cae383ead743cc | Terminus commit.  |
| 2015-02-05T22:40:14 | Root    | dev | 4297d007d1697e1b9a90073510183149dd1c827f | "Initial Commit"  |
+---------------------+---------+-----------+------------------------------------------+-------------------+
```

![The dashboard's showing the code was deployed to the Dev environment](/source/docs/assets/images/dashboard/terminus-commit-with-message.png)

And finally, let's initialize the Test environment to move the code, files, and DB from Dev onward in the Pantheon workflow using `init-env`.

```nohighlight
$ terminus site init-env

  1. dev
  2. test
  3. live

Select Clone from?: 1
Creating branch
Creating Environment
Cloning files ...
Working ...
Cloning database ...
Working ......
Success: Successfully created Environment!
```

## Congratulations!
You just created a brand new Drupal site on Pantheon! You added modules, committed code, and moved it all from Dev to Test without using a single checkbox, radio button, or colored Ajax slider. To top it off, by using Terminus, it all happened in a third of the time. There is a whole new world of possibility open to you. Now go forth and CLI!

##  Next Steps
- Do you use WordPress? Try [Using WP-CLI on Pantheon](/docs/guides/wordpress-commandline).

- After you've mastered Terminus, take it a step further with [Continuous Integration](/docs/continuous-integration).
