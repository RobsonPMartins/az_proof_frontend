import api from "./api";

export const getDashboardData = async () => {
  try {
    const { data } = await api.get("/orders");
    
    if (!data || !Array.isArray(data)) {
      console.error("Resposta inesperada da API:", data);
      return null;
    }

    const totalOrders = data.length;
    const totalAmount = data.reduce((sum, order) => sum + (order.payment?.amount || 0), 0);
    const totalSales = data.filter(order => order.status === "Aprovado").length;
    const totalSalesAmount = data
      .filter(order => order.status === "Aprovado")
      .reduce((sum, order) => sum + (order.payment?.amount || 0), 0);
    const averageTicket = totalOrders > 0 ? totalAmount / totalOrders : 0;

    return {
      totalOrders,
      totalAmount,
      totalSales,
      totalSalesAmount,
      averageTicket,
      orders: data,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return null;
  }
};
