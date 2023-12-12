/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // assigning searchterm
    result['SearchTerm'] = searchTerm

    // tracks if search term has been found
    let searchTermFound = false;

    // for loop to filter through the Content array to see if Text array has searchTerm string
    scannedTextObj[0].Content.forEach((obj) => {
        // if searchTerm is found push the ISBN, Page, and Line into the results array 
        if (obj.Text.includes(searchTerm)) {
            result['Results'].push({"ISBN": scannedTextObj[0].ISBN, "Page": obj.Page, "Line": obj.Line});
            searchTermFound = true;
        }
    });

    if (!searchTermFound) {
        // loops through to check if last word has hyphen and if so find the next word in array and see if it matches searchTerm
        scannedTextObj[0].Content.forEach((obj, i) => {
            // gets last word of Text
            lastWord = obj.Text.split(" ")[obj.Text.split(" ").length - 1]

            // if lastWord has hyphen continue
            if (lastWord.includes('-')) {
                firstHalf = lastWord.slice(0, -1) // extracts hyphen from last word
                next = scannedTextObj[0].Content[i + 1].Text // gets next Text in array
                firstWord = next.split(" ") // split next Text by " "
                secondHalf = firstWord[0] // get first word of the next array
                word = firstHalf + secondHalf // then combine firstHalf and secondHalf

                // checks if word matches searchTerm
                if (word == searchTerm) {
                    // if it matches push the ISBN, Page, and Line into the results array 
                    result['Results'].push({"ISBN": scannedTextObj[0].ISBN, "Page": obj.Page, "Line": obj.Line});
                }
            }
        });
    }

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}


//////// * my output objects * ////////

// positive test cases
const test3 = {
    "SearchTerm": "momentum",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const test4 = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

// negative test case
const test5 = {
    "SearchTerm": "or",
    "Results": [
    ]
}

// case-sensitive test case
const test6 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

// edge test cases (?)
const test7 = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const test8 = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

//////// * my unit tests * /////////

const test3result = findSearchTermInBooks("momentum", twentyLeaguesIn);
if (JSON.stringify(test3) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", test3);
    console.log("Received:", test3result);
}

const test4result = findSearchTermInBooks("and", twentyLeaguesIn);
if (JSON.stringify(test4) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4);
    console.log("Received:", test4result);
}

const test5result = findSearchTermInBooks("or", twentyLeaguesIn);
if (JSON.stringify(test5) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", test5);
    console.log("Received:", test5result);
}

const test6result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(test6) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6);
    console.log("Received:", test6result);
}

const test7result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(test7) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", test7);
    console.log("Received:", test7result);
}

const test8result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(test8) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", test8);
    console.log("Received:", test8result);
}