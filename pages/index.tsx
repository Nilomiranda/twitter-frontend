import {useQuery} from "react-query";
import {useEffect} from "react";

export default function Home() {
  const { status, data, error, isFetching } = useQuery('tweets')

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  return (data as any).tweets.map(tweet => <p>{ tweet.text }</p>)
}
