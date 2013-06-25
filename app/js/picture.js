function PictureDisplayCtrl($scope, $http, $indexedDB){

  $scope.addPic = function (url){
    var pic = {'url': url, 'tags': []};
    $scope.pictures.push( pic );
    $indexedDB.objectStore('pictures').insert(pic);
  }

  $scope.setQuery = function(query){
    $scope.query = query;
  }

  $scope.loadPictures = function(){
    var picstore = $indexedDB.objectStore('pictures');
    console.log("Initiating picture loading procedure (so fancy)");
    var promise =  picstore.getAll().then(function (results){
      console.log('storing DB results into pictures...');
      $scope.pictures = results;
    });
    console.log(promise);
  }

  $scope.deletePic = function(picture){
    $scope.pictures.splice( $scope.pictures.indexOf(picture), 1);
    console.log(picture);
    $indexedDB.objectStore('pictures').delete( picture.url );
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
      $indexedDB.objectStore('pictures').upsert(picture);
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
      $indexedDB.objectStore('pictures').upsert(picture);
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

};
