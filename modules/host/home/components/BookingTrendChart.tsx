import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get('window');
const CHART_PADDING = 32; // Total horizontal padding (16 * 2)
const CARD_PADDING = 40; // Card internal padding (20 * 2)
const AVAILABLE_WIDTH = screenWidth - CHART_PADDING - CARD_PADDING;

export default function BookingTrendChart({ data }: any) {
  console.log('BookingTrendChart received data:', data);
  
  // Ensure data is properly formatted and sorted by date
  const formatted = React.useMemo(() => {
    console.log('Raw data for formatting:', data);
    
    if (!data || !Array.isArray(data)) {
      console.log('Data is not array or empty');
      return [];
    }
    
    const formattedData = data
      .map((item: any) => ({
        value: item.count || 0,
        label: item.date ? item.date.slice(5) : '',
        date: item.date,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    console.log('Formatted data:', formattedData);
    return formattedData;
  }, [data]);

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (formatted.length === 0) return { total: 0, average: 0, peak: 0 };
    
    const total = formatted.reduce((sum, item) => sum + item.value, 0);
    const average = Math.round(total / formatted.length);
    const peak = Math.max(...formatted.map(item => item.value));
    
    return { total, average, peak };
  }, [formatted]);

  // Calculate dynamic spacing to prevent overflow
  const calculateSpacing = () => {
    if (formatted.length <= 1) return 50;
    // Account for initial and end spacing
    const availableSpace = AVAILABLE_WIDTH - 80; // 40 initial + 40 end spacing
    const spacing = Math.floor(availableSpace / (formatted.length - 1));
    return Math.max(25, Math.min(60, spacing));
  };

  if (!formatted || formatted.length === 0) {
    console.log('No formatted data available');
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="trending-up" size={20} color="#030303" />
          </View>
          <Text style={styles.title}>Booking Trend</Text>
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="analytics-outline" size={40} color="#999" />
          </View>
          <Text style={styles.emptyTitle}>No Booking Data Yet</Text>
          <Text style={styles.emptyDescription}>
            Your booking trends will appear here once you receive bookings
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="trending-up" size={20} color="#030303" />
        </View>
        <Text style={styles.title}>Booking Trend</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={[styles.statCard, styles.statCardMiddle]}>
          <Text style={[styles.statValue, { color: '#FAFAF8' }]}>
            {stats.average}
          </Text>
          <Text style={[styles.statLabel, { color: '#EFEFE7' }]}>Average</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.peak}</Text>
          <Text style={styles.statLabel}>Peak</Text>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <LineChart
          data={formatted}
          
          // Line Style
          thickness={3}
          color="#030303"
          hideDataPoints={false}
          dataPointsColor="#030303"
          dataPointsRadius={5}
          dataPointsHeight={10}
          dataPointsWidth={10}
          
          // Spacing - Critical for preventing overflow
          spacing={calculateSpacing()}
          initialSpacing={30}
          endSpacing={30}
          
          // Y Axis Configuration
          yAxisColor="#E8E8E6"
          yAxisThickness={1}
          yAxisLabelWidth={30}
          yAxisTextStyle={{ 
            color: '#666', 
            fontSize: 11,
            fontFamily: 'Nunito',
            fontWeight: '500',
          }}
          yAxisOffset={0}
          noOfSections={4}
          maxValue={stats.peak + 2}
          
          // X Axis Configuration
          xAxisColor="#E8E8E6"
          xAxisThickness={1}
          xAxisLabelTextStyle={{ 
            color: '#666', 
            fontSize: 10,
            fontFamily: 'Nunito',
            fontWeight: '600',
            textAlign: 'center',
          }}
          xAxisLabelsHeight={25}
          xAxisLabelsVerticalShift={2}
          
          // Grid Configuration
          hideRules={false}
          rulesColor="#F3F4F6"
          rulesThickness={1}
          rulesType="solid"
          showVerticalLines={false}
          
          // Area under line
          areaChart
          startFillColor="rgba(3, 3, 3, 0.08)"
          endFillColor="rgba(3, 3, 3, 0.02)"
          startOpacity={0.8}
          endOpacity={0.2}
          
          // Curved line
          curved
          curveType={1}
          
          // Animation
          isAnimated
          animationDuration={1000}
          animateOnDataChange
          
          // Container - Use calculated width to prevent overflow
          width={AVAILABLE_WIDTH - 10}
          height={180}
          
          // Pointer Config (tooltip on touch)
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: '#030303',
            pointerStripWidth: 1.5,
            pointerColor: '#030303',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any) => {
              return (
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipLabel}>{items[0].label}</Text>
                  <Text style={styles.tooltipValue}>{items[0].value} bookings</Text>
                </View>
              );
            },
          }}
        />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Daily Bookings</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFAF8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E8E8E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E8E8E6',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFEFE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Nunito',
    color: '#030303',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#EFEFE7',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E6',
  },
  statCardMiddle: {
    marginHorizontal: 8,
    backgroundColor: '#030303',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Nunito',
    color: '#030303',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Nunito',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
    overflow: 'hidden', // Prevent overflow
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E6',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#030303',
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Nunito',
    color: '#666',
  },
  tooltipContainer: {
    backgroundColor: '#030303',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Nunito',
    color: '#FAFAF8',
    marginBottom: 2,
  },
  tooltipValue: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Nunito',
    color: '#FAFAF8',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFEFE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Nunito',
    color: '#030303',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Nunito',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});