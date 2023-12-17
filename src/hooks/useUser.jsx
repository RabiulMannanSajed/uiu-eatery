import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });
  return [users, refetch, isPending];
};

export default useUser;
