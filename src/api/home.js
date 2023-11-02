export const getHomeData = async () => {
  try {
    const response = await fetch("/api/home", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductStats = async (id, year) => {
  try {
    const response = await fetch(`/api/product/${id}/stats/${year}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
