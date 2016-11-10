  //Executes your code when the DOM is ready.  Acts the same as $(document).ready().
  $(function() {
      //Calls the tocify method on your HTML div.
      $("#toc").tocify();
  });

  //Allow html within tooltips and keep toggle open on hover
  $('.pop').popover({
      html: true,
      trigger: 'manual',
      container: $(this).attr('id'),
      placement: 'right'
  }).on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(this).siblings(".popover").on("mouseleave", function () {
          $(_this).popover('hide');
      });
  }).on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
          if (!$(".popover:hover").length) {
              $(_this).popover("hide")
          }
      }, 300);
  });

  // Tooltip

  $('button').tooltip({
    trigger: 'click',
    placement: 'top'
  });

  function setTooltip(btn, message) {
    $(btn).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
  }

  function hideTooltip(btn) {
    setTimeout(function() {
      $(btn).tooltip('hide');
    }, 3000);
  }

  // Clipboard

  var clipboard = new Clipboard('button');

  clipboard.on('success', function(e) {
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
  });

  clipboard.on('error', function(e) {
    setTooltip(e.trigger, 'Failed! Press Ctrl+C to copy');
    hideTooltip(e.trigger);
  });


  var terminusLatestRelease = angular.module("terminusLatestReleaseApp", ['yaru22.md']);
  terminusLatestRelease.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  terminusLatestRelease.controller("terminusLatestReleaseCtrl", function($scope, $http) {
      $scope.latestRelease = {};
      $http.get("/docs/assets/terminus/releases/latest.json").success(function(response){
        $scope.latestRelease = response;
      });
  });

  var terminusRelease = angular.module('terminusReleaseApp', ['yaru22.md']);
  terminusRelease.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  terminusRelease.controller('terminusReleaseCtrl', function($scope, $http) {
    $scope.releases = [];
    $http.get('/docs/assets/terminus/releases.json').success(function(data) {
        $scope.releases = data;
      });
    }
  );
  angular.bootstrap(document.getElementById("terminusRelease"), ['terminusReleaseApp']);


  var terminusCommandsApp = angular.module('terminusCommandsApp', ['ngMaterial']);

  terminusCommandsApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  terminusCommandsApp.controller('mainController', function($scope, $http) {
    $scope.searchCommand   = '';
    $scope.terminus = [];
    $http.get("/docs/assets/terminus/commands.json").success(function(response){
      $scope.terminus = response;
    });
    $scope.clearFilters = function(){
        $scope.searchCommand =  undefined;
    };
  });

  //Sort usage array by relevance based on Regex matches from search query
  terminusCommandsApp.filter('search', function() {
    return function (items, str) {
      if(str == '') return items;
      var filtered = [];
      var rgx = new RegExp(str, 'gi');

      angular.forEach(items, function(item) {
        item.points = (JSON.stringify(item).match(rgx) || []).length;
        filtered.push(item);
      });
    return filtered;
  }
});
