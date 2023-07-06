import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import useFetch from "../hook/useFetch";

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, refetch, isLoading, error } = useFetch("registrations", {});

  const [result, setResult] = useState([]);

  const handleRefresh = () => {
    refetch()
  }

  const handleSearch = () => {
    if (searchTerm) {
      // ** filter data
      const filteredData = data.filter((item) =>
        item.peserta?.nama?.toLowerCase().includes(searchTerm?.toLowerCase())
      );

      setResult(filteredData);
    } else {
      setResult(data);
    }
  }

  console.log('data', data)

  useEffect(() => {
    handleSearch()
  }, [searchTerm, data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          // ),
          headerTitle: "",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />

          {/* <Popularjobs /> */}
          <Nearbyjobs data={searchTerm ? result : data} isLoading={isLoading} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
