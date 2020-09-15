import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/active-quiz/ActiveQuiz";
import FinishedQuiz from "../../components/finished-quiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: "Сколько вешать граммов?",
                rightAnswerId: 3,
                answers: [
                    {text: "100", id: 1},
                    {text: "200", id: 2},
                    {text: "300", id: 3},
                    {text: "400", id: 4}
                ]
            },
            {
                id: 2,
                question: "Сколько лет",
                rightAnswerId: 2,
                answers: [
                    {text: "20", id: 1},
                    {text: "27", id: 2},
                    {text: "30", id: 3},
                    {text: "17", id: 4}
                ]
            }
        ]
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        })
    }

    onClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId] : 'success'},
                results: results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log("finish, zaebumba");
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion : this.state.activeQuestion + 1,
                        answerState : null
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId] : 'error'},
                results: results
            });
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                              />
                            : <ActiveQuiz
                                answers={ this.state.quiz[this.state.activeQuestion].answers }
                                question={ this.state.quiz[this.state.activeQuestion].question }
                                onClickHandler={ this.onClickHandler }
                                quizLength={ this.state.quiz.length }
                                currentQuestionNumber={ this.state.activeQuestion + 1 }
                                currentState={ this.state.answerState }
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz
