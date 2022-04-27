import axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Chart from "../components/dashboard/Chart";
import DashboardWidget from "../components/dashboard/DashboardWidget";
import EmployeesChart from "../components/dashboard/EmployeesChart";

const Dashboard = () => {
  const [statisticsProducs, setStatisticsProducs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => setStatisticsProducs(response.data))
      .catch((err) => console.log(err));
  }, []);

  let priceAll = 0;
  statisticsProducs.map(
    (product) => (priceAll = Number(product.data.price * product.data.stock) + priceAll)
  );

  let productAll = 0;
  statisticsProducs.map(
    (product) => (productAll = Number(product.data.stock) + productAll)
  );

  return (
    <>
      <div className="row">
        <DashboardWidget
          title="تعداد فروش"
          icon="shopping-cart"
          value={productAll}
          color="bg-gradient-danger"
        />
        <DashboardWidget
          title="مبلغ فروش"
          icon="shopping-cart"
          value={`${new Intl.NumberFormat().format(priceAll)}`}
          color="bg-gradient-info"
        />
        <DashboardWidget
          title="تعداد محصولات"
          icon="shopping-cart"
          value={statisticsProducs.length}
          color="bg-gradient-success"
        />
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <EmployeesChart />
        </div>
        <div className="col-md-6">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
