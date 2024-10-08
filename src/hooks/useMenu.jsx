// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("http://localhost:5000/menus")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //       setLoading(false);
  //     });
  // }, []);

  const {
    data: menu = [],
    isLoading: loading, // Make sure you're returning loading state
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menus");
      return res.data;
    },
  });

  return [menu, loading, refetch];
};

export default useMenu;
