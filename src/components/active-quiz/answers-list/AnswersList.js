import React from "react";
import classes from "./AnswersList.module.css"
import AnswerItem from "./answer-item/AnswerItem";

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    onClickHandler={ props.onClickHandler }
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        }) }
    </ul>
)



export default AnswersList;