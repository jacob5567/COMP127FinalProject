
//TODO character count?
//TODO fix mobile css
//TODO add a variable character count (not just 280)
//TODO better CSS overall
//TODO twitter API integration
//TODO make it work for more than 999 tweets
//TODO make indents work

window.addEventListener("load", function() {

    var userInput = new Vue({
        el: "#input",
        data: {
            userTweet: ""
        }
    });

    var checkboxes = new Vue({
        el: "#checkboxes",
        data: {
            endingPick: "parentheses"
        }
    });

    var results = new Vue({
        el: "#results",
        data: {
            dividedTweets: []
        },
        methods: {
            divide: function() {
                let data = userInput.$data.userTweet;
                data = data.replace(/\n/g, ' ');
                data = data.trim();
                let arrayOfTweets = [];
                let i = 0;
                let lastSpace = 0;
                let lastI = 0;
                while(i < data.length) {
                    if(data[i] == ' ') {
                        if(i - lastI <= 270) {
                            lastSpace = i;
                        }
                        else {
                            arrayOfTweets.push(data.substring(lastI, lastSpace));
                            i = lastSpace;
                            lastI = i;
                        }
                    }
                    else if(i - lastI > 270 && lastSpace == lastI) {
                        console.log("elseelse");
                        arrayOfTweets.push(data.substring(lastSpace, i));
                        lastSpace = i;
                        lastI = i;
                    }
                    i++;
                }
                if(i > lastI + 1) {
                    arrayOfTweets.push(data.substring(lastI, data.length));
                }

                if(arrayOfTweets.length > 1) {
                    switch(checkboxes.$data.endingPick) {
                        case "slash":
                            for(let j = 0; j < arrayOfTweets.length; j++) {
                                arrayOfTweets[j] += ' ' + (j + 1) + '/' + arrayOfTweets.length + '';
                            }
                            break;
                        case "oneValue":
                            for(let j = 0; j < arrayOfTweets.length; j++) {
                                arrayOfTweets[j] += ' /' + (j + 1);
                            }
                            break;
                        default:
                            for(let j = 0; j < arrayOfTweets.length; j++) {
                                arrayOfTweets[j] += ' (' + (j + 1) + '/' + arrayOfTweets.length + ')';
                            }
                            break;
                    }
                }

                this.dividedTweets = arrayOfTweets;
            }
        }
    });

    userInput.$watch("userTweet", function() {
        results.divide()
    });

    checkboxes.$watch("endingPick", function() {
        results.divide()
    })

})