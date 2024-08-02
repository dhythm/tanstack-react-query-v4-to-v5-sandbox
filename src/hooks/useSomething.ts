import { useQuery } from "@tanstack/react-query";

export const useSomething = () => {
  return useQuery({
    queryKey: ["something"],
    queryFn: async () =>
      await (await fetch("https://api.thecatapi.com/v1/images/search")).json(),
  });
};
