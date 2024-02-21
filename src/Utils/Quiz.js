import { EventDispatcher } from 'three'

/** Creates a quiz with the given jsonQuizData */
export default class Quiz extends EventDispatcher {
  constructor(jsonQuizData) {
    super()
    this.data = jsonQuizData
    this.length = this.getLength()

    // status information
    this.finished = false
    this.isActive = false
    this.points = 0
    this.currentQuestion = null
    this.answeredQuestions = 0

    // reset once to initialize properly
    this.reset()
  }

  /** Shuffles the answers if needed */
  shuffleAnswers() {
    for (let i in this.data.questions) {
      this.data.questions[i].answers.sort(() => Math.random() - 0.5)
    }
  }

  /** Gets the length of the quiz */
  getLength() {
    return Object.keys(this.data.questions).length
  }

  reset() {
    this.isActive = false
    this.points = 0
    this.answeredQuestions = 0

    // reset all questions to being unanswered
    for (let i in this.data.questions) {
      this.data.questions[i].answered = false
    }
  }

  addPoints(amount) {
    this.points += Math.abs(amount)
  }

  removePoints(amount) {
    this.points -= Math.abs(amount)
  }

  start() {
    this.isRunning = true

    // notify the app that the quiz has started
    this.dispatchEvent({ type: 'start' })
  }

  evaluateAnswer(question, selectedAnswer) {
    // mark the question as answered
    question.answered = true

    // increment the number of answered questions
    this.answeredQuestions += 1

    // check if the selected answer was the correct one
    let result = selectedAnswer.correct

    // store if the question has been answered right or wrong
    question.answeredCorrect = result

    // if the result was correct, add the points
    if (result) {
      this.addPoints(10)
    }

    // return the correct answer to the application
    this.dispatchEvent({
      type: 'showAnswer',
      message: {
        explanationText: question.explanationText,
        correct: result,
      },
    })

    // return the result boolean
    return result
  }

  finish() {
    // if all questions have been answered, trigger the finished event
    if (this.answeredQuestions >= this.length) {
      this.finished = true

      this.dispatchEvent({ type: 'finished' })
    }
  }
}
