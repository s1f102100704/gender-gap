import { useSearchParams } from "react-router-dom";

interface useRecentTopicReturn {
  //   whichTopic: URLSearchParams;
  setWhichTopic: (params: { [key: string]: string }) => void;
  selectedTopic: "popular" | "recent";
}
const useRecentTopic = (): useRecentTopicReturn => {
  const [whichTopic, setWhichTopic] = useSearchParams();
  const topicFromUrl = whichTopic.get("selectedTopic") || "popular";

  const isValidTopic = (topic: string | null): topic is "popular" | "recent" =>
    topic === "popular" || topic === "recent";
  const selectedTopic: "popular" | "recent" = isValidTopic(topicFromUrl)
    ? topicFromUrl
    : "popular";
  return { selectedTopic, setWhichTopic };
};
export default useRecentTopic;
