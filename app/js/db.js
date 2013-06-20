var dbcontrol = {};
dbcontrol.initiated = false;
dbcontrol.init = function(){

  if (dbcontrol.initiated){
    if (dbcontrol.init.onsuccess){
      dbcontrol.init.onsuccess();
    }
    return;
  }
  dbcontrol.initiated = true;

  // Set up indexedDB.
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  // Try to connect to the DB
  var request = window.indexedDB.open("pulcher", 1);

  request.onsuccess = function(){
    // Load from DB
    dbcontrol.db = request.result;
    dbcontrol.db.onerror = function(event){
      alert("DB Error! " + event.target.errorCode);
    }

    if (dbcontrol.init.onsuccess){
      dbcontrol.init.onsuccess();
    }
  }

  request.onerror = function(event){
    alert("Sorry, I couldn't open IndexedDB to save & load your pictures.");
    alert("Error code: " + event.target.errorCode);
  }
  request.onupgradeneeded = dbcontrol.setUpDB;
}

dbcontrol.setUpDB = function(event){

  alert( "Upgrading DB! This may take a bit..." );
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("pictures", { keyPath: "url" });

}

dbcontrol.importFromFile = function(filename){
  $http.get(filename).success(function(pictures){
    var transaction = dbcontrol.db.transaction(["pictures"], "readwrite");
    objectStore = transaction.objectStore("pictures");
    for (var i in pictures){
      var request = objectStore.add(pictures[i]);
    }
  });
}

dbcontrol.getPictures = function (callback){
  var objectStore = dbcontrol.db.transaction(["pictures"]).objectStore("pictures");

  var pictures = [];
  var promise = objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      pictures.push(cursor.value);
      cursor.continue();
    }
    else {
      callback(pictures);
    }

  };
}

dbcontrol.addPicture = function(picture){
  var transaction = dbcontrol.db.transaction(["pictures"], "readwrite");

  objectStore = transaction.objectStore("pictures");
  objectStore.add(picture);
}

dbcontrol.deletePicture = function(picture){
  var transaction = dbcontrol.db.transaction(["pictures"], "readwrite");

  objectStore = transaction.objectStore("pictures");
  objectStore.delete(picture.url);
}
