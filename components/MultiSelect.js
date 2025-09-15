
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const MultiSelect = ({ placeholder, options = [], selectedValues = [], onValuesChange }) => {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (value) => {
    const exists = selectedValues.includes(value);
    const next = exists ? selectedValues.filter(v => v !== value) : [...selectedValues, value];
    onValuesChange && onValuesChange(next);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setOpen(!open)}>
        <Text style={styles.selectorText}>
          {selectedValues.length > 0 ? selectedValues.join(', ') : placeholder}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.listContainer}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 220 }}>
            {options.map((item, idx) => {
              const active = selectedValues.includes(item);
              return (
                <TouchableOpacity key={`${item}-${idx}`} style={styles.option} onPress={() => toggleValue(item)}>
                  <Text style={[styles.optionText, active && styles.optionActive]}>
                    {active ? '✓ ' : ''}{item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    maxHeight: 220,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  optionActive: {
    fontWeight: '600',
  },
});

export default MultiSelect;
