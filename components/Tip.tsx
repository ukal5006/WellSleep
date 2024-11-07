import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TIP } from '../constants/apis';
import useAxios from '../hooks/useAxios';
import styled from 'styled-components';

interface Tip {
    id: number;
    category: 1; // 1: 팁
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

function Tip() {
    const { dataFetch, loading, error, data } = useAxios();
    const [tips, setTips] = useState<Tip[] | null>(null);

    useEffect(() => {
        dataFetch('GET', TIP);
    }, []);

    useEffect(() => {
        console.log(error);
        console.log(data);
        if (data !== null) {
            console.log(data);
            setTips(data);
        }
    }, [data]);

    return (
        <View>
            <Text>TIP</Text>
            {tips &&
                tips.map((tip) => (
                    <View key={tip.id}>
                        <StyledImage
                            source={{ uri: tip.image }}
                            resizeMode="cover" // 이미지 크기 조정 방식
                        />
                        <Text>{tip.title}</Text>
                        <Text>{tip.content}</Text>
                    </View>
                ))}
        </View>
    );
}
export default Tip;
