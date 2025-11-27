import React from 'react';
import { ScreenHeader } from "@shared/components";
import { Text, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import { Package, Truck, Users, DollarSign, BarChart3, PieChart, MapPin, TrendingUp } from "lucide-react-native";
import { useRelatorioData } from '../hooks/useRelatorioData';
import { FilterHeader } from '../components/filterHeader';
import { StatCard } from '../components/statsCard';
import { ChartSection } from '../components/chartSection';
import { BarChart } from '../components/barChart';
import { StatusList } from '../components/statusList';
import { ProductDistribution } from '../components/productDistribution';
import { RegionList } from '../components/regionList';
import { TrendList } from '../components/trendList';
import { Insights } from '../components/insights';


export const Relatorio: React.FC = () => {
  const {
    estatisticas,
    distribuicaoMensal,
    statusCestas,
    produtosMaisDistribuidos,
    regioesAtendidas,
    tendenciaMensal,
    formatCurrency
  } = useRelatorioData();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Relatórios e Estatísticas" />
      
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$6"
        pb="$16"
        space="md"
      >
        <FilterHeader />

        {/* Cards de Estatísticas Principais */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="md" pb="$4">
            <StatCard
              value={estatisticas.totalCestas}
              label="Total de Cestas"
              icon={Package}
              iconColor="#3B82F6"
              badgeText="+12% vs último período"
            />
            
            <StatCard
              value={estatisticas.cestasEntregues}
              label="Cestas Entregues"
              icon={Truck}
              iconColor="#10B981"
              progressValue={77}
            />
            
            <StatCard
              value={estatisticas.familiasAtendidas}
              label="Famílias Atendidas"
              icon={Users}
              iconColor="#F59E0B"
              badgeText="+8 novas famílias"
            />
            
            <StatCard
              value={formatCurrency(estatisticas.valorTotal)}
              label="Valor Total Distribuído"
              icon={DollarSign}
              iconColor="#8B5CF6"
              secondaryText="Custo médio por cesta: R$ 187,30"
            />
          </HStack>
        </ScrollView>

        {/* Gráficos em Grid */}
        <HStack space="md" flexWrap="wrap">
          <ChartSection title="Distribuição Mensal" icon={BarChart3}>
            <BarChart
              data={distribuicaoMensal.map(item => ({ 
                label: item.mes, 
                value: item.cestas 
              }))} 
            />
          </ChartSection>

          <ChartSection title="Status das Cestas" icon={PieChart}>
            <StatusList items={statusCestas} />
          </ChartSection>
        </HStack>

        {/* Produtos Mais Distribuídos */}
        <ChartSection title="Produtos Mais Distribuídos" icon={Package}>
          <ProductDistribution products={produtosMaisDistribuidos} />
        </ChartSection>

        {/* Regiões Atendidas e Tendência */}
        <HStack space="md" flexWrap="wrap">
          <ChartSection title="Regiões Atendidas" icon={MapPin} minWidth={200}>
            <RegionList regions={regioesAtendidas} />
          </ChartSection>

          <ChartSection title="Tendência Mensal" icon={TrendingUp} minWidth={200}>
            <TrendList items={tendenciaMensal} />
          </ChartSection>
        </HStack>

        <Insights />
      </VStack>
    </ScrollView>
  );
};