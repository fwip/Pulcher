function PictureDisplayCtrl($scope, $http){
  $http.get('pictures/pictures.json').success(function(data) {
    $scope.pictures = data;
  });

  $scope.setQuery = function (query){
    $scope.query = query;
  };
};
