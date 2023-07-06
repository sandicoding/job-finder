import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";

import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome, Feather } from "@expo/vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'
import useFetch from '../../hook/useFetch';
import DateTimePicker from '@react-native-community/datetimepicker';

const data = [
    { key: 'Canada', value: 'Canada' },
    { key: 'England', value: 'England' },
    { key: 'Pakistan', value: 'Pakistan' },
    { key: 'India', value: 'India' },
    { key: 'NewZealand', value: 'NewZealand' },
]


const Register = () => {
    const router = useRouter();
    const [selected, setSelected] = React.useState({
        agama: '',
        jenisKelamin: ''
    });
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [agama, setAgama] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('')

    const { data, isLoading, error } = useFetch("information", {});
    console.log()

    const mappingToSelectListAgama = (data) => {
        return data?.map((item) => {
            return {
                key: item?.id,
                value: item?.nama_agama
            }
        })
    }

    const mappingToSelectListJenisKelamin = (data) => {
        return data?.map((item) => {
            return {
                key: item?.id,
                value: item?.jenis_kelamin
            }
        })
    }

    const findValueSelectListAgama = (data, value) => {
        const result = data?.find((item) => item?.nama_agama === value)
        return result
    }

    const findValueSelectListJenisKelamin = (data, value) => {
        const result = data?.find((item) => item?.jenis_kelamin === value)
        return result
    }

    const handleSelectAgama = (value) => {
        setSelected(val => ({ ...val, agama: findValueSelectListAgama(data?.agama, value)?.id }));
    };

    const handleSelectJenisKelamin = (value) => {
        setSelected(val => ({ ...val, jenisKelamin: findValueSelectListJenisKelamin(data?.jenkel, value)?.id }));
    };

    console.log(selected)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setOpen(false)
        setDate(currentDate);
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
                        <Text style={styles.labelInput}>Jenis Kelamin</Text>
                        <SelectList
                            setSelected={(val) => handleSelectJenisKelamin(val)}
                            data={mappingToSelectListJenisKelamin(data?.jenkel)}
                            boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                            save="value"
                            placeholder="Jenis Kelamin"
                        />
                    </View>
                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Agama</Text>
                        <SelectList
                            setSelected={(val) => handleSelectAgama(val)}
                            data={mappingToSelectListAgama(data?.agama)}
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

                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Tanggal Lahir</Text>
                        <View style={styles.wrapper}>
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <TextInput

                                    style={styles.input}
                                    // onChangeText={(text) => setSearchTerm(text)}
                                    value={date?.toDateString()}
                                    placeholder='Tanggal Lahir'
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {open && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.inputContainter}>
                        <Text style={styles.labelInput}>Alamat</Text>
                        <View style={styles.wrapper}>
                            <TextInput
                                style={styles.input}
                                // onChangeText={(text) => setSearchTerm(text)}
                                placeholder='Alamat'
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                    </View>

                    <View style={styles.infoParent}>
                        <Text style={styles.infoText}>Biodata Orang Tua</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: COLORS.grey20,
        borderWidth: 1,
    },
    textArea: {
        height: 150,
    },
    titlePage: {
        alignItems: 'flex-start',
        marginLeft: 16,
        marginBottom: 40,
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
    infoParent: {
        alignItems: 'flex-start',
        marginTop: 20,
    },
    infoText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: SIZES.small,
    },
});



export default Register;