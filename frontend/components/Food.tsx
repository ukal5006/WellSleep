import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FOODS } from '../constants/apis';
import useAxios from '../hooks/useAxios';
import styled from 'styled-components';

interface Food {
    id: number;
    category: 2; // 2: 음식
    title: string;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
}

const StyledImage = styled(Image)`
    width: 100px;
    height: 100px;
`;

function Food() {
    const { dataFetch, loading, error, data } = useAxios();
    const [foods, setFoods] = useState<Food[] | null>(null);

    useEffect(() => {
        dataFetch('GET', FOODS);
    }, []);

    useEffect(() => {
        if (data !== null) {
            setFoods(data);
        }
    }, [data]);

    return (
        <View>
            <Text>Food</Text>
            {foods &&
                foods.map((food) => (
                    <View key={food.id}>
                        <StyledImage
                            source={{ uri: food.image }}
                            resizeMode="cover" // 이미지 크기 조정 방식
                        />
                        <Text>{food.title}</Text>
                        <Text>{food.content}</Text>
                    </View>
                ))}
        </View>
    );
}
export default Food;
