function PictureDisplayCtrl($scope, $http){
  $http.get('pictures/pictures.json').success(function(data) {
    $scope.pictures = data;
  });

  $scope.setQuery = function (query){
    $scope.query = query;
  };

  $scope.saveToStorage = function (){
    localStorage.setItem('everything', JSON.stringify( $scope.pictures));
  }

  $scope.loadFromStorage = function (){
    $scope.pictures = JSON.parse( localStorage.getItem('everything'));
  }
};
