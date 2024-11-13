import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import useAxios from '../../../hooks/useAxios';
import { FOODS, TIP, VIDEOS } from '../../../constants/apis';
import Youtube from '../../../components/Youtube';

const SleepLabContainer = styled(View)`
    background-color: #201d1d;
    flex: 1;
    align-items: center;
`;

const TitleWrapper = styled(View)`
    width: 90%;
    padding: 20px 0px;
`;

const Title = styled(Text)`
    color: white;
    font-size: 25px;
    font-weight: bold;
`;

const ContentWrapper = styled(View)`
    background-color: #454545;
    width: 90%;
    padding: 20px 10px;
    height: 35%;
    border-radius: 20px;
`;

const ContentImg = styled(Image)`
    width: 100%;
    height: 60%;

    margin-bottom: 20px;
    border-radius: 20px;
`;

const ContentInfo = styled(ScrollView)`
    width: 90%;
`;

const ContentTitle = styled(Text)`
    color: white;
    margin-bottom: 10px;
`;

const ContentText = styled(Text)`
    color: white;
`;

const CategoryConatiner = styled(View)`
    width: 90%;
    flex-direction: row;
    justify-content: space-evenly;
`;

const CategoryItemWrapper = styled(TouchableOpacity)`
    width: 30%;
    height: 50px;
    background-color: #454545;
    flex-direction: row;
    align-items: center;
`;

const PinkBar = styled(View)`
    background-color: #ffd7e3;
    height: 100%;
    width: 10px;
    margin-right: 10px;
`;

const CategoryItem = styled(Text)`
    color: white;
    font-size: 17px;
    font-weight: bold;
`;

const ListWrapper = styled(View)`
    width: 90%;
    padding: 20px 10px;
    flex: 1;
`;

const ScrollContainer = styled(ScrollView)`
    background-color: #454545;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
    border-radius: 15px;
`;

const ListItemWrapper = styled(TouchableOpacity)`
    margin-top: 20px;
    height: 60px;
    justify-content: center;
`;

const ListItem = styled(Text)`
    color: white;
    font-size: 17px;
    font-weight: bold;
`;

function SleepLab() {
    const [category, setCategory] = useState('tip');
    const [categoryData, setCategoryData] = useState<any>([]);
    const [selectedData, setSelectedData] = useState<any>();
    const { dataFetch, loading, error, data } = useAxios();

    const handleCategory = (cate: string) => {
        setCategory(cate);
    };

    useEffect(() => {
        dataFetch('GET', TIP);
    }, []);

    useEffect(() => {
        if (data) {
            console.log(data);
            setCategoryData(data);
        }
    }, [data]);

    useEffect(() => {
        if (categoryData.length > 0) {
            setSelectedData(categoryData[0]);
        }
    }, [categoryData]);

    useEffect(() => {
        console.log('카테고리 변경');
        if (category === 'tip') {
            dataFetch('GET', TIP);
        } else if (category === 'food') {
            dataFetch('GET', FOODS);
        } else {
            dataFetch('GET', VIDEOS);
        }
    }, [category]);
    return (
        <SleepLabContainer>
            <TitleWrapper>
                <Title>수면 연구소</Title>
            </TitleWrapper>
            <ContentWrapper>
                {category === 'youtube' ? (
                    <Youtube videoId={selectedData?.videoId} />
                ) : (
                    <>
                        <ContentImg
                            source={{
                                uri: selectedData?.image,
                            }}
                        />
                        <ContentInfo>
                            <ContentTitle>{selectedData?.title}</ContentTitle>
                            <ContentText>{selectedData?.content}</ContentText>
                        </ContentInfo>
                    </>
                )}
            </ContentWrapper>
            <TitleWrapper>
                <Title>주제 탐색하기</Title>
            </TitleWrapper>
            <CategoryConatiner>
                <CategoryItemWrapper onPress={() => handleCategory('tip')}>
                    <PinkBar />
                    <CategoryItem>수면 팁</CategoryItem>
                </CategoryItemWrapper>
                <CategoryItemWrapper onPress={() => handleCategory('food')}>
                    <PinkBar />
                    <CategoryItem>수면 음식</CategoryItem>
                </CategoryItemWrapper>
                <CategoryItemWrapper onPress={() => handleCategory('youtube')}>
                    <PinkBar />
                    <CategoryItem>유튜브</CategoryItem>
                </CategoryItemWrapper>
            </CategoryConatiner>
            <ListWrapper>
                <ScrollContainer>
                    {categoryData?.map((e: any) => (
                        <ListItemWrapper
                            key={e.title}
                            onPress={() => {
                                console.log(e);
                                setSelectedData(e);
                            }}
                        >
                            <ListItem>{e.title}</ListItem>
                        </ListItemWrapper>
                    ))}
                </ScrollContainer>
            </ListWrapper>
        </SleepLabContainer>
    );
}

export default SleepLab;
