/*
 * Quiz Vue App that allows users to take different types of quizes 
 *
 * @author Joseph Nagy
 */


// app Vue instance that will manage space on the web page
const app = new Vue({
    // app state --- different values for each app instance
    data() {
        return {
            quizzes: {"duke_quiz": null, "capitals_quiz": null, "math_quiz":null, "nj_quiz":null}, 
            currentQuiz: "",
            showQuizOptions: true, 
            markupAnswers: false,
            jsonQuizNames: ['duke_quiz', 'math_quiz', 'capitals_quiz', 'nj_quiz'],
            fnameToTitle: {
                "duke_quiz": "Duke University Trivia",
                "math_quiz": "Math Quiz", 
                "capitals_quiz": "Worldwide Capitals", 
                "nj_quiz": "New Jersey Trivia"
            },
            fnameToAltText: {
                "duke_quiz": "Duke University Logo",
                "math_quiz": "Math logo with +,-,x,= on it",
                "capitals_quiz": "Map pin logo",
                "nj_quiz": "Sillouette in the shape of the state of NJ"
            },
            fnameToSource: {
                "duke_quiz": "Wikipedia.com",
                "math_quiz": "Icons8.com",
                "capitals_quiz": "IconFinder.com",
                "nj_quiz": "Wikipedia.com"
            },
            quizMessagesDict: null
        }
    }, 

    methods: {
        // helper function to add question mark to end of string 
        addQuestionMark(str){
            lastChar = str.slice(-1);
            if(lastChar === "?"){
                return str; 
            } else{
                return str+"?";
            }
        },
        toggleQuizOptions() {
            // check that quiz is selected 
            if(this.currentQuiz === ""){
                window.alert("Please select a quiz!");
                return;
            }
            // quiz options <-> actual quiz
            this.showQuizOptions = !this.showQuizOptions; 
            // remove answer styling 
            this.markupAnswers = false; 
            // clear previous answers 
            this.clearChoices();
        }, 

        checkAllQuestionsAnswered(){
            let quizFinished = true;
            this.quizzes[this.currentQuiz].forEach(question => {
                if(question.userInput === ""){
                    quizFinished = false;
                    return quizFinished;
                }
            });
            return quizFinished;
        },

        checkComplete(){
            if (this.checkAllQuestionsAnswered()){
                return true; 
            } else {
                window.alert("Please answer each question before submitting your quiz!");
                return false;
            }
        },
        
        checkCorrect(index){
            return this.quizzes[this.currentQuiz][index].answer === this.quizzes[this.currentQuiz][index].userInput;
        },

        calculateScore(){
            let totalPoints = this.quizzes[this.currentQuiz].length;
            let points = totalPoints;
            this.quizzes[this.currentQuiz].forEach(question => {
                if(question.userInput !== question.answer){
                    points--;
                }
            });
            return Math.round(100*(points/totalPoints));
        },
        
        submitQuiz(){
            // make sure all questions have been answered
            if(this.checkComplete()){
                // TODO: lock user input 

                // change styling based on question.correct = true/false
                this.markupAnswers = true;

                // calculate score 
                quizScore = this.calculateScore();

                // get custom message based on score and quiz_messages.json
                userMessage = this.getCustomMessage(quizScore);

                userMessage += "\nYour Score: " + quizScore.toString() + "%";

                // give user endgame buttons (try again OR new quiz)
                window.alert(userMessage);
            } else {
                return; 
            }
        },

        clearChoices(){
            this.quizzes[this.currentQuiz].forEach(question => question.userInput = "");
            this.markupAnswers = false; 
        }, 
        // helper function that returns custom message based on user score 
        getCustomMessage(score){
            if(0<=score && score<=50){
                return this.quizMessagesDict[this.currentQuiz].D;
            } else if (50<score && score<=70){
                return this.quizMessagesDict[this.currentQuiz].C;
            } else if (70<score && score<=90){
                return this.quizMessagesDict[this.currentQuiz].B;
            } else {
                return this.quizMessagesDict[this.currentQuiz].A;
            }
        }
    },

    async mounted() {
        console.log("async mounted has been called");
        // get quizes
        for (i = 0; i < this.jsonQuizNames.length; i++) {
            try {
                quizName = this.jsonQuizNames[i];
                const response = await fetch(`data/json/${quizName.toLowerCase()}.json`);
                // create local instance of each quiz, add desired keys to it AND...
                const quiz = (await response.json());
                // add userInput field 
                quiz.forEach(element => element["userInput"] = "");
                // ...THEN add modified quiz object to quizzes array 
                this.quizzes[quizName] = quiz;
                console.log("fetch successful");
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        // get custom messages 
        try {
            const r = await fetch("data/json/quiz_messages.json");
            const quizMessagesDict = (await r.json());
            this.quizMessagesDict = quizMessagesDict; 
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}); 

// mount means connecting Vue app instance with HTML element with given ID to display it on the page
app.$mount('#app');