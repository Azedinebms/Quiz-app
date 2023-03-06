import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../Quizapp';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa';


toast.configure();

class Quiz extends Component {


    constructor(props){
        super(props)
        
        this.initialState = {
            levelName: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            option: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score:0,
            showWelcomeMsg:false,
            quizEnd: false,
            percent:null
        }

        this.state = this.initialState;

        this.storedDataRef = React.createRef;

    }
    

    

    

    LoadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("hi");
        }
    }

showToastMsg = pseudo => {

if(!this.state.showWelcomeMsg){

    this.setState({
        showWelcomeMsg:true
    })


    toast.warn(`Bienvenu ${pseudo}, et bonne chance`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });


}

    
}
    

    componentDidMount() {
        this.LoadQuestions(this.state.levelName[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                option: this.state.storedQuestions[this.state.idQuestion].options,

            })
           
        }

        if (this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                option: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            })
        }

        if ( this.state.quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPecentage(this.state.maxQuestions, this.state.score);
            this.gameOver(gradePercent);
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo){
            this.showToastMsg(this.props.userData.pseudo)
        }
    }


    nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestions - 1){
            //this.gameOver();
            this.setState({
                quizEnd:true
            })

        } else {
            this.setState(prevState =>({
                idQuestion:prevState.idQuestion + 1
            }));

        }

       const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
       if (this.state.userAnswer === goodAnswer){
            this.setState( prevState => ({
                score : prevState.score +1
            }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
       }else{
        toast.error('Raté 0', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
       }
        
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer:selectedAnswer,
            btnDisabled:false,
        })
    }


    getPecentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100 ;

    gameOver = percent => {

        if ( percent >= 50){
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent,

            })

        } else {
            this.setState({
               percent,

            })

        }
    }

    loadLevelQuestions = param => {
        this.setState({...this.initialState, quizLevel:param})
        this.LoadQuestions(this.state.levelName[param]);
    }


    render() {

        //const { pseudo } = this.props.userData;

        const diplayOptions = this.state.option.map((option, index) => {
            return (
                <p key={index} 
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`} 
                onClick={() => this.submitAnswer(option)}
                ><FaChevronRight/> {option}</p>
            )
        })

        return this.state.quizEnd ? (
        <QuizOver 
            ref={this.storedDataRef} 
            levelName={this.state.levelName}
            score={this.state.score}
            maxQuestions={this.state.maxQuestions}
            quizLevel={this.state.quizLevel}
            percent={this.state.percent}
            loadLevelQuestions={this.loadLevelQuestions}
        />) : 
         (
            <Fragment>
                <Levels 
                    levelName={this.state.levelName}
                    quizLevel={this.state.quizLevel}
                />

                <ProgressBar maxQuestions={this.state.maxQuestions} idQuestion={this.state.idQuestion}/>
                <h2>{this.state.question}</h2>
                {diplayOptions}
                <button disabled={this.state.btnDisabled} className='btnSubmit' onClick={this.nextQuestion}>
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                    </button>
            </Fragment>
        )

    }

}

export default Quiz;
