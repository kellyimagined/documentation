---
title: FileZilla on Pantheon
description: Information about using the FileZilla FTP client for your Pantheon Drupal or Wordpress site.
tags: [sftp]
categories: [develop, sftp]
---
[FileZilla](https://FileZilla-project.org/) is a free open source FTP client that is available for Windows, Mac OS X, and Linux.

## Getting Started

Make sure you have your SFTP credentials on hand, you will need this later to connect to Pantheon using FileZilla. See [how to find the SFTP credentials](/docs/sftp#sftp-connection-information) for your site.

## Download FileZilla

If you do not have FileZilla installed, [download the latest version](https://FileZilla-project.org/) and install it on your computer.

## Start FileZilla

Open the FileZilla application and enter in the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP and **protocol** needs to be SFTP, not FTP.<br />

## Create a New Site

Select to accept the server's host key for the current session so it is stored in cache. This allows you to connect to the server and manage your files for the current session.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Under the Advanced Tab, leave the Remote Directory blank.  </div>

## Authentication

**SSH Key-Based:** Select the private key (likely id_rsa) associated with the public key loaded into your User Dashboard.

**Password-Based:** Enter your Pantheon account email address and password.

After logging in, you can access your application in the `/code` directory, Drupal's `/sites/default/files` in `/files`, and your application's logs in `/logs`.

You may be prompted to accept the server's host key for the current session and store it in cache. This allows you to connect to the server and manage your files for the current session.

When you disconnect and then use the quick reconnect icon, you will be taken back to your most recent location.
If you need to get back to your site's root directory, reconnect using the site manager and not the quick reconnect option.

## Known Issues

### Uploading to the Files Directory
Filezilla does not correctly upload files when the target directory on Pantheon is `/files`. This is due to the symlink that is in place from `sites/default/files`. You will need to use an alternate program such as [Transmit](https://panic.com/transmit/) (Mac OS), to complete the task.  
