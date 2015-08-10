(function () {
    "use strict";
    angular.module('chatApp').service("dataInitializeService", function ($window) {
        var message1 = {
            id: 1,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:13:00"),
            text: "Hi, Guys in PublicRoom1!"
        };
        var message2 = {
            id: 2,
            authorId: 2,
            authorName: 'Kelly',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:13:15"),
            text: "Hi, Admin!"
        };
        var message3 = {
            id: 3,
            authorId: 3,
            authorName: 'Michael',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:13:25"),
            text: "Hello, Admin!"
        };
        var message4 = {
            id: 4,
            authorId: 4,
            authorName: 'Kevin',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:13:35"),
            text: "Hi, Admin!"
        };
        var message5 = {
            id: 5,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:13:50"),
            text: "Ok, everybody in PublicRoom1 is online! What will we do this evening?"
        };
        var message6 = {
            id: 6,
            authorId: 3,
            authorName: 'Michael',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:14:10"),
            text: "Let1s go to the cinema. I heard Ant-Man is very good."
        };
        var message7 = {
            id: 7,
            authorId: 2,
            authorName: 'Kelly',
            publicRoomId: 1,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:14:40"),
            text: "Hm, like this idea a lot."
        };
        var message8 = {
            id: 8,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: 2,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:15:50"),
            text: "Hi, Guys in PublicRoom2."
        };
        var message9 = {
            id: 9,
            authorId: 5,
            authorName: 'Helen',
            publicRoomId: 2,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:16:10"),
            text: "Hi, Admin."
        };
        var message10 = {
            id: 10,
            authorId: 6,
            authorName: 'Victor',
            publicRoomId: 2,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:16:20"),
            text: "Hello, Admin."
        };
        var message11 = {
            id: 11,
            authorId: 6,
            authorName: 'Victor',
            publicRoomId: 2,
            privateRoomId: null,
            date: new Date("July 30, 2015 11:16:30"),
            text: "Let`s go shopping."
        };
        var message12 = {
            id: 12,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: null,
            privateRoomId: 1,
            date: new Date("July 30, 2015 13:16:32"),
            text: "What will we do this evening, Tessa?"
        };
        var message13 = {
            id: 13,
            authorId: 2,
            authorName: 'Kelly',
            publicRoomId: null,
            privateRoomId: 1,
            date: new Date("July 30, 2015 13:16:39"),
            text: "Let`s go shopping."
        };
        var message14 = {
            id: 14,
            authorId: 2,
            authorName: 'Kelly',
            publicRoomId: null,
            privateRoomId: 1,
            date: new Date("July 30, 2015 13:16:42"),
            text: "I need new dress."
        };
        var message15 = {
            id: 15,
            authorId: 4,
            authorName: 'Kevin',
            publicRoomId: null,
            privateRoomId: 2,
            date: new Date("July 30, 2015 14:16:20"),
            text: "What will we do this evening?"
        };
        var message16 = {
            id: 16,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: null,
            privateRoomId: 2,
            date: new Date("July 30, 2015 14:16:320"),
            text: "Let`s go shopping,Kevin"
        };
        var message17 = {
            id: 17,
            authorId: 4,
            authorName: 'Kevin',
            publicRoomId: null,
            privateRoomId: 2,
            date: new Date("July 30, 2015 14:16:50"),
            text: "Okey."
        };
        var message18 = {
            id: 18,
            authorId: 8,
            authorName: 'Tessa',
            publicRoomId: null,
            privateRoomId: 3,
            date: new Date("July 30, 2015 15:16:17"),
            text: "What will we do this evening?"
        };
        var message19 = {
            id: 19,
            authorId: 1,
            authorName: 'Admin',
            publicRoomId: null,
            privateRoomId: 3,
            date: new Date("July 30, 2015 15:16:19"),
            text: "Let`s go shopping."
        };
        var message20 = {
            id: 20,
            authorId: 8,
            authorName: 'Tessa',
            publicRoomId: null,
            privateRoomId: 3,
            date: new Date("July 30, 2015 15:16:44"),
            text: "Okey."
        };
        var user1 = {id: 1, name: 'Admin', password: '12345', isAuthorized: false};
        var user2 = {id: 2, name: 'Kelly', password: '12345', isAuthorized: false};
        var user3 = {id: 3, name: 'Michael', password: '12345', isAuthorized: false};
        var user4 = {id: 4, name: 'Kevin', password: '12345', isAuthorized: false};
        var user5 = {id: 5, name: 'Helen', password: '12345', isAuthorized: false};
        var user6 = {id: 6, name: 'Victor', password: '12345', isAuthorized: false};
        var user7 = {id: 7, name: 'Paris', password: '12345', isAuthorized: false};
        var user8 = {id: 8, name: 'Tessa', password: '12345', isAuthorized: false};
        var user9 = {id: 9, name: 'George', password: '12345', isAuthorized: false};
        var user10 = {id: 10, name: 'Angelina', password: '12345', isAuthorized: false};
        var publicRoom1 = {
            id: 1,
            name: "Admin,Kelly,Michael,Kevin",
            users: [user1, user2, user3, user4],
            messages: [message1, message2, message3, message4, message5, message6, message7]
        };
        var publicRoom1ViewModel = {
            id: 1,
            name: "Admin,Kelly,Michael,Kevin"
        };
        var publicRoom2 = {
            id: 2,
            name: "Admin,Helen,Victor",
            users: [user1, user5, user6],
            messages: [message8, message9, message10, message11]
        };
        var publicRoom2ViewModel = {id: 2, name: "Admin,Helen,Victor"};
        user1.publicRoomViewModels = [publicRoom1ViewModel, publicRoom2ViewModel];
        var privateRoom1 = {
            id: 1,
            name: "Admin, Kelly",
            user1Id: 1,
            user2Id: 2,
            messages: [message12, message13, message14]
        };
        var privateRoom1ViewModel = {id: 1, name: "Admin, Kelly"};
        var privateRoom2 = {
            id: 2,
            user1Id: 1,
            user2Id: 4,
            messages: [message15, message16, message17],
            name: "Admin, Kevin"
        };
        var privateRoom2ViewModel = {id: 2, name: "Admin, Kevin"};
        var privateRoom3 = {
            id: 3,
            user1Id: 1,
            user2Id: 8,
            messages: [message18, message19, message20],
            name: "Admin, Tessa"
        };
        var privateRoom3ViewModel = {id: 3, name: "Admin, Tessa"};
        user1.privateRoomViewModels = [privateRoom1ViewModel, privateRoom2ViewModel, privateRoom3ViewModel];
        var users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
        var publicRooms = [publicRoom1, publicRoom2];
        var privateRooms = [privateRoom1, privateRoom2, privateRoom3];
        var messages = [message1, message2, message3, message4, message5, message6, message7, message8, message9, message10, message11, message12, message13, message14, message15, message16, message17, message18, message19, message20];
        $window.localStorage.users = JSON.stringify(users);
        $window.localStorage.publicRooms = JSON.stringify(publicRooms);
        $window.localStorage.privateRooms = JSON.stringify(privateRooms);
        $window.localStorage.messages = JSON.stringify(messages);
    });
})();