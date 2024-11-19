import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import useAxios from "../../../hooks/useAxios";
import { FOODS, TIP, VIDEOS } from "../../../constants/apis";
import Youtube from "../../../components/Youtube";

const SleepLabContainer = styled(View)`
  background-color: #201d1d;
  flex: 1;
  align-items: center;
  padding-bottom: 100px;
`;

const TitleWrapper = styled(View)`
  width: 100%;
  padding: 20px;
  margin-top: 70px;
`;

const Title = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

const ContentWrapper = styled(View)`
  background-color: #363636;
  width: 90%;
  padding: 20px 18px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const ContentImg = styled(Image)`
  width: 100%;
  height: 220px;
  margin-bottom: 20px;
  border-radius: 15px;
`;

const ContentInfo = styled(View)`
  width: 90%;
`;

const ContentTitle = styled(Text)`
  color: white;
  margin-bottom: 10px;
  font-size: 23px;
`;

const ContentText = styled(Text)`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
`;

const TitleWrapper2 = styled(View)`
  width: 100%;
  padding: 20px;
  margin-top: 45px;
`;

const CategoryContainer = styled(View)`
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 8px;
`;

const CategoryItemWrapper = styled(TouchableOpacity)`
  width: 30%;
  height: 55px;
  background-color: #363636;
  flex-direction: row;
  align-items: center;
`;

const PinkBar = styled(View)`
  background-color: #ffd7e3;
  height: 100%;
  width: 6px;
  margin-right: 10px;
`;

const CategoryItem = styled(Text)`
  color: white;
  font-size: 16px;
`;

const ListWrapper = styled(View)`
  width: 90%;
  padding: 20px 10px;
  margin-bottom: 100px;
`;

const ListContainer = styled(View)`
  background-color: #363636;
  width: 100%;
  padding: 0px 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
`;

const ListItemWrapper = styled(TouchableOpacity)`
  margin-top: 15px;
  margin-bottom: 20px;
  justify-content: center;
`;

const ListItem = styled(Text)`
  color: white;
  font-size: 17px;
`;

function SleepLab() {
  const [category, setCategory] = useState("tip");
  const [categoryData, setCategoryData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>();
  const { dataFetch, loading, error, data } = useAxios();

  const handleCategory = (cate: string) => {
    setCategory(cate);
  };

  useEffect(() => {
    dataFetch("GET", TIP);
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
    console.log("카테고리 변경");
    if (category === "tip") {
      dataFetch("GET", TIP);
    } else if (category === "food") {
      dataFetch("GET", FOODS);
    } else {
      dataFetch("GET", VIDEOS);
    }
  }, [category]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SleepLabContainer>
        <TitleWrapper>
          <Title>수면 연구소</Title>
        </TitleWrapper>
        <ContentWrapper>
          {category === "youtube" ? (
            <Youtube
              videoId={selectedData?.videoId}
              title={selectedData?.title}
              content={selectedData?.content}
            />
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
        <TitleWrapper2>
          <Title>주제 탐색하기</Title>
        </TitleWrapper2>
        <CategoryContainer>
          <CategoryItemWrapper onPress={() => handleCategory("tip")}>
            <PinkBar />
            <CategoryItem>수면 팁</CategoryItem>
          </CategoryItemWrapper>
          <CategoryItemWrapper onPress={() => handleCategory("food")}>
            <PinkBar />
            <CategoryItem>수면 음식</CategoryItem>
          </CategoryItemWrapper>
          <CategoryItemWrapper onPress={() => handleCategory("youtube")}>
            <PinkBar />
            <CategoryItem>유튜브</CategoryItem>
          </CategoryItemWrapper>
        </CategoryContainer>
        <ListWrapper>
          <ListContainer>
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
          </ListContainer>
        </ListWrapper>
      </SleepLabContainer>
    </ScrollView>
  );
}

export default SleepLab;
