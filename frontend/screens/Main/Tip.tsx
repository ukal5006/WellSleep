import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import TipBox from '../../components/Tipbox';
import styled from 'styled-components';

const TipContainer = styled(ScrollView)``;

function Tip() {
    const food = ['음식 1', '음식 2', '음식 3']; // 예시 데이터
    const sols = ['방법 1', '방법 2', '방법 3']; // 예시 데이터

    const [selectedCategory, setSelectedCategory] = useState<string>('food'); // 초기값을 "food"로 설정

    return (
        <TipContainer>
            <Text>수면 지원 센터</Text>
            <View>
                <Image source={require('../../assets/kiwi.png')} />
                <Text>키위, 세로토닌과 항산화 성분으로 숙면을 돕는 과일</Text>
            </View>
            <Text>주제 탐색하기</Text>

            <View>
                <TouchableOpacity onPress={() => setSelectedCategory('food')}>
                    <Text>음식</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCategory('sols')}>
                    <Text>방법</Text>
                </TouchableOpacity>
            </View>

            {/* 선택된 카테고리에 따라 TipBox 렌더링 */}
            {selectedCategory === 'food' && food.map((item, index) => <TipBox key={index} title={item} />)}
            {selectedCategory === 'sols' && sols.map((item, index) => <TipBox key={index} title={item} />)}
        </TipContainer>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#000',
//     },
//     header: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginTop: 110,
//         marginBottom: 25,
//     },
//     description: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginHorizontal: 26,
//         marginTop: 14,
//         marginBottom: 25,
//     },
//     header2: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginTop: 30,
//         marginBottom: 25,
//     },
//     box: {
//         width: 340,
//         height: 337,
//         backgroundColor: '#333',
//         alignSelf: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//     },
//     image: {
//         width: 276,
//         height: 162,
//         borderRadius: 12,
//         marginTop: 35,
//     },
//     smallbox: {
//         width: 160,
//         height: 63,
//         backgroundColor: '#333',
//         justifyContent: 'center',
//         borderLeftWidth: 7,
//         borderLeftColor: 'pink',
//     },
//     smallboxText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginLeft: 10,
//     },
//     row: {
//         flexDirection: 'row',
//         gap: 12,
//     },
// });

export default Tip;
