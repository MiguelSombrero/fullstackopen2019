import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Display = (props) => <h1>{props.text}</h1>

const Statistics = (props) => {
    if (props.good + props.neutral + props.bad !== 0) return (
        <div>
            <table>
                <tbody>
                    <Statistic text='hyvä' value={props.good} symbol='' />
                    <Statistic text='neutraali' value={props.neutral} symbol='' />
                    <Statistic text='huono' value={props.bad} symbol='' />
                    <Statistic text='yhteensä' value={props.all} symbol='' />
                    <Statistic text='keskiarvo' value={(props.good-props.bad)/props.all} symbol='' />
                    <Statistic text='positiivia' value={100*props.good/props.all} symbol='%' />
                </tbody>
                
            </table>
        </div>
    )
    return (<p>Ei yhtään palautetta annettu</p>)
}

const Statistic = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.symbol}</td>
    </tr>
)

const Button = (props) => (
    <button onClick={props.handleClick} >{props.text}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const setToGood = (value) => {
        setGood(value)
    }
    const setToNeutral = (value) => {
        setNeutral(value)
    }
    const setToBad = (value) => {
        setBad(value)
    }

    return (
        <div>
            <Display text='anna palautetta' />
            <Button handleClick={() => setToGood(good +1)} text='hyvä' />
            <Button handleClick={() => setToNeutral(neutral +1)} text='neutraali' />
            <Button handleClick={() => setToBad(bad +1)} text='huono' />
            
            <Display text='statistiikka' />
            <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
