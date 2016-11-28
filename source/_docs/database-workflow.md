---
title: Database Workflow Tool
description: Learn about the database that runs in your Pantheon Drupal or WordPress site.
tags: [develop]
]categories: [develop]
---
The Pantheon platform provides each site environment with a dedicated MySQL container running [MariaDB](http://en.wikipedia.org/wiki/MariaDB) that can be maintained remotely or locally. For a comprehensive list of MySQL settings, [access your database](/docs/mysql-access/#database-connection-information) and use the [SHOW VARIABLES](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) statement.

Using the tools in the Database / Files tab, you can overwrite the databases on your site's Dev or Test environment with the database on your Live environment, allowing you to pull content from Live in to other environments.
![Workflow Tool](/source/docs/assets/images/dashboard/interface-workflow-tool.png)
<div class="alert alert-danger"><h4>Warning</h4>
Pushing content up to Live should almost never be done to a launched site, as it can overwrite the environment configurations. See <a href="/docs/pantheon-workflow/">Using the Pantheon Workflow</a>. </div>

## MySQL Clients
You can use any number of MySQL clients such as [MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/), [Sequel Pro](http://www.sequelpro.com/download), [Navicat](http://www.navicat.com/download), [PHPMyAdmin](https://www.phpmyadmin.net/), and others to  administer your site's database
and [manage configurations](/docs/pantheon-workflow/#configuration-management) as needed.

## Cloning the Database
Cloning relies on mysqldump, which needs a point-in-time snapshot. We recommend using the `--single-transaction` flag, which will use transactions to get a point-in-time snapshot without locking the DB. However, only the InnoDB database engine supports transactions. On MyISAM, the table needs to be locked. On small DBs this is not an issue, but could be for larger DBs. We also use the `--quick option`, which reduces the time it would take for large tables. For more information, see [Converting MySQL Tables From MyISAM to InnoDB](/docs/myisam-to-innodb/) and [Run MySQL Dump Without Locking Tables](http://stackoverflow.com/questions/104612/run-mysqldump-without-locking-tables).

## See Also
- [MySQL Troubleshooting with New Relic Pro](/docs/debug-mysql-new-relic/)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [Converting MySQL Tables from MyISAM to InnoDB](/docs/myisam-to-innodb/)
- [Database Connection Errors](/docs/database-connection-errors/)
