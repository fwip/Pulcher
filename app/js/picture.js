function PictureDisplayCtrl($scope, $http){

  $scope.addPic = function (url){
    var pic = {'url': url};
    $scope.pictures.push( pic );
    dbcontrol.addPicture(pic);
  }

  $scope.setQuery = function(query){
    $scope.query = query;
  }

  $scope.loadPictures = function(){
    dbcontrol.getPictures( function(pictures){
      $scope.pictures = pictures;
      $scope.$apply();
    })
  }

  dbcontrol.init.onsuccess = $scope.loadPictures;
  dbcontrol.init();
};
