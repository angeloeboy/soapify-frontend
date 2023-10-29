import { useRouter } from "next/router";
import { Button } from "@/styled-components/ItemActionModal";
import DashboardLayout from "@/components/misc/dashboardLayout";
import { useEffect, useState } from "react";
import { getHomeData, getProductStats } from "@/api/home";
import Widget from "@/components/home/widget";
import LineGraph from "@/components/home/linegraph";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  useEffect(() => {
    fetchHomeData();
    fetchProductStats();
  }, []);

  useEffect(() => {
    setSalesData(getSalesData());
    setOrdersData(getOrdersData());
  }, [data]);

  // Calculate top 5 products
  useEffect(() => {
    if (productStats.length > 0) {
      const sortedProducts = [...productStats].sort(
        (a, b) => b.bought_times - a.bought_times
      );
      const top5 = sortedProducts.slice(0, 5);
      setTopProducts(top5);
    }
  }, [productStats]);
  const fetchHomeData = async () => {
    const homeData = await getHomeData();
    console.log(homeData);
    setData(homeData.data);
  };
  const fetchCustomHomeData = async (startDate, endDate) => {
    const homeData = await getHomeData(startDate, endDate);
    setData(homeData.data);
  };
  const fetchProductDates = async () => {
    // Send selected date range to the API for product stats
    const productStatsData = await getProductStats(startDate, endDate);
    setProductStats(productStatsData.data);
  };

  const fetchProductStats = async () => {
    const productStatsData = await getProductStats();
    console.log(productStatsData);
    setProductStats(productStatsData.data); // Update the state with product stats
  };
  const getSalesData = () => {
    let salesData = [];

    let annualSales = {
      title: "Annual Sales",
      value: "P" + data.annual_sales / 100,
    };

    let todaysSales = {
      title: "Today's Sales",
      value: "P" + data.todays_sales / 100,
    };

    salesData.push(annualSales);
    salesData.push(todaysSales);

    return salesData;
  };

  const getOrdersData = () => {
    let ordersData = [];

    let annualOrders = {
      title: "Annual Orders",
      value: data.total_transactions,
    };

    let todaysOrders = {
      title: "Today's Orders",
      value: data.todays_transactions,
    };

    ordersData.push(annualOrders);
    ordersData.push(todaysOrders);

    return ordersData;
  };

  const calculateTotalUnitsSold = () => {
    let totalSold = 0;
    productStats.forEach((product) => {
      totalSold += product.bought_times;
    });
    return totalSold;
  };
  // Handle date selection and data fetching
  const handleDateSelection = () => {
    fetchHomeData();
    fetchProductStats();
  };

  return (
    <DashboardLayout>
      {/* <p>Total Transactions: </p>
			<p>{data.total_transactions}</p>

			<p>Todays Transactions: </p>
			<p>{data.todays_transactions && data.todays_transactions.length}</p> */}
      {/* Date selection input fields */}

      <Widget title="Sales Overview" width="50%" data={salesData} />
      <Widget title="Orders Overview" width="50%" data={ordersData} />
      <div>
        <label style={{ fontWeight: "bold", marginLeft: "16px" }}>
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        />
        <label style={{ fontWeight: "bold" }}>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        />
        <Button onClick={handleDateSelection}>Apply</Button>
      </div>
      <Widget
        title="Units Sold "
        width="25%"
        data={[{ product: "Total", unitsSold: calculateTotalUnitsSold() }]}
      />
      {topProducts.length > 0 && (
        <Widget
          title="Top 5 Products"
          width="50%"
          data={topProducts.map((product, i) => ({
            product: product.product_name,
            unitsSold: product.bought_times,
          }))}
        />
      )}
      {data.annual_sales_stats && (
        <LineGraph annualSalesData={data.annual_sales_stats} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
