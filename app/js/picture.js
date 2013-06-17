function PictureDisplayCtrl($scope, $http){

  $scope.addPic = function (url){
    $scope.pictures.push( {'url': url} );
  }

  $scope.loadPictures = function(){
    dbcontrol.getPictures( function(pictures){
      $scope.pictures = pictures;
      $scope.$apply();
    })
  }

  //$scope.loadPictures();
};
