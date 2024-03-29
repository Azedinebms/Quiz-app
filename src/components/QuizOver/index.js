import React, { Fragment, useEffect, useState } from 'react';


const QuizOver = React.forwardRef((props, ref) => {
    const {
        percent,
        quizLevel,
        maxQuestions,
        score,
        levelName,
        loadLevelQuestions
    } = props;

    const [asked, setAsked] = useState([]);
    console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
    }, [ref]);


    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel)
        }, 3000);
    }

    const decision = score >= averageGrade ? (
        <>
        <div className='stepsBtnContainer'>
            {
                quizLevel < levelName.length ?
                (
                    <>
                <p className='successMsg'>Bravo, passer au niveau Suivant !</p>
                <button className='btnResult success'
                onClick={() => loadLevelQuestions(quizLevel)}
                >Niveau Suivant</button>
                </>
                )
                :
                (
                    <>
                <p className='successMsg'>Bravo, vous étes un expert !</p>
                <button className='btnResult gameOver'
                onClick={() => loadLevelQuestions(0)}
                >Accueil</button>
                </>
                )
            }
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </>
    )
        :
        (
            <>            
            <div className='stepsBtnContainer'>
                <p className='failureMsg'>Vous avez échoué !</p>
                
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
            </>

)

    const questionAnswer = score >= averageGrade ? ( asked.map(question => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                    <button className='btnInfo'>infos</button>
                </td>
            </tr>
        )
    }))
    :
    (
        <tr>
                <td colSpan="3">
                    <div className='loader'></div>
                   <p style={{textAlign:'center',color:'red'}}>pas de réponse !</p>
                </td>
            </tr>
    )
    




    return (
        <>
            { decision }
            <hr />
            <p className=''>Les réponses aux questions posées:</p>
            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponse</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>

                </table>
            </div>
        </>
    );
})



export default React.memo(QuizOver);
