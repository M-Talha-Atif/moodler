import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";

interface State {
  hasError: boolean;
  error: any;
  info: any;
  expanded: boolean[];
}

class ErrorBoundary extends React.Component<{}, State> {
  state: State = { hasError: false, error: null, info: null, expanded: [] };

  componentDidCatch(error: any, info: any) {
    console.log("🔥 Caught by ErrorBoundary:", error);
    console.log("📌 Component Stack:", info?.componentStack);

    const stackLines = info?.componentStack?.split("\n") || [];
    this.setState({ hasError: true, error, info, expanded: Array(stackLines.length).fill(false) });
  }

  toggleLine = (index: number) => {
    const expanded = [...this.state.expanded];
    expanded[index] = !expanded[index];
    this.setState({ expanded });
  };

  getFormattedStack = () => {
    const error = String(this.state.error);
    const stack = this.state.info?.componentStack || "";
    const cleanedStack = stack.replace(/http:\/\/.*?\/node_modules\/.*?bundle\?.*?:/g, "");
    return `ERROR:\n${error}\n\nSTACK:\n${cleanedStack}`;
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const stackLines = this.state.info?.componentStack?.split("\n") || [];

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title} selectable>
          App Crashed
        </Text>

        <Text style={styles.error} selectable>
          {String(this.state.error)}
        </Text>

        <Text style={styles.stackTitle}>Component Stack (tap to expand):</Text>

        {stackLines.map((line, idx) => {
          const isExpanded = this.state.expanded[idx];
          const cleanedLine = line.replace(/http:\/\/.*?\/node_modules\/.*?bundle\?.*?:/g, "");

          return (
            <TouchableOpacity key={idx} onPress={() => this.toggleLine(idx)}>
              <Text style={styles.stackLine} selectable>
                {isExpanded ? cleanedLine : cleanedLine.slice(0, 80) + (cleanedLine.length > 80 ? "..." : "")}
              </Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.fullStack} selectable>
          {this.getFormattedStack()}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { color: "red", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  error: { fontSize: 16, color: "#111", marginBottom: 20 },
  stackTitle: { fontWeight: "bold", marginBottom: 10 },
  stackLine: { fontSize: 14, lineHeight: 20, marginBottom: 5 },
  fullStack: { marginTop: 20, fontSize: 12, color: "#333" },
});

export default ErrorBoundary;
