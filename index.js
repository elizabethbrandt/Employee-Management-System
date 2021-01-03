const inquirer = require("inquirer");
const db = require("./db");

function askForAction() {

    inquirer
        .prompt({
            message: "Choose what you would like to search.",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENTS", 
                "VIEW_ROLES", 
                "VIEW_EMPLOYEES", 
                "QUIT"
            ]
        })
        // .then((res) => {

        //     switch(res.action) {

        //         case "GET_SONGS_BY_ARTIST":
        //             getSongsByArtist()
        //             return;

        //         case "GET_ARTISTS_WITH_MULTIPLE_TOP_SONGS":
        //             getArtistsMulti()
        //             return;

        //         case "GET_RANGE":
        //             getRange()
        //             return;

        //         case "GET_SONG":
        //             getSong()
        //             return;
                
        //         case "GET_SONG_AND_ALBUM_BY_ARTIST":
        //             getSongAndAlbumByArtist()
        //             return;
                
        //         default:
        //             connection.end();

        //     }
        // })
}

db.getDepartments().then((results) => {

    console.log(results);

});