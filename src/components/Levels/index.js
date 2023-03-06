import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({quizLevel, levelName }) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizSteps = levelName.map( level => ({title: level.toUpperCase()}));
        setLevels(quizSteps)
    }, [levelName]);

    return (
        <div className="levelsContainer" style={{background:'transparent'}}>
            
            <Stepper 
                steps={levels} 
                activeStep={ quizLevel }
                circleTop={0}
                activeColor={'#d31017'}
                completeColor={'#d31017'}
                activeTitleColor={'#d31017'} />
            
        </div>
    );
}

export default Levels;
