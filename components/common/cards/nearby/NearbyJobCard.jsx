import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ siswa, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(siswa?.employer_logo)
              ? siswa?.employer_logo
              : "https://cdn-icons-png.flaticon.com/512/2784/2784403.png",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.siswaName} numberOfLines={1}>
          {siswa?.peserta?.nama}
        </Text>

        <Text style={styles.siswaNis}>No Register: {siswa?.nis}</Text>
        <Text style={styles.siswaStatus(siswa)}>Status: {siswa?.status}</Text>

      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;