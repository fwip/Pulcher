function PictureDisplayCtrl($scope, $http){

  $scope.addPic = function (url){
    var pic = {'url': url, 'tags': []};
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

  $scope.deletePic = function(picture){
    dbcontrol.deletePicture( picture );
    $scope.pictures.splice( $scope.pictures.indexOf(picture), 1);
  }

  $scope.addTagToPicture = function(tag, picture){
    tag = tag.trim();
    for (var i in picture.tags){
      if (picture.tags[i].name == tag){
        return;
      }
    }
    if (tag.length > 0){
      picture.tags.push({'name': tag});
      dbcontrol.updatePicture(picture);
    }
  }

  $scope.removeTagFromPicture = function(tag, picture){
    tag = tag.trim();
    var index = -1;
    for (var i in picture.tags){
      if (picture.tags[i].name == tag){
        index = i;
        break;
      }
    }

    if (index >= 0){
      picture.tags.splice(index, 1);
      dbcontrol.updatePicture(picture);
    }
  }

  $scope.checkForNewTags = function(picture){
    var index = picture.newtag.lastIndexOf(',');
    if (index < 0){
      return;
    }
    var newtags = picture.newtag.substr(0, index).split(',');
    picture.newtag = picture.newtag.substr(index + 1);

    for (var i in newtags){
      var newtag = newtags[i].trim();
      $scope.addTagToPicture(newtag, picture);
    }
  }

  dbcontrol.init.onsuccess = $scope.loadPictures;
  dbcontrol.init();
};
