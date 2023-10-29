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

export const getProductStats = async () => {
  try {
    const response = await fetch("/api/product/stats/2023/10/23", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
