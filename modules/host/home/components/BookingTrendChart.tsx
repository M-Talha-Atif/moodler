import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "@/components/ui/text";

const { width: screenWidth } = Dimensions.get('window');

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

  // Calculate dynamic spacing based on data length
  const calculateSpacing = () => {
    if (formatted.length <= 1) return 100;
    const baseSpacing = (screenWidth - 60) / (formatted.length - 1);
    return Math.max(30, Math.min(80, baseSpacing));
  };

  if (!formatted || formatted.length === 0) {
    console.log('No formatted data available');
    return (
      <View style={{ 
        marginBottom: 20, 
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
      }}>
        <Text style={{ color: '#6B7280' }}>No booking data available</Text>
        <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 8 }}>
          Data: {JSON.stringify(data)}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ 
      marginBottom: 20, 
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <Text variant="header" style={{ marginBottom: 16, fontSize: 18 }}>
        Booking Trend
      </Text>

      <LineChart
        data={formatted}
        thickness={3}
        color="#3B82F6"
        hideDataPoints={false}
        dataPointsColor="#3B82F6"
        dataPointsRadius={6}
        spacing={calculateSpacing()}
        initialSpacing={20}
        endSpacing={20}
        
        // Y Axis Configuration
        yAxisColor="#E5E7EB"
        yAxisThickness={1}
        yAxisLabelWidth={40}
        yAxisLabelPrefix=""
        yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
        yAxisOffset={0}
        
        // X Axis Configuration
        xAxisColor="#E5E7EB"
        xAxisThickness={1}
        xAxisLabelTextStyle={{ 
          color: '#6B7280', 
          fontSize: 10,
          textAlign: 'center',
          width: 40
        }}
        xAxisLabelsHeight={30}
        
        // Grid and Background
        hideRules={false}
        rulesColor="#E5E7EB"
        rulesThickness={1}
        rulesType="solid"
        
        // Area under line (optional)
        areaChart
        color1="rgba(59, 130, 246, 0.1)"
        startOpacity={0.1}
        endOpacity={0.1}
        
        // Curved line
        curved
        isAnimated
        animationDuration={1200}
        
        // Container style
        width={screenWidth - 64}
        height={160}
        showVerticalLines={false}
      />
    </View>
  );
}