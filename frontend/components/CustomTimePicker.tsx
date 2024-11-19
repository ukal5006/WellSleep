import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FONTS } from '../constants/fonts';

interface CustomTimePickerProps {
    onTimeChange: (time: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ onTimeChange }) => {
    const [selectedHour, setSelectedHour] = useState('07');
    const [selectedMinute, setSelectedMinute] = useState('25');
    const [period, setPeriod] = useState('AM');

    // 선택된 시간이 변경될 때 부모 컴포넌트로 알림
    const handleTimeChange = () => {
        console.log('Selected Hour:', selectedHour);
        console.log('Selected Minute:', selectedMinute);
        console.log('Selected Period:', period);
        if (onTimeChange) {
            onTimeChange(`${selectedHour}:${selectedMinute} ${period}`);
        }
    };

    // separator 애니메이션을 위한 상태 및 로직
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();

        return () => {
            blink.stop(); // 컴포넌트가 언마운트될 때 애니메이션 중지
        };
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => {
                    setSelectedHour(value);
                    handleTimeChange();
                }}
                items={Array.from({ length: 12 }, (_, i) => ({
                    label: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`,
                    value: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`,
                }))}
                value={selectedHour}
                placeholder={{ label: 'Select', value: '00' }}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
            />

            <Animated.Text style={[styles.separator, { opacity: fadeAnim }]}>:</Animated.Text>

            <RNPickerSelect
                onValueChange={(value) => {
                    setSelectedMinute(value);
                    handleTimeChange();
                }}
                items={Array.from({ length: 60 }, (_, i) => ({
                    label: i < 10 ? `0${i}` : `${i}`,
                    value: i < 10 ? `0${i}` : `${i}`,
                }))}
                value={selectedMinute}
                placeholder={{ label: 'Select', value: '00' }}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
            />

            <RNPickerSelect
                onValueChange={(value) => {
                    setPeriod(value);
                    handleTimeChange();
                }}
                items={[
                    { label: 'AM', value: 'AM' },
                    { label: 'PM', value: 'PM' },
                ]}
                value={period}
                placeholder={{ label: 'Select', value: '00' }}
                useNativeAndroidPickerStyle={false}
                style={pickerPeriodStyles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DFDEDE',
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 33,
        backgroundColor: 'rgba(245, 245, 245, 0.2)',
    },
    separator: {
        fontSize: 40,
        color: 'white',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 40,
        color: 'white',
        paddingVertical: 12,
        width: 90,
        height: 100,
        textAlign: 'center',
        fontFamily: 'Quicksand_400Regular',
    },
});

const pickerPeriodStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 23,
        color: 'white',
        paddingVertical: 10,
        width: 80,
        textAlign: 'center',
        marginTop: 4,
        fontFamily: 'Quicksand_400Regular',
    },
});

export default CustomTimePicker;
