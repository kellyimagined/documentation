---
title:  Terminus Manual: Releases and Changelog
terminuspage: true
type: terminuspage
tags: [terminus]
categories: [managing]
---
<div id="terminusLatestReleaseApp" ng-app="terminusLatestReleaseApp" ng-controller="terminusLatestReleaseCtrl">
  <h2>{[{latestRelease.name}]} <span class="label label-success">Current Release</span></h2>
  <md ng-model="latestRelease.body"></md>
  <h3>Downloads</h3>
  <div ng-repeat="asset in latestRelease.assets">
    <strong><a data-proofer-ignore href="{[{asset.browser_download_url}]}">{[{asset.name}]}</a></strong>
  </div>
  <strong><a data-proofer-ignore href="{[{latestRelease.zipball_url}]}">Source code (zip)</a></strong><br>
  <strong><a data-proofer-ignore href="{[{latestRelease.tarball_url}]}">Source code (tar.gz)</a></strong>
</div>
<hr>
<div id="terminusRelease" ng-app="terminusReleaseApp" ng-controller="terminusReleaseCtrl">
  <div ng-repeat="release in releases">
    <h2>{[{ release.name }]}</h2>
    <md ng-model="release.body"></md>
    <hr>
  </div>
</div>
<div class="terminus-pager col-md-12">
  <a style="float:left;" href="/docs/terminus/plugins"><span class="terminus-pager-lsaquo">&lsaquo;</span>Extend with Plugins</a>
</div>
