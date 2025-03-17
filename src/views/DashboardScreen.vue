<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <img src="../assets/logo.svg" alt="Logo">
      </div>
      <nav>
        <button class="btn-sidebar">Dashboard</button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="header">
        <div class="user-info">
          <div class="user-info-01">
            <span>Olá,</span><span><strong>Gabriel</strong></span>
          </div>
          <div class="user-icon">👤</div>
        </div>
      </header>

      <div class="resumo">
        <h2>Resumo dos pedidos</h2>
      </div>

      <section class="summary">
        <div class="summary-card">
          <span class="icon1">📄</span>
          <div>
            <h3>{{ dashboard.totalOrders }} Pedidos</h3>
            <p>R$ {{ formatCurrency(dashboard.totalAmount) }}</p>
          </div>
        </div>
        <div class="summary-card">
          <span class="icon2">💰</span>
          <div>
            <h3>{{ dashboard.totalSales }} Vendas</h3>
            <p>R$ {{ formatCurrency(dashboard.totalSalesAmount) }}</p>
          </div>
        </div>
        <div class="summary-card">
          <span class="icon3">📊</span>
          <div>
            <h3>Ticket médio</h3>
            <p>R$ {{ formatCurrency(dashboard.averageTicket) }}</p>
          </div>
        </div>
      </section>

      <section class="orders">
        <table>
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>ID na Loja</th>
              <th>Criação</th>
              <th>Nome do Cliente</th>
              <th>CPF/CNPJ</th>
              <th>Status do Pedido</th>
              <th>Status do Pagamento</th>
              <th>Método de Pagamento</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in dashboard.orders" :key="order._id">
              <td>{{ order._id }}</td>
              <td>{{ order.seller?.id || '-' }}</td>
              <td>{{ formatDate(order.createdAt) }}</td>
              <td>{{ order.customer?.name || 'Não informado' }}</td>
              <td>{{ order.customer?.doc || 'Não informado' }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.payment?.status || 'N/A' }}</td>
              <td>{{ order.payment?.method || 'N/A' }}</td>
              <td>R$ {{ formatCurrency(order.payment?.amount || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getDashboardData } from "../services/dashboardService";

export default {
  setup() {
    const dashboard = ref({
      totalOrders: 0,
      totalAmount: 0,
      totalSales: 0,
      totalSalesAmount: 0,
      averageTicket: 0,
      orders: [],
    });

    const loadDashboard = async () => {
      const data = await getDashboardData();
      if (data) {
        dashboard.value = data;
      }
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("pt-BR");
    };

    onMounted(loadDashboard);

    return { dashboard, formatCurrency, formatDate };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  flex-wrap: wrap;
}

.sidebar {
  width: 250px;
  background-color: var(--white-color);
  color: var(--white-color);
  padding: 20px;
  flex-shrink: 0;
  transition: width 0.3s ease;
}

.btn-sidebar {
  background-color: var(--primary-color);
  padding: 15px 65px;
  border: none;
  border-radius: 5px;
  color: var(--white-color);
  width: 100%;
}

.main-content {
  background-color: #f4f4f4;
  flex: 1;
  padding: 0;
  box-sizing: border-box;

}
.user-info{
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
}
.user-icon{
   border: 2px solid var(--primary-color);
   background-color: var(--primary-color);
   padding: 10px;
   border-radius: 50%;
}
.user-info-01{
  display: flex;
  flex-direction: column;
  text-align: end;
  margin-right: 10px;
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background-color: var(--white-color);
  margin-left: 5px;
}
.resumo{
  padding: 10px 20px;
}
.summary {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 130px;
}

.summary-card {
  padding: 25px;
  background: var(--white-color);
  border-radius: 8px;
  margin-bottom: 20px;
  min-width: 250px;
}
.summary-card .icon1{
   border: 2px solid var(--secondary-color);
   background-color: var(--secondary-color);
   padding: 20px;
   border-radius: 50%;
   margin-bottom: 15px;
}
.summary-card .icon2{
   border: 2px solid var(--tertinary-color);
   background-color: var(--tertinary-color);
   padding: 20px;
   border-radius: 50%;
   margin-bottom: 15px;
}
.summary-card .icon3{
   border: 2px solid var(--quaternay-color);
   background-color: var(--quaternay-color);
   padding: 20px;
   border-radius: 50%;
   margin-bottom: 15px;
}
.summary-card h3{
  margin-top: 25px;
}
.orders table {
  border-collapse: collapse;
  margin: 20px 20px 20px 20px;
  background-color: var(--white-color);
}

.orders th, .orders td {
  padding: 10px;
  border-bottom: 1px solid var(--gray-color);
}

.orders th {
  background-color: var(--primary-color);
  color: var(--white-color);
  text-align: start;
}

/* Media Queries */
@media (max-width: 1024px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 10px;
    position: relative;
    display: none;
  }

  .btn-sidebar {
    padding: 12px 45px;
  }

  .summary {
    display: flex;
    gap: 15px;
  }

  .summary-card {
    margin-bottom: 10px;
  }

  .orders th, .orders td {
    font-size: 14px;
    padding: 8px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    padding: 10px;
    display: none;
  }

  .main-content {
    padding: 15px;
  }
  .summary {
    display: flex;
    gap: 15px;
  }

  .summary-card {
    padding: 15px;
    min-width: 100%;
  }

  .orders th, .orders td {
    font-size: 14px;
    padding: 8px;
  }

  .orders th {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    padding: 5px;
  }

  .main-content {
    padding: 10px;
  }

  .summary{
    display: flex;
  }
  .summary-card {
    padding: 10px;
    min-width: 100%;
  }

  .orders th, .orders td {
    font-size: 12px;
    padding: 6px;
  }

  .summary-card h3 {
    font-size: 16px;
  }

  .summary-card p {
    font-size: 14px;
  }

  .orders th, .orders td {
    font-size: 12px;
    padding: 6px;
  }
}

</style>
