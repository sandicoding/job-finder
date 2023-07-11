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
    const [loading, setLoading] = React.useState(false)
    const [selected, setSelected] = React.useState({
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        no_telp: '',
        id_agama: '',
        id_jenis_kelamin: '',
        id_pekerjaan_ayah: '',
        id_penghasilan_ayah: '',
        id_pekerjaan_ibu: '',
        id_penghasilan_ibu: '',
        no_telp_ortu: '',
        nama_ayah: '',
        nama_ibu: '',
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

    const mappingToSelectListPekerjaan = (data) => {
        return data?.map((item) => {
            return {
                key: item?.id,
                value: item?.nama_pekerjaan
            }
        })
    }

    const mappingToSelectListPenghasilan = (data) => {
        return data?.map((item) => {
            return {
                key: item?.id,
                value: item?.penghasilan_ortu
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

    const findValueSelectListPekerjaan = (data, value) => {
        const result = data?.find((item) => item?.nama_pekerjaan === value)
        return result
    }

    const findValueSelectListPenghasilan = (data, value) => {
        const result = data?.find((item) => item?.penghasilan_ortu === value)
        return result
    }

    const handleSelectAgama = (value) => {
        setSelected(val => ({ ...val, id_agama: findValueSelectListAgama(data?.agama, value)?.id }));
    };

    const handleSelectJenisKelamin = (value) => {
        setSelected(val => ({ ...val, id_jenis_kelamin: findValueSelectListJenisKelamin(data?.jenkel, value)?.id }));
    };

    const handleSelectPekerjaan = (value, type) => {
        if (type === 'ayah') {
            setSelected(val => ({ ...val, id_pekerjaan_ayah: findValueSelectListPekerjaan(data?.pekerjaan_ortu, value)?.id }));
        } else {
            setSelected(val => ({ ...val, id_pekerjaan_ibu: findValueSelectListPekerjaan(data?.pekerjaan_ortu, value)?.id }));
        }
    };

    const handleSelectPenghasilan = (value, type) => {
        if (type === 'ayah') {
            setSelected(val => ({ ...val, id_penghasilan_ayah: findValueSelectListPenghasilan(data?.hasil_ortu, value)?.id }));
        } else {
            setSelected(val => ({ ...val, id_penghasilan_ibu: findValueSelectListPenghasilan(data?.hasil_ortu, value)?.id }));
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setOpen(false)
        setDate(currentDate);

        // ** Format Date YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        const date = `${year}-${month}-${day}`

        setSelected(val => ({ ...val, tanggal_lahir: date }))
    };


    const validate = (name, nameRequest) => {
        if (nameRequest === '') {
            alert(`${name} tidak boleh kosong.`)
        }
    }

    const handleRegister = () => {
        console.log(selected)
        setLoading(true)
        fetch(`http://192.168.1.15:81/ppdb-v4/public/api/registration`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selected)
        })
            .then((response) => JSON.stringify(response.json()))
            .then((responseData) => {
                console.log("response: " + responseData);
                setLoading(false)
                alert('Pendaftaran Berhasil')
                setSelected({
                    nama: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    alamat: '',
                    no_telp: '',
                    id_agama: '',
                    id_jenis_kelamin: '',
                    id_pekerjaan_ayah: '',
                    id_penghasilan_ayah: '',
                    id_pekerjaan_ibu: '',
                    id_penghasilan_ibu: '',
                    no_telp_ortu: '',
                    nama_ayah: '',
                    nama_ibu: '',
                })
                setDate(new Date())
                router.push('/')
            })
            .catch((err) => { console.log(err); });

    }

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
                <View style={styles.container}>
                    <View style={styles.titlePage}>
                        <Text style={styles.titleText}>Form Daftar Siswa Baru</Text>
                        <Text>Note : Harus Diisi Semua Input</Text>
                        <Text style={styles.titleText}>Alur Pendaftaran :</Text>
                        <Text>1. Isi Formulir Pendaftaran</Text>
                        <Text>Desc : Isi Formulir Pendaftaran Siswa Baru dengan benar</Text>
                        <Text>2. Menyerahkan Berkas</Text>
                        <Text>Desc : Calon peserta didik mempersiapkan beberapa dokumen penting yang dibutuhkan untuk memverifikasi data</Text>
                        <Text>3. Verifikasi Berkas</Text>
                        <Text>Desc :Operator akan melakukan verifikasi pengajuan akun dan berkas secara online</Text>
                        <Text>4. Pengumuman</Text>
                        <Text>Desc : Pengumuman akan diumumkan di aplikasi ini</Text>
                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Name</Text>
                            <View style={styles.wrapper}>
                                <TextInput
                                    value={selected?.nama}
                                    style={styles.input}
                                    onChangeText={(text) => setSelected(val => ({ ...val, nama: text }))}
                                    placeholder='Masukan Nama Lengkap'
                                />
                            </View>
                        </View>
                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>No Telpon</Text>
                            <View style={styles.wrapper}>
                                <TextInput
                                    style={styles.input}
                                    value={selected?.no_telp}
                                    onChangeText={(text) => setSelected(val => ({ ...val, no_telp: text }))}
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
                                    value={selected.tempat_lahir}
                                    onChangeText={(text) => setSelected(val => ({ ...val, tempat_lahir: text }))}
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
                                    value={selected.alamat}
                                    style={styles.input}
                                    onChangeText={(text) => setSelected(val => ({ ...val, alamat: text }))}
                                    placeholder='Alamat'
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                        </View>

                        <View style={styles.infoParent}>
                            <Text style={styles.infoText}>Biodata Orang Tua</Text>
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Nama Orang Tua ayah</Text>
                            <View style={styles.wrapper}>
                                <TextInput
                                    value={selected?.nama_ayah}
                                    style={styles.input}
                                    onChangeText={(text) => setSelected(val => ({ ...val, nama_ayah: text }))}
                                    placeholder='Nama Orang Tua ayah'
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Pekerjaan Orang Tua ayah</Text>
                            <SelectList
                                setSelected={(val) => handleSelectPekerjaan(val, 'ayah')}
                                data={mappingToSelectListPekerjaan(data?.pekerjaan_ortu)}
                                boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                                save="value"
                                placeholder="Pilih Pekerjaan"
                            />
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Penghasilan Orang Tua ayah</Text>
                            <SelectList
                                setSelected={(val) => handleSelectPenghasilan(val, 'ayah')}
                                data={mappingToSelectListPenghasilan(data?.hasil_ortu)}
                                boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                                save="value"
                                placeholder="Pilih Penghasilan"
                            />
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Nama Orang Tua Ibu</Text>
                            <View style={styles.wrapper}>
                                <TextInput
                                    value={selected.nama_ibu}
                                    style={styles.input}
                                    onChangeText={(text) => setSelected(val => ({ ...val, nama_ibu: text }))}
                                    placeholder='Nama Orang Tua Ibu'
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Pekerjaan Orang Tua Ibu</Text>
                            <SelectList
                                setSelected={(val) => handleSelectPekerjaan(val, 'ibu')}
                                data={mappingToSelectListPekerjaan(data?.pekerjaan_ortu)}
                                boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                                save="value"
                                placeholder="Pilih Pekerjaan"
                            />
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>Penghasilan Orang Tua Ibu</Text>
                            <SelectList
                                setSelected={(val) => handleSelectPenghasilan(val, 'ibu')}
                                data={mappingToSelectListPenghasilan(data?.hasil_ortu)}
                                boxStyles={{ backgroundColor: COLORS.white, borderColor: COLORS.white, borderRadius: SIZES.xSmall, }}
                                save="value"
                                placeholder="Pilih Penghasilan"
                            />
                        </View>

                        <View style={styles.inputContainter}>
                            <Text style={styles.labelInput}>No Telpon Ortu</Text>
                            <View style={styles.wrapper}>
                                <TextInput
                                    value={selected.no_telp_ortu}
                                    style={styles.input}
                                    onChangeText={(text) => setSelected(val => ({ ...val, no_telp_ortu: text }))}
                                    placeholder='Masukan No Telpon'
                                />
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={() => handleRegister()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {loading ? 'Loading..' : 'Daftar'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.white

    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 200,
        marginTop: 15,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold"
    },
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