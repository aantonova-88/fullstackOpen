import { useState } from 'react';

const Header = ({ title }) => {
  return (
   <h1>{title}</h1>
  )
};

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
};

const Content = ({ anecdote, vote }) => {
  return (
    <>
    <div>{anecdote}</div>
    <div>has {vote} votes</div>
    </>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const zeroFilledArray = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(zeroFilledArray);
  const maxVote = Math.max(...vote);
  const anecdoteWithMaxVote = anecdotes[vote.indexOf(maxVote)];
  
  const handleClickVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
  };

  const handleClickNext = () => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    } while (randomNumber === selected); 
    setSelected(randomNumber);
  };

  return (
    <>
      <Header title={'Anecdote of the day'} />
      <Content anecdote={anecdotes[selected]} vote={vote[selected]} />
      <Button onClick={handleClickVote} name={'vote'} />
      <Button onClick={handleClickNext} name={'next anecdote'} />
      {maxVote > 0 && (
        <>
          <Header title={'Anecdote with most votes'} />
          <Content anecdote={anecdoteWithMaxVote} vote={maxVote} />
        </>
      )}
    </>
  )
}

export default App;