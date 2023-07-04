const GameStatus = {
    WAITING: 0,
    PLAYING: 1,
    FINISHED: 2,
}


class Game{
    constructor(classId, title, questions){
        this.classId = classId;
        this.title = title;
        this.questions = questions.map(question => {
            let choicesMap = {}

            for(choice in question.choices){
                choicesMap[choice.id] = choice;
            }

            question.choices = choicesMap;
            return question;
        });
        this.status = GameStatus.WAITING;    
        this.players = {};
        this.actualQuestion = 0;
        this.answers = {}
    }

    joinGame(player){
        if(!this.players[player.id]){
            player.score = 0;
            this.players[player.id] = player;
        }
    }

    exitGame(player){
        delete this.players[player.id];
    }

    startGame(){
        this.status = GameStatus.PLAYING;
    }

    getStatus(){
        return this.status;
    }

    getTitle(){
        return this.title;
    }

    getNumberOfPlayers(){
        return Object.keys(this.players).length;
    }

    getClassId(){
        return this.classId;
    }

    getActualQuestion(){
        if(this.actualQuestion < this.questions.length){
            const question = this.questions[this.actualQuestion];
            
            //TODO: remove correct item

            return question;
        }else{
            this.status = GameStatus.FINISHED;
            throw "Jogo Finalizado!"
        }
    }

    getNextQuestion(){
        this.answers = {};
        const ans = this.getActualQuestion();
        this.actualQuestion++;
        return ans;
    }

    getScoreboard(){
        let scoreboard = [];

        for (let key in this.players){
            scoreboard.push(this.players[key])
        }

        scoreboard.sort((a,b) => {
            return a.score - b.score;
        })

        return scoreboard;
    }

    processAnswers(){
        for(let key in this.answers){
            if(this.answers[key]){
                this.players[key]++;
            }
        }
    }

    answerQuestion(playerId, choiceId){
        if(this.questions[this.actualQuestion].choices[choiceId].isCorrect){
            this.answers[playerId] = true;
        }else{
            this.answers[playerId] = false;
        }
    }
}

const gamesOnline = {
    "8cf05356-4958-41cb-b175-4e8aea3382f4": new Game(1,'Simulado Surpresa ;-;',[])
};

const getGamesByClassId = (classId) => {
    let games = [];

    for (let key in gamesOnline){
        if(gamesOnline[key].getClassId() == classId){
            games.push({
                id: key,
                status: gamesOnline[key].getStatus(),
                title: gamesOnline[key].getTitle(),
                playersOnline: gamesOnline[key].getNumberOfPlayers()
            });
        }
    }

    return games;
}

module.exports = {
    getGamesByClassId,
    GameStatus,
    Game,
    gamesOnline,
}