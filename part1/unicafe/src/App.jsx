import { useState } from 'react';

const Header = ({ name }) => {
  return (
   <h1>{name}</h1>
  )
};

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
};

const StatisticLine = ({ text, value }) => {
  return (
   <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
  )
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.all} />
    <StatisticLine text="average" value ={props.average} />
    <StatisticLine text="positive" value ={props.positive} />
    </tbody>
  </table>
  )
};

const EmptyState = ({ title }) => {
  return (
    <span>{title}</span>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const title = 'give feedback';
  const statTitle = 'statistics';
  const feedbackSum = good + neutral + bad;
  const averageNumber = feedbackSum / 3;
  const positiveFeedback = (good * 100) / feedbackSum || 0;
  const isFeedbackExist = good > 0 || neutral > 0 || bad > 0;

  const onGoodClick = () => {
    setGood(good + 1);
  };

  const onNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const onBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header name={title} />
      <Button name ={'good'} onClick={onGoodClick} />
      <Button name ={'neutral'} onClick={onNeutralClick} />
      <Button name ={'bad'} onClick={onBadClick} />
      <Header name={statTitle} />
      {isFeedbackExist  && 
      <Statistics good={good} neutral={neutral} bad={bad} all={feedbackSum} average={averageNumber} positive={`${positiveFeedback} %`} />
      }
      {!isFeedbackExist  && 
      <EmptyState title={'No feedback given'} />
    }
    </div>
  )
}

export default App