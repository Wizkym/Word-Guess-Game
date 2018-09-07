
// Declare global variables
var computerChoices = ["krueger", "voorhees", "pennywise", "annabelle", "jigsaw", "samara", "ghostface", "chucky", "leatherface", "joker", "crumb", "myers"];
var imgArr = ['assets/images/krueger.png',
'assets/images/jason.jpg',
'assets/images/penny.jpg',
'assets/images/annabelle.jpg',
'assets/images/jigsaw.jpg',
'assets/images/samara.gif',
'assets/images/ghost.jpg',
'assets/images/chucky.jpg',
'assets/images/leather.png',
'assets/images/joker.jpg',
'assets/images/crumb.jpg',
'assets/images/myers.jpg'];
var guessesArr = [];
var isVisible = false;
var hasWon = false;
var answerArr = [];
var answer;
var newGuess;
var computerPick;
var caption;
var villains = {
    krueger: "<p>Freddy Krueger from Nightmare on Elm Street (1984)</p>",
    voorhees: "<p>Jason Voorhees from Friday the 13<sup>th Franchise</sup</p>",
    pennywise: "<p>Pennywise from IT (2017)</p>",
    annabelle: "<p>Annabelle from Annabelle (2014)</p>",
    jigsaw: "<p>Jigsaw from  the Saw Franchise</p>",
    samara: "<p>Samara Morgan from The Ring Franchise</p>",
    ghostface: "<p>Ghostface from Scream (1996) & others</p>",
    chucky: "<p>Chucky from Childsplay, Seed of Chucky & others</p>",
    leatherface: "<p>Leatherface from the Texas Chainsaw Massacre franchise</P>",
    joker: "<p>The Joker from Batman The Dark Knight (2008)</p>",
    crumb: "<p>Kevin Wendell Crumb from Split (2016)</p>",
    myers: "<p>Michael Myers from the Halloween series</p>"
};
const keys = Object.keys(villains);
var audioElement;

// Declare the game object
var game = {
    goodGuess: true,
    wins: 0,
    guessesLeft: 15,

    push: function (guess){           // adds letters to the guessesArr only if they're unique
        if (guessesArr.length > 0){
            for (let x = 0; x < guessesArr.length; x++) {
                if (guess === guessesArr[x]){    // iterates array to check for matches
                    this.goodGuess = false;
                    break;
                }
             }
             if (this.goodGuess) {
                guessesArr.push(guess);
                document.querySelector("#guesses").innerHTML = guessesArr;  // print out the whole array
             } else {
                 alert("You already guessed '" + guess + "'");
            }
        } else {
            guessesArr.push(guess); 
            this.goodGuess = true;
            document.querySelector("#guesses").innerHTML = guessesArr;  // print out that first guess
        }

         // call the game.check function if the guess was accepted
        if ((game.goodGuess) && (!hasWon)) {
            game.letterCheck(newGuess);
        }
    },

    newGame: function () {
        computerPick = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        console.log(computerPick);
        answerArr.length = 0;           // dump current answer array

        for (let x = 0; x < computerPick.length; x++){
            answerArr[x] = "_";         // will display the computerPick characters as underscores
        }

        answer = answerArr.join(" ");
        guessesArr.length = 0;          // dump current user guesses array
        this.guessesLeft = 15;
        document.querySelector("#guesses").innerHTML = guessesArr;
        document.getElementById('wins').innerHTML = game.wins;
        document.getElementById('current').innerHTML = answer;
        document.getElementById('count').innerHTML = game.guessesLeft;
        $('#imgcard').empty();
        $("#imgcard").css("visibility", "hidden");
        isVisible = false;
        hasWon = false;
    },

    letterCheck: function (guess) {
        for (let x = 0; x < computerPick.length; x++) {
            // if the computerPick contains a letter equal to guess
            if (computerPick[x] === guess) { 
                // assign the letter to the same index in the answer array  
                answerArr[x] = guess;      
            }
        }
        answer = answerArr.join(" ");  // join the array in order to print the letters
        this.guessesLeft--;
        document.getElementById('count').innerHTML = game.guessesLeft;
        document.getElementById('current').innerHTML = answer;

        if ((this.guessesLeft <= 0) || (guessesArr.length >= 15)) {  //checks if you're out of guesses
            this.newGame();
        } else {
            var text = document.getElementById('current').textContent;
            
            if (!text.includes("_")) {
                this.wins++;
                document.getElementById('wins').innerHTML = game.wins;
                
                for (var x = 0; x < keys.length; x++) {
                    if (computerPick === keys[x]) {
                        caption = villains[keys[x]];     // use the current key & index to get the right villain
                    }
                }
                if (!isVisible){this.showImage();}
                $("#imgcard").append(caption);

                // play audio
                audioElement.play();
                hasWon = true;
            }
        }
    },

    showImage: function() {
        let index = 0;
        for (var x = 0; x < computerChoices.length; x++) {
            if (computerPick === computerChoices[x]) {
                index = x;
            }
        }
        var img = $('<img />').attr({
            'id': 'villains',
            'src': imgArr[index],       // gets appropriate image from the image array
            'alt': 'Villain Image',
            'title': 'Hint'
        }).appendTo('#imgcard');
        $("#imgcard").css("visibility", "visible");
        isVisible = true;
    }
};

// Give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function(event) {
    game.goodGuess = true;

    // assign new guess a variable
    if (event.keyCode >= 65 && event.keyCode <= 90 && (!hasWon)) { // checks if the guess is between a-z
        newGuess = event.key;
        game.push(newGuess);    // run the game.push function to add the letter to the guess array & display it
    }
}

$(document).ready(function() {
    // Call the showImage function to display the villain's image on screen
    $("#hint").on("click", function (){
        if (!isVisible){
            game.showImage();
        } else {
            $("#imgcard").css("visibility", "hidden");
            $('#imgcard').empty();
            isVisible = false;
        }
    })

    $("#new").on("click", function (){
        game.newGame();
    })

    audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/evil_laugh.mp3");
    
});

