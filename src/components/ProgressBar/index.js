import React, { Fragment } from 'react';

const ProgressBar = ({maxQuestions, idQuestion}) => {

    const getwidth = (totalquestions, questioId) => {
        return (100 / totalquestions) * questioId;
    }

    const actuelQuestion = idQuestion + 1;

    const progressPercent = getwidth(maxQuestions, actuelQuestion)

    return (
        <>
        <div className='percentage'>
            <div className='progressPercent'>{`Question: ${idQuestion+1}/${maxQuestions}`}</div>
            <div className='progressPercent'> Progression: {progressPercent}%</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' style={{width:`${progressPercent}%`}}></div></div>
        </>
    );
}

export default React.memo(ProgressBar);
