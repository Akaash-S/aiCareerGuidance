
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Dropdown = ({ placeholder, options = [], selectedValue, onValueChange }) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value) => {
    onValueChange && onValueChange(value);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setOpen(!open)}>
        <Text style={styles.selectorText}>
          {selectedValue || placeholder}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.listContainer}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
            {options.map((item, idx) => (
              <TouchableOpacity key={`${item}-${idx}`} style={styles.option} onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
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
    maxHeight: 180,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
