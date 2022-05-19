import { useLocation } from "react-router-dom";

const useGetCategoryAndAlgo = () => {
  const [, category, algo] = useLocation().pathname.split("/");

  return [category, algo];
};

export default useGetCategoryAndAlgo;
