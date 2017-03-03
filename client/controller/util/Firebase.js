const Model = require("model/Model");
const Global = require("enum/Global");
const Event = require("util/Event");
const Loader = require("util/Loader");

class FB {

    static onResolve(cb, cbData){
        return function(data){
            if(!data)
                data = true;
            cb(data, cbData);
        }
    }

    static onReject(cb){
        return function(data){
            if(!data)
                data = false;
            cb(data);
        }
    }
    // Initialize Firebase
    static initialze(){
        let config = {
            apiKey: "AIzaSyDtYHsBiiWeSDaIEs3DMlfMKImNa3LQb1w",
            authDomain: "deets-22f50.firebaseapp.com",
            databaseURL: "https://deets-22f50.firebaseio.com",
            storageBucket: "deets-22f50.appspot.com",
            messagingSenderId: "1006368973189"
        };
        firebase.initializeApp(config);
        FB.addFirebaseObservers();
    };

    static addFirebaseObservers(){
        firebase.auth().onAuthStateChanged(function(user) {
            Model.user = user;
            Event.dispatchGlobalEvent(Global.enum.EVENTS.API_EVENT, {"action" : Global.enum.ACTIONS.USER_STATE_CHANGED});
        });
    }

    static updateUserData(data, cb){
        let user = firebase.auth().currentUser;
        firebase.database().ref('pii/' + user.uid).set(data).then(FB.onResolve(cb), FB.onReject(cb));
    }

    static uploadImage(imgFile, imgName, cb){
        let user = firebase.auth().currentUser;
        let storageRef = firebase.storage().ref();
        let imgPath = 'images/' + user.uid + '/' + imgName;
        let userStorageRef = storageRef.child(imgPath);
        userStorageRef.put(imgFile).then(FB.onResolve(cb, imgPath), FB.onReject(cb));
    }

    static downloadImage(imgPath, cb, cbData){
        let storageRef = firebase.storage().ref();
        let userStorageRef = storageRef.child(imgPath);
        userStorageRef.getDownloadURL().then(function(url){
            Loader.loadImageAndGetSize(url, function(width, heigth){
                cb(url, cbData, width, heigth);
            });
        }, FB.onReject(cb));
    }

    static login(email, password, cb){
        firebase.auth().signInWithEmailAndPassword(email, password).then(FB.onResolve(cb), FB.onReject(cb));
    }

    static logout(cb){
        firebase.auth().signOut().then(FB.onResolve(cb), FB.onReject(cb));
    }

    static register(email, password, cb){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(FB.onResolve(cb), FB.onReject(cb));
    }

    static addCard(cardData, cb){
        var user = firebase.auth().currentUser;
        let cardPath = 'cards/' + user.uid + '/';
        cardData.timestamp = firebase.database.ServerValue.TIMESTAMP;
        firebase.database().ref(cardPath).push(cardData).then(FB.onResolve(cb), FB.onReject(cb));
    };

    static readDataOnce(atDestination, cb){
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + atDestination + '/' + userId).once('value').then(FB.onResolve(cb), FB.onReject(cb));
    }

    static readDataAndListenForChanges(atDestination, cb){
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + atDestination + '/' + userId).on('value', FB.onResolve(cb));
    }
}

module.exports = FB;