import React from 'react';

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  const total = () => props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p>yhteensä {total()} tehtävää</p>
  )
}

const Part = props =>
  <p>{props.name} {props.exercises}</p>

const Content = props => {
    const parts = () => props.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    )
    return (
        <div>
            {parts()}
        </div>
    )
}

const Course = props => {
    const course = () => props.courses.map(course =>
        <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )

    return (
        <div>
            {course()}
        </div>
    )
}

export default Course