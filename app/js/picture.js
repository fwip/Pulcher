function PictureDisplayCtrl($scope, $http){

  $scope.addPic = function (url){
    var pic = {'url': url};
    $scope.pictures.push( pic );
    dbcontrol.addPicture(pic);
  }

  $scope.loadPictures = function(){
    dbcontrol.getPictures( function(pictures){
      $scope.pictures = pictures;
      $scope.$apply();
    })
  }

  //$scope.loadPictures();
};
