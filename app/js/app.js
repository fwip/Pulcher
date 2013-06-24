'use strict';

/* App Module */

angular.module('pulcher', ['xc.indexedDB'])
//.config(['$routeProvider', function($routeProvider) {
  //$routeProvider
  //.when('/', {templuateUrl: 'partials/pictures.html', controller: 'PictureDisplayCtrl'})
  ////.when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl})
  ////.when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl})
  //.otherwise({redirectTo: '/'});
//}])
.config(function($indexedDBProvider){
  $indexedDBProvider
  .connection('pulcher')
  .upgradeDatabase(1, function(event, db, tx){
    var objStore = db.createObjectStore('pictures', {keypath: 'url'});
    //objStore.createIndex('name_idx', 'name', {unique: false});
    //objStore.createIndex('age_idx', 'age', {unique: false});
  });

});
