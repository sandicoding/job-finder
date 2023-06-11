import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Select = ({ options, selectedValue, onSelect }) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedValue === option.value && styles.selectedOption,
                    ]}
                    onPress={() => onSelect(option.value)}
                >
                    <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    selectedOption: {
        backgroundColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
});

export default Select;
