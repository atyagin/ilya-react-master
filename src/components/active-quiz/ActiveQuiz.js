import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./answers-list/AnswersList";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{ props.currentQuestionNumber }.</strong>&nbsp;
                { props.question }
            </span>

            <small>{ props.currentQuestionNumber } из { props.quizLength }</small>
        </p>

        <AnswersList
            state = { props.currentState }
            answers = { props.answers }
            onClickHandler={ props.onClickHandler }
        />
    </div>
);

export default ActiveQuiz;


