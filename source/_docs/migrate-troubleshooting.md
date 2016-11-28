---
title: Migrate Sites to Pantheon: Troubleshooting
description: Troubleshooting for migrating remotely-hosted Drupal or WordPress sites to Pantheon.
tags: [migrate]
categories: [golive, migrate]
---

## Migrated Site Not Working as Expected

If your code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/docs/platform-considerations/). For example, if your site uses PHP short tags, you'll need to convert them to standard PHP tags.

Next, check [log files](https://pantheon.io/docs/logs/) to help identify and fix errors. Drupal or WordPress core is upgraded as part of migration, so you may have additional work to complete the upgrade.

## One Application per Site
Each site supports a single Drupal or WordPress application. Placing a WordPress application inside a Drupal site, for example, is unsupported. Drupal multisite is also not supported. If your existing Drupal site is a multisite installation, see [Extracting Sites from a Drupal Multisite](https://pantheon.io/docs/unwind-multisite/).

## Multiple File Directories Found within the Import Archive
The import will fail if Drupal's private files directory is not placed within the public directory, resulting in the following error message:
<div class="alert alert-danger">
Multiple file directories found within the import archive. sites/default/private sites/default/files
</div>
To resolve this issue, move the `private` sub-directory under the public directory: `sites/default/files/private`. Create a site new archive and select **Migrate Existing Site** from your User Dashboard.


## Frequently Asked Questions (FAQs)

#### Why doesn't my site archive import correctly from Dropbox?
Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

#### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).

#### How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site import` to import your site archive, or follow the [Manual migration] instructions if your site archive exceeds file size limits.

#### What if I can't use drush on my existing Drupal site?

As an alternative to `drush` you can use the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Also see [manually create an archive](/docs/drupal-export#manually-create-archive).

#### Are database table prefixes supported?

See [WordPress known issue](/docs/wordpress-known-issues/#table-prefixes).

#### Is the MySQL MyISAM engine supported?
No. If any of your database tables are using the MyISAM engine you'll need to convert them to InnoDB.

#### Can I use multiple SQL files in the archive?

If multiple SQL files are present the import will fail. Only provide one `.sql` file per site archive.

#### Can I use multiple settings.php files per site archive?
If multiple `settings.php` files are present the import will fail. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.

## See Also
 * [Migrate Sites to Pantheon](/docs/migrate)
 * [Log Files on Pantheon](/docs/logs/)
 * [Using the Pantheon Workflow](/docs/pantheon-workflow)
