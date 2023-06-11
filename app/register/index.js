import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";

import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome, Feather } from "@expo/vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'
import useFetch from '../../hook/useFetch';

const data = [
    { key: 'Canada', value: 'Canada' },
    { key: 'England', value: 'England' },
    { key: 'Pakistan', value: 'Pakistan' },
    { key: 'India', value: 'India' },
    { key: 'NewZealand', value: 'NewZealand' },
]


const Register = () => {
    const router = useRouter();
    const [selected, setSelected] = React.useState("");
    const [birthday, setBirthday] = React.useState(new Date());

    const { data, isLoading, error } = useFetch("information", {});

    console.log(data?.agama)

    const mappingToSelectList = (data) => {
        return data?.map((item) => {
            return {
                key: item?.id,
                value: item?.nama_agama
            }
        })
    }

    const handleSelect = (value) => {
        setSelected(value);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titlePage}>
                    <Text style={styles.titleText}>Register</Text>
                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Name</Text>
                        <View style={styles.wrapper}>
                            <TextInput
                                style={styles.input}
                                // onChangeText={(text) => setSearchTerm(text)}
                                placeholder='Masukan Nama Lengkap'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>No Telpon</Text>
                        <View style={styles.wrapper}>
                            <TextInput
                                style={styles.input}
                                // onChangeText={(text) => setSearchTerm(text)}
                                placeholder='Masukan No Telpon'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Agama</Text>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={mappingToSelectList(data?.agama)}
                            boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                            save="value"
                            placeholder="Pilih Agama"
                        />
                    </View>
                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Tempat Lahir</Text>
                        <View style={styles.wrapper}>
                            <TextInput
                                style={styles.input}
                                // onChangeText={(text) => setSearchTerm(text)}
                                placeholder='Masukan Tempat Lahir'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    titlePage: {
        alignItems: 'flex-start',
        marginLeft: 16,
    },
    titleText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: SIZES.small,
    },
    inputContainter: {
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 20,
        paddingRight: SIZES.small,
        width: '100%',
    },
    labelInput: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
    },
    labelInputAfterSelect: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
        zIndex: -1,
    },
    wrapper: {
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.xSmall,
        width: '100%',
    },
    input: {
        fontFamily: FONT.regular,
        width: "100%",
        height: 45,
        paddingHorizontal: SIZES.medium,
    },
});



export default Register;