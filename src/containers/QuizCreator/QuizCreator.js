import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../UI/Button/Button'
import { CreateControl, validate, validateForm } from '../../form/formFramework'
import Select from '../../UI/Select/Select'
import Input from '../../UI/Input/Input'
import { connect } from 'react-redux'
import { createQuizQuestionItem, finishCreateQuiz } from '../../redux/actions/create'

function createOptionControl(number) {
    return CreateControl (
        {
            label: `Oprion ${number}`,
            id: number,
            errorMessage: 'The question could not be empty'
        },
        {
            required: true
        }
    )
}

function createFormControls() {
    return {
        question: CreateControl(
            {
                label: 'Please enter a question',
                errorMessage: 'The question could not be empty'
            },
            {
                required: true
            }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnsweredId: 1,
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault()
    }

    addQuestionHandler = e => {
        e.preventDefault()
        const {question, option1, option2, option3, option4} =  this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnsweredId: this.state.rightAnsweredId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestionItem(questionItem)

        this.setState({
            isFormValid: false,
            rightAnsweredId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = e => {
        e.preventDefault()

        this.setState({
            isFormValid: false,
            rightAnsweredId: 1,
            formControls: createFormControls()
        })

        this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {        
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true        
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input  label={control.label} 
                            value={control.value} 
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={e => this.changeHandler(e.target.value, controlName)} />
                    { index === 0 ? <hr /> : null}
                </React.Fragment>
            )
        })
    }

    onChangeSelectHandler = e => {
        this.setState({
            rightAnsweredId: +e.target.value
        })
    }

    render() {

        const select = <Select label="Please choose the option"
                               value={this.state.rightAnsweredId}
                               options={[
                                   {text: 1, value: 1},
                                   {text: 2, value: 2},
                                   {text: 3, value: 3},
                                   {text: 4, value: 4}
                               ]}
                               onChange={this.onChangeSelectHandler} />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator component</h1>
                    <form onSubmit={this.submitHandler}>

                        { this.renderInputs() }

                        { select }
                        <Button type="primary"
                                disabled={!this.state.isFormValid}
                                onClick={this.addQuestionHandler}>
                            Add Question
                        </Button>
                        <Button type="success"
                                label="Add Question"
                                disabled={this.props.quiz.length === 0}
                                onClick={this.createQuizHandler}>
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quiz: state.create.quiz
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createQuizQuestionItem: item => dispatch(createQuizQuestionItem(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)