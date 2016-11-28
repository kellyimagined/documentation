---
title: New Relic APM Pro
description: Learn how to enable and use New Relic performance metrics and reports for your Drupal or WordPress site.
tags: [performance, trobleshoot]
categories: [performance]
---
[New Relic APM Pro](http://newrelic.com) offers a wide array of metrics that provide a nearly real-time look into the performance of a web application and is provided to all sites on Pantheon for free. Using New Relic not only makes it easy for you to monitor to your performance, but it can also speed up the support process by helping our support team visualize corresponding performance and symptoms.

## Activate New Relic APM Pro
Select the **New Relic** tab on your Site Dashboard, and click **Activate New Relic Pro**. You can also use the [Terminus Omniscient](https://github.com/rvtraveller/terminus-omniscient) plugin to enable New Relic Pro for all sites you have access to by logging in to your Pantheon account and running `terminus sites omniscient`.

Visit your site in the browser a couple of times to generate data in New Relic. After a few minutes pass, go to the New Relic workspace on your Dashboard, and click **Go to New Relic**.

New Relic monitoring is automatically enabled for all application servers added to the site, including Multidev environments.

### Troubleshoot New Relic Access

- Users without an active session for the site's New Relic account should click the **Go to New Relic** button in the Pantheon Dashboard and they'll be prompted to log in. Only users with an active New Relic session for the account that owns the site can use the links inside the data table - going directly to an environment's New Relic overview.
- Users with an active session for a different New Relic account than the one that "owns" the site account will be denied access. Log out of New Relic, and click the **Go to New Relic** button in the Site Dashboard.
- If you try to access New Relic prior to any traffic reaching an environment, you will be prompted to set up New Relic. Visit one of your sites, close the tab, wait for the New Relic data table to appear in your Pantheon Dashboard, and try again.
- Browser extensions that restrict or block trackers, such as [Ghostery](https://www.ghostery.com/our-solutions/ghostery-browser-extension/) may prevent data from loading within Pantheon's New Relic tab on the Site Dashboard. Disable the extension or add the following sites as trusted within the extension:

 - dashboard.pantheon.io
 - rpm.newrelic.com


#### Who is the New Relic account associated with?
- If site owner is a user, the site owner's name and email address is used to create the New Relic account.
- If site owner is an organization, the name and email address of the Pantheon user who activates New Relic is used to create the New Relic account. These users must be members of the organization.

To learn how to use New Relic APM Pro to monitor your site's performance, see [New Relic's documentation](https://docs.newrelic.com/docs/agents/php-agent/getting-started/new-relic-php#monitor-performance).


## Only Log Authenticated Users

If your site consists of mostly authenticated traffic, it can be useful to exclude anonymous users who are using your site's page cache. This technique will still capture form submissions, including logins and contact pages. Similar logic can be used to disable New Relic on certain paths, such as `/admin` in Drupal or `/wp-admin` in WordPress.  

### Drupal
To disable New Relic for anonymous traffic on Drupal-based sites, add the following to your `sites/default/settings.php`:

```
// Disable New Relic for anonymous users.
if (function_exists('newrelic_ignore_transaction')) {
  $skip_new_relic = TRUE;
  // Capture all transactions for users with a PHP session.
  foreach (array_keys($_COOKIE) as $cookie) {
    if (substr($cookie, 0, 4) == 'SESS') {
      $skip_new_relic = FALSE;
    }
  }
  // Capture all POST requests so we include anonymous form submissions.
  if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $skip_new_relic = FALSE;
  }
  if ($skip_new_relic) {
    newrelic_ignore_transaction();
  }
}
```

### WordPress
To disable New Relic for anonymous traffic on WordPress sites, add the following to your `templates/<your_template>/functions.php`:

```
// Disable New Relic for anonymous users.
if (function_exists('newrelic_ignore_transaction')) {
    $skip_new_relic = !is_user_logged_in();

    // Capture all POST requests so we include anonymous form submissions.
    if (isset($_SERVER['REQUEST_METHOD']) &&
        $_SERVER['REQUEST_METHOD'] == 'POST') {
        $skip_new_relic = FALSE;
    }

    if ($skip_new_relic) {
        newrelic_ignore_transaction();
    }
}
```

## Remove Multidev Environments in New Relic
After deleting a Multidev environment from your site, you'll need to manually [remove them in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers).  

1. From your Dashboard, select the **New Relic** tab, and **Open New Relic**.  
2. From the New Relic menu bar, select **APM** > **Applications**.  
3. Wait until the color-coded health status turns gray, then select the app's gear icon.
4. Select **Delete app**, and click the confirmation button.

## AMP Validation Errors
New Relic's Browser agent JavaScript tag may cause [Google AMP validator](https://www.ampproject.org/docs/guides/validate.html) failures, such as `The tag 'script' is disallowed except in specific forms`. You can resolve validation errors by disabling New Relic's Browser monitoring agent on all AMP pages.

Start by strategizing and testing logic to identify AMP pages based on your site's implementation. Once confirmed, place AMP isolating logic within the first conditional statement of the example below. Then disable New Relic's Browser monitoring by setting `newrelic_disable_autorum` to `FALSE` only if the current request is an AMP page:  

```php
if (extension_loaded('newrelic')) {
  // Add AMP page identifying logic here that would, for example,    
  // set variable $amp to TRUE or FALSE. If $amp is true, disable new relic
  if ($amp) {
    newrelic_disable_autorum (FALSE);
    newrelic_ignore_transaction();
  }
}
```

## APM Availability Monitoring Alerts and False Positive Downtime Events
When your site uses HTTPS there are two scenarios that can cause your New Relic APM's Availability Monitoring to report false postive Downtime events for your site.

### Server Name Indication (SNI)
Sites configured with third-party proxy services that use SNI to serve HTTPS requests (e.g. CloudFlare, CloudProxy) will cause alerts and downtime events within New Relic APM's Availability Monitoring reports when the ping URL uses HTTPS. This is a [known New Relic availability monitoring limitation](https://docs.newrelic.com/docs/alerts/alert-policies/downtime-alerts/availability-monitoring#limits).

### TLS 1.1 or Higher
When your site uses HTTPS on Pantheon, the cryptographic protocol in use is TLS 1.1. The regular New Relic Availability Monitoring alerts can only access sites using TLS 1.0 or below. New Relic recommends that you create a New Relic Synthetics alert which can access HTTPS sites using cryptographic protocols TLS 1.1 and higher.

#### Solution: Use New Relic Synthetics
As an alternative to both situations, you can use the bundled New Relic Synthetic Lite service to monitor HTTPS pages served with SNI:

1. Click **New Relic** from the target environment within the Site Dashboard on Pantheon.
2. Select **Synthetics**.
3. Click **Create new monitor**, and enter the details for the environment you want to monitor.

The ping monitor is provided for free; however, other monitors require upgrading to a paid plan. For more details, see [New Relic Synthetics](https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/getting-started/new-relic-synthetics).

## Frequently Asked Questions

#### How do I change the New Relic site owner now that our Pantheon site has a new site owner?
A New Relic account can have only one owner at any time. You must be the current account owner to change your role to someone who currently has an Admin role for the account. For more information, see [New Relic's documentation](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-billing-usage/change-account-owner).

#### How can I share a link to a particular metric?

At the bottom of any page, click **Permalink**. This will preserve the current time window and take the link recipient to the same page you're currently looking at.  

#### How much is New Relic APM Pro?

Pantheon provides New Relic APM Pro for all sites at no cost.

#### Will turning on New Relic APM Pro slow my site down?

Basically no, New Relic will not make your site slower. There is a very small amount of overhead, but it's imperceptible. The amount of available metrics useful for debugging and improving performance far outstrips the negligible difference.

#### What is the difference between app server response time and browser page load time?

App server response time measures how the page was built on Pantheon, including PHP execution, database, Redis (if used). Browser page load time measures the additional time of client-side page rendering, DOM processing, and how long it took to transfer to the client. While a fast app server response time is optimal, a slow browser page load time indicates a bad user experience. Some causes are unaggregated or uncompressed scripts and stylesheets, invalid markup, or unoptimized client-side code (like JavaScript).

#### Can I use my existing New Relic license with my Pantheon site?

New Relic Pro is automatically provisioned for your site. Unfortunately, you cannot use your existing license.

#### Why are servers listed in New Relic with no data?

Because Pantheon's runtime matrix runs your application across many containers simultaneously, it's common to see old containers with no reporting data as your application shifts around. This is not a cause for concern.


##See Also
- [MySQL Troubleshooting With New Relic Pro](/docs/debug-mysql-new-relic/)
- [New Relic Documentation](https://newrelic.com/docs/)
- [New Relic University: Intro to APM](https://learn.newrelic.com/courses/intro_apm)
- [New Relic Univeristy: APM Advanced](https://learn.newrelic.com/courses/apm_advanced)
- [Case Studies](http://newrelic.com/resources/case-studies)
- [What is Real User Monitoring?](https://newrelic.com/docs/features/real-user-monitoring)
- [Finding Help From the New Relic UI](https://newrelic.com/docs/site/finding-help)
- [Interface Overview](https://newrelic.com/docs/site/the-new-relic-ui)
