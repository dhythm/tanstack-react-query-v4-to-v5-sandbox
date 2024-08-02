import { useQuery } from "@tanstack/react-query";

export const useSomething = () => {
  return useQuery({
    queryKey: ["something"],
    queryFn: async () => {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      return data;
    },
  });
};
