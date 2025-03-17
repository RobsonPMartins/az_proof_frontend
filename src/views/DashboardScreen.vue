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
          <div class="user-icon">
            <!-- aqui -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </header>

      <div class="resumo">
        <h2>Resumo dos pedidos</h2>
      </div>

      <section class="summary">
        <div class="summary-card">
          <span class="icon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E6529C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
          </span>
          <div>
            <h3>{{ dashboard.totalOrders }} Pedidos</h3>
            <p>R$ {{ formatCurrency(dashboard.totalAmount) }}</p>
          </div>
        </div>
        <div class="summary-card">
          <span class="icon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5BDAB7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
          </span>
          <div>
            <h3>{{ dashboard.totalSales }} Vendas</h3>
            <p>R$ {{ formatCurrency(dashboard.totalSalesAmount) }}</p>
          </div>
        </div>
        <div class="summary-card">
          <span class="icon3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#66C1E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          </span>
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

.icon-lucide-user{
  color: black;
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
.resumo h2{
  color: var(--gray-color2);
  font-family: Arial, Helvetica, sans-serif;
}
.summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem;
}

.summary-card {
  min-width: 340px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.icon1 {
  display: flex;
  justify-content: center;
  width: 50px;
  background-color: var(--secondary-color);
  padding: 10px;
  border-radius: 100%;
}
.icon2 {
  display: flex;
  justify-content: center;
  width: 50px;
  background-color: var(--tertinary-color);
  padding: 10px;
  border-radius: 100%;
}
.icon3 {
  display: flex;
  justify-content: center;
  width: 50px;
  background-color: var(--quaternay-color);
  padding: 10px;
  border-radius: 100%;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--gray-color2);
}

p {
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

/* Responsivo */
@media (max-width: 600px) {
  .summary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .summary-card {
    min-width: auto;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }
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
