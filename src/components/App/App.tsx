
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStatus/VoteStatus';
import Notification from '../Notification/Notification';

import type { Votes } from '../../types/vote';


import { useState } from "react";


export default function App() {

const [votes, SetVotes] = useState<Votes>({
  good: 0,
	neutral: 0,
	bad: 0
})

const HandleVote = (key: keyof Votes) => {
  SetVotes ({
    ...votes, 
    [key]: votes[key] + 1,
  });
}

const resetVotes = () => {
  SetVotes ({ good: 0, neutral: 0, bad: 0 });
  };

const totalVotes = votes.good + votes.neutral + votes.bad;
const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;


  return (
    <div className={css.app}>
      <CafeInfo/>
      <VoteOptions
  onVote={HandleVote}
  onReset={resetVotes}
  canReset={totalVotes > 0 ? true : false}/>

{totalVotes > 0 ? <VoteStats
  votes={votes}
  totalVotes={totalVotes}
  positiveRate={positiveRate}
/> : <Notification/>}
    </div>
  );
}

    
