import { useRouter } from "next/router";
import { Button } from "@/styled-components/ItemActionModal";
import DashboardLayout from "@/components/misc/dashboardLayout";
import { useEffect, useState } from "react";
import { connectToWebSocket, getHomeData } from "@/api/home";
import Widget from "@/components/home/widget";
import ProductPerformance from "@/components/home/productPerformance";
import AnnualSalesGraph from "@/components/home/annualSalesGraph";
import ProductSalesGraph from "@/components/home/productSalesGraph";
import DataVisualization from "@/components/home/newGraph";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    setSalesData(getSalesData());
    setOrdersData(getOrdersData());
  }, [data]);

  const fetchHomeData = async () => {
    const homeData = await getHomeData();
    console.log(homeData);
    setData(homeData.data);
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

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = connectToWebSocket((message) => {
      console.log("Real-time message received:", message);
      // Process the message here (e.g., update state or UI)

      fetchHomeData();
      toast.success("New order received!");
    });

    setWs(webSocket);

    return () => {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: "flex" }}>
        <Widget title="Sales Overview" width="50%" data={salesData} />
        <Widget title="Orders Overview" width="50%" data={ordersData} />
      </div>
      {/* <div style={{ display: "flex" }}>
        {data.annual_sales_stats && (
          <AnnualSalesGraph annualSalesData={data.annual_sales_stats} />
        )}
        <ProductSalesGraph />
      </div> */}
      {/* <ProductPerformance /> */}
      <DataVisualization />
    </DashboardLayout>
  );
};

export default Dashboard;
