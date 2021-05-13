import {useQuery} from "react-query";
import {Tweet} from "../interfaces/tweet";

export default function Home() {
  const { data, error, isFetching } = useQuery<{ tweets: Tweet[] }>('tweets')

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Error loaading tweets</h2>
  }

  return null
}
